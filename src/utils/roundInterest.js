export default function roundInterest(number) {
    let laisuat = Math.round(number * 1000) / 1000;
    return laisuat;
}

// const lai = 0.017000000923871994;
// console.log("🚀 ~ lai:", roundInterest(lai)) //0.017