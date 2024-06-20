const blogId = localStorage.getItem("blogId");
console.log({ blogId });

// Function to fetch a single blog post by ID from an API
const fetchBlogPost = async (id) => {
  // Replace this with your actual API endpoint
  const response = await fetch(`https://api.example.com/blog/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

// Function to render the blog post
const renderBlogPost = (post) => {
  console.log("post", post);
  //   const blogTitle = document.getElementById("blog-title");
  //   const blogContainer = document.getElementById("blog-read");
  //   const writtenDate = document.getElementById("written-date");

  //   // Set the blog title
  //   blogTitle.textContent = post.title;

  //   // Create blog content
  //   blogContainer.innerHTML = `
  //       <div class="blog-post">
  //         <h2>${post.title}</h2>
  //         <p>${post.content}</p>
  //         <p><strong>Author:</strong> ${post.author}</p>
  //         <p><em>${new Date(post.date).toLocaleDateString()}</em></p>
  //       </div>
  //     `;
};

// Function to get the blog ID from the URL path
const getBlogIdFromUrl = () => {
  const pathParts = window.location.pathname.split("/");
  console.log({ pathParts });
  return pathParts[pathParts.length - 1]; // Get the last part of the path
};

// Main function to fetch and render the blog post
const initializeBlog = async () => {
  const blogId = getBlogIdFromUrl();
  if (!blogId) {
    document.getElementById("blog-container").innerHTML =
      "<p>Blog post not found.</p>";
    return;
  }

  try {
    const blogPost = await fetchBlogPost(blogId);
    renderBlogPost(blogPost);
  } catch (error) {
    console.error("Error fetching the blog post:", error);
    document.getElementById("blog-container").innerHTML =
      "<p>Error loading blog post.</p>";
  }
};

// Initialize the blog on page load
// window.addEventListener("DOMContentLoaded", initializeBlog);
