import type { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    const ms = Date.now() - start;
    console.log(`\n→ ${req.method} ${req.path} [${res.statusCode}] ${ms}ms`);
    console.log('  body:', JSON.stringify(body, null, 2));
    return originalJson(body);
  };

  next();
}
