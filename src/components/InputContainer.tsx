import '../css/InputContainer.css'

interface Props {
    updateIndexArray: (array: number[]) => void;
}

import HoldButton from "./HoldButton.tsx";
import {type ChangeEvent, useState} from "react";

const InputContainer = ({ updateIndexArray }: Props) => {
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

    return (
        <div  className="input-container">
            <input type="text" onChange={handleInputChange} value={inputValue}/>

            <HoldButton id={0} text="Largura" isActive={activeButton === 0} onCLick={handleClick} />
            <HoldButton id={1} text="Profundidade" isActive={activeButton === 1} onCLick={handleClick} />
            <HoldButton id={2} text="Aprofundamento" isActive={activeButton === 2} onCLick={handleClick} />
            <HoldButton id={3} text="A*" isActive={activeButton === 3} onCLick={handleClick} />
        </div>
    );
};

export default InputContainer;