# Typed Event Emitter

Strictly typed Node.js event emitter for TypeScript.

## Motivation

The built-in `EventEmitter` class in Node.js is useful for notifying other parts of an application that an event has taken place.  However, events can be emitted using any name whether or not that event is intended to be active listeners.  This means that a simple typo in an event name (e.g.: "import" instead of "imported") could result in an event being emitted that a listener is mistakenly not configured to receive.

By providing strict type validation corresponding to the function signature that is intended for listener associated with that event type, we can help ensure that our events being emitted are being received by their intended targets.

## Getting Started

### Installation

```bash
yarn add @poker-apprentice/typed-event-emitter
```

### Usage

Given an emitter defined as follows:

```ts
import { TypedEventEmitter } from '@poker-apprentice/typed-event-emitter';

interface MyEvents {
  message: (event: { username: string; body: string }) => void;
  ping: () => void;
  add: (a: number, b: number) => void
}

const emitter = new TypedEventEmitter<MyEvents>;
```

Listeners could be registered, and events could be emitted, via the following:

```ts
// VALID listeners:
emitter.on('message', ({ username, body }) => {
  // `username` and `body` are both inferred as type `string`
  console.log(`${username}: ${body}`);
});

emitter.on('ping', () => {
  console.log('pong');
});

emitter.on('add', (a, b) => {
  // `a` and `b` are both inferred as type `number`
  console.log(a + b);
});

// VALID emitted events:
emitter.emit('message', { username: 'Joe', body: 'Hi there!' });
emitter.emit('ping');
emitter.emit('add', 5, 10);
```

However, trying to register listeners or emit events with types that do not match the structure previously defined in the `MyEvents` type included above for demonstration purposed would result in type errors:

```ts
// INVALID listeners:
emitter.on('message', ({ from, subject, body }) => {});
emitter.on('ping', (timestamp) => {});
emitter.on('add', (numbers) => {});

// INVALID emitted events:
emitter.emit('message', 'Hi there!');
emitter.emit('ping', 20);
emitter.emit('add', '5', '10');
emitter.emit('not-a-legitimate-key-in-MyEvents');
```
