// 1. Data als array van objecten
const projecten = [
    {
        id: "project1",
        titel: "Chassis",
        foto: "../images/project1.png",
        beschrijving: "Bij dit project moesten wij onze eigen ai-agent maken. Wij hadden er voor gekozen om een ai te maken die computer onderdelen voor je uit kiest op basis van je budget en eisen die je geeft."
    },
    {
        id: "project2",
        titel: "Leafbid",
        foto: "../images/project2.png",
        beschrijving: "Bij dit project moesten we een planten auction website maken. De foto die hier staat is niet het eindproduct, want helaas kan ik daar niet meer bij."
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
    foto.alt = project.titel;

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