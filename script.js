const container = document.getElementById("container");
const loading = document.getElementById("loading");

async function fetchData() {
  try {
    loading.style.display = "block";

    const response = await fetch(
      "https://api.sampleapis.com/codingresources/codingResources",
    );

    if (!response.ok) {
      throw new Error("API failed");
    }

    const data = await response.json();

    displayData(data.slice(0, 30));

    loading.style.display = "none";
  } catch (error) {
    console.log(error);
    loading.innerText = "⚠️ Failed to load tools. Please try again.";
  }
}

function displayData(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No tools found</p>";
    return;
  }

  data.forEach((item) => {
    // FINAL CORRECT FIELD MAPPING
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

fetchData();
