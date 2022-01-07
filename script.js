function fetchJoke(){
    const joke = document.getElementById('joke');
    joke.innerHTML = "Loading...";
    fetch('https://icanhazdadjoke.com/slack')
    .then(data => data.json())
    .then(jokeData => {
        console.log(jokeData);
        const jokeText = jokeData.attachments[0].text;
        joke.innerHTML = jokeText;
    });
}
let memeLoaded = false;
function fetchMeme(){
    constmeme = document.getElementById('memeImage');
    meme.src = "loading.gif";
    fetch('https://meme-api.herokuapp.com/gimme')
    .then(data => data.json())
    .then(memeData => {
        console.log(memeData);
        const memeUrl = memeData.url;
        meme.src = memeUrl;
    });
}

let jokeSelector = document.getElementById("jokeRadio");
let memeSelector = document.getElementById("memeRadio");
const joke = document.getElementById('joke');
const meme = document.getElementById('memeImage');
fetchJoke();

jokeSelector.onclick = function(){
    // meme.src = 'loading.gif';
    // if(jokeSelector.checked){
        joke.hidden = false;
        meme.hidden = true;
        // fetchJoke();
    // }
};

memeSelector.onclick = function(){
    // joke.innerHTML = 'Loading...'
    // if(memeSelector.checked){
        joke.hidden = true;
        meme.hidden = false;
        if(!memeLoaded){
            fetchMeme();
            memeLoaded = true;
        }
    // }
};

let moreBtn = document.getElementById('more');
let shareBtn = document.getElementById('share');
moreBtn.onclick = function(){
    if(joke.hidden)
        fetchMeme();
    else
        fetchJoke();
}
shareBtn.onclick = function share() {
    var tempInput = document.createElement("input");
    tempInput.style.visibility = "hidden";
    let joke = document.getElementById('joke');
    let meme = document.getElementById('memeImage');
    if(joke.hidden)
        tempInput.value = meme.src;
    else
        tempInput.value = joke.innerHTML;
    
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    // await navigator.clipboard.writeText("int");
    alert("Copy!\n" + tempInput.value);
}