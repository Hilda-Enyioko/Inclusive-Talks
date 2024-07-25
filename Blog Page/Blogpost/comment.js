function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentsContainer = document.getElementById("comments-container");
  const submitButton = document.getElementById("comment-submit-button");
  const buttonLoader = document.getElementById("button-loader");
  const commentIcon = document.getElementById("comment-icon");
  const postId = getUrlParameter("blogId");

  commentIcon.addEventListener("click", () => {
    commentInput.focus();
  });

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newComment = commentInput.value.trim();
    if (!newComment) return;

    // Show the spinner and hide the "Post" text
    buttonLoader.style.display = "inline-block";
    submitButton.textContent = "";
    submitButton.appendChild(buttonLoader);

    try {
      const response = await fetch(
        "https://inclusive-talks.vercel.app/api/trpc/updatePost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: postId, comments: [newComment] }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update post");
      } else {
        const updatedPost = await response.json();
        console.log("Post updated successfully:", updatedPost);
        addCommentToUI(newComment);
        commentInput.value = "";
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      // Hide the spinner and show the "Post" text
      buttonLoader.style.display = "none";
      submitButton.textContent = "Post";
    }
  });

  function addCommentToUI(comment) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
        <div class="profile">
          <img src="images/image-colton.jpg" alt="" />
          <div class="name">
            <p class="date">${new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <p class="text">${comment}</p>
      `;
    commentsContainer.appendChild(commentElement);
  }

  function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id"); // Assuming the post ID is a query parameter in the URL
  }
});
