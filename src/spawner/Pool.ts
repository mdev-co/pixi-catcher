export class Pool<T> {
  private readonly available: T[] = [];

  constructor(private readonly create: () => T) {}

  acquire(): T {
    return this.available.pop() ?? this.create();
  }

  release(item: T): void {
    this.available.push(item);
  }
}
