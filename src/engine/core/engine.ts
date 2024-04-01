import { MutableRefObject } from "react";

const vertexShaderSource = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`;

const fragmentShaderSource = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
`;

export function initializeEngine(ref: MutableRefObject<null | HTMLCanvasElement>) {
  const canvas = ref.current;
  const gl = canvas?.getContext("webgl");

  if (!gl || gl === null || gl === undefined) {
    console.error("WebGL not supported");
    return;
  }

  const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
  
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)  as WebGLShader;
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram() as WebGLProgram;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);


  const vertices = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5,
  ]);
  
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
  const positionLocation = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  
  

  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
}
