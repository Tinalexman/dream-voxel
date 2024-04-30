import Engine from "@/engine/engine";
import ResourceManager from "@/engine/utils/resources";
import { create } from "zustand";

type GlobalConfig = {
  gl: WebGL2RenderingContext | null;
  canvasSize: number[];
  gridSize : number;
  engine: Engine | null;
  resourceManager: ResourceManager;
};

export const useGlobalStore = create<GlobalConfig>((set) => ({
  gl: null,
  canvasSize: [0.0, 0.0],
  gridSize: 2,
  engine: null,
  resourceManager: new ResourceManager(),
}));

export function getGL() {
  return useGlobalStore.getState().gl;
}

export function getDimesions() {
  return useGlobalStore.getState().canvasSize;
}


export function getGridSize() {
  return useGlobalStore.getState().gridSize;
}