
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
    let dateString = now.toLocaleString('en-IN', options)
    .replace(/\//g,'-') // replace slash with dash
    .replace(/ /g, '_'); // replace spaces with underscores
    
    let t = dateString.split("-");
    t.reverse();
    dateString = t.join("-");
    dateString+="_00-00-00";
    return dateString;
}

