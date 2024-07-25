document.addEventListener("DOMContentLoaded", () => {
  const likeButton = document.getElementById("like-button");
  const postId = getUrlParameter("blogId");

  // Check local storage for like state
  const isLiked = localStorage.getItem(`liked-${postId}`) === "true";
  if (isLiked) {
    likeButton.classList.remove("fa-regular");
    likeButton.classList.add("fa-solid");
  }

  likeButton.addEventListener("click", async () => {
    const currentState = localStorage.getItem(`liked-${postId}`) === "true";
    const newState = !currentState;

    if (newState) {
      likeButton.classList.remove("fa-regular");
      likeButton.classList.add("fa-solid");
    } else {
      likeButton.classList.remove("fa-solid");
      likeButton.classList.add("fa-regular");
    }

    // Update local storage
    localStorage.setItem(`liked-${postId}`, newState);

    // Update the like count in the backend
    try {
      const response = await fetch(
        "https://inclusive-talks.vercel.app/api/trpc/updatePost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: postId, likes: newState ? 1 : -1 }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      const updatedPost = await response.json();
      console.log("Post updated successfully:", updatedPost);
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  });
});

// Helper function to get URL parameter
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
