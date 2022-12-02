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

const instructions = document.getElementsByClassName('instructions')

let file = 'Select a file with the HTML element!'

const scoreRockPaperScissors = (firstLetter, secondLetter) => {
  debugger
  let score = 0;
  let gameStateOpponent = "";
  let gameStateYou = "";
  switch(secondLetter) {
      case 'X':  // Rock = 1 (for X)
        score += 1
        gameStateYou = "Rock"
        break
      case 'Y':  // Paper = 2 (for Y)
        score += 2
        gameStateYou = "Paper"
        break
      case 'Z': // Paper = 3 (for Y)
        score += 3
        gameStateYou = "Scissors"
        break
    }
    const resultsObj = {
      score: score, 
      gameStateOpponent: gameStateOpponent, 
      gameStateYou: gameStateYou
    }
    return resultsObj
}

startButton.addEventListener('click', () => {
  processing.textContent = '⌛ Processing...'
  file = fileInput.files[0]
  reader.readAsText(file)
})

reader.addEventListener('load', () => {
  data = reader.result
  mappedData = data.split('\n')
  // let elfCals = []
  // let elfCalsIndex = 0 let count
  let count = 0
  for (let i = 0; i < mappedData.length; i++) {
    const currentLine = mappedData[i]
    const inputListItem = document.createElement('li')
    const [firstLetter, secondLetter] = currentLine.split(' ')
    
    inputListItem.textContent = `${firstLetter} ${secondLetter}`
    inputList.appendChild(inputListItem)
    // 🎯 Need to re write this loop to sort # of A, B, C... and X, Y, Z
    const resultsObj = scoreRockPaperScissors(firstLetter, secondLetter)

    
    // if (isNaN(cals)) {
    //   const groupedItem = document.createElement('li')
    //   groupedItem.textContent = elfCals[elfCalsIndex]
    //   groupedList.appendChild(groupedItem)
    // } else {
    //   elfCals[elfCalsIndex] === undefined
    //     ? elfCals.push(cals)
    //     : (elfCals[elfCalsIndex] = elfCals[elfCalsIndex] + cals)
    // }
  }
  // 🎯 Need to re write for Rock Paper Scissors solution 1
  // const sortedElfCals = elfCals.sort((a, b) => b - a)

  // sortedElfCals.forEach(listItem => {
  //   const sortedItem = document.createElement('li')
  //   sortedItem.textContent = listItem
  //   sortedList.appendChild(sortedItem)
  // })
  // const solutionSecondStar =
  //   sortedElfCals[0] + sortedElfCals[1] + sortedElfCals[2]
  // solution.textContent = `⭐ Answer 1 = ${sortedElfCals[0]} | ✨ Answer 2 = ${solutionSecondStar}`
  // processing.textContent = '✅ Done! (does not guarantee a correct solution)'
})

// 🏗️ Visual only functions below
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
