
// i could have refactored the event listener to be made out of diferent functions then everything inside the event listener, but its both a bit confusing to do plus its a pretty small code base, is it abselutly neccesary to refsactor like that.

document.getElementById('get-color-scheme-btn').addEventListener('click', (e) => {  
    let seedColorEl = document.getElementById('seed-color').value
    let seedColor = seedColorEl.replace('#', '')

    // this one took a while xD
    // gets selectedModeList(the select element thatb holds the options) then gets the value of the selected option. i tried many methods so it was pretty confusing but it ended upp as the simplest one.
    const selectedModeList = document.getElementById("selected-mode-list")
    const value = selectedModeList.value
    
    // added {method: "GET"} even though its not neccesary, just for clarity. good idea?
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${value.toLowerCase()}`, 
        {method: "GET"})
        .then(res => res.json())
        .then(data => {
            const colorsArray = []
            let index = 0
            // pushes color values to colorsArray 
            data.colors.forEach(() => {
                colorsArray.push(data.colors[index].hex.value)
                index ++
            })
            
            let colorsArrayHTML = ''
            index = 0
            colorsArray.forEach(() => {
                colorsArrayHTML += `
                    <div
                        class="color-container" 
                        style="background-color:${colorsArray[index]}">
                        <p 
                            class="hex-color-style" 
                            id="hex-value" 
                            onclick="copyToClipboard('${colorsArray[index]}')">${colorsArray[index]}
                        </p>
                    </div>
                `
                index ++
            })
            
            document.getElementById('colors-container').innerHTML = colorsArrayHTML
            
        })
})

// copies the text when its clicked
// tried for a long time to figure out how to gget it to copy automatically but kept running into problems and the
function copyToClipboard(text) {
    window.prompt("To copy to clipboard, Press Ctrl+C, Enter", text)
}

// another test for the copy to clipboard function, still dosnt work, dont know why

// function copyToClipboard() {
//     // Get the text field
//     const hexValue = document.getElementById("hex-value")

//     // Select the text field
//     // hexValue.select()

//     // Copy the text inside the text field
//     navigator.clipboard.writeText(hexValue.value)

//     // Alert the copied text
//     alert("Copied the text: " + hexValue.value)
// }



