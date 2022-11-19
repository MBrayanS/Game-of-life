<style>

  h2 {
    text-align: center;
    font-size: 60px;
  }

  div {
    font-size: 20px;
  }

  li {
    font-size: 15px
  }

  .introduction, .description {
    padding: 0 50px;
  }

  .introduction{
    display: flex;
  }

  .div-gif {
    width: 500px;
  }


</style>

<div class='content'>
  <h2>Game of life<h2>
  <hr>

  <div class='introduction'>
    <div align='left'>
      <p> O 'jogo da vida' foi um experimento criado em 1970 pelo matemático Jonh Conway.</p>
      <p> E neste projeto eu recriei esse experimento, utilizando: </p>
      <br>
      <img aling='center' widht='40' height='40' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"/>
      <img aling='center' widht='40' height='40' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"/>
      <img aling='center' widht='40' height='40' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/>
    </div>
    <div class='div-gif' align='center'>
      <img src='Game-of-life.gif'>
    </div>
  </div>

  <hr>

  <div align='left' class='description'>
    <p> O objetivo do experimento é simular o comportamento de celulas em grupo. Usando como base um tabuleiro bi-dimensional que segue algumas regras para funcionar:</p>
    <br>
    <ul>
      <li>Qualquer célula viva com menos de dois vizinhos vivos morre de solidão.</li>
      <li>Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação.</li>
      <li>Qualquer célula com exatamente três vizinhos vivos se torna uma célula viva.</li>
      <li>Qualquer célula com dois vizinhos vivos continua no mesmo estado para a próxima geração.</li>
    </ul>

  </div>

</div>