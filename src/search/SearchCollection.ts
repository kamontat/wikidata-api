/**
 * @module search.model
 */

import Dict from "collections/dict";

import { SearchResult, SearchResultType } from "./SearchResult";

export class SearchCollection {
  private ts: Dict<SearchResult>;

  constructor(ts?: SearchResult[]) {
    this.ts = new Dict<SearchResult>();

    if (ts) ts.forEach(t => this.add(t));
  }

  /**
   * Add the result to collection
   *
   * @param t result either raw result from URL APIs or object search result
   */
  add(t: SearchResult | SearchResultType) {
    if (t instanceof SearchResult) this.ts.set(t.id, t);
    else this.ts.set(t.id, new SearchResult(t));
  }

  /**
   * get result by entities ID
   * @param id entities ID
   */
  get(id: string) {
    this.ts.get(id);
  }

  /**
   * return only first match to the filter function or undefined, if matches nothing
   *
   * @param fn filter function
   */
  only(fn: (v: SearchResult) => boolean) {
    const result = this.ts.filter(fn);
    if (result.length >= 1) return result.toArray()[0];
    else return undefined;
  }

  /**
   * list all results as {@link ResultType}
   *
   */
  listAll() {
    return this.ts.map(v => v.toJSON());
  }

  /**
   * Get first index of the array
   */
  first() {
    const arr = this.ts.toArray();
    return arr.length > 0 ? arr[0] : undefined;
  }

  /**
   * Get last index of the array
   */
  last() {
    const arr = this.ts.toArray();
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
  }

  toString() {
    return this.ts.map(v => v.toString()).join("\n");
  }
}
