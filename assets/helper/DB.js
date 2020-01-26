import * as SQLite from 'expo-sqlite';

const DB = SQLite.openDatabase('UserData.db');

const STATEMENTS = {
    Create: "CREATE TABLE IF NOT EXISTS Users (entryID INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, firebaseID TEXT NOT NULL, userName TEXT NOT NULL, dayNumber INTEGER NOT NULL, actualDay TEXT NOT NULL, deliveroo REAL NOT NULL, uber REAL NOT NULL, hours REAL NOT NULL);",
    Insert: "INSERT INTO Users (email, firebaseID, userName, dayNumber, actualDay, deliveroo, uber, hours) VALUES(?,?,?,?,?,?,?,?);",
    Select: "SELECT * FROM Users WHERE email = ? ;",
    DBInfo: "PRAGMA table_info(Users);",
    Delete: 'DELETE FROM Users WHERE email = ? ;'
};

export const dbInit = () => {
    const promise = new Promise((resolve, reject) => {
        DB.transaction(tx => {
            tx.executeSql(STATEMENTS.Create,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                });
        });
    });
    return promise;
};

export const downloadList = (email, fireID, userName, list) => {

    const promise = new Promise((resolve, reject) => {

        list.forEach(day => {

            console.log('added to local DB:', email, fireID, userName, day.dayNumber, day.actualDay, day.deliveroo, day.uber, day.hours);

            DB.transaction(tx => {
                tx.executeSql(STATEMENTS.Insert,
                    [email, fireID, userName, day.dayNumber, day.actualDay, day.deliveroo, day.uber, day.hours],
                    (_, result) => {//success scenario
                        resolve(result);
                    },
                    (_, error) => {//error scenario
                        reject(error);
                    });
            });
        });


    });
    return promise;
};

export const FetchDataForUser = (email) => {

    const promise = new Promise((resolve, reject) => {

        DB.transaction(tx => {
            tx.executeSql(STATEMENTS.Select,
                [email],
                (_, result) => {//success scenario
                    resolve(result);
                },
                (_, error) => {//error scenario
                    reject(error);
                });
        });
    });
    return promise;
};

export const ShowDBStructure = () => {

    const promise = new Promise((resolve, reject) => {

        DB.transaction(tx => {
            tx.executeSql(STATEMENTS.DBInfo,
                [],
                (_, result) => {//success scenario
                    resolve(result);
                },
                (_, error) => {//error scenario
                    reject(error);
                });
        });
    });
    return promise;
};

export const ClearUserData = (email) => {

    const promise = new Promise((resolve, reject) => {

        DB.transaction(tx => {
            tx.executeSql(STATEMENTS.Delete,
                [email],
                (_, result) => {//success scenario
                    resolve(result);
                },
                (_, error) => {//error scenario
                    reject(error);
                });
        });
    });
    return promise;
};