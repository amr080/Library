async function fetchSingleNewsItem() {
  const url = 'https://www.spglobal.com/spdji/en/util/redesign/index-family-ri-solr-json.dot?pageNumber=1&pageSize=1&date=all&language_id=1';
  const response = await fetch(url);
  const data = await response.json();
  return data.resultData[0]; // Get the first (and only) news item
}

document.getElementById('fetch-news').addEventListener('click', async () => {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '<p>Loading news...</p>';

  const newsItem = await fetchSingleNewsItem();
  newsContainer.innerHTML = ''; // Clear the loading message

  if (newsItem) {
      const newsDiv = document.createElement('div');
      newsDiv.innerHTML = `
          <h3>${newsItem.title}</h3>
          <p>${newsItem.description}</p>
          <a href="https://www.spglobal.com${newsItem.link}" target="_blank">Read more</a>
          <hr>
      `;
      newsContainer.appendChild(newsDiv);
  } else {
      newsContainer.innerHTML = '<p>No news available.</p>';
  }
});