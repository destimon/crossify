export type Handler = (data: unknown) => unknown;

export interface Routes {
  [route: string]: {
    api: string;
    handler: Handler;
    url: string;
    params?: string[];
  };
}
