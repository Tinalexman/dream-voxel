"use client";

import React, { useRef, useEffect } from "react";

import { initializeEngine } from "@/engine/core/engine";

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    initializeEngine(canvasRef);
  }, []);
  

  return <canvas ref={canvasRef} />;
};

export default Home;
