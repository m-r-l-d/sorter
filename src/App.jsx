import { useState, useRef } from "react";
import "./App.css";
import { sort } from "./sort";

const checkArr = [true, false];
const optsArr = ["l", "h", "s", "r", "g", "b", "rand"];
const initialSteps = [
  {
    step: 1,
    direction: "horiz",
    option: "l",
  },
  {
    step: 2,
    direction: "vert",
    option: "g",
  },
];

function ImageWrapper(props) {
  const { loading, canvasRef } = props;
  return (
    <div className="image-wrapper">
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const [rand, setRand] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [selectionSteps, setSelectionSteps] = useState(initialSteps);
  const canvasRef = useRef(null);

  function handleLoadImage(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
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
          console.error("Error loading image");
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    }
  }

  const sortImage = async (newSteps) => {
    setLoading(true);
    let canvas = canvasRef.current;
    if (newSteps) { // this fixes desync with updating selection state from randomize function
      await sort(canvas, rand, newSteps, ratio);
    } else {
      await sort(canvas, rand, selectionSteps, ratio);
    }
    setLoading(false);
  };

  const randomizeOpts = async () => {
    let newSteps = [
      {
        step: 1,
        direction: "horiz",
        option: optsArr[Math.floor(Math.random() * optsArr.length)],
      },
    ];

    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
      newSteps = [
        ...newSteps,
        {
          step: newSteps.length + 1,
          direction:
            newSteps[newSteps.length - 1].direction === "horiz"
              ? "vert"
              : "horiz",
          option: optsArr[Math.floor(Math.random() * optsArr.length)],
        },
      ];
    }
    setSelectionSteps(newSteps);
    sortImage(newSteps);
  };

  const addStep = () => {
    if (selectionSteps.length < 4) {
      setSelectionSteps([
        ...selectionSteps,
        {
          step: selectionSteps.length + 1,
          direction:
            selectionSteps[selectionSteps.length - 1].direction === "horiz"
              ? "vert"
              : "horiz",
          option: optsArr[Math.floor(Math.random() * optsArr.length)],
        },
      ]);
    }
  };

  const removeStep = (item) => {
    let newSteps = selectionSteps.filter((s) => s.step !== item.step);
    for (let i = 0; i < newSteps.length; i++) {
      newSteps[i].step = i + 1;
    }

    setSelectionSteps(newSteps);
  };

  const updateDirection = async (index, newValue) => {
    setSelectionSteps(
      selectionSteps.map((step) => {
        if (step.step === index) {
          return { ...step, direction: newValue };
        } else {
          return step;
        }
      })
    );
  };

  const updateOption = async (index, newValue) => {
    setSelectionSteps(
      selectionSteps.map((step) => {
        if (step.step === index) {
          return { ...step, option: newValue };
        } else {
          return step;
        }
      })
    );
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
            accept="image/png, image/jpeg"
            onChange={handleLoadImage}
          />
          {/* <label style={{ display: "block" }}>
            <input
              type="range"
              min="0.2"
              max="1"
              step=".05"
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
            />
            W / H : {ratio}
          </label> */}
        </div>
        <div className="sort-tools">
          <h2>sort tools</h2>
          <div className="select-wrapper">
            <label>Sort options</label>
            <label style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={rand}
                onChange={() => setRand(!rand)}
                style={{ marginRight: "1em" }}
              />
              Randomize pixels before sorting
            </label>
          </div>
          <hr />
          <div style={{ alignContent: "center" }}>
            <button onClick={() => sortImage()} style={{ display: "block" }}>
              Sort with selected options
            </button>
            <button
              onClick={() => randomizeOpts()}
              style={{ display: "block", margin: "0 0 1em 0" }}
            >
              Sort with random options
            </button>
            {loading && <p>Loading...</p>}

            <div>
              New UI test section Sorting steps
              {selectionSteps.map((item) => {
                return (
                  <div>
                    {selectionSteps.length > 1 && (
                      <button onClick={() => removeStep(item)}>x</button>
                    )}
                    <select
                      key={`${item.direction}${item.step}`}
                      name={`${item.direction}${item.step}`}
                      value={item.direction}
                      onChange={(e) =>
                        updateDirection(item.step, e.target.value)
                      }
                    >
                      <option value="vert">Vertical</option>
                      <option value="horiz">Horizontal</option>
                    </select>
                    <select
                      key={`${item.option}${item.step}`}
                      name={`${item.option}${item.step}`}
                      value={item.option}
                      onChange={(e) => updateOption(item.step, e.target.value)}
                    >
                      <option value="l">L</option>
                      <option value="h">H</option>
                      <option value="s">S</option>
                      <option value="r">R</option>
                      <option value="g">G</option>
                      <option value="b">B</option>
                      <option value="rand">Random</option>
                    </select>
                  </div>
                );
              })}
              {selectionSteps.length < 4 && (
                <button onClick={addStep}>add step</button>
              )}
            </div>
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
