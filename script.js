const currencyFirstEL = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEL = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");

// Full list of active ISO 4217 currency codes
const currencyList = [
  "AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD",
  "BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN",
  "BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF",
  "DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS",
  "GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS",
  "IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR",
  "KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD",
  "MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN",
  "MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK",
  "PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR",
  "SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STN","SVC","SYP","SZL",
  "THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX",
  "USD","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XDR","XOF","XPF",
  "YER","ZAR","ZMW","ZWL"
];

function populateDropdowns() {
  currencyList.forEach(currency => {
    const opt1 = document.createElement("option");
    opt1.value = opt1.textContent = currency;
    currencyFirstEL.appendChild(opt1);
    const opt2 = opt1.cloneNode(true);
    currencySecondEL.appendChild(opt2);
  });
  currencyFirstEL.value = "USD";
  currencySecondEL.value = "INR";
}

async function updateRate() {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${currencyFirstEL.value}`);
    const data = await res.json();
    const rate = data.conversion_rates[currencySecondEL.value];
    exchangeRateEl.textContent = `1 ${currencyFirstEL.value} = ${rate} ${currencySecondEL.value}`;
    worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
  } catch {
    exchangeRateEl.textContent = "⚠️ Error loading rates";
    worthSecondEl.value = "";
  }
}

currencyFirstEL.addEventListener("change", updateRate);
currencySecondEL.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);

populateDropdowns();
updateRate();
