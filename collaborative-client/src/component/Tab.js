import React, { useEffect, useState } from "react";
import Socket from "../component/Socket";
import "./Tab.css";

const Tab = () => {
  const [fontStyle, setFontStyle] = useState("normal");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [fontSize, setFontSize] = useState("16px");

  const handleChangeStyle = (newStyle) => {
    setFontStyle(newStyle);
  };

  const handleChangeWeight = (newWeight) => {
    setFontWeight(newWeight);
  };

  const handleChangeFamily = (newFamily) => {
    setFontFamily(newFamily);
  };

  const handleChangeSize = (newSize) => {
    setFontSize(newSize);
  };

  const fontChange = { fontStyle, fontWeight, fontFamily, fontSize };

  return (
    <div>
      <div className="tab">
        <div>
          <label>Font Style:</label>
          <select onChange={(e) => handleChangeStyle(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>

        <div>
          <label>Font Weight:</label>
          <select onChange={(e) => handleChangeWeight(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
          </select>
        </div>

        <div>
          <label>Font Family:</label>
          <input
            type="text"
            value={fontFamily}
            onChange={(e) => handleChangeFamily(e.target.value)}
          />
        </div>

        <div>
          <label>Font Size:</label>
          <input
            type="text"
            value={fontSize}
            onChange={(e) => handleChangeSize(e.target.value)}
          />
        </div>
      </div>
      <Socket styleProp={fontChange} />
    </div>
  );
};

export default Tab;
