/**
 * @module search.api
 */

import axios, { AxiosRequestConfig } from "axios";

import { WikidataLanguage, searchEntities } from "wikidata-sdk";
import { SearchResultType } from "./SearchResult";
import { SearchCollection } from "./SearchCollection";

/**
 * @param options searching options
 * @param options.search searching string
 * @param options.language the language of search query (default=en)
 * @param options.limit limit result (default=20)
 * @param options.uselang the language in which the search results are returned
 * @param options.config axios configuration object
 */
export type SearchOption = {
  search: string;
  language?: WikidataLanguage;
  limit?: string | number;
  uselang?: WikidataLanguage;
  config?: AxiosRequestConfig;
};

/**
 * This method will fetching entities base on input searching string
 *
 * @param options searching options
 * @param options.search searching string
 * @param options.language the language of search query (default=en)
 * @param options.limit limit result (default=20)
 * @param options.uselang the language in which the search results are returned
 * @param options.config axios configuration object
 *
 * @return This result will be {@link SearchCollection} object
 *
 * @see https://www.wikidata.org/w/api.php?action=help&modules=wbsearchentities
 */
export async function SearchEntities(options: SearchOption) {
  const result = await axios.get<SearchResultType>(searchEntities(options), options.config);
  // console.log(result.data.search);

  const collection = new SearchCollection();
  result.data.search.forEach(search => collection.add(search));
  return collection;
}

/**
 * This method is {@link SearchEntities} with get only first result
 *
 * @param options searching options
 * @param options.search searching string
 * @param options.language the language of search query (default=en)
 * @param options.limit This option will be overrided by 1
 * @param options.uselang the language in which the search results are returned
 * @param options.config axios configuration object
 *
 * @return This result will be {@link SearchResult} object or undefined
 */
export async function SearchEntity(options: SearchOption) {
  options.limit = 1; // override limit search
  const result = await SearchEntities(options);
  return result.first();
}

/**
 * This is Low level APIs for making each of wikidata api raw without any mapping to javascript object.
 */
export class LowLevelSearchAPIs {
  /**
   * get searching APIs link
   *
   * @param options searching options
   * @param options.search searching string
   * @param options.language the language of search query (default=en)
   * @param options.limit response result limit length
   * @param options.uselang the language in which the search results are returned
   * @param options.config this options will be ignore
   *
   * @return return REST_API link for searching
   */
  public static GetLink(options: SearchOption) {
    return searchEntities(options);
  }

  /**
   * Try to search the input string in wikidata using wbsearchentities APIs
   *
   * @param options searching options
   * @param options.search searching string
   * @param options.language the language of search query (default=en)
   * @param options.limit response result limit length
   * @param options.uselang the language in which the search results are returned
   * @param options.config axios configuration object
   *
   * @see https://www.wikidata.org/w/api.php?action=help&modules=wbsearchentities
   */
  public static async GetEntities(options: SearchOption) {
    return await axios.get<SearchResultType>(searchEntities(options), options.config);
  }
}
