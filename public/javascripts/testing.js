const form = document.querySelector("#formSubmit");
console.log(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(form);
  //postLogin();
});

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
