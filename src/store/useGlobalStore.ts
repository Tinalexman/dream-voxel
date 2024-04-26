import Engine from "@/engine/engine";
import ResourceManager from "@/engine/utils/resources";
import { create } from "zustand";

type GlobalConfig = {
  gl: WebGL2RenderingContext | null;
  engine: Engine;
  resourceManager: ResourceManager;
};

export const useGlobalStore = create<GlobalConfig>((set) => ({
  gl: null,
  engine: new Engine(),
  resourceManager: new ResourceManager(),
}));


export function getGL() {
  return useGlobalStore.getState().gl;
}