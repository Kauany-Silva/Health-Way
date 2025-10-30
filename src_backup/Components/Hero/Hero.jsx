import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import heroVideo from "../../Assets/Videos/hero.mp4";

const Hero = () => {
  const text = "Caminhando pelo seu bem-estar";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = deleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!deleting && index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        setIndex(index + 1);
      } else if (deleting && index > 0) {
        setDisplayedText(text.slice(0, index - 1));
        setIndex(index - 1);
      } else if (index === text.length) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (index === 0 && deleting) {
        setDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, deleting, text]);

  return (
    <section className={styles.hero}>
      <video autoPlay loop muted playsInline className={styles.videoBg}>
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className={styles.overlay}>
        <h1>Health Way</h1>
        <h2 className={styles.slogan}>
          {displayedText}
          <span className={styles.cursor}>|</span>
        </h2> 
         <Link to="/cadastro" className={styles.botao}>
          Comece Agora
        </Link>
      </div>
    </section>
  );
};

export {Hero};
