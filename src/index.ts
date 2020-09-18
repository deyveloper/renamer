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
    static data: any;
    static keys: any;
    static modified: any;

    constructor(data: object, keys: object) {
        ReNamer.data = data;
        ReNamer.keys = keys;
    }

    static _renameFE(v: any = null): object {
        let value = v ? v : ReNamer.data;

        if (!value || typeof value !== 'object') return value;
        if (Array.isArray(value)) return value.map(ReNamer._renameFE);
        const result_data = Object.fromEntries(Object
            .entries(value)
            .map(([k, v]) => {
                return [ReNamer.keys[k] || k, ReNamer._renameFE(v)];
            })
        );

        ReNamer.modified = result_data;
        return ReNamer.modified;
    }

    static _renameRP() {
        let str_data = JSON.stringify(ReNamer.data);
        
        Object.keys(ReNamer.keys)
        .forEach((key) => {
            str_data = str_data.split(`"${key}"`).join(`"${ReNamer.keys[key]}"`);
        })

        ReNamer.modified = JSON.parse(str_data);
        return ReNamer.modified;
    }

    static _invertKeyPairs() {
        const inverted_arr = Object.keys(ReNamer.keys).reduce((acc: any, key: any) => {
            const val = ReNamer.keys[key];
            acc[val] = acc[val] || [];
            acc[val].push(key);
            return acc;
        }, {});        

        const invert_result: any = {};
        
        Object.keys(inverted_arr)
        .forEach((key: any) => {
            invert_result[key] = inverted_arr[key][0];
        })

        ReNamer.keys = invert_result;
        return invert_result;
    }

    rename() {
        try {
            ReNamer._renameFE();
        } catch {
            ReNamer._renameRP();
        }
        return ReNamer.modified;
    }

    invertKeyPairs() {
        ReNamer._invertKeyPairs();
        return ReNamer.keys;
    }
}


module.exports = { ReNamer }