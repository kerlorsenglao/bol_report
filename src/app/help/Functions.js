

function dateFormat(date){
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
}

function getDateBefore(date){
    date.setDate(date.getDate() -1);
    return date;
}

function dateShow(date){
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
}

// toum function 
function getKey(data){
    delete data['ID'];
    delete data['bank_code'];
    delete data['report_type'];
    delete data['report_date_type'];
    delete data['report_date'];
    delete data['added_user'];
    delete data['upload_date'];

    let allKey = [];
    for (const [key, value] of Object.entries(data)) {
        allKey.push(key)
    }
    return allKey;
}

// toum function get Month and Year
function getMonthYear(str){
    let arr = str.split(" ")
    return {month: Number(arr[1]),year: Number(arr[0]) }
}

export {dateFormat,getDateBefore, dateShow, getKey,getMonthYear}