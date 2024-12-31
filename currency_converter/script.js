
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const convertedAmount = document.getElementById('converted-amount');
const errorMessage = document.getElementById('error-message');


const apiKey = 'YOUR_API_KEY'; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


async function fetchCurrencyRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.result === "error") {
            throw new Error("Error fetching currency data.");
        }

        
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
        });

    } catch (error) {
        errorMessage.textContent = "Failed to load currency data. Please try again later.";
    }
}


async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        errorMessage.textContent = "Please enter a valid amount.";
        convertedAmount.textContent = '';
        return;
    }

    if (fromCurrency === toCurrency) {
        errorMessage.textContent = "Select different currencies to convert.";
        convertedAmount.textContent = '';
        return;
    }

    errorMessage.textContent = ''; 

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === "error") {
            throw new Error("Error fetching exchange rate.");
        }

        const rate = data.conversion_rates[toCurrency];
        const converted = (amount * rate).toFixed(2);
        convertedAmount.textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
        
    } catch (error) {
        errorMessage.textContent = "Error converting currency. Please try again.";
        convertedAmount.textContent = '';
    }
}


convertBtn.addEventListener('click', convertCurrency);


fetchCurrencyRates();
