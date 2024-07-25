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

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const res = await response.json();
      const { data } = res.result;
      console.log(data);

      const postsContainer = document.getElementById("blog-container");

      function truncateContent(html, wordLimit) {
        // Create a temporary DOM element to hold the content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        let wordCount = 0;
        let truncatedContent = "";

        function walk(node) {
          // If it's a text node, process its text
          if (node.nodeType === Node.TEXT_NODE) {
            const words = node.nodeValue.split(/\s+/);
            for (let word of words) {
              if (wordCount < wordLimit) {
                truncatedContent += word + " ";
                wordCount++;
              } else {
                truncatedContent += "";
                return false;
              }
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // If it's an element node, process its children
            truncatedContent += `<${node.tagName.toLowerCase()}>`;
            for (let child of node.childNodes) {
              if (walk(child) === false) return false;
            }
            truncatedContent += `</${node.tagName.toLowerCase()}>`;
          }
          return true;
        }

        // Walk through the content nodes
        for (let child of tempDiv.childNodes) {
          if (walk(child) === false) break;
        }

        return truncatedContent;
      }

      // Iterate over the posts and create HTML for each post
      data.forEach((post, i) => {
        const postElement = document.createElement("div");

        postElement.className = "blog-section";
        postElement.innerHTML = `
        <div class="blog-post">
        <h1>Blog Posts</h1>
        <h2>${post.title}</h2>

        <div class="post">
          <div class="post-text">
            <h4>Written By: ${post.writtenBy}</h4>
            <p>
              ${truncateContent(post.content, 50)}
              <a href="../Blog Page/Blogpost/post.html?blogId=${post.id}"
                onclick="setId(${post.id})">CONTINUE READING....</a
              >
            </p>
          </div>

          <div class="post-img">
            <img src=${post.imgUrl} alt="" />
          </div>
        </div>
      </div>
                  `;
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
      });
      const setId = (id) => {
        localStorage.setItem("blogId", id);
        console.log("working");
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  // Call the fetchPosts function to load the posts when the page loads
  fetchPosts();
});

document.addEventListener("DOMContentLoaded", () => {
  const likeIcon = document.getElementById("like-icon");
  const postId = "your-post-id"; // Replace with the actual post ID

  // Fetch initial data (if needed)
  fetchInitialData();

  function fetchInitialData() {
    updateLikeIcon();
  }

  function updateLikeIcon() {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (likedPosts.includes(postId)) {
      likeIcon.classList.add("liked");
    } else {
      likeIcon.classList.remove("liked");
    }
  }

  likeIcon.addEventListener("click", () => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (likedPosts.includes(postId)) {
      alert("You have already liked this post");
      return;
    }

    // Add postId to likedPosts array
    likedPosts.push(postId);
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    updateLikeIcon();

    // Update the post on the server
    updatePost({ likes: 1 }); // Adjust the payload as needed
  });

  function updatePost(updateData) {
    fetch(`/api/posts/${postId}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post updated successfully", data);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  }
});
