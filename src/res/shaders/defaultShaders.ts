

export const defaultVertexShader = `
  attribute vec3 position;
  // attribute vec2 texCoords;
  uniform mat4 transformation;
  uniform mat4 view;

  // varying vec2 textureCoords;

  void main() {
    gl_Position = view * transformation * vec4(position, 1.0);
    // textureCoords = texCoords;
  }
`;

export const defaultFragmentShader = `
  precision mediump float;

  uniform vec4 color;

  void main() {
    gl_FragColor = color;
  }
`;