document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game');
  const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
  let flippedCards = [];
  let matchedPairs = 0;

  // Embaralhar as cartas
  const shuffledCards = shuffle(cards);

  // Criar as cartas no HTML
  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.addEventListener('click', flipCard);
    gameContainer.appendChild(cardElement);
  });

  // Função para embaralhar as cartas
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Função para virar a carta
  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
      this.classList.add('flipped');
      this.textContent = this.dataset.value;
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
    }
  }

  // Função para verificar se as cartas são iguais
  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedPairs++;
      if (matchedPairs === cards.length / 2) {
        setTimeout(() => alert('Parabéns! Você venceu!'), 500);
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
    }
    flippedCards = [];
  }
});
