import { CreateObjectStore } from "react-indexed-db/lib/indexed-db";

export const DBConfig = {
    name: 'MyDB',
    version: 2,
    objectStoresMeta: [
    
      {
        store: 'monthlist',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'month', keypath: 'month', options: { unique: false } },
          { name: 'startbudget', keypath: 'startbudget', options: { unique: false } },
          {name: 'actualbudget', keypath: 'actualbudget', options: { unique: false } },
        ]
      },
      {
    
        store: 'inputs',
        storeConfig: { keyPath: 'inputs_id', autoIncrement: true },
        storeSchema: [
          { name: 'ausgabe', keypath: 'ausgabe', options: { unique: false } },
          { name: 'titel', keypath: 'titel', options: { unique: false } },
          { name: 'betrag', keypath: 'betrag', options: { unique: false } },
          { name: 'datum', keypath: 'datum', options: { unique: false } },
          { name: 'month', keypath: 'month', options: { unique: false } },
          { name: 'added', keypath: 'added', options: { unique: false } },
          {name: 'actualbudget', keypath: 'actualbudget', options: { unique: false } },

        ]  
      }
      
       
    ],
    
  };

