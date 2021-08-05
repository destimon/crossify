import { Handler, Routes } from "../types/http";
import http from "http";
import { CrossifyServer } from "./server";

export class Crossify {
  static routes: Routes = {};

  constructor(opts?: {}) {}

  private Server = new CrossifyServer();
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

  public start(port: number | string): http.Server;
  public start(port: number | string, hostname: string): http.Server;
  public start(port: number | string, ...args: any[]): http.Server {
    return this.serverInstance.listen(port, ...args);
  }
}
