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
import InputHandler, { KEYS } from "./handlers/input_handler";

import { generatePlaneData } from "./objects/mesh_factory";

class Engine {
  #mesh1: Mesh | null;

  #renderer: Renderer;
  #camera: Camera2D;
  #gl: WebGL2RenderingContext;

  #running: boolean;
  #frameID: number;
  #previousTime: number;
  #currentTime: number;
  #lagTime: number;

  #kUPS = 60;
  #kMPF = 1000 / this.#kUPS;

  #inputHandler: InputHandler;

  constructor(gl: WebGL2RenderingContext) {
    this.#gl = gl;

    this.#mesh1 = null;

    let dimesions = getDimesions(),
      gridSize = getGridSize();
    let size: Vec2 = new Vec2([dimesions[0], dimesions[1]]);
    this.#camera = new Camera2D(new Vec2(0.0), size, gridSize);

    this.#renderer = new Renderer(gl);

    this.#inputHandler = new InputHandler();

    this.#running = false;
    this.#frameID = -1;
    this.#previousTime = 0.0;
    this.#currentTime = 0.0;
    this.#lagTime = 0.0;
  }

  getInputHandlers = () => {
    return [this.#inputHandler.onKeyDown, this.#inputHandler.onKeyUp];
  };

  #initialize = () => {
    let shader = useGlobalStore.getState().resourceManager.getDefaultShader();
    shader.storeUniform(["color", "transformation", "view"]);

    // const rectangle = new Float32Array([
    //   0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0,
    // ]);

    const rectangle = new Float32Array(generatePlaneData(10));
    
    let t1: Transform = new Transform();
    t1.position.set([0, 0, 0]);
    t1.scale.set([1, 1, 0]);

    this.#mesh1 = new Mesh(this.#gl, rectangle, shader, t1);
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

      this.#currentTime = performance.now();
      let elapsedTime = this.#currentTime - this.#previousTime;
      this.#previousTime = this.#currentTime;
      this.#lagTime += elapsedTime;
      while (this.#lagTime >= this.#kMPF && this.#running) {
        this.#inputHandler.update();
        this.#update();
        this.#lagTime -= this.#kMPF;
      }
    }
  };

  #update = () => {
    // let delta = 0.05;
    // let t1 = this.#mesh1?.getTransform();
    // let prev = t1!.rotation.z;
    // t1!.rotation.set([0.0, 0.0, prev + 10 * delta]);
    // if (this.#inputHandler.isKeyPressed(KEYS.Left)) {
    //   prev = t1!.position.x;
    //   t1!.position.set([prev + (delta * 0.5), 0.0, 0.0]);
    // } else if (this.#inputHandler.isKeyPressed(KEYS.Right)) {
    //   prev = t1!.position.x;
    //   t1!.position.set([prev - (delta * 0.5), 0.0, 0.0]);
    // }
    // t1!.setDirty();
    // let t2 = this.#mesh2?.getTransform();
    // if (this.#inputHandler.isKeyPressed(KEYS.Up)) {
    //   prev = t2!.scale.x;
    //   t2!.scale.set([prev + (delta * 0.1), prev + (delta * 0.1), 0.0]);
    //   t2?.setDirty();
    // } else if (this.#inputHandler.isKeyPressed(KEYS.Down)) {
    //   prev = t2!.scale.x;
    //   t2!.scale.set([prev - (delta * 0.1), prev - (delta * 0.1), 0.0]);
    //   t2?.setDirty();
    // }
    // if(this.#inputHandler.isKeyPressed(KEYS.F)) {
    //   prev = this.#camera.getZoom();
    //   this.#camera.setZoom(prev + (delta * 0.5));
    // }
    // else if(this.#inputHandler.isKeyPressed(KEYS.G)) {
    //   prev = this.#camera.getZoom();
    //   this.#camera.setZoom(prev - (delta * 0.5));
    // }
  };

  #render = () => {
    this.#gl.clearColor(0.1, 0.1, 0.1, 1.0);
    this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);

    let shader = this.#mesh1!.getShader();
    shader.start();

    shader.loadVec4("color", new Vec4(0.1, 0.2, 0.3, 1.0));
    this.#renderer!.render(this.#mesh1, this.#camera!);

    shader.stop();
  };
}

export default Engine;
