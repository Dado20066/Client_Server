"use strict";

//let ws = new WebSocket("ws://10.1.0.52:7070/serverchat/chat24");
 let ws = new WebSocket("ws://localhost:8080/serverchat/chat24");

// Gestione dei messaggi ricevuti
ws.onmessage = function (messaggioRicevuto) {
  let testoArrivato = messaggioRicevuto.data;

  // Controlla il prefisso del messaggio
  if (testoArrivato.startsWith("M;")) {
    // Se il messaggio inizia con "M;", è un messaggio normale
    let messaggio = testoArrivato.slice(2).trim(); // Rimuove "M;" e gli spazi
    document.getElementById("ricezione").textContent += messaggio + "\n";
  } else if (testoArrivato.startsWith("S;")) {
    // Se il messaggio inizia con "S;", è una lista di utenti
    let listaUtenti = testoArrivato.slice(2).trim(); // Rimuove "S;" e gli spazi
    let utentiArray = listaUtenti.split(','); // Dividi la lista utenti per virgole
    document.getElementById("messages-table").textContent = utentiArray.join('\n'); // Mostra uno per riga
  } else {
    console.log("Messaggio non riconosciuto: ", testoArrivato);
  }
};

// Funzione per inviare il login
function inviaLogin() {
  let username = document.getElementById("utente").value.trim();
  let password = document.getElementById("password").value.trim();
  let dataCorrente = new Date();
  if (username && password) {
    let messaggioLogin = `L;${username};${password};L;;dataCorrente;`;
    ws.send(messaggioLogin);

    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("chatSection").classList.add("visibile");
  } else {
    alert("Inserisci username e password.");
  }
}

// Funzione per inviare un messaggio
function inviaMessaggio() {
  let messaggio = document.getElementById("testo").value.trim();
  let dataCorrente = new Date();

  if (messaggio) {
    if (ws.readyState === WebSocket.OPEN) {
      let messaggioDaInviare = `M;N;utente;iT-IT;${messaggio};${dataCorrente};`;
      ws.send(messaggioDaInviare);
    } else {
      alert("Connessione WebSocket non aperta.");
    }
  } else {
    alert("Il messaggio non può essere vuoto.");
  }
}

// Funzione per chiudere la connessione
function chiudiLaConnessione() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.close();
    alert("Connessione chiusa.");
  } else {
    alert("Connessione già chiusa.");
  }
}
