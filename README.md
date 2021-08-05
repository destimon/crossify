<div align="center">
<img src="https://github.com/destimon/crossify/blob/main/crossify.png?raw=true" width="auto" height="auto"/>
</div>

<br />

# It's ALPHA!

Project may work improperly...

# Crossify

Crossify is a lightweight and mainly focused on the cross API fetching framework.
Without overheaded functionality you can easily build up your lightweight API
which is just processing data from an external APIs.

Crossify gives you direct control to the APIs data with all socket and fetching business
logic under the hood!

# Quick start

### Example

```typescript
import crossify from "crossify";

const cross = crossify();

const url = "/";
const apiUrl = "https://jsonplaceholder.typicode.com/todos/1";

type Data = Record<string, any>;

cross.get(url, apiUrl, (data: Data) => {
  // Process the data as you want here
  
  const result = Object.defineProperty(data, "title", {
    value: "Hello world!",
  });

  return result;
});

cross.start(3000);
```
