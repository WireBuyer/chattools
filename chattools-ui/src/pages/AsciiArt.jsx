import React, { useState } from "react";
import "./AsciiArt.css";

const AsciiArt = () => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [threshold, setThreshold] = useState(128);
  const [inverted, setInverted] = useState(false);
  const [asciiArt, setAsciiArt] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    var data = new FormData();
    const brailleOptions = {
      width: width,
      height: height,
      threshold: threshold,
      inverted: inverted ? true : false,
    };

    data.append("user_image", imageFile);
    data.append(
      "brailleOptions",
      new Blob([JSON.stringify(brailleOptions)], {
        type: "application/json",
      })
    );

    // Placeholder for API call
    fetch("http://localhost:8080/brailleConverter", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("error!!!")
      })
      .then((data) => setAsciiArt(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="ascii-art-tool">
      <h2>ASCII Art Creator</h2>
      <div className="input-container">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
      </div>
      <div className="settings">
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            min="1"
            max="4000"
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="1"
            max="4000"
          />
        </label>
        <label>
          Threshold:
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            min="0"
            max="255"
          />
        </label>
        <label>
          Inverted:
          <input
            type="checkbox"
            checked={inverted}
            onChange={(e) => setInverted(e.target.checked)}
          />
        </label>
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Generate ASCII Art
      </button>
      <div className="ascii-art-output">
        <textarea className="braille" value={asciiArt} readOnly />
      </div>
    </div>
  );
};

export default AsciiArt;
