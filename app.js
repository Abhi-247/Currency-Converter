let apiKey = "f6ef4b11eca0fb1799934243";
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.querySelector(".from select");
const toDropDown = document.querySelector(".to select");
const amountInput = document.querySelector(".amount input");
const convertButton = document.querySelector("button");
const resultText = document.querySelector(".msg p");
const fromFlag = document.querySelector(".from img");
const toFlag = document.querySelector(".to img");

let currencies = [
    "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD",
    "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC",
    "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP",
    "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR",
    "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR",
    "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR",
    "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON",
    "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "STN", "SVC",
    "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF",
    "VES", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "YER", "ZAR", "ZMW", "ZWL"
];
currencies.forEach((currency) => {
    let option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    fromDropDown.add(option1);

    let option2 = document.createElement("option");
    option2.value = currency;
    option2.text = currency;
    toDropDown.add(option2);
});
fromDropDown.value = "USD";
toDropDown.value = "INR";

const updateFlag = (element, currency) => {
    let countryCode = currency.substring(0, 2);
    element.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};
let convertCurrency = () => {
    let amount = amountInput.value;
    let fromCurrency = fromDropDown.value;
    let toCurrency = toDropDown.value;

    if (amount.length === 0 || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
        .then((resp) => resp.json())
        .then((data) => {
            let conversionRate = data.conversion_rates[toCurrency];
            let convertedAmount = (amount * conversionRate).toFixed(2);
            resultText.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            
            updateFlag(fromFlag, fromCurrency);
            updateFlag(toFlag, toCurrency);
        })
        .catch((error) => {
            console.error("Error fetching exchange rates:", error);
            alert("Failed to fetch exchange rate. Please try again.");
        });
};
convertButton.addEventListener("click", (e) => {
    e.preventDefault();
    convertCurrency();
});
window.addEventListener("load", convertCurrency);
