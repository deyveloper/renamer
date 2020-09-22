/* --- USING
 *
 * ---- SIMPLE RENAMING
 * const keys = { price: 'p', myLo: 'm', hello: 'h', testValue: 'value' }
 * const prod = { price: 11, myLo: 2, hello: [{ testValue: 1 }, { testValue: { myLo: 21 } }] }
 * const rr = new ReNamer(prod, keys);
 * const data = rr.rename();
 * 
 * ---- INVERTING KEY-VALUE PAIRS (KEYMAP)
 * const inverted_keys = rr.invertKeyPairs()
 * 
*/

class ReNamer {
    data;
    keys;
    modified;

    constructor(data, keys) {
        this.data = data;
        this.keys = keys;
    }


    _renameRP() {
        let str_data = this.data;
        
        if (typeof str_data != "string") {
            str_data = JSON.stringify(str_data);
        } 

        Object.keys(this.keys)
        .forEach((key) => {
            str_data = str_data.split(`"${key}"`).join(`"${this.keys[key]}"`);
        })

        this.modified = JSON.parse(str_data);
        return this.modified;
    }

    _invertKeyPairs() {
        const inverted_arr = Object.keys(this.keys).reduce((acc, key) => {
            const val = this.keys[key];
            acc[val] = acc[val] || [];
            acc[val].push(key);
            return acc;
        }, {});        

        const invert_result = {};
        
        Object.keys(inverted_arr)
        .forEach((key) => {
            invert_result[key] = inverted_arr[key][0];
        })

        this.keys = invert_result;
        return invert_result;
    }

    rename() {
        this._renameRP();
        return this.modified;
    }

    invertKeyPairs() {
        this._invertKeyPairs();
        return this.keys;
    }
}


module.exports = ReNamer;