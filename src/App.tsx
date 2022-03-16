import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  defaultCrop,
  makeAspectCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import "./App.css";
import { canvasTemplate } from "./canvasTemplate";
import CropModal from "./Components/CropModal";

function App() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imgSrc, setImgSrc] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>(defaultCrop);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(defaultCrop); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader?.result?.toString() || "");
        if (reader?.result?.toString()) {
          setModalOpen(true);
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    imgRef.current = e.currentTarget;
    const { width, height } = e.currentTarget;

    // This is to demonstate how to make and center a % aspect crop
    // which is a bit trickier so we use some helper functions.
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        1,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

  function onClickDownload() {
    if (imgRef.current) {
      canvasTemplate(imgRef.current, crop);
    }
  }

  function onClickCloseModal() {
    setModalOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>2.25" Button Template Generator</h1>
        <ol>
          <li>Upload your image</li>
          <li>Crop</li>
          <li>Download a PNG file ready for printing</li>
        </ol>
        <input
          className="App-upload-button"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
        />
      </header>

      {Boolean(imgSrc) && modalOpen && (
        <CropModal
          content={
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              aspect={1}
              circularCrop
            >
              <img
                className="ReactCrop-image"
                alt="Crop me"
                src={imgSrc}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          }
          onClickDownload={onClickDownload}
          onClickCloseModal={onClickCloseModal}
        />
      )}
    </div>
  );
}

export default App;
