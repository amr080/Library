document.getElementById('runButton').addEventListener('click', function () {
  const scriptName = document.getElementById('scriptSelect').value;
  const baseUrl = window.location.origin;
  fetch(`${baseUrl}/run_code?script=${encodeURIComponent(scriptName)}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('output').innerText = data.output;
    })
    .catch((error) => console.error('Error:', error));
});

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