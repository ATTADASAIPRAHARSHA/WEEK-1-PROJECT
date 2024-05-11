function getsymbol(toCurrency) {
    const currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'INR': '₹',
        'CNY': '¥',
        'AUD': 'AU$',
        'PKR': '₨',
        'JPY': '¥',
        'CHF': 'CHF',
        'CAD': 'CA$',
        'HKD': 'HK$',
        'SEK': 'kr',
        'NOK': 'kr'
    };
    return currencySymbols[toCurrency];
}

function getcurrency(symbol) {
    const currencySymbols = {
        '$': 'USD',
        '€': 'EUR',
        '£': 'GBP',
        '₹': 'INR',
        '¥': 'CNY',
        'AU$': 'AUD',
        '₨': 'PKR',
        '¥': 'JPY',
        'CHF': 'CHF',
        'CA$': 'CAD',
        'HK$': 'HKD',
        'kr': 'SEK',
        'kr': 'NOK'
    };
    return currencySymbols[symbol];
}


async function convertCurrency() {
    const planPriceText = document.getElementById('planprice').innerHTML;
    const planPriceText1 = document.getElementById('planprice1').innerHTML;
    const planPriceText2 = document.getElementById('planprice2').innerHTML;
    const currencySymbol = planPriceText.split('/')[0].charAt(0);
    const fromCurrency = getcurrency(currencySymbol);
    console.log(fromCurrency)
    const toCurrency = document.getElementById('currency').value;
    console.log(toCurrency)
    const amount = parseFloat(planPriceText.match(/\d+/)[0]);
    const amount1 = parseFloat(planPriceText1.match(/\d+/)[0]);
    const amount2 = parseFloat(planPriceText2.match(/\d+/)[0]);
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const exchangeRate = data.rates[toCurrency];
    const convertedAmount = amount * exchangeRate;
    const convertedAmount1 = amount1 * exchangeRate;
    const convertedAmount2 = amount2 * exchangeRate;
    const symbol = getsymbol(toCurrency);
    document.getElementById('planprice').innerText = `${symbol} ${convertedAmount.toFixed(0)}/month`;
    document.getElementById('planprice1').innerText = `${symbol} ${convertedAmount1.toFixed(0)}/month`;
    document.getElementById('planprice2').innerText = `${symbol} ${convertedAmount2.toFixed(0)}/month`;
}

document.getElementById('currency').addEventListener('change', convertCurrency);

window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var appname = this.document.querySelector('.appname')
    if (window.scrollY > 0) {
        appname.classList.add('displaynone')
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        appname.classList.remove('displaynone')
    }
});

