export class Pool<T> {
  private readonly free: T[] = [];

  constructor(private readonly create: () => T) {}

  acquire(): T {
    return this.free.pop() ?? this.create();
  }

  release(item: T): void {
    this.free.push(item);
  }
}
