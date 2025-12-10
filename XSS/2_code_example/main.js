const comments = document.getElementById("comments");
const form = document.getElementById("comment-form");

if (!comments || !form) {
  throw new Error("Required elements missing");
}

function appendComment(name, message) {
  const div = document.createElement("div");
  div.className = "comment";
  // Vulnerable: directly injects user input into the DOM via innerHTML
  div.innerHTML = "<div class='meta'>" + name + " wrote:</div><div>" + message + "</div>";
  //div.innerHTML = "<div class='meta'>" + name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + " wrote:</div><div>" + message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>";
  comments.prepend(div);
}

[
  { name: "Kara", message: "The sunrise in Santorini felt like a painting." },
  { name: "Diego", message: "Kyoto in autumn—temples surrounded by amber leaves." },
].forEach(({ name, message }) => appendComment(name, message));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  const name = (nameInput && nameInput.value) || "Anonymous";
  const message = (messageInput && messageInput.value) || "";
  appendComment(name, message);
  form.reset();
});

