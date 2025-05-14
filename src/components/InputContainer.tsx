import '../css/InputContainer.css'
import HoldButton from "./HoldButton.tsx";
import {type ChangeEvent, useState} from "react";
import {getAlgorithmByID} from "../utils/TypesUtils.ts";

interface Props {
    updateIndexArray: (array: number[]) => void;
    startSearch: (TipoBusca: string) => void;
    handleReset: () => void;
}

const InputContainer = ({ updateIndexArray, startSearch, handleReset }: Props) => {
    const [activeButton, setActiveButton] = useState<number>(-1);
    const [inputValue, setInputValue] = useState<string>("");

    const handleClick = (id: number) => {
        setActiveButton(id);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const cleaned = value.replace(/[^0-9,\s]/g, '');
        setInputValue(cleaned);

        const array = value
            .split(',')
            .map(str => parseInt(str.trim(), 10))
            .filter((num: number) => !Number.isNaN(num));

        updateIndexArray(array);
    }

    const handleSubmit = () => {
        if (inputValue === "") return;
        if (activeButton === -1) return;

        startSearch(getAlgorithmByID(activeButton));
        setInputValue("");
    }

    return (
        <div  className="input-container">
            <input type="text" onChange={handleInputChange} value={inputValue}/>

            <HoldButton id={0} text="Largura" isActive={activeButton === 0} onCLick={handleClick} />
            <HoldButton id={1} text="Profundidade" isActive={activeButton === 1} onCLick={handleClick} />
            <HoldButton id={2} text="Aprofundamento" isActive={activeButton === 2} onCLick={handleClick} />
            <HoldButton id={3} text="A*" isActive={activeButton === 3} onCLick={handleClick} />

            <button onClick={handleSubmit}>Iniciar Busca</button>

            <button onClick={handleReset}>Reiniciar</button>
        </div>
    );
};

export default InputContainer;