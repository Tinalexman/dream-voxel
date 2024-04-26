import Mesh from "@/engine/objects/mesh";
import { useGlobalStore } from "@/store/useGlobalStore";

import { getGL } from "@/store/useGlobalStore";

class Engine {
  initialize = () => {
    let gl: WebGL2RenderingContext = getGL()!;

    let shader = useGlobalStore.getState().resourceManager.getDefaultShader();
    shader.loadVec4("color", 0.1, 0.3, 0.5, 1.0);

    const vertices = new Float32Array([
      0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, 0.5, -0.5, 0.0, -0.5, 0.5,
      0.0, -0.5, -0.5, 0.0,
    ]);

    let mesh: Mesh = new Mesh(gl, vertices, shader);
  };

  render = () => {
    let gl: WebGL2RenderingContext = getGL()!;

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
}

export default Engine;
