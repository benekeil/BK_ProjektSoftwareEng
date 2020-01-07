export const DBConfig2 = {
    name: 'MyDB2',
    version: 1,
    objectStoresMeta: [
      {
      
        store: 'inputs',
        storeConfig: { keyPath: 'inputs_id', autoIncrement: true },
        storeSchema: [
          { name: 'ausgabe', keypath: 'ausgabe', options: { unique: false } },
          { name: 'titel', keypath: 'titel', options: { unique: false } },
          { name: 'betrag', keypath: 'betrag', options: { unique: false } },
          { name: 'datum', keypath: 'datum', options: { unique: false } }
        ]  
      }
      
    ] 
  };