import { RouteHandler } from './types';

export class Router {
  private routes: Map<string, RouteHandler> = new Map();

  addRoute(method: string, path: string, handler: RouteHandler) {
    const key = `${method.toUpperCase()}:${path}`;
    this.routes.set(key, handler);
  }

  findRoute(method: string, path: string): RouteHandler | undefined {
    const key = `${method.toUpperCase()}:${path}`;
    return this.routes.get(key);
  }
}
