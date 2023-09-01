
export interface IAnyObject {
    [k: string]: any;
}

// -------------- Object ----------------

/**
 * Check if two objects have the same properties
 * 
 * First count of properties
 * 
 * Then instanc Date, Boolean, Number and String -> toString are the same
 * 
 * Then isArray and array items -> toString are the same
 * 
 * Then if property is a Object -> propsEqual(propertyA,propertyB)
 * 
 * Then propertyA !== propertyB
 */
export function propsEqual(a: IAnyObject, b: IAnyObject): boolean {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }


    // test instanceof Date, Boolean, Number, String, null, 
    if (a instanceof Date && b instanceof Date || a instanceof Boolean && b instanceof Boolean || a instanceof Number && b instanceof Number || a instanceof String && b instanceof String) {
        const ajS = a.toString();
        const bjS = b.toString();
        if (ajS !== bjS) {
            return false;
        }
    }

    // console.log(a, b);

    for (const propName of aProps) {
        const aP = a[propName];
        const bP = b[propName];

        if (Array.isArray(aP) && Array.isArray(bP)) {

            // If number of items is different,
            // arrays are not equivalent
            if (aP.length !== bP.length) {
                return false;
            }

            // if Props are arrays
            // check if items in the array are different
            const diff = aP.map((av, index) => {
                const bv = bP[index];
                const avS = `${av}`;
                const bvS = `${bv}`;
                return avS !== bvS;
            });
            if (diff.includes(true)) {
                return false;
            }
        } else {
            // If values of same property are not equal,
            // objects are not equivalent
            if (!(typeof aP === 'object' && typeof bP === 'object' && propsEqual(aP, bP))) {
                if (aP !== bP) {
                    return false;
                }
            }
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

/**
 * https://stackoverflow.com/a/43849204/10850021
 *
 * Get Property of an Object by string
 * e.g. const test = {
 *  properties:{
 *    abc: {
 *      name: '',
 *      value: 10
 *    }
 *  }
 * }
 *
 * getByString(test, 'properties.abc');
 *
 */
export function getByString<T>(object: any, property: string) {
    return property.split('.').reduce((p, c) => p && p[c] || null, object) as T;
}


/**
 * property access defined by a string
 * convert indexes to properties
 * strip a leading dot
 * e.g.
 * - properties.download.href
 * - properties[0].endDate
 * - properties[0][endDate]
 * - properties[test].endDate
 */
export function pick<T>(object: any, property: string) { // property access defined by a string
    const isIndexArray = property.match(/\[(\d+)\]/g);
    if (isIndexArray) {
        property = property.replace(/\[(\d+)\]/g, '@$1'); //convert indexes of array to @<index>
    }
    const isIndexProperty = property.match(/\[(\w+)\]/g)
    if (isIndexProperty) {
        property = property.replace(/\[(\w+)\]/g, '.$1'); //convert indexes to properties
    }
    property = property.replace(/^\./, ''); // strip a leading dot

    const pickProps = property.split('.');
    for (let i = 0, n = pickProps.length; i < n; ++i) {
        const k = pickProps[i];
        const ia = k.split('@');
        if (ia.length === 2) {
            const key = ia[0];
            const index = parseInt(ia[1]);
            if (key in object && object[key][index]) {
                if (k in object[key][index]) {
                    object = object[key][index][k];
                } else {
                    object = object[key][index];
                }
            }
        } else {
            if (k in object) {
                object = object[k];
            } else {
                return;
            }
        }
    }
    return object;
}

/**
 * clone Object by JSON stringify and parse
 */
export function clone(o: any) {
    function replacer(key: string, value: any) {
        if (this[key] instanceof Date) {
            return `new Date:${value.valueOf()}`;
        } else if (this[key] instanceof Boolean) {
            return `new Boolean:${value}`;
        } else if (this[key] instanceof Number) {
            return `new Number:${value.toString()}`;
        } else if (this[key] instanceof String) {
            return `new String:${value.toString()}`;
        }
        return value;
    };
    function reviver(key: string, value: any) {
        if (typeof value === 'string') {
            if (value.indexOf('new Date:') !== -1) {
                return new Date(value.slice('new Date:'.length));
            } else if (value.indexOf('new Boolean:') !== -1) {
                return new Boolean(value.slice('new Boolean:'.length));
            } else if (value.indexOf('new Number:') !== -1) {
                return new Number(value.slice('new Number:'.length));
            } else if (value.indexOf('new String:') !== -1) {
                return new String(value.slice('new String:'.length));
            }
        }
        return value;
    };
    const objStr = JSON.stringify(o, replacer);
    const newO = JSON.parse(objStr, reviver);
    return newO
}


// -------------- Array ----------------

/**
 * Moves a Item in an Array to another Index
 */
export function arrayMove(array: Array<any>, fromIndex: number, toIndex: number) {
    array.splice((toIndex < 0 ? array.length + toIndex : toIndex), 0, array.splice(fromIndex, 1)[0]);
}


/**
 * flatten array with objects
 */
export function flattenDeepArray<T>(arr: Array<any>, children: string): T[] {
    return arr.reduce((acc, val) => (Array.isArray(val[children])) ? acc.concat(this.flattenDeepArray(val[children])) : acc.concat(val), []);
}
