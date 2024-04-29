import Mesh from "@/engine/objects/mesh";
import {
  getDimesions,
  getGridSize,
  useGlobalStore,
} from "@/store/useGlobalStore";
import { Vec2, Vec4 } from "gl-matrix";
import Renderer from "./renderer/renderer";
import Transform from "./objects/transform";
import Camera2D from "./camera/camera2d";

class Engine {
  #mesh1: Mesh | null;
  #mesh2: Mesh | null;

  #renderer: Renderer;
  #camera: Camera2D;
  #gl: WebGL2RenderingContext;

  #running: boolean;
  #frameID: number;
  #previousTime: number;
  #currentTime: number;
  #lagTime: number;

  #kUPS = 60; // Updates per second
  #kMPF = 1000 / this.#kUPS; // Milliseconds per update.

  constructor(gl: WebGL2RenderingContext) {
    this.#gl = gl;

    this.#mesh1 = null;
    this.#mesh2 = null;

    let dimesions = getDimesions(),
      gridSize = getGridSize();
    let size: Vec2 = new Vec2([dimesions[0], dimesions[1]]);
    this.#camera = new Camera2D(new Vec2(0.0), size, gridSize);

    this.#renderer = new Renderer(gl);

    this.#running = false;
    this.#frameID = -1;
    this.#previousTime = 0.0;
    this.#currentTime = 0.0;
    this.#lagTime = 0.0;
  }

  #initialize = () => {
    let shader = useGlobalStore.getState().resourceManager.getDefaultShader();
    shader.storeUniform(["color", "transformation", "view"]);

    const rectangle = new Float32Array([
      0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0,
    ]);

    let t1: Transform = new Transform(),
      t2: Transform = new Transform();
    t1.position.set([0, 0, 0]);
    t1.scale.set([1, 1, 0]);
    t1.setDirty();

    t2.position.set([0, 2, 0]);
    t2.scale.set([1, 1, 0.0]);

    this.#mesh1 = new Mesh(this.#gl, rectangle, shader, t1);
    this.#mesh2 = new Mesh(this.#gl, rectangle, shader, t2);
  };

  start = () => {
    if (this.#running) {
      throw new Error("Loop already running");
    }

    this.#initialize();
    this.#previousTime = performance.now();
    this.#lagTime = 0.0;
    this.#running = true;
    this.#frameID = requestAnimationFrame(this.#loop);
  };

  stop = () => {
    this.#running = false;
    cancelAnimationFrame(this.#frameID);
  };

  #loop = () => {
    if (this.#running) {
      this.#frameID = requestAnimationFrame(this.#loop);
      this.#render();

      this.#input();

      let currentTime = performance.now();
      let elapsedTime = currentTime - this.#previousTime;
      this.#previousTime = currentTime;
      this.#lagTime += elapsedTime;
      while (this.#lagTime >= this.#kMPF && this.#running) {
        this.#update();
        this.#lagTime -= this.#kMPF;
      }
    }
  };

  #update = () => {
    let delta = 0.05;
    let t1 = this.#mesh1?.getTransform();
    let prev = t1!.rotation.z;
    t1?.rotation.set([0.0, 0.0, prev + (10 * delta)]);
    t1?.setDirty();

    let t2 = this.#mesh2?.getTransform();
    prev = t2!.position.x;

    let step = 0.5 * delta;
    if(prev > 2 || prev < -2 ) {
      step *= -1
    }

    t2?.position.set([prev + step, 2, 0]);
    // t2?.setDirty();
  };

  #input = () => {};

  #render = () => {
    this.#gl.clearColor(0.1, 0.1, 0.1, 1.0);
    this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);

    let shader = this.#mesh1!.getShader();
    shader.start();

    shader.loadVec4("color", new Vec4(0.1, 0.2, 0.3, 1.0));
    this.#renderer!.render(this.#mesh1, this.#camera!);

    shader.loadVec4("color", new Vec4(0.3, 0.7, 0.45, 1.0));
    this.#renderer!.render(this.#mesh2, this.#camera!);

    shader.stop();
  };
}

export default Engine;
