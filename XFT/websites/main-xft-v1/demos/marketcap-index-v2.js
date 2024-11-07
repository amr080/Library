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
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = ''; // Clear existing rows

  stocks.forEach(stock => {
    const weight = ((stock.marketCap / totalMarketCap) * 100).toFixed(2);

    // Create a new row
    const row = document.createElement('tr');

    // Create and append the company name cell
    const nameCell = document.createElement('td');
    nameCell.textContent = stock.name;
    row.appendChild(nameCell);

    // Create and append the percentage cell
    const percentageCell = document.createElement('td');
    percentageCell.textContent = `${weight}%`;
    row.appendChild(percentageCell);

    // Create and append the market cap cell
    const marketCapCell = document.createElement('td');
    marketCapCell.textContent = stock.marketCap;
    row.appendChild(marketCapCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Initial index display
updateIndex();

// Update market cap and index every 2 seconds
setInterval(updateMarketCap, 2000);