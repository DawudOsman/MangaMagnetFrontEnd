import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Navigate, useParams } from "react-router-dom";
import Divbar from "../components/divBar";
import '../styleSheets/colors.css';

const mobile = (window.innerWidth <= 900) ? true : false;
function AdvancedSearch()
{
    
    return(<h1>Advanced Search</h1>)
};
export default AdvancedSearch