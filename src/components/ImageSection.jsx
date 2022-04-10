import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { uploadImg } from "../store/imageSlice";
import styles from "./ImageSection.module.scss";

const ImageSection = (props) => {
  const canvasRef = useRef(null);
  const [overlayStyle, setOverlayStyle] = useState({
    width: 0,
    height: 0,
    url: "",
  });

  let { canvas: myCanvas, context: myContext, image: myImage } = props;

  const { filters, showOverlay } = useSelector((state) => state.image);
  let filter = filters.join(" ");

  const dispatch = useDispatch();

  const canvasFilter = {
    WebkitFilter: `${filter}`,
  };

  const Overlay = styled.div`
    background: url(${overlayStyle.url}) no-repeat;
    width: ${overlayStyle.width}px;
    height: ${overlayStyle.height}px;
    ${({ active }) =>
      active &&
      `
    display: block
  `}
    ${({ active }) =>
      !active &&
      `
    display: none
  `}
  `;

  const changeHandler = (e) => {
    if (e.target.files) {
      //get image file
      let imageFile = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        // Assigns converted image to image object
        myImage.src = e.target.result;
        myImage.onload = function (e) {
          myCanvas = canvasRef.current;
          myContext = myCanvas.getContext("2d");
          let canvasUrl = myCanvas.toDataURL();
          // Assigns image's width to canvas
          myCanvas.width = myImage.width;
          // Assigns image's height to canvas
          myCanvas.height = myImage.height;
          // Draws the image on canvas
          myContext.drawImage(myImage, 0, 0);
          let imageUrl = URL.createObjectURL(imageFile);
          setOverlayStyle({
            width: myImage.width,
            height: myImage.height,
            url: imageUrl,
          });

          let imageName = imageFile.name;
          dispatch(uploadImg({ imageName, canvasUrl }));
        };
      };
    }
  };

  return (
    <section className='col-md-7'>
      <div className='custom-file mb-1 text-center'>
        <input type='file' className='custom-file__input' onChange={changeHandler} />
        <label for='' className='custom-file__label'></label>
      </div>
      <div className={styles["image-container"]}>
        <canvas ref={canvasRef} className='canvas' id='canvas'></canvas>
        <Overlay active={showOverlay} id='overlay' className={styles.overlay} style={canvasFilter}></Overlay>
      </div>
      {/* <img src={imageUrl} alt="img" ref={canvasRef} style={{filter: `${filter}`}} /> */}
    </section>
  );
};

export default ImageSection;
