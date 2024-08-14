import {
  computePosition,
  shift,
  offset,
  autoUpdate,
} from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.10/+esm";

let cleanup = null; // Pour gérer l'autoUpdate globalement
let activeTooltip = null; // Pour garder une trace du tooltip actuellement visible

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

window.ongletChange = ongletChange; /// Ajouter manuellement la fonction à l'objet global window

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

////////////////////////////////////////////////////////////////////////////////////////////////////////

// This function will get called repeatedly.
function updatePosition(button, tooltip) {
  computePosition(button, tooltip, {
    placement: "right",
    middleware: [offset(6), shift()],
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
}

// Fonction pour afficher le tooltip et activer l'autoUpdate
function showTooltip(button, tooltip) {
  tooltip.style.display = "block";
  updatePosition(button, tooltip); // Met à jour la position immédiatement
  cleanup = autoUpdate(button, tooltip, () => updatePosition(button, tooltip)); // Active l'autoUpdate
  activeTooltip = tooltip;
}

// Fonction pour cacher le tooltip et désactiver l'autoUpdate
function hideTooltip() {
  if (activeTooltip) {
    activeTooltip.style.display = "none";
    activeTooltip = null;
  }
  if (cleanup) {
    cleanup(); // Désactive l'autoUpdate
    cleanup = null;
  }
}

// Ajoute un gestionnaire d'événements à chaque bouton
document.querySelectorAll(".dropbtn").forEach((button) => {
  const tooltipId = button.getAttribute("data-tooltip-id");
  const tooltip = document.getElementById(tooltipId);

  button.addEventListener("click", function (event) {
    event.stopPropagation(); // Empêche la propagation du clic

    if (activeTooltip === tooltip) {
      hideTooltip(); // Cacher le tooltip si c'est le même qui est cliqué
    } else {
      hideTooltip(); // Cacher tout autre tooltip actif
      showTooltip(button, tooltip); // Afficher le tooltip actuel
    }
  });
});

// Gère le clic en dehors de tout bouton pour cacher le tooltip
document.addEventListener("click", function (event) {
  const isButtonClick = event.target.classList.contains("dropbtn");
  if (!isButtonClick && activeTooltip) {
    hideTooltip(); // Cacher le tooltip si on clique ailleurs
  }
});

// change icon img

document.querySelectorAll(".dropbtn").forEach((button) => {
  button.setAttribute("type", "button");
}); // definir de force le type de btn dans la form pour ne pas submit de base

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const dropdownItems = section.querySelectorAll(".dropdown-item");
    const hiddenInput = section.querySelector("input[type='hidden']");
    const dropbtn = section.querySelector(".dropbtn");

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function () {
        const imageName = this.getAttribute("data-image-name");
        hiddenInput.value = imageName;

        // Create a new image to display in the button
        const selectedImage = document.createElement("img");
        selectedImage.src = `../../public/images/animal_icon/${imageName}`;
        selectedImage.alt = "Selected Image";

        // Clear the previous content of the button and add the new image
        dropbtn.innerHTML = "";
        dropbtn.appendChild(selectedImage);
      });
    });
  });
});
