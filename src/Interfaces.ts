import type {TileType} from "./Types.ts";

export interface Tile {
    X: number;
    Y: number;
    Objeto: TileType;
    valor: string;
}

export interface Robot {
    Id: string;
    X: number;
    Y: number;
    Objeto: TileType;
}

export interface rotaJson {
    x: number;
    y: number;
}

export interface Glue {
    linkedRobot: string;
    linkedShelf: number;
}

export interface SpritesObject {
    shelf: HTMLImageElement;
    shelfFlipped: HTMLImageElement;
    shelfSelected: HTMLImageElement;
    shelfSelectedFlipped: HTMLImageElement;
    shelfTargeted: HTMLImageElement;
    shelfTargetedFlipped: HTMLImageElement;
    floor: HTMLImageElement;
    wall: HTMLImageElement;
    delivery: HTMLImageElement;
    robot1: HTMLImageElement;
    robot2: HTMLImageElement;
    robot3: HTMLImageElement;
    robot4: HTMLImageElement;
    robot5: HTMLImageElement;
}