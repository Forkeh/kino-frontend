import React from "react";

interface Props {
    color: string;
    width?: string;
}

export default function EdgeFadeGradient({ color, width }: Props) {

    const setWidth = width ? width : "w-full";

    return (
        <div className={`pointer-events-none absolute z-10 flex h-full ${setWidth} justify-between`}>
            <div className={`pointer-events-none z-10 h-full w-5 bg-gradient-to-r ${color} via-10%`}></div>
            <div className={`pointer-events-none z-10 h-full w-5 bg-gradient-to-l ${color} via-10%`}></div>
        </div>
    );
}
