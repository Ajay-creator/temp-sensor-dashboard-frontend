
export const getLocalTime = () =>{
    const now = new Date();
    const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    timeZone: 'Asia/Kolkata'
    };
    let dateString = now.toLocaleString('en-ZA', options)
    .replace(/\//g,'-') // replace slash with dash
    .replace(/ /g, '_'); // replace spaces with underscores
    
    dateString+='T00:00:00';
    return dateString;
}

