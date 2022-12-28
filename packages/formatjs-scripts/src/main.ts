import "@twoday/public.config/config";

import defaultLocale from "@twoday/react-app-locale-utils/lib/defaultLocale.js";
import target from "@twoday/react-intl-bundled-messages/lib/target.js";
import invariant from "tiny-invariant";
import compile from "./compile.js";
import extract from "./extract.js";

const source = "lang";

invariant(
  defaultLocale,
  "Default locale is not set. Please set default locale using: https://github.com/twoday-dev/twoday/tree/main/packages/react-app-locale-utils#usage"
);

await extract(source, defaultLocale);
await compile(source, target, {
  ast: true,
});
