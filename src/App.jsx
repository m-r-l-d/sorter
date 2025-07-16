import { useEffect, useState, useRef } from "react";
import "./App.css";
import { generate } from "./sort";
import test from "./assets/test.png";

function ImageWrapper(props) {
  const { loading, canvasRef } = props;
  // const width = image ? image.width : 250;
  // const height = image ? image.height : 250;
  return (
    <div className="image-wrapper">
      {loading && <p>Loading...</p>}
      {/* {image && <img className="image" src={image} />} */}
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [rand, setRand] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [opt1, setOpt1] = useState("h");
  const [opt2, setOpt2] = useState("l");
  const [opt3, setOpt3] = useState("g");
  const canvasRef = useRef(null);

  // load source image
  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      setLoading(true);
      const fr = new FileReader();
      fr.onload = () => {
        let img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(img, 0, 0);
        };
        img.onerror = () => {
          console.error('Error loading image');
        }
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
      setLoading(false);
    }
  }, [file]);

  const sortImage = async () => {
    setLoading(true);
    setFile(await generate(rand, opt1, opt2, opt3, ratio));
    setLoading(false);
  };

  const randomizeOpts = () => {
    const checkArr = [true, false];
    const optsArr = ["l", "h", "s", "r", "g", "b", "rand", "n"];

    setRand(checkArr[Math.floor(Math.random() * checkArr.length)]);
    setOpt1(optsArr[Math.floor(Math.random() * optsArr.length)]);
    setOpt2(optsArr[Math.floor(Math.random() * optsArr.length)]);
    setOpt3(optsArr[Math.floor(Math.random() * optsArr.length)]);
  };

  return (
    <>
      <div>
        <h1>Sorter</h1>
        <p className="subheader">
          Throw pixels into a virtual meatgrinder and see what comes out.
        </p>
        <p className="subheader">
          Select options and hit GO to generate an image!
        </p>
      </div>
      <div className="container">
        <div className="canvas-tools">
          <h2>canvas tools</h2>

          <input
            type="file"
            id="fileInput"
            accept="image/png"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div>load image</div>
          <div>load image</div>
        </div>
        <div className="sort-tools">
          <h2>sort tools</h2>
          <div className="select-wrapper">
            <label>Sort options</label>
            <select
              name="option1"
              value={opt1}
              onChange={(e) => setOpt1(e.target.value)}
            >
              <option value="l">L</option>
              <option value="h">H</option>
              <option value="s">S</option>
              <option value="r">R</option>
              <option value="g">G</option>
              <option value="b">B</option>
              <option value="rand">Random</option>
              <option value="n">None</option>
            </select>
            <select
              name="option2"
              value={opt2}
              onChange={(e) => setOpt2(e.target.value)}
            >
              <option value="l">L</option>
              <option value="h">H</option>
              <option value="s">S</option>
              <option value="r">R</option>
              <option value="g">G</option>
              <option value="b">B</option>
              <option value="rand">Random</option>
              <option value="n">None</option>
            </select>
            <select
              name="option3"
              value={opt3}
              onChange={(e) => setOpt3(e.target.value)}
            >
              <option value="l">L</option>
              <option value="h">H</option>
              <option value="s">S</option>
              <option value="r">R</option>
              <option value="g">G</option>
              <option value="b">B</option>
              <option value="rand">Random</option>
              <option value="n">None</option>
            </select>
          </div>
          <hr />
          <div style={{ display: "block", margin: "1em 0 0 0" }}>
            <label style={{ display: "block" }}>
              <input
                type="range"
                min="0.2"
                max="1"
                step=".05"
                value={ratio}
                onChange={(e) => setRatio(e.target.value)}
              />
              W / H : {ratio}
            </label>
            <label style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={rand}
                onChange={() => setRand(!rand)}
                style={{ marginRight: "1em" }}
              />
              Randomize before sorting
            </label>
          </div>
          <div style={{ alignContent: "center" }}>
            <button
              onClick={() => randomizeOpts()}
              style={{ display: "block", margin: "0 0 1em 0" }}
            >
              Randomize
            </button>
            <button onClick={() => sortImage()} style={{ display: "block" }}>
              GO!
            </button>
          </div>
        </div>
        <div className="image-container">
          <h2>image container</h2>
          <ImageWrapper loading={loading} canvasRef={canvasRef} />
        </div>
      </div>
    </>
  );
}

export default App;
