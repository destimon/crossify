import http, { RequestListener, Server } from "http";
import { Api } from "./api";
import { Crossify } from "./crossify";

type UrlWithParams = [string, string[]];

export class HttpServer extends Server {
  private api = new Api();

  private patchUrlWithParams = (url: string): UrlWithParams => {
    const urlParts = url.split("/");
    const paramValues: string[] = [];
    const routes = Object.keys(Crossify.routes);
    const currentRoute = routes.find((route) => {
      const replacedRoute = route.split("/").map((routePart, index) => {
        if (routePart.startsWith(":")) {
          paramValues.push(urlParts[index]);

          return urlParts[index];
        }

        return routePart;
      });

      return replacedRoute.join("/") === url;
    });

    return [currentRoute, paramValues];
  };

  private requestHandler: RequestListener = async (req, res) => {
    try {
      const { url } = req;
      if (!url) throw new Error("Url not provided!");

      const [currentRoute, paramValues] = this.patchUrlWithParams(url);
      const apiResponse = await this.api.sendRequest(currentRoute, paramValues);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(apiResponse);
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ msg: err.message }));
    }
  };

  createServer() {
    return http.createServer(this.requestHandler);
  }
}
