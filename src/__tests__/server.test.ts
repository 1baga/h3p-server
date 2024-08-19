import * as net from 'net';
import { createServer } from '../index';
import { Router } from '../router';

describe('HTTP Server', () => {
  let server: net.Server;
  let router: Router;

  beforeEach(() => {
    router = new Router();
    server = createServer(router); // Use port 0 to let the OS assign a random available port
  });

  afterEach((done) => {
    server.close(done);
  });

  test('should respond to a GET request', (done) => {
    router.addRoute('GET', '/', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, World!');
    });

    server.listen(0, () => {
      const address = server.address() as net.AddressInfo;
      const client = net.createConnection({ port: address.port }, () => {
        client.write('GET / HTTP/1.1\r\nHost: localhost\r\n\r\n');
      });

      let response = '';
      client.on('data', (chunk) => {
        response += chunk.toString();
      });

      client.on('end', () => {
        expect(response).toContain('HTTP/1.1 200 OK');
        expect(response).toContain('Hello, World!');
        done();
      });
    });
  });
});
