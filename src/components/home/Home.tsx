"use client";

import React, { useRef, useEffect } from "react";

import { useGlobalStore } from "@/store/useGlobalStore";
import Engine from "@/engine/engine";

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (useGlobalStore.getState().gl === null) {
      const canvas = canvasRef.current;
      const gl = canvas?.getContext("webgl2");

      if (!gl || gl === null || gl === undefined) {
        console.error("WebGL2 not supported");
        return;
      } else {
        let w = window.innerWidth,
          h = window.innerHeight;

        useGlobalStore.setState({ canvasSize: [w * 0.6, h * 0.8] });
        useGlobalStore.setState({ gl: gl });

        const engine: Engine = new Engine(gl);
        useGlobalStore.setState({engine: engine});

        let handlers = engine.getInputHandlers();
        window.addEventListener('keydown', handlers[0]);
        window.addEventListener('keyup', handlers[1]);
        
        engine.start();
      }
    }
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] relative">
      <canvas
        ref={canvasRef}
        className="w-[60vw] h-[80vh] absolute left-[20vw] top-[10vh]"
      >
        Your browser does not support WEBGL2
      </canvas>
    </div>
  );
};

export default Home;
