const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const restartButton = document.getElementById("restart");

const questions = [
  {
    text: "Qual dessas palavras mais te define?",
    options: [
      { text: "Pacífico", type: "S" },
      { text: "Comunicativo", type: "I" },
      { text: "Determinado", type: "D" },
      { text: "Analítico", type: "C" },
    ],
  },
  {
    text: "Como você resolve problemas?",
    options: [
      { text: "Com foco em resultados", type: "D" },
      { text: "Conversando com outras pessoas", type: "I" },
      { text: "Mantendo a calma", type: "S" },
      { text: "Analisando os detalhes", type: "C" },
    ],
  },
  {
    text: "O que você valoriza mais?",
    options: [
      { text: "Precisão", type: "C" },
      { text: "Conquistas", type: "D" },
      { text: "Harmonia", type: "S" },
      { text: "Relacionamentos", type: "I" },
    ],
  },
  {
    text: "Como as pessoas te descrevem?",
    options: [
      { text: "Carismático", type: "I" },
      { text: "Leal", type: "S" },
      { text: "Organizado", type: "C" },
      { text: "Líder", type: "D" },
    ],
  },
  {
    text: "O que te motiva no trabalho?",
    options: [
      { text: "Estabilidade", type: "S" },
      { text: "Reconhecimento", type: "I" },
      { text: "Desafios", type: "D" },
      { text: "Excelência", type: "C" },
    ],
  },
  {
    text: "Como você prefere se comunicar?",
    options: [
      { text: "Com entusiasmo", type: "I" },
      { text: "De forma tranquila", type: "S" },
      { text: "Com clareza e detalhes", type: "C" },
      { text: "Objetivamente", type: "D" },
    ],
  },
  {
    text: "Como você reage ao estresse?",
    options: [
      { text: "Procura apoio de outros", type: "I" },
      { text: "Busca resolver logo", type: "D" },
      { text: "Tenta manter a paz", type: "S" },
      { text: "Avalia o que causou o problema", type: "C" },
    ],
  },
  {
    text: "Qual é o seu estilo de liderança?",
    options: [
      { text: "Baseado em regras", type: "C" },
      { text: "Inspirador", type: "I" },
      { text: "Autoritário", type: "D" },
      { text: "Apoiado em colaboração", type: "S" },
    ],
  },
  {
    text: "Como você toma decisões?",
    options: [
      { text: "Cautelosamente", type: "S" },
      { text: "Baseado em opiniões", type: "I" },
      { text: "Baseado em fatos", type: "C" },
      { text: "Rapidamente", type: "D" },
    ],
  },
  {
    text: "O que mais te incomoda?",
    options: [
      { text: "Falta de eficiência", type: "D" },
      { text: "Falta de conexão", type: "I" },
      { text: "Conflitos", type: "S" },
      { text: "Falta de precisão", type: "C" },
    ],
  },
  {
    text: "Como você lida com mudanças?",
    options: [
      { text: "Se adapta rapidamente", type: "D" },
      { text: "Se motiva com novidades", type: "I" },
      { text: "Prefere estabilidade", type: "S" },
      { text: "Avalia antes de agir", type: "C" },
    ],
  },
  {
    text: "O que você mais evita?",
    options: [
      { text: "Rejeição", type: "I" },
      { text: "Erros", type: "C" },
      { text: "Fracasso", type: "D" },
      { text: "Desarmonia", type: "S" },
    ],
  },
  {
    text: "Como você trabalha melhor?",
    options: [
      { text: "Com processos definidos", type: "C" },
      { text: "Com autonomia", type: "D" },
      { text: "Em ambientes tranquilos", type: "S" },
      { text: "Em equipe", type: "I" },
    ],
  },
  {
    text: "Como você lida com críticas?",
    options: [
      { text: "Depende de quem critica", type: "I" },
      { text: "Aprende com elas", type: "D" },
      { text: "Reflete sobre elas", type: "C" },
      { text: "Aceita bem críticas construtivas", type: "S" },
    ],
  },
  {
    text: "Qual dessas frases combina com você?",
    options: [
      { text: "Eu gosto de me conectar com pessoas", type: "I" },
      { text: "Eu gosto de alcançar metas", type: "D" },
      { text: "Eu gosto de fazer as coisas corretamente", type: "C" },
      { text: "Eu gosto de apoiar os outros", type: "S" },
    ],
  },
];

let currentQuestion = 0;
const scores = { D: 0, I: 0, S: 0, C: 0 };

function renderQuestion() {
  quizContainer.innerHTML = ""; // Limpa conteúdo anterior

  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const question = questions[currentQuestion];
  const questionElement = document.createElement("div");
  questionElement.classList.add("question");

  const questionText = document.createElement("h2");
  questionText.textContent = `${currentQuestion + 1}. ${question.text}`;
  quizContainer.appendChild(questionText);

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option.text;
    button.setAttribute("data-type", option.type);
    button.addEventListener("click", handleAnswer);
    questionElement.appendChild(button);
  });

  quizContainer.appendChild(questionElement);
}

function handleAnswer(event) {
  const type = event.target.getAttribute("data-type");
  scores[type]++;
  currentQuestion++;
  renderQuestion();
}

function showResult() {
  // Identificar os dois perfis com maior pontuação
  const sortedProfiles = Object.keys(scores)
    .sort((a, b) => scores[b] - scores[a]) // Ordenar perfis pela pontuação
    .slice(0, 2); // Pegar os dois primeiros perfis

  const percentsByType = Object.keys(scores).reduce((acc, type) => {
    const percent = (scores[type] / questions.length) * 100;
    acc[type] = percent;
    return acc;
  }, {});

  console.log("Pontuação por tipo de perfil:", percentsByType);

  const profileDescriptions = {
    D: {
      perfil: "Dominante",
      descricao:
        "Pessoas com este perfil são focadas em resultados, objetivas e determinadas. Tendem a ser diretas e têm facilidade para tomar decisões rapidamente, especialmente em situações de pressão. Valorizam eficiência, conquistas e controle.",
      pontosFortes:
        "Liderança, proatividade e capacidade de resolver problemas com agilidade.",
      pontosFracos:
        "Podem ser impacientes, impetuosas ou ignorar os sentimentos dos outros em prol de resultados.",
      objetivo: "Conquistar metas e superar desafios.",
    },
    I: {
      perfil: "Influente",
      descricao:
        "São comunicativos, entusiasmados e ótimos em construir conexões. Inspiram e motivam outras pessoas com sua energia e otimismo. Valorizam o reconhecimento e as relações interpessoais.",
      pontosFortes: "Criatividade, carisma e habilidade para motivar equipes.",
      pontosFracos:
        "Podem ser desorganizados, excessivamente otimistas ou ter dificuldade em lidar com detalhes e prazos.",
      objetivo: "Ser aceito, reconhecido e influenciar positivamente.",
    },
    S: {
      perfil: "Estável",
      descricao:
        "Pessoas calmas, pacientes e empáticas. Valorizam a harmonia nos ambientes em que estão e buscam estabilidade em suas relações e rotinas. São ótimos ouvintes e possuem uma abordagem prática e consistente para resolver problemas.",
      pontosFortes:
        "Confiabilidade, lealdade e habilidade de criar um ambiente de cooperação.",
      pontosFracos:
        "Podem ser resistentes a mudanças, indecisos ou evitar conflitos a qualquer custo.",
      objetivo: "Criar relações duradouras e manter um ambiente tranquilo.",
    },
    C: {
      perfil: "Conforme",
      descricao:
        "São analíticos, detalhistas e focados em qualidade. Gostam de planejar e trabalhar dentro de regras e estruturas bem definidas. Tendem a ser perfeccionistas e a evitar erros a qualquer custo.",
      pontosFortes:
        "Organização, precisão e habilidade de resolver problemas complexos com lógica.",
      pontosFracos:
        "Podem ser críticos, rígidos ou demorarem a tomar decisões devido à busca pela perfeição.",
      objetivo:
        "Seguir padrões, entregar trabalhos impecáveis e manter a ordem.",
    },
  };

  // Limpar o container e exibir os dois perfis
  quizContainer.innerHTML = "";

  let counter = 1;
  sortedProfiles.forEach((profileKey) => {
    const profile = profileDescriptions[profileKey];
    // Div
    const divContainer = document.createElement("div");
    divContainer.classList.add("card_profile");

    const title = document.createElement("h2"); // Cria um elemento H2 para o cabeçalho
    title.classList.add("header_profile"); // Adiciona a classe "header_profile"
    title.textContent = `#${counter}: ${profile.perfil} - ${percentsByType[ 
      profileKey
    ].toFixed(2)}%`; // Define o texto do cabeçalho
    divContainer.appendChild(title); // Adiciona o cabeçalho ao container

    // Descrição do perfil
    const description = document.createElement("p"); // Cria um elemento P para a descrição
    description.classList.add("paragraph"); // Adiciona a classe "paragraph"
    description.textContent = profile.descricao; // Define o texto da descrição
    divContainer.appendChild(description); // Adiciona a descrição ao container

    // Pontos fortes
    const strengths = document.createElement("p"); 
    strengths.classList.add("paragraph");
    strengths.innerHTML = `<strong>Pontos Fortes:</strong> ${profile.pontosFortes}`;
    divContainer.appendChild(strengths);

    // Pontos fracos
    const weaknesses = document.createElement("p");
    weaknesses.classList.add("paragraph");
    weaknesses.innerHTML = `<strong>Pontos Fracos:</strong> ${profile.pontosFracos}`;
    divContainer.appendChild(weaknesses);

    // Objetivo principal
    const goal = document.createElement("p");
    goal.classList.add("paragraph");
    goal.innerHTML = `<strong>Objetivo:</strong> ${profile.objetivo}`;
    divContainer.appendChild(goal);

    quizContainer.appendChild(divContainer);

    counter++;
  });

  // Botão de reiniciar
  restartButton.style.display = "block";
}

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  Object.keys(scores).forEach((key) => (scores[key] = 0));
  resultContainer.textContent = "";
  restartButton.style.display = "none";
  renderQuestion();
});

// Inicializa o quiz
renderQuestion();
