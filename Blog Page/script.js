let allPosts = [];

async function fetchPosts() {
  try {
    const response = await fetch(
      "https://inclusive-talks.vercel.app/api/trpc/getAllPost"
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const res = await response.json();
    const { data } = res.result;
    allPosts = data;
    displayPosts(allPosts); // Initial render of all posts
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPosts(posts) {
  const postsContainer = document.getElementById("blog-container");
  postsContainer.innerHTML = ""; // Clear previous content

  if (!posts.length) {
    postsContainer.innerHTML = "<p>No posts found.</p>";
    return;
  }

  const searchTerm = document.getElementById("search-bar").value.toLowerCase();

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "blog-section";

    // Highlight matched search terms in title and content
    const highlightedTitle = highlightText(post.title, searchTerm);
    const highlightedContent = highlightText(
      truncateContent(post.content, 50),
      searchTerm
    );

    postElement.innerHTML = `
      <div class="blog-post">
        <h2>${highlightedTitle}</h2>
        <div class="post">
          <div class="post-text">
            <h4>Written By: ${post.writtenBy}</h4>
            <p>
              ${highlightedContent}
              <a href="../Blog Page/Blogpost/post.html?blogId=${post.id}">CONTINUE READING....</a>
            </p>
          </div>
          <div class="post-img">
            <img src="${post.imgUrl}" alt="" />
          </div>
        </div>
      </div>`;
    postsContainer.appendChild(postElement);
  });
}

function truncateContent(content, wordLimit) {
  const words = content.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : content;
}

function highlightText(text, term) {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

function filterPosts() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm)
  );
  displayPosts(filteredPosts); // Re-render based on filtered data
}

document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
  document.getElementById("search-bar").addEventListener("input", filterPosts);
});
