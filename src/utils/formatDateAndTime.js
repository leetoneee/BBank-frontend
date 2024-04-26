export default function formatDateLogin(date) {
    let dateString = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let timeString = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let formattedString = dateString + ' ' + timeString;
    return formattedString;
}

// const date = new Date();
// console.log(formatDateLogin(date)); //2024-04-26 16:48:29