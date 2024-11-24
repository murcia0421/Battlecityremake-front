import React from "react";
import "../Styles/Map.css";

const Map = ({ grid }) => {
    return (
        <div className="map">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`cell ${cell}`}></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Map;
