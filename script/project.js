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

// 3. Lijst renderen (met optioneel filter)
const renderProjecten = (lijst) => {
    projectenContainer.innerHTML = ""; // leegmaken voor herrender
    lijst.forEach((project) => {
        projectenContainer.appendChild(maakProjectElement(project));
    });
};

// 4. Filteren
const filterSelection = (filter) => {
    const gefilterd = filter === "all"
        ? projecten
        : projecten.filter((project) => project.id === filter);
    renderProjecten(gefilterd);
};

// 5. Knoppen koppelen met event listeners
const knoppen = document.querySelectorAll(".btn");
knoppen.forEach((knop) => {
    knop.addEventListener("click", () => {
        knoppen.forEach((k) => k.classList.remove("active"));
        knop.classList.add("active");
        filterSelection(knop.dataset.filter);
    });
});

// 6. Eerste render bij het laden van de pagina
renderProjecten(projecten);