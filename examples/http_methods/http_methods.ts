import crossify from "../../index";

const cross = crossify();

const url = "/todo/:id";
const apiUrl = "https://jsonplaceholder.typicode.com/todos/:id";

type Data = Record<string, any>;

cross.get(url, apiUrl, (data: Data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  result["fetchedDate"] = new Date();

  return result;
});

cross.post(url, apiUrl, (data: Data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  result["fetchedDate"] = new Date();

  return result;
});

cross.delete(url, apiUrl, (data: Data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  result["fetchedDate"] = new Date();

  return result;
});

cross.head(url, apiUrl, (data: Data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  result["fetchedDate"] = new Date();

  return result;
});

cross.patch(url, apiUrl, (data: Data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  result["fetchedDate"] = new Date();

  return result;
});

cross.options(url, apiUrl, (data: Data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  result["fetchedDate"] = new Date();

  return result;
});

cross.put(url, apiUrl, (data: Data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  result["fetchedDate"] = new Date();

  return result;
});

cross.start(3000, "localhost");
