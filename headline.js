document.addEventListener("DOMContentLoaded", fetchNews);


async function fetchNews() {
  const res = await fetch('/api/news/top-headlines');
  const data = await res.json();
  const container = document.getElementById('news-container');
  container.innerHTML = "";

  data.articles.forEach((article, index) => {
    const card = document.createElement('div');
    card.classList.add("visible");
    card.className = "news-card";

    const title = document.createElement('h3');
    title.textContent = article.title;

    const description = document.createElement('p');
    description.textContent = article.description || "No description available.";

    const readMore = document.createElement('a');
    readMore.href = article.url;
    readMore.target = "_blank";
    readMore.textContent = "🔗 Read More";

    const speakBtn = document.createElement('button');
    speakBtn.textContent = "🔊 Speak";
    speakBtn.onclick = () => speakNews(article.title + ". " + article.description);

    const bookmarkBtn = document.createElement('button');
    bookmarkBtn.textContent = "🔖 Save";
    bookmarkBtn.onclick = () => saveBookmark(article.title, article.url);

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(readMore);
    card.appendChild(speakBtn);
    card.appendChild(bookmarkBtn);

    container.appendChild(card);
  });
}

function speakNews(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

function saveBookmark(title, url) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  bookmarks.push({ title, url });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  alert('News bookmarked!');
}

function showBookmarks() {
  const container = document.getElementById('news-container');
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

  container.innerHTML = "<h2>📌 Bookmarked News</h2>";
  if (bookmarks.length === 0) {
    container.innerHTML += "<p>No bookmarks saved.</p>";
    return;
  }

  bookmarks.forEach(bookmark => {
    const div = document.createElement('div');
    div.className = "news-card";

    const title = document.createElement('h3');
    title.textContent = bookmark.title;

    const link = document.createElement('a');
    link.href = bookmark.url;
    link.target = "_blank";
    link.textContent = "🔗 Read Again";

    div.appendChild(title);
    div.appendChild(link);
    container.appendChild(div);
  });
}

