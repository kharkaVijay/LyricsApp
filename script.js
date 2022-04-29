const form = document.getElementById('form');

const searchLyrics = document.getElementById("search");
const result = document.getElementById("result");

const apiUrl = 'https://api.lyrics.ovh';

form.addEventListener('submit', (e) => {
     e.preventDefault();
    searchValue = searchLyrics.value.trim();
    if(!searchValue){
        alert("Please search song or artist name")
    }else{
        startSearch(searchValue);
    }
     
})

//Serach function
async function startSearch(searchValue){
    const response = await fetch(`${apiUrl}/suggest/${searchValue}`);

    const data = await response.json();
    console.log(data);
    displayData(data);
}

//Function to display Search result
function displayData(data){
    result.innerHTML = `
       <ul class = "songs">
       ${data.data
        .map(song => `<li>
        <div>
            <strong>${song.artist.name}</strong> -${song.title} 
        </div>
        <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
    </li>`)
    .join('')}
       </ul>
    `;
}

result.addEventListener('click', e => {
    const clickedElement = e.target;

    if(clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const sontTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist,sontTitle)
    }
});

async function getLyrics(artist,songTitle){
    const response = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);

    const data = await response.json();
    console.log(data)
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
}


function changeBg(){
    const images = [
        'url("./images/mysic.jpg")',
        'url("./images/violin.jpg")',
        'url("./images/monkey.jpg")',
        'url("./images/seen.jpg")',
        'url("./images/seen1.jpg")', 
    ]


    const body = document.querySelector('body');
    const bg = images[Math.floor(Math.random() * images.length)];
    body.style.backgroundImage = bg;
}

setInterval(changeBg,2000)