export function XSS() {
  return function (req, res, next) {
    res.setHeader('X-XSS-Protection', '1');
    next();
  }
}