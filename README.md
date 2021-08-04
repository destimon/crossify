# crossify

## Quick start

```typescript
import crossify from "crossify";

const url = "/";
const apiUrl = "https://jsonplaceholder.typicode.com/todos/1";

type Data = Record<string, any>;

crossify.get<Data>(url, apiUrl, (data) => {
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  return result;
});

crossify.start(3000);
```
