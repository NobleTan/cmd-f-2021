import { useEffect, useRef, useState } from "react";
import { getPresetCharacter } from "../api/maplestoryAPI";
import { getMap } from "../api/maplestoryAPI";
import styles from "../css/Canvas.module.css";

const Canvas = ({ backgroundUrl, characterList }) => {
  const canvas = useRef();
  const [characters, setCharacters] = useState([]);
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

    // LOAD BACKGROUND
    getBackground(ctx);

    // LOAD ALL CHARACTERS
    characterList.forEach(async (character) => {
      console.log(character);
      let blob = await getPresetCharacter(character.url);
      var img = new Image();
      img.src = blob;
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
      };
      setCharacters((character) => [...characters, character]);
    });
  }, []);

  let getBackground = async (ctx) => {
    // LOAD BACKGROUND
    let bkgBlob = await getMap(backgroundUrl);
    var background = new Image();
    background.src = bkgBlob;
    background.onload = function () {
      ctx.drawImage(background, 0, 60);
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.whiteboard}>
        <canvas
          width={dimensions.width}
          height={dimensions.height}
          ref={canvas}
          className={styles.canvas}
        ></canvas>
      </div>
    </div>
  );
};

export default Canvas;
