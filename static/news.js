document.addEventListener("DOMContentLoaded", () => {
  fetchNews();
});

async function fetchNews() {
  try {
    const response = await fetch('/api/news');
    const data = await response.json();
    const articles = data.articles;

    if (!Array.isArray(articles)) {
      console.error("Invalid articles format", articles);
      return;
    }

    displayNews(articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function displayNews(articles) {
  const container = document.getElementById("news-container");
  if (!container) {
    console.error("News container not found");
    return;
  }

  container.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.classList.add("visible");


    const title = document.createElement("h3");
    title.innerText = article.title;

    const desc = document.createElement("p");
    desc.innerText = article.description || "No description";

    const readMore = document.createElement("a");
    readMore.href = article.url;
    readMore.innerText = "Read more";
    readMore.target = "_blank";

    const bookmarkBtn = document.createElement("button");
    bookmarkBtn.innerText = "🔖 Bookmark";
    bookmarkBtn.onclick = () => saveBookmark(article.title, article.url);

    const speakBtn = document.createElement("button");
    speakBtn.innerText = "🔊 Speak";
    speakBtn.onclick = () => speakNews(article.title + ". " + article.description);

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(readMore);
    card.appendChild(bookmarkBtn);
    card.appendChild(speakBtn);

    container.appendChild(card);
  });
}

function saveBookmark(title, url) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push({ title, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  alert("News bookmarked!");
}

function speakNews(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

async function fetchTrendingNews() {
  try {
    const response = await fetch('/api/trending-news');
    const data = await response.json();
    return data.articles.map(article => ({
      title: article.title || "No Title",
      description: article.description || "No description available.",
      url: article.url || "#",
      category: "all",
      image: article.urlToImage || fallbackImage
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return trendingNews;
  }
}

document.querySelectorAll('.bookmark-button').forEach(button => {
    button.addEventListener('click', () => {
        const newsData = {
            title: button.dataset.title,
            description: button.dataset.description,
            url: button.dataset.url
        };

        fetch('/bookmark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        })
        .then(response => response.json())
        .then(data => {
            alert("News bookmarked!");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

function addToBookmarks(news) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarkedNews')) || [];
  bookmarks.push(news);
  localStorage.setItem('bookmarkedNews', JSON.stringify(bookmarks));
  alert('Bookmarked!');
}

function showBookmarks() {
    // Bookmarks ko localStorage se le lo
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    // Bookmark wali HTML page (bookmark.html) pe bhej do
    // Ek simple redirect karo
    window.location.href = "/bookmarks";
}

