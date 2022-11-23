

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


export {dateFormat,getDateBefore, dateShow}