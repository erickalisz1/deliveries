
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

    // if (dd < 10) {
    //   dd = '0' + dd;
    // }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
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
    
    if(Del > 0 && Uber > 0 && Hours > 0)
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