import {useEffect, useRef} from "react";

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

interface Sprite {
    type: TileType;
    img: HTMLImageElement;
    robotID?: number;
}
//END

interface Props {
    width: number;
    height: number;
    tileSize: number;
    tiles: Tile[];
    robots: Robot[];
}

const CanvasGrid = ({ width, height, tileSize, tiles, robots }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spriteRef = useRef<Sprite[]>([]);

    const drawRobots = (ctx: CanvasRenderingContext2D) => {
        const sprites = spriteRef.current;
        if (sprites) {
            robots.forEach((robot, index) => {
                ctx.drawImage(sprites, robot.x * tileSize, robot.y * tileSize, tileSize, tileSize);
            });
        }
    }
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.imageSmoothingEnabled = false;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        tiles.forEach(tile => {
            let isRobot = false;

            switch (tile.Objeto) {
                case 1:
                    ctx.fillStyle = "#f0f0f0";
                    break;
                case 2:
                    isRobot = true;
                    break;
                case 3:
                    ctx.fillStyle = "#444";
                    break;
                case 4:
                    ctx.fillStyle = "#211";
                    break;
                case 5:
                    ctx.fillStyle = "#4caf50";
                    break;
            }

            //TODO: REMOVE THIS
            if (!isRobot) {
                ctx.fillRect(tile.X * tileSize, tile.Y * tileSize, tileSize, tileSize);
                ctx.strokeStyle = "#ccc";
                ctx.strokeRect(tile.X * tileSize, tile.Y * tileSize, tileSize, tileSize);
                ctx.stroke();

                // Draw shelf IDs
                if (tile.valor != 0) {
                    ctx.fillStyle = "#fff";
                    ctx.fillText(tile.valor.toString(), tile.X * tileSize + 10, tile.Y * tileSize + 10);
                }
            }

        });

    }, [tiles, robots, tileSize, spriteRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) return;

        canvas.dispatchEvent(new Event("update"));
        drawRobots(ctx);

    }, [drawRobots, robots, spriteRef]);

    return <canvas ref={canvasRef} width={width} height={height} />;
}

export default CanvasGrid;