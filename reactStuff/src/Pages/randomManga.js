import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Navigate, useParams } from "react-router-dom";
import Divbar from "../components/divBar";
import '../styleSheets/colors.css';
import { useNavigate } from "react-router-dom";

const mobile = (window.innerWidth <= 900) ? true : false;
function RandomMangaPage()
{
    const [mangaId,setMangaId] = useState("");
    const navigate =  useNavigate()
    useEffect(() =>
        {
            async function getRandomId()
            {
                try {
                    let url = 'http://localhost:5251/randomManga'
                    let response = await fetch(url)
                    let randomManga = await response.json()
                    console.log(randomManga)
                    let currManga = randomManga['data']['id']
                    setMangaId(currManga)
                } catch (error) {
                    navigate('/')
                }
            }
            getRandomId()
            console.log(mangaId)
        },[])
    
    return(<>{mangaId == ""?<></>:<Navigate to={`/manga/${mangaId}`}></Navigate>}</>)
};
export default RandomMangaPage