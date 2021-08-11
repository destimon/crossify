import http, { RequestListener, Server } from "http";
import { HttpMethod } from "../types/http";
import { Api } from "./api";
import { Router } from "./router";

export class CrossifyServer extends Server {
  private api = new Api();

  private requestHandler: RequestListener = async (req, res) => {
    try {
      const { url, method } = req;
      if (!url) throw new Error("Url not provided!");

      const endPoint = Router.findWithParams(url, method as HttpMethod);
      // TODO: Implement "Not found" case and throw error
      const apiResponse = await this.api.sendRequest(endPoint);

      // TODO: Handle header according to the api response type
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
