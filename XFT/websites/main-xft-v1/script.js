// Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
    const acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});

// Accordion2 functionality, memo page

document.addEventListener("DOMContentLoaded", function () {
    const acc = document.getElementsByClassName("accordion2");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});

// TEXT ANIMATION
const animateText1 = (element, text, delay = 50, className = '', newLine = true) => {
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

document.addEventListener('DOMContentLoaded', async () => {
    const animateElements = document.querySelectorAll('.animate-text');

    animateElements.forEach(async (element) => {
        const text = element.textContent;
        element.textContent = ''; // Clear the initial content

        // Animate the text within the element
        await animateText1(element, text, 50, 'title');
    });
});



// Update the current date [ERROR HERE]
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currentDate").innerHTML = new Date().toDateString();
});



// Headlines for terminal [ERROR HERE]
const headlinesCache = 'headlines-cache';

async function getHeadlines() {
    const cache = await caches.open(headlinesCache);
    const cachedResponse = await cache.match('headlines');
    if (cachedResponse) {
        return cachedResponse.json();
    }

    const response = await fetch('https://x-ledger.replit.app/api/headlines');
    const data = await response.json();
    cache.put('headlines', new Response(JSON.stringify(data)));
    return data;
}

getHeadlines().then(data => {
    const tableBody = document.querySelector('#headlinesTable tbody');
    data.forEach(item => {
        const row = tableBody.insertRow();
        const titleCell = row.insertCell(0);
        const dateCell = row.insertCell(1);
        titleCell.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a>`;
        dateCell.textContent = new Date(item.date).toLocaleDateString();
    });
}).catch(error => console.error('Error:', error));














