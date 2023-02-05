// RECUPERA INPUT
// Recupero dell'input: vengono recuperati i riferimenti ai seguenti elementi HTML: il pulsante "genera-griglia", la griglia di gioco "gioco" e la selezione "difficoltà".
const generaGriglia = document.getElementById("genera-griglia"); // Prende l'elemento HTML con id "genera-griglia", che sarà il pulsante per generare la griglia.
const grigliaGioco = document.getElementById("gioco"); // Prende l'elemento HTML con id "gioco", che sarà la sezione dove verrà generata la griglia.
const difficolta = document.getElementById("difficolta"); // Prende l'elemento HTML con id "difficolta", che sarà la select per la selezione della difficoltà.



// CLICK SUL PULSANTE PER GENERARE LA GRIGLIA
generaGriglia.addEventListener("click", function() { // Evento "click" sul pulsante "genera-griglia": viene aggiunto un evento "click" che esegue la funzione seguente:
  
  // RESET GRIGLIA
  grigliaGioco.innerHTML = "";   // Resetta il contenuto delle cella del gioco, cioè elimina tutte le celle generate in precedenza

  // RISULTATO DELLA PARTITA
  var risultato = null;
  var punteggio = 0;

  // CALCOLO DIMENSIONI GRIGLIA IN BASE ALLA DIFFICOLTA`
  // Calcolo delle dimensioni della griglia: vengono calcolate le dimensioni della griglia in base alla difficoltà selezionata. Il numero di caselle e il numero di righe vengono assegnati in base al valore selezionato nella selezione "difficoltà".
  let numeroCaselle;
  let numeroRighe;
  if (difficolta.value === "1") {
    numeroCaselle = 100;
    numeroRighe = 10;
  } else if (difficolta.value === "2") {
    numeroCaselle = 81;
    numeroRighe = 9;
  } else if (difficolta.value === "3") {
    numeroCaselle = 49;
    numeroRighe = 7;
  }

  // GENERA BOMBE
  // Genera 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.

  let arrayBombe = [];

  for (let y = 0; y < 16; y++) {
    let numeroCasuale = Math.floor(Math.random() * (numeroCaselle) + 1);
    while (arrayBombe.includes(numeroCasuale)) {
      numeroCasuale = Math.floor(Math.random() * (numeroCaselle) + 1);
    }
    arrayBombe.push(numeroCasuale)
  }
  console.log(arrayBombe);

  // GENERA GRIGLIA
  // Generazione della griglia: viene effettuato un ciclo "for" per generare le righe della griglia. In ogni iterazione, viene generata una riga e viene eseguito un altro ciclo "for" per generare le caselle per la riga corrente.

  // GENERA RIGA
  // Crea un nuovo elemento "div" che rappresenterà una riga della griglia, e imposta lo "style.display" a "flex" per rendere le celle allineate orizzontalmente
  for (let i = 1; i <= numeroRighe; i++) {
    const riga = document.createElement("div");
    riga.style.display = "flex";
    riga.style.backgroundColor = "lightgreen";

    // GENERA CELLE
    // Generazione di una cella: vengono create un elemento "div" per rappresentare una cella e vengono impostati i seguenti stili: larghezza e altezza su 40px, bordo su 1px solid black, allineamento del testo centrato, linea orizzontale al centro su 40px. Il contenuto HTML della cella viene impostato sul numero della cella (calcolato come (i-1) * numeroRighe + j).
    for (let j = 1; j <= numeroRighe; j++) {
      const cella = document.createElement("div");
      var numeroCelleCliccate = 0;
      cella.style.width = "60px";
      cella.style.height = "60px";
      cella.style.border = "1px solid black";
      cella.style.textAlign = "center";
      cella.style.lineHeight = "60px";
      cella.innerHTML = (i - 1) * numeroRighe + j; // Numero da visualizzare in ogni cella.
      cella.id = (i - 1) * numeroRighe + j; // id della cella
      
      cella.addEventListener("click", function() { // Gestisce l'evento click su ogni cella. Quando l'utente clicca su una cella, questa viene colorata di azzurro (cella.style.backgroundColor = "lightblue";) e viene stampato il suo valore nella console (console.log(cella.innerHTML);).
        
        if (risultato == null) {

        // VERIFICA DELLA VITTORIA 
        numeroCelleCliccate += 1;
        console.log(numeroCelleCliccate);
        if (numeroCelleCliccate == (numeroCaselle - 16)) {
          risultato = true;
          alert("Hai Vinto!")
        }

        let numeroCella = parseInt(cella.innerHTML);
        console.log(numeroCella);
        console.log(arrayBombe);
        if (arrayBombe.includes(numeroCella)) {
        risultato = false;
        for (let z = 0; z < 16; z++) {
          let numeroBomba = arrayBombe[z];
          console.log(numeroBomba);
          document.getElementById(numeroBomba).style.backgroundColor = "red";

        }
       
        alert("Hai perso! Hai fatto " + punteggio + " punti")
        } else {
        cella.style.backgroundColor = "lightblue";
        punteggio += 1;
        }
        }
     
      });

      // AGGIUNGI CELLA
      riga.appendChild(cella); // Aggiunge ogni cella alla riga corrente.
    }
    // AGGIUNGI RIGA 
    grigliaGioco.appendChild(riga); //Questo codice aggiunge la riga all'elemento con id gioco (che rappresenta la griglia di gioco).
  }

})