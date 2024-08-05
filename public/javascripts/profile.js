function ongletChange(x) {
  let onglet = document.querySelectorAll(".profileInData");
  let active = document.querySelectorAll(".profileOption");
  console.log(active);
  for (let i = 0; i < onglet.length; i++) {
    onglet[i].style.display = "none";
    active[i].removeAttribute("id", "btnActif");
  }

  onglet[x].style.display = "block";
  active[x].setAttribute("id", "btnActif");
}

document
  .querySelector("#formSubmitPass")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch("/profileReq?pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((text) => {
        const pass = document
          .getElementById("profileSecurity")
          .querySelector(".profileDivInData");

        if (text == "Password Incorrect") {
          alert("Password Incorrect");
        } else {
          pass.innerText = text;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
