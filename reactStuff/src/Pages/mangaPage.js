import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Await, useParams } from "react-router-dom";
import Divbar from "../components/divBar";
import '../styleSheets/colors.css';
import { marked } from 'marked';
import MangaContent from "../components/mangaContent";
import RecommendedMangas from "../components/recommendedManga";
import { useLocation } from "react-router-dom";

const mobile = (window.innerWidth <= 900) ? true : false;
function MangaPage()
{
    let currManga = useParams()
    let mangaId =  currManga.id
    const [mangaInfo,setMangaInfo] = useState(undefined);
    let mangaObject = {}
    const location = useLocation();
    useEffect(() => 
        {
            async function initialiseManga(id)
            {
    
                let url =  `http://localhost:5251/Manga?mangaId=${id}`
                let response = await fetch(url)
                let randomManga = await response.json()
                let currManga = randomManga
                mangaObject.id = currManga.id
                mangaObject.title = currManga.title
                mangaObject.authors = currManga.Authors
                mangaObject.artists = currManga.Artist
                mangaObject.genres = currManga.genres
                mangaObject.themes = currManga.Theme
                mangaObject.summary =  marked.parse(currManga.Summary)
                console.log(currManga)
                getMangaImageUrl(currManga)
                setMangaInfo(mangaObject)
    
            }
            function getCoverId(cover)
            {
                let coverId = cover.filter(obj => {return obj['type'] == 'cover_art'})
                return coverId[0]['attributes']['fileName']
            }
             function getMangaImageUrl(manga)
            {
                let mangaId = manga['id']
                let coverUrl = manga['CoverId']
                let url = `http://localhost:5251/mangaCover?mangaId=${mangaId}&imageId=${coverUrl}`
                mangaObject.url = url
               
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
                        let summaryMarkDown = summary['en']
                        console.log(summaryMarkDown)
                        mangaObject.summary = marked.parse(summaryMarkDown)
                        console.log(mangaObject.summary)
                    }
                
            }
            initialiseManga(mangaId)
            
        },[]
    )
    
    return(<><div style={{overflow:'hidden'}}><MangaContent mangaInfo={mangaInfo}></MangaContent> </div><RecommendedMangas mangaId ={mangaId}></RecommendedMangas></>)
};
export default MangaPage