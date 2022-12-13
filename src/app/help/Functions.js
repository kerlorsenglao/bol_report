

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

function reverseStringInDate(str){// 2022-12-10 <string> => 10-12-2022 <string>
    if(/^(\d+-)*(\d+)$/.test(str)){ // check if just contain 0-9 and "-" that means str=2022-12-10 =>so chnage to str=10-12-2022 (true)
        let date = new Date(str)
        if(str.length > 7) return date.getDate()+'-'+(date.getMonth()+1) +'-'+date.getFullYear() 
        if(str.length > 4 && str.length <= 7 ) return (date.getMonth()+1) +'-'+date.getFullYear()
    }
    return str; // else just return str itself (false)
}

function numberFormate(num){
    return num.toLocaleString('de-DE');
}

function checkSelectDateValidation(fdate,tdate){ //ສາມາດເລືອກໄດ້ຫລາຍສຸດ 5 ມື້ເທົ່ານັ້ນ
    if(fdate > tdate) return {'result':false, 'msg':'ກະລຸນາບໍ່ເລືອກວັນທີ່ສຸດທ້າຍໃຫຍ່ກວ່າວັນທີເລີ່ມຕົ້ນ'};
    if(tdate - fdate > 432000000) return {'result':false, 'msg':'ເລືອກສູງສຸດໄດ້ພຽງ 5 ມື້'}; // 5*24*60*60*1000 = 5ມື້
    return {'result': true};
}
export {
    dateFormat,getDateBefore, dateShow, 
    getKey,getMonth, getYear, getMonthYear,
    convertJSToAR,reverseStringInDate,numberFormate,
    checkSelectDateValidation,

}

