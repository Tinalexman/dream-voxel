

export const defaultVertexShader = `
  attribute vec3 position;

  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

export const defaultFragmentShader = `
  precision mediump float;

  uniform vec4 color;

  void main() {
    gl_FragColor = color;
  }
`;