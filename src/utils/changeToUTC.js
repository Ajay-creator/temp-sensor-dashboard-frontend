
export const changeToUTC = (datetime) =>{
    if(datetime===undefined) return "";

    const dateTime = new Date(datetime);
    const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
    };
    let dateString = dateTime.toLocaleString('en-ZA', options)
    .replace(/\//g,'-') // replace slash with dash
    .replace(/ /g, 'T'); // replace spaces with underscores
    
    dateString = dateString.split(',').join('');
    dateString= dateString+"Z";
    return dateString;
}

