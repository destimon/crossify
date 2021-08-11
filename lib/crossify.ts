import { Handler } from "../types/http";
import http from "http";
import { CrossifyServer } from "./server";
import { Router } from "./router";

export class Crossify {
  // TODO: Implement options functionality
  constructor(opts?: {}) {}

  private readonly Server = new CrossifyServer();
  private readonly router = new Router();
  private readonly serverInstance = this.Server.createServer();

  get(url: string, api: string, handler: Handler) {
    return this.router.registerMethod(url, api, handler, "GET");
  }

  post(url: string, api: string, handler: Handler) {
    return this.router.registerMethod(url, api, handler, "POST");
  }

  delete(url: string, api: string, handler: Handler) {
    return this.router.registerMethod(url, api, handler, "DELETE");
  }

  head(url: string, api: string, handler: Handler) {
    return this.router.registerMethod(url, api, handler, "HEAD");
  }

  patch(url: string, api: string, handler: Handler) {
    return this.router.registerMethod(url, api, handler, "PATCH");
  }

  put(url: string, api: string, handler: Handler) {
    return this.router.registerMethod(url, api, handler, "PUT");
  }

  options(url: string, api: string, handler: Handler) {
    return this.router.registerMethod(url, api, handler, "OPTIONS");
  }

  public start(port: number | string): http.Server;
  public start(port: number | string, hostname: string): http.Server;
  public start(port: number | string, ...args: any[]): http.Server {
    return this.serverInstance.listen(port, ...args);
  }
}
