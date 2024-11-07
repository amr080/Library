const index = [
  {name: 'Stock A', weight: 40},
  {name: 'Stock B', weight: 30},
  {name: 'Stock C', weight: 30}
];

let portfolio = [
  {name: 'Stock A', holding: 45},
  {name: 'Stock B', holding: 25},
  {name: 'Stock C', holding: 30}
];

function displayIndex() {
  let output = '';
  index.forEach(stock => {
      output += `<li>${stock.name}: ${stock.weight}%</li>`;
  });
  document.getElementById('index-list').innerHTML = output;
}

function displayPortfolio() {
  let output = '';
  portfolio.forEach(stock => {
      output += `<li>${stock.name}: ${stock.holding}%</li>`;
  });
  document.getElementById('portfolio-list').innerHTML = output;
}

function rebalancePortfolio() {
  portfolio.forEach(stock => {
      const target = index.find(i => i.name === stock.name);
      if (target) {
          stock.holding = target.weight;
      }
  });
  displayPortfolio();
  alert('Portfolio rebalanced!');
}

function addStockToPortfolio() {
  const stockName = prompt("Enter stock name:");
  const stockWeight = parseFloat(prompt("Enter stock weight:"));
  if (stockName && !isNaN(stockWeight)) {
      portfolio.push({name: stockName, holding: stockWeight});
      index.push({name: stockName, weight: stockWeight});
      displayPortfolio();
      displayIndex();
  }
}

function removeStockFromPortfolio() {
  const stockName = prompt("Enter stock name to remove:");
  portfolio = portfolio.filter(stock => stock.name !== stockName);
  displayPortfolio();
}

function simulateMarketChange() {
  portfolio.forEach(stock => {
      const change = Math.random() * 10 - 5; // Random change between -5% to +5%
      stock.holding += change;
      if (stock.holding < 0) stock.holding = 0;
  });
  displayPortfolio();
  alert('Market changes simulated!');
}

displayIndex();
displayPortfolio();
