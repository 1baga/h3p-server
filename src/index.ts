import { Router } from './router';
import * as net from 'node:net';
import { createResponseWriter, parseRequest } from './utils';

export function createServer(router: Router): net.Server {
  const server = net.createServer((socket: net.Socket) => {
    socket.on('data', (data: any) => {
      const parsedRequest = parseRequest(data.toString());
      const handler = router.findRoute(
        parsedRequest.method,
        parsedRequest.path
      );

      const responseWriter = createResponseWriter(socket);

      if (handler) {
        try {
          handler(parsedRequest, responseWriter);
        } catch (err: any) {
          console.error('Error handling request:-', err);
          responseWriter.writeHead(500, { 'Content-Type': 'text/plain' });
          responseWriter.end('Internal Server Error');
        }
      } else {
        responseWriter.writeHead(404, { 'Content-Type': 'text/plain' });
        responseWriter.end('404 Not Found');
      }
    });
  });

  return server;
}

export { Router } from './router';
export * from './types';
