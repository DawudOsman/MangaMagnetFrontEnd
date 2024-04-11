let params =  new URLSearchParams(window.location.search);
let mangaId = params.get('mangId')
let imgId = params.get('imgId')
let imgDiv = document.getElementById('coverDiv')
let img = document.createElement('img')
img.src = `https://uploads.mangadex.org/covers/${mangaId}/${imgId}`
imgDiv.insertBefore(img, imgDiv.firstChild);
function addGenreOrThemes(nameId,currList,h1txt)
{
    if (currList.length == 0)
    {
        return
    }
    document.getElementById(nameId)
    let newDiv = document.createElement('div')
    newDiv.setAttribute('class','contents')
    for (var i = 0; i < currList.length; i++)
{
    var curr = document.createElement('p')
    curr.innerText = (currList[i]['attributes']['name']['en'])
    newDiv.appendChild(curr)
}
let newH1 = document.createElement('h2')
newH1.innerText =  h1txt
let container = document.getElementById(nameId)
container.appendChild(newH1)
container.appendChild(newDiv)


}
function addTitle(currTitle)
{
    let container = document.getElementById('title')
    let newH1 = document.createElement('h1')
    newH1.innerText = currTitle
    container.appendChild(newH1)
};

async function addAuthor(authors){
    let container = document.getElementById('Author')
    let newDiv = document.createElement('div')
    newDiv.setAttribute('class','contents')
    for (var i = 0; i < authors.length; i++)
    {
        var author = document.createElement('p')
        let  url = `https://corsproxy.io/?https://thingproxy.freeboard.io/fetch/https://api.mangadex.org/author/${authors[i]['id']}`
        let response = await fetch(url)
        let authorObj = await response.json()
        author.innerText = authorObj['data']['attributes']['name']
        newDiv.appendChild(author)
    }
    let newH1 = document.createElement('h2')
    newH1.innerText =  'Author'
    container.appendChild(newH1)
    container.appendChild(newDiv)
}
function addSummary(currText){
    let currDiv = document.getElementById('summary')
    let currP = document.createElement('h2')
    currP.innerText = currText
    currDiv.appendChild(currP)
}
async function getMangaInfo()
{
    const url = `https://corsproxy.io/?https://thingproxy.freeboard.io/fetch/https://api.mangadex.org/manga/${mangaId}`
    let response = await fetch(url)
    let currManga = await response.json()
    let summaryText = currManga['data']['attributes']['description']['en']
    console.log(currManga)
    let authors = currManga['data']['relationships'].filter( x=>{
        return x['type'] == "author"
    })
    addAuthor(authors).then(()=> {    let mangaGenres = currManga['data']['attributes']['tags'].filter((x) =>{return x['attributes']['group'] == 'genre' })
    let mangaThemes = currManga['data']['attributes']['tags'].filter((x) =>{return x['attributes']['group'] == 'theme' })
    addTitle(currManga['data']['attributes']['title']['en'])
    addGenreOrThemes('genres',mangaGenres,'Genre')
    addGenreOrThemes('themes',mangaThemes,'Theme')
    if(summaryText != undefined){    addSummary(summaryText)}
})
}
getMangaInfo()