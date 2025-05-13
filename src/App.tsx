import CanvasGrid from './components/CanvasGrid'
import './css/App.css'
import {useEffect, useState} from "react";
import axios from "../api/axios.ts";

import robot1 from '../assets/sprites/robo-1.png';
import robot2 from '../assets/sprites/robo-2.png';
import robot3 from '../assets/sprites/robo-3.png';
import robot4 from '../assets/sprites/robo-4.png';
import robot5 from '../assets/sprites/robo-5.png';

import shelfSprite from '../assets/sprites/estante.png';
import floorTile from '../assets/sprites/floor-tile.png';
import wallTile from '../assets/sprites/wall-tile.png';
import xSprite from '../assets/sprites/floor-X-tile.png';

//TODO: MOVE THIS TO A TYPES FILE
//START
type TileType = 1 | 2 | 3 | 4 | 5;
interface Tile {
    X: number;
    Y: number;
    Objeto: TileType;
    valor: number;
}

interface Robot {
    id: string;
    x: number;
    y: number;
}

interface SpriteString {
    type: TileType;
    src: string;
    robotID?: number;
}
//END

function App() {

    const [tiles, setTiles] = useState<Tile[]>([]);

    useEffect(() => {
        axios.get("/start").then(r => {
            setTiles(r.data)
        })
    }, []);

    const spritesSrc: SpriteString[] = [
        { type: 1, src: floorTile },
        { type: 3, src: shelfSprite },
        { type: 4, src: wallTile },
        { type: 5, src: xSprite },
        { type: 2, src: robot1, robotID: 1 },
        { type: 2, src: robot2, robotID: 2 },
        { type: 2, src: robot3, robotID: 3 },
        { type: 2, src: robot4, robotID: 4 },
        { type: 2, src: robot5, robotID: 5 },
    ];

    const robots: Robot[] = [
        { id: "1", x: 0, y: 12 },
    ];

    return (
        <div>
            <CanvasGrid width={1090} height={910} tileSize={70} tiles={tiles} robots={robots} spritesSrc={spritesSrc} />
        </div>
    )
}

export default App
