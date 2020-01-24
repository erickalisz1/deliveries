import { Alert, Platform } from 'react-native';
import firebase from 'firebase';
import { DEL, UB, HRS, TOTAL, PER, DAYS, LARGER, LARGER_EQUAL, SMALLER, SMALLER_EQUAL, WEEKS, BETWEEN } from '../constants/strings';
import Colours from '../constants/darkTheme';

export const firebaseConfig = {
    apiKey: "AIzaSyBtFpyI8rFywqiHm3rnL2qbS3L4Dl_Y8sk",
    authDomain: "deliveries-318f4.firebaseapp.com",
    databaseURL: "https://deliveries-318f4.firebaseio.com",
    projectId: "deliveries-318f4",
    storageBucket: "deliveries-318f4.appspot.com",
    messagingSenderId: "138527506874",
    appId: "1:138527506874:web:b77bf64674a2912ff1dd83"
};

export const fireRef = "Users/";//my parent object
export const deliveriesRef = "/Deliveries";

//fixing display of main and weeks list top buttons 
export const setLabelText = (columnToSort, orientation, type) => {

    let text = '';

    if (type === 'column') {

        if (columnToSort === 'dayNumber') {
            text += DAYS;
        }
        else if (columnToSort === 'week') {
            text += WEEKS;
        }
        else if (columnToSort === 'deliveroo') {
            text += DEL;
        }
        else if (columnToSort === 'uber') {
            text += UB;
        }
        else if (columnToSort === 'total') {
            text += TOTAL;
        }
        else if (columnToSort === 'per') {
            text += PER;
        }

        else text = 'something went wrong';

        return text;
    }
    else {

        if (orientation === 'Asc') {
            text += 'Ascending';
        }
        else if (orientation === 'Desc') {
            text += 'Descending';
        }

        else text = 'something went wrong';

        return text;
    }

};

export const sortList = (list, columnToSort, orientation) => {

    if (orientation === 'Asc') {
        return list.sort((b, a) => { return (b[columnToSort]) - (a[columnToSort]) });
    }
    else if (orientation === 'Desc') {
        return list.sort((a, b) => { return (b[columnToSort]) - (a[columnToSort]) });
    }
};

export const formatDate = (sDate) => {

    return new Date(sDate).toLocaleDateString('en-GB');
};

export const setWeekString = (start, end) => { return formatDate(start).substr(0, 5) + ' - ' + formatDate(end) };

// method to find next day on list
export const nextDay = (sDate) => {

    // Create new Date instance
    let date = new Date(sDate);

    date.setDate(date.getDate() + 1);

    return date.toISOString().substring(0, 10);
};

export const setDateString = (ActualDay) => {
    let weekday = new Date(ActualDay).toDateString().substr(0, 3);//weekday

    let day = formatDate(ActualDay);

    return (weekday + ', ' + day);
};

//setting detail modal message
export const setDailyMessage = (selectedDay, list) => {

    let message = '';

    //      -- Weekly arguments --
    let week = selectedDay.week;

    //filtering the list to show only the days in this week
    let listOfDaysInWeek = list.filter(day => day.week === week);

    let deliverooSum = 0;
    let uberSum = 0;
    let hoursSum = 0;

    let daysWithDel = 0;
    let daysWithUber = 0;
    let daysWithHours = 0;
    //also need to check if the week has accurate data, e.g if the number of days with hours is the same as the days worked
    listOfDaysInWeek.forEach(day => {

        daysWithDel = day.deliveroo === 0 ? daysWithDel : daysWithDel += 1;//if its zero, dont increase the count
        daysWithUber = day.uber === 0 ? daysWithUber : daysWithUber += 1;
        daysWithHours = day.hours === 0 ? daysWithHours : daysWithHours += 1;

        deliverooSum += day.deliveroo;
        uberSum += day.uber;
        hoursSum += day.hours;
    });

    let weekWithAccurateData = true;
    //checking if it has accurate data by evaluating if the number of days with all 3 values is the same
    if (daysWithHours !== daysWithDel && daysWithHours !== daysWithUber) {
        weekWithAccurateData = false;
    }
    else weekWithAccurateData = true;

    let weekTotal = SetPrecision(deliverooSum + uberSum);
    let weekPer = hoursSum > 0 ? SetPrecision(weekTotal / hoursSum) : 0;//to avoid dividing by zero, set it to zero if hours is zero

    deliverooSum = SetPrecision(deliverooSum);
    uberSum = SetPrecision(uberSum);
    hoursSum = SetPrecision(hoursSum);

    //      -- Daily arguments --

    let Del = SetPrecision(selectedDay.deliveroo);
    let Uber = SetPrecision(selectedDay.uber);
    let Total = SetPrecision(selectedDay.total);
    let Hours = SetPrecision(selectedDay.hours);
    let Per = SetPrecision(selectedDay.per);

    //setting daily info

    if (Total > 0 && Hours < 1) {//didnt record the hours

        message += 'Deliveroo: $' + Del + '\n' +
            'Uber: $' + Uber + '\n' +
            'Total: $' + Total;
    }
    else if (Del > 0 && Uber > 0 && Hours > 0) {//did both and know hours

        message += 'Deliveroo: $' + Del + '\n' +
            'Uber: $' + Uber + '\n' +
            'Total: $' + Total + '\n' +
            'Within ' + Hours + 'h\n' +
            '$' + Per + ' per hour';
    }
    else if (Del > 0 && Uber < 1) {//didnt do uber

        message += 'Deliveroo: $' + Del + '\n' +
            'Within ' + Hours + 'h\n' +
            '$' + Per + ' per hour';
    }
    else if (Del < 1 && Uber > 0) {//didnt do deliveroo

        message += 'Uber: $' + Uber + '\n' +
            'Within ' + Hours + 'h\n' +
            '$' + Per + ' per hour';
    }

    else message += 'You haven\'t worked on this day';

    message += '\n\nOn This week:\n';

    //setting weekly Info
    if (weekTotal > 0 && !weekWithAccurateData) {// week with inaccurate data
        message += 'Deliveroo: $' + deliverooSum + '\n' +
            'Uber: $' + uberSum + '\n' +
            'Total: $' + weekTotal;

        console.log('week with inaccurate data');
    }
    else if (weekTotal > 0 && hoursSum < 1) {// worked but don't know the hours

        message += 'Deliveroo: $' + deliverooSum + '\n' +
            'Uber: $' + uberSum + '\n' +
            'Total: $' + weekTotal;
    }
    else if (weekTotal > 0 & weekPer > 0) {//worked and know hours

        message +=
            'Deliveroo: $' + deliverooSum + '\n' +
            'Uber: $' + uberSum + '\n' +
            'Total: $' + weekTotal + '\n' +
            'Within ' + hoursSum + 'h\n' +
            '$' + weekPer + ' per hour'
    }


    else message += 'You haven\'t worked';

    return message;
};

export const setWeeklyMessage = (selectedWeek) => {

    let message = '';

    //setting weekly Info
    if (selectedWeek.total > 0 && !selectedWeek.accurate) {// week with inaccurate data

        message +=
            'Deliveroo: $' + selectedWeek.deliveroo + '\n' +
            'Uber: $' + selectedWeek.uber + '\n' +
            'Total: $' + selectedWeek.total;

        console.log('week with inaccurate data');
    }
    else if (selectedWeek.total > 0 && selectedWeek.hours < 1) {// worked but don't know the hours

        message +=
            'Deliveroo: $' + selectedWeek.deliveroo + '\n' +
            'Uber: $' + selectedWeek.uber + '\n' +
            'Total: $' + selectedWeek.total;

        console.log('week with inaccurate data');
    }
    else if (selectedWeek.total > 0 & selectedWeek.per > 0) {//worked and know hours

        message +=
            'Deliveroo: $' + selectedWeek.deliveroo + '\n' +
            'Uber: $' + selectedWeek.uber + '\n' +
            'Total: $' + selectedWeek.total + '\n' +
            'Within ' + selectedWeek.hours + 'h\n' +
            '$' + selectedWeek.per + ' per hour'
    }

    else message += 'You haven\'t worked on this week';

    return message;
};

//method to find the first day of the week
const mondayOfThisWeek = () => {

    let today = new Date();
    const weekDay = today.getDay();

    if (weekDay === 0) {//sunday
        today = today.setDate(today.getDate() - 6);
    }
    else if (weekDay === 1) {//monday just return

    }
    else if (weekDay > 1) {//rest of week
        today = today.setDate(today.getDate() - (today.getDay() - 1));
    }

    return today;
};

//method to automatically add the following week in order to prevent errors
export const checkIfTodayExists = (list, refreshing) => {

    const today = new Date();
    

    if (list.length < 1) {//if the user has no days on firebase

        let actualDay = new Date(mondayOfThisWeek()).toISOString().substring(0, 10);//e.g 2019-12-26
        let ID = 0;

        for (let i = 0; i < 7; i++) {//add one week

            addDay(ID, actualDay);

            //incrementing both date and ID for them to be added
            actualDay = nextDay(actualDay);
            ID++;
        }
        Alert.alert('Success', 'Your first week has been added to the DB')
    }
    else {//if the user has days

        if (!refreshing) {
            //boolean to see if the app is being refreshed. if it is, don't execute this block; 
            //it must only execute upon first opening the app

            let count = 0;

            let lastDateOnDB = new Date(list[list.length - 1].actualDay);//last sunday on DB

            let lastDayOnDB = list[list.length - 1].dayNumber;//last dayNumber on DB

            let daysUntil = today - lastDateOnDB;

            while (daysUntil > 0) {//while the last day on the DB is in the future
                for (let i = 0; i < 7; i++) {//add one week

                    //incrementing both date and ID for them to be added
                    lastDateOnDB = nextDay(lastDateOnDB);
                    lastDayOnDB++;

                    count++;
                    addDay(lastDayOnDB, lastDateOnDB);
                }
                //performing calculation once again to see if we need to go again
                daysUntil = today - lastDateOnDB;

            }
            count === 0 ? null : (Alert.alert('Success', 'The following week has been added to the DB'));
        }
    }

    //returning false to set the state on the main list and ensure that this doesn't execute again
    return false;
};

const addDay = (dayNumber, actualDay) => {//will need the user Ref later on

    firebase.database().ref(fireRef + firebase.auth().currentUser.uid + deliveriesRef + "/" + dayNumber).set(
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

export const helpItems = [
    {//defining title, description and modal size
        display: 'Adding days to your list',
        description: 'To add days to your list is vey simple:\nYou don\'t have to do it! Once you open the app, it will check if today exists and if it doesn\'t, the app will add the following week for you\n:-D',
        flex: 19
    },
    {
        display: 'Updating days',
        description: 'To update a day, you can either go to the detail page by selecting a day or simply tap the left icon on the main list and input the data related to the day you selected.',
        flex: 27
    },
    {
        display: 'Calculating deliveroo earnings',
        description: 'To know the exact amount you\'ve earned when working with deliveroo, simply tap the calculator icon and type your order fees and the tips or extras you\'ve earned. The app will then calculate the exact amount you will earn.',
        flex: Platform.OS === 'ios' ? 13 : 18
    },
    {
        display: 'Calculating hours worked',
        description: 'To properly calculate how much you have earned per hour, we need the total time to be decimal. To calculate it, simply tap the calculator icon and type the amount of hours and minutes you\'ve worked and the app will do the rest.',
        flex: Platform.OS === 'ios' ? 13 : 18
    },
    {
        display: 'Filtering your list',
        description: 'To filter your list, simply tap the filter icon at the top right, select the filter you wish to apply and press Set',
        flex: 27
    }
];

//fixing filters UI
export const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Weekdays", "Weekends"];

export const assignDay = weekDays.map((value, index) => {
    return ({
        display: value,
        value: index
    })
});

export const filters = [
    {
        key: DAYS,
        value: "dayNumber",
        colour: Colours.days,
        type: 'days'
    },
    {
        key: DEL,
        value: "deliveroo",
        colour: Colours.deliveroo,
        type: 'number'
    },
    {
        key: UB,
        value: "uber",
        colour: Colours.uber,
        type: 'number'
    },
    {
        key: TOTAL,
        value: "total",
        colour: Colours.total,
        type: 'number'
    },
    {
        key: HRS,
        value: "hours",
        colour: Colours.hours,
        type: 'hours'
    },
    {
        key: PER,
        value: "per",
        colour: Colours.per,
        type: 'per'
    }
];

export const weekFilters = [
    {
        key: WEEKS,
        value: "week",
        colour: Colours.days
    },
    {
        key: DEL,
        value: "deliveroo",
        colour: Colours.deliveroo
    },
    {
        key: UB,
        value: "uber",
        colour: Colours.uber
    },
    {
        key: HRS,
        value: "hours",
        colour: Colours.hours
    },
    {
        key: TOTAL,
        value: "total",
        colour: Colours.total
    },
    {
        key: PER,
        value: "per",
        colour: Colours.per
    }
];

export const conditions = [
    {
        key: "Larger",
        value: LARGER
    },
    {
        key: "Larger Equal",
        value: LARGER_EQUAL
    },
    {
        key: "Smaller",
        value: SMALLER
    },
    {
        key: "Smaller Equal",
        value: SMALLER_EQUAL
    },
    {
        key: "Between",
        value: BETWEEN
    }
];

export const SetPrecision = (value) => {

    value = Number(value);

    if (value > 0 && value < 10) {
        value = value.toPrecision(3);
    }
    else if (value < 100) {
        value = value.toPrecision(4);
    }
    else if (value < 1000) {
        value = value.toPrecision(5);
    }
    else if (value > 1000) {
        value = value.toPrecision(6);
    }
    return Number(value);
};