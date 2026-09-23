const weerContainer = document.getElementById("weer-inhoud");

const toonLaadStatus = () => {
    weerContainer.textContent = "";
    const laadTekst = document.createElement("p");
    laadTekst.textContent = "Weergegevens worden geladen...";
    weerContainer.appendChild(laadTekst);
};

const toonFoutStatus = () => {
    weerContainer.textContent = "";
    const foutTekst = document.createElement("p");
    foutTekst.textContent = "Kon het weerbericht niet ophalen. Probeer het later opnieuw.";
    foutTekst.classList.add("error-message");
    weerContainer.appendChild(foutTekst);
};

const toonWeer = (data) => {
    weerContainer.textContent = "";

    const temperatuur = document.createElement("p");
    temperatuur.textContent = `Temperatuur: ${data.current.temperature_2m}°C`;

    const wind = document.createElement("p");
    wind.textContent = `Windsnelheid: ${data.current.wind_speed_10m} km/u`;

    weerContainer.append(temperatuur, wind);
};

const haalWeerOp = async (lat, lon) => {
    toonLaadStatus();
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Netwerkfout");
        }

        const data = await response.json();
        toonWeer(data);
    } catch (fout) {
        console.error(fout);
        toonFoutStatus();
    }
};

const startMetLocatie = () => {
    if (!navigator.geolocation) {
        // fallback: vaste locatie (bv. Amsterdam)
        haalWeerOp(52.37, 4.90);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (positie) => {
            haalWeerOp(positie.coords.latitude, positie.coords.longitude);
        },
        () => {
            // gebruiker weigert locatie: fallback
            haalWeerOp(52.37, 4.90);
        }
    );
};

startMetLocatie();