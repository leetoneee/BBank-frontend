export default function formatDateLogin(date) {
    let dateString = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let timeString = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let formattedString = dateString + ' ' + timeString;
    return formattedString;
}

// const date = new Date();
// console.log(formatDateLogin(date)); //2024-04-26 16:48:29


export function formatDateResult(date) {
    let inputDate = new Date(date);

    let options = {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };

    let outputDateString = inputDate.toLocaleString("vi-VN", options);
    return outputDateString;
}

// const inputDateString = "2024-05-05T10:29:12.706Z";

// console.log(formatDateResult(inputDateString)); //17:29 Chủ Nhật, 05/05/2024

export function formatDateSaving(date) {
    let inputDate = new Date(date);

    let options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    let outputDateString = inputDate.toLocaleString("vi-VN", options);
    return outputDateString;
}

// console.log(formatDateSaving(inputDateString)); // 05/05/2024

// const date = new Date('2004-11-16');

// console.log("🚀 ~ date:", date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'));

export function formatDateChart(date) {
    let inputDate = new Date(date);

    let options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };

    let outputDateString = inputDate.toLocaleString("vi-VN", options);
    return outputDateString;
}

// const inputDateString = "2024-05-05T10:29:12.706Z";

// console.log(formatDateResult(inputDateString)); //17:29 Chủ Nhật, 05/05/2024

export function formatDateGetTime(date) {
    let inputDate = new Date(date);

    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: '2-digit'
    };

    let outputDateString = inputDate.toLocaleString("vi-VN", options);
    return outputDateString;
}