export interface ParsedRequest {
  method: string;
  path: string;
  queryParams: Record<string, string>;
  headers: Record<string, string>;
}

export interface ResponseWriter {
  writeHead: (statusCode: number, headers?: Record<string, string>) => void;
  end: (body: string) => void;
}

export type RouteHandler = (req: ParsedRequest, res: ResponseWriter) => void;
