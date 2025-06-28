const formBuilder = document.getElementById("form")
const botaoAdd = document.getElementById("btnAdd")
const botaoGerar = document.getElementById("btnGerar")
const quizSection = document.getElementById("quiz")
const divQuiz = document.getElementById("questoes")
const btnEnviar = document.getElementById("btnEnviar")
const divResultado = document.getElementById("resultado")
let idQuestao = 1;
const questoes = []
const respostasUsuario = []

function adicionarFormulario() {

  const formDiv = document.createElement("div")
  formDiv.className = "bloco-questao"
  formDiv.dataset.id = idQuestao

  formDiv.innerHTML = `<p><strong>${idQuestao} - Título da questão</strong></p>
  <input type="text" id="tituloId${idQuestao}" style="width:90%" />
  <div id="questoesId${idQuestao}">${criaOpcaoHTML(idQuestao, 1, "a")}${criaOpcaoHTML(idQuestao, 2, "b")}</div>
  <button class="add-opcao">+ alternativa</button>
  <button class="salvar-questao">Salvar questão</button>
  <hr />`

  formBuilder.appendChild(formDiv)
  idQuestao++
}

function criaOpcaoHTML(questaoId, numQuestao, letra) {

  return `
    <div class="opcao">
      <input type="radio" name="resposta${questaoId}" />
      <span>${letra})</span>
      <input type="text" id="opcaoId${questaoId}_${numQuestao}" style="width:40%" />
    </div>
  `}

formBuilder.addEventListener("click", (e) => {

  const alvo = e.target;
  const bloco = alvo.closest(".bloco-questao");
  if (!bloco){
    return
  }
  const id = bloco.dataset.id;
  const divOpcoes = bloco.querySelector(`#questoesId${id}`)

  if (alvo.classList.contains("add-opcao")) {

    const quantOpcoes = divOpcoes.children.length;
    if (quantOpcoes >= 5){
      alert("Máximo de cinco alternativas!")
      return;
    }
    const letra = String.fromCharCode(97 + quantOpcoes)
    divOpcoes.insertAdjacentHTML("beforeend", criaOpcaoHTML(id, quantOpcoes + 1, letra)
    );
  }

  if (alvo.classList.contains("salvar-questao")) {

    if (salvarQuestao(id, bloco)) {
      bloco.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
      alvo.textContent = "Salvo!";
    }
  }
});

function salvarQuestao(id, opcao) {

  const titulo = opcao.querySelector(`#tituloId${id}`).value.trim();
  const opcaoDivs = Array.from(opcao.querySelectorAll(".opcao"));

  if (!titulo){
    alert("Digite o título!"), false;
    return 
  }
  const opcoes = [];
  let resposta = "";
  opcaoDivs.forEach((div, i) => {

    const texto = div.querySelector('input[type="text"]').value.trim();
    if (!texto) {
      return;
    }
    const letra = String.fromCharCode(97 + i);
    opcoes.push(`${letra}) ${texto}`);

    const radio = div.querySelector('input[type="radio"]');
    if (radio.checked){
      resposta = letra;
    }

  });

  if (opcoes.length < 2) {
    alert("Pelo menos duas alternativas!"), false;
    return
  }

  if (!resposta){
    alert("Marque a alternativa correta!"), false;
    return
  }

  questoes.push({ questao: titulo, opcoes, resposta });
  return true;
}

botaoAdd.addEventListener("click", adicionarFormulario);

botaoGerar.addEventListener("click", () => {

  if (questoes.length < 5){
    alert("Adicione e salve pelo menos 5 questões primeiro!");
    return;
  }
  document.getElementById("builder").style.display = "none";
  quizSection.style.display = "block";

  renderQuiz();
});

function renderQuiz() {

  divQuiz.innerHTML = "";
  respostasUsuario.length = 0;

  questoes.forEach((q, i) => {

    const questaoDiv = document.createElement("div");
    questaoDiv.className = "questao";
    const h3 = document.createElement("h3");
    h3.textContent = `${i + 1}. ${q.questao}`;
    questaoDiv.appendChild(h3);
    q.opcoes.forEach((texto) => {

      const letra = texto.split(")")[0];
      const label = document.createElement("label");
      label.style.display = "block";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `questao-${i}`;
      input.value = letra;
      input.addEventListener("change", () => (respostasUsuario[i] = letra));
      label.appendChild(input);
      label.append(` ${texto}`);
      questaoDiv.appendChild(label);
    });

    divQuiz.appendChild(questaoDiv);
  });
}

btnEnviar.addEventListener("click", () => {

  if (respostasUsuario.length !== questoes.length || respostasUsuario.includes(undefined)) {

    divResultado.textContent = "Por favor, responda todas as questões!";
    divResultado.className = "erro";
    return;
  }

  const acertos = respostasUsuario.reduce((total, resp, i) => total + (resp === questoes[i].resposta),0);

  const percentual = (acertos / questoes.length) * 100;
  divResultado.textContent = `Você acertou ${acertos} de ${questoes.length} questões (${percentual.toFixed(2)}%)`;
  divResultado.className = percentual >= 70 ? "acerto" : "erro";
});