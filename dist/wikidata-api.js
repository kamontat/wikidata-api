/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = __webpack_require__(/*! ./src/search */ "./src/search/index.ts");
search_1.SearchEntity({
    search: "Bern",
    language: "th",
    uselang: "it"
}).then(result => {
    if (result)
        console.log(result.toString());
});
const url = search_1.LowLevelSearchAPIs.GetLink({
    search: "Hello",
    language: "th"
});
console.log(url);


/***/ }),

/***/ "./node_modules/collections/copy.js":
/*!******************************************!*\
  !*** ./node_modules/collections/copy.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = copy;
function copy(target, source) {
    for (var name in source) {
        if (hasOwnProperty.call(source, name)) {
            target[name] = source[name];
        }
    }
}


/***/ }),

/***/ "./node_modules/collections/dict.js":
/*!******************************************!*\
  !*** ./node_modules/collections/dict.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GenericCollection = __webpack_require__(/*! ./generic-collection */ "./node_modules/collections/generic-collection.js");
var GenericMap = __webpack_require__(/*! ./generic-map */ "./node_modules/collections/generic-map.js");
var ObservableObject = __webpack_require__(/*! pop-observe/observable-object */ "./node_modules/pop-observe/observable-object.js");
var Iterator = __webpack_require__(/*! ./iterator */ "./node_modules/collections/iterator.js");
var copy = __webpack_require__(/*! ./copy */ "./node_modules/collections/copy.js");

// Burgled from https://github.com/domenic/dict

module.exports = Dict;
function Dict(values, getDefault) {
    if (!(this instanceof Dict)) {
        return new Dict(values, getDefault);
    }
    getDefault = getDefault || this.getDefault;
    this.getDefault = getDefault;
    this.store = {};
    this.length = 0;
    this.addEach(values);
}

Dict.Dict = Dict; // hack for MontageJS

function mangle(key) {
    return "$" + key;
}

function unmangle(mangled) {
    return mangled.slice(1);
}

copy(Dict.prototype, GenericCollection.prototype);
copy(Dict.prototype, GenericMap.prototype);
copy(Dict.prototype, ObservableObject.prototype);

Dict.prototype.isDict = true;

Dict.prototype.constructClone = function (values) {
    return new this.constructor(values, this.mangle, this.getDefault);
};

Dict.prototype.get = function (key, defaultValue) {
    var mangled = mangle(key);
    if (mangled in this.store) {
        return this.store[mangled];
    } else if (arguments.length > 1) {
        return defaultValue;
    } else {
        return this.getDefault(key);
    }
};

Dict.prototype.set = function (key, value) {
    var mangled = mangle(key);
    var from;
    if (mangled in this.store) { // update
        if (this.dispatchesMapChanges) {
            from = this.store[mangled];
            this.dispatchMapWillChange("update", key, value, from);
        }
        this.store[mangled] = value;
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange("update", key, value, from);
        }
        return false;
    } else { // create
        if (this.dispatchesMapChanges) {
            this.dispatchMapWillChange("create", key, value);
        }
        this.length++;
        this.store[mangled] = value;
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange("create", key, value);
        }
        return true;
    }
};

Dict.prototype.has = function (key) {
    var mangled = mangle(key);
    return mangled in this.store;
};

Dict.prototype["delete"] = function (key) {
    var mangled = mangle(key);
    var from;
    if (mangled in this.store) {
        if (this.dispatchesMapChanges) {
            from = this.store[mangled];
            this.dispatchMapWillChange("delete", key, void 0, from);
        }
        delete this.store[mangle(key)];
        this.length--;
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange("delete", key, void 0, from);
        }
        return true;
    }
    return false;
};

Dict.prototype.clear = function () {
    var key, mangled, from;
    for (mangled in this.store) {
        key = unmangle(mangled);
        if (this.dispatchesMapChanges) {
            from = this.store[mangled];
            this.dispatchMapWillChange("delete", key, void 0, from);
        }
        delete this.store[mangled];
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange("delete", key, void 0, from);
        }
    }
    this.length = 0;
};

Dict.prototype.reduce = function (callback, basis, thisp) {
    for (var mangled in this.store) {
        basis = callback.call(thisp, basis, this.store[mangled], unmangle(mangled), this);
    }
    return basis;
};

Dict.prototype.reduceRight = function (callback, basis, thisp) {
    var self = this;
    var store = this.store;
    return Object.keys(this.store).reduceRight(function (basis, mangled) {
        return callback.call(thisp, basis, store[mangled], unmangle(mangled), self);
    }, basis);
};

Dict.prototype.one = function () {
    var key;
    for (key in this.store) {
        return this.store[key];
    }
};

Dict.prototype.iterate = function () {
    return new this.Iterator(new Iterator(this.store));
};

Dict.prototype.Iterator = DictIterator;

function DictIterator(storeIterator) {
    this.storeIterator = storeIterator;
}

DictIterator.prototype.next = function () {
    var iteration = this.storeIterator.next();
    if (iteration.done) {
        return iteration;
    } else {
        return new Iterator.Iteration(
            iteration.value,
            unmangle(iteration.index)
        );
    }
};



/***/ }),

/***/ "./node_modules/collections/generic-collection.js":
/*!********************************************************!*\
  !*** ./node_modules/collections/generic-collection.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var equalsOperator = __webpack_require__(/*! pop-equals */ "./node_modules/pop-equals/pop-equals.js");
var compareOperator = __webpack_require__(/*! pop-compare */ "./node_modules/pop-compare/pop-compare.js");
var cloneOperator = __webpack_require__(/*! pop-clone */ "./node_modules/pop-clone/pop-clone.js");
var unzipOperator = __webpack_require__(/*! pop-zip/pop-unzip */ "./node_modules/pop-zip/pop-unzip.js");

module.exports = GenericCollection;
function GenericCollection() {
    throw new Error("Can't construct. GenericCollection is a mixin.");
}

GenericCollection.prototype.addEach = function (values) {
    if (values && Object(values) === values) {
        if (typeof values.forEach === "function") {
            values.forEach(this.add, this);
        } else if (typeof values.length === "number") {
            // Array-like objects that do not implement forEach, ergo,
            // Arguments
            for (var i = 0; i < values.length; i++) {
                this.add(values[i], i);
            }
        } else {
            Object.keys(values).forEach(function (key) {
                this.add(values[key], key);
            }, this);
        }
    }
    return this;
};

// This is sufficiently generic for Map (since the value may be a key)
// and ordered collections (since it forwards the equals argument)
GenericCollection.prototype.deleteEach = function (values, equals) {
    values.forEach(function (value) {
        this["delete"](value, equals);
    }, this);
    return this;
};

// all of the following functions are implemented in terms of "reduce".
// some need "constructClone".

GenericCollection.prototype.forEach = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    return this.reduce(function (undefined, value, key, object, depth) {
        callback.call(thisp, value, key, object, depth);
    }, undefined);
};

GenericCollection.prototype.map = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    var result = [];
    this.reduce(function (undefined, value, key, object, depth) {
        result.push(callback.call(thisp, value, key, object, depth));
    }, undefined);
    return result;
};

GenericCollection.prototype.enumerate = function (start) {
    if (start == null) {
        start = 0;
    }
    var result = [];
    this.reduce(function (undefined, value) {
        result.push([start++, value]);
    }, undefined);
    return result;
};

GenericCollection.prototype.group = function (callback, thisp, equals) {
    equals = equals || equalsOperator;
    var groups = [];
    var keys = [];
    this.forEach(function (value, key, object) {
        var key = callback.call(thisp, value, key, object);
        var index = keys.indexOf(key, equals);
        var group;
        if (index === -1) {
            group = [];
            groups.push([key, group]);
            keys.push(key);
        } else {
            group = groups[index][1];
        }
        group.push(value);
    });
    return groups;
};

GenericCollection.prototype.toArray = function () {
    return this.map(identity);
};

// this depends on stringable keys, which apply to Array and Iterator
// because they have numeric keys and all Maps since they may use
// strings as keys.  List, Set, and SortedSet have nodes for keys, so
// toObject would not be meaningful.
GenericCollection.prototype.toObject = function () {
    var object = {};
    this.reduce(function (undefined, value, key) {
        object[key] = value;
    }, undefined);
    return object;
};

GenericCollection.prototype.filter = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    var result = this.constructClone();
    this.reduce(function (undefined, value, key, object, depth) {
        if (callback.call(thisp, value, key, object, depth)) {
            result.add(value, key);
        }
    }, undefined);
    return result;
};

GenericCollection.prototype.every = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    var iterator = this.iterate();
    while (true) {
        var iteration = iterator.next();
        if (iteration.done) {
            return true;
        } else if (!callback.call(thisp, iteration.value, iteration.index, this)) {
            return false;
        }
    }
};

GenericCollection.prototype.some = function (callback /*, thisp*/) {
    var thisp = arguments[1];
    var iterator = this.iterate();
    while (true) {
        var iteration = iterator.next();
        if (iteration.done) {
            return false;
        } else if (callback.call(thisp, iteration.value, iteration.index, this)) {
            return true;
        }
    }
};

GenericCollection.prototype.min = function (compare) {
    compare = compare || this.contentCompare || compareOperator;
    var first = true;
    return this.reduce(function (result, value) {
        if (first) {
            first = false;
            return value;
        } else {
            return compare(value, result) < 0 ? value : result;
        }
    }, undefined);
};

GenericCollection.prototype.max = function (compare) {
    compare = compare || this.contentCompare || compareOperator;
    var first = true;
    return this.reduce(function (result, value) {
        if (first) {
            first = false;
            return value;
        } else {
            return compare(value, result) > 0 ? value : result;
        }
    }, undefined);
};

GenericCollection.prototype.sum = function (zero) {
    zero = zero === undefined ? 0 : zero;
    return this.reduce(function (a, b) {
        return a + b;
    }, zero);
};

GenericCollection.prototype.average = function (zero) {
    var sum = zero === undefined ? 0 : zero;
    var count = zero === undefined ? 0 : zero;
    this.reduce(function (undefined, value) {
        sum += value;
        count += 1;
    }, undefined);
    return sum / count;
};

GenericCollection.prototype.concat = function () {
    var result = this.constructClone(this);
    for (var i = 0; i < arguments.length; i++) {
        result.addEach(arguments[i]);
    }
    return result;
};

GenericCollection.prototype.flatten = function () {
    var self = this;
    return this.reduce(function (result, array) {
        array.forEach(function (value) {
            this.push(value);
        }, result, self);
        return result;
    }, []);
};

GenericCollection.prototype.zip = function () {
    var table = Array.prototype.slice.call(arguments);
    table.unshift(this);
    return unzipOperator(table);
}

GenericCollection.prototype.join = function (delimiter) {
    return this.reduce(function (result, string) {
        return result + delimiter + string;
    });
};

GenericCollection.prototype.sorted = function (compare, by, order) {
    compare = compare || this.contentCompare || compareOperator;
    // account for comparators generated by Function.by
    if (compare.by) {
        by = compare.by;
        compare = compare.compare || this.contentCompare || compareOperator;
    } else {
        by = by || identity;
    }
    if (order === undefined)
        order = 1;
    return this.map(function (item) {
        return {
            by: by(item),
            value: item
        };
    })
    .sort(function (a, b) {
        return compare(a.by, b.by) * order;
    })
    .map(function (pair) {
        return pair.value;
    });
};

GenericCollection.prototype.reversed = function () {
    return this.constructClone(this).reverse();
};

GenericCollection.prototype.clone = function (depth, memo, clone) {
    if (depth === undefined) {
        depth = Infinity;
    } else if (depth === 0) {
        return this;
    }
    clone = clone || cloneOperator;
    var collection = this.constructClone();
    this.forEach(function (value, key) {
        collection.add(clone(value, depth - 1, memo), key);
    }, this);
    return collection;
};

GenericCollection.prototype.only = function () {
    if (this.length === 1) {
        return this.one();
    }
};

function identity(value) { return value; }


/***/ }),

/***/ "./node_modules/collections/generic-map.js":
/*!*************************************************!*\
  !*** ./node_modules/collections/generic-map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ObservableMap = __webpack_require__(/*! pop-observe/observable-map */ "./node_modules/pop-observe/observable-map.js");
var ObservableObject = __webpack_require__(/*! pop-observe/observable-object */ "./node_modules/pop-observe/observable-object.js");
var Iterator = __webpack_require__(/*! ./iterator */ "./node_modules/collections/iterator.js");
var equalsOperator = __webpack_require__(/*! pop-equals */ "./node_modules/pop-equals/pop-equals.js");
var compareOperator = __webpack_require__(/*! pop-compare */ "./node_modules/pop-compare/pop-compare.js");
var copy = __webpack_require__(/*! ./copy */ "./node_modules/collections/copy.js");

module.exports = GenericMap;
function GenericMap() {
    throw new Error("Can't construct. GenericMap is a mixin.");
}

copy(GenericMap.prototype, ObservableMap.prototype);
copy(GenericMap.prototype, ObservableObject.prototype);

// all of these methods depend on the constructor providing a `store` set

GenericMap.prototype.isMap = true;

GenericMap.prototype.addEach = function (values) {
    if (values && Object(values) === values) {
        if (typeof values.forEach === "function") {
            // copy map-alikes
            if (values.isMap === true) {
                values.forEach(function (value, key) {
                    this.set(key, value);
                }, this);
            // iterate key value pairs of other iterables
            } else {
                values.forEach(function (pair) {
                    this.set(pair[0], pair[1]);
                }, this);
            }
        } else {
            // copy other objects as map-alikes
            Object.keys(values).forEach(function (key) {
                this.set(key, values[key]);
            }, this);
        }
    }
    return this;
}

GenericMap.prototype.get = function (key, defaultValue) {
    var item = this.store.get(new this.Item(key));
    if (item) {
        return item.value;
    } else if (arguments.length > 1) {
        return defaultValue;
    } else {
        return this.getDefault(key);
    }
};

GenericMap.prototype.getDefault = function () {
};

GenericMap.prototype.set = function (key, value) {
    var item = new this.Item(key, value);
    var found = this.store.get(item);
    var grew = false;
    if (found) { // update
        var from;
        if (this.dispatchesMapChanges) {
            from = found.value;
            this.dispatchMapWillChange("update", key, value, from);
        }
        found.value = value;
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange("update", key, value, from);
        }
    } else { // create
        if (this.dispatchesMapChanges) {
            this.dispatchMapWillChange("create", key, value);
        }
        if (this.store.add(item)) {
            this.length++;
            grew = true;
        }
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange("create", key, value);
        }
    }
    return grew;
};

GenericMap.prototype.add = function (value, key) {
    return this.set(key, value);
};

GenericMap.prototype.has = function (key) {
    return this.store.has(new this.Item(key));
};

GenericMap.prototype['delete'] = function (key) {
    var item = new this.Item(key);
    if (this.store.has(item)) {
        var from;
        if (this.dispatchesMapChanges) {
            from = this.store.get(item).value;
            this.dispatchMapWillChange("delete", key, void 0, from);
        }
        this.store["delete"](item);
        this.length--;
        if (this.dispatchesMapChanges) {
            this.dispatchMapChange("delete", key, void 0, from);
        }
        return true;
    }
    return false;
};

GenericMap.prototype.clear = function () {
    var from;
    if (this.dispatchesMapChanges) {
        this.forEach(function (value, key) {
            this.dispatchMapWillChange("delete", key, void 0, value);
        }, this);
        from = this.constructClone(this);
    }
    this.store.clear();
    this.length = 0;
    if (this.dispatchesMapChanges) {
        from.forEach(function (value, key) {
            this.dispatchMapChange("delete", key, void 0, value);
        }, this);
    }
};

GenericMap.prototype.iterate = function () {
    return new this.Iterator(this);
};

GenericMap.prototype.reduce = function (callback, basis, thisp) {
    return this.store.reduce(function (basis, item) {
        return callback.call(thisp, basis, item.value, item.key, this);
    }, basis, this);
};

GenericMap.prototype.reduceRight = function (callback, basis, thisp) {
    return this.store.reduceRight(function (basis, item) {
        return callback.call(thisp, basis, item.value, item.key, this);
    }, basis, this);
};

GenericMap.prototype.keys = function () {
    return this.map(function (value, key) {
        return key;
    });
};

GenericMap.prototype.values = function () {
    return this.map(identity);
};

GenericMap.prototype.entries = function () {
    return this.map(function (value, key) {
        return [key, value];
    });
};

GenericMap.prototype.equals = function (that, equals) {
    equals = equals || equalsOperator;
    if (this === that) {
        return true;
    } else if (that && typeof that.every === "function") {
        return that.length === this.length && that.every(function (value, key) {
            return equals(this.get(key), value);
        }, this);
    } else {
        var keys = Object.keys(that);
        return keys.length === this.length && Object.keys(that).every(function (key) {
            return equals(this.get(key), that[key]);
        }, this);
    }
};

GenericMap.prototype.Item = Item;
GenericMap.prototype.Iterator = GenericMapIterator;

function Item(key, value) {
    this.key = key;
    this.value = value;
}

Item.prototype.equals = function (that) {
    return equalsOperator(this.key, that.key) && equalsOperator(this.value, that.value);
};

Item.prototype.compare = function (that) {
    return compareOperator(this.key, that.key);
};

function GenericMapIterator(map) {
    this.storeIterator = new Iterator(map.store);
}

GenericMapIterator.prototype = Object.create(Iterator.prototype);
GenericMapIterator.prototype.constructor = GenericMapIterator;

GenericMapIterator.prototype.next = function () {
    var iteration = this.storeIterator.next();
    if (iteration.done) {
        return iteration;
    } else {
        return new Iterator.Iteration(
            iteration.value.value,
            iteration.value.key
        );
    }
};

function identity(value) { return value; }


/***/ }),

/***/ "./node_modules/collections/iterator.js":
/*!**********************************************!*\
  !*** ./node_modules/collections/iterator.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Iterator;

var WeakMap = __webpack_require__(/*! weak-map */ "./node_modules/weak-map/weak-map.js");
var GenericCollection = __webpack_require__(/*! ./generic-collection */ "./node_modules/collections/generic-collection.js");

// upgrades an iterable to a Iterator
function Iterator(iterable, start, stop, step) {
    if (!iterable) {
        return Iterator.empty;
    } else if (iterable instanceof Iterator) {
        return iterable;
    } else if (!(this instanceof Iterator)) {
        return new Iterator(iterable, start, stop, step);
    } else if (Array.isArray(iterable) || typeof iterable === "string") {
        iterators.set(this, new IndexIterator(iterable, start, stop, step));
        return;
    }
    iterable = Object(iterable);
    if (iterable.next) {
        iterators.set(this, iterable);
    } else if (iterable.iterate) {
        iterators.set(this, iterable.iterate(start, stop, step));
    } else if (Object.prototype.toString.call(iterable) === "[object Function]") {
        this.next = iterable;
    } else if (Object.getPrototypeOf(iterable) === Object.prototype) {
        iterators.set(this, new ObjectIterator(iterable));
    } else {
        throw new TypeError("Can't iterate " + iterable);
    }
}

// Using iterators as a hidden table associating a full-fledged Iterator with
// an underlying, usually merely "nextable", iterator.
var iterators = new WeakMap();

// Selectively apply generic methods of GenericCollection
Iterator.prototype.forEach = GenericCollection.prototype.forEach;
Iterator.prototype.map = GenericCollection.prototype.map;
Iterator.prototype.filter = GenericCollection.prototype.filter;
Iterator.prototype.every = GenericCollection.prototype.every;
Iterator.prototype.some = GenericCollection.prototype.some;
Iterator.prototype.min = GenericCollection.prototype.min;
Iterator.prototype.max = GenericCollection.prototype.max;
Iterator.prototype.sum = GenericCollection.prototype.sum;
Iterator.prototype.average = GenericCollection.prototype.average;
Iterator.prototype.flatten = GenericCollection.prototype.flatten;
Iterator.prototype.zip = GenericCollection.prototype.zip;
Iterator.prototype.enumerate = GenericCollection.prototype.enumerate;
Iterator.prototype.sorted = GenericCollection.prototype.sorted;
Iterator.prototype.group = GenericCollection.prototype.group;
Iterator.prototype.reversed = GenericCollection.prototype.reversed;
Iterator.prototype.toArray = GenericCollection.prototype.toArray;
Iterator.prototype.toObject = GenericCollection.prototype.toObject;

// This is a bit of a cheat so flatten and such work with the generic reducible
Iterator.prototype.constructClone = function (values) {
    var clone = [];
    clone.addEach(values);
    return clone;
};

// A level of indirection so a full-interface iterator can proxy for a simple
// nextable iterator.
Iterator.prototype.next = function () {
    var nextable = iterators.get(this);
    if (nextable) {
        return nextable.next();
    } else {
        return Iterator.done;
    }
};

Iterator.prototype.iterateMap = function (callback /*, thisp*/) {
    var self = Iterator(this),
        thisp = arguments[1];
    return new MapIterator(self, callback, thisp);
};

function MapIterator(iterator, callback, thisp) {
    this.iterator = iterator;
    this.callback = callback;
    this.thisp = thisp;
}

MapIterator.prototype = Object.create(Iterator.prototype);
MapIterator.prototype.constructor = MapIterator;

MapIterator.prototype.next = function () {
    var iteration = this.iterator.next();
    if (iteration.done) {
        return iteration;
    } else {
        return new Iteration(
            this.callback.call(
                this.thisp,
                iteration.value,
                iteration.index,
                this.iteration
            ),
            iteration.index
        );
    }
};

Iterator.prototype.iterateFilter = function (callback /*, thisp*/) {
    var self = Iterator(this),
        thisp = arguments[1],
        index = 0;

    return new FilterIterator(self, callback, thisp);
};

function FilterIterator(iterator, callback, thisp) {
    this.iterator = iterator;
    this.callback = callback;
    this.thisp = thisp;
}

FilterIterator.prototype = Object.create(Iterator.prototype);
FilterIterator.prototype.constructor = FilterIterator;

FilterIterator.prototype.next = function () {
    var iteration;
    while (true) {
        iteration = this.iterator.next();
        if (iteration.done || this.callback.call(
            this.thisp,
            iteration.value,
            iteration.index,
            this.iteration
        )) {
            return iteration;
        }
    }
};

Iterator.prototype.reduce = function (callback /*, initial, thisp*/) {
    var self = Iterator(this),
        result = arguments[1],
        thisp = arguments[2],
        iteration;

    // First iteration unrolled
    iteration = self.next();
    if (iteration.done) {
        if (arguments.length > 1) {
            return arguments[1];
        } else {
            throw TypeError("Reduce of empty iterator with no initial value");
        }
    } else if (arguments.length > 1) {
        result = callback.call(
            thisp,
            result,
            iteration.value,
            iteration.index,
            self
        );
    } else {
        result = iteration.value;
    }

    // Remaining entries
    while (true) {
        iteration = self.next();
        if (iteration.done) {
            return result;
        } else {
            result = callback.call(
                thisp,
                result,
                iteration.value,
                iteration.index,
                self
            );
        }
    }
};

Iterator.prototype.dropWhile = function (callback /*, thisp */) {
    var self = Iterator(this),
        thisp = arguments[1],
        iteration;

    while (true) {
        iteration = self.next();
        if (iteration.done) {
            return Iterator.empty;
        } else if (!callback.call(thisp, iteration.value, iteration.index, self)) {
            return new DropWhileIterator(iteration, self);
        }
    }
};

function DropWhileIterator(iteration, iterator) {
    this.iteration = iteration;
    this.iterator = iterator;
    this.parent = null;
}

DropWhileIterator.prototype = Object.create(Iterator.prototype);
DropWhileIterator.prototype.constructor = DropWhileIterator;

DropWhileIterator.prototype.next = function () {
    var result = this.iteration;
    if (result) {
        this.iteration = null;
        return result;
    } else {
        return this.iterator.next();
    }
};

Iterator.prototype.takeWhile = function (callback /*, thisp*/) {
    var self = Iterator(this),
        thisp = arguments[1];
    return new TakeWhileIterator(self, callback, thisp);
};

function TakeWhileIterator(iterator, callback, thisp) {
    this.iterator = iterator;
    this.callback = callback;
    this.thisp = thisp;
}

TakeWhileIterator.prototype = Object.create(Iterator.prototype);
TakeWhileIterator.prototype.constructor = TakeWhileIterator;

TakeWhileIterator.prototype.next = function () {
    var iteration = this.iterator.next();
    if (iteration.done) {
        return iteration;
    } else if (this.callback.call(
        this.thisp,
        iteration.value,
        iteration.index,
        this.iterator
    )) {
        return iteration;
    } else {
        return Iterator.done;
    }
};

Iterator.prototype.iterateZip = function () {
    return Iterator.unzip(Array.prototype.concat.apply(this, arguments));
};

Iterator.prototype.iterateUnzip = function () {
    return Iterator.unzip(this);
};

Iterator.prototype.iterateEnumerate = function (start) {
    return Iterator.count(start).iterateZip(this);
};

Iterator.prototype.iterateConcat = function () {
    return Iterator.flatten(Array.prototype.concat.apply(this, arguments));
};

Iterator.prototype.iterateFlatten = function () {
    return Iterator.flatten(this);
};

Iterator.prototype.recount = function (start) {
    return new RecountIterator(this, start);
};

function RecountIterator(iterator, start) {
    this.iterator = iterator;
    this.index = start || 0;
}

RecountIterator.prototype = Object.create(Iterator.prototype);
RecountIterator.prototype.constructor = RecountIterator;

RecountIterator.prototype.next = function () {
    var iteration = this.iterator.next();
    if (iteration.done) {
        return iteration;
    } else {
        return new Iteration(
            iteration.value,
            this.index++
        );
    }
};

// creates an iterator for Array and String
function IndexIterator(iterable, start, stop, step) {
    if (step == null) {
        step = 1;
    }
    if (stop == null) {
        stop = start;
        start = 0;
    }
    if (start == null) {
        start = 0;
    }
    if (step == null) {
        step = 1;
    }
    if (stop == null) {
        stop = iterable.length;
    }
    this.iterable = iterable;
    this.start = start;
    this.stop = stop;
    this.step = step;
}

IndexIterator.prototype.next = function () {
    // Advance to next owned entry
    if (typeof this.iterable === "object") { // as opposed to string
        while (!(this.start in this.iterable)) {
            if (this.start >= this.stop) {
                return Iterator.done;
            } else {
                this.start += this.step;
            }
        }
    }
    if (this.start >= this.stop) { // end of string
        return Iterator.done;
    }
    var iteration = new Iteration(
        this.iterable[this.start],
        this.start
    );
    this.start += this.step;
    return iteration;
};

function ObjectIterator(object) {
    this.object = object;
    this.iterator = new Iterator(Object.keys(object));
}

ObjectIterator.prototype.next = function () {
    var iteration = this.iterator.next();
    if (iteration.done) {
        return iteration;
    } else {
        var key = iteration.value;
        return new Iteration(this.object[key], key);
    }
};

Iterator.cycle = function (cycle, times) {
    if (arguments.length < 2) {
        times = Infinity;
    }
    return new CycleIterator(cycle, times);
};

function CycleIterator(cycle, times) {
    this.cycle = cycle;
    this.times = times;
    this.iterator = Iterator.empty;
}

CycleIterator.prototype = Object.create(Iterator.prototype);
CycleIterator.prototype.constructor = CycleIterator;

CycleIterator.prototype.next = function () {
    var iteration = this.iterator.next();
    if (iteration.done) {
        if (this.times > 0) {
            this.times--;
            this.iterator = new Iterator(this.cycle);
            return this.iterator.next();
        } else {
            return iteration;
        }
    } else {
        return iteration;
    }
};

Iterator.concat = function (/* ...iterators */) {
    return Iterator.flatten(Array.prototype.slice.call(arguments));
};

Iterator.flatten = function (iterators) {
    iterators = Iterator(iterators);
    return new ChainIterator(iterators);
};

function ChainIterator(iterators) {
    this.iterators = iterators;
    this.iterator = Iterator.empty;
}

ChainIterator.prototype = Object.create(Iterator.prototype);
ChainIterator.prototype.constructor = ChainIterator;

ChainIterator.prototype.next = function () {
    var iteration = this.iterator.next();
    if (iteration.done) {
        var iteratorIteration = this.iterators.next();
        if (iteratorIteration.done) {
            return Iterator.done;
        } else {
            this.iterator = new Iterator(iteratorIteration.value);
            return this.iterator.next();
        }
    } else {
        return iteration;
    }
};

Iterator.unzip = function (iterators) {
    iterators = Iterator(iterators).map(Iterator);
    if (iterators.length === 0)
        return new Iterator.empty;
    return new UnzipIterator(iterators);
};

function UnzipIterator(iterators) {
    this.iterators = iterators;
    this.index = 0;
}

UnzipIterator.prototype = Object.create(Iterator.prototype);
UnzipIterator.prototype.constructor = UnzipIterator;

UnzipIterator.prototype.next = function () {
    var done = false
    var result = this.iterators.map(function (iterator) {
        var iteration = iterator.next();
        if (iteration.done) {
            done = true;
        } else {
            return iteration.value;
        }
    });
    if (done) {
        return Iterator.done;
    } else {
        return new Iteration(result, this.index++);
    }
};

Iterator.zip = function () {
    return Iterator.unzip(Array.prototype.slice.call(arguments));
};

Iterator.range = function (start, stop, step) {
    if (arguments.length < 3) {
        step = 1;
    }
    if (arguments.length < 2) {
        stop = start;
        start = 0;
    }
    start = start || 0;
    step = step || 1;
    return new RangeIterator(start, stop, step);
};

Iterator.count = function (start, step) {
    return Iterator.range(start, Infinity, step);
};

function RangeIterator(start, stop, step) {
    this.start = start;
    this.stop = stop;
    this.step = step;
    this.index = 0;
}

RangeIterator.prototype = Object.create(Iterator.prototype);
RangeIterator.prototype.constructor = RangeIterator;

RangeIterator.prototype.next = function () {
    if (this.start >= this.stop) {
        return Iterator.done;
    } else {
        var result = this.start;
        this.start += this.step;
        return new Iteration(result, this.index++);
    }
};

Iterator.repeat = function (value, times) {
    if (times == null) {
        times = Infinity;
    }
    return new RepeatIterator(value, times);
};

function RepeatIterator(value, times) {
    this.value = value;
    this.times = times;
    this.index = 0;
}

RepeatIterator.prototype = Object.create(Iterator.prototype);
RepeatIterator.prototype.constructor = RepeatIterator;

RepeatIterator.prototype.next = function () {
    if (this.index < this.times) {
        return new Iteration(this.value, this.index++);
    } else {
        return Iterator.done;
    }
};

Iterator.enumerate = function (values, start) {
    return Iterator.count(start).iterateZip(new Iterator(values));
};

function EmptyIterator() {}

EmptyIterator.prototype = Object.create(Iterator.prototype);
EmptyIterator.prototype.constructor = EmptyIterator;

EmptyIterator.prototype.next = function () {
    return Iterator.done;
};

Iterator.empty = new EmptyIterator();

// Iteration and DoneIteration exist here only to encourage hidden classes.
// Otherwise, iterations are merely duck-types.

function Iteration(value, index) {
    this.value = value;
    this.index = index;
}

Iteration.prototype.done = false;

Iteration.prototype.equals = function (that, equals, memo) {
    if (!that) return false;
    return (
        equals(this.value, that.value, equals, memo) &&
        this.index === that.index &&
        this.done === that.done
    );

};

function DoneIteration(value) {
    Iteration.call(this, value);
    this.done = true; // reflected on the instance to make it more obvious
}

DoneIteration.prototype = Object.create(Iteration.prototype);
DoneIteration.prototype.constructor = DoneIteration;
DoneIteration.prototype.done = true;

Iterator.Iteration = Iteration;
Iterator.DoneIteration = DoneIteration;
Iterator.done = new DoneIteration();



/***/ }),

/***/ "./node_modules/mini-map/mini-map.js":
/*!*******************************************!*\
  !*** ./node_modules/mini-map/mini-map.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = MiniMap;
function MiniMap() {
    this.keys = [];
    this.values = [];
}

MiniMap.prototype.has = function (key) {
    var index = this.keys.indexOf(key);
    return index >= 0;
};

MiniMap.prototype.get = function (key) {
    var index = this.keys.indexOf(key);
    if (index >= 0) {
        return this.values[index];
    }
};

MiniMap.prototype.set = function (key, value) {
    var index = this.keys.indexOf(key);
    if (index < 0) {
        index = this.keys.length;
    }
    this.keys[index] = key;
    this.values[index] = value;
};

MiniMap.prototype["delete"] = function (key) {
    var index = this.keys.indexOf(key);
    if (index >= 0) {
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
    }
};

MiniMap.prototype.clear = function () {
    this.keys.length = 0;
    this.values.length = 0;
};



/***/ }),

/***/ "./node_modules/pop-clone/pop-clone.js":
/*!*********************************************!*\
  !*** ./node_modules/pop-clone/pop-clone.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var MiniMap = __webpack_require__(/*! mini-map */ "./node_modules/mini-map/mini-map.js");
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

/**
 * Creates a deep copy of any value.  Values, being immutable, are returned
 * without alternation.  Forwards to <code>clone</code> on objects and arrays.
 *
 * @function clone
 * @param {Any} value a value to clone
 * @param {Number} depth an optional traversal depth, defaults to infinity.  A
 * value of <code>0</code> means to make no clone and return the value
 * directly.
 * @param {Map} memo an optional memo of already visited objects to preserve
 * reference cycles.  The cloned object will have the exact same shape as the
 * original, but no identical objects.  Te map may be later used to associate
 * all objects in the original object graph with their corresponding member of
 * the cloned graph.
 * @returns a copy of the value
 */
module.exports = cloneOperator;
function cloneOperator(value, depth, memo) {
    if (value && value.valueOf) {
        value = value.valueOf();
    }
    if (depth == null) { // null or undefined
        depth = Infinity;
    } else if (depth === 0) {
        return value;
    }
    if (value && typeof value === "object") {
        memo = memo || new MiniMap();
        if (!memo.has(value)) {
            if (value && typeof value.clone === "function") {
                memo.set(value, value.clone(depth, memo));
            } else {
                var isArray = Array.isArray(value);
                var prototype = getPrototypeOf(value);
                if (
                    isArray ||
                    prototype === null ||
                    prototype === objectPrototype
                ) {
                    var clone = isArray ? [] : {};
                    memo.set(value, clone);
                    for (var key in value) {
                        clone[key] = cloneOperator(
                            value[key],
                            depth - 1,
                            memo
                        );
                    }
                } else {
                    throw new Error("Can't clone " + value);
                }
            }
        }
        return memo.get(value);
    }
    return value;
}



/***/ }),

/***/ "./node_modules/pop-compare/pop-compare.js":
/*!*************************************************!*\
  !*** ./node_modules/pop-compare/pop-compare.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
    Determines the order in which any two objects should be sorted by returning
    a number that has an analogous relationship to zero as the left value to
    the right.  That is, if the left is "less than" the right, the returned
    value will be "less than" zero, where "less than" may be any other
    transitive relationship.

    <p>Arrays are compared by the first diverging values, or by length.

    <p>Any two values that are incomparable return zero.  As such,
    <code>equals</code> should not be implemented with <code>compare</code>
    since incomparability is indistinguishable from equality.

    <p>Sorts strings lexicographically.  This is not suitable for any
    particular international setting.  Different locales sort their phone books
    in very different ways, particularly regarding diacritics and ligatures.

    <p>If the given object is an instance of a type that implements a method
    named "compare", this function defers to the instance.  The method does not
    need to be an owned property to distinguish it from an object literal since
    object literals are incomparable.  Unlike <code>Object</code> however,
    <code>Array</code> implements <code>compare</code>.

    @param {Any} left
    @param {Any} right
    @returns {Number} a value having the same transitive relationship to zero
    as the left and right values.
*/
module.exports = compare;
function compare(a, b, compare) {
    var difference;
    // unbox objects
    // mercifully handles the Date case
    if (a && typeof a.valueOf === "function") {
        a = a.valueOf();
    }
    if (b && typeof b.valueOf === "function") {
        b = b.valueOf();
    }
    // x !== x is only true if x is NaN. NaN is "incomparable" and both
    // equivalent and incomparable values always return 0.
    if (a === b || a !== a || b !== b)
        return 0;
    var aType = typeof a;
    var bType = typeof b;
    if (aType === "number" && bType === "number")
        return a - b;
    if (aType === "string" && bType === "string")
        return a < b ? -Infinity : Infinity;
        // the possibility of equality elimiated above
    compare = compare || module.exports;
    if (Array.isArray(a) && Array.isArray(b)) {
        for (var index in a) {
            if (!(index in b)) {
                return Infinity;
            } else {
                difference = compare(a[index], b[index], compare);
                if (difference) {
                    return difference;
                }
            }
        }
        for (var index in b) {
            if (!(index in a)) {
                return -Infinity;
            }
        }
        return a.length - b.length;
    }
    if (a && typeof a.compare === "function")
        return a.compare(b, compare);
    // not commutative, the relationship is reversed
    if (b && typeof b.compare === "function")
        return -b.compare(a, compare);
    return 0;
}



/***/ }),

/***/ "./node_modules/pop-equals/pop-equals.js":
/*!***********************************************!*\
  !*** ./node_modules/pop-equals/pop-equals.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MiniMap = __webpack_require__(/*! mini-map */ "./node_modules/mini-map/mini-map.js");
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

/**
    Performs a polymorphic, type-sensitive deep equivalence comparison of any
    two values.

    <p>As a basic principle, any value is equivalent to itself (as in
    identity), any boxed version of itself (as a <code>new Number(10)</code> is
    to 10), and any deep clone of itself.

    <p>Equivalence has the following properties:

    <ul>
        <li><strong>polymorphic:</strong>
            If the given object is an instance of a type that implements a
            methods named "equals", this function defers to the method.  So,
            this function can safely compare any values regardless of type,
            including undefined, null, numbers, strings, any pair of objects
            where either implements "equals", or object literals that may even
            contain an "equals" key.
        <li><strong>type-sensitive:</strong>
            Incomparable types are not equal.  No object is equivalent to any
            array.  No string is equal to any other number.
        <li><strong>deep:</strong>
            Collections with equivalent content are equivalent, recursively.
        <li><strong>equivalence:</strong>
            Identical values and objects are equivalent, but so are collections
            that contain equivalent content.  Whether order is important varies
            by type.  For Arrays and lists, order is important.  For Objects,
            maps, and sets, order is not important.  Boxed objects are mutally
            equivalent with their unboxed values, by virtue of the standard
            <code>valueOf</code> method.
    </ul>
    @param this
    @param that
    @returns {Boolean} whether the values are deeply equivalent
*/
module.exports = equals;
function equals(a, b, equals, memo) {
    equals = equals || module.exports;
    // unbox objects
    if (a && typeof a.valueOf === "function") {
        a = a.valueOf();
    }
    if (b && typeof b.valueOf === "function") {
        b = b.valueOf();
    }
    if (a === b)
        return true;
    // NaN !== NaN, but they are equal.
    // NaNs are the only non-reflexive value, i.e., if x !== x,
    // then x is a NaN.
    // isNaN is broken: it converts its argument to number, so
    // isNaN("foo") => true
    // We have established that a !== b, but if a !== a && b !== b, they are
    // both NaN.
    if (a !== a && b !== b)
        return true;
    if (!a || !b)
        return false;
    if (typeof a === "object") {
        memo = memo || new MiniMap();
        if (memo.has(a)) {
            return true;
        }
        memo.set(a, true);
    }
    if (typeof a.equals === "function") {
        return a.equals(b, equals, memo);
    }
    // commutative
    if (typeof b.equals === "function") {
        return b.equals(a, equals, memo);
    }
    if ((Array.isArray(a) || Array.isArray(b)) && a.length !== b.length) {
        return false;
    }
    if (typeof a === "object" && typeof b === "object") {
        if (
            getPrototypeOf(a) === objectPrototype &&
            getPrototypeOf(b) === objectPrototype ||
            Array.isArray(a) ||
            Array.isArray(b)
        ) {
            for (var name in a) {
                if (!equals(a[name], b[name], equals, memo)) {
                    return false;
                }
            }
            for (var name in b) {
                if (!(name in a)) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

// Because a return value of 0 from a `compare` function  may mean either
// "equals" or "is incomparable", `equals` cannot be defined in terms of
// `compare`.  However, `compare` *can* be defined in terms of `equals` and
// `lessThan`.  Again however, more often it would be desirable to implement
// all of the comparison functions in terms of compare rather than the other
// way around.



/***/ }),

/***/ "./node_modules/pop-observe/observable-array.js":
/*!******************************************************!*\
  !*** ./node_modules/pop-observe/observable-array.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Based in part on observable arrays from Motorola Mobility’s Montage
 * Copyright (c) 2012, Motorola Mobility LLC. All Rights Reserved.
 *
 * 3-Clause BSD License
 * https://github.com/motorola-mobility/montage/blob/master/LICENSE.md
 */

/**
 * This module is responsible for observing changes to owned properties of
 * objects and changes to the content of arrays caused by method calls. The
 * interface for observing array content changes establishes the methods
 * necessary for any collection with observable content.
 */

var Oo = __webpack_require__(/*! ./observable-object */ "./node_modules/pop-observe/observable-object.js");
var Or = __webpack_require__(/*! ./observable-range */ "./node_modules/pop-observe/observable-range.js");
var Om = __webpack_require__(/*! ./observable-map */ "./node_modules/pop-observe/observable-map.js");

var array_swap = __webpack_require__(/*! pop-swap/swap */ "./node_modules/pop-swap/swap.js");
var array_splice = Array.prototype.splice;
var array_slice = Array.prototype.slice;
var array_reverse = Array.prototype.reverse;
var array_sort = Array.prototype.sort;
var array_empty = [];

var observableArrayProperties = {

    swap: {
        value: function swap(start, minusLength, plus) {
            if (plus) {
                if (!Array.isArray(plus)) {
                    plus = array_slice.call(plus);
                }
            } else {
                plus = array_empty;
            }

            if (start < 0) {
                start = this.length + start;
            } else if (start > this.length) {
                var holes = start - this.length;
                var newPlus = Array(holes + plus.length);
                for (var i = 0, j = holes; i < plus.length; i++, j++) {
                    if (i in plus) {
                        newPlus[j] = plus[i];
                    }
                }
                plus = newPlus;
                start = this.length;
            }

            if (start + minusLength > this.length) {
                // Truncate minus length if it extends beyond the length
                minusLength = this.length - start;
            } else if (minusLength < 0) {
                // It is the JavaScript way.
                minusLength = 0;
            }

            var minus;
            if (minusLength === 0) {
                // minus will be empty
                if (plus.length === 0) {
                    // at this point if plus is empty there is nothing to do.
                    return []; // [], but spare us an instantiation
                }
                minus = array_empty;
            } else {
                minus = array_slice.call(this, start, start + minusLength);
            }

            var diff = plus.length - minus.length;
            var oldLength = this.length;
            var newLength = Math.max(this.length + diff, start + plus.length);
            var longest = Math.max(oldLength, newLength);
            var observedLength = Math.min(longest, this.observedLength);

            // dispatch before change events
            if (diff) {
                Oo.dispatchPropertyWillChange(this, "length", newLength, oldLength);
            }
            Or.dispatchRangeWillChange(this, plus, minus, start);
            if (diff === 0) {
                // Substring replacement
                for (var i = start, j = 0; i < start + plus.length; i++, j++) {
                    if (plus[j] !== minus[j]) {
                        Oo.dispatchPropertyWillChange(this, i, plus[j], minus[j]);
                        Om.dispatchMapWillChange(this, "update", i, plus[j], minus[j]);
                    }
                }
            } else {
                // All subsequent values changed or shifted.
                // Avoid (observedLength - start) long walks if there are no
                // registered descriptors.
                for (var i = start, j = 0; i < observedLength; i++, j++) {
                    if (i < oldLength && i < newLength) { // update
                        if (j < plus.length) {
                            if (plus[j] !== this[i]) {
                                Oo.dispatchPropertyWillChange(this, i, plus[j], this[i]);
                                Om.dispatchMapWillChange(this, "update", i, plus[j], this[i]);
                            }
                        } else {
                            if (this[i - diff] !== this[i]) {
                                Oo.dispatchPropertyWillChange(this, i, this[i - diff], this[i]);
                                Om.dispatchMapWillChange(this, "update", i, this[i - diff], this[i]);
                            }
                        }
                    } else if (i < newLength) { // but i >= oldLength, create
                        if (j < plus.length) {
                            if (plus[j] !== void 0) {
                                Oo.dispatchPropertyWillChange(this, i, plus[j]);
                            }
                            Om.dispatchMapWillChange(this, "create", i, plus[j]);
                        } else {
                            if (this[i - diff] !== void 0) {
                                Oo.dispatchPropertyWillChange(this, i, this[i - diff]);
                            }
                            Om.dispatchMapWillChange(this, "create", i, this[i - diff]);
                        }
                    } else if (i < oldLength) { // but i >= newLength, delete
                        if (this[i] !== void 0) {
                            Oo.dispatchPropertyWillChange(this, i, void 0, this[i]);
                        }
                        Om.dispatchMapWillChange(this, "delete", i, void 0, this[i]);
                    } else {
                        throw new Error("assertion error");
                    }
                }
            }

            // actual work
            array_swap(this, start, minusLength, plus);

            // dispatch after change events
            if (diff === 0) { // substring replacement
                for (var i = start, j = 0; i < start + plus.length; i++, j++) {
                    if (plus[j] !== minus[j]) {
                        Oo.dispatchPropertyChange(this, i, plus[j], minus[j]);
                        Om.dispatchMapChange(this, "update", i, plus[j], minus[j]);
                    }
                }
            } else {
                // All subsequent values changed or shifted.
                // Avoid (observedLength - start) long walks if there are no
                // registered descriptors.
                for (var i = start, j = 0; i < observedLength; i++, j++) {
                    if (i < oldLength && i < newLength) { // update
                        if (j < minus.length) {
                            if (this[i] !== minus[j]) {
                                Oo.dispatchPropertyChange(this, i, this[i], minus[j]);
                                Om.dispatchMapChange(this, "update", i, this[i], minus[j]);
                            }
                        } else {
                            if (this[i] !== this[i + diff]) {
                                Oo.dispatchPropertyChange(this, i, this[i], this[i + diff]);
                                Om.dispatchMapChange(this, "update", i, this[i], this[i + diff]);
                            }
                        }
                    } else if (i < newLength) { // but i >= oldLength, create
                        if (j < minus.length) {
                            if (this[i] !== minus[j]) {
                                Oo.dispatchPropertyChange(this, i, this[i], minus[j]);
                            }
                            Om.dispatchMapChange(this, "create", i, this[i], minus[j]);
                        } else {
                            if (this[i] !== this[i + diff]) {
                                Oo.dispatchPropertyChange(this, i, this[i], this[i + diff]);
                            }
                            Om.dispatchMapChange(this, "create", i, this[i], this[i + diff]);
                        }
                    } else if (i < oldLength) { // but i >= newLength, delete
                        if (j < minus.length) {
                            if (minus[j] !== void 0) {
                                Oo.dispatchPropertyChange(this, i, void 0, minus[j]);
                            }
                            Om.dispatchMapChange(this, "delete", i, void 0, minus[j]);
                        } else {
                            if (this[i + diff] !== void 0) {
                                Oo.dispatchPropertyChange(this, i, void 0, this[i + diff]);
                            }
                            Om.dispatchMapChange(this, "delete", i, void 0, this[i + diff]);
                        }
                    } else {
                        throw new Error("assertion error");
                    }
                }
            }

            Or.dispatchRangeChange(this, plus, minus, start);
            if (diff) {
                Oo.dispatchPropertyChange(this, "length", newLength, oldLength);
            }
        },
        writable: true,
        configurable: true
    },

    splice: {
        value: function splice(start, minusLength) {
            if (start > this.length) {
                start = this.length;
            }
            var result = this.slice(start, start + minusLength);
            this.swap.call(this, start, minusLength, array_slice.call(arguments, 2));
            return result;
        },
        writable: true,
        configurable: true
    },

    // splice is the array content change utility belt.  forward all other
    // content changes to splice so we only have to write observer code in one
    // place

    reverse: {
        value: function reverse() {
            var reversed = this.slice();
            reversed.reverse();
            this.swap(0, this.length, reversed);
            return this;
        },
        writable: true,
        configurable: true
    },

    sort: {
        value: function sort() {
            var sorted = this.slice();
            array_sort.apply(sorted, arguments);
            this.swap(0, this.length, sorted);
            return this;
        },
        writable: true,
        configurable: true
    },

    set: {
        value: function set(index, value) {
            this.swap(index, index >= this.length ? 0 : 1, [value]);
            return true;
        },
        writable: true,
        configurable: true
    },

    shift: {
        value: function shift() {
            if (this.length) {
                var result = this[0];
                this.swap(0, 1);
                return result;
            }
        },
        writable: true,
        configurable: true
    },

    pop: {
        value: function pop() {
            if (this.length) {
                var result = this[this.length - 1];
                this.swap(this.length - 1, 1);
                return result;
            }
        },
        writable: true,
        configurable: true
    },

    push: {
        value: function push(value) {
            this.swap(this.length, 0, arguments);
            return this.length;
        },
        writable: true,
        configurable: true
    },

    unshift: {
        value: function unshift(value) {
            this.swap(0, 0, arguments);
            return this.length;
        },
        writable: true,
        configurable: true
    },

    clear: {
        value: function clear() {
            this.swap(0, this.length);
        },
        writable: true,
        configurable: true
    }

};

var hiddenProperty = {
    value: null,
    enumerable: false,
    writable: true,
    configurable: true
};

var observableArrayOwnProperties = {
    observed: hiddenProperty,
    observedLength: hiddenProperty,

    propertyObservers: hiddenProperty,
    wrappedPropertyDescriptors: hiddenProperty,

    rangeChangeObservers: hiddenProperty,
    rangeWillChangeObservers: hiddenProperty,
    dispatchesRangeChanges: hiddenProperty,

    mapChangeObservers: hiddenProperty,
    mapWillChangeObservers: hiddenProperty,
    dispatchesMapChanges: hiddenProperty
};

// use different strategies for making arrays observable between Internet
// Explorer and other browsers.
var protoIsSupported = {}.__proto__ === Object.prototype;
var bestowObservableArrayProperties;
if (protoIsSupported) {
    var observableArrayPrototype = Object.create(Array.prototype, observableArrayProperties);
    bestowObservableArrayProperties = function (array) {
        array.__proto__ = observableArrayPrototype;
    };
} else {
    bestowObservableArrayProperties = function (array) {
        Object.defineProperties(array, observableArrayProperties);
    };
}

exports.makeArrayObservable = makeArrayObservable;
function makeArrayObservable(array) {
    if (array.observed) {
        return;
    }
    bestowObservableArrayProperties(array);
    Object.defineProperties(array, observableArrayOwnProperties);
    array.observedLength = 0;
    array.observed = true;
}

// For ObservableObject
exports.makePropertyObservable = makePropertyObservable;
function makePropertyObservable(array, index) {
    makeArrayObservable(array);
    if (~~index === index && index >= 0) { // Note: NaN !== NaN, ~~"foo" !== "foo"
        makeIndexObservable(array, index);
    }
}

// For ObservableRange
exports.makeRangeChangesObservable = makeRangeChangesObservable;
function makeRangeChangesObservable(array) {
    makeArrayObservable(array);
}

// For ObservableMap
exports.makeMapChangesObservable = makeMapChangesObservable;
function makeMapChangesObservable(array) {
    makeArrayObservable(array);
    makeIndexObservable(array, Infinity);
}

function makeIndexObservable(array, index) {
    if (index >= array.observedLength) {
        array.observedLength = index + 1;
    }
}



/***/ }),

/***/ "./node_modules/pop-observe/observable-map.js":
/*!****************************************************!*\
  !*** ./node_modules/pop-observe/observable-map.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var observerFreeList = [];
var observerToFreeList = [];
var dispatching = false;

module.exports = ObservableMap;
function ObservableMap() {
    throw new Error("Can't construct. ObservableMap is a mixin.");
}

ObservableMap.prototype.observeMapChange = function (handler, name, note, capture) {
    return observeMapChange(this, handler, name, note, capture);
};

ObservableMap.prototype.observeMapWillChange = function (handler, name, note) {
    return observeMapChange(this, handler, name, note, true);
};

ObservableMap.prototype.dispatchMapChange = function (type, key, plus, minus, capture) {
    return dispatchMapChange(this, type, key, plus, minus, capture);
};

ObservableMap.prototype.dispatchMapWillChange = function (type, key, plus, minus) {
    return dispatchMapWillChange(this, type, key, plus, minus, true);
};

ObservableMap.prototype.getMapChangeObservers = function (capture) {
    return getMapChangeObservers(this, capture);
};

ObservableMap.prototype.getMapWillChangeObservers = function () {
    return getMapChangeObservers(this, true);
};

ObservableMap.observeMapChange = observeMapChange;
function observeMapChange(object, handler, name, note, capture) {
    makeMapChangesObservable(object);
    var observers = getMapChangeObservers(object, capture);

    var observer;
    if (observerFreeList.length) { // TODO !debug?
        observer = observerFreeList.pop();
    } else {
        observer = new MapChangeObserver();
    }

    observer.object = object;
    observer.name = name;
    observer.capture = capture;
    observer.observers = observers;
    observer.handler = handler;
    observer.note = note;

    // Precompute dispatch method name

    var stringName = "" + name; // Array indicides must be coerced to string.
    var propertyName = stringName.slice(0, 1).toUpperCase() + stringName.slice(1);

    if (!capture) {
        var methodName = "handle" + propertyName + "MapChange";
        if (handler[methodName]) {
            observer.handlerMethodName = methodName;
        } else if (handler.handleMapChange) {
            observer.handlerMethodName = "handleMapChange";
        } else if (handler.call) {
            observer.handlerMethodName = null;
        } else {
            throw new Error("Can't arrange to dispatch map changes to " + handler);
        }
    } else {
        var methodName = "handle" + propertyName + "MapWillChange";
        if (handler[methodName]) {
            observer.handlerMethodName = methodName;
        } else if (handler.handleMapWillChange) {
            observer.handlerMethodName = "handleMapWillChange";
        } else if (handler.call) {
            observer.handlerMethodName = null;
        } else {
            throw new Error("Can't arrange to dispatch map changes to " + handler);
        }
    }

    observers.push(observer);

    // TODO issue warning if the number of handler records is worrisome
    return observer;
}

ObservableMap.observeMapWillChange = observeMapWillChange;
function observeMapWillChange(object, handler, name, note) {
    return observeMapChange(object, handler, name, note, true);
}

ObservableMap.dispatchMapChange = dispatchMapChange;
function dispatchMapChange(object, type, key, plus, minus, capture) {
    if (plus === minus) {
        return;
    }
    if (!dispatching) { // TODO && !debug?
        return startMapChangeDispatchContext(object, type, key, plus, minus, capture);
    }
    var observers = getMapChangeObservers(object, capture);
    for (var index = 0; index < observers.length; index++) {
        var observer = observers[index];
        observer.dispatch(type, key, plus, minus);
    }
}

ObservableMap.dispatchMapWillChange = dispatchMapWillChange;
function dispatchMapWillChange(object, type, key, plus, minus) {
    return dispatchMapChange(object, type, key, plus, minus, true);
}

function startMapChangeDispatchContext(object, type, key, plus, minus, capture) {
    dispatching = true;
    try {
        dispatchMapChange(object, type, key, plus, minus, capture);
    } catch (error) {
        if (typeof error === "object" && typeof error.message === "string") {
            error.message = "Map change dispatch possibly corrupted by error: " + error.message;
            throw error;
        } else {
            throw new Error("Map change dispatch possibly corrupted by error: " + error);
        }
    } finally {
        dispatching = false;
        if (observerToFreeList.length) {
            // Using push.apply instead of addEach because push will definitely
            // be much faster than the generic addEach, which also handles
            // non-array collections.
            observerFreeList.push.apply(
                observerFreeList,
                observerToFreeList
            );
            // Using clear because it is observable. The handler record array
            // is obtainable by getPropertyChangeObservers, and is observable.
            observerToFreeList.clear();
        }
    }
}

function getMapChangeObservers(object, capture) {
    if (capture) {
        if (!object.mapWillChangeObservers) {
            object.mapWillChangeObservers = [];
        }
        return object.mapWillChangeObservers;
    } else {
        if (!object.mapChangeObservers) {
            object.mapChangeObservers = [];
        }
        return object.mapChangeObservers;
    }
}

function getMapWillChangeObservers(object) {
    return getMapChangeObservers(object, true);
}

function makeMapChangesObservable(object) {
    if (Array.isArray(object)) {
        Oa.makeMapChangesObservable(object);
    }
    if (object.makeMapChangesObservable) {
        object.makeMapChangesObservable();
    }
    object.dispatchesMapChanges = true;
}

function MapChangeObserver() {
    this.init();
}

MapChangeObserver.prototype.init = function () {
    this.object = null;
    this.name = null;
    this.observers = null;
    this.handler = null;
    this.handlerMethodName = null;
    this.childObserver = null;
    this.note = null;
    this.capture = null;
};

MapChangeObserver.prototype.cancel = function () {
    var observers = this.observers;
    var index = observers.indexOf(this);
    // Unfortunately, if this observer was reused, this would not be sufficient
    // to detect a duplicate cancel. Do not cancel more than once.
    if (index < 0) {
        throw new Error(
            "Can't cancel observer for " +
            JSON.stringify(this.name) + " map changes" +
            " because it has already been canceled"
        );
    }
    var childObserver = this.childObserver;
    observers.splice(index, 1);
    this.init();
    // If this observer is canceled while dispatching a change
    // notification for the same property...
    // 1. We cannot put the handler record onto the free list because
    // it may have been captured in the array of records to which
    // the change notification would be sent. We must mark it as
    // canceled by nulling out the handler property so the dispatcher
    // passes over it.
    // 2. We also cannot put the handler record onto the free list
    // until all change dispatches have been completed because it could
    // conceivably be reused, confusing the current dispatcher.
    if (dispatching) {
        // All handlers added to this list will be moved over to the
        // actual free list when there are no longer any property
        // change dispatchers on the stack.
        observerToFreeList.push(this);
    } else {
        observerFreeList.push(this);
    }
    if (childObserver) {
        // Calling user code on our stack.
        // Done in tail position to avoid a plan interference hazard.
        childObserver.cancel();
    }
};

MapChangeObserver.prototype.dispatch = function (type, key, plus, minus) {
    var handler = this.handler;
    // A null handler implies that an observer was canceled during the dispatch
    // of a change. The observer is pending addition to the free list.
    if (!handler) {
        return;
    }

    var childObserver = this.childObserver;
    this.childObserver = null;
    // XXX plan interference hazards calling cancel and handler methods:
    if (childObserver) {
        childObserver.cancel();
    }

    var handlerMethodName = this.handlerMethodName;
    if (handlerMethodName && typeof handler[handlerMethodName] === "function") {
        childObserver = handler[handlerMethodName](plus, minus, key, type, this.object);
    } else if (handler.call) {
        childObserver = handler.call(void 0, plus, minus, key, type, this.object);
    } else {
        throw new Error(
            "Can't dispatch map change for " + JSON.stringify(this.name) + " to " + handler +
            " because there is no handler method"
        );
    }

    this.childObserver = childObserver;
    return this;
};

var Oa = __webpack_require__(/*! ./observable-array */ "./node_modules/pop-observe/observable-array.js");


/***/ }),

/***/ "./node_modules/pop-observe/observable-object.js":
/*!*******************************************************!*\
  !*** ./node_modules/pop-observe/observable-object.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jshint node: true*/


// XXX Note: exceptions thrown from handlers and handler cancelers may
// interfere with dispatching to subsequent handlers of any change in progress.
// It is unlikely that plans are recoverable once an exception interferes with
// change dispatch. The internal records should not be corrupt, but observers
// might miss an intermediate property change.

var owns = Object.prototype.hasOwnProperty;

var observerFreeList = [];
var observerToFreeList = [];
var dispatching = false;

// Reusable property descriptor
var hiddenValueProperty = {
    value: null,
    writable: true,
    enumerable: false,
    configurable: true
};

module.exports = ObservableObject;
function ObservableObject() {
    throw new Error("Can't construct. ObservableObject is a mixin.");
}

ObservableObject.prototype.observePropertyChange = function (name, handler, note, capture) {
    return observePropertyChange(this, name, handler, note, capture);
};

ObservableObject.prototype.observePropertyWillChange = function (name, handler, note) {
    return observePropertyWillChange(this, name, handler, note);
};

ObservableObject.prototype.dispatchPropertyChange = function (name, plus, minus, capture) {
    return dispatchPropertyChange(this, name, plus, minus, capture);
};

ObservableObject.prototype.dispatchPropertyWillChange = function (name, plus, minus) {
    return dispatchPropertyWillChange(this, name, plus, minus);
};

ObservableObject.prototype.getPropertyChangeObservers = function (name, capture) {
    return getPropertyChangeObservers(this, name, capture);
};

ObservableObject.prototype.getPropertyWillChangeObservers = function (name) {
    return getPropertyWillChangeObservers(this, name);
};

ObservableObject.prototype.makePropertyObservable = function (name) {
    return makePropertyObservable(this, name);
};

ObservableObject.prototype.preventPropertyObserver = function (name) {
    return preventPropertyObserver(this, name);
};

ObservableObject.prototype.PropertyChangeObserver = PropertyChangeObserver;

// Constructor interface with polymorphic delegation if available

ObservableObject.observePropertyChange = function (object, name, handler, note, capture) {
    if (object.observePropertyChange) {
        return object.observePropertyChange(name, handler, note, capture);
    } else {
        return observePropertyChange(object, name, handler, note, capture);
    }
};

ObservableObject.observePropertyWillChange = function (object, name, handler, note) {
    if (object.observePropertyWillChange) {
        return object.observePropertyWillChange(name, handler, note);
    } else {
        return observePropertyWillChange(object, name, handler, note);
    }
};

ObservableObject.dispatchPropertyChange = function (object, name, plus, minus, capture) {
    if (object.dispatchPropertyChange) {
        return object.dispatchPropertyChange(name, plus, minus, capture);
    } else {
        return dispatchPropertyChange(object, name, plus, minus, capture);
    }
};

ObservableObject.dispatchPropertyWillChange = function (object, name, plus, minus) {
    if (object.dispatchPropertyWillChange) {
        return object.dispatchPropertyWillChange(name, plus, minus);
    } else {
        return dispatchPropertyWillChange(object, name, plus, minus);
    }
};

ObservableObject.makePropertyObservable = function (object, name) {
    if (object.makePropertyObservable) {
        return object.makePropertyObservable(name);
    } else {
        return makePropertyObservable(object, name);
    }
};

ObservableObject.preventPropertyObserver = function (object, name) {
    if (object.preventPropertyObserver) {
        return object.preventPropertyObserver(name);
    } else {
        return preventPropertyObserver(object, name);
    }
};

// Implementation

function observePropertyChange(object, name, handler, note, capture) {
    ObservableObject.makePropertyObservable(object, name);
    var observers = getPropertyChangeObservers(object, name, capture);

    var observer;
    if (observerFreeList.length) { // TODO && !debug?
        observer = observerFreeList.pop();
    } else {
        observer = new PropertyChangeObserver();
    }

    observer.object = object;
    observer.propertyName = name;
    observer.capture = capture;
    observer.observers = observers;
    observer.handler = handler;
    observer.note = note;
    observer.value = object[name];

    // Precompute dispatch method names.

    var stringName = "" + name; // Array indicides must be coerced to string.
    var propertyName = stringName.slice(0, 1).toUpperCase() + stringName.slice(1);

    if (!capture) {
        var specificChangeMethodName = "handle" + propertyName + "PropertyChange";
        var genericChangeMethodName = "handlePropertyChange";
        if (handler[specificChangeMethodName]) {
            observer.handlerMethodName = specificChangeMethodName;
        } else if (handler[genericChangeMethodName]) {
            observer.handlerMethodName = genericChangeMethodName;
        } else if (handler.call) {
            observer.handlerMethodName = null;
        } else {
            throw new Error("Can't arrange to dispatch " + JSON.stringify(name) + " property changes on " + object);
        }
    } else {
        var specificWillChangeMethodName = "handle" + propertyName + "PropertyWillChange";
        var genericWillChangeMethodName = "handlePropertyWillChange";
        if (handler[specificWillChangeMethodName]) {
            observer.handlerMethodName = specificWillChangeMethodName;
        } else if (handler[genericWillChangeMethodName]) {
            observer.handlerMethodName = genericWillChangeMethodName;
        } else if (handler.call) {
            observer.handlerMethodName = null;
        } else {
            throw new Error("Can't arrange to dispatch " + JSON.stringify(name) + " property changes on " + object);
        }
    }

    observers.push(observer);

    // TODO issue warnings if the number of handler records exceeds some
    // concerning quantity as a harbinger of a memory leak.
    // TODO Note that if this is garbage collected without ever being called,
    // it probably indicates a programming error.
    return observer;
}

function observePropertyWillChange(object, name, handler, note) {
    return observePropertyChange(object, name, handler, note, true);
}

function dispatchPropertyChange(object, name, plus, minus, capture) {
    if (!dispatching) { // TODO && !debug?
        return startPropertyChangeDispatchContext(object, name, plus, minus, capture);
    }
    var observers = getPropertyChangeObservers(object, name, capture).slice();
    for (var index = 0; index < observers.length; index++) {
        var observer = observers[index];
        observer.dispatch(plus, minus);
    }
}

function dispatchPropertyWillChange(object, name, plus, minus) {
    dispatchPropertyChange(object, name, plus, minus, true);
}

function startPropertyChangeDispatchContext(object, name, plus, minus, capture) {
    dispatching = true;
    try {
        dispatchPropertyChange(object, name, plus, minus, capture);
    } catch (error) {
        if (typeof error === "object" && typeof error.message === "string") {
            error.message = "Property change dispatch possibly corrupted by error: " + error.message;
            throw error;
        } else {
            throw new Error("Property change dispatch possibly corrupted by error: " + error);
        }
    } finally {
        dispatching = false;
        if (observerToFreeList.length) {
            // Using push.apply instead of addEach because push will definitely
            // be much faster than the generic addEach, which also handles
            // non-array collections.
            observerFreeList.push.apply(
                observerFreeList,
                observerToFreeList
            );
            // Using clear because it is observable. The handler record array
            // is obtainable by getPropertyChangeObservers, and is observable.
            observerToFreeList.length = 0;
        }
    }
}

function getPropertyChangeObservers(object, name, capture) {
    if (!object.propertyObservers) {
        hiddenValueProperty.value = Object.create(null);
        Object.defineProperty(object, "propertyObservers", hiddenValueProperty);
    }
    var observersByKey = object.propertyObservers;
    var phase = capture ? "WillChange" : "Change";
    var key = name + phase;
    if (!Object.prototype.hasOwnProperty.call(observersByKey, key)) {
        observersByKey[key] = [];
    }
    return observersByKey[key];
}

function getPropertyWillChangeObservers(object, name) {
    return getPropertyChangeObservers(object, name, true);
}

function PropertyChangeObserver() {
    this.init();
    // Object.seal(this); // Maybe one day, this won't deoptimize.
}

PropertyChangeObserver.prototype.init = function () {
    this.object = null;
    this.propertyName = null;
    // Peer observers, from which to pluck itself upon cancelation.
    this.observers = null;
    // On which to dispatch property change notifications.
    this.handler = null;
    // Precomputed handler method name for change dispatch
    this.handlerMethodName = null;
    // Returned by the last property change notification, which must be
    // canceled before the next change notification, or when this observer is
    // finally canceled.
    this.childObserver = null;
    // For the discretionary use of the user, perhaps to track why this
    // observer has been created, or whether this observer should be
    // serialized.
    this.note = null;
    // Whether this observer dispatches before a change occurs, or after
    this.capture = null;
    // The last known value
    this.value = null;
};

PropertyChangeObserver.prototype.cancel = function () {
    var observers = this.observers;
    var index = observers.indexOf(this);
    // Unfortunately, if this observer was reused, this would not be sufficient
    // to detect a duplicate cancel. Do not cancel more than once.
    if (index < 0) {
        throw new Error(
            "Can't cancel observer for " +
            JSON.stringify(this.propertyName) + " on " + this.object +
            " because it has already been canceled"
        );
    }
    var childObserver = this.childObserver;
    observers.splice(index, 1);
    this.init();
    // If this observer is canceled while dispatching a change
    // notification for the same property...
    // 1. We cannot put the handler record onto the free list because
    // it may have been captured in the array of records to which
    // the change notification would be sent. We must mark it as
    // canceled by nulling out the handler property so the dispatcher
    // passes over it.
    // 2. We also cannot put the handler record onto the free list
    // until all change dispatches have been completed because it could
    // conceivably be reused, confusing the current dispatcher.
    if (dispatching) {
        // All handlers added to this list will be moved over to the
        // actual free list when there are no longer any property
        // change dispatchers on the stack.
        observerToFreeList.push(this);
    } else {
        observerFreeList.push(this);
    }
    if (childObserver) {
        // Calling user code on our stack.
        // Done in tail position to avoid a plan interference hazard.
        childObserver.cancel();
    }
};

PropertyChangeObserver.prototype.dispatch = function (plus, minus) {
    var handler = this.handler;
    // A null handler implies that an observer was canceled during the dispatch
    // of a change. The observer is pending addition to the free list.
    if (!handler) {
        return;
    }

    if (minus === void 0) {
        minus = this.value;
    }
    this.value = plus;

    var childObserver = this.childObserver;
    this.childObserver = null;
    // XXX plan interference hazards calling cancel and handler methods:
    if (childObserver) {
        childObserver.cancel();
    }
    var handlerMethodName = this.handlerMethodName;
    if (handlerMethodName && typeof handler[handlerMethodName] === "function") {
        childObserver = handler[handlerMethodName](plus, minus, this.propertyName, this.object);
    } else if (handler.call) {
        childObserver = handler.call(void 0, plus, minus, this.propertyName, this.object);
    } else {
        throw new Error(
            "Can't dispatch " + JSON.stringify(handlerMethodName) + " property change on " + object +
            " because there is no handler method"
        );
    }

    this.childObserver = childObserver;
    return this;
};

function makePropertyObservable(object, name) {
    if (Array.isArray(object)) {
        return Oa.makePropertyObservable(object, name);
    }

    var wrappedDescriptor = wrapPropertyDescriptor(object, name);

    if (!wrappedDescriptor) {
        return;
    }

    var thunk;
    // in both of these new descriptor variants, we reuse the wrapped
    // descriptor to either store the current value or apply getters
    // and setters. this is handy since we can reuse the wrapped
    // descriptor if we uninstall the observer. We even preserve the
    // assignment semantics, where we get the value from up the
    // prototype chain, and set as an owned property.
    if ("value" in wrappedDescriptor) {
        thunk = makeValuePropertyThunk(name, wrappedDescriptor);
    } else { // "get" or "set", but not necessarily both
        thunk = makeGetSetPropertyThunk(name, wrappedDescriptor);
    }

    Object.defineProperty(object, name, thunk);
}

/**
 * Prevents a thunk from being installed on a property, assuming that the
 * underlying type will dispatch the change manually, or intends the property
 * to stick on all instances.
 */
function preventPropertyObserver(object, name) {
    var wrappedDescriptor = wrapPropertyDescriptor(object, name);
    Object.defineProperty(object, name, wrappedDescriptor);
}

function wrapPropertyDescriptor(object, name) {
    // Arrays are special. We do not support direct setting of properties
    // on an array. instead, call .set(index, value). This is observable.
    // "length" property is observable for all mutating methods because
    // our overrides explicitly dispatch that change.
    if (Array.isArray(object)) {
        return;
    }

    if (!Object.isExtensible(object, name)) {
        return;
    }

    var wrappedDescriptor = getPropertyDescriptor(object, name);
    var wrappedPrototype = wrappedDescriptor.prototype;

    var existingWrappedDescriptors = wrappedPrototype.wrappedPropertyDescriptors;
    if (existingWrappedDescriptors && owns.call(existingWrappedDescriptors, name)) {
        return;
    }

    var wrappedPropertyDescriptors = object.wrappedPropertyDescriptors;
    if (!wrappedPropertyDescriptors) {
        wrappedPropertyDescriptors = {};
        hiddenValueProperty.value = wrappedPropertyDescriptors;
        Object.defineProperty(object, "wrappedPropertyDescriptors", hiddenValueProperty);
    }

    if (owns.call(wrappedPropertyDescriptors, name)) {
        // If we have already recorded a wrapped property descriptor,
        // we have already installed the observer, so short-here.
        return;
    }

    if (!wrappedDescriptor.configurable) {
        return;
    }

    // Memoize the descriptor so we know not to install another layer. We
    // could use it to uninstall the observer, but we do not to avoid GC
    // thrashing.
    wrappedPropertyDescriptors[name] = wrappedDescriptor;

    // Give up *after* storing the wrapped property descriptor so it
    // can be restored by uninstall. Unwritable properties are
    // silently not overriden. Since success is indistinguishable from
    // failure, we let it pass but don't waste time on intercepting
    // get/set.
    if (!wrappedDescriptor.writable && !wrappedDescriptor.set) {
        return;
    }

    // If there is no setter, it is not mutable, and observing is moot.
    // Manual dispatch may still apply.
    if (wrappedDescriptor.get && !wrappedDescriptor.set) {
        return;
    }

    return wrappedDescriptor;
}

function getPropertyDescriptor(object, name) {
    // walk up the prototype chain to find a property descriptor for the
    // property name.
    var descriptor;
    var prototype = object;
    do {
        descriptor = Object.getOwnPropertyDescriptor(prototype, name);
        if (descriptor) {
            break;
        }
        prototype = Object.getPrototypeOf(prototype);
    } while (prototype);
    if (descriptor) {
        descriptor.prototype = prototype;
        return descriptor;
    } else {
        // or default to an undefined value
        return {
            prototype: object,
            value: undefined,
            enumerable: false,
            writable: true,
            configurable: true
        };
    }
}

function makeValuePropertyThunk(name, wrappedDescriptor) {
    return {
        get: function () {
            // Uses __this__ to quickly distinguish __state__ properties from
            // upward in the prototype chain.
            if (this.__state__ === void 0 || this.__state__.__this__ !== this) {
                initState(this);
            }
            var state = this.__state__;

            if (!(name in state)) {
                // Get the initial value from up the prototype chain
                state[name] = wrappedDescriptor.value;
            }

            return state[name];
        },
        set: function (plus) {
            // Uses __this__ to quickly distinguish __state__ properties from
            // upward in the prototype chain.
            if (this.__state__ === void 0 || this.__state__.__this__ !== this) {
                initState(this);
                this.__state__[name] = this[name];
            }
            var state = this.__state__;

            if (!(name in state)) {
                // Get the initial value from up the prototype chain
                state[name] = wrappedDescriptor.value;
            }

            if (plus === state[name]) {
                return plus;
            }

            // XXX plan interference hazard:
            dispatchPropertyWillChange(this, name, plus);

            wrappedDescriptor.value = plus;
            state[name] = plus;

            // XXX plan interference hazard:
            dispatchPropertyChange(this, name, plus);

            return plus;
        },
        enumerable: wrappedDescriptor.enumerable,
        configurable: true
    };
}

function makeGetSetPropertyThunk(name, wrappedDescriptor) {
    return {
        get: function () {
            if (wrappedDescriptor.get) {
                return wrappedDescriptor.get.apply(this, arguments);
            }
        },
        set: function (plus) {
            // Uses __this__ to quickly distinguish __state__ properties from
            // upward in the prototype chain.
            if (this.__state__ === void 0 || this.__state__.__this__ !== this) {
                initState(this);
                this.__state__[name] = this[name];
            }
            var state = this.__state__;

            if (state[name] === plus) {
                return plus;
            }

            // XXX plan interference hazard:
            dispatchPropertyWillChange(this, name, plus);

            // call through to actual setter
            if (wrappedDescriptor.set) {
                wrappedDescriptor.set.apply(this, arguments);
                state[name] = plus;
            }

            // use getter, if possible, to adjust the plus value if the setter
            // adjusted it, for example a setter for an array property that
            // retains the original array and replaces its content, or a setter
            // that coerces the value to an expected type.
            if (wrappedDescriptor.get) {
                plus = wrappedDescriptor.get.apply(this, arguments);
            }

            // dispatch the new value: the given value if there is
            // no getter, or the actual value if there is one
            // TODO spec
            // XXX plan interference hazard:
            dispatchPropertyChange(this, name, plus);

            return plus;
        },
        enumerable: wrappedDescriptor.enumerable,
        configurable: true
    };
}

function initState(object) {
    Object.defineProperty(object, "__state__", {
        value: {
            __this__: object
        },
        writable: true,
        enumerable: false,
        configurable: true
    });
}

var Oa = __webpack_require__(/*! ./observable-array */ "./node_modules/pop-observe/observable-array.js");


/***/ }),

/***/ "./node_modules/pop-observe/observable-range.js":
/*!******************************************************!*\
  !*** ./node_modules/pop-observe/observable-range.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global -WeakMap*/


// TODO review all error messages for consistency and helpfulness across observables

var observerFreeList = [];
var observerToFreeList = [];
var dispatching = false;

module.exports = ObservableRange;
function ObservableRange() {
    throw new Error("Can't construct. ObservableRange is a mixin.");
}

ObservableRange.prototype.observeRangeChange = function (handler, name, note, capture) {
    return observeRangeChange(this, handler, name, note, capture);
};

ObservableRange.prototype.observeRangeWillChange = function (handler, name, note) {
    return observeRangeChange(this, handler, name, note, true);
};

ObservableRange.prototype.dispatchRangeChange = function (plus, minus, index, capture) {
    return dispatchRangeChange(this, plus, minus, index, capture);
};

ObservableRange.prototype.dispatchRangeWillChange = function (plus, minus, index) {
    return dispatchRangeChange(this, plus, minus, index, true);
};

ObservableRange.prototype.getRangeChangeObservers = function (capture) {
};

ObservableRange.prototype.getRangeWillChangeObservers = function () {
    return getRangeChangeObservers(this, true);
};

ObservableRange.observeRangeChange = observeRangeChange;
function observeRangeChange(object, handler, name, note, capture) {
    makeRangeChangesObservable(object);
    var observers = getRangeChangeObservers(object, capture);

    var observer;
    if (observerFreeList.length) { // TODO !debug?
        observer = observerFreeList.pop();
    } else {
        observer = new RangeChangeObserver();
    }

    observer.object = object;
    observer.name = name;
    observer.capture = capture;
    observer.observers = observers;
    observer.handler = handler;
    observer.note = note;

    // Precompute dispatch method name

    var stringName = "" + name; // Array indicides must be coerced to string.
    var propertyName = stringName.slice(0, 1).toUpperCase() + stringName.slice(1);

    if (!capture) {
        var methodName = "handle" + propertyName + "RangeChange";
        if (handler[methodName]) {
            observer.handlerMethodName = methodName;
        } else if (handler.handleRangeChange) {
            observer.handlerMethodName = "handleRangeChange";
        } else if (handler.call) {
            observer.handlerMethodName = null;
        } else {
            throw new Error("Can't arrange to dispatch " + JSON.stringify(name) + " map changes");
        }
    } else {
        var methodName = "handle" + propertyName + "RangeWillChange";
        if (handler[methodName]) {
            observer.handlerMethodName = methodName;
        } else if (handler.handleRangeWillChange) {
            observer.handlerMethodName = "handleRangeWillChange";
        } else if (handler.call) {
            observer.handlerMethodName = null;
        } else {
            throw new Error("Can't arrange to dispatch " + JSON.stringify(name) + " map changes");
        }
    }

    observers.push(observer);

    // TODO issue warning if the number of handler records is worrisome
    return observer;
}

ObservableRange.observeRangeWillChange = observeRangeWillChange;
function observeRangeWillChange(object, handler, name, note) {
    return observeRangeChange(object, handler, name, note, true);
}

ObservableRange.dispatchRangeChange = dispatchRangeChange;
function dispatchRangeChange(object, plus, minus, index, capture) {
    if (!dispatching) { // TODO && !debug?
        return startRangeChangeDispatchContext(object, plus, minus, index, capture);
    }
    var observers = getRangeChangeObservers(object, capture);
    for (var observerIndex = 0; observerIndex < observers.length; observerIndex++) {
        var observer = observers[observerIndex];
        // The slicing ensures that handlers cannot interfere with another by
        // altering these arguments.
        observer.dispatch(plus.slice(), minus.slice(), index);
    }
}

ObservableRange.dispatchRangeWillChange = dispatchRangeWillChange;
function dispatchRangeWillChange(object, plus, minus, index) {
    return dispatchRangeChange(object, plus, minus, index, true);
}

function startRangeChangeDispatchContext(object, plus, minus, index, capture) {
    dispatching = true;
    try {
        dispatchRangeChange(object, plus, minus, index, capture);
    } catch (error) {
        if (typeof error === "object" && typeof error.message === "string") {
            error.message = "Range change dispatch possibly corrupted by error: " + error.message;
            throw error;
        } else {
            throw new Error("Range change dispatch possibly corrupted by error: " + error);
        }
    } finally {
        dispatching = false;
        if (observerToFreeList.length) {
            // Using push.apply instead of addEach because push will definitely
            // be much faster than the generic addEach, which also handles
            // non-array collections.
            observerFreeList.push.apply(
                observerFreeList,
                observerToFreeList
            );
            // Using clear because it is observable. The handler record array
            // is obtainable by getPropertyChangeObservers, and is observable.
            if (observerToFreeList.clear) {
                observerToFreeList.clear();
            } else {
                observerToFreeList.length = 0;
            }
        }
    }
}

function makeRangeChangesObservable(object) {
    if (Array.isArray(object)) {
        Oa.makeRangeChangesObservable(object);
    }
    if (object.makeRangeChangesObservable) {
        object.makeRangeChangesObservable();
    }
    object.dispatchesRangeChanges = true;
}

function getRangeChangeObservers(object, capture) {
    if (capture) {
        if (!object.rangeWillChangeObservers) {
            object.rangeWillChangeObservers = [];
        }
        return object.rangeWillChangeObservers;
    } else {
        if (!object.rangeChangeObservers) {
            object.rangeChangeObservers = [];
        }
        return object.rangeChangeObservers;
    }
}

/*
    if (object.preventPropertyObserver) {
        return object.preventPropertyObserver(name);
    } else {
        return preventPropertyObserver(object, name);
    }
*/

function RangeChangeObserver() {
    this.init();
}

RangeChangeObserver.prototype.init = function () {
    this.object = null;
    this.name = null;
    this.observers = null;
    this.handler = null;
    this.handlerMethodName = null;
    this.childObserver = null;
    this.note = null;
    this.capture = null;
};

RangeChangeObserver.prototype.cancel = function () {
    var observers = this.observers;
    var index = observers.indexOf(this);
    // Unfortunately, if this observer was reused, this would not be sufficient
    // to detect a duplicate cancel. Do not cancel more than once.
    if (index < 0) {
        throw new Error(
            "Can't cancel observer for " +
            JSON.stringify(this.name) + " range changes" +
            " because it has already been canceled"
        );
    }
    var childObserver = this.childObserver;
    observers.splice(index, 1);
    this.init();
    // If this observer is canceled while dispatching a change
    // notification for the same property...
    // 1. We cannot put the handler record onto the free list because
    // it may have been captured in the array of records to which
    // the change notification would be sent. We must mark it as
    // canceled by nulling out the handler property so the dispatcher
    // passes over it.
    // 2. We also cannot put the handler record onto the free list
    // until all change dispatches have been completed because it could
    // conceivably be reused, confusing the current dispatcher.
    if (dispatching) {
        // All handlers added to this list will be moved over to the
        // actual free list when there are no longer any property
        // change dispatchers on the stack.
        observerToFreeList.push(this);
    } else {
        observerFreeList.push(this);
    }
    if (childObserver) {
        // Calling user code on our stack.
        // Done in tail position to avoid a plan interference hazard.
        childObserver.cancel();
    }
};

RangeChangeObserver.prototype.dispatch = function (plus, minus, index) {
    var handler = this.handler;
    // A null handler implies that an observer was canceled during the dispatch
    // of a change. The observer is pending addition to the free list.
    if (!handler) {
        return;
    }

    var childObserver = this.childObserver;
    this.childObserver = null;
    // XXX plan interference hazards calling cancel and handler methods:
    if (childObserver) {
        childObserver.cancel();
    }

    var handlerMethodName = this.handlerMethodName;
    if (handlerMethodName && typeof handler[handlerMethodName] === "function") {
        childObserver = handler[handlerMethodName](plus, minus, index, this.object);
    } else if (handler.call) {
        childObserver = handler.call(void 0, plus, minus, index, this.object);
    } else {
        throw new Error(
            "Can't dispatch range change to " + handler
        );
    }

    this.childObserver = childObserver;

    return this;
};

var Oa = __webpack_require__(/*! ./observable-array */ "./node_modules/pop-observe/observable-array.js");


/***/ }),

/***/ "./node_modules/pop-swap/swap.js":
/*!***************************************!*\
  !*** ./node_modules/pop-swap/swap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Copyright (C) 2014 Montage Studio
// https://github.com/montagejs/collections/blob/7c674d49c04955f01bbd2839f90936e15aceea2f/operators/swap.js

var array_slice = Array.prototype.slice;

module.exports = swap;
function swap(array, start, minusLength, plus) {
    // Unrolled implementation into JavaScript for a couple reasons.
    // Calling splice can cause large stack sizes for large swaps. Also,
    // splice cannot handle array holes.
    if (plus) {
        if (!Array.isArray(plus)) {
            plus = array_slice.call(plus);
        }
    } else {
        plus = Array.empty;
    }

    if (start < 0) {
        start = array.length + start;
    } else if (start > array.length) {
        array.length = start;
    }

    if (start + minusLength > array.length) {
        // Truncate minus length if it extends beyond the length
        minusLength = array.length - start;
    } else if (minusLength < 0) {
        // It is the JavaScript way.
        minusLength = 0;
    }

    var diff = plus.length - minusLength;
    var oldLength = array.length;
    var newLength = array.length + diff;

    if (diff > 0) {
        // Head Tail Plus Minus
        // H H H H M M T T T T
        // H H H H P P P P T T T T
        //         ^ start
        //         ^-^ minus.length
        //           ^ --> diff
        //         ^-----^ plus.length
        //             ^------^ tail before
        //                 ^------^ tail after
        //                   ^ start iteration
        //                       ^ start iteration offset
        //             ^ end iteration
        //                 ^ end iteration offset
        //             ^ start + minus.length
        //                     ^ length
        //                   ^ length - 1
        for (var index = oldLength - 1; index >= start + minusLength; index--) {
            var offset = index + diff;
            if (index in array) {
                array[offset] = array[index];
            } else {
                // Oddly, PhantomJS complains about deleting array
                // properties, unless you assign undefined first.
                array[offset] = void 0;
                delete array[offset];
            }
        }
    }
    for (var index = 0; index < plus.length; index++) {
        if (index in plus) {
            array[start + index] = plus[index];
        } else {
            array[start + index] = void 0;
            delete array[start + index];
        }
    }
    if (diff < 0) {
        // Head Tail Plus Minus
        // H H H H M M M M T T T T
        // H H H H P P T T T T
        //         ^ start
        //         ^-----^ length
        //         ^-^ plus.length
        //             ^ start iteration
        //                 ^ offset start iteration
        //                     ^ end
        //                         ^ offset end
        //             ^ start + minus.length - plus.length
        //             ^ start - diff
        //                 ^------^ tail before
        //             ^------^ tail after
        //                     ^ length - diff
        //                     ^ newLength
        for (var index = start + plus.length; index < oldLength - diff; index++) {
            var offset = index - diff;
            if (offset in array) {
                array[index] = array[offset];
            } else {
                array[index] = void 0;
                delete array[index];
            }
        }
    }
    array.length = newLength;
}



/***/ }),

/***/ "./node_modules/pop-zip/pop-unzip.js":
/*!*******************************************!*\
  !*** ./node_modules/pop-zip/pop-unzip.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var unzip = __webpack_require__(/*! ./unzip */ "./node_modules/pop-zip/unzip.js");

// Polymorphic unzip uses collection.toArray() (for non-array collection
// implementations) to convert the table or any of its rows into array before
// passing them along to the non-polymorphic unzip.

module.exports = popUnzip;
function popUnzip(table) {
    if (typeof table.unzip === 'function') {
        return table.unzip();
    }
    // Ensure that the table we pass to the non-polymorphic unzip is an array
    // of arrays.
    // However, only construct a new table if necessary.
    var arrayTable;
    if (!Array.isArray(table)) {
        table = arrayTable = table.toArray();
    }
    for (var index = 0, length = table.length; index < length; index++) {
        var row = table[index];
        if (!Array.isArray(row)) {
            // Construct a copy of the table in which to replace non-array
            // values.
            if (!arrayTable) {
                // Table is known to be an array because we would have replaced
                // it already otherwise.
                arrayTable = table.slice();
            }
            arrayTable[index] = row.toArray();
        }
    }
    return unzip(arrayTable || table);
}


/***/ }),

/***/ "./node_modules/pop-zip/unzip.js":
/*!***************************************!*\
  !*** ./node_modules/pop-zip/unzip.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Unzip is also known as a matrix transpose, operating exclusively on arrays.

module.exports = unzip;
function unzip(table) {
    var transpose = [];
    var rows = table.length;
    var row, columns, length;
    var index, jndex;

    // Mathematically, the degenerate case is an empty array where each inner
    // value would be of infinite length.
    if (!rows) {
        // Within this array, the nothingness is infinite.
        return [];
    }

    columns = table[0].length;
    length = Infinity;

    // Find the shortest row, this will be the length of the transpose.
    for (index = 0; index < rows; index++) {
        row = table[index];
        if (row.length < length) {
            length = row.length;
        }
    }

    // Populate the transpose.
    for (index = 0; index < length; index++) {
        row = transpose[index] = [];
        for (jndex = 0; jndex < rows; jndex++) {
            row[jndex] = table[jndex][index];
        }
    }

    return transpose;
}


/***/ }),

/***/ "./node_modules/weak-map/weak-map.js":
/*!*******************************************!*\
  !*** ./node_modules/weak-map/weak-map.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright (C) 2011 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Install a leaky WeakMap emulation on platforms that
 * don't provide a built-in one.
 *
 * <p>Assumes that an ES5 platform where, if {@code WeakMap} is
 * already present, then it conforms to the anticipated ES6
 * specification. To run this file on an ES5 or almost ES5
 * implementation where the {@code WeakMap} specification does not
 * quite conform, run <code>repairES5.js</code> first.
 *
 * <p>Even though WeakMapModule is not global, the linter thinks it
 * is, which is why it is in the overrides list below.
 *
 * <p>NOTE: Before using this WeakMap emulation in a non-SES
 * environment, see the note below about hiddenRecord.
 *
 * @author Mark S. Miller
 * @requires crypto, ArrayBuffer, Uint8Array, navigator, console
 * @overrides WeakMap, ses, Proxy
 * @overrides WeakMapModule
 */

/**
 * This {@code WeakMap} emulation is observably equivalent to the
 * ES-Harmony WeakMap, but with leakier garbage collection properties.
 *
 * <p>As with true WeakMaps, in this emulation, a key does not
 * retain maps indexed by that key and (crucially) a map does not
 * retain the keys it indexes. A map by itself also does not retain
 * the values associated with that map.
 *
 * <p>However, the values associated with a key in some map are
 * retained so long as that key is retained and those associations are
 * not overridden. For example, when used to support membranes, all
 * values exported from a given membrane will live for the lifetime
 * they would have had in the absence of an interposed membrane. Even
 * when the membrane is revoked, all objects that would have been
 * reachable in the absence of revocation will still be reachable, as
 * far as the GC can tell, even though they will no longer be relevant
 * to ongoing computation.
 *
 * <p>The API implemented here is approximately the API as implemented
 * in FF6.0a1 and agreed to by MarkM, Andreas Gal, and Dave Herman,
 * rather than the offially approved proposal page. TODO(erights):
 * upgrade the ecmascript WeakMap proposal page to explain this API
 * change and present to EcmaScript committee for their approval.
 *
 * <p>The first difference between the emulation here and that in
 * FF6.0a1 is the presence of non enumerable {@code get___, has___,
 * set___, and delete___} methods on WeakMap instances to represent
 * what would be the hidden internal properties of a primitive
 * implementation. Whereas the FF6.0a1 WeakMap.prototype methods
 * require their {@code this} to be a genuine WeakMap instance (i.e.,
 * an object of {@code [[Class]]} "WeakMap}), since there is nothing
 * unforgeable about the pseudo-internal method names used here,
 * nothing prevents these emulated prototype methods from being
 * applied to non-WeakMaps with pseudo-internal methods of the same
 * names.
 *
 * <p>Another difference is that our emulated {@code
 * WeakMap.prototype} is not itself a WeakMap. A problem with the
 * current FF6.0a1 API is that WeakMap.prototype is itself a WeakMap
 * providing ambient mutability and an ambient communications
 * channel. Thus, if a WeakMap is already present and has this
 * problem, repairES5.js wraps it in a safe wrappper in order to
 * prevent access to this channel. (See
 * PATCH_MUTABLE_FROZEN_WEAKMAP_PROTO in repairES5.js).
 */

/**
 * If this is a full <a href=
 * "http://code.google.com/p/es-lab/wiki/SecureableES5"
 * >secureable ES5</a> platform and the ES-Harmony {@code WeakMap} is
 * absent, install an approximate emulation.
 *
 * <p>If WeakMap is present but cannot store some objects, use our approximate
 * emulation as a wrapper.
 *
 * <p>If this is almost a secureable ES5 platform, then WeakMap.js
 * should be run after repairES5.js.
 *
 * <p>See {@code WeakMap} for documentation of the garbage collection
 * properties of this WeakMap emulation.
 */
(function WeakMapModule() {
  "use strict";

  if (typeof ses !== 'undefined' && ses.ok && !ses.ok()) {
    // already too broken, so give up
    return;
  }

  /**
   * In some cases (current Firefox), we must make a choice betweeen a
   * WeakMap which is capable of using all varieties of host objects as
   * keys and one which is capable of safely using proxies as keys. See
   * comments below about HostWeakMap and DoubleWeakMap for details.
   *
   * This function (which is a global, not exposed to guests) marks a
   * WeakMap as permitted to do what is necessary to index all host
   * objects, at the cost of making it unsafe for proxies.
   *
   * Do not apply this function to anything which is not a genuine
   * fresh WeakMap.
   */
  function weakMapPermitHostObjects(map) {
    // identity of function used as a secret -- good enough and cheap
    if (map.permitHostObjects___) {
      map.permitHostObjects___(weakMapPermitHostObjects);
    }
  }
  if (typeof ses !== 'undefined') {
    ses.weakMapPermitHostObjects = weakMapPermitHostObjects;
  }

  // IE 11 has no Proxy but has a broken WeakMap such that we need to patch
  // it using DoubleWeakMap; this flag tells DoubleWeakMap so.
  var doubleWeakMapCheckSilentFailure = false;

  // Check if there is already a good-enough WeakMap implementation, and if so
  // exit without replacing it.
  if (typeof WeakMap === 'function') {
    var HostWeakMap = WeakMap;
    // There is a WeakMap -- is it good enough?
    if (typeof navigator !== 'undefined' &&
        /Firefox/.test(navigator.userAgent)) {
      // We're now *assuming not*, because as of this writing (2013-05-06)
      // Firefox's WeakMaps have a miscellany of objects they won't accept, and
      // we don't want to make an exhaustive list, and testing for just one
      // will be a problem if that one is fixed alone (as they did for Event).

      // If there is a platform that we *can* reliably test on, here's how to
      // do it:
      //  var problematic = ... ;
      //  var testHostMap = new HostWeakMap();
      //  try {
      //    testHostMap.set(problematic, 1);  // Firefox 20 will throw here
      //    if (testHostMap.get(problematic) === 1) {
      //      return;
      //    }
      //  } catch (e) {}

    } else {
      // IE 11 bug: WeakMaps silently fail to store frozen objects.
      var testMap = new HostWeakMap();
      var testObject = Object.freeze({});
      testMap.set(testObject, 1);
      if (testMap.get(testObject) !== 1) {
        doubleWeakMapCheckSilentFailure = true;
        // Fall through to installing our WeakMap.
      } else {
        module.exports = WeakMap;
        return;
      }
    }
  }

  var hop = Object.prototype.hasOwnProperty;
  var gopn = Object.getOwnPropertyNames;
  var defProp = Object.defineProperty;
  var isExtensible = Object.isExtensible;

  /**
   * Security depends on HIDDEN_NAME being both <i>unguessable</i> and
   * <i>undiscoverable</i> by untrusted code.
   *
   * <p>Given the known weaknesses of Math.random() on existing
   * browsers, it does not generate unguessability we can be confident
   * of.
   *
   * <p>It is the monkey patching logic in this file that is intended
   * to ensure undiscoverability. The basic idea is that there are
   * three fundamental means of discovering properties of an object:
   * The for/in loop, Object.keys(), and Object.getOwnPropertyNames(),
   * as well as some proposed ES6 extensions that appear on our
   * whitelist. The first two only discover enumerable properties, and
   * we only use HIDDEN_NAME to name a non-enumerable property, so the
   * only remaining threat should be getOwnPropertyNames and some
   * proposed ES6 extensions that appear on our whitelist. We monkey
   * patch them to remove HIDDEN_NAME from the list of properties they
   * returns.
   *
   * <p>TODO(erights): On a platform with built-in Proxies, proxies
   * could be used to trap and thereby discover the HIDDEN_NAME, so we
   * need to monkey patch Proxy.create, Proxy.createFunction, etc, in
   * order to wrap the provided handler with the real handler which
   * filters out all traps using HIDDEN_NAME.
   *
   * <p>TODO(erights): Revisit Mike Stay's suggestion that we use an
   * encapsulated function at a not-necessarily-secret name, which
   * uses the Stiegler shared-state rights amplification pattern to
   * reveal the associated value only to the WeakMap in which this key
   * is associated with that value. Since only the key retains the
   * function, the function can also remember the key without causing
   * leakage of the key, so this doesn't violate our general gc
   * goals. In addition, because the name need not be a guarded
   * secret, we could efficiently handle cross-frame frozen keys.
   */
  var HIDDEN_NAME_PREFIX = 'weakmap:';
  var HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'ident:' + Math.random() + '___';

  if (typeof crypto !== 'undefined' &&
      typeof crypto.getRandomValues === 'function' &&
      typeof ArrayBuffer === 'function' &&
      typeof Uint8Array === 'function') {
    var ab = new ArrayBuffer(25);
    var u8s = new Uint8Array(ab);
    crypto.getRandomValues(u8s);
    HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'rand:' +
      Array.prototype.map.call(u8s, function(u8) {
        return (u8 % 36).toString(36);
      }).join('') + '___';
  }

  function isNotHiddenName(name) {
    return !(
        name.substr(0, HIDDEN_NAME_PREFIX.length) == HIDDEN_NAME_PREFIX &&
        name.substr(name.length - 3) === '___');
  }

  /**
   * Monkey patch getOwnPropertyNames to avoid revealing the
   * HIDDEN_NAME.
   *
   * <p>The ES5.1 spec requires each name to appear only once, but as
   * of this writing, this requirement is controversial for ES6, so we
   * made this code robust against this case. If the resulting extra
   * search turns out to be expensive, we can probably relax this once
   * ES6 is adequately supported on all major browsers, iff no browser
   * versions we support at that time have relaxed this constraint
   * without providing built-in ES6 WeakMaps.
   */
  defProp(Object, 'getOwnPropertyNames', {
    value: function fakeGetOwnPropertyNames(obj) {
      return gopn(obj).filter(isNotHiddenName);
    }
  });

  /**
   * getPropertyNames is not in ES5 but it is proposed for ES6 and
   * does appear in our whitelist, so we need to clean it too.
   */
  if ('getPropertyNames' in Object) {
    var originalGetPropertyNames = Object.getPropertyNames;
    defProp(Object, 'getPropertyNames', {
      value: function fakeGetPropertyNames(obj) {
        return originalGetPropertyNames(obj).filter(isNotHiddenName);
      }
    });
  }

  /**
   * <p>To treat objects as identity-keys with reasonable efficiency
   * on ES5 by itself (i.e., without any object-keyed collections), we
   * need to add a hidden property to such key objects when we
   * can. This raises several issues:
   * <ul>
   * <li>Arranging to add this property to objects before we lose the
   *     chance, and
   * <li>Hiding the existence of this new property from most
   *     JavaScript code.
   * <li>Preventing <i>certification theft</i>, where one object is
   *     created falsely claiming to be the key of an association
   *     actually keyed by another object.
   * <li>Preventing <i>value theft</i>, where untrusted code with
   *     access to a key object but not a weak map nevertheless
   *     obtains access to the value associated with that key in that
   *     weak map.
   * </ul>
   * We do so by
   * <ul>
   * <li>Making the name of the hidden property unguessable, so "[]"
   *     indexing, which we cannot intercept, cannot be used to access
   *     a property without knowing the name.
   * <li>Making the hidden property non-enumerable, so we need not
   *     worry about for-in loops or {@code Object.keys},
   * <li>monkey patching those reflective methods that would
   *     prevent extensions, to add this hidden property first,
   * <li>monkey patching those methods that would reveal this
   *     hidden property.
   * </ul>
   * Unfortunately, because of same-origin iframes, we cannot reliably
   * add this hidden property before an object becomes
   * non-extensible. Instead, if we encounter a non-extensible object
   * without a hidden record that we can detect (whether or not it has
   * a hidden record stored under a name secret to us), then we just
   * use the key object itself to represent its identity in a brute
   * force leaky map stored in the weak map, losing all the advantages
   * of weakness for these.
   */
  function getHiddenRecord(key) {
    if (key !== Object(key)) {
      throw new TypeError('Not an object: ' + key);
    }
    var hiddenRecord = key[HIDDEN_NAME];
    if (hiddenRecord && hiddenRecord.key === key) { return hiddenRecord; }
    if (!isExtensible(key)) {
      // Weak map must brute force, as explained in doc-comment above.
      return void 0;
    }

    // The hiddenRecord and the key point directly at each other, via
    // the "key" and HIDDEN_NAME properties respectively. The key
    // field is for quickly verifying that this hidden record is an
    // own property, not a hidden record from up the prototype chain.
    //
    // NOTE: Because this WeakMap emulation is meant only for systems like
    // SES where Object.prototype is frozen without any numeric
    // properties, it is ok to use an object literal for the hiddenRecord.
    // This has two advantages:
    // * It is much faster in a performance critical place
    // * It avoids relying on Object.create(null), which had been
    //   problematic on Chrome 28.0.1480.0. See
    //   https://code.google.com/p/google-caja/issues/detail?id=1687
    hiddenRecord = { key: key };

    // When using this WeakMap emulation on platforms where
    // Object.prototype might not be frozen and Object.create(null) is
    // reliable, use the following two commented out lines instead.
    // hiddenRecord = Object.create(null);
    // hiddenRecord.key = key;

    // Please contact us if you need this to work on platforms where
    // Object.prototype might not be frozen and
    // Object.create(null) might not be reliable.

    try {
      defProp(key, HIDDEN_NAME, {
        value: hiddenRecord,
        writable: false,
        enumerable: false,
        configurable: false
      });
      return hiddenRecord;
    } catch (error) {
      // Under some circumstances, isExtensible seems to misreport whether
      // the HIDDEN_NAME can be defined.
      // The circumstances have not been isolated, but at least affect
      // Node.js v0.10.26 on TravisCI / Linux, but not the same version of
      // Node.js on OS X.
      return void 0;
    }
  }

  /**
   * Monkey patch operations that would make their argument
   * non-extensible.
   *
   * <p>The monkey patched versions throw a TypeError if their
   * argument is not an object, so it should only be done to functions
   * that should throw a TypeError anyway if their argument is not an
   * object.
   */
  (function(){
    var oldFreeze = Object.freeze;
    defProp(Object, 'freeze', {
      value: function identifyingFreeze(obj) {
        getHiddenRecord(obj);
        return oldFreeze(obj);
      }
    });
    var oldSeal = Object.seal;
    defProp(Object, 'seal', {
      value: function identifyingSeal(obj) {
        getHiddenRecord(obj);
        return oldSeal(obj);
      }
    });
    var oldPreventExtensions = Object.preventExtensions;
    defProp(Object, 'preventExtensions', {
      value: function identifyingPreventExtensions(obj) {
        getHiddenRecord(obj);
        return oldPreventExtensions(obj);
      }
    });
  })();

  function constFunc(func) {
    func.prototype = null;
    return Object.freeze(func);
  }

  var calledAsFunctionWarningDone = false;
  function calledAsFunctionWarning() {
    // Future ES6 WeakMap is currently (2013-09-10) expected to reject WeakMap()
    // but we used to permit it and do it ourselves, so warn only.
    if (!calledAsFunctionWarningDone && typeof console !== 'undefined') {
      calledAsFunctionWarningDone = true;
      console.warn('WeakMap should be invoked as new WeakMap(), not ' +
          'WeakMap(). This will be an error in the future.');
    }
  }

  var nextId = 0;

  var OurWeakMap = function() {
    if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
      calledAsFunctionWarning();
    }

    // We are currently (12/25/2012) never encountering any prematurely
    // non-extensible keys.
    var keys = []; // brute force for prematurely non-extensible keys.
    var values = []; // brute force for corresponding values.
    var id = nextId++;

    function get___(key, opt_default) {
      var index;
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        return id in hiddenRecord ? hiddenRecord[id] : opt_default;
      } else {
        index = keys.indexOf(key);
        return index >= 0 ? values[index] : opt_default;
      }
    }

    function has___(key) {
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        return id in hiddenRecord;
      } else {
        return keys.indexOf(key) >= 0;
      }
    }

    function set___(key, value) {
      var index;
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        hiddenRecord[id] = value;
      } else {
        index = keys.indexOf(key);
        if (index >= 0) {
          values[index] = value;
        } else {
          // Since some browsers preemptively terminate slow turns but
          // then continue computing with presumably corrupted heap
          // state, we here defensively get keys.length first and then
          // use it to update both the values and keys arrays, keeping
          // them in sync.
          index = keys.length;
          values[index] = value;
          // If we crash here, values will be one longer than keys.
          keys[index] = key;
        }
      }
      return this;
    }

    function delete___(key) {
      var hiddenRecord = getHiddenRecord(key);
      var index, lastIndex;
      if (hiddenRecord) {
        return id in hiddenRecord && delete hiddenRecord[id];
      } else {
        index = keys.indexOf(key);
        if (index < 0) {
          return false;
        }
        // Since some browsers preemptively terminate slow turns but
        // then continue computing with potentially corrupted heap
        // state, we here defensively get keys.length first and then use
        // it to update both the keys and the values array, keeping
        // them in sync. We update the two with an order of assignments,
        // such that any prefix of these assignments will preserve the
        // key/value correspondence, either before or after the delete.
        // Note that this needs to work correctly when index === lastIndex.
        lastIndex = keys.length - 1;
        keys[index] = void 0;
        // If we crash here, there's a void 0 in the keys array, but
        // no operation will cause a "keys.indexOf(void 0)", since
        // getHiddenRecord(void 0) will always throw an error first.
        values[index] = values[lastIndex];
        // If we crash here, values[index] cannot be found here,
        // because keys[index] is void 0.
        keys[index] = keys[lastIndex];
        // If index === lastIndex and we crash here, then keys[index]
        // is still void 0, since the aliasing killed the previous key.
        keys.length = lastIndex;
        // If we crash here, keys will be one shorter than values.
        values.length = lastIndex;
        return true;
      }
    }

    return Object.create(OurWeakMap.prototype, {
      get___:    { value: constFunc(get___) },
      has___:    { value: constFunc(has___) },
      set___:    { value: constFunc(set___) },
      delete___: { value: constFunc(delete___) }
    });
  };

  OurWeakMap.prototype = Object.create(Object.prototype, {
    get: {
      /**
       * Return the value most recently associated with key, or
       * opt_default if none.
       */
      value: function get(key, opt_default) {
        return this.get___(key, opt_default);
      },
      writable: true,
      configurable: true
    },

    has: {
      /**
       * Is there a value associated with key in this WeakMap?
       */
      value: function has(key) {
        return this.has___(key);
      },
      writable: true,
      configurable: true
    },

    set: {
      /**
       * Associate value with key in this WeakMap, overwriting any
       * previous association if present.
       */
      value: function set(key, value) {
        return this.set___(key, value);
      },
      writable: true,
      configurable: true
    },

    'delete': {
      /**
       * Remove any association for key in this WeakMap, returning
       * whether there was one.
       *
       * <p>Note that the boolean return here does not work like the
       * {@code delete} operator. The {@code delete} operator returns
       * whether the deletion succeeds at bringing about a state in
       * which the deleted property is absent. The {@code delete}
       * operator therefore returns true if the property was already
       * absent, whereas this {@code delete} method returns false if
       * the association was already absent.
       */
      value: function remove(key) {
        return this.delete___(key);
      },
      writable: true,
      configurable: true
    }
  });

  if (typeof HostWeakMap === 'function') {
    (function() {
      // If we got here, then the platform has a WeakMap but we are concerned
      // that it may refuse to store some key types. Therefore, make a map
      // implementation which makes use of both as possible.

      // In this mode we are always using double maps, so we are not proxy-safe.
      // This combination does not occur in any known browser, but we had best
      // be safe.
      if (doubleWeakMapCheckSilentFailure && typeof Proxy !== 'undefined') {
        Proxy = undefined;
      }

      function DoubleWeakMap() {
        if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
          calledAsFunctionWarning();
        }

        // Preferable, truly weak map.
        var hmap = new HostWeakMap();

        // Our hidden-property-based pseudo-weak-map. Lazily initialized in the
        // 'set' implementation; thus we can avoid performing extra lookups if
        // we know all entries actually stored are entered in 'hmap'.
        var omap = undefined;

        // Hidden-property maps are not compatible with proxies because proxies
        // can observe the hidden name and either accidentally expose it or fail
        // to allow the hidden property to be set. Therefore, we do not allow
        // arbitrary WeakMaps to switch to using hidden properties, but only
        // those which need the ability, and unprivileged code is not allowed
        // to set the flag.
        //
        // (Except in doubleWeakMapCheckSilentFailure mode in which case we
        // disable proxies.)
        var enableSwitching = false;

        function dget(key, opt_default) {
          if (omap) {
            return hmap.has(key) ? hmap.get(key)
                : omap.get___(key, opt_default);
          } else {
            return hmap.get(key, opt_default);
          }
        }

        function dhas(key) {
          return hmap.has(key) || (omap ? omap.has___(key) : false);
        }

        var dset;
        if (doubleWeakMapCheckSilentFailure) {
          dset = function(key, value) {
            hmap.set(key, value);
            if (!hmap.has(key)) {
              if (!omap) { omap = new OurWeakMap(); }
              omap.set(key, value);
            }
            return this;
          };
        } else {
          dset = function(key, value) {
            if (enableSwitching) {
              try {
                hmap.set(key, value);
              } catch (e) {
                if (!omap) { omap = new OurWeakMap(); }
                omap.set___(key, value);
              }
            } else {
              hmap.set(key, value);
            }
            return this;
          };
        }

        function ddelete(key) {
          var result = !!hmap['delete'](key);
          if (omap) { return omap.delete___(key) || result; }
          return result;
        }

        return Object.create(OurWeakMap.prototype, {
          get___:    { value: constFunc(dget) },
          has___:    { value: constFunc(dhas) },
          set___:    { value: constFunc(dset) },
          delete___: { value: constFunc(ddelete) },
          permitHostObjects___: { value: constFunc(function(token) {
            if (token === weakMapPermitHostObjects) {
              enableSwitching = true;
            } else {
              throw new Error('bogus call to permitHostObjects___');
            }
          })}
        });
      }
      DoubleWeakMap.prototype = OurWeakMap.prototype;
      module.exports = DoubleWeakMap;

      // define .constructor to hide OurWeakMap ctor
      Object.defineProperty(WeakMap.prototype, 'constructor', {
        value: WeakMap,
        enumerable: false,  // as default .constructor is
        configurable: true,
        writable: true
      });
    })();
  } else {
    // There is no host WeakMap, so we must use the emulation.

    // Emulated WeakMaps are incompatible with native proxies (because proxies
    // can observe the hidden name), so we must disable Proxy usage (in
    // ArrayLike and Domado, currently).
    if (typeof Proxy !== 'undefined') {
      Proxy = undefined;
    }

    module.exports = OurWeakMap;
  }
})();


/***/ }),

/***/ "./src/search/SearchCollection.ts":
/*!****************************************!*\
  !*** ./src/search/SearchCollection.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dict_1 = __importDefault(__webpack_require__(/*! collections/dict */ "./node_modules/collections/dict.js"));
const SearchResult_1 = __webpack_require__(/*! ./SearchResult */ "./src/search/SearchResult.ts");
class SearchCollection {
    constructor(ts) {
        this.ts = new dict_1.default();
        if (ts)
            ts.forEach(t => this.add(t));
    }
    add(t) {
        if (t instanceof SearchResult_1.SearchResult)
            this.ts.set(t.id, t);
        else
            this.ts.set(t.id, new SearchResult_1.SearchResult(t));
    }
    get(id) {
        this.ts.get(id);
    }
    only(fn) {
        const result = this.ts.filter(fn);
        if (result.length >= 1)
            return result.toArray()[0];
        else
            return undefined;
    }
    listAll() {
        return this.ts.map(v => v.toJSON());
    }
    first() {
        const arr = this.ts.toArray();
        return arr.length > 0 ? arr[0] : undefined;
    }
    last() {
        const arr = this.ts.toArray();
        return arr.length > 0 ? arr[arr.length - 1] : undefined;
    }
    toString() {
        return this.ts.map(v => v.toString()).join("\n");
    }
}
exports.SearchCollection = SearchCollection;


/***/ }),

/***/ "./src/search/SearchResult.ts":
/*!************************************!*\
  !*** ./src/search/SearchResult.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SearchResult {
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get label() {
        return this._label;
    }
    get description() {
        return this.information.description || "";
    }
    get concepturi() {
        return this.information.concepturi;
    }
    get url() {
        return `https:${this.information.url}`;
    }
    get pageid() {
        return this.information.pageid;
    }
    get match() {
        return this.information.match;
    }
    get aliases() {
        return this.information.aliases || [];
    }
    constructor(queryResult) {
        this._id = queryResult.id;
        this._title = queryResult.title;
        this._label = queryResult.label;
        this.information = queryResult;
    }
    getMoreInformation(key) {
        return this.information[key];
    }
    toString() {
        return `${this._id}: ${this._label} (${this.information.description})`;
    }
    toJSON() {
        return this.information;
    }
}
exports.SearchResult = SearchResult;


/***/ }),

/***/ "./src/search/index.ts":
/*!*****************************!*\
  !*** ./src/search/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const wikidata_sdk_1 = __webpack_require__(/*! wikidata-sdk */ "wikidata-sdk");
const SearchCollection_1 = __webpack_require__(/*! ./SearchCollection */ "./src/search/SearchCollection.ts");
function SearchEntities(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield axios_1.default.get(wikidata_sdk_1.searchEntities(options), options.config);
        const collection = new SearchCollection_1.SearchCollection();
        result.data.search.forEach(search => collection.add(search));
        return collection;
    });
}
exports.SearchEntities = SearchEntities;
function SearchEntity(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options.limit = 1;
        const result = yield SearchEntities(options);
        return result.first();
    });
}
exports.SearchEntity = SearchEntity;
class LowLevelSearchAPIs {
    static GetLink(options) {
        return wikidata_sdk_1.searchEntities(options);
    }
    static GetEntities(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(wikidata_sdk_1.searchEntities(options), options.config);
        });
    }
}
exports.LowLevelSearchAPIs = LowLevelSearchAPIs;


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "wikidata-sdk":
/*!*******************************!*\
  !*** external "wikidata-sdk" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("wikidata-sdk");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbGxlY3Rpb25zL2NvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbGxlY3Rpb25zL2RpY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbGxlY3Rpb25zL2dlbmVyaWMtY29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29sbGVjdGlvbnMvZ2VuZXJpYy1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbGxlY3Rpb25zL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9taW5pLW1hcC9taW5pLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLWNsb25lL3BvcC1jbG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLWNvbXBhcmUvcG9wLWNvbXBhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BvcC1lcXVhbHMvcG9wLWVxdWFscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLW9ic2VydmUvb2JzZXJ2YWJsZS1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLW9ic2VydmUvb2JzZXJ2YWJsZS1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BvcC1vYnNlcnZlL29ic2VydmFibGUtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3Atb2JzZXJ2ZS9vYnNlcnZhYmxlLXJhbmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3Atc3dhcC9zd2FwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3AtemlwL3BvcC11bnppcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLXppcC91bnppcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vhay1tYXAvd2Vhay1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlYXJjaC9TZWFyY2hDb2xsZWN0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZWFyY2gvU2VhcmNoUmVzdWx0LnRzIiwid2VicGFjazovLy8uL3NyYy9zZWFyY2gvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aWtpZGF0YS1zZGtcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsa0ZBQWdFO0FBRWhFLHFCQUFZLENBQUM7SUFDWCxNQUFNLEVBQUUsTUFBTTtJQUNkLFFBQVEsRUFBRSxJQUFJO0lBQ2QsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUMsSUFBSSxD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QUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUN6UTNCOztBQUViLG9CQUFvQixtQkFBTyxDQUFDLGdGQUE0QjtBQUN4RCx1QkFBdUIsbUJBQU8sQ0FBQyxzRkFBK0I7QUFDOUQsZUFBZSxtQkFBTyxDQUFDLDBEQUFZO0FBQ25DLHFCQUFxQixtQkFBTyxDQUFDLDJEQUFZO0FBQ3pDLHNCQUFzQixtQkFBTyxDQUFDLDhEQUFhO0FBQzNDLFdBQVcsbUJBQU8sQ0FBQyxrREFBUTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUN0TjNCOztBQUViOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyxxREFBVTtBQUNoQyx3QkFBd0IsbUJBQU8sQ0FBQyw4RUFBc0I7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNyWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVMsbUJBQU8sQ0FBQywwRUFBb0I7Ozs7Ozs7Ozs7Ozs7QUNoUXJDO0FBQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsU0FBUyxtQkFBTyxDQUFDLDBFQUFvQjs7Ozs7Ozs7Ozs7OztBQ2xrQnJDO0FBQ2E7O0FBRWI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQ0FBa0M7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsbUJBQU8sQ0FBQywwRUFBb0I7Ozs7Ozs7Ozs7Ozs7QUN6UXhCOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGtCQUFrQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxxQkFBcUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNB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cUI7O1FBQ3hELE1BQU0sTUFBTSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBbUIsNkJBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHMUYsTUFBTSxVQUFVLEdBQUcsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3RCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQUE7QUFQRCx3Q0FPQztBQWNELFNBQXNCLFlBQVksQ0FBQyxPQUFxQjs7UUFDdEQsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDbEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUFBO0FBSkQsb0NBSUM7QUFLRCxNQUFhLGtCQUFrQjtJQWF0QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQXFCO1FBQ3pDLE9BQU8sNkJBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBY00sTUFBTSxDQUFPLFdBQVcsQ0FBQyxPQUFxQjs7WUFDbkQsT0FBTyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQW1CLDZCQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BGLENBQUM7S0FBQTtDQUNGO0FBaENELGdEQWdDQzs7Ozs7Ozs7Ozs7O0FDdEdELGtDOzs7Ozs7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6Indpa2lkYXRhLWFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBTZWFyY2hFbnRpdHksIExvd0xldmVsU2VhcmNoQVBJcyB9IGZyb20gXCIuL3NyYy9zZWFyY2hcIjtcblxuU2VhcmNoRW50aXR5KHtcbiAgc2VhcmNoOiBcIkJlcm5cIixcbiAgbGFuZ3VhZ2U6IFwidGhcIixcbiAgdXNlbGFuZzogXCJpdFwiXG59KS50aGVuKHJlc3VsdCA9PiB7XG4gIGlmIChyZXN1bHQpIGNvbnNvbGUubG9nKHJlc3VsdC50b1N0cmluZygpKTtcbn0pO1xuXG5jb25zdCB1cmwgPSBMb3dMZXZlbFNlYXJjaEFQSXMuR2V0TGluayh7XG4gIHNlYXJjaDogXCJIZWxsb1wiLFxuICBsYW5ndWFnZTogXCJ0aFwiXG59KTtcblxuY29uc29sZS5sb2codXJsKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHk7XG5mdW5jdGlvbiBjb3B5KHRhcmdldCwgc291cmNlKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBuYW1lKSkge1xuICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gc291cmNlW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBHZW5lcmljQ29sbGVjdGlvbiA9IHJlcXVpcmUoXCIuL2dlbmVyaWMtY29sbGVjdGlvblwiKTtcbnZhciBHZW5lcmljTWFwID0gcmVxdWlyZShcIi4vZ2VuZXJpYy1tYXBcIik7XG52YXIgT2JzZXJ2YWJsZU9iamVjdCA9IHJlcXVpcmUoXCJwb3Atb2JzZXJ2ZS9vYnNlcnZhYmxlLW9iamVjdFwiKTtcbnZhciBJdGVyYXRvciA9IHJlcXVpcmUoXCIuL2l0ZXJhdG9yXCIpO1xudmFyIGNvcHkgPSByZXF1aXJlKFwiLi9jb3B5XCIpO1xuXG4vLyBCdXJnbGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2RvbWVuaWMvZGljdFxuXG5tb2R1bGUuZXhwb3J0cyA9IERpY3Q7XG5mdW5jdGlvbiBEaWN0KHZhbHVlcywgZ2V0RGVmYXVsdCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBEaWN0KSkge1xuICAgICAgICByZXR1cm4gbmV3IERpY3QodmFsdWVzLCBnZXREZWZhdWx0KTtcbiAgICB9XG4gICAgZ2V0RGVmYXVsdCA9IGdldERlZmF1bHQgfHwgdGhpcy5nZXREZWZhdWx0O1xuICAgIHRoaXMuZ2V0RGVmYXVsdCA9IGdldERlZmF1bHQ7XG4gICAgdGhpcy5zdG9yZSA9IHt9O1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmFkZEVhY2godmFsdWVzKTtcbn1cblxuRGljdC5EaWN0ID0gRGljdDsgLy8gaGFjayBmb3IgTW9udGFnZUpTXG5cbmZ1bmN0aW9uIG1hbmdsZShrZXkpIHtcbiAgICByZXR1cm4gXCIkXCIgKyBrZXk7XG59XG5cbmZ1bmN0aW9uIHVubWFuZ2xlKG1hbmdsZWQpIHtcbiAgICByZXR1cm4gbWFuZ2xlZC5zbGljZSgxKTtcbn1cblxuY29weShEaWN0LnByb3RvdHlwZSwgR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlKTtcbmNvcHkoRGljdC5wcm90b3R5cGUsIEdlbmVyaWNNYXAucHJvdG90eXBlKTtcbmNvcHkoRGljdC5wcm90b3R5cGUsIE9ic2VydmFibGVPYmplY3QucHJvdG90eXBlKTtcblxuRGljdC5wcm90b3R5cGUuaXNEaWN0ID0gdHJ1ZTtcblxuRGljdC5wcm90b3R5cGUuY29uc3RydWN0Q2xvbmUgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHZhbHVlcywgdGhpcy5tYW5nbGUsIHRoaXMuZ2V0RGVmYXVsdCk7XG59O1xuXG5EaWN0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgbWFuZ2xlZCA9IG1hbmdsZShrZXkpO1xuICAgIGlmIChtYW5nbGVkIGluIHRoaXMuc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVbbWFuZ2xlZF07XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHQoa2V5KTtcbiAgICB9XG59O1xuXG5EaWN0LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIHZhciBtYW5nbGVkID0gbWFuZ2xlKGtleSk7XG4gICAgdmFyIGZyb207XG4gICAgaWYgKG1hbmdsZWQgaW4gdGhpcy5zdG9yZSkgeyAvLyB1cGRhdGVcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIGZyb20gPSB0aGlzLnN0b3JlW21hbmdsZWRdO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcFdpbGxDaGFuZ2UoXCJ1cGRhdGVcIiwga2V5LCB2YWx1ZSwgZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZVttYW5nbGVkXSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcENoYW5nZShcInVwZGF0ZVwiLCBrZXksIHZhbHVlLCBmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHsgLy8gY3JlYXRlXG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwV2lsbENoYW5nZShcImNyZWF0ZVwiLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgICB0aGlzLnN0b3JlW21hbmdsZWRdID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwQ2hhbmdlKFwiY3JlYXRlXCIsIGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5cbkRpY3QucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgbWFuZ2xlZCA9IG1hbmdsZShrZXkpO1xuICAgIHJldHVybiBtYW5nbGVkIGluIHRoaXMuc3RvcmU7XG59O1xuXG5EaWN0LnByb3RvdHlwZVtcImRlbGV0ZVwiXSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgbWFuZ2xlZCA9IG1hbmdsZShrZXkpO1xuICAgIHZhciBmcm9tO1xuICAgIGlmIChtYW5nbGVkIGluIHRoaXMuc3RvcmUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIGZyb20gPSB0aGlzLnN0b3JlW21hbmdsZWRdO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcFdpbGxDaGFuZ2UoXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnN0b3JlW21hbmdsZShrZXkpXTtcbiAgICAgICAgdGhpcy5sZW5ndGgtLTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBDaGFuZ2UoXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5EaWN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIga2V5LCBtYW5nbGVkLCBmcm9tO1xuICAgIGZvciAobWFuZ2xlZCBpbiB0aGlzLnN0b3JlKSB7XG4gICAgICAgIGtleSA9IHVubWFuZ2xlKG1hbmdsZWQpO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgZnJvbSA9IHRoaXMuc3RvcmVbbWFuZ2xlZF07XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwV2lsbENoYW5nZShcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHRoaXMuc3RvcmVbbWFuZ2xlZF07XG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwQ2hhbmdlKFwiZGVsZXRlXCIsIGtleSwgdm9pZCAwLCBmcm9tKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxlbmd0aCA9IDA7XG59O1xuXG5EaWN0LnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGJhc2lzLCB0aGlzcCkge1xuICAgIGZvciAodmFyIG1hbmdsZWQgaW4gdGhpcy5zdG9yZSkge1xuICAgICAgICBiYXNpcyA9IGNhbGxiYWNrLmNhbGwodGhpc3AsIGJhc2lzLCB0aGlzLnN0b3JlW21hbmdsZWRdLCB1bm1hbmdsZShtYW5nbGVkKSwgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBiYXNpcztcbn07XG5cbkRpY3QucHJvdG90eXBlLnJlZHVjZVJpZ2h0ID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBiYXNpcywgdGhpc3ApIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHN0b3JlID0gdGhpcy5zdG9yZTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zdG9yZSkucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGJhc2lzLCBtYW5nbGVkKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXNwLCBiYXNpcywgc3RvcmVbbWFuZ2xlZF0sIHVubWFuZ2xlKG1hbmdsZWQpLCBzZWxmKTtcbiAgICB9LCBiYXNpcyk7XG59O1xuXG5EaWN0LnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGtleTtcbiAgICBmb3IgKGtleSBpbiB0aGlzLnN0b3JlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlW2tleV07XG4gICAgfVxufTtcblxuRGljdC5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuSXRlcmF0b3IobmV3IEl0ZXJhdG9yKHRoaXMuc3RvcmUpKTtcbn07XG5cbkRpY3QucHJvdG90eXBlLkl0ZXJhdG9yID0gRGljdEl0ZXJhdG9yO1xuXG5mdW5jdGlvbiBEaWN0SXRlcmF0b3Ioc3RvcmVJdGVyYXRvcikge1xuICAgIHRoaXMuc3RvcmVJdGVyYXRvciA9IHN0b3JlSXRlcmF0b3I7XG59XG5cbkRpY3RJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gdGhpcy5zdG9yZUl0ZXJhdG9yLm5leHQoKTtcbiAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yLkl0ZXJhdGlvbihcbiAgICAgICAgICAgIGl0ZXJhdGlvbi52YWx1ZSxcbiAgICAgICAgICAgIHVubWFuZ2xlKGl0ZXJhdGlvbi5pbmRleClcbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGVxdWFsc09wZXJhdG9yID0gcmVxdWlyZShcInBvcC1lcXVhbHNcIik7XG52YXIgY29tcGFyZU9wZXJhdG9yID0gcmVxdWlyZShcInBvcC1jb21wYXJlXCIpO1xudmFyIGNsb25lT3BlcmF0b3IgPSByZXF1aXJlKFwicG9wLWNsb25lXCIpO1xudmFyIHVuemlwT3BlcmF0b3IgPSByZXF1aXJlKFwicG9wLXppcC9wb3AtdW56aXBcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZXJpY0NvbGxlY3Rpb247XG5mdW5jdGlvbiBHZW5lcmljQ29sbGVjdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjb25zdHJ1Y3QuIEdlbmVyaWNDb2xsZWN0aW9uIGlzIGEgbWl4aW4uXCIpO1xufVxuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkRWFjaCA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICBpZiAodmFsdWVzICYmIE9iamVjdCh2YWx1ZXMpID09PSB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZXMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCh0aGlzLmFkZCwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlcy5sZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIC8vIEFycmF5LWxpa2Ugb2JqZWN0cyB0aGF0IGRvIG5vdCBpbXBsZW1lbnQgZm9yRWFjaCwgZXJnbyxcbiAgICAgICAgICAgIC8vIEFyZ3VtZW50c1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZCh2YWx1ZXNbaV0sIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModmFsdWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZCh2YWx1ZXNba2V5XSwga2V5KTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLy8gVGhpcyBpcyBzdWZmaWNpZW50bHkgZ2VuZXJpYyBmb3IgTWFwIChzaW5jZSB0aGUgdmFsdWUgbWF5IGJlIGEga2V5KVxuLy8gYW5kIG9yZGVyZWQgY29sbGVjdGlvbnMgKHNpbmNlIGl0IGZvcndhcmRzIHRoZSBlcXVhbHMgYXJndW1lbnQpXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZGVsZXRlRWFjaCA9IGZ1bmN0aW9uICh2YWx1ZXMsIGVxdWFscykge1xuICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzW1wiZGVsZXRlXCJdKHZhbHVlLCBlcXVhbHMpO1xuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLy8gYWxsIG9mIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBpbiB0ZXJtcyBvZiBcInJlZHVjZVwiLlxuLy8gc29tZSBuZWVkIFwiY29uc3RydWN0Q2xvbmVcIi5cblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIHRoaXNwKi8pIHtcbiAgICB2YXIgdGhpc3AgPSBhcmd1bWVudHNbMV07XG4gICAgcmV0dXJuIHRoaXMucmVkdWNlKGZ1bmN0aW9uICh1bmRlZmluZWQsIHZhbHVlLCBrZXksIG9iamVjdCwgZGVwdGgpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzcCwgdmFsdWUsIGtleSwgb2JqZWN0LCBkZXB0aCk7XG4gICAgfSwgdW5kZWZpbmVkKTtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIHRoaXNwKi8pIHtcbiAgICB2YXIgdGhpc3AgPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHRoaXMucmVkdWNlKGZ1bmN0aW9uICh1bmRlZmluZWQsIHZhbHVlLCBrZXksIG9iamVjdCwgZGVwdGgpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY2FsbGJhY2suY2FsbCh0aGlzcCwgdmFsdWUsIGtleSwgb2JqZWN0LCBkZXB0aCkpO1xuICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5lbnVtZXJhdGUgPSBmdW5jdGlvbiAoc3RhcnQpIHtcbiAgICBpZiAoc3RhcnQgPT0gbnVsbCkge1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB0aGlzLnJlZHVjZShmdW5jdGlvbiAodW5kZWZpbmVkLCB2YWx1ZSkge1xuICAgICAgICByZXN1bHQucHVzaChbc3RhcnQrKywgdmFsdWVdKTtcbiAgICB9LCB1bmRlZmluZWQpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZ3JvdXAgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNwLCBlcXVhbHMpIHtcbiAgICBlcXVhbHMgPSBlcXVhbHMgfHwgZXF1YWxzT3BlcmF0b3I7XG4gICAgdmFyIGdyb3VwcyA9IFtdO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgICAgICAgdmFyIGtleSA9IGNhbGxiYWNrLmNhbGwodGhpc3AsIHZhbHVlLCBrZXksIG9iamVjdCk7XG4gICAgICAgIHZhciBpbmRleCA9IGtleXMuaW5kZXhPZihrZXksIGVxdWFscyk7XG4gICAgICAgIHZhciBncm91cDtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgZ3JvdXAgPSBbXTtcbiAgICAgICAgICAgIGdyb3Vwcy5wdXNoKFtrZXksIGdyb3VwXSk7XG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwID0gZ3JvdXBzW2luZGV4XVsxXTtcbiAgICAgICAgfVxuICAgICAgICBncm91cC5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZ3JvdXBzO1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGlkZW50aXR5KTtcbn07XG5cbi8vIHRoaXMgZGVwZW5kcyBvbiBzdHJpbmdhYmxlIGtleXMsIHdoaWNoIGFwcGx5IHRvIEFycmF5IGFuZCBJdGVyYXRvclxuLy8gYmVjYXVzZSB0aGV5IGhhdmUgbnVtZXJpYyBrZXlzIGFuZCBhbGwgTWFwcyBzaW5jZSB0aGV5IG1heSB1c2Vcbi8vIHN0cmluZ3MgYXMga2V5cy4gIExpc3QsIFNldCwgYW5kIFNvcnRlZFNldCBoYXZlIG5vZGVzIGZvciBrZXlzLCBzb1xuLy8gdG9PYmplY3Qgd291bGQgbm90IGJlIG1lYW5pbmdmdWwuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9iamVjdCA9IHt9O1xuICAgIHRoaXMucmVkdWNlKGZ1bmN0aW9uICh1bmRlZmluZWQsIHZhbHVlLCBrZXkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICB9LCB1bmRlZmluZWQpO1xuICAgIHJldHVybiBvYmplY3Q7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrIC8qLCB0aGlzcCovKSB7XG4gICAgdmFyIHRoaXNwID0gYXJndW1lbnRzWzFdO1xuICAgIHZhciByZXN1bHQgPSB0aGlzLmNvbnN0cnVjdENsb25lKCk7XG4gICAgdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHVuZGVmaW5lZCwgdmFsdWUsIGtleSwgb2JqZWN0LCBkZXB0aCkge1xuICAgICAgICBpZiAoY2FsbGJhY2suY2FsbCh0aGlzcCwgdmFsdWUsIGtleSwgb2JqZWN0LCBkZXB0aCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5hZGQodmFsdWUsIGtleSk7XG4gICAgICAgIH1cbiAgICB9LCB1bmRlZmluZWQpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZXZlcnkgPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIHRoaXNwKi8pIHtcbiAgICB2YXIgdGhpc3AgPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5pdGVyYXRlKCk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGl0ZXJhdGlvbiA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghY2FsbGJhY2suY2FsbCh0aGlzcCwgaXRlcmF0aW9uLnZhbHVlLCBpdGVyYXRpb24uaW5kZXgsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuc29tZSA9IGZ1bmN0aW9uIChjYWxsYmFjayAvKiwgdGhpc3AqLykge1xuICAgIHZhciB0aGlzcCA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLml0ZXJhdGUoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgaXRlcmF0aW9uID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChjYWxsYmFjay5jYWxsKHRoaXNwLCBpdGVyYXRpb24udmFsdWUsIGl0ZXJhdGlvbi5pbmRleCwgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uIChjb21wYXJlKSB7XG4gICAgY29tcGFyZSA9IGNvbXBhcmUgfHwgdGhpcy5jb250ZW50Q29tcGFyZSB8fCBjb21wYXJlT3BlcmF0b3I7XG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmUodmFsdWUsIHJlc3VsdCkgPCAwID8gdmFsdWUgOiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9LCB1bmRlZmluZWQpO1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLm1heCA9IGZ1bmN0aW9uIChjb21wYXJlKSB7XG4gICAgY29tcGFyZSA9IGNvbXBhcmUgfHwgdGhpcy5jb250ZW50Q29tcGFyZSB8fCBjb21wYXJlT3BlcmF0b3I7XG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmUodmFsdWUsIHJlc3VsdCkgPiAwID8gdmFsdWUgOiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9LCB1bmRlZmluZWQpO1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLnN1bSA9IGZ1bmN0aW9uICh6ZXJvKSB7XG4gICAgemVybyA9IHplcm8gPT09IHVuZGVmaW5lZCA/IDAgOiB6ZXJvO1xuICAgIHJldHVybiB0aGlzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYSArIGI7XG4gICAgfSwgemVybyk7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuYXZlcmFnZSA9IGZ1bmN0aW9uICh6ZXJvKSB7XG4gICAgdmFyIHN1bSA9IHplcm8gPT09IHVuZGVmaW5lZCA/IDAgOiB6ZXJvO1xuICAgIHZhciBjb3VudCA9IHplcm8gPT09IHVuZGVmaW5lZCA/IDAgOiB6ZXJvO1xuICAgIHRoaXMucmVkdWNlKGZ1bmN0aW9uICh1bmRlZmluZWQsIHZhbHVlKSB7XG4gICAgICAgIHN1bSArPSB2YWx1ZTtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICB9LCB1bmRlZmluZWQpO1xuICAgIHJldHVybiBzdW0gLyBjb3VudDtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuY29uc3RydWN0Q2xvbmUodGhpcyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LmFkZEVhY2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5mbGF0dGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0sIHJlc3VsdCwgc2VsZik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLnppcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGFibGUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHRhYmxlLnVuc2hpZnQodGhpcyk7XG4gICAgcmV0dXJuIHVuemlwT3BlcmF0b3IodGFibGUpO1xufVxuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuam9pbiA9IGZ1bmN0aW9uIChkZWxpbWl0ZXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQgKyBkZWxpbWl0ZXIgKyBzdHJpbmc7XG4gICAgfSk7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuc29ydGVkID0gZnVuY3Rpb24gKGNvbXBhcmUsIGJ5LCBvcmRlcikge1xuICAgIGNvbXBhcmUgPSBjb21wYXJlIHx8IHRoaXMuY29udGVudENvbXBhcmUgfHwgY29tcGFyZU9wZXJhdG9yO1xuICAgIC8vIGFjY291bnQgZm9yIGNvbXBhcmF0b3JzIGdlbmVyYXRlZCBieSBGdW5jdGlvbi5ieVxuICAgIGlmIChjb21wYXJlLmJ5KSB7XG4gICAgICAgIGJ5ID0gY29tcGFyZS5ieTtcbiAgICAgICAgY29tcGFyZSA9IGNvbXBhcmUuY29tcGFyZSB8fCB0aGlzLmNvbnRlbnRDb21wYXJlIHx8IGNvbXBhcmVPcGVyYXRvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBieSA9IGJ5IHx8IGlkZW50aXR5O1xuICAgIH1cbiAgICBpZiAob3JkZXIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgb3JkZXIgPSAxO1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnk6IGJ5KGl0ZW0pLFxuICAgICAgICAgICAgdmFsdWU6IGl0ZW1cbiAgICAgICAgfTtcbiAgICB9KVxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlKGEuYnksIGIuYnkpICogb3JkZXI7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uIChwYWlyKSB7XG4gICAgICAgIHJldHVybiBwYWlyLnZhbHVlO1xuICAgIH0pO1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLnJldmVyc2VkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdENsb25lKHRoaXMpLnJldmVyc2UoKTtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIChkZXB0aCwgbWVtbywgY2xvbmUpIHtcbiAgICBpZiAoZGVwdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZXB0aCA9IEluZmluaXR5O1xuICAgIH0gZWxzZSBpZiAoZGVwdGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNsb25lID0gY2xvbmUgfHwgY2xvbmVPcGVyYXRvcjtcbiAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMuY29uc3RydWN0Q2xvbmUoKTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoY2xvbmUodmFsdWUsIGRlcHRoIC0gMSwgbWVtbyksIGtleSk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUub25seSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25lKCk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE9ic2VydmFibGVNYXAgPSByZXF1aXJlKFwicG9wLW9ic2VydmUvb2JzZXJ2YWJsZS1tYXBcIik7XG52YXIgT2JzZXJ2YWJsZU9iamVjdCA9IHJlcXVpcmUoXCJwb3Atb2JzZXJ2ZS9vYnNlcnZhYmxlLW9iamVjdFwiKTtcbnZhciBJdGVyYXRvciA9IHJlcXVpcmUoXCIuL2l0ZXJhdG9yXCIpO1xudmFyIGVxdWFsc09wZXJhdG9yID0gcmVxdWlyZShcInBvcC1lcXVhbHNcIik7XG52YXIgY29tcGFyZU9wZXJhdG9yID0gcmVxdWlyZShcInBvcC1jb21wYXJlXCIpO1xudmFyIGNvcHkgPSByZXF1aXJlKFwiLi9jb3B5XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyaWNNYXA7XG5mdW5jdGlvbiBHZW5lcmljTWFwKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNvbnN0cnVjdC4gR2VuZXJpY01hcCBpcyBhIG1peGluLlwiKTtcbn1cblxuY29weShHZW5lcmljTWFwLnByb3RvdHlwZSwgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUpO1xuY29weShHZW5lcmljTWFwLnByb3RvdHlwZSwgT2JzZXJ2YWJsZU9iamVjdC5wcm90b3R5cGUpO1xuXG4vLyBhbGwgb2YgdGhlc2UgbWV0aG9kcyBkZXBlbmQgb24gdGhlIGNvbnN0cnVjdG9yIHByb3ZpZGluZyBhIGBzdG9yZWAgc2V0XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLmlzTWFwID0gdHJ1ZTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGUuYWRkRWFjaCA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICBpZiAodmFsdWVzICYmIE9iamVjdCh2YWx1ZXMpID09PSB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZXMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBjb3B5IG1hcC1hbGlrZXNcbiAgICAgICAgICAgIGlmICh2YWx1ZXMuaXNNYXAgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUga2V5IHZhbHVlIHBhaXJzIG9mIG90aGVyIGl0ZXJhYmxlc1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAocGFpcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvcHkgb3RoZXIgb2JqZWN0cyBhcyBtYXAtYWxpa2VzXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWVzW2tleV0pO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBpdGVtID0gdGhpcy5zdG9yZS5nZXQobmV3IHRoaXMuSXRlbShrZXkpKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdChrZXkpO1xuICAgIH1cbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLmdldERlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIHZhciBpdGVtID0gbmV3IHRoaXMuSXRlbShrZXksIHZhbHVlKTtcbiAgICB2YXIgZm91bmQgPSB0aGlzLnN0b3JlLmdldChpdGVtKTtcbiAgICB2YXIgZ3JldyA9IGZhbHNlO1xuICAgIGlmIChmb3VuZCkgeyAvLyB1cGRhdGVcbiAgICAgICAgdmFyIGZyb207XG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICBmcm9tID0gZm91bmQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwV2lsbENoYW5nZShcInVwZGF0ZVwiLCBrZXksIHZhbHVlLCBmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICBmb3VuZC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcENoYW5nZShcInVwZGF0ZVwiLCBrZXksIHZhbHVlLCBmcm9tKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIGNyZWF0ZVxuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcFdpbGxDaGFuZ2UoXCJjcmVhdGVcIiwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RvcmUuYWRkKGl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgICAgICAgZ3JldyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBDaGFuZ2UoXCJjcmVhdGVcIiwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyZXc7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIHJldHVybiB0aGlzLnNldChrZXksIHZhbHVlKTtcbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5oYXMobmV3IHRoaXMuSXRlbShrZXkpKTtcbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgaXRlbSA9IG5ldyB0aGlzLkl0ZW0oa2V5KTtcbiAgICBpZiAodGhpcy5zdG9yZS5oYXMoaXRlbSkpIHtcbiAgICAgICAgdmFyIGZyb207XG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICBmcm9tID0gdGhpcy5zdG9yZS5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwV2lsbENoYW5nZShcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZVtcImRlbGV0ZVwiXShpdGVtKTtcbiAgICAgICAgdGhpcy5sZW5ndGgtLTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBDaGFuZ2UoXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZnJvbTtcbiAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKFwiZGVsZXRlXCIsIGtleSwgdm9pZCAwLCB2YWx1ZSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBmcm9tID0gdGhpcy5jb25zdHJ1Y3RDbG9uZSh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5zdG9yZS5jbGVhcigpO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICBmcm9tLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBDaGFuZ2UoXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIHZhbHVlKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxufTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuSXRlcmF0b3IodGhpcyk7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGJhc2lzLCB0aGlzcCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnJlZHVjZShmdW5jdGlvbiAoYmFzaXMsIGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc3AsIGJhc2lzLCBpdGVtLnZhbHVlLCBpdGVtLmtleSwgdGhpcyk7XG4gICAgfSwgYmFzaXMsIHRoaXMpO1xufTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGUucmVkdWNlUmlnaHQgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGJhc2lzLCB0aGlzcCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnJlZHVjZVJpZ2h0KGZ1bmN0aW9uIChiYXNpcywgaXRlbSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzcCwgYmFzaXMsIGl0ZW0udmFsdWUsIGl0ZW0ua2V5LCB0aGlzKTtcbiAgICB9LCBiYXNpcywgdGhpcyk7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH0pO1xufTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChpZGVudGl0eSk7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xuICAgIH0pO1xufTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKHRoYXQsIGVxdWFscykge1xuICAgIGVxdWFscyA9IGVxdWFscyB8fCBlcXVhbHNPcGVyYXRvcjtcbiAgICBpZiAodGhpcyA9PT0gdGhhdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoYXQgJiYgdHlwZW9mIHRoYXQuZXZlcnkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gdGhhdC5sZW5ndGggPT09IHRoaXMubGVuZ3RoICYmIHRoYXQuZXZlcnkoZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBlcXVhbHModGhpcy5nZXQoa2V5KSwgdmFsdWUpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoYXQpO1xuICAgICAgICByZXR1cm4ga2V5cy5sZW5ndGggPT09IHRoaXMubGVuZ3RoICYmIE9iamVjdC5rZXlzKHRoYXQpLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBlcXVhbHModGhpcy5nZXQoa2V5KSwgdGhhdFtrZXldKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxufTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGUuSXRlbSA9IEl0ZW07XG5HZW5lcmljTWFwLnByb3RvdHlwZS5JdGVyYXRvciA9IEdlbmVyaWNNYXBJdGVyYXRvcjtcblxuZnVuY3Rpb24gSXRlbShrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xufVxuXG5JdGVtLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAodGhhdCkge1xuICAgIHJldHVybiBlcXVhbHNPcGVyYXRvcih0aGlzLmtleSwgdGhhdC5rZXkpICYmIGVxdWFsc09wZXJhdG9yKHRoaXMudmFsdWUsIHRoYXQudmFsdWUpO1xufTtcblxuSXRlbS5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uICh0aGF0KSB7XG4gICAgcmV0dXJuIGNvbXBhcmVPcGVyYXRvcih0aGlzLmtleSwgdGhhdC5rZXkpO1xufTtcblxuZnVuY3Rpb24gR2VuZXJpY01hcEl0ZXJhdG9yKG1hcCkge1xuICAgIHRoaXMuc3RvcmVJdGVyYXRvciA9IG5ldyBJdGVyYXRvcihtYXAuc3RvcmUpO1xufVxuXG5HZW5lcmljTWFwSXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvci5wcm90b3R5cGUpO1xuR2VuZXJpY01hcEl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyaWNNYXBJdGVyYXRvcjtcblxuR2VuZXJpY01hcEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVyYXRpb24gPSB0aGlzLnN0b3JlSXRlcmF0b3IubmV4dCgpO1xuICAgIGlmIChpdGVyYXRpb24uZG9uZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgSXRlcmF0b3IuSXRlcmF0aW9uKFxuICAgICAgICAgICAgaXRlcmF0aW9uLnZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgaXRlcmF0aW9uLnZhbHVlLmtleVxuICAgICAgICApO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlcmF0b3I7XG5cbnZhciBXZWFrTWFwID0gcmVxdWlyZShcIndlYWstbWFwXCIpO1xudmFyIEdlbmVyaWNDb2xsZWN0aW9uID0gcmVxdWlyZShcIi4vZ2VuZXJpYy1jb2xsZWN0aW9uXCIpO1xuXG4vLyB1cGdyYWRlcyBhbiBpdGVyYWJsZSB0byBhIEl0ZXJhdG9yXG5mdW5jdGlvbiBJdGVyYXRvcihpdGVyYWJsZSwgc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoIWl0ZXJhYmxlKSB7XG4gICAgICAgIHJldHVybiBJdGVyYXRvci5lbXB0eTtcbiAgICB9IGVsc2UgaWYgKGl0ZXJhYmxlIGluc3RhbmNlb2YgSXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgIH0gZWxzZSBpZiAoISh0aGlzIGluc3RhbmNlb2YgSXRlcmF0b3IpKSB7XG4gICAgICAgIHJldHVybiBuZXcgSXRlcmF0b3IoaXRlcmFibGUsIHN0YXJ0LCBzdG9wLCBzdGVwKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlcmFibGUpIHx8IHR5cGVvZiBpdGVyYWJsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpdGVyYXRvcnMuc2V0KHRoaXMsIG5ldyBJbmRleEl0ZXJhdG9yKGl0ZXJhYmxlLCBzdGFydCwgc3RvcCwgc3RlcCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZXJhYmxlID0gT2JqZWN0KGl0ZXJhYmxlKTtcbiAgICBpZiAoaXRlcmFibGUubmV4dCkge1xuICAgICAgICBpdGVyYXRvcnMuc2V0KHRoaXMsIGl0ZXJhYmxlKTtcbiAgICB9IGVsc2UgaWYgKGl0ZXJhYmxlLml0ZXJhdGUpIHtcbiAgICAgICAgaXRlcmF0b3JzLnNldCh0aGlzLCBpdGVyYWJsZS5pdGVyYXRlKHN0YXJ0LCBzdG9wLCBzdGVwKSk7XG4gICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcmFibGUpID09PSBcIltvYmplY3QgRnVuY3Rpb25dXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gaXRlcmFibGU7XG4gICAgfSBlbHNlIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaXRlcmFibGUpID09PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICAgIGl0ZXJhdG9ycy5zZXQodGhpcywgbmV3IE9iamVjdEl0ZXJhdG9yKGl0ZXJhYmxlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbid0IGl0ZXJhdGUgXCIgKyBpdGVyYWJsZSk7XG4gICAgfVxufVxuXG4vLyBVc2luZyBpdGVyYXRvcnMgYXMgYSBoaWRkZW4gdGFibGUgYXNzb2NpYXRpbmcgYSBmdWxsLWZsZWRnZWQgSXRlcmF0b3Igd2l0aFxuLy8gYW4gdW5kZXJseWluZywgdXN1YWxseSBtZXJlbHkgXCJuZXh0YWJsZVwiLCBpdGVyYXRvci5cbnZhciBpdGVyYXRvcnMgPSBuZXcgV2Vha01hcCgpO1xuXG4vLyBTZWxlY3RpdmVseSBhcHBseSBnZW5lcmljIG1ldGhvZHMgb2YgR2VuZXJpY0NvbGxlY3Rpb25cbkl0ZXJhdG9yLnByb3RvdHlwZS5mb3JFYWNoID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2g7XG5JdGVyYXRvci5wcm90b3R5cGUubWFwID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLm1hcDtcbkl0ZXJhdG9yLnByb3RvdHlwZS5maWx0ZXIgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZmlsdGVyO1xuSXRlcmF0b3IucHJvdG90eXBlLmV2ZXJ5ID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmV2ZXJ5O1xuSXRlcmF0b3IucHJvdG90eXBlLnNvbWUgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuc29tZTtcbkl0ZXJhdG9yLnByb3RvdHlwZS5taW4gPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUubWluO1xuSXRlcmF0b3IucHJvdG90eXBlLm1heCA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5tYXg7XG5JdGVyYXRvci5wcm90b3R5cGUuc3VtID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLnN1bTtcbkl0ZXJhdG9yLnByb3RvdHlwZS5hdmVyYWdlID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmF2ZXJhZ2U7XG5JdGVyYXRvci5wcm90b3R5cGUuZmxhdHRlbiA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5mbGF0dGVuO1xuSXRlcmF0b3IucHJvdG90eXBlLnppcCA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS56aXA7XG5JdGVyYXRvci5wcm90b3R5cGUuZW51bWVyYXRlID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmVudW1lcmF0ZTtcbkl0ZXJhdG9yLnByb3RvdHlwZS5zb3J0ZWQgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuc29ydGVkO1xuSXRlcmF0b3IucHJvdG90eXBlLmdyb3VwID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmdyb3VwO1xuSXRlcmF0b3IucHJvdG90eXBlLnJldmVyc2VkID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLnJldmVyc2VkO1xuSXRlcmF0b3IucHJvdG90eXBlLnRvQXJyYXkgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUudG9BcnJheTtcbkl0ZXJhdG9yLnByb3RvdHlwZS50b09iamVjdCA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS50b09iamVjdDtcblxuLy8gVGhpcyBpcyBhIGJpdCBvZiBhIGNoZWF0IHNvIGZsYXR0ZW4gYW5kIHN1Y2ggd29yayB3aXRoIHRoZSBnZW5lcmljIHJlZHVjaWJsZVxuSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdENsb25lID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIHZhciBjbG9uZSA9IFtdO1xuICAgIGNsb25lLmFkZEVhY2godmFsdWVzKTtcbiAgICByZXR1cm4gY2xvbmU7XG59O1xuXG4vLyBBIGxldmVsIG9mIGluZGlyZWN0aW9uIHNvIGEgZnVsbC1pbnRlcmZhY2UgaXRlcmF0b3IgY2FuIHByb3h5IGZvciBhIHNpbXBsZVxuLy8gbmV4dGFibGUgaXRlcmF0b3IuXG5JdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV4dGFibGUgPSBpdGVyYXRvcnMuZ2V0KHRoaXMpO1xuICAgIGlmIChuZXh0YWJsZSkge1xuICAgICAgICByZXR1cm4gbmV4dGFibGUubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBJdGVyYXRvci5kb25lO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5pdGVyYXRlTWFwID0gZnVuY3Rpb24gKGNhbGxiYWNrIC8qLCB0aGlzcCovKSB7XG4gICAgdmFyIHNlbGYgPSBJdGVyYXRvcih0aGlzKSxcbiAgICAgICAgdGhpc3AgPSBhcmd1bWVudHNbMV07XG4gICAgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcihzZWxmLCBjYWxsYmFjaywgdGhpc3ApO1xufTtcblxuZnVuY3Rpb24gTWFwSXRlcmF0b3IoaXRlcmF0b3IsIGNhbGxiYWNrLCB0aGlzcCkge1xuICAgIHRoaXMuaXRlcmF0b3IgPSBpdGVyYXRvcjtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy50aGlzcCA9IHRoaXNwO1xufVxuXG5NYXBJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSk7XG5NYXBJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYXBJdGVyYXRvcjtcblxuTWFwSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGl0ZXJhdGlvbiA9IHRoaXMuaXRlcmF0b3IubmV4dCgpO1xuICAgIGlmIChpdGVyYXRpb24uZG9uZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgSXRlcmF0aW9uKFxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMudGhpc3AsXG4gICAgICAgICAgICAgICAgaXRlcmF0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICAgIGl0ZXJhdGlvbi5pbmRleCxcbiAgICAgICAgICAgICAgICB0aGlzLml0ZXJhdGlvblxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGl0ZXJhdGlvbi5pbmRleFxuICAgICAgICApO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5pdGVyYXRlRmlsdGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrIC8qLCB0aGlzcCovKSB7XG4gICAgdmFyIHNlbGYgPSBJdGVyYXRvcih0aGlzKSxcbiAgICAgICAgdGhpc3AgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgIGluZGV4ID0gMDtcblxuICAgIHJldHVybiBuZXcgRmlsdGVySXRlcmF0b3Ioc2VsZiwgY2FsbGJhY2ssIHRoaXNwKTtcbn07XG5cbmZ1bmN0aW9uIEZpbHRlckl0ZXJhdG9yKGl0ZXJhdG9yLCBjYWxsYmFjaywgdGhpc3ApIHtcbiAgICB0aGlzLml0ZXJhdG9yID0gaXRlcmF0b3I7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMudGhpc3AgPSB0aGlzcDtcbn1cblxuRmlsdGVySXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvci5wcm90b3R5cGUpO1xuRmlsdGVySXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRmlsdGVySXRlcmF0b3I7XG5cbkZpbHRlckl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVyYXRpb247XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaXRlcmF0aW9uID0gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChpdGVyYXRpb24uZG9uZSB8fCB0aGlzLmNhbGxiYWNrLmNhbGwoXG4gICAgICAgICAgICB0aGlzLnRoaXNwLFxuICAgICAgICAgICAgaXRlcmF0aW9uLnZhbHVlLFxuICAgICAgICAgICAgaXRlcmF0aW9uLmluZGV4LFxuICAgICAgICAgICAgdGhpcy5pdGVyYXRpb25cbiAgICAgICAgKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIGluaXRpYWwsIHRoaXNwKi8pIHtcbiAgICB2YXIgc2VsZiA9IEl0ZXJhdG9yKHRoaXMpLFxuICAgICAgICByZXN1bHQgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgIHRoaXNwID0gYXJndW1lbnRzWzJdLFxuICAgICAgICBpdGVyYXRpb247XG5cbiAgICAvLyBGaXJzdCBpdGVyYXRpb24gdW5yb2xsZWRcbiAgICBpdGVyYXRpb24gPSBzZWxmLm5leHQoKTtcbiAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiUmVkdWNlIG9mIGVtcHR5IGl0ZXJhdG9yIHdpdGggbm8gaW5pdGlhbCB2YWx1ZVwiKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suY2FsbChcbiAgICAgICAgICAgIHRoaXNwLFxuICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgaXRlcmF0aW9uLnZhbHVlLFxuICAgICAgICAgICAgaXRlcmF0aW9uLmluZGV4LFxuICAgICAgICAgICAgc2VsZlxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGl0ZXJhdGlvbi52YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBSZW1haW5pbmcgZW50cmllc1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGl0ZXJhdGlvbiA9IHNlbGYubmV4dCgpO1xuICAgICAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXNwLFxuICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICBpdGVyYXRpb24udmFsdWUsXG4gICAgICAgICAgICAgICAgaXRlcmF0aW9uLmluZGV4LFxuICAgICAgICAgICAgICAgIHNlbGZcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5JdGVyYXRvci5wcm90b3R5cGUuZHJvcFdoaWxlID0gZnVuY3Rpb24gKGNhbGxiYWNrIC8qLCB0aGlzcCAqLykge1xuICAgIHZhciBzZWxmID0gSXRlcmF0b3IodGhpcyksXG4gICAgICAgIHRoaXNwID0gYXJndW1lbnRzWzFdLFxuICAgICAgICBpdGVyYXRpb247XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpdGVyYXRpb24gPSBzZWxmLm5leHQoKTtcbiAgICAgICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gSXRlcmF0b3IuZW1wdHk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNhbGxiYWNrLmNhbGwodGhpc3AsIGl0ZXJhdGlvbi52YWx1ZSwgaXRlcmF0aW9uLmluZGV4LCBzZWxmKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEcm9wV2hpbGVJdGVyYXRvcihpdGVyYXRpb24sIHNlbGYpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gRHJvcFdoaWxlSXRlcmF0b3IoaXRlcmF0aW9uLCBpdGVyYXRvcikge1xuICAgIHRoaXMuaXRlcmF0aW9uID0gaXRlcmF0aW9uO1xuICAgIHRoaXMuaXRlcmF0b3IgPSBpdGVyYXRvcjtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG59XG5cbkRyb3BXaGlsZUl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlKTtcbkRyb3BXaGlsZUl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERyb3BXaGlsZUl0ZXJhdG9yO1xuXG5Ecm9wV2hpbGVJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5pdGVyYXRpb247XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLml0ZXJhdGlvbiA9IG51bGw7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlcmF0b3IubmV4dCgpO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS50YWtlV2hpbGUgPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIHRoaXNwKi8pIHtcbiAgICB2YXIgc2VsZiA9IEl0ZXJhdG9yKHRoaXMpLFxuICAgICAgICB0aGlzcCA9IGFyZ3VtZW50c1sxXTtcbiAgICByZXR1cm4gbmV3IFRha2VXaGlsZUl0ZXJhdG9yKHNlbGYsIGNhbGxiYWNrLCB0aGlzcCk7XG59O1xuXG5mdW5jdGlvbiBUYWtlV2hpbGVJdGVyYXRvcihpdGVyYXRvciwgY2FsbGJhY2ssIHRoaXNwKSB7XG4gICAgdGhpcy5pdGVyYXRvciA9IGl0ZXJhdG9yO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLnRoaXNwID0gdGhpc3A7XG59XG5cblRha2VXaGlsZUl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlKTtcblRha2VXaGlsZUl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRha2VXaGlsZUl0ZXJhdG9yO1xuXG5UYWtlV2hpbGVJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgfSBlbHNlIGlmICh0aGlzLmNhbGxiYWNrLmNhbGwoXG4gICAgICAgIHRoaXMudGhpc3AsXG4gICAgICAgIGl0ZXJhdGlvbi52YWx1ZSxcbiAgICAgICAgaXRlcmF0aW9uLmluZGV4LFxuICAgICAgICB0aGlzLml0ZXJhdG9yXG4gICAgKSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBJdGVyYXRvci5kb25lO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5pdGVyYXRlWmlwID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBJdGVyYXRvci51bnppcChBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLml0ZXJhdGVVbnppcCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gSXRlcmF0b3IudW56aXAodGhpcyk7XG59O1xuXG5JdGVyYXRvci5wcm90b3R5cGUuaXRlcmF0ZUVudW1lcmF0ZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiBJdGVyYXRvci5jb3VudChzdGFydCkuaXRlcmF0ZVppcCh0aGlzKTtcbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5pdGVyYXRlQ29uY2F0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBJdGVyYXRvci5mbGF0dGVuKEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG59O1xuXG5JdGVyYXRvci5wcm90b3R5cGUuaXRlcmF0ZUZsYXR0ZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEl0ZXJhdG9yLmZsYXR0ZW4odGhpcyk7XG59O1xuXG5JdGVyYXRvci5wcm90b3R5cGUucmVjb3VudCA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiBuZXcgUmVjb3VudEl0ZXJhdG9yKHRoaXMsIHN0YXJ0KTtcbn07XG5cbmZ1bmN0aW9uIFJlY291bnRJdGVyYXRvcihpdGVyYXRvciwgc3RhcnQpIHtcbiAgICB0aGlzLml0ZXJhdG9yID0gaXRlcmF0b3I7XG4gICAgdGhpcy5pbmRleCA9IHN0YXJ0IHx8IDA7XG59XG5cblJlY291bnRJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSk7XG5SZWNvdW50SXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVjb3VudEl0ZXJhdG9yO1xuXG5SZWNvdW50SXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGl0ZXJhdGlvbiA9IHRoaXMuaXRlcmF0b3IubmV4dCgpO1xuICAgIGlmIChpdGVyYXRpb24uZG9uZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgSXRlcmF0aW9uKFxuICAgICAgICAgICAgaXRlcmF0aW9uLnZhbHVlLFxuICAgICAgICAgICAgdGhpcy5pbmRleCsrXG4gICAgICAgICk7XG4gICAgfVxufTtcblxuLy8gY3JlYXRlcyBhbiBpdGVyYXRvciBmb3IgQXJyYXkgYW5kIFN0cmluZ1xuZnVuY3Rpb24gSW5kZXhJdGVyYXRvcihpdGVyYWJsZSwgc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoc3RlcCA9PSBudWxsKSB7XG4gICAgICAgIHN0ZXAgPSAxO1xuICAgIH1cbiAgICBpZiAoc3RvcCA9PSBudWxsKSB7XG4gICAgICAgIHN0b3AgPSBzdGFydDtcbiAgICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBpZiAoc3RhcnQgPT0gbnVsbCkge1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIGlmIChzdGVwID09IG51bGwpIHtcbiAgICAgICAgc3RlcCA9IDE7XG4gICAgfVxuICAgIGlmIChzdG9wID09IG51bGwpIHtcbiAgICAgICAgc3RvcCA9IGl0ZXJhYmxlLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5pdGVyYWJsZSA9IGl0ZXJhYmxlO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnN0b3AgPSBzdG9wO1xuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG59XG5cbkluZGV4SXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQWR2YW5jZSB0byBuZXh0IG93bmVkIGVudHJ5XG4gICAgaWYgKHR5cGVvZiB0aGlzLml0ZXJhYmxlID09PSBcIm9iamVjdFwiKSB7IC8vIGFzIG9wcG9zZWQgdG8gc3RyaW5nXG4gICAgICAgIHdoaWxlICghKHRoaXMuc3RhcnQgaW4gdGhpcy5pdGVyYWJsZSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0ID49IHRoaXMuc3RvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBJdGVyYXRvci5kb25lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ICs9IHRoaXMuc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zdGFydCA+PSB0aGlzLnN0b3ApIHsgLy8gZW5kIG9mIHN0cmluZ1xuICAgICAgICByZXR1cm4gSXRlcmF0b3IuZG9uZTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdGlvbiA9IG5ldyBJdGVyYXRpb24oXG4gICAgICAgIHRoaXMuaXRlcmFibGVbdGhpcy5zdGFydF0sXG4gICAgICAgIHRoaXMuc3RhcnRcbiAgICApO1xuICAgIHRoaXMuc3RhcnQgKz0gdGhpcy5zdGVwO1xuICAgIHJldHVybiBpdGVyYXRpb247XG59O1xuXG5mdW5jdGlvbiBPYmplY3RJdGVyYXRvcihvYmplY3QpIHtcbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcbiAgICB0aGlzLml0ZXJhdG9yID0gbmV3IEl0ZXJhdG9yKE9iamVjdC5rZXlzKG9iamVjdCkpO1xufVxuXG5PYmplY3RJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGlvbi52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRpb24odGhpcy5vYmplY3Rba2V5XSwga2V5KTtcbiAgICB9XG59O1xuXG5JdGVyYXRvci5jeWNsZSA9IGZ1bmN0aW9uIChjeWNsZSwgdGltZXMpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGltZXMgPSBJbmZpbml0eTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDeWNsZUl0ZXJhdG9yKGN5Y2xlLCB0aW1lcyk7XG59O1xuXG5mdW5jdGlvbiBDeWNsZUl0ZXJhdG9yKGN5Y2xlLCB0aW1lcykge1xuICAgIHRoaXMuY3ljbGUgPSBjeWNsZTtcbiAgICB0aGlzLnRpbWVzID0gdGltZXM7XG4gICAgdGhpcy5pdGVyYXRvciA9IEl0ZXJhdG9yLmVtcHR5O1xufVxuXG5DeWNsZUl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlKTtcbkN5Y2xlSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ3ljbGVJdGVyYXRvcjtcblxuQ3ljbGVJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVzID4gMCkge1xuICAgICAgICAgICAgdGhpcy50aW1lcy0tO1xuICAgICAgICAgICAgdGhpcy5pdGVyYXRvciA9IG5ldyBJdGVyYXRvcih0aGlzLmN5Y2xlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXRlcmF0aW9uO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLmNvbmNhdCA9IGZ1bmN0aW9uICgvKiAuLi5pdGVyYXRvcnMgKi8pIHtcbiAgICByZXR1cm4gSXRlcmF0b3IuZmxhdHRlbihBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbn07XG5cbkl0ZXJhdG9yLmZsYXR0ZW4gPSBmdW5jdGlvbiAoaXRlcmF0b3JzKSB7XG4gICAgaXRlcmF0b3JzID0gSXRlcmF0b3IoaXRlcmF0b3JzKTtcbiAgICByZXR1cm4gbmV3IENoYWluSXRlcmF0b3IoaXRlcmF0b3JzKTtcbn07XG5cbmZ1bmN0aW9uIENoYWluSXRlcmF0b3IoaXRlcmF0b3JzKSB7XG4gICAgdGhpcy5pdGVyYXRvcnMgPSBpdGVyYXRvcnM7XG4gICAgdGhpcy5pdGVyYXRvciA9IEl0ZXJhdG9yLmVtcHR5O1xufVxuXG5DaGFpbkl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlKTtcbkNoYWluSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2hhaW5JdGVyYXRvcjtcblxuQ2hhaW5JdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgIHZhciBpdGVyYXRvckl0ZXJhdGlvbiA9IHRoaXMuaXRlcmF0b3JzLm5leHQoKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9ySXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBJdGVyYXRvci5kb25lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pdGVyYXRvciA9IG5ldyBJdGVyYXRvcihpdGVyYXRvckl0ZXJhdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXRlcmF0aW9uO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnVuemlwID0gZnVuY3Rpb24gKGl0ZXJhdG9ycykge1xuICAgIGl0ZXJhdG9ycyA9IEl0ZXJhdG9yKGl0ZXJhdG9ycykubWFwKEl0ZXJhdG9yKTtcbiAgICBpZiAoaXRlcmF0b3JzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvci5lbXB0eTtcbiAgICByZXR1cm4gbmV3IFVuemlwSXRlcmF0b3IoaXRlcmF0b3JzKTtcbn07XG5cbmZ1bmN0aW9uIFVuemlwSXRlcmF0b3IoaXRlcmF0b3JzKSB7XG4gICAgdGhpcy5pdGVyYXRvcnMgPSBpdGVyYXRvcnM7XG4gICAgdGhpcy5pbmRleCA9IDA7XG59XG5cblVuemlwSXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvci5wcm90b3R5cGUpO1xuVW56aXBJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVbnppcEl0ZXJhdG9yO1xuXG5VbnppcEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBkb25lID0gZmFsc2VcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5pdGVyYXRvcnMubWFwKGZ1bmN0aW9uIChpdGVyYXRvcikge1xuICAgICAgICB2YXIgaXRlcmF0aW9uID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGlvbi52YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChkb25lKSB7XG4gICAgICAgIHJldHVybiBJdGVyYXRvci5kb25lO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgSXRlcmF0aW9uKHJlc3VsdCwgdGhpcy5pbmRleCsrKTtcbiAgICB9XG59O1xuXG5JdGVyYXRvci56aXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEl0ZXJhdG9yLnVuemlwKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xufTtcblxuSXRlcmF0b3IucmFuZ2UgPSBmdW5jdGlvbiAoc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgc3RlcCA9IDE7XG4gICAgfVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgICBzdG9wID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG4gICAgcmV0dXJuIG5ldyBSYW5nZUl0ZXJhdG9yKHN0YXJ0LCBzdG9wLCBzdGVwKTtcbn07XG5cbkl0ZXJhdG9yLmNvdW50ID0gZnVuY3Rpb24gKHN0YXJ0LCBzdGVwKSB7XG4gICAgcmV0dXJuIEl0ZXJhdG9yLnJhbmdlKHN0YXJ0LCBJbmZpbml0eSwgc3RlcCk7XG59O1xuXG5mdW5jdGlvbiBSYW5nZUl0ZXJhdG9yKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuc3RvcCA9IHN0b3A7XG4gICAgdGhpcy5zdGVwID0gc3RlcDtcbiAgICB0aGlzLmluZGV4ID0gMDtcbn1cblxuUmFuZ2VJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSk7XG5SYW5nZUl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJhbmdlSXRlcmF0b3I7XG5cblJhbmdlSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnQgPj0gdGhpcy5zdG9wKSB7XG4gICAgICAgIHJldHVybiBJdGVyYXRvci5kb25lO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnN0YXJ0O1xuICAgICAgICB0aGlzLnN0YXJ0ICs9IHRoaXMuc3RlcDtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRpb24ocmVzdWx0LCB0aGlzLmluZGV4KyspO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnJlcGVhdCA9IGZ1bmN0aW9uICh2YWx1ZSwgdGltZXMpIHtcbiAgICBpZiAodGltZXMgPT0gbnVsbCkge1xuICAgICAgICB0aW1lcyA9IEluZmluaXR5O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlcGVhdEl0ZXJhdG9yKHZhbHVlLCB0aW1lcyk7XG59O1xuXG5mdW5jdGlvbiBSZXBlYXRJdGVyYXRvcih2YWx1ZSwgdGltZXMpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy50aW1lcyA9IHRpbWVzO1xuICAgIHRoaXMuaW5kZXggPSAwO1xufVxuXG5SZXBlYXRJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSk7XG5SZXBlYXRJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZXBlYXRJdGVyYXRvcjtcblxuUmVwZWF0SXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLnRpbWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgSXRlcmF0aW9uKHRoaXMudmFsdWUsIHRoaXMuaW5kZXgrKyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmRvbmU7XG4gICAgfVxufTtcblxuSXRlcmF0b3IuZW51bWVyYXRlID0gZnVuY3Rpb24gKHZhbHVlcywgc3RhcnQpIHtcbiAgICByZXR1cm4gSXRlcmF0b3IuY291bnQoc3RhcnQpLml0ZXJhdGVaaXAobmV3IEl0ZXJhdG9yKHZhbHVlcykpO1xufTtcblxuZnVuY3Rpb24gRW1wdHlJdGVyYXRvcigpIHt9XG5cbkVtcHR5SXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvci5wcm90b3R5cGUpO1xuRW1wdHlJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFbXB0eUl0ZXJhdG9yO1xuXG5FbXB0eUl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBJdGVyYXRvci5kb25lO1xufTtcblxuSXRlcmF0b3IuZW1wdHkgPSBuZXcgRW1wdHlJdGVyYXRvcigpO1xuXG4vLyBJdGVyYXRpb24gYW5kIERvbmVJdGVyYXRpb24gZXhpc3QgaGVyZSBvbmx5IHRvIGVuY291cmFnZSBoaWRkZW4gY2xhc3Nlcy5cbi8vIE90aGVyd2lzZSwgaXRlcmF0aW9ucyBhcmUgbWVyZWx5IGR1Y2stdHlwZXMuXG5cbmZ1bmN0aW9uIEl0ZXJhdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xufVxuXG5JdGVyYXRpb24ucHJvdG90eXBlLmRvbmUgPSBmYWxzZTtcblxuSXRlcmF0aW9uLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAodGhhdCwgZXF1YWxzLCBtZW1vKSB7XG4gICAgaWYgKCF0aGF0KSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIChcbiAgICAgICAgZXF1YWxzKHRoaXMudmFsdWUsIHRoYXQudmFsdWUsIGVxdWFscywgbWVtbykgJiZcbiAgICAgICAgdGhpcy5pbmRleCA9PT0gdGhhdC5pbmRleCAmJlxuICAgICAgICB0aGlzLmRvbmUgPT09IHRoYXQuZG9uZVxuICAgICk7XG5cbn07XG5cbmZ1bmN0aW9uIERvbmVJdGVyYXRpb24odmFsdWUpIHtcbiAgICBJdGVyYXRpb24uY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgdGhpcy5kb25lID0gdHJ1ZTsgLy8gcmVmbGVjdGVkIG9uIHRoZSBpbnN0YW5jZSB0byBtYWtlIGl0IG1vcmUgb2J2aW91c1xufVxuXG5Eb25lSXRlcmF0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0aW9uLnByb3RvdHlwZSk7XG5Eb25lSXRlcmF0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERvbmVJdGVyYXRpb247XG5Eb25lSXRlcmF0aW9uLnByb3RvdHlwZS5kb25lID0gdHJ1ZTtcblxuSXRlcmF0b3IuSXRlcmF0aW9uID0gSXRlcmF0aW9uO1xuSXRlcmF0b3IuRG9uZUl0ZXJhdGlvbiA9IERvbmVJdGVyYXRpb247XG5JdGVyYXRvci5kb25lID0gbmV3IERvbmVJdGVyYXRpb24oKTtcblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gTWluaU1hcDtcbmZ1bmN0aW9uIE1pbmlNYXAoKSB7XG4gICAgdGhpcy5rZXlzID0gW107XG4gICAgdGhpcy52YWx1ZXMgPSBbXTtcbn1cblxuTWluaU1hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMua2V5cy5pbmRleE9mKGtleSk7XG4gICAgcmV0dXJuIGluZGV4ID49IDA7XG59O1xuXG5NaW5pTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5rZXlzLmluZGV4T2Yoa2V5KTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXNbaW5kZXhdO1xuICAgIH1cbn07XG5cbk1pbmlNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5rZXlzLmluZGV4T2Yoa2V5KTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5rZXlzLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5rZXlzW2luZGV4XSA9IGtleTtcbiAgICB0aGlzLnZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbn07XG5cbk1pbmlNYXAucHJvdG90eXBlW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMua2V5cy5pbmRleE9mKGtleSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5rZXlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMudmFsdWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufTtcblxuTWluaU1hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5rZXlzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy52YWx1ZXMubGVuZ3RoID0gMDtcbn07XG5cbiIsIlxudmFyIE1pbmlNYXAgPSByZXF1aXJlKFwibWluaS1tYXBcIik7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVlcCBjb3B5IG9mIGFueSB2YWx1ZS4gIFZhbHVlcywgYmVpbmcgaW1tdXRhYmxlLCBhcmUgcmV0dXJuZWRcbiAqIHdpdGhvdXQgYWx0ZXJuYXRpb24uICBGb3J3YXJkcyB0byA8Y29kZT5jbG9uZTwvY29kZT4gb24gb2JqZWN0cyBhbmQgYXJyYXlzLlxuICpcbiAqIEBmdW5jdGlvbiBjbG9uZVxuICogQHBhcmFtIHtBbnl9IHZhbHVlIGEgdmFsdWUgdG8gY2xvbmVcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZXB0aCBhbiBvcHRpb25hbCB0cmF2ZXJzYWwgZGVwdGgsIGRlZmF1bHRzIHRvIGluZmluaXR5LiAgQVxuICogdmFsdWUgb2YgPGNvZGU+MDwvY29kZT4gbWVhbnMgdG8gbWFrZSBubyBjbG9uZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZVxuICogZGlyZWN0bHkuXG4gKiBAcGFyYW0ge01hcH0gbWVtbyBhbiBvcHRpb25hbCBtZW1vIG9mIGFscmVhZHkgdmlzaXRlZCBvYmplY3RzIHRvIHByZXNlcnZlXG4gKiByZWZlcmVuY2UgY3ljbGVzLiAgVGhlIGNsb25lZCBvYmplY3Qgd2lsbCBoYXZlIHRoZSBleGFjdCBzYW1lIHNoYXBlIGFzIHRoZVxuICogb3JpZ2luYWwsIGJ1dCBubyBpZGVudGljYWwgb2JqZWN0cy4gIFRlIG1hcCBtYXkgYmUgbGF0ZXIgdXNlZCB0byBhc3NvY2lhdGVcbiAqIGFsbCBvYmplY3RzIGluIHRoZSBvcmlnaW5hbCBvYmplY3QgZ3JhcGggd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIG1lbWJlciBvZlxuICogdGhlIGNsb25lZCBncmFwaC5cbiAqIEByZXR1cm5zIGEgY29weSBvZiB0aGUgdmFsdWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBjbG9uZU9wZXJhdG9yO1xuZnVuY3Rpb24gY2xvbmVPcGVyYXRvcih2YWx1ZSwgZGVwdGgsIG1lbW8pIHtcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUudmFsdWVPZikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlT2YoKTtcbiAgICB9XG4gICAgaWYgKGRlcHRoID09IG51bGwpIHsgLy8gbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgZGVwdGggPSBJbmZpbml0eTtcbiAgICB9IGVsc2UgaWYgKGRlcHRoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtZW1vID0gbWVtbyB8fCBuZXcgTWluaU1hcCgpO1xuICAgICAgICBpZiAoIW1lbW8uaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgbWVtby5zZXQodmFsdWUsIHZhbHVlLmNsb25lKGRlcHRoLCBtZW1vKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIGlzQXJyYXkgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG90eXBlID09PSBudWxsIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvdHlwZSA9PT0gb2JqZWN0UHJvdG90eXBlXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbG9uZSA9IGlzQXJyYXkgPyBbXSA6IHt9O1xuICAgICAgICAgICAgICAgICAgICBtZW1vLnNldCh2YWx1ZSwgY2xvbmUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lW2tleV0gPSBjbG9uZU9wZXJhdG9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW2tleV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbW9cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjbG9uZSBcIiArIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lbW8uZ2V0KHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG4iLCJcbi8qKlxuICAgIERldGVybWluZXMgdGhlIG9yZGVyIGluIHdoaWNoIGFueSB0d28gb2JqZWN0cyBzaG91bGQgYmUgc29ydGVkIGJ5IHJldHVybmluZ1xuICAgIGEgbnVtYmVyIHRoYXQgaGFzIGFuIGFuYWxvZ291cyByZWxhdGlvbnNoaXAgdG8gemVybyBhcyB0aGUgbGVmdCB2YWx1ZSB0b1xuICAgIHRoZSByaWdodC4gIFRoYXQgaXMsIGlmIHRoZSBsZWZ0IGlzIFwibGVzcyB0aGFuXCIgdGhlIHJpZ2h0LCB0aGUgcmV0dXJuZWRcbiAgICB2YWx1ZSB3aWxsIGJlIFwibGVzcyB0aGFuXCIgemVybywgd2hlcmUgXCJsZXNzIHRoYW5cIiBtYXkgYmUgYW55IG90aGVyXG4gICAgdHJhbnNpdGl2ZSByZWxhdGlvbnNoaXAuXG5cbiAgICA8cD5BcnJheXMgYXJlIGNvbXBhcmVkIGJ5IHRoZSBmaXJzdCBkaXZlcmdpbmcgdmFsdWVzLCBvciBieSBsZW5ndGguXG5cbiAgICA8cD5BbnkgdHdvIHZhbHVlcyB0aGF0IGFyZSBpbmNvbXBhcmFibGUgcmV0dXJuIHplcm8uICBBcyBzdWNoLFxuICAgIDxjb2RlPmVxdWFsczwvY29kZT4gc2hvdWxkIG5vdCBiZSBpbXBsZW1lbnRlZCB3aXRoIDxjb2RlPmNvbXBhcmU8L2NvZGU+XG4gICAgc2luY2UgaW5jb21wYXJhYmlsaXR5IGlzIGluZGlzdGluZ3Vpc2hhYmxlIGZyb20gZXF1YWxpdHkuXG5cbiAgICA8cD5Tb3J0cyBzdHJpbmdzIGxleGljb2dyYXBoaWNhbGx5LiAgVGhpcyBpcyBub3Qgc3VpdGFibGUgZm9yIGFueVxuICAgIHBhcnRpY3VsYXIgaW50ZXJuYXRpb25hbCBzZXR0aW5nLiAgRGlmZmVyZW50IGxvY2FsZXMgc29ydCB0aGVpciBwaG9uZSBib29rc1xuICAgIGluIHZlcnkgZGlmZmVyZW50IHdheXMsIHBhcnRpY3VsYXJseSByZWdhcmRpbmcgZGlhY3JpdGljcyBhbmQgbGlnYXR1cmVzLlxuXG4gICAgPHA+SWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhbiBpbnN0YW5jZSBvZiBhIHR5cGUgdGhhdCBpbXBsZW1lbnRzIGEgbWV0aG9kXG4gICAgbmFtZWQgXCJjb21wYXJlXCIsIHRoaXMgZnVuY3Rpb24gZGVmZXJzIHRvIHRoZSBpbnN0YW5jZS4gIFRoZSBtZXRob2QgZG9lcyBub3RcbiAgICBuZWVkIHRvIGJlIGFuIG93bmVkIHByb3BlcnR5IHRvIGRpc3Rpbmd1aXNoIGl0IGZyb20gYW4gb2JqZWN0IGxpdGVyYWwgc2luY2VcbiAgICBvYmplY3QgbGl0ZXJhbHMgYXJlIGluY29tcGFyYWJsZS4gIFVubGlrZSA8Y29kZT5PYmplY3Q8L2NvZGU+IGhvd2V2ZXIsXG4gICAgPGNvZGU+QXJyYXk8L2NvZGU+IGltcGxlbWVudHMgPGNvZGU+Y29tcGFyZTwvY29kZT4uXG5cbiAgICBAcGFyYW0ge0FueX0gbGVmdFxuICAgIEBwYXJhbSB7QW55fSByaWdodFxuICAgIEByZXR1cm5zIHtOdW1iZXJ9IGEgdmFsdWUgaGF2aW5nIHRoZSBzYW1lIHRyYW5zaXRpdmUgcmVsYXRpb25zaGlwIHRvIHplcm9cbiAgICBhcyB0aGUgbGVmdCBhbmQgcmlnaHQgdmFsdWVzLlxuKi9cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZTtcbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgY29tcGFyZSkge1xuICAgIHZhciBkaWZmZXJlbmNlO1xuICAgIC8vIHVuYm94IG9iamVjdHNcbiAgICAvLyBtZXJjaWZ1bGx5IGhhbmRsZXMgdGhlIERhdGUgY2FzZVxuICAgIGlmIChhICYmIHR5cGVvZiBhLnZhbHVlT2YgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBhID0gYS52YWx1ZU9mKCk7XG4gICAgfVxuICAgIGlmIChiICYmIHR5cGVvZiBiLnZhbHVlT2YgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBiID0gYi52YWx1ZU9mKCk7XG4gICAgfVxuICAgIC8vIHggIT09IHggaXMgb25seSB0cnVlIGlmIHggaXMgTmFOLiBOYU4gaXMgXCJpbmNvbXBhcmFibGVcIiBhbmQgYm90aFxuICAgIC8vIGVxdWl2YWxlbnQgYW5kIGluY29tcGFyYWJsZSB2YWx1ZXMgYWx3YXlzIHJldHVybiAwLlxuICAgIGlmIChhID09PSBiIHx8IGEgIT09IGEgfHwgYiAhPT0gYilcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgdmFyIGFUeXBlID0gdHlwZW9mIGE7XG4gICAgdmFyIGJUeXBlID0gdHlwZW9mIGI7XG4gICAgaWYgKGFUeXBlID09PSBcIm51bWJlclwiICYmIGJUeXBlID09PSBcIm51bWJlclwiKVxuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgaWYgKGFUeXBlID09PSBcInN0cmluZ1wiICYmIGJUeXBlID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gYSA8IGIgPyAtSW5maW5pdHkgOiBJbmZpbml0eTtcbiAgICAgICAgLy8gdGhlIHBvc3NpYmlsaXR5IG9mIGVxdWFsaXR5IGVsaW1pYXRlZCBhYm92ZVxuICAgIGNvbXBhcmUgPSBjb21wYXJlIHx8IG1vZHVsZS5leHBvcnRzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGEpICYmIEFycmF5LmlzQXJyYXkoYikpIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gYSkge1xuICAgICAgICAgICAgaWYgKCEoaW5kZXggaW4gYikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpZmZlcmVuY2UgPSBjb21wYXJlKGFbaW5kZXhdLCBiW2luZGV4XSwgY29tcGFyZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGIpIHtcbiAgICAgICAgICAgIGlmICghKGluZGV4IGluIGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC1JbmZpbml0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGEgJiYgdHlwZW9mIGEuY29tcGFyZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gYS5jb21wYXJlKGIsIGNvbXBhcmUpO1xuICAgIC8vIG5vdCBjb21tdXRhdGl2ZSwgdGhlIHJlbGF0aW9uc2hpcCBpcyByZXZlcnNlZFxuICAgIGlmIChiICYmIHR5cGVvZiBiLmNvbXBhcmUgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIC1iLmNvbXBhcmUoYSwgY29tcGFyZSk7XG4gICAgcmV0dXJuIDA7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTWluaU1hcCA9IHJlcXVpcmUoXCJtaW5pLW1hcFwiKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAgICBQZXJmb3JtcyBhIHBvbHltb3JwaGljLCB0eXBlLXNlbnNpdGl2ZSBkZWVwIGVxdWl2YWxlbmNlIGNvbXBhcmlzb24gb2YgYW55XG4gICAgdHdvIHZhbHVlcy5cblxuICAgIDxwPkFzIGEgYmFzaWMgcHJpbmNpcGxlLCBhbnkgdmFsdWUgaXMgZXF1aXZhbGVudCB0byBpdHNlbGYgKGFzIGluXG4gICAgaWRlbnRpdHkpLCBhbnkgYm94ZWQgdmVyc2lvbiBvZiBpdHNlbGYgKGFzIGEgPGNvZGU+bmV3IE51bWJlcigxMCk8L2NvZGU+IGlzXG4gICAgdG8gMTApLCBhbmQgYW55IGRlZXAgY2xvbmUgb2YgaXRzZWxmLlxuXG4gICAgPHA+RXF1aXZhbGVuY2UgaGFzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcblxuICAgIDx1bD5cbiAgICAgICAgPGxpPjxzdHJvbmc+cG9seW1vcnBoaWM6PC9zdHJvbmc+XG4gICAgICAgICAgICBJZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIGEgdHlwZSB0aGF0IGltcGxlbWVudHMgYVxuICAgICAgICAgICAgbWV0aG9kcyBuYW1lZCBcImVxdWFsc1wiLCB0aGlzIGZ1bmN0aW9uIGRlZmVycyB0byB0aGUgbWV0aG9kLiAgU28sXG4gICAgICAgICAgICB0aGlzIGZ1bmN0aW9uIGNhbiBzYWZlbHkgY29tcGFyZSBhbnkgdmFsdWVzIHJlZ2FyZGxlc3Mgb2YgdHlwZSxcbiAgICAgICAgICAgIGluY2x1ZGluZyB1bmRlZmluZWQsIG51bGwsIG51bWJlcnMsIHN0cmluZ3MsIGFueSBwYWlyIG9mIG9iamVjdHNcbiAgICAgICAgICAgIHdoZXJlIGVpdGhlciBpbXBsZW1lbnRzIFwiZXF1YWxzXCIsIG9yIG9iamVjdCBsaXRlcmFscyB0aGF0IG1heSBldmVuXG4gICAgICAgICAgICBjb250YWluIGFuIFwiZXF1YWxzXCIga2V5LlxuICAgICAgICA8bGk+PHN0cm9uZz50eXBlLXNlbnNpdGl2ZTo8L3N0cm9uZz5cbiAgICAgICAgICAgIEluY29tcGFyYWJsZSB0eXBlcyBhcmUgbm90IGVxdWFsLiAgTm8gb2JqZWN0IGlzIGVxdWl2YWxlbnQgdG8gYW55XG4gICAgICAgICAgICBhcnJheS4gIE5vIHN0cmluZyBpcyBlcXVhbCB0byBhbnkgb3RoZXIgbnVtYmVyLlxuICAgICAgICA8bGk+PHN0cm9uZz5kZWVwOjwvc3Ryb25nPlxuICAgICAgICAgICAgQ29sbGVjdGlvbnMgd2l0aCBlcXVpdmFsZW50IGNvbnRlbnQgYXJlIGVxdWl2YWxlbnQsIHJlY3Vyc2l2ZWx5LlxuICAgICAgICA8bGk+PHN0cm9uZz5lcXVpdmFsZW5jZTo8L3N0cm9uZz5cbiAgICAgICAgICAgIElkZW50aWNhbCB2YWx1ZXMgYW5kIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBzbyBhcmUgY29sbGVjdGlvbnNcbiAgICAgICAgICAgIHRoYXQgY29udGFpbiBlcXVpdmFsZW50IGNvbnRlbnQuICBXaGV0aGVyIG9yZGVyIGlzIGltcG9ydGFudCB2YXJpZXNcbiAgICAgICAgICAgIGJ5IHR5cGUuICBGb3IgQXJyYXlzIGFuZCBsaXN0cywgb3JkZXIgaXMgaW1wb3J0YW50LiAgRm9yIE9iamVjdHMsXG4gICAgICAgICAgICBtYXBzLCBhbmQgc2V0cywgb3JkZXIgaXMgbm90IGltcG9ydGFudC4gIEJveGVkIG9iamVjdHMgYXJlIG11dGFsbHlcbiAgICAgICAgICAgIGVxdWl2YWxlbnQgd2l0aCB0aGVpciB1bmJveGVkIHZhbHVlcywgYnkgdmlydHVlIG9mIHRoZSBzdGFuZGFyZFxuICAgICAgICAgICAgPGNvZGU+dmFsdWVPZjwvY29kZT4gbWV0aG9kLlxuICAgIDwvdWw+XG4gICAgQHBhcmFtIHRoaXNcbiAgICBAcGFyYW0gdGhhdFxuICAgIEByZXR1cm5zIHtCb29sZWFufSB3aGV0aGVyIHRoZSB2YWx1ZXMgYXJlIGRlZXBseSBlcXVpdmFsZW50XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBlcXVhbHM7XG5mdW5jdGlvbiBlcXVhbHMoYSwgYiwgZXF1YWxzLCBtZW1vKSB7XG4gICAgZXF1YWxzID0gZXF1YWxzIHx8IG1vZHVsZS5leHBvcnRzO1xuICAgIC8vIHVuYm94IG9iamVjdHNcbiAgICBpZiAoYSAmJiB0eXBlb2YgYS52YWx1ZU9mID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgYSA9IGEudmFsdWVPZigpO1xuICAgIH1cbiAgICBpZiAoYiAmJiB0eXBlb2YgYi52YWx1ZU9mID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgYiA9IGIudmFsdWVPZigpO1xuICAgIH1cbiAgICBpZiAoYSA9PT0gYilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gTmFOICE9PSBOYU4sIGJ1dCB0aGV5IGFyZSBlcXVhbC5cbiAgICAvLyBOYU5zIGFyZSB0aGUgb25seSBub24tcmVmbGV4aXZlIHZhbHVlLCBpLmUuLCBpZiB4ICE9PSB4LFxuICAgIC8vIHRoZW4geCBpcyBhIE5hTi5cbiAgICAvLyBpc05hTiBpcyBicm9rZW46IGl0IGNvbnZlcnRzIGl0cyBhcmd1bWVudCB0byBudW1iZXIsIHNvXG4gICAgLy8gaXNOYU4oXCJmb29cIikgPT4gdHJ1ZVxuICAgIC8vIFdlIGhhdmUgZXN0YWJsaXNoZWQgdGhhdCBhICE9PSBiLCBidXQgaWYgYSAhPT0gYSAmJiBiICE9PSBiLCB0aGV5IGFyZVxuICAgIC8vIGJvdGggTmFOLlxuICAgIGlmIChhICE9PSBhICYmIGIgIT09IGIpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmICghYSB8fCAhYilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0eXBlb2YgYSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtZW1vID0gbWVtbyB8fCBuZXcgTWluaU1hcCgpO1xuICAgICAgICBpZiAobWVtby5oYXMoYSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG1lbW8uc2V0KGEsIHRydWUpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEuZXF1YWxzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGEuZXF1YWxzKGIsIGVxdWFscywgbWVtbyk7XG4gICAgfVxuICAgIC8vIGNvbW11dGF0aXZlXG4gICAgaWYgKHR5cGVvZiBiLmVxdWFscyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBiLmVxdWFscyhhLCBlcXVhbHMsIG1lbW8pO1xuICAgIH1cbiAgICBpZiAoKEFycmF5LmlzQXJyYXkoYSkgfHwgQXJyYXkuaXNBcnJheShiKSkgJiYgYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBiID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGdldFByb3RvdHlwZU9mKGEpID09PSBvYmplY3RQcm90b3R5cGUgJiZcbiAgICAgICAgICAgIGdldFByb3RvdHlwZU9mKGIpID09PSBvYmplY3RQcm90b3R5cGUgfHxcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoYSkgfHxcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoYilcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVxdWFscyhhW25hbWVdLCBiW25hbWVdLCBlcXVhbHMsIG1lbW8pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShuYW1lIGluIGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIEJlY2F1c2UgYSByZXR1cm4gdmFsdWUgb2YgMCBmcm9tIGEgYGNvbXBhcmVgIGZ1bmN0aW9uICBtYXkgbWVhbiBlaXRoZXJcbi8vIFwiZXF1YWxzXCIgb3IgXCJpcyBpbmNvbXBhcmFibGVcIiwgYGVxdWFsc2AgY2Fubm90IGJlIGRlZmluZWQgaW4gdGVybXMgb2Zcbi8vIGBjb21wYXJlYC4gIEhvd2V2ZXIsIGBjb21wYXJlYCAqY2FuKiBiZSBkZWZpbmVkIGluIHRlcm1zIG9mIGBlcXVhbHNgIGFuZFxuLy8gYGxlc3NUaGFuYC4gIEFnYWluIGhvd2V2ZXIsIG1vcmUgb2Z0ZW4gaXQgd291bGQgYmUgZGVzaXJhYmxlIHRvIGltcGxlbWVudFxuLy8gYWxsIG9mIHRoZSBjb21wYXJpc29uIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBjb21wYXJlIHJhdGhlciB0aGFuIHRoZSBvdGhlclxuLy8gd2F5IGFyb3VuZC5cblxuIiwiLypcbiAqIEJhc2VkIGluIHBhcnQgb24gb2JzZXJ2YWJsZSBhcnJheXMgZnJvbSBNb3Rvcm9sYSBNb2JpbGl0eeKAmXMgTW9udGFnZVxuICogQ29weXJpZ2h0IChjKSAyMDEyLCBNb3Rvcm9sYSBNb2JpbGl0eSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogMy1DbGF1c2UgQlNEIExpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3Rvcm9sYS1tb2JpbGl0eS9tb250YWdlL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIHJlc3BvbnNpYmxlIGZvciBvYnNlcnZpbmcgY2hhbmdlcyB0byBvd25lZCBwcm9wZXJ0aWVzIG9mXG4gKiBvYmplY3RzIGFuZCBjaGFuZ2VzIHRvIHRoZSBjb250ZW50IG9mIGFycmF5cyBjYXVzZWQgYnkgbWV0aG9kIGNhbGxzLiBUaGVcbiAqIGludGVyZmFjZSBmb3Igb2JzZXJ2aW5nIGFycmF5IGNvbnRlbnQgY2hhbmdlcyBlc3RhYmxpc2hlcyB0aGUgbWV0aG9kc1xuICogbmVjZXNzYXJ5IGZvciBhbnkgY29sbGVjdGlvbiB3aXRoIG9ic2VydmFibGUgY29udGVudC5cbiAqL1xuXG52YXIgT28gPSByZXF1aXJlKFwiLi9vYnNlcnZhYmxlLW9iamVjdFwiKTtcbnZhciBPciA9IHJlcXVpcmUoXCIuL29ic2VydmFibGUtcmFuZ2VcIik7XG52YXIgT20gPSByZXF1aXJlKFwiLi9vYnNlcnZhYmxlLW1hcFwiKTtcblxudmFyIGFycmF5X3N3YXAgPSByZXF1aXJlKFwicG9wLXN3YXAvc3dhcFwiKTtcbnZhciBhcnJheV9zcGxpY2UgPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlO1xudmFyIGFycmF5X3NsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGFycmF5X3JldmVyc2UgPSBBcnJheS5wcm90b3R5cGUucmV2ZXJzZTtcbnZhciBhcnJheV9zb3J0ID0gQXJyYXkucHJvdG90eXBlLnNvcnQ7XG52YXIgYXJyYXlfZW1wdHkgPSBbXTtcblxudmFyIG9ic2VydmFibGVBcnJheVByb3BlcnRpZXMgPSB7XG5cbiAgICBzd2FwOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzd2FwKHN0YXJ0LCBtaW51c0xlbmd0aCwgcGx1cykge1xuICAgICAgICAgICAgaWYgKHBsdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGx1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1cyA9IGFycmF5X3NsaWNlLmNhbGwocGx1cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwbHVzID0gYXJyYXlfZW1wdHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGFydCA8IDApIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaG9sZXMgPSBzdGFydCAtIHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBuZXdQbHVzID0gQXJyYXkoaG9sZXMgKyBwbHVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBob2xlczsgaSA8IHBsdXMubGVuZ3RoOyBpKyssIGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSBpbiBwbHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQbHVzW2pdID0gcGx1c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwbHVzID0gbmV3UGx1cztcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhcnQgKyBtaW51c0xlbmd0aCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gVHJ1bmNhdGUgbWludXMgbGVuZ3RoIGlmIGl0IGV4dGVuZHMgYmV5b25kIHRoZSBsZW5ndGhcbiAgICAgICAgICAgICAgICBtaW51c0xlbmd0aCA9IHRoaXMubGVuZ3RoIC0gc3RhcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1pbnVzTGVuZ3RoIDwgMCkge1xuICAgICAgICAgICAgICAgIC8vIEl0IGlzIHRoZSBKYXZhU2NyaXB0IHdheS5cbiAgICAgICAgICAgICAgICBtaW51c0xlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtaW51cztcbiAgICAgICAgICAgIGlmIChtaW51c0xlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG1pbnVzIHdpbGwgYmUgZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAocGx1cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCBpZiBwbHVzIGlzIGVtcHR5IHRoZXJlIGlzIG5vdGhpbmcgdG8gZG8uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTsgLy8gW10sIGJ1dCBzcGFyZSB1cyBhbiBpbnN0YW50aWF0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1pbnVzID0gYXJyYXlfZW1wdHk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pbnVzID0gYXJyYXlfc2xpY2UuY2FsbCh0aGlzLCBzdGFydCwgc3RhcnQgKyBtaW51c0xlbmd0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaWZmID0gcGx1cy5sZW5ndGggLSBtaW51cy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgb2xkTGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgbmV3TGVuZ3RoID0gTWF0aC5tYXgodGhpcy5sZW5ndGggKyBkaWZmLCBzdGFydCArIHBsdXMubGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBsb25nZXN0ID0gTWF0aC5tYXgob2xkTGVuZ3RoLCBuZXdMZW5ndGgpO1xuICAgICAgICAgICAgdmFyIG9ic2VydmVkTGVuZ3RoID0gTWF0aC5taW4obG9uZ2VzdCwgdGhpcy5vYnNlcnZlZExlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIGRpc3BhdGNoIGJlZm9yZSBjaGFuZ2UgZXZlbnRzXG4gICAgICAgICAgICBpZiAoZGlmZikge1xuICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIFwibGVuZ3RoXCIsIG5ld0xlbmd0aCwgb2xkTGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9yLmRpc3BhdGNoUmFuZ2VXaWxsQ2hhbmdlKHRoaXMsIHBsdXMsIG1pbnVzLCBzdGFydCk7XG4gICAgICAgICAgICBpZiAoZGlmZiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFN1YnN0cmluZyByZXBsYWNlbWVudFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydCwgaiA9IDA7IGkgPCBzdGFydCArIHBsdXMubGVuZ3RoOyBpKyssIGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGx1c1tqXSAhPT0gbWludXNbal0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIGksIHBsdXNbal0sIG1pbnVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwV2lsbENoYW5nZSh0aGlzLCBcInVwZGF0ZVwiLCBpLCBwbHVzW2pdLCBtaW51c1tqXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFsbCBzdWJzZXF1ZW50IHZhbHVlcyBjaGFuZ2VkIG9yIHNoaWZ0ZWQuXG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgKG9ic2VydmVkTGVuZ3RoIC0gc3RhcnQpIGxvbmcgd2Fsa3MgaWYgdGhlcmUgYXJlIG5vXG4gICAgICAgICAgICAgICAgLy8gcmVnaXN0ZXJlZCBkZXNjcmlwdG9ycy5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQsIGogPSAwOyBpIDwgb2JzZXJ2ZWRMZW5ndGg7IGkrKywgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgb2xkTGVuZ3RoICYmIGkgPCBuZXdMZW5ndGgpIHsgLy8gdXBkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA8IHBsdXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsdXNbal0gIT09IHRoaXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgaSwgcGx1c1tqXSwgdGhpc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwV2lsbENoYW5nZSh0aGlzLCBcInVwZGF0ZVwiLCBpLCBwbHVzW2pdLCB0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2kgLSBkaWZmXSAhPT0gdGhpc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5V2lsbENoYW5nZSh0aGlzLCBpLCB0aGlzW2kgLSBkaWZmXSwgdGhpc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwV2lsbENoYW5nZSh0aGlzLCBcInVwZGF0ZVwiLCBpLCB0aGlzW2kgLSBkaWZmXSwgdGhpc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPCBuZXdMZW5ndGgpIHsgLy8gYnV0IGkgPj0gb2xkTGVuZ3RoLCBjcmVhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgcGx1cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGx1c1tqXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIGksIHBsdXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbS5kaXNwYXRjaE1hcFdpbGxDaGFuZ2UodGhpcywgXCJjcmVhdGVcIiwgaSwgcGx1c1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2kgLSBkaWZmXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIGksIHRoaXNbaSAtIGRpZmZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKHRoaXMsIFwiY3JlYXRlXCIsIGksIHRoaXNbaSAtIGRpZmZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgb2xkTGVuZ3RoKSB7IC8vIGJ1dCBpID49IG5ld0xlbmd0aCwgZGVsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgaSwgdm9pZCAwLCB0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwV2lsbENoYW5nZSh0aGlzLCBcImRlbGV0ZVwiLCBpLCB2b2lkIDAsIHRoaXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXNzZXJ0aW9uIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhY3R1YWwgd29ya1xuICAgICAgICAgICAgYXJyYXlfc3dhcCh0aGlzLCBzdGFydCwgbWludXNMZW5ndGgsIHBsdXMpO1xuXG4gICAgICAgICAgICAvLyBkaXNwYXRjaCBhZnRlciBjaGFuZ2UgZXZlbnRzXG4gICAgICAgICAgICBpZiAoZGlmZiA9PT0gMCkgeyAvLyBzdWJzdHJpbmcgcmVwbGFjZW1lbnRcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQsIGogPSAwOyBpIDwgc3RhcnQgKyBwbHVzLmxlbmd0aDsgaSsrLCBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdXNbal0gIT09IG1pbnVzW2pdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIGksIHBsdXNbal0sIG1pbnVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwQ2hhbmdlKHRoaXMsIFwidXBkYXRlXCIsIGksIHBsdXNbal0sIG1pbnVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWxsIHN1YnNlcXVlbnQgdmFsdWVzIGNoYW5nZWQgb3Igc2hpZnRlZC5cbiAgICAgICAgICAgICAgICAvLyBBdm9pZCAob2JzZXJ2ZWRMZW5ndGggLSBzdGFydCkgbG9uZyB3YWxrcyBpZiB0aGVyZSBhcmUgbm9cbiAgICAgICAgICAgICAgICAvLyByZWdpc3RlcmVkIGRlc2NyaXB0b3JzLlxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydCwgaiA9IDA7IGkgPCBvYnNlcnZlZExlbmd0aDsgaSsrLCBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBvbGRMZW5ndGggJiYgaSA8IG5ld0xlbmd0aCkgeyAvLyB1cGRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgbWludXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbaV0gIT09IG1pbnVzW2pdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlDaGFuZ2UodGhpcywgaSwgdGhpc1tpXSwgbWludXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbS5kaXNwYXRjaE1hcENoYW5nZSh0aGlzLCBcInVwZGF0ZVwiLCBpLCB0aGlzW2ldLCBtaW51c1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSAhPT0gdGhpc1tpICsgZGlmZl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSh0aGlzLCBpLCB0aGlzW2ldLCB0aGlzW2kgKyBkaWZmXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwQ2hhbmdlKHRoaXMsIFwidXBkYXRlXCIsIGksIHRoaXNbaV0sIHRoaXNbaSArIGRpZmZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IG5ld0xlbmd0aCkgeyAvLyBidXQgaSA+PSBvbGRMZW5ndGgsIGNyZWF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBtaW51cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSAhPT0gbWludXNbal0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSh0aGlzLCBpLCB0aGlzW2ldLCBtaW51c1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwQ2hhbmdlKHRoaXMsIFwiY3JlYXRlXCIsIGksIHRoaXNbaV0sIG1pbnVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbaV0gIT09IHRoaXNbaSArIGRpZmZdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlDaGFuZ2UodGhpcywgaSwgdGhpc1tpXSwgdGhpc1tpICsgZGlmZl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbS5kaXNwYXRjaE1hcENoYW5nZSh0aGlzLCBcImNyZWF0ZVwiLCBpLCB0aGlzW2ldLCB0aGlzW2kgKyBkaWZmXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IG9sZExlbmd0aCkgeyAvLyBidXQgaSA+PSBuZXdMZW5ndGgsIGRlbGV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBtaW51cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWludXNbal0gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIGksIHZvaWQgMCwgbWludXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbS5kaXNwYXRjaE1hcENoYW5nZSh0aGlzLCBcImRlbGV0ZVwiLCBpLCB2b2lkIDAsIG1pbnVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbaSArIGRpZmZdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSh0aGlzLCBpLCB2b2lkIDAsIHRoaXNbaSArIGRpZmZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBDaGFuZ2UodGhpcywgXCJkZWxldGVcIiwgaSwgdm9pZCAwLCB0aGlzW2kgKyBkaWZmXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3NlcnRpb24gZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9yLmRpc3BhdGNoUmFuZ2VDaGFuZ2UodGhpcywgcGx1cywgbWludXMsIHN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChkaWZmKSB7XG4gICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSh0aGlzLCBcImxlbmd0aFwiLCBuZXdMZW5ndGgsIG9sZExlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgc3BsaWNlOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzcGxpY2Uoc3RhcnQsIG1pbnVzTGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zbGljZShzdGFydCwgc3RhcnQgKyBtaW51c0xlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLnN3YXAuY2FsbCh0aGlzLCBzdGFydCwgbWludXNMZW5ndGgsIGFycmF5X3NsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIC8vIHNwbGljZSBpcyB0aGUgYXJyYXkgY29udGVudCBjaGFuZ2UgdXRpbGl0eSBiZWx0LiAgZm9yd2FyZCBhbGwgb3RoZXJcbiAgICAvLyBjb250ZW50IGNoYW5nZXMgdG8gc3BsaWNlIHNvIHdlIG9ubHkgaGF2ZSB0byB3cml0ZSBvYnNlcnZlciBjb2RlIGluIG9uZVxuICAgIC8vIHBsYWNlXG5cbiAgICByZXZlcnNlOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgICAgICAgICAgdmFyIHJldmVyc2VkID0gdGhpcy5zbGljZSgpO1xuICAgICAgICAgICAgcmV2ZXJzZWQucmV2ZXJzZSgpO1xuICAgICAgICAgICAgdGhpcy5zd2FwKDAsIHRoaXMubGVuZ3RoLCByZXZlcnNlZCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBzb3J0OiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0KCkge1xuICAgICAgICAgICAgdmFyIHNvcnRlZCA9IHRoaXMuc2xpY2UoKTtcbiAgICAgICAgICAgIGFycmF5X3NvcnQuYXBwbHkoc29ydGVkLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5zd2FwKDAsIHRoaXMubGVuZ3RoLCBzb3J0ZWQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgc2V0OiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXQoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnN3YXAoaW5kZXgsIGluZGV4ID49IHRoaXMubGVuZ3RoID8gMCA6IDEsIFt2YWx1ZV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgc2hpZnQ6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNoaWZ0KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5zd2FwKDAsIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgcG9wOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwb3AoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpc1t0aGlzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIHRoaXMuc3dhcCh0aGlzLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgcHVzaDoge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHVzaCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zd2FwKHRoaXMubGVuZ3RoLCAwLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIHVuc2hpZnQ6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHVuc2hpZnQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhcCgwLCAwLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIGNsZWFyOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhcCgwLCB0aGlzLmxlbmd0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG5cbn07XG5cbnZhciBoaWRkZW5Qcm9wZXJ0eSA9IHtcbiAgICB2YWx1ZTogbnVsbCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbn07XG5cbnZhciBvYnNlcnZhYmxlQXJyYXlPd25Qcm9wZXJ0aWVzID0ge1xuICAgIG9ic2VydmVkOiBoaWRkZW5Qcm9wZXJ0eSxcbiAgICBvYnNlcnZlZExlbmd0aDogaGlkZGVuUHJvcGVydHksXG5cbiAgICBwcm9wZXJ0eU9ic2VydmVyczogaGlkZGVuUHJvcGVydHksXG4gICAgd3JhcHBlZFByb3BlcnR5RGVzY3JpcHRvcnM6IGhpZGRlblByb3BlcnR5LFxuXG4gICAgcmFuZ2VDaGFuZ2VPYnNlcnZlcnM6IGhpZGRlblByb3BlcnR5LFxuICAgIHJhbmdlV2lsbENoYW5nZU9ic2VydmVyczogaGlkZGVuUHJvcGVydHksXG4gICAgZGlzcGF0Y2hlc1JhbmdlQ2hhbmdlczogaGlkZGVuUHJvcGVydHksXG5cbiAgICBtYXBDaGFuZ2VPYnNlcnZlcnM6IGhpZGRlblByb3BlcnR5LFxuICAgIG1hcFdpbGxDaGFuZ2VPYnNlcnZlcnM6IGhpZGRlblByb3BlcnR5LFxuICAgIGRpc3BhdGNoZXNNYXBDaGFuZ2VzOiBoaWRkZW5Qcm9wZXJ0eVxufTtcblxuLy8gdXNlIGRpZmZlcmVudCBzdHJhdGVnaWVzIGZvciBtYWtpbmcgYXJyYXlzIG9ic2VydmFibGUgYmV0d2VlbiBJbnRlcm5ldFxuLy8gRXhwbG9yZXIgYW5kIG90aGVyIGJyb3dzZXJzLlxudmFyIHByb3RvSXNTdXBwb3J0ZWQgPSB7fS5fX3Byb3RvX18gPT09IE9iamVjdC5wcm90b3R5cGU7XG52YXIgYmVzdG93T2JzZXJ2YWJsZUFycmF5UHJvcGVydGllcztcbmlmIChwcm90b0lzU3VwcG9ydGVkKSB7XG4gICAgdmFyIG9ic2VydmFibGVBcnJheVByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQXJyYXkucHJvdG90eXBlLCBvYnNlcnZhYmxlQXJyYXlQcm9wZXJ0aWVzKTtcbiAgICBiZXN0b3dPYnNlcnZhYmxlQXJyYXlQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgIGFycmF5Ll9fcHJvdG9fXyA9IG9ic2VydmFibGVBcnJheVByb3RvdHlwZTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBiZXN0b3dPYnNlcnZhYmxlQXJyYXlQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGFycmF5LCBvYnNlcnZhYmxlQXJyYXlQcm9wZXJ0aWVzKTtcbiAgICB9O1xufVxuXG5leHBvcnRzLm1ha2VBcnJheU9ic2VydmFibGUgPSBtYWtlQXJyYXlPYnNlcnZhYmxlO1xuZnVuY3Rpb24gbWFrZUFycmF5T2JzZXJ2YWJsZShhcnJheSkge1xuICAgIGlmIChhcnJheS5vYnNlcnZlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGJlc3Rvd09ic2VydmFibGVBcnJheVByb3BlcnRpZXMoYXJyYXkpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGFycmF5LCBvYnNlcnZhYmxlQXJyYXlPd25Qcm9wZXJ0aWVzKTtcbiAgICBhcnJheS5vYnNlcnZlZExlbmd0aCA9IDA7XG4gICAgYXJyYXkub2JzZXJ2ZWQgPSB0cnVlO1xufVxuXG4vLyBGb3IgT2JzZXJ2YWJsZU9iamVjdFxuZXhwb3J0cy5tYWtlUHJvcGVydHlPYnNlcnZhYmxlID0gbWFrZVByb3BlcnR5T2JzZXJ2YWJsZTtcbmZ1bmN0aW9uIG1ha2VQcm9wZXJ0eU9ic2VydmFibGUoYXJyYXksIGluZGV4KSB7XG4gICAgbWFrZUFycmF5T2JzZXJ2YWJsZShhcnJheSk7XG4gICAgaWYgKH5+aW5kZXggPT09IGluZGV4ICYmIGluZGV4ID49IDApIHsgLy8gTm90ZTogTmFOICE9PSBOYU4sIH5+XCJmb29cIiAhPT0gXCJmb29cIlxuICAgICAgICBtYWtlSW5kZXhPYnNlcnZhYmxlKGFycmF5LCBpbmRleCk7XG4gICAgfVxufVxuXG4vLyBGb3IgT2JzZXJ2YWJsZVJhbmdlXG5leHBvcnRzLm1ha2VSYW5nZUNoYW5nZXNPYnNlcnZhYmxlID0gbWFrZVJhbmdlQ2hhbmdlc09ic2VydmFibGU7XG5mdW5jdGlvbiBtYWtlUmFuZ2VDaGFuZ2VzT2JzZXJ2YWJsZShhcnJheSkge1xuICAgIG1ha2VBcnJheU9ic2VydmFibGUoYXJyYXkpO1xufVxuXG4vLyBGb3IgT2JzZXJ2YWJsZU1hcFxuZXhwb3J0cy5tYWtlTWFwQ2hhbmdlc09ic2VydmFibGUgPSBtYWtlTWFwQ2hhbmdlc09ic2VydmFibGU7XG5mdW5jdGlvbiBtYWtlTWFwQ2hhbmdlc09ic2VydmFibGUoYXJyYXkpIHtcbiAgICBtYWtlQXJyYXlPYnNlcnZhYmxlKGFycmF5KTtcbiAgICBtYWtlSW5kZXhPYnNlcnZhYmxlKGFycmF5LCBJbmZpbml0eSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VJbmRleE9ic2VydmFibGUoYXJyYXksIGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID49IGFycmF5Lm9ic2VydmVkTGVuZ3RoKSB7XG4gICAgICAgIGFycmF5Lm9ic2VydmVkTGVuZ3RoID0gaW5kZXggKyAxO1xuICAgIH1cbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvYnNlcnZlckZyZWVMaXN0ID0gW107XG52YXIgb2JzZXJ2ZXJUb0ZyZWVMaXN0ID0gW107XG52YXIgZGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYnNlcnZhYmxlTWFwO1xuZnVuY3Rpb24gT2JzZXJ2YWJsZU1hcCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjb25zdHJ1Y3QuIE9ic2VydmFibGVNYXAgaXMgYSBtaXhpbi5cIik7XG59XG5cbk9ic2VydmFibGVNYXAucHJvdG90eXBlLm9ic2VydmVNYXBDaGFuZ2UgPSBmdW5jdGlvbiAoaGFuZGxlciwgbmFtZSwgbm90ZSwgY2FwdHVyZSkge1xuICAgIHJldHVybiBvYnNlcnZlTWFwQ2hhbmdlKHRoaXMsIGhhbmRsZXIsIG5hbWUsIG5vdGUsIGNhcHR1cmUpO1xufTtcblxuT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUub2JzZXJ2ZU1hcFdpbGxDaGFuZ2UgPSBmdW5jdGlvbiAoaGFuZGxlciwgbmFtZSwgbm90ZSkge1xuICAgIHJldHVybiBvYnNlcnZlTWFwQ2hhbmdlKHRoaXMsIGhhbmRsZXIsIG5hbWUsIG5vdGUsIHRydWUpO1xufTtcblxuT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuZGlzcGF0Y2hNYXBDaGFuZ2UgPSBmdW5jdGlvbiAodHlwZSwga2V5LCBwbHVzLCBtaW51cywgY2FwdHVyZSkge1xuICAgIHJldHVybiBkaXNwYXRjaE1hcENoYW5nZSh0aGlzLCB0eXBlLCBrZXksIHBsdXMsIG1pbnVzLCBjYXB0dXJlKTtcbn07XG5cbk9ic2VydmFibGVNYXAucHJvdG90eXBlLmRpc3BhdGNoTWFwV2lsbENoYW5nZSA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHBsdXMsIG1pbnVzKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoTWFwV2lsbENoYW5nZSh0aGlzLCB0eXBlLCBrZXksIHBsdXMsIG1pbnVzLCB0cnVlKTtcbn07XG5cbk9ic2VydmFibGVNYXAucHJvdG90eXBlLmdldE1hcENoYW5nZU9ic2VydmVycyA9IGZ1bmN0aW9uIChjYXB0dXJlKSB7XG4gICAgcmV0dXJuIGdldE1hcENoYW5nZU9ic2VydmVycyh0aGlzLCBjYXB0dXJlKTtcbn07XG5cbk9ic2VydmFibGVNYXAucHJvdG90eXBlLmdldE1hcFdpbGxDaGFuZ2VPYnNlcnZlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldE1hcENoYW5nZU9ic2VydmVycyh0aGlzLCB0cnVlKTtcbn07XG5cbk9ic2VydmFibGVNYXAub2JzZXJ2ZU1hcENoYW5nZSA9IG9ic2VydmVNYXBDaGFuZ2U7XG5mdW5jdGlvbiBvYnNlcnZlTWFwQ2hhbmdlKG9iamVjdCwgaGFuZGxlciwgbmFtZSwgbm90ZSwgY2FwdHVyZSkge1xuICAgIG1ha2VNYXBDaGFuZ2VzT2JzZXJ2YWJsZShvYmplY3QpO1xuICAgIHZhciBvYnNlcnZlcnMgPSBnZXRNYXBDaGFuZ2VPYnNlcnZlcnMob2JqZWN0LCBjYXB0dXJlKTtcblxuICAgIHZhciBvYnNlcnZlcjtcbiAgICBpZiAob2JzZXJ2ZXJGcmVlTGlzdC5sZW5ndGgpIHsgLy8gVE9ETyAhZGVidWc/XG4gICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJGcmVlTGlzdC5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBNYXBDaGFuZ2VPYnNlcnZlcigpO1xuICAgIH1cblxuICAgIG9ic2VydmVyLm9iamVjdCA9IG9iamVjdDtcbiAgICBvYnNlcnZlci5uYW1lID0gbmFtZTtcbiAgICBvYnNlcnZlci5jYXB0dXJlID0gY2FwdHVyZTtcbiAgICBvYnNlcnZlci5vYnNlcnZlcnMgPSBvYnNlcnZlcnM7XG4gICAgb2JzZXJ2ZXIuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgb2JzZXJ2ZXIubm90ZSA9IG5vdGU7XG5cbiAgICAvLyBQcmVjb21wdXRlIGRpc3BhdGNoIG1ldGhvZCBuYW1lXG5cbiAgICB2YXIgc3RyaW5nTmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBBcnJheSBpbmRpY2lkZXMgbXVzdCBiZSBjb2VyY2VkIHRvIHN0cmluZy5cbiAgICB2YXIgcHJvcGVydHlOYW1lID0gc3RyaW5nTmFtZS5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nTmFtZS5zbGljZSgxKTtcblxuICAgIGlmICghY2FwdHVyZSkge1xuICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IFwiaGFuZGxlXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIk1hcENoYW5nZVwiO1xuICAgICAgICBpZiAoaGFuZGxlclttZXRob2ROYW1lXSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBtZXRob2ROYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIuaGFuZGxlTWFwQ2hhbmdlKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IFwiaGFuZGxlTWFwQ2hhbmdlXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlci5jYWxsKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBhcnJhbmdlIHRvIGRpc3BhdGNoIG1hcCBjaGFuZ2VzIHRvIFwiICsgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IFwiaGFuZGxlXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIk1hcFdpbGxDaGFuZ2VcIjtcbiAgICAgICAgaWYgKGhhbmRsZXJbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gbWV0aG9kTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyLmhhbmRsZU1hcFdpbGxDaGFuZ2UpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gXCJoYW5kbGVNYXBXaWxsQ2hhbmdlXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlci5jYWxsKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBhcnJhbmdlIHRvIGRpc3BhdGNoIG1hcCBjaGFuZ2VzIHRvIFwiICsgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG5cbiAgICAvLyBUT0RPIGlzc3VlIHdhcm5pbmcgaWYgdGhlIG51bWJlciBvZiBoYW5kbGVyIHJlY29yZHMgaXMgd29ycmlzb21lXG4gICAgcmV0dXJuIG9ic2VydmVyO1xufVxuXG5PYnNlcnZhYmxlTWFwLm9ic2VydmVNYXBXaWxsQ2hhbmdlID0gb2JzZXJ2ZU1hcFdpbGxDaGFuZ2U7XG5mdW5jdGlvbiBvYnNlcnZlTWFwV2lsbENoYW5nZShvYmplY3QsIGhhbmRsZXIsIG5hbWUsIG5vdGUpIHtcbiAgICByZXR1cm4gb2JzZXJ2ZU1hcENoYW5nZShvYmplY3QsIGhhbmRsZXIsIG5hbWUsIG5vdGUsIHRydWUpO1xufVxuXG5PYnNlcnZhYmxlTWFwLmRpc3BhdGNoTWFwQ2hhbmdlID0gZGlzcGF0Y2hNYXBDaGFuZ2U7XG5mdW5jdGlvbiBkaXNwYXRjaE1hcENoYW5nZShvYmplY3QsIHR5cGUsIGtleSwgcGx1cywgbWludXMsIGNhcHR1cmUpIHtcbiAgICBpZiAocGx1cyA9PT0gbWludXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWRpc3BhdGNoaW5nKSB7IC8vIFRPRE8gJiYgIWRlYnVnP1xuICAgICAgICByZXR1cm4gc3RhcnRNYXBDaGFuZ2VEaXNwYXRjaENvbnRleHQob2JqZWN0LCB0eXBlLCBrZXksIHBsdXMsIG1pbnVzLCBjYXB0dXJlKTtcbiAgICB9XG4gICAgdmFyIG9ic2VydmVycyA9IGdldE1hcENoYW5nZU9ic2VydmVycyhvYmplY3QsIGNhcHR1cmUpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBvYnNlcnZlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IG9ic2VydmVyc1tpbmRleF07XG4gICAgICAgIG9ic2VydmVyLmRpc3BhdGNoKHR5cGUsIGtleSwgcGx1cywgbWludXMpO1xuICAgIH1cbn1cblxuT2JzZXJ2YWJsZU1hcC5kaXNwYXRjaE1hcFdpbGxDaGFuZ2UgPSBkaXNwYXRjaE1hcFdpbGxDaGFuZ2U7XG5mdW5jdGlvbiBkaXNwYXRjaE1hcFdpbGxDaGFuZ2Uob2JqZWN0LCB0eXBlLCBrZXksIHBsdXMsIG1pbnVzKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoTWFwQ2hhbmdlKG9iamVjdCwgdHlwZSwga2V5LCBwbHVzLCBtaW51cywgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0TWFwQ2hhbmdlRGlzcGF0Y2hDb250ZXh0KG9iamVjdCwgdHlwZSwga2V5LCBwbHVzLCBtaW51cywgY2FwdHVyZSkge1xuICAgIGRpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBkaXNwYXRjaE1hcENoYW5nZShvYmplY3QsIHR5cGUsIGtleSwgcGx1cywgbWludXMsIGNhcHR1cmUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIk1hcCBjaGFuZ2UgZGlzcGF0Y2ggcG9zc2libHkgY29ycnVwdGVkIGJ5IGVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hcCBjaGFuZ2UgZGlzcGF0Y2ggcG9zc2libHkgY29ycnVwdGVkIGJ5IGVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChvYnNlcnZlclRvRnJlZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBVc2luZyBwdXNoLmFwcGx5IGluc3RlYWQgb2YgYWRkRWFjaCBiZWNhdXNlIHB1c2ggd2lsbCBkZWZpbml0ZWx5XG4gICAgICAgICAgICAvLyBiZSBtdWNoIGZhc3RlciB0aGFuIHRoZSBnZW5lcmljIGFkZEVhY2gsIHdoaWNoIGFsc28gaGFuZGxlc1xuICAgICAgICAgICAgLy8gbm9uLWFycmF5IGNvbGxlY3Rpb25zLlxuICAgICAgICAgICAgb2JzZXJ2ZXJGcmVlTGlzdC5wdXNoLmFwcGx5KFxuICAgICAgICAgICAgICAgIG9ic2VydmVyRnJlZUxpc3QsXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJUb0ZyZWVMaXN0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gVXNpbmcgY2xlYXIgYmVjYXVzZSBpdCBpcyBvYnNlcnZhYmxlLiBUaGUgaGFuZGxlciByZWNvcmQgYXJyYXlcbiAgICAgICAgICAgIC8vIGlzIG9idGFpbmFibGUgYnkgZ2V0UHJvcGVydHlDaGFuZ2VPYnNlcnZlcnMsIGFuZCBpcyBvYnNlcnZhYmxlLlxuICAgICAgICAgICAgb2JzZXJ2ZXJUb0ZyZWVMaXN0LmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE1hcENoYW5nZU9ic2VydmVycyhvYmplY3QsIGNhcHR1cmUpIHtcbiAgICBpZiAoY2FwdHVyZSkge1xuICAgICAgICBpZiAoIW9iamVjdC5tYXBXaWxsQ2hhbmdlT2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICBvYmplY3QubWFwV2lsbENoYW5nZU9ic2VydmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3QubWFwV2lsbENoYW5nZU9ic2VydmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIW9iamVjdC5tYXBDaGFuZ2VPYnNlcnZlcnMpIHtcbiAgICAgICAgICAgIG9iamVjdC5tYXBDaGFuZ2VPYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0Lm1hcENoYW5nZU9ic2VydmVycztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE1hcFdpbGxDaGFuZ2VPYnNlcnZlcnMob2JqZWN0KSB7XG4gICAgcmV0dXJuIGdldE1hcENoYW5nZU9ic2VydmVycyhvYmplY3QsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBtYWtlTWFwQ2hhbmdlc09ic2VydmFibGUob2JqZWN0KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICBPYS5tYWtlTWFwQ2hhbmdlc09ic2VydmFibGUob2JqZWN0KTtcbiAgICB9XG4gICAgaWYgKG9iamVjdC5tYWtlTWFwQ2hhbmdlc09ic2VydmFibGUpIHtcbiAgICAgICAgb2JqZWN0Lm1ha2VNYXBDaGFuZ2VzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbiAgICBvYmplY3QuZGlzcGF0Y2hlc01hcENoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBNYXBDaGFuZ2VPYnNlcnZlcigpIHtcbiAgICB0aGlzLmluaXQoKTtcbn1cblxuTWFwQ2hhbmdlT2JzZXJ2ZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vYmplY3QgPSBudWxsO1xuICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgdGhpcy5vYnNlcnZlcnMgPSBudWxsO1xuICAgIHRoaXMuaGFuZGxlciA9IG51bGw7XG4gICAgdGhpcy5oYW5kbGVyTWV0aG9kTmFtZSA9IG51bGw7XG4gICAgdGhpcy5jaGlsZE9ic2VydmVyID0gbnVsbDtcbiAgICB0aGlzLm5vdGUgPSBudWxsO1xuICAgIHRoaXMuY2FwdHVyZSA9IG51bGw7XG59O1xuXG5NYXBDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICB2YXIgaW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZih0aGlzKTtcbiAgICAvLyBVbmZvcnR1bmF0ZWx5LCBpZiB0aGlzIG9ic2VydmVyIHdhcyByZXVzZWQsIHRoaXMgd291bGQgbm90IGJlIHN1ZmZpY2llbnRcbiAgICAvLyB0byBkZXRlY3QgYSBkdXBsaWNhdGUgY2FuY2VsLiBEbyBub3QgY2FuY2VsIG1vcmUgdGhhbiBvbmNlLlxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCJDYW4ndCBjYW5jZWwgb2JzZXJ2ZXIgZm9yIFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMubmFtZSkgKyBcIiBtYXAgY2hhbmdlc1wiICtcbiAgICAgICAgICAgIFwiIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBjYW5jZWxlZFwiXG4gICAgICAgICk7XG4gICAgfVxuICAgIHZhciBjaGlsZE9ic2VydmVyID0gdGhpcy5jaGlsZE9ic2VydmVyO1xuICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIC8vIElmIHRoaXMgb2JzZXJ2ZXIgaXMgY2FuY2VsZWQgd2hpbGUgZGlzcGF0Y2hpbmcgYSBjaGFuZ2VcbiAgICAvLyBub3RpZmljYXRpb24gZm9yIHRoZSBzYW1lIHByb3BlcnR5Li4uXG4gICAgLy8gMS4gV2UgY2Fubm90IHB1dCB0aGUgaGFuZGxlciByZWNvcmQgb250byB0aGUgZnJlZSBsaXN0IGJlY2F1c2VcbiAgICAvLyBpdCBtYXkgaGF2ZSBiZWVuIGNhcHR1cmVkIGluIHRoZSBhcnJheSBvZiByZWNvcmRzIHRvIHdoaWNoXG4gICAgLy8gdGhlIGNoYW5nZSBub3RpZmljYXRpb24gd291bGQgYmUgc2VudC4gV2UgbXVzdCBtYXJrIGl0IGFzXG4gICAgLy8gY2FuY2VsZWQgYnkgbnVsbGluZyBvdXQgdGhlIGhhbmRsZXIgcHJvcGVydHkgc28gdGhlIGRpc3BhdGNoZXJcbiAgICAvLyBwYXNzZXMgb3ZlciBpdC5cbiAgICAvLyAyLiBXZSBhbHNvIGNhbm5vdCBwdXQgdGhlIGhhbmRsZXIgcmVjb3JkIG9udG8gdGhlIGZyZWUgbGlzdFxuICAgIC8vIHVudGlsIGFsbCBjaGFuZ2UgZGlzcGF0Y2hlcyBoYXZlIGJlZW4gY29tcGxldGVkIGJlY2F1c2UgaXQgY291bGRcbiAgICAvLyBjb25jZWl2YWJseSBiZSByZXVzZWQsIGNvbmZ1c2luZyB0aGUgY3VycmVudCBkaXNwYXRjaGVyLlxuICAgIGlmIChkaXNwYXRjaGluZykge1xuICAgICAgICAvLyBBbGwgaGFuZGxlcnMgYWRkZWQgdG8gdGhpcyBsaXN0IHdpbGwgYmUgbW92ZWQgb3ZlciB0byB0aGVcbiAgICAgICAgLy8gYWN0dWFsIGZyZWUgbGlzdCB3aGVuIHRoZXJlIGFyZSBubyBsb25nZXIgYW55IHByb3BlcnR5XG4gICAgICAgIC8vIGNoYW5nZSBkaXNwYXRjaGVycyBvbiB0aGUgc3RhY2suXG4gICAgICAgIG9ic2VydmVyVG9GcmVlTGlzdC5wdXNoKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic2VydmVyRnJlZUxpc3QucHVzaCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkT2JzZXJ2ZXIpIHtcbiAgICAgICAgLy8gQ2FsbGluZyB1c2VyIGNvZGUgb24gb3VyIHN0YWNrLlxuICAgICAgICAvLyBEb25lIGluIHRhaWwgcG9zaXRpb24gdG8gYXZvaWQgYSBwbGFuIGludGVyZmVyZW5jZSBoYXphcmQuXG4gICAgICAgIGNoaWxkT2JzZXJ2ZXIuY2FuY2VsKCk7XG4gICAgfVxufTtcblxuTWFwQ2hhbmdlT2JzZXJ2ZXIucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcGx1cywgbWludXMpIHtcbiAgICB2YXIgaGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcbiAgICAvLyBBIG51bGwgaGFuZGxlciBpbXBsaWVzIHRoYXQgYW4gb2JzZXJ2ZXIgd2FzIGNhbmNlbGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcbiAgICAvLyBvZiBhIGNoYW5nZS4gVGhlIG9ic2VydmVyIGlzIHBlbmRpbmcgYWRkaXRpb24gdG8gdGhlIGZyZWUgbGlzdC5cbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjaGlsZE9ic2VydmVyID0gdGhpcy5jaGlsZE9ic2VydmVyO1xuICAgIHRoaXMuY2hpbGRPYnNlcnZlciA9IG51bGw7XG4gICAgLy8gWFhYIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZHMgY2FsbGluZyBjYW5jZWwgYW5kIGhhbmRsZXIgbWV0aG9kczpcbiAgICBpZiAoY2hpbGRPYnNlcnZlcikge1xuICAgICAgICBjaGlsZE9ic2VydmVyLmNhbmNlbCgpO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVyTWV0aG9kTmFtZSA9IHRoaXMuaGFuZGxlck1ldGhvZE5hbWU7XG4gICAgaWYgKGhhbmRsZXJNZXRob2ROYW1lICYmIHR5cGVvZiBoYW5kbGVyW2hhbmRsZXJNZXRob2ROYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNoaWxkT2JzZXJ2ZXIgPSBoYW5kbGVyW2hhbmRsZXJNZXRob2ROYW1lXShwbHVzLCBtaW51cywga2V5LCB0eXBlLCB0aGlzLm9iamVjdCk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyLmNhbGwpIHtcbiAgICAgICAgY2hpbGRPYnNlcnZlciA9IGhhbmRsZXIuY2FsbCh2b2lkIDAsIHBsdXMsIG1pbnVzLCBrZXksIHR5cGUsIHRoaXMub2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIkNhbid0IGRpc3BhdGNoIG1hcCBjaGFuZ2UgZm9yIFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5uYW1lKSArIFwiIHRvIFwiICsgaGFuZGxlciArXG4gICAgICAgICAgICBcIiBiZWNhdXNlIHRoZXJlIGlzIG5vIGhhbmRsZXIgbWV0aG9kXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkT2JzZXJ2ZXIgPSBjaGlsZE9ic2VydmVyO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxudmFyIE9hID0gcmVxdWlyZShcIi4vb2JzZXJ2YWJsZS1hcnJheVwiKTtcbiIsIi8qanNoaW50IG5vZGU6IHRydWUqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFhYWCBOb3RlOiBleGNlcHRpb25zIHRocm93biBmcm9tIGhhbmRsZXJzIGFuZCBoYW5kbGVyIGNhbmNlbGVycyBtYXlcbi8vIGludGVyZmVyZSB3aXRoIGRpc3BhdGNoaW5nIHRvIHN1YnNlcXVlbnQgaGFuZGxlcnMgb2YgYW55IGNoYW5nZSBpbiBwcm9ncmVzcy5cbi8vIEl0IGlzIHVubGlrZWx5IHRoYXQgcGxhbnMgYXJlIHJlY292ZXJhYmxlIG9uY2UgYW4gZXhjZXB0aW9uIGludGVyZmVyZXMgd2l0aFxuLy8gY2hhbmdlIGRpc3BhdGNoLiBUaGUgaW50ZXJuYWwgcmVjb3JkcyBzaG91bGQgbm90IGJlIGNvcnJ1cHQsIGJ1dCBvYnNlcnZlcnNcbi8vIG1pZ2h0IG1pc3MgYW4gaW50ZXJtZWRpYXRlIHByb3BlcnR5IGNoYW5nZS5cblxudmFyIG93bnMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgb2JzZXJ2ZXJGcmVlTGlzdCA9IFtdO1xudmFyIG9ic2VydmVyVG9GcmVlTGlzdCA9IFtdO1xudmFyIGRpc3BhdGNoaW5nID0gZmFsc2U7XG5cbi8vIFJldXNhYmxlIHByb3BlcnR5IGRlc2NyaXB0b3JcbnZhciBoaWRkZW5WYWx1ZVByb3BlcnR5ID0ge1xuICAgIHZhbHVlOiBudWxsLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYnNlcnZhYmxlT2JqZWN0O1xuZnVuY3Rpb24gT2JzZXJ2YWJsZU9iamVjdCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjb25zdHJ1Y3QuIE9ic2VydmFibGVPYmplY3QgaXMgYSBtaXhpbi5cIik7XG59XG5cbk9ic2VydmFibGVPYmplY3QucHJvdG90eXBlLm9ic2VydmVQcm9wZXJ0eUNoYW5nZSA9IGZ1bmN0aW9uIChuYW1lLCBoYW5kbGVyLCBub3RlLCBjYXB0dXJlKSB7XG4gICAgcmV0dXJuIG9ic2VydmVQcm9wZXJ0eUNoYW5nZSh0aGlzLCBuYW1lLCBoYW5kbGVyLCBub3RlLCBjYXB0dXJlKTtcbn07XG5cbk9ic2VydmFibGVPYmplY3QucHJvdG90eXBlLm9ic2VydmVQcm9wZXJ0eVdpbGxDaGFuZ2UgPSBmdW5jdGlvbiAobmFtZSwgaGFuZGxlciwgbm90ZSkge1xuICAgIHJldHVybiBvYnNlcnZlUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIG5hbWUsIGhhbmRsZXIsIG5vdGUpO1xufTtcblxuT2JzZXJ2YWJsZU9iamVjdC5wcm90b3R5cGUuZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSA9IGZ1bmN0aW9uIChuYW1lLCBwbHVzLCBtaW51cywgY2FwdHVyZSkge1xuICAgIHJldHVybiBkaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIG5hbWUsIHBsdXMsIG1pbnVzLCBjYXB0dXJlKTtcbn07XG5cbk9ic2VydmFibGVPYmplY3QucHJvdG90eXBlLmRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlID0gZnVuY3Rpb24gKG5hbWUsIHBsdXMsIG1pbnVzKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIG5hbWUsIHBsdXMsIG1pbnVzKTtcbn07XG5cbk9ic2VydmFibGVPYmplY3QucHJvdG90eXBlLmdldFByb3BlcnR5Q2hhbmdlT2JzZXJ2ZXJzID0gZnVuY3Rpb24gKG5hbWUsIGNhcHR1cmUpIHtcbiAgICByZXR1cm4gZ2V0UHJvcGVydHlDaGFuZ2VPYnNlcnZlcnModGhpcywgbmFtZSwgY2FwdHVyZSk7XG59O1xuXG5PYnNlcnZhYmxlT2JqZWN0LnByb3RvdHlwZS5nZXRQcm9wZXJ0eVdpbGxDaGFuZ2VPYnNlcnZlcnMgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBnZXRQcm9wZXJ0eVdpbGxDaGFuZ2VPYnNlcnZlcnModGhpcywgbmFtZSk7XG59O1xuXG5PYnNlcnZhYmxlT2JqZWN0LnByb3RvdHlwZS5tYWtlUHJvcGVydHlPYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbWFrZVByb3BlcnR5T2JzZXJ2YWJsZSh0aGlzLCBuYW1lKTtcbn07XG5cbk9ic2VydmFibGVPYmplY3QucHJvdG90eXBlLnByZXZlbnRQcm9wZXJ0eU9ic2VydmVyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gcHJldmVudFByb3BlcnR5T2JzZXJ2ZXIodGhpcywgbmFtZSk7XG59O1xuXG5PYnNlcnZhYmxlT2JqZWN0LnByb3RvdHlwZS5Qcm9wZXJ0eUNoYW5nZU9ic2VydmVyID0gUHJvcGVydHlDaGFuZ2VPYnNlcnZlcjtcblxuLy8gQ29uc3RydWN0b3IgaW50ZXJmYWNlIHdpdGggcG9seW1vcnBoaWMgZGVsZWdhdGlvbiBpZiBhdmFpbGFibGVcblxuT2JzZXJ2YWJsZU9iamVjdC5vYnNlcnZlUHJvcGVydHlDaGFuZ2UgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCBoYW5kbGVyLCBub3RlLCBjYXB0dXJlKSB7XG4gICAgaWYgKG9iamVjdC5vYnNlcnZlUHJvcGVydHlDaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC5vYnNlcnZlUHJvcGVydHlDaGFuZ2UobmFtZSwgaGFuZGxlciwgbm90ZSwgY2FwdHVyZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmVQcm9wZXJ0eUNoYW5nZShvYmplY3QsIG5hbWUsIGhhbmRsZXIsIG5vdGUsIGNhcHR1cmUpO1xuICAgIH1cbn07XG5cbk9ic2VydmFibGVPYmplY3Qub2JzZXJ2ZVByb3BlcnR5V2lsbENoYW5nZSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIGhhbmRsZXIsIG5vdGUpIHtcbiAgICBpZiAob2JqZWN0Lm9ic2VydmVQcm9wZXJ0eVdpbGxDaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC5vYnNlcnZlUHJvcGVydHlXaWxsQ2hhbmdlKG5hbWUsIGhhbmRsZXIsIG5vdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYnNlcnZlUHJvcGVydHlXaWxsQ2hhbmdlKG9iamVjdCwgbmFtZSwgaGFuZGxlciwgbm90ZSk7XG4gICAgfVxufTtcblxuT2JzZXJ2YWJsZU9iamVjdC5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMsIGNhcHR1cmUpIHtcbiAgICBpZiAob2JqZWN0LmRpc3BhdGNoUHJvcGVydHlDaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlKG5hbWUsIHBsdXMsIG1pbnVzLCBjYXB0dXJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZShvYmplY3QsIG5hbWUsIHBsdXMsIG1pbnVzLCBjYXB0dXJlKTtcbiAgICB9XG59O1xuXG5PYnNlcnZhYmxlT2JqZWN0LmRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMpIHtcbiAgICBpZiAob2JqZWN0LmRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QuZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UobmFtZSwgcGx1cywgbWludXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaFByb3BlcnR5V2lsbENoYW5nZShvYmplY3QsIG5hbWUsIHBsdXMsIG1pbnVzKTtcbiAgICB9XG59O1xuXG5PYnNlcnZhYmxlT2JqZWN0Lm1ha2VQcm9wZXJ0eU9ic2VydmFibGUgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lKSB7XG4gICAgaWYgKG9iamVjdC5tYWtlUHJvcGVydHlPYnNlcnZhYmxlKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QubWFrZVByb3BlcnR5T2JzZXJ2YWJsZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWFrZVByb3BlcnR5T2JzZXJ2YWJsZShvYmplY3QsIG5hbWUpO1xuICAgIH1cbn07XG5cbk9ic2VydmFibGVPYmplY3QucHJldmVudFByb3BlcnR5T2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lKSB7XG4gICAgaWYgKG9iamVjdC5wcmV2ZW50UHJvcGVydHlPYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gb2JqZWN0LnByZXZlbnRQcm9wZXJ0eU9ic2VydmVyKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcmV2ZW50UHJvcGVydHlPYnNlcnZlcihvYmplY3QsIG5hbWUpO1xuICAgIH1cbn07XG5cbi8vIEltcGxlbWVudGF0aW9uXG5cbmZ1bmN0aW9uIG9ic2VydmVQcm9wZXJ0eUNoYW5nZShvYmplY3QsIG5hbWUsIGhhbmRsZXIsIG5vdGUsIGNhcHR1cmUpIHtcbiAgICBPYnNlcnZhYmxlT2JqZWN0Lm1ha2VQcm9wZXJ0eU9ic2VydmFibGUob2JqZWN0LCBuYW1lKTtcbiAgICB2YXIgb2JzZXJ2ZXJzID0gZ2V0UHJvcGVydHlDaGFuZ2VPYnNlcnZlcnMob2JqZWN0LCBuYW1lLCBjYXB0dXJlKTtcblxuICAgIHZhciBvYnNlcnZlcjtcbiAgICBpZiAob2JzZXJ2ZXJGcmVlTGlzdC5sZW5ndGgpIHsgLy8gVE9ETyAmJiAhZGVidWc/XG4gICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJGcmVlTGlzdC5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBQcm9wZXJ0eUNoYW5nZU9ic2VydmVyKCk7XG4gICAgfVxuXG4gICAgb2JzZXJ2ZXIub2JqZWN0ID0gb2JqZWN0O1xuICAgIG9ic2VydmVyLnByb3BlcnR5TmFtZSA9IG5hbWU7XG4gICAgb2JzZXJ2ZXIuY2FwdHVyZSA9IGNhcHR1cmU7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZXJzID0gb2JzZXJ2ZXJzO1xuICAgIG9ic2VydmVyLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIG9ic2VydmVyLm5vdGUgPSBub3RlO1xuICAgIG9ic2VydmVyLnZhbHVlID0gb2JqZWN0W25hbWVdO1xuXG4gICAgLy8gUHJlY29tcHV0ZSBkaXNwYXRjaCBtZXRob2QgbmFtZXMuXG5cbiAgICB2YXIgc3RyaW5nTmFtZSA9IFwiXCIgKyBuYW1lOyAvLyBBcnJheSBpbmRpY2lkZXMgbXVzdCBiZSBjb2VyY2VkIHRvIHN0cmluZy5cbiAgICB2YXIgcHJvcGVydHlOYW1lID0gc3RyaW5nTmFtZS5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nTmFtZS5zbGljZSgxKTtcblxuICAgIGlmICghY2FwdHVyZSkge1xuICAgICAgICB2YXIgc3BlY2lmaWNDaGFuZ2VNZXRob2ROYW1lID0gXCJoYW5kbGVcIiArIHByb3BlcnR5TmFtZSArIFwiUHJvcGVydHlDaGFuZ2VcIjtcbiAgICAgICAgdmFyIGdlbmVyaWNDaGFuZ2VNZXRob2ROYW1lID0gXCJoYW5kbGVQcm9wZXJ0eUNoYW5nZVwiO1xuICAgICAgICBpZiAoaGFuZGxlcltzcGVjaWZpY0NoYW5nZU1ldGhvZE5hbWVdKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IHNwZWNpZmljQ2hhbmdlTWV0aG9kTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyW2dlbmVyaWNDaGFuZ2VNZXRob2ROYW1lXSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBnZW5lcmljQ2hhbmdlTWV0aG9kTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyLmNhbGwpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFycmFuZ2UgdG8gZGlzcGF0Y2ggXCIgKyBKU09OLnN0cmluZ2lmeShuYW1lKSArIFwiIHByb3BlcnR5IGNoYW5nZXMgb24gXCIgKyBvYmplY3QpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHNwZWNpZmljV2lsbENoYW5nZU1ldGhvZE5hbWUgPSBcImhhbmRsZVwiICsgcHJvcGVydHlOYW1lICsgXCJQcm9wZXJ0eVdpbGxDaGFuZ2VcIjtcbiAgICAgICAgdmFyIGdlbmVyaWNXaWxsQ2hhbmdlTWV0aG9kTmFtZSA9IFwiaGFuZGxlUHJvcGVydHlXaWxsQ2hhbmdlXCI7XG4gICAgICAgIGlmIChoYW5kbGVyW3NwZWNpZmljV2lsbENoYW5nZU1ldGhvZE5hbWVdKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IHNwZWNpZmljV2lsbENoYW5nZU1ldGhvZE5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlcltnZW5lcmljV2lsbENoYW5nZU1ldGhvZE5hbWVdKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IGdlbmVyaWNXaWxsQ2hhbmdlTWV0aG9kTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyLmNhbGwpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFycmFuZ2UgdG8gZGlzcGF0Y2ggXCIgKyBKU09OLnN0cmluZ2lmeShuYW1lKSArIFwiIHByb3BlcnR5IGNoYW5nZXMgb24gXCIgKyBvYmplY3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuXG4gICAgLy8gVE9ETyBpc3N1ZSB3YXJuaW5ncyBpZiB0aGUgbnVtYmVyIG9mIGhhbmRsZXIgcmVjb3JkcyBleGNlZWRzIHNvbWVcbiAgICAvLyBjb25jZXJuaW5nIHF1YW50aXR5IGFzIGEgaGFyYmluZ2VyIG9mIGEgbWVtb3J5IGxlYWsuXG4gICAgLy8gVE9ETyBOb3RlIHRoYXQgaWYgdGhpcyBpcyBnYXJiYWdlIGNvbGxlY3RlZCB3aXRob3V0IGV2ZXIgYmVpbmcgY2FsbGVkLFxuICAgIC8vIGl0IHByb2JhYmx5IGluZGljYXRlcyBhIHByb2dyYW1taW5nIGVycm9yLlxuICAgIHJldHVybiBvYnNlcnZlcjtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZVByb3BlcnR5V2lsbENoYW5nZShvYmplY3QsIG5hbWUsIGhhbmRsZXIsIG5vdGUpIHtcbiAgICByZXR1cm4gb2JzZXJ2ZVByb3BlcnR5Q2hhbmdlKG9iamVjdCwgbmFtZSwgaGFuZGxlciwgbm90ZSwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoUHJvcGVydHlDaGFuZ2Uob2JqZWN0LCBuYW1lLCBwbHVzLCBtaW51cywgY2FwdHVyZSkge1xuICAgIGlmICghZGlzcGF0Y2hpbmcpIHsgLy8gVE9ETyAmJiAhZGVidWc/XG4gICAgICAgIHJldHVybiBzdGFydFByb3BlcnR5Q2hhbmdlRGlzcGF0Y2hDb250ZXh0KG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMsIGNhcHR1cmUpO1xuICAgIH1cbiAgICB2YXIgb2JzZXJ2ZXJzID0gZ2V0UHJvcGVydHlDaGFuZ2VPYnNlcnZlcnMob2JqZWN0LCBuYW1lLCBjYXB0dXJlKS5zbGljZSgpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBvYnNlcnZlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IG9ic2VydmVyc1tpbmRleF07XG4gICAgICAgIG9ic2VydmVyLmRpc3BhdGNoKHBsdXMsIG1pbnVzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMpIHtcbiAgICBkaXNwYXRjaFByb3BlcnR5Q2hhbmdlKG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBzdGFydFByb3BlcnR5Q2hhbmdlRGlzcGF0Y2hDb250ZXh0KG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMsIGNhcHR1cmUpIHtcbiAgICBkaXNwYXRjaGluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgICAgZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZShvYmplY3QsIG5hbWUsIHBsdXMsIG1pbnVzLCBjYXB0dXJlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJQcm9wZXJ0eSBjaGFuZ2UgZGlzcGF0Y2ggcG9zc2libHkgY29ycnVwdGVkIGJ5IGVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb3BlcnR5IGNoYW5nZSBkaXNwYXRjaCBwb3NzaWJseSBjb3JydXB0ZWQgYnkgZXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKG9ic2VydmVyVG9GcmVlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFVzaW5nIHB1c2guYXBwbHkgaW5zdGVhZCBvZiBhZGRFYWNoIGJlY2F1c2UgcHVzaCB3aWxsIGRlZmluaXRlbHlcbiAgICAgICAgICAgIC8vIGJlIG11Y2ggZmFzdGVyIHRoYW4gdGhlIGdlbmVyaWMgYWRkRWFjaCwgd2hpY2ggYWxzbyBoYW5kbGVzXG4gICAgICAgICAgICAvLyBub24tYXJyYXkgY29sbGVjdGlvbnMuXG4gICAgICAgICAgICBvYnNlcnZlckZyZWVMaXN0LnB1c2guYXBwbHkoXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJGcmVlTGlzdCxcbiAgICAgICAgICAgICAgICBvYnNlcnZlclRvRnJlZUxpc3RcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyBVc2luZyBjbGVhciBiZWNhdXNlIGl0IGlzIG9ic2VydmFibGUuIFRoZSBoYW5kbGVyIHJlY29yZCBhcnJheVxuICAgICAgICAgICAgLy8gaXMgb2J0YWluYWJsZSBieSBnZXRQcm9wZXJ0eUNoYW5nZU9ic2VydmVycywgYW5kIGlzIG9ic2VydmFibGUuXG4gICAgICAgICAgICBvYnNlcnZlclRvRnJlZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydHlDaGFuZ2VPYnNlcnZlcnMob2JqZWN0LCBuYW1lLCBjYXB0dXJlKSB7XG4gICAgaWYgKCFvYmplY3QucHJvcGVydHlPYnNlcnZlcnMpIHtcbiAgICAgICAgaGlkZGVuVmFsdWVQcm9wZXJ0eS52YWx1ZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIFwicHJvcGVydHlPYnNlcnZlcnNcIiwgaGlkZGVuVmFsdWVQcm9wZXJ0eSk7XG4gICAgfVxuICAgIHZhciBvYnNlcnZlcnNCeUtleSA9IG9iamVjdC5wcm9wZXJ0eU9ic2VydmVycztcbiAgICB2YXIgcGhhc2UgPSBjYXB0dXJlID8gXCJXaWxsQ2hhbmdlXCIgOiBcIkNoYW5nZVwiO1xuICAgIHZhciBrZXkgPSBuYW1lICsgcGhhc2U7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JzZXJ2ZXJzQnlLZXksIGtleSkpIHtcbiAgICAgICAgb2JzZXJ2ZXJzQnlLZXlba2V5XSA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gb2JzZXJ2ZXJzQnlLZXlba2V5XTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydHlXaWxsQ2hhbmdlT2JzZXJ2ZXJzKG9iamVjdCwgbmFtZSkge1xuICAgIHJldHVybiBnZXRQcm9wZXJ0eUNoYW5nZU9ic2VydmVycyhvYmplY3QsIG5hbWUsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBQcm9wZXJ0eUNoYW5nZU9ic2VydmVyKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIC8vIE9iamVjdC5zZWFsKHRoaXMpOyAvLyBNYXliZSBvbmUgZGF5LCB0aGlzIHdvbid0IGRlb3B0aW1pemUuXG59XG5cblByb3BlcnR5Q2hhbmdlT2JzZXJ2ZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vYmplY3QgPSBudWxsO1xuICAgIHRoaXMucHJvcGVydHlOYW1lID0gbnVsbDtcbiAgICAvLyBQZWVyIG9ic2VydmVycywgZnJvbSB3aGljaCB0byBwbHVjayBpdHNlbGYgdXBvbiBjYW5jZWxhdGlvbi5cbiAgICB0aGlzLm9ic2VydmVycyA9IG51bGw7XG4gICAgLy8gT24gd2hpY2ggdG8gZGlzcGF0Y2ggcHJvcGVydHkgY2hhbmdlIG5vdGlmaWNhdGlvbnMuXG4gICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcbiAgICAvLyBQcmVjb21wdXRlZCBoYW5kbGVyIG1ldGhvZCBuYW1lIGZvciBjaGFuZ2UgZGlzcGF0Y2hcbiAgICB0aGlzLmhhbmRsZXJNZXRob2ROYW1lID0gbnVsbDtcbiAgICAvLyBSZXR1cm5lZCBieSB0aGUgbGFzdCBwcm9wZXJ0eSBjaGFuZ2Ugbm90aWZpY2F0aW9uLCB3aGljaCBtdXN0IGJlXG4gICAgLy8gY2FuY2VsZWQgYmVmb3JlIHRoZSBuZXh0IGNoYW5nZSBub3RpZmljYXRpb24sIG9yIHdoZW4gdGhpcyBvYnNlcnZlciBpc1xuICAgIC8vIGZpbmFsbHkgY2FuY2VsZWQuXG4gICAgdGhpcy5jaGlsZE9ic2VydmVyID0gbnVsbDtcbiAgICAvLyBGb3IgdGhlIGRpc2NyZXRpb25hcnkgdXNlIG9mIHRoZSB1c2VyLCBwZXJoYXBzIHRvIHRyYWNrIHdoeSB0aGlzXG4gICAgLy8gb2JzZXJ2ZXIgaGFzIGJlZW4gY3JlYXRlZCwgb3Igd2hldGhlciB0aGlzIG9ic2VydmVyIHNob3VsZCBiZVxuICAgIC8vIHNlcmlhbGl6ZWQuXG4gICAgdGhpcy5ub3RlID0gbnVsbDtcbiAgICAvLyBXaGV0aGVyIHRoaXMgb2JzZXJ2ZXIgZGlzcGF0Y2hlcyBiZWZvcmUgYSBjaGFuZ2Ugb2NjdXJzLCBvciBhZnRlclxuICAgIHRoaXMuY2FwdHVyZSA9IG51bGw7XG4gICAgLy8gVGhlIGxhc3Qga25vd24gdmFsdWVcbiAgICB0aGlzLnZhbHVlID0gbnVsbDtcbn07XG5cblByb3BlcnR5Q2hhbmdlT2JzZXJ2ZXIucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgdmFyIGluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2YodGhpcyk7XG4gICAgLy8gVW5mb3J0dW5hdGVseSwgaWYgdGhpcyBvYnNlcnZlciB3YXMgcmV1c2VkLCB0aGlzIHdvdWxkIG5vdCBiZSBzdWZmaWNpZW50XG4gICAgLy8gdG8gZGV0ZWN0IGEgZHVwbGljYXRlIGNhbmNlbC4gRG8gbm90IGNhbmNlbCBtb3JlIHRoYW4gb25jZS5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiQ2FuJ3QgY2FuY2VsIG9ic2VydmVyIGZvciBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BlcnR5TmFtZSkgKyBcIiBvbiBcIiArIHRoaXMub2JqZWN0ICtcbiAgICAgICAgICAgIFwiIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBjYW5jZWxlZFwiXG4gICAgICAgICk7XG4gICAgfVxuICAgIHZhciBjaGlsZE9ic2VydmVyID0gdGhpcy5jaGlsZE9ic2VydmVyO1xuICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIC8vIElmIHRoaXMgb2JzZXJ2ZXIgaXMgY2FuY2VsZWQgd2hpbGUgZGlzcGF0Y2hpbmcgYSBjaGFuZ2VcbiAgICAvLyBub3RpZmljYXRpb24gZm9yIHRoZSBzYW1lIHByb3BlcnR5Li4uXG4gICAgLy8gMS4gV2UgY2Fubm90IHB1dCB0aGUgaGFuZGxlciByZWNvcmQgb250byB0aGUgZnJlZSBsaXN0IGJlY2F1c2VcbiAgICAvLyBpdCBtYXkgaGF2ZSBiZWVuIGNhcHR1cmVkIGluIHRoZSBhcnJheSBvZiByZWNvcmRzIHRvIHdoaWNoXG4gICAgLy8gdGhlIGNoYW5nZSBub3RpZmljYXRpb24gd291bGQgYmUgc2VudC4gV2UgbXVzdCBtYXJrIGl0IGFzXG4gICAgLy8gY2FuY2VsZWQgYnkgbnVsbGluZyBvdXQgdGhlIGhhbmRsZXIgcHJvcGVydHkgc28gdGhlIGRpc3BhdGNoZXJcbiAgICAvLyBwYXNzZXMgb3ZlciBpdC5cbiAgICAvLyAyLiBXZSBhbHNvIGNhbm5vdCBwdXQgdGhlIGhhbmRsZXIgcmVjb3JkIG9udG8gdGhlIGZyZWUgbGlzdFxuICAgIC8vIHVudGlsIGFsbCBjaGFuZ2UgZGlzcGF0Y2hlcyBoYXZlIGJlZW4gY29tcGxldGVkIGJlY2F1c2UgaXQgY291bGRcbiAgICAvLyBjb25jZWl2YWJseSBiZSByZXVzZWQsIGNvbmZ1c2luZyB0aGUgY3VycmVudCBkaXNwYXRjaGVyLlxuICAgIGlmIChkaXNwYXRjaGluZykge1xuICAgICAgICAvLyBBbGwgaGFuZGxlcnMgYWRkZWQgdG8gdGhpcyBsaXN0IHdpbGwgYmUgbW92ZWQgb3ZlciB0byB0aGVcbiAgICAgICAgLy8gYWN0dWFsIGZyZWUgbGlzdCB3aGVuIHRoZXJlIGFyZSBubyBsb25nZXIgYW55IHByb3BlcnR5XG4gICAgICAgIC8vIGNoYW5nZSBkaXNwYXRjaGVycyBvbiB0aGUgc3RhY2suXG4gICAgICAgIG9ic2VydmVyVG9GcmVlTGlzdC5wdXNoKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic2VydmVyRnJlZUxpc3QucHVzaCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkT2JzZXJ2ZXIpIHtcbiAgICAgICAgLy8gQ2FsbGluZyB1c2VyIGNvZGUgb24gb3VyIHN0YWNrLlxuICAgICAgICAvLyBEb25lIGluIHRhaWwgcG9zaXRpb24gdG8gYXZvaWQgYSBwbGFuIGludGVyZmVyZW5jZSBoYXphcmQuXG4gICAgICAgIGNoaWxkT2JzZXJ2ZXIuY2FuY2VsKCk7XG4gICAgfVxufTtcblxuUHJvcGVydHlDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAocGx1cywgbWludXMpIHtcbiAgICB2YXIgaGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcbiAgICAvLyBBIG51bGwgaGFuZGxlciBpbXBsaWVzIHRoYXQgYW4gb2JzZXJ2ZXIgd2FzIGNhbmNlbGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcbiAgICAvLyBvZiBhIGNoYW5nZS4gVGhlIG9ic2VydmVyIGlzIHBlbmRpbmcgYWRkaXRpb24gdG8gdGhlIGZyZWUgbGlzdC5cbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtaW51cyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG1pbnVzID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IHBsdXM7XG5cbiAgICB2YXIgY2hpbGRPYnNlcnZlciA9IHRoaXMuY2hpbGRPYnNlcnZlcjtcbiAgICB0aGlzLmNoaWxkT2JzZXJ2ZXIgPSBudWxsO1xuICAgIC8vIFhYWCBwbGFuIGludGVyZmVyZW5jZSBoYXphcmRzIGNhbGxpbmcgY2FuY2VsIGFuZCBoYW5kbGVyIG1ldGhvZHM6XG4gICAgaWYgKGNoaWxkT2JzZXJ2ZXIpIHtcbiAgICAgICAgY2hpbGRPYnNlcnZlci5jYW5jZWwoKTtcbiAgICB9XG4gICAgdmFyIGhhbmRsZXJNZXRob2ROYW1lID0gdGhpcy5oYW5kbGVyTWV0aG9kTmFtZTtcbiAgICBpZiAoaGFuZGxlck1ldGhvZE5hbWUgJiYgdHlwZW9mIGhhbmRsZXJbaGFuZGxlck1ldGhvZE5hbWVdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2hpbGRPYnNlcnZlciA9IGhhbmRsZXJbaGFuZGxlck1ldGhvZE5hbWVdKHBsdXMsIG1pbnVzLCB0aGlzLnByb3BlcnR5TmFtZSwgdGhpcy5vYmplY3QpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlci5jYWxsKSB7XG4gICAgICAgIGNoaWxkT2JzZXJ2ZXIgPSBoYW5kbGVyLmNhbGwodm9pZCAwLCBwbHVzLCBtaW51cywgdGhpcy5wcm9wZXJ0eU5hbWUsIHRoaXMub2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIkNhbid0IGRpc3BhdGNoIFwiICsgSlNPTi5zdHJpbmdpZnkoaGFuZGxlck1ldGhvZE5hbWUpICsgXCIgcHJvcGVydHkgY2hhbmdlIG9uIFwiICsgb2JqZWN0ICtcbiAgICAgICAgICAgIFwiIGJlY2F1c2UgdGhlcmUgaXMgbm8gaGFuZGxlciBtZXRob2RcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRPYnNlcnZlciA9IGNoaWxkT2JzZXJ2ZXI7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBtYWtlUHJvcGVydHlPYnNlcnZhYmxlKG9iamVjdCwgbmFtZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIE9hLm1ha2VQcm9wZXJ0eU9ic2VydmFibGUob2JqZWN0LCBuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgd3JhcHBlZERlc2NyaXB0b3IgPSB3cmFwUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgbmFtZSk7XG5cbiAgICBpZiAoIXdyYXBwZWREZXNjcmlwdG9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGh1bms7XG4gICAgLy8gaW4gYm90aCBvZiB0aGVzZSBuZXcgZGVzY3JpcHRvciB2YXJpYW50cywgd2UgcmV1c2UgdGhlIHdyYXBwZWRcbiAgICAvLyBkZXNjcmlwdG9yIHRvIGVpdGhlciBzdG9yZSB0aGUgY3VycmVudCB2YWx1ZSBvciBhcHBseSBnZXR0ZXJzXG4gICAgLy8gYW5kIHNldHRlcnMuIHRoaXMgaXMgaGFuZHkgc2luY2Ugd2UgY2FuIHJldXNlIHRoZSB3cmFwcGVkXG4gICAgLy8gZGVzY3JpcHRvciBpZiB3ZSB1bmluc3RhbGwgdGhlIG9ic2VydmVyLiBXZSBldmVuIHByZXNlcnZlIHRoZVxuICAgIC8vIGFzc2lnbm1lbnQgc2VtYW50aWNzLCB3aGVyZSB3ZSBnZXQgdGhlIHZhbHVlIGZyb20gdXAgdGhlXG4gICAgLy8gcHJvdG90eXBlIGNoYWluLCBhbmQgc2V0IGFzIGFuIG93bmVkIHByb3BlcnR5LlxuICAgIGlmIChcInZhbHVlXCIgaW4gd3JhcHBlZERlc2NyaXB0b3IpIHtcbiAgICAgICAgdGh1bmsgPSBtYWtlVmFsdWVQcm9wZXJ0eVRodW5rKG5hbWUsIHdyYXBwZWREZXNjcmlwdG9yKTtcbiAgICB9IGVsc2UgeyAvLyBcImdldFwiIG9yIFwic2V0XCIsIGJ1dCBub3QgbmVjZXNzYXJpbHkgYm90aFxuICAgICAgICB0aHVuayA9IG1ha2VHZXRTZXRQcm9wZXJ0eVRodW5rKG5hbWUsIHdyYXBwZWREZXNjcmlwdG9yKTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB0aHVuayk7XG59XG5cbi8qKlxuICogUHJldmVudHMgYSB0aHVuayBmcm9tIGJlaW5nIGluc3RhbGxlZCBvbiBhIHByb3BlcnR5LCBhc3N1bWluZyB0aGF0IHRoZVxuICogdW5kZXJseWluZyB0eXBlIHdpbGwgZGlzcGF0Y2ggdGhlIGNoYW5nZSBtYW51YWxseSwgb3IgaW50ZW5kcyB0aGUgcHJvcGVydHlcbiAqIHRvIHN0aWNrIG9uIGFsbCBpbnN0YW5jZXMuXG4gKi9cbmZ1bmN0aW9uIHByZXZlbnRQcm9wZXJ0eU9ic2VydmVyKG9iamVjdCwgbmFtZSkge1xuICAgIHZhciB3cmFwcGVkRGVzY3JpcHRvciA9IHdyYXBQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB3cmFwcGVkRGVzY3JpcHRvcik7XG59XG5cbmZ1bmN0aW9uIHdyYXBQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKSB7XG4gICAgLy8gQXJyYXlzIGFyZSBzcGVjaWFsLiBXZSBkbyBub3Qgc3VwcG9ydCBkaXJlY3Qgc2V0dGluZyBvZiBwcm9wZXJ0aWVzXG4gICAgLy8gb24gYW4gYXJyYXkuIGluc3RlYWQsIGNhbGwgLnNldChpbmRleCwgdmFsdWUpLiBUaGlzIGlzIG9ic2VydmFibGUuXG4gICAgLy8gXCJsZW5ndGhcIiBwcm9wZXJ0eSBpcyBvYnNlcnZhYmxlIGZvciBhbGwgbXV0YXRpbmcgbWV0aG9kcyBiZWNhdXNlXG4gICAgLy8gb3VyIG92ZXJyaWRlcyBleHBsaWNpdGx5IGRpc3BhdGNoIHRoYXQgY2hhbmdlLlxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghT2JqZWN0LmlzRXh0ZW5zaWJsZShvYmplY3QsIG5hbWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgd3JhcHBlZERlc2NyaXB0b3IgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKTtcbiAgICB2YXIgd3JhcHBlZFByb3RvdHlwZSA9IHdyYXBwZWREZXNjcmlwdG9yLnByb3RvdHlwZTtcblxuICAgIHZhciBleGlzdGluZ1dyYXBwZWREZXNjcmlwdG9ycyA9IHdyYXBwZWRQcm90b3R5cGUud3JhcHBlZFByb3BlcnR5RGVzY3JpcHRvcnM7XG4gICAgaWYgKGV4aXN0aW5nV3JhcHBlZERlc2NyaXB0b3JzICYmIG93bnMuY2FsbChleGlzdGluZ1dyYXBwZWREZXNjcmlwdG9ycywgbmFtZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB3cmFwcGVkUHJvcGVydHlEZXNjcmlwdG9ycyA9IG9iamVjdC53cmFwcGVkUHJvcGVydHlEZXNjcmlwdG9ycztcbiAgICBpZiAoIXdyYXBwZWRQcm9wZXJ0eURlc2NyaXB0b3JzKSB7XG4gICAgICAgIHdyYXBwZWRQcm9wZXJ0eURlc2NyaXB0b3JzID0ge307XG4gICAgICAgIGhpZGRlblZhbHVlUHJvcGVydHkudmFsdWUgPSB3cmFwcGVkUHJvcGVydHlEZXNjcmlwdG9ycztcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgXCJ3cmFwcGVkUHJvcGVydHlEZXNjcmlwdG9yc1wiLCBoaWRkZW5WYWx1ZVByb3BlcnR5KTtcbiAgICB9XG5cbiAgICBpZiAob3ducy5jYWxsKHdyYXBwZWRQcm9wZXJ0eURlc2NyaXB0b3JzLCBuYW1lKSkge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGFscmVhZHkgcmVjb3JkZWQgYSB3cmFwcGVkIHByb3BlcnR5IGRlc2NyaXB0b3IsXG4gICAgICAgIC8vIHdlIGhhdmUgYWxyZWFkeSBpbnN0YWxsZWQgdGhlIG9ic2VydmVyLCBzbyBzaG9ydC1oZXJlLlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF3cmFwcGVkRGVzY3JpcHRvci5jb25maWd1cmFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE1lbW9pemUgdGhlIGRlc2NyaXB0b3Igc28gd2Uga25vdyBub3QgdG8gaW5zdGFsbCBhbm90aGVyIGxheWVyLiBXZVxuICAgIC8vIGNvdWxkIHVzZSBpdCB0byB1bmluc3RhbGwgdGhlIG9ic2VydmVyLCBidXQgd2UgZG8gbm90IHRvIGF2b2lkIEdDXG4gICAgLy8gdGhyYXNoaW5nLlxuICAgIHdyYXBwZWRQcm9wZXJ0eURlc2NyaXB0b3JzW25hbWVdID0gd3JhcHBlZERlc2NyaXB0b3I7XG5cbiAgICAvLyBHaXZlIHVwICphZnRlciogc3RvcmluZyB0aGUgd3JhcHBlZCBwcm9wZXJ0eSBkZXNjcmlwdG9yIHNvIGl0XG4gICAgLy8gY2FuIGJlIHJlc3RvcmVkIGJ5IHVuaW5zdGFsbC4gVW53cml0YWJsZSBwcm9wZXJ0aWVzIGFyZVxuICAgIC8vIHNpbGVudGx5IG5vdCBvdmVycmlkZW4uIFNpbmNlIHN1Y2Nlc3MgaXMgaW5kaXN0aW5ndWlzaGFibGUgZnJvbVxuICAgIC8vIGZhaWx1cmUsIHdlIGxldCBpdCBwYXNzIGJ1dCBkb24ndCB3YXN0ZSB0aW1lIG9uIGludGVyY2VwdGluZ1xuICAgIC8vIGdldC9zZXQuXG4gICAgaWYgKCF3cmFwcGVkRGVzY3JpcHRvci53cml0YWJsZSAmJiAhd3JhcHBlZERlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBubyBzZXR0ZXIsIGl0IGlzIG5vdCBtdXRhYmxlLCBhbmQgb2JzZXJ2aW5nIGlzIG1vb3QuXG4gICAgLy8gTWFudWFsIGRpc3BhdGNoIG1heSBzdGlsbCBhcHBseS5cbiAgICBpZiAod3JhcHBlZERlc2NyaXB0b3IuZ2V0ICYmICF3cmFwcGVkRGVzY3JpcHRvci5zZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwcGVkRGVzY3JpcHRvcjtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgbmFtZSkge1xuICAgIC8vIHdhbGsgdXAgdGhlIHByb3RvdHlwZSBjaGFpbiB0byBmaW5kIGEgcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgdGhlXG4gICAgLy8gcHJvcGVydHkgbmFtZS5cbiAgICB2YXIgZGVzY3JpcHRvcjtcbiAgICB2YXIgcHJvdG90eXBlID0gb2JqZWN0O1xuICAgIGRvIHtcbiAgICAgICAgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBuYW1lKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpO1xuICAgIH0gd2hpbGUgKHByb3RvdHlwZSk7XG4gICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgZGVzY3JpcHRvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG9yIGRlZmF1bHQgdG8gYW4gdW5kZWZpbmVkIHZhbHVlXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcm90b3R5cGU6IG9iamVjdCxcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYWtlVmFsdWVQcm9wZXJ0eVRodW5rKG5hbWUsIHdyYXBwZWREZXNjcmlwdG9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBVc2VzIF9fdGhpc19fIHRvIHF1aWNrbHkgZGlzdGluZ3Vpc2ggX19zdGF0ZV9fIHByb3BlcnRpZXMgZnJvbVxuICAgICAgICAgICAgLy8gdXB3YXJkIGluIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAgICBpZiAodGhpcy5fX3N0YXRlX18gPT09IHZvaWQgMCB8fCB0aGlzLl9fc3RhdGVfXy5fX3RoaXNfXyAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIGluaXRTdGF0ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX19zdGF0ZV9fO1xuXG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHN0YXRlKSkge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgaW5pdGlhbCB2YWx1ZSBmcm9tIHVwIHRoZSBwcm90b3R5cGUgY2hhaW5cbiAgICAgICAgICAgICAgICBzdGF0ZVtuYW1lXSA9IHdyYXBwZWREZXNjcmlwdG9yLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVbbmFtZV07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHBsdXMpIHtcbiAgICAgICAgICAgIC8vIFVzZXMgX190aGlzX18gdG8gcXVpY2tseSBkaXN0aW5ndWlzaCBfX3N0YXRlX18gcHJvcGVydGllcyBmcm9tXG4gICAgICAgICAgICAvLyB1cHdhcmQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICAgIGlmICh0aGlzLl9fc3RhdGVfXyA9PT0gdm9pZCAwIHx8IHRoaXMuX19zdGF0ZV9fLl9fdGhpc19fICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaW5pdFN0YXRlKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGF0ZV9fW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX19zdGF0ZV9fO1xuXG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHN0YXRlKSkge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgaW5pdGlhbCB2YWx1ZSBmcm9tIHVwIHRoZSBwcm90b3R5cGUgY2hhaW5cbiAgICAgICAgICAgICAgICBzdGF0ZVtuYW1lXSA9IHdyYXBwZWREZXNjcmlwdG9yLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGx1cyA9PT0gc3RhdGVbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gWFhYIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZDpcbiAgICAgICAgICAgIGRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIG5hbWUsIHBsdXMpO1xuXG4gICAgICAgICAgICB3cmFwcGVkRGVzY3JpcHRvci52YWx1ZSA9IHBsdXM7XG4gICAgICAgICAgICBzdGF0ZVtuYW1lXSA9IHBsdXM7XG5cbiAgICAgICAgICAgIC8vIFhYWCBwbGFuIGludGVyZmVyZW5jZSBoYXphcmQ6XG4gICAgICAgICAgICBkaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIG5hbWUsIHBsdXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGx1cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogd3JhcHBlZERlc2NyaXB0b3IuZW51bWVyYWJsZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gbWFrZUdldFNldFByb3BlcnR5VGh1bmsobmFtZSwgd3JhcHBlZERlc2NyaXB0b3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh3cmFwcGVkRGVzY3JpcHRvci5nZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd3JhcHBlZERlc2NyaXB0b3IuZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHBsdXMpIHtcbiAgICAgICAgICAgIC8vIFVzZXMgX190aGlzX18gdG8gcXVpY2tseSBkaXN0aW5ndWlzaCBfX3N0YXRlX18gcHJvcGVydGllcyBmcm9tXG4gICAgICAgICAgICAvLyB1cHdhcmQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICAgIGlmICh0aGlzLl9fc3RhdGVfXyA9PT0gdm9pZCAwIHx8IHRoaXMuX19zdGF0ZV9fLl9fdGhpc19fICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaW5pdFN0YXRlKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGF0ZV9fW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX19zdGF0ZV9fO1xuXG4gICAgICAgICAgICBpZiAoc3RhdGVbbmFtZV0gPT09IHBsdXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gWFhYIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZDpcbiAgICAgICAgICAgIGRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIG5hbWUsIHBsdXMpO1xuXG4gICAgICAgICAgICAvLyBjYWxsIHRocm91Z2ggdG8gYWN0dWFsIHNldHRlclxuICAgICAgICAgICAgaWYgKHdyYXBwZWREZXNjcmlwdG9yLnNldCkge1xuICAgICAgICAgICAgICAgIHdyYXBwZWREZXNjcmlwdG9yLnNldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIHN0YXRlW25hbWVdID0gcGx1cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdXNlIGdldHRlciwgaWYgcG9zc2libGUsIHRvIGFkanVzdCB0aGUgcGx1cyB2YWx1ZSBpZiB0aGUgc2V0dGVyXG4gICAgICAgICAgICAvLyBhZGp1c3RlZCBpdCwgZm9yIGV4YW1wbGUgYSBzZXR0ZXIgZm9yIGFuIGFycmF5IHByb3BlcnR5IHRoYXRcbiAgICAgICAgICAgIC8vIHJldGFpbnMgdGhlIG9yaWdpbmFsIGFycmF5IGFuZCByZXBsYWNlcyBpdHMgY29udGVudCwgb3IgYSBzZXR0ZXJcbiAgICAgICAgICAgIC8vIHRoYXQgY29lcmNlcyB0aGUgdmFsdWUgdG8gYW4gZXhwZWN0ZWQgdHlwZS5cbiAgICAgICAgICAgIGlmICh3cmFwcGVkRGVzY3JpcHRvci5nZXQpIHtcbiAgICAgICAgICAgICAgICBwbHVzID0gd3JhcHBlZERlc2NyaXB0b3IuZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRpc3BhdGNoIHRoZSBuZXcgdmFsdWU6IHRoZSBnaXZlbiB2YWx1ZSBpZiB0aGVyZSBpc1xuICAgICAgICAgICAgLy8gbm8gZ2V0dGVyLCBvciB0aGUgYWN0dWFsIHZhbHVlIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgICAgLy8gVE9ETyBzcGVjXG4gICAgICAgICAgICAvLyBYWFggcGxhbiBpbnRlcmZlcmVuY2UgaGF6YXJkOlxuICAgICAgICAgICAgZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSh0aGlzLCBuYW1lLCBwbHVzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHBsdXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHdyYXBwZWREZXNjcmlwdG9yLmVudW1lcmFibGUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGluaXRTdGF0ZShvYmplY3QpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBcIl9fc3RhdGVfX1wiLCB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBfX3RoaXNfXzogb2JqZWN0XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG5cbnZhciBPYSA9IHJlcXVpcmUoXCIuL29ic2VydmFibGUtYXJyYXlcIik7XG4iLCIvKmdsb2JhbCAtV2Vha01hcCovXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gVE9ETyByZXZpZXcgYWxsIGVycm9yIG1lc3NhZ2VzIGZvciBjb25zaXN0ZW5jeSBhbmQgaGVscGZ1bG5lc3MgYWNyb3NzIG9ic2VydmFibGVzXG5cbnZhciBvYnNlcnZlckZyZWVMaXN0ID0gW107XG52YXIgb2JzZXJ2ZXJUb0ZyZWVMaXN0ID0gW107XG52YXIgZGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYnNlcnZhYmxlUmFuZ2U7XG5mdW5jdGlvbiBPYnNlcnZhYmxlUmFuZ2UoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgY29uc3RydWN0LiBPYnNlcnZhYmxlUmFuZ2UgaXMgYSBtaXhpbi5cIik7XG59XG5cbk9ic2VydmFibGVSYW5nZS5wcm90b3R5cGUub2JzZXJ2ZVJhbmdlQ2hhbmdlID0gZnVuY3Rpb24gKGhhbmRsZXIsIG5hbWUsIG5vdGUsIGNhcHR1cmUpIHtcbiAgICByZXR1cm4gb2JzZXJ2ZVJhbmdlQ2hhbmdlKHRoaXMsIGhhbmRsZXIsIG5hbWUsIG5vdGUsIGNhcHR1cmUpO1xufTtcblxuT2JzZXJ2YWJsZVJhbmdlLnByb3RvdHlwZS5vYnNlcnZlUmFuZ2VXaWxsQ2hhbmdlID0gZnVuY3Rpb24gKGhhbmRsZXIsIG5hbWUsIG5vdGUpIHtcbiAgICByZXR1cm4gb2JzZXJ2ZVJhbmdlQ2hhbmdlKHRoaXMsIGhhbmRsZXIsIG5hbWUsIG5vdGUsIHRydWUpO1xufTtcblxuT2JzZXJ2YWJsZVJhbmdlLnByb3RvdHlwZS5kaXNwYXRjaFJhbmdlQ2hhbmdlID0gZnVuY3Rpb24gKHBsdXMsIG1pbnVzLCBpbmRleCwgY2FwdHVyZSkge1xuICAgIHJldHVybiBkaXNwYXRjaFJhbmdlQ2hhbmdlKHRoaXMsIHBsdXMsIG1pbnVzLCBpbmRleCwgY2FwdHVyZSk7XG59O1xuXG5PYnNlcnZhYmxlUmFuZ2UucHJvdG90eXBlLmRpc3BhdGNoUmFuZ2VXaWxsQ2hhbmdlID0gZnVuY3Rpb24gKHBsdXMsIG1pbnVzLCBpbmRleCkge1xuICAgIHJldHVybiBkaXNwYXRjaFJhbmdlQ2hhbmdlKHRoaXMsIHBsdXMsIG1pbnVzLCBpbmRleCwgdHJ1ZSk7XG59O1xuXG5PYnNlcnZhYmxlUmFuZ2UucHJvdG90eXBlLmdldFJhbmdlQ2hhbmdlT2JzZXJ2ZXJzID0gZnVuY3Rpb24gKGNhcHR1cmUpIHtcbn07XG5cbk9ic2VydmFibGVSYW5nZS5wcm90b3R5cGUuZ2V0UmFuZ2VXaWxsQ2hhbmdlT2JzZXJ2ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnZXRSYW5nZUNoYW5nZU9ic2VydmVycyh0aGlzLCB0cnVlKTtcbn07XG5cbk9ic2VydmFibGVSYW5nZS5vYnNlcnZlUmFuZ2VDaGFuZ2UgPSBvYnNlcnZlUmFuZ2VDaGFuZ2U7XG5mdW5jdGlvbiBvYnNlcnZlUmFuZ2VDaGFuZ2Uob2JqZWN0LCBoYW5kbGVyLCBuYW1lLCBub3RlLCBjYXB0dXJlKSB7XG4gICAgbWFrZVJhbmdlQ2hhbmdlc09ic2VydmFibGUob2JqZWN0KTtcbiAgICB2YXIgb2JzZXJ2ZXJzID0gZ2V0UmFuZ2VDaGFuZ2VPYnNlcnZlcnMob2JqZWN0LCBjYXB0dXJlKTtcblxuICAgIHZhciBvYnNlcnZlcjtcbiAgICBpZiAob2JzZXJ2ZXJGcmVlTGlzdC5sZW5ndGgpIHsgLy8gVE9ETyAhZGVidWc/XG4gICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJGcmVlTGlzdC5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBSYW5nZUNoYW5nZU9ic2VydmVyKCk7XG4gICAgfVxuXG4gICAgb2JzZXJ2ZXIub2JqZWN0ID0gb2JqZWN0O1xuICAgIG9ic2VydmVyLm5hbWUgPSBuYW1lO1xuICAgIG9ic2VydmVyLmNhcHR1cmUgPSBjYXB0dXJlO1xuICAgIG9ic2VydmVyLm9ic2VydmVycyA9IG9ic2VydmVycztcbiAgICBvYnNlcnZlci5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICBvYnNlcnZlci5ub3RlID0gbm90ZTtcblxuICAgIC8vIFByZWNvbXB1dGUgZGlzcGF0Y2ggbWV0aG9kIG5hbWVcblxuICAgIHZhciBzdHJpbmdOYW1lID0gXCJcIiArIG5hbWU7IC8vIEFycmF5IGluZGljaWRlcyBtdXN0IGJlIGNvZXJjZWQgdG8gc3RyaW5nLlxuICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBzdHJpbmdOYW1lLnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmdOYW1lLnNsaWNlKDEpO1xuXG4gICAgaWYgKCFjYXB0dXJlKSB7XG4gICAgICAgIHZhciBtZXRob2ROYW1lID0gXCJoYW5kbGVcIiArIHByb3BlcnR5TmFtZSArIFwiUmFuZ2VDaGFuZ2VcIjtcbiAgICAgICAgaWYgKGhhbmRsZXJbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gbWV0aG9kTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyLmhhbmRsZVJhbmdlQ2hhbmdlKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IFwiaGFuZGxlUmFuZ2VDaGFuZ2VcIjtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyLmNhbGwpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFycmFuZ2UgdG8gZGlzcGF0Y2ggXCIgKyBKU09OLnN0cmluZ2lmeShuYW1lKSArIFwiIG1hcCBjaGFuZ2VzXCIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSBcImhhbmRsZVwiICsgcHJvcGVydHlOYW1lICsgXCJSYW5nZVdpbGxDaGFuZ2VcIjtcbiAgICAgICAgaWYgKGhhbmRsZXJbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gbWV0aG9kTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyLmhhbmRsZVJhbmdlV2lsbENoYW5nZSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBcImhhbmRsZVJhbmdlV2lsbENoYW5nZVwiO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIuY2FsbCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgYXJyYW5nZSB0byBkaXNwYXRjaCBcIiArIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgXCIgbWFwIGNoYW5nZXNcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG5cbiAgICAvLyBUT0RPIGlzc3VlIHdhcm5pbmcgaWYgdGhlIG51bWJlciBvZiBoYW5kbGVyIHJlY29yZHMgaXMgd29ycmlzb21lXG4gICAgcmV0dXJuIG9ic2VydmVyO1xufVxuXG5PYnNlcnZhYmxlUmFuZ2Uub2JzZXJ2ZVJhbmdlV2lsbENoYW5nZSA9IG9ic2VydmVSYW5nZVdpbGxDaGFuZ2U7XG5mdW5jdGlvbiBvYnNlcnZlUmFuZ2VXaWxsQ2hhbmdlKG9iamVjdCwgaGFuZGxlciwgbmFtZSwgbm90ZSkge1xuICAgIHJldHVybiBvYnNlcnZlUmFuZ2VDaGFuZ2Uob2JqZWN0LCBoYW5kbGVyLCBuYW1lLCBub3RlLCB0cnVlKTtcbn1cblxuT2JzZXJ2YWJsZVJhbmdlLmRpc3BhdGNoUmFuZ2VDaGFuZ2UgPSBkaXNwYXRjaFJhbmdlQ2hhbmdlO1xuZnVuY3Rpb24gZGlzcGF0Y2hSYW5nZUNoYW5nZShvYmplY3QsIHBsdXMsIG1pbnVzLCBpbmRleCwgY2FwdHVyZSkge1xuICAgIGlmICghZGlzcGF0Y2hpbmcpIHsgLy8gVE9ETyAmJiAhZGVidWc/XG4gICAgICAgIHJldHVybiBzdGFydFJhbmdlQ2hhbmdlRGlzcGF0Y2hDb250ZXh0KG9iamVjdCwgcGx1cywgbWludXMsIGluZGV4LCBjYXB0dXJlKTtcbiAgICB9XG4gICAgdmFyIG9ic2VydmVycyA9IGdldFJhbmdlQ2hhbmdlT2JzZXJ2ZXJzKG9iamVjdCwgY2FwdHVyZSk7XG4gICAgZm9yICh2YXIgb2JzZXJ2ZXJJbmRleCA9IDA7IG9ic2VydmVySW5kZXggPCBvYnNlcnZlcnMubGVuZ3RoOyBvYnNlcnZlckluZGV4KyspIHtcbiAgICAgICAgdmFyIG9ic2VydmVyID0gb2JzZXJ2ZXJzW29ic2VydmVySW5kZXhdO1xuICAgICAgICAvLyBUaGUgc2xpY2luZyBlbnN1cmVzIHRoYXQgaGFuZGxlcnMgY2Fubm90IGludGVyZmVyZSB3aXRoIGFub3RoZXIgYnlcbiAgICAgICAgLy8gYWx0ZXJpbmcgdGhlc2UgYXJndW1lbnRzLlxuICAgICAgICBvYnNlcnZlci5kaXNwYXRjaChwbHVzLnNsaWNlKCksIG1pbnVzLnNsaWNlKCksIGluZGV4KTtcbiAgICB9XG59XG5cbk9ic2VydmFibGVSYW5nZS5kaXNwYXRjaFJhbmdlV2lsbENoYW5nZSA9IGRpc3BhdGNoUmFuZ2VXaWxsQ2hhbmdlO1xuZnVuY3Rpb24gZGlzcGF0Y2hSYW5nZVdpbGxDaGFuZ2Uob2JqZWN0LCBwbHVzLCBtaW51cywgaW5kZXgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hSYW5nZUNoYW5nZShvYmplY3QsIHBsdXMsIG1pbnVzLCBpbmRleCwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0UmFuZ2VDaGFuZ2VEaXNwYXRjaENvbnRleHQob2JqZWN0LCBwbHVzLCBtaW51cywgaW5kZXgsIGNhcHR1cmUpIHtcbiAgICBkaXNwYXRjaGluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgICAgZGlzcGF0Y2hSYW5nZUNoYW5nZShvYmplY3QsIHBsdXMsIG1pbnVzLCBpbmRleCwgY2FwdHVyZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiUmFuZ2UgY2hhbmdlIGRpc3BhdGNoIHBvc3NpYmx5IGNvcnJ1cHRlZCBieSBlcnJvcjogXCIgKyBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSYW5nZSBjaGFuZ2UgZGlzcGF0Y2ggcG9zc2libHkgY29ycnVwdGVkIGJ5IGVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChvYnNlcnZlclRvRnJlZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBVc2luZyBwdXNoLmFwcGx5IGluc3RlYWQgb2YgYWRkRWFjaCBiZWNhdXNlIHB1c2ggd2lsbCBkZWZpbml0ZWx5XG4gICAgICAgICAgICAvLyBiZSBtdWNoIGZhc3RlciB0aGFuIHRoZSBnZW5lcmljIGFkZEVhY2gsIHdoaWNoIGFsc28gaGFuZGxlc1xuICAgICAgICAgICAgLy8gbm9uLWFycmF5IGNvbGxlY3Rpb25zLlxuICAgICAgICAgICAgb2JzZXJ2ZXJGcmVlTGlzdC5wdXNoLmFwcGx5KFxuICAgICAgICAgICAgICAgIG9ic2VydmVyRnJlZUxpc3QsXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJUb0ZyZWVMaXN0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gVXNpbmcgY2xlYXIgYmVjYXVzZSBpdCBpcyBvYnNlcnZhYmxlLiBUaGUgaGFuZGxlciByZWNvcmQgYXJyYXlcbiAgICAgICAgICAgIC8vIGlzIG9idGFpbmFibGUgYnkgZ2V0UHJvcGVydHlDaGFuZ2VPYnNlcnZlcnMsIGFuZCBpcyBvYnNlcnZhYmxlLlxuICAgICAgICAgICAgaWYgKG9ic2VydmVyVG9GcmVlTGlzdC5jbGVhcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyVG9GcmVlTGlzdC5jbGVhcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlclRvRnJlZUxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFrZVJhbmdlQ2hhbmdlc09ic2VydmFibGUob2JqZWN0KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICBPYS5tYWtlUmFuZ2VDaGFuZ2VzT2JzZXJ2YWJsZShvYmplY3QpO1xuICAgIH1cbiAgICBpZiAob2JqZWN0Lm1ha2VSYW5nZUNoYW5nZXNPYnNlcnZhYmxlKSB7XG4gICAgICAgIG9iamVjdC5tYWtlUmFuZ2VDaGFuZ2VzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbiAgICBvYmplY3QuZGlzcGF0Y2hlc1JhbmdlQ2hhbmdlcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFJhbmdlQ2hhbmdlT2JzZXJ2ZXJzKG9iamVjdCwgY2FwdHVyZSkge1xuICAgIGlmIChjYXB0dXJlKSB7XG4gICAgICAgIGlmICghb2JqZWN0LnJhbmdlV2lsbENoYW5nZU9ic2VydmVycykge1xuICAgICAgICAgICAgb2JqZWN0LnJhbmdlV2lsbENoYW5nZU9ic2VydmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3QucmFuZ2VXaWxsQ2hhbmdlT2JzZXJ2ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghb2JqZWN0LnJhbmdlQ2hhbmdlT2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICBvYmplY3QucmFuZ2VDaGFuZ2VPYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0LnJhbmdlQ2hhbmdlT2JzZXJ2ZXJzO1xuICAgIH1cbn1cblxuLypcbiAgICBpZiAob2JqZWN0LnByZXZlbnRQcm9wZXJ0eU9ic2VydmVyKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QucHJldmVudFByb3BlcnR5T2JzZXJ2ZXIobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByZXZlbnRQcm9wZXJ0eU9ic2VydmVyKG9iamVjdCwgbmFtZSk7XG4gICAgfVxuKi9cblxuZnVuY3Rpb24gUmFuZ2VDaGFuZ2VPYnNlcnZlcigpIHtcbiAgICB0aGlzLmluaXQoKTtcbn1cblxuUmFuZ2VDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9iamVjdCA9IG51bGw7XG4gICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICB0aGlzLm9ic2VydmVycyA9IG51bGw7XG4gICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcbiAgICB0aGlzLmhhbmRsZXJNZXRob2ROYW1lID0gbnVsbDtcbiAgICB0aGlzLmNoaWxkT2JzZXJ2ZXIgPSBudWxsO1xuICAgIHRoaXMubm90ZSA9IG51bGw7XG4gICAgdGhpcy5jYXB0dXJlID0gbnVsbDtcbn07XG5cblJhbmdlQ2hhbmdlT2JzZXJ2ZXIucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgdmFyIGluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2YodGhpcyk7XG4gICAgLy8gVW5mb3J0dW5hdGVseSwgaWYgdGhpcyBvYnNlcnZlciB3YXMgcmV1c2VkLCB0aGlzIHdvdWxkIG5vdCBiZSBzdWZmaWNpZW50XG4gICAgLy8gdG8gZGV0ZWN0IGEgZHVwbGljYXRlIGNhbmNlbC4gRG8gbm90IGNhbmNlbCBtb3JlIHRoYW4gb25jZS5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiQ2FuJ3QgY2FuY2VsIG9ic2VydmVyIGZvciBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLm5hbWUpICsgXCIgcmFuZ2UgY2hhbmdlc1wiICtcbiAgICAgICAgICAgIFwiIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBjYW5jZWxlZFwiXG4gICAgICAgICk7XG4gICAgfVxuICAgIHZhciBjaGlsZE9ic2VydmVyID0gdGhpcy5jaGlsZE9ic2VydmVyO1xuICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIC8vIElmIHRoaXMgb2JzZXJ2ZXIgaXMgY2FuY2VsZWQgd2hpbGUgZGlzcGF0Y2hpbmcgYSBjaGFuZ2VcbiAgICAvLyBub3RpZmljYXRpb24gZm9yIHRoZSBzYW1lIHByb3BlcnR5Li4uXG4gICAgLy8gMS4gV2UgY2Fubm90IHB1dCB0aGUgaGFuZGxlciByZWNvcmQgb250byB0aGUgZnJlZSBsaXN0IGJlY2F1c2VcbiAgICAvLyBpdCBtYXkgaGF2ZSBiZWVuIGNhcHR1cmVkIGluIHRoZSBhcnJheSBvZiByZWNvcmRzIHRvIHdoaWNoXG4gICAgLy8gdGhlIGNoYW5nZSBub3RpZmljYXRpb24gd291bGQgYmUgc2VudC4gV2UgbXVzdCBtYXJrIGl0IGFzXG4gICAgLy8gY2FuY2VsZWQgYnkgbnVsbGluZyBvdXQgdGhlIGhhbmRsZXIgcHJvcGVydHkgc28gdGhlIGRpc3BhdGNoZXJcbiAgICAvLyBwYXNzZXMgb3ZlciBpdC5cbiAgICAvLyAyLiBXZSBhbHNvIGNhbm5vdCBwdXQgdGhlIGhhbmRsZXIgcmVjb3JkIG9udG8gdGhlIGZyZWUgbGlzdFxuICAgIC8vIHVudGlsIGFsbCBjaGFuZ2UgZGlzcGF0Y2hlcyBoYXZlIGJlZW4gY29tcGxldGVkIGJlY2F1c2UgaXQgY291bGRcbiAgICAvLyBjb25jZWl2YWJseSBiZSByZXVzZWQsIGNvbmZ1c2luZyB0aGUgY3VycmVudCBkaXNwYXRjaGVyLlxuICAgIGlmIChkaXNwYXRjaGluZykge1xuICAgICAgICAvLyBBbGwgaGFuZGxlcnMgYWRkZWQgdG8gdGhpcyBsaXN0IHdpbGwgYmUgbW92ZWQgb3ZlciB0byB0aGVcbiAgICAgICAgLy8gYWN0dWFsIGZyZWUgbGlzdCB3aGVuIHRoZXJlIGFyZSBubyBsb25nZXIgYW55IHByb3BlcnR5XG4gICAgICAgIC8vIGNoYW5nZSBkaXNwYXRjaGVycyBvbiB0aGUgc3RhY2suXG4gICAgICAgIG9ic2VydmVyVG9GcmVlTGlzdC5wdXNoKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic2VydmVyRnJlZUxpc3QucHVzaCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkT2JzZXJ2ZXIpIHtcbiAgICAgICAgLy8gQ2FsbGluZyB1c2VyIGNvZGUgb24gb3VyIHN0YWNrLlxuICAgICAgICAvLyBEb25lIGluIHRhaWwgcG9zaXRpb24gdG8gYXZvaWQgYSBwbGFuIGludGVyZmVyZW5jZSBoYXphcmQuXG4gICAgICAgIGNoaWxkT2JzZXJ2ZXIuY2FuY2VsKCk7XG4gICAgfVxufTtcblxuUmFuZ2VDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAocGx1cywgbWludXMsIGluZGV4KSB7XG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG4gICAgLy8gQSBudWxsIGhhbmRsZXIgaW1wbGllcyB0aGF0IGFuIG9ic2VydmVyIHdhcyBjYW5jZWxlZCBkdXJpbmcgdGhlIGRpc3BhdGNoXG4gICAgLy8gb2YgYSBjaGFuZ2UuIFRoZSBvYnNlcnZlciBpcyBwZW5kaW5nIGFkZGl0aW9uIHRvIHRoZSBmcmVlIGxpc3QuXG4gICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGRPYnNlcnZlciA9IHRoaXMuY2hpbGRPYnNlcnZlcjtcbiAgICB0aGlzLmNoaWxkT2JzZXJ2ZXIgPSBudWxsO1xuICAgIC8vIFhYWCBwbGFuIGludGVyZmVyZW5jZSBoYXphcmRzIGNhbGxpbmcgY2FuY2VsIGFuZCBoYW5kbGVyIG1ldGhvZHM6XG4gICAgaWYgKGNoaWxkT2JzZXJ2ZXIpIHtcbiAgICAgICAgY2hpbGRPYnNlcnZlci5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlck1ldGhvZE5hbWUgPSB0aGlzLmhhbmRsZXJNZXRob2ROYW1lO1xuICAgIGlmIChoYW5kbGVyTWV0aG9kTmFtZSAmJiB0eXBlb2YgaGFuZGxlcltoYW5kbGVyTWV0aG9kTmFtZV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjaGlsZE9ic2VydmVyID0gaGFuZGxlcltoYW5kbGVyTWV0aG9kTmFtZV0ocGx1cywgbWludXMsIGluZGV4LCB0aGlzLm9iamVjdCk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyLmNhbGwpIHtcbiAgICAgICAgY2hpbGRPYnNlcnZlciA9IGhhbmRsZXIuY2FsbCh2b2lkIDAsIHBsdXMsIG1pbnVzLCBpbmRleCwgdGhpcy5vYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiQ2FuJ3QgZGlzcGF0Y2ggcmFuZ2UgY2hhbmdlIHRvIFwiICsgaGFuZGxlclxuICAgICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRPYnNlcnZlciA9IGNoaWxkT2JzZXJ2ZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbnZhciBPYSA9IHJlcXVpcmUoXCIuL29ic2VydmFibGUtYXJyYXlcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gQ29weXJpZ2h0IChDKSAyMDE0IE1vbnRhZ2UgU3R1ZGlvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbW9udGFnZWpzL2NvbGxlY3Rpb25zL2Jsb2IvN2M2NzRkNDljMDQ5NTVmMDFiYmQyODM5ZjkwOTM2ZTE1YWNlZWEyZi9vcGVyYXRvcnMvc3dhcC5qc1xuXG52YXIgYXJyYXlfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbm1vZHVsZS5leHBvcnRzID0gc3dhcDtcbmZ1bmN0aW9uIHN3YXAoYXJyYXksIHN0YXJ0LCBtaW51c0xlbmd0aCwgcGx1cykge1xuICAgIC8vIFVucm9sbGVkIGltcGxlbWVudGF0aW9uIGludG8gSmF2YVNjcmlwdCBmb3IgYSBjb3VwbGUgcmVhc29ucy5cbiAgICAvLyBDYWxsaW5nIHNwbGljZSBjYW4gY2F1c2UgbGFyZ2Ugc3RhY2sgc2l6ZXMgZm9yIGxhcmdlIHN3YXBzLiBBbHNvLFxuICAgIC8vIHNwbGljZSBjYW5ub3QgaGFuZGxlIGFycmF5IGhvbGVzLlxuICAgIGlmIChwbHVzKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwbHVzKSkge1xuICAgICAgICAgICAgcGx1cyA9IGFycmF5X3NsaWNlLmNhbGwocGx1cyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBwbHVzID0gQXJyYXkuZW1wdHk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgICBzdGFydCA9IGFycmF5Lmxlbmd0aCArIHN0YXJ0O1xuICAgIH0gZWxzZSBpZiAoc3RhcnQgPiBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgYXJyYXkubGVuZ3RoID0gc3RhcnQ7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ICsgbWludXNMZW5ndGggPiBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgLy8gVHJ1bmNhdGUgbWludXMgbGVuZ3RoIGlmIGl0IGV4dGVuZHMgYmV5b25kIHRoZSBsZW5ndGhcbiAgICAgICAgbWludXNMZW5ndGggPSBhcnJheS5sZW5ndGggLSBzdGFydDtcbiAgICB9IGVsc2UgaWYgKG1pbnVzTGVuZ3RoIDwgMCkge1xuICAgICAgICAvLyBJdCBpcyB0aGUgSmF2YVNjcmlwdCB3YXkuXG4gICAgICAgIG1pbnVzTGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICB2YXIgZGlmZiA9IHBsdXMubGVuZ3RoIC0gbWludXNMZW5ndGg7XG4gICAgdmFyIG9sZExlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgbmV3TGVuZ3RoID0gYXJyYXkubGVuZ3RoICsgZGlmZjtcblxuICAgIGlmIChkaWZmID4gMCkge1xuICAgICAgICAvLyBIZWFkIFRhaWwgUGx1cyBNaW51c1xuICAgICAgICAvLyBIIEggSCBIIE0gTSBUIFQgVCBUXG4gICAgICAgIC8vIEggSCBIIEggUCBQIFAgUCBUIFQgVCBUXG4gICAgICAgIC8vICAgICAgICAgXiBzdGFydFxuICAgICAgICAvLyAgICAgICAgIF4tXiBtaW51cy5sZW5ndGhcbiAgICAgICAgLy8gICAgICAgICAgIF4gLS0+IGRpZmZcbiAgICAgICAgLy8gICAgICAgICBeLS0tLS1eIHBsdXMubGVuZ3RoXG4gICAgICAgIC8vICAgICAgICAgICAgIF4tLS0tLS1eIHRhaWwgYmVmb3JlXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBeLS0tLS0tXiB0YWlsIGFmdGVyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgIF4gc3RhcnQgaXRlcmF0aW9uXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBeIHN0YXJ0IGl0ZXJhdGlvbiBvZmZzZXRcbiAgICAgICAgLy8gICAgICAgICAgICAgXiBlbmQgaXRlcmF0aW9uXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBeIGVuZCBpdGVyYXRpb24gb2Zmc2V0XG4gICAgICAgIC8vICAgICAgICAgICAgIF4gc3RhcnQgKyBtaW51cy5sZW5ndGhcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBeIGxlbmd0aFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICBeIGxlbmd0aCAtIDFcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSBvbGRMZW5ndGggLSAxOyBpbmRleCA+PSBzdGFydCArIG1pbnVzTGVuZ3RoOyBpbmRleC0tKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gaW5kZXggKyBkaWZmO1xuICAgICAgICAgICAgaWYgKGluZGV4IGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbb2Zmc2V0XSA9IGFycmF5W2luZGV4XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT2RkbHksIFBoYW50b21KUyBjb21wbGFpbnMgYWJvdXQgZGVsZXRpbmcgYXJyYXlcbiAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0aWVzLCB1bmxlc3MgeW91IGFzc2lnbiB1bmRlZmluZWQgZmlyc3QuXG4gICAgICAgICAgICAgICAgYXJyYXlbb2Zmc2V0XSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBkZWxldGUgYXJyYXlbb2Zmc2V0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgcGx1cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgaWYgKGluZGV4IGluIHBsdXMpIHtcbiAgICAgICAgICAgIGFycmF5W3N0YXJ0ICsgaW5kZXhdID0gcGx1c1tpbmRleF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJheVtzdGFydCArIGluZGV4XSA9IHZvaWQgMDtcbiAgICAgICAgICAgIGRlbGV0ZSBhcnJheVtzdGFydCArIGluZGV4XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgLy8gSGVhZCBUYWlsIFBsdXMgTWludXNcbiAgICAgICAgLy8gSCBIIEggSCBNIE0gTSBNIFQgVCBUIFRcbiAgICAgICAgLy8gSCBIIEggSCBQIFAgVCBUIFQgVFxuICAgICAgICAvLyAgICAgICAgIF4gc3RhcnRcbiAgICAgICAgLy8gICAgICAgICBeLS0tLS1eIGxlbmd0aFxuICAgICAgICAvLyAgICAgICAgIF4tXiBwbHVzLmxlbmd0aFxuICAgICAgICAvLyAgICAgICAgICAgICBeIHN0YXJ0IGl0ZXJhdGlvblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXiBvZmZzZXQgc3RhcnQgaXRlcmF0aW9uXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXiBlbmRcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXiBvZmZzZXQgZW5kXG4gICAgICAgIC8vICAgICAgICAgICAgIF4gc3RhcnQgKyBtaW51cy5sZW5ndGggLSBwbHVzLmxlbmd0aFxuICAgICAgICAvLyAgICAgICAgICAgICBeIHN0YXJ0IC0gZGlmZlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgXi0tLS0tLV4gdGFpbCBiZWZvcmVcbiAgICAgICAgLy8gICAgICAgICAgICAgXi0tLS0tLV4gdGFpbCBhZnRlclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIF4gbGVuZ3RoIC0gZGlmZlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIF4gbmV3TGVuZ3RoXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gc3RhcnQgKyBwbHVzLmxlbmd0aDsgaW5kZXggPCBvbGRMZW5ndGggLSBkaWZmOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gaW5kZXggLSBkaWZmO1xuICAgICAgICAgICAgaWYgKG9mZnNldCBpbiBhcnJheSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XSA9IGFycmF5W29mZnNldF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBkZWxldGUgYXJyYXlbaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFycmF5Lmxlbmd0aCA9IG5ld0xlbmd0aDtcbn1cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdW56aXAgPSByZXF1aXJlKCcuL3VuemlwJyk7XG5cbi8vIFBvbHltb3JwaGljIHVuemlwIHVzZXMgY29sbGVjdGlvbi50b0FycmF5KCkgKGZvciBub24tYXJyYXkgY29sbGVjdGlvblxuLy8gaW1wbGVtZW50YXRpb25zKSB0byBjb252ZXJ0IHRoZSB0YWJsZSBvciBhbnkgb2YgaXRzIHJvd3MgaW50byBhcnJheSBiZWZvcmVcbi8vIHBhc3NpbmcgdGhlbSBhbG9uZyB0byB0aGUgbm9uLXBvbHltb3JwaGljIHVuemlwLlxuXG5tb2R1bGUuZXhwb3J0cyA9IHBvcFVuemlwO1xuZnVuY3Rpb24gcG9wVW56aXAodGFibGUpIHtcbiAgICBpZiAodHlwZW9mIHRhYmxlLnVuemlwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0YWJsZS51bnppcCgpO1xuICAgIH1cbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgdGFibGUgd2UgcGFzcyB0byB0aGUgbm9uLXBvbHltb3JwaGljIHVuemlwIGlzIGFuIGFycmF5XG4gICAgLy8gb2YgYXJyYXlzLlxuICAgIC8vIEhvd2V2ZXIsIG9ubHkgY29uc3RydWN0IGEgbmV3IHRhYmxlIGlmIG5lY2Vzc2FyeS5cbiAgICB2YXIgYXJyYXlUYWJsZTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGFibGUpKSB7XG4gICAgICAgIHRhYmxlID0gYXJyYXlUYWJsZSA9IHRhYmxlLnRvQXJyYXkoKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSB0YWJsZS5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciByb3cgPSB0YWJsZVtpbmRleF07XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyb3cpKSB7XG4gICAgICAgICAgICAvLyBDb25zdHJ1Y3QgYSBjb3B5IG9mIHRoZSB0YWJsZSBpbiB3aGljaCB0byByZXBsYWNlIG5vbi1hcnJheVxuICAgICAgICAgICAgLy8gdmFsdWVzLlxuICAgICAgICAgICAgaWYgKCFhcnJheVRhYmxlKSB7XG4gICAgICAgICAgICAgICAgLy8gVGFibGUgaXMga25vd24gdG8gYmUgYW4gYXJyYXkgYmVjYXVzZSB3ZSB3b3VsZCBoYXZlIHJlcGxhY2VkXG4gICAgICAgICAgICAgICAgLy8gaXQgYWxyZWFkeSBvdGhlcndpc2UuXG4gICAgICAgICAgICAgICAgYXJyYXlUYWJsZSA9IHRhYmxlLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcnJheVRhYmxlW2luZGV4XSA9IHJvdy50b0FycmF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuemlwKGFycmF5VGFibGUgfHwgdGFibGUpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBVbnppcCBpcyBhbHNvIGtub3duIGFzIGEgbWF0cml4IHRyYW5zcG9zZSwgb3BlcmF0aW5nIGV4Y2x1c2l2ZWx5IG9uIGFycmF5cy5cblxubW9kdWxlLmV4cG9ydHMgPSB1bnppcDtcbmZ1bmN0aW9uIHVuemlwKHRhYmxlKSB7XG4gICAgdmFyIHRyYW5zcG9zZSA9IFtdO1xuICAgIHZhciByb3dzID0gdGFibGUubGVuZ3RoO1xuICAgIHZhciByb3csIGNvbHVtbnMsIGxlbmd0aDtcbiAgICB2YXIgaW5kZXgsIGpuZGV4O1xuXG4gICAgLy8gTWF0aGVtYXRpY2FsbHksIHRoZSBkZWdlbmVyYXRlIGNhc2UgaXMgYW4gZW1wdHkgYXJyYXkgd2hlcmUgZWFjaCBpbm5lclxuICAgIC8vIHZhbHVlIHdvdWxkIGJlIG9mIGluZmluaXRlIGxlbmd0aC5cbiAgICBpZiAoIXJvd3MpIHtcbiAgICAgICAgLy8gV2l0aGluIHRoaXMgYXJyYXksIHRoZSBub3RoaW5nbmVzcyBpcyBpbmZpbml0ZS5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbHVtbnMgPSB0YWJsZVswXS5sZW5ndGg7XG4gICAgbGVuZ3RoID0gSW5maW5pdHk7XG5cbiAgICAvLyBGaW5kIHRoZSBzaG9ydGVzdCByb3csIHRoaXMgd2lsbCBiZSB0aGUgbGVuZ3RoIG9mIHRoZSB0cmFuc3Bvc2UuXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcm93czsgaW5kZXgrKykge1xuICAgICAgICByb3cgPSB0YWJsZVtpbmRleF07XG4gICAgICAgIGlmIChyb3cubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBsZW5ndGggPSByb3cubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUG9wdWxhdGUgdGhlIHRyYW5zcG9zZS5cbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgcm93ID0gdHJhbnNwb3NlW2luZGV4XSA9IFtdO1xuICAgICAgICBmb3IgKGpuZGV4ID0gMDsgam5kZXggPCByb3dzOyBqbmRleCsrKSB7XG4gICAgICAgICAgICByb3dbam5kZXhdID0gdGFibGVbam5kZXhdW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cmFuc3Bvc2U7XG59XG4iLCIvLyBDb3B5cmlnaHQgKEMpIDIwMTEgR29vZ2xlIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEluc3RhbGwgYSBsZWFreSBXZWFrTWFwIGVtdWxhdGlvbiBvbiBwbGF0Zm9ybXMgdGhhdFxuICogZG9uJ3QgcHJvdmlkZSBhIGJ1aWx0LWluIG9uZS5cbiAqXG4gKiA8cD5Bc3N1bWVzIHRoYXQgYW4gRVM1IHBsYXRmb3JtIHdoZXJlLCBpZiB7QGNvZGUgV2Vha01hcH0gaXNcbiAqIGFscmVhZHkgcHJlc2VudCwgdGhlbiBpdCBjb25mb3JtcyB0byB0aGUgYW50aWNpcGF0ZWQgRVM2XG4gKiBzcGVjaWZpY2F0aW9uLiBUbyBydW4gdGhpcyBmaWxlIG9uIGFuIEVTNSBvciBhbG1vc3QgRVM1XG4gKiBpbXBsZW1lbnRhdGlvbiB3aGVyZSB0aGUge0Bjb2RlIFdlYWtNYXB9IHNwZWNpZmljYXRpb24gZG9lcyBub3RcbiAqIHF1aXRlIGNvbmZvcm0sIHJ1biA8Y29kZT5yZXBhaXJFUzUuanM8L2NvZGU+IGZpcnN0LlxuICpcbiAqIDxwPkV2ZW4gdGhvdWdoIFdlYWtNYXBNb2R1bGUgaXMgbm90IGdsb2JhbCwgdGhlIGxpbnRlciB0aGlua3MgaXRcbiAqIGlzLCB3aGljaCBpcyB3aHkgaXQgaXMgaW4gdGhlIG92ZXJyaWRlcyBsaXN0IGJlbG93LlxuICpcbiAqIDxwPk5PVEU6IEJlZm9yZSB1c2luZyB0aGlzIFdlYWtNYXAgZW11bGF0aW9uIGluIGEgbm9uLVNFU1xuICogZW52aXJvbm1lbnQsIHNlZSB0aGUgbm90ZSBiZWxvdyBhYm91dCBoaWRkZW5SZWNvcmQuXG4gKlxuICogQGF1dGhvciBNYXJrIFMuIE1pbGxlclxuICogQHJlcXVpcmVzIGNyeXB0bywgQXJyYXlCdWZmZXIsIFVpbnQ4QXJyYXksIG5hdmlnYXRvciwgY29uc29sZVxuICogQG92ZXJyaWRlcyBXZWFrTWFwLCBzZXMsIFByb3h5XG4gKiBAb3ZlcnJpZGVzIFdlYWtNYXBNb2R1bGVcbiAqL1xuXG4vKipcbiAqIFRoaXMge0Bjb2RlIFdlYWtNYXB9IGVtdWxhdGlvbiBpcyBvYnNlcnZhYmx5IGVxdWl2YWxlbnQgdG8gdGhlXG4gKiBFUy1IYXJtb255IFdlYWtNYXAsIGJ1dCB3aXRoIGxlYWtpZXIgZ2FyYmFnZSBjb2xsZWN0aW9uIHByb3BlcnRpZXMuXG4gKlxuICogPHA+QXMgd2l0aCB0cnVlIFdlYWtNYXBzLCBpbiB0aGlzIGVtdWxhdGlvbiwgYSBrZXkgZG9lcyBub3RcbiAqIHJldGFpbiBtYXBzIGluZGV4ZWQgYnkgdGhhdCBrZXkgYW5kIChjcnVjaWFsbHkpIGEgbWFwIGRvZXMgbm90XG4gKiByZXRhaW4gdGhlIGtleXMgaXQgaW5kZXhlcy4gQSBtYXAgYnkgaXRzZWxmIGFsc28gZG9lcyBub3QgcmV0YWluXG4gKiB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCB0aGF0IG1hcC5cbiAqXG4gKiA8cD5Ib3dldmVyLCB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIGtleSBpbiBzb21lIG1hcCBhcmVcbiAqIHJldGFpbmVkIHNvIGxvbmcgYXMgdGhhdCBrZXkgaXMgcmV0YWluZWQgYW5kIHRob3NlIGFzc29jaWF0aW9ucyBhcmVcbiAqIG5vdCBvdmVycmlkZGVuLiBGb3IgZXhhbXBsZSwgd2hlbiB1c2VkIHRvIHN1cHBvcnQgbWVtYnJhbmVzLCBhbGxcbiAqIHZhbHVlcyBleHBvcnRlZCBmcm9tIGEgZ2l2ZW4gbWVtYnJhbmUgd2lsbCBsaXZlIGZvciB0aGUgbGlmZXRpbWVcbiAqIHRoZXkgd291bGQgaGF2ZSBoYWQgaW4gdGhlIGFic2VuY2Ugb2YgYW4gaW50ZXJwb3NlZCBtZW1icmFuZS4gRXZlblxuICogd2hlbiB0aGUgbWVtYnJhbmUgaXMgcmV2b2tlZCwgYWxsIG9iamVjdHMgdGhhdCB3b3VsZCBoYXZlIGJlZW5cbiAqIHJlYWNoYWJsZSBpbiB0aGUgYWJzZW5jZSBvZiByZXZvY2F0aW9uIHdpbGwgc3RpbGwgYmUgcmVhY2hhYmxlLCBhc1xuICogZmFyIGFzIHRoZSBHQyBjYW4gdGVsbCwgZXZlbiB0aG91Z2ggdGhleSB3aWxsIG5vIGxvbmdlciBiZSByZWxldmFudFxuICogdG8gb25nb2luZyBjb21wdXRhdGlvbi5cbiAqXG4gKiA8cD5UaGUgQVBJIGltcGxlbWVudGVkIGhlcmUgaXMgYXBwcm94aW1hdGVseSB0aGUgQVBJIGFzIGltcGxlbWVudGVkXG4gKiBpbiBGRjYuMGExIGFuZCBhZ3JlZWQgdG8gYnkgTWFya00sIEFuZHJlYXMgR2FsLCBhbmQgRGF2ZSBIZXJtYW4sXG4gKiByYXRoZXIgdGhhbiB0aGUgb2ZmaWFsbHkgYXBwcm92ZWQgcHJvcG9zYWwgcGFnZS4gVE9ETyhlcmlnaHRzKTpcbiAqIHVwZ3JhZGUgdGhlIGVjbWFzY3JpcHQgV2Vha01hcCBwcm9wb3NhbCBwYWdlIHRvIGV4cGxhaW4gdGhpcyBBUElcbiAqIGNoYW5nZSBhbmQgcHJlc2VudCB0byBFY21hU2NyaXB0IGNvbW1pdHRlZSBmb3IgdGhlaXIgYXBwcm92YWwuXG4gKlxuICogPHA+VGhlIGZpcnN0IGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgZW11bGF0aW9uIGhlcmUgYW5kIHRoYXQgaW5cbiAqIEZGNi4wYTEgaXMgdGhlIHByZXNlbmNlIG9mIG5vbiBlbnVtZXJhYmxlIHtAY29kZSBnZXRfX18sIGhhc19fXyxcbiAqIHNldF9fXywgYW5kIGRlbGV0ZV9fX30gbWV0aG9kcyBvbiBXZWFrTWFwIGluc3RhbmNlcyB0byByZXByZXNlbnRcbiAqIHdoYXQgd291bGQgYmUgdGhlIGhpZGRlbiBpbnRlcm5hbCBwcm9wZXJ0aWVzIG9mIGEgcHJpbWl0aXZlXG4gKiBpbXBsZW1lbnRhdGlvbi4gV2hlcmVhcyB0aGUgRkY2LjBhMSBXZWFrTWFwLnByb3RvdHlwZSBtZXRob2RzXG4gKiByZXF1aXJlIHRoZWlyIHtAY29kZSB0aGlzfSB0byBiZSBhIGdlbnVpbmUgV2Vha01hcCBpbnN0YW5jZSAoaS5lLixcbiAqIGFuIG9iamVjdCBvZiB7QGNvZGUgW1tDbGFzc11dfSBcIldlYWtNYXB9KSwgc2luY2UgdGhlcmUgaXMgbm90aGluZ1xuICogdW5mb3JnZWFibGUgYWJvdXQgdGhlIHBzZXVkby1pbnRlcm5hbCBtZXRob2QgbmFtZXMgdXNlZCBoZXJlLFxuICogbm90aGluZyBwcmV2ZW50cyB0aGVzZSBlbXVsYXRlZCBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIGJlaW5nXG4gKiBhcHBsaWVkIHRvIG5vbi1XZWFrTWFwcyB3aXRoIHBzZXVkby1pbnRlcm5hbCBtZXRob2RzIG9mIHRoZSBzYW1lXG4gKiBuYW1lcy5cbiAqXG4gKiA8cD5Bbm90aGVyIGRpZmZlcmVuY2UgaXMgdGhhdCBvdXIgZW11bGF0ZWQge0Bjb2RlXG4gKiBXZWFrTWFwLnByb3RvdHlwZX0gaXMgbm90IGl0c2VsZiBhIFdlYWtNYXAuIEEgcHJvYmxlbSB3aXRoIHRoZVxuICogY3VycmVudCBGRjYuMGExIEFQSSBpcyB0aGF0IFdlYWtNYXAucHJvdG90eXBlIGlzIGl0c2VsZiBhIFdlYWtNYXBcbiAqIHByb3ZpZGluZyBhbWJpZW50IG11dGFiaWxpdHkgYW5kIGFuIGFtYmllbnQgY29tbXVuaWNhdGlvbnNcbiAqIGNoYW5uZWwuIFRodXMsIGlmIGEgV2Vha01hcCBpcyBhbHJlYWR5IHByZXNlbnQgYW5kIGhhcyB0aGlzXG4gKiBwcm9ibGVtLCByZXBhaXJFUzUuanMgd3JhcHMgaXQgaW4gYSBzYWZlIHdyYXBwcGVyIGluIG9yZGVyIHRvXG4gKiBwcmV2ZW50IGFjY2VzcyB0byB0aGlzIGNoYW5uZWwuIChTZWVcbiAqIFBBVENIX01VVEFCTEVfRlJPWkVOX1dFQUtNQVBfUFJPVE8gaW4gcmVwYWlyRVM1LmpzKS5cbiAqL1xuXG4vKipcbiAqIElmIHRoaXMgaXMgYSBmdWxsIDxhIGhyZWY9XG4gKiBcImh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9lcy1sYWIvd2lraS9TZWN1cmVhYmxlRVM1XCJcbiAqID5zZWN1cmVhYmxlIEVTNTwvYT4gcGxhdGZvcm0gYW5kIHRoZSBFUy1IYXJtb255IHtAY29kZSBXZWFrTWFwfSBpc1xuICogYWJzZW50LCBpbnN0YWxsIGFuIGFwcHJveGltYXRlIGVtdWxhdGlvbi5cbiAqXG4gKiA8cD5JZiBXZWFrTWFwIGlzIHByZXNlbnQgYnV0IGNhbm5vdCBzdG9yZSBzb21lIG9iamVjdHMsIHVzZSBvdXIgYXBwcm94aW1hdGVcbiAqIGVtdWxhdGlvbiBhcyBhIHdyYXBwZXIuXG4gKlxuICogPHA+SWYgdGhpcyBpcyBhbG1vc3QgYSBzZWN1cmVhYmxlIEVTNSBwbGF0Zm9ybSwgdGhlbiBXZWFrTWFwLmpzXG4gKiBzaG91bGQgYmUgcnVuIGFmdGVyIHJlcGFpckVTNS5qcy5cbiAqXG4gKiA8cD5TZWUge0Bjb2RlIFdlYWtNYXB9IGZvciBkb2N1bWVudGF0aW9uIG9mIHRoZSBnYXJiYWdlIGNvbGxlY3Rpb25cbiAqIHByb3BlcnRpZXMgb2YgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbi5cbiAqL1xuKGZ1bmN0aW9uIFdlYWtNYXBNb2R1bGUoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2Ygc2VzICE9PSAndW5kZWZpbmVkJyAmJiBzZXMub2sgJiYgIXNlcy5vaygpKSB7XG4gICAgLy8gYWxyZWFkeSB0b28gYnJva2VuLCBzbyBnaXZlIHVwXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHNvbWUgY2FzZXMgKGN1cnJlbnQgRmlyZWZveCksIHdlIG11c3QgbWFrZSBhIGNob2ljZSBiZXR3ZWVlbiBhXG4gICAqIFdlYWtNYXAgd2hpY2ggaXMgY2FwYWJsZSBvZiB1c2luZyBhbGwgdmFyaWV0aWVzIG9mIGhvc3Qgb2JqZWN0cyBhc1xuICAgKiBrZXlzIGFuZCBvbmUgd2hpY2ggaXMgY2FwYWJsZSBvZiBzYWZlbHkgdXNpbmcgcHJveGllcyBhcyBrZXlzLiBTZWVcbiAgICogY29tbWVudHMgYmVsb3cgYWJvdXQgSG9zdFdlYWtNYXAgYW5kIERvdWJsZVdlYWtNYXAgZm9yIGRldGFpbHMuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gKHdoaWNoIGlzIGEgZ2xvYmFsLCBub3QgZXhwb3NlZCB0byBndWVzdHMpIG1hcmtzIGFcbiAgICogV2Vha01hcCBhcyBwZXJtaXR0ZWQgdG8gZG8gd2hhdCBpcyBuZWNlc3NhcnkgdG8gaW5kZXggYWxsIGhvc3RcbiAgICogb2JqZWN0cywgYXQgdGhlIGNvc3Qgb2YgbWFraW5nIGl0IHVuc2FmZSBmb3IgcHJveGllcy5cbiAgICpcbiAgICogRG8gbm90IGFwcGx5IHRoaXMgZnVuY3Rpb24gdG8gYW55dGhpbmcgd2hpY2ggaXMgbm90IGEgZ2VudWluZVxuICAgKiBmcmVzaCBXZWFrTWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gd2Vha01hcFBlcm1pdEhvc3RPYmplY3RzKG1hcCkge1xuICAgIC8vIGlkZW50aXR5IG9mIGZ1bmN0aW9uIHVzZWQgYXMgYSBzZWNyZXQgLS0gZ29vZCBlbm91Z2ggYW5kIGNoZWFwXG4gICAgaWYgKG1hcC5wZXJtaXRIb3N0T2JqZWN0c19fXykge1xuICAgICAgbWFwLnBlcm1pdEhvc3RPYmplY3RzX19fKHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cyk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2Ygc2VzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHNlcy53ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMgPSB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHM7XG4gIH1cblxuICAvLyBJRSAxMSBoYXMgbm8gUHJveHkgYnV0IGhhcyBhIGJyb2tlbiBXZWFrTWFwIHN1Y2ggdGhhdCB3ZSBuZWVkIHRvIHBhdGNoXG4gIC8vIGl0IHVzaW5nIERvdWJsZVdlYWtNYXA7IHRoaXMgZmxhZyB0ZWxscyBEb3VibGVXZWFrTWFwIHNvLlxuICB2YXIgZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSA9IGZhbHNlO1xuXG4gIC8vIENoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBnb29kLWVub3VnaCBXZWFrTWFwIGltcGxlbWVudGF0aW9uLCBhbmQgaWYgc29cbiAgLy8gZXhpdCB3aXRob3V0IHJlcGxhY2luZyBpdC5cbiAgaWYgKHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIEhvc3RXZWFrTWFwID0gV2Vha01hcDtcbiAgICAvLyBUaGVyZSBpcyBhIFdlYWtNYXAgLS0gaXMgaXQgZ29vZCBlbm91Z2g/XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIC9GaXJlZm94Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAvLyBXZSdyZSBub3cgKmFzc3VtaW5nIG5vdCosIGJlY2F1c2UgYXMgb2YgdGhpcyB3cml0aW5nICgyMDEzLTA1LTA2KVxuICAgICAgLy8gRmlyZWZveCdzIFdlYWtNYXBzIGhhdmUgYSBtaXNjZWxsYW55IG9mIG9iamVjdHMgdGhleSB3b24ndCBhY2NlcHQsIGFuZFxuICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byBtYWtlIGFuIGV4aGF1c3RpdmUgbGlzdCwgYW5kIHRlc3RpbmcgZm9yIGp1c3Qgb25lXG4gICAgICAvLyB3aWxsIGJlIGEgcHJvYmxlbSBpZiB0aGF0IG9uZSBpcyBmaXhlZCBhbG9uZSAoYXMgdGhleSBkaWQgZm9yIEV2ZW50KS5cblxuICAgICAgLy8gSWYgdGhlcmUgaXMgYSBwbGF0Zm9ybSB0aGF0IHdlICpjYW4qIHJlbGlhYmx5IHRlc3Qgb24sIGhlcmUncyBob3cgdG9cbiAgICAgIC8vIGRvIGl0OlxuICAgICAgLy8gIHZhciBwcm9ibGVtYXRpYyA9IC4uLiA7XG4gICAgICAvLyAgdmFyIHRlc3RIb3N0TWFwID0gbmV3IEhvc3RXZWFrTWFwKCk7XG4gICAgICAvLyAgdHJ5IHtcbiAgICAgIC8vICAgIHRlc3RIb3N0TWFwLnNldChwcm9ibGVtYXRpYywgMSk7ICAvLyBGaXJlZm94IDIwIHdpbGwgdGhyb3cgaGVyZVxuICAgICAgLy8gICAgaWYgKHRlc3RIb3N0TWFwLmdldChwcm9ibGVtYXRpYykgPT09IDEpIHtcbiAgICAgIC8vICAgICAgcmV0dXJuO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgMTEgYnVnOiBXZWFrTWFwcyBzaWxlbnRseSBmYWlsIHRvIHN0b3JlIGZyb3plbiBvYmplY3RzLlxuICAgICAgdmFyIHRlc3RNYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcbiAgICAgIHZhciB0ZXN0T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4gICAgICB0ZXN0TWFwLnNldCh0ZXN0T2JqZWN0LCAxKTtcbiAgICAgIGlmICh0ZXN0TWFwLmdldCh0ZXN0T2JqZWN0KSAhPT0gMSkge1xuICAgICAgICBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlID0gdHJ1ZTtcbiAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGluc3RhbGxpbmcgb3VyIFdlYWtNYXAuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgaG9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGdvcG4gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgdmFyIGRlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4gIHZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuXG4gIC8qKlxuICAgKiBTZWN1cml0eSBkZXBlbmRzIG9uIEhJRERFTl9OQU1FIGJlaW5nIGJvdGggPGk+dW5ndWVzc2FibGU8L2k+IGFuZFxuICAgKiA8aT51bmRpc2NvdmVyYWJsZTwvaT4gYnkgdW50cnVzdGVkIGNvZGUuXG4gICAqXG4gICAqIDxwPkdpdmVuIHRoZSBrbm93biB3ZWFrbmVzc2VzIG9mIE1hdGgucmFuZG9tKCkgb24gZXhpc3RpbmdcbiAgICogYnJvd3NlcnMsIGl0IGRvZXMgbm90IGdlbmVyYXRlIHVuZ3Vlc3NhYmlsaXR5IHdlIGNhbiBiZSBjb25maWRlbnRcbiAgICogb2YuXG4gICAqXG4gICAqIDxwPkl0IGlzIHRoZSBtb25rZXkgcGF0Y2hpbmcgbG9naWMgaW4gdGhpcyBmaWxlIHRoYXQgaXMgaW50ZW5kZWRcbiAgICogdG8gZW5zdXJlIHVuZGlzY292ZXJhYmlsaXR5LiBUaGUgYmFzaWMgaWRlYSBpcyB0aGF0IHRoZXJlIGFyZVxuICAgKiB0aHJlZSBmdW5kYW1lbnRhbCBtZWFucyBvZiBkaXNjb3ZlcmluZyBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdDpcbiAgICogVGhlIGZvci9pbiBsb29wLCBPYmplY3Qua2V5cygpLCBhbmQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoKSxcbiAgICogYXMgd2VsbCBhcyBzb21lIHByb3Bvc2VkIEVTNiBleHRlbnNpb25zIHRoYXQgYXBwZWFyIG9uIG91clxuICAgKiB3aGl0ZWxpc3QuIFRoZSBmaXJzdCB0d28gb25seSBkaXNjb3ZlciBlbnVtZXJhYmxlIHByb3BlcnRpZXMsIGFuZFxuICAgKiB3ZSBvbmx5IHVzZSBISURERU5fTkFNRSB0byBuYW1lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHksIHNvIHRoZVxuICAgKiBvbmx5IHJlbWFpbmluZyB0aHJlYXQgc2hvdWxkIGJlIGdldE93blByb3BlcnR5TmFtZXMgYW5kIHNvbWVcbiAgICogcHJvcG9zZWQgRVM2IGV4dGVuc2lvbnMgdGhhdCBhcHBlYXIgb24gb3VyIHdoaXRlbGlzdC4gV2UgbW9ua2V5XG4gICAqIHBhdGNoIHRoZW0gdG8gcmVtb3ZlIEhJRERFTl9OQU1FIGZyb20gdGhlIGxpc3Qgb2YgcHJvcGVydGllcyB0aGV5XG4gICAqIHJldHVybnMuXG4gICAqXG4gICAqIDxwPlRPRE8oZXJpZ2h0cyk6IE9uIGEgcGxhdGZvcm0gd2l0aCBidWlsdC1pbiBQcm94aWVzLCBwcm94aWVzXG4gICAqIGNvdWxkIGJlIHVzZWQgdG8gdHJhcCBhbmQgdGhlcmVieSBkaXNjb3ZlciB0aGUgSElEREVOX05BTUUsIHNvIHdlXG4gICAqIG5lZWQgdG8gbW9ua2V5IHBhdGNoIFByb3h5LmNyZWF0ZSwgUHJveHkuY3JlYXRlRnVuY3Rpb24sIGV0YywgaW5cbiAgICogb3JkZXIgdG8gd3JhcCB0aGUgcHJvdmlkZWQgaGFuZGxlciB3aXRoIHRoZSByZWFsIGhhbmRsZXIgd2hpY2hcbiAgICogZmlsdGVycyBvdXQgYWxsIHRyYXBzIHVzaW5nIEhJRERFTl9OQU1FLlxuICAgKlxuICAgKiA8cD5UT0RPKGVyaWdodHMpOiBSZXZpc2l0IE1pa2UgU3RheSdzIHN1Z2dlc3Rpb24gdGhhdCB3ZSB1c2UgYW5cbiAgICogZW5jYXBzdWxhdGVkIGZ1bmN0aW9uIGF0IGEgbm90LW5lY2Vzc2FyaWx5LXNlY3JldCBuYW1lLCB3aGljaFxuICAgKiB1c2VzIHRoZSBTdGllZ2xlciBzaGFyZWQtc3RhdGUgcmlnaHRzIGFtcGxpZmljYXRpb24gcGF0dGVybiB0b1xuICAgKiByZXZlYWwgdGhlIGFzc29jaWF0ZWQgdmFsdWUgb25seSB0byB0aGUgV2Vha01hcCBpbiB3aGljaCB0aGlzIGtleVxuICAgKiBpcyBhc3NvY2lhdGVkIHdpdGggdGhhdCB2YWx1ZS4gU2luY2Ugb25seSB0aGUga2V5IHJldGFpbnMgdGhlXG4gICAqIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gY2FuIGFsc28gcmVtZW1iZXIgdGhlIGtleSB3aXRob3V0IGNhdXNpbmdcbiAgICogbGVha2FnZSBvZiB0aGUga2V5LCBzbyB0aGlzIGRvZXNuJ3QgdmlvbGF0ZSBvdXIgZ2VuZXJhbCBnY1xuICAgKiBnb2Fscy4gSW4gYWRkaXRpb24sIGJlY2F1c2UgdGhlIG5hbWUgbmVlZCBub3QgYmUgYSBndWFyZGVkXG4gICAqIHNlY3JldCwgd2UgY291bGQgZWZmaWNpZW50bHkgaGFuZGxlIGNyb3NzLWZyYW1lIGZyb3plbiBrZXlzLlxuICAgKi9cbiAgdmFyIEhJRERFTl9OQU1FX1BSRUZJWCA9ICd3ZWFrbWFwOic7XG4gIHZhciBISURERU5fTkFNRSA9IEhJRERFTl9OQU1FX1BSRUZJWCArICdpZGVudDonICsgTWF0aC5yYW5kb20oKSArICdfX18nO1xuXG4gIGlmICh0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgYWIgPSBuZXcgQXJyYXlCdWZmZXIoMjUpO1xuICAgIHZhciB1OHMgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh1OHMpO1xuICAgIEhJRERFTl9OQU1FID0gSElEREVOX05BTUVfUFJFRklYICsgJ3JhbmQ6JyArXG4gICAgICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwodThzLCBmdW5jdGlvbih1OCkge1xuICAgICAgICByZXR1cm4gKHU4ICUgMzYpLnRvU3RyaW5nKDM2KTtcbiAgICAgIH0pLmpvaW4oJycpICsgJ19fXyc7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vdEhpZGRlbk5hbWUobmFtZSkge1xuICAgIHJldHVybiAhKFxuICAgICAgICBuYW1lLnN1YnN0cigwLCBISURERU5fTkFNRV9QUkVGSVgubGVuZ3RoKSA9PSBISURERU5fTkFNRV9QUkVGSVggJiZcbiAgICAgICAgbmFtZS5zdWJzdHIobmFtZS5sZW5ndGggLSAzKSA9PT0gJ19fXycpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vbmtleSBwYXRjaCBnZXRPd25Qcm9wZXJ0eU5hbWVzIHRvIGF2b2lkIHJldmVhbGluZyB0aGVcbiAgICogSElEREVOX05BTUUuXG4gICAqXG4gICAqIDxwPlRoZSBFUzUuMSBzcGVjIHJlcXVpcmVzIGVhY2ggbmFtZSB0byBhcHBlYXIgb25seSBvbmNlLCBidXQgYXNcbiAgICogb2YgdGhpcyB3cml0aW5nLCB0aGlzIHJlcXVpcmVtZW50IGlzIGNvbnRyb3ZlcnNpYWwgZm9yIEVTNiwgc28gd2VcbiAgICogbWFkZSB0aGlzIGNvZGUgcm9idXN0IGFnYWluc3QgdGhpcyBjYXNlLiBJZiB0aGUgcmVzdWx0aW5nIGV4dHJhXG4gICAqIHNlYXJjaCB0dXJucyBvdXQgdG8gYmUgZXhwZW5zaXZlLCB3ZSBjYW4gcHJvYmFibHkgcmVsYXggdGhpcyBvbmNlXG4gICAqIEVTNiBpcyBhZGVxdWF0ZWx5IHN1cHBvcnRlZCBvbiBhbGwgbWFqb3IgYnJvd3NlcnMsIGlmZiBubyBicm93c2VyXG4gICAqIHZlcnNpb25zIHdlIHN1cHBvcnQgYXQgdGhhdCB0aW1lIGhhdmUgcmVsYXhlZCB0aGlzIGNvbnN0cmFpbnRcbiAgICogd2l0aG91dCBwcm92aWRpbmcgYnVpbHQtaW4gRVM2IFdlYWtNYXBzLlxuICAgKi9cbiAgZGVmUHJvcChPYmplY3QsICdnZXRPd25Qcm9wZXJ0eU5hbWVzJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiBmYWtlR2V0T3duUHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgIHJldHVybiBnb3BuKG9iaikuZmlsdGVyKGlzTm90SGlkZGVuTmFtZSk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogZ2V0UHJvcGVydHlOYW1lcyBpcyBub3QgaW4gRVM1IGJ1dCBpdCBpcyBwcm9wb3NlZCBmb3IgRVM2IGFuZFxuICAgKiBkb2VzIGFwcGVhciBpbiBvdXIgd2hpdGVsaXN0LCBzbyB3ZSBuZWVkIHRvIGNsZWFuIGl0IHRvby5cbiAgICovXG4gIGlmICgnZ2V0UHJvcGVydHlOYW1lcycgaW4gT2JqZWN0KSB7XG4gICAgdmFyIG9yaWdpbmFsR2V0UHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRQcm9wZXJ0eU5hbWVzO1xuICAgIGRlZlByb3AoT2JqZWN0LCAnZ2V0UHJvcGVydHlOYW1lcycsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBmYWtlR2V0UHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsR2V0UHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcihpc05vdEhpZGRlbk5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIDxwPlRvIHRyZWF0IG9iamVjdHMgYXMgaWRlbnRpdHkta2V5cyB3aXRoIHJlYXNvbmFibGUgZWZmaWNpZW5jeVxuICAgKiBvbiBFUzUgYnkgaXRzZWxmIChpLmUuLCB3aXRob3V0IGFueSBvYmplY3Qta2V5ZWQgY29sbGVjdGlvbnMpLCB3ZVxuICAgKiBuZWVkIHRvIGFkZCBhIGhpZGRlbiBwcm9wZXJ0eSB0byBzdWNoIGtleSBvYmplY3RzIHdoZW4gd2VcbiAgICogY2FuLiBUaGlzIHJhaXNlcyBzZXZlcmFsIGlzc3VlczpcbiAgICogPHVsPlxuICAgKiA8bGk+QXJyYW5naW5nIHRvIGFkZCB0aGlzIHByb3BlcnR5IHRvIG9iamVjdHMgYmVmb3JlIHdlIGxvc2UgdGhlXG4gICAqICAgICBjaGFuY2UsIGFuZFxuICAgKiA8bGk+SGlkaW5nIHRoZSBleGlzdGVuY2Ugb2YgdGhpcyBuZXcgcHJvcGVydHkgZnJvbSBtb3N0XG4gICAqICAgICBKYXZhU2NyaXB0IGNvZGUuXG4gICAqIDxsaT5QcmV2ZW50aW5nIDxpPmNlcnRpZmljYXRpb24gdGhlZnQ8L2k+LCB3aGVyZSBvbmUgb2JqZWN0IGlzXG4gICAqICAgICBjcmVhdGVkIGZhbHNlbHkgY2xhaW1pbmcgdG8gYmUgdGhlIGtleSBvZiBhbiBhc3NvY2lhdGlvblxuICAgKiAgICAgYWN0dWFsbHkga2V5ZWQgYnkgYW5vdGhlciBvYmplY3QuXG4gICAqIDxsaT5QcmV2ZW50aW5nIDxpPnZhbHVlIHRoZWZ0PC9pPiwgd2hlcmUgdW50cnVzdGVkIGNvZGUgd2l0aFxuICAgKiAgICAgYWNjZXNzIHRvIGEga2V5IG9iamVjdCBidXQgbm90IGEgd2VhayBtYXAgbmV2ZXJ0aGVsZXNzXG4gICAqICAgICBvYnRhaW5zIGFjY2VzcyB0byB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoYXQga2V5IGluIHRoYXRcbiAgICogICAgIHdlYWsgbWFwLlxuICAgKiA8L3VsPlxuICAgKiBXZSBkbyBzbyBieVxuICAgKiA8dWw+XG4gICAqIDxsaT5NYWtpbmcgdGhlIG5hbWUgb2YgdGhlIGhpZGRlbiBwcm9wZXJ0eSB1bmd1ZXNzYWJsZSwgc28gXCJbXVwiXG4gICAqICAgICBpbmRleGluZywgd2hpY2ggd2UgY2Fubm90IGludGVyY2VwdCwgY2Fubm90IGJlIHVzZWQgdG8gYWNjZXNzXG4gICAqICAgICBhIHByb3BlcnR5IHdpdGhvdXQga25vd2luZyB0aGUgbmFtZS5cbiAgICogPGxpPk1ha2luZyB0aGUgaGlkZGVuIHByb3BlcnR5IG5vbi1lbnVtZXJhYmxlLCBzbyB3ZSBuZWVkIG5vdFxuICAgKiAgICAgd29ycnkgYWJvdXQgZm9yLWluIGxvb3BzIG9yIHtAY29kZSBPYmplY3Qua2V5c30sXG4gICAqIDxsaT5tb25rZXkgcGF0Y2hpbmcgdGhvc2UgcmVmbGVjdGl2ZSBtZXRob2RzIHRoYXQgd291bGRcbiAgICogICAgIHByZXZlbnQgZXh0ZW5zaW9ucywgdG8gYWRkIHRoaXMgaGlkZGVuIHByb3BlcnR5IGZpcnN0LFxuICAgKiA8bGk+bW9ua2V5IHBhdGNoaW5nIHRob3NlIG1ldGhvZHMgdGhhdCB3b3VsZCByZXZlYWwgdGhpc1xuICAgKiAgICAgaGlkZGVuIHByb3BlcnR5LlxuICAgKiA8L3VsPlxuICAgKiBVbmZvcnR1bmF0ZWx5LCBiZWNhdXNlIG9mIHNhbWUtb3JpZ2luIGlmcmFtZXMsIHdlIGNhbm5vdCByZWxpYWJseVxuICAgKiBhZGQgdGhpcyBoaWRkZW4gcHJvcGVydHkgYmVmb3JlIGFuIG9iamVjdCBiZWNvbWVzXG4gICAqIG5vbi1leHRlbnNpYmxlLiBJbnN0ZWFkLCBpZiB3ZSBlbmNvdW50ZXIgYSBub24tZXh0ZW5zaWJsZSBvYmplY3RcbiAgICogd2l0aG91dCBhIGhpZGRlbiByZWNvcmQgdGhhdCB3ZSBjYW4gZGV0ZWN0ICh3aGV0aGVyIG9yIG5vdCBpdCBoYXNcbiAgICogYSBoaWRkZW4gcmVjb3JkIHN0b3JlZCB1bmRlciBhIG5hbWUgc2VjcmV0IHRvIHVzKSwgdGhlbiB3ZSBqdXN0XG4gICAqIHVzZSB0aGUga2V5IG9iamVjdCBpdHNlbGYgdG8gcmVwcmVzZW50IGl0cyBpZGVudGl0eSBpbiBhIGJydXRlXG4gICAqIGZvcmNlIGxlYWt5IG1hcCBzdG9yZWQgaW4gdGhlIHdlYWsgbWFwLCBsb3NpbmcgYWxsIHRoZSBhZHZhbnRhZ2VzXG4gICAqIG9mIHdlYWtuZXNzIGZvciB0aGVzZS5cbiAgICovXG4gIGZ1bmN0aW9uIGdldEhpZGRlblJlY29yZChrZXkpIHtcbiAgICBpZiAoa2V5ICE9PSBPYmplY3Qoa2V5KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTm90IGFuIG9iamVjdDogJyArIGtleSk7XG4gICAgfVxuICAgIHZhciBoaWRkZW5SZWNvcmQgPSBrZXlbSElEREVOX05BTUVdO1xuICAgIGlmIChoaWRkZW5SZWNvcmQgJiYgaGlkZGVuUmVjb3JkLmtleSA9PT0ga2V5KSB7IHJldHVybiBoaWRkZW5SZWNvcmQ7IH1cbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShrZXkpKSB7XG4gICAgICAvLyBXZWFrIG1hcCBtdXN0IGJydXRlIGZvcmNlLCBhcyBleHBsYWluZWQgaW4gZG9jLWNvbW1lbnQgYWJvdmUuXG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFRoZSBoaWRkZW5SZWNvcmQgYW5kIHRoZSBrZXkgcG9pbnQgZGlyZWN0bHkgYXQgZWFjaCBvdGhlciwgdmlhXG4gICAgLy8gdGhlIFwia2V5XCIgYW5kIEhJRERFTl9OQU1FIHByb3BlcnRpZXMgcmVzcGVjdGl2ZWx5LiBUaGUga2V5XG4gICAgLy8gZmllbGQgaXMgZm9yIHF1aWNrbHkgdmVyaWZ5aW5nIHRoYXQgdGhpcyBoaWRkZW4gcmVjb3JkIGlzIGFuXG4gICAgLy8gb3duIHByb3BlcnR5LCBub3QgYSBoaWRkZW4gcmVjb3JkIGZyb20gdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICAvL1xuICAgIC8vIE5PVEU6IEJlY2F1c2UgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbiBpcyBtZWFudCBvbmx5IGZvciBzeXN0ZW1zIGxpa2VcbiAgICAvLyBTRVMgd2hlcmUgT2JqZWN0LnByb3RvdHlwZSBpcyBmcm96ZW4gd2l0aG91dCBhbnkgbnVtZXJpY1xuICAgIC8vIHByb3BlcnRpZXMsIGl0IGlzIG9rIHRvIHVzZSBhbiBvYmplY3QgbGl0ZXJhbCBmb3IgdGhlIGhpZGRlblJlY29yZC5cbiAgICAvLyBUaGlzIGhhcyB0d28gYWR2YW50YWdlczpcbiAgICAvLyAqIEl0IGlzIG11Y2ggZmFzdGVyIGluIGEgcGVyZm9ybWFuY2UgY3JpdGljYWwgcGxhY2VcbiAgICAvLyAqIEl0IGF2b2lkcyByZWx5aW5nIG9uIE9iamVjdC5jcmVhdGUobnVsbCksIHdoaWNoIGhhZCBiZWVuXG4gICAgLy8gICBwcm9ibGVtYXRpYyBvbiBDaHJvbWUgMjguMC4xNDgwLjAuIFNlZVxuICAgIC8vICAgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtY2FqYS9pc3N1ZXMvZGV0YWlsP2lkPTE2ODdcbiAgICBoaWRkZW5SZWNvcmQgPSB7IGtleToga2V5IH07XG5cbiAgICAvLyBXaGVuIHVzaW5nIHRoaXMgV2Vha01hcCBlbXVsYXRpb24gb24gcGxhdGZvcm1zIHdoZXJlXG4gICAgLy8gT2JqZWN0LnByb3RvdHlwZSBtaWdodCBub3QgYmUgZnJvemVuIGFuZCBPYmplY3QuY3JlYXRlKG51bGwpIGlzXG4gICAgLy8gcmVsaWFibGUsIHVzZSB0aGUgZm9sbG93aW5nIHR3byBjb21tZW50ZWQgb3V0IGxpbmVzIGluc3RlYWQuXG4gICAgLy8gaGlkZGVuUmVjb3JkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAvLyBoaWRkZW5SZWNvcmQua2V5ID0ga2V5O1xuXG4gICAgLy8gUGxlYXNlIGNvbnRhY3QgdXMgaWYgeW91IG5lZWQgdGhpcyB0byB3b3JrIG9uIHBsYXRmb3JtcyB3aGVyZVxuICAgIC8vIE9iamVjdC5wcm90b3R5cGUgbWlnaHQgbm90IGJlIGZyb3plbiBhbmRcbiAgICAvLyBPYmplY3QuY3JlYXRlKG51bGwpIG1pZ2h0IG5vdCBiZSByZWxpYWJsZS5cblxuICAgIHRyeSB7XG4gICAgICBkZWZQcm9wKGtleSwgSElEREVOX05BTUUsIHtcbiAgICAgICAgdmFsdWU6IGhpZGRlblJlY29yZCxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGlkZGVuUmVjb3JkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBVbmRlciBzb21lIGNpcmN1bXN0YW5jZXMsIGlzRXh0ZW5zaWJsZSBzZWVtcyB0byBtaXNyZXBvcnQgd2hldGhlclxuICAgICAgLy8gdGhlIEhJRERFTl9OQU1FIGNhbiBiZSBkZWZpbmVkLlxuICAgICAgLy8gVGhlIGNpcmN1bXN0YW5jZXMgaGF2ZSBub3QgYmVlbiBpc29sYXRlZCwgYnV0IGF0IGxlYXN0IGFmZmVjdFxuICAgICAgLy8gTm9kZS5qcyB2MC4xMC4yNiBvbiBUcmF2aXNDSSAvIExpbnV4LCBidXQgbm90IHRoZSBzYW1lIHZlcnNpb24gb2ZcbiAgICAgIC8vIE5vZGUuanMgb24gT1MgWC5cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vbmtleSBwYXRjaCBvcGVyYXRpb25zIHRoYXQgd291bGQgbWFrZSB0aGVpciBhcmd1bWVudFxuICAgKiBub24tZXh0ZW5zaWJsZS5cbiAgICpcbiAgICogPHA+VGhlIG1vbmtleSBwYXRjaGVkIHZlcnNpb25zIHRocm93IGEgVHlwZUVycm9yIGlmIHRoZWlyXG4gICAqIGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QsIHNvIGl0IHNob3VsZCBvbmx5IGJlIGRvbmUgdG8gZnVuY3Rpb25zXG4gICAqIHRoYXQgc2hvdWxkIHRocm93IGEgVHlwZUVycm9yIGFueXdheSBpZiB0aGVpciBhcmd1bWVudCBpcyBub3QgYW5cbiAgICogb2JqZWN0LlxuICAgKi9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIG9sZEZyZWV6ZSA9IE9iamVjdC5mcmVlemU7XG4gICAgZGVmUHJvcChPYmplY3QsICdmcmVlemUnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpZnlpbmdGcmVlemUob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkRnJlZXplKG9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIG9sZFNlYWwgPSBPYmplY3Quc2VhbDtcbiAgICBkZWZQcm9wKE9iamVjdCwgJ3NlYWwnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpZnlpbmdTZWFsKG9iaikge1xuICAgICAgICBnZXRIaWRkZW5SZWNvcmQob2JqKTtcbiAgICAgICAgcmV0dXJuIG9sZFNlYWwob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgb2xkUHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG4gICAgZGVmUHJvcChPYmplY3QsICdwcmV2ZW50RXh0ZW5zaW9ucycsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ1ByZXZlbnRFeHRlbnNpb25zKG9iaikge1xuICAgICAgICBnZXRIaWRkZW5SZWNvcmQob2JqKTtcbiAgICAgICAgcmV0dXJuIG9sZFByZXZlbnRFeHRlbnNpb25zKG9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgZnVuY3Rpb24gY29uc3RGdW5jKGZ1bmMpIHtcbiAgICBmdW5jLnByb3RvdHlwZSA9IG51bGw7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoZnVuYyk7XG4gIH1cblxuICB2YXIgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nKCkge1xuICAgIC8vIEZ1dHVyZSBFUzYgV2Vha01hcCBpcyBjdXJyZW50bHkgKDIwMTMtMDktMTApIGV4cGVjdGVkIHRvIHJlamVjdCBXZWFrTWFwKClcbiAgICAvLyBidXQgd2UgdXNlZCB0byBwZXJtaXQgaXQgYW5kIGRvIGl0IG91cnNlbHZlcywgc28gd2FybiBvbmx5LlxuICAgIGlmICghY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUud2FybignV2Vha01hcCBzaG91bGQgYmUgaW52b2tlZCBhcyBuZXcgV2Vha01hcCgpLCBub3QgJyArXG4gICAgICAgICAgJ1dlYWtNYXAoKS4gVGhpcyB3aWxsIGJlIGFuIGVycm9yIGluIHRoZSBmdXR1cmUuJyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG5leHRJZCA9IDA7XG5cbiAgdmFyIE91cldlYWtNYXAgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgT3VyV2Vha01hcCkpIHsgIC8vIGFwcHJveGltYXRlIHRlc3QgZm9yIG5ldyAuLi4oKVxuICAgICAgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmcoKTtcbiAgICB9XG5cbiAgICAvLyBXZSBhcmUgY3VycmVudGx5ICgxMi8yNS8yMDEyKSBuZXZlciBlbmNvdW50ZXJpbmcgYW55IHByZW1hdHVyZWx5XG4gICAgLy8gbm9uLWV4dGVuc2libGUga2V5cy5cbiAgICB2YXIga2V5cyA9IFtdOyAvLyBicnV0ZSBmb3JjZSBmb3IgcHJlbWF0dXJlbHkgbm9uLWV4dGVuc2libGUga2V5cy5cbiAgICB2YXIgdmFsdWVzID0gW107IC8vIGJydXRlIGZvcmNlIGZvciBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICB2YXIgaWQgPSBuZXh0SWQrKztcblxuICAgIGZ1bmN0aW9uIGdldF9fXyhrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQgPyBoaWRkZW5SZWNvcmRbaWRdIDogb3B0X2RlZmF1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCA/IHZhbHVlc1tpbmRleF0gOiBvcHRfZGVmYXVsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNfX18oa2V5KSB7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga2V5cy5pbmRleE9mKGtleSkgPj0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRfX18oa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgdmFyIGhpZGRlblJlY29yZCA9IGdldEhpZGRlblJlY29yZChrZXkpO1xuICAgICAgaWYgKGhpZGRlblJlY29yZCkge1xuICAgICAgICBoaWRkZW5SZWNvcmRbaWRdID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTaW5jZSBzb21lIGJyb3dzZXJzIHByZWVtcHRpdmVseSB0ZXJtaW5hdGUgc2xvdyB0dXJucyBidXRcbiAgICAgICAgICAvLyB0aGVuIGNvbnRpbnVlIGNvbXB1dGluZyB3aXRoIHByZXN1bWFibHkgY29ycnVwdGVkIGhlYXBcbiAgICAgICAgICAvLyBzdGF0ZSwgd2UgaGVyZSBkZWZlbnNpdmVseSBnZXQga2V5cy5sZW5ndGggZmlyc3QgYW5kIHRoZW5cbiAgICAgICAgICAvLyB1c2UgaXQgdG8gdXBkYXRlIGJvdGggdGhlIHZhbHVlcyBhbmQga2V5cyBhcnJheXMsIGtlZXBpbmdcbiAgICAgICAgICAvLyB0aGVtIGluIHN5bmMuXG4gICAgICAgICAgaW5kZXggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLy8gSWYgd2UgY3Jhc2ggaGVyZSwgdmFsdWVzIHdpbGwgYmUgb25lIGxvbmdlciB0aGFuIGtleXMuXG4gICAgICAgICAga2V5c1tpbmRleF0gPSBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZV9fXyhrZXkpIHtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIHZhciBpbmRleCwgbGFzdEluZGV4O1xuICAgICAgaWYgKGhpZGRlblJlY29yZCkge1xuICAgICAgICByZXR1cm4gaWQgaW4gaGlkZGVuUmVjb3JkICYmIGRlbGV0ZSBoaWRkZW5SZWNvcmRbaWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBrZXlzLmluZGV4T2Yoa2V5KTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSBzb21lIGJyb3dzZXJzIHByZWVtcHRpdmVseSB0ZXJtaW5hdGUgc2xvdyB0dXJucyBidXRcbiAgICAgICAgLy8gdGhlbiBjb250aW51ZSBjb21wdXRpbmcgd2l0aCBwb3RlbnRpYWxseSBjb3JydXB0ZWQgaGVhcFxuICAgICAgICAvLyBzdGF0ZSwgd2UgaGVyZSBkZWZlbnNpdmVseSBnZXQga2V5cy5sZW5ndGggZmlyc3QgYW5kIHRoZW4gdXNlXG4gICAgICAgIC8vIGl0IHRvIHVwZGF0ZSBib3RoIHRoZSBrZXlzIGFuZCB0aGUgdmFsdWVzIGFycmF5LCBrZWVwaW5nXG4gICAgICAgIC8vIHRoZW0gaW4gc3luYy4gV2UgdXBkYXRlIHRoZSB0d28gd2l0aCBhbiBvcmRlciBvZiBhc3NpZ25tZW50cyxcbiAgICAgICAgLy8gc3VjaCB0aGF0IGFueSBwcmVmaXggb2YgdGhlc2UgYXNzaWdubWVudHMgd2lsbCBwcmVzZXJ2ZSB0aGVcbiAgICAgICAgLy8ga2V5L3ZhbHVlIGNvcnJlc3BvbmRlbmNlLCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSBkZWxldGUuXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIG5lZWRzIHRvIHdvcmsgY29ycmVjdGx5IHdoZW4gaW5kZXggPT09IGxhc3RJbmRleC5cbiAgICAgICAgbGFzdEluZGV4ID0ga2V5cy5sZW5ndGggLSAxO1xuICAgICAgICBrZXlzW2luZGV4XSA9IHZvaWQgMDtcbiAgICAgICAgLy8gSWYgd2UgY3Jhc2ggaGVyZSwgdGhlcmUncyBhIHZvaWQgMCBpbiB0aGUga2V5cyBhcnJheSwgYnV0XG4gICAgICAgIC8vIG5vIG9wZXJhdGlvbiB3aWxsIGNhdXNlIGEgXCJrZXlzLmluZGV4T2Yodm9pZCAwKVwiLCBzaW5jZVxuICAgICAgICAvLyBnZXRIaWRkZW5SZWNvcmQodm9pZCAwKSB3aWxsIGFsd2F5cyB0aHJvdyBhbiBlcnJvciBmaXJzdC5cbiAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlc1tsYXN0SW5kZXhdO1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB2YWx1ZXNbaW5kZXhdIGNhbm5vdCBiZSBmb3VuZCBoZXJlLFxuICAgICAgICAvLyBiZWNhdXNlIGtleXNbaW5kZXhdIGlzIHZvaWQgMC5cbiAgICAgICAga2V5c1tpbmRleF0gPSBrZXlzW2xhc3RJbmRleF07XG4gICAgICAgIC8vIElmIGluZGV4ID09PSBsYXN0SW5kZXggYW5kIHdlIGNyYXNoIGhlcmUsIHRoZW4ga2V5c1tpbmRleF1cbiAgICAgICAgLy8gaXMgc3RpbGwgdm9pZCAwLCBzaW5jZSB0aGUgYWxpYXNpbmcga2lsbGVkIHRoZSBwcmV2aW91cyBrZXkuXG4gICAgICAgIGtleXMubGVuZ3RoID0gbGFzdEluZGV4O1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCBrZXlzIHdpbGwgYmUgb25lIHNob3J0ZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgIHZhbHVlcy5sZW5ndGggPSBsYXN0SW5kZXg7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKE91cldlYWtNYXAucHJvdG90eXBlLCB7XG4gICAgICBnZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhnZXRfX18pIH0sXG4gICAgICBoYXNfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhoYXNfX18pIH0sXG4gICAgICBzZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhzZXRfX18pIH0sXG4gICAgICBkZWxldGVfX186IHsgdmFsdWU6IGNvbnN0RnVuYyhkZWxldGVfX18pIH1cbiAgICB9KTtcbiAgfTtcblxuICBPdXJXZWFrTWFwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICAgIGdldDoge1xuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm4gdGhlIHZhbHVlIG1vc3QgcmVjZW50bHkgYXNzb2NpYXRlZCB3aXRoIGtleSwgb3JcbiAgICAgICAqIG9wdF9kZWZhdWx0IGlmIG5vbmUuXG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQoa2V5LCBvcHRfZGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRfX18oa2V5LCBvcHRfZGVmYXVsdCk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgaGFzOiB7XG4gICAgICAvKipcbiAgICAgICAqIElzIHRoZXJlIGEgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGtleSBpbiB0aGlzIFdlYWtNYXA/XG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc19fXyhrZXkpO1xuICAgICAgfSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIHNldDoge1xuICAgICAgLyoqXG4gICAgICAgKiBBc3NvY2lhdGUgdmFsdWUgd2l0aCBrZXkgaW4gdGhpcyBXZWFrTWFwLCBvdmVyd3JpdGluZyBhbnlcbiAgICAgICAqIHByZXZpb3VzIGFzc29jaWF0aW9uIGlmIHByZXNlbnQuXG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRfX18oa2V5LCB2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgJ2RlbGV0ZSc6IHtcbiAgICAgIC8qKlxuICAgICAgICogUmVtb3ZlIGFueSBhc3NvY2lhdGlvbiBmb3Iga2V5IGluIHRoaXMgV2Vha01hcCwgcmV0dXJuaW5nXG4gICAgICAgKiB3aGV0aGVyIHRoZXJlIHdhcyBvbmUuXG4gICAgICAgKlxuICAgICAgICogPHA+Tm90ZSB0aGF0IHRoZSBib29sZWFuIHJldHVybiBoZXJlIGRvZXMgbm90IHdvcmsgbGlrZSB0aGVcbiAgICAgICAqIHtAY29kZSBkZWxldGV9IG9wZXJhdG9yLiBUaGUge0Bjb2RlIGRlbGV0ZX0gb3BlcmF0b3IgcmV0dXJuc1xuICAgICAgICogd2hldGhlciB0aGUgZGVsZXRpb24gc3VjY2VlZHMgYXQgYnJpbmdpbmcgYWJvdXQgYSBzdGF0ZSBpblxuICAgICAgICogd2hpY2ggdGhlIGRlbGV0ZWQgcHJvcGVydHkgaXMgYWJzZW50LiBUaGUge0Bjb2RlIGRlbGV0ZX1cbiAgICAgICAqIG9wZXJhdG9yIHRoZXJlZm9yZSByZXR1cm5zIHRydWUgaWYgdGhlIHByb3BlcnR5IHdhcyBhbHJlYWR5XG4gICAgICAgKiBhYnNlbnQsIHdoZXJlYXMgdGhpcyB7QGNvZGUgZGVsZXRlfSBtZXRob2QgcmV0dXJucyBmYWxzZSBpZlxuICAgICAgICogdGhlIGFzc29jaWF0aW9uIHdhcyBhbHJlYWR5IGFic2VudC5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlX19fKGtleSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh0eXBlb2YgSG9zdFdlYWtNYXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBJZiB3ZSBnb3QgaGVyZSwgdGhlbiB0aGUgcGxhdGZvcm0gaGFzIGEgV2Vha01hcCBidXQgd2UgYXJlIGNvbmNlcm5lZFxuICAgICAgLy8gdGhhdCBpdCBtYXkgcmVmdXNlIHRvIHN0b3JlIHNvbWUga2V5IHR5cGVzLiBUaGVyZWZvcmUsIG1ha2UgYSBtYXBcbiAgICAgIC8vIGltcGxlbWVudGF0aW9uIHdoaWNoIG1ha2VzIHVzZSBvZiBib3RoIGFzIHBvc3NpYmxlLlxuXG4gICAgICAvLyBJbiB0aGlzIG1vZGUgd2UgYXJlIGFsd2F5cyB1c2luZyBkb3VibGUgbWFwcywgc28gd2UgYXJlIG5vdCBwcm94eS1zYWZlLlxuICAgICAgLy8gVGhpcyBjb21iaW5hdGlvbiBkb2VzIG5vdCBvY2N1ciBpbiBhbnkga25vd24gYnJvd3NlciwgYnV0IHdlIGhhZCBiZXN0XG4gICAgICAvLyBiZSBzYWZlLlxuICAgICAgaWYgKGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgJiYgdHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBQcm94eSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gRG91YmxlV2Vha01hcCgpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE91cldlYWtNYXApKSB7ICAvLyBhcHByb3hpbWF0ZSB0ZXN0IGZvciBuZXcgLi4uKClcbiAgICAgICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJlZmVyYWJsZSwgdHJ1bHkgd2VhayBtYXAuXG4gICAgICAgIHZhciBobWFwID0gbmV3IEhvc3RXZWFrTWFwKCk7XG5cbiAgICAgICAgLy8gT3VyIGhpZGRlbi1wcm9wZXJ0eS1iYXNlZCBwc2V1ZG8td2Vhay1tYXAuIExhemlseSBpbml0aWFsaXplZCBpbiB0aGVcbiAgICAgICAgLy8gJ3NldCcgaW1wbGVtZW50YXRpb247IHRodXMgd2UgY2FuIGF2b2lkIHBlcmZvcm1pbmcgZXh0cmEgbG9va3VwcyBpZlxuICAgICAgICAvLyB3ZSBrbm93IGFsbCBlbnRyaWVzIGFjdHVhbGx5IHN0b3JlZCBhcmUgZW50ZXJlZCBpbiAnaG1hcCcuXG4gICAgICAgIHZhciBvbWFwID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIEhpZGRlbi1wcm9wZXJ0eSBtYXBzIGFyZSBub3QgY29tcGF0aWJsZSB3aXRoIHByb3hpZXMgYmVjYXVzZSBwcm94aWVzXG4gICAgICAgIC8vIGNhbiBvYnNlcnZlIHRoZSBoaWRkZW4gbmFtZSBhbmQgZWl0aGVyIGFjY2lkZW50YWxseSBleHBvc2UgaXQgb3IgZmFpbFxuICAgICAgICAvLyB0byBhbGxvdyB0aGUgaGlkZGVuIHByb3BlcnR5IHRvIGJlIHNldC4gVGhlcmVmb3JlLCB3ZSBkbyBub3QgYWxsb3dcbiAgICAgICAgLy8gYXJiaXRyYXJ5IFdlYWtNYXBzIHRvIHN3aXRjaCB0byB1c2luZyBoaWRkZW4gcHJvcGVydGllcywgYnV0IG9ubHlcbiAgICAgICAgLy8gdGhvc2Ugd2hpY2ggbmVlZCB0aGUgYWJpbGl0eSwgYW5kIHVucHJpdmlsZWdlZCBjb2RlIGlzIG5vdCBhbGxvd2VkXG4gICAgICAgIC8vIHRvIHNldCB0aGUgZmxhZy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gKEV4Y2VwdCBpbiBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlIG1vZGUgaW4gd2hpY2ggY2FzZSB3ZVxuICAgICAgICAvLyBkaXNhYmxlIHByb3hpZXMuKVxuICAgICAgICB2YXIgZW5hYmxlU3dpdGNoaW5nID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gZGdldChrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICAgICAgaWYgKG9tYXApIHtcbiAgICAgICAgICAgIHJldHVybiBobWFwLmhhcyhrZXkpID8gaG1hcC5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIDogb21hcC5nZXRfX18oa2V5LCBvcHRfZGVmYXVsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBobWFwLmdldChrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkaGFzKGtleSkge1xuICAgICAgICAgIHJldHVybiBobWFwLmhhcyhrZXkpIHx8IChvbWFwID8gb21hcC5oYXNfX18oa2V5KSA6IGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkc2V0O1xuICAgICAgICBpZiAoZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSkge1xuICAgICAgICAgIGRzZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaG1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICBpZiAoIW9tYXApIHsgb21hcCA9IG5ldyBPdXJXZWFrTWFwKCk7IH1cbiAgICAgICAgICAgICAgb21hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRzZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoZW5hYmxlU3dpdGNoaW5nKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9tYXApIHsgb21hcCA9IG5ldyBPdXJXZWFrTWFwKCk7IH1cbiAgICAgICAgICAgICAgICBvbWFwLnNldF9fXyhrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGRlbGV0ZShrZXkpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gISFobWFwWydkZWxldGUnXShrZXkpO1xuICAgICAgICAgIGlmIChvbWFwKSB7IHJldHVybiBvbWFwLmRlbGV0ZV9fXyhrZXkpIHx8IHJlc3VsdDsgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShPdXJXZWFrTWFwLnByb3RvdHlwZSwge1xuICAgICAgICAgIGdldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGRnZXQpIH0sXG4gICAgICAgICAgaGFzX19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoZGhhcykgfSxcbiAgICAgICAgICBzZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhkc2V0KSB9LFxuICAgICAgICAgIGRlbGV0ZV9fXzogeyB2YWx1ZTogY29uc3RGdW5jKGRkZWxldGUpIH0sXG4gICAgICAgICAgcGVybWl0SG9zdE9iamVjdHNfX186IHsgdmFsdWU6IGNvbnN0RnVuYyhmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuID09PSB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMpIHtcbiAgICAgICAgICAgICAgZW5hYmxlU3dpdGNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYm9ndXMgY2FsbCB0byBwZXJtaXRIb3N0T2JqZWN0c19fXycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIERvdWJsZVdlYWtNYXAucHJvdG90eXBlID0gT3VyV2Vha01hcC5wcm90b3R5cGU7XG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IERvdWJsZVdlYWtNYXA7XG5cbiAgICAgIC8vIGRlZmluZSAuY29uc3RydWN0b3IgdG8gaGlkZSBPdXJXZWFrTWFwIGN0b3JcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWFrTWFwLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywge1xuICAgICAgICB2YWx1ZTogV2Vha01hcCxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsICAvLyBhcyBkZWZhdWx0IC5jb25zdHJ1Y3RvciBpc1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoZXJlIGlzIG5vIGhvc3QgV2Vha01hcCwgc28gd2UgbXVzdCB1c2UgdGhlIGVtdWxhdGlvbi5cblxuICAgIC8vIEVtdWxhdGVkIFdlYWtNYXBzIGFyZSBpbmNvbXBhdGlibGUgd2l0aCBuYXRpdmUgcHJveGllcyAoYmVjYXVzZSBwcm94aWVzXG4gICAgLy8gY2FuIG9ic2VydmUgdGhlIGhpZGRlbiBuYW1lKSwgc28gd2UgbXVzdCBkaXNhYmxlIFByb3h5IHVzYWdlIChpblxuICAgIC8vIEFycmF5TGlrZSBhbmQgRG9tYWRvLCBjdXJyZW50bHkpLlxuICAgIGlmICh0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBQcm94eSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE91cldlYWtNYXA7XG4gIH1cbn0pKCk7XG4iLCIvKipcbiAqIEBtb2R1bGUgc2VhcmNoLm1vZGVsXG4gKi9cblxuaW1wb3J0IERpY3QgZnJvbSBcImNvbGxlY3Rpb25zL2RpY3RcIjtcblxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0LCBSZXN1bHRUeXBlIH0gZnJvbSBcIi4vU2VhcmNoUmVzdWx0XCI7XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSB0czogRGljdDxTZWFyY2hSZXN1bHQ+O1xuXG4gIGNvbnN0cnVjdG9yKHRzPzogU2VhcmNoUmVzdWx0W10pIHtcbiAgICB0aGlzLnRzID0gbmV3IERpY3Q8U2VhcmNoUmVzdWx0PigpO1xuXG4gICAgaWYgKHRzKSB0cy5mb3JFYWNoKHQgPT4gdGhpcy5hZGQodCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgcmVzdWx0IHRvIGNvbGxlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHQgcmVzdWx0IGVpdGhlciByYXcgcmVzdWx0IGZyb20gVVJMIEFQSXMgb3Igb2JqZWN0IHNlYXJjaCByZXN1bHRcbiAgICovXG4gIGFkZCh0OiBTZWFyY2hSZXN1bHQgfCBSZXN1bHRUeXBlKSB7XG4gICAgaWYgKHQgaW5zdGFuY2VvZiBTZWFyY2hSZXN1bHQpIHRoaXMudHMuc2V0KHQuaWQsIHQpO1xuICAgIGVsc2UgdGhpcy50cy5zZXQodC5pZCwgbmV3IFNlYXJjaFJlc3VsdCh0KSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHJlc3VsdCBieSBlbnRpdGllcyBJRFxuICAgKiBAcGFyYW0gaWQgZW50aXRpZXMgSURcbiAgICovXG4gIGdldChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy50cy5nZXQoaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiBvbmx5IGZpcnN0IG1hdGNoIHRvIHRoZSBmaWx0ZXIgZnVuY3Rpb24gb3IgdW5kZWZpbmVkLCBpZiBtYXRjaGVzIG5vdGhpbmdcbiAgICpcbiAgICogQHBhcmFtIGZuIGZpbHRlciBmdW5jdGlvblxuICAgKi9cbiAgb25seShmbjogKHY6IFNlYXJjaFJlc3VsdCkgPT4gYm9vbGVhbikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudHMuZmlsdGVyKGZuKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSByZXR1cm4gcmVzdWx0LnRvQXJyYXkoKVswXTtcbiAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogbGlzdCBhbGwgcmVzdWx0cyBhcyB7QGxpbmsgUmVzdWx0VHlwZX1cbiAgICpcbiAgICovXG4gIGxpc3RBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMudHMubWFwKHYgPT4gdi50b0pTT04oKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZpcnN0IGluZGV4IG9mIHRoZSBhcnJheVxuICAgKi9cbiAgZmlyc3QoKSB7XG4gICAgY29uc3QgYXJyID0gdGhpcy50cy50b0FycmF5KCk7XG4gICAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyWzBdIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsYXN0IGluZGV4IG9mIHRoZSBhcnJheVxuICAgKi9cbiAgbGFzdCgpIHtcbiAgICBjb25zdCBhcnIgPSB0aGlzLnRzLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnJbYXJyLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudHMubWFwKHYgPT4gdi50b1N0cmluZygpKS5qb2luKFwiXFxuXCIpO1xuICB9XG59XG4iLCIvKipcbiAqIEBtb2R1bGUgc2VhcmNoLm1vZGVsXG4gKi9cblxuaW1wb3J0IHsgV2lraWRhdGFMYW5ndWFnZSB9IGZyb20gXCJ3aWtpZGF0YS1zZGtcIjtcblxuLyoqXG4gKiB0aGUgb2JqZWN0IHRoYXQgdGVsbCB1cywgaG93IHRoZSByZXN1bHQgbWF0Y2hlcyB0byB0aGUgcXVlcnlcbiAqXG4gKiBAcGFyYW0gdHlwZSB0aGF0IG1hdGNoIHdpdGggYSBxdWVyeVxuICogQHBhcmFtIGxhbmd1YWdlIG9mIHRoZSBtYXRjaGVzIHRvIGEgcXVlcnlcbiAqIEBwYXJhbSB0ZXh0IHRleHQgb2YgdGhlIHF1ZXJ5XG4gKi9cbmV4cG9ydCB0eXBlIEVudGl0eU1hdGNoVHlwZSA9IHtcbiAgdHlwZTogc3RyaW5nO1xuICBsYW5ndWFnZTogV2lraWRhdGFMYW5ndWFnZTtcbiAgdGV4dDogc3RyaW5nO1xufTtcblxuLyoqXG4gKiB0aGUgcmV0dXJuIHJlc3VsdCBmcm9tIEFQSXMgcXVlcnkuXG4gKlxuICogQHBhcmFtIHJlcG9zaXRvcnlcbiAqIEBwYXJhbSBpZCB0aGUgZW50aXRpZXMgSUQgKHNob3VsZCBzdGFydCB3aXRoIFEgb3IgUCA/Pz8pXG4gKiBAcGFyYW0gY29uY2VwdHVyaSBpcyBhIGNvbmNlcHQgdXJsIG9mIHRoZSBlbnRpdGllcyAodXN1YWxseSB3aWxsIGJlIG9uIHRoaXMgZm9ybTogaHR0cDovL3d3dy53aWtpZGF0YS5vcmcvZW50aXR5LzxpZD4pXG4gKiBAcGFyYW0gdGl0bGUgaXMgYSB0aXRsZSBvZiB0aGUgaWQgKHVzdWFsbHkgd2lsbCBiZSB0aGUgc2FtZSBhcyBpZCA/Pz8pXG4gKiBAcGFyYW0gcGFnZWlkIGlzIGEgd2lraWRhdGEgcGFnZSBpZCAoPz8/KVxuICogQHBhcmFtIHVybCBpcyBhIHdpa2lkYXRhIHVybCAoc2hvdWxkIGJlIGluZm9ybSBvZiAnaHR0cDovL3d3dy53aWtpZGF0YS5vcmcvd2lraS88aWQ+JylcbiAqIEBwYXJhbSBsYWJlbCBpcyBhIGxhYmVsIHRoYXQgd2lsbCBzaG93IGFzIGEgdGl0bGUgaW4gd2Vic2l0ZSAoc2hvdWxkIGJlIGh1bWFuIHJlYWRhYmxlIHN0cmluZyB0ZXh0KVxuICogQHBhcmFtIGRlc2NyaXB0aW9uIGlzIGEgZGVzY3JpcHRpb24gb2YgdGhpcyBsYWJlbCAobWlnaHQgbm90IGV4aXN0IGluIHNvbWUgb2YgbGFuZ3VhZ2UgYW5kIGVudGl0aWVzKVxuICogQHBhcmFtIG1hdGNoIGlzIHRoZSBvYmplY3Qgc2hvdyBob3cgdGhpcyBlbnRpdGllcyBpcyBtYXRjaCBhIHF1ZXJ5XG4gKiBAcGFyYW0gYWxpYXNlcyBpcyBhIGFsaWFzIGtleSBvZiB0aGUgZW50aXR5XG4gKi9cbmV4cG9ydCB0eXBlIFJlc3VsdFR5cGUgPSB7XG4gIHJlcG9zaXRvcnk6IHN0cmluZztcbiAgaWQ6IHN0cmluZztcbiAgY29uY2VwdHVyaTogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBwYWdlaWQ6IG51bWJlcjtcbiAgdXJsOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBtYXRjaD86IEVudGl0eU1hdGNoVHlwZTtcbiAgYWxpYXNlcz86IHN0cmluZ1tdO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59O1xuXG4vKipcbiAqIFNlYXJjaCByZXN1bHQgdHlwZSBpcyB0aGUgcmVzdWx0IHR5cGUgdGhhdCB5b3Ugd2lsbCByZWNlaXZlIGFmdGVyIGZldGNoaW5nIHRoZSBSRVNUIEFQSVxuICpcbiAqIEBwYXJhbSBzZWFyY2hpbmZvIGlzIGEgb2JqZWN0IGNvbnRhaW4gc2VhcmNoaW5nIHF1ZXJ5XG4gKiBAcGFyYW0gc2VhcmNoaW5mby5zZWFyY2ggaXMgYSBzZWFyY2ggcXVlcnlcbiAqIEBwYXJhbSBzZWFyY2ggaXMgYSBhcnJheSBvZiBlbnRpdGllcyByZXN1bHRcbiAqL1xuZXhwb3J0IHR5cGUgU2VhcmNoUmVzdWx0VHlwZSA9IHtcbiAgc2VhcmNoaW5mbzoge1xuICAgIHNlYXJjaDogc3RyaW5nO1xuICB9O1xuICBzZWFyY2g6IFJlc3VsdFR5cGVbXTtcbn07XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHQge1xuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuICAvKipcbiAgICogdGhlIGVudGl0aWVzIElEIChzaG91bGQgc3RhcnQgd2l0aCBRIG9yIFAgPz8/KVxuICAgKi9cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIHByaXZhdGUgX3RpdGxlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiB0aXRsZSBvZiB0aGUgaWQgKHVzdWFsbHkgd2lsbCBiZSB0aGUgc2FtZSBhcyBpZCA/Pz8pXG4gICAqL1xuICBnZXQgdGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGFiZWw6IHN0cmluZztcbiAgLyoqXG4gICAqIExhYmVsIGlzIGEgc3RyaW5nIHRoYXQgd2lsbCBzaG93IGFzIGEgdGl0bGUgaW4gd2Vic2l0ZSAoc2hvdWxkIGJlIGh1bWFuIHJlYWRhYmxlIHN0cmluZyB0ZXh0KVxuICAgKi9cbiAgZ2V0IGxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNjcmlwdGlvbiBpcyBhIGV4cGxhaW5hdGlvbiBvZiBhIGxhYmVsIChtaWdodCBub3QgZXhpc3QgaW4gc29tZSBvZiBsYW5ndWFnZSBhbmQgZW50aXRpZXMpXG4gICAqL1xuICBnZXQgZGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mb3JtYXRpb24uZGVzY3JpcHRpb24gfHwgXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25jZXB0IFVSSSBpcyBhIHVybCBvZiB0aGUgZW50aXRpZXMgKHVzdWFsbHkgd2lsbCBiZSBvbiB0aGlzIGZvcm06IGh0dHA6Ly93d3cud2lraWRhdGEub3JnL2VudGl0eS88aWQ+KVxuICAgKi9cbiAgZ2V0IGNvbmNlcHR1cmkoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mb3JtYXRpb24uY29uY2VwdHVyaTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVUkwgaXMgYSB3aWtpZGF0YSB1cmwgKHNob3VsZCBiZSBpbmZvcm0gb2YgJ2h0dHA6Ly93d3cud2lraWRhdGEub3JnL3dpa2kvPGlkPicpXG4gICAqL1xuICBnZXQgdXJsKCkge1xuICAgIHJldHVybiBgaHR0cHM6JHt0aGlzLmluZm9ybWF0aW9uLnVybH1gO1xuICB9XG5cbiAgZ2V0IHBhZ2VpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvcm1hdGlvbi5wYWdlaWQ7XG4gIH1cblxuICAvKipcbiAgICogTWF0Y2ggb2JqZWN0IHdpbGwgc2hvdyBob3cgdGhpcyBlbnRpdGllcyBpcyBtYXRjaCBhIHF1ZXJ5XG4gICAqL1xuICBnZXQgbWF0Y2goKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mb3JtYXRpb24ubWF0Y2g7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXNlcyBvZiB0aGUgZW50aXRpZXNcbiAgICovXG4gIGdldCBhbGlhc2VzKCkge1xuICAgIHJldHVybiB0aGlzLmluZm9ybWF0aW9uLmFsaWFzZXMgfHwgW107XG4gIH1cblxuICBwcml2YXRlIGluZm9ybWF0aW9uOiBSZXN1bHRUeXBlO1xuXG4gIGNvbnN0cnVjdG9yKHF1ZXJ5UmVzdWx0OiBSZXN1bHRUeXBlKSB7XG4gICAgdGhpcy5faWQgPSBxdWVyeVJlc3VsdC5pZDtcbiAgICB0aGlzLl90aXRsZSA9IHF1ZXJ5UmVzdWx0LnRpdGxlO1xuXG4gICAgdGhpcy5fbGFiZWwgPSBxdWVyeVJlc3VsdC5sYWJlbDtcblxuICAgIHRoaXMuaW5mb3JtYXRpb24gPSBxdWVyeVJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgbW9yZSBpbmZvcm1hdGlvbiB0aGF0IE1JR0hUIHJlY2VpdmUgZnJvbSBBUElzXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgaW5mb3JtYXRpb24ga2V5XG4gICAqIEByZXR1cm4gRGVwZW5kIHdoYXQgeW91IHBhc3MgaW4gaW5wdXQuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9yZUluZm9ybWF0aW9uKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mb3JtYXRpb25ba2V5XTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5faWR9OiAke3RoaXMuX2xhYmVsfSAoJHt0aGlzLmluZm9ybWF0aW9uLmRlc2NyaXB0aW9ufSlgO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvcm1hdGlvbjtcbiAgfVxufVxuIiwiLyoqXG4gKiBAbW9kdWxlIHNlYXJjaC5hcGlcbiAqL1xuXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSBcImF4aW9zXCI7XG5cbmltcG9ydCB7IFdpa2lkYXRhTGFuZ3VhZ2UsIHNlYXJjaEVudGl0aWVzIH0gZnJvbSBcIndpa2lkYXRhLXNka1wiO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0VHlwZSB9IGZyb20gXCIuL1NlYXJjaFJlc3VsdFwiO1xuaW1wb3J0IHsgU2VhcmNoQ29sbGVjdGlvbiB9IGZyb20gXCIuL1NlYXJjaENvbGxlY3Rpb25cIjtcblxuLyoqXG4gKiBAcGFyYW0gb3B0aW9ucyBzZWFyY2hpbmcgb3B0aW9uc1xuICogQHBhcmFtIG9wdGlvbnMuc2VhcmNoIHNlYXJjaGluZyBzdHJpbmdcbiAqIEBwYXJhbSBvcHRpb25zLmxhbmd1YWdlIHRoZSBsYW5ndWFnZSBvZiBzZWFyY2ggcXVlcnkgKGRlZmF1bHQ9ZW4pXG4gKiBAcGFyYW0gb3B0aW9ucy5saW1pdCBsaW1pdCByZXN1bHQgKGRlZmF1bHQ9MjApXG4gKiBAcGFyYW0gb3B0aW9ucy51c2VsYW5nIHRoZSBsYW5ndWFnZSBpbiB3aGljaCB0aGUgc2VhcmNoIHJlc3VsdHMgYXJlIHJldHVybmVkXG4gKiBAcGFyYW0gb3B0aW9ucy5jb25maWcgYXhpb3MgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IHR5cGUgU2VhcmNoT3B0aW9uID0ge1xuICBzZWFyY2g6IHN0cmluZztcbiAgbGFuZ3VhZ2U/OiBXaWtpZGF0YUxhbmd1YWdlO1xuICBsaW1pdD86IHN0cmluZyB8IG51bWJlcjtcbiAgdXNlbGFuZz86IFdpa2lkYXRhTGFuZ3VhZ2U7XG4gIGNvbmZpZz86IEF4aW9zUmVxdWVzdENvbmZpZztcbn07XG5cbi8qKlxuICogVGhpcyBtZXRob2Qgd2lsbCBmZXRjaGluZyBlbnRpdGllcyBiYXNlIG9uIGlucHV0IHNlYXJjaGluZyBzdHJpbmdcbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBzZWFyY2hpbmcgb3B0aW9uc1xuICogQHBhcmFtIG9wdGlvbnMuc2VhcmNoIHNlYXJjaGluZyBzdHJpbmdcbiAqIEBwYXJhbSBvcHRpb25zLmxhbmd1YWdlIHRoZSBsYW5ndWFnZSBvZiBzZWFyY2ggcXVlcnkgKGRlZmF1bHQ9ZW4pXG4gKiBAcGFyYW0gb3B0aW9ucy5saW1pdCBsaW1pdCByZXN1bHQgKGRlZmF1bHQ9MjApXG4gKiBAcGFyYW0gb3B0aW9ucy51c2VsYW5nIHRoZSBsYW5ndWFnZSBpbiB3aGljaCB0aGUgc2VhcmNoIHJlc3VsdHMgYXJlIHJldHVybmVkXG4gKiBAcGFyYW0gb3B0aW9ucy5jb25maWcgYXhpb3MgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqXG4gKiBAcmV0dXJuIFRoaXMgcmVzdWx0IHdpbGwgYmUge0BsaW5rIFNlYXJjaENvbGxlY3Rpb259IG9iamVjdFxuICpcbiAqIEBzZWUgaHR0cHM6Ly93d3cud2lraWRhdGEub3JnL3cvYXBpLnBocD9hY3Rpb249aGVscCZtb2R1bGVzPXdic2VhcmNoZW50aXRpZXNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFNlYXJjaEVudGl0aWVzKG9wdGlvbnM6IFNlYXJjaE9wdGlvbikge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcy5nZXQ8U2VhcmNoUmVzdWx0VHlwZT4oc2VhcmNoRW50aXRpZXMob3B0aW9ucyksIG9wdGlvbnMuY29uZmlnKTtcbiAgLy8gY29uc29sZS5sb2cocmVzdWx0LmRhdGEuc2VhcmNoKTtcblxuICBjb25zdCBjb2xsZWN0aW9uID0gbmV3IFNlYXJjaENvbGxlY3Rpb24oKTtcbiAgcmVzdWx0LmRhdGEuc2VhcmNoLmZvckVhY2goc2VhcmNoID0+IGNvbGxlY3Rpb24uYWRkKHNlYXJjaCkpO1xuICByZXR1cm4gY29sbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyB7QGxpbmsgU2VhcmNoRW50aXRpZXN9IHdpdGggZ2V0IG9ubHkgZmlyc3QgcmVzdWx0XG4gKlxuICogQHBhcmFtIG9wdGlvbnMgc2VhcmNoaW5nIG9wdGlvbnNcbiAqIEBwYXJhbSBvcHRpb25zLnNlYXJjaCBzZWFyY2hpbmcgc3RyaW5nXG4gKiBAcGFyYW0gb3B0aW9ucy5sYW5ndWFnZSB0aGUgbGFuZ3VhZ2Ugb2Ygc2VhcmNoIHF1ZXJ5IChkZWZhdWx0PWVuKVxuICogQHBhcmFtIG9wdGlvbnMubGltaXQgVGhpcyBvcHRpb24gd2lsbCBiZSBvdmVycmlkZWQgYnkgMVxuICogQHBhcmFtIG9wdGlvbnMudXNlbGFuZyB0aGUgbGFuZ3VhZ2UgaW4gd2hpY2ggdGhlIHNlYXJjaCByZXN1bHRzIGFyZSByZXR1cm5lZFxuICogQHBhcmFtIG9wdGlvbnMuY29uZmlnIGF4aW9zIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKlxuICogQHJldHVybiBUaGlzIHJlc3VsdCB3aWxsIGJlIHtAbGluayBTZWFyY2hSZXN1bHR9IG9iamVjdCBvciB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFNlYXJjaEVudGl0eShvcHRpb25zOiBTZWFyY2hPcHRpb24pIHtcbiAgb3B0aW9ucy5saW1pdCA9IDE7IC8vIG92ZXJyaWRlIGxpbWl0IHNlYXJjaFxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBTZWFyY2hFbnRpdGllcyhvcHRpb25zKTtcbiAgcmV0dXJuIHJlc3VsdC5maXJzdCgpO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgTG93IGxldmVsIEFQSXMgZm9yIG1ha2luZyBlYWNoIG9mIHdpa2lkYXRhIGFwaSByYXcgd2l0aG91dCBhbnkgbWFwcGluZyB0byBqYXZhc2NyaXB0IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIExvd0xldmVsU2VhcmNoQVBJcyB7XG4gIC8qKlxuICAgKiBnZXQgc2VhcmNoaW5nIEFQSXMgbGlua1xuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBzZWFyY2hpbmcgb3B0aW9uc1xuICAgKiBAcGFyYW0gb3B0aW9ucy5zZWFyY2ggc2VhcmNoaW5nIHN0cmluZ1xuICAgKiBAcGFyYW0gb3B0aW9ucy5sYW5ndWFnZSB0aGUgbGFuZ3VhZ2Ugb2Ygc2VhcmNoIHF1ZXJ5IChkZWZhdWx0PWVuKVxuICAgKiBAcGFyYW0gb3B0aW9ucy5saW1pdCByZXNwb25zZSByZXN1bHQgbGltaXQgbGVuZ3RoXG4gICAqIEBwYXJhbSBvcHRpb25zLnVzZWxhbmcgdGhlIGxhbmd1YWdlIGluIHdoaWNoIHRoZSBzZWFyY2ggcmVzdWx0cyBhcmUgcmV0dXJuZWRcbiAgICogQHBhcmFtIG9wdGlvbnMuY29uZmlnIHRoaXMgb3B0aW9ucyB3aWxsIGJlIGlnbm9yZVxuICAgKlxuICAgKiBAcmV0dXJuIHJldHVybiBSRVNUX0FQSSBsaW5rIGZvciBzZWFyY2hpbmdcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgR2V0TGluayhvcHRpb25zOiBTZWFyY2hPcHRpb24pIHtcbiAgICByZXR1cm4gc2VhcmNoRW50aXRpZXMob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIHNlYXJjaCB0aGUgaW5wdXQgc3RyaW5nIGluIHdpa2lkYXRhIHVzaW5nIHdic2VhcmNoZW50aXRpZXMgQVBJc1xuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBzZWFyY2hpbmcgb3B0aW9uc1xuICAgKiBAcGFyYW0gb3B0aW9ucy5zZWFyY2ggc2VhcmNoaW5nIHN0cmluZ1xuICAgKiBAcGFyYW0gb3B0aW9ucy5sYW5ndWFnZSB0aGUgbGFuZ3VhZ2Ugb2Ygc2VhcmNoIHF1ZXJ5IChkZWZhdWx0PWVuKVxuICAgKiBAcGFyYW0gb3B0aW9ucy5saW1pdCByZXNwb25zZSByZXN1bHQgbGltaXQgbGVuZ3RoXG4gICAqIEBwYXJhbSBvcHRpb25zLnVzZWxhbmcgdGhlIGxhbmd1YWdlIGluIHdoaWNoIHRoZSBzZWFyY2ggcmVzdWx0cyBhcmUgcmV0dXJuZWRcbiAgICogQHBhcmFtIG9wdGlvbnMuY29uZmlnIGF4aW9zIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cud2lraWRhdGEub3JnL3cvYXBpLnBocD9hY3Rpb249aGVscCZtb2R1bGVzPXdic2VhcmNoZW50aXRpZXNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0RW50aXRpZXMob3B0aW9uczogU2VhcmNoT3B0aW9uKSB7XG4gICAgcmV0dXJuIGF3YWl0IGF4aW9zLmdldDxTZWFyY2hSZXN1bHRUeXBlPihzZWFyY2hFbnRpdGllcyhvcHRpb25zKSwgb3B0aW9ucy5jb25maWcpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aWtpZGF0YS1zZGtcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==