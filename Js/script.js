document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-button");
    const countryInput = document.getElementById("country-input");
    const resultContainer = document.getElementById("result-container");

    // Fetch some default countries on page load
    const defaultCountries = ["Canada", "France", "Australia", "Japan", "Brazil","Pakistan"];
    loadDefaultCountries(defaultCountries);

    searchButton.addEventListener("click", function () {
        const countryName = countryInput.value.trim();

        if (countryName) {
            // Clear previous search results
            resultContainer.innerHTML = "";
            // Fetch country details
            fetchCountryDetails(countryName);
        } else {
            alert("Please enter a country name.");
        }
    });

    // Function to load some default countries on page load
    function loadDefaultCountries(countries) {
        countries.forEach(country => fetchCountryDetails(country));
    }

    function fetchCountryDetails(country) {
        const url = `https://restcountries.com/v3.1/name/${country}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Country not found");
                }
                return response.json();
            })
            .then(data => {
                // Loop through each country result and display as a card
                data.forEach(countryData => {
                    displayCountryCard(countryData);
                });
            })
            .catch(error => {
                console.error("Error fetching country data:", error);
                resultContainer.innerHTML = `<p class="error">Country not found. Please try another name.</p>`;
            });
    }

    function displayCountryCard(countryData) {
        // Create a card for each country
        const card = document.createElement("div");
        card.classList.add("country-card");

        // Populate the card with country details
        card.innerHTML = `
            <h2>${countryData.name.common}</h2>
            <img src="${countryData.flags.png}" alt="Flag of ${countryData.name.common}">
            <p><strong>Capital:</strong> ${countryData.capital ? countryData.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${countryData.region}</p>
            <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
            <p><strong>Area:</strong> ${countryData.area.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> ${Object.values(countryData.languages).join(', ')}</p>
            <p><strong>Currency:</strong> ${Object.values(countryData.currencies)[0].name} (${Object.values(countryData.currencies)[0].symbol})</p>
        `;

        // Append the card to the result container
        resultContainer.appendChild(card);
    }
});
function viewOnMap(countryName) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(countryName)}`;
    window.open(url, '_blank');
}

// Example of adding event listener to the button (if using vanilla JavaScript)
document.querySelectorAll('.view-map-button').forEach(button => {
    button.addEventListener('click', function() {
        const countryName = this.closest('.country-card').querySelector('h4').textContent;
        viewOnMap(countryName);
    });
});