import '../css/InputContainer.css'

import HoldButton from "./HoldButton.tsx";
import {useState} from "react";

const InputContainer = () => {
    const [activeButton, setActiveButton] = useState<number>(-1);

    const handleClick = (id: number) => {
        setActiveButton(id);
    }

    return (
        <div  className="input-container">

            <HoldButton id={0} text="Largura" isActive={activeButton === 0} onCLick={handleClick} />
            <HoldButton id={1} text="Profundidade" isActive={activeButton === 1} onCLick={handleClick} />
            <HoldButton id={2} text="Aprofundamento" isActive={activeButton === 2} onCLick={handleClick} />
            <HoldButton id={3} text="A*" isActive={activeButton === 3} onCLick={handleClick} />
        </div>
    );
};

export default InputContainer;