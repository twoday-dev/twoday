import type { Options, ParsedRequest } from "openapi-backend";

export interface RequestLogicHandlers {
  [key: string]: (reguest: ParsedRequest) => void;
}

export function handlers(
  options: Options,
  requestLogicHandlers?: RequestLogicHandlers
);
