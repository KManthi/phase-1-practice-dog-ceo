let breeds = [];

document.addEventListener('DOMContentLoaded', () => {
    loadImgs();
    loadBreeds();
})

const imgURL = "https://dog.ceo/api/breeds";

function loadImgs() {
    fetch(`${imgURL}/image/random/4`)
    .then(response => response.json())
    .then(photo => {
        photo.message.forEach(image => addImage(image))           
        });
    
}

function addImage(dogImgURL) {
    const container = document.getElementById('dog-image-container');
    const newImg = document.createElement('img');
    newImg.src = dogImgURL;
    container.appendChild(newImg);

}

function loadBreeds() {
    fetch(`${imgURL}/list/all`)
    .then(response => response.json())
    .then(res => {
         breeds = Object.keys(res.message);
         updateBreeds(breeds);
         addBreedSelectLIstener();
    })
}

function updateBreeds(breeds) {
    const ul = document.getElementById('dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    if(child) {
        element.removeChild(child);
        removeChildren(element);
    }
}

function filterBreedsByLetter(letter) {
    updateBreeds(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectLIstener() {
    const breedMenu = document.getElementById('breed-dropdown');
    breedMenu.addEventListener('change', (e) => {
        filterBreedsByLetter(e.target.value);
    });
}

function addBreed(breed) {
    const ul = document.getElementById('dog-breeds');
    const li = document.createElement('li')
    li.textContent = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColour);
}

function updateColour(e) {
    e.target.style.color = 'purple';
}

