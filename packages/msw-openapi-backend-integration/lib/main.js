import { rest } from "msw";
import OpenAPIBackend from "openapi-backend";

const _OpenAPIBackend =
  OpenAPIBackend && OpenAPIBackend.__esModule
    ? OpenAPIBackend["default"]
    : OpenAPIBackend;

export function handlers(options, requestLogicHandlers = {}) {
  const api = new _OpenAPIBackend(options);
  api.register("notFound", (c, res, ctx) => res(ctx.status(404)));

  api.register("notImplemented", (c, res, ctx, x) => {
    const requestLogicHandler = requestLogicHandlers[c.operation.operationId];
    if (requestLogicHandler) {
      const response = requestLogicHandler(c.request);
      if (response) {
        const { status, mock } = response;
        return res(ctx.status(status), ctx.json(mock));
      }
    }
    const { status, mock } = c.api.mockResponseForOperation(
      c.operation.operationId
    );
    return res(ctx.status(status), ctx.json(mock));
  });

  const methods = Object.keys(rest);

  return methods.flatMap((method) =>
    options.definition.servers.map(({ url }) =>
      rest[method](`${url}/*`, (req, res, ctx) => {
        req.path = req.url.href.slice(url.length);
        return api.handleRequest(req, res, ctx);
      })
    )
  );
}
