

export default formatDate = (sDate) => {

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
    return today = dd + '/' + mm + '/' + yyyy;
};