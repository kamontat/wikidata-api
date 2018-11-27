import { WikidataLanguage } from "wikidata-sdk";
export declare type EntityMatchType = {
    type: string;
    language: WikidataLanguage;
    text: string;
};
export declare type ResultType = {
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
export declare type SearchResultType = {
    searchinfo: {
        search: string;
    };
    search: ResultType[];
};
export declare class SearchResult {
    private _id;
    readonly id: string;
    private _title;
    readonly title: string;
    private _label;
    readonly label: string;
    readonly description: string;
    readonly concepturi: string;
    readonly url: string;
    readonly pageid: number;
    readonly match: EntityMatchType | undefined;
    readonly aliases: string[];
    private information;
    constructor(queryResult: ResultType);
    getMoreInformation(key: string): any;
    toString(): string;
    toJSON(): ResultType;
}
