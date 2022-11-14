const fixDate = (date) => {
    let dateObj = new Date(date * 1000);
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let year = dateObj.getFullYear();

    let month = months_arr[dateObj.getMonth()];

    let day = dateObj.getDate();

    let hours = dateObj.getHours();

    let minutes = "0" + dateObj.getMinutes();

    //MM-dd-yyyy, h:m
    return day + ' ' + month + ' ' + year + ', ' + hours + ':' + minutes.slice(-2);
}

export {
    fixDate
};