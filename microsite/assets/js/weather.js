async function getWeather() {
    let location = document.getElementById("locationInput").value.trim();
    let errorMessage = document.getElementById("errorMessage");

    if (!location) {
        errorMessage.style.display = "block";
        return;
    } else {
        errorMessage.style.display = "none";
    }

    // Step 1: Get Coordinates
    let geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&format=json`;
    
    try {
        let geoResponse = await fetch(geoUrl);
        let geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            alert("Location not found. Try another.");
            return;
        }

        let place = geoData.results[0];
        let lat = place.latitude;
        let lon = place.longitude;

        document.getElementById("locationName").innerText = place.name;
        document.getElementById("locationRegion").innerText = place.admin1 || "N/A";
        document.getElementById("locationCountry").innerText = place.country;
        document.getElementById("latitude").innerText = lat;
        document.getElementById("longitude").innerText = lon;

        // Step 2: Get Weather Data
        let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&temperature_unit=fahrenheit&timezone=auto`;
        
        let weatherResponse = await fetch(weatherUrl);
        let weatherData = await weatherResponse.json();

        let dates = weatherData.daily.time;
        let values = weatherData.daily.temperature_2m_max;

        // Convert to readable dates
        let formattedDates = dates.map(dateStr => {
            let date = new Date(dateStr);
            return date.toLocaleDateString();
        });

        // Update Table
        let forecastTable = document.getElementById("forecastTable");
        forecastTable.innerHTML = "";
        for (let i = 0; i < formattedDates.length; i++) {
            let row = `<tr><td>${formattedDates[i]}</td><td>${values[i]}°F</td></tr>`;
            forecastTable.innerHTML += row;
        }

        // Update Chart
        let ctx = document.getElementById("chartjs-0").getContext("2d");
        if (window.myChart) window.myChart.destroy(); // Remove old chart before creating new one

        window.myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: formattedDates,
                datasets: [{
                    label: "Temperature (°F)",
                    data: values,
                    borderColor: "#ffcc00",
                    backgroundColor: "rgba(255, 204, 0, 0.2)",
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Default location: Bungie HQ (Bellevue, WA)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("locationInput").value = "Bellevue";
    getWeather();
});
