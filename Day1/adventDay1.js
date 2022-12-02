const reader = new FileReader()
const fileElement = document.getElementById('fileInput')
const file = fileElement.files[0]
reader.readAsText(file)
let data = []
reader.addEventListener('load', () => {
    data = reader.result
    mappedData = data.split("\n")
    console.log(mappedData)
    
})