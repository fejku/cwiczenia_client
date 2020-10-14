import React from "react";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import PomiaryWagi from "./components/PomiaryWagi/PomiaryWagi";
import HomeIcon from '@material-ui/icons/Home';
import WagaIcon from "./components/Icons/WagaIcon";
import "./App.css";

const apps = [
  {path: "/", component: <Home />, icon: <HomeIcon />},
  {path: "/pomiary_wagi", component: <PomiaryWagi />, icon: <WagaIcon />},
]

const App = () => <Layout apps={apps} />;

export default App;
