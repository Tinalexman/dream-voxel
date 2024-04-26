class VBO {
  #gl: WebGL2RenderingContext;
  #buffer: WebGLBuffer | null;
  #location: number;

  constructor(gl: WebGL2RenderingContext, data: Float32Array, location: number, size: number) {
    this.#gl = gl;
    this.#location = location;
    this.#buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.#buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(this.#location);
    gl.vertexAttribPointer(this.#location, size, gl.FLOAT, false, 0, 0);
  }

  start = () => {};
}

export default VBO;
