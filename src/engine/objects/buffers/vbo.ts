class VBO {
  #gl: WebGL2RenderingContext;
  #buffer: WebGLBuffer | null;
  #location: number;
  #length: number;

  constructor(
    gl: WebGL2RenderingContext,
    data: Float32Array,
    location: number,
    size: number
  ) {
    this.#gl = gl;
    this.#location = location;
    this.#buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.#buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    this.#length = data.length / size;

    gl.vertexAttribPointer(this.#location, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.#location);
  }

  length = () => {
    return this.#length;
  };

  start = () => {
    this.#gl.enableVertexAttribArray(this.#location);
  };

  stop = () => {
    this.#gl.disableVertexAttribArray(this.#location);
  }
}

export default VBO;
