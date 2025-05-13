import CanvasGrid from './components/CanvasGrid'
import './css/App.css'
import {useEffect, useState} from "react";
import axios from "../api/axios.ts";
import type {Robot, Tile} from "./Interfaces.ts";
import InputContainer from './components/InputContainer.tsx';

function App() {

    const [tiles, setTiles] = useState<Tile[]>([]);
    const [robots, setRobots] = useState<Robot[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    const updateIndexArray = (array: number[]) => {
        setSelectedIndexes(array);
    }

    useEffect(() => {
        axios.get("/start").then(r => {
            setTiles(r.data);
        });

        axios.get("/start-robots").then(r => {
            setRobots(r.data);
        });
    }, []);

    return (
        <div className="app-wrapper">
            <InputContainer updateIndexArray={updateIndexArray} />

            <CanvasGrid width={1090} height={910} tileSize={70} tiles={tiles} robots={robots} selectedIndexes={selectedIndexes} />
        </div>
    )
}

export default App
