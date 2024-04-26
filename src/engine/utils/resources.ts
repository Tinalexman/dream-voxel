import {
  defaultVertexShader,
  defaultFragmentShader,
} from "@/res/shaders/defaultShaders";

import Shader from "@/engine/shader/shader";
import { getGL } from "@/store/useGlobalStore";

class ResourceManager {
  defaultShader: Shader | null;

  constructor() {
    this.defaultShader = null;
  }

  getDefaultShader = () => {
    if (this.defaultShader === null) {
      let gl: WebGL2RenderingContext = getGL()!;
      this.defaultShader = new Shader(
        gl,
        defaultVertexShader,
        defaultFragmentShader
      );
    }
    return this.defaultShader;
  };
}

export default ResourceManager;
