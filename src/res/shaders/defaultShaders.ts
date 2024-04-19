

export const defaultVertexShader = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`;

export const defaultFragmentShader = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;