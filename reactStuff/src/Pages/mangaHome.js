import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Divbar from "../components/divBar";

import '../styleSheets/colors.css';
import MangaSlider from "../components/mangaSlider";
import { useNavigate } from "react-router-dom";


const container = document.body
container.style.backgroundColor = 'var(--bgColor)'
console.log("checking")
console.log(window.innerWidth)
const mobile = (window.innerWidth <= 900) ? true : false;

function MangaHome()
{
    const navigate = useNavigate()
    console.log(window.location.href)
    const myMangaList = ["b6622d86-74c6-47eb-8c92-89bcce50a63b",
"13785f54-007b-485d-8997-be0f0523e189",
"d1a9fdeb-f713-407f-960c-8326b586e6fd",
"a07320a4-afcd-413a-a451-d69a448d0c28",
"a81e63a3-83f1-4da5-95a4-ba431e830ce9",
"e5357466-c8a2-4259-9b02-2580185bd2bb",
"077a3fed-1634-424f-be7a-9a96b7f07b78",
"f7888782-0727-49b0-95ec-a3530c70f83b",
"1044287a-73df-48d0-b0b2-5327f32dd651",
"62b74aa6-24df-4b91-b76d-39e7ab3c3ca5"]
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const mangaID = formData.get("mangaID")
        if(mangaID)
            {
                console.log("mangaPage is ")
                console.log(mangaID)
                navigate(`/manga/${mangaID}`)
            }
    }
    const handleKeyPress = (e) => {
        // If the Enter key (keyCode 13) is pressed, submit the form
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent the default behavior (form submission)
          e.currentTarget.closest('form').requestSubmit(); // Manually submit the form
        }
      };
    return(
    <>
    <div style={{
      margin: "auto",
      maxWidth: '40rem',
      padding: '1.5rem',
      
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '1rem'
    }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Find Manga Similar to What You’ve Read</h1>
        <p style={{  marginBottom: '1.5rem' }} >Enter a MangaDex manga ID to view its details and get a list of similar recommendations. Whether you're into action, romance, horror, or slice of life, discover new series that match your vibe.</p>
        <form   style={{ display: 'flex', gap: '1rem' }} onSubmit={handleSubmit}> 
            <input           style={{
                outline: "none",
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.25rem',
          }}  name="mangaID" type="text" required={true} placeholder="Enter Manga ID..."></input>
        </form>
    </div>
    <MangaSlider isMobile={mobile} myMangaList={myMangaList}></MangaSlider>
    </>
)
}
export default MangaHome
