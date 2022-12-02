const reader = new FileReader()

const fileInput = document.getElementById('file-input')
const startButton = document.getElementById('start-button')
const inputList = document.getElementById('input-list')
const groupedList = document.getElementById('grouped-list')
const sortedList = document.getElementById('sorted-list')
const solution = document.getElementById('solution')

let file = 'Select a file with the HTML element!'

startButton.addEventListener('click', () => {
  file = fileInput.files[0]
  reader.readAsText(file)
})

reader.addEventListener('load', () => {
  data = reader.result
  mappedData = data.split('\n')
  let elfCals = []
  let elfCalsIndex = 0
  for (let i = 0; i < mappedData.length; i++) {
    let cals = parseInt(mappedData[i])
    const inputListItem = document.createElement('li')
    inputListItem.textContent = cals
    inputList.appendChild(inputListItem)
    if (isNaN(cals)) {
      const groupedItem = document.createElement('li')
      groupedItem.textContent = elfCals[elfCalsIndex]
      groupedList.appendChild(groupedItem)
      elfCalsIndex += 1
    } else {
      elfCals[elfCalsIndex] === undefined
        ? elfCals.push(cals)
        : (elfCals[elfCalsIndex] = elfCals[elfCalsIndex] + cals)
    }
  }
  const sortedElfCals = elfCals.sort((a, b) => b - a)

  sortedElfCals.forEach(listItem => {
    const sortedItem = document.createElement('li')
    sortedItem.textContent = listItem
    sortedList.appendChild(sortedItem)
  })
  solution.textContent = sortedElfCals[0]
})
