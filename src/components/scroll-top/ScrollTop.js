import React from "react";

import "./ScrollTop.css";

// import "./scrollTopButton";

const ScrollTop = () => {
    return (
        <button title="Наверх" id="scroll__top" onClick={() => {
            window.scrollTo({top: 0, behavior: 'smooth'})
        }}></button>
    )
};

export default ScrollTop;
