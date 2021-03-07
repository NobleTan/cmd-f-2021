import { useEffect, useRef, useState } from "react";
import { getPresetCharacter } from "../api/maplestoryAPI";
import { getMap } from "../api/maplestoryAPI";
import styles from "../css/Canvas.module.css";
import DialogueBox from "../components/DialogueBox";

const Canvas = ({ backgroundList, characterList }) => {
  const canvas = useRef();
  const [characters, setCharacters] = useState([]);
  const [dialogueBox, setDialogueBox] = useState({});
  const [showDialogueBox, setShowDialogueBox] = useState(false);
  const [dimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const clear = () => {
    const c = canvas.current;
    c.getContext("2d").clearRect(0, 0, c.width, c.height);
  };

  useEffect(() => {
    clear();
  }, []);

  useEffect(() => {
    const canv = canvas?.current;
    if (!canv) return;

    const ctx = canv.getContext("2d");
    drawErrthang(ctx);
  }, []);

  async function drawErrthang(ctx) {
    // LOAD BACKGROUND
    await getBackground(ctx);
    // LOAD ALL CHARACTERS
    let initChars = [];
    characterList.forEach(async (character) => {
      let blob = await getPresetCharacter(character.url);
      var img = new Image();

      img.onload = function () {
        ctx.drawImage(img, character.xLoc, character.yLoc);
        initChars.push({
          characterimg: img,
          xLoc: character.xLoc,
          yLoc: character.yLoc,
          name: character.name,
          info: character.info,
        });
      };
      img.src = blob;
    });
    setCharacters(initChars);
  }

  let clickHandler = (event) => {
    event.preventDefault();
    var x;
    var y;
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x =
        event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    // x -= gCanvasElement.offsetLeft;
    // y -= gCanvasElement.offsetTop;
    if (showDialogueBox) {
      setShowDialogueBox(false);
    }

    characters.forEach(async (character) => {
      if (
        x > character.xLoc &&
        x < character.xLoc + character.characterimg.width &&
        y > character.yLoc &&
        y < character.yLoc + character.characterimg.height
      ) {
        // IMAGE SELECTED
        setShowDialogueBox(true);
        setDialogueBox({ ...character, img: character.characterimg.src });
      }
    });
  };

  function getBackground(ctx) {
    return new Promise((resolve, reject) => {
      // LOAD BACKGROUND
      let xShift = 0;
      var background = new Image();

      background.onload = function () {
        var hRatio = background.width;
        var vRatio = dimensions.height / background.height;
        var ratio = Math.min(hRatio, vRatio);
        ctx.drawImage(
          background,
          0,
          0,
          background.width,
          background.height,
          xShift,
          0,
          background.width * ratio,
          background.height * ratio
        );
        resolve(this);
        xShift += background.width * ratio;
      };
      background.src = process.env.PUBLIC_URL + "/bckg.png";
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.whiteboard}>
        {showDialogueBox ? (
          <DialogueBox
            name={dialogueBox.name}
            dialogue={dialogueBox.info}
            character={dialogueBox.img}
          ></DialogueBox>
        ) : null}
        <canvas
          width="16000px"
          height={dimensions.height}
          ref={canvas}
          className={styles.canvas}
          onClick={clickHandler}
        ></canvas>
      </div>
    </div>
  );
};

export default Canvas;
