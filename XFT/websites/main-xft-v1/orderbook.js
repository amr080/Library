class Order {
    constructor(orderId, price, quantity, side) {
        this.orderId = orderId;
        this.price = price;
        this.quantity = quantity;
        this.side = side; // 'B' = Buy, 'S' = Sell
        this.timestamp = new Date();
    }
}

class OrderBook {
    constructor() {
        this.buyOrders = [];
        this.sellOrders = [];
        this.nextOrderId = 1;
    }

    addOrder(order) {
        if (order.side === 'B') {
            this.buyOrders.push(order);
            this.buyOrders.sort((a, b) => b.price - a.price);
        } else {
            this.sellOrders.push(order);
            this.sellOrders.sort((a, b) => a.price - b.price);
        }
        this.displayOrders();
    }

    displayOrders() {
        const tbody = document.getElementById('orderbook-body');
        tbody.innerHTML = '';

        const maxRows = Math.max(this.buyOrders.length, this.sellOrders.length);

        for (let i = 0; i < maxRows; i++) {
            const buyOrder = this.buyOrders[i] || { orderId: '', price: '', quantity: '' };
            const sellOrder = this.sellOrders[i] || { orderId: '', price: '', quantity: '' };

            tbody.innerHTML += `
                <tr>
                    <td class="buy-orders">${buyOrder.orderId}</td>
                    <td class="buy-orders">${buyOrder.price}</td>
                    <td class="buy-orders">${buyOrder.quantity}</td>
                    <td class="sell-orders">${sellOrder.price}</td>
                    <td class="sell-orders">${sellOrder.quantity}</td>
                    <td class="sell-orders">${sellOrder.orderId}</td>
                </tr>
            `;
        }
    }

    matchOrders() {
        const output = document.getElementById('output');
        output.innerHTML = '';

        while (this.buyOrders.length && this.sellOrders.length) {
            if (this.buyOrders[0].price >= this.sellOrders[0].price) {
                const matchQty = Math.min(this.buyOrders[0].quantity, this.sellOrders[0].quantity);
                output.innerHTML += `Match: Buy Order ${this.buyOrders[0].orderId} and Sell Order ${this.sellOrders[0].orderId} for ${matchQty} units at price ${this.sellOrders[0].price}<br>`;

                this.buyOrders[0].quantity -= matchQty;
                this.sellOrders[0].quantity -= matchQty;

                if (this.buyOrders[0].quantity === 0) this.buyOrders.shift();
                if (this.sellOrders[0].quantity === 0) this.sellOrders.shift();

                this.displayOrders();
            } else {
                break; // No more matches possible
            }
        }
    }

    generateOrder() {
        const side = Math.random() < 0.5 ? 'B' : 'S';
        const price = parseFloat((100 + Math.random() * 4 - 2).toFixed(2));
        const quantity = Math.floor(Math.random() * 20) + 1;
        const order = new Order(this.nextOrderId++, price, quantity, side);
        this.addOrder(order);
    }
}

const ob = new OrderBook();

function generateOrder() {
    ob.generateOrder();
}

function matchOrders() {
    ob.matchOrders();
}