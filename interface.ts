export type Handler<T> = (data: T) => unknown;

export interface Routes {
  [route: string]: {
    api: string;
    handler: Handler<unknown>;
    url: string;
  };
}
