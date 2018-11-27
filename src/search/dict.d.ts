declare module "collections/dict" {
  class Dict<V> {
    length: number;

    constructor(values?: { [key: string]: V }, getDefault?: (key: string) => V);

    /**
     * Returns whether an entry with the given key exists in a Map.
     * @param key
     */
    has(key: string): boolean;

    /**
     *
     * Gets the value for a key in a map.
     *
     * @param key object key
     * @param getDefault if key not exist
     */
    get(key: string | number, getDefault?: (key: string) => V): void;

    /**
     * Sets the value for a given key.
     *
     * @param key object key
     * @param value object
     */
    set(key: string, value: V): void;

    /**
     * dds a value for a given key to a map.
     *
     * @param value object
     * @param key object key
     */
    add(value: V, key: string): void;

    /**
     * Deletes the value for a given key. Returns whether the key was found and successfully deleted.
     *
     * @param key object key
     */
    delete(key: string): V;

    /**
     * Returns an array of the keys of this map.
     */
    keys(): string[];

    /**
     * Returns an array of the values of this map.
     */
    values(): V[];

    /**
     * Returns an array of all [key, value] entries for this map.
     */
    entries(): { [key: string]: V }[];

    /**
     * Copies values or entries from another collection into this collection, and then returns this.
     * @param values this
     */
    addEach(values: string[]): this;

    /**
     * Deletes every value or every value for each key. Returns the number of successful deletions.
     *
     * @param values delete values
     * @param equals equal method to check is object is the same thing
     */
    deleteEach(values: V[], equals?: (a: V, b: V) => boolean): number;

    /**
     * Deletes all of the values in the collection.
     */
    clear(): void;

    // ---------------------------------- //

    forEach(callbackfn: (value: V, index?: number) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: V, index: number) => U, thisArg?: any): U[];
    filter(callbackfn: (value: V, index: number) => boolean, thisArg?: any): Dict<V>;
    reduce<T>(callbackfn: (previousValue: T, currentValue: V, currentIndex: number) => T, initialValue?: T): T;

    // ---------------------------------- //

    toArray(): V[];
    toObject(): object;
    toJSON(): string;
  }

  export = Dict;
}
