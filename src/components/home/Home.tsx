"use client";

import React, { useRef, useEffect } from "react";

import { useGlobalStore } from "@/store/useGlobalStore";

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!useGlobalStore.getState().engine.initialized()) {
      const canvas = canvasRef.current;
      const gl = canvas?.getContext("webgl2");

      if (!gl || gl === null || gl === undefined) {
        console.error("WebGL2 not supported");
        return;
      } else {
        useGlobalStore.getState().engine.initialize(gl);
      }
    }
  }, []);

  return (
    <canvas ref={canvasRef} className="w-[100vw] h-[100vh]">
      Your browser does not support WEBGL2
    </canvas>
  );
};

export default Home;
