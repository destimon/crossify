import { Handler, Routes } from "./interface";
import http, { RequestListener, Server } from "http";
import undici from "undici";

class HttpServer extends Server {
  private requestHandler: RequestListener = async (req, res) => {
    try {
      if (!req.url) throw new Error("Url not provided!");

      const apiUrl = Crossify.routes[req.url].api;
      const { body } = await undici.request(apiUrl);
      // TODO: Figure out why error appears
      // @ts-ignore
      const data = await body.json();

      const responseData = await Crossify.routes[req.url].handler(data);

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

  private Server = new HttpServer();
  private serverInstance = this.Server.createServer();

  get<T>(url: string, api: string, handler: Handler<T>) {
    Crossify.routes[url] = {
      api,
      handler,
      url,
    };
  }

  start(port: number): http.Server {
    return this.serverInstance.listen(port);
  }
}

export default new Crossify();
