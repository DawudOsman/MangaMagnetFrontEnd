
import React from "react";
import { createRoot } from "react-dom/client";
import MainApp from "./mainApp";

const container = document.body
const root = createRoot(container)
root.render(<MainApp></MainApp>)