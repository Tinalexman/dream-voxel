
class Shader {
  #gl: WebGL2RenderingContext;
  #program: WebGLProgram;

  constructor(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string) {
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
        "A shader compiling error occurred: " + this.#gl.getShaderInfoLog(shader)
      );
    }
    return shader;
  };

  #location = (name: string) => {
    return this.#gl.getUniformLocation(this.#program, name);
  };

  loadVec4 = (name: string, x: number, y: number, z: number, w: number) => {
    const location: WebGLUniformLocation | null = this.#location(name);
    if (location !== null) {
      this.#gl.uniform4f(location, x, y, z, w);
    } else {
      throw new Error(`Invalid uniform '${name}'`);
    }
  };

  loadVec3 = (name: string, x: number, y: number, z: number) => {
    const location: WebGLUniformLocation | null = this.#location(name);
    if (location !== null) {
      this.#gl.uniform3f(location, x, y, z);
    } else {
      throw new Error(`Invalid uniform '${name}'`);
    }
  };

  loadVec2 = (name: string, x: number, y: number) => {
    const location: WebGLUniformLocation | null = this.#location(name);
    if (location !== null) {
      this.#gl.uniform2f(location, x, y);
    } else {
      throw new Error(`Invalid uniform '${name}'`);
    }
  };

  loadFloat = (name: string, val: number) => {
    const location: WebGLUniformLocation | null = this.#location(name);
    if (location !== null) {
      this.#gl.uniform1f(location, val);
    } else {
      throw new Error(`Invalid uniform '${name}'`);
    }
  };
}

export default Shader;
