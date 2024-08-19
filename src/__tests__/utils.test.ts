import { parseRequest } from '../utils';

describe('parseRequest', () => {
  test('should parse a simple GET request', () => {
    const rawRequest = 'GET /test HTTP/1.1\r\nHost: example.com\r\n\r\n';
    const parsedRequest = parseRequest(rawRequest);

    expect(parsedRequest).toEqual({
      method: 'GET',
      path: '/test',
      queryParams: {},
      headers: {
        host: 'example.com',
      },
    });
  });

  test('should parse a request with query parameters', () => {
    const rawRequest =
      'GET /test?param1=value1&param2=value2 HTTP/1.1\r\nHost: example.com\r\n\r\n';
    const parsedRequest = parseRequest(rawRequest);

    expect(parsedRequest).toEqual({
      method: 'GET',
      path: '/test',
      queryParams: {
        param1: 'value1',
        param2: 'value2',
      },
      headers: {
        host: 'example.com',
      },
    });
  });
});
