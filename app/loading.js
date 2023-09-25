import React from "react";
import loadingGif from "./loader_bubbles.png";
import Image from "next/image";
import styles from "./loading.module.css";

const Loader = () => {
  return (
    <Image src={loadingGif} alt="loading indicator" className={styles.loader} />
  );
};

export default Loader;
