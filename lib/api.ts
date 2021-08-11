import { request } from "undici";
import { RequestRoute } from "../types/router";

export class Api {
  private replaceApiUrl = (apiUrl: string, params: string[]) => {
    let index = 0;

    // TODO: Find way to simplify expression
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

  async sendRequest(route: RequestRoute) {
    const { state, paramValues } = route;
    const { api, method, handler } = state;
    const apiUrlWithParams = this.replaceApiUrl(api, paramValues);
    const { body } = await request(apiUrlWithParams, { method }); // API Request
    // TODO: Remove ts ignore
    // @ts-ignore
    const data = await body.json();
    const responseData = await handler(data);

    return JSON.stringify(responseData);
  }
}
