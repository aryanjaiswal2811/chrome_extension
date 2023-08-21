async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=58f0435b-4431-4d50-bc11-9a8b00ec012c&offset=0");
        const data = await response.json();

        if (data.status !== "success") {
            console.error("API request failed");
            return [];
        }

        const matchesList = data.data;
        
        if (!matchesList) {
            console.warn("No match data found");
            return [];
        }

        const relevantData = matchesList.map(match => `${match.name}, ${match.status}`);

        console.log({ relevantData });

        const matchesElement = document.getElementById("matches");
        if (matchesElement) {
            matchesElement.innerHTML = relevantData.map(match => `<li>${match}</li>`).join('');
        }

        return relevantData;
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
}

getMatchData();
