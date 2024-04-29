

export const defaultVertexShader = `
  attribute vec3 position;
  uniform mat4 transformation;
  uniform mat4 view;

  void main() {
    gl_Position = view * transformation * vec4(position, 1.0);
  }
`;

export const defaultFragmentShader = `
  precision mediump float;

  uniform vec4 color;

  void main() {
    gl_FragColor = color;
  }
`;