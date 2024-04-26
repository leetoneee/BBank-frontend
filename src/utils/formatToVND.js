export default function formatToVND(number) {
    let formatedNumber = number.toLocaleString('en-US');
    formatedNumber += ' VND';
    return formatedNumber;
}
// console.log(formatToVND(1195695)); // 1,195,695 VND 