import { Mat4, Vec2, Vec3 } from "gl-matrix";

class Camera2D {
  #view: Mat4;
  center: Vec2;
  size: Vec2;
  width: number;
  height: number;
  #viewDirty: boolean;

  constructor(center: Vec2, size: Vec2, width: number) {
    this.#view = new Mat4();
    this.#view.identity();

    this.center = center;
    this.size = size;
    this.width = width;

    let ratio = this.size.y / this.size.x;
    this.height = this.width * ratio;

    this.#viewDirty = true;
  }

  #getWorldHeight = () => {
    let ratio = this.size.y / this.size.x;
    return this.width * ratio;
  };

  getView = () => {
    if (this.#viewDirty) {
      this.#view.identity();
      this.#view.scale(new Vec3(2.0 / this.width, 2.0 / this.height, 1.0));
      this.#view.translate(new Vec3(-this.center[0], -this.center[1], 0));
      this.#viewDirty = false;
    }

    return this.#view;
  };
}

export default Camera2D;
