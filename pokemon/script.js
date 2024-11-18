// Funzione per cercare un Pokémon
async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Non è stato possibile recuperare il Pokémon");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const pokemon = {
            name: data.name,
            sprite: pokemonSprite,
            details: data
        };

        displayPokemon(pokemon);
    } catch (error) {
        console.error(error);
        alert("Errore nel recupero dei dati. Assicurati che il nome sia corretto.");
    }
}

// Funzione per visualizzare il Pokémon
function displayPokemon(pokemon) {
    const pokemonListContainer = document.getElementById('pokemonList');

    // Crea la card del Pokémon
    const card = document.createElement('div');
    card.classList.add('card', 'bg-base-100', 'shadow-xl', 'w-64', 'm-4', 'hover:scale-105', 'transition-transform', 'duration-300');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = pokemon.sprite;
    img.alt = pokemon.name;
    img.classList.add('w-32', 'h-32', 'mx-auto', 'rounded-lg');
    img.onclick = () => showPokemonDetails(pokemon); // Mostra i dettagli quando clicchi sull'immagine
    figure.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center');

    const title = document.createElement('h2');
    title.classList.add('card-title', 'text-xl', 'font-bold');
    title.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'w-full');
    button.textContent = "Catch!";
    button.onclick = () => catchPokemon(pokemon);

    const cardActions = document.createElement('div');
    cardActions.classList.add('card-actions', 'justify-center', 'mt-2');
    cardActions.appendChild(button);

    cardBody.appendChild(title);
    cardBody.appendChild(cardActions);
    card.appendChild(figure);
    card.appendChild(cardBody);

    pokemonListContainer.appendChild(card);
}

// Funzione per catturare un Pokémon e aggiungerlo alla collezione
function catchPokemon(pokemon) {
    let myPokemon = JSON.parse(localStorage.getItem('myPokemon')) || [];

    // Aggiungi il Pokémon alla lista
    if (!myPokemon.find(p => p.name === pokemon.name)) {
        myPokemon.push(pokemon);
        localStorage.setItem('myPokemon', JSON.stringify(myPokemon));
    }

    alert(`${pokemon.name} è stato aggiunto alla tua collezione!`);
}

// Funzione per mostrare i dettagli del Pokémon
function showPokemonDetails(pokemon) {
    // Mostra i dettagli del Pokémon
    alert(`Nome: ${pokemon.name}\nTipo: ${pokemon.details.types.map(type => type.type.name).join(', ')}\nAbilità: ${pokemon.details.abilities.map(ability => ability.ability.name).join(', ')}`);
}

// Funzione per caricare i primi 150 Pokémon e mostrarli
document.addEventListener("DOMContentLoaded", async function() {
    try {
        // Recupera i primi 150 Pokémon dalla API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);

        if (!response.ok) {
            throw new Error("Non è stato possibile recuperare la lista dei Pokémon");
        }

        const data = await response.json();
        const pokemonList = data.results;

        // Itera sui Pokémon e crea una card per ciascuno
        for (let pokemon of pokemonList) {
            const pokemonData = await fetch(pokemon.url);
            const pokemonDetails = await pokemonData.json();
            const pokemonSprite = pokemonDetails.sprites.front_default;
            const pokemonObj = {
                name: pokemon.name,
                sprite: pokemonSprite,
                details: pokemonDetails
            };
            displayPokemon(pokemonObj);
        }
    } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
    }
});

// Funzione per mostrare la collezione di Pokémon nella pagina MyPokemon
document.addEventListener("DOMContentLoaded", function() {
    const myPokemonListContainer = document.getElementById('myPokemonList');
    let myPokemon = JSON.parse(localStorage.getItem('myPokemon')) || [];

    // Mostra la collezione di Pokémon
    myPokemon.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('card', 'bg-base-100', 'shadow-xl', 'w-64', 'm-4', 'hover:scale-105', 'transition-transform', 'duration-300');

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = pokemon.sprite;
        img.alt = pokemon.name;
        img.classList.add('w-32', 'h-32', 'mx-auto', 'rounded-lg');
        figure.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'text-center');

        const title = document.createElement('h2');
        title.classList.add('card-title', 'text-xl', 'font-bold');
        title.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-secondary', 'w-full');
        button.textContent = "Release";
        button.onclick = () => releasePokemon(pokemon);

        const cardActions = document.createElement('div');
        cardActions.classList.add('card-actions', 'justify-center', 'mt-2');
        cardActions.appendChild(button);

        cardBody.appendChild(title);
        cardBody.appendChild(cardActions);
        card.appendChild(figure);
        card.appendChild(cardBody);

        myPokemonListContainer.appendChild(card);
    });
});

// Funzione per rilasciare un Pokémon dalla collezione
function releasePokemon(pokemon) {
    let myPokemon = JSON.parse(localStorage.getItem('myPokemon')) || [];
    
    // Rimuovi il Pokémon dalla lista
    myPokemon = myPokemon.filter(p => p.name !== pokemon.name);
    localStorage.setItem('myPokemon', JSON.stringify(myPokemon));

    alert(`${pokemon.name} è stato rilasciato!`);

    // Ricarica la pagina per aggiornare la lista
    location.reload();
}
