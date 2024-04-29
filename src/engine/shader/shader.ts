import { Vec2, Vec3, Vec4, Mat4 } from "gl-matrix";

class Shader {
  #gl: WebGL2RenderingContext;
  #program: WebGLProgram;

  #locations: WebGLUniformLocation[];
  #names: string[];

  constructor(
    gl: WebGL2RenderingContext,
    vertexSource: string,
    fragmentSource: string
  ) {
    this.#gl = gl;

    const vertexShader = this.#loadShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.#loadShader(gl.FRAGMENT_SHADER, fragmentSource);

    this.#program = gl.createProgram() as WebGLProgram;

    gl.attachShader(this.#program, vertexShader);
    gl.attachShader(this.#program, fragmentShader);
    gl.linkProgram(this.#program);

    if (!gl.getProgramParameter(this.#program, gl.LINK_STATUS)) {
      throw new Error("Error linking shader");
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    gl.useProgram(this.#program);

    this.#locations = [];
    this.#names = [];
  }

  getProgram = () => {
    return this.#program;
  };

  start = () => {
    this.#gl.useProgram(this.#program);
  };

  stop = () => {
    this.#gl.useProgram(null);
  };

  #loadShader = (type: number, source: string) => {
    const shader = this.#gl.createShader(type) as WebGLShader;
    this.#gl.shaderSource(shader, source);
    this.#gl.compileShader(shader);
    if (!this.#gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS)) {
      throw new Error(
        "A shader compiling error occurred: " +
          this.#gl.getShaderInfoLog(shader)
      );
    }
    return shader;
  };

  #location = (name: string) => {
    let index = this.#names.indexOf(name);
    if (index === -1) return null;

    return this.#locations[index];
  };

  loadMat4 = (name: string, matrix: Mat4) => {
    let location: WebGLUniformLocation | null = this.#location(name);
    if (location === null) {
      throw new Error(`Invalid uniform name ${name}`);
    } else {
      this.#gl.uniformMatrix4fv(location, false, matrix);
    }
  };

  loadVec4 = (name: string, vector: Vec4) => {
    let location: WebGLUniformLocation | null = this.#location(name);
    if (location === null) {
      throw new Error(`Invalid uniform name ${name}`);
    } else {
      this.#gl.uniform4f(location, vector.x, vector.y, vector.z, vector.w);
    }
  };

  loadVec3 = (name: string, vector: Vec3) => {
    let location: WebGLUniformLocation | null = this.#location(name);
    if (location === null) {
      throw new Error(`Invalid uniform name ${name}`);
    } else {
      this.#gl.uniform3f(location, vector.x, vector.y, vector.z);
    }
  };

  loadVec2 = (name: string, vector: Vec2) => {
    let location: WebGLUniformLocation | null = this.#location(name);
    if (location === null) {
      throw new Error(`Invalid uniform name ${name}`);
    } else {
      this.#gl.uniform2f(location, vector.x, vector.y);
    }
  };

  loadFloat = (name: string, val: number) => {
    let location: WebGLUniformLocation | null = this.#location(name);
    if (location === null) {
      throw new Error(`Invalid uniform name ${name}`);
    } else {
      this.#gl.uniform1f(location, val);
    }
  };

  storeUniform = (names: string[]) => {
    for (let i = 0; i < names.length; ++i) {
      let name = names[i];
      let location = this.#gl.getUniformLocation(this.#program, name);
      if (location === null) return;

      this.#locations.push(location);
      this.#names.push(name);
    }
  };
}

export default Shader;
