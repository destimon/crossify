import { Handler, Routes } from "../types/http";
import http, { RequestListener, Server } from "http";
import undici from "undici";

class HttpServer extends Server {
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

  private replaceApiUrl = (apiUrl) => {};

  private requestHandler: RequestListener = async (req, res) => {
    try {
      const { url } = req;
      if (!url) throw new Error("Url not provided!");

      const [currentRoute, paramValues] = this.patchUrlWithParams(url);

      console.log("indexUrl: ", currentRoute);

      console.log("params: ", Crossify.routes[currentRoute].params);

      // TODO: Make layer for undici call
      const apiUrl = Crossify.routes[currentRoute].api;
      const { body } = await undici.request(apiUrl);

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

export class Crossify {
  static routes: Routes = {};

  constructor(opts?: {}) {}

  private Server = new HttpServer();
  private serverInstance = this.Server.createServer();

  parseParams(url: string) {
    return url.split("/").filter((part) => part.startsWith(":"));
  }

  get(url: string, api: string, handler: Handler) {
    const params = this.parseParams(url);

    Crossify.routes[url] = {
      api,
      handler,
      url,
      params,
    };
  }

  start(port: number): http.Server {
    return this.serverInstance.listen(port);
  }
}
