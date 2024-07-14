const apiKey = '96a320ea42674d05bc44a1b438f08e69';
const newsContainer = document.getElementById('news-container');
const categoryLinks = document.querySelectorAll('.category-link');

// Function to fetch news articles from API
function fetchNews(category = '') {
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  if (category) {
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
  }
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const newsArticles = data.articles;
      newsContainer.innerHTML = '';
      newsArticles.foreach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
          <img src="${article.urlToImage}" alt="${article.title}">
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsCard);
      });
    })
    // .catch(error => console.error(error));
}

// Fetch news articles on page load
fetchNews();

// Add event listeners to category links
categoryLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const category = link.getAttribute('data-category');
    fetchNews(category);
  });
});
