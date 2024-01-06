"use client"

import { useEffect } from "react";

export default function app() {
    useEffect(() => {
        console.log("렌더링");
    }, []);
    return (
        <>
            <svg width={500} height={500}></svg>
        </>
    );
}
