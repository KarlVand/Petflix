document
  .querySelector("#formSubmit")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((html) => {
        const resultDiv = document.getElementById("textChange");
        resultDiv.innerHTML = html;
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

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
        response1.innerText = data;
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });

  emailField.addEventListener("input", function () {
    const data = { input: inputField.value };

    fetch("/emailCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        response2.innerText = data;
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });
});
