
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