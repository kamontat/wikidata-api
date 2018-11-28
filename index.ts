import { SearchEntity, LowLevelSearchAPIs } from "./src/search";
import { getWikidataIdsFromWikipediaTitles } from "wikidata-sdk";
import Axios from "axios";
import { GetEntity } from "./src/get";

SearchEntity({
  search: "Bern",
  language: "th"
})
  .then(result => {
    return GetEntity({ id: result.id });
  })
  .then(result => {
    // console.log(JSON.stringify(result.data, undefined, "  "));
    console.log(result.data.entities["Q70"]);
  });

// const url = LowLevelSearchAPIs.GetLink({
//   search: "Hello",
//   language: "th"
// });

// Axios.get(
//   getWikidataIdsFromWikipediaTitles({
//     titles: "ber"
//   })
// ).then(result => {
//   console.log(result.data);
// });
