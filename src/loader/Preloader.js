import React from 'react';
import spinner from "./img/spinner.gif";
const Preloader = () => {
    return (
        <div>
            <img src={spinner} alt="" />
        </div>
    );
};

export default Preloader;