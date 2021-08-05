import crossify from "../../";

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

cross.start(3000);
