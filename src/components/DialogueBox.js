import styles from "../css/Dialogue.module.css";

const DialogueBox = ({ character, name, dialogue, link }) => {
  let click = () => {
    console.log("nice");
  };
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <img className={styles.img} src={character} alt="character"></img>
        <p onClick={() => window.open(link, "_blank")} className={styles.name}>
          {name}
        </p>
      </div>
      <div className={styles.dialogue_wrapper}>
        <p className={styles.dialogue}>{dialogue}</p>
      </div>
    </div>
  );
};

export default DialogueBox;
