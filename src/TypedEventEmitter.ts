import EventEmitter from 'events';

export type KeyPrimitive = string | symbol;

export type EventKey<T> = KeyPrimitive & keyof T;

export type EventListener<T, K extends EventKey<T>> = ((...args: any[]) => void) & T[K];

export class TypedEventEmitter<T> {
  private emitter = new EventEmitter();

  on<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this {
    this.emitter.on(eventName, listener);
    return this;
  }

  off<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this {
    this.emitter.off(eventName, listener);
    return this;
  }

  once<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this {
    this.emitter.once(eventName, listener);
    return this;
  }

  emit<K extends EventKey<T>>(eventName: K, ...args: Parameters<EventListener<T, K>>): boolean {
    return this.emitter.emit(eventName, ...args);
  }

  removeAllListeners<K extends EventKey<T>>(eventName: K): this {
    this.emitter.removeAllListeners(eventName);
    return this;
  }

  setMaxListeners(n: number): this {
    this.emitter.setMaxListeners(n);
    return this;
  }

  listeners<K extends EventKey<T>>(eventName: K): EventListener<T, K>[] {
    return this.emitter.listeners(eventName) as EventListener<T, K>[];
  }

  rawListeners<K extends EventKey<T>>(eventName: K): EventListener<T, K>[] {
    return this.emitter.rawListeners(eventName) as EventListener<T, K>[];
  }

  listenerCount<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): number {
    return this.emitter.listenerCount(eventName, listener);
  }

  prependListener<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this {
    this.emitter.prependListener(eventName, listener);
    return this;
  }

  prependOnceListener<K extends EventKey<T>>(eventName: K, listener: EventListener<T, K>): this {
    this.emitter.prependOnceListener(eventName, listener);
    return this;
  }

  eventNames(): EventKey<T>[] {
    return this.emitter.eventNames() as EventKey<T>[];
  }

  addEventListener = this.on;

  removeEventListener = this.off;

  getMaxListeners = this.emitter.getMaxListeners;
}
