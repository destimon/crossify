import { Handler, Routes } from "../types/http";
import http from "http";
import { HttpServer } from "./http";

export class Crossify {
  static routes: Routes = {};

  constructor(opts?: {}) {}

  private Server = new HttpServer();
  private serverInstance = this.Server.createServer();

  private parseParams(url: string) {
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
