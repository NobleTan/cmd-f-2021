import styles from "../css/Landing.module.css";

const Landing = ({ setLanding }) => {
  let click = () => {
    setLanding(false);
  };
  return (
    <div className={styles.root}>
      <div onClick={click} className={styles.button}></div>
      <img
        className={styles.img}
        src={process.env.PUBLIC_URL + "/Homescreen.png"}
      ></img>
    </div>
  );
};

export default Landing;
