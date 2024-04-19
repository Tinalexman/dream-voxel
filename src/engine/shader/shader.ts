import { useGlobalStore } from "@/store/useGlobalStore";

class Shader {
  program: WebGLProgram;
  uniforms: {key: string, value: any}[];

  constructor(vertexSource: string, fragmentSource: string) {
    const gl: WebGL2RenderingContext = useGlobalStore
      .getState()
      .engine.context();

    const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;

    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    this.program = gl.createProgram() as WebGLProgram;

    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);
    gl.useProgram(this.program);

    this.uniforms = [];
  }


  getProgram = () => {
    return this.program;
  }
}

export default Shader;
