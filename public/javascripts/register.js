document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("inputField");
  const emailField = document.getElementById("emailField");
  const response1 = document.getElementById("userCheck");
  const response2 = document.getElementById("emailCheck");

  inputField.addEventListener("input", function () {
    const data = { input: inputField.value };

    fetch("/usernameCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data == "user already exist") {
          response1.classList.add("visible");
        } else {
          response1.classList.remove("visible");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });

  emailField.addEventListener("input", function () {
    const data = { input: emailField.value };

    fetch("/emailCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data == "email already exist") {
          response2.classList.add("visible");
        } else {
          response2.classList.remove("visible");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });
});
