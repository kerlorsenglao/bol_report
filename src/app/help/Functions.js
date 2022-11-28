

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

function getYear(date){
    return date.getFullYear()
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
export {dateFormat,getDateBefore, dateShow, getKey, getYear}

