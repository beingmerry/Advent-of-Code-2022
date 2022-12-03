const reader = new FileReader()

// move all these globals to a globals.js file, clean up so that this is ONLY solution related
// potentially split into multiple files, solution.js, global.js, visual.js
const fileInput = document.getElementById('file-input')
const startButton = document.getElementById('start-button')
const inputList = document.getElementById('input-list')
const groupedList = document.getElementById('grouped-list')
const sortedList = document.getElementById('sorted-list')
const solution = document.getElementById('solution')
const processing = document.getElementById('processing')
const coll = document.getElementsByClassName('collapsible')

// <-------------------------------------------------------------------------------->
// 📂 Get the file!
let file = 'Select a file with the HTML element!'
startButton.addEventListener('click', () => {
  processing.textContent = '⌛ Processing...'
  file = fileInput.files[0]
  reader.readAsText(file)
})
// <-------------------------------------------------------------------------------->
reader.addEventListener('load', () => {
  data = reader.result
  mappedData = data.split('\n')
  let totalFirstStarScore = 0
  let totalSecondStarScore = 0
  for (let i = 0; i < mappedData.length - 1; i++) {
    const currentLine = mappedData[i]
    const inputListItem = document.createElement('li')
    const [firstLetter, secondLetter] = currentLine.split(' ')
    inputListItem.textContent = `${firstLetter} ${secondLetter}`
    inputList.appendChild(inputListItem)
    const results = gameLoop(firstLetter, secondLetter)
    totalFirstStarScore += results.gameStarOne
    totalSecondStarScore += results.gameStarTwo
  }
  const solutionFirstStar = totalFirstStarScore
  const solutionSecondStar = totalSecondStarScore
  solution.textContent = `⭐ Answer 1 = ${solutionFirstStar} | ✨ Answer 2 = ${solutionSecondStar}`
  processing.textContent = '✅ Done! (does not guarantee a correct solution)'
})
// <-------------------------------------------------------------------------------->
// ⭐ Star 1
const gameLoop = (firstLetter, secondLetter) => {
  const letterToAction = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
  }
  // X means need to lose
  // Y means need to draw
  // Z means need to win
  const opponentAction = letterToAction[firstLetter]
  const playerAction = letterToAction[secondLetter]
  // 🎯still want to pass back the values and the names for showcasing the data
  const playerStateTable = {
    rock: 1, // Rock 1
    paper: 2, // Paper 2
    scissors: 3 // Scissors 3
  }

  // <-------------------------------------------------------------------------------->
  //Track wins vs ties vs losses, set score, AND set textContent for GroupedList
  const gameStateTable = {
    rock: {
      rock: 3,
      paper: 0,
      scissors: 6
    },
    paper: {
      rock: 6,
      paper: 3,
      scissors: 0
    },
    scissors: {
      rock: 0,
      paper: 6,
      scissors: 3
    }
  }
  // <-------------------------------------------------------------------------------->
  // ✨ Star 2  // Reversed points from desired to find LOSING states for player
  const letterToPointsReverse = {
    X: 6,
    Y: 3,
    Z: 0
  }
  const letterToPointsOriginal = {
    X: 0,
    Y: 3,
    Z: 6
  }
  const playerScoreNeeded = letterToPointsReverse[secondLetter]
  const opponentReversedTable = gameStateTable[opponentAction]
  const starTwoPlayerAction = Object.keys(opponentReversedTable).find(
    key => opponentReversedTable[key] === playerScoreNeeded
  )
  // ✨ Star Two Calcs
  const starTwoActionScore = playerStateTable[starTwoPlayerAction]
  const gameStarTwo = starTwoActionScore + letterToPointsOriginal[secondLetter]

  // ⭐ Star One Calcs
  const starOneActionScore = playerStateTable[playerAction]
  const starOneGameScore = gameStateTable[playerAction][opponentAction]
  const gameStarOne = starOneActionScore + starOneGameScore

  const opponentVerb =
    starOneGameScore === 0
      ? 'beats'
      : starOneGameScore === 3
      ? 'tied'
      : 'loses to'
  const groupedItem = document.createElement('li')
  groupedItem.textContent = `opponent ${opponentAction} ${opponentVerb} ${playerAction} | 🎅 ${starOneGameScore} game points and ${starOneActionScore} action points for you!`
  groupedList.appendChild(groupedItem)
  const sortedItem = document.createElement('li')
  sortedItem.textContent = `goal is ${letterToPointsOriginal[secondLetter]} points target, you play ${starTwoPlayerAction} and they play ${opponentAction}`
  sortedList.appendChild(sortedItem)
  const results = {
    gameStarOne: gameStarOne,
    gameStarTwo: gameStarTwo
  }
  return results
}
// <-------------------------------------------------------------------------------->
// 💄 Visual functions
// 1️⃣ Adds toggle to the results data for expanding and collapsing
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', () => {
    coll[i].classList.toggle('active')
    const content = coll[i].nextElementSibling
    if (content.style.display === 'block') {
      content.style.display = 'none'
    } else {
      content.style.display = 'block'
    }
  })
}
// <-------------------------------------------------------------------------------->
