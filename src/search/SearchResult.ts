/**
 * @module search.model
 */

import { WikidataLanguage } from "wikidata-sdk";

/**
 * the object that tell us, how the result matches to the query
 */
export type EntityMatchType = {
  /**
   * that match with a query
   */
  type: string;
  /**
   * the language of the matches to a query
   */
  language: WikidataLanguage;
  /**
   * text of the query
   */
  text: string;
};

/**
 * the return result from APIs query.
 */
export type ResultType = {
  /**
   * (???)
   */
  repository: string;
  /**
   * the entities ID (should start with Q or P ???)
   */
  id: string;
  /**
   * concepturi is a concept url of the entities (usually will be on this form: http://www.wikidata.org/entity/<id>)
   */
  concepturi: string;
  /**
   * the title of the id (usually will be the same as id ???)
   */
  title: string;
  /**
   * a wikidata page id (???)
   */
  pageid: number;
  /**
   * a wikidata url (should be inform of 'http://www.wikidata.org/wiki/<id>')
   */
  url: string;
  /**
   * label of entities that will show as a title in website (should be human readable string text)
   */
  label: string;
  /**
   * description of this label (might not exist in some of language and entities)
   */
  description?: string;
  /**
   * the object show how this entities is match a query
   */
  match?: EntityMatchType;
  /**
   * a alias key of the entity
   */
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
