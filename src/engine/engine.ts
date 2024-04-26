import Mesh from "@/engine/objects/mesh";
import { useGlobalStore } from "@/store/useGlobalStore";

import { getGL } from "@/store/useGlobalStore";
import { Vec4 } from "gl-matrix";

class Engine {
  mesh1: Mesh | null;
  mesh2: Mesh | null;

  constructor() {
    this.mesh1 = null;
    this.mesh2 = null;
  }

  initialize = () => {
    let gl: WebGL2RenderingContext = getGL()!;

    let shader = useGlobalStore.getState().resourceManager.getDefaultShader();

    const rectangle = new Float32Array([
      0.2, 0.2, 0.0, -0.2, 0.2, 0.0, 0.2, -0.2, 0.0, 0.2, -0.2, 0.0, -0.2, 0.2,
      0.0, -0.2, -0.2, 0.0,
    ]);

    const triangle = new Float32Array([
      0.0, -0.4, 0.0, -0.2, -0.6, 0.0, 0.2, -0.6, 0.0,
    ]);

    this.mesh1 = new Mesh(gl, rectangle, shader);
    this.mesh2 = new Mesh(gl, triangle, shader);
  };

  render = () => {
    let gl: WebGL2RenderingContext = getGL()!;

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.mesh1?.loadUniform4("color", new Vec4(0.1, 0.2, 0.3, 1.0));
    this.mesh1!.draw();

    this.mesh2?.loadUniform4("color", new Vec4(1.0));
    this.mesh2!.draw();
  };
}

export default Engine;
