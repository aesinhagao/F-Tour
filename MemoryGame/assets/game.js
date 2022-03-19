const selectors = {
  boardContainer: document.querySelector('.board-container'),
  board: document.querySelector('.board'),
  moves: document.querySelector('.moves'),
  timer: document.querySelector('.timer'),
  start: document.querySelector('button'),
  win: document.querySelector('.win'),
}

const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
}

const shuffle = array => {
  const clonedArray = [...array]

  for (let index = clonedArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))

    const original = clonedArray[index]
    clonedArray[index] = clonedArray[randomIndex]
    clonedArray[randomIndex] = original
  }

  return clonedArray
}

const pickRandom = (array, items) => {
  const clonedArray = [...array]
  const randomPicks = []

  for (let index = 0; index < items; index++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length)

    randomPicks.push(clonedArray[randomIndex])
    clonedArray.splice(randomIndex, 1)
  }

  return randomPicks
}

const generateGame = () => {
  const dimensions = selectors.board.getAttribute('data-dimension')

  if (dimensions % 2 !== 0) {
    throw new Error('The dimension of the board must be an even number.')
  }

  const emojis = [
    {
      name: 't-shirt',
      img: '<img src="https://img.icons8.com/doodle/48/000000/t-shirt--v1.png"/>'
    },
    {
      name: 'lotus',
      img: '<img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-lotus-diwali-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"/>'
    },
    {
      name: 'goose',
      img: '<img src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/000000/external-goose-birds-icongeek26-flat-icongeek26.png"/>',
    },
    {
      name: 'frog',
      img: '<img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-frog-animal-flaticons-lineal-color-flat-icons.png"/>',
    },
    {
      name: 'mango',
      img: '<img src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-mango-fruit-tulpahn-outline-color-tulpahn.png"/>',
    },
    {
      name: 'money',
      img: '<img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-money-casino-flaticons-lineal-color-flat-icons-8.png"/>',
    },
    {
      name: 'uniform',
      img: '<img src="https://img.icons8.com/emoji/48/000000/martial-arts-uniform-emoji.png"/>',
    },
    {
      name: 'woman',
      img: '<img src="https://img.icons8.com/emoji/60/000000/woman-lifting-weights.png"/>',
    }
  ]
  const picks = pickRandom(emojis, (dimensions * dimensions) / 2)
  const items = shuffle([...picks, ...picks])

  const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card" data-name="${item.name}">
                    <div class="card-front"></div>
                    <div class="card-back">${item.img}</div>
                </div>
            `).join('')}
       </div>
    `

  const parser = new DOMParser().parseFromString(cards, 'text/html')

  selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
  state.gameStarted = true
  selectors.start.classList.add('disabled')

  state.loop = setInterval(() => {
    state.totalTime++

    selectors.moves.innerText = `${state.totalFlips} moves`
    selectors.timer.innerText = `time: ${state.totalTime} sec`
  }, 1000)

  console.log(document.getElementsByClassName('card-back')[0].innerText)
}

const flipBackCards = () => {
  document.querySelectorAll('.card:not(.matched)').forEach(card => {
    card.classList.remove('flipped')
  })

  state.flippedCards = 0
}

const flipCard = card => {
  state.flippedCards++
  state.totalFlips++

  if (!state.gameStarted) {
    startGame()
  }

  if (state.flippedCards <= 2) {
    card.classList.add('flipped')
  }

  if (state.flippedCards === 2) {
    const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

    console.log(flippedCards[0], flippedCards[1].getAttribute('data-name'))

    if (flippedCards[0].getAttribute('data-name') === flippedCards[1].getAttribute('data-name')) {
      flippedCards[0].classList.add('matched')
      flippedCards[1].classList.add('matched')
    }

    setTimeout(() => {
      flipBackCards()
    }, 1000)
  }

  // If there are no more cards that we can flip, we won the game
  if (!document.querySelectorAll('.card:not(.flipped)').length) {
    setTimeout(() => {
      selectors.boardContainer.classList.add('flipped')
      selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `

      clearInterval(state.loop)
    }, 1000)
  }
}

const attachEventListeners = () => {
  document.addEventListener('click', event => {
    const eventTarget = event.target
    const eventParent = eventTarget.parentElement

    if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
      flipCard(eventParent)
    } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
      startGame()
    }
  })
}

generateGame()
attachEventListeners()