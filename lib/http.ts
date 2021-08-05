import http, { RequestListener, Server } from "http";
import undici from "undici";
import { Crossify } from "./crossify";

export class HttpServer extends Server {
  private patchUrlWithParams = (url: string): [string, string[]] => {
    const splitedUrl = url.split("/");
    const paramValues: string[] = [];
    const routes = Object.keys(Crossify.routes);

    const currentRoute = routes.find((route) => {
      const replacedRoute = route.split("/").map((splitedRoute, index) => {
        if (splitedRoute.startsWith(":")) {
          paramValues.push(splitedUrl[index]);

          return splitedUrl[index];
        }

        return splitedRoute;
      });

      return replacedRoute.join("/") === url;
    });

    return [currentRoute, paramValues];
  };

  private replaceApiUrl = (apiUrl: string, params: string[]) => {
    let index = 0;

    return apiUrl
      .split("/")
      .map((part) => {
        if (part.startsWith(":")) {
          const changeParam = params[index];

          index++;
          return changeParam;
        }
        return part;
      })
      .join("/");
  };

  private requestHandler: RequestListener = async (req, res) => {
    try {
      const { url } = req;
      if (!url) throw new Error("Url not provided!");

      const [currentRoute, paramValues] = this.patchUrlWithParams(url);

      // TODO: Make layer for undici call
      const apiUrl = Crossify.routes[currentRoute].api;
      const apiUrlWithParams = this.replaceApiUrl(apiUrl, paramValues);
      const { body } = await undici.request(apiUrlWithParams);

      // @ts-ignore
      const data = await body.json();

      const responseData = await Crossify.routes[currentRoute].handler(data);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(responseData));
    } catch (err) {
      console.error(err);

      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ msg: err.message }));
    }
  };

  createServer() {
    return http.createServer(this.requestHandler);
  }
}
