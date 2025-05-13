import {useEffect, useRef} from "react";

import robot1 from '../assets/sprites/robo-1.png';
import robot2 from '../assets/sprites/robo-2.png';
import robot3 from '../assets/sprites/robo-3.png';
import robot4 from '../assets/sprites/robo-4.png';
import robot5 from '../assets/sprites/robo-5.png';

import shelfSprite from '../assets/sprites/estante.png';
import shelfFlippedSprite from '../assets/sprites/estante-virada.png';
import floorTile from '../assets/sprites/floor-tile.png';
import wallTile from '../assets/sprites/wall-tile.png';
import xSprite from '../assets/sprites/floor-X-tile.png';
import {loadImage} from "../utils/ImageUtils.ts";
import type {Robot, SpritesObject, Tile} from "../Interfaces.ts";
import type {TileType} from "../Types.ts";

interface Props {
    width: number;
    height: number;
    tileSize: number;
    tiles: Tile[];
    robots: Robot[];
}

const CanvasGrid = ({ width, height, tileSize, tiles, robots }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spriteRef = useRef<SpritesObject | null>(null);

    const getSprite = (sprites: SpritesObject, type: TileType, robotID?: number, flipped?: boolean) => {
        switch (type) {
            case 1:
                return sprites.floor;
            case 2:
                return getRobotSprite(sprites, robotID!); //TODO: MAYBE MAKE THIS BETTER
            case 3:
                if (flipped) return sprites.shelfFlipped;
                return sprites.shelf;
            case 4:
                return sprites.wall;
            case 5:
                return sprites.delivery;
            default:
                return sprites.floor;
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
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.imageSmoothingEnabled = false;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!spriteRef.current) return;
        const sprites = spriteRef.current;

        // Draw grid
        tiles.forEach(tile => {
            if (tile.valor != 0) {
                // Draw floors
                ctx.drawImage(getSprite(sprites, 1), tile.X * tileSize, tile.Y * tileSize, tileSize, tileSize);

            } else {
                ctx.drawImage(getSprite(sprites, tile.Objeto), tile.X * tileSize, tile.Y * tileSize, tileSize, tileSize);
            }

        });

        robots.forEach(robot => {
            ctx.drawImage(getSprite(sprites, robot.Objeto, parseInt(robot.Id.charAt(1))), robot.X * tileSize, robot.Y * tileSize, tileSize, tileSize);
        })

        tiles.forEach(tile => {
            if (tile.valor != 0) {
                if (tile.valor > 10 && (Math.floor((tile.valor - 1) / 10) % 2 != 0)) {
                    // Draw shelves looking left
                    ctx.drawImage(getSprite(sprites, tile.Objeto, undefined, true), tile.X * tileSize, tile.Y * tileSize, tileSize, tileSize);
                } else {
                    // Draw shelves looking right
                    ctx.drawImage(getSprite(sprites, tile.Objeto), tile.X * tileSize, tile.Y * tileSize, tileSize, tileSize);
                }

                // Draw shelf IDs
                ctx.fillStyle = "#000";
                ctx.fillText(tile.valor.toString(), tile.X * tileSize + 15, tile.Y * tileSize + 20);
            }
        })

    }, [tiles, robots, tileSize, spriteRef, getSprite]);

    useEffect(() => {
        spriteRef.current = {
            robot1: loadImage(robot1),
            robot2: loadImage(robot2),
            robot3: loadImage(robot3),
            robot4: loadImage(robot4),
            robot5: loadImage(robot5),
            shelf: loadImage(shelfSprite),
            shelfFlipped: loadImage(shelfFlippedSprite),
            floor: loadImage(floorTile),
            wall: loadImage(wallTile),
            delivery: loadImage(xSprite),
        };
    }, []);

    return <canvas ref={canvasRef} width={width} height={height} />;
}

export default CanvasGrid;