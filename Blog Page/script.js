const hambugerMenu = document.querySelector(".hambuger-menu");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector(".close-button");

hambugerMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const questions = document.querySelectorAll(".the-questions");

questions.forEach((questions) => {
  questions.addEventListener("click", () => {
    questions.classList.toggle("active");
  });
});

// Fetching of blog post
document.addEventListener("DOMContentLoaded", () => {
  // Function to fetch posts from the API
  async function fetchPosts() {
    try {
      // Send a GET request to the API endpoint
      const response = await fetch(
        "https://inclusive-talks.vercel.app/api/trpc/getAllPost"
      );
      console.log(response);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const res = await response.json();
      console.log({ res });
      const { data } = res.result;
      console.log(data);

      const postsContainer = document.getElementById("posts-container");

      // Clear the container
      postsContainer.innerHTML = "";

      // Iterate over the posts and create HTML for each post
      data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `
        <div class="blog-post">
        <h1>Blog Posts</h1>
        <h2>${post.title}</h2>

        <div class="post">
          <div class="post-text">
            <h4>Written By: ${post.writtenBy}</h4>
            <p>
              ${post.text}
              <a href="../Blog Page/Gratitude for diversity/post.html"
                >CONTINUE READING....</a
              >
            </p>
          </div>

          <div class="post-img">
            <img src=${post.imgUrl} alt="" />
          </div>
        </div>
      </div>
                  `;
        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  // Call the fetchPosts function to load the posts when the page loads
  fetchPosts();
});
