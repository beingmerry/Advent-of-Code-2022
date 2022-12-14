// 🌎 Globals to change for each challenge
const title = document.querySelector('title')
const headerText = document.querySelector('#page-header-text')
const titleText = 'Day 4 - Camp Cleanup'
title.textContent = titleText
headerText.textContent = titleText
// <-------------------------------------------------------------------------------->
const reader = new FileReader()
// <-------------------------------------------------------------------------------->
// 📂 Get the file!
const startButton = document.getElementById('start-button')
const fileInput = document.getElementById('file-input')
const processing = document.getElementById('processing')
// <----------------------------->
let file = 'Select a file with the HTML element!'
startButton.addEventListener('click', () => {
  processing.textContent = '⌛ Processing...'
  file = fileInput.files[0]
  reader.readAsText(file)
})
// <-------------------------------------------------------------------------------->
// 📝 On file load do this...
const inputData = document.getElementById('list-input-data')
const starOneList = document.getElementById('list-star-one')
const starTwoList = document.getElementById('list-star-two')
const solution = document.getElementById('solution')
reader.addEventListener('load', () => {
  data = reader.result
  mappedData = data.split('\n')
  let starOneTotal = 0
  let starTwoTotal = 0
  for (let i = 0; i < mappedData.length; i++) {
    // <------📥 Input ------>
    const currentLine = mappedData[i]
    addInputDataElement(currentLine)
    // <------⭐ Star 1 ------>
    starOneTotal += calculateStarOne(currentLine)
    addStarOneElement(`${starOneTotal} for ${currentLine}`)
    // <------✨ Star 2 ------>
    starTwoTotal += calculateStarTwo(currentLine)
    addStarTwoElement(`${starTwoTotal} for ${currentLine}`)
  }
  // 🎯🟢 Solutions go here!!!
  solution.textContent = `⭐ Answer 1 = ${starOneTotal} ( •_•)>⌐■-■\` ✨ Answer 2 = ${starTwoTotal}`
  processing.textContent = '✅ Done! (does not guarante a correct solution)'
})
// <-------------------------------------------------------------------------------->
// ⭐ Star 1
const calculateStarOne = currentLine => {
  // 🔒 A given rucksack always has the same number of items in each of its two compartments
  const firstElf = currentLine.replace('\r', '').split(',')[0].split('-')
  const secondElf = currentLine.replace('\r', '').split(',')[1].split('-')
  firstElfLow = parseInt(firstElf[0])
  firstElfHigh = parseInt(firstElf[1])
  secondElfLow = parseInt(secondElf[0])
  secondElfHigh = parseInt(secondElf[1])
  // firstElf low number is lower than secondElf low number AND
  // firstElf high number is higher than secondElf high number MEANING
  // firstElf contains all elements of secondElf
  const firstElfIncludesSecond =
    firstElfLow <= secondElfLow && firstElfHigh >= secondElfHigh
  const secondElfIncludesFirst =
    firstElfLow >= secondElfLow && firstElfHigh <= secondElfHigh
  return firstElfIncludesSecond || secondElfIncludesFirst ? 1 : 0
}
// <-------------------------------------------------------------------------------->
// ✨ Star 2
const calculateStarTwo = currentLine => {
  // 🔒 A given rucksack always has the same number of items in each of its two compartments
  const firstElf = currentLine.replace('\r', '').split(',')[0].split('-')
  const secondElf = currentLine.replace('\r', '').split(',')[1].split('-')
  firstElfLow = parseInt(firstElf[0])
  firstElfHigh = parseInt(firstElf[1])
  secondElfLow = parseInt(secondElf[0])
  secondElfHigh = parseInt(secondElf[1])
  
  // toDo ⚠️ 🏗️ NEED to check if ANY value is inside of EITHER range
  const firstElfIncludesSecond =
    firstElfHigh >= secondElfLow && firstElfHigh >= secondElfLow
  const secondElfIncludesFirst =
    secondElfLow >= firstElfLow || secondElfHigh <= firstElfHigh
  return firstElfIncludesSecond || secondElfIncludesFirst ? 1 : 0
}
// <-------------------------------------------------------------------------------->
// 💄 Visual functions
// ⭐ Visualize Star 2
const addStarTwoElement = starTwoTotal => {
  const starTwoElement = document.createElement('li')
  starTwoElement.textContent = `${starTwoTotal}`
  starTwoList.appendChild(starTwoElement)
}
// ⭐ Visualize Star 1
const addStarOneElement = starOneTotal => {
  const starOneElement = document.createElement('li')
  starOneElement.textContent = `${starOneTotal}`
  starOneList.appendChild(starOneElement)
}
// 📥 Visualize Inputs
const addInputDataElement = currentLine => {
  const inputDataElement = document.createElement('li')
  inputDataElement.textContent = `${currentLine}`
  inputData.appendChild(inputDataElement)
}
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
