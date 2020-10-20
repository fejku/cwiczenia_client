import React from "react";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import PomiaryWagi from "./components/PomiaryWagi/PomiaryWagi";
import Food from "./components/Food/Food";
import HomeIcon from "./components/Icons/HomeIcon";
import FoodIcon from "./components/Icons/FoodIcon";
import WagaIcon from "./components/Icons/WagaIcon";
import "./App.css";

const apps = [
  { path: "/", component: <Home />, icon: <HomeIcon />, activeOnlyWhenExact: true },
  { path: "/pomiary_wagi", component: <PomiaryWagi />, icon: <WagaIcon /> },
  { path: "/food", component: <Food />, icon: <FoodIcon /> },
];

const App = () => <Layout apps={apps} />;

export default App;
