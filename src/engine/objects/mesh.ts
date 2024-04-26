import Shader from "../shader/shader";
import VBO from "./buffers/vbo";

class Mesh {
  #gl: WebGL2RenderingContext;
  #shader: Shader;
  #verticesVBO: VBO;

  constructor(gl: WebGL2RenderingContext, vertices: Float32Array, shader: Shader) {
    this.#shader = shader;
    this.#gl = gl;

    const position = gl.getAttribLocation(this.#shader.getProgram(), "position");
    this.#verticesVBO = new VBO(gl, vertices, position, 3);
  }

  draw = () => {
    this.#shader.start();
    this.#verticesVBO.start();

    this.#shader.stop();
  };
}

export default Mesh;
