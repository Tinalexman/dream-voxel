import { Vec4 } from "gl-matrix";
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

  loadUniform4 = (name: string, vector: Vec4) => {
    this.#shader.start();
    this.#shader.loadVec4(name, vector);
  }

  draw = () => {
    this.#shader.start();
    this.#verticesVBO.start();
    this.#gl.drawArrays(this.#gl.TRIANGLES, 0, this.#verticesVBO.length());
    this.#verticesVBO.stop();
    this.#shader.stop();
  };
}

export default Mesh;
