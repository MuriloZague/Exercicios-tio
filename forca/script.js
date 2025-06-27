const divPalavra = document.getElementById("palavra");
let tentativas = [];
let tentativaErradas = [];
let tentativaCorretas = [];
const tentativaLista = document.getElementById("tentativa");
const adivinharBtn = document.getElementById("adivinharBtn");

const forcaAscii = [
` +---+
 |   |
     |
     |
     |
     |
=======`,
` +---+
 |   |
 O   |
     |
     |
     |
=======`,
` +---+
 |   |
 O   |
 |   |
     |
     |
=======`,
` +---+
 |   |
 O   |
/|   |
     |
     |
=======`,
` +---+
 |   |
 O   |
/|\\  |
     |
     |
=======`,
` +---+
 |   |
 O   |
/|\\  |
/    |
     |
=======`,
` +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=======`];

const forca = document.getElementById('forca')

let palavras = ["banana", "abacaxi", "melancia", "laranja", "Abacate", "Manga", "Acerola", "Amora", "Babaco", "Bacaba", "bacuri", "ameixa"]
let frutaAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
let palavraUpp = frutaAleatoria.toUpperCase();
let qntPalavras = palavraUpp.split("");

divPalavra.innerHTML = "";

const renderizarPalavra = () => {
    for (let i = 0; i < qntPalavras.length; i++) {
        const letra = document.createElement("input");
        letra.setAttribute("maxlength", "1");
        letra.setAttribute("disabled", "disabled");
        letra.setAttribute("id", i);
        letra.classList.add("palavra");
        divPalavra.appendChild(letra);
    }
}

renderizarPalavra()

const perdeuOJogo = () => {
    const tentativaForm = document.getElementById("tentativaForm")
    forca.innerHTML = `${forcaAscii[6]}<span>VOCÊ PERDEU!<br>A PALAVRA ERA: ${palavraUpp} <button style="font-size: 2rem; padding: 1rem"><a href="index.html" style="text-decoration: none; color: black">RECOMEÇAR</a>?</button></span>`
    adivinharBtn.setAttribute("disabled", "disabled");
    tentativaForm.setAttribute("disabled", "disabled")
}

const ganhouOJogo = () => {
    const tentativaForm = document.getElementById("tentativaForm")
    forca.innerHTML = `<span>VOCÊ GANHOU! <button style="font-size: 2rem; padding: 1rem"><a href="index.html" style="text-decoration: none; color: black">RECOMEÇAR</a>?</button></span>`
    adivinharBtn.setAttribute("disabled", "disabled");
    tentativaForm.setAttribute("disabled", "disabled")
}

const advinhar = () => {
    const tentativaForm = document.getElementById("tentativaForm").value;
    if (tentativaForm.length > 0) {
        let acertou = false;

        const letra = tentativaForm.toUpperCase();
        if (tentativas.includes(letra)) {
            alert("Você já tentou essa letra!");
            document.getElementById("tentativaForm").value = "";
            return;
        }
        for (let i = 0; i < qntPalavras.length; i++) {
            if (qntPalavras[i] === letra) {
                document.getElementById(i).value = letra;
                acertou = true;
                tentativaCorretas.push(letra)
                if (qntPalavras.length == tentativaCorretas.length) {
                    ganhouOJogo()
                }
            }
        }
        tentativas.push(letra);
        tentativaLista.innerHTML = `${tentativas.join(", ")}`;
        if (!acertou) {
            tentativaErradas.push(letra)
            if (tentativaErradas.length <= 5) {
                forca.innerHTML = `${forcaAscii[tentativaErradas.length]}`
            }
            else {
                perdeuOJogo()
            }
        }
        document.getElementById("tentativaForm").value = "";
    }
    else {
        alert('Digite alguma letra!')
    }
};