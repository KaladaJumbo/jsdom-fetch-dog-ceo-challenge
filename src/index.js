console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let breedData = {}
document.addEventListener("DOMContentLoaded", (event) =>{
    fetching(imgUrl)
    fetching(breedUrl)
    dropdown()
})

function fetching(api){
    fetch(api)
        .then(res => res.json())
        .then(data => parser(data))
}

function parser(data){
    if (data.message[0]){
        data.message.forEach(sing_data => appendage(sing_data))
    }
    else{
        breedData = data.message
        breedAppendage(breedData)
    }

}

function appendage(data){
    container = document.getElementById("dog-image-container")
    image = document.createElement("img")
    image.src = data
    container.appendChild(image)
}

function breedAppendage(data){
    let container = document.getElementById("dog-breeds")
    for (const breed in data) {
        let li = document.createElement("li")
        li.innerText = breed
        li.addEventListener("click", () => {
            console.log(li.innerText)
            changeColor(li, "red")
        })
        if(data[breed] != []){
            let ul = document.createElement("ul")
            li.appendChild(ul)
            data[breed].forEach(sub => {
                let subli = document.createElement("li"); 
                subli.innerText = sub;
                ul.appendChild(subli);
            });
        }
        
        container.appendChild(li)
    }
}

function changeColor(appendage, color) {
    console.log(appendage)
    if (appendage.style.color == color){
        appendage.style.color = ""
    }
    else{
        appendage.style.color = color
    }
}

function dropdown(){
    let drop = document.getElementById("breed-dropdown");
    drop.addEventListener("change", (event) =>{
        filter(event,drop.value)
    })
}

function filter(event, value) {
    let ul = document.getElementById("dog-breeds")
    ul.innerHTML = ""
    console.log(breedData)
    let data = {...breedData}
    for (const key in data) {
        if(key[0] != value){
            delete data[key]
        }

    }
    breedAppendage(data)
}




