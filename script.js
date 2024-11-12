async function fetchData(){

    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        document.getElementById("nome").innerHTML = pokemonName;
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    catch(error){
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    try {
        // Richiede i primi 150 Pokémon dalla API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
        
        if (!response.ok) {
            throw new Error("Could not fetch Pokémon list");
        }
        
        const data = await response.json();
        const pokemonList = data.results;

        // Seleziona il contenitore dove inseriremo le card
        const container = document.body; // Usa un div specifico se preferisci

        // Itera sui Pokémon e crea una card per ognuno
        for (let pokemon of pokemonList) {
            const pokemonData = await fetch(pokemon.url);
            const pokemonDetails = await pokemonData.json();
            
            // Crea la struttura HTML per la card
            const card = document.createElement("div");
            card.className = "card card-side bg-base-100 shadow-xl w-1/3 m-8";

            const figure = document.createElement("figure");
            const img = document.createElement("img");

            // Imposta la sorgente dell'immagine e aggiungi classi per dimensione
            img.src = pokemonDetails.sprites.front_default; // Immagine del Pokémon
            img.alt = pokemon.name;
            img.className = "w-30 h-30"; // Classi Tailwind per ingrandire (ad esempio 96x96 pixel)
            figure.appendChild(img);

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h2");
            title.className = "card-title";
            title.textContent = pokemon.name;

            const description = document.createElement("p");
            description.textContent = "Click the button to watch on Jetflix app.";

            const cardActions = document.createElement("div");
            cardActions.className = "card-actions justify-end";
            const button = document.createElement("button");
            button.className = "btn btn-primary";
            button.textContent = "Catch!";
            cardActions.appendChild(button);

            // Assembla gli elementi
            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(cardActions);
            card.appendChild(figure);
            card.appendChild(cardBody);

            // Aggiungi la card al contenitore
            container.appendChild(card);
        }
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
});