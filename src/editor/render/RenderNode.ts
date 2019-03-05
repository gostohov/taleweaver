export default class RenderNode {
  protected id: string;
  protected size: number;
  protected selectableSize: number;

  constructor(id: string, size: number, selectableSize: number) {
    this.id = id;
    this.size = size;
    this.selectableSize = selectableSize;
  }

  getID(): string {
    return this.id
  }

  getSize(): number {
    return this.size;
  }

  getSelectableSize(): number {
    return this.selectableSize;
  }
}
