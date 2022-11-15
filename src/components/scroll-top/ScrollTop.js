import React, {useState} from "react";

import "./ScrollTop.css";

const ScrollTop = ({displayAfter}) => {
  const [showButton, setShowButton] = useState(false);
  const handleShowButton = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > displayAfter) {
      setShowButton(true)
    } else if (scrolled <= displayAfter) {
      setShowButton(false)
    }
  };
  window.addEventListener("scroll", handleShowButton);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  };

  return showButton ? (
    <button title="Наверх" id="scroll__top" onClick={() => {
      scrollToTop();
    }}/>
  ) : "";
};

export default ScrollTop;
