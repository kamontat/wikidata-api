/**
 * @module search.model
 */

import { WikidataLanguage } from "wikidata-sdk";

/**
 * the object that tell us, how the result matches to the query
 *
 * @param type that match with a query
 * @param language of the matches to a query
 * @param text text of the query
 */
export type EntityMatchType = {
  type: string;
  language: WikidataLanguage;
  text: string;
};

/**
 * the return result from APIs query.
 *
 * @param repository
 * @param id the entities ID (should start with Q or P ???)
 * @param concepturi is a concept url of the entities (usually will be on this form: http://www.wikidata.org/entity/<id>)
 * @param title is a title of the id (usually will be the same as id ???)
 * @param pageid is a wikidata page id (???)
 * @param url is a wikidata url (should be inform of 'http://www.wikidata.org/wiki/<id>')
 * @param label is a label that will show as a title in website (should be human readable string text)
 * @param description is a description of this label (might not exist in some of language and entities)
 * @param match is the object show how this entities is match a query
 * @param aliases is a alias key of the entity
 */
export type ResultType = {
  repository: string;
  id: string;
  concepturi: string;
  title: string;
  pageid: number;
  url: string;
  label: string;
  description?: string;
  match?: EntityMatchType;
  aliases?: string[];
  [key: string]: any;
};

/**
 * Search result type is the result type that you will receive after fetching the REST API
 *
 * @param searchinfo is a object contain searching query
 * @param searchinfo.search is a search query
 * @param search is a array of entities result
 */
export type SearchResultType = {
  searchinfo: {
    search: string;
  };
  search: ResultType[];
};

export class SearchResult {
  private _id: string;
  /**
   * the entities ID (should start with Q or P ???)
   */
  get id() {
    return this._id;
  }

  private _title: string;
  /**
   * title of the id (usually will be the same as id ???)
   */
  get title() {
    return this._title;
  }

  private _label: string;
  /**
   * Label is a string that will show as a title in website (should be human readable string text)
   */
  get label() {
    return this._label;
  }

  /**
   * Description is a explaination of a label (might not exist in some of language and entities)
   */
  get description() {
    return this.information.description || "";
  }

  /**
   * Concept URI is a url of the entities (usually will be on this form: http://www.wikidata.org/entity/<id>)
   */
  get concepturi() {
    return this.information.concepturi;
  }

  /**
   * URL is a wikidata url (should be inform of 'http://www.wikidata.org/wiki/<id>')
   */
  get url() {
    return `https:${this.information.url}`;
  }

  get pageid() {
    return this.information.pageid;
  }

  /**
   * Match object will show how this entities is match a query
   */
  get match() {
    return this.information.match;
  }

  /**
   * Aliases of the entities
   */
  get aliases() {
    return this.information.aliases || [];
  }

  private information: ResultType;

  constructor(queryResult: ResultType) {
    this._id = queryResult.id;
    this._title = queryResult.title;

    this._label = queryResult.label;

    this.information = queryResult;
  }

  /**
   * get more information that MIGHT receive from APIs
   *
   * @param key information key
   * @return Depend what you pass in input.
   *
   */
  public getMoreInformation(key: string) {
    return this.information[key];
  }

  public toString() {
    return `${this._id}: ${this._label} (${this.information.description})`;
  }

  public toJSON() {
    return this.information;
  }
}
