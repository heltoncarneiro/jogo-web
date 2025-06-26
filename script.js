let palavrasBanco = [
    { palavra: "casa", dica: "Lugar onde mora" },
    { palavra: "carro", dica: "meio de transporte" },
    { palavra: "bicicleta", dica: "meio de transporte" },
    { palavra: "moto", dica: "meio de transporte" },
    { palavra: "lapis", dica: "serve para escrever no papel" }
  ];
  
  let palavraSecreta = "";
  let dicaAtual = "";
  let letrasReveladas = [];
  let vidas = 5;
  let modo = 1;
  
  function iniciarJogo(qtdJogadores) {
    modo = qtdJogadores;
    document.getElementById("menu").classList.add("escondido");
  
    if (modo === 2) {
      document.getElementById("entrada-palavra").classList.remove("escondido");
    } else {
      let sorteio = palavrasBanco[Math.floor(Math.random() * palavrasBanco.length)];
      palavraSecreta = sorteio.palavra.toUpperCase();
      dicaAtual = sorteio.dica;
      iniciarTelaJogo();
    }
  }
  
  function comecarJogoComPalavra() {
    const palavraInput = document.getElementById("palavra").value.trim();
    const dicaInput = document.getElementById("dica").value.trim();
    
    if (!palavraInput) {
      alert("Por favor, digite uma palavra!");
      return;
    }
    
    if (!dicaInput) {
      alert("Por favor, digite uma dica!");
      return;
    }
    
    palavraSecreta = palavraInput.toUpperCase();
    dicaAtual = dicaInput;
    document.getElementById("entrada-palavra").classList.add("escondido");
    iniciarTelaJogo();
  }
  
  function iniciarTelaJogo() {
    vidas = 5;
    document.getElementById("jogo").classList.remove("escondido");
    document.getElementById("vidas").innerText = `Pétalas restantes: ${vidas}`;
    document.getElementById("dica-jogo").innerText = `Dica: ${dicaAtual}`;
    document.getElementById("flor").src = "5.png";
    letrasReveladas = Array(palavraSecreta.length).fill("_");
    atualizarPalavra();
    criarTeclado();
  }
  
  function atualizarPalavra() {
    document.getElementById("palavra-secreta").innerText = letrasReveladas.join(" ");
  }
  
  function criarTeclado() {
    const teclado = document.getElementById("teclado");
    teclado.innerHTML = "";
    
    const letras = [];
    for (let i = 65; i <= 90; i++) {
      letras.push(String.fromCharCode(i));
    }
    
    const linhas = [
      letras.slice(0, 9),
      letras.slice(9, 18),
      letras.slice(18)
    ];
    
    linhas.forEach(linha => {
      const linhaDiv = document.createElement("div");
      linhaDiv.className = "linha-teclado";
      
      linha.forEach(letra => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.className = "tecla";
        btn.onclick = () => tentarLetra(letra);
        linhaDiv.appendChild(btn);
      });
      
      teclado.appendChild(linhaDiv);
    });
  }
  
  function tentarLetra(letra) {
    let acertou = false;
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra) {
        letrasReveladas[i] = letra;
        acertou = true;
      }
    }
  
    if (!acertou) {
      vidas--;
      atualizarFlor();
    }
  
    atualizarPalavra();
    document.querySelectorAll(`#teclado button`).forEach(btn => {
      if (btn.textContent === letra) btn.disabled = true;
    });
  
    verificarFimJogo();
  }
  
  function verificarFimJogo() {
    if (letrasReveladas.join("") === palavraSecreta) {
      setTimeout(() => {
        alert(`Parabéns! Você acertou a palavra: ${palavraSecreta}`);
        reiniciar();
      }, 300);
    } else if (vidas <= 0) { 
      setTimeout(() => {
        alert(`Você perdeu! A palavra era: ${palavraSecreta}`);
        reiniciar();
      }, 300);
    }
  }
  
  function atualizarFlor() {
    document.getElementById("vidas").innerText = `Pétalas restantes: ${vidas}`;
    document.getElementById("flor").src = `${vidas}.png`;
    document.getElementById("flor").style.transform = "scale(1.1)";
    setTimeout(() => {
      document.getElementById("flor").style.transform = "scale(1)";
    }, 200);
  }
  
  function reiniciar() {
    location.reload();
  }