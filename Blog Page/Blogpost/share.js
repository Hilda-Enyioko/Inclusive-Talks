function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

document.addEventListener("DOMContentLoaded", () => {
  const shareButton = document.getElementById("share-button");
  //   const postId = getUrlParameter("blogId");
  const postUrl = window.location.href;

  shareButton.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post!",
          text: "I found this post interesting and thought you might like it too.",
          url: postUrl,
        });
        console.log("Post shared successfully");
      } catch (error) {
        console.error("Error sharing post:", error);
      }
    } else {
      console.error("Web Share API is not supported in this browser.");
      // Optionally, you can provide a fallback for browsers that do not support the Web Share API
    }
  });
});
