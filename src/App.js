import { useEffect, useState } from "react";
import Buttons from "./components/Buttons";
import Filters from "./components/Filters";
import Header from "./components/Header";
import ImageSection from "./components/ImageSection";


function App() {
  const [canvas, setCanvas] = useState(null)
  const [context, setContext] = useState(null)
  const [overlay, setOverlay] = useState(null)
  const image = new Image()

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const overlay = document.getElementById('overlay')
    let context = canvas.getContext('2d')
    setCanvas(canvas)
    setContext(context)
    setOverlay(overlay)
  },[])

  return (
    <>
      <Header />
      <div className="row content-container justify-content-between">
        <Filters context={context} canvas={canvas} image={image}/>
        <ImageSection canvas={canvas} context={context} image={image}/>
      </div>
      <Buttons canvas={canvas} context={context} image={image} overlay={overlay}/>
    </>
  );
}

export default App;
