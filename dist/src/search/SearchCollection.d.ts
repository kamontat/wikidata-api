import { SearchResult, ResultType } from "./SearchResult";
export declare class SearchCollection {
    private ts;
    constructor(ts?: SearchResult[]);
    add(t: SearchResult | ResultType): void;
    get(id: string): void;
    only(fn: (v: SearchResult) => boolean): any;
    listAll(): any;
    first(): any;
    last(): any;
    toString(): any;
}
