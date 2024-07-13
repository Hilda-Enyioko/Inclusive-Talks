function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Function to fetch a single blog post by ID from an API
const fetchBlogPost = async (id) => {
  const response = await fetch(
    `https://inclusive-talks.vercel.app/api/trpc/getBlogPost`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: id,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const {
    result: { data },
  } = await response.json();
  return data;
};

// Function to render the blog post
const renderBlogPost = (post) => {
  console.log(post);
  document.getElementById("blog-title").textContent = post.title;
  document.getElementById("author-link").textContent = post.writtenBy;
  document.getElementById("date-written").textContent = new Date(
    post.createdAt
  ).toLocaleDateString();
  document.getElementById("image").src = post.imgUrl;

  const audioSource = document.getElementById("audioSource");

  const audioUrl = post.audioUrl;
  audioSource.src = audioUrl;

  const audioPlayer = document.getElementById("audioPlayer");

  audioPlayer.load();
  document.getElementById("blog-read").innerHTML = post.content;

  // Render comments
  renderComments(post.comments || []); // Default to an empty array if comments are undefined
};

// Function to render comments
const renderComments = (comments) => {
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML = ""; // Clear existing comments

  if (comments.length === 0) {
    commentsContainer.innerHTML = "";
  } else {
    comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
        <div class="profile">
          <img src="images/image-colton.jpg" alt="" />
          <div class="name">
            <p class="date">${new Date(
              comment.timeCreated
            ).toLocaleDateString()}</p>
          </div>
        </div>
        <p class="text">${comment.comment}</p>
      `;
      commentsContainer.appendChild(commentElement);
    });
  }
};

// Main function to fetch and render the blog post
const initializeBlog = async () => {
  const blogId = getUrlParameter("blogId");

  if (!blogId) {
    document.getElementById("blog-container").innerHTML =
      "<p>Blog post not found.</p>";
    return;
  }

  try {
    // Show loading indicator
    document.getElementById("loading").style.display = "block";

    const blogPost = await fetchBlogPost(blogId);
    renderBlogPost(blogPost);

    // Hide loading indicator and show blog container
    document.getElementById("loading").style.display = "none";
    document.getElementById("blog-container").style.display = "block";
  } catch (error) {
    console.error("Error fetching the blog post:", error);
    document.getElementById("loading").style.display = "none";
    document.getElementById("blog-container").innerHTML =
      "<p>Error loading blog post.</p>";
  }
};

// Initialize the blog on page load
window.addEventListener("DOMContentLoaded", initializeBlog);
