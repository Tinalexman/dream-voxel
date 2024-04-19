import Engine from "@/engine/core/engine";
import { create } from "zustand";

type GlobalConfig = {
  engine: Engine;
};

export const useGlobalStore = create<GlobalConfig>((set) => ({
  engine: new Engine(),
}));
