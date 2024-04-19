import {
  defaultVertexShader,
  defaultFragmentShader,
} from "@/res/shaders/defaultShaders";

import Shader from "@/engine/shader/shader";

class Engine {
  gl: WebGL2RenderingContext | null;

  constructor() {
    this.gl = null;
  }

  initialized = () => {
    return this.gl !== null;
  };

  context = () => {
    return this.gl!;
  };

  initialize = (gl: WebGL2RenderingContext) => {
    this.gl = gl;

    let shader = new Shader(defaultVertexShader, defaultFragmentShader);

    

    const vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

    const vertexBuffer = gl.createBuffer();
    this.gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(shader.getProgram(), "position");
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
    this.gl.clear(gl.COLOR_BUFFER_BIT);

    this.gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
}

export default Engine;
