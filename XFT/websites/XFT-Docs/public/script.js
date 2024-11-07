console.log('JavaScript loaded');


function loadContent(file) {
    fetch(`/markdown/${file}`)
      .then(response => response.text())
      .then(html => {
        document.getElementById('content').innerHTML = html;

        
      })
      .catch(err => console.error('Error loading content:', err));
}


// Simplified accordion functionality using event delegation
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("accordion") || event.target.classList.contains("accordion2")) {
      event.target.classList.toggle("active");
      const panel = event.target.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    }
  });


// Hyperlink logo
document.getElementById("logo").addEventListener("click", function() {
  window.location.href = "https://x-financial-technologies.replit.app/";
});