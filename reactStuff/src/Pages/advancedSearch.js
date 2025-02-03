import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import Divbar from "../components/divBar";
import SearchContainer from "../components/searchContainer";
import SearchWrapper from "../components/searchWrapper";
import MangaCardList from "../components/MangaCardList";

import '../styleSheets/colors.css';

const mobile = (window.innerWidth <= 900) ? true : false;

function AdvancedSearch()
{
    const [suffix, changeSuffix] = useState("?limit=32&")
    const prefix = "http://localhost:5251/customSearch"
    return(<><SearchWrapper  suffix = {suffix} changeSuffix={changeSuffix}></SearchWrapper><MangaCardList suffix = {suffix} prefix = {prefix}></MangaCardList> </>)
};
export default AdvancedSearch