import { Vec4 } from "gl-matrix";
import Shader from "../shader/shader";
import VBO from "./buffers/vbo";
import Transform from "./transform";

class Mesh {
  #shader: Shader;
  #transform: Transform;
  #verticesVBO: VBO;

  constructor(
    gl: WebGL2RenderingContext,
    vertices: Float32Array,
    shader: Shader,
    transform: Transform
  ) {
    this.#shader = shader;
    this.#transform = transform;

    const position = gl.getAttribLocation(
      this.#shader.getProgram(),
      "position"
    );
    this.#verticesVBO = new VBO(gl, vertices, position, 3);
  }

  getShader = () => {
    return this.#shader;
  };

  getTransform = () => {
    return this.#transform;
  }

  start = () => {
    this.#verticesVBO.start();
  };

  count = () => {
    return this.#verticesVBO.length();
  };

  stop = () => {
    this.#verticesVBO.stop();
  };
}

export default Mesh;
