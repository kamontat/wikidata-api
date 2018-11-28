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
const get_1 = __webpack_require__(/*! ./src/get */ "./src/get/index.ts");
search_1.SearchEntity({
    search: "Bern",
    language: "th"
})
    .then(result => {
    return get_1.GetEntity({ id: result.id });
})
    .then(result => {
    console.log(result.data.entities["Q70"]);
});


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

/***/ "./src/get/index.ts":
/*!**************************!*\
  !*** ./src/get/index.ts ***!
  \**************************/
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
const wikidata_sdk_1 = __webpack_require__(/*! wikidata-sdk */ "wikidata-sdk");
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
function GetEntity(from, setting, config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!from.id && !from.title)
            throw new Error("You must add either id or title");
        let url = "";
        if (from.id)
            url = wikidata_sdk_1.getEntities({
                ids: from.id,
                languages: setting && setting.languages,
                props: setting && setting.props
            });
        else if (from.title)
            url = wikidata_sdk_1.getWikidataIdsFromWikipediaTitles({
                titles: from.title,
                languages: setting && setting.languages,
                props: setting && setting.props,
                sites: setting && setting.sitelink
            });
        return axios_1.default.get(url, config);
    });
}
exports.GetEntity = GetEntity;


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
        const first = result.first();
        if (!first)
            throw new Error(`Cannot search data with ${options}`);
        return first;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbGxlY3Rpb25zL2NvcHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbGxlY3Rpb25zL2RpY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbGxlY3Rpb25zL2dlbmVyaWMtY29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29sbGVjdGlvbnMvZ2VuZXJpYy1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbGxlY3Rpb25zL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9taW5pLW1hcC9taW5pLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLWNsb25lL3BvcC1jbG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLWNvbXBhcmUvcG9wLWNvbXBhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BvcC1lcXVhbHMvcG9wLWVxdWFscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLW9ic2VydmUvb2JzZXJ2YWJsZS1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLW9ic2VydmUvb2JzZXJ2YWJsZS1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BvcC1vYnNlcnZlL29ic2VydmFibGUtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3Atb2JzZXJ2ZS9vYnNlcnZhYmxlLXJhbmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3Atc3dhcC9zd2FwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb3AtemlwL3BvcC11bnppcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcG9wLXppcC91bnppcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vhay1tYXAvd2Vhay1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dldC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VhcmNoL1NlYXJjaENvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlYXJjaC9TZWFyY2hSZXN1bHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlYXJjaC9pbmRleC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpa2lkYXRhLXNka1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxrRkFBZ0U7QUFHaEUseUVBQXNDO0FBRXRDLHFCQUFZLENBQUM7SUFDWCxNQUFNLEVBQUUsTUFBTTtJQUNkLFFBQVEsRUFBRSxJ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OztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUN6UTNCOztBQUViLG9CQUFvQixtQkFBTyxDQUFDLGdGQUE0QjtBQUN4RCx1QkFBdUIsbUJBQU8sQ0FBQyxzRkFBK0I7QUFDOUQsZUFBZSxtQkFBTyxDQUFDLDBEQUFZO0FBQ25DLHFCQUFxQixtQkFBTyxDQUFDLDJEQUFZO0FBQ3pDLHNCQUFzQixtQkFBTyxDQUFDLDhEQUFhO0FBQzNDLFdBQVcsbUJBQU8sQ0FBQyxrREFBUTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUN0TjNCOztBQUViOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyxxREFBVTtBQUNoQyx3QkFBd0IsbUJBQU8sQ0FBQyw4RUFBc0I7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNyWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVMsbUJBQU8sQ0FBQywwRUFBb0I7Ozs7Ozs7Ozs7Ozs7QUNoUXJDO0FBQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsU0FBUyxtQkFBTyxDQUFDLDBFQUFvQjs7Ozs7Ozs7Ozs7OztBQ2xrQnJDO0FBQ2E7O0FBRWI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQ0FBa0M7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsbUJBQU8sQ0FBQywwRUFBb0I7Ozs7Ozs7Ozs7Ozs7QUN6UXhCOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsOEJBQThCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsMEJBQTBCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLGdEQUFTOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbENhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSw2QkFBNkIsY0FBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVMsY0FBYztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUMseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxrQkFBa0IsV0FBVztBQUM3QixpQkFBaUIsZ0JBQWdCLFVBQVU7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGNBQWM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGtCQUFrQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxxQkFBcUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtB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QUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FBQTtBQVBELHdDQU9DO0FBY0QsU0FBc0IsWUFBWSxDQUFDLE9BQXFCOztRQUN0RCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNsQixNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUs7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUFBO0FBTkQsb0NBTUM7QUFLRCxNQUFhLGtCQUFrQjtJQWF0QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQXFCO1FBQ3pDLE9BQU8sNkJBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBY00sTUFBTSxDQUFPLFdBQVcsQ0FBQyxPQUFxQjs7WUFDbkQsT0FBTyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQXNCLDZCQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7S0FBQTtDQUNGO0FBaENELGdEQWdDQzs7Ozs7Ozs7Ozs7O0FDbEhELGtDOzs7Ozs7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6Indpa2lkYXRhLWFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBTZWFyY2hFbnRpdHksIExvd0xldmVsU2VhcmNoQVBJcyB9IGZyb20gXCIuL3NyYy9zZWFyY2hcIjtcbmltcG9ydCB7IGdldFdpa2lkYXRhSWRzRnJvbVdpa2lwZWRpYVRpdGxlcyB9IGZyb20gXCJ3aWtpZGF0YS1zZGtcIjtcbmltcG9ydCBBeGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEdldEVudGl0eSB9IGZyb20gXCIuL3NyYy9nZXRcIjtcblxuU2VhcmNoRW50aXR5KHtcbiAgc2VhcmNoOiBcIkJlcm5cIixcbiAgbGFuZ3VhZ2U6IFwidGhcIlxufSlcbiAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICByZXR1cm4gR2V0RW50aXR5KHsgaWQ6IHJlc3VsdC5pZCB9KTtcbiAgfSlcbiAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQuZGF0YSwgdW5kZWZpbmVkLCBcIiAgXCIpKTtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YS5lbnRpdGllc1tcIlE3MFwiXSk7XG4gIH0pO1xuXG4vLyBjb25zdCB1cmwgPSBMb3dMZXZlbFNlYXJjaEFQSXMuR2V0TGluayh7XG4vLyAgIHNlYXJjaDogXCJIZWxsb1wiLFxuLy8gICBsYW5ndWFnZTogXCJ0aFwiXG4vLyB9KTtcblxuLy8gQXhpb3MuZ2V0KFxuLy8gICBnZXRXaWtpZGF0YUlkc0Zyb21XaWtpcGVkaWFUaXRsZXMoe1xuLy8gICAgIHRpdGxlczogXCJiZXJcIlxuLy8gICB9KVxuLy8gKS50aGVuKHJlc3VsdCA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbi8vIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gY29weTtcbmZ1bmN0aW9uIGNvcHkodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIG5hbWUpKSB7XG4gICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBzb3VyY2VbbmFtZV07XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEdlbmVyaWNDb2xsZWN0aW9uID0gcmVxdWlyZShcIi4vZ2VuZXJpYy1jb2xsZWN0aW9uXCIpO1xudmFyIEdlbmVyaWNNYXAgPSByZXF1aXJlKFwiLi9nZW5lcmljLW1hcFwiKTtcbnZhciBPYnNlcnZhYmxlT2JqZWN0ID0gcmVxdWlyZShcInBvcC1vYnNlcnZlL29ic2VydmFibGUtb2JqZWN0XCIpO1xudmFyIEl0ZXJhdG9yID0gcmVxdWlyZShcIi4vaXRlcmF0b3JcIik7XG52YXIgY29weSA9IHJlcXVpcmUoXCIuL2NvcHlcIik7XG5cbi8vIEJ1cmdsZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZG9tZW5pYy9kaWN0XG5cbm1vZHVsZS5leHBvcnRzID0gRGljdDtcbmZ1bmN0aW9uIERpY3QodmFsdWVzLCBnZXREZWZhdWx0KSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIERpY3QpKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGljdCh2YWx1ZXMsIGdldERlZmF1bHQpO1xuICAgIH1cbiAgICBnZXREZWZhdWx0ID0gZ2V0RGVmYXVsdCB8fCB0aGlzLmdldERlZmF1bHQ7XG4gICAgdGhpcy5nZXREZWZhdWx0ID0gZ2V0RGVmYXVsdDtcbiAgICB0aGlzLnN0b3JlID0ge307XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIHRoaXMuYWRkRWFjaCh2YWx1ZXMpO1xufVxuXG5EaWN0LkRpY3QgPSBEaWN0OyAvLyBoYWNrIGZvciBNb250YWdlSlNcblxuZnVuY3Rpb24gbWFuZ2xlKGtleSkge1xuICAgIHJldHVybiBcIiRcIiArIGtleTtcbn1cblxuZnVuY3Rpb24gdW5tYW5nbGUobWFuZ2xlZCkge1xuICAgIHJldHVybiBtYW5nbGVkLnNsaWNlKDEpO1xufVxuXG5jb3B5KERpY3QucHJvdG90eXBlLCBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUpO1xuY29weShEaWN0LnByb3RvdHlwZSwgR2VuZXJpY01hcC5wcm90b3R5cGUpO1xuY29weShEaWN0LnByb3RvdHlwZSwgT2JzZXJ2YWJsZU9iamVjdC5wcm90b3R5cGUpO1xuXG5EaWN0LnByb3RvdHlwZS5pc0RpY3QgPSB0cnVlO1xuXG5EaWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RDbG9uZSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodmFsdWVzLCB0aGlzLm1hbmdsZSwgdGhpcy5nZXREZWZhdWx0KTtcbn07XG5cbkRpY3QucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBtYW5nbGVkID0gbWFuZ2xlKGtleSk7XG4gICAgaWYgKG1hbmdsZWQgaW4gdGhpcy5zdG9yZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVttYW5nbGVkXTtcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdChrZXkpO1xuICAgIH1cbn07XG5cbkRpY3QucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIG1hbmdsZWQgPSBtYW5nbGUoa2V5KTtcbiAgICB2YXIgZnJvbTtcbiAgICBpZiAobWFuZ2xlZCBpbiB0aGlzLnN0b3JlKSB7IC8vIHVwZGF0ZVxuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgZnJvbSA9IHRoaXMuc3RvcmVbbWFuZ2xlZF07XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwV2lsbENoYW5nZShcInVwZGF0ZVwiLCBrZXksIHZhbHVlLCBmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JlW21hbmdsZWRdID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwQ2hhbmdlKFwidXBkYXRlXCIsIGtleSwgdmFsdWUsIGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgeyAvLyBjcmVhdGVcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKFwiY3JlYXRlXCIsIGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgICAgIHRoaXMuc3RvcmVbbWFuZ2xlZF0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBDaGFuZ2UoXCJjcmVhdGVcIiwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufTtcblxuRGljdC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBtYW5nbGVkID0gbWFuZ2xlKGtleSk7XG4gICAgcmV0dXJuIG1hbmdsZWQgaW4gdGhpcy5zdG9yZTtcbn07XG5cbkRpY3QucHJvdG90eXBlW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBtYW5nbGVkID0gbWFuZ2xlKGtleSk7XG4gICAgdmFyIGZyb207XG4gICAgaWYgKG1hbmdsZWQgaW4gdGhpcy5zdG9yZSkge1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgZnJvbSA9IHRoaXMuc3RvcmVbbWFuZ2xlZF07XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwV2lsbENoYW5nZShcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHRoaXMuc3RvcmVbbWFuZ2xlKGtleSldO1xuICAgICAgICB0aGlzLmxlbmd0aC0tO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcENoYW5nZShcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbkRpY3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBrZXksIG1hbmdsZWQsIGZyb207XG4gICAgZm9yIChtYW5nbGVkIGluIHRoaXMuc3RvcmUpIHtcbiAgICAgICAga2V5ID0gdW5tYW5nbGUobWFuZ2xlZCk7XG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICBmcm9tID0gdGhpcy5zdG9yZVttYW5nbGVkXTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKFwiZGVsZXRlXCIsIGtleSwgdm9pZCAwLCBmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5zdG9yZVttYW5nbGVkXTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBDaGFuZ2UoXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIGZyb20pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMubGVuZ3RoID0gMDtcbn07XG5cbkRpY3QucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYmFzaXMsIHRoaXNwKSB7XG4gICAgZm9yICh2YXIgbWFuZ2xlZCBpbiB0aGlzLnN0b3JlKSB7XG4gICAgICAgIGJhc2lzID0gY2FsbGJhY2suY2FsbCh0aGlzcCwgYmFzaXMsIHRoaXMuc3RvcmVbbWFuZ2xlZF0sIHVubWFuZ2xlKG1hbmdsZWQpLCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIGJhc2lzO1xufTtcblxuRGljdC5wcm90b3R5cGUucmVkdWNlUmlnaHQgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGJhc2lzLCB0aGlzcCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgc3RvcmUgPSB0aGlzLnN0b3JlO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnN0b3JlKS5yZWR1Y2VSaWdodChmdW5jdGlvbiAoYmFzaXMsIG1hbmdsZWQpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc3AsIGJhc2lzLCBzdG9yZVttYW5nbGVkXSwgdW5tYW5nbGUobWFuZ2xlZCksIHNlbGYpO1xuICAgIH0sIGJhc2lzKTtcbn07XG5cbkRpY3QucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIga2V5O1xuICAgIGZvciAoa2V5IGluIHRoaXMuc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVba2V5XTtcbiAgICB9XG59O1xuXG5EaWN0LnByb3RvdHlwZS5pdGVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5JdGVyYXRvcihuZXcgSXRlcmF0b3IodGhpcy5zdG9yZSkpO1xufTtcblxuRGljdC5wcm90b3R5cGUuSXRlcmF0b3IgPSBEaWN0SXRlcmF0b3I7XG5cbmZ1bmN0aW9uIERpY3RJdGVyYXRvcihzdG9yZUl0ZXJhdG9yKSB7XG4gICAgdGhpcy5zdG9yZUl0ZXJhdG9yID0gc3RvcmVJdGVyYXRvcjtcbn1cblxuRGljdEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVyYXRpb24gPSB0aGlzLnN0b3JlSXRlcmF0b3IubmV4dCgpO1xuICAgIGlmIChpdGVyYXRpb24uZG9uZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgSXRlcmF0b3IuSXRlcmF0aW9uKFxuICAgICAgICAgICAgaXRlcmF0aW9uLnZhbHVlLFxuICAgICAgICAgICAgdW5tYW5nbGUoaXRlcmF0aW9uLmluZGV4KVxuICAgICAgICApO1xuICAgIH1cbn07XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZXF1YWxzT3BlcmF0b3IgPSByZXF1aXJlKFwicG9wLWVxdWFsc1wiKTtcbnZhciBjb21wYXJlT3BlcmF0b3IgPSByZXF1aXJlKFwicG9wLWNvbXBhcmVcIik7XG52YXIgY2xvbmVPcGVyYXRvciA9IHJlcXVpcmUoXCJwb3AtY2xvbmVcIik7XG52YXIgdW56aXBPcGVyYXRvciA9IHJlcXVpcmUoXCJwb3AtemlwL3BvcC11bnppcFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHZW5lcmljQ29sbGVjdGlvbjtcbmZ1bmN0aW9uIEdlbmVyaWNDb2xsZWN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNvbnN0cnVjdC4gR2VuZXJpY0NvbGxlY3Rpb24gaXMgYSBtaXhpbi5cIik7XG59XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGRFYWNoID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIGlmICh2YWx1ZXMgJiYgT2JqZWN0KHZhbHVlcykgPT09IHZhbHVlcykge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlcy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKHRoaXMuYWRkLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVzLmxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgLy8gQXJyYXktbGlrZSBvYmplY3RzIHRoYXQgZG8gbm90IGltcGxlbWVudCBmb3JFYWNoLCBlcmdvLFxuICAgICAgICAgICAgLy8gQXJndW1lbnRzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKHZhbHVlc1tpXSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKHZhbHVlc1trZXldLCBrZXkpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBUaGlzIGlzIHN1ZmZpY2llbnRseSBnZW5lcmljIGZvciBNYXAgKHNpbmNlIHRoZSB2YWx1ZSBtYXkgYmUgYSBrZXkpXG4vLyBhbmQgb3JkZXJlZCBjb2xsZWN0aW9ucyAoc2luY2UgaXQgZm9yd2FyZHMgdGhlIGVxdWFscyBhcmd1bWVudClcbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5kZWxldGVFYWNoID0gZnVuY3Rpb24gKHZhbHVlcywgZXF1YWxzKSB7XG4gICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXNbXCJkZWxldGVcIl0odmFsdWUsIGVxdWFscyk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIGluIHRlcm1zIG9mIFwicmVkdWNlXCIuXG4vLyBzb21lIG5lZWQgXCJjb25zdHJ1Y3RDbG9uZVwiLlxuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjayAvKiwgdGhpc3AqLykge1xuICAgIHZhciB0aGlzcCA9IGFyZ3VtZW50c1sxXTtcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHVuZGVmaW5lZCwgdmFsdWUsIGtleSwgb2JqZWN0LCBkZXB0aCkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNwLCB2YWx1ZSwga2V5LCBvYmplY3QsIGRlcHRoKTtcbiAgICB9LCB1bmRlZmluZWQpO1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChjYWxsYmFjayAvKiwgdGhpc3AqLykge1xuICAgIHZhciB0aGlzcCA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHVuZGVmaW5lZCwgdmFsdWUsIGtleSwgb2JqZWN0LCBkZXB0aCkge1xuICAgICAgICByZXN1bHQucHVzaChjYWxsYmFjay5jYWxsKHRoaXNwLCB2YWx1ZSwga2V5LCBvYmplY3QsIGRlcHRoKSk7XG4gICAgfSwgdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmVudW1lcmF0ZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIGlmIChzdGFydCA9PSBudWxsKSB7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHRoaXMucmVkdWNlKGZ1bmN0aW9uICh1bmRlZmluZWQsIHZhbHVlKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtzdGFydCsrLCB2YWx1ZV0pO1xuICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5ncm91cCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc3AsIGVxdWFscykge1xuICAgIGVxdWFscyA9IGVxdWFscyB8fCBlcXVhbHNPcGVyYXRvcjtcbiAgICB2YXIgZ3JvdXBzID0gW107XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXksIG9iamVjdCkge1xuICAgICAgICB2YXIga2V5ID0gY2FsbGJhY2suY2FsbCh0aGlzcCwgdmFsdWUsIGtleSwgb2JqZWN0KTtcbiAgICAgICAgdmFyIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSwgZXF1YWxzKTtcbiAgICAgICAgdmFyIGdyb3VwO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICBncm91cCA9IFtdO1xuICAgICAgICAgICAgZ3JvdXBzLnB1c2goW2tleSwgZ3JvdXBdKTtcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAgPSBncm91cHNbaW5kZXhdWzFdO1xuICAgICAgICB9XG4gICAgICAgIGdyb3VwLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cHM7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoaWRlbnRpdHkpO1xufTtcblxuLy8gdGhpcyBkZXBlbmRzIG9uIHN0cmluZ2FibGUga2V5cywgd2hpY2ggYXBwbHkgdG8gQXJyYXkgYW5kIEl0ZXJhdG9yXG4vLyBiZWNhdXNlIHRoZXkgaGF2ZSBudW1lcmljIGtleXMgYW5kIGFsbCBNYXBzIHNpbmNlIHRoZXkgbWF5IHVzZVxuLy8gc3RyaW5ncyBhcyBrZXlzLiAgTGlzdCwgU2V0LCBhbmQgU29ydGVkU2V0IGhhdmUgbm9kZXMgZm9yIGtleXMsIHNvXG4vLyB0b09iamVjdCB3b3VsZCBub3QgYmUgbWVhbmluZ2Z1bC5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHVuZGVmaW5lZCwgdmFsdWUsIGtleSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIG9iamVjdDtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIHRoaXNwKi8pIHtcbiAgICB2YXIgdGhpc3AgPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuY29uc3RydWN0Q2xvbmUoKTtcbiAgICB0aGlzLnJlZHVjZShmdW5jdGlvbiAodW5kZWZpbmVkLCB2YWx1ZSwga2V5LCBvYmplY3QsIGRlcHRoKSB7XG4gICAgICAgIGlmIChjYWxsYmFjay5jYWxsKHRoaXNwLCB2YWx1ZSwga2V5LCBvYmplY3QsIGRlcHRoKSkge1xuICAgICAgICAgICAgcmVzdWx0LmFkZCh2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5ldmVyeSA9IGZ1bmN0aW9uIChjYWxsYmFjayAvKiwgdGhpc3AqLykge1xuICAgIHZhciB0aGlzcCA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLml0ZXJhdGUoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgaXRlcmF0aW9uID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFjYWxsYmFjay5jYWxsKHRoaXNwLCBpdGVyYXRpb24udmFsdWUsIGl0ZXJhdGlvbi5pbmRleCwgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5zb21lID0gZnVuY3Rpb24gKGNhbGxiYWNrIC8qLCB0aGlzcCovKSB7XG4gICAgdmFyIHRoaXNwID0gYXJndW1lbnRzWzFdO1xuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuaXRlcmF0ZSgpO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBpdGVyYXRpb24gPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChpdGVyYXRpb24uZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGNhbGxiYWNrLmNhbGwodGhpc3AsIGl0ZXJhdGlvbi52YWx1ZSwgaXRlcmF0aW9uLmluZGV4LCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUubWluID0gZnVuY3Rpb24gKGNvbXBhcmUpIHtcbiAgICBjb21wYXJlID0gY29tcGFyZSB8fCB0aGlzLmNvbnRlbnRDb21wYXJlIHx8IGNvbXBhcmVPcGVyYXRvcjtcbiAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSkge1xuICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZSh2YWx1ZSwgcmVzdWx0KSA8IDAgPyB2YWx1ZSA6IHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH0sIHVuZGVmaW5lZCk7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUubWF4ID0gZnVuY3Rpb24gKGNvbXBhcmUpIHtcbiAgICBjb21wYXJlID0gY29tcGFyZSB8fCB0aGlzLmNvbnRlbnRDb21wYXJlIHx8IGNvbXBhcmVPcGVyYXRvcjtcbiAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSkge1xuICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZSh2YWx1ZSwgcmVzdWx0KSA+IDAgPyB2YWx1ZSA6IHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH0sIHVuZGVmaW5lZCk7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuc3VtID0gZnVuY3Rpb24gKHplcm8pIHtcbiAgICB6ZXJvID0gemVybyA9PT0gdW5kZWZpbmVkID8gMCA6IHplcm87XG4gICAgcmV0dXJuIHRoaXMucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhICsgYjtcbiAgICB9LCB6ZXJvKTtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5hdmVyYWdlID0gZnVuY3Rpb24gKHplcm8pIHtcbiAgICB2YXIgc3VtID0gemVybyA9PT0gdW5kZWZpbmVkID8gMCA6IHplcm87XG4gICAgdmFyIGNvdW50ID0gemVybyA9PT0gdW5kZWZpbmVkID8gMCA6IHplcm87XG4gICAgdGhpcy5yZWR1Y2UoZnVuY3Rpb24gKHVuZGVmaW5lZCwgdmFsdWUpIHtcbiAgICAgICAgc3VtICs9IHZhbHVlO1xuICAgICAgICBjb3VudCArPSAxO1xuICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHN1bSAvIGNvdW50O1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5jb25zdHJ1Y3RDbG9uZSh0aGlzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQuYWRkRWFjaChhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmZsYXR0ZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBhcnJheSkge1xuICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfSwgcmVzdWx0LCBzZWxmKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuemlwID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YWJsZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdGFibGUudW5zaGlmdCh0aGlzKTtcbiAgICByZXR1cm4gdW56aXBPcGVyYXRvcih0YWJsZSk7XG59XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24gKGRlbGltaXRlcikge1xuICAgIHJldHVybiB0aGlzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCArIGRlbGltaXRlciArIHN0cmluZztcbiAgICB9KTtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5zb3J0ZWQgPSBmdW5jdGlvbiAoY29tcGFyZSwgYnksIG9yZGVyKSB7XG4gICAgY29tcGFyZSA9IGNvbXBhcmUgfHwgdGhpcy5jb250ZW50Q29tcGFyZSB8fCBjb21wYXJlT3BlcmF0b3I7XG4gICAgLy8gYWNjb3VudCBmb3IgY29tcGFyYXRvcnMgZ2VuZXJhdGVkIGJ5IEZ1bmN0aW9uLmJ5XG4gICAgaWYgKGNvbXBhcmUuYnkpIHtcbiAgICAgICAgYnkgPSBjb21wYXJlLmJ5O1xuICAgICAgICBjb21wYXJlID0gY29tcGFyZS5jb21wYXJlIHx8IHRoaXMuY29udGVudENvbXBhcmUgfHwgY29tcGFyZU9wZXJhdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJ5ID0gYnkgfHwgaWRlbnRpdHk7XG4gICAgfVxuICAgIGlmIChvcmRlciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBvcmRlciA9IDE7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBieTogYnkoaXRlbSksXG4gICAgICAgICAgICB2YWx1ZTogaXRlbVxuICAgICAgICB9O1xuICAgIH0pXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmUoYS5ieSwgYi5ieSkgKiBvcmRlcjtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24gKHBhaXIpIHtcbiAgICAgICAgcmV0dXJuIHBhaXIudmFsdWU7XG4gICAgfSk7XG59O1xuXG5HZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUucmV2ZXJzZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0Q2xvbmUodGhpcykucmV2ZXJzZSgpO1xufTtcblxuR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKGRlcHRoLCBtZW1vLCBjbG9uZSkge1xuICAgIGlmIChkZXB0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlcHRoID0gSW5maW5pdHk7XG4gICAgfSBlbHNlIGlmIChkZXB0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2xvbmUgPSBjbG9uZSB8fCBjbG9uZU9wZXJhdG9yO1xuICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcy5jb25zdHJ1Y3RDbG9uZSgpO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChjbG9uZSh2YWx1ZSwgZGVwdGggLSAxLCBtZW1vKSwga2V5KTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbn07XG5cbkdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5vbmx5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vbmUoKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgT2JzZXJ2YWJsZU1hcCA9IHJlcXVpcmUoXCJwb3Atb2JzZXJ2ZS9vYnNlcnZhYmxlLW1hcFwiKTtcbnZhciBPYnNlcnZhYmxlT2JqZWN0ID0gcmVxdWlyZShcInBvcC1vYnNlcnZlL29ic2VydmFibGUtb2JqZWN0XCIpO1xudmFyIEl0ZXJhdG9yID0gcmVxdWlyZShcIi4vaXRlcmF0b3JcIik7XG52YXIgZXF1YWxzT3BlcmF0b3IgPSByZXF1aXJlKFwicG9wLWVxdWFsc1wiKTtcbnZhciBjb21wYXJlT3BlcmF0b3IgPSByZXF1aXJlKFwicG9wLWNvbXBhcmVcIik7XG52YXIgY29weSA9IHJlcXVpcmUoXCIuL2NvcHlcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZXJpY01hcDtcbmZ1bmN0aW9uIEdlbmVyaWNNYXAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgY29uc3RydWN0LiBHZW5lcmljTWFwIGlzIGEgbWl4aW4uXCIpO1xufVxuXG5jb3B5KEdlbmVyaWNNYXAucHJvdG90eXBlLCBPYnNlcnZhYmxlTWFwLnByb3RvdHlwZSk7XG5jb3B5KEdlbmVyaWNNYXAucHJvdG90eXBlLCBPYnNlcnZhYmxlT2JqZWN0LnByb3RvdHlwZSk7XG5cbi8vIGFsbCBvZiB0aGVzZSBtZXRob2RzIGRlcGVuZCBvbiB0aGUgY29uc3RydWN0b3IgcHJvdmlkaW5nIGEgYHN0b3JlYCBzZXRcblxuR2VuZXJpY01hcC5wcm90b3R5cGUuaXNNYXAgPSB0cnVlO1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5hZGRFYWNoID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIGlmICh2YWx1ZXMgJiYgT2JqZWN0KHZhbHVlcykgPT09IHZhbHVlcykge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlcy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIGNvcHkgbWFwLWFsaWtlc1xuICAgICAgICAgICAgaWYgKHZhbHVlcy5pc01hcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgLy8gaXRlcmF0ZSBrZXkgdmFsdWUgcGFpcnMgb2Ygb3RoZXIgaXRlcmFibGVzXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChwYWlyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29weSBvdGhlciBvYmplY3RzIGFzIG1hcC1hbGlrZXNcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZXNba2V5XSk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn1cblxuR2VuZXJpY01hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgdmFyIGl0ZW0gPSB0aGlzLnN0b3JlLmdldChuZXcgdGhpcy5JdGVtKGtleSkpO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0KGtleSk7XG4gICAgfVxufTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGUuZ2V0RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIGl0ZW0gPSBuZXcgdGhpcy5JdGVtKGtleSwgdmFsdWUpO1xuICAgIHZhciBmb3VuZCA9IHRoaXMuc3RvcmUuZ2V0KGl0ZW0pO1xuICAgIHZhciBncmV3ID0gZmFsc2U7XG4gICAgaWYgKGZvdW5kKSB7IC8vIHVwZGF0ZVxuICAgICAgICB2YXIgZnJvbTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIGZyb20gPSBmb3VuZC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKFwidXBkYXRlXCIsIGtleSwgdmFsdWUsIGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGZvdW5kLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwQ2hhbmdlKFwidXBkYXRlXCIsIGtleSwgdmFsdWUsIGZyb20pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHsgLy8gY3JlYXRlXG4gICAgICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWFwV2lsbENoYW5nZShcImNyZWF0ZVwiLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdG9yZS5hZGQoaXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgICAgICAgICBncmV3ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcENoYW5nZShcImNyZWF0ZVwiLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ3Jldztcbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xufTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmhhcyhuZXcgdGhpcy5JdGVtKGtleSkpO1xufTtcblxuR2VuZXJpY01hcC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBpdGVtID0gbmV3IHRoaXMuSXRlbShrZXkpO1xuICAgIGlmICh0aGlzLnN0b3JlLmhhcyhpdGVtKSkge1xuICAgICAgICB2YXIgZnJvbTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hlc01hcENoYW5nZXMpIHtcbiAgICAgICAgICAgIGZyb20gPSB0aGlzLnN0b3JlLmdldChpdGVtKS52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKFwiZGVsZXRlXCIsIGtleSwgdm9pZCAwLCBmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JlW1wiZGVsZXRlXCJdKGl0ZW0pO1xuICAgICAgICB0aGlzLmxlbmd0aC0tO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVzTWFwQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcENoYW5nZShcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmcm9tO1xuICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcFdpbGxDaGFuZ2UoXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIHZhbHVlKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIGZyb20gPSB0aGlzLmNvbnN0cnVjdENsb25lKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLnN0b3JlLmNsZWFyKCk7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIGlmICh0aGlzLmRpc3BhdGNoZXNNYXBDaGFuZ2VzKSB7XG4gICAgICAgIGZyb20uZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1hcENoYW5nZShcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgdmFsdWUpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5pdGVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5JdGVyYXRvcih0aGlzKTtcbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYmFzaXMsIHRoaXNwKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucmVkdWNlKGZ1bmN0aW9uIChiYXNpcywgaXRlbSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzcCwgYmFzaXMsIGl0ZW0udmFsdWUsIGl0ZW0ua2V5LCB0aGlzKTtcbiAgICB9LCBiYXNpcywgdGhpcyk7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5yZWR1Y2VSaWdodCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYmFzaXMsIHRoaXNwKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGJhc2lzLCBpdGVtKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXNwLCBiYXNpcywgaXRlbS52YWx1ZSwgaXRlbS5rZXksIHRoaXMpO1xuICAgIH0sIGJhc2lzLCB0aGlzKTtcbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfSk7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGlkZW50aXR5KTtcbn07XG5cbkdlbmVyaWNNYXAucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgfSk7XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAodGhhdCwgZXF1YWxzKSB7XG4gICAgZXF1YWxzID0gZXF1YWxzIHx8IGVxdWFsc09wZXJhdG9yO1xuICAgIGlmICh0aGlzID09PSB0aGF0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhhdCAmJiB0eXBlb2YgdGhhdC5ldmVyeSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiB0aGF0Lmxlbmd0aCA9PT0gdGhpcy5sZW5ndGggJiYgdGhhdC5ldmVyeShmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyh0aGlzLmdldChrZXkpLCB2YWx1ZSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhhdCk7XG4gICAgICAgIHJldHVybiBrZXlzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGggJiYgT2JqZWN0LmtleXModGhhdCkuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyh0aGlzLmdldChrZXkpLCB0aGF0W2tleV0pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG59O1xuXG5HZW5lcmljTWFwLnByb3RvdHlwZS5JdGVtID0gSXRlbTtcbkdlbmVyaWNNYXAucHJvdG90eXBlLkl0ZXJhdG9yID0gR2VuZXJpY01hcEl0ZXJhdG9yO1xuXG5mdW5jdGlvbiBJdGVtKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG59XG5cbkl0ZW0ucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uICh0aGF0KSB7XG4gICAgcmV0dXJuIGVxdWFsc09wZXJhdG9yKHRoaXMua2V5LCB0aGF0LmtleSkgJiYgZXF1YWxzT3BlcmF0b3IodGhpcy52YWx1ZSwgdGhhdC52YWx1ZSk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gKHRoYXQpIHtcbiAgICByZXR1cm4gY29tcGFyZU9wZXJhdG9yKHRoaXMua2V5LCB0aGF0LmtleSk7XG59O1xuXG5mdW5jdGlvbiBHZW5lcmljTWFwSXRlcmF0b3IobWFwKSB7XG4gICAgdGhpcy5zdG9yZUl0ZXJhdG9yID0gbmV3IEl0ZXJhdG9yKG1hcC5zdG9yZSk7XG59XG5cbkdlbmVyaWNNYXBJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSk7XG5HZW5lcmljTWFwSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJpY01hcEl0ZXJhdG9yO1xuXG5HZW5lcmljTWFwSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGl0ZXJhdGlvbiA9IHRoaXMuc3RvcmVJdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvci5JdGVyYXRpb24oXG4gICAgICAgICAgICBpdGVyYXRpb24udmFsdWUudmFsdWUsXG4gICAgICAgICAgICBpdGVyYXRpb24udmFsdWUua2V5XG4gICAgICAgICk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBJdGVyYXRvcjtcblxudmFyIFdlYWtNYXAgPSByZXF1aXJlKFwid2Vhay1tYXBcIik7XG52YXIgR2VuZXJpY0NvbGxlY3Rpb24gPSByZXF1aXJlKFwiLi9nZW5lcmljLWNvbGxlY3Rpb25cIik7XG5cbi8vIHVwZ3JhZGVzIGFuIGl0ZXJhYmxlIHRvIGEgSXRlcmF0b3JcbmZ1bmN0aW9uIEl0ZXJhdG9yKGl0ZXJhYmxlLCBzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmICghaXRlcmFibGUpIHtcbiAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmVtcHR5O1xuICAgIH0gZWxzZSBpZiAoaXRlcmFibGUgaW5zdGFuY2VvZiBJdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgfSBlbHNlIGlmICghKHRoaXMgaW5zdGFuY2VvZiBJdGVyYXRvcikpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvcihpdGVyYWJsZSwgc3RhcnQsIHN0b3AsIHN0ZXApO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVyYWJsZSkgfHwgdHlwZW9mIGl0ZXJhYmxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGl0ZXJhdG9ycy5zZXQodGhpcywgbmV3IEluZGV4SXRlcmF0b3IoaXRlcmFibGUsIHN0YXJ0LCBzdG9wLCBzdGVwKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlcmFibGUgPSBPYmplY3QoaXRlcmFibGUpO1xuICAgIGlmIChpdGVyYWJsZS5uZXh0KSB7XG4gICAgICAgIGl0ZXJhdG9ycy5zZXQodGhpcywgaXRlcmFibGUpO1xuICAgIH0gZWxzZSBpZiAoaXRlcmFibGUuaXRlcmF0ZSkge1xuICAgICAgICBpdGVyYXRvcnMuc2V0KHRoaXMsIGl0ZXJhYmxlLml0ZXJhdGUoc3RhcnQsIHN0b3AsIHN0ZXApKTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyYWJsZSkgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICB0aGlzLm5leHQgPSBpdGVyYWJsZTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihpdGVyYWJsZSkgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgICAgaXRlcmF0b3JzLnNldCh0aGlzLCBuZXcgT2JqZWN0SXRlcmF0b3IoaXRlcmFibGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuJ3QgaXRlcmF0ZSBcIiArIGl0ZXJhYmxlKTtcbiAgICB9XG59XG5cbi8vIFVzaW5nIGl0ZXJhdG9ycyBhcyBhIGhpZGRlbiB0YWJsZSBhc3NvY2lhdGluZyBhIGZ1bGwtZmxlZGdlZCBJdGVyYXRvciB3aXRoXG4vLyBhbiB1bmRlcmx5aW5nLCB1c3VhbGx5IG1lcmVseSBcIm5leHRhYmxlXCIsIGl0ZXJhdG9yLlxudmFyIGl0ZXJhdG9ycyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8vIFNlbGVjdGl2ZWx5IGFwcGx5IGdlbmVyaWMgbWV0aG9kcyBvZiBHZW5lcmljQ29sbGVjdGlvblxuSXRlcmF0b3IucHJvdG90eXBlLmZvckVhY2ggPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZm9yRWFjaDtcbkl0ZXJhdG9yLnByb3RvdHlwZS5tYXAgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUubWFwO1xuSXRlcmF0b3IucHJvdG90eXBlLmZpbHRlciA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5maWx0ZXI7XG5JdGVyYXRvci5wcm90b3R5cGUuZXZlcnkgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZXZlcnk7XG5JdGVyYXRvci5wcm90b3R5cGUuc29tZSA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5zb21lO1xuSXRlcmF0b3IucHJvdG90eXBlLm1pbiA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5taW47XG5JdGVyYXRvci5wcm90b3R5cGUubWF4ID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLm1heDtcbkl0ZXJhdG9yLnByb3RvdHlwZS5zdW0gPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuc3VtO1xuSXRlcmF0b3IucHJvdG90eXBlLmF2ZXJhZ2UgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuYXZlcmFnZTtcbkl0ZXJhdG9yLnByb3RvdHlwZS5mbGF0dGVuID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLmZsYXR0ZW47XG5JdGVyYXRvci5wcm90b3R5cGUuemlwID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLnppcDtcbkl0ZXJhdG9yLnByb3RvdHlwZS5lbnVtZXJhdGUgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZW51bWVyYXRlO1xuSXRlcmF0b3IucHJvdG90eXBlLnNvcnRlZCA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS5zb3J0ZWQ7XG5JdGVyYXRvci5wcm90b3R5cGUuZ3JvdXAgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUuZ3JvdXA7XG5JdGVyYXRvci5wcm90b3R5cGUucmV2ZXJzZWQgPSBHZW5lcmljQ29sbGVjdGlvbi5wcm90b3R5cGUucmV2ZXJzZWQ7XG5JdGVyYXRvci5wcm90b3R5cGUudG9BcnJheSA9IEdlbmVyaWNDb2xsZWN0aW9uLnByb3RvdHlwZS50b0FycmF5O1xuSXRlcmF0b3IucHJvdG90eXBlLnRvT2JqZWN0ID0gR2VuZXJpY0NvbGxlY3Rpb24ucHJvdG90eXBlLnRvT2JqZWN0O1xuXG4vLyBUaGlzIGlzIGEgYml0IG9mIGEgY2hlYXQgc28gZmxhdHRlbiBhbmQgc3VjaCB3b3JrIHdpdGggdGhlIGdlbmVyaWMgcmVkdWNpYmxlXG5JdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0Q2xvbmUgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgdmFyIGNsb25lID0gW107XG4gICAgY2xvbmUuYWRkRWFjaCh2YWx1ZXMpO1xuICAgIHJldHVybiBjbG9uZTtcbn07XG5cbi8vIEEgbGV2ZWwgb2YgaW5kaXJlY3Rpb24gc28gYSBmdWxsLWludGVyZmFjZSBpdGVyYXRvciBjYW4gcHJveHkgZm9yIGEgc2ltcGxlXG4vLyBuZXh0YWJsZSBpdGVyYXRvci5cbkl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXh0YWJsZSA9IGl0ZXJhdG9ycy5nZXQodGhpcyk7XG4gICAgaWYgKG5leHRhYmxlKSB7XG4gICAgICAgIHJldHVybiBuZXh0YWJsZS5uZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmRvbmU7XG4gICAgfVxufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLml0ZXJhdGVNYXAgPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIHRoaXNwKi8pIHtcbiAgICB2YXIgc2VsZiA9IEl0ZXJhdG9yKHRoaXMpLFxuICAgICAgICB0aGlzcCA9IGFyZ3VtZW50c1sxXTtcbiAgICByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHNlbGYsIGNhbGxiYWNrLCB0aGlzcCk7XG59O1xuXG5mdW5jdGlvbiBNYXBJdGVyYXRvcihpdGVyYXRvciwgY2FsbGJhY2ssIHRoaXNwKSB7XG4gICAgdGhpcy5pdGVyYXRvciA9IGl0ZXJhdG9yO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLnRoaXNwID0gdGhpc3A7XG59XG5cbk1hcEl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlKTtcbk1hcEl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1hcEl0ZXJhdG9yO1xuXG5NYXBJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRpb24oXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwoXG4gICAgICAgICAgICAgICAgdGhpcy50aGlzcCxcbiAgICAgICAgICAgICAgICBpdGVyYXRpb24udmFsdWUsXG4gICAgICAgICAgICAgICAgaXRlcmF0aW9uLmluZGV4LFxuICAgICAgICAgICAgICAgIHRoaXMuaXRlcmF0aW9uXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgaXRlcmF0aW9uLmluZGV4XG4gICAgICAgICk7XG4gICAgfVxufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLml0ZXJhdGVGaWx0ZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIHRoaXNwKi8pIHtcbiAgICB2YXIgc2VsZiA9IEl0ZXJhdG9yKHRoaXMpLFxuICAgICAgICB0aGlzcCA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgcmV0dXJuIG5ldyBGaWx0ZXJJdGVyYXRvcihzZWxmLCBjYWxsYmFjaywgdGhpc3ApO1xufTtcblxuZnVuY3Rpb24gRmlsdGVySXRlcmF0b3IoaXRlcmF0b3IsIGNhbGxiYWNrLCB0aGlzcCkge1xuICAgIHRoaXMuaXRlcmF0b3IgPSBpdGVyYXRvcjtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy50aGlzcCA9IHRoaXNwO1xufVxuXG5GaWx0ZXJJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSk7XG5GaWx0ZXJJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGaWx0ZXJJdGVyYXRvcjtcblxuRmlsdGVySXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGl0ZXJhdGlvbjtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpdGVyYXRpb24gPSB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKGl0ZXJhdGlvbi5kb25lIHx8IHRoaXMuY2FsbGJhY2suY2FsbChcbiAgICAgICAgICAgIHRoaXMudGhpc3AsXG4gICAgICAgICAgICBpdGVyYXRpb24udmFsdWUsXG4gICAgICAgICAgICBpdGVyYXRpb24uaW5kZXgsXG4gICAgICAgICAgICB0aGlzLml0ZXJhdGlvblxuICAgICAgICApKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0aW9uO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uIChjYWxsYmFjayAvKiwgaW5pdGlhbCwgdGhpc3AqLykge1xuICAgIHZhciBzZWxmID0gSXRlcmF0b3IodGhpcyksXG4gICAgICAgIHJlc3VsdCA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgdGhpc3AgPSBhcmd1bWVudHNbMl0sXG4gICAgICAgIGl0ZXJhdGlvbjtcblxuICAgIC8vIEZpcnN0IGl0ZXJhdGlvbiB1bnJvbGxlZFxuICAgIGl0ZXJhdGlvbiA9IHNlbGYubmV4dCgpO1xuICAgIGlmIChpdGVyYXRpb24uZG9uZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmd1bWVudHNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJSZWR1Y2Ugb2YgZW1wdHkgaXRlcmF0b3Igd2l0aCBubyBpbml0aWFsIHZhbHVlXCIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5jYWxsKFxuICAgICAgICAgICAgdGhpc3AsXG4gICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICBpdGVyYXRpb24udmFsdWUsXG4gICAgICAgICAgICBpdGVyYXRpb24uaW5kZXgsXG4gICAgICAgICAgICBzZWxmXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gaXRlcmF0aW9uLnZhbHVlO1xuICAgIH1cblxuICAgIC8vIFJlbWFpbmluZyBlbnRyaWVzXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaXRlcmF0aW9uID0gc2VsZi5uZXh0KCk7XG4gICAgICAgIGlmIChpdGVyYXRpb24uZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrLmNhbGwoXG4gICAgICAgICAgICAgICAgdGhpc3AsXG4gICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgIGl0ZXJhdGlvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICBpdGVyYXRpb24uaW5kZXgsXG4gICAgICAgICAgICAgICAgc2VsZlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5kcm9wV2hpbGUgPSBmdW5jdGlvbiAoY2FsbGJhY2sgLyosIHRoaXNwICovKSB7XG4gICAgdmFyIHNlbGYgPSBJdGVyYXRvcih0aGlzKSxcbiAgICAgICAgdGhpc3AgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgIGl0ZXJhdGlvbjtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGl0ZXJhdGlvbiA9IHNlbGYubmV4dCgpO1xuICAgICAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBJdGVyYXRvci5lbXB0eTtcbiAgICAgICAgfSBlbHNlIGlmICghY2FsbGJhY2suY2FsbCh0aGlzcCwgaXRlcmF0aW9uLnZhbHVlLCBpdGVyYXRpb24uaW5kZXgsIHNlbGYpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERyb3BXaGlsZUl0ZXJhdG9yKGl0ZXJhdGlvbiwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBEcm9wV2hpbGVJdGVyYXRvcihpdGVyYXRpb24sIGl0ZXJhdG9yKSB7XG4gICAgdGhpcy5pdGVyYXRpb24gPSBpdGVyYXRpb247XG4gICAgdGhpcy5pdGVyYXRvciA9IGl0ZXJhdG9yO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbn1cblxuRHJvcFdoaWxlSXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvci5wcm90b3R5cGUpO1xuRHJvcFdoaWxlSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRHJvcFdoaWxlSXRlcmF0b3I7XG5cbkRyb3BXaGlsZUl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSB0aGlzLml0ZXJhdGlvbjtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHRoaXMuaXRlcmF0aW9uID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgfVxufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLnRha2VXaGlsZSA9IGZ1bmN0aW9uIChjYWxsYmFjayAvKiwgdGhpc3AqLykge1xuICAgIHZhciBzZWxmID0gSXRlcmF0b3IodGhpcyksXG4gICAgICAgIHRoaXNwID0gYXJndW1lbnRzWzFdO1xuICAgIHJldHVybiBuZXcgVGFrZVdoaWxlSXRlcmF0b3Ioc2VsZiwgY2FsbGJhY2ssIHRoaXNwKTtcbn07XG5cbmZ1bmN0aW9uIFRha2VXaGlsZUl0ZXJhdG9yKGl0ZXJhdG9yLCBjYWxsYmFjaywgdGhpc3ApIHtcbiAgICB0aGlzLml0ZXJhdG9yID0gaXRlcmF0b3I7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMudGhpc3AgPSB0aGlzcDtcbn1cblxuVGFrZVdoaWxlSXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvci5wcm90b3R5cGUpO1xuVGFrZVdoaWxlSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGFrZVdoaWxlSXRlcmF0b3I7XG5cblRha2VXaGlsZUl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVyYXRpb24gPSB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2FsbGJhY2suY2FsbChcbiAgICAgICAgdGhpcy50aGlzcCxcbiAgICAgICAgaXRlcmF0aW9uLnZhbHVlLFxuICAgICAgICBpdGVyYXRpb24uaW5kZXgsXG4gICAgICAgIHRoaXMuaXRlcmF0b3JcbiAgICApKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmRvbmU7XG4gICAgfVxufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLml0ZXJhdGVaaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEl0ZXJhdG9yLnVuemlwKEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG59O1xuXG5JdGVyYXRvci5wcm90b3R5cGUuaXRlcmF0ZVVuemlwID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBJdGVyYXRvci51bnppcCh0aGlzKTtcbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5pdGVyYXRlRW51bWVyYXRlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIEl0ZXJhdG9yLmNvdW50KHN0YXJ0KS5pdGVyYXRlWmlwKHRoaXMpO1xufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLml0ZXJhdGVDb25jYXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEl0ZXJhdG9yLmZsYXR0ZW4oQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5pdGVyYXRlRmxhdHRlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gSXRlcmF0b3IuZmxhdHRlbih0aGlzKTtcbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5yZWNvdW50ID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIG5ldyBSZWNvdW50SXRlcmF0b3IodGhpcywgc3RhcnQpO1xufTtcblxuZnVuY3Rpb24gUmVjb3VudEl0ZXJhdG9yKGl0ZXJhdG9yLCBzdGFydCkge1xuICAgIHRoaXMuaXRlcmF0b3IgPSBpdGVyYXRvcjtcbiAgICB0aGlzLmluZGV4ID0gc3RhcnQgfHwgMDtcbn1cblxuUmVjb3VudEl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlKTtcblJlY291bnRJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWNvdW50SXRlcmF0b3I7XG5cblJlY291bnRJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKGl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRpb24oXG4gICAgICAgICAgICBpdGVyYXRpb24udmFsdWUsXG4gICAgICAgICAgICB0aGlzLmluZGV4KytcbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG4vLyBjcmVhdGVzIGFuIGl0ZXJhdG9yIGZvciBBcnJheSBhbmQgU3RyaW5nXG5mdW5jdGlvbiBJbmRleEl0ZXJhdG9yKGl0ZXJhYmxlLCBzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChzdGVwID09IG51bGwpIHtcbiAgICAgICAgc3RlcCA9IDE7XG4gICAgfVxuICAgIGlmIChzdG9wID09IG51bGwpIHtcbiAgICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIGlmIChzdGFydCA9PSBudWxsKSB7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgaWYgKHN0ZXAgPT0gbnVsbCkge1xuICAgICAgICBzdGVwID0gMTtcbiAgICB9XG4gICAgaWYgKHN0b3AgPT0gbnVsbCkge1xuICAgICAgICBzdG9wID0gaXRlcmFibGUubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLml0ZXJhYmxlID0gaXRlcmFibGU7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuc3RvcCA9IHN0b3A7XG4gICAgdGhpcy5zdGVwID0gc3RlcDtcbn1cblxuSW5kZXhJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBBZHZhbmNlIHRvIG5leHQgb3duZWQgZW50cnlcbiAgICBpZiAodHlwZW9mIHRoaXMuaXRlcmFibGUgPT09IFwib2JqZWN0XCIpIHsgLy8gYXMgb3Bwb3NlZCB0byBzdHJpbmdcbiAgICAgICAgd2hpbGUgKCEodGhpcy5zdGFydCBpbiB0aGlzLml0ZXJhYmxlKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnQgPj0gdGhpcy5zdG9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmRvbmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgKz0gdGhpcy5zdGVwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXJ0ID49IHRoaXMuc3RvcCkgeyAvLyBlbmQgb2Ygc3RyaW5nXG4gICAgICAgIHJldHVybiBJdGVyYXRvci5kb25lO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9uID0gbmV3IEl0ZXJhdGlvbihcbiAgICAgICAgdGhpcy5pdGVyYWJsZVt0aGlzLnN0YXJ0XSxcbiAgICAgICAgdGhpcy5zdGFydFxuICAgICk7XG4gICAgdGhpcy5zdGFydCArPSB0aGlzLnN0ZXA7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbjtcbn07XG5cbmZ1bmN0aW9uIE9iamVjdEl0ZXJhdG9yKG9iamVjdCkge1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIHRoaXMuaXRlcmF0b3IgPSBuZXcgSXRlcmF0b3IoT2JqZWN0LmtleXMob2JqZWN0KSk7XG59XG5cbk9iamVjdEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVyYXRpb24gPSB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5ID0gaXRlcmF0aW9uLnZhbHVlO1xuICAgICAgICByZXR1cm4gbmV3IEl0ZXJhdGlvbih0aGlzLm9iamVjdFtrZXldLCBrZXkpO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLmN5Y2xlID0gZnVuY3Rpb24gKGN5Y2xlLCB0aW1lcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgICB0aW1lcyA9IEluZmluaXR5O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEN5Y2xlSXRlcmF0b3IoY3ljbGUsIHRpbWVzKTtcbn07XG5cbmZ1bmN0aW9uIEN5Y2xlSXRlcmF0b3IoY3ljbGUsIHRpbWVzKSB7XG4gICAgdGhpcy5jeWNsZSA9IGN5Y2xlO1xuICAgIHRoaXMudGltZXMgPSB0aW1lcztcbiAgICB0aGlzLml0ZXJhdG9yID0gSXRlcmF0b3IuZW1wdHk7XG59XG5cbkN5Y2xlSXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvci5wcm90b3R5cGUpO1xuQ3ljbGVJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDeWNsZUl0ZXJhdG9yO1xuXG5DeWNsZUl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVyYXRpb24gPSB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXMgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVzLS07XG4gICAgICAgICAgICB0aGlzLml0ZXJhdG9yID0gbmV3IEl0ZXJhdG9yKHRoaXMuY3ljbGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGlvbjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgfVxufTtcblxuSXRlcmF0b3IuY29uY2F0ID0gZnVuY3Rpb24gKC8qIC4uLml0ZXJhdG9ycyAqLykge1xuICAgIHJldHVybiBJdGVyYXRvci5mbGF0dGVuKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xufTtcblxuSXRlcmF0b3IuZmxhdHRlbiA9IGZ1bmN0aW9uIChpdGVyYXRvcnMpIHtcbiAgICBpdGVyYXRvcnMgPSBJdGVyYXRvcihpdGVyYXRvcnMpO1xuICAgIHJldHVybiBuZXcgQ2hhaW5JdGVyYXRvcihpdGVyYXRvcnMpO1xufTtcblxuZnVuY3Rpb24gQ2hhaW5JdGVyYXRvcihpdGVyYXRvcnMpIHtcbiAgICB0aGlzLml0ZXJhdG9ycyA9IGl0ZXJhdG9ycztcbiAgICB0aGlzLml0ZXJhdG9yID0gSXRlcmF0b3IuZW1wdHk7XG59XG5cbkNoYWluSXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvci5wcm90b3R5cGUpO1xuQ2hhaW5JdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDaGFpbkl0ZXJhdG9yO1xuXG5DaGFpbkl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVyYXRpb24gPSB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICBpZiAoaXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9ySXRlcmF0aW9uID0gdGhpcy5pdGVyYXRvcnMubmV4dCgpO1xuICAgICAgICBpZiAoaXRlcmF0b3JJdGVyYXRpb24uZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmRvbmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLml0ZXJhdG9yID0gbmV3IEl0ZXJhdG9yKGl0ZXJhdG9ySXRlcmF0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRpb247XG4gICAgfVxufTtcblxuSXRlcmF0b3IudW56aXAgPSBmdW5jdGlvbiAoaXRlcmF0b3JzKSB7XG4gICAgaXRlcmF0b3JzID0gSXRlcmF0b3IoaXRlcmF0b3JzKS5tYXAoSXRlcmF0b3IpO1xuICAgIGlmIChpdGVyYXRvcnMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yLmVtcHR5O1xuICAgIHJldHVybiBuZXcgVW56aXBJdGVyYXRvcihpdGVyYXRvcnMpO1xufTtcblxuZnVuY3Rpb24gVW56aXBJdGVyYXRvcihpdGVyYXRvcnMpIHtcbiAgICB0aGlzLml0ZXJhdG9ycyA9IGl0ZXJhdG9ycztcbiAgICB0aGlzLmluZGV4ID0gMDtcbn1cblxuVW56aXBJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSk7XG5VbnppcEl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVuemlwSXRlcmF0b3I7XG5cblVuemlwSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRvbmUgPSBmYWxzZVxuICAgIHZhciByZXN1bHQgPSB0aGlzLml0ZXJhdG9ycy5tYXAoZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBpdGVyYXRpb24gPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChpdGVyYXRpb24uZG9uZSkge1xuICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0aW9uLnZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmRvbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRpb24ocmVzdWx0LCB0aGlzLmluZGV4KyspO1xuICAgIH1cbn07XG5cbkl0ZXJhdG9yLnppcCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gSXRlcmF0b3IudW56aXAoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG59O1xuXG5JdGVyYXRvci5yYW5nZSA9IGZ1bmN0aW9uIChzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBzdGVwID0gMTtcbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHN0b3AgPSBzdGFydDtcbiAgICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gICAgc3RlcCA9IHN0ZXAgfHwgMTtcbiAgICByZXR1cm4gbmV3IFJhbmdlSXRlcmF0b3Ioc3RhcnQsIHN0b3AsIHN0ZXApO1xufTtcblxuSXRlcmF0b3IuY291bnQgPSBmdW5jdGlvbiAoc3RhcnQsIHN0ZXApIHtcbiAgICByZXR1cm4gSXRlcmF0b3IucmFuZ2Uoc3RhcnQsIEluZmluaXR5LCBzdGVwKTtcbn07XG5cbmZ1bmN0aW9uIFJhbmdlSXRlcmF0b3Ioc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5zdG9wID0gc3RvcDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMuaW5kZXggPSAwO1xufVxuXG5SYW5nZUl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlKTtcblJhbmdlSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmFuZ2VJdGVyYXRvcjtcblxuUmFuZ2VJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zdGFydCA+PSB0aGlzLnN0b3ApIHtcbiAgICAgICAgcmV0dXJuIEl0ZXJhdG9yLmRvbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuc3RhcnQgKz0gdGhpcy5zdGVwO1xuICAgICAgICByZXR1cm4gbmV3IEl0ZXJhdGlvbihyZXN1bHQsIHRoaXMuaW5kZXgrKyk7XG4gICAgfVxufTtcblxuSXRlcmF0b3IucmVwZWF0ID0gZnVuY3Rpb24gKHZhbHVlLCB0aW1lcykge1xuICAgIGlmICh0aW1lcyA9PSBudWxsKSB7XG4gICAgICAgIHRpbWVzID0gSW5maW5pdHk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVwZWF0SXRlcmF0b3IodmFsdWUsIHRpbWVzKTtcbn07XG5cbmZ1bmN0aW9uIFJlcGVhdEl0ZXJhdG9yKHZhbHVlLCB0aW1lcykge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnRpbWVzID0gdGltZXM7XG4gICAgdGhpcy5pbmRleCA9IDA7XG59XG5cblJlcGVhdEl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3IucHJvdG90eXBlKTtcblJlcGVhdEl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlcGVhdEl0ZXJhdG9yO1xuXG5SZXBlYXRJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMudGltZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVyYXRpb24odGhpcy52YWx1ZSwgdGhpcy5pbmRleCsrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gSXRlcmF0b3IuZG9uZTtcbiAgICB9XG59O1xuXG5JdGVyYXRvci5lbnVtZXJhdGUgPSBmdW5jdGlvbiAodmFsdWVzLCBzdGFydCkge1xuICAgIHJldHVybiBJdGVyYXRvci5jb3VudChzdGFydCkuaXRlcmF0ZVppcChuZXcgSXRlcmF0b3IodmFsdWVzKSk7XG59O1xuXG5mdW5jdGlvbiBFbXB0eUl0ZXJhdG9yKCkge31cblxuRW1wdHlJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yLnByb3RvdHlwZSk7XG5FbXB0eUl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVtcHR5SXRlcmF0b3I7XG5cbkVtcHR5SXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEl0ZXJhdG9yLmRvbmU7XG59O1xuXG5JdGVyYXRvci5lbXB0eSA9IG5ldyBFbXB0eUl0ZXJhdG9yKCk7XG5cbi8vIEl0ZXJhdGlvbiBhbmQgRG9uZUl0ZXJhdGlvbiBleGlzdCBoZXJlIG9ubHkgdG8gZW5jb3VyYWdlIGhpZGRlbiBjbGFzc2VzLlxuLy8gT3RoZXJ3aXNlLCBpdGVyYXRpb25zIGFyZSBtZXJlbHkgZHVjay10eXBlcy5cblxuZnVuY3Rpb24gSXRlcmF0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG59XG5cbkl0ZXJhdGlvbi5wcm90b3R5cGUuZG9uZSA9IGZhbHNlO1xuXG5JdGVyYXRpb24ucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uICh0aGF0LCBlcXVhbHMsIG1lbW8pIHtcbiAgICBpZiAoIXRoYXQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gKFxuICAgICAgICBlcXVhbHModGhpcy52YWx1ZSwgdGhhdC52YWx1ZSwgZXF1YWxzLCBtZW1vKSAmJlxuICAgICAgICB0aGlzLmluZGV4ID09PSB0aGF0LmluZGV4ICYmXG4gICAgICAgIHRoaXMuZG9uZSA9PT0gdGhhdC5kb25lXG4gICAgKTtcblxufTtcblxuZnVuY3Rpb24gRG9uZUl0ZXJhdGlvbih2YWx1ZSkge1xuICAgIEl0ZXJhdGlvbi5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICB0aGlzLmRvbmUgPSB0cnVlOyAvLyByZWZsZWN0ZWQgb24gdGhlIGluc3RhbmNlIHRvIG1ha2UgaXQgbW9yZSBvYnZpb3VzXG59XG5cbkRvbmVJdGVyYXRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRpb24ucHJvdG90eXBlKTtcbkRvbmVJdGVyYXRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRG9uZUl0ZXJhdGlvbjtcbkRvbmVJdGVyYXRpb24ucHJvdG90eXBlLmRvbmUgPSB0cnVlO1xuXG5JdGVyYXRvci5JdGVyYXRpb24gPSBJdGVyYXRpb247XG5JdGVyYXRvci5Eb25lSXRlcmF0aW9uID0gRG9uZUl0ZXJhdGlvbjtcbkl0ZXJhdG9yLmRvbmUgPSBuZXcgRG9uZUl0ZXJhdGlvbigpO1xuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBNaW5pTWFwO1xuZnVuY3Rpb24gTWluaU1hcCgpIHtcbiAgICB0aGlzLmtleXMgPSBbXTtcbiAgICB0aGlzLnZhbHVlcyA9IFtdO1xufVxuXG5NaW5pTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5rZXlzLmluZGV4T2Yoa2V5KTtcbiAgICByZXR1cm4gaW5kZXggPj0gMDtcbn07XG5cbk1pbmlNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmtleXMuaW5kZXhPZihrZXkpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlc1tpbmRleF07XG4gICAgfVxufTtcblxuTWluaU1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmtleXMuaW5kZXhPZihrZXkpO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLmtleXMubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmtleXNbaW5kZXhdID0ga2V5O1xuICAgIHRoaXMudmFsdWVzW2luZGV4XSA9IHZhbHVlO1xufTtcblxuTWluaU1hcC5wcm90b3R5cGVbXCJkZWxldGVcIl0gPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5rZXlzLmluZGV4T2Yoa2V5KTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLmtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy52YWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59O1xuXG5NaW5pTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmtleXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLnZhbHVlcy5sZW5ndGggPSAwO1xufTtcblxuIiwiXG52YXIgTWluaU1hcCA9IHJlcXVpcmUoXCJtaW5pLW1hcFwiKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWVwIGNvcHkgb2YgYW55IHZhbHVlLiAgVmFsdWVzLCBiZWluZyBpbW11dGFibGUsIGFyZSByZXR1cm5lZFxuICogd2l0aG91dCBhbHRlcm5hdGlvbi4gIEZvcndhcmRzIHRvIDxjb2RlPmNsb25lPC9jb2RlPiBvbiBvYmplY3RzIGFuZCBhcnJheXMuXG4gKlxuICogQGZ1bmN0aW9uIGNsb25lXG4gKiBAcGFyYW0ge0FueX0gdmFsdWUgYSB2YWx1ZSB0byBjbG9uZVxuICogQHBhcmFtIHtOdW1iZXJ9IGRlcHRoIGFuIG9wdGlvbmFsIHRyYXZlcnNhbCBkZXB0aCwgZGVmYXVsdHMgdG8gaW5maW5pdHkuICBBXG4gKiB2YWx1ZSBvZiA8Y29kZT4wPC9jb2RlPiBtZWFucyB0byBtYWtlIG5vIGNsb25lIGFuZCByZXR1cm4gdGhlIHZhbHVlXG4gKiBkaXJlY3RseS5cbiAqIEBwYXJhbSB7TWFwfSBtZW1vIGFuIG9wdGlvbmFsIG1lbW8gb2YgYWxyZWFkeSB2aXNpdGVkIG9iamVjdHMgdG8gcHJlc2VydmVcbiAqIHJlZmVyZW5jZSBjeWNsZXMuICBUaGUgY2xvbmVkIG9iamVjdCB3aWxsIGhhdmUgdGhlIGV4YWN0IHNhbWUgc2hhcGUgYXMgdGhlXG4gKiBvcmlnaW5hbCwgYnV0IG5vIGlkZW50aWNhbCBvYmplY3RzLiAgVGUgbWFwIG1heSBiZSBsYXRlciB1c2VkIHRvIGFzc29jaWF0ZVxuICogYWxsIG9iamVjdHMgaW4gdGhlIG9yaWdpbmFsIG9iamVjdCBncmFwaCB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgbWVtYmVyIG9mXG4gKiB0aGUgY2xvbmVkIGdyYXBoLlxuICogQHJldHVybnMgYSBjb3B5IG9mIHRoZSB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lT3BlcmF0b3I7XG5mdW5jdGlvbiBjbG9uZU9wZXJhdG9yKHZhbHVlLCBkZXB0aCwgbWVtbykge1xuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS52YWx1ZU9mKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudmFsdWVPZigpO1xuICAgIH1cbiAgICBpZiAoZGVwdGggPT0gbnVsbCkgeyAvLyBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICBkZXB0aCA9IEluZmluaXR5O1xuICAgIH0gZWxzZSBpZiAoZGVwdGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG1lbW8gPSBtZW1vIHx8IG5ldyBNaW5pTWFwKCk7XG4gICAgICAgIGlmICghbWVtby5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLmNsb25lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBtZW1vLnNldCh2YWx1ZSwgdmFsdWUuY2xvbmUoZGVwdGgsIG1lbW8pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgaXNBcnJheSB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90b3R5cGUgPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG90eXBlID09PSBvYmplY3RQcm90b3R5cGVcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsb25lID0gaXNBcnJheSA/IFtdIDoge307XG4gICAgICAgICAgICAgICAgICAgIG1lbW8uc2V0KHZhbHVlLCBjbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVba2V5XSA9IGNsb25lT3BlcmF0b3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXB0aCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVtb1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNsb25lIFwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVtby5nZXQodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbiIsIlxuLyoqXG4gICAgRGV0ZXJtaW5lcyB0aGUgb3JkZXIgaW4gd2hpY2ggYW55IHR3byBvYmplY3RzIHNob3VsZCBiZSBzb3J0ZWQgYnkgcmV0dXJuaW5nXG4gICAgYSBudW1iZXIgdGhhdCBoYXMgYW4gYW5hbG9nb3VzIHJlbGF0aW9uc2hpcCB0byB6ZXJvIGFzIHRoZSBsZWZ0IHZhbHVlIHRvXG4gICAgdGhlIHJpZ2h0LiAgVGhhdCBpcywgaWYgdGhlIGxlZnQgaXMgXCJsZXNzIHRoYW5cIiB0aGUgcmlnaHQsIHRoZSByZXR1cm5lZFxuICAgIHZhbHVlIHdpbGwgYmUgXCJsZXNzIHRoYW5cIiB6ZXJvLCB3aGVyZSBcImxlc3MgdGhhblwiIG1heSBiZSBhbnkgb3RoZXJcbiAgICB0cmFuc2l0aXZlIHJlbGF0aW9uc2hpcC5cblxuICAgIDxwPkFycmF5cyBhcmUgY29tcGFyZWQgYnkgdGhlIGZpcnN0IGRpdmVyZ2luZyB2YWx1ZXMsIG9yIGJ5IGxlbmd0aC5cblxuICAgIDxwPkFueSB0d28gdmFsdWVzIHRoYXQgYXJlIGluY29tcGFyYWJsZSByZXR1cm4gemVyby4gIEFzIHN1Y2gsXG4gICAgPGNvZGU+ZXF1YWxzPC9jb2RlPiBzaG91bGQgbm90IGJlIGltcGxlbWVudGVkIHdpdGggPGNvZGU+Y29tcGFyZTwvY29kZT5cbiAgICBzaW5jZSBpbmNvbXBhcmFiaWxpdHkgaXMgaW5kaXN0aW5ndWlzaGFibGUgZnJvbSBlcXVhbGl0eS5cblxuICAgIDxwPlNvcnRzIHN0cmluZ3MgbGV4aWNvZ3JhcGhpY2FsbHkuICBUaGlzIGlzIG5vdCBzdWl0YWJsZSBmb3IgYW55XG4gICAgcGFydGljdWxhciBpbnRlcm5hdGlvbmFsIHNldHRpbmcuICBEaWZmZXJlbnQgbG9jYWxlcyBzb3J0IHRoZWlyIHBob25lIGJvb2tzXG4gICAgaW4gdmVyeSBkaWZmZXJlbnQgd2F5cywgcGFydGljdWxhcmx5IHJlZ2FyZGluZyBkaWFjcml0aWNzIGFuZCBsaWdhdHVyZXMuXG5cbiAgICA8cD5JZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIGEgdHlwZSB0aGF0IGltcGxlbWVudHMgYSBtZXRob2RcbiAgICBuYW1lZCBcImNvbXBhcmVcIiwgdGhpcyBmdW5jdGlvbiBkZWZlcnMgdG8gdGhlIGluc3RhbmNlLiAgVGhlIG1ldGhvZCBkb2VzIG5vdFxuICAgIG5lZWQgdG8gYmUgYW4gb3duZWQgcHJvcGVydHkgdG8gZGlzdGluZ3Vpc2ggaXQgZnJvbSBhbiBvYmplY3QgbGl0ZXJhbCBzaW5jZVxuICAgIG9iamVjdCBsaXRlcmFscyBhcmUgaW5jb21wYXJhYmxlLiAgVW5saWtlIDxjb2RlPk9iamVjdDwvY29kZT4gaG93ZXZlcixcbiAgICA8Y29kZT5BcnJheTwvY29kZT4gaW1wbGVtZW50cyA8Y29kZT5jb21wYXJlPC9jb2RlPi5cblxuICAgIEBwYXJhbSB7QW55fSBsZWZ0XG4gICAgQHBhcmFtIHtBbnl9IHJpZ2h0XG4gICAgQHJldHVybnMge051bWJlcn0gYSB2YWx1ZSBoYXZpbmcgdGhlIHNhbWUgdHJhbnNpdGl2ZSByZWxhdGlvbnNoaXAgdG8gemVyb1xuICAgIGFzIHRoZSBsZWZ0IGFuZCByaWdodCB2YWx1ZXMuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJlO1xuZnVuY3Rpb24gY29tcGFyZShhLCBiLCBjb21wYXJlKSB7XG4gICAgdmFyIGRpZmZlcmVuY2U7XG4gICAgLy8gdW5ib3ggb2JqZWN0c1xuICAgIC8vIG1lcmNpZnVsbHkgaGFuZGxlcyB0aGUgRGF0ZSBjYXNlXG4gICAgaWYgKGEgJiYgdHlwZW9mIGEudmFsdWVPZiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGEgPSBhLnZhbHVlT2YoKTtcbiAgICB9XG4gICAgaWYgKGIgJiYgdHlwZW9mIGIudmFsdWVPZiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGIgPSBiLnZhbHVlT2YoKTtcbiAgICB9XG4gICAgLy8geCAhPT0geCBpcyBvbmx5IHRydWUgaWYgeCBpcyBOYU4uIE5hTiBpcyBcImluY29tcGFyYWJsZVwiIGFuZCBib3RoXG4gICAgLy8gZXF1aXZhbGVudCBhbmQgaW5jb21wYXJhYmxlIHZhbHVlcyBhbHdheXMgcmV0dXJuIDAuXG4gICAgaWYgKGEgPT09IGIgfHwgYSAhPT0gYSB8fCBiICE9PSBiKVxuICAgICAgICByZXR1cm4gMDtcbiAgICB2YXIgYVR5cGUgPSB0eXBlb2YgYTtcbiAgICB2YXIgYlR5cGUgPSB0eXBlb2YgYjtcbiAgICBpZiAoYVR5cGUgPT09IFwibnVtYmVyXCIgJiYgYlR5cGUgPT09IFwibnVtYmVyXCIpXG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICBpZiAoYVR5cGUgPT09IFwic3RyaW5nXCIgJiYgYlR5cGUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiBhIDwgYiA/IC1JbmZpbml0eSA6IEluZmluaXR5O1xuICAgICAgICAvLyB0aGUgcG9zc2liaWxpdHkgb2YgZXF1YWxpdHkgZWxpbWlhdGVkIGFib3ZlXG4gICAgY29tcGFyZSA9IGNvbXBhcmUgfHwgbW9kdWxlLmV4cG9ydHM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYSkgJiYgQXJyYXkuaXNBcnJheShiKSkge1xuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBhKSB7XG4gICAgICAgICAgICBpZiAoIShpbmRleCBpbiBiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlmZmVyZW5jZSA9IGNvbXBhcmUoYVtpbmRleF0sIGJbaW5kZXhdLCBjb21wYXJlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gYikge1xuICAgICAgICAgICAgaWYgKCEoaW5kZXggaW4gYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLUluZmluaXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoYSAmJiB0eXBlb2YgYS5jb21wYXJlID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBhLmNvbXBhcmUoYiwgY29tcGFyZSk7XG4gICAgLy8gbm90IGNvbW11dGF0aXZlLCB0aGUgcmVsYXRpb25zaGlwIGlzIHJldmVyc2VkXG4gICAgaWYgKGIgJiYgdHlwZW9mIGIuY29tcGFyZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gLWIuY29tcGFyZShhLCBjb21wYXJlKTtcbiAgICByZXR1cm4gMDtcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBNaW5pTWFwID0gcmVxdWlyZShcIm1pbmktbWFwXCIpO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICAgIFBlcmZvcm1zIGEgcG9seW1vcnBoaWMsIHR5cGUtc2Vuc2l0aXZlIGRlZXAgZXF1aXZhbGVuY2UgY29tcGFyaXNvbiBvZiBhbnlcbiAgICB0d28gdmFsdWVzLlxuXG4gICAgPHA+QXMgYSBiYXNpYyBwcmluY2lwbGUsIGFueSB2YWx1ZSBpcyBlcXVpdmFsZW50IHRvIGl0c2VsZiAoYXMgaW5cbiAgICBpZGVudGl0eSksIGFueSBib3hlZCB2ZXJzaW9uIG9mIGl0c2VsZiAoYXMgYSA8Y29kZT5uZXcgTnVtYmVyKDEwKTwvY29kZT4gaXNcbiAgICB0byAxMCksIGFuZCBhbnkgZGVlcCBjbG9uZSBvZiBpdHNlbGYuXG5cbiAgICA8cD5FcXVpdmFsZW5jZSBoYXMgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuXG4gICAgPHVsPlxuICAgICAgICA8bGk+PHN0cm9uZz5wb2x5bW9ycGhpYzo8L3N0cm9uZz5cbiAgICAgICAgICAgIElmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgYSB0eXBlIHRoYXQgaW1wbGVtZW50cyBhXG4gICAgICAgICAgICBtZXRob2RzIG5hbWVkIFwiZXF1YWxzXCIsIHRoaXMgZnVuY3Rpb24gZGVmZXJzIHRvIHRoZSBtZXRob2QuICBTbyxcbiAgICAgICAgICAgIHRoaXMgZnVuY3Rpb24gY2FuIHNhZmVseSBjb21wYXJlIGFueSB2YWx1ZXMgcmVnYXJkbGVzcyBvZiB0eXBlLFxuICAgICAgICAgICAgaW5jbHVkaW5nIHVuZGVmaW5lZCwgbnVsbCwgbnVtYmVycywgc3RyaW5ncywgYW55IHBhaXIgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgd2hlcmUgZWl0aGVyIGltcGxlbWVudHMgXCJlcXVhbHNcIiwgb3Igb2JqZWN0IGxpdGVyYWxzIHRoYXQgbWF5IGV2ZW5cbiAgICAgICAgICAgIGNvbnRhaW4gYW4gXCJlcXVhbHNcIiBrZXkuXG4gICAgICAgIDxsaT48c3Ryb25nPnR5cGUtc2Vuc2l0aXZlOjwvc3Ryb25nPlxuICAgICAgICAgICAgSW5jb21wYXJhYmxlIHR5cGVzIGFyZSBub3QgZXF1YWwuICBObyBvYmplY3QgaXMgZXF1aXZhbGVudCB0byBhbnlcbiAgICAgICAgICAgIGFycmF5LiAgTm8gc3RyaW5nIGlzIGVxdWFsIHRvIGFueSBvdGhlciBudW1iZXIuXG4gICAgICAgIDxsaT48c3Ryb25nPmRlZXA6PC9zdHJvbmc+XG4gICAgICAgICAgICBDb2xsZWN0aW9ucyB3aXRoIGVxdWl2YWxlbnQgY29udGVudCBhcmUgZXF1aXZhbGVudCwgcmVjdXJzaXZlbHkuXG4gICAgICAgIDxsaT48c3Ryb25nPmVxdWl2YWxlbmNlOjwvc3Ryb25nPlxuICAgICAgICAgICAgSWRlbnRpY2FsIHZhbHVlcyBhbmQgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgYnV0IHNvIGFyZSBjb2xsZWN0aW9uc1xuICAgICAgICAgICAgdGhhdCBjb250YWluIGVxdWl2YWxlbnQgY29udGVudC4gIFdoZXRoZXIgb3JkZXIgaXMgaW1wb3J0YW50IHZhcmllc1xuICAgICAgICAgICAgYnkgdHlwZS4gIEZvciBBcnJheXMgYW5kIGxpc3RzLCBvcmRlciBpcyBpbXBvcnRhbnQuICBGb3IgT2JqZWN0cyxcbiAgICAgICAgICAgIG1hcHMsIGFuZCBzZXRzLCBvcmRlciBpcyBub3QgaW1wb3J0YW50LiAgQm94ZWQgb2JqZWN0cyBhcmUgbXV0YWxseVxuICAgICAgICAgICAgZXF1aXZhbGVudCB3aXRoIHRoZWlyIHVuYm94ZWQgdmFsdWVzLCBieSB2aXJ0dWUgb2YgdGhlIHN0YW5kYXJkXG4gICAgICAgICAgICA8Y29kZT52YWx1ZU9mPC9jb2RlPiBtZXRob2QuXG4gICAgPC91bD5cbiAgICBAcGFyYW0gdGhpc1xuICAgIEBwYXJhbSB0aGF0XG4gICAgQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgdGhlIHZhbHVlcyBhcmUgZGVlcGx5IGVxdWl2YWxlbnRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFscztcbmZ1bmN0aW9uIGVxdWFscyhhLCBiLCBlcXVhbHMsIG1lbW8pIHtcbiAgICBlcXVhbHMgPSBlcXVhbHMgfHwgbW9kdWxlLmV4cG9ydHM7XG4gICAgLy8gdW5ib3ggb2JqZWN0c1xuICAgIGlmIChhICYmIHR5cGVvZiBhLnZhbHVlT2YgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBhID0gYS52YWx1ZU9mKCk7XG4gICAgfVxuICAgIGlmIChiICYmIHR5cGVvZiBiLnZhbHVlT2YgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBiID0gYi52YWx1ZU9mKCk7XG4gICAgfVxuICAgIGlmIChhID09PSBiKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyBOYU4gIT09IE5hTiwgYnV0IHRoZXkgYXJlIGVxdWFsLlxuICAgIC8vIE5hTnMgYXJlIHRoZSBvbmx5IG5vbi1yZWZsZXhpdmUgdmFsdWUsIGkuZS4sIGlmIHggIT09IHgsXG4gICAgLy8gdGhlbiB4IGlzIGEgTmFOLlxuICAgIC8vIGlzTmFOIGlzIGJyb2tlbjogaXQgY29udmVydHMgaXRzIGFyZ3VtZW50IHRvIG51bWJlciwgc29cbiAgICAvLyBpc05hTihcImZvb1wiKSA9PiB0cnVlXG4gICAgLy8gV2UgaGF2ZSBlc3RhYmxpc2hlZCB0aGF0IGEgIT09IGIsIGJ1dCBpZiBhICE9PSBhICYmIGIgIT09IGIsIHRoZXkgYXJlXG4gICAgLy8gYm90aCBOYU4uXG4gICAgaWYgKGEgIT09IGEgJiYgYiAhPT0gYilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKCFhIHx8ICFiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHR5cGVvZiBhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG1lbW8gPSBtZW1vIHx8IG5ldyBNaW5pTWFwKCk7XG4gICAgICAgIGlmIChtZW1vLmhhcyhhKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbWVtby5zZXQoYSwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYS5lcXVhbHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gYS5lcXVhbHMoYiwgZXF1YWxzLCBtZW1vKTtcbiAgICB9XG4gICAgLy8gY29tbXV0YXRpdmVcbiAgICBpZiAodHlwZW9mIGIuZXF1YWxzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGIuZXF1YWxzKGEsIGVxdWFscywgbWVtbyk7XG4gICAgfVxuICAgIGlmICgoQXJyYXkuaXNBcnJheShhKSB8fCBBcnJheS5pc0FycmF5KGIpKSAmJiBhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZ2V0UHJvdG90eXBlT2YoYSkgPT09IG9iamVjdFByb3RvdHlwZSAmJlxuICAgICAgICAgICAgZ2V0UHJvdG90eXBlT2YoYikgPT09IG9iamVjdFByb3RvdHlwZSB8fFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShhKSB8fFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShiKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gYSkge1xuICAgICAgICAgICAgICAgIGlmICghZXF1YWxzKGFbbmFtZV0sIGJbbmFtZV0sIGVxdWFscywgbWVtbykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gYikge1xuICAgICAgICAgICAgICAgIGlmICghKG5hbWUgaW4gYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy8gQmVjYXVzZSBhIHJldHVybiB2YWx1ZSBvZiAwIGZyb20gYSBgY29tcGFyZWAgZnVuY3Rpb24gIG1heSBtZWFuIGVpdGhlclxuLy8gXCJlcXVhbHNcIiBvciBcImlzIGluY29tcGFyYWJsZVwiLCBgZXF1YWxzYCBjYW5ub3QgYmUgZGVmaW5lZCBpbiB0ZXJtcyBvZlxuLy8gYGNvbXBhcmVgLiAgSG93ZXZlciwgYGNvbXBhcmVgICpjYW4qIGJlIGRlZmluZWQgaW4gdGVybXMgb2YgYGVxdWFsc2AgYW5kXG4vLyBgbGVzc1RoYW5gLiAgQWdhaW4gaG93ZXZlciwgbW9yZSBvZnRlbiBpdCB3b3VsZCBiZSBkZXNpcmFibGUgdG8gaW1wbGVtZW50XG4vLyBhbGwgb2YgdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25zIGluIHRlcm1zIG9mIGNvbXBhcmUgcmF0aGVyIHRoYW4gdGhlIG90aGVyXG4vLyB3YXkgYXJvdW5kLlxuXG4iLCIvKlxuICogQmFzZWQgaW4gcGFydCBvbiBvYnNlcnZhYmxlIGFycmF5cyBmcm9tIE1vdG9yb2xhIE1vYmlsaXR54oCZcyBNb250YWdlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIE1vdG9yb2xhIE1vYmlsaXR5IExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAzLUNsYXVzZSBCU0QgTGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21vdG9yb2xhLW1vYmlsaXR5L21vbnRhZ2UvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgcmVzcG9uc2libGUgZm9yIG9ic2VydmluZyBjaGFuZ2VzIHRvIG93bmVkIHByb3BlcnRpZXMgb2ZcbiAqIG9iamVjdHMgYW5kIGNoYW5nZXMgdG8gdGhlIGNvbnRlbnQgb2YgYXJyYXlzIGNhdXNlZCBieSBtZXRob2QgY2FsbHMuIFRoZVxuICogaW50ZXJmYWNlIGZvciBvYnNlcnZpbmcgYXJyYXkgY29udGVudCBjaGFuZ2VzIGVzdGFibGlzaGVzIHRoZSBtZXRob2RzXG4gKiBuZWNlc3NhcnkgZm9yIGFueSBjb2xsZWN0aW9uIHdpdGggb2JzZXJ2YWJsZSBjb250ZW50LlxuICovXG5cbnZhciBPbyA9IHJlcXVpcmUoXCIuL29ic2VydmFibGUtb2JqZWN0XCIpO1xudmFyIE9yID0gcmVxdWlyZShcIi4vb2JzZXJ2YWJsZS1yYW5nZVwiKTtcbnZhciBPbSA9IHJlcXVpcmUoXCIuL29ic2VydmFibGUtbWFwXCIpO1xuXG52YXIgYXJyYXlfc3dhcCA9IHJlcXVpcmUoXCJwb3Atc3dhcC9zd2FwXCIpO1xudmFyIGFycmF5X3NwbGljZSA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2U7XG52YXIgYXJyYXlfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgYXJyYXlfcmV2ZXJzZSA9IEFycmF5LnByb3RvdHlwZS5yZXZlcnNlO1xudmFyIGFycmF5X3NvcnQgPSBBcnJheS5wcm90b3R5cGUuc29ydDtcbnZhciBhcnJheV9lbXB0eSA9IFtdO1xuXG52YXIgb2JzZXJ2YWJsZUFycmF5UHJvcGVydGllcyA9IHtcblxuICAgIHN3YXA6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN3YXAoc3RhcnQsIG1pbnVzTGVuZ3RoLCBwbHVzKSB7XG4gICAgICAgICAgICBpZiAocGx1cykge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwbHVzKSkge1xuICAgICAgICAgICAgICAgICAgICBwbHVzID0gYXJyYXlfc2xpY2UuY2FsbChwbHVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBsdXMgPSBhcnJheV9lbXB0eTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5sZW5ndGggKyBzdGFydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBob2xlcyA9IHN0YXJ0IC0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1BsdXMgPSBBcnJheShob2xlcyArIHBsdXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IGhvbGVzOyBpIDwgcGx1cy5sZW5ndGg7IGkrKywgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpIGluIHBsdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BsdXNbal0gPSBwbHVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsdXMgPSBuZXdQbHVzO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGFydCArIG1pbnVzTGVuZ3RoID4gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBUcnVuY2F0ZSBtaW51cyBsZW5ndGggaWYgaXQgZXh0ZW5kcyBiZXlvbmQgdGhlIGxlbmd0aFxuICAgICAgICAgICAgICAgIG1pbnVzTGVuZ3RoID0gdGhpcy5sZW5ndGggLSBzdGFydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWludXNMZW5ndGggPCAwKSB7XG4gICAgICAgICAgICAgICAgLy8gSXQgaXMgdGhlIEphdmFTY3JpcHQgd2F5LlxuICAgICAgICAgICAgICAgIG1pbnVzTGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1pbnVzO1xuICAgICAgICAgICAgaWYgKG1pbnVzTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gbWludXMgd2lsbCBiZSBlbXB0eVxuICAgICAgICAgICAgICAgIGlmIChwbHVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IGlmIHBsdXMgaXMgZW1wdHkgdGhlcmUgaXMgbm90aGluZyB0byBkby5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdOyAvLyBbXSwgYnV0IHNwYXJlIHVzIGFuIGluc3RhbnRpYXRpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWludXMgPSBhcnJheV9lbXB0eTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWludXMgPSBhcnJheV9zbGljZS5jYWxsKHRoaXMsIHN0YXJ0LCBzdGFydCArIG1pbnVzTGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpZmYgPSBwbHVzLmxlbmd0aCAtIG1pbnVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBvbGRMZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBuZXdMZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCArIGRpZmYsIHN0YXJ0ICsgcGx1cy5sZW5ndGgpO1xuICAgICAgICAgICAgdmFyIGxvbmdlc3QgPSBNYXRoLm1heChvbGRMZW5ndGgsIG5ld0xlbmd0aCk7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZWRMZW5ndGggPSBNYXRoLm1pbihsb25nZXN0LCB0aGlzLm9ic2VydmVkTGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gZGlzcGF0Y2ggYmVmb3JlIGNoYW5nZSBldmVudHNcbiAgICAgICAgICAgIGlmIChkaWZmKSB7XG4gICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgXCJsZW5ndGhcIiwgbmV3TGVuZ3RoLCBvbGRMZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT3IuZGlzcGF0Y2hSYW5nZVdpbGxDaGFuZ2UodGhpcywgcGx1cywgbWludXMsIHN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChkaWZmID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU3Vic3RyaW5nIHJlcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0LCBqID0gMDsgaSA8IHN0YXJ0ICsgcGx1cy5sZW5ndGg7IGkrKywgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVzW2pdICE9PSBtaW51c1tqXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgaSwgcGx1c1tqXSwgbWludXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKHRoaXMsIFwidXBkYXRlXCIsIGksIHBsdXNbal0sIG1pbnVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWxsIHN1YnNlcXVlbnQgdmFsdWVzIGNoYW5nZWQgb3Igc2hpZnRlZC5cbiAgICAgICAgICAgICAgICAvLyBBdm9pZCAob2JzZXJ2ZWRMZW5ndGggLSBzdGFydCkgbG9uZyB3YWxrcyBpZiB0aGVyZSBhcmUgbm9cbiAgICAgICAgICAgICAgICAvLyByZWdpc3RlcmVkIGRlc2NyaXB0b3JzLlxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydCwgaiA9IDA7IGkgPCBvYnNlcnZlZExlbmd0aDsgaSsrLCBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBvbGRMZW5ndGggJiYgaSA8IG5ld0xlbmd0aCkgeyAvLyB1cGRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgcGx1cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGx1c1tqXSAhPT0gdGhpc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5V2lsbENoYW5nZSh0aGlzLCBpLCBwbHVzW2pdLCB0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKHRoaXMsIFwidXBkYXRlXCIsIGksIHBsdXNbal0sIHRoaXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbaSAtIGRpZmZdICE9PSB0aGlzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKHRoaXMsIGksIHRoaXNbaSAtIGRpZmZdLCB0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKHRoaXMsIFwidXBkYXRlXCIsIGksIHRoaXNbaSAtIGRpZmZdLCB0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IG5ld0xlbmd0aCkgeyAvLyBidXQgaSA+PSBvbGRMZW5ndGgsIGNyZWF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBwbHVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbHVzW2pdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgaSwgcGx1c1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwV2lsbENoYW5nZSh0aGlzLCBcImNyZWF0ZVwiLCBpLCBwbHVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbaSAtIGRpZmZdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgaSwgdGhpc1tpIC0gZGlmZl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbS5kaXNwYXRjaE1hcFdpbGxDaGFuZ2UodGhpcywgXCJjcmVhdGVcIiwgaSwgdGhpc1tpIC0gZGlmZl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPCBvbGRMZW5ndGgpIHsgLy8gYnV0IGkgPj0gbmV3TGVuZ3RoLCBkZWxldGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5V2lsbENoYW5nZSh0aGlzLCBpLCB2b2lkIDAsIHRoaXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKHRoaXMsIFwiZGVsZXRlXCIsIGksIHZvaWQgMCwgdGhpc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3NlcnRpb24gZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFjdHVhbCB3b3JrXG4gICAgICAgICAgICBhcnJheV9zd2FwKHRoaXMsIHN0YXJ0LCBtaW51c0xlbmd0aCwgcGx1cyk7XG5cbiAgICAgICAgICAgIC8vIGRpc3BhdGNoIGFmdGVyIGNoYW5nZSBldmVudHNcbiAgICAgICAgICAgIGlmIChkaWZmID09PSAwKSB7IC8vIHN1YnN0cmluZyByZXBsYWNlbWVudFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydCwgaiA9IDA7IGkgPCBzdGFydCArIHBsdXMubGVuZ3RoOyBpKyssIGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGx1c1tqXSAhPT0gbWludXNbal0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlDaGFuZ2UodGhpcywgaSwgcGx1c1tqXSwgbWludXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBDaGFuZ2UodGhpcywgXCJ1cGRhdGVcIiwgaSwgcGx1c1tqXSwgbWludXNbal0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBbGwgc3Vic2VxdWVudCB2YWx1ZXMgY2hhbmdlZCBvciBzaGlmdGVkLlxuICAgICAgICAgICAgICAgIC8vIEF2b2lkIChvYnNlcnZlZExlbmd0aCAtIHN0YXJ0KSBsb25nIHdhbGtzIGlmIHRoZXJlIGFyZSBub1xuICAgICAgICAgICAgICAgIC8vIHJlZ2lzdGVyZWQgZGVzY3JpcHRvcnMuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0LCBqID0gMDsgaSA8IG9ic2VydmVkTGVuZ3RoOyBpKyssIGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IG9sZExlbmd0aCAmJiBpIDwgbmV3TGVuZ3RoKSB7IC8vIHVwZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBtaW51cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSAhPT0gbWludXNbal0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSh0aGlzLCBpLCB0aGlzW2ldLCBtaW51c1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwQ2hhbmdlKHRoaXMsIFwidXBkYXRlXCIsIGksIHRoaXNbaV0sIG1pbnVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldICE9PSB0aGlzW2kgKyBkaWZmXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIGksIHRoaXNbaV0sIHRoaXNbaSArIGRpZmZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBDaGFuZ2UodGhpcywgXCJ1cGRhdGVcIiwgaSwgdGhpc1tpXSwgdGhpc1tpICsgZGlmZl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgbmV3TGVuZ3RoKSB7IC8vIGJ1dCBpID49IG9sZExlbmd0aCwgY3JlYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA8IG1pbnVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldICE9PSBtaW51c1tqXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIGksIHRoaXNbaV0sIG1pbnVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT20uZGlzcGF0Y2hNYXBDaGFuZ2UodGhpcywgXCJjcmVhdGVcIiwgaSwgdGhpc1tpXSwgbWludXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSAhPT0gdGhpc1tpICsgZGlmZl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT28uZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSh0aGlzLCBpLCB0aGlzW2ldLCB0aGlzW2kgKyBkaWZmXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwQ2hhbmdlKHRoaXMsIFwiY3JlYXRlXCIsIGksIHRoaXNbaV0sIHRoaXNbaSArIGRpZmZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgb2xkTGVuZ3RoKSB7IC8vIGJ1dCBpID49IG5ld0xlbmd0aCwgZGVsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA8IG1pbnVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW51c1tqXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9vLmRpc3BhdGNoUHJvcGVydHlDaGFuZ2UodGhpcywgaSwgdm9pZCAwLCBtaW51c1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9tLmRpc3BhdGNoTWFwQ2hhbmdlKHRoaXMsIFwiZGVsZXRlXCIsIGksIHZvaWQgMCwgbWludXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpICsgZGlmZl0gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIGksIHZvaWQgMCwgdGhpc1tpICsgZGlmZl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbS5kaXNwYXRjaE1hcENoYW5nZSh0aGlzLCBcImRlbGV0ZVwiLCBpLCB2b2lkIDAsIHRoaXNbaSArIGRpZmZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFzc2VydGlvbiBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT3IuZGlzcGF0Y2hSYW5nZUNoYW5nZSh0aGlzLCBwbHVzLCBtaW51cywgc3RhcnQpO1xuICAgICAgICAgICAgaWYgKGRpZmYpIHtcbiAgICAgICAgICAgICAgICBPby5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIFwibGVuZ3RoXCIsIG5ld0xlbmd0aCwgb2xkTGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBzcGxpY2U6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNwbGljZShzdGFydCwgbWludXNMZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnNsaWNlKHN0YXJ0LCBzdGFydCArIG1pbnVzTGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuc3dhcC5jYWxsKHRoaXMsIHN0YXJ0LCBtaW51c0xlbmd0aCwgYXJyYXlfc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgLy8gc3BsaWNlIGlzIHRoZSBhcnJheSBjb250ZW50IGNoYW5nZSB1dGlsaXR5IGJlbHQuICBmb3J3YXJkIGFsbCBvdGhlclxuICAgIC8vIGNvbnRlbnQgY2hhbmdlcyB0byBzcGxpY2Ugc28gd2Ugb25seSBoYXZlIHRvIHdyaXRlIG9ic2VydmVyIGNvZGUgaW4gb25lXG4gICAgLy8gcGxhY2VcblxuICAgIHJldmVyc2U6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgICAgICAgICB2YXIgcmV2ZXJzZWQgPSB0aGlzLnNsaWNlKCk7XG4gICAgICAgICAgICByZXZlcnNlZC5yZXZlcnNlKCk7XG4gICAgICAgICAgICB0aGlzLnN3YXAoMCwgdGhpcy5sZW5ndGgsIHJldmVyc2VkKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIHNvcnQ6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNvcnQoKSB7XG4gICAgICAgICAgICB2YXIgc29ydGVkID0gdGhpcy5zbGljZSgpO1xuICAgICAgICAgICAgYXJyYXlfc29ydC5hcHBseShzb3J0ZWQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB0aGlzLnN3YXAoMCwgdGhpcy5sZW5ndGgsIHNvcnRlZCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBzZXQ6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhcChpbmRleCwgaW5kZXggPj0gdGhpcy5sZW5ndGggPyAwIDogMSwgW3ZhbHVlXSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBzaGlmdDoge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2hpZnQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXAoMCwgMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBwb3A6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBvcCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgdGhpcy5zd2FwKHRoaXMubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBwdXNoOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwdXNoKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnN3YXAodGhpcy5sZW5ndGgsIDAsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgdW5zaGlmdDoge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdW5zaGlmdCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zd2FwKDAsIDAsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgY2xlYXI6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgdGhpcy5zd2FwKDAsIHRoaXMubGVuZ3RoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cblxufTtcblxudmFyIGhpZGRlblByb3BlcnR5ID0ge1xuICAgIHZhbHVlOiBudWxsLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufTtcblxudmFyIG9ic2VydmFibGVBcnJheU93blByb3BlcnRpZXMgPSB7XG4gICAgb2JzZXJ2ZWQ6IGhpZGRlblByb3BlcnR5LFxuICAgIG9ic2VydmVkTGVuZ3RoOiBoaWRkZW5Qcm9wZXJ0eSxcblxuICAgIHByb3BlcnR5T2JzZXJ2ZXJzOiBoaWRkZW5Qcm9wZXJ0eSxcbiAgICB3cmFwcGVkUHJvcGVydHlEZXNjcmlwdG9yczogaGlkZGVuUHJvcGVydHksXG5cbiAgICByYW5nZUNoYW5nZU9ic2VydmVyczogaGlkZGVuUHJvcGVydHksXG4gICAgcmFuZ2VXaWxsQ2hhbmdlT2JzZXJ2ZXJzOiBoaWRkZW5Qcm9wZXJ0eSxcbiAgICBkaXNwYXRjaGVzUmFuZ2VDaGFuZ2VzOiBoaWRkZW5Qcm9wZXJ0eSxcblxuICAgIG1hcENoYW5nZU9ic2VydmVyczogaGlkZGVuUHJvcGVydHksXG4gICAgbWFwV2lsbENoYW5nZU9ic2VydmVyczogaGlkZGVuUHJvcGVydHksXG4gICAgZGlzcGF0Y2hlc01hcENoYW5nZXM6IGhpZGRlblByb3BlcnR5XG59O1xuXG4vLyB1c2UgZGlmZmVyZW50IHN0cmF0ZWdpZXMgZm9yIG1ha2luZyBhcnJheXMgb2JzZXJ2YWJsZSBiZXR3ZWVuIEludGVybmV0XG4vLyBFeHBsb3JlciBhbmQgb3RoZXIgYnJvd3NlcnMuXG52YXIgcHJvdG9Jc1N1cHBvcnRlZCA9IHt9Ll9fcHJvdG9fXyA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBiZXN0b3dPYnNlcnZhYmxlQXJyYXlQcm9wZXJ0aWVzO1xuaWYgKHByb3RvSXNTdXBwb3J0ZWQpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZUFycmF5UHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShBcnJheS5wcm90b3R5cGUsIG9ic2VydmFibGVBcnJheVByb3BlcnRpZXMpO1xuICAgIGJlc3Rvd09ic2VydmFibGVBcnJheVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgYXJyYXkuX19wcm90b19fID0gb2JzZXJ2YWJsZUFycmF5UHJvdG90eXBlO1xuICAgIH07XG59IGVsc2Uge1xuICAgIGJlc3Rvd09ic2VydmFibGVBcnJheVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoYXJyYXksIG9ic2VydmFibGVBcnJheVByb3BlcnRpZXMpO1xuICAgIH07XG59XG5cbmV4cG9ydHMubWFrZUFycmF5T2JzZXJ2YWJsZSA9IG1ha2VBcnJheU9ic2VydmFibGU7XG5mdW5jdGlvbiBtYWtlQXJyYXlPYnNlcnZhYmxlKGFycmF5KSB7XG4gICAgaWYgKGFycmF5Lm9ic2VydmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYmVzdG93T2JzZXJ2YWJsZUFycmF5UHJvcGVydGllcyhhcnJheSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoYXJyYXksIG9ic2VydmFibGVBcnJheU93blByb3BlcnRpZXMpO1xuICAgIGFycmF5Lm9ic2VydmVkTGVuZ3RoID0gMDtcbiAgICBhcnJheS5vYnNlcnZlZCA9IHRydWU7XG59XG5cbi8vIEZvciBPYnNlcnZhYmxlT2JqZWN0XG5leHBvcnRzLm1ha2VQcm9wZXJ0eU9ic2VydmFibGUgPSBtYWtlUHJvcGVydHlPYnNlcnZhYmxlO1xuZnVuY3Rpb24gbWFrZVByb3BlcnR5T2JzZXJ2YWJsZShhcnJheSwgaW5kZXgpIHtcbiAgICBtYWtlQXJyYXlPYnNlcnZhYmxlKGFycmF5KTtcbiAgICBpZiAofn5pbmRleCA9PT0gaW5kZXggJiYgaW5kZXggPj0gMCkgeyAvLyBOb3RlOiBOYU4gIT09IE5hTiwgfn5cImZvb1wiICE9PSBcImZvb1wiXG4gICAgICAgIG1ha2VJbmRleE9ic2VydmFibGUoYXJyYXksIGluZGV4KTtcbiAgICB9XG59XG5cbi8vIEZvciBPYnNlcnZhYmxlUmFuZ2VcbmV4cG9ydHMubWFrZVJhbmdlQ2hhbmdlc09ic2VydmFibGUgPSBtYWtlUmFuZ2VDaGFuZ2VzT2JzZXJ2YWJsZTtcbmZ1bmN0aW9uIG1ha2VSYW5nZUNoYW5nZXNPYnNlcnZhYmxlKGFycmF5KSB7XG4gICAgbWFrZUFycmF5T2JzZXJ2YWJsZShhcnJheSk7XG59XG5cbi8vIEZvciBPYnNlcnZhYmxlTWFwXG5leHBvcnRzLm1ha2VNYXBDaGFuZ2VzT2JzZXJ2YWJsZSA9IG1ha2VNYXBDaGFuZ2VzT2JzZXJ2YWJsZTtcbmZ1bmN0aW9uIG1ha2VNYXBDaGFuZ2VzT2JzZXJ2YWJsZShhcnJheSkge1xuICAgIG1ha2VBcnJheU9ic2VydmFibGUoYXJyYXkpO1xuICAgIG1ha2VJbmRleE9ic2VydmFibGUoYXJyYXksIEluZmluaXR5KTtcbn1cblxuZnVuY3Rpb24gbWFrZUluZGV4T2JzZXJ2YWJsZShhcnJheSwgaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPj0gYXJyYXkub2JzZXJ2ZWRMZW5ndGgpIHtcbiAgICAgICAgYXJyYXkub2JzZXJ2ZWRMZW5ndGggPSBpbmRleCArIDE7XG4gICAgfVxufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9ic2VydmVyRnJlZUxpc3QgPSBbXTtcbnZhciBvYnNlcnZlclRvRnJlZUxpc3QgPSBbXTtcbnZhciBkaXNwYXRjaGluZyA9IGZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic2VydmFibGVNYXA7XG5mdW5jdGlvbiBPYnNlcnZhYmxlTWFwKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNvbnN0cnVjdC4gT2JzZXJ2YWJsZU1hcCBpcyBhIG1peGluLlwiKTtcbn1cblxuT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUub2JzZXJ2ZU1hcENoYW5nZSA9IGZ1bmN0aW9uIChoYW5kbGVyLCBuYW1lLCBub3RlLCBjYXB0dXJlKSB7XG4gICAgcmV0dXJuIG9ic2VydmVNYXBDaGFuZ2UodGhpcywgaGFuZGxlciwgbmFtZSwgbm90ZSwgY2FwdHVyZSk7XG59O1xuXG5PYnNlcnZhYmxlTWFwLnByb3RvdHlwZS5vYnNlcnZlTWFwV2lsbENoYW5nZSA9IGZ1bmN0aW9uIChoYW5kbGVyLCBuYW1lLCBub3RlKSB7XG4gICAgcmV0dXJuIG9ic2VydmVNYXBDaGFuZ2UodGhpcywgaGFuZGxlciwgbmFtZSwgbm90ZSwgdHJ1ZSk7XG59O1xuXG5PYnNlcnZhYmxlTWFwLnByb3RvdHlwZS5kaXNwYXRjaE1hcENoYW5nZSA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHBsdXMsIG1pbnVzLCBjYXB0dXJlKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoTWFwQ2hhbmdlKHRoaXMsIHR5cGUsIGtleSwgcGx1cywgbWludXMsIGNhcHR1cmUpO1xufTtcblxuT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcGx1cywgbWludXMpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hNYXBXaWxsQ2hhbmdlKHRoaXMsIHR5cGUsIGtleSwgcGx1cywgbWludXMsIHRydWUpO1xufTtcblxuT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuZ2V0TWFwQ2hhbmdlT2JzZXJ2ZXJzID0gZnVuY3Rpb24gKGNhcHR1cmUpIHtcbiAgICByZXR1cm4gZ2V0TWFwQ2hhbmdlT2JzZXJ2ZXJzKHRoaXMsIGNhcHR1cmUpO1xufTtcblxuT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuZ2V0TWFwV2lsbENoYW5nZU9ic2VydmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0TWFwQ2hhbmdlT2JzZXJ2ZXJzKHRoaXMsIHRydWUpO1xufTtcblxuT2JzZXJ2YWJsZU1hcC5vYnNlcnZlTWFwQ2hhbmdlID0gb2JzZXJ2ZU1hcENoYW5nZTtcbmZ1bmN0aW9uIG9ic2VydmVNYXBDaGFuZ2Uob2JqZWN0LCBoYW5kbGVyLCBuYW1lLCBub3RlLCBjYXB0dXJlKSB7XG4gICAgbWFrZU1hcENoYW5nZXNPYnNlcnZhYmxlKG9iamVjdCk7XG4gICAgdmFyIG9ic2VydmVycyA9IGdldE1hcENoYW5nZU9ic2VydmVycyhvYmplY3QsIGNhcHR1cmUpO1xuXG4gICAgdmFyIG9ic2VydmVyO1xuICAgIGlmIChvYnNlcnZlckZyZWVMaXN0Lmxlbmd0aCkgeyAvLyBUT0RPICFkZWJ1Zz9cbiAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlckZyZWVMaXN0LnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic2VydmVyID0gbmV3IE1hcENoYW5nZU9ic2VydmVyKCk7XG4gICAgfVxuXG4gICAgb2JzZXJ2ZXIub2JqZWN0ID0gb2JqZWN0O1xuICAgIG9ic2VydmVyLm5hbWUgPSBuYW1lO1xuICAgIG9ic2VydmVyLmNhcHR1cmUgPSBjYXB0dXJlO1xuICAgIG9ic2VydmVyLm9ic2VydmVycyA9IG9ic2VydmVycztcbiAgICBvYnNlcnZlci5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICBvYnNlcnZlci5ub3RlID0gbm90ZTtcblxuICAgIC8vIFByZWNvbXB1dGUgZGlzcGF0Y2ggbWV0aG9kIG5hbWVcblxuICAgIHZhciBzdHJpbmdOYW1lID0gXCJcIiArIG5hbWU7IC8vIEFycmF5IGluZGljaWRlcyBtdXN0IGJlIGNvZXJjZWQgdG8gc3RyaW5nLlxuICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBzdHJpbmdOYW1lLnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmdOYW1lLnNsaWNlKDEpO1xuXG4gICAgaWYgKCFjYXB0dXJlKSB7XG4gICAgICAgIHZhciBtZXRob2ROYW1lID0gXCJoYW5kbGVcIiArIHByb3BlcnR5TmFtZSArIFwiTWFwQ2hhbmdlXCI7XG4gICAgICAgIGlmIChoYW5kbGVyW21ldGhvZE5hbWVdKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IG1ldGhvZE5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlci5oYW5kbGVNYXBDaGFuZ2UpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gXCJoYW5kbGVNYXBDaGFuZ2VcIjtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyLmNhbGwpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFycmFuZ2UgdG8gZGlzcGF0Y2ggbWFwIGNoYW5nZXMgdG8gXCIgKyBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtZXRob2ROYW1lID0gXCJoYW5kbGVcIiArIHByb3BlcnR5TmFtZSArIFwiTWFwV2lsbENoYW5nZVwiO1xuICAgICAgICBpZiAoaGFuZGxlclttZXRob2ROYW1lXSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBtZXRob2ROYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIuaGFuZGxlTWFwV2lsbENoYW5nZSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBcImhhbmRsZU1hcFdpbGxDaGFuZ2VcIjtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyLmNhbGwpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFycmFuZ2UgdG8gZGlzcGF0Y2ggbWFwIGNoYW5nZXMgdG8gXCIgKyBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcblxuICAgIC8vIFRPRE8gaXNzdWUgd2FybmluZyBpZiB0aGUgbnVtYmVyIG9mIGhhbmRsZXIgcmVjb3JkcyBpcyB3b3JyaXNvbWVcbiAgICByZXR1cm4gb2JzZXJ2ZXI7XG59XG5cbk9ic2VydmFibGVNYXAub2JzZXJ2ZU1hcFdpbGxDaGFuZ2UgPSBvYnNlcnZlTWFwV2lsbENoYW5nZTtcbmZ1bmN0aW9uIG9ic2VydmVNYXBXaWxsQ2hhbmdlKG9iamVjdCwgaGFuZGxlciwgbmFtZSwgbm90ZSkge1xuICAgIHJldHVybiBvYnNlcnZlTWFwQ2hhbmdlKG9iamVjdCwgaGFuZGxlciwgbmFtZSwgbm90ZSwgdHJ1ZSk7XG59XG5cbk9ic2VydmFibGVNYXAuZGlzcGF0Y2hNYXBDaGFuZ2UgPSBkaXNwYXRjaE1hcENoYW5nZTtcbmZ1bmN0aW9uIGRpc3BhdGNoTWFwQ2hhbmdlKG9iamVjdCwgdHlwZSwga2V5LCBwbHVzLCBtaW51cywgY2FwdHVyZSkge1xuICAgIGlmIChwbHVzID09PSBtaW51cykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZGlzcGF0Y2hpbmcpIHsgLy8gVE9ETyAmJiAhZGVidWc/XG4gICAgICAgIHJldHVybiBzdGFydE1hcENoYW5nZURpc3BhdGNoQ29udGV4dChvYmplY3QsIHR5cGUsIGtleSwgcGx1cywgbWludXMsIGNhcHR1cmUpO1xuICAgIH1cbiAgICB2YXIgb2JzZXJ2ZXJzID0gZ2V0TWFwQ2hhbmdlT2JzZXJ2ZXJzKG9iamVjdCwgY2FwdHVyZSk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IG9ic2VydmVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIG9ic2VydmVyID0gb2JzZXJ2ZXJzW2luZGV4XTtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzcGF0Y2godHlwZSwga2V5LCBwbHVzLCBtaW51cyk7XG4gICAgfVxufVxuXG5PYnNlcnZhYmxlTWFwLmRpc3BhdGNoTWFwV2lsbENoYW5nZSA9IGRpc3BhdGNoTWFwV2lsbENoYW5nZTtcbmZ1bmN0aW9uIGRpc3BhdGNoTWFwV2lsbENoYW5nZShvYmplY3QsIHR5cGUsIGtleSwgcGx1cywgbWludXMpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hNYXBDaGFuZ2Uob2JqZWN0LCB0eXBlLCBrZXksIHBsdXMsIG1pbnVzLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRNYXBDaGFuZ2VEaXNwYXRjaENvbnRleHQob2JqZWN0LCB0eXBlLCBrZXksIHBsdXMsIG1pbnVzLCBjYXB0dXJlKSB7XG4gICAgZGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAgIGRpc3BhdGNoTWFwQ2hhbmdlKG9iamVjdCwgdHlwZSwga2V5LCBwbHVzLCBtaW51cywgY2FwdHVyZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiTWFwIGNoYW5nZSBkaXNwYXRjaCBwb3NzaWJseSBjb3JydXB0ZWQgYnkgZXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFwIGNoYW5nZSBkaXNwYXRjaCBwb3NzaWJseSBjb3JydXB0ZWQgYnkgZXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKG9ic2VydmVyVG9GcmVlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFVzaW5nIHB1c2guYXBwbHkgaW5zdGVhZCBvZiBhZGRFYWNoIGJlY2F1c2UgcHVzaCB3aWxsIGRlZmluaXRlbHlcbiAgICAgICAgICAgIC8vIGJlIG11Y2ggZmFzdGVyIHRoYW4gdGhlIGdlbmVyaWMgYWRkRWFjaCwgd2hpY2ggYWxzbyBoYW5kbGVzXG4gICAgICAgICAgICAvLyBub24tYXJyYXkgY29sbGVjdGlvbnMuXG4gICAgICAgICAgICBvYnNlcnZlckZyZWVMaXN0LnB1c2guYXBwbHkoXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJGcmVlTGlzdCxcbiAgICAgICAgICAgICAgICBvYnNlcnZlclRvRnJlZUxpc3RcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyBVc2luZyBjbGVhciBiZWNhdXNlIGl0IGlzIG9ic2VydmFibGUuIFRoZSBoYW5kbGVyIHJlY29yZCBhcnJheVxuICAgICAgICAgICAgLy8gaXMgb2J0YWluYWJsZSBieSBnZXRQcm9wZXJ0eUNoYW5nZU9ic2VydmVycywgYW5kIGlzIG9ic2VydmFibGUuXG4gICAgICAgICAgICBvYnNlcnZlclRvRnJlZUxpc3QuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWFwQ2hhbmdlT2JzZXJ2ZXJzKG9iamVjdCwgY2FwdHVyZSkge1xuICAgIGlmIChjYXB0dXJlKSB7XG4gICAgICAgIGlmICghb2JqZWN0Lm1hcFdpbGxDaGFuZ2VPYnNlcnZlcnMpIHtcbiAgICAgICAgICAgIG9iamVjdC5tYXBXaWxsQ2hhbmdlT2JzZXJ2ZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdC5tYXBXaWxsQ2hhbmdlT2JzZXJ2ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghb2JqZWN0Lm1hcENoYW5nZU9ic2VydmVycykge1xuICAgICAgICAgICAgb2JqZWN0Lm1hcENoYW5nZU9ic2VydmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3QubWFwQ2hhbmdlT2JzZXJ2ZXJzO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWFwV2lsbENoYW5nZU9ic2VydmVycyhvYmplY3QpIHtcbiAgICByZXR1cm4gZ2V0TWFwQ2hhbmdlT2JzZXJ2ZXJzKG9iamVjdCwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VNYXBDaGFuZ2VzT2JzZXJ2YWJsZShvYmplY3QpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgIE9hLm1ha2VNYXBDaGFuZ2VzT2JzZXJ2YWJsZShvYmplY3QpO1xuICAgIH1cbiAgICBpZiAob2JqZWN0Lm1ha2VNYXBDaGFuZ2VzT2JzZXJ2YWJsZSkge1xuICAgICAgICBvYmplY3QubWFrZU1hcENoYW5nZXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuICAgIG9iamVjdC5kaXNwYXRjaGVzTWFwQ2hhbmdlcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIE1hcENoYW5nZU9ic2VydmVyKCkge1xuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5NYXBDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9iamVjdCA9IG51bGw7XG4gICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICB0aGlzLm9ic2VydmVycyA9IG51bGw7XG4gICAgdGhpcy5oYW5kbGVyID0gbnVsbDtcbiAgICB0aGlzLmhhbmRsZXJNZXRob2ROYW1lID0gbnVsbDtcbiAgICB0aGlzLmNoaWxkT2JzZXJ2ZXIgPSBudWxsO1xuICAgIHRoaXMubm90ZSA9IG51bGw7XG4gICAgdGhpcy5jYXB0dXJlID0gbnVsbDtcbn07XG5cbk1hcENoYW5nZU9ic2VydmVyLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzO1xuICAgIHZhciBpbmRleCA9IG9ic2VydmVycy5pbmRleE9mKHRoaXMpO1xuICAgIC8vIFVuZm9ydHVuYXRlbHksIGlmIHRoaXMgb2JzZXJ2ZXIgd2FzIHJldXNlZCwgdGhpcyB3b3VsZCBub3QgYmUgc3VmZmljaWVudFxuICAgIC8vIHRvIGRldGVjdCBhIGR1cGxpY2F0ZSBjYW5jZWwuIERvIG5vdCBjYW5jZWwgbW9yZSB0aGFuIG9uY2UuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIkNhbid0IGNhbmNlbCBvYnNlcnZlciBmb3IgXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5uYW1lKSArIFwiIG1hcCBjaGFuZ2VzXCIgK1xuICAgICAgICAgICAgXCIgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBiZWVuIGNhbmNlbGVkXCJcbiAgICAgICAgKTtcbiAgICB9XG4gICAgdmFyIGNoaWxkT2JzZXJ2ZXIgPSB0aGlzLmNoaWxkT2JzZXJ2ZXI7XG4gICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgLy8gSWYgdGhpcyBvYnNlcnZlciBpcyBjYW5jZWxlZCB3aGlsZSBkaXNwYXRjaGluZyBhIGNoYW5nZVxuICAgIC8vIG5vdGlmaWNhdGlvbiBmb3IgdGhlIHNhbWUgcHJvcGVydHkuLi5cbiAgICAvLyAxLiBXZSBjYW5ub3QgcHV0IHRoZSBoYW5kbGVyIHJlY29yZCBvbnRvIHRoZSBmcmVlIGxpc3QgYmVjYXVzZVxuICAgIC8vIGl0IG1heSBoYXZlIGJlZW4gY2FwdHVyZWQgaW4gdGhlIGFycmF5IG9mIHJlY29yZHMgdG8gd2hpY2hcbiAgICAvLyB0aGUgY2hhbmdlIG5vdGlmaWNhdGlvbiB3b3VsZCBiZSBzZW50LiBXZSBtdXN0IG1hcmsgaXQgYXNcbiAgICAvLyBjYW5jZWxlZCBieSBudWxsaW5nIG91dCB0aGUgaGFuZGxlciBwcm9wZXJ0eSBzbyB0aGUgZGlzcGF0Y2hlclxuICAgIC8vIHBhc3NlcyBvdmVyIGl0LlxuICAgIC8vIDIuIFdlIGFsc28gY2Fubm90IHB1dCB0aGUgaGFuZGxlciByZWNvcmQgb250byB0aGUgZnJlZSBsaXN0XG4gICAgLy8gdW50aWwgYWxsIGNoYW5nZSBkaXNwYXRjaGVzIGhhdmUgYmVlbiBjb21wbGV0ZWQgYmVjYXVzZSBpdCBjb3VsZFxuICAgIC8vIGNvbmNlaXZhYmx5IGJlIHJldXNlZCwgY29uZnVzaW5nIHRoZSBjdXJyZW50IGRpc3BhdGNoZXIuXG4gICAgaWYgKGRpc3BhdGNoaW5nKSB7XG4gICAgICAgIC8vIEFsbCBoYW5kbGVycyBhZGRlZCB0byB0aGlzIGxpc3Qgd2lsbCBiZSBtb3ZlZCBvdmVyIHRvIHRoZVxuICAgICAgICAvLyBhY3R1YWwgZnJlZSBsaXN0IHdoZW4gdGhlcmUgYXJlIG5vIGxvbmdlciBhbnkgcHJvcGVydHlcbiAgICAgICAgLy8gY2hhbmdlIGRpc3BhdGNoZXJzIG9uIHRoZSBzdGFjay5cbiAgICAgICAgb2JzZXJ2ZXJUb0ZyZWVMaXN0LnB1c2godGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JzZXJ2ZXJGcmVlTGlzdC5wdXNoKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hpbGRPYnNlcnZlcikge1xuICAgICAgICAvLyBDYWxsaW5nIHVzZXIgY29kZSBvbiBvdXIgc3RhY2suXG4gICAgICAgIC8vIERvbmUgaW4gdGFpbCBwb3NpdGlvbiB0byBhdm9pZCBhIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZC5cbiAgICAgICAgY2hpbGRPYnNlcnZlci5jYW5jZWwoKTtcbiAgICB9XG59O1xuXG5NYXBDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAodHlwZSwga2V5LCBwbHVzLCBtaW51cykge1xuICAgIHZhciBoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuICAgIC8vIEEgbnVsbCBoYW5kbGVyIGltcGxpZXMgdGhhdCBhbiBvYnNlcnZlciB3YXMgY2FuY2VsZWQgZHVyaW5nIHRoZSBkaXNwYXRjaFxuICAgIC8vIG9mIGEgY2hhbmdlLiBUaGUgb2JzZXJ2ZXIgaXMgcGVuZGluZyBhZGRpdGlvbiB0byB0aGUgZnJlZSBsaXN0LlxuICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkT2JzZXJ2ZXIgPSB0aGlzLmNoaWxkT2JzZXJ2ZXI7XG4gICAgdGhpcy5jaGlsZE9ic2VydmVyID0gbnVsbDtcbiAgICAvLyBYWFggcGxhbiBpbnRlcmZlcmVuY2UgaGF6YXJkcyBjYWxsaW5nIGNhbmNlbCBhbmQgaGFuZGxlciBtZXRob2RzOlxuICAgIGlmIChjaGlsZE9ic2VydmVyKSB7XG4gICAgICAgIGNoaWxkT2JzZXJ2ZXIuY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXJNZXRob2ROYW1lID0gdGhpcy5oYW5kbGVyTWV0aG9kTmFtZTtcbiAgICBpZiAoaGFuZGxlck1ldGhvZE5hbWUgJiYgdHlwZW9mIGhhbmRsZXJbaGFuZGxlck1ldGhvZE5hbWVdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2hpbGRPYnNlcnZlciA9IGhhbmRsZXJbaGFuZGxlck1ldGhvZE5hbWVdKHBsdXMsIG1pbnVzLCBrZXksIHR5cGUsIHRoaXMub2JqZWN0KTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIuY2FsbCkge1xuICAgICAgICBjaGlsZE9ic2VydmVyID0gaGFuZGxlci5jYWxsKHZvaWQgMCwgcGx1cywgbWludXMsIGtleSwgdHlwZSwgdGhpcy5vYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiQ2FuJ3QgZGlzcGF0Y2ggbWFwIGNoYW5nZSBmb3IgXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm5hbWUpICsgXCIgdG8gXCIgKyBoYW5kbGVyICtcbiAgICAgICAgICAgIFwiIGJlY2F1c2UgdGhlcmUgaXMgbm8gaGFuZGxlciBtZXRob2RcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRPYnNlcnZlciA9IGNoaWxkT2JzZXJ2ZXI7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG52YXIgT2EgPSByZXF1aXJlKFwiLi9vYnNlcnZhYmxlLWFycmF5XCIpO1xuIiwiLypqc2hpbnQgbm9kZTogdHJ1ZSovXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gWFhYIE5vdGU6IGV4Y2VwdGlvbnMgdGhyb3duIGZyb20gaGFuZGxlcnMgYW5kIGhhbmRsZXIgY2FuY2VsZXJzIG1heVxuLy8gaW50ZXJmZXJlIHdpdGggZGlzcGF0Y2hpbmcgdG8gc3Vic2VxdWVudCBoYW5kbGVycyBvZiBhbnkgY2hhbmdlIGluIHByb2dyZXNzLlxuLy8gSXQgaXMgdW5saWtlbHkgdGhhdCBwbGFucyBhcmUgcmVjb3ZlcmFibGUgb25jZSBhbiBleGNlcHRpb24gaW50ZXJmZXJlcyB3aXRoXG4vLyBjaGFuZ2UgZGlzcGF0Y2guIFRoZSBpbnRlcm5hbCByZWNvcmRzIHNob3VsZCBub3QgYmUgY29ycnVwdCwgYnV0IG9ic2VydmVyc1xuLy8gbWlnaHQgbWlzcyBhbiBpbnRlcm1lZGlhdGUgcHJvcGVydHkgY2hhbmdlLlxuXG52YXIgb3ducyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBvYnNlcnZlckZyZWVMaXN0ID0gW107XG52YXIgb2JzZXJ2ZXJUb0ZyZWVMaXN0ID0gW107XG52YXIgZGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuLy8gUmV1c2FibGUgcHJvcGVydHkgZGVzY3JpcHRvclxudmFyIGhpZGRlblZhbHVlUHJvcGVydHkgPSB7XG4gICAgdmFsdWU6IG51bGwsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic2VydmFibGVPYmplY3Q7XG5mdW5jdGlvbiBPYnNlcnZhYmxlT2JqZWN0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNvbnN0cnVjdC4gT2JzZXJ2YWJsZU9iamVjdCBpcyBhIG1peGluLlwiKTtcbn1cblxuT2JzZXJ2YWJsZU9iamVjdC5wcm90b3R5cGUub2JzZXJ2ZVByb3BlcnR5Q2hhbmdlID0gZnVuY3Rpb24gKG5hbWUsIGhhbmRsZXIsIG5vdGUsIGNhcHR1cmUpIHtcbiAgICByZXR1cm4gb2JzZXJ2ZVByb3BlcnR5Q2hhbmdlKHRoaXMsIG5hbWUsIGhhbmRsZXIsIG5vdGUsIGNhcHR1cmUpO1xufTtcblxuT2JzZXJ2YWJsZU9iamVjdC5wcm90b3R5cGUub2JzZXJ2ZVByb3BlcnR5V2lsbENoYW5nZSA9IGZ1bmN0aW9uIChuYW1lLCBoYW5kbGVyLCBub3RlKSB7XG4gICAgcmV0dXJuIG9ic2VydmVQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgbmFtZSwgaGFuZGxlciwgbm90ZSk7XG59O1xuXG5PYnNlcnZhYmxlT2JqZWN0LnByb3RvdHlwZS5kaXNwYXRjaFByb3BlcnR5Q2hhbmdlID0gZnVuY3Rpb24gKG5hbWUsIHBsdXMsIG1pbnVzLCBjYXB0dXJlKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoUHJvcGVydHlDaGFuZ2UodGhpcywgbmFtZSwgcGx1cywgbWludXMsIGNhcHR1cmUpO1xufTtcblxuT2JzZXJ2YWJsZU9iamVjdC5wcm90b3R5cGUuZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UgPSBmdW5jdGlvbiAobmFtZSwgcGx1cywgbWludXMpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgbmFtZSwgcGx1cywgbWludXMpO1xufTtcblxuT2JzZXJ2YWJsZU9iamVjdC5wcm90b3R5cGUuZ2V0UHJvcGVydHlDaGFuZ2VPYnNlcnZlcnMgPSBmdW5jdGlvbiAobmFtZSwgY2FwdHVyZSkge1xuICAgIHJldHVybiBnZXRQcm9wZXJ0eUNoYW5nZU9ic2VydmVycyh0aGlzLCBuYW1lLCBjYXB0dXJlKTtcbn07XG5cbk9ic2VydmFibGVPYmplY3QucHJvdG90eXBlLmdldFByb3BlcnR5V2lsbENoYW5nZU9ic2VydmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIGdldFByb3BlcnR5V2lsbENoYW5nZU9ic2VydmVycyh0aGlzLCBuYW1lKTtcbn07XG5cbk9ic2VydmFibGVPYmplY3QucHJvdG90eXBlLm1ha2VQcm9wZXJ0eU9ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBtYWtlUHJvcGVydHlPYnNlcnZhYmxlKHRoaXMsIG5hbWUpO1xufTtcblxuT2JzZXJ2YWJsZU9iamVjdC5wcm90b3R5cGUucHJldmVudFByb3BlcnR5T2JzZXJ2ZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBwcmV2ZW50UHJvcGVydHlPYnNlcnZlcih0aGlzLCBuYW1lKTtcbn07XG5cbk9ic2VydmFibGVPYmplY3QucHJvdG90eXBlLlByb3BlcnR5Q2hhbmdlT2JzZXJ2ZXIgPSBQcm9wZXJ0eUNoYW5nZU9ic2VydmVyO1xuXG4vLyBDb25zdHJ1Y3RvciBpbnRlcmZhY2Ugd2l0aCBwb2x5bW9ycGhpYyBkZWxlZ2F0aW9uIGlmIGF2YWlsYWJsZVxuXG5PYnNlcnZhYmxlT2JqZWN0Lm9ic2VydmVQcm9wZXJ0eUNoYW5nZSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIGhhbmRsZXIsIG5vdGUsIGNhcHR1cmUpIHtcbiAgICBpZiAob2JqZWN0Lm9ic2VydmVQcm9wZXJ0eUNoYW5nZSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0Lm9ic2VydmVQcm9wZXJ0eUNoYW5nZShuYW1lLCBoYW5kbGVyLCBub3RlLCBjYXB0dXJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JzZXJ2ZVByb3BlcnR5Q2hhbmdlKG9iamVjdCwgbmFtZSwgaGFuZGxlciwgbm90ZSwgY2FwdHVyZSk7XG4gICAgfVxufTtcblxuT2JzZXJ2YWJsZU9iamVjdC5vYnNlcnZlUHJvcGVydHlXaWxsQ2hhbmdlID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgaGFuZGxlciwgbm90ZSkge1xuICAgIGlmIChvYmplY3Qub2JzZXJ2ZVByb3BlcnR5V2lsbENoYW5nZSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0Lm9ic2VydmVQcm9wZXJ0eVdpbGxDaGFuZ2UobmFtZSwgaGFuZGxlciwgbm90ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmVQcm9wZXJ0eVdpbGxDaGFuZ2Uob2JqZWN0LCBuYW1lLCBoYW5kbGVyLCBub3RlKTtcbiAgICB9XG59O1xuXG5PYnNlcnZhYmxlT2JqZWN0LmRpc3BhdGNoUHJvcGVydHlDaGFuZ2UgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCBwbHVzLCBtaW51cywgY2FwdHVyZSkge1xuICAgIGlmIChvYmplY3QuZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0LmRpc3BhdGNoUHJvcGVydHlDaGFuZ2UobmFtZSwgcGx1cywgbWludXMsIGNhcHR1cmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaFByb3BlcnR5Q2hhbmdlKG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMsIGNhcHR1cmUpO1xuICAgIH1cbn07XG5cbk9ic2VydmFibGVPYmplY3QuZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCBwbHVzLCBtaW51cykge1xuICAgIGlmIChvYmplY3QuZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC5kaXNwYXRjaFByb3BlcnR5V2lsbENoYW5nZShuYW1lLCBwbHVzLCBtaW51cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoUHJvcGVydHlXaWxsQ2hhbmdlKG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMpO1xuICAgIH1cbn07XG5cbk9ic2VydmFibGVPYmplY3QubWFrZVByb3BlcnR5T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUpIHtcbiAgICBpZiAob2JqZWN0Lm1ha2VQcm9wZXJ0eU9ic2VydmFibGUpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC5tYWtlUHJvcGVydHlPYnNlcnZhYmxlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtYWtlUHJvcGVydHlPYnNlcnZhYmxlKG9iamVjdCwgbmFtZSk7XG4gICAgfVxufTtcblxuT2JzZXJ2YWJsZU9iamVjdC5wcmV2ZW50UHJvcGVydHlPYnNlcnZlciA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUpIHtcbiAgICBpZiAob2JqZWN0LnByZXZlbnRQcm9wZXJ0eU9ic2VydmVyKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QucHJldmVudFByb3BlcnR5T2JzZXJ2ZXIobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByZXZlbnRQcm9wZXJ0eU9ic2VydmVyKG9iamVjdCwgbmFtZSk7XG4gICAgfVxufTtcblxuLy8gSW1wbGVtZW50YXRpb25cblxuZnVuY3Rpb24gb2JzZXJ2ZVByb3BlcnR5Q2hhbmdlKG9iamVjdCwgbmFtZSwgaGFuZGxlciwgbm90ZSwgY2FwdHVyZSkge1xuICAgIE9ic2VydmFibGVPYmplY3QubWFrZVByb3BlcnR5T2JzZXJ2YWJsZShvYmplY3QsIG5hbWUpO1xuICAgIHZhciBvYnNlcnZlcnMgPSBnZXRQcm9wZXJ0eUNoYW5nZU9ic2VydmVycyhvYmplY3QsIG5hbWUsIGNhcHR1cmUpO1xuXG4gICAgdmFyIG9ic2VydmVyO1xuICAgIGlmIChvYnNlcnZlckZyZWVMaXN0Lmxlbmd0aCkgeyAvLyBUT0RPICYmICFkZWJ1Zz9cbiAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlckZyZWVMaXN0LnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic2VydmVyID0gbmV3IFByb3BlcnR5Q2hhbmdlT2JzZXJ2ZXIoKTtcbiAgICB9XG5cbiAgICBvYnNlcnZlci5vYmplY3QgPSBvYmplY3Q7XG4gICAgb2JzZXJ2ZXIucHJvcGVydHlOYW1lID0gbmFtZTtcbiAgICBvYnNlcnZlci5jYXB0dXJlID0gY2FwdHVyZTtcbiAgICBvYnNlcnZlci5vYnNlcnZlcnMgPSBvYnNlcnZlcnM7XG4gICAgb2JzZXJ2ZXIuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgb2JzZXJ2ZXIubm90ZSA9IG5vdGU7XG4gICAgb2JzZXJ2ZXIudmFsdWUgPSBvYmplY3RbbmFtZV07XG5cbiAgICAvLyBQcmVjb21wdXRlIGRpc3BhdGNoIG1ldGhvZCBuYW1lcy5cblxuICAgIHZhciBzdHJpbmdOYW1lID0gXCJcIiArIG5hbWU7IC8vIEFycmF5IGluZGljaWRlcyBtdXN0IGJlIGNvZXJjZWQgdG8gc3RyaW5nLlxuICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBzdHJpbmdOYW1lLnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmdOYW1lLnNsaWNlKDEpO1xuXG4gICAgaWYgKCFjYXB0dXJlKSB7XG4gICAgICAgIHZhciBzcGVjaWZpY0NoYW5nZU1ldGhvZE5hbWUgPSBcImhhbmRsZVwiICsgcHJvcGVydHlOYW1lICsgXCJQcm9wZXJ0eUNoYW5nZVwiO1xuICAgICAgICB2YXIgZ2VuZXJpY0NoYW5nZU1ldGhvZE5hbWUgPSBcImhhbmRsZVByb3BlcnR5Q2hhbmdlXCI7XG4gICAgICAgIGlmIChoYW5kbGVyW3NwZWNpZmljQ2hhbmdlTWV0aG9kTmFtZV0pIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gc3BlY2lmaWNDaGFuZ2VNZXRob2ROYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXJbZ2VuZXJpY0NoYW5nZU1ldGhvZE5hbWVdKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IGdlbmVyaWNDaGFuZ2VNZXRob2ROYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIuY2FsbCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgYXJyYW5nZSB0byBkaXNwYXRjaCBcIiArIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgXCIgcHJvcGVydHkgY2hhbmdlcyBvbiBcIiArIG9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc3BlY2lmaWNXaWxsQ2hhbmdlTWV0aG9kTmFtZSA9IFwiaGFuZGxlXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIlByb3BlcnR5V2lsbENoYW5nZVwiO1xuICAgICAgICB2YXIgZ2VuZXJpY1dpbGxDaGFuZ2VNZXRob2ROYW1lID0gXCJoYW5kbGVQcm9wZXJ0eVdpbGxDaGFuZ2VcIjtcbiAgICAgICAgaWYgKGhhbmRsZXJbc3BlY2lmaWNXaWxsQ2hhbmdlTWV0aG9kTmFtZV0pIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gc3BlY2lmaWNXaWxsQ2hhbmdlTWV0aG9kTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyW2dlbmVyaWNXaWxsQ2hhbmdlTWV0aG9kTmFtZV0pIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gZ2VuZXJpY1dpbGxDaGFuZ2VNZXRob2ROYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIuY2FsbCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgYXJyYW5nZSB0byBkaXNwYXRjaCBcIiArIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgXCIgcHJvcGVydHkgY2hhbmdlcyBvbiBcIiArIG9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG5cbiAgICAvLyBUT0RPIGlzc3VlIHdhcm5pbmdzIGlmIHRoZSBudW1iZXIgb2YgaGFuZGxlciByZWNvcmRzIGV4Y2VlZHMgc29tZVxuICAgIC8vIGNvbmNlcm5pbmcgcXVhbnRpdHkgYXMgYSBoYXJiaW5nZXIgb2YgYSBtZW1vcnkgbGVhay5cbiAgICAvLyBUT0RPIE5vdGUgdGhhdCBpZiB0aGlzIGlzIGdhcmJhZ2UgY29sbGVjdGVkIHdpdGhvdXQgZXZlciBiZWluZyBjYWxsZWQsXG4gICAgLy8gaXQgcHJvYmFibHkgaW5kaWNhdGVzIGEgcHJvZ3JhbW1pbmcgZXJyb3IuXG4gICAgcmV0dXJuIG9ic2VydmVyO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlUHJvcGVydHlXaWxsQ2hhbmdlKG9iamVjdCwgbmFtZSwgaGFuZGxlciwgbm90ZSkge1xuICAgIHJldHVybiBvYnNlcnZlUHJvcGVydHlDaGFuZ2Uob2JqZWN0LCBuYW1lLCBoYW5kbGVyLCBub3RlLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hQcm9wZXJ0eUNoYW5nZShvYmplY3QsIG5hbWUsIHBsdXMsIG1pbnVzLCBjYXB0dXJlKSB7XG4gICAgaWYgKCFkaXNwYXRjaGluZykgeyAvLyBUT0RPICYmICFkZWJ1Zz9cbiAgICAgICAgcmV0dXJuIHN0YXJ0UHJvcGVydHlDaGFuZ2VEaXNwYXRjaENvbnRleHQob2JqZWN0LCBuYW1lLCBwbHVzLCBtaW51cywgY2FwdHVyZSk7XG4gICAgfVxuICAgIHZhciBvYnNlcnZlcnMgPSBnZXRQcm9wZXJ0eUNoYW5nZU9ic2VydmVycyhvYmplY3QsIG5hbWUsIGNhcHR1cmUpLnNsaWNlKCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IG9ic2VydmVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIG9ic2VydmVyID0gb2JzZXJ2ZXJzW2luZGV4XTtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzcGF0Y2gocGx1cywgbWludXMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2Uob2JqZWN0LCBuYW1lLCBwbHVzLCBtaW51cykge1xuICAgIGRpc3BhdGNoUHJvcGVydHlDaGFuZ2Uob2JqZWN0LCBuYW1lLCBwbHVzLCBtaW51cywgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0UHJvcGVydHlDaGFuZ2VEaXNwYXRjaENvbnRleHQob2JqZWN0LCBuYW1lLCBwbHVzLCBtaW51cywgY2FwdHVyZSkge1xuICAgIGRpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBkaXNwYXRjaFByb3BlcnR5Q2hhbmdlKG9iamVjdCwgbmFtZSwgcGx1cywgbWludXMsIGNhcHR1cmUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIlByb3BlcnR5IGNoYW5nZSBkaXNwYXRjaCBwb3NzaWJseSBjb3JydXB0ZWQgYnkgZXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvcGVydHkgY2hhbmdlIGRpc3BhdGNoIHBvc3NpYmx5IGNvcnJ1cHRlZCBieSBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBkaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAob2JzZXJ2ZXJUb0ZyZWVMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gVXNpbmcgcHVzaC5hcHBseSBpbnN0ZWFkIG9mIGFkZEVhY2ggYmVjYXVzZSBwdXNoIHdpbGwgZGVmaW5pdGVseVxuICAgICAgICAgICAgLy8gYmUgbXVjaCBmYXN0ZXIgdGhhbiB0aGUgZ2VuZXJpYyBhZGRFYWNoLCB3aGljaCBhbHNvIGhhbmRsZXNcbiAgICAgICAgICAgIC8vIG5vbi1hcnJheSBjb2xsZWN0aW9ucy5cbiAgICAgICAgICAgIG9ic2VydmVyRnJlZUxpc3QucHVzaC5hcHBseShcbiAgICAgICAgICAgICAgICBvYnNlcnZlckZyZWVMaXN0LFxuICAgICAgICAgICAgICAgIG9ic2VydmVyVG9GcmVlTGlzdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vIFVzaW5nIGNsZWFyIGJlY2F1c2UgaXQgaXMgb2JzZXJ2YWJsZS4gVGhlIGhhbmRsZXIgcmVjb3JkIGFycmF5XG4gICAgICAgICAgICAvLyBpcyBvYnRhaW5hYmxlIGJ5IGdldFByb3BlcnR5Q2hhbmdlT2JzZXJ2ZXJzLCBhbmQgaXMgb2JzZXJ2YWJsZS5cbiAgICAgICAgICAgIG9ic2VydmVyVG9GcmVlTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eUNoYW5nZU9ic2VydmVycyhvYmplY3QsIG5hbWUsIGNhcHR1cmUpIHtcbiAgICBpZiAoIW9iamVjdC5wcm9wZXJ0eU9ic2VydmVycykge1xuICAgICAgICBoaWRkZW5WYWx1ZVByb3BlcnR5LnZhbHVlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgXCJwcm9wZXJ0eU9ic2VydmVyc1wiLCBoaWRkZW5WYWx1ZVByb3BlcnR5KTtcbiAgICB9XG4gICAgdmFyIG9ic2VydmVyc0J5S2V5ID0gb2JqZWN0LnByb3BlcnR5T2JzZXJ2ZXJzO1xuICAgIHZhciBwaGFzZSA9IGNhcHR1cmUgPyBcIldpbGxDaGFuZ2VcIiA6IFwiQ2hhbmdlXCI7XG4gICAgdmFyIGtleSA9IG5hbWUgKyBwaGFzZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYnNlcnZlcnNCeUtleSwga2V5KSkge1xuICAgICAgICBvYnNlcnZlcnNCeUtleVtrZXldID0gW107XG4gICAgfVxuICAgIHJldHVybiBvYnNlcnZlcnNCeUtleVtrZXldO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eVdpbGxDaGFuZ2VPYnNlcnZlcnMob2JqZWN0LCBuYW1lKSB7XG4gICAgcmV0dXJuIGdldFByb3BlcnR5Q2hhbmdlT2JzZXJ2ZXJzKG9iamVjdCwgbmFtZSwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIFByb3BlcnR5Q2hhbmdlT2JzZXJ2ZXIoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgLy8gT2JqZWN0LnNlYWwodGhpcyk7IC8vIE1heWJlIG9uZSBkYXksIHRoaXMgd29uJ3QgZGVvcHRpbWl6ZS5cbn1cblxuUHJvcGVydHlDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9iamVjdCA9IG51bGw7XG4gICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBudWxsO1xuICAgIC8vIFBlZXIgb2JzZXJ2ZXJzLCBmcm9tIHdoaWNoIHRvIHBsdWNrIGl0c2VsZiB1cG9uIGNhbmNlbGF0aW9uLlxuICAgIHRoaXMub2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAvLyBPbiB3aGljaCB0byBkaXNwYXRjaCBwcm9wZXJ0eSBjaGFuZ2Ugbm90aWZpY2F0aW9ucy5cbiAgICB0aGlzLmhhbmRsZXIgPSBudWxsO1xuICAgIC8vIFByZWNvbXB1dGVkIGhhbmRsZXIgbWV0aG9kIG5hbWUgZm9yIGNoYW5nZSBkaXNwYXRjaFxuICAgIHRoaXMuaGFuZGxlck1ldGhvZE5hbWUgPSBudWxsO1xuICAgIC8vIFJldHVybmVkIGJ5IHRoZSBsYXN0IHByb3BlcnR5IGNoYW5nZSBub3RpZmljYXRpb24sIHdoaWNoIG11c3QgYmVcbiAgICAvLyBjYW5jZWxlZCBiZWZvcmUgdGhlIG5leHQgY2hhbmdlIG5vdGlmaWNhdGlvbiwgb3Igd2hlbiB0aGlzIG9ic2VydmVyIGlzXG4gICAgLy8gZmluYWxseSBjYW5jZWxlZC5cbiAgICB0aGlzLmNoaWxkT2JzZXJ2ZXIgPSBudWxsO1xuICAgIC8vIEZvciB0aGUgZGlzY3JldGlvbmFyeSB1c2Ugb2YgdGhlIHVzZXIsIHBlcmhhcHMgdG8gdHJhY2sgd2h5IHRoaXNcbiAgICAvLyBvYnNlcnZlciBoYXMgYmVlbiBjcmVhdGVkLCBvciB3aGV0aGVyIHRoaXMgb2JzZXJ2ZXIgc2hvdWxkIGJlXG4gICAgLy8gc2VyaWFsaXplZC5cbiAgICB0aGlzLm5vdGUgPSBudWxsO1xuICAgIC8vIFdoZXRoZXIgdGhpcyBvYnNlcnZlciBkaXNwYXRjaGVzIGJlZm9yZSBhIGNoYW5nZSBvY2N1cnMsIG9yIGFmdGVyXG4gICAgdGhpcy5jYXB0dXJlID0gbnVsbDtcbiAgICAvLyBUaGUgbGFzdCBrbm93biB2YWx1ZVxuICAgIHRoaXMudmFsdWUgPSBudWxsO1xufTtcblxuUHJvcGVydHlDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICB2YXIgaW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZih0aGlzKTtcbiAgICAvLyBVbmZvcnR1bmF0ZWx5LCBpZiB0aGlzIG9ic2VydmVyIHdhcyByZXVzZWQsIHRoaXMgd291bGQgbm90IGJlIHN1ZmZpY2llbnRcbiAgICAvLyB0byBkZXRlY3QgYSBkdXBsaWNhdGUgY2FuY2VsLiBEbyBub3QgY2FuY2VsIG1vcmUgdGhhbiBvbmNlLlxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCJDYW4ndCBjYW5jZWwgb2JzZXJ2ZXIgZm9yIFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcGVydHlOYW1lKSArIFwiIG9uIFwiICsgdGhpcy5vYmplY3QgK1xuICAgICAgICAgICAgXCIgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBiZWVuIGNhbmNlbGVkXCJcbiAgICAgICAgKTtcbiAgICB9XG4gICAgdmFyIGNoaWxkT2JzZXJ2ZXIgPSB0aGlzLmNoaWxkT2JzZXJ2ZXI7XG4gICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgLy8gSWYgdGhpcyBvYnNlcnZlciBpcyBjYW5jZWxlZCB3aGlsZSBkaXNwYXRjaGluZyBhIGNoYW5nZVxuICAgIC8vIG5vdGlmaWNhdGlvbiBmb3IgdGhlIHNhbWUgcHJvcGVydHkuLi5cbiAgICAvLyAxLiBXZSBjYW5ub3QgcHV0IHRoZSBoYW5kbGVyIHJlY29yZCBvbnRvIHRoZSBmcmVlIGxpc3QgYmVjYXVzZVxuICAgIC8vIGl0IG1heSBoYXZlIGJlZW4gY2FwdHVyZWQgaW4gdGhlIGFycmF5IG9mIHJlY29yZHMgdG8gd2hpY2hcbiAgICAvLyB0aGUgY2hhbmdlIG5vdGlmaWNhdGlvbiB3b3VsZCBiZSBzZW50LiBXZSBtdXN0IG1hcmsgaXQgYXNcbiAgICAvLyBjYW5jZWxlZCBieSBudWxsaW5nIG91dCB0aGUgaGFuZGxlciBwcm9wZXJ0eSBzbyB0aGUgZGlzcGF0Y2hlclxuICAgIC8vIHBhc3NlcyBvdmVyIGl0LlxuICAgIC8vIDIuIFdlIGFsc28gY2Fubm90IHB1dCB0aGUgaGFuZGxlciByZWNvcmQgb250byB0aGUgZnJlZSBsaXN0XG4gICAgLy8gdW50aWwgYWxsIGNoYW5nZSBkaXNwYXRjaGVzIGhhdmUgYmVlbiBjb21wbGV0ZWQgYmVjYXVzZSBpdCBjb3VsZFxuICAgIC8vIGNvbmNlaXZhYmx5IGJlIHJldXNlZCwgY29uZnVzaW5nIHRoZSBjdXJyZW50IGRpc3BhdGNoZXIuXG4gICAgaWYgKGRpc3BhdGNoaW5nKSB7XG4gICAgICAgIC8vIEFsbCBoYW5kbGVycyBhZGRlZCB0byB0aGlzIGxpc3Qgd2lsbCBiZSBtb3ZlZCBvdmVyIHRvIHRoZVxuICAgICAgICAvLyBhY3R1YWwgZnJlZSBsaXN0IHdoZW4gdGhlcmUgYXJlIG5vIGxvbmdlciBhbnkgcHJvcGVydHlcbiAgICAgICAgLy8gY2hhbmdlIGRpc3BhdGNoZXJzIG9uIHRoZSBzdGFjay5cbiAgICAgICAgb2JzZXJ2ZXJUb0ZyZWVMaXN0LnB1c2godGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JzZXJ2ZXJGcmVlTGlzdC5wdXNoKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hpbGRPYnNlcnZlcikge1xuICAgICAgICAvLyBDYWxsaW5nIHVzZXIgY29kZSBvbiBvdXIgc3RhY2suXG4gICAgICAgIC8vIERvbmUgaW4gdGFpbCBwb3NpdGlvbiB0byBhdm9pZCBhIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZC5cbiAgICAgICAgY2hpbGRPYnNlcnZlci5jYW5jZWwoKTtcbiAgICB9XG59O1xuXG5Qcm9wZXJ0eUNoYW5nZU9ic2VydmVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIChwbHVzLCBtaW51cykge1xuICAgIHZhciBoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuICAgIC8vIEEgbnVsbCBoYW5kbGVyIGltcGxpZXMgdGhhdCBhbiBvYnNlcnZlciB3YXMgY2FuY2VsZWQgZHVyaW5nIHRoZSBkaXNwYXRjaFxuICAgIC8vIG9mIGEgY2hhbmdlLiBUaGUgb2JzZXJ2ZXIgaXMgcGVuZGluZyBhZGRpdGlvbiB0byB0aGUgZnJlZSBsaXN0LlxuICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1pbnVzID09PSB2b2lkIDApIHtcbiAgICAgICAgbWludXMgPSB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gcGx1cztcblxuICAgIHZhciBjaGlsZE9ic2VydmVyID0gdGhpcy5jaGlsZE9ic2VydmVyO1xuICAgIHRoaXMuY2hpbGRPYnNlcnZlciA9IG51bGw7XG4gICAgLy8gWFhYIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZHMgY2FsbGluZyBjYW5jZWwgYW5kIGhhbmRsZXIgbWV0aG9kczpcbiAgICBpZiAoY2hpbGRPYnNlcnZlcikge1xuICAgICAgICBjaGlsZE9ic2VydmVyLmNhbmNlbCgpO1xuICAgIH1cbiAgICB2YXIgaGFuZGxlck1ldGhvZE5hbWUgPSB0aGlzLmhhbmRsZXJNZXRob2ROYW1lO1xuICAgIGlmIChoYW5kbGVyTWV0aG9kTmFtZSAmJiB0eXBlb2YgaGFuZGxlcltoYW5kbGVyTWV0aG9kTmFtZV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjaGlsZE9ic2VydmVyID0gaGFuZGxlcltoYW5kbGVyTWV0aG9kTmFtZV0ocGx1cywgbWludXMsIHRoaXMucHJvcGVydHlOYW1lLCB0aGlzLm9iamVjdCk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyLmNhbGwpIHtcbiAgICAgICAgY2hpbGRPYnNlcnZlciA9IGhhbmRsZXIuY2FsbCh2b2lkIDAsIHBsdXMsIG1pbnVzLCB0aGlzLnByb3BlcnR5TmFtZSwgdGhpcy5vYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiQ2FuJ3QgZGlzcGF0Y2ggXCIgKyBKU09OLnN0cmluZ2lmeShoYW5kbGVyTWV0aG9kTmFtZSkgKyBcIiBwcm9wZXJ0eSBjaGFuZ2Ugb24gXCIgKyBvYmplY3QgK1xuICAgICAgICAgICAgXCIgYmVjYXVzZSB0aGVyZSBpcyBubyBoYW5kbGVyIG1ldGhvZFwiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGlsZE9ic2VydmVyID0gY2hpbGRPYnNlcnZlcjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIG1ha2VQcm9wZXJ0eU9ic2VydmFibGUob2JqZWN0LCBuYW1lKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gT2EubWFrZVByb3BlcnR5T2JzZXJ2YWJsZShvYmplY3QsIG5hbWUpO1xuICAgIH1cblxuICAgIHZhciB3cmFwcGVkRGVzY3JpcHRvciA9IHdyYXBQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKTtcblxuICAgIGlmICghd3JhcHBlZERlc2NyaXB0b3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0aHVuaztcbiAgICAvLyBpbiBib3RoIG9mIHRoZXNlIG5ldyBkZXNjcmlwdG9yIHZhcmlhbnRzLCB3ZSByZXVzZSB0aGUgd3JhcHBlZFxuICAgIC8vIGRlc2NyaXB0b3IgdG8gZWl0aGVyIHN0b3JlIHRoZSBjdXJyZW50IHZhbHVlIG9yIGFwcGx5IGdldHRlcnNcbiAgICAvLyBhbmQgc2V0dGVycy4gdGhpcyBpcyBoYW5keSBzaW5jZSB3ZSBjYW4gcmV1c2UgdGhlIHdyYXBwZWRcbiAgICAvLyBkZXNjcmlwdG9yIGlmIHdlIHVuaW5zdGFsbCB0aGUgb2JzZXJ2ZXIuIFdlIGV2ZW4gcHJlc2VydmUgdGhlXG4gICAgLy8gYXNzaWdubWVudCBzZW1hbnRpY3MsIHdoZXJlIHdlIGdldCB0aGUgdmFsdWUgZnJvbSB1cCB0aGVcbiAgICAvLyBwcm90b3R5cGUgY2hhaW4sIGFuZCBzZXQgYXMgYW4gb3duZWQgcHJvcGVydHkuXG4gICAgaWYgKFwidmFsdWVcIiBpbiB3cmFwcGVkRGVzY3JpcHRvcikge1xuICAgICAgICB0aHVuayA9IG1ha2VWYWx1ZVByb3BlcnR5VGh1bmsobmFtZSwgd3JhcHBlZERlc2NyaXB0b3IpO1xuICAgIH0gZWxzZSB7IC8vIFwiZ2V0XCIgb3IgXCJzZXRcIiwgYnV0IG5vdCBuZWNlc3NhcmlseSBib3RoXG4gICAgICAgIHRodW5rID0gbWFrZUdldFNldFByb3BlcnR5VGh1bmsobmFtZSwgd3JhcHBlZERlc2NyaXB0b3IpO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHRodW5rKTtcbn1cblxuLyoqXG4gKiBQcmV2ZW50cyBhIHRodW5rIGZyb20gYmVpbmcgaW5zdGFsbGVkIG9uIGEgcHJvcGVydHksIGFzc3VtaW5nIHRoYXQgdGhlXG4gKiB1bmRlcmx5aW5nIHR5cGUgd2lsbCBkaXNwYXRjaCB0aGUgY2hhbmdlIG1hbnVhbGx5LCBvciBpbnRlbmRzIHRoZSBwcm9wZXJ0eVxuICogdG8gc3RpY2sgb24gYWxsIGluc3RhbmNlcy5cbiAqL1xuZnVuY3Rpb24gcHJldmVudFByb3BlcnR5T2JzZXJ2ZXIob2JqZWN0LCBuYW1lKSB7XG4gICAgdmFyIHdyYXBwZWREZXNjcmlwdG9yID0gd3JhcFByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHdyYXBwZWREZXNjcmlwdG9yKTtcbn1cblxuZnVuY3Rpb24gd3JhcFByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpIHtcbiAgICAvLyBBcnJheXMgYXJlIHNwZWNpYWwuIFdlIGRvIG5vdCBzdXBwb3J0IGRpcmVjdCBzZXR0aW5nIG9mIHByb3BlcnRpZXNcbiAgICAvLyBvbiBhbiBhcnJheS4gaW5zdGVhZCwgY2FsbCAuc2V0KGluZGV4LCB2YWx1ZSkuIFRoaXMgaXMgb2JzZXJ2YWJsZS5cbiAgICAvLyBcImxlbmd0aFwiIHByb3BlcnR5IGlzIG9ic2VydmFibGUgZm9yIGFsbCBtdXRhdGluZyBtZXRob2RzIGJlY2F1c2VcbiAgICAvLyBvdXIgb3ZlcnJpZGVzIGV4cGxpY2l0bHkgZGlzcGF0Y2ggdGhhdCBjaGFuZ2UuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFPYmplY3QuaXNFeHRlbnNpYmxlKG9iamVjdCwgbmFtZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB3cmFwcGVkRGVzY3JpcHRvciA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpO1xuICAgIHZhciB3cmFwcGVkUHJvdG90eXBlID0gd3JhcHBlZERlc2NyaXB0b3IucHJvdG90eXBlO1xuXG4gICAgdmFyIGV4aXN0aW5nV3JhcHBlZERlc2NyaXB0b3JzID0gd3JhcHBlZFByb3RvdHlwZS53cmFwcGVkUHJvcGVydHlEZXNjcmlwdG9ycztcbiAgICBpZiAoZXhpc3RpbmdXcmFwcGVkRGVzY3JpcHRvcnMgJiYgb3ducy5jYWxsKGV4aXN0aW5nV3JhcHBlZERlc2NyaXB0b3JzLCBuYW1lKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHdyYXBwZWRQcm9wZXJ0eURlc2NyaXB0b3JzID0gb2JqZWN0LndyYXBwZWRQcm9wZXJ0eURlc2NyaXB0b3JzO1xuICAgIGlmICghd3JhcHBlZFByb3BlcnR5RGVzY3JpcHRvcnMpIHtcbiAgICAgICAgd3JhcHBlZFByb3BlcnR5RGVzY3JpcHRvcnMgPSB7fTtcbiAgICAgICAgaGlkZGVuVmFsdWVQcm9wZXJ0eS52YWx1ZSA9IHdyYXBwZWRQcm9wZXJ0eURlc2NyaXB0b3JzO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBcIndyYXBwZWRQcm9wZXJ0eURlc2NyaXB0b3JzXCIsIGhpZGRlblZhbHVlUHJvcGVydHkpO1xuICAgIH1cblxuICAgIGlmIChvd25zLmNhbGwod3JhcHBlZFByb3BlcnR5RGVzY3JpcHRvcnMsIG5hbWUpKSB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYWxyZWFkeSByZWNvcmRlZCBhIHdyYXBwZWQgcHJvcGVydHkgZGVzY3JpcHRvcixcbiAgICAgICAgLy8gd2UgaGF2ZSBhbHJlYWR5IGluc3RhbGxlZCB0aGUgb2JzZXJ2ZXIsIHNvIHNob3J0LWhlcmUuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXdyYXBwZWREZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWVtb2l6ZSB0aGUgZGVzY3JpcHRvciBzbyB3ZSBrbm93IG5vdCB0byBpbnN0YWxsIGFub3RoZXIgbGF5ZXIuIFdlXG4gICAgLy8gY291bGQgdXNlIGl0IHRvIHVuaW5zdGFsbCB0aGUgb2JzZXJ2ZXIsIGJ1dCB3ZSBkbyBub3QgdG8gYXZvaWQgR0NcbiAgICAvLyB0aHJhc2hpbmcuXG4gICAgd3JhcHBlZFByb3BlcnR5RGVzY3JpcHRvcnNbbmFtZV0gPSB3cmFwcGVkRGVzY3JpcHRvcjtcblxuICAgIC8vIEdpdmUgdXAgKmFmdGVyKiBzdG9yaW5nIHRoZSB3cmFwcGVkIHByb3BlcnR5IGRlc2NyaXB0b3Igc28gaXRcbiAgICAvLyBjYW4gYmUgcmVzdG9yZWQgYnkgdW5pbnN0YWxsLiBVbndyaXRhYmxlIHByb3BlcnRpZXMgYXJlXG4gICAgLy8gc2lsZW50bHkgbm90IG92ZXJyaWRlbi4gU2luY2Ugc3VjY2VzcyBpcyBpbmRpc3Rpbmd1aXNoYWJsZSBmcm9tXG4gICAgLy8gZmFpbHVyZSwgd2UgbGV0IGl0IHBhc3MgYnV0IGRvbid0IHdhc3RlIHRpbWUgb24gaW50ZXJjZXB0aW5nXG4gICAgLy8gZ2V0L3NldC5cbiAgICBpZiAoIXdyYXBwZWREZXNjcmlwdG9yLndyaXRhYmxlICYmICF3cmFwcGVkRGVzY3JpcHRvci5zZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIHNldHRlciwgaXQgaXMgbm90IG11dGFibGUsIGFuZCBvYnNlcnZpbmcgaXMgbW9vdC5cbiAgICAvLyBNYW51YWwgZGlzcGF0Y2ggbWF5IHN0aWxsIGFwcGx5LlxuICAgIGlmICh3cmFwcGVkRGVzY3JpcHRvci5nZXQgJiYgIXdyYXBwZWREZXNjcmlwdG9yLnNldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBwZWREZXNjcmlwdG9yO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKSB7XG4gICAgLy8gd2FsayB1cCB0aGUgcHJvdG90eXBlIGNoYWluIHRvIGZpbmQgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciB0aGVcbiAgICAvLyBwcm9wZXJ0eSBuYW1lLlxuICAgIHZhciBkZXNjcmlwdG9yO1xuICAgIHZhciBwcm90b3R5cGUgPSBvYmplY3Q7XG4gICAgZG8ge1xuICAgICAgICBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIG5hbWUpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSk7XG4gICAgfSB3aGlsZSAocHJvdG90eXBlKTtcbiAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICBkZXNjcmlwdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3IgZGVmYXVsdCB0byBhbiB1bmRlZmluZWQgdmFsdWVcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb3RvdHlwZTogb2JqZWN0LFxuICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VWYWx1ZVByb3BlcnR5VGh1bmsobmFtZSwgd3JhcHBlZERlc2NyaXB0b3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFVzZXMgX190aGlzX18gdG8gcXVpY2tseSBkaXN0aW5ndWlzaCBfX3N0YXRlX18gcHJvcGVydGllcyBmcm9tXG4gICAgICAgICAgICAvLyB1cHdhcmQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICAgIGlmICh0aGlzLl9fc3RhdGVfXyA9PT0gdm9pZCAwIHx8IHRoaXMuX19zdGF0ZV9fLl9fdGhpc19fICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaW5pdFN0YXRlKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fX3N0YXRlX187XG5cbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbml0aWFsIHZhbHVlIGZyb20gdXAgdGhlIHByb3RvdHlwZSBjaGFpblxuICAgICAgICAgICAgICAgIHN0YXRlW25hbWVdID0gd3JhcHBlZERlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVtuYW1lXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocGx1cykge1xuICAgICAgICAgICAgLy8gVXNlcyBfX3RoaXNfXyB0byBxdWlja2x5IGRpc3Rpbmd1aXNoIF9fc3RhdGVfXyBwcm9wZXJ0aWVzIGZyb21cbiAgICAgICAgICAgIC8vIHVwd2FyZCBpbiB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgICAgICAgICAgaWYgKHRoaXMuX19zdGF0ZV9fID09PSB2b2lkIDAgfHwgdGhpcy5fX3N0YXRlX18uX190aGlzX18gIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBpbml0U3RhdGUodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXRlX19bbmFtZV0gPSB0aGlzW25hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fX3N0YXRlX187XG5cbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbml0aWFsIHZhbHVlIGZyb20gdXAgdGhlIHByb3RvdHlwZSBjaGFpblxuICAgICAgICAgICAgICAgIHN0YXRlW25hbWVdID0gd3JhcHBlZERlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbHVzID09PSBzdGF0ZVtuYW1lXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbHVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBYWFggcGxhbiBpbnRlcmZlcmVuY2UgaGF6YXJkOlxuICAgICAgICAgICAgZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgbmFtZSwgcGx1cyk7XG5cbiAgICAgICAgICAgIHdyYXBwZWREZXNjcmlwdG9yLnZhbHVlID0gcGx1cztcbiAgICAgICAgICAgIHN0YXRlW25hbWVdID0gcGx1cztcblxuICAgICAgICAgICAgLy8gWFhYIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZDpcbiAgICAgICAgICAgIGRpc3BhdGNoUHJvcGVydHlDaGFuZ2UodGhpcywgbmFtZSwgcGx1cyk7XG5cbiAgICAgICAgICAgIHJldHVybiBwbHVzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB3cmFwcGVkRGVzY3JpcHRvci5lbnVtZXJhYmxlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBtYWtlR2V0U2V0UHJvcGVydHlUaHVuayhuYW1lLCB3cmFwcGVkRGVzY3JpcHRvcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHdyYXBwZWREZXNjcmlwdG9yLmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3cmFwcGVkRGVzY3JpcHRvci5nZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocGx1cykge1xuICAgICAgICAgICAgLy8gVXNlcyBfX3RoaXNfXyB0byBxdWlja2x5IGRpc3Rpbmd1aXNoIF9fc3RhdGVfXyBwcm9wZXJ0aWVzIGZyb21cbiAgICAgICAgICAgIC8vIHVwd2FyZCBpbiB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgICAgICAgICAgaWYgKHRoaXMuX19zdGF0ZV9fID09PSB2b2lkIDAgfHwgdGhpcy5fX3N0YXRlX18uX190aGlzX18gIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBpbml0U3RhdGUodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXRlX19bbmFtZV0gPSB0aGlzW25hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fX3N0YXRlX187XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZVtuYW1lXSA9PT0gcGx1cykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbHVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBYWFggcGxhbiBpbnRlcmZlcmVuY2UgaGF6YXJkOlxuICAgICAgICAgICAgZGlzcGF0Y2hQcm9wZXJ0eVdpbGxDaGFuZ2UodGhpcywgbmFtZSwgcGx1cyk7XG5cbiAgICAgICAgICAgIC8vIGNhbGwgdGhyb3VnaCB0byBhY3R1YWwgc2V0dGVyXG4gICAgICAgICAgICBpZiAod3JhcHBlZERlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICAgICAgICAgICAgd3JhcHBlZERlc2NyaXB0b3Iuc2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgc3RhdGVbbmFtZV0gPSBwbHVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1c2UgZ2V0dGVyLCBpZiBwb3NzaWJsZSwgdG8gYWRqdXN0IHRoZSBwbHVzIHZhbHVlIGlmIHRoZSBzZXR0ZXJcbiAgICAgICAgICAgIC8vIGFkanVzdGVkIGl0LCBmb3IgZXhhbXBsZSBhIHNldHRlciBmb3IgYW4gYXJyYXkgcHJvcGVydHkgdGhhdFxuICAgICAgICAgICAgLy8gcmV0YWlucyB0aGUgb3JpZ2luYWwgYXJyYXkgYW5kIHJlcGxhY2VzIGl0cyBjb250ZW50LCBvciBhIHNldHRlclxuICAgICAgICAgICAgLy8gdGhhdCBjb2VyY2VzIHRoZSB2YWx1ZSB0byBhbiBleHBlY3RlZCB0eXBlLlxuICAgICAgICAgICAgaWYgKHdyYXBwZWREZXNjcmlwdG9yLmdldCkge1xuICAgICAgICAgICAgICAgIHBsdXMgPSB3cmFwcGVkRGVzY3JpcHRvci5nZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGlzcGF0Y2ggdGhlIG5ldyB2YWx1ZTogdGhlIGdpdmVuIHZhbHVlIGlmIHRoZXJlIGlzXG4gICAgICAgICAgICAvLyBubyBnZXR0ZXIsIG9yIHRoZSBhY3R1YWwgdmFsdWUgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgICAgICAvLyBUT0RPIHNwZWNcbiAgICAgICAgICAgIC8vIFhYWCBwbGFuIGludGVyZmVyZW5jZSBoYXphcmQ6XG4gICAgICAgICAgICBkaXNwYXRjaFByb3BlcnR5Q2hhbmdlKHRoaXMsIG5hbWUsIHBsdXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGx1cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogd3JhcHBlZERlc2NyaXB0b3IuZW51bWVyYWJsZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdFN0YXRlKG9iamVjdCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIFwiX19zdGF0ZV9fXCIsIHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIF9fdGhpc19fOiBvYmplY3RcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cblxudmFyIE9hID0gcmVxdWlyZShcIi4vb2JzZXJ2YWJsZS1hcnJheVwiKTtcbiIsIi8qZ2xvYmFsIC1XZWFrTWFwKi9cblwidXNlIHN0cmljdFwiO1xuXG4vLyBUT0RPIHJldmlldyBhbGwgZXJyb3IgbWVzc2FnZXMgZm9yIGNvbnNpc3RlbmN5IGFuZCBoZWxwZnVsbmVzcyBhY3Jvc3Mgb2JzZXJ2YWJsZXNcblxudmFyIG9ic2VydmVyRnJlZUxpc3QgPSBbXTtcbnZhciBvYnNlcnZlclRvRnJlZUxpc3QgPSBbXTtcbnZhciBkaXNwYXRjaGluZyA9IGZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic2VydmFibGVSYW5nZTtcbmZ1bmN0aW9uIE9ic2VydmFibGVSYW5nZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjb25zdHJ1Y3QuIE9ic2VydmFibGVSYW5nZSBpcyBhIG1peGluLlwiKTtcbn1cblxuT2JzZXJ2YWJsZVJhbmdlLnByb3RvdHlwZS5vYnNlcnZlUmFuZ2VDaGFuZ2UgPSBmdW5jdGlvbiAoaGFuZGxlciwgbmFtZSwgbm90ZSwgY2FwdHVyZSkge1xuICAgIHJldHVybiBvYnNlcnZlUmFuZ2VDaGFuZ2UodGhpcywgaGFuZGxlciwgbmFtZSwgbm90ZSwgY2FwdHVyZSk7XG59O1xuXG5PYnNlcnZhYmxlUmFuZ2UucHJvdG90eXBlLm9ic2VydmVSYW5nZVdpbGxDaGFuZ2UgPSBmdW5jdGlvbiAoaGFuZGxlciwgbmFtZSwgbm90ZSkge1xuICAgIHJldHVybiBvYnNlcnZlUmFuZ2VDaGFuZ2UodGhpcywgaGFuZGxlciwgbmFtZSwgbm90ZSwgdHJ1ZSk7XG59O1xuXG5PYnNlcnZhYmxlUmFuZ2UucHJvdG90eXBlLmRpc3BhdGNoUmFuZ2VDaGFuZ2UgPSBmdW5jdGlvbiAocGx1cywgbWludXMsIGluZGV4LCBjYXB0dXJlKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoUmFuZ2VDaGFuZ2UodGhpcywgcGx1cywgbWludXMsIGluZGV4LCBjYXB0dXJlKTtcbn07XG5cbk9ic2VydmFibGVSYW5nZS5wcm90b3R5cGUuZGlzcGF0Y2hSYW5nZVdpbGxDaGFuZ2UgPSBmdW5jdGlvbiAocGx1cywgbWludXMsIGluZGV4KSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoUmFuZ2VDaGFuZ2UodGhpcywgcGx1cywgbWludXMsIGluZGV4LCB0cnVlKTtcbn07XG5cbk9ic2VydmFibGVSYW5nZS5wcm90b3R5cGUuZ2V0UmFuZ2VDaGFuZ2VPYnNlcnZlcnMgPSBmdW5jdGlvbiAoY2FwdHVyZSkge1xufTtcblxuT2JzZXJ2YWJsZVJhbmdlLnByb3RvdHlwZS5nZXRSYW5nZVdpbGxDaGFuZ2VPYnNlcnZlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldFJhbmdlQ2hhbmdlT2JzZXJ2ZXJzKHRoaXMsIHRydWUpO1xufTtcblxuT2JzZXJ2YWJsZVJhbmdlLm9ic2VydmVSYW5nZUNoYW5nZSA9IG9ic2VydmVSYW5nZUNoYW5nZTtcbmZ1bmN0aW9uIG9ic2VydmVSYW5nZUNoYW5nZShvYmplY3QsIGhhbmRsZXIsIG5hbWUsIG5vdGUsIGNhcHR1cmUpIHtcbiAgICBtYWtlUmFuZ2VDaGFuZ2VzT2JzZXJ2YWJsZShvYmplY3QpO1xuICAgIHZhciBvYnNlcnZlcnMgPSBnZXRSYW5nZUNoYW5nZU9ic2VydmVycyhvYmplY3QsIGNhcHR1cmUpO1xuXG4gICAgdmFyIG9ic2VydmVyO1xuICAgIGlmIChvYnNlcnZlckZyZWVMaXN0Lmxlbmd0aCkgeyAvLyBUT0RPICFkZWJ1Zz9cbiAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlckZyZWVMaXN0LnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic2VydmVyID0gbmV3IFJhbmdlQ2hhbmdlT2JzZXJ2ZXIoKTtcbiAgICB9XG5cbiAgICBvYnNlcnZlci5vYmplY3QgPSBvYmplY3Q7XG4gICAgb2JzZXJ2ZXIubmFtZSA9IG5hbWU7XG4gICAgb2JzZXJ2ZXIuY2FwdHVyZSA9IGNhcHR1cmU7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZXJzID0gb2JzZXJ2ZXJzO1xuICAgIG9ic2VydmVyLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIG9ic2VydmVyLm5vdGUgPSBub3RlO1xuXG4gICAgLy8gUHJlY29tcHV0ZSBkaXNwYXRjaCBtZXRob2QgbmFtZVxuXG4gICAgdmFyIHN0cmluZ05hbWUgPSBcIlwiICsgbmFtZTsgLy8gQXJyYXkgaW5kaWNpZGVzIG11c3QgYmUgY29lcmNlZCB0byBzdHJpbmcuXG4gICAgdmFyIHByb3BlcnR5TmFtZSA9IHN0cmluZ05hbWUuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIHN0cmluZ05hbWUuc2xpY2UoMSk7XG5cbiAgICBpZiAoIWNhcHR1cmUpIHtcbiAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSBcImhhbmRsZVwiICsgcHJvcGVydHlOYW1lICsgXCJSYW5nZUNoYW5nZVwiO1xuICAgICAgICBpZiAoaGFuZGxlclttZXRob2ROYW1lXSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBtZXRob2ROYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIuaGFuZGxlUmFuZ2VDaGFuZ2UpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXJNZXRob2ROYW1lID0gXCJoYW5kbGVSYW5nZUNoYW5nZVwiO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIuY2FsbCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgYXJyYW5nZSB0byBkaXNwYXRjaCBcIiArIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgXCIgbWFwIGNoYW5nZXNcIik7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IFwiaGFuZGxlXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIlJhbmdlV2lsbENoYW5nZVwiO1xuICAgICAgICBpZiAoaGFuZGxlclttZXRob2ROYW1lXSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlck1ldGhvZE5hbWUgPSBtZXRob2ROYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIuaGFuZGxlUmFuZ2VXaWxsQ2hhbmdlKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IFwiaGFuZGxlUmFuZ2VXaWxsQ2hhbmdlXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlci5jYWxsKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5oYW5kbGVyTWV0aG9kTmFtZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBhcnJhbmdlIHRvIGRpc3BhdGNoIFwiICsgSlNPTi5zdHJpbmdpZnkobmFtZSkgKyBcIiBtYXAgY2hhbmdlc1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcblxuICAgIC8vIFRPRE8gaXNzdWUgd2FybmluZyBpZiB0aGUgbnVtYmVyIG9mIGhhbmRsZXIgcmVjb3JkcyBpcyB3b3JyaXNvbWVcbiAgICByZXR1cm4gb2JzZXJ2ZXI7XG59XG5cbk9ic2VydmFibGVSYW5nZS5vYnNlcnZlUmFuZ2VXaWxsQ2hhbmdlID0gb2JzZXJ2ZVJhbmdlV2lsbENoYW5nZTtcbmZ1bmN0aW9uIG9ic2VydmVSYW5nZVdpbGxDaGFuZ2Uob2JqZWN0LCBoYW5kbGVyLCBuYW1lLCBub3RlKSB7XG4gICAgcmV0dXJuIG9ic2VydmVSYW5nZUNoYW5nZShvYmplY3QsIGhhbmRsZXIsIG5hbWUsIG5vdGUsIHRydWUpO1xufVxuXG5PYnNlcnZhYmxlUmFuZ2UuZGlzcGF0Y2hSYW5nZUNoYW5nZSA9IGRpc3BhdGNoUmFuZ2VDaGFuZ2U7XG5mdW5jdGlvbiBkaXNwYXRjaFJhbmdlQ2hhbmdlKG9iamVjdCwgcGx1cywgbWludXMsIGluZGV4LCBjYXB0dXJlKSB7XG4gICAgaWYgKCFkaXNwYXRjaGluZykgeyAvLyBUT0RPICYmICFkZWJ1Zz9cbiAgICAgICAgcmV0dXJuIHN0YXJ0UmFuZ2VDaGFuZ2VEaXNwYXRjaENvbnRleHQob2JqZWN0LCBwbHVzLCBtaW51cywgaW5kZXgsIGNhcHR1cmUpO1xuICAgIH1cbiAgICB2YXIgb2JzZXJ2ZXJzID0gZ2V0UmFuZ2VDaGFuZ2VPYnNlcnZlcnMob2JqZWN0LCBjYXB0dXJlKTtcbiAgICBmb3IgKHZhciBvYnNlcnZlckluZGV4ID0gMDsgb2JzZXJ2ZXJJbmRleCA8IG9ic2VydmVycy5sZW5ndGg7IG9ic2VydmVySW5kZXgrKykge1xuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNbb2JzZXJ2ZXJJbmRleF07XG4gICAgICAgIC8vIFRoZSBzbGljaW5nIGVuc3VyZXMgdGhhdCBoYW5kbGVycyBjYW5ub3QgaW50ZXJmZXJlIHdpdGggYW5vdGhlciBieVxuICAgICAgICAvLyBhbHRlcmluZyB0aGVzZSBhcmd1bWVudHMuXG4gICAgICAgIG9ic2VydmVyLmRpc3BhdGNoKHBsdXMuc2xpY2UoKSwgbWludXMuc2xpY2UoKSwgaW5kZXgpO1xuICAgIH1cbn1cblxuT2JzZXJ2YWJsZVJhbmdlLmRpc3BhdGNoUmFuZ2VXaWxsQ2hhbmdlID0gZGlzcGF0Y2hSYW5nZVdpbGxDaGFuZ2U7XG5mdW5jdGlvbiBkaXNwYXRjaFJhbmdlV2lsbENoYW5nZShvYmplY3QsIHBsdXMsIG1pbnVzLCBpbmRleCkge1xuICAgIHJldHVybiBkaXNwYXRjaFJhbmdlQ2hhbmdlKG9iamVjdCwgcGx1cywgbWludXMsIGluZGV4LCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRSYW5nZUNoYW5nZURpc3BhdGNoQ29udGV4dChvYmplY3QsIHBsdXMsIG1pbnVzLCBpbmRleCwgY2FwdHVyZSkge1xuICAgIGRpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBkaXNwYXRjaFJhbmdlQ2hhbmdlKG9iamVjdCwgcGx1cywgbWludXMsIGluZGV4LCBjYXB0dXJlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJSYW5nZSBjaGFuZ2UgZGlzcGF0Y2ggcG9zc2libHkgY29ycnVwdGVkIGJ5IGVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJhbmdlIGNoYW5nZSBkaXNwYXRjaCBwb3NzaWJseSBjb3JydXB0ZWQgYnkgZXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKG9ic2VydmVyVG9GcmVlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFVzaW5nIHB1c2guYXBwbHkgaW5zdGVhZCBvZiBhZGRFYWNoIGJlY2F1c2UgcHVzaCB3aWxsIGRlZmluaXRlbHlcbiAgICAgICAgICAgIC8vIGJlIG11Y2ggZmFzdGVyIHRoYW4gdGhlIGdlbmVyaWMgYWRkRWFjaCwgd2hpY2ggYWxzbyBoYW5kbGVzXG4gICAgICAgICAgICAvLyBub24tYXJyYXkgY29sbGVjdGlvbnMuXG4gICAgICAgICAgICBvYnNlcnZlckZyZWVMaXN0LnB1c2guYXBwbHkoXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJGcmVlTGlzdCxcbiAgICAgICAgICAgICAgICBvYnNlcnZlclRvRnJlZUxpc3RcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyBVc2luZyBjbGVhciBiZWNhdXNlIGl0IGlzIG9ic2VydmFibGUuIFRoZSBoYW5kbGVyIHJlY29yZCBhcnJheVxuICAgICAgICAgICAgLy8gaXMgb2J0YWluYWJsZSBieSBnZXRQcm9wZXJ0eUNoYW5nZU9ic2VydmVycywgYW5kIGlzIG9ic2VydmFibGUuXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJUb0ZyZWVMaXN0LmNsZWFyKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJUb0ZyZWVMaXN0LmNsZWFyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyVG9GcmVlTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYWtlUmFuZ2VDaGFuZ2VzT2JzZXJ2YWJsZShvYmplY3QpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgIE9hLm1ha2VSYW5nZUNoYW5nZXNPYnNlcnZhYmxlKG9iamVjdCk7XG4gICAgfVxuICAgIGlmIChvYmplY3QubWFrZVJhbmdlQ2hhbmdlc09ic2VydmFibGUpIHtcbiAgICAgICAgb2JqZWN0Lm1ha2VSYW5nZUNoYW5nZXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuICAgIG9iamVjdC5kaXNwYXRjaGVzUmFuZ2VDaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0UmFuZ2VDaGFuZ2VPYnNlcnZlcnMob2JqZWN0LCBjYXB0dXJlKSB7XG4gICAgaWYgKGNhcHR1cmUpIHtcbiAgICAgICAgaWYgKCFvYmplY3QucmFuZ2VXaWxsQ2hhbmdlT2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICBvYmplY3QucmFuZ2VXaWxsQ2hhbmdlT2JzZXJ2ZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdC5yYW5nZVdpbGxDaGFuZ2VPYnNlcnZlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFvYmplY3QucmFuZ2VDaGFuZ2VPYnNlcnZlcnMpIHtcbiAgICAgICAgICAgIG9iamVjdC5yYW5nZUNoYW5nZU9ic2VydmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3QucmFuZ2VDaGFuZ2VPYnNlcnZlcnM7XG4gICAgfVxufVxuXG4vKlxuICAgIGlmIChvYmplY3QucHJldmVudFByb3BlcnR5T2JzZXJ2ZXIpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdC5wcmV2ZW50UHJvcGVydHlPYnNlcnZlcihuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJldmVudFByb3BlcnR5T2JzZXJ2ZXIob2JqZWN0LCBuYW1lKTtcbiAgICB9XG4qL1xuXG5mdW5jdGlvbiBSYW5nZUNoYW5nZU9ic2VydmVyKCkge1xuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5SYW5nZUNoYW5nZU9ic2VydmVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLm5hbWUgPSBudWxsO1xuICAgIHRoaXMub2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB0aGlzLmhhbmRsZXIgPSBudWxsO1xuICAgIHRoaXMuaGFuZGxlck1ldGhvZE5hbWUgPSBudWxsO1xuICAgIHRoaXMuY2hpbGRPYnNlcnZlciA9IG51bGw7XG4gICAgdGhpcy5ub3RlID0gbnVsbDtcbiAgICB0aGlzLmNhcHR1cmUgPSBudWxsO1xufTtcblxuUmFuZ2VDaGFuZ2VPYnNlcnZlci5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICB2YXIgaW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZih0aGlzKTtcbiAgICAvLyBVbmZvcnR1bmF0ZWx5LCBpZiB0aGlzIG9ic2VydmVyIHdhcyByZXVzZWQsIHRoaXMgd291bGQgbm90IGJlIHN1ZmZpY2llbnRcbiAgICAvLyB0byBkZXRlY3QgYSBkdXBsaWNhdGUgY2FuY2VsLiBEbyBub3QgY2FuY2VsIG1vcmUgdGhhbiBvbmNlLlxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCJDYW4ndCBjYW5jZWwgb2JzZXJ2ZXIgZm9yIFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMubmFtZSkgKyBcIiByYW5nZSBjaGFuZ2VzXCIgK1xuICAgICAgICAgICAgXCIgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBiZWVuIGNhbmNlbGVkXCJcbiAgICAgICAgKTtcbiAgICB9XG4gICAgdmFyIGNoaWxkT2JzZXJ2ZXIgPSB0aGlzLmNoaWxkT2JzZXJ2ZXI7XG4gICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgLy8gSWYgdGhpcyBvYnNlcnZlciBpcyBjYW5jZWxlZCB3aGlsZSBkaXNwYXRjaGluZyBhIGNoYW5nZVxuICAgIC8vIG5vdGlmaWNhdGlvbiBmb3IgdGhlIHNhbWUgcHJvcGVydHkuLi5cbiAgICAvLyAxLiBXZSBjYW5ub3QgcHV0IHRoZSBoYW5kbGVyIHJlY29yZCBvbnRvIHRoZSBmcmVlIGxpc3QgYmVjYXVzZVxuICAgIC8vIGl0IG1heSBoYXZlIGJlZW4gY2FwdHVyZWQgaW4gdGhlIGFycmF5IG9mIHJlY29yZHMgdG8gd2hpY2hcbiAgICAvLyB0aGUgY2hhbmdlIG5vdGlmaWNhdGlvbiB3b3VsZCBiZSBzZW50LiBXZSBtdXN0IG1hcmsgaXQgYXNcbiAgICAvLyBjYW5jZWxlZCBieSBudWxsaW5nIG91dCB0aGUgaGFuZGxlciBwcm9wZXJ0eSBzbyB0aGUgZGlzcGF0Y2hlclxuICAgIC8vIHBhc3NlcyBvdmVyIGl0LlxuICAgIC8vIDIuIFdlIGFsc28gY2Fubm90IHB1dCB0aGUgaGFuZGxlciByZWNvcmQgb250byB0aGUgZnJlZSBsaXN0XG4gICAgLy8gdW50aWwgYWxsIGNoYW5nZSBkaXNwYXRjaGVzIGhhdmUgYmVlbiBjb21wbGV0ZWQgYmVjYXVzZSBpdCBjb3VsZFxuICAgIC8vIGNvbmNlaXZhYmx5IGJlIHJldXNlZCwgY29uZnVzaW5nIHRoZSBjdXJyZW50IGRpc3BhdGNoZXIuXG4gICAgaWYgKGRpc3BhdGNoaW5nKSB7XG4gICAgICAgIC8vIEFsbCBoYW5kbGVycyBhZGRlZCB0byB0aGlzIGxpc3Qgd2lsbCBiZSBtb3ZlZCBvdmVyIHRvIHRoZVxuICAgICAgICAvLyBhY3R1YWwgZnJlZSBsaXN0IHdoZW4gdGhlcmUgYXJlIG5vIGxvbmdlciBhbnkgcHJvcGVydHlcbiAgICAgICAgLy8gY2hhbmdlIGRpc3BhdGNoZXJzIG9uIHRoZSBzdGFjay5cbiAgICAgICAgb2JzZXJ2ZXJUb0ZyZWVMaXN0LnB1c2godGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JzZXJ2ZXJGcmVlTGlzdC5wdXNoKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hpbGRPYnNlcnZlcikge1xuICAgICAgICAvLyBDYWxsaW5nIHVzZXIgY29kZSBvbiBvdXIgc3RhY2suXG4gICAgICAgIC8vIERvbmUgaW4gdGFpbCBwb3NpdGlvbiB0byBhdm9pZCBhIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZC5cbiAgICAgICAgY2hpbGRPYnNlcnZlci5jYW5jZWwoKTtcbiAgICB9XG59O1xuXG5SYW5nZUNoYW5nZU9ic2VydmVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIChwbHVzLCBtaW51cywgaW5kZXgpIHtcbiAgICB2YXIgaGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcbiAgICAvLyBBIG51bGwgaGFuZGxlciBpbXBsaWVzIHRoYXQgYW4gb2JzZXJ2ZXIgd2FzIGNhbmNlbGVkIGR1cmluZyB0aGUgZGlzcGF0Y2hcbiAgICAvLyBvZiBhIGNoYW5nZS4gVGhlIG9ic2VydmVyIGlzIHBlbmRpbmcgYWRkaXRpb24gdG8gdGhlIGZyZWUgbGlzdC5cbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjaGlsZE9ic2VydmVyID0gdGhpcy5jaGlsZE9ic2VydmVyO1xuICAgIHRoaXMuY2hpbGRPYnNlcnZlciA9IG51bGw7XG4gICAgLy8gWFhYIHBsYW4gaW50ZXJmZXJlbmNlIGhhemFyZHMgY2FsbGluZyBjYW5jZWwgYW5kIGhhbmRsZXIgbWV0aG9kczpcbiAgICBpZiAoY2hpbGRPYnNlcnZlcikge1xuICAgICAgICBjaGlsZE9ic2VydmVyLmNhbmNlbCgpO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVyTWV0aG9kTmFtZSA9IHRoaXMuaGFuZGxlck1ldGhvZE5hbWU7XG4gICAgaWYgKGhhbmRsZXJNZXRob2ROYW1lICYmIHR5cGVvZiBoYW5kbGVyW2hhbmRsZXJNZXRob2ROYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNoaWxkT2JzZXJ2ZXIgPSBoYW5kbGVyW2hhbmRsZXJNZXRob2ROYW1lXShwbHVzLCBtaW51cywgaW5kZXgsIHRoaXMub2JqZWN0KTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIuY2FsbCkge1xuICAgICAgICBjaGlsZE9ic2VydmVyID0gaGFuZGxlci5jYWxsKHZvaWQgMCwgcGx1cywgbWludXMsIGluZGV4LCB0aGlzLm9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCJDYW4ndCBkaXNwYXRjaCByYW5nZSBjaGFuZ2UgdG8gXCIgKyBoYW5kbGVyXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGlsZE9ic2VydmVyID0gY2hpbGRPYnNlcnZlcjtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxudmFyIE9hID0gcmVxdWlyZShcIi4vb2JzZXJ2YWJsZS1hcnJheVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMTQgTW9udGFnZSBTdHVkaW9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb250YWdlanMvY29sbGVjdGlvbnMvYmxvYi83YzY3NGQ0OWMwNDk1NWYwMWJiZDI4MzlmOTA5MzZlMTVhY2VlYTJmL29wZXJhdG9ycy9zd2FwLmpzXG5cbnZhciBhcnJheV9zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxubW9kdWxlLmV4cG9ydHMgPSBzd2FwO1xuZnVuY3Rpb24gc3dhcChhcnJheSwgc3RhcnQsIG1pbnVzTGVuZ3RoLCBwbHVzKSB7XG4gICAgLy8gVW5yb2xsZWQgaW1wbGVtZW50YXRpb24gaW50byBKYXZhU2NyaXB0IGZvciBhIGNvdXBsZSByZWFzb25zLlxuICAgIC8vIENhbGxpbmcgc3BsaWNlIGNhbiBjYXVzZSBsYXJnZSBzdGFjayBzaXplcyBmb3IgbGFyZ2Ugc3dhcHMuIEFsc28sXG4gICAgLy8gc3BsaWNlIGNhbm5vdCBoYW5kbGUgYXJyYXkgaG9sZXMuXG4gICAgaWYgKHBsdXMpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBsdXMpKSB7XG4gICAgICAgICAgICBwbHVzID0gYXJyYXlfc2xpY2UuY2FsbChwbHVzKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHBsdXMgPSBBcnJheS5lbXB0eTtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICAgIHN0YXJ0ID0gYXJyYXkubGVuZ3RoICsgc3RhcnQ7XG4gICAgfSBlbHNlIGlmIChzdGFydCA+IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICBhcnJheS5sZW5ndGggPSBzdGFydDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgKyBtaW51c0xlbmd0aCA+IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICAvLyBUcnVuY2F0ZSBtaW51cyBsZW5ndGggaWYgaXQgZXh0ZW5kcyBiZXlvbmQgdGhlIGxlbmd0aFxuICAgICAgICBtaW51c0xlbmd0aCA9IGFycmF5Lmxlbmd0aCAtIHN0YXJ0O1xuICAgIH0gZWxzZSBpZiAobWludXNMZW5ndGggPCAwKSB7XG4gICAgICAgIC8vIEl0IGlzIHRoZSBKYXZhU2NyaXB0IHdheS5cbiAgICAgICAgbWludXNMZW5ndGggPSAwO1xuICAgIH1cblxuICAgIHZhciBkaWZmID0gcGx1cy5sZW5ndGggLSBtaW51c0xlbmd0aDtcbiAgICB2YXIgb2xkTGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBuZXdMZW5ndGggPSBhcnJheS5sZW5ndGggKyBkaWZmO1xuXG4gICAgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgIC8vIEhlYWQgVGFpbCBQbHVzIE1pbnVzXG4gICAgICAgIC8vIEggSCBIIEggTSBNIFQgVCBUIFRcbiAgICAgICAgLy8gSCBIIEggSCBQIFAgUCBQIFQgVCBUIFRcbiAgICAgICAgLy8gICAgICAgICBeIHN0YXJ0XG4gICAgICAgIC8vICAgICAgICAgXi1eIG1pbnVzLmxlbmd0aFxuICAgICAgICAvLyAgICAgICAgICAgXiAtLT4gZGlmZlxuICAgICAgICAvLyAgICAgICAgIF4tLS0tLV4gcGx1cy5sZW5ndGhcbiAgICAgICAgLy8gICAgICAgICAgICAgXi0tLS0tLV4gdGFpbCBiZWZvcmVcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIF4tLS0tLS1eIHRhaWwgYWZ0ZXJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgXiBzdGFydCBpdGVyYXRpb25cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgIF4gc3RhcnQgaXRlcmF0aW9uIG9mZnNldFxuICAgICAgICAvLyAgICAgICAgICAgICBeIGVuZCBpdGVyYXRpb25cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIF4gZW5kIGl0ZXJhdGlvbiBvZmZzZXRcbiAgICAgICAgLy8gICAgICAgICAgICAgXiBzdGFydCArIG1pbnVzLmxlbmd0aFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIF4gbGVuZ3RoXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgIF4gbGVuZ3RoIC0gMVxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IG9sZExlbmd0aCAtIDE7IGluZGV4ID49IHN0YXJ0ICsgbWludXNMZW5ndGg7IGluZGV4LS0pIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBpbmRleCArIGRpZmY7XG4gICAgICAgICAgICBpZiAoaW5kZXggaW4gYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBhcnJheVtvZmZzZXRdID0gYXJyYXlbaW5kZXhdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBPZGRseSwgUGhhbnRvbUpTIGNvbXBsYWlucyBhYm91dCBkZWxldGluZyBhcnJheVxuICAgICAgICAgICAgICAgIC8vIHByb3BlcnRpZXMsIHVubGVzcyB5b3UgYXNzaWduIHVuZGVmaW5lZCBmaXJzdC5cbiAgICAgICAgICAgICAgICBhcnJheVtvZmZzZXRdID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBhcnJheVtvZmZzZXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBwbHVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBpZiAoaW5kZXggaW4gcGx1cykge1xuICAgICAgICAgICAgYXJyYXlbc3RhcnQgKyBpbmRleF0gPSBwbHVzW2luZGV4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycmF5W3N0YXJ0ICsgaW5kZXhdID0gdm9pZCAwO1xuICAgICAgICAgICAgZGVsZXRlIGFycmF5W3N0YXJ0ICsgaW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChkaWZmIDwgMCkge1xuICAgICAgICAvLyBIZWFkIFRhaWwgUGx1cyBNaW51c1xuICAgICAgICAvLyBIIEggSCBIIE0gTSBNIE0gVCBUIFQgVFxuICAgICAgICAvLyBIIEggSCBIIFAgUCBUIFQgVCBUXG4gICAgICAgIC8vICAgICAgICAgXiBzdGFydFxuICAgICAgICAvLyAgICAgICAgIF4tLS0tLV4gbGVuZ3RoXG4gICAgICAgIC8vICAgICAgICAgXi1eIHBsdXMubGVuZ3RoXG4gICAgICAgIC8vICAgICAgICAgICAgIF4gc3RhcnQgaXRlcmF0aW9uXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBeIG9mZnNldCBzdGFydCBpdGVyYXRpb25cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBeIGVuZFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBeIG9mZnNldCBlbmRcbiAgICAgICAgLy8gICAgICAgICAgICAgXiBzdGFydCArIG1pbnVzLmxlbmd0aCAtIHBsdXMubGVuZ3RoXG4gICAgICAgIC8vICAgICAgICAgICAgIF4gc3RhcnQgLSBkaWZmXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBeLS0tLS0tXiB0YWlsIGJlZm9yZVxuICAgICAgICAvLyAgICAgICAgICAgICBeLS0tLS0tXiB0YWlsIGFmdGVyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXiBsZW5ndGggLSBkaWZmXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXiBuZXdMZW5ndGhcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSBzdGFydCArIHBsdXMubGVuZ3RoOyBpbmRleCA8IG9sZExlbmd0aCAtIGRpZmY7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBpbmRleCAtIGRpZmY7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdID0gYXJyYXlbb2Zmc2V0XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBhcnJheVtpbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXJyYXkubGVuZ3RoID0gbmV3TGVuZ3RoO1xufVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1bnppcCA9IHJlcXVpcmUoJy4vdW56aXAnKTtcblxuLy8gUG9seW1vcnBoaWMgdW56aXAgdXNlcyBjb2xsZWN0aW9uLnRvQXJyYXkoKSAoZm9yIG5vbi1hcnJheSBjb2xsZWN0aW9uXG4vLyBpbXBsZW1lbnRhdGlvbnMpIHRvIGNvbnZlcnQgdGhlIHRhYmxlIG9yIGFueSBvZiBpdHMgcm93cyBpbnRvIGFycmF5IGJlZm9yZVxuLy8gcGFzc2luZyB0aGVtIGFsb25nIHRvIHRoZSBub24tcG9seW1vcnBoaWMgdW56aXAuXG5cbm1vZHVsZS5leHBvcnRzID0gcG9wVW56aXA7XG5mdW5jdGlvbiBwb3BVbnppcCh0YWJsZSkge1xuICAgIGlmICh0eXBlb2YgdGFibGUudW56aXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHRhYmxlLnVuemlwKCk7XG4gICAgfVxuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSB0YWJsZSB3ZSBwYXNzIHRvIHRoZSBub24tcG9seW1vcnBoaWMgdW56aXAgaXMgYW4gYXJyYXlcbiAgICAvLyBvZiBhcnJheXMuXG4gICAgLy8gSG93ZXZlciwgb25seSBjb25zdHJ1Y3QgYSBuZXcgdGFibGUgaWYgbmVjZXNzYXJ5LlxuICAgIHZhciBhcnJheVRhYmxlO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0YWJsZSkpIHtcbiAgICAgICAgdGFibGUgPSBhcnJheVRhYmxlID0gdGFibGUudG9BcnJheSgpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IHRhYmxlLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIHJvdyA9IHRhYmxlW2luZGV4XTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJvdykpIHtcbiAgICAgICAgICAgIC8vIENvbnN0cnVjdCBhIGNvcHkgb2YgdGhlIHRhYmxlIGluIHdoaWNoIHRvIHJlcGxhY2Ugbm9uLWFycmF5XG4gICAgICAgICAgICAvLyB2YWx1ZXMuXG4gICAgICAgICAgICBpZiAoIWFycmF5VGFibGUpIHtcbiAgICAgICAgICAgICAgICAvLyBUYWJsZSBpcyBrbm93biB0byBiZSBhbiBhcnJheSBiZWNhdXNlIHdlIHdvdWxkIGhhdmUgcmVwbGFjZWRcbiAgICAgICAgICAgICAgICAvLyBpdCBhbHJlYWR5IG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgICBhcnJheVRhYmxlID0gdGFibGUuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFycmF5VGFibGVbaW5kZXhdID0gcm93LnRvQXJyYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW56aXAoYXJyYXlUYWJsZSB8fCB0YWJsZSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIFVuemlwIGlzIGFsc28ga25vd24gYXMgYSBtYXRyaXggdHJhbnNwb3NlLCBvcGVyYXRpbmcgZXhjbHVzaXZlbHkgb24gYXJyYXlzLlxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuemlwO1xuZnVuY3Rpb24gdW56aXAodGFibGUpIHtcbiAgICB2YXIgdHJhbnNwb3NlID0gW107XG4gICAgdmFyIHJvd3MgPSB0YWJsZS5sZW5ndGg7XG4gICAgdmFyIHJvdywgY29sdW1ucywgbGVuZ3RoO1xuICAgIHZhciBpbmRleCwgam5kZXg7XG5cbiAgICAvLyBNYXRoZW1hdGljYWxseSwgdGhlIGRlZ2VuZXJhdGUgY2FzZSBpcyBhbiBlbXB0eSBhcnJheSB3aGVyZSBlYWNoIGlubmVyXG4gICAgLy8gdmFsdWUgd291bGQgYmUgb2YgaW5maW5pdGUgbGVuZ3RoLlxuICAgIGlmICghcm93cykge1xuICAgICAgICAvLyBXaXRoaW4gdGhpcyBhcnJheSwgdGhlIG5vdGhpbmduZXNzIGlzIGluZmluaXRlLlxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29sdW1ucyA9IHRhYmxlWzBdLmxlbmd0aDtcbiAgICBsZW5ndGggPSBJbmZpbml0eTtcblxuICAgIC8vIEZpbmQgdGhlIHNob3J0ZXN0IHJvdywgdGhpcyB3aWxsIGJlIHRoZSBsZW5ndGggb2YgdGhlIHRyYW5zcG9zZS5cbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCByb3dzOyBpbmRleCsrKSB7XG4gICAgICAgIHJvdyA9IHRhYmxlW2luZGV4XTtcbiAgICAgICAgaWYgKHJvdy5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IHJvdy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgdHJhbnNwb3NlLlxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICByb3cgPSB0cmFuc3Bvc2VbaW5kZXhdID0gW107XG4gICAgICAgIGZvciAoam5kZXggPSAwOyBqbmRleCA8IHJvd3M7IGpuZGV4KyspIHtcbiAgICAgICAgICAgIHJvd1tqbmRleF0gPSB0YWJsZVtqbmRleF1baW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zcG9zZTtcbn1cbiIsIi8vIENvcHlyaWdodCAoQykgMjAxMSBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgSW5zdGFsbCBhIGxlYWt5IFdlYWtNYXAgZW11bGF0aW9uIG9uIHBsYXRmb3JtcyB0aGF0XG4gKiBkb24ndCBwcm92aWRlIGEgYnVpbHQtaW4gb25lLlxuICpcbiAqIDxwPkFzc3VtZXMgdGhhdCBhbiBFUzUgcGxhdGZvcm0gd2hlcmUsIGlmIHtAY29kZSBXZWFrTWFwfSBpc1xuICogYWxyZWFkeSBwcmVzZW50LCB0aGVuIGl0IGNvbmZvcm1zIHRvIHRoZSBhbnRpY2lwYXRlZCBFUzZcbiAqIHNwZWNpZmljYXRpb24uIFRvIHJ1biB0aGlzIGZpbGUgb24gYW4gRVM1IG9yIGFsbW9zdCBFUzVcbiAqIGltcGxlbWVudGF0aW9uIHdoZXJlIHRoZSB7QGNvZGUgV2Vha01hcH0gc3BlY2lmaWNhdGlvbiBkb2VzIG5vdFxuICogcXVpdGUgY29uZm9ybSwgcnVuIDxjb2RlPnJlcGFpckVTNS5qczwvY29kZT4gZmlyc3QuXG4gKlxuICogPHA+RXZlbiB0aG91Z2ggV2Vha01hcE1vZHVsZSBpcyBub3QgZ2xvYmFsLCB0aGUgbGludGVyIHRoaW5rcyBpdFxuICogaXMsIHdoaWNoIGlzIHdoeSBpdCBpcyBpbiB0aGUgb3ZlcnJpZGVzIGxpc3QgYmVsb3cuXG4gKlxuICogPHA+Tk9URTogQmVmb3JlIHVzaW5nIHRoaXMgV2Vha01hcCBlbXVsYXRpb24gaW4gYSBub24tU0VTXG4gKiBlbnZpcm9ubWVudCwgc2VlIHRoZSBub3RlIGJlbG93IGFib3V0IGhpZGRlblJlY29yZC5cbiAqXG4gKiBAYXV0aG9yIE1hcmsgUy4gTWlsbGVyXG4gKiBAcmVxdWlyZXMgY3J5cHRvLCBBcnJheUJ1ZmZlciwgVWludDhBcnJheSwgbmF2aWdhdG9yLCBjb25zb2xlXG4gKiBAb3ZlcnJpZGVzIFdlYWtNYXAsIHNlcywgUHJveHlcbiAqIEBvdmVycmlkZXMgV2Vha01hcE1vZHVsZVxuICovXG5cbi8qKlxuICogVGhpcyB7QGNvZGUgV2Vha01hcH0gZW11bGF0aW9uIGlzIG9ic2VydmFibHkgZXF1aXZhbGVudCB0byB0aGVcbiAqIEVTLUhhcm1vbnkgV2Vha01hcCwgYnV0IHdpdGggbGVha2llciBnYXJiYWdlIGNvbGxlY3Rpb24gcHJvcGVydGllcy5cbiAqXG4gKiA8cD5BcyB3aXRoIHRydWUgV2Vha01hcHMsIGluIHRoaXMgZW11bGF0aW9uLCBhIGtleSBkb2VzIG5vdFxuICogcmV0YWluIG1hcHMgaW5kZXhlZCBieSB0aGF0IGtleSBhbmQgKGNydWNpYWxseSkgYSBtYXAgZG9lcyBub3RcbiAqIHJldGFpbiB0aGUga2V5cyBpdCBpbmRleGVzLiBBIG1hcCBieSBpdHNlbGYgYWxzbyBkb2VzIG5vdCByZXRhaW5cbiAqIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIHRoYXQgbWFwLlxuICpcbiAqIDxwPkhvd2V2ZXIsIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEga2V5IGluIHNvbWUgbWFwIGFyZVxuICogcmV0YWluZWQgc28gbG9uZyBhcyB0aGF0IGtleSBpcyByZXRhaW5lZCBhbmQgdGhvc2UgYXNzb2NpYXRpb25zIGFyZVxuICogbm90IG92ZXJyaWRkZW4uIEZvciBleGFtcGxlLCB3aGVuIHVzZWQgdG8gc3VwcG9ydCBtZW1icmFuZXMsIGFsbFxuICogdmFsdWVzIGV4cG9ydGVkIGZyb20gYSBnaXZlbiBtZW1icmFuZSB3aWxsIGxpdmUgZm9yIHRoZSBsaWZldGltZVxuICogdGhleSB3b3VsZCBoYXZlIGhhZCBpbiB0aGUgYWJzZW5jZSBvZiBhbiBpbnRlcnBvc2VkIG1lbWJyYW5lLiBFdmVuXG4gKiB3aGVuIHRoZSBtZW1icmFuZSBpcyByZXZva2VkLCBhbGwgb2JqZWN0cyB0aGF0IHdvdWxkIGhhdmUgYmVlblxuICogcmVhY2hhYmxlIGluIHRoZSBhYnNlbmNlIG9mIHJldm9jYXRpb24gd2lsbCBzdGlsbCBiZSByZWFjaGFibGUsIGFzXG4gKiBmYXIgYXMgdGhlIEdDIGNhbiB0ZWxsLCBldmVuIHRob3VnaCB0aGV5IHdpbGwgbm8gbG9uZ2VyIGJlIHJlbGV2YW50XG4gKiB0byBvbmdvaW5nIGNvbXB1dGF0aW9uLlxuICpcbiAqIDxwPlRoZSBBUEkgaW1wbGVtZW50ZWQgaGVyZSBpcyBhcHByb3hpbWF0ZWx5IHRoZSBBUEkgYXMgaW1wbGVtZW50ZWRcbiAqIGluIEZGNi4wYTEgYW5kIGFncmVlZCB0byBieSBNYXJrTSwgQW5kcmVhcyBHYWwsIGFuZCBEYXZlIEhlcm1hbixcbiAqIHJhdGhlciB0aGFuIHRoZSBvZmZpYWxseSBhcHByb3ZlZCBwcm9wb3NhbCBwYWdlLiBUT0RPKGVyaWdodHMpOlxuICogdXBncmFkZSB0aGUgZWNtYXNjcmlwdCBXZWFrTWFwIHByb3Bvc2FsIHBhZ2UgdG8gZXhwbGFpbiB0aGlzIEFQSVxuICogY2hhbmdlIGFuZCBwcmVzZW50IHRvIEVjbWFTY3JpcHQgY29tbWl0dGVlIGZvciB0aGVpciBhcHByb3ZhbC5cbiAqXG4gKiA8cD5UaGUgZmlyc3QgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBlbXVsYXRpb24gaGVyZSBhbmQgdGhhdCBpblxuICogRkY2LjBhMSBpcyB0aGUgcHJlc2VuY2Ugb2Ygbm9uIGVudW1lcmFibGUge0Bjb2RlIGdldF9fXywgaGFzX19fLFxuICogc2V0X19fLCBhbmQgZGVsZXRlX19ffSBtZXRob2RzIG9uIFdlYWtNYXAgaW5zdGFuY2VzIHRvIHJlcHJlc2VudFxuICogd2hhdCB3b3VsZCBiZSB0aGUgaGlkZGVuIGludGVybmFsIHByb3BlcnRpZXMgb2YgYSBwcmltaXRpdmVcbiAqIGltcGxlbWVudGF0aW9uLiBXaGVyZWFzIHRoZSBGRjYuMGExIFdlYWtNYXAucHJvdG90eXBlIG1ldGhvZHNcbiAqIHJlcXVpcmUgdGhlaXIge0Bjb2RlIHRoaXN9IHRvIGJlIGEgZ2VudWluZSBXZWFrTWFwIGluc3RhbmNlIChpLmUuLFxuICogYW4gb2JqZWN0IG9mIHtAY29kZSBbW0NsYXNzXV19IFwiV2Vha01hcH0pLCBzaW5jZSB0aGVyZSBpcyBub3RoaW5nXG4gKiB1bmZvcmdlYWJsZSBhYm91dCB0aGUgcHNldWRvLWludGVybmFsIG1ldGhvZCBuYW1lcyB1c2VkIGhlcmUsXG4gKiBub3RoaW5nIHByZXZlbnRzIHRoZXNlIGVtdWxhdGVkIHByb3RvdHlwZSBtZXRob2RzIGZyb20gYmVpbmdcbiAqIGFwcGxpZWQgdG8gbm9uLVdlYWtNYXBzIHdpdGggcHNldWRvLWludGVybmFsIG1ldGhvZHMgb2YgdGhlIHNhbWVcbiAqIG5hbWVzLlxuICpcbiAqIDxwPkFub3RoZXIgZGlmZmVyZW5jZSBpcyB0aGF0IG91ciBlbXVsYXRlZCB7QGNvZGVcbiAqIFdlYWtNYXAucHJvdG90eXBlfSBpcyBub3QgaXRzZWxmIGEgV2Vha01hcC4gQSBwcm9ibGVtIHdpdGggdGhlXG4gKiBjdXJyZW50IEZGNi4wYTEgQVBJIGlzIHRoYXQgV2Vha01hcC5wcm90b3R5cGUgaXMgaXRzZWxmIGEgV2Vha01hcFxuICogcHJvdmlkaW5nIGFtYmllbnQgbXV0YWJpbGl0eSBhbmQgYW4gYW1iaWVudCBjb21tdW5pY2F0aW9uc1xuICogY2hhbm5lbC4gVGh1cywgaWYgYSBXZWFrTWFwIGlzIGFscmVhZHkgcHJlc2VudCBhbmQgaGFzIHRoaXNcbiAqIHByb2JsZW0sIHJlcGFpckVTNS5qcyB3cmFwcyBpdCBpbiBhIHNhZmUgd3JhcHBwZXIgaW4gb3JkZXIgdG9cbiAqIHByZXZlbnQgYWNjZXNzIHRvIHRoaXMgY2hhbm5lbC4gKFNlZVxuICogUEFUQ0hfTVVUQUJMRV9GUk9aRU5fV0VBS01BUF9QUk9UTyBpbiByZXBhaXJFUzUuanMpLlxuICovXG5cbi8qKlxuICogSWYgdGhpcyBpcyBhIGZ1bGwgPGEgaHJlZj1cbiAqIFwiaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2VzLWxhYi93aWtpL1NlY3VyZWFibGVFUzVcIlxuICogPnNlY3VyZWFibGUgRVM1PC9hPiBwbGF0Zm9ybSBhbmQgdGhlIEVTLUhhcm1vbnkge0Bjb2RlIFdlYWtNYXB9IGlzXG4gKiBhYnNlbnQsIGluc3RhbGwgYW4gYXBwcm94aW1hdGUgZW11bGF0aW9uLlxuICpcbiAqIDxwPklmIFdlYWtNYXAgaXMgcHJlc2VudCBidXQgY2Fubm90IHN0b3JlIHNvbWUgb2JqZWN0cywgdXNlIG91ciBhcHByb3hpbWF0ZVxuICogZW11bGF0aW9uIGFzIGEgd3JhcHBlci5cbiAqXG4gKiA8cD5JZiB0aGlzIGlzIGFsbW9zdCBhIHNlY3VyZWFibGUgRVM1IHBsYXRmb3JtLCB0aGVuIFdlYWtNYXAuanNcbiAqIHNob3VsZCBiZSBydW4gYWZ0ZXIgcmVwYWlyRVM1LmpzLlxuICpcbiAqIDxwPlNlZSB7QGNvZGUgV2Vha01hcH0gZm9yIGRvY3VtZW50YXRpb24gb2YgdGhlIGdhcmJhZ2UgY29sbGVjdGlvblxuICogcHJvcGVydGllcyBvZiB0aGlzIFdlYWtNYXAgZW11bGF0aW9uLlxuICovXG4oZnVuY3Rpb24gV2Vha01hcE1vZHVsZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKHR5cGVvZiBzZXMgIT09ICd1bmRlZmluZWQnICYmIHNlcy5vayAmJiAhc2VzLm9rKCkpIHtcbiAgICAvLyBhbHJlYWR5IHRvbyBicm9rZW4sIHNvIGdpdmUgdXBcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogSW4gc29tZSBjYXNlcyAoY3VycmVudCBGaXJlZm94KSwgd2UgbXVzdCBtYWtlIGEgY2hvaWNlIGJldHdlZWVuIGFcbiAgICogV2Vha01hcCB3aGljaCBpcyBjYXBhYmxlIG9mIHVzaW5nIGFsbCB2YXJpZXRpZXMgb2YgaG9zdCBvYmplY3RzIGFzXG4gICAqIGtleXMgYW5kIG9uZSB3aGljaCBpcyBjYXBhYmxlIG9mIHNhZmVseSB1c2luZyBwcm94aWVzIGFzIGtleXMuIFNlZVxuICAgKiBjb21tZW50cyBiZWxvdyBhYm91dCBIb3N0V2Vha01hcCBhbmQgRG91YmxlV2Vha01hcCBmb3IgZGV0YWlscy5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiAod2hpY2ggaXMgYSBnbG9iYWwsIG5vdCBleHBvc2VkIHRvIGd1ZXN0cykgbWFya3MgYVxuICAgKiBXZWFrTWFwIGFzIHBlcm1pdHRlZCB0byBkbyB3aGF0IGlzIG5lY2Vzc2FyeSB0byBpbmRleCBhbGwgaG9zdFxuICAgKiBvYmplY3RzLCBhdCB0aGUgY29zdCBvZiBtYWtpbmcgaXQgdW5zYWZlIGZvciBwcm94aWVzLlxuICAgKlxuICAgKiBEbyBub3QgYXBwbHkgdGhpcyBmdW5jdGlvbiB0byBhbnl0aGluZyB3aGljaCBpcyBub3QgYSBnZW51aW5lXG4gICAqIGZyZXNoIFdlYWtNYXAuXG4gICAqL1xuICBmdW5jdGlvbiB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMobWFwKSB7XG4gICAgLy8gaWRlbnRpdHkgb2YgZnVuY3Rpb24gdXNlZCBhcyBhIHNlY3JldCAtLSBnb29kIGVub3VnaCBhbmQgY2hlYXBcbiAgICBpZiAobWFwLnBlcm1pdEhvc3RPYmplY3RzX19fKSB7XG4gICAgICBtYXAucGVybWl0SG9zdE9iamVjdHNfX18od2Vha01hcFBlcm1pdEhvc3RPYmplY3RzKTtcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiBzZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc2VzLndlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cyA9IHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cztcbiAgfVxuXG4gIC8vIElFIDExIGhhcyBubyBQcm94eSBidXQgaGFzIGEgYnJva2VuIFdlYWtNYXAgc3VjaCB0aGF0IHdlIG5lZWQgdG8gcGF0Y2hcbiAgLy8gaXQgdXNpbmcgRG91YmxlV2Vha01hcDsgdGhpcyBmbGFnIHRlbGxzIERvdWJsZVdlYWtNYXAgc28uXG4gIHZhciBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlID0gZmFsc2U7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIGdvb2QtZW5vdWdoIFdlYWtNYXAgaW1wbGVtZW50YXRpb24sIGFuZCBpZiBzb1xuICAvLyBleGl0IHdpdGhvdXQgcmVwbGFjaW5nIGl0LlxuICBpZiAodHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgSG9zdFdlYWtNYXAgPSBXZWFrTWFwO1xuICAgIC8vIFRoZXJlIGlzIGEgV2Vha01hcCAtLSBpcyBpdCBnb29kIGVub3VnaD9cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgL0ZpcmVmb3gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgIC8vIFdlJ3JlIG5vdyAqYXNzdW1pbmcgbm90KiwgYmVjYXVzZSBhcyBvZiB0aGlzIHdyaXRpbmcgKDIwMTMtMDUtMDYpXG4gICAgICAvLyBGaXJlZm94J3MgV2Vha01hcHMgaGF2ZSBhIG1pc2NlbGxhbnkgb2Ygb2JqZWN0cyB0aGV5IHdvbid0IGFjY2VwdCwgYW5kXG4gICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIG1ha2UgYW4gZXhoYXVzdGl2ZSBsaXN0LCBhbmQgdGVzdGluZyBmb3IganVzdCBvbmVcbiAgICAgIC8vIHdpbGwgYmUgYSBwcm9ibGVtIGlmIHRoYXQgb25lIGlzIGZpeGVkIGFsb25lIChhcyB0aGV5IGRpZCBmb3IgRXZlbnQpLlxuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBhIHBsYXRmb3JtIHRoYXQgd2UgKmNhbiogcmVsaWFibHkgdGVzdCBvbiwgaGVyZSdzIGhvdyB0b1xuICAgICAgLy8gZG8gaXQ6XG4gICAgICAvLyAgdmFyIHByb2JsZW1hdGljID0gLi4uIDtcbiAgICAgIC8vICB2YXIgdGVzdEhvc3RNYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcbiAgICAgIC8vICB0cnkge1xuICAgICAgLy8gICAgdGVzdEhvc3RNYXAuc2V0KHByb2JsZW1hdGljLCAxKTsgIC8vIEZpcmVmb3ggMjAgd2lsbCB0aHJvdyBoZXJlXG4gICAgICAvLyAgICBpZiAodGVzdEhvc3RNYXAuZ2V0KHByb2JsZW1hdGljKSA9PT0gMSkge1xuICAgICAgLy8gICAgICByZXR1cm47XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgfSBjYXRjaCAoZSkge31cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSAxMSBidWc6IFdlYWtNYXBzIHNpbGVudGx5IGZhaWwgdG8gc3RvcmUgZnJvemVuIG9iamVjdHMuXG4gICAgICB2YXIgdGVzdE1hcCA9IG5ldyBIb3N0V2Vha01hcCgpO1xuICAgICAgdmFyIHRlc3RPYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcbiAgICAgIHRlc3RNYXAuc2V0KHRlc3RPYmplY3QsIDEpO1xuICAgICAgaWYgKHRlc3RNYXAuZ2V0KHRlc3RPYmplY3QpICE9PSAxKSB7XG4gICAgICAgIGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgPSB0cnVlO1xuICAgICAgICAvLyBGYWxsIHRocm91Z2ggdG8gaW5zdGFsbGluZyBvdXIgV2Vha01hcC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gV2Vha01hcDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBob3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgZ29wbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG5cbiAgLyoqXG4gICAqIFNlY3VyaXR5IGRlcGVuZHMgb24gSElEREVOX05BTUUgYmVpbmcgYm90aCA8aT51bmd1ZXNzYWJsZTwvaT4gYW5kXG4gICAqIDxpPnVuZGlzY292ZXJhYmxlPC9pPiBieSB1bnRydXN0ZWQgY29kZS5cbiAgICpcbiAgICogPHA+R2l2ZW4gdGhlIGtub3duIHdlYWtuZXNzZXMgb2YgTWF0aC5yYW5kb20oKSBvbiBleGlzdGluZ1xuICAgKiBicm93c2VycywgaXQgZG9lcyBub3QgZ2VuZXJhdGUgdW5ndWVzc2FiaWxpdHkgd2UgY2FuIGJlIGNvbmZpZGVudFxuICAgKiBvZi5cbiAgICpcbiAgICogPHA+SXQgaXMgdGhlIG1vbmtleSBwYXRjaGluZyBsb2dpYyBpbiB0aGlzIGZpbGUgdGhhdCBpcyBpbnRlbmRlZFxuICAgKiB0byBlbnN1cmUgdW5kaXNjb3ZlcmFiaWxpdHkuIFRoZSBiYXNpYyBpZGVhIGlzIHRoYXQgdGhlcmUgYXJlXG4gICAqIHRocmVlIGZ1bmRhbWVudGFsIG1lYW5zIG9mIGRpc2NvdmVyaW5nIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0OlxuICAgKiBUaGUgZm9yL2luIGxvb3AsIE9iamVjdC5rZXlzKCksIGFuZCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcygpLFxuICAgKiBhcyB3ZWxsIGFzIHNvbWUgcHJvcG9zZWQgRVM2IGV4dGVuc2lvbnMgdGhhdCBhcHBlYXIgb24gb3VyXG4gICAqIHdoaXRlbGlzdC4gVGhlIGZpcnN0IHR3byBvbmx5IGRpc2NvdmVyIGVudW1lcmFibGUgcHJvcGVydGllcywgYW5kXG4gICAqIHdlIG9ubHkgdXNlIEhJRERFTl9OQU1FIHRvIG5hbWUgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSwgc28gdGhlXG4gICAqIG9ubHkgcmVtYWluaW5nIHRocmVhdCBzaG91bGQgYmUgZ2V0T3duUHJvcGVydHlOYW1lcyBhbmQgc29tZVxuICAgKiBwcm9wb3NlZCBFUzYgZXh0ZW5zaW9ucyB0aGF0IGFwcGVhciBvbiBvdXIgd2hpdGVsaXN0LiBXZSBtb25rZXlcbiAgICogcGF0Y2ggdGhlbSB0byByZW1vdmUgSElEREVOX05BTUUgZnJvbSB0aGUgbGlzdCBvZiBwcm9wZXJ0aWVzIHRoZXlcbiAgICogcmV0dXJucy5cbiAgICpcbiAgICogPHA+VE9ETyhlcmlnaHRzKTogT24gYSBwbGF0Zm9ybSB3aXRoIGJ1aWx0LWluIFByb3hpZXMsIHByb3hpZXNcbiAgICogY291bGQgYmUgdXNlZCB0byB0cmFwIGFuZCB0aGVyZWJ5IGRpc2NvdmVyIHRoZSBISURERU5fTkFNRSwgc28gd2VcbiAgICogbmVlZCB0byBtb25rZXkgcGF0Y2ggUHJveHkuY3JlYXRlLCBQcm94eS5jcmVhdGVGdW5jdGlvbiwgZXRjLCBpblxuICAgKiBvcmRlciB0byB3cmFwIHRoZSBwcm92aWRlZCBoYW5kbGVyIHdpdGggdGhlIHJlYWwgaGFuZGxlciB3aGljaFxuICAgKiBmaWx0ZXJzIG91dCBhbGwgdHJhcHMgdXNpbmcgSElEREVOX05BTUUuXG4gICAqXG4gICAqIDxwPlRPRE8oZXJpZ2h0cyk6IFJldmlzaXQgTWlrZSBTdGF5J3Mgc3VnZ2VzdGlvbiB0aGF0IHdlIHVzZSBhblxuICAgKiBlbmNhcHN1bGF0ZWQgZnVuY3Rpb24gYXQgYSBub3QtbmVjZXNzYXJpbHktc2VjcmV0IG5hbWUsIHdoaWNoXG4gICAqIHVzZXMgdGhlIFN0aWVnbGVyIHNoYXJlZC1zdGF0ZSByaWdodHMgYW1wbGlmaWNhdGlvbiBwYXR0ZXJuIHRvXG4gICAqIHJldmVhbCB0aGUgYXNzb2NpYXRlZCB2YWx1ZSBvbmx5IHRvIHRoZSBXZWFrTWFwIGluIHdoaWNoIHRoaXMga2V5XG4gICAqIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGF0IHZhbHVlLiBTaW5jZSBvbmx5IHRoZSBrZXkgcmV0YWlucyB0aGVcbiAgICogZnVuY3Rpb24sIHRoZSBmdW5jdGlvbiBjYW4gYWxzbyByZW1lbWJlciB0aGUga2V5IHdpdGhvdXQgY2F1c2luZ1xuICAgKiBsZWFrYWdlIG9mIHRoZSBrZXksIHNvIHRoaXMgZG9lc24ndCB2aW9sYXRlIG91ciBnZW5lcmFsIGdjXG4gICAqIGdvYWxzLiBJbiBhZGRpdGlvbiwgYmVjYXVzZSB0aGUgbmFtZSBuZWVkIG5vdCBiZSBhIGd1YXJkZWRcbiAgICogc2VjcmV0LCB3ZSBjb3VsZCBlZmZpY2llbnRseSBoYW5kbGUgY3Jvc3MtZnJhbWUgZnJvemVuIGtleXMuXG4gICAqL1xuICB2YXIgSElEREVOX05BTUVfUFJFRklYID0gJ3dlYWttYXA6JztcbiAgdmFyIEhJRERFTl9OQU1FID0gSElEREVOX05BTUVfUFJFRklYICsgJ2lkZW50OicgKyBNYXRoLnJhbmRvbSgpICsgJ19fXyc7XG5cbiAgaWYgKHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIEFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgVWludDhBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBhYiA9IG5ldyBBcnJheUJ1ZmZlcigyNSk7XG4gICAgdmFyIHU4cyA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHU4cyk7XG4gICAgSElEREVOX05BTUUgPSBISURERU5fTkFNRV9QUkVGSVggKyAncmFuZDonICtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh1OHMsIGZ1bmN0aW9uKHU4KSB7XG4gICAgICAgIHJldHVybiAodTggJSAzNikudG9TdHJpbmcoMzYpO1xuICAgICAgfSkuam9pbignJykgKyAnX19fJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm90SGlkZGVuTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuICEoXG4gICAgICAgIG5hbWUuc3Vic3RyKDAsIEhJRERFTl9OQU1FX1BSRUZJWC5sZW5ndGgpID09IEhJRERFTl9OQU1FX1BSRUZJWCAmJlxuICAgICAgICBuYW1lLnN1YnN0cihuYW1lLmxlbmd0aCAtIDMpID09PSAnX19fJyk7XG4gIH1cblxuICAvKipcbiAgICogTW9ua2V5IHBhdGNoIGdldE93blByb3BlcnR5TmFtZXMgdG8gYXZvaWQgcmV2ZWFsaW5nIHRoZVxuICAgKiBISURERU5fTkFNRS5cbiAgICpcbiAgICogPHA+VGhlIEVTNS4xIHNwZWMgcmVxdWlyZXMgZWFjaCBuYW1lIHRvIGFwcGVhciBvbmx5IG9uY2UsIGJ1dCBhc1xuICAgKiBvZiB0aGlzIHdyaXRpbmcsIHRoaXMgcmVxdWlyZW1lbnQgaXMgY29udHJvdmVyc2lhbCBmb3IgRVM2LCBzbyB3ZVxuICAgKiBtYWRlIHRoaXMgY29kZSByb2J1c3QgYWdhaW5zdCB0aGlzIGNhc2UuIElmIHRoZSByZXN1bHRpbmcgZXh0cmFcbiAgICogc2VhcmNoIHR1cm5zIG91dCB0byBiZSBleHBlbnNpdmUsIHdlIGNhbiBwcm9iYWJseSByZWxheCB0aGlzIG9uY2VcbiAgICogRVM2IGlzIGFkZXF1YXRlbHkgc3VwcG9ydGVkIG9uIGFsbCBtYWpvciBicm93c2VycywgaWZmIG5vIGJyb3dzZXJcbiAgICogdmVyc2lvbnMgd2Ugc3VwcG9ydCBhdCB0aGF0IHRpbWUgaGF2ZSByZWxheGVkIHRoaXMgY29uc3RyYWludFxuICAgKiB3aXRob3V0IHByb3ZpZGluZyBidWlsdC1pbiBFUzYgV2Vha01hcHMuXG4gICAqL1xuICBkZWZQcm9wKE9iamVjdCwgJ2dldE93blByb3BlcnR5TmFtZXMnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZha2VHZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikge1xuICAgICAgcmV0dXJuIGdvcG4ob2JqKS5maWx0ZXIoaXNOb3RIaWRkZW5OYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBnZXRQcm9wZXJ0eU5hbWVzIGlzIG5vdCBpbiBFUzUgYnV0IGl0IGlzIHByb3Bvc2VkIGZvciBFUzYgYW5kXG4gICAqIGRvZXMgYXBwZWFyIGluIG91ciB3aGl0ZWxpc3QsIHNvIHdlIG5lZWQgdG8gY2xlYW4gaXQgdG9vLlxuICAgKi9cbiAgaWYgKCdnZXRQcm9wZXJ0eU5hbWVzJyBpbiBPYmplY3QpIHtcbiAgICB2YXIgb3JpZ2luYWxHZXRQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldFByb3BlcnR5TmFtZXM7XG4gICAgZGVmUHJvcChPYmplY3QsICdnZXRQcm9wZXJ0eU5hbWVzJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZha2VHZXRQcm9wZXJ0eU5hbWVzKG9iaikge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxHZXRQcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKGlzTm90SGlkZGVuTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogPHA+VG8gdHJlYXQgb2JqZWN0cyBhcyBpZGVudGl0eS1rZXlzIHdpdGggcmVhc29uYWJsZSBlZmZpY2llbmN5XG4gICAqIG9uIEVTNSBieSBpdHNlbGYgKGkuZS4sIHdpdGhvdXQgYW55IG9iamVjdC1rZXllZCBjb2xsZWN0aW9ucyksIHdlXG4gICAqIG5lZWQgdG8gYWRkIGEgaGlkZGVuIHByb3BlcnR5IHRvIHN1Y2gga2V5IG9iamVjdHMgd2hlbiB3ZVxuICAgKiBjYW4uIFRoaXMgcmFpc2VzIHNldmVyYWwgaXNzdWVzOlxuICAgKiA8dWw+XG4gICAqIDxsaT5BcnJhbmdpbmcgdG8gYWRkIHRoaXMgcHJvcGVydHkgdG8gb2JqZWN0cyBiZWZvcmUgd2UgbG9zZSB0aGVcbiAgICogICAgIGNoYW5jZSwgYW5kXG4gICAqIDxsaT5IaWRpbmcgdGhlIGV4aXN0ZW5jZSBvZiB0aGlzIG5ldyBwcm9wZXJ0eSBmcm9tIG1vc3RcbiAgICogICAgIEphdmFTY3JpcHQgY29kZS5cbiAgICogPGxpPlByZXZlbnRpbmcgPGk+Y2VydGlmaWNhdGlvbiB0aGVmdDwvaT4sIHdoZXJlIG9uZSBvYmplY3QgaXNcbiAgICogICAgIGNyZWF0ZWQgZmFsc2VseSBjbGFpbWluZyB0byBiZSB0aGUga2V5IG9mIGFuIGFzc29jaWF0aW9uXG4gICAqICAgICBhY3R1YWxseSBrZXllZCBieSBhbm90aGVyIG9iamVjdC5cbiAgICogPGxpPlByZXZlbnRpbmcgPGk+dmFsdWUgdGhlZnQ8L2k+LCB3aGVyZSB1bnRydXN0ZWQgY29kZSB3aXRoXG4gICAqICAgICBhY2Nlc3MgdG8gYSBrZXkgb2JqZWN0IGJ1dCBub3QgYSB3ZWFrIG1hcCBuZXZlcnRoZWxlc3NcbiAgICogICAgIG9idGFpbnMgYWNjZXNzIHRvIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhhdCBrZXkgaW4gdGhhdFxuICAgKiAgICAgd2VhayBtYXAuXG4gICAqIDwvdWw+XG4gICAqIFdlIGRvIHNvIGJ5XG4gICAqIDx1bD5cbiAgICogPGxpPk1ha2luZyB0aGUgbmFtZSBvZiB0aGUgaGlkZGVuIHByb3BlcnR5IHVuZ3Vlc3NhYmxlLCBzbyBcIltdXCJcbiAgICogICAgIGluZGV4aW5nLCB3aGljaCB3ZSBjYW5ub3QgaW50ZXJjZXB0LCBjYW5ub3QgYmUgdXNlZCB0byBhY2Nlc3NcbiAgICogICAgIGEgcHJvcGVydHkgd2l0aG91dCBrbm93aW5nIHRoZSBuYW1lLlxuICAgKiA8bGk+TWFraW5nIHRoZSBoaWRkZW4gcHJvcGVydHkgbm9uLWVudW1lcmFibGUsIHNvIHdlIG5lZWQgbm90XG4gICAqICAgICB3b3JyeSBhYm91dCBmb3ItaW4gbG9vcHMgb3Ige0Bjb2RlIE9iamVjdC5rZXlzfSxcbiAgICogPGxpPm1vbmtleSBwYXRjaGluZyB0aG9zZSByZWZsZWN0aXZlIG1ldGhvZHMgdGhhdCB3b3VsZFxuICAgKiAgICAgcHJldmVudCBleHRlbnNpb25zLCB0byBhZGQgdGhpcyBoaWRkZW4gcHJvcGVydHkgZmlyc3QsXG4gICAqIDxsaT5tb25rZXkgcGF0Y2hpbmcgdGhvc2UgbWV0aG9kcyB0aGF0IHdvdWxkIHJldmVhbCB0aGlzXG4gICAqICAgICBoaWRkZW4gcHJvcGVydHkuXG4gICAqIDwvdWw+XG4gICAqIFVuZm9ydHVuYXRlbHksIGJlY2F1c2Ugb2Ygc2FtZS1vcmlnaW4gaWZyYW1lcywgd2UgY2Fubm90IHJlbGlhYmx5XG4gICAqIGFkZCB0aGlzIGhpZGRlbiBwcm9wZXJ0eSBiZWZvcmUgYW4gb2JqZWN0IGJlY29tZXNcbiAgICogbm9uLWV4dGVuc2libGUuIEluc3RlYWQsIGlmIHdlIGVuY291bnRlciBhIG5vbi1leHRlbnNpYmxlIG9iamVjdFxuICAgKiB3aXRob3V0IGEgaGlkZGVuIHJlY29yZCB0aGF0IHdlIGNhbiBkZXRlY3QgKHdoZXRoZXIgb3Igbm90IGl0IGhhc1xuICAgKiBhIGhpZGRlbiByZWNvcmQgc3RvcmVkIHVuZGVyIGEgbmFtZSBzZWNyZXQgdG8gdXMpLCB0aGVuIHdlIGp1c3RcbiAgICogdXNlIHRoZSBrZXkgb2JqZWN0IGl0c2VsZiB0byByZXByZXNlbnQgaXRzIGlkZW50aXR5IGluIGEgYnJ1dGVcbiAgICogZm9yY2UgbGVha3kgbWFwIHN0b3JlZCBpbiB0aGUgd2VhayBtYXAsIGxvc2luZyBhbGwgdGhlIGFkdmFudGFnZXNcbiAgICogb2Ygd2Vha25lc3MgZm9yIHRoZXNlLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SGlkZGVuUmVjb3JkKGtleSkge1xuICAgIGlmIChrZXkgIT09IE9iamVjdChrZXkpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgYW4gb2JqZWN0OiAnICsga2V5KTtcbiAgICB9XG4gICAgdmFyIGhpZGRlblJlY29yZCA9IGtleVtISURERU5fTkFNRV07XG4gICAgaWYgKGhpZGRlblJlY29yZCAmJiBoaWRkZW5SZWNvcmQua2V5ID09PSBrZXkpIHsgcmV0dXJuIGhpZGRlblJlY29yZDsgfVxuICAgIGlmICghaXNFeHRlbnNpYmxlKGtleSkpIHtcbiAgICAgIC8vIFdlYWsgbWFwIG11c3QgYnJ1dGUgZm9yY2UsIGFzIGV4cGxhaW5lZCBpbiBkb2MtY29tbWVudCBhYm92ZS5cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gVGhlIGhpZGRlblJlY29yZCBhbmQgdGhlIGtleSBwb2ludCBkaXJlY3RseSBhdCBlYWNoIG90aGVyLCB2aWFcbiAgICAvLyB0aGUgXCJrZXlcIiBhbmQgSElEREVOX05BTUUgcHJvcGVydGllcyByZXNwZWN0aXZlbHkuIFRoZSBrZXlcbiAgICAvLyBmaWVsZCBpcyBmb3IgcXVpY2tseSB2ZXJpZnlpbmcgdGhhdCB0aGlzIGhpZGRlbiByZWNvcmQgaXMgYW5cbiAgICAvLyBvd24gcHJvcGVydHksIG5vdCBhIGhpZGRlbiByZWNvcmQgZnJvbSB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIC8vXG4gICAgLy8gTk9URTogQmVjYXVzZSB0aGlzIFdlYWtNYXAgZW11bGF0aW9uIGlzIG1lYW50IG9ubHkgZm9yIHN5c3RlbXMgbGlrZVxuICAgIC8vIFNFUyB3aGVyZSBPYmplY3QucHJvdG90eXBlIGlzIGZyb3plbiB3aXRob3V0IGFueSBudW1lcmljXG4gICAgLy8gcHJvcGVydGllcywgaXQgaXMgb2sgdG8gdXNlIGFuIG9iamVjdCBsaXRlcmFsIGZvciB0aGUgaGlkZGVuUmVjb3JkLlxuICAgIC8vIFRoaXMgaGFzIHR3byBhZHZhbnRhZ2VzOlxuICAgIC8vICogSXQgaXMgbXVjaCBmYXN0ZXIgaW4gYSBwZXJmb3JtYW5jZSBjcml0aWNhbCBwbGFjZVxuICAgIC8vICogSXQgYXZvaWRzIHJlbHlpbmcgb24gT2JqZWN0LmNyZWF0ZShudWxsKSwgd2hpY2ggaGFkIGJlZW5cbiAgICAvLyAgIHByb2JsZW1hdGljIG9uIENocm9tZSAyOC4wLjE0ODAuMC4gU2VlXG4gICAgLy8gICBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1jYWphL2lzc3Vlcy9kZXRhaWw/aWQ9MTY4N1xuICAgIGhpZGRlblJlY29yZCA9IHsga2V5OiBrZXkgfTtcblxuICAgIC8vIFdoZW4gdXNpbmcgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbiBvbiBwbGF0Zm9ybXMgd2hlcmVcbiAgICAvLyBPYmplY3QucHJvdG90eXBlIG1pZ2h0IG5vdCBiZSBmcm96ZW4gYW5kIE9iamVjdC5jcmVhdGUobnVsbCkgaXNcbiAgICAvLyByZWxpYWJsZSwgdXNlIHRoZSBmb2xsb3dpbmcgdHdvIGNvbW1lbnRlZCBvdXQgbGluZXMgaW5zdGVhZC5cbiAgICAvLyBoaWRkZW5SZWNvcmQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIC8vIGhpZGRlblJlY29yZC5rZXkgPSBrZXk7XG5cbiAgICAvLyBQbGVhc2UgY29udGFjdCB1cyBpZiB5b3UgbmVlZCB0aGlzIHRvIHdvcmsgb24gcGxhdGZvcm1zIHdoZXJlXG4gICAgLy8gT2JqZWN0LnByb3RvdHlwZSBtaWdodCBub3QgYmUgZnJvemVuIGFuZFxuICAgIC8vIE9iamVjdC5jcmVhdGUobnVsbCkgbWlnaHQgbm90IGJlIHJlbGlhYmxlLlxuXG4gICAgdHJ5IHtcbiAgICAgIGRlZlByb3Aoa2V5LCBISURERU5fTkFNRSwge1xuICAgICAgICB2YWx1ZTogaGlkZGVuUmVjb3JkLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaWRkZW5SZWNvcmQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFVuZGVyIHNvbWUgY2lyY3Vtc3RhbmNlcywgaXNFeHRlbnNpYmxlIHNlZW1zIHRvIG1pc3JlcG9ydCB3aGV0aGVyXG4gICAgICAvLyB0aGUgSElEREVOX05BTUUgY2FuIGJlIGRlZmluZWQuXG4gICAgICAvLyBUaGUgY2lyY3Vtc3RhbmNlcyBoYXZlIG5vdCBiZWVuIGlzb2xhdGVkLCBidXQgYXQgbGVhc3QgYWZmZWN0XG4gICAgICAvLyBOb2RlLmpzIHYwLjEwLjI2IG9uIFRyYXZpc0NJIC8gTGludXgsIGJ1dCBub3QgdGhlIHNhbWUgdmVyc2lvbiBvZlxuICAgICAgLy8gTm9kZS5qcyBvbiBPUyBYLlxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW9ua2V5IHBhdGNoIG9wZXJhdGlvbnMgdGhhdCB3b3VsZCBtYWtlIHRoZWlyIGFyZ3VtZW50XG4gICAqIG5vbi1leHRlbnNpYmxlLlxuICAgKlxuICAgKiA8cD5UaGUgbW9ua2V5IHBhdGNoZWQgdmVyc2lvbnMgdGhyb3cgYSBUeXBlRXJyb3IgaWYgdGhlaXJcbiAgICogYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdCwgc28gaXQgc2hvdWxkIG9ubHkgYmUgZG9uZSB0byBmdW5jdGlvbnNcbiAgICogdGhhdCBzaG91bGQgdGhyb3cgYSBUeXBlRXJyb3IgYW55d2F5IGlmIHRoZWlyIGFyZ3VtZW50IGlzIG5vdCBhblxuICAgKiBvYmplY3QuXG4gICAqL1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXIgb2xkRnJlZXplID0gT2JqZWN0LmZyZWV6ZTtcbiAgICBkZWZQcm9wKE9iamVjdCwgJ2ZyZWV6ZScsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ0ZyZWV6ZShvYmopIHtcbiAgICAgICAgZ2V0SGlkZGVuUmVjb3JkKG9iaik7XG4gICAgICAgIHJldHVybiBvbGRGcmVlemUob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgb2xkU2VhbCA9IE9iamVjdC5zZWFsO1xuICAgIGRlZlByb3AoT2JqZWN0LCAnc2VhbCcsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ1NlYWwob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkU2VhbChvYmopO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBvbGRQcmV2ZW50RXh0ZW5zaW9ucyA9IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucztcbiAgICBkZWZQcm9wKE9iamVjdCwgJ3ByZXZlbnRFeHRlbnNpb25zJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlkZW50aWZ5aW5nUHJldmVudEV4dGVuc2lvbnMob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkUHJldmVudEV4dGVuc2lvbnMob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBmdW5jdGlvbiBjb25zdEZ1bmMoZnVuYykge1xuICAgIGZ1bmMucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShmdW5jKTtcbiAgfVxuXG4gIHZhciBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgPSBmYWxzZTtcbiAgZnVuY3Rpb24gY2FsbGVkQXNGdW5jdGlvbldhcm5pbmcoKSB7XG4gICAgLy8gRnV0dXJlIEVTNiBXZWFrTWFwIGlzIGN1cnJlbnRseSAoMjAxMy0wOS0xMCkgZXhwZWN0ZWQgdG8gcmVqZWN0IFdlYWtNYXAoKVxuICAgIC8vIGJ1dCB3ZSB1c2VkIHRvIHBlcm1pdCBpdCBhbmQgZG8gaXQgb3Vyc2VsdmVzLCBzbyB3YXJuIG9ubHkuXG4gICAgaWYgKCFjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgPSB0cnVlO1xuICAgICAgY29uc29sZS53YXJuKCdXZWFrTWFwIHNob3VsZCBiZSBpbnZva2VkIGFzIG5ldyBXZWFrTWFwKCksIG5vdCAnICtcbiAgICAgICAgICAnV2Vha01hcCgpLiBUaGlzIHdpbGwgYmUgYW4gZXJyb3IgaW4gdGhlIGZ1dHVyZS4nKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbmV4dElkID0gMDtcblxuICB2YXIgT3VyV2Vha01hcCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBPdXJXZWFrTWFwKSkgeyAgLy8gYXBwcm94aW1hdGUgdGVzdCBmb3IgbmV3IC4uLigpXG4gICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZygpO1xuICAgIH1cblxuICAgIC8vIFdlIGFyZSBjdXJyZW50bHkgKDEyLzI1LzIwMTIpIG5ldmVyIGVuY291bnRlcmluZyBhbnkgcHJlbWF0dXJlbHlcbiAgICAvLyBub24tZXh0ZW5zaWJsZSBrZXlzLlxuICAgIHZhciBrZXlzID0gW107IC8vIGJydXRlIGZvcmNlIGZvciBwcmVtYXR1cmVseSBub24tZXh0ZW5zaWJsZSBrZXlzLlxuICAgIHZhciB2YWx1ZXMgPSBbXTsgLy8gYnJ1dGUgZm9yY2UgZm9yIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgIHZhciBpZCA9IG5leHRJZCsrO1xuXG4gICAgZnVuY3Rpb24gZ2V0X19fKGtleSwgb3B0X2RlZmF1bHQpIHtcbiAgICAgIHZhciBpbmRleDtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIGlmIChoaWRkZW5SZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGlkIGluIGhpZGRlblJlY29yZCA/IGhpZGRlblJlY29yZFtpZF0gOiBvcHRfZGVmYXVsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gdmFsdWVzW2luZGV4XSA6IG9wdF9kZWZhdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc19fXyhrZXkpIHtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIGlmIChoaWRkZW5SZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGlkIGluIGhpZGRlblJlY29yZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrZXlzLmluZGV4T2Yoa2V5KSA+PSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldF9fXyhrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIGhpZGRlblJlY29yZFtpZF0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNpbmNlIHNvbWUgYnJvd3NlcnMgcHJlZW1wdGl2ZWx5IHRlcm1pbmF0ZSBzbG93IHR1cm5zIGJ1dFxuICAgICAgICAgIC8vIHRoZW4gY29udGludWUgY29tcHV0aW5nIHdpdGggcHJlc3VtYWJseSBjb3JydXB0ZWQgaGVhcFxuICAgICAgICAgIC8vIHN0YXRlLCB3ZSBoZXJlIGRlZmVuc2l2ZWx5IGdldCBrZXlzLmxlbmd0aCBmaXJzdCBhbmQgdGhlblxuICAgICAgICAgIC8vIHVzZSBpdCB0byB1cGRhdGUgYm90aCB0aGUgdmFsdWVzIGFuZCBrZXlzIGFycmF5cywga2VlcGluZ1xuICAgICAgICAgIC8vIHRoZW0gaW4gc3luYy5cbiAgICAgICAgICBpbmRleCA9IGtleXMubGVuZ3RoO1xuICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB2YWx1ZXMgd2lsbCBiZSBvbmUgbG9uZ2VyIHRoYW4ga2V5cy5cbiAgICAgICAgICBrZXlzW2luZGV4XSA9IGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlX19fKGtleSkge1xuICAgICAgdmFyIGhpZGRlblJlY29yZCA9IGdldEhpZGRlblJlY29yZChrZXkpO1xuICAgICAgdmFyIGluZGV4LCBsYXN0SW5kZXg7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQgJiYgZGVsZXRlIGhpZGRlblJlY29yZFtpZF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNpbmNlIHNvbWUgYnJvd3NlcnMgcHJlZW1wdGl2ZWx5IHRlcm1pbmF0ZSBzbG93IHR1cm5zIGJ1dFxuICAgICAgICAvLyB0aGVuIGNvbnRpbnVlIGNvbXB1dGluZyB3aXRoIHBvdGVudGlhbGx5IGNvcnJ1cHRlZCBoZWFwXG4gICAgICAgIC8vIHN0YXRlLCB3ZSBoZXJlIGRlZmVuc2l2ZWx5IGdldCBrZXlzLmxlbmd0aCBmaXJzdCBhbmQgdGhlbiB1c2VcbiAgICAgICAgLy8gaXQgdG8gdXBkYXRlIGJvdGggdGhlIGtleXMgYW5kIHRoZSB2YWx1ZXMgYXJyYXksIGtlZXBpbmdcbiAgICAgICAgLy8gdGhlbSBpbiBzeW5jLiBXZSB1cGRhdGUgdGhlIHR3byB3aXRoIGFuIG9yZGVyIG9mIGFzc2lnbm1lbnRzLFxuICAgICAgICAvLyBzdWNoIHRoYXQgYW55IHByZWZpeCBvZiB0aGVzZSBhc3NpZ25tZW50cyB3aWxsIHByZXNlcnZlIHRoZVxuICAgICAgICAvLyBrZXkvdmFsdWUgY29ycmVzcG9uZGVuY2UsIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGRlbGV0ZS5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgbmVlZHMgdG8gd29yayBjb3JyZWN0bHkgd2hlbiBpbmRleCA9PT0gbGFzdEluZGV4LlxuICAgICAgICBsYXN0SW5kZXggPSBrZXlzLmxlbmd0aCAtIDE7XG4gICAgICAgIGtleXNbaW5kZXhdID0gdm9pZCAwO1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB0aGVyZSdzIGEgdm9pZCAwIGluIHRoZSBrZXlzIGFycmF5LCBidXRcbiAgICAgICAgLy8gbm8gb3BlcmF0aW9uIHdpbGwgY2F1c2UgYSBcImtleXMuaW5kZXhPZih2b2lkIDApXCIsIHNpbmNlXG4gICAgICAgIC8vIGdldEhpZGRlblJlY29yZCh2b2lkIDApIHdpbGwgYWx3YXlzIHRocm93IGFuIGVycm9yIGZpcnN0LlxuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWVzW2xhc3RJbmRleF07XG4gICAgICAgIC8vIElmIHdlIGNyYXNoIGhlcmUsIHZhbHVlc1tpbmRleF0gY2Fubm90IGJlIGZvdW5kIGhlcmUsXG4gICAgICAgIC8vIGJlY2F1c2Uga2V5c1tpbmRleF0gaXMgdm9pZCAwLlxuICAgICAgICBrZXlzW2luZGV4XSA9IGtleXNbbGFzdEluZGV4XTtcbiAgICAgICAgLy8gSWYgaW5kZXggPT09IGxhc3RJbmRleCBhbmQgd2UgY3Jhc2ggaGVyZSwgdGhlbiBrZXlzW2luZGV4XVxuICAgICAgICAvLyBpcyBzdGlsbCB2b2lkIDAsIHNpbmNlIHRoZSBhbGlhc2luZyBraWxsZWQgdGhlIHByZXZpb3VzIGtleS5cbiAgICAgICAga2V5cy5sZW5ndGggPSBsYXN0SW5kZXg7XG4gICAgICAgIC8vIElmIHdlIGNyYXNoIGhlcmUsIGtleXMgd2lsbCBiZSBvbmUgc2hvcnRlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgdmFsdWVzLmxlbmd0aCA9IGxhc3RJbmRleDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoT3VyV2Vha01hcC5wcm90b3R5cGUsIHtcbiAgICAgIGdldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGdldF9fXykgfSxcbiAgICAgIGhhc19fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGhhc19fXykgfSxcbiAgICAgIHNldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKHNldF9fXykgfSxcbiAgICAgIGRlbGV0ZV9fXzogeyB2YWx1ZTogY29uc3RGdW5jKGRlbGV0ZV9fXykgfVxuICAgIH0pO1xuICB9O1xuXG4gIE91cldlYWtNYXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gICAgZ2V0OiB7XG4gICAgICAvKipcbiAgICAgICAqIFJldHVybiB0aGUgdmFsdWUgbW9zdCByZWNlbnRseSBhc3NvY2lhdGVkIHdpdGgga2V5LCBvclxuICAgICAgICogb3B0X2RlZmF1bHQgaWYgbm9uZS5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9fXyhrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBoYXM6IHtcbiAgICAgIC8qKlxuICAgICAgICogSXMgdGhlcmUgYSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGgga2V5IGluIHRoaXMgV2Vha01hcD9cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzX19fKGtleSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgc2V0OiB7XG4gICAgICAvKipcbiAgICAgICAqIEFzc29jaWF0ZSB2YWx1ZSB3aXRoIGtleSBpbiB0aGlzIFdlYWtNYXAsIG92ZXJ3cml0aW5nIGFueVxuICAgICAgICogcHJldmlvdXMgYXNzb2NpYXRpb24gaWYgcHJlc2VudC5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldF9fXyhrZXksIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICAnZGVsZXRlJzoge1xuICAgICAgLyoqXG4gICAgICAgKiBSZW1vdmUgYW55IGFzc29jaWF0aW9uIGZvciBrZXkgaW4gdGhpcyBXZWFrTWFwLCByZXR1cm5pbmdcbiAgICAgICAqIHdoZXRoZXIgdGhlcmUgd2FzIG9uZS5cbiAgICAgICAqXG4gICAgICAgKiA8cD5Ob3RlIHRoYXQgdGhlIGJvb2xlYW4gcmV0dXJuIGhlcmUgZG9lcyBub3Qgd29yayBsaWtlIHRoZVxuICAgICAgICoge0Bjb2RlIGRlbGV0ZX0gb3BlcmF0b3IuIFRoZSB7QGNvZGUgZGVsZXRlfSBvcGVyYXRvciByZXR1cm5zXG4gICAgICAgKiB3aGV0aGVyIHRoZSBkZWxldGlvbiBzdWNjZWVkcyBhdCBicmluZ2luZyBhYm91dCBhIHN0YXRlIGluXG4gICAgICAgKiB3aGljaCB0aGUgZGVsZXRlZCBwcm9wZXJ0eSBpcyBhYnNlbnQuIFRoZSB7QGNvZGUgZGVsZXRlfVxuICAgICAgICogb3BlcmF0b3IgdGhlcmVmb3JlIHJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgd2FzIGFscmVhZHlcbiAgICAgICAqIGFic2VudCwgd2hlcmVhcyB0aGlzIHtAY29kZSBkZWxldGV9IG1ldGhvZCByZXR1cm5zIGZhbHNlIGlmXG4gICAgICAgKiB0aGUgYXNzb2NpYXRpb24gd2FzIGFscmVhZHkgYWJzZW50LlxuICAgICAgICovXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGVfX18oa2V5KTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBIb3N0V2Vha01hcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIC8vIElmIHdlIGdvdCBoZXJlLCB0aGVuIHRoZSBwbGF0Zm9ybSBoYXMgYSBXZWFrTWFwIGJ1dCB3ZSBhcmUgY29uY2VybmVkXG4gICAgICAvLyB0aGF0IGl0IG1heSByZWZ1c2UgdG8gc3RvcmUgc29tZSBrZXkgdHlwZXMuIFRoZXJlZm9yZSwgbWFrZSBhIG1hcFxuICAgICAgLy8gaW1wbGVtZW50YXRpb24gd2hpY2ggbWFrZXMgdXNlIG9mIGJvdGggYXMgcG9zc2libGUuXG5cbiAgICAgIC8vIEluIHRoaXMgbW9kZSB3ZSBhcmUgYWx3YXlzIHVzaW5nIGRvdWJsZSBtYXBzLCBzbyB3ZSBhcmUgbm90IHByb3h5LXNhZmUuXG4gICAgICAvLyBUaGlzIGNvbWJpbmF0aW9uIGRvZXMgbm90IG9jY3VyIGluIGFueSBrbm93biBicm93c2VyLCBidXQgd2UgaGFkIGJlc3RcbiAgICAgIC8vIGJlIHNhZmUuXG4gICAgICBpZiAoZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSAmJiB0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFByb3h5ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBEb3VibGVXZWFrTWFwKCkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgT3VyV2Vha01hcCkpIHsgIC8vIGFwcHJveGltYXRlIHRlc3QgZm9yIG5ldyAuLi4oKVxuICAgICAgICAgIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmVmZXJhYmxlLCB0cnVseSB3ZWFrIG1hcC5cbiAgICAgICAgdmFyIGhtYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcblxuICAgICAgICAvLyBPdXIgaGlkZGVuLXByb3BlcnR5LWJhc2VkIHBzZXVkby13ZWFrLW1hcC4gTGF6aWx5IGluaXRpYWxpemVkIGluIHRoZVxuICAgICAgICAvLyAnc2V0JyBpbXBsZW1lbnRhdGlvbjsgdGh1cyB3ZSBjYW4gYXZvaWQgcGVyZm9ybWluZyBleHRyYSBsb29rdXBzIGlmXG4gICAgICAgIC8vIHdlIGtub3cgYWxsIGVudHJpZXMgYWN0dWFsbHkgc3RvcmVkIGFyZSBlbnRlcmVkIGluICdobWFwJy5cbiAgICAgICAgdmFyIG9tYXAgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gSGlkZGVuLXByb3BlcnR5IG1hcHMgYXJlIG5vdCBjb21wYXRpYmxlIHdpdGggcHJveGllcyBiZWNhdXNlIHByb3hpZXNcbiAgICAgICAgLy8gY2FuIG9ic2VydmUgdGhlIGhpZGRlbiBuYW1lIGFuZCBlaXRoZXIgYWNjaWRlbnRhbGx5IGV4cG9zZSBpdCBvciBmYWlsXG4gICAgICAgIC8vIHRvIGFsbG93IHRoZSBoaWRkZW4gcHJvcGVydHkgdG8gYmUgc2V0LiBUaGVyZWZvcmUsIHdlIGRvIG5vdCBhbGxvd1xuICAgICAgICAvLyBhcmJpdHJhcnkgV2Vha01hcHMgdG8gc3dpdGNoIHRvIHVzaW5nIGhpZGRlbiBwcm9wZXJ0aWVzLCBidXQgb25seVxuICAgICAgICAvLyB0aG9zZSB3aGljaCBuZWVkIHRoZSBhYmlsaXR5LCBhbmQgdW5wcml2aWxlZ2VkIGNvZGUgaXMgbm90IGFsbG93ZWRcbiAgICAgICAgLy8gdG8gc2V0IHRoZSBmbGFnLlxuICAgICAgICAvL1xuICAgICAgICAvLyAoRXhjZXB0IGluIGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgbW9kZSBpbiB3aGljaCBjYXNlIHdlXG4gICAgICAgIC8vIGRpc2FibGUgcHJveGllcy4pXG4gICAgICAgIHZhciBlbmFibGVTd2l0Y2hpbmcgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiBkZ2V0KGtleSwgb3B0X2RlZmF1bHQpIHtcbiAgICAgICAgICBpZiAob21hcCkge1xuICAgICAgICAgICAgcmV0dXJuIGhtYXAuaGFzKGtleSkgPyBobWFwLmdldChrZXkpXG4gICAgICAgICAgICAgICAgOiBvbWFwLmdldF9fXyhrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhtYXAuZ2V0KGtleSwgb3B0X2RlZmF1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRoYXMoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGhtYXAuaGFzKGtleSkgfHwgKG9tYXAgPyBvbWFwLmhhc19fXyhrZXkpIDogZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRzZXQ7XG4gICAgICAgIGlmIChkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlKSB7XG4gICAgICAgICAgZHNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGhtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFobWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgIGlmICghb21hcCkgeyBvbWFwID0gbmV3IE91cldlYWtNYXAoKTsgfVxuICAgICAgICAgICAgICBvbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChlbmFibGVTd2l0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmICghb21hcCkgeyBvbWFwID0gbmV3IE91cldlYWtNYXAoKTsgfVxuICAgICAgICAgICAgICAgIG9tYXAuc2V0X19fKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkZGVsZXRlKGtleSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSAhIWhtYXBbJ2RlbGV0ZSddKGtleSk7XG4gICAgICAgICAgaWYgKG9tYXApIHsgcmV0dXJuIG9tYXAuZGVsZXRlX19fKGtleSkgfHwgcmVzdWx0OyB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKE91cldlYWtNYXAucHJvdG90eXBlLCB7XG4gICAgICAgICAgZ2V0X19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoZGdldCkgfSxcbiAgICAgICAgICBoYXNfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhkaGFzKSB9LFxuICAgICAgICAgIHNldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGRzZXQpIH0sXG4gICAgICAgICAgZGVsZXRlX19fOiB7IHZhbHVlOiBjb25zdEZ1bmMoZGRlbGV0ZSkgfSxcbiAgICAgICAgICBwZXJtaXRIb3N0T2JqZWN0c19fXzogeyB2YWx1ZTogY29uc3RGdW5jKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cykge1xuICAgICAgICAgICAgICBlbmFibGVTd2l0Y2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdib2d1cyBjYWxsIHRvIHBlcm1pdEhvc3RPYmplY3RzX19fJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSl9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgRG91YmxlV2Vha01hcC5wcm90b3R5cGUgPSBPdXJXZWFrTWFwLnByb3RvdHlwZTtcbiAgICAgIG1vZHVsZS5leHBvcnRzID0gRG91YmxlV2Vha01hcDtcblxuICAgICAgLy8gZGVmaW5lIC5jb25zdHJ1Y3RvciB0byBoaWRlIE91cldlYWtNYXAgY3RvclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYWtNYXAucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCB7XG4gICAgICAgIHZhbHVlOiBXZWFrTWFwLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSwgIC8vIGFzIGRlZmF1bHQgLmNvbnN0cnVjdG9yIGlzXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhlcmUgaXMgbm8gaG9zdCBXZWFrTWFwLCBzbyB3ZSBtdXN0IHVzZSB0aGUgZW11bGF0aW9uLlxuXG4gICAgLy8gRW11bGF0ZWQgV2Vha01hcHMgYXJlIGluY29tcGF0aWJsZSB3aXRoIG5hdGl2ZSBwcm94aWVzIChiZWNhdXNlIHByb3hpZXNcbiAgICAvLyBjYW4gb2JzZXJ2ZSB0aGUgaGlkZGVuIG5hbWUpLCBzbyB3ZSBtdXN0IGRpc2FibGUgUHJveHkgdXNhZ2UgKGluXG4gICAgLy8gQXJyYXlMaWtlIGFuZCBEb21hZG8sIGN1cnJlbnRseSkuXG4gICAgaWYgKHR5cGVvZiBQcm94eSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIFByb3h5ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gT3VyV2Vha01hcDtcbiAgfVxufSkoKTtcbiIsImltcG9ydCB7XG4gIGdldEVudGl0aWVzLFxuICBXaWtpZGF0YVByb3BlcnR5LFxuICBXaWtpZGF0YUxhbmd1YWdlLFxuICBnZXRXaWtpZGF0YUlkc0Zyb21XaWtpcGVkaWFUaXRsZXMsXG4gIFdpa2lkYXRhU2l0ZVxufSBmcm9tIFwid2lraWRhdGEtc2RrXCI7XG5pbXBvcnQgQXhpb3MsIHsgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSBcImF4aW9zXCI7XG5cbnR5cGUgU3RyaW5nT3JTdHJpbmdBcnJheSA9IHN0cmluZyB8IHN0cmluZ1tdO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR2V0RW50aXR5KFxuICBmcm9tOiB7IGlkPzogU3RyaW5nT3JTdHJpbmdBcnJheTsgdGl0bGU/OiBTdHJpbmdPclN0cmluZ0FycmF5IH0sXG4gIHNldHRpbmc/OiB7XG4gICAgbGFuZ3VhZ2VzPzogV2lraWRhdGFMYW5ndWFnZSB8IFdpa2lkYXRhTGFuZ3VhZ2VbXTtcbiAgICBwcm9wcz86IFdpa2lkYXRhUHJvcGVydHkgfCBXaWtpZGF0YVByb3BlcnR5W107XG4gICAgc2l0ZWxpbms/OiBXaWtpZGF0YVNpdGU7XG4gIH0sXG4gIGNvbmZpZz86IEF4aW9zUmVxdWVzdENvbmZpZ1xuKSB7XG4gIGlmICghZnJvbS5pZCAmJiAhZnJvbS50aXRsZSkgdGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgYWRkIGVpdGhlciBpZCBvciB0aXRsZVwiKTtcblxuICBsZXQgdXJsID0gXCJcIjtcblxuICBpZiAoZnJvbS5pZClcbiAgICB1cmwgPSBnZXRFbnRpdGllcyh7XG4gICAgICBpZHM6IGZyb20uaWQsXG4gICAgICBsYW5ndWFnZXM6IHNldHRpbmcgJiYgc2V0dGluZy5sYW5ndWFnZXMsXG4gICAgICBwcm9wczogc2V0dGluZyAmJiBzZXR0aW5nLnByb3BzXG4gICAgfSk7XG4gIGVsc2UgaWYgKGZyb20udGl0bGUpXG4gICAgdXJsID0gZ2V0V2lraWRhdGFJZHNGcm9tV2lraXBlZGlhVGl0bGVzKHtcbiAgICAgIHRpdGxlczogZnJvbS50aXRsZSxcbiAgICAgIGxhbmd1YWdlczogc2V0dGluZyAmJiBzZXR0aW5nLmxhbmd1YWdlcyxcbiAgICAgIHByb3BzOiBzZXR0aW5nICYmIHNldHRpbmcucHJvcHMsXG4gICAgICBzaXRlczogc2V0dGluZyAmJiBzZXR0aW5nLnNpdGVsaW5rXG4gICAgfSk7XG5cbiAgcmV0dXJuIEF4aW9zLmdldCh1cmwsIGNvbmZpZyk7XG59XG4iLCIvKipcbiAqIEBtb2R1bGUgc2VhcmNoLm1vZGVsXG4gKi9cblxuaW1wb3J0IERpY3QgZnJvbSBcImNvbGxlY3Rpb25zL2RpY3RcIjtcblxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0LCBTZWFyY2hSZXN1bHRUeXBlIH0gZnJvbSBcIi4vU2VhcmNoUmVzdWx0XCI7XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hDb2xsZWN0aW9uIHtcbiAgcHJpdmF0ZSB0czogRGljdDxTZWFyY2hSZXN1bHQ+O1xuXG4gIGNvbnN0cnVjdG9yKHRzPzogU2VhcmNoUmVzdWx0W10pIHtcbiAgICB0aGlzLnRzID0gbmV3IERpY3Q8U2VhcmNoUmVzdWx0PigpO1xuXG4gICAgaWYgKHRzKSB0cy5mb3JFYWNoKHQgPT4gdGhpcy5hZGQodCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgcmVzdWx0IHRvIGNvbGxlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHQgcmVzdWx0IGVpdGhlciByYXcgcmVzdWx0IGZyb20gVVJMIEFQSXMgb3Igb2JqZWN0IHNlYXJjaCByZXN1bHRcbiAgICovXG4gIGFkZCh0OiBTZWFyY2hSZXN1bHQgfCBTZWFyY2hSZXN1bHRUeXBlKSB7XG4gICAgaWYgKHQgaW5zdGFuY2VvZiBTZWFyY2hSZXN1bHQpIHRoaXMudHMuc2V0KHQuaWQsIHQpO1xuICAgIGVsc2UgdGhpcy50cy5zZXQodC5pZCwgbmV3IFNlYXJjaFJlc3VsdCh0KSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHJlc3VsdCBieSBlbnRpdGllcyBJRFxuICAgKiBAcGFyYW0gaWQgZW50aXRpZXMgSURcbiAgICovXG4gIGdldChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy50cy5nZXQoaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiBvbmx5IGZpcnN0IG1hdGNoIHRvIHRoZSBmaWx0ZXIgZnVuY3Rpb24gb3IgdW5kZWZpbmVkLCBpZiBtYXRjaGVzIG5vdGhpbmdcbiAgICpcbiAgICogQHBhcmFtIGZuIGZpbHRlciBmdW5jdGlvblxuICAgKi9cbiAgb25seShmbjogKHY6IFNlYXJjaFJlc3VsdCkgPT4gYm9vbGVhbikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudHMuZmlsdGVyKGZuKTtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSByZXR1cm4gcmVzdWx0LnRvQXJyYXkoKVswXTtcbiAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogbGlzdCBhbGwgcmVzdWx0cyBhcyB7QGxpbmsgUmVzdWx0VHlwZX1cbiAgICpcbiAgICovXG4gIGxpc3RBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMudHMubWFwKHYgPT4gdi50b0pTT04oKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZpcnN0IGluZGV4IG9mIHRoZSBhcnJheVxuICAgKi9cbiAgZmlyc3QoKSB7XG4gICAgY29uc3QgYXJyID0gdGhpcy50cy50b0FycmF5KCk7XG4gICAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyWzBdIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsYXN0IGluZGV4IG9mIHRoZSBhcnJheVxuICAgKi9cbiAgbGFzdCgpIHtcbiAgICBjb25zdCBhcnIgPSB0aGlzLnRzLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnJbYXJyLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudHMubWFwKHYgPT4gdi50b1N0cmluZygpKS5qb2luKFwiXFxuXCIpO1xuICB9XG59XG4iLCIvKipcbiAqIEBtb2R1bGUgc2VhcmNoLm1vZGVsXG4gKi9cblxuaW1wb3J0IHsgV2lraWRhdGFMYW5ndWFnZSB9IGZyb20gXCJ3aWtpZGF0YS1zZGtcIjtcblxuLyoqXG4gKiB0aGUgb2JqZWN0IHRoYXQgdGVsbCB1cywgaG93IHRoZSByZXN1bHQgbWF0Y2hlcyB0byB0aGUgcXVlcnlcbiAqL1xuZXhwb3J0IHR5cGUgRW50aXR5TWF0Y2hUeXBlID0ge1xuICAvKipcbiAgICogdGhhdCBtYXRjaCB3aXRoIGEgcXVlcnlcbiAgICovXG4gIHR5cGU6IHN0cmluZztcbiAgLyoqXG4gICAqIHRoZSBsYW5ndWFnZSBvZiB0aGUgbWF0Y2hlcyB0byBhIHF1ZXJ5XG4gICAqL1xuICBsYW5ndWFnZTogV2lraWRhdGFMYW5ndWFnZTtcbiAgLyoqXG4gICAqIHRleHQgb2YgdGhlIHF1ZXJ5XG4gICAqL1xuICB0ZXh0OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIHRoZSByZXR1cm4gcmVzdWx0IGZyb20gQVBJcyBxdWVyeS5cbiAqL1xuZXhwb3J0IHR5cGUgU2VhcmNoUmVzdWx0VHlwZSA9IHtcbiAgLyoqXG4gICAqICg/Pz8pXG4gICAqL1xuICByZXBvc2l0b3J5OiBzdHJpbmc7XG4gIC8qKlxuICAgKiB0aGUgZW50aXRpZXMgSUQgKHNob3VsZCBzdGFydCB3aXRoIFEgb3IgUCA/Pz8pXG4gICAqL1xuICBpZDogc3RyaW5nO1xuICAvKipcbiAgICogY29uY2VwdHVyaSBpcyBhIGNvbmNlcHQgdXJsIG9mIHRoZSBlbnRpdGllcyAodXN1YWxseSB3aWxsIGJlIG9uIHRoaXMgZm9ybTogaHR0cDovL3d3dy53aWtpZGF0YS5vcmcvZW50aXR5LzxpZD4pXG4gICAqL1xuICBjb25jZXB0dXJpOiBzdHJpbmc7XG4gIC8qKlxuICAgKiB0aGUgdGl0bGUgb2YgdGhlIGlkICh1c3VhbGx5IHdpbGwgYmUgdGhlIHNhbWUgYXMgaWQgPz8/KVxuICAgKi9cbiAgdGl0bGU6IHN0cmluZztcbiAgLyoqXG4gICAqIGEgd2lraWRhdGEgcGFnZSBpZCAoPz8/KVxuICAgKi9cbiAgcGFnZWlkOiBudW1iZXI7XG4gIC8qKlxuICAgKiBhIHdpa2lkYXRhIHVybCAoc2hvdWxkIGJlIGluZm9ybSBvZiAnaHR0cDovL3d3dy53aWtpZGF0YS5vcmcvd2lraS88aWQ+JylcbiAgICovXG4gIHVybDogc3RyaW5nO1xuICAvKipcbiAgICogbGFiZWwgb2YgZW50aXRpZXMgdGhhdCB3aWxsIHNob3cgYXMgYSB0aXRsZSBpbiB3ZWJzaXRlIChzaG91bGQgYmUgaHVtYW4gcmVhZGFibGUgc3RyaW5nIHRleHQpXG4gICAqL1xuICBsYWJlbDogc3RyaW5nO1xuICAvKipcbiAgICogZGVzY3JpcHRpb24gb2YgdGhpcyBsYWJlbCAobWlnaHQgbm90IGV4aXN0IGluIHNvbWUgb2YgbGFuZ3VhZ2UgYW5kIGVudGl0aWVzKVxuICAgKi9cbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiB0aGUgb2JqZWN0IHNob3cgaG93IHRoaXMgZW50aXRpZXMgaXMgbWF0Y2ggYSBxdWVyeVxuICAgKi9cbiAgbWF0Y2g/OiBFbnRpdHlNYXRjaFR5cGU7XG4gIC8qKlxuICAgKiBhIGFsaWFzIGtleSBvZiB0aGUgZW50aXR5XG4gICAqL1xuICBhbGlhc2VzPzogc3RyaW5nW107XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn07XG5cbi8qKlxuICogU2VhcmNoIHJlc3VsdCB0eXBlIGlzIHRoZSByZXN1bHQgdHlwZSB0aGF0IHlvdSB3aWxsIHJlY2VpdmUgYWZ0ZXIgZmV0Y2hpbmcgdGhlIFJFU1QgQVBJXG4gKlxuICogQHBhcmFtIHNlYXJjaGluZm8gaXMgYSBvYmplY3QgY29udGFpbiBzZWFyY2hpbmcgcXVlcnlcbiAqIEBwYXJhbSBzZWFyY2hpbmZvLnNlYXJjaCBpcyBhIHNlYXJjaCBxdWVyeVxuICogQHBhcmFtIHNlYXJjaCBpcyBhIGFycmF5IG9mIGVudGl0aWVzIHJlc3VsdFxuICovXG5leHBvcnQgdHlwZSBSYXdTZWFyY2hSZXN1bHRUeXBlID0ge1xuICBzZWFyY2hpbmZvOiB7XG4gICAgc2VhcmNoOiBzdHJpbmc7XG4gIH07XG4gIHNlYXJjaDogU2VhcmNoUmVzdWx0VHlwZVtdO1xufTtcblxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdCB7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiB0aGUgZW50aXRpZXMgSUQgKHNob3VsZCBzdGFydCB3aXRoIFEgb3IgUCA/Pz8pXG4gICAqL1xuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZztcbiAgLyoqXG4gICAqIHRpdGxlIG9mIHRoZSBpZCAodXN1YWxseSB3aWxsIGJlIHRoZSBzYW1lIGFzIGlkID8/PylcbiAgICovXG4gIGdldCB0aXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGl0bGU7XG4gIH1cblxuICBwcml2YXRlIF9sYWJlbDogc3RyaW5nO1xuICAvKipcbiAgICogTGFiZWwgaXMgYSBzdHJpbmcgdGhhdCB3aWxsIHNob3cgYXMgYSB0aXRsZSBpbiB3ZWJzaXRlIChzaG91bGQgYmUgaHVtYW4gcmVhZGFibGUgc3RyaW5nIHRleHQpXG4gICAqL1xuICBnZXQgbGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xhYmVsO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NyaXB0aW9uIGlzIGEgZXhwbGFpbmF0aW9uIG9mIGEgbGFiZWwgKG1pZ2h0IG5vdCBleGlzdCBpbiBzb21lIG9mIGxhbmd1YWdlIGFuZCBlbnRpdGllcylcbiAgICovXG4gIGdldCBkZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvcm1hdGlvbi5kZXNjcmlwdGlvbiB8fCBcIlwiO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmNlcHQgVVJJIGlzIGEgdXJsIG9mIHRoZSBlbnRpdGllcyAodXN1YWxseSB3aWxsIGJlIG9uIHRoaXMgZm9ybTogaHR0cDovL3d3dy53aWtpZGF0YS5vcmcvZW50aXR5LzxpZD4pXG4gICAqL1xuICBnZXQgY29uY2VwdHVyaSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvcm1hdGlvbi5jb25jZXB0dXJpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVSTCBpcyBhIHdpa2lkYXRhIHVybCAoc2hvdWxkIGJlIGluZm9ybSBvZiAnaHR0cDovL3d3dy53aWtpZGF0YS5vcmcvd2lraS88aWQ+JylcbiAgICovXG4gIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuIGBodHRwczoke3RoaXMuaW5mb3JtYXRpb24udXJsfWA7XG4gIH1cblxuICBnZXQgcGFnZWlkKCkge1xuICAgIHJldHVybiB0aGlzLmluZm9ybWF0aW9uLnBhZ2VpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXRjaCBvYmplY3Qgd2lsbCBzaG93IGhvdyB0aGlzIGVudGl0aWVzIGlzIG1hdGNoIGEgcXVlcnlcbiAgICovXG4gIGdldCBtYXRjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvcm1hdGlvbi5tYXRjaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhc2VzIG9mIHRoZSBlbnRpdGllc1xuICAgKi9cbiAgZ2V0IGFsaWFzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mb3JtYXRpb24uYWxpYXNlcyB8fCBbXTtcbiAgfVxuXG4gIHByaXZhdGUgaW5mb3JtYXRpb246IFNlYXJjaFJlc3VsdFR5cGU7XG5cbiAgY29uc3RydWN0b3IocXVlcnlSZXN1bHQ6IFNlYXJjaFJlc3VsdFR5cGUpIHtcbiAgICB0aGlzLl9pZCA9IHF1ZXJ5UmVzdWx0LmlkO1xuICAgIHRoaXMuX3RpdGxlID0gcXVlcnlSZXN1bHQudGl0bGU7XG5cbiAgICB0aGlzLl9sYWJlbCA9IHF1ZXJ5UmVzdWx0LmxhYmVsO1xuXG4gICAgdGhpcy5pbmZvcm1hdGlvbiA9IHF1ZXJ5UmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBtb3JlIGluZm9ybWF0aW9uIHRoYXQgTUlHSFQgcmVjZWl2ZSBmcm9tIEFQSXNcbiAgICpcbiAgICogQHBhcmFtIGtleSBpbmZvcm1hdGlvbiBrZXlcbiAgICogQHJldHVybiBEZXBlbmQgd2hhdCB5b3UgcGFzcyBpbiBpbnB1dC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXRNb3JlSW5mb3JtYXRpb24oa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvcm1hdGlvbltrZXldO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgJHt0aGlzLl9pZH06ICR7dGhpcy5fbGFiZWx9ICgke3RoaXMuaW5mb3JtYXRpb24uZGVzY3JpcHRpb259KWA7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLmluZm9ybWF0aW9uO1xuICB9XG59XG4iLCIvKipcbiAqIEBtb2R1bGUgc2VhcmNoLmFwaVxuICovXG5cbmltcG9ydCBheGlvcywgeyBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tIFwiYXhpb3NcIjtcblxuaW1wb3J0IHsgV2lraWRhdGFMYW5ndWFnZSwgc2VhcmNoRW50aXRpZXMgfSBmcm9tIFwid2lraWRhdGEtc2RrXCI7XG5pbXBvcnQgeyBSYXdTZWFyY2hSZXN1bHRUeXBlIH0gZnJvbSBcIi4vU2VhcmNoUmVzdWx0XCI7XG5pbXBvcnQgeyBTZWFyY2hDb2xsZWN0aW9uIH0gZnJvbSBcIi4vU2VhcmNoQ29sbGVjdGlvblwiO1xuXG4vKipcbiAqIFNlYXJjaGluZyBvcHRpb25zXG4gKi9cbmV4cG9ydCB0eXBlIFNlYXJjaE9wdGlvbiA9IHtcbiAgLyoqXG4gICAqIHNlYXJjaGluZyBzdHJpbmdcbiAgICovXG4gIHNlYXJjaDogc3RyaW5nO1xuICAvKipcbiAgICogdGhlIGxhbmd1YWdlIG9mIHNlYXJjaCBxdWVyeSAoZGVmYXVsdD1lbilcbiAgICovXG4gIGxhbmd1YWdlPzogV2lraWRhdGFMYW5ndWFnZTtcbiAgLyoqXG4gICAqIGxpbWl0IHJlc3VsdCAoZGVmYXVsdD0yMClcbiAgICovXG4gIGxpbWl0Pzogc3RyaW5nIHwgbnVtYmVyO1xuICAvKipcbiAgICogdGhlIGxhbmd1YWdlIGluIHdoaWNoIHRoZSBzZWFyY2ggcmVzdWx0cyBhcmUgcmV0dXJuZWRcbiAgICovXG4gIHVzZWxhbmc/OiBXaWtpZGF0YUxhbmd1YWdlO1xuICAvKipcbiAgICogYXhpb3MgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICovXG4gIGNvbmZpZz86IEF4aW9zUmVxdWVzdENvbmZpZztcbn07XG5cbi8qKlxuICogVGhpcyBtZXRob2Qgd2lsbCBmZXRjaGluZyBlbnRpdGllcyBiYXNlIG9uIGlucHV0IHNlYXJjaGluZyBzdHJpbmdcbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBzZWFyY2hpbmcgb3B0aW9uc1xuICogQHBhcmFtIG9wdGlvbnMuc2VhcmNoIHNlYXJjaGluZyBzdHJpbmdcbiAqIEBwYXJhbSBvcHRpb25zLmxhbmd1YWdlIHRoZSBsYW5ndWFnZSBvZiBzZWFyY2ggcXVlcnkgKGRlZmF1bHQ9ZW4pXG4gKiBAcGFyYW0gb3B0aW9ucy5saW1pdCBsaW1pdCByZXN1bHQgKGRlZmF1bHQ9MjApXG4gKiBAcGFyYW0gb3B0aW9ucy51c2VsYW5nIHRoZSBsYW5ndWFnZSBpbiB3aGljaCB0aGUgc2VhcmNoIHJlc3VsdHMgYXJlIHJldHVybmVkXG4gKiBAcGFyYW0gb3B0aW9ucy5jb25maWcgYXhpb3MgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqXG4gKiBAcmV0dXJuIFRoaXMgcmVzdWx0IHdpbGwgYmUge0BsaW5rIFNlYXJjaENvbGxlY3Rpb259IG9iamVjdFxuICpcbiAqIEBzZWUgaHR0cHM6Ly93d3cud2lraWRhdGEub3JnL3cvYXBpLnBocD9hY3Rpb249aGVscCZtb2R1bGVzPXdic2VhcmNoZW50aXRpZXNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFNlYXJjaEVudGl0aWVzKG9wdGlvbnM6IFNlYXJjaE9wdGlvbikge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcy5nZXQ8UmF3U2VhcmNoUmVzdWx0VHlwZT4oc2VhcmNoRW50aXRpZXMob3B0aW9ucyksIG9wdGlvbnMuY29uZmlnKTtcbiAgLy8gY29uc29sZS5sb2cocmVzdWx0LmRhdGEuc2VhcmNoKTtcblxuICBjb25zdCBjb2xsZWN0aW9uID0gbmV3IFNlYXJjaENvbGxlY3Rpb24oKTtcbiAgcmVzdWx0LmRhdGEuc2VhcmNoLmZvckVhY2goc2VhcmNoID0+IGNvbGxlY3Rpb24uYWRkKHNlYXJjaCkpO1xuICByZXR1cm4gY29sbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyB7QGxpbmsgU2VhcmNoRW50aXRpZXN9IHdpdGggZ2V0IG9ubHkgZmlyc3QgcmVzdWx0XG4gKlxuICogQHBhcmFtIG9wdGlvbnMgc2VhcmNoaW5nIG9wdGlvbnNcbiAqIEBwYXJhbSBvcHRpb25zLnNlYXJjaCBzZWFyY2hpbmcgc3RyaW5nXG4gKiBAcGFyYW0gb3B0aW9ucy5sYW5ndWFnZSB0aGUgbGFuZ3VhZ2Ugb2Ygc2VhcmNoIHF1ZXJ5IChkZWZhdWx0PWVuKVxuICogQHBhcmFtIG9wdGlvbnMubGltaXQgVGhpcyBvcHRpb24gd2lsbCBiZSBvdmVycmlkZWQgYnkgMVxuICogQHBhcmFtIG9wdGlvbnMudXNlbGFuZyB0aGUgbGFuZ3VhZ2UgaW4gd2hpY2ggdGhlIHNlYXJjaCByZXN1bHRzIGFyZSByZXR1cm5lZFxuICogQHBhcmFtIG9wdGlvbnMuY29uZmlnIGF4aW9zIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKlxuICogQHJldHVybiBUaGlzIHJlc3VsdCB3aWxsIGJlIHtAbGluayBTZWFyY2hSZXN1bHR9IG9iamVjdCBvciB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFNlYXJjaEVudGl0eShvcHRpb25zOiBTZWFyY2hPcHRpb24pIHtcbiAgb3B0aW9ucy5saW1pdCA9IDE7IC8vIG92ZXJyaWRlIGxpbWl0IHNlYXJjaFxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBTZWFyY2hFbnRpdGllcyhvcHRpb25zKTtcbiAgY29uc3QgZmlyc3QgPSByZXN1bHQuZmlyc3QoKTtcbiAgaWYgKCFmaXJzdCkgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2VhcmNoIGRhdGEgd2l0aCAke29wdGlvbnN9YCk7XG4gIHJldHVybiBmaXJzdDtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIExvdyBsZXZlbCBBUElzIGZvciBtYWtpbmcgZWFjaCBvZiB3aWtpZGF0YSBhcGkgcmF3IHdpdGhvdXQgYW55IG1hcHBpbmcgdG8gamF2YXNjcmlwdCBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBMb3dMZXZlbFNlYXJjaEFQSXMge1xuICAvKipcbiAgICogZ2V0IHNlYXJjaGluZyBBUElzIGxpbmtcbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgc2VhcmNoaW5nIG9wdGlvbnNcbiAgICogQHBhcmFtIG9wdGlvbnMuc2VhcmNoIHNlYXJjaGluZyBzdHJpbmdcbiAgICogQHBhcmFtIG9wdGlvbnMubGFuZ3VhZ2UgdGhlIGxhbmd1YWdlIG9mIHNlYXJjaCBxdWVyeSAoZGVmYXVsdD1lbilcbiAgICogQHBhcmFtIG9wdGlvbnMubGltaXQgcmVzcG9uc2UgcmVzdWx0IGxpbWl0IGxlbmd0aFxuICAgKiBAcGFyYW0gb3B0aW9ucy51c2VsYW5nIHRoZSBsYW5ndWFnZSBpbiB3aGljaCB0aGUgc2VhcmNoIHJlc3VsdHMgYXJlIHJldHVybmVkXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvbmZpZyB0aGlzIG9wdGlvbnMgd2lsbCBiZSBpZ25vcmVcbiAgICpcbiAgICogQHJldHVybiByZXR1cm4gUkVTVF9BUEkgbGluayBmb3Igc2VhcmNoaW5nXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIEdldExpbmsob3B0aW9uczogU2VhcmNoT3B0aW9uKSB7XG4gICAgcmV0dXJuIHNlYXJjaEVudGl0aWVzKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyeSB0byBzZWFyY2ggdGhlIGlucHV0IHN0cmluZyBpbiB3aWtpZGF0YSB1c2luZyB3YnNlYXJjaGVudGl0aWVzIEFQSXNcbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgc2VhcmNoaW5nIG9wdGlvbnNcbiAgICogQHBhcmFtIG9wdGlvbnMuc2VhcmNoIHNlYXJjaGluZyBzdHJpbmdcbiAgICogQHBhcmFtIG9wdGlvbnMubGFuZ3VhZ2UgdGhlIGxhbmd1YWdlIG9mIHNlYXJjaCBxdWVyeSAoZGVmYXVsdD1lbilcbiAgICogQHBhcmFtIG9wdGlvbnMubGltaXQgcmVzcG9uc2UgcmVzdWx0IGxpbWl0IGxlbmd0aFxuICAgKiBAcGFyYW0gb3B0aW9ucy51c2VsYW5nIHRoZSBsYW5ndWFnZSBpbiB3aGljaCB0aGUgc2VhcmNoIHJlc3VsdHMgYXJlIHJldHVybmVkXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvbmZpZyBheGlvcyBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vd3d3Lndpa2lkYXRhLm9yZy93L2FwaS5waHA/YWN0aW9uPWhlbHAmbW9kdWxlcz13YnNlYXJjaGVudGl0aWVzXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldEVudGl0aWVzKG9wdGlvbnM6IFNlYXJjaE9wdGlvbikge1xuICAgIHJldHVybiBhd2FpdCBheGlvcy5nZXQ8UmF3U2VhcmNoUmVzdWx0VHlwZT4oc2VhcmNoRW50aXRpZXMob3B0aW9ucyksIG9wdGlvbnMuY29uZmlnKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2lraWRhdGEtc2RrXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=