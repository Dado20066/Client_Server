 type="text/javascript">
  "use strict";


  let ws = new WebSocket("ws://10.1.0.52:7070/serverchat/chat24");


  ws.onmessage = function(messaggioRicevuto) {
    document.getElementById("ricezione").textContent += messaggioRicevuto.data + "\n";
  };


  function inviaLogin() {
    let username = document.getElementById("utente").value;
    let password = document.getElementById("password").value;

      let messaggioLogin = "L;" + username + ";" + password + ";" + "L;" + ";2024-10-27T18:02:00";
      ws.send(messaggioLogin);

      document.getElementById("loginSection").classList.add("hidden").classList.remove("hidden");;
      document.getElementById("chatSection")
    }
    
  function inviaMessaggio() {
    let mittente = document.getElementById("mittente").value;
    let messaggio = document.getElementById("testo").value;
    let messaggioDaInviare = "M;N;" + mittente + ";iT-IT;" + messaggio + ";2024-10-27T18:02:00;";
    ws.send(messaggioDaInviare);
  }


  function chiudiLaConnessione() {
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  }
