import { Crossify } from "./lib/crossify";

const initCrossify = (opts?: {}) => {
  const instance = new Crossify(opts);

  return instance;
};

export default initCrossify;
