export default function formatToVND(number) {
    let formattedNumber = number.toLocaleString('en-US');
    formattedNumber += ' VND';
    return formattedNumber;
}

export function formatToMoney(number) {
    let formattedNumber = number.toLocaleString('en-US');
    return formattedNumber;
}

// const type = formatToVND(1195695);
// console.log("🚀 ~ type:", type)
// console.log(typeof type); // 1,195,695 VND 