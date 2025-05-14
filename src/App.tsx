import CanvasGrid from './components/CanvasGrid'
import './css/App.css'
import {useEffect, useRef, useState} from "react";
import axios from "../api/axios.ts";
import type {Glue, Robot, rotaJson, Tile} from "./Interfaces.ts";
import InputContainer from './components/InputContainer.tsx';

function App() {

    const [tiles, setTiles] = useState<Tile[]>([]);
    const [robots, setRobots] = useState<Robot[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [targetedIndex, setTargetedIndex] = useState<number>(-1);
    const [glued, setGlued] = useState<Glue>({
        linkedRobot: "",
        linkedShelf: -1,
    });

    const renderRef = useRef<() => void>(() => {});

    const updateIndexArray = (array: number[]) => {
        setSelectedIndexes(array);
    }

    const startSearch = async (TipoBusca: string) => {
        for (const index of selectedIndexes) {
            await new Promise<void>(async resolve => {
                const shelf = tiles.find(tile => parseInt(tile.valor) === index);

                if (!shelf) return;

                const r = await axios.post("/busca", {
                    TipoBusca: TipoBusca,
                    X: shelf.X,
                    Y: shelf.Y,
                });

                const routeResponse = r.data.rotaJson;
                const robotResponse = r.data.melhorRoboJson;

                const rotas = JSON.parse(routeResponse) as rotaJson[];
                const melhorRobo = JSON.parse(robotResponse) as Robot;

                setTargetedIndex(index);
                setSelectedIndexes(prev => (
                    prev.filter((_i, index) => index !== 0)
                ));

                for (const step of rotas) {
                    await new Promise<void>(resolve1 => {
                        animateRobot(step.x, step.y, melhorRobo.Id, 15, resolve1);

                        melhorRobo.X += step.x;
                        melhorRobo.Y += step.y;

                        if (melhorRobo.X === shelf.X && melhorRobo.Y === shelf.Y) {

                            setGlued({
                                linkedRobot: melhorRobo.Id,
                                linkedShelf: index,
                            });
                        }
                    });
                }

                resolve();
                setTargetedIndex(-1);
                setGlued({
                    linkedRobot: "",
                    linkedShelf: -1,
                });
            });
        }
    }

    const animateRobot = (
        deltaX: number,
        deltaY: number,
        robotID: string,
        steps: number = 60,
        onDone?: () => void
    ) => {
        let currentStep = 0;
        const stepX = deltaX / steps;
        const stepY = deltaY / steps;

        function animateStep() {
            setRobots(prev =>
                prev.map(robot =>
                    robot.Id === robotID
                        ? { ...robot, X: robot.X + stepX, Y: robot.Y + stepY }
                        : robot
                )
            );

            renderRef.current?.();

            currentStep++;
            if (currentStep < steps) {
                requestAnimationFrame(animateStep);
            } else {
                onDone?.();
            }
        }

        requestAnimationFrame(animateStep);
    };

    const handleReset = () => {
        setSelectedIndexes([]);
        setTargetedIndex(-1);
        setGlued({
            linkedRobot: "",
            linkedShelf: -1,
        });

        axios.get("/reset").then(r => {
            setRobots(r.data);
        });
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
            <InputContainer updateIndexArray={updateIndexArray} startSearch={startSearch} handleReset={handleReset} />

            <CanvasGrid width={1090} height={910} tileSize={70} tiles={tiles} robots={robots} selectedIndexes={selectedIndexes} targetIndex={targetedIndex} renderRef={renderRef} glue={glued} />
        </div>
    )
}

export default App
