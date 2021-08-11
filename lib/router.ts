import { Handler, HttpMethod, Route } from "../types/http";

export class Router {
  static state: Route[] = [];

  private parseParams(url: string) {
    return url.split("/").filter((part) => part.startsWith(":"));
  }

  static get routes() {
    return Router.state.map((route) => route.url);
  }

  static findWithParams(url: string, method: HttpMethod) {
    const urlParts = url.split("/");
    const paramValues: string[] = [];
    const state = Router.state
      .filter((endPoint) => endPoint.method === method)
      .find((endPoint) => {
        const replacedRoute = endPoint.url
          .split("/")
          .map((routePart, index) => {
            if (routePart.startsWith(":")) {
              paramValues.push(urlParts[index]);

              return urlParts[index];
            }

            return routePart;
          });

        return replacedRoute.join("/") === url;
      });

    return {
      state,
      paramValues,
    };
  }

  static find(url: string, method: string) {
    return Router.state.find(
      (route) => route.url === url && route.method === method
    );
  }

  registerMethod(
    url: string,
    api: string,
    handler: Handler,
    method: HttpMethod
  ) {
    const params = this.parseParams(url);

    return Router.state.push({ url, api, handler, method, params });
  }
}
