import { SearchEntity, LowLevelSearchAPIs } from "./src/search";

SearchEntity({
  search: "Bern",
  language: "th",
  uselang: "it"
}).then(result => {
  if (result) console.log(result.toString());
});

const url = LowLevelSearchAPIs.GetLink({
  search: "Hello",
  language: "th"
});

console.log(url);
