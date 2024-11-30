import React from "react";

const GameFinish = ({ onBackToRoom }) => {
    return (
        <div className="game-finish">
            <h2>Game Finished!</h2>
            <p>Here are the final results:</p>
            {/* Muestra los detalles de los resultados */}
            <button onClick={onBackToRoom} className="back-to-room-btn">
                Back to Room
            </button>
        </div>
    );
};

export default GameFinish;
