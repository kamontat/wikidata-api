import {
  getEntities,
  WikidataProperty,
  WikidataLanguage,
  getWikidataIdsFromWikipediaTitles,
  WikidataSite
} from "wikidata-sdk";
import Axios, { AxiosRequestConfig } from "axios";

type StringOrStringArray = string | string[];

export async function GetEntity(
  from: { id?: StringOrStringArray; title?: StringOrStringArray },
  setting?: {
    languages?: WikidataLanguage | WikidataLanguage[];
    props?: WikidataProperty | WikidataProperty[];
    sitelink?: WikidataSite;
  },
  config?: AxiosRequestConfig
) {
  if (!from.id && !from.title) throw new Error("You must add either id or title");

  let url = "";

  if (from.id)
    url = getEntities({
      ids: from.id,
      languages: setting && setting.languages,
      props: setting && setting.props
    });
  else if (from.title)
    url = getWikidataIdsFromWikipediaTitles({
      titles: from.title,
      languages: setting && setting.languages,
      props: setting && setting.props,
      sites: setting && setting.sitelink
    });

  return Axios.get(url, config);
}
