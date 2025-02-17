function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

document.addEventListener("DOMContentLoaded", () => {
  const postId = getUrlParameter("blogId");
  const isViewed = localStorage.getItem(`post-${postId}-viewed`);

  if (!isViewed) {
    incrementViewCount(postId);
    localStorage.setItem(`post-${postId}-viewed`, "true");
  }

  function incrementViewCount(postId) {
    fetch("https://inclusive-talks.vercel.app/api/trpc/updatePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: postId, views: 1 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update post");
        }
        return response.json();
      })
      .then((updatedPost) => {
        console.log("Post views updated successfully:", updatedPost);
        // Optionally, update the UI to reflect the new view count
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  }
});
