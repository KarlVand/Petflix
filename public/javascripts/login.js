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

////login Post

document
  .querySelector("#formSubmit")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Si la réponse est une redirection, suivez-la
        if (response.redirected) {
          window.location.href = response.url; // Redirection manuelle
        } else {
          return response.text(); // Continue de traiter la réponse
        }
      })
      .then((text) => {
        if (text) {
          // Affiche les messages d'erreur sans recharger la page
          const pass = document.getElementById("incorectPassword");
          const uName = document.getElementById("incorectUser");
          pass.innerText = "";
          uName.innerText = "";
          if (text === "Password Incorrect") {
            pass.innerText = text;
          } else if (text === "User does not exist") {
            uName.innerText = text;
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
