// RECUPERA INPUT
const generaGriglia = document.getElementById("genera-griglia");
const grigliaGioco = document.getElementById("gioco");
const difficolta = document.getElementById("difficolta");

// CLICK SUL PULSANTE PER GENERARE LA GRIGLIA
generaGriglia.addEventListener("click", function() {
  // RESET GRIGLIA
  grigliaGioco.innerHTML = "";

  // CALCOLO DIMENSIONI GRIGLIA IN BASE ALLA DIFFICOLTA`
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

  // GENERA GRIGLIA

  // GENERA RIGA
  for (let i = 1; i <= numeroRighe; i++) {
    const riga = document.createElement("div");
    riga.style.display = "flex";

    // GENERA CELLE
    for (let j = 1; j <= numeroRighe; j++) {
      const cella = document.createElement("div");
      cella.style.width = "40px";
      cella.style.height = "40px";
      cella.style.border = "1px solid black";
      cella.style.textAlign = "center";
      cella.style.lineHeight = "40px";
      cella.innerHTML = (i - 1) * numeroRighe + j;
      // NASCONDI CELLA IN BASE ALLA DIFFICOLTA
      if (cella.innerHTML > numeroCaselle) {
        cella.style.visibility = "hidden";
        // AL CLICK COLORA CELLA
      } else {
        cella.addEventListener("click", function() {
          cella.style.backgroundColor = "lightblue";
          console.log(cella.innerHTML);
        });
      }
      // AGGIUNGI CELLA
      riga.appendChild(cella);
    }
    // AGGIUNGI RIGA 
    grigliaGioco.appendChild(riga);
  }
});