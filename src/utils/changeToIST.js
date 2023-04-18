
export const changeToIST = (datetime) =>{
    if(datetime===undefined) return "";

    const dateTime = new Date(datetime);
    const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
    };
    let dateString = dateTime.toLocaleString('en-IN', options)
    .replace(/\//g,'-') // replace slash with dash
    
    dateString = dateString.split(',').join('').toUpperCase();
    return dateString;
}

