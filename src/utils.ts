import * as net from 'node:net';
import { ParsedRequest, ResponseWriter } from './types';
import { STATUS_CODES } from './statusCodes';

export function parseRequest(data: string): ParsedRequest {
  const [requestLine, ...rest] = data.split('\r\n');
  const [method, path] = requestLine.split(' ');
  const { mainPath, queryParams } = resolveRequestPath(path);

  const headers: Record<string, string> = {};
  for (const line of rest) {
    if (line === '') {
      break;
    }

    const [key, value] = line.split(': ');
    headers[toLowerCaseFirstLetter(key)] = value;
  }

  return {
    method,
    path: mainPath,
    queryParams,
    headers,
  };
}

export function createResponseWriter(socket: net.Socket): ResponseWriter {
  return {
    writeHead: (statusCode: number, headers: Record<string, string> = {}) => {
      socket.write(
        `HTTP/1.1 ${statusCode} ${
          STATUS_CODES[statusCode] || 'Unknown Status'
        }\r\n`
      );
      for (const [key, value] of Object.entries(headers)) {
        socket.write(`${key}: ${value}\r\n`);
      }
      socket.write('\r\n');
    },
    end: (body: string) => {
      socket.end(body);
    },
  };
}

function resolveRequestPath(path: string): {
  mainPath: string;
  queryParams: Record<string, string>;
} {
  if (!path.includes('?')) {
    return { mainPath: path, queryParams: {} };
  }

  const [mainPath, queryString] = path.split('?');
  const queryParams: Record<string, string> = {};

  if (queryString) {
    queryString.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      if (key && value) {
        queryParams[key] = decodeURIComponent(value);
      }
    });
  }

  return { mainPath, queryParams };
}

// function to convert first letter of string to lowercase
function toLowerCaseFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
