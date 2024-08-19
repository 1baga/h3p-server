import { log } from 'console';
import { Router } from '../router';
import { ParsedRequest, ResponseWriter } from '../types';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router();
  });

  test('should add and find a route', () => {
    const handler = jest.fn();
    router.addRoute('GET', '/', handler);

    const foundHandler = router.findRoute('GET', '/');
    expect(foundHandler).toBe(handler);
  });

  test('should return null for non-existent route', () => {
    const foundHandler = router.findRoute('GET', '/non-existent');
    log(foundHandler);
    expect(foundHandler).toBeUndefined();
  });
});
