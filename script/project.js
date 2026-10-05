// 1. Data als array van objecten
const projecten = [
    {
        id: "project1",
        titel: "Chassis",
        foto: "../images/project1.png",
        alt: "Screenshot van de Chassis-website waarop een AI-agent computeronderdelen voorstelt op basis van budget",
        beschrijving: "Bij dit project moesten wij onze eigen ai-agent maken. De ai-agent moest een website maken die computeronderdelen voorstelt op basis van budget."
    },
    {
        id: "project2",
        titel: "Leafbid",
        foto: "../images/project2.png",
        alt: "Voorbeeldafbeelding van de Leafbid-website, een veilingsite voor planten",
        beschrijving: "Bij dit project moesten we een planten auction website maken. Helaas heb ik voor dit project het eind product niet meer."
    }
];

const projectenContainer = document.getElementById("projecten");
const sorteerSelect = document.getElementById("sorteer");

// 2. Eén project renderen als DOM-element
const maakProjectElement = (project) => {
    const doos = document.createElement("section");
    doos.classList.add("projectdoos");
    doos.dataset.id = project.id;

    const titel = document.createElement("h1");
    titel.textContent = project.titel;

    const foto = document.createElement("img");
    foto.src = project.foto;
    foto.alt = project.alt;

    const beschrijving = document.createElement("p");
    beschrijving.textContent = project.beschrijving;

    doos.append(titel, foto, beschrijving);
    return doos;
};

// 3. Lijst renderen
const renderProjecten = (lijst) => {
    projectenContainer.innerHTML = "";
    lijst.forEach((project) => {
        projectenContainer.appendChild(maakProjectElement(project));
    });
};

// 4. Sorteren: geeft een NIEUWE, gesorteerde array terug (muteert 'lijst' niet)
const sorteerProjecten = (lijst, sorteerOptie) => {
    const gesorteerd = [...lijst]; // kopie, zodat we de originele array niet aanpassen

    switch (sorteerOptie) {
        case "titel-az":
            gesorteerd.sort((a, b) => a.titel.localeCompare(b.titel));
            break;
        case "titel-za":
            gesorteerd.sort((a, b) => b.titel.localeCompare(a.titel));
            break;
        default:
            // "default": geen sortering, originele volgorde
            break;
    }

    return gesorteerd;
};

// 5. Bijgehouden state: huidig filter en huidige sortering
let huidigFilter = "all";
let huidigeSortering = "default";

// 6. Combineert filter + sortering en rendert het resultaat
const update = () => {
    const gefilterd = huidigFilter === "all"
        ? projecten
        : projecten.filter((project) => project.id === huidigFilter);

    const gesorteerd = sorteerProjecten(gefilterd, huidigeSortering);
    renderProjecten(gesorteerd);
};

// 7. Filterknoppen
const knoppen = document.querySelectorAll(".btn");
knoppen.forEach((knop) => {
    knop.addEventListener("click", () => {
        knoppen.forEach((k) => k.classList.remove("active"));
        knop.classList.add("active");
        huidigFilter = knop.dataset.filter;
        update();
    });
});

// 8. Sorteer-dropdown
sorteerSelect.addEventListener("change", () => {
    huidigeSortering = sorteerSelect.value;
    update();
});

// 9. Eerste render bij het laden van de pagina
update();