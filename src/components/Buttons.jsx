import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewFileFullName, setShowOverlay } from "../store/imageSlice";

const Buttons = ({ context, image, canvas }) => {
  const { imageName: fileFullName, filters } = useSelector((state) => state.image);

  const dispatch = useDispatch();
  const downloadLinkRef = useRef();

  const handleDownload = () => {
    //get fileName
    const fileName = fileFullName.split(".").shift();
    //get extension
    const fileExtension = fileFullName.split(".").pop();
    //init new fileName
    let newFileFullName;
    // Check image type
    if (fileExtension === "jpg" || fileExtension === "png" || fileExtension === "jpeg") {
      // new filename, with suffix-edited.jpg
      newFileFullName = `${fileName}-edited.${fileExtension}`;
    }
    dispatch(setNewFileFullName(newFileFullName));

    context.filter = filters.join(" ");
    context.drawImage(image, 0, 0);
    let canvasUrl = canvas.toDataURL();
    downloadLinkRef.current.download = newFileFullName;
    downloadLinkRef.current.href = canvasUrl;
  };

  const handleRemove = () => {
    dispatch(setShowOverlay(false));
    // context.drawImage(image, 0, 0)
  };

  const handleApply = () => {
    dispatch(setShowOverlay(true));
  };

  return (
    <div className='row my-5'>
      <div className='col-md-4 mb-2'>
        <a ref={downloadLinkRef} onClick={handleDownload} id='downloadBtn' className='btn btn-primary btn-block' download>
          Download Image
        </a>
      </div>
      <div className='col-md-4 mb-2'>
        <button onClick={handleRemove} id='removeBtn' className='btn btn-danger btn-block'>
          Remove Filters
        </button>
      </div>
      <div className='col-md-4 mb-2'>
        <button onClick={handleApply} id='applyBtn' className='btn btn-success btn-block'>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Buttons;
