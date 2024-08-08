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

document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const hiddenInput = document.getElementById("selectedImage");
  const dropbtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropbtn.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdownContent.classList.toggle("grid");
    dropdownContent.style.display =
      dropdownContent.style.display === "grid" ? "none" : "grid";
  });

  document.addEventListener("click", function () {
    dropdownContent.style.display = "none";
    dropdownContent.classList.remove("grid");
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imageName = this.getAttribute("data-image-name");
      hiddenInput.value = imageName;
      // Créer une nouvelle image pour l'afficher dans le bouton
      const selectedImage = document.createElement("img");
      selectedImage.src = "../public/images/animal_icon/" + imageName;
      selectedImage.alt = "Image sélectionnée";

      // Effacer le contenu précédent du bouton et ajouter la nouvelle image
      dropbtn.innerHTML = "";
      dropbtn.appendChild(selectedImage);
    });
  });
});
