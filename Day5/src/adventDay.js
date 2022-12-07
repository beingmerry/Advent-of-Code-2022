const title = document.querySelector('title');
const headerText = document.querySelector('#page-header-text');
const titleText = "Day 4 - Camp Cleanup"
title.textContent = titleText;
headerText.textContent = titleText;
// <-------------------------------------------------------------------------------->
const reader = new FileReader()
// <-------------------------------------------------------------------------------->
// 📂 Get the file!
const startButton = document.getElementById('start-button')
const fileInput   = document.getElementById('file-input')
const processing  = document.getElementById('processing')
// <----------------------------->
let file = 'Select a file with the HTML element!'
startButton.addEventListener('click', () => {
  processing.textContent = '⌛ Processing...'
  file = fileInput.files[0]
  reader.readAsText(file)
})
// <-------------------------------------------------------------------------------->
// 📝 On file load do this...
const inputData   = document.getElementById('list-input-data')
const starOneList = document.getElementById('list-star-one')
const starTwoList = document.getElementById('list-star-two')
const solution    = document.getElementById('solution')
reader.addEventListener('load', () => {
  data = reader.result
  mappedData = data.split('\n')
  let starOneTotal = 0
  let starTwoTotal = 0
  let currentSet = []
  for (let i = 0; i < mappedData.length; i++) {
    const currentLine = mappedData[i]
    const inputDataElement = document.createElement('li')
    inputDataElement.textContent = `${currentLine}`
    inputData.appendChild(inputDataElement)
    const starOne = calculateStarOne(currentLine)
    starOneTotal += starOne
    const starOneElement = document.createElement('li')
    starOneElement.textContent = `${starOneTotal}`
    starOneList.appendChild(starOneElement)
    // <------✨ Star 2 related logic ------>
    currentSet.push(currentLine)  
    if (currentSet.length === 3) {
      const starTwo = calculateStarTwo(currentSet)
      starTwoTotal += starTwo
      const starTwoElement = document.createElement('li')
      starTwoElement.textContent = `${starTwoTotal}`
      starTwoList.appendChild(starTwoElement)
      currentSet = []
    }
  }
  // 🎯🟢 Solutions go here!!!
  solution.textContent = `⭐ Answer 1 = ${starOneTotal} ( •_•)>⌐■-■\` ✨ Answer 2 = ${starTwoTotal}`
  processing.textContent = '✅ Done! (does not guarante a correct solution)'
})
// <-------------------------------------------------------------------------------->
// ⭐ Star 1
const calculateStarOne = currentLine => {
  // 🔒 A given rucksack always has the same number of items in each of its two compartments
  const firstHalf = currentLine.substring(0, currentLine.length / 2)
  const secondHalf = currentLine.substring(currentLine.length / 2)
  const frontLetters = [...firstHalf]
  const backLetters = [...secondHalf]
  let firstHalfLetters = {}
  for (let i = 0; i < firstHalf.length; i++) {
    const frontLetter = frontLetters[i]
    firstHalfLetters = {
      ...firstHalfLetters,
      [frontLetter]: true
    }
  }
  let letter = ''
  for (let i = 0; i < secondHalf.length; i++) {
    const backLetter = backLetters[i]
    if (firstHalfLetters[backLetter]) {
      letter = backLetter
    }
  }
  const asciiCode = letter.charCodeAt(0)
  const letterScore = asciiCode > 96 ? asciiCode - 96 : asciiCode - 38
  return letterScore
}
// <-------------------------------------------------------------------------------->
// ✨ Star 2
const calculateStarTwo = currentSet => {
  // 🔒 A given rucksack always has the same number of items in each of its two compartments
  let huntOne = [...currentSet[0]].filter(letter => [...currentSet[1]].includes(letter))
  let huntTwo = huntOne.filter(letter => [...currentSet[2]].includes(letter) )
  const asciiCode = huntTwo[0].charCodeAt(0)
  const letterScore = asciiCode > 96 ? asciiCode - 96 : asciiCode - 38
  return letterScore
}
// <-------------------------------------------------------------------------------->
// 💄 Visual functions
// 1️⃣ Adds toggle to the results data for expanding and collapsing
const coll = document.getElementsByClassName('collapsible')
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
