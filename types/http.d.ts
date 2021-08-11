export type Handler = (data: unknown) => unknown;

export type HttpMethod =
  | "GET"
  | "POST"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "PUT"
  | "HEAD";

export interface Route {
  api: string;
  handler: Handler;
  url: string;
  method: HttpMethod;
  params?: string[];
}
