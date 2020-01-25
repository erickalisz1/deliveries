import * as SQLite from 'expo-sqlite';

const DB = SQLite.openDatabase('Deliveries.db');

export const dbInit = () => {
    const promise = new Promise((resolve, reject) => {
        DB.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Deliveries (deliveryID INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, firebaseID TEXT NOT NULL, userName TEXT NOT NULL, actualDay TEXT NOT NULL, deliveroo REAL NOT NULL, uber REAL NOT NULL, hours REAL NOT NULL);',
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

export const downloadList = (email, fireID, userName, list) => {

    const promise = new Promise((resolve, reject) => {

        list.forEach(element => {

            console.log('added to local DB:',email, fireID, userName, element.actualDay, element.deliveroo, element.uber, element.hours);

            DB.transaction(tx => {
                tx.executeSql('INSERT INTO Deliveries (email, firebaseID, userName, actualDay, deliveroo, uber, hours) VALUES(?,?,?,?,?,?,?)',
                    [email, fireID, userName, element.actualDay, element.deliveroo, element.uber, element.hours],
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

export const fetchData = (email) => {

    const promise = new Promise((resolve, reject) => {

        DB.transaction(tx => {
            tx.executeSql('SELECT * FROM Deliveries WHERE email = ?',
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