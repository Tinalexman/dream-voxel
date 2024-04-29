import { Mat4, Vec3 } from "gl-matrix";

class Transform {
  #transformation: Mat4;

  position: Vec3;
  scale: Vec3;
  rotation: Vec3;

  #dirty : boolean;

  constructor() {
    this.#transformation = new Mat4();
    this.#transformation.identity();

    this.scale = new Vec3(1.0);
    this.position = new Vec3(0.0);
    this.rotation = new Vec3(0.0);

    this.#dirty = true;
  }


  setDirty = () => {
    this.#dirty = true;
  }

  getMatrix = () => {
    if(this.#dirty) {
      this.#transformation.identity();
      this.#transformation.translate(this.position);
      this.#transformation.rotateX((this.rotation.x * Math.PI) / 180);
      this.#transformation.rotateY((this.rotation.y * Math.PI) / 180);
      this.#transformation.rotateZ((this.rotation.z * Math.PI) / 180);
      this.#transformation.scale(this.scale);
      this.#dirty = false;
    }

    return this.#transformation;
  }


}

export default Transform;
