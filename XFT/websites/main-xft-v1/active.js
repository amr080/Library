const animateText = (element, text, delay = 50, className = '', newLine = true) => {
    return new Promise(resolve => {
        const span = document.createElement('span');
        span.className = className;
        element.appendChild(span);
        let i = 0;
        const animate = () => {
            if (i < text.length) {
                span.textContent += text[i];
                i++;
                setTimeout(animate, delay);
            } else {
                if (newLine) {
                    element.appendChild(document.createElement('br'));
                }
                resolve();
            }
        };
        animate();
    });
};
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const clearScreen = (element) => {
    element.innerHTML = '';
    return Promise.resolve();
};


const alexanderReedDemo = async (element) => {
    console.log("Running Alexander Reed Demo");
    await clearScreen(element);
    await animateText(element, "Alexander Reed", 100, 'name-title');
    await sleep(2000);
};

const anotherDemo = async (element) => {
    console.log("Running Another Demo");
    await clearScreen(element);
    await animateText(element, "Another Demo", 100, 'name-title');
    await sleep(2000);
};

const cefArbitrageDemo = async (element, scenario, buyCost, sellPrice) => {
    console.log(`Running CEF Arbitrage Demo: ${scenario}`);
    await clearScreen(element);
    await animateText(element, `CEF ${scenario}`, 50, 'title');
    await sleep(1000);

    const steps = scenario === "Premium" 
        ? [
            `Buy securities for $${buyCost}.`,
            `Create CEF tokens by delivering securities to XFT.`,
            `Sell CEF tokens for $${sellPrice}.`
          ]
        : [
            `Buy CEF shares for $${buyCost}.`,
            `Redeem CEF shares by delivering them to XFT.`,
            `Sell underlying securities for $${sellPrice}.`
          ];

    for (const [index, step] of steps.entries()) {
        await animateText(element, `${index + 1}. ${step}`, 50, 'step');
        await sleep(1000);
    }

    const profit = sellPrice - buyCost;
    await animateText(element, `Profit: `, 50, 'profit', false);
    await animateText(element, `$${profit.toFixed(2)}`, 50, 'profit-value');
    await sleep(2000);
};

const runDemo = async (element, demoName) => {
    const demos = {
        'alexander': alexanderReedDemo,
        'another': anotherDemo,
        'cef-arbitrage-premium': () => cefArbitrageDemo(element, "Premium", 100, 120),
        'cef-arbitrage-discount': () => cefArbitrageDemo(element, "Discount", 95, 100),
    };

    if (demoName === 'cef-arbitrage-loop') {
        console.log('Running CEF Arbitrage Loop Demo');
        while (true) {
            await demos['cef-arbitrage-premium']();
            await demos['cef-arbitrage-discount']();
        }
    } else if (demos[demoName]) {
        console.log(`Running demo: ${demoName}`);
        while (true) {
            await demos[demoName](element);
        }
    } else {
        console.error('Demo not found:', demoName);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const outputElements = document.querySelectorAll('.output');

    outputElements.forEach(element => {
        const demoName = element.getAttribute('data-demo');
        if (demoName) {
            runDemo(element, demoName);
        } else {
            console.error('No data-demo attribute found on element:', element);
        }
    });
});




