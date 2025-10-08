const perguntas = [
  { texto: "Você sente ansiedade com frequência?", tipo: "ansiedade" },
  { texto: "Você tem dificuldade para dormir por causa de preocupações?", tipo: "ansiedade" },
  { texto: "Você se sente triste ou sem esperança com frequência?", tipo: "depressao" },
  { texto: "Você perdeu interesse em atividades que antes gostava?", tipo: "depressao" },
  { texto: "Você tem dificuldade em manter a atenção por muito tempo?", tipo: "tdah" },
  { texto: "Você costuma esquecer compromissos ou tarefas importantes?", tipo: "tdah" },
  { texto: "Você sente dificuldade em organizar suas atividades diárias?", tipo: "tdah" }
];

let indicePergunta = 0;
let pontuacao = { ansiedade: 0, depressao: 0, tdah: 0 };

const chatbox = document.getElementById("chatbox");
const botoesResposta = document.getElementById("botoesResposta");
const resultadoDiv = document.getElementById("resultado");

function mostrarPergunta() {
  if (indicePergunta < perguntas.length) {
    const msg = document.createElement("div");
    msg.className = "bot-message";
    msg.innerText = perguntas[indicePergunta].texto;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
  } else {
    mostrarResultado();
  }
}

function responder(resp) {
  if (resp === "sim") pontuacao[perguntas[indicePergunta].tipo]++;

  const msgUser = document.createElement("div");
  msgUser.className = "user-message";
  msgUser.innerText = resp.toUpperCase();
  chatbox.appendChild(msgUser);
  chatbox.scrollTop = chatbox.scrollHeight;

  indicePergunta++;
  mostrarPergunta();
}

function mostrarResultado() {
  botoesResposta.style.display = "none";
  resultadoDiv.style.display = "block";

  const totalAns = Math.round((pontuacao.ansiedade / 2) * 100);
  const totalDep = Math.round((pontuacao.depressao / 2) * 100);
  const totalTDAH = Math.round((pontuacao.tdah / 3) * 100);

  document.getElementById("resultado-ansiedade").innerText = totalAns + "%";
  document.getElementById("resultado-depressao").innerText = totalDep + "%";
  document.getElementById("resultado-tdah").innerText = totalTDAH + "%";

  document.getElementById("barra-ansiedade").style.width = totalAns + "%";
  document.getElementById("barra-depressao").style.width = totalDep + "%";
  document.getElementById("barra-tdah").style.width = totalTDAH + "%";

  const containerBotoes = document.createElement("div");
  containerBotoes.className = "botoes-final";

  const btnReiniciar = document.createElement("button");
  btnReiniciar.className = "btn-azul";
  btnReiniciar.innerText = "Reiniciar Teste";
  btnReiniciar.onclick = reiniciarTeste;

  const btnInicio = document.createElement("button");
  btnInicio.className = "btn-laranja";
  btnInicio.innerText = "Voltar ao Início";
  btnInicio.onclick = () => window.location.href = "index.html";

  const btnCatalogo = document.createElement("button");
  btnCatalogo.className = "btn-catalogo";
  btnCatalogo.innerText = "Catálogo de Psicólogos";
  btnCatalogo.onclick = () => window.location.href = "catalogo.html";

  containerBotoes.appendChild(btnReiniciar);
  containerBotoes.appendChild(btnInicio);
  containerBotoes.appendChild(btnCatalogo);

  resultadoDiv.appendChild(containerBotoes);
}

function reiniciarTeste() {
  indicePergunta = 0;
  pontuacao = { ansiedade: 0, depressao: 0, tdah: 0 };
  chatbox.innerHTML = "";
  resultadoDiv.innerHTML = `
    <h3>Resultado Final:</h3>
    <p>Ansiedade: <span id="resultado-ansiedade">0%</span></p>
    <div class="barra"><div id="barra-ansiedade" class="progresso"></div></div>
    <p>Depressão: <span id="resultado-depressao">0%</span></p>
    <div class="barra"><div id="barra-depressao" class="progresso"></div></div>
    <p>TDAH: <span id="resultado-tdah">0%</span></p>
    <div class="barra"><div id="barra-tdah" class="progresso"></div></div>
  `;
  resultadoDiv.style.display = "none";
  botoesResposta.style.display = "flex";
  mostrarPergunta();
}

mostrarPergunta();
