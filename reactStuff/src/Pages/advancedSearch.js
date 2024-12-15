import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Navigate, useParams } from "react-router-dom";
import Divbar from "../components/divBar";
import SearchContainer from "../components/searchContainer";

import '../styleSheets/colors.css';

const mobile = (window.innerWidth <= 900) ? true : false;
function AdvancedSearch()
{
    const [searchUrl, changeSearchUrl] = useState("")
    return(<><SearchContainer searchUrl={searchUrl} changeSearchUrl={changeSearchUrl}></SearchContainer></>)
};
export default AdvancedSearch