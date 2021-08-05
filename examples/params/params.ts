import crossify from "../../";

const cross = crossify({});
const url = "/todos";
const apiUrl = "https://jsonplaceholder.typicode.com/todos";

type Data = Record<string, any>;

cross.get(url, apiUrl, (data: Data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  result["fetchedDate"] = new Date();

  return result;
});

cross.start(3000);
