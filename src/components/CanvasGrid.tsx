import {type RefObject, useEffect, useRef} from "react";

import robot1 from '../assets/sprites/robo-1.png';
import robot2 from '../assets/sprites/robo-2.png';
import robot3 from '../assets/sprites/robo-3.png';
import robot4 from '../assets/sprites/robo-4.png';
import robot5 from '../assets/sprites/robo-5.png';

import shelfSprite from '../assets/sprites/estante.png';
import shelfFlippedSprite from '../assets/sprites/estante-virada.png';
import shelfSelected from '../assets/sprites/estante-selecionada.png';
import shelfSelectedFlipped from '../assets/sprites/estante-selecionada-virada.png';
import shelfTargeted from '../assets/sprites/estante-target.png';
import shelfTargetedFlipped from '../assets/sprites/estante-target-virada.png';
import floorTile from '../assets/sprites/floor-tile.png';
import wallTile from '../assets/sprites/wall-tile.png';
import xSprite from '../assets/sprites/floor-X-tile.png';
import {loadImage} from "../utils/ImageUtils.ts";
import type {Glue, Robot, SpritesObject, Tile} from "../Interfaces.ts";
import type {TileType} from "../Types.ts";

interface Props {
    width: number;
    height: number;
    tileSize: number;
    tiles: Tile[];
    robots: Robot[];
    selectedIndexes: number[];
    targetIndex: number;
    renderRef: RefObject<() => void>;
    glue: Glue;
}

const CanvasGrid = ({ width, height, tileSize, tiles, robots, selectedIndexes, targetIndex, renderRef, glue }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spriteRef = useRef<SpritesObject | null>(null);

    const getSprite = (sprites: SpritesObject, type: TileType, robotID?: number, flipped?: boolean, selected?: boolean, targeted?: boolean) => {

        if (robotID === parseInt(glue.linkedRobot.charAt(1))) {
            return getShelfSprite(sprites, false, false, true);
        }

        switch (type) {
            case 1:
                return sprites.floor;
            case 2:
                return getRobotSprite(sprites, robotID!);
            case 3:
                return getShelfSprite(sprites, flipped, selected, targeted);
            case 4:
                return sprites.wall;
            case 5:
                return sprites.delivery;
            default:
                return sprites.floor;
        }
    }

    const getShelfSprite = (sprites: SpritesObject, flipped?: boolean, selected?: boolean, targeted?: boolean) => {
        if (flipped) {
            if (selected) {
                return sprites.shelfSelectedFlipped;
            }

            if (targeted) {
                return sprites.shelfTargetedFlipped;
            }

            return sprites.shelfFlipped;
        } else {
            if (selected) {
                return  sprites.shelfSelected;
            }

            if (targeted) {
                return sprites.shelfTargeted;
            }

            return sprites.shelf;
        }
    }
    
    const getRobotSprite = (sprites: SpritesObject, robotID: number) => {
        switch (robotID) {
            case 0:
                return sprites.robot1
            case 1:
                return sprites.robot2
            case 2:
                return sprites.robot3
            case 3:
                return sprites.robot4
            case 4:
                return sprites.robot5
            default:
                return sprites.floor
        }
    }
    
    const render = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!spriteRef.current) return;
        const sprites = spriteRef.current;

        // Draw grid
        tiles.forEach(tile => {
            if (parseInt(tile.valor) != 0) {
                // Draw floors
                ctx.drawImage(getSprite(sprites, 1), tile.Y * tileSize, tile.X * tileSize, tileSize, tileSize);
            } else {
                ctx.drawImage(getSprite(sprites, tile.Objeto), tile.Y * tileSize, tile.X * tileSize, tileSize, tileSize);
            }

        });

        robots.forEach(robot => {
            ctx.drawImage(getSprite(sprites, robot.Objeto, parseInt(robot.Id.charAt(1))), robot.Y * tileSize, robot.X * tileSize, tileSize, tileSize);

            if (robot.Id === glue.linkedRobot) {
                ctx.fillStyle = "#000";
                ctx.fillText(glue.linkedShelf.toString(), robot.Y * tileSize + 15, robot.X * tileSize + 20);
            }
        });

        tiles.forEach(tile => {
            const tileID = parseInt(tile.valor)

            if (tileID != 0 && tileID !== glue.linkedShelf) {
                if (tileID > 10 && (Math.floor((tileID - 1) / 10) % 2 != 0)) {
                    // Draw shelves looking left
                    if (targetIndex === tileID) {
                        ctx.drawImage(getSprite(sprites, tile.Objeto, undefined, true, false, true), tile.Y * tileSize, tile.X * tileSize, tileSize, tileSize);
                    } else if (selectedIndexes.includes(tileID)) {
                        ctx.drawImage(getSprite(sprites, tile.Objeto, undefined, true, true), tile.Y * tileSize, tile.X * tileSize, tileSize, tileSize);
                    } else {
                        ctx.drawImage(getSprite(sprites, tile.Objeto, undefined, true), tile.Y * tileSize, tile.X * tileSize, tileSize, tileSize);
                    }

                } else {
                    // Draw shelves looking right
                    if (targetIndex === tileID) {
                        ctx.drawImage(getSprite(sprites, tile.Objeto, undefined, false, false, true), tile.Y * tileSize, tile.X * tileSize, tileSize, tileSize);
                    } else if (selectedIndexes.includes(tileID)) {
                        ctx.drawImage(getSprite(sprites, tile.Objeto, undefined, false, true), tile.Y * tileSize, tile.X * tileSize, tileSize, tileSize);
                    } else {
                        ctx.drawImage(getSprite(sprites, tile.Objeto), tile.Y * tileSize, tile.X * tileSize, tileSize, tileSize);
                    }
                }

                // Draw shelf IDs
                ctx.fillStyle = "#000";
                ctx.fillText(tile.valor.toString(), tile.Y * tileSize + 15, tile.X * tileSize + 20);
            }
        });
    }

    useEffect(() => {
        render();
        renderRef.current = render;

    }, [robots, tiles, selectedIndexes]);

    useEffect(() => {
        spriteRef.current = {
            robot1: loadImage(robot1),
            robot2: loadImage(robot2),
            robot3: loadImage(robot3),
            robot4: loadImage(robot4),
            robot5: loadImage(robot5),
            shelf: loadImage(shelfSprite),
            shelfSelected: loadImage(shelfSelected),
            shelfSelectedFlipped: loadImage(shelfSelectedFlipped),
            shelfTargeted: loadImage(shelfTargeted),
            shelfTargetedFlipped: loadImage(shelfTargetedFlipped),
            shelfFlipped: loadImage(shelfFlippedSprite),
            floor: loadImage(floorTile),
            wall: loadImage(wallTile),
            delivery: loadImage(xSprite),
        };
    }, []);

    return <canvas ref={canvasRef} width={width} height={height} />;
}

export default CanvasGrid;