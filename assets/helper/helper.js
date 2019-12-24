import { Alert } from 'react-native';
import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyBtFpyI8rFywqiHm3rnL2qbS3L4Dl_Y8sk",
    authDomain: "deliveries-318f4.firebaseapp.com",
    databaseURL: "https://deliveries-318f4.firebaseio.com",
    projectId: "deliveries-318f4",
    storageBucket: "deliveries-318f4.appspot.com",
    messagingSenderId: "138527506874",
    appId: "1:138527506874:web:b77bf64674a2912ff1dd83"
};

export const setLabelText = (columnToSort, orientation) => {

    let text = '';

    if (columnToSort === 'dayNumber') {
        text += 'Days';
    }
    else if (columnToSort === 'deliveroo') {
        text += 'Deliveroo';
    }
    else if (columnToSort === 'uber') {
        text += 'Uber';
    }
    else if (columnToSort === 'total') {
        text += 'Total';
    }
    else if (columnToSort === 'per') {
        text += 'Per Hour';
    }

    if (orientation === 'Asc') {
        text += ' /\\';
    }
    else if (orientation === 'Desc') {
        text += ' \\/';
    }
    else text = 'something went wrong';

    return text;
};

export const sortList = (list, columnToSort, orientation) => {
    if (orientation === 'Asc') {
        console.log('returning ascending', columnToSort);
        return list.sort((b, a) => { return (b[columnToSort]) - (a[columnToSort]) });
    }
    else if (orientation === 'Desc') {
        console.log('returning descending', columnToSort);
        return list.sort((a, b) => { return (b[columnToSort]) - (a[columnToSort]) });
    }
};

export const formatDate = (sDate) => {

    let today = new Date(sDate);


    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
};

export const nextDay = (sDate) => {

    // Create new Date instance
    let date = new Date(sDate);

    date.setDate(date.getDate() + 1);

    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
};

export const setDateString = (ActualDay) => {
    let weekday = new Date(ActualDay).toDateString().substr(0, 3);//weekday

    let day = formatDate(ActualDay);

    return (weekday + ', ' + day);
};

export const setAlertMessage = (selectedDay) => {

    let message = '';

    let Del = selectedDay.deliveroo;
    let Uber = selectedDay.uber;
    let Total = selectedDay.total;
    let Hours = selectedDay.hours;
    let Per = selectedDay.per;

    //adjusting precisions
    Per = Per.toPrecision(4);
    Total = Total >= 100 ? Total.toPrecision(5) : Total.toPrecision(4);

    if (Del > 0 && Uber > 0 && Hours > 0) 
    {//did both and know hours
        return 'Deliveroo: $' + Del + '\n' +
            'Uber: $' + Uber + '\n' +
            'Total: $' + Total + '\n' +
            'Within ' + Hours + 'h\n' +
            '$' + Per + ' per hour';
    }
    else if (Del > 0 && Uber < 1) 
    {//didnt do uber
        return 'Deliveroo: $' + Del + '\n' +
            'Within ' + Hours + 'h\n' +
            '$' + Per + ' per hour';
    }
    else if (Del < 1 && Uber > 0) 
    {//didnt do deliveroo
        return 'Uber: $' + Uber + '\n' +
            'Within ' + Hours + 'h\n' +
            '$' + Per + ' per hour';
    }
    else if (Total > 0 && Hours < 1) 
    {//didnt record the hours
        return 'Deliveroo: $' + Del + '\n' +
            'Uber: $' + Uber + '\n' +
            'Total: $' + Total;
    }

    else return 'You haven\'t worked on this day';
};



export const checkIfTodayExists = (list, refreshing) => {
    
    if(refreshing)
    {
        //refreshing is a boolean to see if the app is being refreshed. if it is, don't execute this block; 
        //it must only execute upon first opening the app

        const today = new Date;
        let lastDateOnDB = new Date(list[0].actualDay);
    
        let lastDayOnDB = list[0].dayNumber;
    
        let daysUntil = today - lastDateOnDB;
        let count = 0;
    
        while(daysUntil > 0)
        {//while the last day on the DB is in the future
            for(let i = 0; i < 7; i++)
            {//add one week
    
                //incrementing both date and ID for them to be added
                lastDateOnDB = nextDay(lastDateOnDB);
                lastDayOnDB++;
    
                count++;
                addDay(lastDayOnDB, lastDateOnDB);
            }
            //performing calculation once again to see if we need to go again
            daysUntil = today - lastDateOnDB;
            
        }
        count === 0 ? ('') : (Alert.alert('Success','The following week has been added to the DB'));
    
        //returning false to set the state on the main list and ensure that this doesn't execute again
        return false;
    }
    
};

const addDay = (dayNumber, actualDay) => {

    firebase.database().ref('deliveries/' + dayNumber).set(
        {
            actualDay: actualDay,
            deliveroo: 0,
            hours: 0,
            uber: 0
        }
    ).then(() => {
        console.log('Added', formatDate(actualDay));

    }).catch((error) => {
        console.log(error);
        Alert.alert('Error', error);
    });
};