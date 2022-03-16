import React from "react";

import "./CropModal.css";

type CropModalProps = {
  content: JSX.Element;
  onClickDownload(event: React.MouseEvent<HTMLElement>): void;
  onClickCloseModal(event: React.MouseEvent<HTMLElement>): void;
};

export default function CropModal({
  content,
  onClickDownload,
  onClickCloseModal,
}: CropModalProps) {
  return (
    <div className="CropModal">
      <div className="CropModal-content">
        {content}
        <button className="CropModal-download-button" onClick={onClickDownload}>
          Download Template
        </button>
        <div className="CropModal-close" onClick={onClickCloseModal}>
          &times;
        </div>
      </div>
    </div>
  );
}
