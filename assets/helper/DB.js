import * as SQLite from 'expo-sqlite';

const DB = SQLite.openDatabase('Deliveries.db');

export const dbInit = () => {
    const promise = new Promise((resolve, reject) => {
        DB.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Deliveries (userID TEXT PRIMARY KEY NOT NULL, userName TEXT NOT NULL, actualDay TEXT NOT NULL, deliveroo REAL NOT NULL, uber REAL NOT NULL, hours REAL NOT NULL);',
            [],//params, usefull for adding data later
            () => {//success scenario
                resolve();
            },
            (_, error) => {//error scenario
                reject(error); 
            });
        });
    });
    return promise; 
};