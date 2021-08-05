import undici from "undici";
import { Crossify } from "./crossify";

export class Api {
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

  async sendRequest(currentRoute: string, paramValues: string[]) {
    const apiUrl = Crossify.routes[currentRoute].api;
    const apiUrlWithParams = this.replaceApiUrl(apiUrl, paramValues);
    const { body } = await undici.request(apiUrlWithParams);
    // @ts-ignore
    const data = await body.json();
    const responseData = await Crossify.routes[currentRoute].handler(data);

    return JSON.stringify(responseData);
  }
}
