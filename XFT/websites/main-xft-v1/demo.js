// Spread calculation
function updateSpread() {
    const volatility = document.getElementById('volatility').value;
    const liquidity = document.getElementById('liquidity').value;

    // Simple formula to calculate spread based on volatility and liquidity
    const basePrice = 100;
    const bidPrice = basePrice - (volatility * 0.1) + (liquidity * 0.001);
    const askPrice = basePrice + (volatility * 0.1) - (liquidity * 0.001);

    // Ensure askPrice is always greater than bidPrice
    const minimumSpread = 0.01; // Minimum spread to avoid negative or zero spreads
    const adjustedAskPrice = Math.max(askPrice, bidPrice + minimumSpread);

    const spread = adjustedAskPrice - bidPrice;

    // Update the displayed values
    document.getElementById('volatility-value').textContent = volatility + '%';
    document.getElementById('liquidity-value').textContent = liquidity + ' Shares';
    document.getElementById('bid-price').textContent = '$' + bidPrice.toFixed(2);
    document.getElementById('ask-price').textContent = '$' + adjustedAskPrice.toFixed(2);
    document.getElementById('spread-value').textContent = '$' + spread.toFixed(2);
}

// Initialize the spread calculation on page load
document.addEventListener('DOMContentLoaded', updateSpread);


// NYSE clock
document.addEventListener('DOMContentLoaded', (event) => {
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const isOpen = (hours > 9 || (hours === 9 && minutes >= 30)) && hours < 16;
    const status = isOpen ? 'NYSE is open.' : '<span style="color: #ff4c4c;">NYSE is closed.</span>';

    document.getElementById('clock').innerHTML = `${time} ET - ${status}`;
  }

  setInterval(updateClock, 1000);
  updateClock(); // initial call
});

// REAL-TIME NET-ASSET VALUE
const prices = [150.44, 104.22, 175.72];

function updatePrices() {
    let total = 0;
    prices.forEach((price, index) => {
        const newPrice = generateNewPrice(price);
        document.getElementById(`price${index + 1}`).textContent = newPrice.toFixed(2);
        total += newPrice;
    });
    document.getElementById('result').textContent = total.toFixed(2);
}

function generateNewPrice(oldPrice) {
    const volatility = 0.05;
    const change = oldPrice * volatility * (Math.random() * 2 - 1);
    return Math.max(1, Math.min(200, oldPrice + change));
}

setInterval(updatePrices, 1000);







