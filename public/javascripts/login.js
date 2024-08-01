document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const loginModal = document.getElementById("loginModal");
  const closeButton = document.querySelector(".close");
  const content = document.getElementById("content");
  //   const left = document.querySelector(".leftHalf");

  loginButton.addEventListener("click", function () {
    loginModal.style.display = "flex";
    content.classList.add("blur");
    // left.classList.add("blur");
  });

  closeButton.addEventListener("click", function () {
    loginModal.style.display = "none";
    content.classList.remove("blur");
    // left.classList.remove("blur");
  });

  window.addEventListener("click", function (event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
      content.classList.remove("blur");
      //   left.classList.remove("blur");
    }
  });
});

const form = document.querySelector("#formSubmit");
console.log(form);

//form.addEventListener("submit", (event) => {
//event.preventDefault();
// postLogin();
//});

async function postLogin() {
  const formData = new FormData(form);

  try {
    const response = await fetch("/login", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}
