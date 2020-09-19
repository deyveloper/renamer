
# ReNamer
Object keys ReNamer.

## Using
 
 #### Renaming keys
 `
   const keys = { price: 'p', myLo: 'm', hello: 'h', testValue: 'value' };
`  
`
   const prod = { price: 11, myLo: 2, hello: [{ testValue: 1 }, { testValue: { myLo: 21 } }] };
`  
`
   const rr = new ReNamer(prod, keys);
`  
`
   const data = rr.rename();
`   
 
 #### Inverting keymap
 `
   const inverted_keys = rr.invertKeyPairs()
 `
