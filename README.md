# Simple HTTP Server

A lightweight HTTP server implementation in TypeScript.

## Installation

```bash
npm install h3p-server
```

## Usage

```typescript
import { createServer, Router } from 'h3p-server';

const router = new Router();

router.addRoute('GET', '/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

const server = createServer(router, 3000);
```

## API

### `createServer(router: Router, port: number): net.Server`

Creates and starts an HTTP server with the given router on the specified port.

### `Router`

A class for managing routes.

- `addRoute(method: string, path: string, handler: RouteHandler): void`
- `findRoute(method: string, path: string): RouteHandler | null`

### `RouteHandler`

A function type for handling routes: `(req: ParsedRequest, res: ResponseWriter) => void`

### `ParsedRequest`

An interface representing a parsed HTTP request.

### `ResponseWriter`

An interface for writing HTTP responses.

## License

MIT
