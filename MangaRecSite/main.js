
function getCoverId(cover)
{
    let coverId = cover.filter(obj => {return obj['type'] == 'cover_art'})
    return coverId[0]['attributes']['fileName']
}
function getMangaImage(mngaId,imgId,filterType,mangaName)
{
    const url = `https://uploads.mangadex.org/covers/${mngaId}/${imgId}`;
    //console.log(url)
    let newImg = document.createElement('img')
    newImg.setAttribute('draggable', false);
    let aLink = document.createElement('a')
    newImg.setAttribute('class','mangaImg')
    let currSection = document.createElement('section')
    newImg.src = url
    aLink.appendChild(newImg)
    aLink.setAttribute('href',`mangaPage.html?mangId=${mngaId}&imgId=${imgId}`)
    currSection.appendChild(aLink)
    //console.log(filterType)
    let mangaTitle = document.createElement('h2')
    mangaTitle.setAttribute('class','mangaName')
    mangaTitle.innerText = mangaName
    currSection.appendChild(mangaTitle)
    let topMangaDiv = document.getElementById(filterType)
    topMangaDiv.appendChild(currSection)
}
function addMangaName(text)
{

}
async function getMangaList(filterType){
    const url = `https://corsproxy.io/?https://thingproxy.freeboard.io/fetch/https://api.mangadex.org/manga/?includes[]=cover_art&limit=10&order[${filterType}]=desc`
    let response = await fetch(url)
    let mangaList = await response.json()
    for (var i = 0; i < mangaList['data'].length; i++)
{
    console.log(mangaList['data'][i]['attributes']['title']['en'])
    let coverLink = getCoverId(mangaList['data'][i]['relationships'])
    getMangaImage(mangaList['data'][i]['id'],coverLink,filterType,mangaList['data'][i]['attributes']['title']['en'])

    
}
}
getMangaList('rating').then(() => {
    getMangaList('latestUploadedChapter')
})






//async function getManga(){
//    const url = "https://cors-anywhere.herokuapp.com/https://api.mangadex.org/manga/random";
 //   let response = await fetch("https://corsproxy.io/?https://thingproxy.freeboard.io/fetch/https://api.mangadex.org/manga/random/?includes[]=cover_art", {
  //      mode:'cors',
//});



  //  let manga = await response.json()
   // let mangaId  = manga['data']['id']
   // let imageId = manga['data']['relationships'].filter(obj => {
    //    return obj['type'] == 'cover_art'
    //})
    //getMangaImage(mangaId,imageId[0]['attributes']['fileName'])
//}