document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("inputField");
  const emailField = document.getElementById("emailField");
  const passwordField = document.getElementById("passwordInput");
  const passwordbase = document.getElementById("passwordBase");
  const response1 = document.getElementById("userCheck");
  const response2 = document.getElementById("emailCheck");
  const response3 = document.getElementById("passwordCheck");
  const submitButton = document.querySelector('button[type="submit"]');

  /// Initial state
  submitButton.disabled = true;
  let activeInFunctionInput = true;
  let activeInFunctionEmail = true;
  let activeInFunctionPassword = true;

  function updateSubmitButtonState() {
    if (
      activeInFunctionInput ||
      activeInFunctionEmail ||
      activeInFunctionPassword
    ) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }

  function handleInputField() {
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
        if (data === "user already exist") {
          response1.classList.add("visible");
          activeInFunctionInput = true;
          console.log("Username invalid");
        } else {
          response1.classList.remove("visible");
          activeInFunctionInput = false;
        }
        updateSubmitButtonState();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleEmailField() {
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
        if (data === "email already exist") {
          response2.classList.add("visible");
          activeInFunctionEmail = true;
        } else {
          response2.classList.remove("visible");
          activeInFunctionEmail = false;
        }
        updateSubmitButtonState();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handlePasswordField() {
    const data = passwordField.value;
    const dataBase = passwordbase.value;

    if (data.length === dataBase.length) {
      if (data !== dataBase) {
        response3.classList.add("visible");
        activeInFunctionPassword = true;
      } else {
        response3.classList.remove("visible");
        activeInFunctionPassword = false;
      }
    } else {
      activeInFunctionPassword = true;
    }
    updateSubmitButtonState();
  }

  // Event listeners
  inputField.addEventListener("input", handleInputField);
  emailField.addEventListener("input", handleEmailField);
  passwordField.addEventListener("input", handlePasswordField);
  passwordbase.addEventListener("input", handlePasswordField);

  // Keydown event to detect backspace
  document.addEventListener("keydown", function (event) {
    if (event.key === "Backspace") {
      console.log("Backspace");
      handleInputField();
      handleEmailField();
      handlePasswordField();
    }
  });
});
