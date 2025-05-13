import CanvasGrid from './components/CanvasGrid'
import './css/App.css'
import {useEffect, useState} from "react";
import axios from "../api/axios.ts";
import type {Robot, Tile} from "./Interfaces.ts";
import InputContainer from './components/InputContainer.tsx';

function App() {

    const [tiles, setTiles] = useState<Tile[]>([]);
    const [robots, setRobots] = useState<Robot[]>([]);

    useEffect(() => {
        axios.get("/start").then(r => {
            setTiles(r.data);
        });

        axios.get("/start-robots").then(r => {
            setRobots(r.data);
        });
    }, []);

    useEffect(() => {
        axios.get("/busca/0/1/largura").then(r => {
            console.log(r.data);
        })
    }, [])

    return (
        <div className="app-wrapper">
            <InputContainer />

            <CanvasGrid width={1090} height={910} tileSize={70} tiles={tiles} robots={robots} />
        </div>
    )
}

export default App
