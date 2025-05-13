import '../css/HoldButton.css'

interface Props {
    text: string;
    isActive: boolean;
    onCLick: (id: number) => void;
    id: number;
}

const HoldButton = ({ id, text, isActive, onCLick }: Props) => {
    return (
        <button className={isActive ? "button-active" : "button"} onClick={()  => onCLick(id)} >
            {text}
        </button>
    );
};

export default HoldButton;