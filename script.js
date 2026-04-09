const container = document.getElementById("container");
const loading = document.getElementById("loading");

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

let allTools = [];

// fetch data from API
async function fetchData() {
  try {
    loading.style.display = "block";

    const response = await fetch(
      "https://api.sampleapis.com/codingresources/codingResources"
    );

    if (!response.ok) {
      throw new Error("API failed");
    }

    const data = await response.json();

    allTools = data.slice(0, 30);

    displayData(allTools);

    loading.style.display = "none";
  } catch (error) {
    console.log(error);
    loading.innerText = "⚠️ Failed to load tools. Please try again.";
  }
}

// display function
function displayData(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No tools found</p>";
    return;
  }

  data.forEach((item) => {
    const title = item.description || "No Title";
    const description = item.title || "No description available";
    const category = (item.types && item.types[0]) || "General";
    const link = item.url || "#";

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <p><b>Category:</b> ${category}</p>
      <a href="${link}" target="_blank">Visit</a>
    `;

    container.appendChild(card);
  });
}

// SEARCH
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allTools.filter((item) =>
    (item.description || "").toLowerCase().includes(value)
  );

  displayData(filtered);
});

// FILTER
filterSelect.addEventListener("change", () => {
  const selected = filterSelect.value;

  if (selected === "all") {
    displayData(allTools);
  } else {
    const filtered = allTools.filter(
      (item) =>
        (item.types && item.types[0]) === selected
    );

    displayData(filtered);
  }
});

// SORT
sortSelect.addEventListener("change", () => {
  const type = sortSelect.value;

  const sorted = [...allTools].sort((a, b) => {
    const nameA = (a.description || "").toLowerCase();
    const nameB = (b.description || "").toLowerCase();

    return type === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  displayData(sorted);
});

fetchData();
