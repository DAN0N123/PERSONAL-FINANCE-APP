import React from "react";

interface SpinnerTypes {
    color: String;
}

export default function Spinner({color}: SpinnerTypes) {
    return(
        <div className="chaotic-orbit" style={{ '--uib-color': color } as React.CSSProperties}></div>
    )
}

