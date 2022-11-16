import React, {useState} from "react";

import "./ScrollTop.css";

const ScrollTop = ({displayAfter}) => {
  const [showButton, setShowButton] = useState(false);
  const handleShowButton = () => {
    const scrolled = document.documentElement.scrollTop;
    const documentHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const partBeforeFooter = documentHeight - document.documentElement.clientHeight - 80;
    if (scrolled > displayAfter && scrolled < partBeforeFooter) {
      setShowButton(true)
    } else if (scrolled <= displayAfter || scrolled >= partBeforeFooter) {
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
