import Camera2D from "../camera/camera2d";
import Mesh from "../objects/mesh";


class Renderer {
  #gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext) {
    this.#gl = gl;
  }

  render = (mesh: Mesh | null, camera : Camera2D) => {
    if (mesh === null) return;

    let transform = mesh.getTransform();
    let shader = mesh.getShader();
    shader.loadMat4("transformation", transform.getMatrix());
    shader.loadMat4("view", camera.getView());

    mesh.start();
    this.#gl.drawArrays(this.#gl.TRIANGLE_STRIP, 0, mesh.count());
    mesh.stop();
  };
}

export default Renderer;
