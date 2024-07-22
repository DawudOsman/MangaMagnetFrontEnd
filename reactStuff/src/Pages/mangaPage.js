import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Await, useParams } from "react-router-dom";
import Divbar from "../components/divBar";
import '../styleSheets/colors.css';

const mobile = (window.innerWidth <= 900) ? true : false;
function MangaPage()
{
    let currManga = useParams()
    let mangaId =  currManga.id
    const [mangaInfo,setMangaInfo] = useState(undefined);
    let mangaObject = {}
    useEffect(() => 
        {
            async function initialiseManga(id)
            {
    
                let url =  `http://localhost:5251/Manga?mangaId=${id}`
                let response = await fetch(url)
                let randomManga = await response.json()
                let currManga = randomManga['data']
                getMangaTitle(currManga)
                await getMangaArtist(currManga)
                await getMangaAuthor(currManga)
                getMangaGenre(currManga)
                getMangaTheme(currManga)
                getMangaSummary(currManga)
                setMangaInfo(mangaObject)
    
            }
            async function getAuthorName(id)
            {
                let url = `http://localhost:5251/Authors/${id}`
                let response = await fetch(url)
                let author = await response.json()
                let authorName = author['data']['attributes']['name']
                return authorName


            }
            function getMangaTitle(manga){
                let mangaTitle = manga['attributes']['title']['en']
                mangaObject.title = mangaTitle
            }
            async function  getMangaAuthor(manga){
                let relationships = manga['relationships']
                let authors = []
                for(let i = 0; i < relationships.length; i++)
                    {
                        
                        if(relationships[i]['type'] == 'author')
                            {
                               await getAuthorName(relationships[i]['id']).then((x) => { authors.push(x)})
                                

                            }
                    }
                
                    console.log("authors are")
                    console.log(authors)
                if(authors.length > 0)
                    {
                        mangaObject.authors = authors
                    }
                
            }
            async function getMangaArtist(manga){
                let relationships = manga['relationships']
                let artists = []
                for(let i = 0; i < relationships.length; i++)
                    {
                        
                        if(relationships[i]['type'] == 'artist')
                            {
                                await getAuthorName(relationships[i]['id']).then((x) => { artists.push(x)})
                            }
                    }
                if(artists.length > 0)
                    {
                        mangaObject.artists = artists
                    }
            }
            function getMangaGenre(manga){
                let tags = manga['attributes']['tags']
                let genres = []
                for(let i = 0;i<tags.length;i++)
                    {
                        if(tags[i]['attributes']['group'] == "genre")
                            {
                                genres.push(tags[i]['attributes']['name']['en'])
                            }
                    }
                if(genres.length >0)
                    {
                        mangaObject.genres = genres
                    }
            }
            function getMangaTheme(manga)
            {
                let tags = manga['attributes']['tags']
                let themes = []
                for(let i = 0;i<tags.length;i++)
                    {
                        if(tags[i]['attributes']['group'] == "theme")
                            {
                                themes.push(tags[i]['attributes']['name']['en'])
                            }
                        
                    }
                if(themes.length > 0)
                    {
                        mangaObject.themes = themes
                    }
            }
            function getMangaSummary(manga){
                let summary = manga['attributes']['description']
                console.log(summary)
                if(Object.values(summary).length != 0)
                    {
                        mangaObject.summary = summary['en']
                    }
                
            }
            initialiseManga(mangaId)
            
        },[]
    )
    
    return(<>{mangaInfo != undefined && <>
        {mangaInfo.title != undefined && <><p>{mangaInfo.title}</p></>}{mangaInfo.authors != undefined && <><h2>Authors</h2>{mangaInfo.authors.map((author,idx) => {return <p>{author}</p>})}</>}
        {mangaInfo.artists != undefined && <><h2>Artists</h2>{mangaInfo.artists.map((artist,idx) => {return <p>{artist}</p>})}</>}
        {mangaInfo.genres != undefined && <><h2>Genre</h2>{mangaInfo.genres.map((genre,idx) =>{return <p>{genre}</p>})}</>}
        {mangaInfo.themes != undefined && <><h2>Themes</h2>{mangaInfo.themes.map((theme,idx)=>{return <p>{theme}</p>})}</>}
        {mangaInfo.summary != undefined && <>{mangaInfo.summary}</>}
        </>}
        </>)
};
export default MangaPage