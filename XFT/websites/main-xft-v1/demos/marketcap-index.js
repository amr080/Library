// Depreciated, used in bullets

let stocks = [
  { name: 'Apple', marketCap: 2.5 },
  { name: 'Microsoft', marketCap: 2.2 },
  { name: 'Amazon', marketCap: 1.7 },
  { name: 'Tesla', marketCap: 0.9 },
  { name: 'Google', marketCap: 1.5 }
];

function updateMarketCap() {
  stocks = stocks.map(stock => {
    const randomChange = (Math.random() - 0.5) * 0.01; // Random change between -0.005 and 0.005
    stock.marketCap = parseFloat((stock.marketCap + randomChange).toFixed(3));
    return stock;
  });
  updateIndex();
}

function updateIndex() {
  const totalMarketCap = stocks.reduce((sum, stock) => sum + stock.marketCap, 0);
  const indexList = document.getElementById('indexList');
  indexList.innerHTML = '';
  stocks.forEach(stock => {
    const weight = ((stock.marketCap / totalMarketCap) * 100).toFixed(2);
    const li = document.createElement('li');
    li.textContent = `${stock.name}: ${weight}% (Market Cap: ${stock.marketCap}T)`;
    indexList.appendChild(li);
  });
}

// Initial index display
updateIndex();

// Update market cap and index every 2 seconds
setInterval(updateMarketCap, 2000);








