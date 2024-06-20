document.getElementById("sub-btn").addEventListener("click", async () => {
  const emailInput = document.getElementById("input-email");
  const email = emailInput.value;
  const feedback = document.getElementById("feedback");
  const token = "ab448096-dfd4-4e36-a433-7141de8ce724";

  feedback.style.display = "none";
  feedback.textContent = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.style.display = "block";
    return;
  }

  try {
    feedback.textContent = "Subscribing... 😊😍😘";
    feedback.style.color = "white";
    feedback.style.display = "block";

    const response = await fetch(
      "https://inclusive-talks.vercel.app/api/trpc/createSubscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      }
    );

    console.log("body", response.body);
    console.log("text", response.statusText);

    if (response.ok) {
      feedback.textContent =
        "Subscription successful! You will get updates on your email";
      feedback.style.color = "green";
      feedback.style.display = "block";
      emailInput.value = ""; // Clear the input field
    } else {
      const errorData = await response.json();
      feedback.textContent = "Email already exist";
      feedback.style.color = "red";
      feedback.style.display = "block";
    }
  } catch (error) {
    feedback.textContent =
      "Network error. Please check your connection and try again.";
    feedback.style.color = "red";
    feedback.style.display = "block";
  }
});
