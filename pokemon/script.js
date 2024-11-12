document.getElementById('catch').addEventListener('click', function() {
    // Mostra la schermata di animazione con la GIF
    document.getElementById('catchingScreen').style.display = 'block';

    // Nascondi il contenuto originale dopo aver cliccato su "CATCH!"
    document.getElementById('info').style.display = 'none';

    // Dopo 1.5 secondi, mostra la schermata dei pulsanti
    setTimeout(function() {
        // Nascondi la schermata di animazione
        document.getElementById('catchingScreen').style.display = 'none';

        // Mostra la schermata con i pulsanti
        document.getElementById('actionScreen').style.display = 'block';
    }, 1500); // 1500ms = 1.5 secondi
});

// Aggiungi l'evento per il pulsante "Continua a catturare"
document.getElementById('continue').addEventListener('click', function() {
    // Torna alla pagina index.html
    window.location.href = 'index.html'; // Cambia il percorso della pagina
});

// Aggiungi l'evento per il pulsante "Vai a My Pokemon"
document.getElementById('mypokemon').addEventListener('click', function() {
    // Vai alla pagina My Pokemon
    window.location.href = 'mypokemon.html';
});
