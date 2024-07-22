import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Divbar from "../components/divBar";

import '../styleSheets/colors.css';
import MangaSlider from "../components/mangaSlider";


const container = document.body
container.style.backgroundColor = 'var(--bgColor)'
console.log("checking")
console.log(window.innerWidth)
const mobile = (window.innerWidth <= 900) ? true : false;

function MangaHome()
{
    console.log(window.location.href)
    return(<><MangaSlider isMobile = {mobile} sortBy="latestUploadedChapter"/><MangaSlider  isMobile = {mobile} sortBy="rating"></MangaSlider></>)
}
export default MangaHome
