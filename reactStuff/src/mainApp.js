import { createBrowserRouter, generatePath, RouterProvider, useLocation, BrowserRouter, Routes, Route, Link,Outlet } from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import MangaHome from "./Pages/mangaHome";
import MangaPage from "./Pages/mangaPage";
import RandomMangaPage from "./Pages/randomManga";
import Divbar from "./components/divBar";
import AdvancedSearch from "./Pages/advancedSearch";
console.log(window.location.href)
const container = document.body
const root = createRoot(container)
const mobile = (window.innerWidth <= 900) ? true : false;
console.log(window.innerWidth <= 900)
function MainApp()
{
    const [isDark,toggleDarkMode] = useState(false);
    const [isMobile,toggleMobileMode] = useState(mobile);
    return(    <>               
        <BrowserRouter basename="">
        <Routes>
        <Route path="/" element={<><Divbar isMobile = {isMobile} toggleMobile = {toggleMobileMode} toggleDark = {toggleDarkMode} darkMode ={isDark}/><Outlet></Outlet></>}>
        <Route path="" element={<MangaHome></MangaHome>}></Route>
        <Route path='/manga/:id' element={<MangaPage></MangaPage>}></Route>
        <Route path='/advancedSearch' element={<AdvancedSearch></AdvancedSearch>}></Route>
        </Route>
        <Route path='/random' element={<RandomMangaPage></RandomMangaPage>}></Route>
        <Route path="*" element={<h1>ERROR 404</h1>}></Route>
        </Routes></BrowserRouter>
        
                    </>)
};
export default MainApp