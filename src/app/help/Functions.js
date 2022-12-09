

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
function getMonth(date){
    return date.getMonth() + 1
}
function getMonthYear(date){
    return date.getMonth()+1 +'/'+ date.getFullYear()
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

// kerlor Convert JSON to Array
function convertJSToAR(data){
    let newData = []
    // let hahaArray = Object.entries(data);
    // let i =0;
    // hahaArray.forEach(ha => ha[1].forEach(ha2 => newData.push( ha[0], ha2)));
    
    for(const [key,value] of Object.entries(data)){
        let name = key;
        newData.push({name:key,value:value})
    }

    return newData //((Object.entries(data))[0])[2]
}
export {dateFormat,getDateBefore, dateShow, getKey,getMonth, getYear, getMonthYear,convertJSToAR}

