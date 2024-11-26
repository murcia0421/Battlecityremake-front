import { useEffect } from "react";

const PlayerController = ({ tankPosition, setTankPosition, mapData }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { row, col } = tankPosition;

            console.log(`Key pressed: ${event.key}`); // Log de la tecla presionada

            let newRow = row;
            let newCol = col;

            // Detectar las teclas presionadas
            switch (event.key) {
                case "ArrowUp":
                    console.log("Moving up");
                    newRow = row > 0 ? row - 1 : row;
                    break;
                case "ArrowDown":
                    console.log("Moving down");
                    newRow = row < mapData.length - 1 ? row + 1 : row;
                    break;
                case "ArrowLeft":
                    console.log("Moving left");
                    newCol = col > 0 ? col - 1 : col;
                    break;
                case "ArrowRight":
                    console.log("Moving right");
                    newCol = col < mapData[0].length - 1 ? col + 1 : col;
                    break;
                case " ":
                    console.log("Shoot!"); // Log para la acción de disparar
                    break;
                default:
                    console.log("Key not handled"); // Para teclas no mapeadas
                    return; // Ignorar otras teclas
            }

            // Validar colisión con elementos no transitables
            if (mapData[newRow][newCol] === 0) {
                console.log(`Tank moving to row: ${newRow}, col: ${newCol}`);
                setTankPosition({ row: newRow, col: newCol });
            } else {
                console.log(`Blocked! Can't move to row: ${newRow}, col: ${newCol}`);
            }
        };

        // Agregar evento al montar el componente
        window.addEventListener("keydown", handleKeyDown);

        // Limpiar evento al desmontar el componente
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [tankPosition, setTankPosition, mapData]);
};

export default PlayerController;
