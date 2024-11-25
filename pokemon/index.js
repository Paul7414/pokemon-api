let currentPage = 1;
const pokemonsPerPage = 20;
let allPokemons = [];
let totalPages = 1;
let currentPokemon = null; // per memorizzare il Pokémon ricercato

// Funzione per caricare la galleria di Pokémon (senza ricerca)
async function loadPokemonGallery() {
    const pokemonGalleryContainer = document.getElementById('pokemonGalleryContainer');
    const paginationContainer = document.getElementById('paginationContainer');

    // Recupera i Pokémon dalla PokeAPI (puoi aumentare il limite per caricare più Pokémon)
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100'); // Carica 100 Pokémon per esempio
        const data = await response.json();
        allPokemons = data.results;
        totalPages = Math.ceil(allPokemons.length / pokemonsPerPage);

        // Carica la pagina iniziale
        loadPage(currentPage);

        // Aggiungi i radio buttons per la paginazione
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const label = document.createElement('label');
            label.classList.add('radio', 'mr-2');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'pagination';
            input.classList.add('radio');
            input.value = i;
            input.checked = i === currentPage;

            input.addEventListener('change', () => {
                if (input.checked) {
                    currentPage = i;
                    loadPage(currentPage);
                }
            });

            label.appendChild(input);
            label.appendChild(document.createTextNode(i));
            paginationContainer.appendChild(label);
        }

    } catch (error) {
        console.error("Errore nel recupero dei Pokémon: ", error);
    }
}

// Funzione per caricare la pagina corrente della galleria
function loadPage(page) {
    const pokemonGalleryContainer = document.getElementById('pokemonGalleryContainer');

    // Calcola l'indice dei Pokémon da mostrare per la pagina corrente
    const startIndex = (page - 1) * pokemonsPerPage;
    const endIndex = Math.min(startIndex + pokemonsPerPage, allPokemons.length);
    const currentPokemons = allPokemons.slice(startIndex, endIndex);

    // Pulisce il contenitore della galleria prima di aggiungere i nuovi Pokémon
    pokemonGalleryContainer.innerHTML = '';

    // Crea una card per ogni Pokémon della pagina corrente
    currentPokemons.forEach(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url);
        const pokemonDetails = await pokemonData.json();

        const card = document.createElement('div');
        card.classList.add('card', 'bg-base-100', 'shadow-xl', 'w-full', 'h-80', 'transition-transform', 'transform', 'hover:scale-105');

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = pokemonDetails.sprites.front_default;
        img.alt = pokemonDetails.name;
        img.classList.add('h-48', 'object-contain', 'mx-auto');
        figure.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'space-y-2');

        const title = document.createElement('h2');
        title.classList.add('card-title', 'text-center');
        title.textContent = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);

        const catchButton = document.createElement('button');
        catchButton.classList.add('btn', 'btn-primary', 'w-full');
        catchButton.textContent = 'Catch';
        catchButton.onclick = () => catchPokemon({
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            image: pokemonDetails.sprites.front_default
        });

        cardBody.appendChild(title);
        cardBody.appendChild(catchButton);
        card.appendChild(figure);
        card.appendChild(cardBody);

        pokemonGalleryContainer.appendChild(card);
    });
}

// Funzione per catturare un Pokémon e aggiungerlo alla collezione
function catchPokemon(pokemon) {
    let myPokemon = JSON.parse(localStorage.getItem('myPokemon')) || [];

    // Controlla se il Pokémon è già nella collezione
    if (!myPokemon.find(p => p.id === pokemon.id)) {
        myPokemon.push({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image
        });

        localStorage.setItem('myPokemon', JSON.stringify(myPokemon));
        alert(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} è stato aggiunto alla tua collezione!`);
    } else {
        alert(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} è già nella tua collezione!`);
    }
}

// Funzione per cercare un Pokémon
async function searchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase().trim();
    const pokemonDetailsContainer = document.getElementById('pokemonDetailsContainer');
    const searchButton = document.getElementById('searchButton');

    // Nascondi la galleria e mostra i dettagli del Pokémon ricercato
    document.getElementById('pokemonGalleryContainer').classList.add('hidden');
    pokemonDetailsContainer.classList.remove('hidden');

    try {
        if (!pokemonName) {
            alert('Per favore, inserisci il nome del Pokémon');
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();

        document.getElementById('pokemonImage').src = data.sprites.front_default;
        document.getElementById('pokemonNameDetail').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.getElementById('pokemonTypes').textContent = data.types.map(type => type.type.name).join(', ');
        document.getElementById('pokemonAbilities').textContent = data.abilities.map(ability => ability.ability.name).join(', ');
        document.getElementById('pokemonHeight').textContent = `${data.height / 10} m`;
        document.getElementById('pokemonWeight').textContent = `${data.weight / 10} kg`;

        // Visualizza il pulsante per catturare il Pokémon
        document.getElementById('catchButton').onclick = () => catchPokemon({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default
        });

    } catch (error) {
        console.error("Errore nel recupero dei dettagli del Pokémon: ", error);
        alert('Errore nel recupero dei dettagli. Verifica il nome del Pokémon.');
    }
}

// Aggiungi evento al pulsante di ricerca
document.getElementById('searchButton').addEventListener('click', searchPokemon);

// Carica la galleria all'avvio
loadPokemonGallery();
