// Dummy News Data
const newsData = [
  {
    title: "AI Breakthrough in Medicine",
    category: "Technology",
    content: "Researchers have developed an AI that can diagnose diseases with 95% accuracy.",
    image: "https://source.unsplash.com/800x600/?medicine,ai"
  },
  {
    title: "Global Climate Summit 2025",
    category: "Environment",
    content: "Leaders around the world discuss urgent steps to combat climate change.",
    image: "https://source.unsplash.com/800x600/?climate,earth"
  },
  {
    title: "New Space Mission Announced",
    category: "Science",
    content: "NASA plans to send a new mission to Jupiter's moon Europa in 2026.",
    image: "https://source.unsplash.com/800x600/?space,rocket"
  }
];

// Load News
function displayNews(filter = "All") {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  const filteredNews = filter === "All" ? newsData : newsData.filter(news => news.category === filter);

  filteredNews.forEach(news => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    card.innerHTML = `
      <img src="${news.image}" alt="news image">
      <h3>${news.title}</h3>
      <p>${news.content}</p>
      <div class="card-buttons">
        <button class="read-more">Read More</button>
        <button class="like-btn">❤️</button>
        <button class="bookmark-btn">🔖</button>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/news/top-headlines")
    .then(response => response.json())
    .then(articles => {
      const container = document.getElementById("news-container");
      container.innerHTML = "";

      articles.forEach(article => {
        const div = document.createElement("div");
        div.className = "news-card";
        div.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description || "No description available"}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Error fetching news:", error);
    });
});
