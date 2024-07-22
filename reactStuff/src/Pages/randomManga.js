import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Navigate, useParams } from "react-router-dom";
import Divbar from "../components/divBar";
import '../styleSheets/colors.css';

const mobile = (window.innerWidth <= 900) ? true : false;
function RandomMangaPage()
{
    const [mangaId,setMangaId] = useState("");
    useEffect(() =>
        {
            async function getRandomId()
            {
                let url = 'http://localhost:5251/randomManga'
                let response = await fetch(url)
                let randomManga = await response.json()
                console.log(randomManga)
                let currManga = randomManga['data']['id']
                setMangaId(currManga)
            }
            getRandomId()
            console.log(mangaId)
        },[])
    
    return(<>{mangaId == ""?<h1>hi</h1>:<Navigate to={`/manga/${mangaId}`}></Navigate>}</>)
};
export default RandomMangaPage