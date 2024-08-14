const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions");

async function fetchSuggestions(query) {
  try {
    const response = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    if (response.ok) {
      const suggestions = await response.json();
      return suggestions;
    } else {
      console.error("Failed to fetch suggestions");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

searchInput.addEventListener("input", async function () {
  const input = this.value.trim();
  suggestionsList.innerHTML = "";

  if (input) {
    const suggestions = await fetchSuggestions(input);

    if (suggestions.length > 0) {
      suggestions.slice(0, suggestions.length).forEach((suggestion) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.textContent = suggestion;
        suggestionItem.classList.add("suggestion-item");
        suggestionsList.appendChild(suggestionItem);

        suggestionItem.addEventListener("click", function () {
          searchInput.value = suggestion;
          suggestionsList.innerHTML = "";
        });
      });
    }
  }
});

document.addEventListener("click", function (e) {
  if (!searchInput.contains(e.target)) {
    suggestionsList.innerHTML = "";
  }
});
