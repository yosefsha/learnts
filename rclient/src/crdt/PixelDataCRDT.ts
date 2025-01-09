import { LWWMap } from "./CRDTTypes";

type RGB = [red: number, green: number, blue: number];

export class PixelDataCRDT {
  readonly id: string;
  #data: LWWMap<RGB>;

  constructor(id: string) {
    this.id = id;
    this.#data = new LWWMap(this.id, {});
  }

  /**
   * Returns a stringified version of the given coordinates.
   * @param x X coordinate.
   * @param y Y coordinate.
   * @returns Stringified version of the coordinates.
   */
  static key(x: number, y: number) {
    return `${x},${y}`;
  }

  get value() {
    return this.#data.value;
  }

  get state() {
    return this.#data.state;
  }

  set(x: number, y: number, value: RGB) {
    const key = PixelDataCRDT.key(x, y);
    this.#data.set(key, value);
  }

  get(x: number, y: number): RGB {
    const key = PixelDataCRDT.key(x, y);

    const register = this.#data.get(key);
    return register ?? [255, 255, 255];
  }

  delete(x: number, y: number) {
    const key = PixelDataCRDT.key(x, y);
    this.#data.delete(key);
  }

  merge(state: PixelDataCRDT["state"]) {
    this.#data.merge(state);
  }
}