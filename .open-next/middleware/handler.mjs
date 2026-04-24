
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.16";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__28d90508._.js
var require_root_of_the_server_28d90508 = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__28d90508._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__28d90508._.js", 51615, (e, t, s) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, t, s) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 6124, (e) => {
      "use strict";
      let t = Promise.resolve().then(() => e.i(62781));
      e.s(["default", 0, t]);
    }, 80938, (e) => {
      e.v("chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm");
    }, 62781, (e) => e.a(async (t, s) => {
      try {
        e.s(["default", () => t2]);
        var r = e.i(80938);
        let t2 = await e.u(r.default, () => wasm_da7cd21b3acf8cb1);
        s();
      } catch (e2) {
        s(e2);
      }
    }, true), 35825, (e, t, s) => {
      self._ENTRIES ||= {};
      let r = Promise.resolve().then(() => e.i(58217));
      r.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(r, { get(e2, t2) {
        if ("then" === t2) return (t3, s3) => e2.then(t3, s3);
        let s2 = (...s3) => e2.then((e3) => (0, e3[t2])(...s3));
        return s2.then = (s3, r2) => e2.then((e3) => e3[t2]).then(s3, r2), s2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/_4b0b3359._.js
var require_b0b3359 = __commonJS({
  ".next/server/edge/chunks/_4b0b3359._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/_4b0b3359._.js", 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, i = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => d, parseSetCookie: () => p, stringifyCookie: () => u };
      for (var c in l) n(s, c, { get: l[c], enumerable: true });
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function p(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = d(e2), { domain: i2, expires: a2, httponly: o2, maxage: s2, path: l2, samesite: c2, secure: u2, partitioned: p2, priority: g2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, b, y = { name: t2, value: decodeURIComponent(r2), domain: i2, ...a2 && { expires: new Date(a2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...c2 && { sameSite: f.includes(m2 = (m2 = c2).toLowerCase()) ? m2 : void 0 }, ...u2 && { secure: true }, ...g2 && { priority: h.includes(b = (b = g2).toLowerCase()) ? b : void 0 }, ...p2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in y) y[t3] && (e3[t3] = y[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of a(t2)) o.call(e2, l2) || l2 === r2 || n(e2, l2, { get: () => t2[l2], enumerable: !(s2 = i(t2, l2)) || s2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var f = ["strict", "lax", "none"], h = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, m = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, a2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (a2 = true, s2 = i3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!a2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(i2)) {
            const t3 = p(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 90044, (e) => {
      "use strict";
      let t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      let n = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function i() {
        return n ? new n() : new r();
      }
      function a(e2) {
        return n ? n.bind(e2) : r.bind(e2);
      }
      function o() {
        return n ? n.snapshot() : function(e2, ...t2) {
          return e2(...t2);
        };
      }
      e.s(["bindSnapshot", () => a, "createAsyncLocalStorage", () => i, "createSnapshot", () => o]);
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, i, a, o;
        var s, l, c, u, d, p, f, h, g, m, b, y, w, _, v, x, E = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(223), i2 = r3(172), a2 = r3(930), o2 = "context", s2 = new n2.NoopContextManager();
          class l2 {
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...n3) {
              return this._getContextManager().with(e3, t3, r4, ...n3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(56), i2 = r3(912), a2 = r3(957), o2 = r3(172);
          class s2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, s3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e5.stack) ? n3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, o2.getGlobal)("diag"), u2 = (0, i2.createLogLevelDiagLogger)(null != (s3 = r4.logLevel) ? s3 : a2.DiagLogLevel.INFO, e4);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
          }
          t2.DiagAPI = s2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(660), i2 = r3(172), a2 = r3(930), o2 = "metrics";
          class s2 {
            static getInstance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(o2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(172), i2 = r3(874), a2 = r3(194), o2 = r3(277), s2 = r3(369), l2 = r3(930), c2 = "propagation", u2 = new i2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(c2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c2) || u2;
            }
          }
          t2.PropagationAPI = d2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(172), i2 = r3(846), a2 = r3(139), o2 = r3(607), s2 = r3(930), l2 = "trace";
          class c2 {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, n2.registerGlobal)(l2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, s2.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = c2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(491), i2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t2.getBaggage = a2, t2.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(i2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let n2 = new r3(this._entries);
              return n2._entries.set(e3, t3), n2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(930), i2 = r3(993), a2 = r3(830), o2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, n2) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t3.deleteValue = (e4) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(172);
          function i2(e3, t3, r4) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r4.unshift(t3), i3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let i2 = t3[r5];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(200), i2 = r3(521), a2 = r3(130), o2 = i2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${o2}`), l2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var a3;
            let o3 = l2[s2] = null != (a3 = l2[s2]) ? a3 : { version: i2.VERSION };
            if (!n3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== i2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (n3 && (0, a2.isCompatible)(n3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return o2(e4);
              let s2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s2.prerelease || a3.major !== s2.major) return o2(e4);
              if (0 === a3.major) return a3.minor === s2.minor && a3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return a3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = a2, t2.isCompatible = a2(n2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = a2;
          class o2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class l2 extends s2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class u2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new i2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(102);
          class i2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = i2, t2.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(491), i2 = r3(607), a2 = r3(403), o2 = r3(139), s2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new a2.NonRecordingSpan();
              let l2 = r4 && (0, i2.getSpanContext)(r4);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o2.isSpanContextValid)(l2) ? new a2.NonRecordingSpan(l2) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a3, o3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (a3 = t3, l2 = r4) : (a3 = t3, o3 = r4, l2 = n3);
              let c2 = null != o3 ? o3 : s2.active(), u2 = this.startSpan(e3, a3, c2), d2 = (0, i2.setSpan)(c2, u2);
              return s2.with(d2, l2, void 0, u2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i2 = this._getTracer();
              return Reflect.apply(i2.startActiveSpan, i2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(125), i2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var i3;
              return null != (i3 = this.getDelegateTracer(e3, t3, r4)) ? i3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(780), i2 = r3(403), a2 = r3(491), o2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(a2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new i2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), i3 = r4.indexOf("=");
                if (-1 !== i3) {
                  let a2 = r4.slice(0, i3), o2 = r4.slice(i3 + 1, t3.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(o2) && e4.set(a2, o2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = i2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, i2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return a2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(325);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(476), i2 = r3(403), a2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l2(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, S = {};
        function k(e2) {
          var t2 = S[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = S[e2] = { exports: {} }, n2 = true;
          try {
            E[e2].call(r3.exports, r3, r3.exports, k), n2 = false;
          } finally {
            n2 && delete S[e2];
          }
          return r3.exports;
        }
        k.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var A = {};
        Object.defineProperty(A, "__esModule", { value: true }), A.trace = A.propagation = A.metrics = A.diag = A.context = A.INVALID_SPAN_CONTEXT = A.INVALID_TRACEID = A.INVALID_SPANID = A.isValidSpanId = A.isValidTraceId = A.isSpanContextValid = A.createTraceState = A.TraceFlags = A.SpanStatusCode = A.SpanKind = A.SamplingDecision = A.ProxyTracerProvider = A.ProxyTracer = A.defaultTextMapSetter = A.defaultTextMapGetter = A.ValueType = A.createNoopMeter = A.DiagLogLevel = A.DiagConsoleLogger = A.ROOT_CONTEXT = A.createContextKey = A.baggageEntryMetadataFromString = void 0, s = k(369), Object.defineProperty(A, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = k(780), Object.defineProperty(A, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(A, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = k(972), Object.defineProperty(A, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = k(957), Object.defineProperty(A, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = k(102), Object.defineProperty(A, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), p = k(901), Object.defineProperty(A, "ValueType", { enumerable: true, get: function() {
          return p.ValueType;
        } }), f = k(194), Object.defineProperty(A, "defaultTextMapGetter", { enumerable: true, get: function() {
          return f.defaultTextMapGetter;
        } }), Object.defineProperty(A, "defaultTextMapSetter", { enumerable: true, get: function() {
          return f.defaultTextMapSetter;
        } }), h = k(125), Object.defineProperty(A, "ProxyTracer", { enumerable: true, get: function() {
          return h.ProxyTracer;
        } }), g = k(846), Object.defineProperty(A, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = k(996), Object.defineProperty(A, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), b = k(357), Object.defineProperty(A, "SpanKind", { enumerable: true, get: function() {
          return b.SpanKind;
        } }), y = k(847), Object.defineProperty(A, "SpanStatusCode", { enumerable: true, get: function() {
          return y.SpanStatusCode;
        } }), w = k(475), Object.defineProperty(A, "TraceFlags", { enumerable: true, get: function() {
          return w.TraceFlags;
        } }), _ = k(98), Object.defineProperty(A, "createTraceState", { enumerable: true, get: function() {
          return _.createTraceState;
        } }), v = k(139), Object.defineProperty(A, "isSpanContextValid", { enumerable: true, get: function() {
          return v.isSpanContextValid;
        } }), Object.defineProperty(A, "isValidTraceId", { enumerable: true, get: function() {
          return v.isValidTraceId;
        } }), Object.defineProperty(A, "isValidSpanId", { enumerable: true, get: function() {
          return v.isValidSpanId;
        } }), x = k(476), Object.defineProperty(A, "INVALID_SPANID", { enumerable: true, get: function() {
          return x.INVALID_SPANID;
        } }), Object.defineProperty(A, "INVALID_TRACEID", { enumerable: true, get: function() {
          return x.INVALID_TRACEID;
        } }), Object.defineProperty(A, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return x.INVALID_SPAN_CONTEXT;
        } }), r2 = k(67), Object.defineProperty(A, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = k(506), Object.defineProperty(A, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), i = k(886), Object.defineProperty(A, "metrics", { enumerable: true, get: function() {
          return i.metrics;
        } }), a = k(939), Object.defineProperty(A, "propagation", { enumerable: true, get: function() {
          return a.propagation;
        } }), o = k(845), Object.defineProperty(A, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), A.default = { context: r2.context, diag: n.diag, metrics: i.metrics, propagation: a.propagation, trace: o.trace }, t.exports = A;
      })();
    }, 41424, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, i, a = {};
        a.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var i2 = {}, a2 = t2.split(n), o = (r3 || {}).decode || e2, s = 0; s < a2.length; s++) {
            var l = a2[s], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[u] && (i2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, o));
            }
          }
          return i2;
        }, a.serialize = function(e3, t2, n2) {
          var a2 = n2 || {}, o = a2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!i.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !i.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != a2.maxAge) {
            var c = a2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (a2.domain) {
            if (!i.test(a2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + a2.domain;
          }
          if (a2.path) {
            if (!i.test(a2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + a2.path;
          }
          if (a2.expires) {
            if ("function" != typeof a2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + a2.expires.toUTCString();
          }
          if (a2.httpOnly && (l += "; HttpOnly"), a2.secure && (l += "; Secure"), a2.sameSite) switch ("string" == typeof a2.sameSite ? a2.sameSite.toLowerCase() : a2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = a;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, i, a;
        var o = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function i2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function a2(e4, t3, n3, a3, o3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s3 = new i2(n3, a3 || e4, o3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && i3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e4)) : i3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, a3 = n3.length, o3 = Array(a3); i3 < a3; i3++) o3[i3] = n3[i3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, i3, a3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var l2, c2, u = this._events[s3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, i3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, i3, a3), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, i3, a3, o3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var p, f = u.length;
              for (c2 = 0; c2 < f; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
                case 1:
                  u[c2].fn.call(u[c2].context);
                  break;
                case 2:
                  u[c2].fn.call(u[c2].context, t3);
                  break;
                case 3:
                  u[c2].fn.call(u[c2].context, t3, n3);
                  break;
                case 4:
                  u[c2].fn.call(u[c2].context, t3, n3, i3);
                  break;
                default:
                  if (!l2) for (p = 1, l2 = Array(d - 1); p < d; p++) l2[p - 1] = arguments[p];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, i3) {
            var a3 = r3 ? r3 + e4 : e4;
            if (!this._events[a3]) return this;
            if (!t3) return o2(this, a3), this;
            var s3 = this._events[a3];
            if (s3.fn) s3.fn !== t3 || i3 && !s3.once || n3 && s3.context !== n3 || o2(this, a3);
            else {
              for (var l2 = 0, c2 = [], u = s3.length; l2 < u; l2++) (s3[l2].fn !== t3 || i3 && !s3[l2].once || n3 && s3[l2].context !== n3) && c2.push(s3[l2]);
              c2.length ? this._events[a3] = 1 === c2.length ? c2[0] : c2 : o2(this, a3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, i2 = e4.length;
            for (; i2 > 0; ) {
              let a2 = i2 / 2 | 0, o2 = n2 + a2;
              0 >= r3(e4[o2], t3) ? (n2 = ++o2, i2 -= a2 + 1) : i2 = a2;
            }
            return n2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let i2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(i2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let n2 = r3(213);
          class i2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let a2 = (e4, t3, r4) => new Promise((a3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void a3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  a3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new i2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            n2(e4.then(a3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = a2, e3.exports.default = a2, e3.exports.TimeoutError = i2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, n2 = true;
          try {
            o[e3](r3, r3.exports, l), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(993), r2 = l(816), n = l(821), i = () => {
        }, a = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, a2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (a2 = e3.interval) ? void 0 : a2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, i2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && i2(a);
                  });
                  n2(await o3);
                } catch (e4) {
                  i2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return s;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let n2 = o(e2, t2);
        return n2 ? a.run(n2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = a.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { handleFetch: function() {
        return c;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return s;
      } };
      for (var a in i) Object.defineProperty(r, a, { enumerable: true, get: i[a] });
      let o = e.r(25085), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: o2, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: p, referrerPolicy: f } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: p, referrerPolicy: f } };
      }
      async function c(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: i2, proxyPort: a2 } = r2, c2 = await l(i2, t2), u2 = await e2(`http://localhost:${a2}`, { method: "POST", body: JSON.stringify(c2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u2.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: i3 } = e3.response;
              return new Response(i3 ? n.Buffer.from(i3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return p;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : c(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = e.r(25085), o = e.r(28325);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, a.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 64445, (e, t, r) => {
      var n = { 226: function(t2, r2) {
        !function(n2, i2) {
          "use strict";
          var a2 = "function", o = "undefined", s = "object", l = "string", c = "major", u = "model", d = "name", p = "type", f = "vendor", h = "version", g = "architecture", m = "console", b = "mobile", y = "tablet", w = "smarttv", _ = "wearable", v = "embedded", x = "Amazon", E = "Apple", S = "ASUS", k = "BlackBerry", A = "Browser", P = "Chrome", T = "Firefox", R = "Google", C = "Huawei", O = "Microsoft", I = "Motorola", N = "Opera", $ = "Samsung", D = "Sharp", U = "Sony", j = "Xiaomi", M = "Zebra", L = "Facebook", H = "Chromium OS", q = "Mac OS", V = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, F = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, W = function(e2, t3) {
            return typeof e2 === l && -1 !== B(t3).indexOf(B(e2));
          }, B = function(e2) {
            return e2.toLowerCase();
          }, K = function(e2, t3) {
            if (typeof e2 === l) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === o ? e2 : e2.substring(0, 350);
          }, J = function(e2, t3) {
            for (var r3, n3, i3, o2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], p2 = t3[u2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (i3 = 0; i3 < p2.length; i3++) c2 = l2[++n3], typeof (o2 = p2[i3]) === s && o2.length > 0 ? 2 === o2.length ? typeof o2[1] == a2 ? this[o2[0]] = o2[1].call(this, c2) : this[o2[0]] = o2[1] : 3 === o2.length ? typeof o2[1] !== a2 || o2[1].exec && o2[1].test ? this[o2[0]] = c2 ? c2.replace(o2[1], o2[2]) : void 0 : this[o2[0]] = c2 ? o2[1].call(this, c2, o2[2]) : void 0 : 4 === o2.length && (this[o2[0]] = c2 ? o2[3].call(this, c2.replace(o2[1], o2[2])) : void 0) : this[o2] = c2 || void 0;
              u2 += 2;
            }
          }, z = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === s && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (W(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (W(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, G = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [h, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [h, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, h], [/opios[\/ ]+([\w\.]+)/i], [h, [d, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [h, [d, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, h], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [h, [d, "UC" + A]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [h, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [h, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [h, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [h, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [h, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure " + A], h], [/\bfocus\/([\w\.]+)/i], [h, [d, T + " Focus"]], [/\bopt\/([\w\.]+)/i], [h, [d, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [h, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [h, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [h, [d, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [h, [d, "MIUI " + A]], [/fxios\/([-\w\.]+)/i], [h, [d, T]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 " + A]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 " + A], h], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], h], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, h], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, L], h], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, h], [/\bgsa\/([\w\.]+) .*safari\//i], [h, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [h, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [h, [d, P + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, P + " WebView"], h], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [h, [d, "Android " + A]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, h], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [h, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [h, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [h, z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, h], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], h], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [h, [d, T + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, h], [/(cobalt)\/([\w\.]+)/i], [d, [h, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, B]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", B]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, B]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [f, $], [p, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [f, $], [p, b]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [f, E], [p, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [f, E], [p, y]], [/(macintosh);/i], [u, [f, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [f, D], [p, b]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [f, C], [p, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [f, C], [p, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [f, j], [p, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [f, j], [p, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [f, "OPPO"], [p, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [f, "Vivo"], [p, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [f, "Realme"], [p, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [f, I], [p, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [f, I], [p, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [f, "LG"], [p, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [f, "LG"], [p, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [f, "Lenovo"], [p, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [f, "Nokia"], [p, b]], [/(pixel c)\b/i], [u, [f, R], [p, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [f, R], [p, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [f, U], [p, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [f, U], [p, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [f, "OnePlus"], [p, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [f, x], [p, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [f, x], [p, b]], [/(playbook);[-\w\),; ]+(rim)/i], [u, f, [p, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [f, k], [p, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [f, S], [p, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [f, S], [p, b]], [/(nexus 9)/i], [u, [f, "HTC"], [p, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [f, [u, /_/g, " "], [p, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [f, "Acer"], [p, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [f, "Meizu"], [p, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [f, u, [p, b]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [f, u, [p, y]], [/(surface duo)/i], [u, [f, O], [p, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [f, "Fairphone"], [p, b]], [/(u304aa)/i], [u, [f, "AT&T"], [p, b]], [/\bsie-(\w*)/i], [u, [f, "Siemens"], [p, b]], [/\b(rct\w+) b/i], [u, [f, "RCA"], [p, y]], [/\b(venue[\d ]{2,7}) b/i], [u, [f, "Dell"], [p, y]], [/\b(q(?:mv|ta)\w+) b/i], [u, [f, "Verizon"], [p, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [f, "Barnes & Noble"], [p, y]], [/\b(tm\d{3}\w+) b/i], [u, [f, "NuVision"], [p, y]], [/\b(k88) b/i], [u, [f, "ZTE"], [p, y]], [/\b(nx\d{3}j) b/i], [u, [f, "ZTE"], [p, b]], [/\b(gen\d{3}) b.+49h/i], [u, [f, "Swiss"], [p, b]], [/\b(zur\d{3}) b/i], [u, [f, "Swiss"], [p, y]], [/\b((zeki)?tb.*\b) b/i], [u, [f, "Zeki"], [p, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[f, "Dragon Touch"], u, [p, y]], [/\b(ns-?\w{0,9}) b/i], [u, [f, "Insignia"], [p, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [f, "NextBook"], [p, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[f, "Voice"], u, [p, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[f, "LvTel"], u, [p, b]], [/\b(ph-1) /i], [u, [f, "Essential"], [p, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [f, "Envizen"], [p, y]], [/\b(trio[-\w\. ]+) b/i], [u, [f, "MachSpeed"], [p, y]], [/\btu_(1491) b/i], [u, [f, "Rotor"], [p, y]], [/(shield[\w ]+) b/i], [u, [f, "Nvidia"], [p, y]], [/(sprint) (\w+)/i], [f, u, [p, b]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [f, O], [p, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [f, M], [p, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [f, M], [p, b]], [/smart-tv.+(samsung)/i], [f, [p, w]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [f, $], [p, w]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[f, "LG"], [p, w]], [/(apple) ?tv/i], [f, [u, E + " TV"], [p, w]], [/crkey/i], [[u, P + "cast"], [f, R], [p, w]], [/droid.+aft(\w)( bui|\))/i], [u, [f, x], [p, w]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [f, D], [p, w]], [/(bravia[\w ]+)( bui|\))/i], [u, [f, U], [p, w]], [/(mitv-\w{5}) bui/i], [u, [f, j], [p, w]], [/Hbbtv.*(technisat) (.*);/i], [f, u, [p, w]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[f, K], [u, K], [p, w]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[p, w]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [f, u, [p, m]], [/droid.+; (shield) bui/i], [u, [f, "Nvidia"], [p, m]], [/(playstation [345portablevi]+)/i], [u, [f, U], [p, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [f, O], [p, m]], [/((pebble))app/i], [f, u, [p, _]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [f, E], [p, _]], [/droid.+; (glass) \d/i], [u, [f, R], [p, _]], [/droid.+; (wt63?0{2,3})\)/i], [u, [f, M], [p, _]], [/(quest( 2| pro)?)/i], [u, [f, L], [p, _]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [f, [p, v]], [/(aeobc)\b/i], [u, [f, x], [p, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [p, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [p, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[p, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[p, b]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [f, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [h, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [h, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, h], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [h, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, h], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [h, z, G]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [h, z, G]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[h, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, q], [h, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [h, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, h], [/\(bb(10);/i], [h, [d, k]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [h, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [h, [d, T + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [h, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [h, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [h, [d, P + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, H], h], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, h], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], h], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, h]] }, Q = function(e2, t3) {
            if (typeof e2 === s && (t3 = e2, e2 = void 0), !(this instanceof Q)) return new Q(e2, t3).getResult();
            var r3 = typeof n2 !== o && n2.navigator ? n2.navigator : void 0, i3 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), m2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, w2 = t3 ? V(X, t3) : X, _2 = r3 && r3.userAgent == i3;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[d] = void 0, t4[h] = void 0, J.call(t4, i3, w2.browser), t4[c] = typeof (e3 = t4[h]) === l ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, _2 && r3 && r3.brave && typeof r3.brave.isBrave == a2 && (t4[d] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[g] = void 0, J.call(e3, i3, w2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[f] = void 0, e3[u] = void 0, e3[p] = void 0, J.call(e3, i3, w2.device), _2 && !e3[p] && m2 && m2.mobile && (e3[p] = b), _2 && "Macintosh" == e3[u] && r3 && typeof r3.standalone !== o && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[u] = "iPad", e3[p] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[d] = void 0, e3[h] = void 0, J.call(e3, i3, w2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[d] = void 0, e3[h] = void 0, J.call(e3, i3, w2.os), _2 && !e3[d] && m2 && "Unknown" != m2.platform && (e3[d] = m2.platform.replace(/chrome os/i, H).replace(/macos/i, q)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return i3;
            }, this.setUA = function(e3) {
              return i3 = typeof e3 === l && e3.length > 350 ? K(e3, 350) : e3, this;
            }, this.setUA(i3), this;
          };
          if (Q.VERSION = "1.0.35", Q.BROWSER = F([d, h, c]), Q.CPU = F([g]), Q.DEVICE = F([u, f, p, m, b, w, y, _, v]), Q.ENGINE = Q.OS = F([d, h]), typeof r2 !== o) t2.exports && (r2 = t2.exports = Q), r2.UAParser = Q;
          else if (typeof define === a2 && define.amd) e.r, void 0 !== Q && e.v(Q);
          else typeof n2 !== o && (n2.UAParser = Q);
          var Y = typeof n2 !== o && (n2.jQuery || n2.Zepto);
          if (Y && !Y.ua) {
            var Z = new Q();
            Y.ua = Z.getResult(), Y.ua.get = function() {
              return Z.getUA();
            }, Y.ua.set = function(e2) {
              Z.setUA(e2);
              var t3 = Z.getResult();
              for (var r3 in t3) Y.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, i = {};
      function a(e2) {
        var t2 = i[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = i[e2] = { exports: {} }, o = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, a), o = false;
        } finally {
          o && delete i[e2];
        }
        return r2.exports;
      }
      a.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = a(226);
    }, 8946, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function i(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var a = Array.isArray;
      function o() {
      }
      var s = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), p = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), b = Symbol.for("react.view_transition"), y = Symbol.iterator, w = Object.prototype.hasOwnProperty, _ = Object.assign;
      function v(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function x(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var E = /\/+/g;
      function S(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function k(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], c2 = 0;
        return !function e3(t3, r3, n3, c3, u2) {
          var d2, p2, f2, h2 = typeof t3;
          ("undefined" === h2 || "boolean" === h2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (h2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case l:
                  m2 = true;
                  break;
                case g:
                  return e3((m2 = t3._init)(t3._payload), r3, n3, c3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === c3 ? "." + S(t3, 0) : c3, a(u2) ? (n3 = "", null != m2 && (n3 = m2.replace(E, "$&/") + "/"), e3(u2, r3, n3, "", function(e4) {
            return e4;
          })) : null != u2 && (x(u2) && (d2 = u2, p2 = n3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(E, "$&/") + "/") + m2, u2 = v(d2.type, p2, d2.props)), r3.push(u2)), 1;
          m2 = 0;
          var b2 = "" === c3 ? "." : c3 + ":";
          if (a(t3)) for (var w2 = 0; w2 < t3.length; w2++) h2 = b2 + S(c3 = t3[w2], w2), m2 += e3(c3, r3, n3, h2, u2);
          else if ("function" == typeof (w2 = null === (f2 = t3) || "object" != typeof f2 ? null : "function" == typeof (f2 = y && f2[y] || f2["@@iterator"]) ? f2 : null)) for (t3 = w2.call(t3), w2 = 0; !(c3 = t3.next()).done; ) h2 = b2 + S(c3 = c3.value, w2++), m2 += e3(c3, r3, n3, h2, u2);
          else if ("object" === h2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, c3, u2);
            throw Error(i(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), n2;
      }
      function A(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function P() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = m, r.Children = { map: k, forEach: function(e2, t2, r2) {
        k(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return k(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return k(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!x(e2)) throw Error(i(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = d, r.StrictMode = u, r.Suspense = f, r.ViewTransition = b, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(P);
          void 0 === (t2 = r2.get(e2)) && (t2 = T(), r2.set(e2, t2)), r2 = 0;
          for (var i2 = arguments.length; r2 < i2; r2++) {
            var a2 = arguments[r2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = T(), o2.set(a2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = T(), o2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(i(267, e2));
        var n2 = _({}, e2.props), a2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) w.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (n2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        return v(e2.type, a2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, a2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) w.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          i2.children = s2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = o2[n2]);
        return v(e2, a2, i2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: p, render: e2 };
      }, r.isValidElement = x, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: A };
      }, r.memo = function(e2, t2) {
        return { $$typeof: h, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-f93b9fd4-20251217";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 91375, (e) => {
      "use strict";
      let t = (0, e.i(90044).createAsyncLocalStorage)();
      e.s([], 92999), e.i(92999), e.s(["actionAsyncStorage", 0, t], 91375);
    }, 24628, 46478, 7754, 9939, 25753, 53835, 18368, 80082, 72117, 81828, 63072, 16852, 75982, 68585, 96588, (e) => {
      "use strict";
      let t = "next-router-prefetch", r = ["rsc", "next-router-state-tree", t, "next-hmr-refresh", "next-router-segment-prefetch"];
      e.s(["FLIGHT_HEADERS", 0, r, "NEXT_REWRITTEN_PATH_HEADER", 0, "x-nextjs-rewritten-path", "NEXT_REWRITTEN_QUERY_HEADER", 0, "x-nextjs-rewritten-query", "NEXT_ROUTER_PREFETCH_HEADER", 0, t, "NEXT_RSC_UNION_QUERY", 0, "_rsc", "RSC_HEADER", 0, "rsc"], 24628);
      var n, i, a = e.i(90044);
      let o = (0, a.createAsyncLocalStorage)();
      e.s(["workAsyncStorageInstance", 0, o], 46478), e.s([], 7754);
      let s = (0, a.createAsyncLocalStorage)();
      e.s(["workUnitAsyncStorageInstance", 0, s], 9939);
      class l extends Error {
        constructor(e2, t2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : e2 + "."} This is a bug in Next.js.`, t2), this.name = "InvariantError";
        }
      }
      function c(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }
      e.s(["InvariantError", () => l], 25753), e.s(["throwForMissingRequestStore", () => c], 53835);
      var u = e.i(40049);
      let d = "DYNAMIC_SERVER_USAGE";
      class p extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = d;
        }
      }
      function f(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === d;
      }
      e.s(["DynamicServerError", () => p, "isDynamicServerError", () => f], 18368);
      class h extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      function g(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === m;
      }
      e.s(["StaticGenBailoutError", () => h], 80082);
      let m = "HANGING_PROMISE_REJECTION";
      class b extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = m;
        }
      }
      let y = /* @__PURE__ */ new WeakMap();
      function w(e2, t2, r2) {
        if (e2.aborted) return Promise.reject(new b(t2, r2));
        {
          let n2 = new Promise((n3, i2) => {
            let a2 = i2.bind(null, new b(t2, r2)), o2 = y.get(e2);
            if (o2) o2.push(a2);
            else {
              let t3 = [a2];
              y.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return n2.catch(_), n2;
        }
      }
      function _() {
      }
      function v(e2, t2, r2) {
        return t2.stagedRendering ? t2.stagedRendering.delayUntilStage(r2, void 0, e2) : new Promise((t3) => {
          setTimeout(() => {
            t3(e2);
          }, 0);
        });
      }
      function x(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === e2.digest;
      }
      e.s(["isHangingPromiseRejectionError", () => g, "makeDevtoolsIOAwarePromise", () => v, "makeHangingPromise", () => w], 72117), e.s(["isBailoutToCSRError", () => x], 81828);
      let E = "function" == typeof u.default.unstable_postpone;
      function S(e2, t2, r2) {
        let n2 = Object.defineProperty(new p(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function k(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }
      function A(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let i2, a2;
          i2 = I(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`), n2.controller.abort(i2), (a2 = n2.dynamicTracking) && a2.dynamicAccesses.push({ stack: a2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
          let o2 = n2.dynamicTracking;
          o2 && null === o2.syncDynamicErrorWithStack && (o2.syncDynamicErrorWithStack = r2);
        }
        throw I(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function P(e2, t2, r2) {
        (function() {
          if (!E) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), u.default.unstable_postpone(T(e2, t2));
      }
      function T(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function R(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && C(e2.message);
      }
      function C(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === C(T("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      let O = "NEXT_PRERENDER_INTERRUPTED";
      function I(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = O, t2;
      }
      function N(e2) {
        return "object" == typeof e2 && null !== e2 && e2.digest === O && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }
      function $(e2, t2) {
        return e2.runtimeStagePromise ? e2.runtimeStagePromise.then(() => t2) : t2;
      }
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)`), RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`), e.s(["abortAndThrowOnSynchronousRequestDataAccess", () => A, "delayUntilRuntimeStage", () => $, "isDynamicPostpone", () => R, "isPrerenderInterruptedError", () => N, "postponeWithTracking", () => P, "throwToInterruptStaticGeneration", () => S, "trackDynamicDataInDynamicRender", () => k], 63072);
      var D = ((n = {})[n.SeeOther = 303] = "SeeOther", n[n.TemporaryRedirect = 307] = "TemporaryRedirect", n[n.PermanentRedirect = 308] = "PermanentRedirect", n);
      e.s(["RedirectStatusCode", () => D], 16852);
      let U = "NEXT_REDIRECT";
      var j = ((i = {}).push = "push", i.replace = "replace", i);
      function M(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let t2 = e2.digest.split(";"), [r2, n2] = t2, i2 = t2.slice(2, -2).join(";"), a2 = Number(t2.at(-2));
        return r2 === U && ("replace" === n2 || "push" === n2) && "string" == typeof i2 && !isNaN(a2) && a2 in D;
      }
      e.s(["REDIRECT_ERROR_CODE", 0, U, "RedirectType", () => j, "isRedirectError", () => M], 75982);
      let L = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), H = "NEXT_HTTP_ERROR_FALLBACK";
      function q(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let [t2, r2] = e2.digest.split(";");
        return t2 === H && L.has(Number(r2));
      }
      function V(e2) {
        return M(e2) || q(e2);
      }
      e.s(["HTTP_ERROR_FALLBACK_ERROR_CODE", 0, H, "isHTTPAccessFallbackError", () => q], 68585), e.s(["isNextRouterError", () => V], 96588);
    }, 82748, (e) => {
      "use strict";
      var t = e.i(72117);
      let r = Symbol.for("react.postpone");
      var n = e.i(81828), i = e.i(96588), a = e.i(63072), o = e.i(18368);
      e.s(["unstable_rethrow", () => function e2(s) {
        if ((0, i.isNextRouterError)(s) || (0, n.isBailoutToCSRError)(s) || (0, o.isDynamicServerError)(s) || (0, a.isDynamicPostpone)(s) || "object" == typeof s && null !== s && s.$$typeof === r || (0, t.isHangingPromiseRejectionError)(s) || (0, a.isPrerenderInterruptedError)(s)) throw s;
        s instanceof Error && "cause" in s && e2(s.cause);
      }], 82748);
    }, 4589, (e, t, r) => {
      "use strict";
      let n;
      var i = Object.create, a = Object.defineProperty, o = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyNames, l = Object.getPrototypeOf, c = Object.prototype.hasOwnProperty, u = (e10, t10) => () => (e10 && (t10 = e10(e10 = 0)), t10), d = (e10, t10) => () => (t10 || e10((t10 = { exports: {} }).exports, t10), t10.exports), p = (e10, t10) => {
        for (var r10 in t10) a(e10, r10, { get: t10[r10], enumerable: true });
      }, f = (e10, t10, r10, n10) => {
        if (t10 && "object" == typeof t10 || "function" == typeof t10) for (let i10 of s(t10)) c.call(e10, i10) || i10 === r10 || a(e10, i10, { get: () => t10[i10], enumerable: !(n10 = o(t10, i10)) || n10.enumerable });
        return e10;
      }, h = (e10, t10, r10) => (r10 = null != e10 ? i(l(e10)) : {}, f(!t10 && e10 && e10.__esModule ? r10 : a(r10, "default", { value: e10, enumerable: true }), e10));
      function g(e10, t10) {
        if ("utf8" === (t10 = t10.toLowerCase()) || "utf-8" === t10) return new E(k.encode(e10));
        if ("base64" === t10 || "base64url" === t10) return e10 = (e10 = e10.replace(/-/g, "+").replace(/_/g, "/")).replace(/[^A-Za-z0-9+/]/g, ""), new E([...atob(e10)].map((e11) => e11.charCodeAt(0)));
        if ("binary" === t10 || "ascii" === t10 || "latin1" === t10 || "latin-1" === t10) return new E([...e10].map((e11) => e11.charCodeAt(0)));
        if ("ucs2" === t10 || "ucs-2" === t10 || "utf16le" === t10 || "utf-16le" === t10) {
          let t11 = new E(2 * e10.length), r10 = new DataView(t11.buffer);
          for (let t12 = 0; t12 < e10.length; t12++) r10.setUint16(2 * t12, e10.charCodeAt(t12), true);
          return t11;
        }
        if ("hex" === t10) {
          let t11 = new E(e10.length / 2);
          for (let r10 = 0, n10 = 0; n10 < e10.length; n10 += 2, r10++) t11[r10] = parseInt(e10.slice(n10, n10 + 2), 16);
          return t11;
        }
        m(`encoding "${t10}"`);
      }
      function m(e10) {
        throw Error(`Buffer polyfill does not implement "${e10}"`);
      }
      function b(e10, t10) {
        if (!(e10 instanceof Uint8Array)) throw TypeError(`The "${t10}" argument must be an instance of Buffer or Uint8Array`);
      }
      function y(e10, t10, r10 = T + 1) {
        if (e10 < 0 || e10 > r10) {
          let n10 = RangeError(`The value of "${t10}" is out of range. It must be >= 0 && <= ${r10}. Received ${e10}`);
          throw n10.code = "ERR_OUT_OF_RANGE", n10;
        }
      }
      function w(e10, t10) {
        if ("number" != typeof e10) {
          let r10 = TypeError(`The "${t10}" argument must be of type number. Received type ${typeof e10}.`);
          throw r10.code = "ERR_INVALID_ARG_TYPE", r10;
        }
      }
      function _(e10, t10) {
        if (!Number.isInteger(e10) || Number.isNaN(e10)) {
          let r10 = RangeError(`The value of "${t10}" is out of range. It must be an integer. Received ${e10}`);
          throw r10.code = "ERR_OUT_OF_RANGE", r10;
        }
      }
      function v(e10, t10) {
        if ("string" != typeof e10) {
          let r10 = TypeError(`The "${t10}" argument must be of type string. Received type ${typeof e10}`);
          throw r10.code = "ERR_INVALID_ARG_TYPE", r10;
        }
      }
      function x(e10, t10 = "utf8") {
        return E.from(e10, t10);
      }
      var E, S, k, A, P, T, R, C, O, I, N, $, D = u(() => {
        var e10;
        let t10, r10, n10, i10;
        E = class e11 extends Uint8Array {
          _isBuffer = true;
          get offset() {
            return this.byteOffset;
          }
          static alloc(t11, r11 = 0, n11 = "utf8") {
            return v(n11, "encoding"), e11.allocUnsafe(t11).fill(r11, n11);
          }
          static allocUnsafe(t11) {
            return e11.from(t11);
          }
          static allocUnsafeSlow(t11) {
            return e11.from(t11);
          }
          static isBuffer(e12) {
            return e12 && !!e12._isBuffer;
          }
          static byteLength(e12, t11 = "utf8") {
            if ("string" == typeof e12) return g(e12, t11).byteLength;
            if (e12 && e12.byteLength) return e12.byteLength;
            let r11 = TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
            throw r11.code = "ERR_INVALID_ARG_TYPE", r11;
          }
          static isEncoding(e12) {
            return P.includes(e12);
          }
          static compare(e12, t11) {
            b(e12, "buff1"), b(t11, "buff2");
            for (let r11 = 0; r11 < e12.length; r11++) {
              if (e12[r11] < t11[r11]) return -1;
              if (e12[r11] > t11[r11]) return 1;
            }
            return e12.length === t11.length ? 0 : e12.length > t11.length ? 1 : -1;
          }
          static from(t11, r11 = "utf8") {
            if (t11 && "object" == typeof t11 && "Buffer" === t11.type) return new e11(t11.data);
            if ("number" == typeof t11) return new e11(new Uint8Array(t11));
            if ("string" == typeof t11) return g(t11, r11);
            if (ArrayBuffer.isView(t11)) {
              let { byteOffset: r12, byteLength: n11, buffer: i11 } = t11;
              return "map" in t11 && "function" == typeof t11.map ? new e11(t11.map((e12) => e12 % 256), r12, n11) : new e11(i11, r12, n11);
            }
            if (t11 && "object" == typeof t11 && ("length" in t11 || "byteLength" in t11 || "buffer" in t11)) return new e11(t11);
            throw TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          }
          static concat(t11, r11) {
            if (0 === t11.length) return e11.alloc(0);
            let n11 = [].concat(...t11.map((e12) => [...e12])), i11 = e11.alloc(void 0 !== r11 ? r11 : n11.length);
            return i11.set(void 0 !== r11 ? n11.slice(0, r11) : n11), i11;
          }
          slice(e12 = 0, t11 = this.length) {
            return this.subarray(e12, t11);
          }
          subarray(t11 = 0, r11 = this.length) {
            return Object.setPrototypeOf(super.subarray(t11, r11), e11.prototype);
          }
          reverse() {
            return super.reverse(), this;
          }
          readIntBE(e12, t11) {
            w(e12, "offset"), _(e12, "offset"), y(e12, "offset", this.length - 1), w(t11, "byteLength"), _(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 = 256 * n11 + r11.getUint8(e13);
            return 128 & r11.getUint8(0) && (n11 -= Math.pow(256, t11)), n11;
          }
          readIntLE(e12, t11) {
            w(e12, "offset"), _(e12, "offset"), y(e12, "offset", this.length - 1), w(t11, "byteLength"), _(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 += r11.getUint8(e13) * Math.pow(256, e13);
            return 128 & r11.getUint8(t11 - 1) && (n11 -= Math.pow(256, t11)), n11;
          }
          readUIntBE(e12, t11) {
            w(e12, "offset"), _(e12, "offset"), y(e12, "offset", this.length - 1), w(t11, "byteLength"), _(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 = 256 * n11 + r11.getUint8(e13);
            return n11;
          }
          readUintBE(e12, t11) {
            return this.readUIntBE(e12, t11);
          }
          readUIntLE(e12, t11) {
            w(e12, "offset"), _(e12, "offset"), y(e12, "offset", this.length - 1), w(t11, "byteLength"), _(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 += r11.getUint8(e13) * Math.pow(256, e13);
            return n11;
          }
          readUintLE(e12, t11) {
            return this.readUIntLE(e12, t11);
          }
          writeIntBE(e12, t11, r11) {
            return e12 = e12 < 0 ? e12 + Math.pow(256, r11) : e12, this.writeUIntBE(e12, t11, r11);
          }
          writeIntLE(e12, t11, r11) {
            return e12 = e12 < 0 ? e12 + Math.pow(256, r11) : e12, this.writeUIntLE(e12, t11, r11);
          }
          writeUIntBE(e12, t11, r11) {
            w(t11, "offset"), _(t11, "offset"), y(t11, "offset", this.length - 1), w(r11, "byteLength"), _(r11, "byteLength");
            let n11 = new DataView(this.buffer, t11, r11);
            for (let t12 = r11 - 1; t12 >= 0; t12--) n11.setUint8(t12, 255 & e12), e12 /= 256;
            return t11 + r11;
          }
          writeUintBE(e12, t11, r11) {
            return this.writeUIntBE(e12, t11, r11);
          }
          writeUIntLE(e12, t11, r11) {
            w(t11, "offset"), _(t11, "offset"), y(t11, "offset", this.length - 1), w(r11, "byteLength"), _(r11, "byteLength");
            let n11 = new DataView(this.buffer, t11, r11);
            for (let t12 = 0; t12 < r11; t12++) n11.setUint8(t12, 255 & e12), e12 /= 256;
            return t11 + r11;
          }
          writeUintLE(e12, t11, r11) {
            return this.writeUIntLE(e12, t11, r11);
          }
          toJSON() {
            return { type: "Buffer", data: Array.from(this) };
          }
          swap16() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 2) e12.setUint16(t11, e12.getUint16(t11, true), false);
            return this;
          }
          swap32() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 4) e12.setUint32(t11, e12.getUint32(t11, true), false);
            return this;
          }
          swap64() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 8) e12.setBigUint64(t11, e12.getBigUint64(t11, true), false);
            return this;
          }
          compare(t11, r11 = 0, n11 = t11.length, i11 = 0, a2 = this.length) {
            return b(t11, "target"), w(r11, "targetStart"), w(n11, "targetEnd"), w(i11, "sourceStart"), w(a2, "sourceEnd"), y(r11, "targetStart"), y(n11, "targetEnd", t11.length), y(i11, "sourceStart"), y(a2, "sourceEnd", this.length), e11.compare(this.slice(i11, a2), t11.slice(r11, n11));
          }
          equals(e12) {
            return b(e12, "otherBuffer"), this.length === e12.length && this.every((t11, r11) => t11 === e12[r11]);
          }
          copy(e12, t11 = 0, r11 = 0, n11 = this.length) {
            y(t11, "targetStart"), y(r11, "sourceStart", this.length), y(n11, "sourceEnd"), t11 >>>= 0, r11 >>>= 0, n11 >>>= 0;
            let i11 = 0;
            for (; r11 < n11 && void 0 !== this[r11] && void 0 !== e12[t11]; ) e12[t11] = this[r11], i11++, r11++, t11++;
            return i11;
          }
          write(e12, t11, r11, n11 = "utf8") {
            let i11 = "string" == typeof t11 ? 0 : t11 ?? 0, a2 = "string" == typeof r11 ? this.length - i11 : r11 ?? this.length - i11;
            return n11 = "string" == typeof t11 ? t11 : "string" == typeof r11 ? r11 : n11, w(i11, "offset"), w(a2, "length"), y(i11, "offset", this.length), y(a2, "length", this.length), ("ucs2" === n11 || "ucs-2" === n11 || "utf16le" === n11 || "utf-16le" === n11) && (a2 -= a2 % 2), g(e12, n11).copy(this, i11, 0, a2);
          }
          fill(t11 = 0, r11 = 0, n11 = this.length, i11 = "utf-8") {
            let a2 = "string" == typeof r11 ? 0 : r11, o2 = "string" == typeof n11 ? this.length : n11;
            if (i11 = "string" == typeof r11 ? r11 : "string" == typeof n11 ? n11 : i11, t11 = e11.from("number" == typeof t11 ? [t11] : t11 ?? [], i11), v(i11, "encoding"), y(a2, "offset", this.length), y(o2, "end", this.length), 0 !== t11.length) for (let e12 = a2; e12 < o2; e12 += t11.length) super.set(t11.slice(0, t11.length + e12 >= this.length ? this.length - e12 : t11.length), e12);
            return this;
          }
          includes(e12, t11 = null, r11 = "utf-8") {
            return -1 !== this.indexOf(e12, t11, r11);
          }
          lastIndexOf(e12, t11 = null, r11 = "utf-8") {
            return this.indexOf(e12, t11, r11, true);
          }
          indexOf(t11, r11 = null, n11 = "utf-8", i11 = false) {
            let a2 = i11 ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
            n11 = "string" == typeof r11 ? r11 : n11;
            let o2 = e11.from("number" == typeof t11 ? [t11] : t11, n11), s2 = "string" == typeof r11 ? 0 : r11;
            return s2 = Number.isNaN(s2 = "number" == typeof r11 ? s2 : null) ? null : s2, s2 ??= i11 ? this.length : 0, s2 = s2 < 0 ? this.length + s2 : s2, 0 === o2.length && false === i11 ? s2 >= this.length ? this.length : s2 : 0 === o2.length && true === i11 ? (s2 >= this.length ? this.length : s2) || this.length : a2((e12, t12) => (i11 ? t12 <= s2 : t12 >= s2) && this[t12] === o2[0] && o2.every((e13, r12) => this[t12 + r12] === e13));
          }
          toString(e12 = "utf8", t11 = 0, r11 = this.length) {
            if (t11 = t11 < 0 ? 0 : t11, e12 = e12.toString().toLowerCase(), r11 <= 0) return "";
            if ("utf8" === e12 || "utf-8" === e12) return A.decode(this.slice(t11, r11));
            if ("base64" === e12 || "base64url" === e12) {
              let t12 = btoa(this.reduce((e13, t13) => e13 + C(t13), ""));
              return "base64url" === e12 ? t12.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : t12;
            }
            if ("binary" === e12 || "ascii" === e12 || "latin1" === e12 || "latin-1" === e12) return this.slice(t11, r11).reduce((t12, r12) => t12 + C(r12 & ("ascii" === e12 ? 127 : 255)), "");
            if ("ucs2" === e12 || "ucs-2" === e12 || "utf16le" === e12 || "utf-16le" === e12) {
              let e13 = new DataView(this.buffer.slice(t11, r11));
              return Array.from({ length: e13.byteLength / 2 }, (t12, r12) => 2 * r12 + 1 < e13.byteLength ? C(e13.getUint16(2 * r12, true)) : "").join("");
            }
            if ("hex" === e12) return this.slice(t11, r11).reduce((e13, t12) => e13 + t12.toString(16).padStart(2, "0"), "");
            m(`encoding "${e12}"`);
          }
          toLocaleString() {
            return this.toString();
          }
          inspect() {
            return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
          }
        }, S = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, k = new TextEncoder(), A = new TextDecoder(), P = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], T = 4294967295, e10 = E.prototype, r10 = (t10 = Object.getOwnPropertyNames(DataView.prototype).filter((e11) => e11.startsWith("get") || e11.startsWith("set"))).map((e11) => e11.replace("get", "read").replace("set", "write")), n10 = (e11, r11) => function(n11 = 0) {
          return w(n11, "offset"), _(n11, "offset"), y(n11, "offset", this.length - 1), new DataView(this.buffer)[t10[e11]](n11, r11);
        }, i10 = (e11, r11) => function(n11, i11 = 0) {
          let a2 = S[t10[e11].match(/set(\w+\d+)/)[1].toLowerCase()];
          return w(i11, "offset"), _(i11, "offset"), y(i11, "offset", this.length - 1), function(e12, t11, r12, n12) {
            if (e12 < r12 || e12 > n12) {
              let i12 = RangeError(`The value of "${t11}" is out of range. It must be >= ${r12} and <= ${n12}. Received ${e12}`);
              throw i12.code = "ERR_OUT_OF_RANGE", i12;
            }
          }(n11, "value", a2[0], a2[1]), new DataView(this.buffer)[t10[e11]](i11, n11, r11), i11 + parseInt(t10[e11].match(/\d+/)[0]) / 8;
        }, r10.forEach((t11, r11) => {
          t11.startsWith("read") && (e10[t11] = n10(r11, false), e10[t11 + "LE"] = n10(r11, true), e10[t11 + "BE"] = n10(r11, false)), t11.startsWith("write") && (e10[t11] = i10(r11, false), e10[t11 + "LE"] = i10(r11, true), e10[t11 + "BE"] = i10(r11, false)), [t11, t11 + "LE", t11 + "BE"].forEach((t12) => {
            t12.includes("Uint") && (e10[t12.replace("Uint", "UInt")] = e10[t12]), t12.includes("Float64") && (e10[t12.replace("Float64", "Double")] = e10[t12]), t12.includes("Float32") && (e10[t12.replace("Float32", "Float")] = e10[t12]);
          });
        }), R = new Proxy(x, { construct: (e11, [t11, r11]) => E.from(t11, r11), get: (e11, t11) => E[t11] }), C = String.fromCodePoint;
      }), U = u(() => {
        O = { nextTick: (e10, ...t10) => {
          setTimeout(() => {
            e10(...t10);
          }, 0);
        }, env: {}, version: "", cwd: () => "/", stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: I } = O;
      }), j = u(() => {
        globalThis.performance ?? Date.now();
      }), M = u(() => {
        (N = () => {
        }).prototype = N;
      }), L = u(() => {
        $ = class {
          value;
          constructor(e10) {
            this.value = e10;
          }
          deref() {
            return this.value;
          }
        };
      });
      function H(e10, t10) {
        var r10, n10, i10, a2, o2, s2, l2, c2, u2 = e10.constructor, d2 = u2.precision;
        if (!e10.s || !t10.s) return t10.s || (t10 = new u2(e10)), en ? G(t10, d2) : t10;
        if (l2 = e10.d, c2 = t10.d, o2 = e10.e, i10 = t10.e, l2 = l2.slice(), a2 = o2 - i10) {
          for (a2 < 0 ? (n10 = l2, a2 = -a2, s2 = c2.length) : (n10 = c2, i10 = o2, s2 = l2.length), a2 > (s2 = (o2 = Math.ceil(d2 / ep)) > s2 ? o2 + 1 : s2 + 1) && (a2 = s2, n10.length = 1), n10.reverse(); a2--; ) n10.push(0);
          n10.reverse();
        }
        for ((s2 = l2.length) - (a2 = c2.length) < 0 && (a2 = s2, n10 = c2, c2 = l2, l2 = n10), r10 = 0; a2; ) r10 = (l2[--a2] = l2[a2] + c2[a2] + r10) / ed | 0, l2[a2] %= ed;
        for (r10 && (l2.unshift(r10), ++i10), s2 = l2.length; 0 == l2[--s2]; ) l2.pop();
        return t10.d = l2, t10.e = i10, en ? G(t10, d2) : t10;
      }
      function q(e10, t10, r10) {
        if (e10 !== ~~e10 || e10 < t10 || e10 > r10) throw Error(ea + e10);
      }
      function V(e10) {
        var t10, r10, n10, i10 = e10.length - 1, a2 = "", o2 = e10[0];
        if (i10 > 0) {
          for (a2 += o2, t10 = 1; t10 < i10; t10++) n10 = e10[t10] + "", (r10 = ep - n10.length) && (a2 += K(r10)), a2 += n10;
          n10 = (o2 = e10[t10]) + "", (r10 = ep - n10.length) && (a2 += K(r10));
        } else if (0 === o2) return "0";
        for (; o2 % 10 == 0; ) o2 /= 10;
        return a2 + o2;
      }
      function F(e10, t10) {
        var r10, n10, i10, a2, o2, s2 = 0, l2 = 0, c2 = e10.constructor, u2 = c2.precision;
        if (W(e10) > 16) throw Error(eo + W(e10));
        if (!e10.s) return new c2(eu);
        for (null == t10 ? (en = false, o2 = u2) : o2 = t10, a2 = new c2(0.03125); e10.abs().gte(0.1); ) e10 = e10.times(a2), l2 += 5;
        for (o2 += Math.log(el(2, l2)) / Math.LN10 * 2 + 5 | 0, r10 = n10 = i10 = new c2(eu), c2.precision = o2; ; ) {
          if (n10 = G(n10.times(e10), o2), r10 = r10.times(++s2), V((a2 = i10.plus(eg(n10, r10, o2))).d).slice(0, o2) === V(i10.d).slice(0, o2)) {
            for (; l2--; ) i10 = G(i10.times(i10), o2);
            return c2.precision = u2, null == t10 ? (en = true, G(i10, u2)) : i10;
          }
          i10 = a2;
        }
      }
      function W(e10) {
        for (var t10 = e10.e * ep, r10 = e10.d[0]; r10 >= 10; r10 /= 10) t10++;
        return t10;
      }
      function B(e10, t10, r10) {
        if (t10 > e10.LN10.sd()) throw en = true, r10 && (e10.precision = r10), Error(ei + "LN10 precision limit exceeded");
        return G(new e10(e10.LN10), t10);
      }
      function K(e10) {
        for (var t10 = ""; e10--; ) t10 += "0";
        return t10;
      }
      function J(e10, t10) {
        var r10, n10, i10, a2, o2, s2, l2, c2, u2, d2 = 1, p2 = e10, f2 = p2.d, h2 = p2.constructor, g2 = h2.precision;
        if (p2.s < 1) throw Error(ei + (p2.s ? "NaN" : "-Infinity"));
        if (p2.eq(eu)) return new h2(0);
        if (null == t10 ? (en = false, c2 = g2) : c2 = t10, p2.eq(10)) return null == t10 && (en = true), B(h2, c2);
        if (h2.precision = c2 += 10, n10 = (r10 = V(f2)).charAt(0), !(15e14 > Math.abs(a2 = W(p2)))) return l2 = B(h2, c2 + 2, g2).times(a2 + ""), p2 = J(new h2(n10 + "." + r10.slice(1)), c2 - 10).plus(l2), h2.precision = g2, null == t10 ? (en = true, G(p2, g2)) : p2;
        for (; n10 < 7 && 1 != n10 || 1 == n10 && r10.charAt(1) > 3; ) n10 = (r10 = V((p2 = p2.times(e10)).d)).charAt(0), d2++;
        for (a2 = W(p2), n10 > 1 ? (p2 = new h2("0." + r10), a2++) : p2 = new h2(n10 + "." + r10.slice(1)), s2 = o2 = p2 = eg(p2.minus(eu), p2.plus(eu), c2), u2 = G(p2.times(p2), c2), i10 = 3; ; ) {
          if (o2 = G(o2.times(u2), c2), V((l2 = s2.plus(eg(o2, new h2(i10), c2))).d).slice(0, c2) === V(s2.d).slice(0, c2)) return s2 = s2.times(2), 0 !== a2 && (s2 = s2.plus(B(h2, c2 + 2, g2).times(a2 + ""))), s2 = eg(s2, new h2(d2), c2), h2.precision = g2, null == t10 ? (en = true, G(s2, g2)) : s2;
          s2 = l2, i10 += 2;
        }
      }
      function z(e10, t10) {
        var r10, n10, i10;
        for ((r10 = t10.indexOf(".")) > -1 && (t10 = t10.replace(".", "")), (n10 = t10.search(/e/i)) > 0 ? (r10 < 0 && (r10 = n10), r10 += +t10.slice(n10 + 1), t10 = t10.substring(0, n10)) : r10 < 0 && (r10 = t10.length), n10 = 0; 48 === t10.charCodeAt(n10); ) ++n10;
        for (i10 = t10.length; 48 === t10.charCodeAt(i10 - 1); ) --i10;
        if (t10 = t10.slice(n10, i10)) {
          if (i10 -= n10, e10.e = es((r10 = r10 - n10 - 1) / ep), e10.d = [], n10 = (r10 + 1) % ep, r10 < 0 && (n10 += ep), n10 < i10) {
            for (n10 && e10.d.push(+t10.slice(0, n10)), i10 -= ep; n10 < i10; ) e10.d.push(+t10.slice(n10, n10 += ep));
            t10 = t10.slice(n10), n10 = ep - t10.length;
          } else n10 -= i10;
          for (; n10--; ) t10 += "0";
          if (e10.d.push(+t10), en && (e10.e > ef || e10.e < -ef)) throw Error(eo + r10);
        } else e10.s = 0, e10.e = 0, e10.d = [0];
        return e10;
      }
      function G(e10, t10, r10) {
        var n10, i10, a2, o2, s2, l2, c2, u2, d2 = e10.d;
        for (o2 = 1, a2 = d2[0]; a2 >= 10; a2 /= 10) o2++;
        if ((n10 = t10 - o2) < 0) n10 += ep, i10 = t10, c2 = d2[u2 = 0];
        else {
          if ((u2 = Math.ceil((n10 + 1) / ep)) >= (a2 = d2.length)) return e10;
          for (c2 = a2 = d2[u2], o2 = 1; a2 >= 10; a2 /= 10) o2++;
          n10 %= ep, i10 = n10 - ep + o2;
        }
        if (void 0 !== r10 && (s2 = c2 / (a2 = el(10, o2 - i10 - 1)) % 10 | 0, l2 = t10 < 0 || void 0 !== d2[u2 + 1] || c2 % a2, l2 = r10 < 4 ? (s2 || l2) && (0 == r10 || r10 == (e10.s < 0 ? 3 : 2)) : s2 > 5 || 5 == s2 && (4 == r10 || l2 || 6 == r10 && (n10 > 0 ? i10 > 0 ? c2 / el(10, o2 - i10) : 0 : d2[u2 - 1]) % 10 & 1 || r10 == (e10.s < 0 ? 8 : 7))), t10 < 1 || !d2[0]) return l2 ? (a2 = W(e10), d2.length = 1, t10 = t10 - a2 - 1, d2[0] = el(10, (ep - t10 % ep) % ep), e10.e = es(-t10 / ep) || 0) : (d2.length = 1, d2[0] = e10.e = e10.s = 0), e10;
        if (0 == n10 ? (d2.length = u2, a2 = 1, u2--) : (d2.length = u2 + 1, a2 = el(10, ep - n10), d2[u2] = i10 > 0 ? (c2 / el(10, o2 - i10) % el(10, i10) | 0) * a2 : 0), l2) for (; ; ) if (0 == u2) {
          (d2[0] += a2) == ed && (d2[0] = 1, ++e10.e);
          break;
        } else {
          if (d2[u2] += a2, d2[u2] != ed) break;
          d2[u2--] = 0, a2 = 1;
        }
        for (n10 = d2.length; 0 === d2[--n10]; ) d2.pop();
        if (en && (e10.e > ef || e10.e < -ef)) throw Error(eo + W(e10));
        return e10;
      }
      function X(e10, t10) {
        var r10, n10, i10, a2, o2, s2, l2, c2, u2, d2, p2 = e10.constructor, f2 = p2.precision;
        if (!e10.s || !t10.s) return t10.s ? t10.s = -t10.s : t10 = new p2(e10), en ? G(t10, f2) : t10;
        if (l2 = e10.d, d2 = t10.d, n10 = t10.e, c2 = e10.e, l2 = l2.slice(), o2 = c2 - n10) {
          for ((u2 = o2 < 0) ? (r10 = l2, o2 = -o2, s2 = d2.length) : (r10 = d2, n10 = c2, s2 = l2.length), o2 > (i10 = Math.max(Math.ceil(f2 / ep), s2) + 2) && (o2 = i10, r10.length = 1), r10.reverse(), i10 = o2; i10--; ) r10.push(0);
          r10.reverse();
        } else {
          for ((u2 = (i10 = l2.length) < (s2 = d2.length)) && (s2 = i10), i10 = 0; i10 < s2; i10++) if (l2[i10] != d2[i10]) {
            u2 = l2[i10] < d2[i10];
            break;
          }
          o2 = 0;
        }
        for (u2 && (r10 = l2, l2 = d2, d2 = r10, t10.s = -t10.s), s2 = l2.length, i10 = d2.length - s2; i10 > 0; --i10) l2[s2++] = 0;
        for (i10 = d2.length; i10 > o2; ) {
          if (l2[--i10] < d2[i10]) {
            for (a2 = i10; a2 && 0 === l2[--a2]; ) l2[a2] = ed - 1;
            --l2[a2], l2[i10] += ed;
          }
          l2[i10] -= d2[i10];
        }
        for (; 0 === l2[--s2]; ) l2.pop();
        for (; 0 === l2[0]; l2.shift()) --n10;
        return l2[0] ? (t10.d = l2, t10.e = n10, en ? G(t10, f2) : t10) : new p2(0);
      }
      function Q(e10, t10, r10) {
        var n10, i10 = W(e10), a2 = V(e10.d), o2 = a2.length;
        return t10 ? (r10 && (n10 = r10 - o2) > 0 ? a2 = a2.charAt(0) + "." + a2.slice(1) + K(n10) : o2 > 1 && (a2 = a2.charAt(0) + "." + a2.slice(1)), a2 = a2 + (i10 < 0 ? "e" : "e+") + i10) : i10 < 0 ? (a2 = "0." + K(-i10 - 1) + a2, r10 && (n10 = r10 - o2) > 0 && (a2 += K(n10))) : i10 >= o2 ? (a2 += K(i10 + 1 - o2), r10 && (n10 = r10 - i10 - 1) > 0 && (a2 = a2 + "." + K(n10))) : ((n10 = i10 + 1) < o2 && (a2 = a2.slice(0, n10) + "." + a2.slice(n10)), r10 && (n10 = r10 - o2) > 0 && (i10 + 1 === o2 && (a2 += "."), a2 += K(n10))), e10.s < 0 ? "-" + a2 : a2;
      }
      function Y(e10, t10) {
        if (e10.length > t10) return e10.length = t10, true;
      }
      function Z(e10) {
        if (!e10 || "object" != typeof e10) throw Error(ei + "Object expected");
        var t10, r10, n10, i10 = ["precision", 1, ee, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
        for (t10 = 0; t10 < i10.length; t10 += 3) if (void 0 !== (n10 = e10[r10 = i10[t10]])) if (es(n10) === n10 && n10 >= i10[t10 + 1] && n10 <= i10[t10 + 2]) this[r10] = n10;
        else throw Error(ea + r10 + ": " + n10);
        if (void 0 !== (n10 = e10[r10 = "LN10"])) if (n10 == Math.LN10) this[r10] = new this(n10);
        else throw Error(ea + r10 + ": " + n10);
        return this;
      }
      var ee, et, er, en, ei, ea, eo, es, el, ec, eu, ed, ep, ef, eh, eg, em, eb, ey, ew = u(() => {
        D(), U(), j(), M(), L(), e_(), ee = 1e9, et = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, en = true, ea = (ei = "[DecimalError] ") + "Invalid argument: ", eo = ei + "Exponent out of range: ", es = Math.floor, el = Math.pow, ec = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ed = 1e7, ef = es(9007199254740991 / (ep = 7)), (eh = {}).absoluteValue = eh.abs = function() {
          var e10 = new this.constructor(this);
          return e10.s && (e10.s = 1), e10;
        }, eh.comparedTo = eh.cmp = function(e10) {
          var t10, r10, n10, i10;
          if (e10 = new this.constructor(e10), this.s !== e10.s) return this.s || -e10.s;
          if (this.e !== e10.e) return this.e > e10.e ^ this.s < 0 ? 1 : -1;
          for (n10 = this.d.length, i10 = e10.d.length, t10 = 0, r10 = n10 < i10 ? n10 : i10; t10 < r10; ++t10) if (this.d[t10] !== e10.d[t10]) return this.d[t10] > e10.d[t10] ^ this.s < 0 ? 1 : -1;
          return n10 === i10 ? 0 : n10 > i10 ^ this.s < 0 ? 1 : -1;
        }, eh.decimalPlaces = eh.dp = function() {
          var e10 = this.d.length - 1, t10 = (e10 - this.e) * ep;
          if (e10 = this.d[e10]) for (; e10 % 10 == 0; e10 /= 10) t10--;
          return t10 < 0 ? 0 : t10;
        }, eh.dividedBy = eh.div = function(e10) {
          return eg(this, new this.constructor(e10));
        }, eh.dividedToIntegerBy = eh.idiv = function(e10) {
          var t10 = this.constructor;
          return G(eg(this, new t10(e10), 0, 1), t10.precision);
        }, eh.equals = eh.eq = function(e10) {
          return !this.cmp(e10);
        }, eh.exponent = function() {
          return W(this);
        }, eh.greaterThan = eh.gt = function(e10) {
          return this.cmp(e10) > 0;
        }, eh.greaterThanOrEqualTo = eh.gte = function(e10) {
          return this.cmp(e10) >= 0;
        }, eh.isInteger = eh.isint = function() {
          return this.e > this.d.length - 2;
        }, eh.isNegative = eh.isneg = function() {
          return this.s < 0;
        }, eh.isPositive = eh.ispos = function() {
          return this.s > 0;
        }, eh.isZero = function() {
          return 0 === this.s;
        }, eh.lessThan = eh.lt = function(e10) {
          return 0 > this.cmp(e10);
        }, eh.lessThanOrEqualTo = eh.lte = function(e10) {
          return 1 > this.cmp(e10);
        }, eh.logarithm = eh.log = function(e10) {
          var t10, r10 = this.constructor, n10 = r10.precision, i10 = n10 + 5;
          if (void 0 === e10) e10 = new r10(10);
          else if ((e10 = new r10(e10)).s < 1 || e10.eq(eu)) throw Error(ei + "NaN");
          if (this.s < 1) throw Error(ei + (this.s ? "NaN" : "-Infinity"));
          return this.eq(eu) ? new r10(0) : (en = false, t10 = eg(J(this, i10), J(e10, i10), i10), en = true, G(t10, n10));
        }, eh.minus = eh.sub = function(e10) {
          return e10 = new this.constructor(e10), this.s == e10.s ? X(this, e10) : H(this, (e10.s = -e10.s, e10));
        }, eh.modulo = eh.mod = function(e10) {
          var t10, r10 = this.constructor, n10 = r10.precision;
          if (!(e10 = new r10(e10)).s) throw Error(ei + "NaN");
          return this.s ? (en = false, t10 = eg(this, e10, 0, 1).times(e10), en = true, this.minus(t10)) : G(new r10(this), n10);
        }, eh.naturalExponential = eh.exp = function() {
          return F(this);
        }, eh.naturalLogarithm = eh.ln = function() {
          return J(this);
        }, eh.negated = eh.neg = function() {
          var e10 = new this.constructor(this);
          return e10.s = -e10.s || 0, e10;
        }, eh.plus = eh.add = function(e10) {
          return e10 = new this.constructor(e10), this.s == e10.s ? H(this, e10) : X(this, (e10.s = -e10.s, e10));
        }, eh.precision = eh.sd = function(e10) {
          var t10, r10, n10;
          if (void 0 !== e10 && !!e10 !== e10 && 1 !== e10 && 0 !== e10) throw Error(ea + e10);
          if (t10 = W(this) + 1, r10 = (n10 = this.d.length - 1) * ep + 1, n10 = this.d[n10]) {
            for (; n10 % 10 == 0; n10 /= 10) r10--;
            for (n10 = this.d[0]; n10 >= 10; n10 /= 10) r10++;
          }
          return e10 && t10 > r10 ? t10 : r10;
        }, eh.squareRoot = eh.sqrt = function() {
          var e10, t10, r10, n10, i10, a2, o2, s2 = this.constructor;
          if (this.s < 1) {
            if (!this.s) return new s2(0);
            throw Error(ei + "NaN");
          }
          for (e10 = W(this), en = false, 0 == (i10 = Math.sqrt(+this)) || i10 == 1 / 0 ? (((t10 = V(this.d)).length + e10) % 2 == 0 && (t10 += "0"), i10 = Math.sqrt(t10), e10 = es((e10 + 1) / 2) - (e10 < 0 || e10 % 2), n10 = new s2(t10 = i10 == 1 / 0 ? "5e" + e10 : (t10 = i10.toExponential()).slice(0, t10.indexOf("e") + 1) + e10)) : n10 = new s2(i10.toString()), i10 = o2 = (r10 = s2.precision) + 3; ; ) if (n10 = (a2 = n10).plus(eg(this, a2, o2 + 2)).times(0.5), V(a2.d).slice(0, o2) === (t10 = V(n10.d)).slice(0, o2)) {
            if (t10 = t10.slice(o2 - 3, o2 + 1), i10 == o2 && "4999" == t10) {
              if (G(a2, r10 + 1, 0), a2.times(a2).eq(this)) {
                n10 = a2;
                break;
              }
            } else if ("9999" != t10) break;
            o2 += 4;
          }
          return en = true, G(n10, r10);
        }, eh.times = eh.mul = function(e10) {
          var t10, r10, n10, i10, a2, o2, s2, l2, c2, u2 = this.constructor, d2 = this.d, p2 = (e10 = new u2(e10)).d;
          if (!this.s || !e10.s) return new u2(0);
          for (e10.s *= this.s, r10 = this.e + e10.e, (l2 = d2.length) < (c2 = p2.length) && (a2 = d2, d2 = p2, p2 = a2, o2 = l2, l2 = c2, c2 = o2), a2 = [], n10 = o2 = l2 + c2; n10--; ) a2.push(0);
          for (n10 = c2; --n10 >= 0; ) {
            for (t10 = 0, i10 = l2 + n10; i10 > n10; ) s2 = a2[i10] + p2[n10] * d2[i10 - n10 - 1] + t10, a2[i10--] = s2 % ed | 0, t10 = s2 / ed | 0;
            a2[i10] = (a2[i10] + t10) % ed | 0;
          }
          for (; !a2[--o2]; ) a2.pop();
          return t10 ? ++r10 : a2.shift(), e10.d = a2, e10.e = r10, en ? G(e10, u2.precision) : e10;
        }, eh.toDecimalPlaces = eh.todp = function(e10, t10) {
          var r10 = this, n10 = r10.constructor;
          return r10 = new n10(r10), void 0 === e10 ? r10 : (q(e10, 0, ee), void 0 === t10 ? t10 = n10.rounding : q(t10, 0, 8), G(r10, e10 + W(r10) + 1, t10));
        }, eh.toExponential = function(e10, t10) {
          var r10, n10 = this, i10 = n10.constructor;
          return void 0 === e10 ? r10 = Q(n10, true) : (q(e10, 0, ee), void 0 === t10 ? t10 = i10.rounding : q(t10, 0, 8), r10 = Q(n10 = G(new i10(n10), e10 + 1, t10), true, e10 + 1)), r10;
        }, eh.toFixed = function(e10, t10) {
          var r10, n10, i10 = this.constructor;
          return void 0 === e10 ? Q(this) : (q(e10, 0, ee), void 0 === t10 ? t10 = i10.rounding : q(t10, 0, 8), r10 = Q((n10 = G(new i10(this), e10 + W(this) + 1, t10)).abs(), false, e10 + W(n10) + 1), this.isneg() && !this.isZero() ? "-" + r10 : r10);
        }, eh.toInteger = eh.toint = function() {
          var e10 = this.constructor;
          return G(new e10(this), W(this) + 1, e10.rounding);
        }, eh.toNumber = function() {
          return +this;
        }, eh.toPower = eh.pow = function(e10) {
          var t10, r10, n10, i10, a2, o2, s2 = this, l2 = s2.constructor, c2 = +(e10 = new l2(e10));
          if (!e10.s) return new l2(eu);
          if (!(s2 = new l2(s2)).s) {
            if (e10.s < 1) throw Error(ei + "Infinity");
            return s2;
          }
          if (s2.eq(eu)) return s2;
          if (n10 = l2.precision, e10.eq(eu)) return G(s2, n10);
          if (o2 = (t10 = e10.e) >= (r10 = e10.d.length - 1), a2 = s2.s, o2) {
            if ((r10 = c2 < 0 ? -c2 : c2) <= 9007199254740991) {
              for (i10 = new l2(eu), t10 = Math.ceil(n10 / ep + 4), en = false; r10 % 2 && Y((i10 = i10.times(s2)).d, t10), 0 !== (r10 = es(r10 / 2)); ) Y((s2 = s2.times(s2)).d, t10);
              return en = true, e10.s < 0 ? new l2(eu).div(i10) : G(i10, n10);
            }
          } else if (a2 < 0) throw Error(ei + "NaN");
          return a2 = a2 < 0 && 1 & e10.d[Math.max(t10, r10)] ? -1 : 1, s2.s = 1, en = false, i10 = e10.times(J(s2, n10 + 12)), en = true, (i10 = F(i10)).s = a2, i10;
        }, eh.toPrecision = function(e10, t10) {
          var r10, n10, i10 = this, a2 = i10.constructor;
          return void 0 === e10 ? (r10 = W(i10), n10 = Q(i10, r10 <= a2.toExpNeg || r10 >= a2.toExpPos)) : (q(e10, 1, ee), void 0 === t10 ? t10 = a2.rounding : q(t10, 0, 8), r10 = W(i10 = G(new a2(i10), e10, t10)), n10 = Q(i10, e10 <= r10 || r10 <= a2.toExpNeg, e10)), n10;
        }, eh.toSignificantDigits = eh.tosd = function(e10, t10) {
          var r10 = this.constructor;
          return void 0 === e10 ? (e10 = r10.precision, t10 = r10.rounding) : (q(e10, 1, ee), void 0 === t10 ? t10 = r10.rounding : q(t10, 0, 8)), G(new r10(this), e10, t10);
        }, eh.toString = eh.valueOf = eh.val = eh.toJSON = eh[Symbol.for("nodejs.util.inspect.custom")] = function() {
          var e10 = W(this), t10 = this.constructor;
          return Q(this, e10 <= t10.toExpNeg || e10 >= t10.toExpPos);
        }, eg = /* @__PURE__ */ function() {
          function e10(e11, t11) {
            var r11, n10 = 0, i10 = e11.length;
            for (e11 = e11.slice(); i10--; ) r11 = e11[i10] * t11 + n10, e11[i10] = r11 % ed | 0, n10 = r11 / ed | 0;
            return n10 && e11.unshift(n10), e11;
          }
          function t10(e11, t11, r11, n10) {
            var i10, a2;
            if (r11 != n10) a2 = r11 > n10 ? 1 : -1;
            else for (i10 = a2 = 0; i10 < r11; i10++) if (e11[i10] != t11[i10]) {
              a2 = e11[i10] > t11[i10] ? 1 : -1;
              break;
            }
            return a2;
          }
          function r10(e11, t11, r11) {
            for (var n10 = 0; r11--; ) e11[r11] -= n10, n10 = +(e11[r11] < t11[r11]), e11[r11] = n10 * ed + e11[r11] - t11[r11];
            for (; !e11[0] && e11.length > 1; ) e11.shift();
          }
          return function(n10, i10, a2, o2) {
            var s2, l2, c2, u2, d2, p2, f2, h2, g2, m2, b2, y2, w2, _2, v2, x2, E2, S2, k2 = n10.constructor, A2 = n10.s == i10.s ? 1 : -1, P2 = n10.d, T2 = i10.d;
            if (!n10.s) return new k2(n10);
            if (!i10.s) throw Error(ei + "Division by zero");
            for (l2 = n10.e - i10.e, E2 = T2.length, v2 = P2.length, h2 = (f2 = new k2(A2)).d = [], c2 = 0; T2[c2] == (P2[c2] || 0); ) ++c2;
            if (T2[c2] > (P2[c2] || 0) && --l2, (y2 = null == a2 ? a2 = k2.precision : o2 ? a2 + (W(n10) - W(i10)) + 1 : a2) < 0) return new k2(0);
            if (y2 = y2 / ep + 2 | 0, c2 = 0, 1 == E2) for (u2 = 0, T2 = T2[0], y2++; (c2 < v2 || u2) && y2--; c2++) w2 = u2 * ed + (P2[c2] || 0), h2[c2] = w2 / T2 | 0, u2 = w2 % T2 | 0;
            else {
              for ((u2 = ed / (T2[0] + 1) | 0) > 1 && (T2 = e10(T2, u2), P2 = e10(P2, u2), E2 = T2.length, v2 = P2.length), _2 = E2, m2 = (g2 = P2.slice(0, E2)).length; m2 < E2; ) g2[m2++] = 0;
              (S2 = T2.slice()).unshift(0), x2 = T2[0], T2[1] >= ed / 2 && ++x2;
              do
                u2 = 0, (s2 = t10(T2, g2, E2, m2)) < 0 ? (b2 = g2[0], E2 != m2 && (b2 = b2 * ed + (g2[1] || 0)), (u2 = b2 / x2 | 0) > 1 ? (u2 >= ed && (u2 = ed - 1), p2 = (d2 = e10(T2, u2)).length, m2 = g2.length, 1 == (s2 = t10(d2, g2, p2, m2)) && (u2--, r10(d2, E2 < p2 ? S2 : T2, p2))) : (0 == u2 && (s2 = u2 = 1), d2 = T2.slice()), (p2 = d2.length) < m2 && d2.unshift(0), r10(g2, d2, m2), -1 == s2 && (m2 = g2.length, (s2 = t10(T2, g2, E2, m2)) < 1 && (u2++, r10(g2, E2 < m2 ? S2 : T2, m2))), m2 = g2.length) : 0 === s2 && (u2++, g2 = [0]), h2[c2++] = u2, s2 && g2[0] ? g2[m2++] = P2[_2] || 0 : (g2 = [P2[_2]], m2 = 1);
              while ((_2++ < v2 || void 0 !== g2[0]) && y2--);
            }
            return h2[0] || h2.shift(), f2.e = l2, G(f2, o2 ? a2 + W(f2) + 1 : a2);
          };
        }(), eu = new (er = function e10(t10) {
          var r10, n10, i10;
          function a2(e11) {
            if (!(this instanceof a2)) return new a2(e11);
            if (this.constructor = a2, e11 instanceof a2) {
              this.s = e11.s, this.e = e11.e, this.d = (e11 = e11.d) ? e11.slice() : e11;
              return;
            }
            if ("number" == typeof e11) {
              if (0 * e11 != 0) throw Error(ea + e11);
              if (e11 > 0) this.s = 1;
              else if (e11 < 0) e11 = -e11, this.s = -1;
              else {
                this.s = 0, this.e = 0, this.d = [0];
                return;
              }
              if (e11 === ~~e11 && e11 < 1e7) {
                this.e = 0, this.d = [e11];
                return;
              }
              return z(this, e11.toString());
            }
            if ("string" != typeof e11) throw Error(ea + e11);
            if (45 === e11.charCodeAt(0) ? (e11 = e11.slice(1), this.s = -1) : this.s = 1, ec.test(e11)) z(this, e11);
            else throw Error(ea + e11);
          }
          if (a2.prototype = eh, a2.ROUND_UP = 0, a2.ROUND_DOWN = 1, a2.ROUND_CEIL = 2, a2.ROUND_FLOOR = 3, a2.ROUND_HALF_UP = 4, a2.ROUND_HALF_DOWN = 5, a2.ROUND_HALF_EVEN = 6, a2.ROUND_HALF_CEIL = 7, a2.ROUND_HALF_FLOOR = 8, a2.clone = e10, a2.config = a2.set = Z, void 0 === t10 && (t10 = {}), t10) for (i10 = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], r10 = 0; r10 < i10.length; ) t10.hasOwnProperty(n10 = i10[r10++]) || (t10[n10] = this[n10]);
          return a2.config(t10), a2;
        }(et))(1), em = er;
      }), e_ = u(() => {
        ew(), ey = eb = class extends em {
          static isDecimal(e10) {
            return e10 instanceof em;
          }
          static random(e10 = 20) {
            {
              let t10 = globalThis.crypto.getRandomValues(new Uint8Array(e10)).reduce((e11, t11) => e11 + t11, "");
              return new em(`0.${t10.slice(0, e10)}`);
            }
          }
        };
      });
      function ev() {
        return false;
      }
      function ex() {
        return { dev: 0, ino: 0, mode: 0, nlink: 0, uid: 0, gid: 0, rdev: 0, size: 0, blksize: 0, blocks: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0, atime: /* @__PURE__ */ new Date(), mtime: /* @__PURE__ */ new Date(), ctime: /* @__PURE__ */ new Date(), birthtime: /* @__PURE__ */ new Date() };
      }
      function eE() {
        return ex();
      }
      function eS() {
        return [];
      }
      function ek(e10) {
        e10(null, []);
      }
      function eA() {
        return "";
      }
      function eP() {
        return "";
      }
      function eT() {
      }
      function eR() {
      }
      function eC() {
      }
      function eO() {
      }
      function eI() {
      }
      function eN() {
      }
      function e$() {
      }
      function eD() {
      }
      function eU() {
        return { close: () => {
        }, on: () => {
        }, removeAllListeners: () => {
        } };
      }
      function ej(e10, t10) {
        t10(null, ex());
      }
      var eM, eL = u(() => {
        D(), U(), j(), M(), L(), e_(), eM = { existsSync: ev, lstatSync: ex, stat: ej, statSync: eE, readdirSync: eS, readdir: ek, readlinkSync: eA, realpathSync: eP, chmodSync: eT, renameSync: eR, mkdirSync: eC, rmdirSync: eO, rmSync: eI, unlinkSync: eN, watchFile: e$, unwatchFile: eD, watch: eU, promises: {} };
      }), eH = d((e10, t10) => {
        t10.exports = { name: "@prisma/internals", version: "6.19.2", description: "This package is intended for Prisma's internal use", main: "dist/index.js", types: "dist/index.d.ts", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/internals" }, homepage: "https://www.prisma.io", author: "Tim Suchanek <suchanek@prisma.io>", bugs: "https://github.com/prisma/prisma/issues", license: "Apache-2.0", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", test: "dotenv -e ../../.db.env -- jest --silent", prepublishOnly: "pnpm run build" }, files: ["README.md", "dist", "!**/libquery_engine*", "!dist/get-generators/engines/*", "scripts"], devDependencies: { "@babel/helper-validator-identifier": "7.25.9", "@opentelemetry/api": "1.9.0", "@swc/core": "1.11.5", "@swc/jest": "0.2.37", "@types/babel__helper-validator-identifier": "7.15.2", "@types/jest": "29.5.14", "@types/node": "18.19.76", "@types/resolve": "1.20.6", archiver: "6.0.2", "checkpoint-client": "1.1.33", "cli-truncate": "4.0.0", dotenv: "16.5.0", empathic: "2.0.0", "escape-string-regexp": "5.0.0", execa: "8.0.1", "fast-glob": "3.3.3", "find-up": "7.0.0", "fp-ts": "2.16.9", "fs-extra": "11.3.0", "global-directory": "4.0.0", globby: "11.1.0", "identifier-regex": "1.0.0", "indent-string": "4.0.0", "is-windows": "1.0.2", "is-wsl": "3.1.0", jest: "29.7.0", "jest-junit": "16.0.0", kleur: "4.1.5", "mock-stdin": "1.0.0", "new-github-issue-url": "0.2.1", "node-fetch": "3.3.2", "npm-packlist": "5.1.3", open: "7.4.2", "p-map": "4.0.0", resolve: "1.22.10", "string-width": "7.2.0", "strip-indent": "4.0.0", "temp-dir": "2.0.0", tempy: "1.0.1", "terminal-link": "4.0.0", tmp: "0.2.3", "ts-pattern": "5.6.2", "ts-toolbelt": "9.6.0", typescript: "5.4.5", yarn: "1.22.22" }, dependencies: { "@prisma/config": "workspace:*", "@prisma/debug": "workspace:*", "@prisma/dmmf": "workspace:*", "@prisma/driver-adapter-utils": "workspace:*", "@prisma/engines": "workspace:*", "@prisma/fetch-engine": "workspace:*", "@prisma/generator": "workspace:*", "@prisma/generator-helper": "workspace:*", "@prisma/get-platform": "workspace:*", "@prisma/prisma-schema-wasm": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/schema-engine-wasm": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/schema-files-loader": "workspace:*", arg: "5.0.2", prompts: "2.4.2" }, peerDependencies: { typescript: ">=5.1.0" }, peerDependenciesMeta: { typescript: { optional: true } }, sideEffects: false };
      });
      function eq(...e10) {
        return e10.join("/");
      }
      function eV(...e10) {
        return e10.join("/");
      }
      function eF(e10) {
        let t10 = eW(e10), r10 = eB(e10), [n10, i10] = t10.split(".");
        return { root: "/", dir: r10, base: t10, ext: i10, name: n10 };
      }
      function eW(e10) {
        let t10 = e10.split("/");
        return t10[t10.length - 1];
      }
      function eB(e10) {
        return e10.split("/").slice(0, -1).join("/");
      }
      function eK(e10) {
        let t10 = e10.split("/").filter((e11) => "" !== e11 && "." !== e11), r10 = [];
        for (let e11 of t10) ".." === e11 ? r10.pop() : r10.push(e11);
        let n10 = r10.join("/");
        return e10.startsWith("/") ? "/" + n10 : n10;
      }
      var eJ, ez, eG = u(() => {
        D(), U(), j(), M(), L(), e_(), eJ = { basename: eW, delimiter: ":", dirname: eB, join: eV, normalize: eK, parse: eF, posix: { sep: "/" }, resolve: eq, sep: "/" };
      }), eX = d((e10, t10) => {
        t10.exports = { name: "@prisma/engines-version", version: "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
      }), eQ = d((e10) => {
        D(), U(), j(), M(), L(), e_(), Object.defineProperty(e10, "__esModule", { value: true }), e10.enginesVersion = void 0, e10.enginesVersion = eX().prisma.enginesVersion;
      }), eY = d((e10, t10) => {
        D(), U(), j(), M(), L(), e_(), t10.exports = (e11, t11 = 1, r10) => {
          if (r10 = { indent: " ", includeEmptyLines: false, ...r10 }, "string" != typeof e11) throw TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e11}\``);
          if ("number" != typeof t11) throw TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t11}\``);
          if ("string" != typeof r10.indent) throw TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r10.indent}\``);
          if (0 === t11) return e11;
          let n10 = r10.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
          return e11.replace(n10, r10.indent.repeat(t11));
        };
      }), eZ = d((e10, t10) => {
        D(), U(), j(), M(), L(), e_(), t10.exports = /* @__PURE__ */ function() {
          function e11(e12, t11, r10, n10, i10) {
            return e12 < t11 || r10 < t11 ? e12 > r10 ? r10 + 1 : e12 + 1 : n10 === i10 ? t11 : t11 + 1;
          }
          return function(t11, r10) {
            if (t11 === r10) return 0;
            if (t11.length > r10.length) {
              var n10 = t11;
              t11 = r10, r10 = n10;
            }
            for (var i10 = t11.length, a2 = r10.length; i10 > 0 && t11.charCodeAt(i10 - 1) === r10.charCodeAt(a2 - 1); ) i10--, a2--;
            for (var o2 = 0; o2 < i10 && t11.charCodeAt(o2) === r10.charCodeAt(o2); ) o2++;
            if (i10 -= o2, a2 -= o2, 0 === i10 || a2 < 3) return a2;
            var s2, l2, c2, u2, d2, p2, f2, h2, g2, m2, b2, y2, w2 = 0, _2 = [];
            for (s2 = 0; s2 < i10; s2++) _2.push(s2 + 1), _2.push(t11.charCodeAt(o2 + s2));
            for (var v2 = _2.length - 1; w2 < a2 - 3; ) for (g2 = r10.charCodeAt(o2 + (l2 = w2)), m2 = r10.charCodeAt(o2 + (c2 = w2 + 1)), b2 = r10.charCodeAt(o2 + (u2 = w2 + 2)), y2 = r10.charCodeAt(o2 + (d2 = w2 + 3)), p2 = w2 += 4, s2 = 0; s2 < v2; s2 += 2) l2 = e11(f2 = _2[s2], l2, c2, g2, h2 = _2[s2 + 1]), c2 = e11(l2, c2, u2, m2, h2), u2 = e11(c2, u2, d2, b2, h2), p2 = e11(u2, d2, p2, y2, h2), _2[s2] = p2, d2 = u2, u2 = c2, c2 = l2, l2 = f2;
            for (; w2 < a2; ) for (g2 = r10.charCodeAt(o2 + (l2 = w2)), p2 = ++w2, s2 = 0; s2 < v2; s2 += 2) f2 = _2[s2], _2[s2] = p2 = e11(f2, l2, p2, g2, _2[s2 + 1]), l2 = f2;
            return p2;
          };
        }();
      }), e0 = u(() => {
        D(), U(), j(), M(), L(), e_();
      }), e1 = u(() => {
        D(), U(), j(), M(), L(), e_();
      }), e2 = u(() => {
        D(), U(), j(), M(), L(), e_(), ez = class {
          events = {};
          on(e10, t10) {
            return this.events[e10] || (this.events[e10] = []), this.events[e10].push(t10), this;
          }
          emit(e10, ...t10) {
            return !!this.events[e10] && (this.events[e10].forEach((e11) => {
              e11(...t10);
            }), true);
          }
        };
      }), e5 = {};
      p(e5, { DMMF: () => t9, Debug: () => tv, Decimal: () => ey, Extensions: () => e6, MetricsClient: () => r4, PrismaClientInitializationError: () => tG, PrismaClientKnownRequestError: () => tX, PrismaClientRustPanicError: () => tQ, PrismaClientUnknownRequestError: () => tY, PrismaClientValidationError: () => tZ, Public: () => e4, Sql: () => na, createParam: () => rG, defineDmmfProperty: () => r9, deserializeJsonResponse: () => nW, deserializeRawResult: () => i6, dmmfToRuntimeDataModel: () => t5, empty: () => nl, getPrismaClient: () => au, getRuntime: () => nY, join: () => no, makeStrictEnum: () => af, makeTypedQueryFactory: () => nr, objectEnumValues: () => rU, raw: () => ns, serializeJsonQuery: () => r2, skip: () => rY, sqltag: () => nc, warnEnvConflicts: () => void 0, warnOnce: () => tz }), t.exports = f(a({}, "__esModule", { value: true }), e5), D(), U(), j(), M(), L(), e_();
      var e6 = {};
      function e3(e10) {
        return "function" == typeof e10 ? e10 : (t10) => t10.$extends(e10);
      }
      function e8(e10) {
        return e10;
      }
      p(e6, { defineExtension: () => e3, getExtensionContext: () => e8 }), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var e4 = {};
      function e9() {
        return (e10) => e10;
      }
      p(e4, { validator: () => e9 }), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var e7, te, tt, tr, tn = true;
      "u" > typeof O && ({ FORCE_COLOR: e7, NODE_DISABLE_COLORS: te, NO_COLOR: tt, TERM: tr } = O.env || {}, tn = O.stdout && O.stdout.isTTY);
      var ti = { enabled: !te && null == tt && "dumb" !== tr && (null != e7 && "0" !== e7 || tn) };
      function ta(e10, t10) {
        let r10 = RegExp(`\\x1b\\[${t10}m`, "g"), n10 = `\x1B[${e10}m`, i10 = `\x1B[${t10}m`;
        return function(e11) {
          return ti.enabled && null != e11 ? n10 + (~("" + e11).indexOf(i10) ? e11.replace(r10, i10 + n10) : e11) + i10 : e11;
        };
      }
      ta(0, 0);
      var to = ta(1, 22), ts = ta(2, 22), tl = (ta(3, 23), ta(4, 24)), tc = (ta(7, 27), ta(8, 28), ta(9, 29), ta(30, 39), ta(31, 39)), tu = ta(32, 39), td = ta(33, 39), tp = ta(34, 39), tf = (ta(35, 39), ta(36, 39)), th = (ta(37, 39), ta(90, 39));
      ta(90, 39), ta(40, 49), ta(41, 49), ta(42, 49), ta(43, 49), ta(44, 49), ta(45, 49), ta(46, 49), ta(47, 49), D(), U(), j(), M(), L(), e_();
      var tg = ["green", "yellow", "blue", "magenta", "cyan", "red"], tm = [], tb = Date.now(), ty = 0, tw = "u" > typeof O ? O.env : {};
      globalThis.DEBUG ??= tw.DEBUG ?? "", globalThis.DEBUG_COLORS ??= !tw.DEBUG_COLORS || "true" === tw.DEBUG_COLORS;
      var t_ = { enable(e10) {
        "string" == typeof e10 && (globalThis.DEBUG = e10);
      }, disable() {
        let e10 = globalThis.DEBUG;
        return globalThis.DEBUG = "", e10;
      }, enabled(e10) {
        let t10 = globalThis.DEBUG.split(",").map((e11) => e11.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r10 = t10.some((t11) => "" !== t11 && "-" !== t11[0] && e10.match(RegExp(t11.split("*").join(".*") + "$"))), n10 = t10.some((t11) => "" !== t11 && "-" === t11[0] && e10.match(RegExp(t11.slice(1).split("*").join(".*") + "$")));
        return r10 && !n10;
      }, log: (...e10) => {
        let [t10, r10, ...n10] = e10;
        (console.warn ?? console.log)(`${t10} ${r10}`, ...n10);
      }, formatters: {} }, tv = new Proxy(function(e10) {
        let t10 = { color: tg[ty++ % tg.length], enabled: t_.enabled(e10), namespace: e10, log: t_.log, extend: () => {
        } };
        return new Proxy((...e11) => {
          let { enabled: r10, namespace: n10, color: i10, log: a2 } = t10;
          if (0 !== e11.length && tm.push([n10, ...e11]), tm.length > 100 && tm.shift(), t_.enabled(n10) || r10) {
            let t11 = e11.map((e12) => "string" == typeof e12 ? e12 : function(e13, t12 = 2) {
              let r12 = /* @__PURE__ */ new Set();
              return JSON.stringify(e13, (e14, t13) => {
                if ("object" == typeof t13 && null !== t13) {
                  if (r12.has(t13)) return "[Circular *]";
                  r12.add(t13);
                } else if ("bigint" == typeof t13) return t13.toString();
                return t13;
              }, t12);
            }(e12)), r11 = `+${Date.now() - tb}ms`;
            tb = Date.now(), a2(n10, ...t11, r11);
          }
        }, { get: (e11, r10) => t10[r10], set: (e11, r10, n10) => t10[r10] = n10 });
      }, { get: (e10, t10) => t_[t10], set: (e10, t10, r10) => t_[t10] = r10 });
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var tx = eH().version;
      function tE(e10) {
        let t10;
        return ("library" === (t10 = O.env.PRISMA_CLIENT_ENGINE_TYPE) ? "library" : "binary" === t10 ? "binary" : "client" === t10 ? "client" : void 0) || (e10?.config.engineType === "library" ? "library" : e10?.config.engineType === "binary" ? "binary" : e10?.config.engineType === "client" ? "client" : "library");
      }
      function tS(e10) {
        return "DriverAdapterError" === e10.name && "object" == typeof e10.cause;
      }
      function tk(e10) {
        return { ok: true, value: e10, map: (t10) => tk(t10(e10)), flatMap: (t10) => t10(e10) };
      }
      function tA(e10) {
        return { ok: false, error: e10, map: () => tA(e10), flatMap: () => tA(e10) };
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var tP = tv("driver-adapter-utils"), tT = class {
        registeredErrors = [];
        consumeError(e10) {
          return this.registeredErrors[e10];
        }
        registerNewError(e10) {
          let t10 = 0;
          for (; void 0 !== this.registeredErrors[t10]; ) t10++;
          return this.registeredErrors[t10] = { error: e10 }, t10;
        }
      }, tR = (e10, t10 = new tT()) => {
        var r10, n10;
        let i10 = { adapterName: e10.adapterName, errorRegistry: t10, queryRaw: tO(t10, e10.queryRaw.bind(e10)), executeRaw: tO(t10, e10.executeRaw.bind(e10)), executeScript: tO(t10, e10.executeScript.bind(e10)), dispose: tO(t10, e10.dispose.bind(e10)), provider: e10.provider, startTransaction: async (...r11) => (await tO(t10, e10.startTransaction.bind(e10))(...r11)).map((e11) => tC(t10, e11)) };
        return e10.getConnectionInfo && (r10 = t10, n10 = e10.getConnectionInfo.bind(e10), i10.getConnectionInfo = (...e11) => {
          try {
            return tk(n10(...e11));
          } catch (e12) {
            if (tP("[error@wrapSync]", e12), tS(e12)) return tA(e12.cause);
            return tA({ kind: "GenericJs", id: r10.registerNewError(e12) });
          }
        }), i10;
      }, tC = (e10, t10) => ({ adapterName: t10.adapterName, provider: t10.provider, options: t10.options, queryRaw: tO(e10, t10.queryRaw.bind(t10)), executeRaw: tO(e10, t10.executeRaw.bind(t10)), commit: tO(e10, t10.commit.bind(t10)), rollback: tO(e10, t10.rollback.bind(t10)) });
      function tO(e10, t10) {
        return async (...r10) => {
          try {
            return tk(await t10(...r10));
          } catch (t11) {
            if (tP("[error@wrapAsync]", t11), tS(t11)) return tA(t11.cause);
            return tA({ kind: "GenericJs", id: e10.registerNewError(t11) });
          }
        };
      }
      D(), U(), j(), M(), L(), e_();
      var tI = "prisma+postgres:";
      function tN(e10) {
        return e10?.toString().startsWith(`${tI}//`) ?? false;
      }
      var t$ = {};
      p(t$, { error: () => tH, info: () => tL, log: () => tj, query: () => tq, should: () => tU, tags: () => tD, warn: () => tM }), D(), U(), j(), M(), L(), e_();
      var tD = { error: tc("prisma:error"), warn: td("prisma:warn"), info: tf("prisma:info"), query: tp("prisma:query") }, tU = { warn: () => !O.env.PRISMA_DISABLE_WARNINGS };
      function tj(...e10) {
        console.log(...e10);
      }
      function tM(e10, ...t10) {
        tU.warn() && console.warn(`${tD.warn} ${e10}`, ...t10);
      }
      function tL(e10, ...t10) {
        console.info(`${tD.info} ${e10}`, ...t10);
      }
      function tH(e10, ...t10) {
        console.error(`${tD.error} ${e10}`, ...t10);
      }
      function tq(e10, ...t10) {
        console.log(`${tD.query} ${e10}`, ...t10);
      }
      function tV(e10, t10) {
        if (!e10) throw Error(`${t10}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
      }
      function tF(e10, t10) {
        throw Error(t10);
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var tW = function({ onlyFirst: e10 = false } = {}) {
        return RegExp("[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))", e10 ? void 0 : "g");
      }();
      function tB(e10, t10) {
        let r10 = {};
        for (let n10 of Object.keys(e10)) r10[n10] = t10(e10[n10], n10);
        return r10;
      }
      function tK(e10, t10) {
        Object.defineProperty(e10, "name", { value: t10, configurable: true });
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var tJ = /* @__PURE__ */ new Set(), tz = (e10, t10, ...r10) => {
        tJ.has(e10) || (tJ.add(e10), tM(t10, ...r10));
      }, tG = class e10 extends Error {
        clientVersion;
        errorCode;
        retryable;
        constructor(t10, r10, n10) {
          super(t10), this.name = "PrismaClientInitializationError", this.clientVersion = r10, this.errorCode = n10, Error.captureStackTrace(e10);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientInitializationError";
        }
      };
      tK(tG, "PrismaClientInitializationError"), D(), U(), j(), M(), L(), e_();
      var tX = class extends Error {
        code;
        meta;
        clientVersion;
        batchRequestIdx;
        constructor(e10, { code: t10, clientVersion: r10, meta: n10, batchRequestIdx: i10 }) {
          super(e10), this.name = "PrismaClientKnownRequestError", this.code = t10, this.clientVersion = r10, this.meta = n10, Object.defineProperty(this, "batchRequestIdx", { value: i10, enumerable: false, writable: true });
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientKnownRequestError";
        }
      };
      tK(tX, "PrismaClientKnownRequestError"), D(), U(), j(), M(), L(), e_();
      var tQ = class extends Error {
        clientVersion;
        constructor(e10, t10) {
          super(e10), this.name = "PrismaClientRustPanicError", this.clientVersion = t10;
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientRustPanicError";
        }
      };
      tK(tQ, "PrismaClientRustPanicError"), D(), U(), j(), M(), L(), e_();
      var tY = class extends Error {
        clientVersion;
        batchRequestIdx;
        constructor(e10, { clientVersion: t10, batchRequestIdx: r10 }) {
          super(e10), this.name = "PrismaClientUnknownRequestError", this.clientVersion = t10, Object.defineProperty(this, "batchRequestIdx", { value: r10, writable: true, enumerable: false });
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientUnknownRequestError";
        }
      };
      tK(tY, "PrismaClientUnknownRequestError"), D(), U(), j(), M(), L(), e_();
      var tZ = class extends Error {
        name = "PrismaClientValidationError";
        clientVersion;
        constructor(e10, { clientVersion: t10 }) {
          super(e10), this.clientVersion = t10;
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientValidationError";
        }
      };
      tK(tZ, "PrismaClientValidationError"), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var t0 = class {
        _map = /* @__PURE__ */ new Map();
        get(e10) {
          return this._map.get(e10)?.value;
        }
        set(e10, t10) {
          this._map.set(e10, { value: t10 });
        }
        getOrCreate(e10, t10) {
          let r10 = this._map.get(e10);
          if (r10) return r10.value;
          let n10 = t10();
          return this.set(e10, n10), n10;
        }
      };
      function t1(e10) {
        return e10.substring(0, 1).toLowerCase() + e10.substring(1);
      }
      function t2(e10) {
        let t10;
        return { get: () => (t10 || (t10 = { value: e10() }), t10.value) };
      }
      function t5(e10) {
        return { models: t6(e10.models), enums: t6(e10.enums), types: t6(e10.types) };
      }
      function t6(e10) {
        let t10 = {};
        for (let { name: r10, ...n10 } of e10) t10[r10] = n10;
        return t10;
      }
      function t3(e10) {
        return e10 instanceof Date || "[object Date]" === Object.prototype.toString.call(e10);
      }
      function t8(e10) {
        return "Invalid Date" !== e10.toString();
      }
      function t4(e10) {
        return !!eb.isDecimal(e10) || null !== e10 && "object" == typeof e10 && "number" == typeof e10.s && "number" == typeof e10.e && "function" == typeof e10.toFixed && Array.isArray(e10.d);
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var t9 = {};
      function t7(e10) {
        return { name: e10.name, values: e10.values.map((e11) => e11.name) };
      }
      p(t9, { ModelAction: () => re, datamodelEnumToSchemaEnum: () => t7 }), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var re = ((n = re || {}).findUnique = "findUnique", n.findUniqueOrThrow = "findUniqueOrThrow", n.findFirst = "findFirst", n.findFirstOrThrow = "findFirstOrThrow", n.findMany = "findMany", n.create = "create", n.createMany = "createMany", n.createManyAndReturn = "createManyAndReturn", n.update = "update", n.updateMany = "updateMany", n.updateManyAndReturn = "updateManyAndReturn", n.upsert = "upsert", n.delete = "delete", n.deleteMany = "deleteMany", n.groupBy = "groupBy", n.count = "count", n.aggregate = "aggregate", n.findRaw = "findRaw", n.aggregateRaw = "aggregateRaw", n);
      h(eY());
      var rt = { red: tc, gray: th, dim: ts, bold: to, underline: tl, highlightSource: (e10) => e10.highlight() }, rr = { red: (e10) => e10, gray: (e10) => e10, dim: (e10) => e10, bold: (e10) => e10, underline: (e10) => e10, highlightSource: (e10) => e10 };
      function rn(e10) {
        let t10 = e10.showColors ? rt : rr;
        return function({ functionName: e11, location: t11, message: r10, isPanic: n10, contextLines: i10, callArguments: a2 }, o2) {
          var s2;
          let l2, c2 = [""], u2 = t11 ? " in" : ":";
          if (n10 ? (c2.push(o2.red(`Oops, an unknown error occurred! This is ${o2.bold("on us")}, you did nothing wrong.`)), c2.push(o2.red(`It occurred in the ${o2.bold(`\`${e11}\``)} invocation${u2}`))) : c2.push(o2.red(`Invalid ${o2.bold(`\`${e11}\``)} invocation${u2}`)), t11 && c2.push(o2.underline((l2 = [(s2 = t11).fileName], s2.lineNumber && l2.push(String(s2.lineNumber)), s2.columnNumber && l2.push(String(s2.columnNumber)), l2.join(":")))), i10) {
            c2.push("");
            let e12 = [i10.toString()];
            a2 && (e12.push(a2), e12.push(o2.dim(")"))), c2.push(e12.join("")), a2 && c2.push("");
          } else c2.push(""), a2 && c2.push(a2), c2.push("");
          return c2.push(r10), c2.join(`
`);
        }("u" > typeof $getTemplateParameters ? $getTemplateParameters(e10, t10) : function({ message: e11, originalMethod: t11, isPanic: r10, callArguments: n10 }) {
          return { functionName: `prisma.${t11}()`, message: e11, isPanic: r10 ?? false, callArguments: n10 };
        }(e10), t10);
      }
      D(), U(), j(), M(), L(), e_();
      var ri = h(eZ());
      function ra(e10) {
        let t10 = 0;
        return Array.isArray(e10.selectionPath) && (t10 += e10.selectionPath.length), Array.isArray(e10.argumentPath) && (t10 += e10.argumentPath.length), t10;
      }
      function ro(e10) {
        switch (e10.kind) {
          case "InvalidArgumentValue":
          case "ValueTooLarge":
            return 20;
          case "InvalidArgumentType":
            return 10;
          case "RequiredArgumentMissing":
            return -10;
          default:
            return 0;
        }
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var rs = class {
        constructor(e10, t10) {
          this.name = e10, this.value = t10;
        }
        isRequired = false;
        makeRequired() {
          return this.isRequired = true, this;
        }
        write(e10) {
          let { colors: { green: t10 } } = e10.context;
          e10.addMarginSymbol(t10(this.isRequired ? "+" : "?")), e10.write(t10(this.name)), this.isRequired || e10.write(t10("?")), e10.write(t10(": ")), "string" == typeof this.value ? e10.write(t10(this.value)) : e10.write(this.value);
        }
      };
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), e1(), D(), U(), j(), M(), L(), e_();
      var rl = class {
        constructor(e10 = 0, t10) {
          this.context = t10, this.currentIndent = e10;
        }
        lines = [];
        currentLine = "";
        currentIndent = 0;
        marginSymbol;
        afterNextNewLineCallback;
        write(e10) {
          return "string" == typeof e10 ? this.currentLine += e10 : e10.write(this), this;
        }
        writeJoined(e10, t10, r10 = (e11, t11) => t11.write(e11)) {
          let n10 = t10.length - 1;
          for (let i10 = 0; i10 < t10.length; i10++) r10(t10[i10], this), i10 !== n10 && this.write(e10);
          return this;
        }
        writeLine(e10) {
          return this.write(e10).newLine();
        }
        newLine() {
          this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
          let e10 = this.afterNextNewLineCallback;
          return this.afterNextNewLineCallback = void 0, e10?.(), this;
        }
        withIndent(e10) {
          return this.indent(), e10(this), this.unindent(), this;
        }
        afterNextNewline(e10) {
          return this.afterNextNewLineCallback = e10, this;
        }
        indent() {
          return this.currentIndent++, this;
        }
        unindent() {
          return this.currentIndent > 0 && this.currentIndent--, this;
        }
        addMarginSymbol(e10) {
          return this.marginSymbol = e10, this;
        }
        toString() {
          return this.lines.concat(this.indentedCurrentLine()).join(`
`);
        }
        getCurrentLineLength() {
          return this.currentLine.length;
        }
        indentedCurrentLine() {
          let e10 = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
          return this.marginSymbol ? this.marginSymbol + e10.slice(1) : e10;
        }
      };
      e0(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var rc = class {
        constructor(e10) {
          this.value = e10;
        }
        write(e10) {
          e10.write(this.value);
        }
        markAsError() {
          this.value.markAsError();
        }
      };
      D(), U(), j(), M(), L(), e_();
      var ru = (e10) => e10, rd = { bold: ru, red: ru, green: ru, dim: ru, enabled: false }, rp = { bold: to, red: tc, green: tu, dim: ts, enabled: true }, rf = { write(e10) {
        e10.writeLine(",");
      } };
      D(), U(), j(), M(), L(), e_();
      var rh = class {
        constructor(e10) {
          this.contents = e10;
        }
        isUnderlined = false;
        color = (e10) => e10;
        underline() {
          return this.isUnderlined = true, this;
        }
        setColor(e10) {
          return this.color = e10, this;
        }
        write(e10) {
          let t10 = e10.getCurrentLineLength();
          e10.write(this.color(this.contents)), this.isUnderlined && e10.afterNextNewline(() => {
            e10.write(" ".repeat(t10)).writeLine(this.color("~".repeat(this.contents.length)));
          });
        }
      };
      D(), U(), j(), M(), L(), e_();
      var rg = class {
        hasError = false;
        markAsError() {
          return this.hasError = true, this;
        }
      }, rm = class extends rg {
        items = [];
        addItem(e10) {
          return this.items.push(new rc(e10)), this;
        }
        getField(e10) {
          return this.items[e10];
        }
        getPrintWidth() {
          return 0 === this.items.length ? 2 : Math.max(...this.items.map((e10) => e10.value.getPrintWidth())) + 2;
        }
        write(e10) {
          0 === this.items.length ? this.writeEmpty(e10) : this.writeWithItems(e10);
        }
        writeEmpty(e10) {
          let t10 = new rh("[]");
          this.hasError && t10.setColor(e10.context.colors.red).underline(), e10.write(t10);
        }
        writeWithItems(e10) {
          let { colors: t10 } = e10.context;
          e10.writeLine("[").withIndent(() => e10.writeJoined(rf, this.items).newLine()).write("]"), this.hasError && e10.afterNextNewline(() => {
            e10.writeLine(t10.red("~".repeat(this.getPrintWidth())));
          });
        }
        asObject() {
        }
      }, rb = class e10 extends rg {
        fields = {};
        suggestions = [];
        addField(e11) {
          this.fields[e11.name] = e11;
        }
        addSuggestion(e11) {
          this.suggestions.push(e11);
        }
        getField(e11) {
          return this.fields[e11];
        }
        getDeepField(t10) {
          let [r10, ...n10] = t10, i10 = this.getField(r10);
          if (!i10) return;
          let a2 = i10;
          for (let t11 of n10) {
            let r11;
            if (a2.value instanceof e10 ? r11 = a2.value.getField(t11) : a2.value instanceof rm && (r11 = a2.value.getField(Number(t11))), !r11) return;
            a2 = r11;
          }
          return a2;
        }
        getDeepFieldValue(e11) {
          return 0 === e11.length ? this : this.getDeepField(e11)?.value;
        }
        hasField(e11) {
          return !!this.getField(e11);
        }
        removeAllFields() {
          this.fields = {};
        }
        removeField(e11) {
          delete this.fields[e11];
        }
        getFields() {
          return this.fields;
        }
        isEmpty() {
          return 0 === Object.keys(this.fields).length;
        }
        getFieldValue(e11) {
          return this.getField(e11)?.value;
        }
        getDeepSubSelectionValue(t10) {
          let r10 = this;
          for (let n10 of t10) {
            if (!(r10 instanceof e10)) return;
            let t11 = r10.getSubSelectionValue(n10);
            if (!t11) return;
            r10 = t11;
          }
          return r10;
        }
        getDeepSelectionParent(t10) {
          let r10 = this.getSelectionParent();
          if (!r10) return;
          let n10 = r10;
          for (let r11 of t10) {
            let t11 = n10.value.getFieldValue(r11);
            if (!t11 || !(t11 instanceof e10)) return;
            let i10 = t11.getSelectionParent();
            if (!i10) return;
            n10 = i10;
          }
          return n10;
        }
        getSelectionParent() {
          let e11 = this.getField("select")?.value.asObject();
          if (e11) return { kind: "select", value: e11 };
          let t10 = this.getField("include")?.value.asObject();
          if (t10) return { kind: "include", value: t10 };
        }
        getSubSelectionValue(e11) {
          return this.getSelectionParent()?.value.fields[e11].value;
        }
        getPrintWidth() {
          let e11 = Object.values(this.fields);
          return 0 == e11.length ? 2 : Math.max(...e11.map((e12) => e12.getPrintWidth())) + 2;
        }
        write(e11) {
          let t10 = Object.values(this.fields);
          0 === t10.length && 0 === this.suggestions.length ? this.writeEmpty(e11) : this.writeWithContents(e11, t10);
        }
        asObject() {
          return this;
        }
        writeEmpty(e11) {
          let t10 = new rh("{}");
          this.hasError && t10.setColor(e11.context.colors.red).underline(), e11.write(t10);
        }
        writeWithContents(e11, t10) {
          e11.writeLine("{").withIndent(() => {
            e11.writeJoined(rf, [...t10, ...this.suggestions]).newLine();
          }), e11.write("}"), this.hasError && e11.afterNextNewline(() => {
            e11.writeLine(e11.context.colors.red("~".repeat(this.getPrintWidth())));
          });
        }
      };
      D(), U(), j(), M(), L(), e_();
      var ry = class extends rg {
        constructor(e10) {
          super(), this.text = e10;
        }
        getPrintWidth() {
          return this.text.length;
        }
        write(e10) {
          let t10 = new rh(this.text);
          this.hasError && t10.underline().setColor(e10.context.colors.red), e10.write(t10);
        }
        asObject() {
        }
      };
      D(), U(), j(), M(), L(), e_();
      var rw = class {
        fields = [];
        addField(e10, t10) {
          return this.fields.push({ write(r10) {
            let { green: n10, dim: i10 } = r10.context.colors;
            r10.write(n10(i10(`${e10}: ${t10}`))).addMarginSymbol(n10(i10("+")));
          } }), this;
        }
        write(e10) {
          let { colors: { green: t10 } } = e10.context;
          e10.writeLine(t10("{")).withIndent(() => {
            e10.writeJoined(rf, this.fields).newLine();
          }).write(t10("}")).addMarginSymbol(t10("+"));
        }
      };
      function r_(e10, t10, r10) {
        let n10 = [`Unknown argument \`${e10.red(t10)}\`.`], i10 = function(e11, t11) {
          let r11 = 1 / 0, n11;
          for (let i11 of t11) {
            let t12 = (0, ri.default)(e11, i11);
            t12 > 3 || t12 < r11 && (r11 = t12, n11 = i11);
          }
          return n11;
        }(t10, r10);
        return i10 && n10.push(`Did you mean \`${e10.green(i10)}\`?`), r10.length > 0 && n10.push(rk(e10)), n10.join(" ");
      }
      function rv(e10, t10) {
        for (let r10 of t10.fields) e10.hasField(r10.name) || e10.addSuggestion(new rs(r10.name, "true"));
      }
      function rx(e10, t10) {
        let [r10, n10] = rS(e10), i10 = t10.arguments.getDeepSubSelectionValue(r10)?.asObject();
        if (!i10) return { parentKind: "unknown", fieldName: n10 };
        let a2 = i10.getFieldValue("select")?.asObject(), o2 = i10.getFieldValue("include")?.asObject(), s2 = i10.getFieldValue("omit")?.asObject(), l2 = a2?.getField(n10);
        return a2 && l2 ? { parentKind: "select", parent: a2, field: l2, fieldName: n10 } : (l2 = o2?.getField(n10), o2 && l2 ? { parentKind: "include", field: l2, parent: o2, fieldName: n10 } : (l2 = s2?.getField(n10), s2 && l2 ? { parentKind: "omit", field: l2, parent: s2, fieldName: n10 } : { parentKind: "unknown", fieldName: n10 }));
      }
      function rE(e10, t10) {
        if ("object" === t10.kind) for (let r10 of t10.fields) e10.hasField(r10.name) || e10.addSuggestion(new rs(r10.name, r10.typeNames.join(" | ")));
      }
      function rS(e10) {
        let t10 = [...e10], r10 = t10.pop();
        if (!r10) throw Error("unexpected empty path");
        return [t10, r10];
      }
      function rk({ green: e10, enabled: t10 }) {
        return "Available options are " + (t10 ? `listed in ${e10("green")}` : "marked with ?") + ".";
      }
      function rA(e10, t10) {
        if (1 === t10.length) return t10[0];
        let r10 = [...t10], n10 = r10.pop();
        return `${r10.join(", ")} ${e10} ${n10}`;
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var rP = class {
        modelName;
        name;
        typeName;
        isList;
        isEnum;
        constructor(e10, t10, r10, n10, i10) {
          this.modelName = e10, this.name = t10, this.typeName = r10, this.isList = n10, this.isEnum = i10;
        }
        _toGraphQLInputType() {
          let e10 = this.isList ? "List" : "", t10 = this.isEnum ? "Enum" : "";
          return `${e10}${t10}${this.typeName}FieldRefInput<${this.modelName}>`;
        }
      };
      function rT(e10) {
        return e10 instanceof rP;
      }
      D(), U(), j(), M(), L(), e_();
      var rR = Symbol(), rC = /* @__PURE__ */ new WeakMap(), rO = class {
        constructor(e10) {
          e10 === rR ? rC.set(this, `Prisma.${this._getName()}`) : rC.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
        }
        _getName() {
          return this.constructor.name;
        }
        toString() {
          return rC.get(this);
        }
      }, rI = class extends rO {
        _getNamespace() {
          return "NullTypes";
        }
      }, rN = class extends rI {
        #e;
      };
      rj(rN, "DbNull");
      var r$ = class extends rI {
        #e;
      };
      rj(r$, "JsonNull");
      var rD = class extends rI {
        #e;
      };
      rj(rD, "AnyNull");
      var rU = { classes: { DbNull: rN, JsonNull: r$, AnyNull: rD }, instances: { DbNull: new rN(rR), JsonNull: new r$(rR), AnyNull: new rD(rR) } };
      function rj(e10, t10) {
        Object.defineProperty(e10, "name", { value: t10, configurable: true });
      }
      D(), U(), j(), M(), L(), e_();
      var rM = class {
        constructor(e10, t10) {
          this.name = e10, this.value = t10;
        }
        hasError = false;
        markAsError() {
          this.hasError = true;
        }
        getPrintWidth() {
          return this.name.length + this.value.getPrintWidth() + 2;
        }
        write(e10) {
          let t10 = new rh(this.name);
          this.hasError && t10.underline().setColor(e10.context.colors.red), e10.write(t10).write(": ").write(this.value);
        }
      }, rL = class {
        arguments;
        errorMessages = [];
        constructor(e10) {
          this.arguments = e10;
        }
        write(e10) {
          e10.write(this.arguments);
        }
        addErrorMessage(e10) {
          this.errorMessages.push(e10);
        }
        renderAllMessages(e10) {
          return this.errorMessages.map((t10) => t10(e10)).join(`
`);
        }
      };
      function rH(e10) {
        return new rL(rq(e10));
      }
      function rq(e10) {
        let t10 = new rb();
        for (let [r10, n10] of Object.entries(e10)) {
          let e11 = new rM(r10, function e12(t11) {
            if ("string" == typeof t11) return new ry(JSON.stringify(t11));
            if ("number" == typeof t11 || "boolean" == typeof t11) return new ry(String(t11));
            if ("bigint" == typeof t11) return new ry(`${t11}n`);
            if (null === t11) return new ry("null");
            if (void 0 === t11) return new ry("undefined");
            if (t4(t11)) return new ry(`new Prisma.Decimal("${t11.toFixed()}")`);
            if (t11 instanceof Uint8Array) return new ry(R.isBuffer(t11) ? `Buffer.alloc(${t11.byteLength})` : `new Uint8Array(${t11.byteLength})`);
            if (t11 instanceof Date) {
              let e13 = t8(t11) ? t11.toISOString() : "Invalid Date";
              return new ry(`new Date("${e13}")`);
            }
            return t11 instanceof rO ? new ry(`Prisma.${t11._getName()}`) : rT(t11) ? new ry(`prisma.${t1(t11.modelName)}.$fields.${t11.name}`) : Array.isArray(t11) ? function(t12) {
              let r11 = new rm();
              for (let n11 of t12) r11.addItem(e12(n11));
              return r11;
            }(t11) : "object" == typeof t11 ? rq(t11) : new ry(Object.prototype.toString.call(t11));
          }(n10));
          t10.addField(e11);
        }
        return t10;
      }
      function rV(e10, t10) {
        let r10 = "pretty" === t10 ? rp : rd;
        return { message: e10.renderAllMessages(r10), args: new rl(0, { colors: r10 }).write(e10).toString() };
      }
      function rF({ args: e10, errors: t10, errorFormat: r10, callsite: n10, originalMethod: i10, clientVersion: a2, globalOmit: o2 }) {
        let s2 = rH(e10);
        for (let e11 of t10) !function e12(t11, r11, n11) {
          switch (t11.kind) {
            case "MutuallyExclusiveFields":
              let i11;
              p2 = t11, f2 = r11, (i11 = f2.arguments.getDeepSubSelectionValue(p2.selectionPath)?.asObject()) && (i11.getField(p2.firstField)?.markAsError(), i11.getField(p2.secondField)?.markAsError()), f2.addErrorMessage((e13) => `Please ${e13.bold("either")} use ${e13.green(`\`${p2.firstField}\``)} or ${e13.green(`\`${p2.secondField}\``)}, but ${e13.red("not both")} at the same time.`);
              break;
            case "IncludeOnScalar":
              !function(e13, t12) {
                let [r12, n12] = rS(e13.selectionPath), i12 = e13.outputType, a4 = t12.arguments.getDeepSelectionParent(r12)?.value;
                if (a4 && (a4.getField(n12)?.markAsError(), i12)) for (let e14 of i12.fields) e14.isRelation && a4.addSuggestion(new rs(e14.name, "true"));
                t12.addErrorMessage((e14) => {
                  let t13 = `Invalid scalar field ${e14.red(`\`${n12}\``)} for ${e14.bold("include")} statement`;
                  return i12 ? t13 += ` on model ${e14.bold(i12.name)}. ${rk(e14)}` : t13 += ".", t13 += `
Note that ${e14.bold("include")} statements only accept relation fields.`;
                });
              }(t11, r11);
              break;
            case "EmptySelection":
              !function(e13, t12, r12) {
                let n12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (n12) {
                  let r13 = n12.getField("omit")?.value.asObject();
                  if (r13) {
                    var i12, a4, o4 = e13, s4 = t12, l4 = r13;
                    for (let e14 of (l4.removeAllFields(), o4.outputType.fields)) l4.addSuggestion(new rs(e14.name, "false"));
                    s4.addErrorMessage((e14) => `The ${e14.red("omit")} statement includes every field of the model ${e14.bold(o4.outputType.name)}. At least one field must be included in the result`);
                    return;
                  }
                  if (n12.hasField("select")) {
                    let r14, n13, o5;
                    return i12 = e13, a4 = t12, r14 = i12.outputType, n13 = a4.arguments.getDeepSelectionParent(i12.selectionPath)?.value, o5 = n13?.isEmpty() ?? false, n13 && (n13.removeAllFields(), rv(n13, r14)), a4.addErrorMessage((e14) => o5 ? `The ${e14.red("`select`")} statement for type ${e14.bold(r14.name)} must not be empty. ${rk(e14)}` : `The ${e14.red("`select`")} statement for type ${e14.bold(r14.name)} needs ${e14.bold("at least one truthy value")}.`);
                  }
                }
                r12?.[t1(e13.outputType.name)] ? function(e14, t13) {
                  let r13 = new rw();
                  for (let t14 of e14.outputType.fields) t14.isRelation || r13.addField(t14.name, "false");
                  let n13 = new rs("omit", r13).makeRequired();
                  if (0 === e14.selectionPath.length) t13.arguments.addSuggestion(n13);
                  else {
                    let [r14, i13] = rS(e14.selectionPath), a5 = t13.arguments.getDeepSelectionParent(r14)?.value.asObject()?.getField(i13);
                    if (a5) {
                      let e15 = a5?.value.asObject() ?? new rb();
                      e15.addSuggestion(n13), a5.value = e15;
                    }
                  }
                  t13.addErrorMessage((t14) => `The global ${t14.red("omit")} configuration excludes every field of the model ${t14.bold(e14.outputType.name)}. At least one field must be included in the result`);
                }(e13, t12) : t12.addErrorMessage(() => `Unknown field at "${e13.selectionPath.join(".")} selection"`);
              }(t11, r11, n11);
              break;
            case "UnknownSelectionField":
              !function(e13, t12) {
                let r12 = rx(e13.selectionPath, t12);
                if ("unknown" !== r12.parentKind) {
                  r12.field.markAsError();
                  let t13 = r12.parent;
                  switch (r12.parentKind) {
                    case "select":
                      rv(t13, e13.outputType);
                      break;
                    case "include":
                      var n12 = t13, i12 = e13.outputType;
                      for (let e14 of i12.fields) e14.isRelation && !n12.hasField(e14.name) && n12.addSuggestion(new rs(e14.name, "true"));
                      break;
                    case "omit":
                      var a4 = t13, o4 = e13.outputType;
                      for (let e14 of o4.fields) a4.hasField(e14.name) || e14.isRelation || a4.addSuggestion(new rs(e14.name, "true"));
                  }
                }
                t12.addErrorMessage((t13) => {
                  let n13 = [`Unknown field ${t13.red(`\`${r12.fieldName}\``)}`];
                  return "unknown" !== r12.parentKind && n13.push(`for ${t13.bold(r12.parentKind)} statement`), n13.push(`on model ${t13.bold(`\`${e13.outputType.name}\``)}.`), n13.push(rk(t13)), n13.join(" ");
                });
              }(t11, r11);
              break;
            case "InvalidSelectionValue":
              let a3;
              h2 = t11, g2 = r11, "unknown" !== (a3 = rx(h2.selectionPath, g2)).parentKind && a3.field.value.markAsError(), g2.addErrorMessage((e13) => `Invalid value for selection field \`${e13.red(a3.fieldName)}\`: ${h2.underlyingError}`);
              break;
            case "UnknownArgument":
              let o3, s3;
              m2 = t11, b2 = r11, o3 = m2.argumentPath[0], (s3 = b2.arguments.getDeepSubSelectionValue(m2.selectionPath)?.asObject()) && (s3.getField(o3)?.markAsError(), function(e13, t12) {
                for (let r12 of t12) e13.hasField(r12.name) || e13.addSuggestion(new rs(r12.name, r12.typeNames.join(" | ")));
              }(s3, m2.arguments)), b2.addErrorMessage((e13) => r_(e13, o3, m2.arguments.map((e14) => e14.name)));
              break;
            case "UnknownInputField":
              !function(e13, t12) {
                let [r12, n12] = rS(e13.argumentPath), i12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (i12) {
                  i12.getDeepField(e13.argumentPath)?.markAsError();
                  let t13 = i12.getDeepFieldValue(r12)?.asObject();
                  t13 && rE(t13, e13.inputType);
                }
                t12.addErrorMessage((t13) => r_(t13, n12, e13.inputType.fields.map((e14) => e14.name)));
              }(t11, r11);
              break;
            case "RequiredArgumentMissing":
              !function(e13, t12) {
                let r12;
                t12.addErrorMessage((e14) => r12?.value instanceof ry && "null" === r12.value.text ? `Argument \`${e14.green(a4)}\` must not be ${e14.red("null")}.` : `Argument \`${e14.green(a4)}\` is missing.`);
                let n12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (!n12) return;
                let [i12, a4] = rS(e13.argumentPath), o4 = new rw(), s4 = n12.getDeepFieldValue(i12)?.asObject();
                if (s4) {
                  if ((r12 = s4.getField(a4)) && s4.removeField(a4), 1 === e13.inputTypes.length && "object" === e13.inputTypes[0].kind) {
                    for (let t13 of e13.inputTypes[0].fields) o4.addField(t13.name, t13.typeNames.join(" | "));
                    s4.addSuggestion(new rs(a4, o4).makeRequired());
                  } else {
                    let t13 = e13.inputTypes.map(function e14(t14) {
                      return "list" === t14.kind ? `${e14(t14.elementType)}[]` : t14.name;
                    }).join(" | ");
                    s4.addSuggestion(new rs(a4, t13).makeRequired());
                  }
                  if (e13.dependentArgumentPath) {
                    n12.getDeepField(e13.dependentArgumentPath)?.markAsError();
                    let [, r13] = rS(e13.dependentArgumentPath);
                    t12.addErrorMessage((e14) => `Argument \`${e14.green(a4)}\` is required because argument \`${e14.green(r13)}\` was provided.`);
                  }
                }
              }(t11, r11);
              break;
            case "InvalidArgumentType":
              let l3, c3;
              y2 = t11, w2 = r11, l3 = y2.argument.name, (c3 = w2.arguments.getDeepSubSelectionValue(y2.selectionPath)?.asObject()) && c3.getDeepFieldValue(y2.argumentPath)?.markAsError(), w2.addErrorMessage((e13) => {
                let t12 = rA("or", y2.argument.typeNames.map((t13) => e13.green(t13)));
                return `Argument \`${e13.bold(l3)}\`: Invalid value provided. Expected ${t12}, provided ${e13.red(y2.inferredType)}.`;
              });
              break;
            case "InvalidArgumentValue":
              let u2, d2;
              _2 = t11, v2 = r11, u2 = _2.argument.name, (d2 = v2.arguments.getDeepSubSelectionValue(_2.selectionPath)?.asObject()) && d2.getDeepFieldValue(_2.argumentPath)?.markAsError(), v2.addErrorMessage((e13) => {
                let t12 = [`Invalid value for argument \`${e13.bold(u2)}\``];
                if (_2.underlyingError && t12.push(`: ${_2.underlyingError}`), t12.push("."), _2.argument.typeNames.length > 0) {
                  let r12 = rA("or", _2.argument.typeNames.map((t13) => e13.green(t13)));
                  t12.push(` Expected ${r12}.`);
                }
                return t12.join("");
              });
              break;
            case "ValueTooLarge":
              var p2, f2, h2, g2, m2, b2, y2, w2, _2, v2, x2 = t11, E2 = r11;
              let S2 = x2.argument.name, k2 = E2.arguments.getDeepSubSelectionValue(x2.selectionPath)?.asObject(), A2;
              if (k2) {
                let e13 = k2.getDeepField(x2.argumentPath)?.value;
                e13?.markAsError(), e13 instanceof ry && (A2 = e13.text);
              }
              E2.addErrorMessage((e13) => {
                let t12 = ["Unable to fit value"];
                return A2 && t12.push(e13.red(A2)), t12.push(`into a 64-bit signed integer for field \`${e13.bold(S2)}\``), t12.join(" ");
              });
              break;
            case "SomeFieldsMissing":
              var P2 = t11, T2 = r11;
              let R2 = P2.argumentPath[P2.argumentPath.length - 1], C2 = T2.arguments.getDeepSubSelectionValue(P2.selectionPath)?.asObject();
              if (C2) {
                let e13 = C2.getDeepFieldValue(P2.argumentPath)?.asObject();
                e13 && rE(e13, P2.inputType);
              }
              T2.addErrorMessage((e13) => {
                let t12 = [`Argument \`${e13.bold(R2)}\` of type ${e13.bold(P2.inputType.name)} needs`];
                return 1 === P2.constraints.minFieldCount ? P2.constraints.requiredFields ? t12.push(`${e13.green("at least one of")} ${rA("or", P2.constraints.requiredFields.map((t13) => `\`${e13.bold(t13)}\``))} arguments.`) : t12.push(`${e13.green("at least one")} argument.`) : t12.push(`${e13.green(`at least ${P2.constraints.minFieldCount}`)} arguments.`), t12.push(rk(e13)), t12.join(" ");
              });
              break;
            case "TooManyFieldsGiven":
              var O2 = t11, I2 = r11;
              let N2 = O2.argumentPath[O2.argumentPath.length - 1], $2 = I2.arguments.getDeepSubSelectionValue(O2.selectionPath)?.asObject(), D2 = [];
              if ($2) {
                let e13 = $2.getDeepFieldValue(O2.argumentPath)?.asObject();
                e13 && (e13.markAsError(), D2 = Object.keys(e13.getFields()));
              }
              I2.addErrorMessage((e13) => {
                let t12 = [`Argument \`${e13.bold(N2)}\` of type ${e13.bold(O2.inputType.name)} needs`];
                return 1 === O2.constraints.minFieldCount && 1 == O2.constraints.maxFieldCount ? t12.push(`${e13.green("exactly one")} argument,`) : 1 == O2.constraints.maxFieldCount ? t12.push(`${e13.green("at most one")} argument,`) : t12.push(`${e13.green(`at most ${O2.constraints.maxFieldCount}`)} arguments,`), t12.push(`but you provided ${rA("and", D2.map((t13) => e13.red(t13)))}. Please choose`), 1 === O2.constraints.maxFieldCount ? t12.push("one.") : t12.push(`${O2.constraints.maxFieldCount}.`), t12.join(" ");
              });
              break;
            case "Union":
              let U2;
              (U2 = function(e13) {
                if (0 === e13.length) return;
                let t12 = e13[0];
                for (let r12 = 1; r12 < e13.length; r12++) 0 > ((e14, t13) => {
                  let r13 = ra(e14), n12 = ra(t13);
                  return r13 !== n12 ? r13 - n12 : ro(e14) - ro(t13);
                })(t12, e13[r12]) && (t12 = e13[r12]);
                return t12;
              }(function(e13) {
                let t12 = /* @__PURE__ */ new Map(), r12 = [];
                for (let a4 of e13) {
                  var n12, i12;
                  if ("InvalidArgumentType" !== a4.kind) {
                    r12.push(a4);
                    continue;
                  }
                  let e14 = `${a4.selectionPath.join(".")}:${a4.argumentPath.join(".")}`, o4 = t12.get(e14);
                  o4 ? t12.set(e14, { ...a4, argument: { ...a4.argument, typeNames: (n12 = o4.argument.typeNames, i12 = a4.argument.typeNames, [...new Set(n12.concat(i12))]) } }) : t12.set(e14, a4);
                }
                return r12.push(...t12.values()), r12;
              }(function e13(t12) {
                return t12.errors.flatMap((t13) => "Union" === t13.kind ? e13(t13) : [t13]);
              }(t11)))) ? e12(U2, r11, n11) : r11.addErrorMessage(() => "Unknown error");
              break;
            default:
              throw Error("not implemented: " + t11.kind);
          }
        }(e11, s2, o2);
        let { message: l2, args: c2 } = rV(s2, r10);
        throw new tZ(rn({ message: l2, callsite: n10, originalMethod: i10, showColors: "pretty" === r10, callArguments: c2 }), { clientVersion: a2 });
      }
      function rW(e10) {
        return e10.replace(/^./, (e11) => e11.toLowerCase());
      }
      function rB(e10, t10, r10) {
        return r10 ? tB(r10, ({ needs: e11, compute: r11 }, n10) => {
          var i10, a2, o2;
          let s2;
          return { name: n10, needs: e11 ? Object.keys(e11).filter((t11) => e11[t11]) : [], compute: (i10 = t10, a2 = n10, o2 = r11, (s2 = i10?.[a2]?.compute) ? (e12) => o2({ ...e12, [a2]: s2(e12) }) : o2) };
        }) : {};
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var rK = class {
        constructor(e10, t10) {
          this.extension = e10, this.previous = t10;
        }
        computedFieldsCache = new t0();
        modelExtensionsCache = new t0();
        queryCallbacksCache = new t0();
        clientExtensions = t2(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        batchCallbacks = t2(() => {
          let e10 = this.previous?.getAllBatchQueryCallbacks() ?? [], t10 = this.extension.query?.$__internalBatch;
          return t10 ? e10.concat(t10) : e10;
        });
        getAllComputedFields(e10) {
          return this.computedFieldsCache.getOrCreate(e10, () => {
            var t10, r10, n10;
            let i10, a2, o2;
            return t10 = this.previous?.getAllComputedFields(e10), r10 = this.extension, i10 = rW(e10), r10.result && (r10.result.$allModels || r10.result[i10]) ? (n10 = { ...t10, ...rB(r10.name, t10, r10.result.$allModels), ...rB(r10.name, t10, r10.result[i10]) }, a2 = new t0(), o2 = (e11, t11) => a2.getOrCreate(e11, () => t11.has(e11) ? [e11] : (t11.add(e11), n10[e11] ? n10[e11].needs.flatMap((e12) => o2(e12, t11)) : [e11])), tB(n10, (e11) => ({ ...e11, needs: o2(e11.name, /* @__PURE__ */ new Set()) }))) : t10;
          });
        }
        getAllClientExtensions() {
          return this.clientExtensions.get();
        }
        getAllModelExtensions(e10) {
          return this.modelExtensionsCache.getOrCreate(e10, () => {
            let t10 = rW(e10);
            return this.extension.model && (this.extension.model[t10] || this.extension.model.$allModels) ? { ...this.previous?.getAllModelExtensions(e10), ...this.extension.model.$allModels, ...this.extension.model[t10] } : this.previous?.getAllModelExtensions(e10);
          });
        }
        getAllQueryCallbacks(e10, t10) {
          return this.queryCallbacksCache.getOrCreate(`${e10}:${t10}`, () => {
            let r10 = this.previous?.getAllQueryCallbacks(e10, t10) ?? [], n10 = [], i10 = this.extension.query;
            return i10 && (i10[e10] || i10.$allModels || i10[t10] || i10.$allOperations) ? (void 0 !== i10[e10] && (void 0 !== i10[e10][t10] && n10.push(i10[e10][t10]), void 0 !== i10[e10].$allOperations && n10.push(i10[e10].$allOperations)), "$none" !== e10 && void 0 !== i10.$allModels && (void 0 !== i10.$allModels[t10] && n10.push(i10.$allModels[t10]), void 0 !== i10.$allModels.$allOperations && n10.push(i10.$allModels.$allOperations)), void 0 !== i10[t10] && n10.push(i10[t10]), void 0 !== i10.$allOperations && n10.push(i10.$allOperations), r10.concat(n10)) : r10;
          });
        }
        getAllBatchQueryCallbacks() {
          return this.batchCallbacks.get();
        }
      }, rJ = class e10 {
        constructor(e11) {
          this.head = e11;
        }
        static empty() {
          return new e10();
        }
        static single(t10) {
          return new e10(new rK(t10));
        }
        isEmpty() {
          return void 0 === this.head;
        }
        append(t10) {
          return new e10(new rK(t10, this.head));
        }
        getAllComputedFields(e11) {
          return this.head?.getAllComputedFields(e11);
        }
        getAllClientExtensions() {
          return this.head?.getAllClientExtensions();
        }
        getAllModelExtensions(e11) {
          return this.head?.getAllModelExtensions(e11);
        }
        getAllQueryCallbacks(e11, t10) {
          return this.head?.getAllQueryCallbacks(e11, t10) ?? [];
        }
        getAllBatchQueryCallbacks() {
          return this.head?.getAllBatchQueryCallbacks() ?? [];
        }
      };
      D(), U(), j(), M(), L(), e_();
      var rz = class {
        constructor(e10) {
          this.name = e10;
        }
      };
      function rG(e10) {
        return new rz(e10);
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var rX = Symbol(), rQ = class {
        constructor(e10) {
          if (e10 !== rX) throw Error("Skip instance can not be constructed directly");
        }
        ifUndefined(e10) {
          return void 0 === e10 ? rY : e10;
        }
      }, rY = new rQ(rX);
      function rZ(e10) {
        return e10 instanceof rQ;
      }
      var r0 = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" }, r1 = "explicitly `undefined` values are not allowed";
      function r2({ modelName: e10, action: t10, args: r10, runtimeDataModel: n10, extensions: i10 = rJ.empty(), callsite: a2, clientMethod: o2, errorFormat: s2, clientVersion: l2, previewFeatures: c2, globalOmit: u2 }) {
        let d2 = new r3({ runtimeDataModel: n10, modelName: e10, action: t10, rootArgs: r10, callsite: a2, extensions: i10, selectionPath: [], argumentPath: [], originalMethod: o2, errorFormat: s2, clientVersion: l2, previewFeatures: c2, globalOmit: u2 });
        return { modelName: e10, action: r0[t10], query: function e11({ select: t11, include: r11, ...n11 } = {}, i11) {
          var a3, o3, s3, l3, c3, u3, d3;
          let p2, f2 = n11.omit;
          return delete n11.omit, { arguments: r5(n11, i11), selection: (a3 = t11, o3 = r11, s3 = f2, l3 = i11, a3 ? (o3 ? l3.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: l3.getSelectionPath() }) : s3 && l3.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: l3.getSelectionPath() }), function(t12, r12) {
            let n12 = {}, i12 = r12.getComputedFields();
            for (let [a4, o4] of Object.entries(function(e12, t13) {
              if (!t13) return e12;
              let r13 = { ...e12 };
              for (let n13 of Object.values(t13)) if (e12[n13.name]) for (let e13 of n13.needs) r13[e13] = true;
              return r13;
            }(t12, i12))) {
              if (rZ(o4)) continue;
              let t13 = r12.nestSelection(a4);
              r6(o4, t13);
              let s4 = r12.findField(a4);
              if (!(i12?.[a4] && !s4)) {
                if (false === o4 || void 0 === o4 || rZ(o4)) {
                  n12[a4] = false;
                  continue;
                }
                if (true === o4) {
                  s4?.kind === "object" ? n12[a4] = e11({}, t13) : n12[a4] = true;
                  continue;
                }
                n12[a4] = e11(o4, t13);
              }
            }
            return n12;
          }(a3, l3)) : (c3 = l3, u3 = o3, d3 = s3, p2 = {}, c3.modelOrType && !c3.isRawAction() && (p2.$composites = true, p2.$scalars = true), u3 && function(t12, r12, n12) {
            for (let [i12, a4] of Object.entries(r12)) {
              if (rZ(a4)) continue;
              let r13 = n12.nestSelection(i12);
              if (r6(a4, r13), false === a4 || void 0 === a4) {
                t12[i12] = false;
                continue;
              }
              let o4 = n12.findField(i12);
              if (o4 && "object" !== o4.kind && n12.throwValidationError({ kind: "IncludeOnScalar", selectionPath: n12.getSelectionPath().concat(i12), outputType: n12.getOutputTypeDescription() }), o4) {
                t12[i12] = e11(true === a4 ? {} : a4, r13);
                continue;
              }
              if (true === a4) {
                t12[i12] = true;
                continue;
              }
              t12[i12] = e11(a4, r13);
            }
          }(p2, u3, c3), function(e12, t12, r12) {
            let n12 = r12.getComputedFields();
            for (let [i12, a4] of Object.entries(function(e13, t13) {
              if (!t13) return e13;
              let r13 = { ...e13 };
              for (let n13 of Object.values(t13)) if (!e13[n13.name]) for (let e14 of n13.needs) delete r13[e14];
              return r13;
            }({ ...r12.getGlobalOmit(), ...t12 }, n12))) {
              if (rZ(a4)) continue;
              r6(a4, r12.nestSelection(i12));
              let t13 = r12.findField(i12);
              n12?.[i12] && !t13 || (e12[i12] = !a4);
            }
          }(p2, d3, c3), p2)) };
        }(r10, d2) };
      }
      function r5(e10, t10) {
        if (e10.$type) return { $type: "Raw", value: e10 };
        let r10 = {};
        for (let n10 in e10) {
          let i10 = e10[n10], a2 = t10.nestArgument(n10);
          rZ(i10) || (void 0 !== i10 ? r10[n10] = function e11(t11, r11) {
            var n11, i11;
            if (null === t11) return null;
            if ("string" == typeof t11 || "number" == typeof t11 || "boolean" == typeof t11) return t11;
            if ("bigint" == typeof t11) return { $type: "BigInt", value: String(t11) };
            if (t3(t11)) {
              if (t8(t11)) return { $type: "DateTime", value: t11.toISOString() };
              r11.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r11.getSelectionPath(), argumentPath: r11.getArgumentPath(), argument: { name: r11.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
            }
            if (t11 instanceof rz) return { $type: "Param", value: t11.name };
            if (rT(t11)) return { $type: "FieldRef", value: { _ref: t11.name, _container: t11.modelName } };
            if (Array.isArray(t11)) return function(t12, r12) {
              let n12 = [];
              for (let i12 = 0; i12 < t12.length; i12++) {
                let a3 = r12.nestArgument(String(i12)), o2 = t12[i12];
                if (void 0 === o2 || rZ(o2)) {
                  let e12 = void 0 === o2 ? "undefined" : "Prisma.skip";
                  r12.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: a3.getSelectionPath(), argumentPath: a3.getArgumentPath(), argument: { name: `${r12.getArgumentName()}[${i12}]`, typeNames: [] }, underlyingError: `Can not use \`${e12}\` value within array. Use \`null\` or filter out \`${e12}\` values` });
                }
                n12.push(e11(o2, a3));
              }
              return n12;
            }(t11, r11);
            if (ArrayBuffer.isView(t11)) {
              let { buffer: e12, byteOffset: r12, byteLength: n12 } = t11;
              return { $type: "Bytes", value: R.from(e12, r12, n12).toString("base64") };
            }
            if ("object" == typeof (n11 = t11) && null !== n11 && true === n11.__prismaRawParameters__) return t11.values;
            if (t4(t11)) return { $type: "Decimal", value: t11.toFixed() };
            if (t11 instanceof rO) {
              if (t11 !== rU.instances[t11._getName()]) throw Error("Invalid ObjectEnumValue");
              return { $type: "Enum", value: t11._getName() };
            }
            return "object" == typeof (i11 = t11) && null !== i11 && "function" == typeof i11.toJSON ? t11.toJSON() : "object" == typeof t11 ? r5(t11, r11) : void r11.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r11.getSelectionPath(), argumentPath: r11.getArgumentPath(), argument: { name: r11.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(t11)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
          }(i10, a2) : t10.isPreviewFeatureOn("strictUndefinedChecks") && t10.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: a2.getArgumentPath(), selectionPath: t10.getSelectionPath(), argument: { name: t10.getArgumentName(), typeNames: [] }, underlyingError: r1 }));
        }
        return r10;
      }
      function r6(e10, t10) {
        void 0 === e10 && t10.isPreviewFeatureOn("strictUndefinedChecks") && t10.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t10.getSelectionPath(), underlyingError: r1 });
      }
      var r3 = class e10 {
        constructor(e11) {
          this.params = e11, this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
        }
        modelOrType;
        throwValidationError(e11) {
          rF({ errors: [e11], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
        }
        getSelectionPath() {
          return this.params.selectionPath;
        }
        getArgumentPath() {
          return this.params.argumentPath;
        }
        getArgumentName() {
          return this.params.argumentPath[this.params.argumentPath.length - 1];
        }
        getOutputTypeDescription() {
          if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((e11) => ({ name: e11.name, typeName: "boolean", isRelation: "object" === e11.kind })) };
        }
        isRawAction() {
          return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
        }
        isPreviewFeatureOn(e11) {
          return this.params.previewFeatures.includes(e11);
        }
        getComputedFields() {
          if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
        }
        findField(e11) {
          return this.modelOrType?.fields.find((t10) => t10.name === e11);
        }
        nestSelection(t10) {
          let r10 = this.findField(t10), n10 = r10?.kind === "object" ? r10.type : void 0;
          return new e10({ ...this.params, modelName: n10, selectionPath: this.params.selectionPath.concat(t10) });
        }
        getGlobalOmit() {
          return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[t1(this.params.modelName)] ?? {} : {};
        }
        shouldApplyGlobalOmit() {
          switch (this.params.action) {
            case "findFirst":
            case "findFirstOrThrow":
            case "findUniqueOrThrow":
            case "findMany":
            case "upsert":
            case "findUnique":
            case "createManyAndReturn":
            case "create":
            case "update":
            case "updateManyAndReturn":
            case "delete":
              return true;
            case "executeRaw":
            case "aggregateRaw":
            case "runCommandRaw":
            case "findRaw":
            case "createMany":
            case "deleteMany":
            case "groupBy":
            case "updateMany":
            case "count":
            case "aggregate":
            case "queryRaw":
              return false;
            default:
              tF(this.params.action, "Unknown action");
          }
        }
        nestArgument(t10) {
          return new e10({ ...this.params, argumentPath: this.params.argumentPath.concat(t10) });
        }
      };
      function r8(e10) {
        if (!e10._hasPreviewFlag("metrics")) throw new tZ("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: e10._clientVersion });
      }
      D(), U(), j(), M(), L(), e_();
      var r4 = class {
        _client;
        constructor(e10) {
          this._client = e10;
        }
        prometheus(e10) {
          return r8(this._client), this._client._engine.metrics({ format: "prometheus", ...e10 });
        }
        json(e10) {
          return r8(this._client), this._client._engine.metrics({ format: "json", ...e10 });
        }
      };
      function r9(e10, t10) {
        let r10 = t2(() => function(e11) {
          throw Error("Prisma.dmmf is not available when running in edge runtimes.");
        }(0));
        Object.defineProperty(e10, "dmmf", { get: () => r10.get() });
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var r7 = /* @__PURE__ */ new WeakMap(), ne = "$$PrismaTypedSql", nt = class {
        constructor(e10, t10) {
          r7.set(this, { sql: e10, values: t10 }), Object.defineProperty(this, ne, { value: ne });
        }
        get sql() {
          return r7.get(this).sql;
        }
        get values() {
          return r7.get(this).values;
        }
      };
      function nr(e10) {
        return (...t10) => new nt(e10, t10);
      }
      function nn(e10) {
        return null != e10 && e10[ne] === ne;
      }
      D(), U(), j(), M(), L(), e_();
      var ni = h(eX());
      D(), U(), j(), M(), L(), e_(), e2(), eL(), eG(), D(), U(), j(), M(), L(), e_();
      var na = class e10 {
        constructor(t10, r10) {
          if (t10.length - 1 !== r10.length) throw 0 === t10.length ? TypeError("Expected at least 1 string") : TypeError(`Expected ${t10.length} strings to have ${t10.length - 1} values`);
          let n10 = r10.reduce((t11, r11) => t11 + (r11 instanceof e10 ? r11.values.length : 1), 0);
          this.values = Array(n10), this.strings = Array(n10 + 1), this.strings[0] = t10[0];
          let i10 = 0, a2 = 0;
          for (; i10 < r10.length; ) {
            let n11 = r10[i10++], o2 = t10[i10];
            if (n11 instanceof e10) {
              this.strings[a2] += n11.strings[0];
              let e11 = 0;
              for (; e11 < n11.values.length; ) this.values[a2++] = n11.values[e11++], this.strings[a2] = n11.strings[e11];
              this.strings[a2] += o2;
            } else this.values[a2++] = n11, this.strings[a2] = o2;
          }
        }
        get sql() {
          let e11 = this.strings.length, t10 = 1, r10 = this.strings[0];
          for (; t10 < e11; ) r10 += `?${this.strings[t10++]}`;
          return r10;
        }
        get statement() {
          let e11 = this.strings.length, t10 = 1, r10 = this.strings[0];
          for (; t10 < e11; ) r10 += `:${t10}${this.strings[t10++]}`;
          return r10;
        }
        get text() {
          let e11 = this.strings.length, t10 = 1, r10 = this.strings[0];
          for (; t10 < e11; ) r10 += `$${t10}${this.strings[t10++]}`;
          return r10;
        }
        inspect() {
          return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
        }
      };
      function no(e10, t10 = ",", r10 = "", n10 = "") {
        if (0 === e10.length) throw TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
        return new na([r10, ...Array(e10.length - 1).fill(t10), n10], e10);
      }
      function ns(e10) {
        return new na([e10], []);
      }
      var nl = ns("");
      function nc(e10, ...t10) {
        return new na(e10, t10);
      }
      function nu(e10) {
        return { getKeys: () => Object.keys(e10), getPropertyValue: (t10) => e10[t10] };
      }
      function nd(e10, t10) {
        return { getKeys: () => [e10], getPropertyValue: () => t10() };
      }
      function np(e10) {
        let t10 = new t0();
        return { getKeys: () => e10.getKeys(), getPropertyValue: (r10) => t10.getOrCreate(r10, () => e10.getPropertyValue(r10)), getPropertyDescriptor: (t11) => e10.getPropertyDescriptor?.(t11) };
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var nf = { enumerable: true, configurable: true, writable: true };
      function nh(e10) {
        let t10 = new Set(e10);
        return { getPrototypeOf: () => Object.prototype, getOwnPropertyDescriptor: () => nf, has: (e11, r10) => t10.has(r10), set: (e11, r10, n10) => t10.add(r10) && Reflect.set(e11, r10, n10), ownKeys: () => [...t10] };
      }
      var ng = Symbol.for("nodejs.util.inspect.custom");
      function nm(e10, t10) {
        let r10 = function(e11) {
          let t11 = /* @__PURE__ */ new Map();
          for (let r11 of e11) for (let e12 of r11.getKeys()) t11.set(e12, r11);
          return t11;
        }(t10), n10 = /* @__PURE__ */ new Set(), i10 = new Proxy(e10, { get(e11, t11) {
          if (n10.has(t11)) return e11[t11];
          let i11 = r10.get(t11);
          return i11 ? i11.getPropertyValue(t11) : e11[t11];
        }, has(e11, t11) {
          if (n10.has(t11)) return true;
          let i11 = r10.get(t11);
          return i11 ? i11.has?.(t11) ?? true : Reflect.has(e11, t11);
        }, ownKeys: (e11) => [.../* @__PURE__ */ new Set([...nb(Reflect.ownKeys(e11), r10), ...nb(Array.from(r10.keys()), r10), ...n10])], set: (e11, t11, i11) => r10.get(t11)?.getPropertyDescriptor?.(t11)?.writable !== false && (n10.add(t11), Reflect.set(e11, t11, i11)), getOwnPropertyDescriptor(e11, t11) {
          let n11 = Reflect.getOwnPropertyDescriptor(e11, t11);
          if (n11 && !n11.configurable) return n11;
          let i11 = r10.get(t11);
          return i11 ? i11.getPropertyDescriptor ? { ...nf, ...i11?.getPropertyDescriptor(t11) } : nf : n11;
        }, defineProperty: (e11, t11, r11) => (n10.add(t11), Reflect.defineProperty(e11, t11, r11)), getPrototypeOf: () => Object.prototype });
        return i10[ng] = function() {
          let e11 = { ...this };
          return delete e11[ng], e11;
        }, i10;
      }
      function nb(e10, t10) {
        return e10.filter((e11) => t10.get(e11)?.has?.(e11) ?? true);
      }
      function ny(e10) {
        return { getKeys: () => e10, has: () => false, getPropertyValue() {
        } };
      }
      function nw(e10, t10) {
        return { batch: e10, transaction: t10?.kind === "batch" ? { isolationLevel: t10.options.isolationLevel } : void 0 };
      }
      function n_({ error: e10, user_facing_error: t10 }, r10, n10) {
        var i10, a2;
        let o2;
        return t10.error_code ? new tX((i10 = t10, a2 = n10, o2 = i10.message, ("postgresql" === a2 || "postgres" === a2 || "mysql" === a2) && "P2037" === i10.error_code && (o2 += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), o2), { code: t10.error_code, clientVersion: r10, meta: t10.meta, batchRequestIdx: t10.batch_request_idx }) : new tY(e10, { clientVersion: r10, batchRequestIdx: t10.batch_request_idx });
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var nv = class {
        getLocation() {
          return null;
        }
      };
      function nx(e10) {
        return "function" == typeof $EnabledCallSite && "minimal" !== e10 ? new $EnabledCallSite() : new nv();
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var nE = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
      function nS(e10 = {}) {
        return Object.entries(function(e11 = {}) {
          return "boolean" == typeof e11._count ? { ...e11, _count: { _all: e11._count } } : e11;
        }(e10)).reduce((e11, [t10, r10]) => (void 0 !== nE[t10] ? e11.select[t10] = { select: r10 } : e11[t10] = r10, e11), { select: {} });
      }
      function nk(e10 = {}) {
        return (t10) => ("boolean" == typeof e10._count && (t10._count = t10._count._all), t10);
      }
      function nA(e10 = {}) {
        let { select: t10, ...r10 } = e10;
        return "object" == typeof t10 ? nS({ ...r10, _count: t10 }) : nS({ ...r10, _count: { _all: true } });
      }
      function nP(e10 = {}) {
        let t10 = nS(e10);
        if (Array.isArray(t10.by)) for (let e11 of t10.by) "string" == typeof e11 && (t10.select[e11] = true);
        else "string" == typeof t10.by && (t10.select[t10.by] = true);
        return t10;
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var nT = (e10) => Array.isArray(e10) ? e10 : e10.split("."), nR = (e10, t10) => nT(t10).reduce((e11, t11) => e11 && e11[t11], e10), nC = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"], nO = ["aggregate", "count", "groupBy"];
      function nI(e10, t10) {
        var r10, n10, i10, a2;
        let o2, s2, l2 = e10._extensions.getAllModelExtensions(t10) ?? {};
        return nm({}, [(r10 = e10, o2 = rW(n10 = t10), s2 = Object.keys(re).concat("count"), { getKeys: () => s2, getPropertyValue(e11) {
          var t11;
          let i11 = (t12) => (i12) => {
            let a3 = nx(r10._errorFormat);
            return r10._createPrismaPromise((s3) => {
              let l3 = { args: i12, dataPath: [], action: e11, model: n10, clientMethod: `${o2}.${e11}`, jsModelName: o2, transaction: s3, callsite: a3 };
              return r10._request({ ...l3, ...t12 });
            }, { action: e11, args: i12, model: n10 });
          };
          return nC.includes(e11) ? function e12(t12, r11, n11, i12, a3, o3) {
            let s3 = t12._runtimeDataModel.models[r11].fields.reduce((e13, t13) => ({ ...e13, [t13.name]: t13 }), {});
            return (l3) => {
              var c2, u2;
              let d2, p2 = nx(t12._errorFormat), f2 = void 0 === i12 || void 0 === a3 ? [] : [...a3, "select", i12], h2 = void 0 === o3 ? l3 ?? {} : (d2 = l3 || true, nT(f2).reduceRight((e13, t13, r12, n12) => Object.assign({}, nR(o3, n12.slice(0, r12)), { [t13]: e13 }), d2)), g2 = n11({ dataPath: f2, callsite: p2 })(h2), m2 = (c2 = t12, u2 = r11, c2._runtimeDataModel.models[u2].fields.filter((e13) => "object" === e13.kind).map((e13) => e13.name));
              return new Proxy(g2, { get: (r12, i13) => m2.includes(i13) ? e12(t12, s3[i13].type, n11, i13, f2, h2) : r12[i13], ...nh([...m2, ...Object.getOwnPropertyNames(g2)]) });
            };
          }(r10, n10, i11) : (t11 = e11, nO.includes(t11)) ? "aggregate" === e11 ? (e12) => i11({ action: "aggregate", unpacker: nk(e12), argsMapper: nS })(e12) : "count" === e11 ? (e12) => i11({ action: "count", unpacker: function(e13 = {}) {
            return "object" == typeof e13.select ? (t12) => nk(e13)(t12)._count : (t12) => nk(e13)(t12)._count._all;
          }(e12), argsMapper: nA })(e12) : "groupBy" === e11 ? (e12) => i11({ action: "groupBy", unpacker: /* @__PURE__ */ function(e13 = {}) {
            return (t12) => ("boolean" == typeof e13?._count && t12.forEach((e14) => {
              e14._count = e14._count._all;
            }), t12);
          }(e12), argsMapper: nP })(e12) : void 0 : i11({});
        } }), (i10 = e10, a2 = t10, np(nd("fields", () => {
          let e11, t11 = i10._runtimeDataModel.models[a2];
          return new Proxy({}, { get(t12, r11) {
            if (r11 in t12 || "symbol" == typeof r11) return t12[r11];
            let n11 = e11[r11];
            if (n11) return new rP(a2, r11, n11.type, n11.isList, "enum" === n11.kind);
          }, ...nh(Object.keys(e11 = function(e12, t12) {
            let r11 = {};
            for (let n11 of e12) r11[n11[t12]] = n11;
            return r11;
          }(t11.fields.filter((e12) => !e12.relationName), "name"))) });
        }))), nu(l2), nd("name", () => t10), nd("$name", () => t10), nd("$parent", () => e10._appliedParent)]);
      }
      D(), U(), j(), M(), L(), e_();
      var nN = Symbol();
      function n$(e10) {
        var t10, r10;
        let n10, i10, a2, o2, s2 = [(n10 = [...new Set(Object.getOwnPropertyNames(Object.getPrototypeOf((t10 = e10)._originalClient)))], { getKeys: () => n10, getPropertyValue: (e11) => t10[e11] }), (a2 = (i10 = Object.keys((r10 = e10)._runtimeDataModel.models)).map(rW), o2 = [...new Set(i10.concat(a2))], np({ getKeys: () => o2, getPropertyValue(e11) {
          let t11 = e11.replace(/^./, (e12) => e12.toUpperCase());
          return void 0 !== r10._runtimeDataModel.models[t11] ? nI(r10, t11) : void 0 !== r10._runtimeDataModel.models[e11] ? nI(r10, e11) : void 0;
        }, getPropertyDescriptor(e11) {
          if (!a2.includes(e11)) return { enumerable: false };
        } })), nd(nN, () => e10), nd("$parent", () => e10._appliedParent)], l2 = e10._extensions.getAllClientExtensions();
        return l2 && s2.push(nu(l2)), nm(e10, s2);
      }
      function nD(e10) {
        if ("function" == typeof e10) return e10(this);
        if (e10.client?.__AccelerateEngine) {
          let t10 = e10.client.__AccelerateEngine;
          this._originalClient._engine = new t10(this._originalClient._accelerateEngineConfig);
        }
        return n$(Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e10) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } }));
      }
      function nU({ visitor: e10, result: t10, args: r10, runtimeDataModel: n10, modelName: i10 }) {
        if (Array.isArray(t10)) {
          for (let a3 = 0; a3 < t10.length; a3++) t10[a3] = nU({ result: t10[a3], args: r10, modelName: i10, runtimeDataModel: n10, visitor: e10 });
          return t10;
        }
        let a2 = e10(t10, i10, r10) ?? t10;
        return r10.include && nj({ includeOrSelect: r10.include, result: a2, parentModelName: i10, runtimeDataModel: n10, visitor: e10 }), r10.select && nj({ includeOrSelect: r10.select, result: a2, parentModelName: i10, runtimeDataModel: n10, visitor: e10 }), a2;
      }
      function nj({ includeOrSelect: e10, result: t10, parentModelName: r10, runtimeDataModel: n10, visitor: i10 }) {
        for (let [a2, o2] of Object.entries(e10)) {
          if (!o2 || null == t10[a2] || rZ(o2)) continue;
          let e11 = n10.models[r10].fields.find((e12) => e12.name === a2);
          if (!e11 || "object" !== e11.kind || !e11.relationName) continue;
          let s2 = "object" == typeof o2 ? o2 : {};
          t10[a2] = nU({ visitor: i10, result: t10[a2], args: s2, modelName: e11.type, runtimeDataModel: n10 });
        }
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), e_(), D(), U(), j(), M(), L(), e_();
      var nM = ["$connect", "$disconnect", "$on", "$transaction", "$extends"];
      function nL(e10) {
        if ("object" != typeof e10 || null == e10 || e10 instanceof rO || rT(e10)) return e10;
        if (t4(e10)) return new ey(e10.toFixed());
        if (t3(e10)) return /* @__PURE__ */ new Date(+e10);
        if (ArrayBuffer.isView(e10)) return e10.slice(0);
        if (Array.isArray(e10)) {
          let t10 = e10.length, r10;
          for (r10 = Array(t10); t10--; ) r10[t10] = nL(e10[t10]);
          return r10;
        }
        if ("object" == typeof e10) {
          let t10 = {};
          for (let r10 in e10) "__proto__" === r10 ? Object.defineProperty(t10, r10, { value: nL(e10[r10]), configurable: true, enumerable: true, writable: true }) : t10[r10] = nL(e10[r10]);
          return t10;
        }
        tF(e10, "Unknown value");
      }
      var nH = (e10) => e10;
      function nq(e10 = nH, t10 = nH) {
        return (r10) => e10(t10(r10));
      }
      D(), U(), j(), M(), L(), e_();
      var nV = tv("prisma:client"), nF = { Vercel: "vercel", "Netlify CI": "netlify" };
      function nW(e10) {
        return null === e10 ? e10 : Array.isArray(e10) ? e10.map(nW) : "object" == typeof e10 ? null !== e10 && "object" == typeof e10 && "string" == typeof e10.$type ? function({ $type: e11, value: t10 }) {
          switch (e11) {
            case "BigInt":
              return BigInt(t10);
            case "Bytes": {
              let { buffer: e12, byteOffset: r10, byteLength: n10 } = R.from(t10, "base64");
              return new Uint8Array(e12, r10, n10);
            }
            case "DateTime":
              return new Date(t10);
            case "Decimal":
              return new eb(t10);
            case "Json":
              return JSON.parse(t10);
            default:
              throw Error("Unknown tagged value");
          }
        }(e10) : null !== e10.constructor && "Object" !== e10.constructor.name ? e10 : function(e11, t10) {
          let r10 = {};
          for (let n10 of Object.keys(e11)) r10[n10] = t10(e11[n10], n10);
          return r10;
        }(e10, nW) : e10;
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), e_(), D(), U(), j(), M(), L(), e_(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var nB = () => globalThis.process?.release?.name === "node", nK = () => !!globalThis.Bun || !!globalThis.process?.versions?.bun, nJ = () => !!globalThis.Deno, nz = () => "object" == typeof globalThis.Netlify, nG = () => "object" == typeof globalThis.EdgeRuntime, nX = () => globalThis.navigator?.userAgent === "Cloudflare-Workers", nQ = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
      function nY() {
        let e10 = [[nz, "netlify"], [nG, "edge-light"], [nX, "workerd"], [nJ, "deno"], [nK, "bun"], [nB, "node"]].flatMap((e11) => e11[0]() ? [e11[1]] : []).at(0) ?? "";
        return { id: e10, prettyName: nQ[e10] || e10, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e10) };
      }
      function nZ({ inlineDatasources: e10, overrideDatasources: t10, env: r10, clientVersion: n10 }) {
        let i10, a2 = Object.keys(e10)[0], o2 = e10[a2]?.url, s2 = t10[a2]?.url;
        if (void 0 === a2 ? i10 = void 0 : s2 ? i10 = s2 : o2?.value ? i10 = o2.value : o2?.fromEnvVar && (i10 = r10[o2.fromEnvVar]), o2?.fromEnvVar !== void 0 && void 0 === i10) throw "workerd" === nY().id ? new tG(`error: Environment variable not found: ${o2.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n10) : new tG(`error: Environment variable not found: ${o2.fromEnvVar}.`, n10);
        if (void 0 === i10) throw new tG("error: Missing URL environment variable, value, or override.", n10);
        return i10;
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var n0 = class extends Error {
        clientVersion;
        cause;
        constructor(e10, t10) {
          super(e10), this.clientVersion = t10.clientVersion, this.cause = t10.cause;
        }
        get [Symbol.toStringTag]() {
          return this.name;
        }
      }, n1 = class extends n0 {
        isRetryable;
        constructor(e10, t10) {
          super(e10, t10), this.isRetryable = t10.isRetryable ?? true;
        }
      };
      function n2(e10, t10) {
        return { ...e10, isRetryable: t10 };
      }
      D(), U(), j(), M(), L(), e_();
      var n5 = class extends n1 {
        name = "InvalidDatasourceError";
        code = "P6001";
        constructor(e10, t10) {
          super(e10, n2(t10, false));
        }
      };
      tK(n5, "InvalidDatasourceError"), D(), U(), j(), M(), L(), e_();
      var n6 = h(eQ()), n3 = class {
        apiKey;
        tracingHelper;
        logLevel;
        logQueries;
        engineHash;
        constructor({ apiKey: e10, tracingHelper: t10, logLevel: r10, logQueries: n10, engineHash: i10 }) {
          this.apiKey = e10, this.tracingHelper = t10, this.logLevel = r10, this.logQueries = n10, this.engineHash = i10;
        }
        build({ traceparent: e10, transactionId: t10 } = {}) {
          let r10 = { Accept: "application/json", Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json", "Prisma-Engine-Hash": this.engineHash, "Prisma-Engine-Version": n6.enginesVersion };
          this.tracingHelper.isEnabled() && (r10.traceparent = e10 ?? this.tracingHelper.getTraceParent()), t10 && (r10["X-Transaction-Id"] = t10);
          let n10 = this.#e();
          return n10.length > 0 && (r10["X-Capture-Telemetry"] = n10.join(", ")), r10;
        }
        #e() {
          let e10 = [];
          return this.tracingHelper.isEnabled() && e10.push("tracing"), this.logLevel && e10.push(this.logLevel), this.logQueries && e10.push("query"), e10;
        }
      };
      function n8(e10) {
        return new Date(1e3 * e10[0] + e10[1] / 1e6);
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var n4 = class extends n1 {
        name = "ForcedRetryError";
        code = "P5001";
        constructor(e10) {
          super("This request must be retried", n2(e10, true));
        }
      };
      tK(n4, "ForcedRetryError"), D(), U(), j(), M(), L(), e_();
      var n9 = class extends n1 {
        name = "NotImplementedYetError";
        code = "P5004";
        constructor(e10, t10) {
          super(e10, n2(t10, false));
        }
      };
      tK(n9, "NotImplementedYetError"), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var n7 = class extends n1 {
        response;
        constructor(e10, t10) {
          super(e10, t10), this.response = t10.response;
          let r10 = this.response.headers.get("prisma-request-id");
          if (r10) {
            let e11 = `(The request id was: ${r10})`;
            this.message = this.message + " " + e11;
          }
        }
      }, ie = class extends n7 {
        name = "SchemaMissingError";
        code = "P5005";
        constructor(e10) {
          super("Schema needs to be uploaded", n2(e10, true));
        }
      };
      tK(ie, "SchemaMissingError"), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var it = "This request could not be understood by the server", ir = class extends n7 {
        name = "BadRequestError";
        code = "P5000";
        constructor(e10, t10, r10) {
          super(t10 || it, n2(e10, false)), r10 && (this.code = r10);
        }
      };
      tK(ir, "BadRequestError"), D(), U(), j(), M(), L(), e_();
      var ii = class extends n7 {
        name = "HealthcheckTimeoutError";
        code = "P5013";
        logs;
        constructor(e10, t10) {
          super("Engine not started: healthcheck timeout", n2(e10, true)), this.logs = t10;
        }
      };
      tK(ii, "HealthcheckTimeoutError"), D(), U(), j(), M(), L(), e_();
      var ia = class extends n7 {
        name = "EngineStartupError";
        code = "P5014";
        logs;
        constructor(e10, t10, r10) {
          super(t10, n2(e10, true)), this.logs = r10;
        }
      };
      tK(ia, "EngineStartupError"), D(), U(), j(), M(), L(), e_();
      var io = class extends n7 {
        name = "EngineVersionNotSupportedError";
        code = "P5012";
        constructor(e10) {
          super("Engine version is not supported", n2(e10, false));
        }
      };
      tK(io, "EngineVersionNotSupportedError"), D(), U(), j(), M(), L(), e_();
      var is = "Request timed out", il = class extends n7 {
        name = "GatewayTimeoutError";
        code = "P5009";
        constructor(e10, t10 = is) {
          super(t10, n2(e10, false));
        }
      };
      tK(il, "GatewayTimeoutError"), D(), U(), j(), M(), L(), e_();
      var ic = class extends n7 {
        name = "InteractiveTransactionError";
        code = "P5015";
        constructor(e10, t10 = "Interactive transaction error") {
          super(t10, n2(e10, false));
        }
      };
      tK(ic, "InteractiveTransactionError"), D(), U(), j(), M(), L(), e_();
      var iu = class extends n7 {
        name = "InvalidRequestError";
        code = "P5011";
        constructor(e10, t10 = "Request parameters are invalid") {
          super(t10, n2(e10, false));
        }
      };
      tK(iu, "InvalidRequestError"), D(), U(), j(), M(), L(), e_();
      var id = "Requested resource does not exist", ip = class extends n7 {
        name = "NotFoundError";
        code = "P5003";
        constructor(e10, t10 = id) {
          super(t10, n2(e10, false));
        }
      };
      tK(ip, "NotFoundError"), D(), U(), j(), M(), L(), e_();
      var ih = "Unknown server error", ig = class extends n7 {
        name = "ServerError";
        code = "P5006";
        logs;
        constructor(e10, t10, r10) {
          super(t10 || ih, n2(e10, true)), this.logs = r10;
        }
      };
      tK(ig, "ServerError"), D(), U(), j(), M(), L(), e_();
      var im = "Unauthorized, check your connection string", ib = class extends n7 {
        name = "UnauthorizedError";
        code = "P5007";
        constructor(e10, t10 = im) {
          super(t10, n2(e10, false));
        }
      };
      tK(ib, "UnauthorizedError"), D(), U(), j(), M(), L(), e_();
      var iy = "Usage exceeded, retry again later", iw = class extends n7 {
        name = "UsageExceededError";
        code = "P5008";
        constructor(e10, t10 = iy) {
          super(t10, n2(e10, true));
        }
      };
      async function i_(e10) {
        let t10;
        try {
          t10 = await e10.text();
        } catch {
          return { type: "EmptyError" };
        }
        try {
          let e11 = JSON.parse(t10);
          if ("string" == typeof e11) if ("InternalDataProxyError" === e11) return { type: "DataProxyError", body: e11 };
          else return { type: "UnknownTextError", body: e11 };
          if ("object" == typeof e11 && null !== e11) {
            if ("is_panic" in e11 && "message" in e11 && "error_code" in e11) return { type: "QueryEngineError", body: e11 };
            if ("EngineNotStarted" in e11 || "InteractiveTransactionMisrouted" in e11 || "InvalidRequestError" in e11) {
              let t11 = Object.values(e11)[0].reason;
              return "string" != typeof t11 || ["SchemaMissing", "EngineVersionNotSupported"].includes(t11) ? { type: "DataProxyError", body: e11 } : { type: "UnknownJsonError", body: e11 };
            }
          }
          return { type: "UnknownJsonError", body: e11 };
        } catch {
          return "" === t10 ? { type: "EmptyError" } : { type: "UnknownTextError", body: t10 };
        }
      }
      async function iv(e10, t10) {
        if (e10.ok) return;
        let r10 = { clientVersion: t10, response: e10 }, n10 = await i_(e10);
        if ("QueryEngineError" === n10.type) throw new tX(n10.body.message, { code: n10.body.error_code, clientVersion: t10 });
        if ("DataProxyError" === n10.type) {
          if ("InternalDataProxyError" === n10.body) throw new ig(r10, "Internal Data Proxy error");
          if ("EngineNotStarted" in n10.body) {
            if ("SchemaMissing" === n10.body.EngineNotStarted.reason) return new ie(r10);
            if ("EngineVersionNotSupported" === n10.body.EngineNotStarted.reason) throw new io(r10);
            if ("EngineStartupError" in n10.body.EngineNotStarted.reason) {
              let { msg: e11, logs: t11 } = n10.body.EngineNotStarted.reason.EngineStartupError;
              throw new ia(r10, e11, t11);
            }
            if ("KnownEngineStartupError" in n10.body.EngineNotStarted.reason) {
              let { msg: e11, error_code: r11 } = n10.body.EngineNotStarted.reason.KnownEngineStartupError;
              throw new tG(e11, t10, r11);
            }
            if ("HealthcheckTimeout" in n10.body.EngineNotStarted.reason) {
              let { logs: e11 } = n10.body.EngineNotStarted.reason.HealthcheckTimeout;
              throw new ii(r10, e11);
            }
          }
          if ("InteractiveTransactionMisrouted" in n10.body) throw new ic(r10, { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" }[n10.body.InteractiveTransactionMisrouted.reason]);
          if ("InvalidRequestError" in n10.body) throw new iu(r10, n10.body.InvalidRequestError.reason);
        }
        if (401 === e10.status || 403 === e10.status) throw new ib(r10, ix(im, n10));
        if (404 === e10.status) return new ip(r10, ix(id, n10));
        if (429 === e10.status) throw new iw(r10, ix(iy, n10));
        if (504 === e10.status) throw new il(r10, ix(is, n10));
        if (e10.status >= 500) throw new ig(r10, ix(ih, n10));
        if (e10.status >= 400) throw new ir(r10, ix(it, n10));
      }
      function ix(e10, t10) {
        return "EmptyError" === t10.type ? e10 : `${e10}: ${JSON.stringify(t10)}`;
      }
      tK(iw, "UsageExceededError"), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var iE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var iS = class extends n1 {
        name = "RequestError";
        code = "P5010";
        constructor(e10, t10) {
          super(`Cannot fetch data from service:
${e10}`, n2(t10, true));
        }
      };
      async function ik(e10, t10, r10 = (e11) => e11) {
        let { clientVersion: n10, ...i10 } = t10, a2 = r10(fetch);
        try {
          return await a2(e10, i10);
        } catch (e11) {
          throw new iS(e11.message ?? "Unknown error", { clientVersion: n10, cause: e11 });
        }
      }
      tK(iS, "RequestError");
      var iA = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/, iP = tv("prisma:client:dataproxyEngine");
      async function iT(e10, t10) {
        let r10 = t10.clientVersion ?? "unknown";
        if (O.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return O.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
        if (e10.includes("accelerate") && "0.0.0" !== r10 && "in-memory" !== r10) return r10;
        let [n10, i10] = r10?.split("-") ?? [];
        if (void 0 === i10 && iA.test(n10)) return n10;
        if (void 0 !== i10 || "0.0.0" === r10 || "in-memory" === r10) {
          var a2;
          let e11, [t11] = "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7".split("-") ?? [], [n11, i11, o2] = t11.split("."), s2 = (a2 = `<=${n11}.${i11}.${o2}`, encodeURI(`https://unpkg.com/prisma@${a2}/package.json`)), l2 = await ik(s2, { clientVersion: r10 });
          if (!l2.ok) throw Error(`Failed to fetch stable Prisma version, unpkg.com status ${l2.status} ${l2.statusText}, response body: ${await l2.text() || "<empty body>"}`);
          let c2 = await l2.text();
          iP("length of body fetched from unpkg.com", c2.length);
          try {
            e11 = JSON.parse(c2);
          } catch (e12) {
            throw console.error("JSON.parse error: body fetched from unpkg.com: ", c2), e12;
          }
          return e11.version;
        }
        throw new n9("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: r10 });
      }
      async function iR(e10, t10) {
        let r10 = await iT(e10, t10);
        return iP("version", r10), r10;
      }
      var iC = tv("prisma:client:dataproxyEngine"), iO = class {
        name = "DataProxyEngine";
        inlineSchema;
        inlineSchemaHash;
        inlineDatasources;
        config;
        logEmitter;
        env;
        clientVersion;
        engineHash;
        tracingHelper;
        remoteClientVersion;
        host;
        headerBuilder;
        startPromise;
        protocol;
        constructor(e10) {
          (function(e11) {
            if (e11.generator?.previewFeatures.some((e12) => e12.toLowerCase().includes("metrics"))) throw new tG("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e11.clientVersion);
          })(e10), this.config = e10, this.env = e10.env, this.inlineSchema = function(e11) {
            let t10 = new TextEncoder().encode(e11), r10 = "", n10 = t10.byteLength, i10 = n10 % 3, a2 = n10 - i10, o2, s2, l2, c2, u2;
            for (let e12 = 0; e12 < a2; e12 += 3) o2 = (16515072 & (u2 = t10[e12] << 16 | t10[e12 + 1] << 8 | t10[e12 + 2])) >> 18, s2 = (258048 & u2) >> 12, l2 = (4032 & u2) >> 6, c2 = 63 & u2, r10 += iE[o2] + iE[s2] + iE[l2] + iE[c2];
            return 1 == i10 ? (o2 = (252 & (u2 = t10[a2])) >> 2, s2 = (3 & u2) << 4, r10 += iE[o2] + iE[s2] + "==") : 2 == i10 && (o2 = (64512 & (u2 = t10[a2] << 8 | t10[a2 + 1])) >> 10, s2 = (1008 & u2) >> 4, l2 = (15 & u2) << 2, r10 += iE[o2] + iE[s2] + iE[l2] + "="), r10;
          }(e10.inlineSchema), this.inlineDatasources = e10.inlineDatasources, this.inlineSchemaHash = e10.inlineSchemaHash, this.clientVersion = e10.clientVersion, this.engineHash = e10.engineVersion, this.logEmitter = e10.logEmitter, this.tracingHelper = e10.tracingHelper;
        }
        apiKey() {
          return this.headerBuilder.apiKey;
        }
        version() {
          return this.engineHash;
        }
        async start() {
          void 0 !== this.startPromise && await this.startPromise, this.startPromise = (async () => {
            let { apiKey: e10, url: t10 } = this.getURLAndAPIKey();
            this.host = t10.host, this.protocol = t10.protocol, this.headerBuilder = new n3({ apiKey: e10, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel ?? "error", logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await iR(this.host, this.config), iC("host", this.host), iC("protocol", this.protocol);
          })(), await this.startPromise;
        }
        async stop() {
        }
        propagateResponseExtensions(e10) {
          e10?.logs?.length && e10.logs.forEach((e11) => {
            switch (e11.level) {
              case "debug":
              case "trace":
                iC(e11);
                break;
              case "error":
              case "warn":
              case "info":
                this.logEmitter.emit(e11.level, { timestamp: n8(e11.timestamp), message: e11.attributes.message ?? "", target: e11.target ?? "BinaryEngine" });
                break;
              case "query":
                this.logEmitter.emit("query", { query: e11.attributes.query ?? "", timestamp: n8(e11.timestamp), duration: e11.attributes.duration_ms ?? 0, params: e11.attributes.params ?? "", target: e11.target ?? "BinaryEngine" });
                break;
              default:
                e11.level;
            }
          }), e10?.traces?.length && this.tracingHelper.dispatchEngineSpans(e10.traces);
        }
        onBeforeExit() {
          throw Error('"beforeExit" hook is not applicable to the remote query engine');
        }
        async url(e10) {
          return await this.start(), `${this.protocol}//${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${e10}`;
        }
        async uploadSchema() {
          return this.tracingHelper.runInChildSpan({ name: "schemaUpload", internal: true }, async () => {
            let e10 = await ik(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
            e10.ok || iC("schema response status", e10.status);
            let t10 = await iv(e10, this.clientVersion);
            if (t10) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${t10.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), t10;
            this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          });
        }
        request(e10, { traceparent: t10, interactiveTransaction: r10, customDataProxyFetch: n10 }) {
          return this.requestInternal({ body: e10, traceparent: t10, interactiveTransaction: r10, customDataProxyFetch: n10 });
        }
        async requestBatch(e10, { traceparent: t10, transaction: r10, customDataProxyFetch: n10 }) {
          let i10 = r10?.kind === "itx" ? r10.options : void 0, a2 = nw(e10, r10);
          return (await this.requestInternal({ body: a2, customDataProxyFetch: n10, interactiveTransaction: i10, traceparent: t10 })).map((e11) => (e11.extensions && this.propagateResponseExtensions(e11.extensions), "errors" in e11 ? this.convertProtocolErrorsToClientError(e11.errors) : e11));
        }
        requestInternal({ body: e10, traceparent: t10, customDataProxyFetch: r10, interactiveTransaction: n10 }) {
          return this.withRetry({ actionGerund: "querying", callback: async ({ logHttpCall: i10 }) => {
            let a2 = n10 ? `${n10.payload.endpoint}/graphql` : await this.url("graphql");
            i10(a2);
            let o2 = await ik(a2, { method: "POST", headers: this.headerBuilder.build({ traceparent: t10, transactionId: n10?.id }), body: JSON.stringify(e10), clientVersion: this.clientVersion }, r10);
            o2.ok || iC("graphql response status", o2.status), await this.handleError(await iv(o2, this.clientVersion));
            let s2 = await o2.json();
            if (s2.extensions && this.propagateResponseExtensions(s2.extensions), "errors" in s2) throw this.convertProtocolErrorsToClientError(s2.errors);
            return "batchResult" in s2 ? s2.batchResult : s2;
          } });
        }
        async transaction(e10, t10, r10) {
          return this.withRetry({ actionGerund: `${{ start: "starting", commit: "committing", rollback: "rolling back" }[e10]} transaction`, callback: async ({ logHttpCall: n10 }) => {
            if ("start" === e10) {
              let e11 = JSON.stringify({ max_wait: r10.maxWait, timeout: r10.timeout, isolation_level: r10.isolationLevel }), i10 = await this.url("transaction/start");
              n10(i10);
              let a2 = await ik(i10, { method: "POST", headers: this.headerBuilder.build({ traceparent: t10.traceparent }), body: e11, clientVersion: this.clientVersion });
              await this.handleError(await iv(a2, this.clientVersion));
              let o2 = await a2.json(), { extensions: s2 } = o2;
              return s2 && this.propagateResponseExtensions(s2), { id: o2.id, payload: { endpoint: o2["data-proxy"].endpoint } };
            }
            {
              let i10 = `${r10.payload.endpoint}/${e10}`;
              n10(i10);
              let a2 = await ik(i10, { method: "POST", headers: this.headerBuilder.build({ traceparent: t10.traceparent }), clientVersion: this.clientVersion });
              await this.handleError(await iv(a2, this.clientVersion));
              let { extensions: o2 } = await a2.json();
              o2 && this.propagateResponseExtensions(o2);
              return;
            }
          } });
        }
        getURLAndAPIKey() {
          return function(e10) {
            let t10 = { clientVersion: e10.clientVersion }, r10 = Object.keys(e10.inlineDatasources)[0], n10 = nZ({ inlineDatasources: e10.inlineDatasources, overrideDatasources: e10.overrideDatasources, clientVersion: e10.clientVersion, env: { ...e10.env, ..."u" > typeof O ? O.env : {} } }), i10;
            try {
              i10 = new URL(n10);
            } catch {
              throw new n5(`Error validating datasource \`${r10}\`: the URL must start with the protocol \`prisma://\``, t10);
            }
            let { protocol: a2, searchParams: o2 } = i10;
            if ("prisma:" !== a2 && a2 !== tI) throw new n5(`Error validating datasource \`${r10}\`: the URL must start with the protocol \`prisma://\` or \`prisma+postgres://\``, t10);
            let s2 = o2.get("api_key");
            if (null === s2 || s2.length < 1) throw new n5(`Error validating datasource \`${r10}\`: the URL must contain a valid API key`, t10);
            let l2 = !function(e11) {
              if (!tN(e11)) return false;
              let { host: t11 } = new URL(e11);
              return t11.includes("localhost") || t11.includes("127.0.0.1") || t11.includes("[::1]");
            }(i10) ? "https:" : "http:";
            return O.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR && i10.searchParams.has("use_http") && (l2 = "http:"), { apiKey: s2, url: new URL(i10.href.replace(a2, l2)) };
          }({ clientVersion: this.clientVersion, env: this.env, inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources });
        }
        metrics() {
          throw new n9("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
        }
        async withRetry(e10) {
          for (let t10 = 0; ; t10++) {
            let r10 = (e11) => {
              this.logEmitter.emit("info", { message: `Calling ${e11} (n=${t10})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            };
            try {
              return await e10.callback({ logHttpCall: r10 });
            } catch (n10) {
              if (!(n10 instanceof n1) || !n10.isRetryable) throw n10;
              if (t10 >= 3) throw n10 instanceof n4 ? n10.cause : n10;
              this.logEmitter.emit("warn", { message: `Attempt ${t10 + 1}/3 failed for ${e10.actionGerund}: ${n10.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
              let r11 = await function(e11) {
                let t11 = 50 * Math.pow(2, e11), r12 = Math.ceil(Math.random() * t11) - Math.ceil(t11 / 2), n11 = t11 + r12;
                return new Promise((e12) => setTimeout(() => e12(n11), n11));
              }(t10);
              this.logEmitter.emit("warn", { message: `Retrying after ${r11}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            }
          }
        }
        async handleError(e10) {
          if (e10 instanceof ie) throw await this.uploadSchema(), new n4({ clientVersion: this.clientVersion, cause: e10 });
          if (e10) throw e10;
        }
        convertProtocolErrorsToClientError(e10) {
          return 1 === e10.length ? n_(e10[0], this.config.clientVersion, this.config.activeProvider) : new tY(JSON.stringify(e10), { clientVersion: this.config.clientVersion });
        }
        applyPendingMigrations() {
          throw Error("Method not implemented.");
        }
      };
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var iI, iN = { async loadLibrary(e10) {
        let { clientVersion: t10, adapter: r10, engineWasm: n10 } = e10;
        if (void 0 === r10) throw new tG(`The \`adapter\` option for \`PrismaClient\` is required in this context (${nY().prettyName})`, t10);
        if (void 0 === n10) throw new tG("WASM engine was unexpectedly `undefined`", t10);
        return void 0 === iI && (iI = (async () => {
          let e11 = await n10.getRuntime(), r11 = await n10.getQueryEngineWasmModule();
          if (null == r11) throw new tG("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t10);
          let i10 = new WebAssembly.Instance(r11, { "./query_engine_bg.js": e11 }), a2 = i10.exports.__wbindgen_start;
          return e11.__wbg_set_wasm(i10.exports), a2(), e11.QueryEngine;
        })()), { debugPanic: () => Promise.reject("{}"), dmmf: () => Promise.resolve("{}"), version: () => ({ commit: "unknown", version: "unknown" }), QueryEngine: await iI };
      } }, i$ = tv("prisma:client:libraryEngine"), iD = 1n, iU = class {
        name = "LibraryEngine";
        engine;
        libraryInstantiationPromise;
        libraryStartingPromise;
        libraryStoppingPromise;
        libraryStarted;
        executingQueryPromise;
        config;
        QueryEngineConstructor;
        libraryLoader;
        library;
        logEmitter;
        libQueryEnginePath;
        binaryTarget;
        datasourceOverrides;
        datamodel;
        logQueries;
        logLevel;
        lastQuery;
        loggerRustPanic;
        tracingHelper;
        adapterPromise;
        versionInfo;
        constructor(e10, t10) {
          this.libraryLoader = t10 ?? iN, this.config = e10, this.libraryStarted = false, this.logQueries = e10.logQueries ?? false, this.logLevel = e10.logLevel ?? "error", this.logEmitter = e10.logEmitter, this.datamodel = e10.inlineSchema, this.tracingHelper = e10.tracingHelper, e10.enableDebugLogs && (this.logLevel = "debug");
          let r10 = Object.keys(e10.overrideDatasources)[0], n10 = e10.overrideDatasources[r10]?.url;
          void 0 !== r10 && void 0 !== n10 && (this.datasourceOverrides = { [r10]: n10 }), this.libraryInstantiationPromise = this.instantiateLibrary();
        }
        wrapEngine(e10) {
          return { applyPendingMigrations: e10.applyPendingMigrations?.bind(e10), commitTransaction: this.withRequestId(e10.commitTransaction.bind(e10)), connect: this.withRequestId(e10.connect.bind(e10)), disconnect: this.withRequestId(e10.disconnect.bind(e10)), metrics: e10.metrics?.bind(e10), query: this.withRequestId(e10.query.bind(e10)), rollbackTransaction: this.withRequestId(e10.rollbackTransaction.bind(e10)), sdlSchema: e10.sdlSchema?.bind(e10), startTransaction: this.withRequestId(e10.startTransaction.bind(e10)), trace: e10.trace.bind(e10), free: e10.free?.bind(e10) };
        }
        withRequestId(e10) {
          return async (...t10) => {
            let r10, n10 = (r10 = iD++, iD > 0xffffffffffffffffn && (iD = 1n), r10).toString();
            try {
              return await e10(...t10, n10);
            } finally {
              if (this.tracingHelper.isEnabled()) {
                let e11 = await this.engine?.trace(n10);
                if (e11) {
                  let t11 = JSON.parse(e11);
                  this.tracingHelper.dispatchEngineSpans(t11.spans);
                }
              }
            }
          };
        }
        async applyPendingMigrations() {
          throw Error("Cannot call this method from this type of engine instance");
        }
        async transaction(e10, t10, r10) {
          var n10;
          await this.start();
          let i10 = await this.adapterPromise, a2 = JSON.stringify(t10), o2;
          if ("start" === e10) {
            let e11 = JSON.stringify({ max_wait: r10.maxWait, timeout: r10.timeout, isolation_level: r10.isolationLevel });
            o2 = await this.engine?.startTransaction(e11, a2);
          } else "commit" === e10 ? o2 = await this.engine?.commitTransaction(r10.id, a2) : "rollback" === e10 && (o2 = await this.engine?.rollbackTransaction(r10.id, a2));
          let s2 = this.parseEngineResponse(o2);
          if ("object" == typeof (n10 = s2) && null !== n10 && void 0 !== n10.error_code) {
            let e11 = this.getExternalAdapterError(s2, i10?.errorRegistry);
            throw e11 ? e11.error : new tX(s2.message, { code: s2.error_code, clientVersion: this.config.clientVersion, meta: s2.meta });
          }
          if ("string" == typeof s2.message) throw new tY(s2.message, { clientVersion: this.config.clientVersion });
          return s2;
        }
        async instantiateLibrary() {
          if (i$("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
          this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
        }
        async getCurrentBinaryTarget() {
        }
        parseEngineResponse(e10) {
          if (!e10) throw new tY("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
          try {
            return JSON.parse(e10);
          } catch {
            throw new tY("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
          }
        }
        async loadEngine() {
          if (!this.engine) {
            this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
            try {
              let e10 = new $(this);
              this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(tR));
              let t10 = await this.adapterPromise;
              t10 && i$("Using driver adapter: %O", t10), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: O.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (t11) => {
                e10.deref()?.logger(t11);
              }, t10));
            } catch (t10) {
              let e10 = this.parseInitError(t10.message);
              throw "string" == typeof e10 ? t10 : new tG(e10.message, this.config.clientVersion, e10.error_code);
            }
          }
        }
        logger(e10) {
          let t10 = this.parseEngineResponse(e10);
          t10 && (t10.level = t10?.level.toLowerCase() ?? "unknown", "query" === t10.item_type && "query" in t10 ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: t10.query, params: t10.params, duration: Number(t10.duration_ms), target: t10.module_path }) : ("level" in t10 && "error" === t10.level && t10.message, this.logEmitter.emit(t10.level, { timestamp: /* @__PURE__ */ new Date(), message: t10.message, target: t10.module_path })));
        }
        parseInitError(e10) {
          try {
            return JSON.parse(e10);
          } catch {
          }
          return e10;
        }
        parseRequestError(e10) {
          try {
            return JSON.parse(e10);
          } catch {
          }
          return e10;
        }
        onBeforeExit() {
          throw Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
        }
        async start() {
          if (this.libraryInstantiationPromise || (this.libraryInstantiationPromise = this.instantiateLibrary()), await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return i$(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
          if (this.libraryStarted) return;
          let e10 = async () => {
            i$("library starting");
            try {
              let e11 = { traceparent: this.tracingHelper.getTraceParent() };
              await this.engine?.connect(JSON.stringify(e11)), this.libraryStarted = true, this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(tR)), await this.adapterPromise, i$("library started");
            } catch (t10) {
              let e11 = this.parseInitError(t10.message);
              throw "string" == typeof e11 ? t10 : new tG(e11.message, this.config.clientVersion, e11.error_code);
            } finally {
              this.libraryStartingPromise = void 0;
            }
          };
          return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", e10), this.libraryStartingPromise;
        }
        async stop() {
          if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return i$("library is already stopping"), this.libraryStoppingPromise;
          if (!this.libraryStarted) {
            await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0;
            return;
          }
          let e10 = async () => {
            await new Promise((e12) => setImmediate(e12)), i$("library stopping");
            let e11 = { traceparent: this.tracingHelper.getTraceParent() };
            await this.engine?.disconnect(JSON.stringify(e11)), this.engine?.free && this.engine.free(), this.engine = void 0, this.libraryStarted = false, this.libraryStoppingPromise = void 0, this.libraryInstantiationPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, i$("library stopped");
          };
          return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", e10), this.libraryStoppingPromise;
        }
        version() {
          return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
        }
        debugPanic(e10) {
          return this.library?.debugPanic(e10);
        }
        async request(e10, { traceparent: t10, interactiveTransaction: r10 }) {
          i$(`sending request, this.libraryStarted: ${this.libraryStarted}`);
          let n10 = JSON.stringify({ traceparent: t10 }), i10 = JSON.stringify(e10);
          try {
            await this.start();
            let e11 = await this.adapterPromise;
            this.executingQueryPromise = this.engine?.query(i10, n10, r10?.id), this.lastQuery = i10;
            let t11 = this.parseEngineResponse(await this.executingQueryPromise);
            if (t11.errors) throw 1 === t11.errors.length ? this.buildQueryError(t11.errors[0], e11?.errorRegistry) : new tY(JSON.stringify(t11.errors), { clientVersion: this.config.clientVersion });
            if (this.loggerRustPanic) throw this.loggerRustPanic;
            return { data: t11 };
          } catch (t11) {
            if (t11 instanceof tG) throw t11;
            "GenericFailure" === t11.code && t11.message?.startsWith("PANIC:");
            let e11 = this.parseRequestError(t11.message);
            throw "string" == typeof e11 ? t11 : new tY(`${e11.message}
${e11.backtrace}`, { clientVersion: this.config.clientVersion });
          }
        }
        async requestBatch(e10, { transaction: t10, traceparent: r10 }) {
          i$("requestBatch");
          let n10 = nw(e10, t10);
          await this.start();
          let i10 = await this.adapterPromise;
          this.lastQuery = JSON.stringify(n10), this.executingQueryPromise = this.engine?.query(this.lastQuery, JSON.stringify({ traceparent: r10 }), function(e11) {
            if (e11?.kind === "itx") return e11.options.id;
          }(t10));
          let a2 = await this.executingQueryPromise, o2 = this.parseEngineResponse(a2);
          if (o2.errors) throw 1 === o2.errors.length ? this.buildQueryError(o2.errors[0], i10?.errorRegistry) : new tY(JSON.stringify(o2.errors), { clientVersion: this.config.clientVersion });
          let { batchResult: s2, errors: l2 } = o2;
          if (Array.isArray(s2)) return s2.map((e11) => e11.errors && e11.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(e11.errors[0], i10?.errorRegistry) : { data: e11 });
          throw l2 && 1 === l2.length ? Error(l2[0].error) : Error(JSON.stringify(o2));
        }
        buildQueryError(e10, t10) {
          e10.user_facing_error.is_panic;
          let r10 = this.getExternalAdapterError(e10.user_facing_error, t10);
          return r10 ? r10.error : n_(e10, this.config.clientVersion, this.config.activeProvider);
        }
        getExternalAdapterError(e10, t10) {
          if ("P2036" === e10.error_code && t10) {
            let r10 = e10.meta?.id;
            tV("number" == typeof r10, "Malformed external JS error received from the engine");
            let n10 = t10.consumeError(r10);
            return tV(n10, "External error with reported id was not registered"), n10;
          }
        }
        async metrics(e10) {
          await this.start();
          let t10 = await this.engine.metrics(JSON.stringify(e10));
          return "prometheus" === e10.format ? t10 : this.parseEngineResponse(t10);
        }
      };
      D(), U(), j(), M(), L(), e_();
      var ij = class {
        constructor(e10) {
          return new Proxy(this, { get(t10, r10) {
            throw new tZ(`In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters`, e10);
          } });
        }
      };
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var iM = (e10) => ({ command: e10 });
      function iL(e10) {
        try {
          return iH(e10, "fast");
        } catch {
          return iH(e10, "slow");
        }
      }
      function iH(e10, t10) {
        return JSON.stringify(e10.map((e11) => function e12(t11, r10) {
          var n10;
          if (Array.isArray(t11)) return t11.map((t12) => e12(t12, r10));
          if ("bigint" == typeof t11) return { prisma__type: "bigint", prisma__value: t11.toString() };
          if (t3(t11)) return { prisma__type: "date", prisma__value: t11.toJSON() };
          if (ey.isDecimal(t11)) return { prisma__type: "decimal", prisma__value: t11.toJSON() };
          if (R.isBuffer(t11)) return { prisma__type: "bytes", prisma__value: t11.toString("base64") };
          if ((n10 = t11) instanceof ArrayBuffer || n10 instanceof SharedArrayBuffer || "object" == typeof n10 && null !== n10 && ("ArrayBuffer" === n10[Symbol.toStringTag] || "SharedArrayBuffer" === n10[Symbol.toStringTag])) return { prisma__type: "bytes", prisma__value: R.from(t11).toString("base64") };
          if (ArrayBuffer.isView(t11)) {
            let { buffer: e13, byteOffset: r11, byteLength: n11 } = t11;
            return { prisma__type: "bytes", prisma__value: R.from(e13, r11, n11).toString("base64") };
          }
          return "object" == typeof t11 && "slow" === r10 ? iq(t11) : t11;
        }(e11, t10)));
      }
      function iq(e10) {
        if ("object" != typeof e10 || null === e10) return e10;
        if ("function" == typeof e10.toJSON) return e10.toJSON();
        if (Array.isArray(e10)) return e10.map(iV);
        let t10 = {};
        for (let r10 of Object.keys(e10)) t10[r10] = iV(e10[r10]);
        return t10;
      }
      function iV(e10) {
        return "bigint" == typeof e10 ? e10.toString() : iq(e10);
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), e_();
      var iF = /^(\s*alter\s)/i, iW = tv("prisma:client");
      function iB(e10, t10, r10, n10) {
        if (("postgresql" === e10 || "cockroachdb" === e10) && r10.length > 0 && iF.exec(t10)) throw Error(`Running ALTER using ${n10} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
      }
      var iK = ({ clientMethod: e10, activeProvider: t10 }) => (r10) => {
        let n10 = "", i10;
        if (nn(r10)) n10 = r10.sql, i10 = { values: iL(r10.values), __prismaRawParameters__: true };
        else if (Array.isArray(r10)) {
          let [e11, ...t11] = r10;
          n10 = e11, i10 = { values: iL(t11 || []), __prismaRawParameters__: true };
        } else switch (t10) {
          case "sqlite":
          case "mysql":
            n10 = r10.sql, i10 = { values: iL(r10.values), __prismaRawParameters__: true };
            break;
          case "cockroachdb":
          case "postgresql":
          case "postgres":
            n10 = r10.text, i10 = { values: iL(r10.values), __prismaRawParameters__: true };
            break;
          case "sqlserver":
            n10 = r10.strings.reduce((e11, t11, r11) => `${e11}@P${r11}${t11}`), i10 = { values: iL(r10.values), __prismaRawParameters__: true };
            break;
          default:
            throw Error(`The ${t10} provider does not support ${e10}`);
        }
        return i10?.values ? iW(`prisma.${e10}(${n10}, ${i10.values})`) : iW(`prisma.${e10}(${n10})`), { query: n10, parameters: i10 };
      }, iJ = { requestArgsToMiddlewareArgs: (e10) => [e10.strings, ...e10.values], middlewareArgsToRequestArgs(e10) {
        let [t10, ...r10] = e10;
        return new na(t10, r10);
      } }, iz = { requestArgsToMiddlewareArgs: (e10) => [e10], middlewareArgsToRequestArgs: (e10) => e10[0] };
      function iG(e10) {
        return function(t10, r10) {
          let n10, i10 = (r11 = e10) => {
            try {
              return void 0 === r11 || r11?.kind === "itx" ? n10 ??= iX(t10(r11)) : iX(t10(r11));
            } catch (e11) {
              return Promise.reject(e11);
            }
          };
          return { get spec() {
            return r10;
          }, then: (e11, t11) => i10().then(e11, t11), catch: (e11) => i10().catch(e11), finally: (e11) => i10().finally(e11), requestTransaction(e11) {
            let t11 = i10(e11);
            return t11.requestTransaction ? t11.requestTransaction(e11) : t11;
          }, [Symbol.toStringTag]: "PrismaPromise" };
        };
      }
      function iX(e10) {
        return "function" == typeof e10.then ? e10 : Promise.resolve(e10);
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var iQ = tx.split(".")[0], iY = { isEnabled: () => false, getTraceParent: () => "00-10-10-00", dispatchEngineSpans() {
      }, getActiveContext() {
      }, runInChildSpan: (e10, t10) => t10() }, iZ = class {
        isEnabled() {
          return this.getGlobalTracingHelper().isEnabled();
        }
        getTraceParent(e10) {
          return this.getGlobalTracingHelper().getTraceParent(e10);
        }
        dispatchEngineSpans(e10) {
          return this.getGlobalTracingHelper().dispatchEngineSpans(e10);
        }
        getActiveContext() {
          return this.getGlobalTracingHelper().getActiveContext();
        }
        runInChildSpan(e10, t10) {
          return this.getGlobalTracingHelper().runInChildSpan(e10, t10);
        }
        getGlobalTracingHelper() {
          let e10 = globalThis[`V${iQ}_PRISMA_INSTRUMENTATION`], t10 = globalThis.PRISMA_INSTRUMENTATION;
          return e10?.helper ?? t10?.helper ?? iY;
        }
      };
      function i0(e10) {
        return "number" == typeof e10.batchRequestIdx;
      }
      function i1(e10) {
        return `(${Object.keys(e10).sort().map((t10) => {
          let r10 = e10[t10];
          return "object" == typeof r10 && null !== r10 ? `(${t10} ${i1(r10)})` : t10;
        }).join(" ")})`;
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var i2 = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
      D(), U(), j(), M(), L(), e_();
      var i5 = class {
        constructor(e10) {
          this.options = e10, this.batches = {};
        }
        batches;
        tickActive = false;
        request(e10) {
          let t10 = this.options.batchBy(e10);
          return t10 ? (this.batches[t10] || (this.batches[t10] = [], this.tickActive || (this.tickActive = true, O.nextTick(() => {
            this.dispatchBatches(), this.tickActive = false;
          }))), new Promise((r10, n10) => {
            this.batches[t10].push({ request: e10, resolve: r10, reject: n10 });
          })) : this.options.singleLoader(e10);
        }
        dispatchBatches() {
          for (let e10 in this.batches) {
            let t10 = this.batches[e10];
            delete this.batches[e10], 1 === t10.length ? this.options.singleLoader(t10[0].request).then((e11) => {
              e11 instanceof Error ? t10[0].reject(e11) : t10[0].resolve(e11);
            }).catch((e11) => {
              t10[0].reject(e11);
            }) : (t10.sort((e11, t11) => this.options.batchOrder(e11.request, t11.request)), this.options.batchLoader(t10.map((e11) => e11.request)).then((e11) => {
              if (e11 instanceof Error) for (let r10 = 0; r10 < t10.length; r10++) t10[r10].reject(e11);
              else for (let r10 = 0; r10 < t10.length; r10++) {
                let n10 = e11[r10];
                n10 instanceof Error ? t10[r10].reject(n10) : t10[r10].resolve(n10);
              }
            }).catch((e11) => {
              for (let r10 = 0; r10 < t10.length; r10++) t10[r10].reject(e11);
            }));
          }
        }
        get [Symbol.toStringTag]() {
          return "DataLoader";
        }
      };
      function i6(e10) {
        let t10 = [], r10 = function(e11) {
          let t11 = {};
          for (let r11 = 0; r11 < e11.columns.length; r11++) t11[e11.columns[r11]] = null;
          return t11;
        }(e10);
        for (let n10 = 0; n10 < e10.rows.length; n10++) {
          let i10 = e10.rows[n10], a2 = { ...r10 };
          for (let t11 = 0; t11 < i10.length; t11++) a2[e10.columns[t11]] = function e11(t12, r11) {
            if (null === r11) return r11;
            switch (t12) {
              case "bigint":
                return BigInt(r11);
              case "bytes": {
                let { buffer: e12, byteOffset: t13, byteLength: n11 } = R.from(r11, "base64");
                return new Uint8Array(e12, t13, n11);
              }
              case "decimal":
                return new ey(r11);
              case "datetime":
              case "date":
                return new Date(r11);
              case "time":
                return /* @__PURE__ */ new Date(`1970-01-01T${r11}Z`);
              case "bigint-array":
                return r11.map((t13) => e11("bigint", t13));
              case "bytes-array":
                return r11.map((t13) => e11("bytes", t13));
              case "decimal-array":
                return r11.map((t13) => e11("decimal", t13));
              case "datetime-array":
                return r11.map((t13) => e11("datetime", t13));
              case "date-array":
                return r11.map((t13) => e11("date", t13));
              case "time-array":
                return r11.map((t13) => e11("time", t13));
              default:
                return r11;
            }
          }(e10.types[t11], i10[t11]);
          t10.push(a2);
        }
        return t10;
      }
      D(), U(), j(), M(), L(), e_(), e_();
      var i3 = tv("prisma:client:request_handler"), i8 = class {
        client;
        dataloader;
        logEmitter;
        constructor(e10, t10) {
          this.logEmitter = t10, this.client = e10, this.dataloader = new i5({ batchLoader: /* @__PURE__ */ function(e11) {
            return (t11) => {
              let r10 = { requests: t11 }, n10 = t11[0].extensions.getAllBatchQueryCallbacks();
              return n10.length ? function e12(t12, r11, n11, i10) {
                if (n11 === r11.length) return i10(t12);
                let a2 = t12.customDataProxyFetch, o2 = t12.requests[0].transaction;
                return r11[n11]({ args: { queries: t12.requests.map((e13) => ({ model: e13.modelName, operation: e13.action, args: e13.args })), transaction: o2 ? { isolationLevel: "batch" === o2.kind ? o2.isolationLevel : void 0 } : void 0 }, __internalParams: t12, query(o3, s2 = t12) {
                  let l2 = s2.customDataProxyFetch;
                  return s2.customDataProxyFetch = nq(a2, l2), e12(s2, r11, n11 + 1, i10);
                } });
              }(r10, n10, 0, e11) : e11(r10);
            };
          }(async ({ requests: e11, customDataProxyFetch: t11 }) => {
            let { transaction: r10, otelParentCtx: n10 } = e11[0], i10 = e11.map((e12) => e12.protocolQuery), a2 = this.client._tracingHelper.getTraceParent(n10), o2 = e11.some((e12) => i2[e12.protocolQuery.action]);
            return (await this.client._engine.requestBatch(i10, { traceparent: a2, transaction: function(e12) {
              if (e12) {
                if ("batch" === e12.kind) return { kind: "batch", options: { isolationLevel: e12.isolationLevel } };
                if ("itx" === e12.kind) return { kind: "itx", options: i4(e12) };
                tF(e12, "Unknown transaction kind");
              }
            }(r10), containsWrite: o2, customDataProxyFetch: t11 })).map((t12, r11) => {
              if (t12 instanceof Error) return t12;
              try {
                return this.mapQueryEngineResult(e11[r11], t12);
              } catch (e12) {
                return e12;
              }
            });
          }), singleLoader: async (e11) => {
            let t11 = e11.transaction?.kind === "itx" ? i4(e11.transaction) : void 0, r10 = await this.client._engine.request(e11.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: t11, isWrite: i2[e11.protocolQuery.action], customDataProxyFetch: e11.customDataProxyFetch });
            return this.mapQueryEngineResult(e11, r10);
          }, batchBy: (e11) => e11.transaction?.id ? `transaction-${e11.transaction.id}` : function(e12) {
            if ("findUnique" !== e12.action && "findUniqueOrThrow" !== e12.action) return;
            let t11 = [];
            return e12.modelName && t11.push(e12.modelName), e12.query.arguments && t11.push(i1(e12.query.arguments)), t11.push(i1(e12.query.selection)), t11.join("");
          }(e11.protocolQuery), batchOrder: (e11, t11) => e11.transaction?.kind === "batch" && t11.transaction?.kind === "batch" ? e11.transaction.index - t11.transaction.index : 0 });
        }
        async request(e10) {
          try {
            return await this.dataloader.request(e10);
          } catch (o2) {
            let { clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a2 } = e10;
            this.handleAndLogRequestError({ error: o2, clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a2, globalOmit: e10.globalOmit });
          }
        }
        mapQueryEngineResult({ dataPath: e10, unpacker: t10 }, r10) {
          let n10 = r10?.data, i10 = this.unpack(n10, e10, t10);
          return O.env.PRISMA_CLIENT_GET_TIME ? { data: i10 } : i10;
        }
        handleAndLogRequestError(e10) {
          try {
            this.handleRequestError(e10);
          } catch (t10) {
            throw this.logEmitter && this.logEmitter.emit("error", { message: t10.message, target: e10.clientMethod, timestamp: /* @__PURE__ */ new Date() }), t10;
          }
        }
        handleRequestError({ error: e10, clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a2, globalOmit: o2 }) {
          var s2, l2, c2;
          if (i3(e10), s2 = e10, l2 = n10, i0(s2) && l2?.kind === "batch" && s2.batchRequestIdx !== l2.index) throw e10;
          e10 instanceof tX && ("P2009" === (c2 = e10).code || "P2012" === c2.code) && rF({ args: i10, errors: [function e11(t11) {
            if ("Union" === t11.kind) return { kind: "Union", errors: t11.errors.map(e11) };
            if (Array.isArray(t11.selectionPath)) {
              let [, ...e12] = t11.selectionPath;
              return { ...t11, selectionPath: e12 };
            }
            return t11;
          }(e10.meta)], callsite: r10, errorFormat: this.client._errorFormat, originalMethod: t10, clientVersion: this.client._clientVersion, globalOmit: o2 });
          let u2 = e10.message;
          if (r10 && (u2 = rn({ callsite: r10, originalMethod: t10, isPanic: e10.isPanic, showColors: "pretty" === this.client._errorFormat, message: u2 })), u2 = this.sanitizeMessage(u2), e10.code) {
            let t11 = a2 ? { modelName: a2, ...e10.meta } : e10.meta;
            throw new tX(u2, { code: e10.code, clientVersion: this.client._clientVersion, meta: t11, batchRequestIdx: e10.batchRequestIdx });
          }
          if (e10.isPanic) throw new tQ(u2, this.client._clientVersion);
          if (e10 instanceof tY) throw new tY(u2, { clientVersion: this.client._clientVersion, batchRequestIdx: e10.batchRequestIdx });
          if (e10 instanceof tG) throw new tG(u2, this.client._clientVersion);
          if (e10 instanceof tQ) throw new tQ(u2, this.client._clientVersion);
          throw e10.clientVersion = this.client._clientVersion, e10;
        }
        sanitizeMessage(e10) {
          return this.client._errorFormat && "pretty" !== this.client._errorFormat ? function(e11) {
            if ("string" != typeof e11) throw TypeError(`Expected a \`string\`, got \`${typeof e11}\``);
            return e11.replace(tW, "");
          }(e10) : e10;
        }
        unpack(e10, t10, r10) {
          if (!e10 || (e10.data && (e10 = e10.data), !e10)) return e10;
          let n10 = Object.keys(e10)[0], i10 = nR(Object.values(e10)[0], t10.filter((e11) => "select" !== e11 && "include" !== e11)), a2 = "queryRaw" === n10 ? i6(i10) : nW(i10);
          return r10 ? r10(a2) : a2;
        }
        get [Symbol.toStringTag]() {
          return "RequestHandler";
        }
      };
      function i4(e10) {
        return { id: e10.id, payload: e10.payload };
      }
      D(), U(), j(), M(), L(), e_(), D(), U(), j(), M(), L(), e_();
      var i9 = h(eZ());
      D(), U(), j(), M(), L(), e_();
      var i7 = class extends Error {
        constructor(e10) {
          super(e10 + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientConstructorValidationError";
        }
      };
      tK(i7, "PrismaClientConstructorValidationError");
      var ae = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"], at = ["pretty", "colorless", "minimal"], ar = ["info", "query", "warn", "error"], an = { datasources: (e10, { datasourceNames: t10 }) => {
        if (e10) {
          if ("object" != typeof e10 || Array.isArray(e10)) throw new i7(`Invalid value ${JSON.stringify(e10)} for "datasources" provided to PrismaClient constructor`);
          for (let [r10, n10] of Object.entries(e10)) {
            if (!t10.includes(r10)) {
              let e11 = ai(r10, t10) || ` Available datasources: ${t10.join(", ")}`;
              throw new i7(`Unknown datasource ${r10} provided to PrismaClient constructor.${e11}`);
            }
            if ("object" != typeof n10 || Array.isArray(n10)) throw new i7(`Invalid value ${JSON.stringify(e10)} for datasource "${r10}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (n10 && "object" == typeof n10) for (let [t11, i10] of Object.entries(n10)) {
              if ("url" !== t11) throw new i7(`Invalid value ${JSON.stringify(e10)} for datasource "${r10}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
              if ("string" != typeof i10) throw new i7(`Invalid value ${JSON.stringify(i10)} for datasource "${r10}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            }
          }
        }
      }, adapter: (e10, t10) => {
        if (!e10 && "client" === tE(t10.generator)) throw new i7('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
        if (null !== e10) {
          if (void 0 === e10) throw new i7('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
          if ("binary" === tE(t10.generator)) throw new i7('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
        }
      }, datasourceUrl: (e10) => {
        if ("u" > typeof e10 && "string" != typeof e10) throw new i7(`Invalid value ${JSON.stringify(e10)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
      }, errorFormat: (e10) => {
        if (e10) {
          if ("string" != typeof e10) throw new i7(`Invalid value ${JSON.stringify(e10)} for "errorFormat" provided to PrismaClient constructor.`);
          if (!at.includes(e10)) {
            let t10 = ai(e10, at);
            throw new i7(`Invalid errorFormat ${e10} provided to PrismaClient constructor.${t10}`);
          }
        }
      }, log: (e10) => {
        if (e10) {
          if (!Array.isArray(e10)) throw new i7(`Invalid value ${JSON.stringify(e10)} for "log" provided to PrismaClient constructor.`);
          for (let r10 of e10) {
            t10(r10);
            let e11 = { level: t10, emit: (e12) => {
              let t11 = ["stdout", "event"];
              if (!t11.includes(e12)) {
                let r11 = ai(e12, t11);
                throw new i7(`Invalid value ${JSON.stringify(e12)} for "emit" in logLevel provided to PrismaClient constructor.${r11}`);
              }
            } };
            if (r10 && "object" == typeof r10) for (let [t11, n10] of Object.entries(r10)) if (e11[t11]) e11[t11](n10);
            else throw new i7(`Invalid property ${t11} for "log" provided to PrismaClient constructor`);
          }
        }
        function t10(e11) {
          if ("string" == typeof e11 && !ar.includes(e11)) {
            let t11 = ai(e11, ar);
            throw new i7(`Invalid log level "${e11}" provided to PrismaClient constructor.${t11}`);
          }
        }
      }, transactionOptions: (e10) => {
        if (!e10) return;
        let t10 = e10.maxWait;
        if (null != t10 && t10 <= 0) throw new i7(`Invalid value ${t10} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
        let r10 = e10.timeout;
        if (null != r10 && r10 <= 0) throw new i7(`Invalid value ${r10} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
      }, omit: (e10, t10) => {
        if ("object" != typeof e10) throw new i7('"omit" option is expected to be an object.');
        if (null === e10) throw new i7('"omit" option can not be `null`');
        let r10 = [];
        for (let [a2, o2] of Object.entries(e10)) {
          var n10, i10;
          let e11 = (n10 = a2, aa((i10 = t10.runtimeDataModel).models, n10) ?? aa(i10.types, n10));
          if (!e11) {
            r10.push({ kind: "UnknownModel", modelKey: a2 });
            continue;
          }
          for (let [t11, n11] of Object.entries(o2)) {
            let i11 = e11.fields.find((e12) => e12.name === t11);
            if (!i11) {
              r10.push({ kind: "UnknownField", modelKey: a2, fieldName: t11 });
              continue;
            }
            if (i11.relationName) {
              r10.push({ kind: "RelationInOmit", modelKey: a2, fieldName: t11 });
              continue;
            }
            "boolean" != typeof n11 && r10.push({ kind: "InvalidFieldValue", modelKey: a2, fieldName: t11 });
          }
        }
        if (r10.length > 0) throw new i7(function(e11, t11) {
          let r11 = rH(e11);
          for (let e12 of t11) switch (e12.kind) {
            case "UnknownModel":
              r11.arguments.getField(e12.modelKey)?.markAsError(), r11.addErrorMessage(() => `Unknown model name: ${e12.modelKey}.`);
              break;
            case "UnknownField":
              r11.arguments.getDeepField([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => `Model "${e12.modelKey}" does not have a field named "${e12.fieldName}".`);
              break;
            case "RelationInOmit":
              r11.arguments.getDeepField([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
              break;
            case "InvalidFieldValue":
              r11.arguments.getDeepFieldValue([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => "Omit field option value must be a boolean.");
          }
          let { message: n11, args: i11 } = rV(r11, "colorless");
          return `Error validating "omit" option:

${i11}

${n11}`;
        }(e10, r10));
      }, __internal: (e10) => {
        if (!e10) return;
        let t10 = ["debug", "engine", "configOverride"];
        if ("object" != typeof e10) throw new i7(`Invalid value ${JSON.stringify(e10)} for "__internal" to PrismaClient constructor`);
        for (let [r10] of Object.entries(e10)) if (!t10.includes(r10)) {
          let e11 = ai(r10, t10);
          throw new i7(`Invalid property ${JSON.stringify(r10)} for "__internal" provided to PrismaClient constructor.${e11}`);
        }
      } };
      function ai(e10, t10) {
        if (0 === t10.length || "string" != typeof e10) return "";
        let r10 = function(e11, t11) {
          if (0 === t11.length) return null;
          let r11 = t11.map((t12) => ({ value: t12, distance: (0, i9.default)(e11, t12) }));
          r11.sort((e12, t12) => e12.distance < t12.distance ? -1 : 1);
          let n10 = r11[0];
          return n10.distance < 3 ? n10.value : null;
        }(e10, t10);
        return r10 ? ` Did you mean "${r10}"?` : "";
      }
      function aa(e10, t10) {
        let r10 = Object.keys(e10).find((e11) => t1(e11) === t10);
        if (r10) return e10[r10];
      }
      D(), U(), j(), M(), L(), e_();
      var ao = tv("prisma:client");
      "object" == typeof globalThis && (globalThis.NODE_CLIENT = true);
      var as = { requestArgsToMiddlewareArgs: (e10) => e10, middlewareArgsToRequestArgs: (e10) => e10 }, al = Symbol.for("prisma.client.transaction.id"), ac = { id: 0, nextId() {
        return ++this.id;
      } };
      function au(e10) {
        class t10 {
          _originalClient = this;
          _runtimeDataModel;
          _requestHandler;
          _connectionPromise;
          _disconnectionPromise;
          _engineConfig;
          _accelerateEngineConfig;
          _clientVersion;
          _errorFormat;
          _tracingHelper;
          _previewFeatures;
          _activeProvider;
          _globalOmit;
          _extensions;
          _engine;
          _appliedParent;
          _createPrismaPromise = iG();
          constructor(t11) {
            let r10;
            (function({ postinstall: e11, ciName: t12, clientVersion: r11, generator: n11 }) {
              if (nV("checkPlatformCaching:postinstall", e11), nV("checkPlatformCaching:ciName", t12), true === e11 && !(n11?.output && "string" == typeof (n11.output.fromEnvVar ?? n11.output.value)) && t12 && t12 in nF) {
                let e12 = `Prisma has detected that this project was built on ${t12}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${nF[t12]}-build`;
                throw console.error(e12), new tG(e12, r11);
              }
            })(e10 = t11?.__internal?.configOverride?.(e10) ?? e10), t11 && function(e11, t12) {
              for (let [r11, n11] of Object.entries(e11)) {
                if (!ae.includes(r11)) {
                  let e12 = ai(r11, ae);
                  throw new i7(`Unknown property ${r11} provided to PrismaClient constructor.${e12}`);
                }
                an[r11](n11, t12);
              }
              if (e11.datasourceUrl && e11.datasources) throw new i7('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
            }(t11, e10);
            let n10 = new ez().on("error", () => {
            });
            if (this._extensions = rJ.empty(), this._previewFeatures = function({ generator: e11 }) {
              return e11?.previewFeatures ?? [];
            }(e10), this._clientVersion = e10.clientVersion ?? "6.19.2", this._activeProvider = e10.activeProvider, this._globalOmit = t11?.omit, this._tracingHelper = new iZ(), e10.relativeEnvPaths && (e10.relativeEnvPaths.rootEnvPath && eJ.resolve(e10.dirname, e10.relativeEnvPaths.rootEnvPath), e10.relativeEnvPaths.schemaEnvPath && eJ.resolve(e10.dirname, e10.relativeEnvPaths.schemaEnvPath)), t11?.adapter) {
              r10 = t11.adapter;
              let n11 = "postgresql" === e10.activeProvider || "cockroachdb" === e10.activeProvider ? "postgres" : e10.activeProvider;
              if (r10.provider !== n11) throw new tG(`The Driver Adapter \`${r10.adapterName}\`, based on \`${r10.provider}\`, is not compatible with the provider \`${n11}\` specified in the Prisma schema.`, this._clientVersion);
              if (t11.datasources || void 0 !== t11.datasourceUrl) throw new tG("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
            }
            let i10 = e10.injectableEdgeEnv?.();
            try {
              let a2 = t11 ?? {}, o2 = a2.__internal ?? {}, s2 = true === o2.debug;
              s2 && tv.enable("prisma:client");
              let l2 = eJ.resolve(e10.dirname, e10.relativePath);
              eM.existsSync(l2) || (l2 = e10.dirname), ao("dirname", e10.dirname), ao("relativePath", e10.relativePath), ao("cwd", l2);
              let c2 = o2.engine || {};
              if (a2.errorFormat ? this._errorFormat = a2.errorFormat : "production" === O.env.NODE_ENV ? this._errorFormat = "minimal" : (O.env.NO_COLOR, this._errorFormat = "colorless"), this._runtimeDataModel = e10.runtimeDataModel, this._engineConfig = { cwd: l2, dirname: e10.dirname, enableDebugLogs: s2, allowTriggerPanic: c2.allowTriggerPanic, prismaPath: c2.binaryPath ?? void 0, engineEndpoint: c2.endpoint, generator: e10.generator, showColors: "pretty" === this._errorFormat, logLevel: a2.log && function(e11) {
                return "string" == typeof e11 ? e11 : e11.reduce((e12, t12) => {
                  let r11 = "string" == typeof t12 ? t12 : t12.level;
                  return "query" === r11 ? e12 : e12 && ("info" === t12 || "info" === e12) ? "info" : r11;
                }, void 0);
              }(a2.log), logQueries: a2.log && !!("string" == typeof a2.log ? "query" === a2.log : a2.log.find((e11) => "string" == typeof e11 ? "query" === e11 : "query" === e11.level)), env: i10?.parsed ?? {}, flags: [], engineWasm: e10.engineWasm, compilerWasm: e10.compilerWasm, clientVersion: e10.clientVersion, engineVersion: e10.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e10.activeProvider, inlineSchema: e10.inlineSchema, overrideDatasources: function(e11, t12) {
                return e11 ? e11.datasources ? e11.datasources : e11.datasourceUrl ? { [t12[0]]: { url: e11.datasourceUrl } } : {} : {};
              }(a2, e10.datasourceNames), inlineDatasources: e10.inlineDatasources, inlineSchemaHash: e10.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: a2.transactionOptions?.maxWait ?? 2e3, timeout: a2.transactionOptions?.timeout ?? 5e3, isolationLevel: a2.transactionOptions?.isolationLevel }, logEmitter: n10, isBundled: e10.isBundled, adapter: r10 }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: nZ, getBatchRequestPayload: nw, prismaGraphQLToJSError: n_, PrismaClientUnknownRequestError: tY, PrismaClientInitializationError: tG, PrismaClientKnownRequestError: tX, debug: tv("prisma:client:accelerateEngine"), engineVersion: ni.version, clientVersion: e10.clientVersion } }, ao("clientVersion", e10.clientVersion), this._engine = function({ copyEngine: e11 = true }, t12) {
                let r11;
                try {
                  r11 = nZ({ inlineDatasources: t12.inlineDatasources, overrideDatasources: t12.overrideDatasources, env: { ...t12.env, ...O.env }, clientVersion: t12.clientVersion });
                } catch {
                }
                let { ok: n11, isUsing: i11, diagnostics: a3 } = function({ url: e12, adapter: t13, copyEngine: r12, targetBuildType: n12 }) {
                  let i12 = [], a4 = [], o3 = (e13) => {
                    let t14 = e13.join(`
`);
                    a4.push({ _tag: "error", value: t14 });
                  }, s3 = !!e12?.startsWith("prisma://"), l3 = tN(e12), c3 = !!t13, u2 = s3 || l3;
                  !c3 && r12 && u2 && "client" !== n12 && "wasm-compiler-edge" !== n12 && i12.push({ _tag: "warning", value: ["recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"] });
                  let d2 = u2 || !r12;
                  c3 && (d2 || "edge" === n12) && ("edge" === n12 ? o3(["Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.", "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."]) : u2 ? o3(["You've provided both a driver adapter and an Accelerate database URL. Driver adapters currently cannot connect to Accelerate.", "Please provide either a driver adapter with a direct database URL or an Accelerate URL and no driver adapter."]) : r12 || o3(["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."]));
                  let p2 = { accelerate: d2, ppg: l3, driverAdapters: c3 };
                  return a4.length > 0 ? { ok: false, diagnostics: { warnings: i12, errors: a4 }, isUsing: p2 } : { ok: true, diagnostics: { warnings: i12 }, isUsing: p2 };
                }({ url: r11, adapter: t12.adapter, copyEngine: e11, targetBuildType: "wasm-engine-edge" });
                for (let e12 of a3.warnings) tz(...e12.value);
                if (!n11) throw new tZ(a3.errors[0].value, { clientVersion: t12.clientVersion });
                return tE(t12.generator), (i11.accelerate || i11.ppg) && i11.driverAdapters, i11.accelerate ? new iO(t12) : i11.driverAdapters ? new iU(t12) : new ij({ clientVersion: t12.clientVersion });
              }(e10, this._engineConfig), this._requestHandler = new i8(this, n10), a2.log) for (let e11 of a2.log) {
                let t12 = "string" == typeof e11 ? e11 : "stdout" === e11.emit ? e11.level : null;
                t12 && this.$on(t12, (e12) => {
                  t$.log(`${t$.tags[t12] ?? ""}`, e12.message || e12.query);
                });
              }
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            }
            return this._appliedParent = n$(this);
          }
          get [Symbol.toStringTag]() {
            return "PrismaClient";
          }
          $on(e11, t11) {
            return "beforeExit" === e11 ? this._engine.onBeforeExit(t11) : e11 && this._engineConfig.logEmitter.on(e11, t11), this;
          }
          $connect() {
            try {
              return this._engine.start();
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            }
          }
          async $disconnect() {
            try {
              await this._engine.stop();
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            } finally {
              tm.length = 0;
            }
          }
          $executeRawInternal(e11, t11, r10, n10) {
            let i10 = this._activeProvider;
            return this._request({ action: "executeRaw", args: r10, transaction: e11, clientMethod: t11, argsMapper: iK({ clientMethod: t11, activeProvider: i10 }), callsite: nx(this._errorFormat), dataPath: [], middlewareArgsMapper: n10 });
          }
          $executeRaw(e11, ...t11) {
            return this._createPrismaPromise((r10) => {
              if (void 0 !== e11.raw || void 0 !== e11.sql) {
                let [n10, i10] = ad(e11, t11);
                return iB(this._activeProvider, n10.text, n10.values, Array.isArray(e11) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(r10, "$executeRaw", n10, i10);
              }
              throw new tZ("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
            });
          }
          $executeRawUnsafe(e11, ...t11) {
            return this._createPrismaPromise((r10) => (iB(this._activeProvider, e11, t11, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(r10, "$executeRawUnsafe", [e11, ...t11])));
          }
          $runCommandRaw(t11) {
            if ("mongodb" !== e10.activeProvider) throw new tZ(`The ${e10.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
            return this._createPrismaPromise((e11) => this._request({ args: t11, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: iM, callsite: nx(this._errorFormat), transaction: e11 }));
          }
          async $queryRawInternal(e11, t11, r10, n10) {
            let i10 = this._activeProvider;
            return this._request({ action: "queryRaw", args: r10, transaction: e11, clientMethod: t11, argsMapper: iK({ clientMethod: t11, activeProvider: i10 }), callsite: nx(this._errorFormat), dataPath: [], middlewareArgsMapper: n10 });
          }
          $queryRaw(e11, ...t11) {
            return this._createPrismaPromise((r10) => {
              if (void 0 !== e11.raw || void 0 !== e11.sql) return this.$queryRawInternal(r10, "$queryRaw", ...ad(e11, t11));
              throw new tZ("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
            });
          }
          $queryRawTyped(e11) {
            return this._createPrismaPromise((t11) => {
              if (!this._hasPreviewFlag("typedSql")) throw new tZ("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
              return this.$queryRawInternal(t11, "$queryRawTyped", e11);
            });
          }
          $queryRawUnsafe(e11, ...t11) {
            return this._createPrismaPromise((r10) => this.$queryRawInternal(r10, "$queryRawUnsafe", [e11, ...t11]));
          }
          _transactionWithArray({ promises: e11, options: t11 }) {
            var r10;
            let n10 = ac.nextId(), i10 = function(e12, t12 = () => {
            }) {
              let r11, n11 = new Promise((e13) => r11 = e13);
              return { then: (i11) => (0 == --e12 && r11(t12()), i11?.(n11)) };
            }(e11.length);
            return 0 === (r10 = e11.map((e12, r11) => {
              if (e12?.[Symbol.toStringTag] !== "PrismaPromise") throw Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
              let a2 = t11?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel;
              return e12.requestTransaction?.({ kind: "batch", id: n10, index: r11, isolationLevel: a2, lock: i10 }) ?? e12;
            })).length ? Promise.resolve([]) : new Promise((e12, t12) => {
              let n11 = Array(r10.length), i11 = null, a2 = false, o2 = 0, s2 = () => {
                a2 || ++o2 === r10.length && (a2 = true, i11 ? t12(i11) : e12(n11));
              }, l2 = (e13) => {
                a2 || (a2 = true, t12(e13));
              };
              for (let e13 = 0; e13 < r10.length; e13++) r10[e13].then((t13) => {
                n11[e13] = t13, s2();
              }, (t13) => {
                i0(t13) ? t13.batchRequestIdx === e13 ? l2(t13) : (i11 || (i11 = t13), s2()) : l2(t13);
              });
            });
          }
          async _transactionWithCallback({ callback: e11, options: t11 }) {
            let r10 = { traceparent: this._tracingHelper.getTraceParent() }, n10 = { maxWait: t11?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: t11?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: t11?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, i10 = await this._engine.transaction("start", r10, n10), a2;
            try {
              let t12 = { kind: "itx", ...i10 };
              a2 = await e11(this._createItxClient(t12)), await this._engine.transaction("commit", r10, i10);
            } catch (e12) {
              throw await this._engine.transaction("rollback", r10, i10).catch(() => {
              }), e12;
            }
            return a2;
          }
          _createItxClient(e11) {
            return nm(n$(nm(this[nN] ? this[nN] : this, [nd("_appliedParent", () => this._appliedParent._createItxClient(e11)), nd("_createPrismaPromise", () => iG(e11)), nd(al, () => e11.id)])), [ny(nM)]);
          }
          $transaction(e11, t11) {
            let r10;
            return r10 = "function" == typeof e11 ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? () => {
              throw Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
            } : () => this._transactionWithCallback({ callback: e11, options: t11 }) : () => this._transactionWithArray({ promises: e11, options: t11 }), this._tracingHelper.runInChildSpan({ name: "transaction", attributes: { method: "$transaction" } }, r10);
          }
          _request(e11) {
            e11.otelParentCtx = this._tracingHelper.getActiveContext();
            let t11 = e11.middlewareArgsMapper ?? as, r10 = { args: t11.requestArgsToMiddlewareArgs(e11.args), dataPath: e11.dataPath, runInTransaction: !!e11.transaction, action: e11.action, model: e11.model }, n10 = { operation: { name: "operation", attributes: { method: r10.action, model: r10.model, name: r10.model ? `${r10.model}.${r10.action}` : r10.action } } }, i10 = async (r11) => {
              let { runInTransaction: n11, args: i11, ...a2 } = r11, o2 = { ...e11, ...a2 };
              i11 && (o2.args = t11.middlewareArgsToRequestArgs(i11)), void 0 !== e11.transaction && false === n11 && delete o2.transaction;
              let s2 = await function(e12, t12) {
                let { jsModelName: r12, action: n12, clientMethod: i12 } = t12;
                if (e12._extensions.isEmpty()) return e12._executeRequest(t12);
                let a3 = e12._extensions.getAllQueryCallbacks(r12 ?? "$none", r12 ? n12 : i12);
                return function e13(t13, r13, n13, i13 = 0) {
                  return t13._createPrismaPromise((a4) => {
                    let o3 = r13.customDataProxyFetch;
                    return "transaction" in r13 && void 0 !== a4 && (r13.transaction?.kind === "batch" && r13.transaction.lock.then(), r13.transaction = a4), i13 === n13.length ? t13._executeRequest(r13) : n13[i13]({ model: r13.model, operation: r13.model ? r13.action : r13.clientMethod, args: function(e14) {
                      var t14, r14;
                      if (e14 instanceof na) {
                        return new na((t14 = e14).strings, t14.values);
                      }
                      if (nn(e14)) {
                        return new nt((r14 = e14).sql, r14.values);
                      }
                      if (Array.isArray(e14)) {
                        let t15 = [e14[0]];
                        for (let r15 = 1; r15 < e14.length; r15++) t15[r15] = nL(e14[r15]);
                        return t15;
                      }
                      let n14 = {};
                      for (let t15 in e14) n14[t15] = nL(e14[t15]);
                      return n14;
                    }(r13.args ?? {}), __internalParams: r13, query: (a5, s3 = r13) => {
                      let l2 = s3.customDataProxyFetch;
                      return s3.customDataProxyFetch = nq(o3, l2), s3.args = a5, e13(t13, s3, n13, i13 + 1);
                    } });
                  });
                }(e12, t12, a3);
              }(this, o2);
              return o2.model ? function({ result: e12, modelName: t12, args: r12, extensions: n12, runtimeDataModel: i12, globalOmit: a3 }) {
                return n12.isEmpty() || null == e12 || "object" != typeof e12 || !i12.models[t12] ? e12 : nU({ result: e12, args: r12 ?? {}, modelName: t12, runtimeDataModel: i12, visitor: (e13, t13, r13) => {
                  let i13 = rW(t13);
                  return function({ result: e14, modelName: t14, select: r14, omit: n13, extensions: i14 }) {
                    let a4 = i14.getAllComputedFields(t14);
                    if (!a4) return e14;
                    let o3 = [], s3 = [];
                    for (let t15 of Object.values(a4)) {
                      if (n13) {
                        if (n13[t15.name]) continue;
                        let e15 = t15.needs.filter((e16) => n13[e16]);
                        e15.length > 0 && s3.push(ny(e15));
                      } else if (r14) {
                        if (!r14[t15.name]) continue;
                        let e15 = t15.needs.filter((e16) => !r14[e16]);
                        e15.length > 0 && s3.push(ny(e15));
                      }
                      (function(e15, t16) {
                        return t16.every((t17) => Object.prototype.hasOwnProperty.call(e15, t17));
                      })(e14, t15.needs) && o3.push(function(e15, t16) {
                        return np(nd(e15.name, () => e15.compute(t16)));
                      }(t15, nm(e14, o3)));
                    }
                    return o3.length > 0 || s3.length > 0 ? nm(e14, [...o3, ...s3]) : e14;
                  }({ result: e13, modelName: i13, select: r13.select, omit: r13.select ? void 0 : { ...a3?.[i13], ...r13.omit }, extensions: n12 });
                } });
              }({ result: s2, modelName: o2.model, args: o2.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : s2;
            };
            return this._tracingHelper.runInChildSpan(n10.operation, () => i10(r10));
          }
          async _executeRequest({ args: e11, clientMethod: t11, dataPath: r10, callsite: n10, action: i10, model: a2, argsMapper: o2, transaction: s2, unpacker: l2, otelParentCtx: c2, customDataProxyFetch: u2 }) {
            try {
              e11 = o2 ? o2(e11) : e11;
              let d2 = this._tracingHelper.runInChildSpan({ name: "serialize" }, () => r2({ modelName: a2, runtimeDataModel: this._runtimeDataModel, action: i10, args: e11, clientMethod: t11, callsite: n10, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
              return tv.enabled("prisma:client") && (ao("Prisma Client call:"), ao(`prisma.${t11}(${function(e12) {
                if (void 0 === e12) return "";
                let t12 = rH(e12);
                return new rl(0, { colors: rd }).write(t12).toString();
              }(e11)})`), ao("Generated request:"), ao(JSON.stringify(d2, null, 2) + `
`)), s2?.kind === "batch" && await s2.lock, this._requestHandler.request({ protocolQuery: d2, modelName: a2, action: i10, clientMethod: t11, dataPath: r10, callsite: n10, args: e11, extensions: this._extensions, transaction: s2, unpacker: l2, otelParentCtx: c2, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: u2 });
            } catch (e12) {
              throw e12.clientVersion = this._clientVersion, e12;
            }
          }
          $metrics = new r4(this);
          _hasPreviewFlag(e11) {
            return !!this._engineConfig.previewFeatures?.includes(e11);
          }
          $applyPendingMigrations() {
            return this._engine.applyPendingMigrations();
          }
          $extends = nD;
        }
        return t10;
      }
      function ad(e10, t10) {
        var r10;
        return Array.isArray(r10 = e10) && Array.isArray(r10.raw) ? [new na(e10, t10), iJ] : [e10, iz];
      }
      D(), U(), j(), M(), L(), e_();
      var ap = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
      function af(e10) {
        return new Proxy(e10, { get(e11, t10) {
          if (t10 in e11) return e11[t10];
          if (!ap.has(t10)) throw TypeError(`Invalid enum value: ${String(t10)}`);
        } });
      }
      D(), U(), j(), M(), L(), e_(), e_();
    }, 54998, (e, t, r) => {
      "use strict";
      let n;
      var i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, l = {}, c = { QueryEngine: () => N, __wbg_Error_e83987f665cf5504: () => $, __wbg_Number_bb48ca12f395cd08: () => D, __wbg_String_8f0eb39a4a4c2f66: () => U, __wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd: () => j, __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: () => M, __wbg___wbindgen_debug_string_df47ffb5e35e6763: () => L, __wbg___wbindgen_in_bb933bd9e1b3bc0f: () => H, __wbg___wbindgen_is_bigint_cb320707dcd35f0b: () => q, __wbg___wbindgen_is_function_ee8a6c5833c90377: () => V, __wbg___wbindgen_is_object_c818261d21f283a4: () => F, __wbg___wbindgen_is_string_fbb76cb2940daafd: () => W, __wbg___wbindgen_is_undefined_2d472862bd29a478: () => B, __wbg___wbindgen_jsval_eq_6b13ab83478b1c50: () => K, __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: () => J, __wbg___wbindgen_number_get_a20bf9b85341449d: () => z, __wbg___wbindgen_string_get_e4f06c90489ad01b: () => G, __wbg___wbindgen_throw_b855445ff6a94295: () => X, __wbg__wbg_cb_unref_2454a539ea5790d9: () => Q, __wbg_call_525440f72fbfc0ea: () => Y, __wbg_call_e762c39fa8ea36bf: () => Z, __wbg_crypto_805be4ce92f1e370: () => ee, __wbg_done_2042aa2670fb1db1: () => et, __wbg_entries_e171b586f8f6bdbf: () => er, __wbg_exec_fdeec61d47617356: () => en, __wbg_getRandomValues_f6a868620c8bab49: () => ei, __wbg_getTime_14776bfb48a1bff9: () => ea, __wbg_get_7bed016f185add81: () => eo, __wbg_get_ece95cf6585650d9: () => es, __wbg_get_efcb449f58ec27c2: () => el, __wbg_get_with_ref_key_1dc361bd10053bfe: () => ec, __wbg_has_787fafc980c3ccdb: () => eu, __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: () => ed, __wbg_instanceof_Map_8579b5e2ab5437c7: () => ep, __wbg_instanceof_Promise_001fdd42afa1b7ef: () => ef, __wbg_instanceof_Uint8Array_20c8e73002f7af98: () => eh, __wbg_isArray_96e0af9891d0945d: () => eg, __wbg_isSafeInteger_d216eda7911dde36: () => em, __wbg_iterator_e5822695327a3c39: () => eb, __wbg_keys_b4d27b02ad14f4be: () => ey, __wbg_length_69bca3cb64fc8748: () => ew, __wbg_length_cdd215e10d9dd507: () => e_, __wbg_msCrypto_2ac4d17c4748234a: () => ev, __wbg_new_0_f9740686d739025c: () => ex, __wbg_new_1acc0b6eea89d040: () => eE, __wbg_new_23fa8b12a239f036: () => eS, __wbg_new_3c3d849046688a66: () => ek, __wbg_new_5a79be3ab53b8aa5: () => eA, __wbg_new_68651c719dcda04e: () => eP, __wbg_new_e17d9f43105b08be: () => eT, __wbg_new_from_slice_92f4d78ca282a2d2: () => eR, __wbg_new_no_args_ee98eee5275000a4: () => eC, __wbg_new_with_length_01aa0dc35aa13543: () => eO, __wbg_next_020810e0ae8ebcb0: () => eI, __wbg_next_2c826fe5dfec6b6a: () => eN, __wbg_node_ecc8306b9857f33d: () => e$, __wbg_now_793306c526e2e3b6: () => eD, __wbg_now_7fd00a794a07d388: () => eU, __wbg_now_b3f7572f6ef3d3a9: () => ej, __wbg_process_5cff2739921be718: () => eM, __wbg_prototypesetcall_2a6620b6922694b2: () => eL, __wbg_push_df81a39d04db858c: () => eH, __wbg_queueMicrotask_5a8a9131f3f0b37b: () => eq, __wbg_queueMicrotask_6d79674585219521: () => eV, __wbg_randomFillSync_d3c85af7e31cf1f8: () => eF, __wbg_require_0c566c6f2eef6c79: () => eW, __wbg_resolve_caf97c30b83f7053: () => eB, __wbg_setTimeout_5d6a1d4fc51ea450: () => eK, __wbg_set_3f1d0b984ed272ed: () => eJ, __wbg_set_907fb406c34a251d: () => ez, __wbg_set_c213c871859d6500: () => eG, __wbg_set_c2abbebe8b9ebee1: () => eX, __wbg_set_wasm: () => p, __wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e: () => eQ, __wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac: () => eY, __wbg_static_accessor_SELF_6fdf4b64710cc91b: () => eZ, __wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2: () => e0, __wbg_subarray_480600f3d6a9f26c: () => e1, __wbg_then_4f46f6544e6b4a28: () => e2, __wbg_then_70d05cf780a18d77: () => e5, __wbg_valueOf_9eee4828c11458ca: () => e6, __wbg_value_692627309814bb8c: () => e3, __wbg_versions_a8e5a362e1f16442: () => e8, __wbindgen_cast_2241b6af4c4b2941: () => e4, __wbindgen_cast_4625c577ab2ec9ee: () => e9, __wbindgen_cast_7bf296c42657ff30: () => e7, __wbindgen_cast_9ae0607507abb057: () => te, __wbindgen_cast_cb9088102bce6b30: () => tt, __wbindgen_cast_d6cd19b81560fd6e: () => tr, __wbindgen_init_externref_table: () => tn, debug_panic: () => C, getBuildTimeInfo: () => R };
      for (var u in c) i(l, u, { get: c[u], enumerable: true });
      t.exports = ((e10, t2, r2, n2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of o(t2)) s.call(e10, l2) || l2 === r2 || i(e10, l2, { get: () => t2[l2], enumerable: !(n2 = a(t2, l2)) || n2.enumerable });
        return e10;
      })(i({}, "__esModule", { value: true }), l);
      var d = () => {
      };
      function p(e10) {
        n = e10;
      }
      d.prototype = d;
      let f = null;
      function h() {
        return (null === f || 0 === f.byteLength) && (f = new Uint8Array(n.memory.buffer)), f;
      }
      let g = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
      g.decode();
      let m = 0;
      function b(e10, t2) {
        var r2;
        return e10 >>>= 0, r2 = e10, (m += t2) >= 2146435072 && ((g = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })).decode(), m = t2), g.decode(h().subarray(r2, r2 + t2));
      }
      let y = 0, w = new TextEncoder();
      function _(e10, t2, r2) {
        if (void 0 === r2) {
          let r3 = w.encode(e10), n3 = t2(r3.length, 1) >>> 0;
          return h().subarray(n3, n3 + r3.length).set(r3), y = r3.length, n3;
        }
        let n2 = e10.length, i2 = t2(n2, 1) >>> 0, a2 = h(), o2 = 0;
        for (; o2 < n2; o2++) {
          let t3 = e10.charCodeAt(o2);
          if (t3 > 127) break;
          a2[i2 + o2] = t3;
        }
        if (o2 !== n2) {
          0 !== o2 && (e10 = e10.slice(o2)), i2 = r2(i2, n2, n2 = o2 + 3 * e10.length, 1) >>> 0;
          let t3 = h().subarray(i2 + o2, i2 + n2);
          o2 += w.encodeInto(e10, t3).written, i2 = r2(i2, n2, o2, 1) >>> 0;
        }
        return y = o2, i2;
      }
      "encodeInto" in w || (w.encodeInto = function(e10, t2) {
        let r2 = w.encode(e10);
        return t2.set(r2), { read: e10.length, written: r2.length };
      });
      let v = null;
      function x() {
        return (null === v || true === v.buffer.detached || void 0 === v.buffer.detached && v.buffer !== n.memory.buffer) && (v = new DataView(n.memory.buffer)), v;
      }
      function E(e10) {
        return null == e10;
      }
      function S(e10) {
        let t2 = n.__externref_table_alloc();
        return n.__wbindgen_externrefs.set(t2, e10), t2;
      }
      function k(e10, t2) {
        try {
          return e10.apply(this, t2);
        } catch (t3) {
          let e11 = S(t3);
          n.__wbindgen_exn_store(e11);
        }
      }
      function A(e10, t2) {
        return e10 >>>= 0, h().subarray(e10 / 1, e10 / 1 + t2);
      }
      let P = typeof FinalizationRegistry > "u" ? { register: () => {
      }, unregister: () => {
      } } : new FinalizationRegistry((e10) => e10.dtor(e10.a, e10.b));
      function T(e10) {
        let t2 = n.__wbindgen_externrefs.get(e10);
        return n.__externref_table_dealloc(e10), t2;
      }
      function R() {
        return n.getBuildTimeInfo();
      }
      function C(e10) {
        var t2 = E(e10) ? 0 : _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), r2 = y;
        let i2 = n.debug_panic(t2, r2);
        if (i2[1]) throw T(i2[0]);
      }
      function O(e10, t2, r2) {
        n.wasm_bindgen__convert__closures_____invoke__ha235f3ea55a06a09(e10, t2, r2);
      }
      let I = typeof FinalizationRegistry > "u" ? { register: () => {
      }, unregister: () => {
      } } : new FinalizationRegistry((e10) => n.__wbg_queryengine_free(e10 >>> 0, 1));
      class N {
        __destroy_into_raw() {
          let e10 = this.__wbg_ptr;
          return this.__wbg_ptr = 0, I.unregister(this), e10;
        }
        free() {
          let e10 = this.__destroy_into_raw();
          n.__wbg_queryengine_free(e10, 0);
        }
        disconnect(e10, t2) {
          let r2 = _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = y, a2 = _(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), o2 = y;
          return n.queryengine_disconnect(this.__wbg_ptr, r2, i2, a2, o2);
        }
        startTransaction(e10, t2, r2) {
          let i2 = _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = y, o2 = _(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), s2 = y, l2 = _(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), c2 = y;
          return n.queryengine_startTransaction(this.__wbg_ptr, i2, a2, o2, s2, l2, c2);
        }
        commitTransaction(e10, t2, r2) {
          let i2 = _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = y, o2 = _(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), s2 = y, l2 = _(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), c2 = y;
          return n.queryengine_commitTransaction(this.__wbg_ptr, i2, a2, o2, s2, l2, c2);
        }
        rollbackTransaction(e10, t2, r2) {
          let i2 = _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = y, o2 = _(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), s2 = y, l2 = _(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), c2 = y;
          return n.queryengine_rollbackTransaction(this.__wbg_ptr, i2, a2, o2, s2, l2, c2);
        }
        constructor(e10, t2, r2) {
          const i2 = n.queryengine_new(e10, t2, r2);
          if (i2[2]) throw T(i2[1]);
          return this.__wbg_ptr = i2[0] >>> 0, I.register(this, this.__wbg_ptr, this), this;
        }
        query(e10, t2, r2, i2) {
          let a2 = _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), o2 = y, s2 = _(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), l2 = y;
          var c2 = E(r2) ? 0 : _(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), u2 = y;
          let d2 = _(i2, n.__wbindgen_malloc, n.__wbindgen_realloc), p2 = y;
          return n.queryengine_query(this.__wbg_ptr, a2, o2, s2, l2, c2, u2, d2, p2);
        }
        trace(e10) {
          let t2 = _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), r2 = y;
          return n.queryengine_trace(this.__wbg_ptr, t2, r2);
        }
        connect(e10, t2) {
          let r2 = _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = y, a2 = _(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), o2 = y;
          return n.queryengine_connect(this.__wbg_ptr, r2, i2, a2, o2);
        }
        metrics(e10) {
          let t2 = _(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), r2 = y;
          return n.queryengine_metrics(this.__wbg_ptr, t2, r2);
        }
      }
      function $(e10, t2) {
        return Error(b(e10, t2));
      }
      function D(e10) {
        return Number(e10);
      }
      function U(e10, t2) {
        let r2 = _(String(t2), n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = y;
        x().setInt32(e10 + 4, i2, true), x().setInt32(e10 + 0, r2, true);
      }
      function j(e10, t2) {
        let r2 = "bigint" == typeof t2 ? t2 : void 0;
        x().setBigInt64(e10 + 8, E(r2) ? BigInt(0) : r2, true), x().setInt32(e10 + 0, !E(r2), true);
      }
      function M(e10) {
        let t2 = "boolean" == typeof e10 ? e10 : void 0;
        return E(t2) ? 16777215 : +!!t2;
      }
      function L(e10, t2) {
        let r2 = _(function e11(t3) {
          let r3, n2 = typeof t3;
          if ("number" == n2 || "boolean" == n2 || null == t3) return `${t3}`;
          if ("string" == n2) return `"${t3}"`;
          if ("symbol" == n2) {
            let e12 = t3.description;
            return null == e12 ? "Symbol" : `Symbol(${e12})`;
          }
          if ("function" == n2) {
            let e12 = t3.name;
            return "string" == typeof e12 && e12.length > 0 ? `Function(${e12})` : "Function";
          }
          if (Array.isArray(t3)) {
            let r4 = t3.length, n3 = "[";
            r4 > 0 && (n3 += e11(t3[0]));
            for (let i4 = 1; i4 < r4; i4++) n3 += ", " + e11(t3[i4]);
            return n3 + "]";
          }
          let i3 = /\[object ([^\]]+)\]/.exec(toString.call(t3));
          if (!i3 || !(i3.length > 1)) return toString.call(t3);
          if ("Object" == (r3 = i3[1])) try {
            return "Object(" + JSON.stringify(t3) + ")";
          } catch {
            return "Object";
          }
          return t3 instanceof Error ? `${t3.name}: ${t3.message}
${t3.stack}` : r3;
        }(t2), n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = y;
        x().setInt32(e10 + 4, i2, true), x().setInt32(e10 + 0, r2, true);
      }
      function H(e10, t2) {
        return e10 in t2;
      }
      function q(e10) {
        return "bigint" == typeof e10;
      }
      function V(e10) {
        return "function" == typeof e10;
      }
      function F(e10) {
        return "object" == typeof e10 && null !== e10;
      }
      function W(e10) {
        return "string" == typeof e10;
      }
      function B(e10) {
        return void 0 === e10;
      }
      function K(e10, t2) {
        return e10 === t2;
      }
      function J(e10, t2) {
        return e10 == t2;
      }
      function z(e10, t2) {
        let r2 = "number" == typeof t2 ? t2 : void 0;
        x().setFloat64(e10 + 8, E(r2) ? 0 : r2, true), x().setInt32(e10 + 0, !E(r2), true);
      }
      function G(e10, t2) {
        let r2 = "string" == typeof t2 ? t2 : void 0;
        var i2 = E(r2) ? 0 : _(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = y;
        x().setInt32(e10 + 4, a2, true), x().setInt32(e10 + 0, i2, true);
      }
      function X(e10, t2) {
        throw Error(b(e10, t2));
      }
      function Q(e10) {
        e10._wbg_cb_unref();
      }
      function Y() {
        return k(function(e10, t2, r2) {
          return e10.call(t2, r2);
        }, arguments);
      }
      function Z() {
        return k(function(e10, t2) {
          return e10.call(t2);
        }, arguments);
      }
      function ee(e10) {
        return e10.crypto;
      }
      function et(e10) {
        return e10.done;
      }
      function er(e10) {
        return Object.entries(e10);
      }
      function en(e10, t2, r2) {
        let n2 = e10.exec(b(t2, r2));
        return E(n2) ? 0 : S(n2);
      }
      function ei() {
        return k(function(e10, t2) {
          e10.getRandomValues(t2);
        }, arguments);
      }
      function ea(e10) {
        return e10.getTime();
      }
      function eo(e10, t2) {
        return e10[t2 >>> 0];
      }
      function es() {
        return k(function(e10, t2) {
          return e10[t2];
        }, arguments);
      }
      function el() {
        return k(function(e10, t2) {
          return Reflect.get(e10, t2);
        }, arguments);
      }
      function ec(e10, t2) {
        return e10[t2];
      }
      function eu() {
        return k(function(e10, t2) {
          return Reflect.has(e10, t2);
        }, arguments);
      }
      function ed(e10) {
        let t2;
        try {
          t2 = e10 instanceof ArrayBuffer;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function ep(e10) {
        let t2;
        try {
          t2 = e10 instanceof Map;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function ef(e10) {
        let t2;
        try {
          t2 = e10 instanceof Promise;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function eh(e10) {
        let t2;
        try {
          t2 = e10 instanceof Uint8Array;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function eg(e10) {
        return Array.isArray(e10);
      }
      function em(e10) {
        return Number.isSafeInteger(e10);
      }
      function eb() {
        return Symbol.iterator;
      }
      function ey(e10) {
        return Object.keys(e10);
      }
      function ew(e10) {
        return e10.length;
      }
      function e_(e10) {
        return e10.length;
      }
      function ev(e10) {
        return e10.msCrypto;
      }
      function ex() {
        return /* @__PURE__ */ new Date();
      }
      function eE() {
        return {};
      }
      function eS(e10, t2, r2, n2) {
        return new RegExp(b(e10, t2), b(r2, n2));
      }
      function ek(e10, t2) {
        try {
          var r2 = { a: e10, b: t2 };
          return new Promise((e11, t3) => {
            let i2 = r2.a;
            r2.a = 0;
            try {
              var a2;
              return a2 = r2.b, void n.wasm_bindgen__convert__closures_____invoke__h1a2f20be69ab8911(i2, a2, e11, t3);
            } finally {
              r2.a = i2;
            }
          });
        } finally {
          r2.a = r2.b = 0;
        }
      }
      function eA(e10) {
        return new Uint8Array(e10);
      }
      function eP() {
        return /* @__PURE__ */ new Map();
      }
      function eT() {
        return [];
      }
      function eR(e10, t2) {
        return new Uint8Array(A(e10, t2));
      }
      function eC(e10, t2) {
        return new d(b(e10, t2));
      }
      function eO(e10) {
        return new Uint8Array(e10 >>> 0);
      }
      function eI() {
        return k(function(e10) {
          return e10.next();
        }, arguments);
      }
      function eN(e10) {
        return e10.next;
      }
      function e$(e10) {
        return e10.node;
      }
      function eD() {
        return Date.now();
      }
      function eU(e10) {
        return e10.now();
      }
      function ej() {
        return k(function() {
          return Date.now();
        }, arguments);
      }
      function eM(e10) {
        return e10.process;
      }
      function eL(e10, t2, r2) {
        Uint8Array.prototype.set.call(A(e10, t2), r2);
      }
      function eH(e10, t2) {
        return e10.push(t2);
      }
      function eq(e10) {
        return e10.queueMicrotask;
      }
      function eV(e10) {
        queueMicrotask(e10);
      }
      function eF() {
        return k(function(e10, t2) {
          e10.randomFillSync(t2);
        }, arguments);
      }
      function eW() {
        return k(function() {
          return t.require;
        }, arguments);
      }
      function eB(e10) {
        return Promise.resolve(e10);
      }
      function eK(e10, t2) {
        return setTimeout(e10, t2 >>> 0);
      }
      function eJ(e10, t2, r2) {
        e10[t2] = r2;
      }
      function ez(e10, t2, r2) {
        return e10.set(t2, r2);
      }
      function eG(e10, t2, r2) {
        e10[t2 >>> 0] = r2;
      }
      function eX() {
        return k(function(e10, t2, r2) {
          return Reflect.set(e10, t2, r2);
        }, arguments);
      }
      function eQ() {
        let t2 = e.g;
        return E(t2) ? 0 : S(t2);
      }
      function eY() {
        let e10 = typeof globalThis > "u" ? null : globalThis;
        return E(e10) ? 0 : S(e10);
      }
      function eZ() {
        let e10 = typeof self > "u" ? null : self;
        return E(e10) ? 0 : S(e10);
      }
      function e0() {
        return E(null) ? 0 : S(null);
      }
      function e1(e10, t2, r2) {
        return e10.subarray(t2 >>> 0, r2 >>> 0);
      }
      function e2(e10, t2) {
        return e10.then(t2);
      }
      function e5(e10, t2, r2) {
        return e10.then(t2, r2);
      }
      function e6(e10) {
        return e10.valueOf();
      }
      function e3(e10) {
        return e10.value;
      }
      function e8(e10) {
        return e10.versions;
      }
      function e4(e10, t2) {
        return b(e10, t2);
      }
      function e9(e10) {
        return BigInt.asUintN(64, e10);
      }
      function e7(e10, t2) {
        var r2;
        let i2, a2;
        return r2 = n.wasm_bindgen__closure__destroy__hf9ae564cf31e91c2, i2 = { a: e10, b: t2, cnt: 1, dtor: r2 }, (a2 = (...e11) => {
          i2.cnt++;
          let t3 = i2.a;
          i2.a = 0;
          try {
            return O(t3, i2.b, ...e11);
          } finally {
            i2.a = t3, a2._wbg_cb_unref();
          }
        })._wbg_cb_unref = () => {
          0 == --i2.cnt && (i2.dtor(i2.a, i2.b), i2.a = 0, P.unregister(i2));
        }, P.register(a2, i2, i2), a2;
      }
      function te(e10) {
        return e10;
      }
      function tt(e10, t2) {
        return A(e10, t2);
      }
      function tr(e10) {
        return e10;
      }
      function tn() {
        let e10 = n.__wbindgen_externrefs, t2 = e10.grow(4);
        e10.set(0, void 0), e10.set(t2 + 0, void 0), e10.set(t2 + 1, null), e10.set(t2 + 2, true), e10.set(t2 + 3, false);
      }
      Symbol.dispose && (N.prototype[Symbol.dispose] = N.prototype.free);
    }, 97391, (e, t, r) => {
      Object.defineProperty(r, "__esModule", { value: true });
      let { PrismaClientKnownRequestError: n, PrismaClientUnknownRequestError: i, PrismaClientRustPanicError: a, PrismaClientInitializationError: o, PrismaClientValidationError: s, getPrismaClient: l, sqltag: c, empty: u, join: d, raw: p, skip: f, Decimal: h, Debug: g, objectEnumValues: m, makeStrictEnum: b, Extensions: y, warnOnce: w, defineDmmfProperty: _, Public: v, getRuntime: x, createParam: E } = e.r(4589), S = {};
      r.Prisma = S, r.$Enums = {}, S.prismaVersion = { client: "6.19.2", engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7" }, S.PrismaClientKnownRequestError = n, S.PrismaClientUnknownRequestError = i, S.PrismaClientRustPanicError = a, S.PrismaClientInitializationError = o, S.PrismaClientValidationError = s, S.Decimal = h, S.sql = c, S.empty = u, S.join = d, S.raw = p, S.validator = v.validator, S.getExtensionContext = y.getExtensionContext, S.defineExtension = y.defineExtension, S.DbNull = m.instances.DbNull, S.JsonNull = m.instances.JsonNull, S.AnyNull = m.instances.AnyNull, S.NullTypes = { DbNull: m.classes.DbNull, JsonNull: m.classes.JsonNull, AnyNull: m.classes.AnyNull }, r.Prisma.TransactionIsolationLevel = b({ ReadUncommitted: "ReadUncommitted", ReadCommitted: "ReadCommitted", RepeatableRead: "RepeatableRead", Serializable: "Serializable" }), r.Prisma.ModelScalarFieldEnum = { id: "id", name: "name", slug: "slug", gender: "gender", height: "height", chest: "chest", waist: "waist", hips: "hips", hair: "hair", eyes: "eyes", location: "location", bio: "bio", featured: "featured", order: "order", createdAt: "createdAt", updatedAt: "updatedAt" }, r.Prisma.ModelImageScalarFieldEnum = { id: "id", modelId: "modelId", imageUrl: "imageUrl", alt: "alt", concept: "concept", order: "order", isPrimary: "isPrimary", createdAt: "createdAt" }, r.Prisma.CampaignScalarFieldEnum = { id: "id", title: "title", slug: "slug", description: "description", client: "client", year: "year", coverImage: "coverImage", order: "order", createdAt: "createdAt", updatedAt: "updatedAt" }, r.Prisma.CampaignModelScalarFieldEnum = { id: "id", campaignId: "campaignId", modelId: "modelId" }, r.Prisma.CampaignImageScalarFieldEnum = { id: "id", campaignId: "campaignId", imageUrl: "imageUrl", alt: "alt", order: "order", createdAt: "createdAt" }, r.Prisma.ApplicationScalarFieldEnum = { id: "id", name: "name", email: "email", phone: "phone", age: "age", height: "height", city: "city", country: "country", instagram: "instagram", message: "message", status: "status", createdAt: "createdAt", updatedAt: "updatedAt" }, r.Prisma.ApplicationPhotoScalarFieldEnum = { id: "id", applicationId: "applicationId", imageUrl: "imageUrl", type: "type", createdAt: "createdAt" }, r.Prisma.ContactSubmissionScalarFieldEnum = { id: "id", name: "name", email: "email", subject: "subject", message: "message", createdAt: "createdAt" }, r.Prisma.HeroSlideScalarFieldEnum = { id: "id", title: "title", subtitle: "subtitle", imageUrl: "imageUrl", link: "link", order: "order", active: "active", createdAt: "createdAt" }, r.Prisma.ClientScalarFieldEnum = { id: "id", name: "name", logoUrl: "logoUrl", order: "order", active: "active", createdAt: "createdAt" }, r.Prisma.AdminUserScalarFieldEnum = { id: "id", email: "email", password: "password", name: "name", role: "role", createdAt: "createdAt" }, r.Prisma.PageContentScalarFieldEnum = { id: "id", page: "page", section: "section", key: "key", value: "value", updatedAt: "updatedAt" }, r.Prisma.AdminLogScalarFieldEnum = { id: "id", action: "action", entity: "entity", entityId: "entityId", details: "details", adminEmail: "adminEmail", createdAt: "createdAt" }, r.Prisma.SortOrder = { asc: "asc", desc: "desc" }, r.Prisma.QueryMode = { default: "default", insensitive: "insensitive" }, r.Prisma.NullsOrder = { first: "first", last: "last" }, r.Prisma.ModelName = { Model: "Model", ModelImage: "ModelImage", Campaign: "Campaign", CampaignModel: "CampaignModel", CampaignImage: "CampaignImage", Application: "Application", ApplicationPhoto: "ApplicationPhoto", ContactSubmission: "ContactSubmission", HeroSlide: "HeroSlide", Client: "Client", AdminUser: "AdminUser", PageContent: "PageContent", AdminLog: "AdminLog" };
      let k = { generator: { name: "client", provider: { fromEnvVar: null, value: "prisma-client-js" }, output: { value: "/Users/bayu/Documents/ANTIGRAVITY/WhoKnows3/node_modules/@prisma/client", fromEnvVar: null }, config: { engineType: "library" }, binaryTargets: [{ fromEnvVar: null, value: "darwin", native: true }], previewFeatures: [], sourceFilePath: "/Users/bayu/Documents/ANTIGRAVITY/WhoKnows3/prisma/schema.prisma" }, relativeEnvPaths: { rootEnvPath: null, schemaEnvPath: "../../../.env" }, relativePath: "../../../prisma", clientVersion: "6.19.2", engineVersion: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7", datasourceNames: ["db"], activeProvider: "postgresql", postinstall: false, ciName: "Vercel", inlineDatasources: { db: { url: { fromEnvVar: "DATABASE_URL", value: null } } }, inlineSchema: `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Model {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  gender    String // "women" or "men"
  height    String? // e.g., "5'9" / 175cm"
  chest     String?
  waist     String?
  hips      String?
  hair      String? // Hair color
  eyes      String? // Eye color
  location  String?
  bio       String?
  featured  Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  images    ModelImage[]
  campaigns CampaignModel[]
}

model ModelImage {
  id        String   @id @default(cuid())
  modelId   String
  model     Model    @relation(fields: [modelId], references: [id], onDelete: Cascade)
  imageUrl  String
  alt       String?
  concept   String?
  order     Int      @default(0)
  isPrimary Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([modelId])
}

model Campaign {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  client      String?
  year        String?
  coverImage  String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  models CampaignModel[]
  images CampaignImage[]
}

model CampaignModel {
  id         String   @id @default(cuid())
  campaignId String
  modelId    String
  campaign   Campaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  model      Model    @relation(fields: [modelId], references: [id], onDelete: Cascade)

  @@unique([campaignId, modelId])
  @@index([campaignId])
  @@index([modelId])
}

model CampaignImage {
  id         String   @id @default(cuid())
  campaignId String
  campaign   Campaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  imageUrl   String
  alt        String?
  order      Int      @default(0)
  createdAt  DateTime @default(now())

  @@index([campaignId])
}

model Application {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  age       String?
  height    String?
  city      String?
  country   String?
  instagram String?
  message   String?
  status    String   @default("pending") // pending, reviewed, accepted, rejected
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  photos ApplicationPhoto[]
}

model ApplicationPhoto {
  id            String      @id @default(cuid())
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  imageUrl      String
  type          String // "headshot", "side", "fullbody"
  createdAt     DateTime    @default(now())

  @@index([applicationId])
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  createdAt DateTime @default(now())
}

model HeroSlide {
  id        String   @id @default(cuid())
  title     String?
  subtitle  String?
  imageUrl  String
  link      String?
  order     Int      @default(0)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
}

model Client {
  id        String   @id @default(cuid())
  name      String
  logoUrl   String
  order     Int      @default(0)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
}

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String // Hashed
  name      String?
  role      String   @default("admin")
  createdAt DateTime @default(now())
}

model PageContent {
  id        String   @id @default(cuid())
  page      String // e.g., "home", "about", "contact", "apply", "men", "women"
  section   String // e.g., "hero", "intro", "listing"
  key       String // e.g., "title", "subtitle", "description"
  value     String   @db.Text
  updatedAt DateTime @updatedAt

  @@unique([page, section, key])
}

model AdminLog {
  id         String   @id @default(cuid())
  action     String // e.g., "create", "update", "delete", "login"
  entity     String // e.g., "model", "campaign", "hero", "application"
  entityId   String?
  details    String?  @db.Text
  adminEmail String
  createdAt  DateTime @default(now())
}
`, inlineSchemaHash: "ca01b9ad1455a21cfea84fe4bf2caf22975c0cf782d52a9e4ed1567673e78c8f", copyEngine: true };
      k.dirname = "/", k.runtimeDataModel = JSON.parse('{"models":{"Model":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"gender","kind":"scalar","type":"String"},{"name":"height","kind":"scalar","type":"String"},{"name":"chest","kind":"scalar","type":"String"},{"name":"waist","kind":"scalar","type":"String"},{"name":"hips","kind":"scalar","type":"String"},{"name":"hair","kind":"scalar","type":"String"},{"name":"eyes","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"featured","kind":"scalar","type":"Boolean"},{"name":"order","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"images","kind":"object","type":"ModelImage","relationName":"ModelToModelImage"},{"name":"campaigns","kind":"object","type":"CampaignModel","relationName":"CampaignModelToModel"}],"dbName":null},"ModelImage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"modelId","kind":"scalar","type":"String"},{"name":"model","kind":"object","type":"Model","relationName":"ModelToModelImage"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"alt","kind":"scalar","type":"String"},{"name":"concept","kind":"scalar","type":"String"},{"name":"order","kind":"scalar","type":"Int"},{"name":"isPrimary","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Campaign":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"client","kind":"scalar","type":"String"},{"name":"year","kind":"scalar","type":"String"},{"name":"coverImage","kind":"scalar","type":"String"},{"name":"order","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"models","kind":"object","type":"CampaignModel","relationName":"CampaignToCampaignModel"},{"name":"images","kind":"object","type":"CampaignImage","relationName":"CampaignToCampaignImage"}],"dbName":null},"CampaignModel":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"campaignId","kind":"scalar","type":"String"},{"name":"modelId","kind":"scalar","type":"String"},{"name":"campaign","kind":"object","type":"Campaign","relationName":"CampaignToCampaignModel"},{"name":"model","kind":"object","type":"Model","relationName":"CampaignModelToModel"}],"dbName":null},"CampaignImage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"campaignId","kind":"scalar","type":"String"},{"name":"campaign","kind":"object","type":"Campaign","relationName":"CampaignToCampaignImage"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"alt","kind":"scalar","type":"String"},{"name":"order","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Application":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"age","kind":"scalar","type":"String"},{"name":"height","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"instagram","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"photos","kind":"object","type":"ApplicationPhoto","relationName":"ApplicationToApplicationPhoto"}],"dbName":null},"ApplicationPhoto":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"applicationId","kind":"scalar","type":"String"},{"name":"application","kind":"object","type":"Application","relationName":"ApplicationToApplicationPhoto"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"ContactSubmission":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"HeroSlide":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"subtitle","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"link","kind":"scalar","type":"String"},{"name":"order","kind":"scalar","type":"Int"},{"name":"active","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Client":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"logoUrl","kind":"scalar","type":"String"},{"name":"order","kind":"scalar","type":"Int"},{"name":"active","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"AdminUser":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"PageContent":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"page","kind":"scalar","type":"String"},{"name":"section","kind":"scalar","type":"String"},{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"AdminLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"action","kind":"scalar","type":"String"},{"name":"entity","kind":"scalar","type":"String"},{"name":"entityId","kind":"scalar","type":"String"},{"name":"details","kind":"scalar","type":"String"},{"name":"adminEmail","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}'), _(r.Prisma, k.runtimeDataModel), k.engineWasm = { getRuntime: async () => e.r(54998), getQueryEngineWasmModule: async () => {
        let t2 = (await Promise.resolve().then(() => e.i(6124))).default;
        return (await t2).default;
      } }, k.compilerWasm = void 0, k.injectableEdgeEnv = () => ({ parsed: { DATABASE_URL: "u" > typeof globalThis && globalThis.DATABASE_URL || "u" > typeof process && process.env && process.env.DATABASE_URL || void 0 } }), ("u" > typeof globalThis && globalThis.DEBUG || "u" > typeof process && process.env && process.env.DEBUG) && g.enable("u" > typeof globalThis && globalThis.DEBUG || "u" > typeof process && process.env && process.env.DEBUG || void 0), r.PrismaClient = l(k), Object.assign(r, S);
    }, 7565, (e, t, r) => {
      t.exports = { ...e.r(97391) };
    }, 3466, (e, t, r) => {
      t.exports = { ...e.r(7565) };
    }, 90894, (e, t, r) => {
      e.n(__import_unsupported("crypto"));
    }, 58217, (e) => {
      "use strict";
      let t, r, n, i, a, o, s;
      async function l() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      let c = null;
      async function u() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        c || (c = l());
        let e10 = await c;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function d(...e10) {
        let t10 = await l();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let p = null;
      function f() {
        return p || (p = u()), p;
      }
      function h(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(h(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(h(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, n10, i10) {
            if ("function" == typeof i10[0]) return i10[0](t10);
            throw Object.defineProperty(Error(h(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      f();
      class g extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class m extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class b extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let y = "_N_T_", w = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function _(e10) {
        var t10, r10, n10, i10, a10, o10 = [], s10 = 0;
        function l2() {
          for (; s10 < e10.length && /\s/.test(e10.charAt(s10)); ) s10 += 1;
          return s10 < e10.length;
        }
        for (; s10 < e10.length; ) {
          for (t10 = s10, a10 = false; l2(); ) if ("," === (r10 = e10.charAt(s10))) {
            for (n10 = s10, s10 += 1, l2(), i10 = s10; s10 < e10.length && "=" !== (r10 = e10.charAt(s10)) && ";" !== r10 && "," !== r10; ) s10 += 1;
            s10 < e10.length && "=" === e10.charAt(s10) ? (a10 = true, s10 = i10, o10.push(e10.substring(t10, n10)), t10 = s10) : s10 = n10 + 1;
          } else s10 += 1;
          (!a10 || s10 >= e10.length) && o10.push(e10.substring(t10, e10.length));
        }
        return o10;
      }
      function v(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, i10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(..._(i10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i10;
        return t10;
      }
      function x(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...w, GROUP: { builtinReact: [w.reactServerComponents, w.actionBrowser], serverOnly: [w.reactServerComponents, w.actionBrowser, w.instrument, w.middleware], neutralTarget: [w.apiNode, w.apiEdge], clientOnly: [w.serverSideRendering, w.appPagesBrowser], bundled: [w.reactServerComponents, w.actionBrowser, w.serverSideRendering, w.appPagesBrowser, w.shared, w.instrument, w.middleware], appPages: [w.reactServerComponents, w.serverSideRendering, w.appPagesBrowser, w.actionBrowser] } });
      let E = Symbol("response"), S = Symbol("passThrough"), k = Symbol("waitUntil");
      class A {
        constructor(e10, t10) {
          this[S] = false, this[k] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[E] || (this[E] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[S] = true;
        }
        waitUntil(e10) {
          if ("external" === this[k].kind) return (0, this[k].function)(e10);
          this[k].promises.push(e10);
        }
      }
      class P extends A {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new g({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new g({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function T(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function R(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function C(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = R(e10);
        return `${t10}${r10}${n10}${i10}`;
      }
      function O(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = R(e10);
        return `${r10}${t10}${n10}${i10}`;
      }
      function I(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = R(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let N = /* @__PURE__ */ new WeakMap();
      function $(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n10 = N.get(t10);
        n10 || (n10 = t10.map((e11) => e11.toLowerCase()), N.set(t10, n10));
        let i10 = e10.split("/", 2);
        if (!i10[1]) return { pathname: e10 };
        let a10 = i10[1].toLowerCase(), o10 = n10.indexOf(a10);
        return o10 < 0 ? { pathname: e10 } : (r10 = t10[o10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let D = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function U(e10, t10) {
        return new URL(String(e10).replace(D, "localhost"), t10 && String(t10).replace(D, "localhost"));
      }
      let j = Symbol("NextURLInternal");
      class M {
        constructor(e10, t10, r10) {
          let n10, i10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, i10 = r10 || {}) : i10 = r10 || t10 || {}, this[j] = { url: U(e10, n10 ?? i10.base), options: i10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, i10;
          let a10 = function(e11, t11) {
            let { basePath: r11, i18n: n11, trailingSlash: i11 } = t11.nextConfig ?? {}, a11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : i11 };
            r11 && I(a11.pathname, r11) && (a11.pathname = function(e12, t12) {
              if (!I(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(a11.pathname, r11), a11.basePath = r11);
            let o11 = a11.pathname;
            if (a11.pathname.startsWith("/_next/data/") && a11.pathname.endsWith(".json")) {
              let e12 = a11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              a11.buildId = e12[0], o11 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (a11.pathname = o11);
            }
            if (n11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a11.pathname) : $(a11.pathname, n11.locales);
              a11.locale = e12.detectedLocale, a11.pathname = e12.pathname ?? a11.pathname, !e12.detectedLocale && a11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o11) : $(o11, n11.locales)).detectedLocale && (a11.locale = e12.detectedLocale);
            }
            return a11;
          }(this[j].url.pathname, { nextConfig: this[j].options.nextConfig, parseData: true, i18nProvider: this[j].options.i18nProvider }), o10 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[j].url, this[j].options.headers);
          this[j].domainLocale = this[j].options.i18nProvider ? this[j].options.i18nProvider.detectDomainLocale(o10) : function(e11, t11, r11) {
            if (e11) {
              for (let n11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n11.domain?.split(":", 1)[0].toLowerCase() || r11 === n11.defaultLocale.toLowerCase() || n11.locales?.some((e12) => e12.toLowerCase() === r11)) return n11;
            }
          }(null == (t10 = this[j].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o10);
          let s10 = (null == (r10 = this[j].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i10 = this[j].options.nextConfig) || null == (n10 = i10.i18n) ? void 0 : n10.defaultLocale);
          this[j].url.pathname = a10.pathname, this[j].defaultLocale = s10, this[j].basePath = a10.basePath ?? "", this[j].buildId = a10.buildId, this[j].locale = a10.locale ?? s10, this[j].trailingSlash = a10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let i10 = e11.toLowerCase();
            return !n10 && (I(i10, "/api") || I(i10, `/${t11.toLowerCase()}`)) ? e11 : C(e11, `/${t11}`);
          }((e10 = { basePath: this[j].basePath, buildId: this[j].buildId, defaultLocale: this[j].options.forceLocale ? void 0 : this[j].defaultLocale, locale: this[j].locale, pathname: this[j].url.pathname, trailingSlash: this[j].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = T(t10)), e10.buildId && (t10 = O(C(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = C(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : O(t10, "/") : T(t10);
        }
        formatSearch() {
          return this[j].url.search;
        }
        get buildId() {
          return this[j].buildId;
        }
        set buildId(e10) {
          this[j].buildId = e10;
        }
        get locale() {
          return this[j].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[j].locale || !(null == (r10 = this[j].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[j].locale = e10;
        }
        get defaultLocale() {
          return this[j].defaultLocale;
        }
        get domainLocale() {
          return this[j].domainLocale;
        }
        get searchParams() {
          return this[j].url.searchParams;
        }
        get host() {
          return this[j].url.host;
        }
        set host(e10) {
          this[j].url.host = e10;
        }
        get hostname() {
          return this[j].url.hostname;
        }
        set hostname(e10) {
          this[j].url.hostname = e10;
        }
        get port() {
          return this[j].url.port;
        }
        set port(e10) {
          this[j].url.port = e10;
        }
        get protocol() {
          return this[j].url.protocol;
        }
        set protocol(e10) {
          this[j].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[j].url = U(e10), this.analyze();
        }
        get origin() {
          return this[j].url.origin;
        }
        get pathname() {
          return this[j].url.pathname;
        }
        set pathname(e10) {
          this[j].url.pathname = e10;
        }
        get hash() {
          return this[j].url.hash;
        }
        set hash(e10) {
          this[j].url.hash = e10;
        }
        get search() {
          return this[j].url.search;
        }
        set search(e10) {
          this[j].url.search = e10;
        }
        get password() {
          return this[j].url.password;
        }
        set password(e10) {
          this[j].url.password = e10;
        }
        get username() {
          return this[j].url.username;
        }
        set username(e10) {
          this[j].url.username = e10;
        }
        get basePath() {
          return this[j].basePath;
        }
        set basePath(e10) {
          this[j].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new M(String(this), this[j].options);
        }
      }
      var L = e.i(28042);
      let H = Symbol("internal request");
      class q extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          x(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const n10 = new M(r10, { headers: v(this.headers), nextConfig: t10.nextConfig });
          this[H] = { cookies: new L.RequestCookies(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[H].cookies;
        }
        get nextUrl() {
          return this[H].nextUrl;
        }
        get page() {
          throw new m();
        }
        get ua() {
          throw new b();
        }
        get url() {
          return this[H].url;
        }
      }
      class V {
        static get(e10, t10, r10) {
          let n10 = Reflect.get(e10, t10, r10);
          return "function" == typeof n10 ? n10.bind(e10) : n10;
        }
        static set(e10, t10, r10, n10) {
          return Reflect.set(e10, t10, r10, n10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let F = Symbol("internal response"), W = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function B(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [n10, i10] of e10.request.headers) t10.set("x-middleware-request-" + n10, i10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class K extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, n10 = new Proxy(new L.ResponseCookies(r10), { get(e11, n11, i10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...i11) => {
                  let a10 = Reflect.apply(e11[n11], e11, i11), o10 = new Headers(r10);
                  return a10 instanceof L.ResponseCookies && r10.set("x-middleware-set-cookie", a10.getAll().map((e12) => (0, L.stringifyCookie)(e12)).join(",")), B(t10, o10), a10;
                };
              default:
                return V.get(e11, n11, i10);
            }
          } });
          this[F] = { cookies: n10, url: t10.url ? new M(t10.url, { headers: v(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[F].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new K(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!W.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n10 = "object" == typeof t10 ? t10 : {}, i10 = new Headers(null == n10 ? void 0 : n10.headers);
          return i10.set("Location", x(e10)), new K(null, { ...n10, headers: i10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", x(e10)), B(t10, r10), new K(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), B(e10, t10), new K(null, { ...e10, headers: t10 });
        }
      }
      function J(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), i10 = n10.origin === r10.origin;
        return { url: i10 ? n10.toString().slice(r10.origin.length) : n10.toString(), isRelative: i10 };
      }
      var z = e.i(24628);
      z.NEXT_RSC_UNION_QUERY;
      class G extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new G();
        }
      }
      class X extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n10) {
            if ("symbol" == typeof r10) return V.get(t10, r10, n10);
            let i10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            if (void 0 !== a10) return V.get(t10, a10, n10);
          }, set(t10, r10, n10, i10) {
            if ("symbol" == typeof r10) return V.set(t10, r10, n10, i10);
            let a10 = r10.toLowerCase(), o10 = Object.keys(e10).find((e11) => e11.toLowerCase() === a10);
            return V.set(t10, o10 ?? r10, n10, i10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return V.has(t10, r10);
            let n10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 !== i10 && V.has(t10, i10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return V.deleteProperty(t10, r10);
            let n10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 === i10 || V.deleteProperty(t10, i10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return G.callable;
              default:
                return V.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new X(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n10] of this.entries()) e10.call(t10, n10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      e.i(7754);
      var Q = e.i(46478), Q = Q;
      class Y extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new Y();
        }
      }
      class Z {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return Y.callable;
              default:
                return V.get(e11, t10, r10);
            }
          } });
        }
      }
      let ee = Symbol.for("next.mutated.cookies");
      class et {
        static wrap(e10, t10) {
          let r10 = new L.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n10 = [], i10 = /* @__PURE__ */ new Set(), a10 = () => {
            let e11 = Q.workAsyncStorageInstance.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), n10 = r10.getAll().filter((e12) => i10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n10) {
                let r11 = new L.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o10 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case ee:
                return n10;
              case "delete":
                return function(...t12) {
                  i10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o10;
                  } finally {
                    a10();
                  }
                };
              case "set":
                return function(...t12) {
                  i10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o10;
                  } finally {
                    a10();
                  }
                };
              default:
                return V.get(e11, t11, r11);
            }
          } });
          return o10;
        }
      }
      function er(e10) {
        return "action" === e10.phase;
      }
      function en(e10, t10) {
        if (!er(e10)) throw new Y();
      }
      var ei = ((it = ei || {}).handleRequest = "BaseServer.handleRequest", it.run = "BaseServer.run", it.pipe = "BaseServer.pipe", it.getStaticHTML = "BaseServer.getStaticHTML", it.render = "BaseServer.render", it.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", it.renderToResponse = "BaseServer.renderToResponse", it.renderToHTML = "BaseServer.renderToHTML", it.renderError = "BaseServer.renderError", it.renderErrorToResponse = "BaseServer.renderErrorToResponse", it.renderErrorToHTML = "BaseServer.renderErrorToHTML", it.render404 = "BaseServer.render404", it), ea = ((ir = ea || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", ir.loadComponents = "LoadComponents.loadComponents", ir), eo = ((ii = eo || {}).getRequestHandler = "NextServer.getRequestHandler", ii.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", ii.getServer = "NextServer.getServer", ii.getServerRequestHandler = "NextServer.getServerRequestHandler", ii.createServer = "createServer.createServer", ii), es = ((ia = es || {}).compression = "NextNodeServer.compression", ia.getBuildId = "NextNodeServer.getBuildId", ia.createComponentTree = "NextNodeServer.createComponentTree", ia.clientComponentLoading = "NextNodeServer.clientComponentLoading", ia.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", ia.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", ia.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", ia.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", ia.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", ia.sendRenderResult = "NextNodeServer.sendRenderResult", ia.proxyRequest = "NextNodeServer.proxyRequest", ia.runApi = "NextNodeServer.runApi", ia.render = "NextNodeServer.render", ia.renderHTML = "NextNodeServer.renderHTML", ia.imageOptimizer = "NextNodeServer.imageOptimizer", ia.getPagePath = "NextNodeServer.getPagePath", ia.getRoutesManifest = "NextNodeServer.getRoutesManifest", ia.findPageComponents = "NextNodeServer.findPageComponents", ia.getFontManifest = "NextNodeServer.getFontManifest", ia.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", ia.getRequestHandler = "NextNodeServer.getRequestHandler", ia.renderToHTML = "NextNodeServer.renderToHTML", ia.renderError = "NextNodeServer.renderError", ia.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", ia.render404 = "NextNodeServer.render404", ia.startResponse = "NextNodeServer.startResponse", ia.route = "route", ia.onProxyReq = "onProxyReq", ia.apiResolver = "apiResolver", ia.internalFetch = "internalFetch", ia), el = ((io = el || {}).startServer = "startServer.startServer", io), ec = ((is = ec || {}).getServerSideProps = "Render.getServerSideProps", is.getStaticProps = "Render.getStaticProps", is.renderToString = "Render.renderToString", is.renderDocument = "Render.renderDocument", is.createBodyResult = "Render.createBodyResult", is), eu = ((il = eu || {}).renderToString = "AppRender.renderToString", il.renderToReadableStream = "AppRender.renderToReadableStream", il.getBodyResult = "AppRender.getBodyResult", il.fetch = "AppRender.fetch", il), ed = ((ic = ed || {}).executeRoute = "Router.executeRoute", ic), ep = ((iu = ep || {}).runHandler = "Node.runHandler", iu), ef = ((id = ef || {}).runHandler = "AppRouteRouteHandlers.runHandler", id), eh = ((ip = eh || {}).generateMetadata = "ResolveMetadata.generateMetadata", ip.generateViewport = "ResolveMetadata.generateViewport", ip), eg = ((ih = eg || {}).execute = "Middleware.execute", ih);
      let em = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eb = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function ey(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let ew = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: e_, propagation: ev, trace: ex, SpanStatusCode: eE, SpanKind: eS, ROOT_CONTEXT: ek } = t = e.r(59110);
      class eA extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eP = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eA && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eE.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eT = /* @__PURE__ */ new Map(), eR = t.createContextKey("next.rootSpanId"), eC = 0, eO = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, eI = (o = new class e {
        getTracerInstance() {
          return ex.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return e_;
        }
        getTracePropagationData() {
          let e10 = e_.active(), t10 = [];
          return ev.inject(e10, t10, eO), t10;
        }
        getActiveScopeSpan() {
          return ex.getSpan(null == e_ ? void 0 : e_.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let n10 = e_.active();
          if (ex.getSpanContext(n10)) return t10();
          let i10 = ev.extract(n10, e10, r10);
          return e_.with(i10, t10);
        }
        trace(...e10) {
          let [t10, r10, n10] = e10, { fn: i10, options: a10 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n10, options: { ...r10 } }, o10 = a10.spanName ?? t10;
          if (!em.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return i10();
          let s10 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan());
          s10 || (s10 = (null == e_ ? void 0 : e_.active()) ?? ek);
          let l2 = s10.getValue(eR), c2 = "number" != typeof l2 || !eT.has(l2), u2 = eC++;
          return a10.attributes = { "next.span_name": o10, "next.span_type": t10, ...a10.attributes }, e_.with(s10.setValue(eR, u2), () => this.getTracerInstance().startActiveSpan(o10, a10, (e11) => {
            let r11;
            ew && t10 && eb.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n11 = false, o11 = () => {
              !n11 && (n11 = true, eT.delete(u2), r11 && performance.measure(`${ew}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (c2 && eT.set(u2, new Map(Object.entries(a10.attributes ?? {}))), i10.length > 1) try {
              return i10(e11, (t11) => eP(e11, t11));
            } catch (t11) {
              throw eP(e11, t11), t11;
            } finally {
              o11();
            }
            try {
              let t11 = i10(e11);
              if (ey(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw eP(e11, t12), t12;
              }).finally(o11);
              return e11.end(), o11(), t11;
            } catch (t11) {
              throw eP(e11, t11), o11(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, i10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return em.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof i10 && (e11 = e11.apply(this, arguments));
            let a10 = arguments.length - 1, o10 = arguments[a10];
            if ("function" != typeof o10) return t10.trace(r10, e11, () => i10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(e_.active(), o10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i10.apply(this, arguments)));
            }
          } : i10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? ex.setSpan(e_.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = e_.active().getValue(eR);
          return eT.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = e_.active().getValue(eR), n10 = eT.get(r10);
          n10 && !n10.has(e10) && n10.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = ex.setSpan(e_.active(), e10);
          return e_.with(r10, t10);
        }
      }(), () => o), eN = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eN);
      class e$ {
        constructor(e10, t10, r10, n10) {
          var i10;
          const a10 = e10 && function(e11, t11) {
            let r11 = X.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, o10 = null == (i10 = r10.get(eN)) ? void 0 : i10.value;
          this._isEnabled = !!(!a10 && o10 && e10 && o10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eN, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eN, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function eD(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of _(r10)) n10.append("set-cookie", e11);
          for (let e11 of new L.ResponseCookies(n10).getAll()) t10.set(e11);
        }
      }
      var eU = e.i(53835), ej = e.i(9939), ej = ej, eM = e.i(99734), eL = e.i(25753), Q = Q, eH = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eq = Symbol.for("@next/cache-handlers-map"), eV = Symbol.for("@next/cache-handlers-set"), eF = globalThis;
      function eW() {
        if (eF[eq]) return eF[eq].entries();
      }
      async function eB(e10, t10) {
        if (!e10) return t10();
        let r10 = eK(e10);
        try {
          return await t10();
        } finally {
          var n10, i10;
          let t11, a10, o10 = (n10 = r10, i10 = eK(e10), t11 = new Set(n10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), a10 = new Set(n10.pendingRevalidateWrites), { pendingRevalidatedTags: i10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(i10.pendingRevalidates).filter(([e11]) => !(e11 in n10.pendingRevalidates))), pendingRevalidateWrites: i10.pendingRevalidateWrites.filter((e11) => !a10.has(e11)) });
          await ez(e10, o10);
        }
      }
      function eK(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function eJ(e10, t10, r10) {
        if (0 === e10.length) return;
        let n10 = function() {
          if (eF[eV]) return eF[eV].values();
        }(), i10 = [], a10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of a10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n11 = e11 || r11;
          a10.has(n11) || a10.set(n11, []), a10.get(n11).push(t11.tag);
        }
        for (let [e11, s10] of a10) {
          let a11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var o10;
              if (!(t11 = null == r10 || null == (o10 = r10.cacheLifeProfiles) ? void 0 : o10[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (a11 = { expire: t11.expire });
          }
          for (let t11 of n10 || []) e11 ? i10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s10, a11)) : i10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s10));
          t10 && i10.push(t10.revalidateTag(s10, a11));
        }
        await Promise.all(i10);
      }
      async function ez(e10, t10) {
        let r10 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], n10 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, i10 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([eJ(r10, e10.incrementalCache, e10), ...Object.values(n10), ...i10]);
      }
      var eG = e.i(90044), ej = ej;
      let eX = (0, eG.createAsyncLocalStorage)();
      class eQ {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new eM.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (ey(e10)) this.waitUntil || eY(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || eY();
          let t10 = ej.workUnitAsyncStorageInstance.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = eX.getStore(), n10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (0, eG.bindSnapshot)(async () => {
            try {
              await eX.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = Q.workAsyncStorageInstance.getStore();
          if (!e10) throw Object.defineProperty(new eL.InvariantError("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eB(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eL.InvariantError("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function eY() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function eZ(e10) {
        let t10, r10 = { then: (n10, i10) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n10, i10)) };
        return r10;
      }
      var Q = Q;
      class e0 {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function e1() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let e2 = Symbol.for("@next/request-context");
      async function e5(e10, t10, r10) {
        let n10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let n11 = r11.slice(0, e12).join("/");
              n11 && (n11.endsWith("/page") || n11.endsWith("/route") || (n11 = `${n11}${!n11.endsWith("/") ? "/" : ""}layout`), t12.push(n11));
            }
          }
          return t12;
        })(e10)) t11 = `${y}${t11}`, n10.add(t11);
        if (t10.pathname && (!r10 || 0 === r10.size)) {
          let e11 = `${y}${t10.pathname}`;
          n10.add(e11);
        }
        n10.has(`${y}/`) && n10.add(`${y}/index`), n10.has(`${y}/index`) && n10.add(`${y}/`);
        let i10 = Array.from(n10);
        return { tags: i10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = eW();
          if (r11) for (let [n11, i11] of r11) "getExpiration" in i11 && t11.set(n11, eZ(async () => i11.getExpiration(e11)));
          return t11;
        }(i10) };
      }
      class e6 extends q {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new g({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new g({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new g({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let e3 = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, e8 = (e10, t10) => eI().withPropagatedContext(e10.headers, t10, e3), e4 = false;
      async function e9(t10) {
        var r10, n10, i10, a10;
        let o10, s10, l2, c2, u2;
        !function() {
          if (!e4 && (e4 = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), e8 = r11(e8);
          }
        }(), await f();
        let d2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new M(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p2.searchParams.keys()]) {
          let t11 = p2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (p2.searchParams.delete(r11), t11)) p2.searchParams.append(r11, e11);
            p2.searchParams.delete(e10);
          }
        }
        let h2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (h2 = p2.buildId || "", p2.buildId = "");
        let g2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, n11] of Object.entries(e10)) for (let e11 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), m2 = g2.has("x-nextjs-data"), b2 = "1" === g2.get(z.RSC_HEADER);
        m2 && "/index" === p2.pathname && (p2.pathname = "/");
        let y2 = /* @__PURE__ */ new Map();
        if (!d2) for (let e10 of z.FLIGHT_HEADERS) {
          let t11 = g2.get(e10);
          null !== t11 && (y2.set(e10, t11), g2.delete(e10));
        }
        let w2 = p2.searchParams.get(z.NEXT_RSC_UNION_QUERY), _2 = new e6({ page: t10.page, input: ((c2 = (l2 = "string" == typeof p2) ? new URL(p2) : p2).searchParams.delete(z.NEXT_RSC_UNION_QUERY), l2 ? c2.toString() : c2).toString(), init: { body: t10.request.body, headers: g2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        m2 && Object.defineProperty(_2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: e1() }) }));
        let v2 = t10.request.waitUntil ?? (null == (r10 = null == (u2 = globalThis[e2]) ? void 0 : u2.get()) ? void 0 : r10.waitUntil), x2 = new P({ request: _2, page: t10.page, context: v2 ? { waitUntil: v2 } : void 0 });
        if ((o10 = await e8(_2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = x2.waitUntil.bind(x2), r11 = new e0();
            return eI().trace(eg.execute, { spanName: `middleware ${_2.method}`, attributes: { "http.target": _2.nextUrl.pathname, "http.method": _2.method } }, async () => {
              try {
                var n11, i11, a11, o11, l3, c3;
                let u3 = e1(), d3 = await e5("/", _2.nextUrl, null), p3 = (l3 = _2.nextUrl, c3 = (e11) => {
                  s10 = e11;
                }, function(e11, t11, r12, n12, i12, a12, o12, s11, l4, c4, u4, d4) {
                  function p4(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let f3 = {};
                  return { type: "request", phase: e11, implicitTags: a12, url: { pathname: n12.pathname, search: n12.search ?? "" }, rootParams: i12, get headers() {
                    return f3.headers || (f3.headers = function(e12) {
                      let t12 = X.from(e12);
                      for (let e13 of z.FLIGHT_HEADERS) t12.delete(e13);
                      return X.seal(t12);
                    }(t11.headers)), f3.headers;
                  }, get cookies() {
                    if (!f3.cookies) {
                      let e12 = new L.RequestCookies(X.from(t11.headers));
                      eD(t11, e12), f3.cookies = Z.seal(e12);
                    }
                    return f3.cookies;
                  }, set cookies(value) {
                    f3.cookies = value;
                  }, get mutableCookies() {
                    if (!f3.mutableCookies) {
                      var h3, g3;
                      let e12, n13 = (h3 = t11.headers, g3 = o12 || (r12 ? p4 : void 0), e12 = new L.RequestCookies(X.from(h3)), et.wrap(e12, g3));
                      eD(t11, n13), f3.mutableCookies = n13;
                    }
                    return f3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!f3.userspaceMutableCookies) {
                      var m3;
                      let e12;
                      m3 = this, f3.userspaceMutableCookies = e12 = new Proxy(m3.mutableCookies, { get(t12, r13, n13) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return en(m3, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return en(m3, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return V.get(t12, r13, n13);
                        }
                      } });
                    }
                    return f3.userspaceMutableCookies;
                  }, get draftMode() {
                    return f3.draftMode || (f3.draftMode = new e$(l4, t11, this.cookies, this.mutableCookies)), f3.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: c4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", _2, void 0, l3, {}, d3, c3, null, u3, false, void 0, null)), f2 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n12, previouslyRevalidatedTags: i12, nonce: a12 }) {
                  var o12;
                  let s11 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l4 = t11.dev ?? false, c4 = l4 || s11 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), u4 = { isStaticGeneration: s11, page: e11, route: (o12 = e11.split("/").reduce((e12, t12, r13, n13) => t12 ? "(" === t12[0] && t12.endsWith(")") || "@" === t12[0] || ("page" === t12 || "route" === t12) && r13 === n13.length - 1 ? e12 : `${e12}/${t12}` : e12, "")).startsWith("/") ? o12 : `/${o12}`, incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.nextExport, hasReadableErrorStacks: t11.hasReadableErrorStacks, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: a12, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: n13 } = e12;
                    return new eQ({ waitUntil: t12, onClose: r13, onTaskError: n13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, dev: l4, previouslyRevalidatedTags: i12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = eW();
                    if (t12) for (let [r13, n13] of t12) "refreshTags" in n13 && e12.set(r13, eZ(async () => n13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: (0, eG.createSnapshot)(), shouldTrackFetchMetrics: c4, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = u4, u4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (i11 = t10.request.nextConfig) || null == (n11 = i11.experimental) ? void 0 : n11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (o11 = t10.request.nextConfig) || null == (a11 = o11.experimental) ? void 0 : a11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === _2.headers.get(z.NEXT_ROUTER_PREFETCH_HEADER), buildId: h2 ?? "", previouslyRevalidatedTags: [] });
                return await Q.workAsyncStorageInstance.run(f2, () => ej.workUnitAsyncStorageInstance.run(p3, t10.handler, _2, x2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(_2, x2);
        })) && !(o10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        o10 && s10 && o10.headers.set("set-cookie", s10);
        let E2 = null == o10 ? void 0 : o10.headers.get("x-middleware-rewrite");
        if (o10 && E2 && (b2 || !d2)) {
          let e10 = new M(E2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          d2 || e10.host !== _2.nextUrl.host || (e10.buildId = h2 || e10.buildId, o10.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: s11 } = J(e10.toString(), p2.toString());
          !d2 && m2 && o10.headers.set("x-nextjs-rewrite", r11);
          let l3 = !s11 && (null == (a10 = t10.request.nextConfig) || null == (i10 = a10.experimental) || null == (n10 = i10.clientParamParsingOrigins) ? void 0 : n10.some((t11) => new RegExp(t11).test(e10.origin)));
          b2 && (s11 || l3) && (p2.pathname !== e10.pathname && o10.headers.set(z.NEXT_REWRITTEN_PATH_HEADER, e10.pathname), p2.search !== e10.search && o10.headers.set(z.NEXT_REWRITTEN_QUERY_HEADER, e10.search.slice(1)));
        }
        if (o10 && E2 && b2 && w2) {
          let e10 = new URL(E2);
          e10.searchParams.has(z.NEXT_RSC_UNION_QUERY) || (e10.searchParams.set(z.NEXT_RSC_UNION_QUERY, w2), o10.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let S2 = null == o10 ? void 0 : o10.headers.get("Location");
        if (o10 && S2 && !d2) {
          let e10 = new M(S2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          o10 = new Response(o10.body, o10), e10.host === p2.host && (e10.buildId = h2 || e10.buildId, o10.headers.set("Location", J(e10, p2).url)), m2 && (o10.headers.delete("Location"), o10.headers.set("x-nextjs-redirect", J(e10.toString(), p2.toString()).url));
        }
        let A2 = o10 || K.next(), T2 = A2.headers.get("x-middleware-override-headers"), R2 = [];
        if (T2) {
          for (let [e10, t11] of y2) A2.headers.set(`x-middleware-request-${e10}`, t11), R2.push(e10);
          R2.length > 0 && A2.headers.set("x-middleware-override-headers", T2 + "," + R2.join(","));
        }
        return { response: A2, waitUntil: ("internal" === x2[k].kind ? Promise.all(x2[k].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: _2.fetchMetrics };
      }
      var e7 = function(e10, t10, r10, n10, i10) {
        if ("m" === n10) throw TypeError("Private method is not writable");
        if ("a" === n10 && !i10) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t10 ? e10 !== t10 || !i10 : !t10.has(e10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === n10 ? i10.call(e10, r10) : i10 ? i10.value = r10 : t10.set(e10, r10), r10;
      }, te = function(e10, t10, r10, n10) {
        if ("a" === r10 && !n10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n10 : "a" === r10 ? n10.call(e10) : n10 ? n10.value : t10.get(e10);
      };
      function tt(e10) {
        let t10 = e10 ? "__Secure-" : "";
        return { sessionToken: { name: `${t10}authjs.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, callbackUrl: { name: `${t10}authjs.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, csrfToken: { name: `${e10 ? "__Host-" : ""}authjs.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, pkceCodeVerifier: { name: `${t10}authjs.pkce.code_verifier`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, state: { name: `${t10}authjs.state`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, nonce: { name: `${t10}authjs.nonce`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, webauthnChallenge: { name: `${t10}authjs.challenge`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } } };
      }
      class tr {
        constructor(e10, t10, r10) {
          if (ig.add(this), im.set(this, {}), ib.set(this, void 0), iy.set(this, void 0), e7(this, iy, r10, "f"), e7(this, ib, e10, "f"), !t10) return;
          const { name: n10 } = e10;
          for (const [e11, r11] of Object.entries(t10)) e11.startsWith(n10) && r11 && (te(this, im, "f")[e11] = r11);
        }
        get value() {
          return Object.keys(te(this, im, "f")).sort((e10, t10) => parseInt(e10.split(".").pop() || "0") - parseInt(t10.split(".").pop() || "0")).map((e10) => te(this, im, "f")[e10]).join("");
        }
        chunk(e10, t10) {
          let r10 = te(this, ig, "m", i_).call(this);
          for (let n10 of te(this, ig, "m", iw).call(this, { name: te(this, ib, "f").name, value: e10, options: { ...te(this, ib, "f").options, ...t10 } })) r10[n10.name] = n10;
          return Object.values(r10);
        }
        clean() {
          return Object.values(te(this, ig, "m", i_).call(this));
        }
      }
      im = /* @__PURE__ */ new WeakMap(), ib = /* @__PURE__ */ new WeakMap(), iy = /* @__PURE__ */ new WeakMap(), ig = /* @__PURE__ */ new WeakSet(), iw = function(e10) {
        let t10 = Math.ceil(e10.value.length / 3936);
        if (1 === t10) return te(this, im, "f")[e10.name] = e10.value, [e10];
        let r10 = [];
        for (let n10 = 0; n10 < t10; n10++) {
          let t11 = `${e10.name}.${n10}`, i10 = e10.value.substr(3936 * n10, 3936);
          r10.push({ ...e10, name: t11, value: i10 }), te(this, im, "f")[t11] = i10;
        }
        return te(this, iy, "f").debug("CHUNKING_SESSION_COOKIE", { message: "Session cookie exceeds allowed 4096 bytes.", emptyCookieSize: 160, valueSize: e10.value.length, chunks: r10.map((e11) => e11.value.length + 160) }), r10;
      }, i_ = function() {
        let e10 = {};
        for (let t10 in te(this, im, "f")) delete te(this, im, "f")?.[t10], e10[t10] = { name: t10, value: "", options: { ...te(this, ib, "f").options, maxAge: 0 } };
        return e10;
      };
      class tn extends Error {
        constructor(e10, t10) {
          e10 instanceof Error ? super(void 0, { cause: { err: e10, ...e10.cause, ...t10 } }) : "string" == typeof e10 ? (t10 instanceof Error && (t10 = { err: t10, ...t10.cause }), super(e10, t10)) : super(void 0, e10), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
          const r10 = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
          this.message += `${this.message ? ". " : ""}Read more at ${r10}`;
        }
      }
      class ti extends tn {
      }
      ti.kind = "signIn";
      class ta extends tn {
      }
      ta.type = "AdapterError";
      class to extends tn {
      }
      to.type = "AccessDenied";
      class ts extends tn {
      }
      ts.type = "CallbackRouteError";
      class tl extends tn {
      }
      tl.type = "ErrorPageLoop";
      class tc extends tn {
      }
      tc.type = "EventError";
      class tu extends tn {
      }
      tu.type = "InvalidCallbackUrl";
      class td extends ti {
        constructor() {
          super(...arguments), this.code = "credentials";
        }
      }
      td.type = "CredentialsSignin";
      class tp extends tn {
      }
      tp.type = "InvalidEndpoints";
      class tf extends tn {
      }
      tf.type = "InvalidCheck";
      class th extends tn {
      }
      th.type = "JWTSessionError";
      class tg extends tn {
      }
      tg.type = "MissingAdapter";
      class tm extends tn {
      }
      tm.type = "MissingAdapterMethods";
      class tb extends tn {
      }
      tb.type = "MissingAuthorize";
      class ty extends tn {
      }
      ty.type = "MissingSecret";
      class tw extends ti {
      }
      tw.type = "OAuthAccountNotLinked";
      class t_ extends ti {
      }
      t_.type = "OAuthCallbackError";
      class tv extends tn {
      }
      tv.type = "OAuthProfileParseError";
      class tx extends tn {
      }
      tx.type = "SessionTokenError";
      class tE extends tn {
      }
      tE.type = "SignOutError";
      class tS extends tn {
      }
      tS.type = "UnknownAction";
      class tk extends tn {
      }
      tk.type = "UnsupportedStrategy";
      class tA extends tn {
      }
      tA.type = "InvalidProvider";
      class tP extends tn {
      }
      tP.type = "UntrustedHost";
      class tT extends tn {
      }
      tT.type = "Verification";
      class tR extends ti {
      }
      tR.type = "MissingCSRF";
      let tC = /* @__PURE__ */ new Set(["CredentialsSignin", "OAuthAccountNotLinked", "OAuthCallbackError", "AccessDenied", "Verification", "MissingCSRF", "AccountNotLinked", "WebAuthnVerificationError"]);
      class tO extends tn {
      }
      tO.type = "DuplicateConditionalUI";
      class tI extends tn {
      }
      tI.type = "MissingWebAuthnAutocomplete";
      class tN extends tn {
      }
      tN.type = "WebAuthnVerificationError";
      class t$ extends ti {
      }
      t$.type = "AccountNotLinked";
      class tD extends tn {
      }
      tD.type = "ExperimentalFeatureNotEnabled";
      let tU = false;
      function tj(e10, t10) {
        try {
          return /^https?:/.test(new URL(e10, e10.startsWith("/") ? t10 : void 0).protocol);
        } catch {
          return false;
        }
      }
      let tM = false, tL = false, tH = false, tq = ["createVerificationToken", "useVerificationToken", "getUserByEmail"], tV = ["createUser", "getUser", "getUserByEmail", "getUserByAccount", "updateUser", "linkAccount", "createSession", "getSessionAndUser", "updateSession", "deleteSession"], tF = ["createUser", "getUser", "linkAccount", "getAccount", "getAuthenticator", "createAuthenticator", "listAuthenticatorsByUserId", "updateAuthenticatorCounter"], tW = async (e10, t10, r10, n10, i10) => {
        let { crypto: { subtle: a10 } } = (() => {
          if ("u" > typeof globalThis) return globalThis;
          if ("u" > typeof self) return self;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await a10.deriveBits({ name: "HKDF", hash: `SHA-${e10.substr(3)}`, salt: r10, info: n10 }, await a10.importKey("raw", t10, "HKDF", false, ["deriveBits"]), i10 << 3));
      };
      function tB(e10, t10) {
        if ("string" == typeof e10) return new TextEncoder().encode(e10);
        if (!(e10 instanceof Uint8Array)) throw TypeError(`"${t10}"" must be an instance of Uint8Array or a string`);
        return e10;
      }
      async function tK(e10, t10, r10, n10, i10) {
        return tW(function(e11) {
          switch (e11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e10), function(e11) {
          let t11 = tB(e11, "ikm");
          if (!t11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t11;
        }(t10), tB(r10, "salt"), function(e11) {
          let t11 = tB(e11, "info");
          if (t11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t11;
        }(n10), function(e11, t11) {
          if ("number" != typeof e11 || !Number.isInteger(e11) || e11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e11 > 255 * (parseInt(t11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e11;
        }(i10, e10));
      }
      let tJ = new TextEncoder(), tz = new TextDecoder();
      function tG(...e10) {
        let t10 = new Uint8Array(e10.reduce((e11, { length: t11 }) => e11 + t11, 0)), r10 = 0;
        for (let n10 of e10) t10.set(n10, r10), r10 += n10.length;
        return t10;
      }
      function tX(e10, t10, r10) {
        if (t10 < 0 || t10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t10}`);
        e10.set([t10 >>> 24, t10 >>> 16, t10 >>> 8, 255 & t10], r10);
      }
      function tQ(e10) {
        let t10 = Math.floor(e10 / 4294967296), r10 = new Uint8Array(8);
        return tX(r10, t10, 0), tX(r10, e10 % 4294967296, 4), r10;
      }
      function tY(e10) {
        let t10 = new Uint8Array(4);
        return tX(t10, e10), t10;
      }
      function tZ(e10) {
        let t10 = new Uint8Array(e10.length);
        for (let r10 = 0; r10 < e10.length; r10++) {
          let n10 = e10.charCodeAt(r10);
          if (n10 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t10[r10] = n10;
        }
        return t10;
      }
      function t0(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e10 ? e10 : tz.decode(e10), { alphabet: "base64url" });
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = tz.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/");
        try {
          var r10 = t10;
          if (Uint8Array.fromBase64) return Uint8Array.fromBase64(r10);
          let e11 = atob(r10), n10 = new Uint8Array(e11.length);
          for (let t11 = 0; t11 < e11.length; t11++) n10[t11] = e11.charCodeAt(t11);
          return n10;
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      function t1(e10) {
        let t10 = e10;
        return ("string" == typeof t10 && (t10 = tJ.encode(t10)), Uint8Array.prototype.toBase64) ? t10.toBase64({ alphabet: "base64url", omitPadding: true }) : function(e11) {
          if (Uint8Array.prototype.toBase64) return e11.toBase64();
          let t11 = [];
          for (let r10 = 0; r10 < e11.length; r10 += 32768) t11.push(String.fromCharCode.apply(null, e11.subarray(r10, r10 + 32768)));
          return btoa(t11.join(""));
        }(t10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      e.s(["decode", () => t0, "encode", () => t1], 22423);
      let t2 = Symbol();
      function t5(e10, t10) {
        if (e10) throw TypeError(`${t10} can only be called once`);
      }
      function t6(e10, t10, r10) {
        try {
          return t0(e10);
        } catch {
          throw new r10(`Failed to base64url decode the ${t10}`);
        }
      }
      async function t3(e10, t10) {
        let r10 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await crypto.subtle.digest(r10, t10));
      }
      let t8 = (e10, t10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      function t4(e10, t10, r10) {
        switch (t10) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if ("AES-GCM" !== e10.algorithm.name) throw t8("AES-GCM");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw t8(r11, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if ("AES-KW" !== e10.algorithm.name) throw t8("AES-KW");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw t8(r11, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
                break;
              default:
                throw t8("ECDH or X25519");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if ("PBKDF2" !== e10.algorithm.name) throw t8("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if ("RSA-OAEP" !== e10.algorithm.name) throw t8("RSA-OAEP");
            var n10 = e10.algorithm, i10 = parseInt(t10.slice(9), 10) || 1;
            if (parseInt(n10.hash.name.slice(4), 10) !== i10) throw t8(`SHA-${i10}`, "algorithm.hash");
            break;
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        if (r10 && !e10.usages.includes(r10)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${r10}.`);
      }
      function t9(e10, t10, ...r10) {
        if ((r10 = r10.filter(Boolean)).length > 2) {
          let t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let t7 = (e10, ...t10) => t9("Key must be ", e10, ...t10), re = (e10, t10, ...r10) => t9(`Key for the ${e10} algorithm must be `, t10, ...r10);
      class rt extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class rr extends rt {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      class rn extends rt {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      class ri extends rt {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class ra extends rt {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class ro extends rt {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(e10 = "decryption operation failed", t10) {
          super(e10, t10);
        }
      }
      class rs extends rt {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class rl extends rt {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class rc extends rt {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class ru extends rt {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      function rd(e10) {
        if (!rp(e10)) throw Error("CryptoKey instance expected");
      }
      let rp = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, rf = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", rh = (e10) => rp(e10) || rf(e10);
      function rg(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new ra(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let rm = (e10) => crypto.getRandomValues(new Uint8Array(rg(e10) >> 3));
      function rb(e10, t10) {
        let r10 = e10.byteLength << 3;
        if (r10 !== t10) throw new rs(`Invalid Content Encryption Key length. Expected ${t10} bits, got ${r10} bits`);
      }
      function ry(e10) {
        switch (e10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new ra(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      function rw(e10, t10) {
        if (t10.length << 3 !== ry(e10)) throw new rs("Invalid Initialization Vector length");
      }
      async function r_(e10, t10, r10) {
        if (!(t10 instanceof Uint8Array)) throw TypeError(t7(t10, "Uint8Array"));
        let n10 = parseInt(e10.slice(1, 4), 10);
        return { encKey: await crypto.subtle.importKey("raw", t10.subarray(n10 >> 3), "AES-CBC", false, [r10]), macKey: await crypto.subtle.importKey("raw", t10.subarray(0, n10 >> 3), { hash: `SHA-${n10 << 1}`, name: "HMAC" }, false, ["sign"]), keySize: n10 };
      }
      async function rv(e10, t10, r10) {
        return new Uint8Array((await crypto.subtle.sign("HMAC", e10, t10)).slice(0, r10 >> 3));
      }
      async function rx(e10, t10, r10, n10, i10) {
        let { encKey: a10, macKey: o10, keySize: s10 } = await r_(e10, r10, "encrypt"), l2 = new Uint8Array(await crypto.subtle.encrypt({ iv: n10, name: "AES-CBC" }, a10, t10)), c2 = tG(i10, n10, l2, tQ(i10.length << 3));
        return { ciphertext: l2, tag: await rv(o10, c2, s10), iv: n10 };
      }
      async function rE(e10, t10) {
        if (!(e10 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
        if (!(t10 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
        let r10 = { name: "HMAC", hash: "SHA-256" }, n10 = await crypto.subtle.generateKey(r10, false, ["sign"]), i10 = new Uint8Array(await crypto.subtle.sign(r10, n10, e10)), a10 = new Uint8Array(await crypto.subtle.sign(r10, n10, t10)), o10 = 0, s10 = -1;
        for (; ++s10 < 32; ) o10 |= i10[s10] ^ a10[s10];
        return 0 === o10;
      }
      async function rS(e10, t10, r10, n10, i10, a10) {
        let o10, s10, { encKey: l2, macKey: c2, keySize: u2 } = await r_(e10, t10, "decrypt"), d2 = tG(a10, n10, r10, tQ(a10.length << 3)), p2 = await rv(c2, d2, u2);
        try {
          o10 = await rE(i10, p2);
        } catch {
        }
        if (!o10) throw new ro();
        try {
          s10 = new Uint8Array(await crypto.subtle.decrypt({ iv: n10, name: "AES-CBC" }, l2, r10));
        } catch {
        }
        if (!s10) throw new ro();
        return s10;
      }
      async function rk(e10, t10, r10, n10, i10) {
        let a10;
        r10 instanceof Uint8Array ? a10 = await crypto.subtle.importKey("raw", r10, "AES-GCM", false, ["encrypt"]) : (t4(r10, e10, "encrypt"), a10 = r10);
        let o10 = new Uint8Array(await crypto.subtle.encrypt({ additionalData: i10, iv: n10, name: "AES-GCM", tagLength: 128 }, a10, t10)), s10 = o10.slice(-16);
        return { ciphertext: o10.slice(0, -16), tag: s10, iv: n10 };
      }
      async function rA(e10, t10, r10, n10, i10, a10) {
        let o10;
        t10 instanceof Uint8Array ? o10 = await crypto.subtle.importKey("raw", t10, "AES-GCM", false, ["decrypt"]) : (t4(t10, e10, "decrypt"), o10 = t10);
        try {
          return new Uint8Array(await crypto.subtle.decrypt({ additionalData: a10, iv: n10, name: "AES-GCM", tagLength: 128 }, o10, tG(r10, i10)));
        } catch {
          throw new ro();
        }
      }
      let rP = "Unsupported JWE Content Encryption Algorithm";
      async function rT(e10, t10, r10, n10, i10) {
        if (!rp(r10) && !(r10 instanceof Uint8Array)) throw TypeError(t7(r10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (n10) rw(e10, n10);
        else n10 = crypto.getRandomValues(new Uint8Array(ry(e10) >> 3));
        switch (e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return r10 instanceof Uint8Array && rb(r10, parseInt(e10.slice(-3), 10)), rx(e10, t10, r10, n10, i10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return r10 instanceof Uint8Array && rb(r10, parseInt(e10.slice(1, 4), 10)), rk(e10, t10, r10, n10, i10);
          default:
            throw new ra(rP);
        }
      }
      async function rR(e10, t10, r10, n10, i10, a10) {
        if (!rp(t10) && !(t10 instanceof Uint8Array)) throw TypeError(t7(t10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (!n10) throw new rs("JWE Initialization Vector missing");
        if (!i10) throw new rs("JWE Authentication Tag missing");
        switch (rw(e10, n10), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t10 instanceof Uint8Array && rb(t10, parseInt(e10.slice(-3), 10)), rS(e10, t10, r10, n10, i10, a10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t10 instanceof Uint8Array && rb(t10, parseInt(e10.slice(1, 4), 10)), rA(e10, t10, r10, n10, i10, a10);
          default:
            throw new ra(rP);
        }
      }
      function rC(e10, t10) {
        if (e10.algorithm.length !== parseInt(t10.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${t10}`);
      }
      function rO(e10, t10, r10) {
        return e10 instanceof Uint8Array ? crypto.subtle.importKey("raw", e10, "AES-KW", true, [r10]) : (t4(e10, t10, r10), e10);
      }
      async function rI(e10, t10, r10) {
        let n10 = await rO(t10, e10, "wrapKey");
        rC(n10, e10);
        let i10 = await crypto.subtle.importKey("raw", r10, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.wrapKey("raw", i10, n10, "AES-KW"));
      }
      async function rN(e10, t10, r10) {
        let n10 = await rO(t10, e10, "unwrapKey");
        rC(n10, e10);
        let i10 = await crypto.subtle.unwrapKey("raw", r10, n10, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.exportKey("raw", i10));
      }
      function r$(e10) {
        return tG(tY(e10.length), e10);
      }
      async function rD(e10, t10, r10) {
        let n10 = t10 >> 3, i10 = Math.ceil(n10 / 32), a10 = new Uint8Array(32 * i10);
        for (let t11 = 1; t11 <= i10; t11++) {
          let n11 = new Uint8Array(4 + e10.length + r10.length);
          n11.set(tY(t11), 0), n11.set(e10, 4), n11.set(r10, 4 + e10.length);
          let i11 = await t3("sha256", n11);
          a10.set(i11, (t11 - 1) * 32);
        }
        return a10.slice(0, n10);
      }
      async function rU(e10, t10, r10, n10, i10 = new Uint8Array(), a10 = new Uint8Array()) {
        var o10;
        t4(e10, "ECDH"), t4(t10, "ECDH", "deriveBits");
        let s10 = tG(r$(tZ(r10)), r$(i10), r$(a10), tY(n10), new Uint8Array());
        return rD(new Uint8Array(await crypto.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t10, "X25519" === (o10 = e10).algorithm.name ? 256 : Math.ceil(parseInt(o10.algorithm.namedCurve.slice(-3), 10) / 8) << 3)), n10, s10);
      }
      function rj(e10) {
        switch (e10.algorithm.namedCurve) {
          case "P-256":
          case "P-384":
          case "P-521":
            return true;
          default:
            return "X25519" === e10.algorithm.name;
        }
      }
      async function rM(e10, t10, r10, n10) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new rs("PBES2 Salt Input must be 8 or more octets");
        let i10 = tG(tZ(t10), Uint8Array.of(0), e10), a10 = parseInt(t10.slice(13, 16), 10), o10 = { hash: `SHA-${t10.slice(8, 11)}`, iterations: r10, name: "PBKDF2", salt: i10 }, s10 = await (n10 instanceof Uint8Array ? crypto.subtle.importKey("raw", n10, "PBKDF2", false, ["deriveBits"]) : (t4(n10, t10, "deriveBits"), n10));
        return new Uint8Array(await crypto.subtle.deriveBits(o10, s10, a10));
      }
      async function rL(e10, t10, r10, n10 = 2048, i10 = crypto.getRandomValues(new Uint8Array(16))) {
        let a10 = await rM(i10, e10, n10, t10);
        return { encryptedKey: await rI(e10.slice(-6), a10, r10), p2c: n10, p2s: t1(i10) };
      }
      async function rH(e10, t10, r10, n10, i10) {
        let a10 = await rM(i10, e10, n10, t10);
        return rN(e10.slice(-6), a10, r10);
      }
      function rq(e10, t10) {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          let { modulusLength: r10 } = t10.algorithm;
          if ("number" != typeof r10 || r10 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      }
      let rV = (e10) => {
        switch (e10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new ra(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      };
      async function rF(e10, t10, r10) {
        return t4(t10, e10, "encrypt"), rq(e10, t10), new Uint8Array(await crypto.subtle.encrypt(rV(e10), t10, r10));
      }
      async function rW(e10, t10, r10) {
        return t4(t10, e10, "decrypt"), rq(e10, t10), new Uint8Array(await crypto.subtle.decrypt(rV(e10), t10, r10));
      }
      function rB(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        for (; null !== Object.getPrototypeOf(t10); ) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      function rK(...e10) {
        let t10, r10 = e10.filter(Boolean);
        if (0 === r10.length || 1 === r10.length) return true;
        for (let e11 of r10) {
          let r11 = Object.keys(e11);
          if (!t10 || 0 === t10.size) {
            t10 = new Set(r11);
            continue;
          }
          for (let e12 of r11) {
            if (t10.has(e12)) return false;
            t10.add(e12);
          }
        }
        return true;
      }
      let rJ = (e10) => rB(e10) && "string" == typeof e10.kty, rz = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
      async function rG(e10) {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t10, keyUsages: r10 } = function(e11) {
          let t11, r11;
          switch (e11.kty) {
            case "AKP":
              switch (e11.alg) {
                case "ML-DSA-44":
                case "ML-DSA-65":
                case "ML-DSA-87":
                  t11 = { name: e11.alg }, r11 = e11.priv ? ["sign"] : ["verify"];
                  break;
                default:
                  throw new ra(rz);
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r11 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new ra(rz);
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                case "ES384":
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[e11.alg] }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new ra(rz);
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                case "EdDSA":
                  t11 = { name: "Ed25519" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new ra(rz);
              }
              break;
            default:
              throw new ra('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r11 };
        }(e10), n10 = { ...e10 };
        return "AKP" !== n10.kty && delete n10.alg, delete n10.use, crypto.subtle.importKey("jwk", n10, t10, e10.ext ?? (!e10.d && !e10.priv), e10.key_ops ?? r10);
      }
      let rX = "given KeyObject instance cannot be used for this algorithm", rQ = async (e10, t10, n10, i10 = false) => {
        let a10 = (r ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (a10?.[n10]) return a10[n10];
        let o10 = await rG({ ...t10, alg: n10 });
        return i10 && Object.freeze(e10), a10 ? a10[n10] = o10 : r.set(e10, { [n10]: o10 }), o10;
      };
      async function rY(e10, t10) {
        if (e10 instanceof Uint8Array || rp(e10)) return e10;
        if (rf(e10)) {
          if ("secret" === e10.type) return e10.export();
          if ("toCryptoKey" in e10 && "function" == typeof e10.toCryptoKey) try {
            return ((e11, t11) => {
              let n11, i10 = (r ||= /* @__PURE__ */ new WeakMap()).get(e11);
              if (i10?.[t11]) return i10[t11];
              let a10 = "public" === e11.type, o10 = !!a10;
              if ("x25519" === e11.asymmetricKeyType) {
                switch (t11) {
                  case "ECDH-ES":
                  case "ECDH-ES+A128KW":
                  case "ECDH-ES+A192KW":
                  case "ECDH-ES+A256KW":
                    break;
                  default:
                    throw TypeError(rX);
                }
                n11 = e11.toCryptoKey(e11.asymmetricKeyType, o10, a10 ? [] : ["deriveBits"]);
              }
              if ("ed25519" === e11.asymmetricKeyType) {
                if ("EdDSA" !== t11 && "Ed25519" !== t11) throw TypeError(rX);
                n11 = e11.toCryptoKey(e11.asymmetricKeyType, o10, [a10 ? "verify" : "sign"]);
              }
              switch (e11.asymmetricKeyType) {
                case "ml-dsa-44":
                case "ml-dsa-65":
                case "ml-dsa-87":
                  if (t11 !== e11.asymmetricKeyType.toUpperCase()) throw TypeError(rX);
                  n11 = e11.toCryptoKey(e11.asymmetricKeyType, o10, [a10 ? "verify" : "sign"]);
              }
              if ("rsa" === e11.asymmetricKeyType) {
                let r10;
                switch (t11) {
                  case "RSA-OAEP":
                    r10 = "SHA-1";
                    break;
                  case "RS256":
                  case "PS256":
                  case "RSA-OAEP-256":
                    r10 = "SHA-256";
                    break;
                  case "RS384":
                  case "PS384":
                  case "RSA-OAEP-384":
                    r10 = "SHA-384";
                    break;
                  case "RS512":
                  case "PS512":
                  case "RSA-OAEP-512":
                    r10 = "SHA-512";
                    break;
                  default:
                    throw TypeError(rX);
                }
                if (t11.startsWith("RSA-OAEP")) return e11.toCryptoKey({ name: "RSA-OAEP", hash: r10 }, o10, a10 ? ["encrypt"] : ["decrypt"]);
                n11 = e11.toCryptoKey({ name: t11.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: r10 }, o10, [a10 ? "verify" : "sign"]);
              }
              if ("ec" === e11.asymmetricKeyType) {
                let r10 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(e11.asymmetricKeyDetails?.namedCurve);
                if (!r10) throw TypeError(rX);
                let i11 = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
                i11[t11] && r10 === i11[t11] && (n11 = e11.toCryptoKey({ name: "ECDSA", namedCurve: r10 }, o10, [a10 ? "verify" : "sign"])), t11.startsWith("ECDH-ES") && (n11 = e11.toCryptoKey({ name: "ECDH", namedCurve: r10 }, o10, a10 ? [] : ["deriveBits"]));
              }
              if (!n11) throw TypeError(rX);
              return i10 ? i10[t11] = n11 : r.set(e11, { [t11]: n11 }), n11;
            })(e10, t10);
          } catch (e11) {
            if (e11 instanceof TypeError) throw e11;
          }
          let n10 = e10.export({ format: "jwk" });
          return rQ(e10, n10, t10);
        }
        if (rJ(e10)) return e10.k ? t0(e10.k) : rQ(e10, e10, t10, true);
        throw Error("unreachable");
      }
      async function rZ(e10, t10, r10) {
        let n10;
        if (!rB(e10)) throw TypeError("JWK must be an object");
        switch (t10 ??= e10.alg, n10 ??= r10?.extractable ?? e10.ext, e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return t0(e10.k);
          case "RSA":
            if ("oth" in e10 && void 0 !== e10.oth) throw new ra('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            return rG({ ...e10, alg: t10, ext: n10 });
          case "AKP":
            if ("string" != typeof e10.alg || !e10.alg) throw TypeError('missing "alg" (Algorithm) Parameter value');
            if (void 0 !== t10 && t10 !== e10.alg) throw TypeError("JWK alg and alg option value mismatch");
            return rG({ ...e10, ext: n10 });
          case "EC":
          case "OKP":
            return rG({ ...e10, alg: t10, ext: n10 });
          default:
            throw new ra('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      async function r0(e10) {
        if (rf(e10)) if ("secret" !== e10.type) return e10.export({ format: "jwk" });
        else e10 = e10.export();
        if (e10 instanceof Uint8Array) return { kty: "oct", k: t1(e10) };
        if (!rp(e10)) throw TypeError(t7(e10, "CryptoKey", "KeyObject", "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t10, key_ops: r10, alg: n10, use: i10, ...a10 } = await crypto.subtle.exportKey("jwk", e10);
        return "AKP" === a10.kty && (a10.alg = n10), a10;
      }
      async function r1(e10) {
        return r0(e10);
      }
      async function r2(e10, t10, r10, n10) {
        let i10 = e10.slice(0, 7), a10 = await rT(i10, r10, t10, n10, new Uint8Array());
        return { encryptedKey: a10.ciphertext, iv: t1(a10.iv), tag: t1(a10.tag) };
      }
      async function r5(e10, t10, r10, n10, i10) {
        return rR(e10.slice(0, 7), t10, r10, n10, i10, new Uint8Array());
      }
      let r6 = 'Invalid or unsupported "alg" (JWE Algorithm) header value';
      function r3(e10) {
        if (void 0 === e10) throw new rs("JWE Encrypted Key missing");
      }
      async function r8(e10, t10, r10, n10, i10) {
        switch (e10) {
          case "dir":
            if (void 0 !== r10) throw new rs("Encountered unexpected JWE Encrypted Key");
            return t10;
          case "ECDH-ES":
            if (void 0 !== r10) throw new rs("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let i11, a10;
            if (!rB(n10.epk)) throw new rs('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (rd(t10), !rj(t10)) throw new ra("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let o10 = await rZ(n10.epk, e10);
            if (rd(o10), void 0 !== n10.apu) {
              if ("string" != typeof n10.apu) throw new rs('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              i11 = t6(n10.apu, "apu", rs);
            }
            if (void 0 !== n10.apv) {
              if ("string" != typeof n10.apv) throw new rs('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              a10 = t6(n10.apv, "apv", rs);
            }
            let s10 = await rU(o10, t10, "ECDH-ES" === e10 ? n10.enc : e10, "ECDH-ES" === e10 ? rg(n10.enc) : parseInt(e10.slice(-5, -2), 10), i11, a10);
            if ("ECDH-ES" === e10) return s10;
            return r3(r10), rN(e10.slice(-6), s10, r10);
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return r3(r10), rd(t10), rW(e10, t10, r10);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let a10;
            if (r3(r10), "number" != typeof n10.p2c) throw new rs('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let o10 = i10?.maxPBES2Count || 1e4;
            if (n10.p2c > o10) throw new rs('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof n10.p2s) throw new rs('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            return a10 = t6(n10.p2s, "p2s", rs), rH(e10, t10, r10, n10.p2c, a10);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            return r3(r10), rN(e10, t10, r10);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW":
            if (r3(r10), "string" != typeof n10.iv) throw new rs('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof n10.tag) throw new rs('JOSE Header "tag" (Authentication Tag) missing or invalid');
            return r5(e10, t10, r10, t6(n10.iv, "iv", rs), t6(n10.tag, "tag", rs));
          default:
            throw new ra(r6);
        }
      }
      async function r4(e10, t10, r10, n10, i10 = {}) {
        let a10, o10, s10;
        switch (e10) {
          case "dir":
            s10 = r10;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let l2;
            if (rd(r10), !rj(r10)) throw new ra("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let { apu: c2, apv: u2 } = i10;
            l2 = i10.epk ? await rY(i10.epk, e10) : (await crypto.subtle.generateKey(r10.algorithm, true, ["deriveBits"])).privateKey;
            let { x: d2, y: p2, crv: f2, kty: h2 } = await r1(l2), g2 = await rU(r10, l2, "ECDH-ES" === e10 ? t10 : e10, "ECDH-ES" === e10 ? rg(t10) : parseInt(e10.slice(-5, -2), 10), c2, u2);
            if (o10 = { epk: { x: d2, crv: f2, kty: h2 } }, "EC" === h2 && (o10.epk.y = p2), c2 && (o10.apu = t1(c2)), u2 && (o10.apv = t1(u2)), "ECDH-ES" === e10) {
              s10 = g2;
              break;
            }
            s10 = n10 || rm(t10);
            let m2 = e10.slice(-6);
            a10 = await rI(m2, g2, s10);
            break;
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            s10 = n10 || rm(t10), rd(r10), a10 = await rF(e10, r10, s10);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            s10 = n10 || rm(t10);
            let { p2c: l2, p2s: c2 } = i10;
            ({ encryptedKey: a10, ...o10 } = await rL(e10, r10, s10, l2, c2));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            s10 = n10 || rm(t10), a10 = await rI(e10, r10, s10);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            s10 = n10 || rm(t10);
            let { iv: l2 } = i10;
            ({ encryptedKey: a10, ...o10 } = await r2(e10, r10, s10, l2));
            break;
          }
          default:
            throw new ra(r6);
        }
        return { cek: s10, encryptedKey: a10, parameters: o10 };
      }
      function r9(e10, t10, r10, n10, i10) {
        let a10;
        if (void 0 !== i10.crit && n10?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n10 || void 0 === n10.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(n10.crit) || 0 === n10.crit.length || n10.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let o10 of (a10 = void 0 !== r10 ? new Map([...Object.entries(r10), ...t10.entries()]) : t10, n10.crit)) {
          if (!a10.has(o10)) throw new ra(`Extension Header Parameter "${o10}" is not recognized`);
          if (void 0 === i10[o10]) throw new e10(`Extension Header Parameter "${o10}" is missing`);
          if (a10.get(o10) && void 0 === n10[o10]) throw new e10(`Extension Header Parameter "${o10}" MUST be integrity protected`);
        }
        return new Set(n10.crit);
      }
      let r7 = (e10) => e10?.[Symbol.toStringTag], ne = (e10, t10, r10) => {
        if (void 0 !== t10.use) {
          let e11;
          switch (r10) {
            case "sign":
            case "verify":
              e11 = "sig";
              break;
            case "encrypt":
            case "decrypt":
              e11 = "enc";
          }
          if (t10.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, its "alg" must be "${e10}" when present`);
        if (Array.isArray(t10.key_ops)) {
          let n10;
          switch (true) {
            case ("sign" === r10 || "verify" === r10):
            case "dir" === e10:
            case e10.includes("CBC-HS"):
              n10 = r10;
              break;
            case e10.startsWith("PBES2"):
              n10 = "deriveBits";
              break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e10):
              n10 = !e10.includes("GCM") && e10.endsWith("KW") ? "encrypt" === r10 ? "wrapKey" : "unwrapKey" : r10;
              break;
            case ("encrypt" === r10 && e10.startsWith("RSA")):
              n10 = "wrapKey";
              break;
            case "decrypt" === r10:
              n10 = e10.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          }
          if (n10 && t10.key_ops?.includes?.(n10) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${n10}" when present`);
        }
        return true;
      };
      function nt(e10, t10, r10) {
        switch (e10.substring(0, 2)) {
          case "A1":
          case "A2":
          case "di":
          case "HS":
          case "PB":
            ((e11, t11, r11) => {
              if (!(t11 instanceof Uint8Array)) {
                if (rJ(t11)) {
                  if ("oct" === t11.kty && "string" == typeof t11.k && ne(e11, t11, r11)) return;
                  throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
                }
                if (!rh(t11)) throw TypeError(re(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
                if ("secret" !== t11.type) throw TypeError(`${r7(t11)} instances for symmetric algorithms must be of type "secret"`);
              }
            })(e10, t10, r10);
            break;
          default:
            ((e11, t11, r11) => {
              if (rJ(t11)) switch (r11) {
                case "decrypt":
                case "sign":
                  if ("oct" !== t11.kty && ("AKP" === t11.kty && "string" == typeof t11.priv || "string" == typeof t11.d) && ne(e11, t11, r11)) return;
                  throw TypeError("JSON Web Key for this operation must be a private JWK");
                case "encrypt":
                case "verify":
                  if ("oct" !== t11.kty && void 0 === t11.d && void 0 === t11.priv && ne(e11, t11, r11)) return;
                  throw TypeError("JSON Web Key for this operation must be a public JWK");
              }
              if (!rh(t11)) throw TypeError(re(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key"));
              if ("secret" === t11.type) throw TypeError(`${r7(t11)} instances for asymmetric algorithms must not be of type "secret"`);
              if ("public" === t11.type) switch (r11) {
                case "sign":
                  throw TypeError(`${r7(t11)} instances for asymmetric algorithm signing must be of type "private"`);
                case "decrypt":
                  throw TypeError(`${r7(t11)} instances for asymmetric algorithm decryption must be of type "private"`);
              }
              if ("private" === t11.type) switch (r11) {
                case "verify":
                  throw TypeError(`${r7(t11)} instances for asymmetric algorithm verifying must be of type "public"`);
                case "encrypt":
                  throw TypeError(`${r7(t11)} instances for asymmetric algorithm encryption must be of type "public"`);
              }
            })(e10, t10, r10);
        }
      }
      function nr(e10) {
        if (void 0 === globalThis[e10]) throw new ra(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${e10} API.`);
      }
      async function nn(e10) {
        nr("CompressionStream");
        let t10 = new CompressionStream("deflate-raw"), r10 = t10.writable.getWriter();
        r10.write(e10).catch(() => {
        }), r10.close().catch(() => {
        });
        let n10 = [], i10 = t10.readable.getReader();
        for (; ; ) {
          let { value: e11, done: t11 } = await i10.read();
          if (t11) break;
          n10.push(e11);
        }
        return tG(...n10);
      }
      async function ni(e10, t10) {
        nr("DecompressionStream");
        let r10 = new DecompressionStream("deflate-raw"), n10 = r10.writable.getWriter();
        n10.write(e10).catch(() => {
        }), n10.close().catch(() => {
        });
        let i10 = [], a10 = 0, o10 = r10.readable.getReader();
        for (; ; ) {
          let { value: e11, done: r11 } = await o10.read();
          if (r11) break;
          if (i10.push(e11), a10 += e11.byteLength, t10 !== 1 / 0 && a10 > t10) throw new rs("Decompressed plaintext exceeded the configured limit");
        }
        return tG(...i10);
      }
      class na {
        #t;
        #r;
        #n;
        #i;
        #a;
        #o;
        #s;
        #l;
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this.#t = e10;
        }
        setKeyManagementParameters(e10) {
          return t5(this.#l, "setKeyManagementParameters"), this.#l = e10, this;
        }
        setProtectedHeader(e10) {
          return t5(this.#r, "setProtectedHeader"), this.#r = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          return t5(this.#n, "setSharedUnprotectedHeader"), this.#n = e10, this;
        }
        setUnprotectedHeader(e10) {
          return t5(this.#i, "setUnprotectedHeader"), this.#i = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this.#a = e10, this;
        }
        setContentEncryptionKey(e10) {
          return t5(this.#o, "setContentEncryptionKey"), this.#o = e10, this;
        }
        setInitializationVector(e10) {
          return t5(this.#s, "setInitializationVector"), this.#s = e10, this;
        }
        async encrypt(e10, t10) {
          let r10, n10, i10, a10, o10, s10;
          if (!this.#r && !this.#i && !this.#n) throw new rs("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!rK(this.#r, this.#i, this.#n)) throw new rs("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          let l2 = { ...this.#r, ...this.#i, ...this.#n };
          if (r9(rs, /* @__PURE__ */ new Map(), t10?.crit, this.#r, l2), void 0 !== l2.zip && "DEF" !== l2.zip) throw new ra('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
          if (void 0 !== l2.zip && !this.#r?.zip) throw new rs('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
          let { alg: c2, enc: u2 } = l2;
          if ("string" != typeof c2 || !c2) throw new rs('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof u2 || !u2) throw new rs('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if (this.#o && ("dir" === c2 || "ECDH-ES" === c2)) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${c2}`);
          nt("dir" === c2 ? u2 : c2, e10, "encrypt");
          {
            let i11, a11 = await rY(e10, c2);
            ({ cek: n10, encryptedKey: r10, parameters: i11 } = await r4(c2, u2, a11, this.#o, this.#l)), i11 && (t10 && t2 in t10 ? this.#i ? this.#i = { ...this.#i, ...i11 } : this.setUnprotectedHeader(i11) : this.#r ? this.#r = { ...this.#r, ...i11 } : this.setProtectedHeader(i11));
          }
          if (this.#r ? o10 = tZ(a10 = t1(JSON.stringify(this.#r))) : (a10 = "", o10 = new Uint8Array()), this.#a) {
            let e11 = tZ(s10 = t1(this.#a));
            i10 = tG(o10, tZ("."), e11);
          } else i10 = o10;
          let d2 = this.#t;
          "DEF" === l2.zip && (d2 = await nn(d2).catch((e11) => {
            throw new rs("Failed to compress plaintext", { cause: e11 });
          }));
          let { ciphertext: p2, tag: f2, iv: h2 } = await rT(u2, d2, n10, this.#s, i10), g2 = { ciphertext: t1(p2) };
          return h2 && (g2.iv = t1(h2)), f2 && (g2.tag = t1(f2)), r10 && (g2.encrypted_key = t1(r10)), s10 && (g2.aad = s10), this.#r && (g2.protected = a10), this.#n && (g2.unprotected = this.#n), this.#i && (g2.header = this.#i), g2;
        }
      }
      class no {
        #c;
        constructor(e10) {
          this.#c = new na(e10);
        }
        setContentEncryptionKey(e10) {
          return this.#c.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this.#c.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this.#c.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this.#c.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t10) {
          let r10 = await this.#c.encrypt(e10, t10);
          return [r10.protected, r10.encrypted_key, r10.iv, r10.ciphertext, r10.tag].join(".");
        }
      }
      let ns = (e10) => Math.floor(e10.getTime() / 1e3), nl = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      function nc(e10) {
        let t10, r10 = nl.exec(e10);
        if (!r10 || r10[4] && r10[1]) throw TypeError("Invalid time period format");
        let n10 = parseFloat(r10[2]);
        switch (r10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(n10);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * n10);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * n10);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * n10);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * n10);
            break;
          default:
            t10 = Math.round(31557600 * n10);
        }
        return "-" === r10[1] || "ago" === r10[4] ? -t10 : t10;
      }
      function nu(e10, t10) {
        if (!Number.isFinite(t10)) throw TypeError(`Invalid ${e10} input`);
        return t10;
      }
      let nd = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`;
      class np {
        #u;
        constructor(e10) {
          if (!rB(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this.#u = structuredClone(e10);
        }
        data() {
          return tJ.encode(JSON.stringify(this.#u));
        }
        get iss() {
          return this.#u.iss;
        }
        set iss(e10) {
          this.#u.iss = e10;
        }
        get sub() {
          return this.#u.sub;
        }
        set sub(e10) {
          this.#u.sub = e10;
        }
        get aud() {
          return this.#u.aud;
        }
        set aud(e10) {
          this.#u.aud = e10;
        }
        set jti(e10) {
          this.#u.jti = e10;
        }
        set nbf(e10) {
          "number" == typeof e10 ? this.#u.nbf = nu("setNotBefore", e10) : e10 instanceof Date ? this.#u.nbf = nu("setNotBefore", ns(e10)) : this.#u.nbf = ns(/* @__PURE__ */ new Date()) + nc(e10);
        }
        set exp(e10) {
          "number" == typeof e10 ? this.#u.exp = nu("setExpirationTime", e10) : e10 instanceof Date ? this.#u.exp = nu("setExpirationTime", ns(e10)) : this.#u.exp = ns(/* @__PURE__ */ new Date()) + nc(e10);
        }
        set iat(e10) {
          void 0 === e10 ? this.#u.iat = ns(/* @__PURE__ */ new Date()) : e10 instanceof Date ? this.#u.iat = nu("setIssuedAt", ns(e10)) : "string" == typeof e10 ? this.#u.iat = nu("setIssuedAt", ns(/* @__PURE__ */ new Date()) + nc(e10)) : this.#u.iat = nu("setIssuedAt", e10);
        }
      }
      class nf {
        #o;
        #s;
        #l;
        #r;
        #d;
        #p;
        #f;
        #h;
        constructor(e10 = {}) {
          this.#h = new np(e10);
        }
        setIssuer(e10) {
          return this.#h.iss = e10, this;
        }
        setSubject(e10) {
          return this.#h.sub = e10, this;
        }
        setAudience(e10) {
          return this.#h.aud = e10, this;
        }
        setJti(e10) {
          return this.#h.jti = e10, this;
        }
        setNotBefore(e10) {
          return this.#h.nbf = e10, this;
        }
        setExpirationTime(e10) {
          return this.#h.exp = e10, this;
        }
        setIssuedAt(e10) {
          return this.#h.iat = e10, this;
        }
        setProtectedHeader(e10) {
          return t5(this.#r, "setProtectedHeader"), this.#r = e10, this;
        }
        setKeyManagementParameters(e10) {
          return t5(this.#l, "setKeyManagementParameters"), this.#l = e10, this;
        }
        setContentEncryptionKey(e10) {
          return t5(this.#o, "setContentEncryptionKey"), this.#o = e10, this;
        }
        setInitializationVector(e10) {
          return t5(this.#s, "setInitializationVector"), this.#s = e10, this;
        }
        replicateIssuerAsHeader() {
          return this.#d = true, this;
        }
        replicateSubjectAsHeader() {
          return this.#p = true, this;
        }
        replicateAudienceAsHeader() {
          return this.#f = true, this;
        }
        async encrypt(e10, t10) {
          let r10 = new no(this.#h.data());
          return this.#r && (this.#d || this.#p || this.#f) && (this.#r = { ...this.#r, iss: this.#d ? this.#h.iss : void 0, sub: this.#p ? this.#h.sub : void 0, aud: this.#f ? this.#h.aud : void 0 }), r10.setProtectedHeader(this.#r), this.#s && r10.setInitializationVector(this.#s), this.#o && r10.setContentEncryptionKey(this.#o), this.#l && r10.setKeyManagementParameters(this.#l), r10.encrypt(e10, t10);
        }
      }
      var nh = e.i(22423), nh = nh;
      let ng = (e10, t10) => {
        if ("string" != typeof e10 || !e10) throw new rc(`${t10} missing or invalid`);
      };
      async function nm(e10, t10) {
        let r10, n10;
        if (rJ(e10)) r10 = e10;
        else if (rh(e10)) r10 = await r1(e10);
        else throw TypeError(t7(e10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("sha256" !== (t10 ??= "sha256") && "sha384" !== t10 && "sha512" !== t10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (r10.kty) {
          case "AKP":
            ng(r10.alg, '"alg" (Algorithm) Parameter'), ng(r10.pub, '"pub" (Public key) Parameter'), n10 = { alg: r10.alg, kty: r10.kty, pub: r10.pub };
            break;
          case "EC":
            ng(r10.crv, '"crv" (Curve) Parameter'), ng(r10.x, '"x" (X Coordinate) Parameter'), ng(r10.y, '"y" (Y Coordinate) Parameter'), n10 = { crv: r10.crv, kty: r10.kty, x: r10.x, y: r10.y };
            break;
          case "OKP":
            ng(r10.crv, '"crv" (Subtype of Key Pair) Parameter'), ng(r10.x, '"x" (Public Key) Parameter'), n10 = { crv: r10.crv, kty: r10.kty, x: r10.x };
            break;
          case "RSA":
            ng(r10.e, '"e" (Exponent) Parameter'), ng(r10.n, '"n" (Modulus) Parameter'), n10 = { e: r10.e, kty: r10.kty, n: r10.n };
            break;
          case "oct":
            ng(r10.k, '"k" (Key Value) Parameter'), n10 = { k: r10.k, kty: r10.kty };
            break;
          default:
            throw new ra('"kty" (Key Type) Parameter missing or unsupported');
        }
        let i10 = tZ(JSON.stringify(n10));
        return t1(await t3(t10, i10));
      }
      function nb(e10, t10) {
        if (void 0 !== t10 && (!Array.isArray(t10) || t10.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t10) return new Set(t10);
      }
      async function ny(e10, t10, r10) {
        let n10, i10, a10, o10, s10, l2;
        if (!rB(e10)) throw new rs("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new rs("JOSE Header missing");
        if (void 0 !== e10.iv && "string" != typeof e10.iv) throw new rs("JWE Initialization Vector incorrect type");
        if ("string" != typeof e10.ciphertext) throw new rs("JWE Ciphertext missing or incorrect type");
        if (void 0 !== e10.tag && "string" != typeof e10.tag) throw new rs("JWE Authentication Tag incorrect type");
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new rs("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" != typeof e10.encrypted_key) throw new rs("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" != typeof e10.aad) throw new rs("JWE AAD incorrect type");
        if (void 0 !== e10.header && !rB(e10.header)) throw new rs("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !rB(e10.unprotected)) throw new rs("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          let t11 = t0(e10.protected);
          n10 = JSON.parse(tz.decode(t11));
        } catch {
          throw new rs("JWE Protected Header is invalid");
        }
        if (!rK(n10, e10.header, e10.unprotected)) throw new rs("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let c2 = { ...n10, ...e10.header, ...e10.unprotected };
        if (r9(rs, /* @__PURE__ */ new Map(), r10?.crit, n10, c2), void 0 !== c2.zip && "DEF" !== c2.zip) throw new ra('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
        if (void 0 !== c2.zip && !n10?.zip) throw new rs('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
        let { alg: u2, enc: d2 } = c2;
        if ("string" != typeof u2 || !u2) throw new rs("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof d2 || !d2) throw new rs("missing JWE Encryption Algorithm (enc) in JWE Header");
        let p2 = r10 && nb("keyManagementAlgorithms", r10.keyManagementAlgorithms), f2 = r10 && nb("contentEncryptionAlgorithms", r10.contentEncryptionAlgorithms);
        if (p2 && !p2.has(u2) || !p2 && u2.startsWith("PBES2")) throw new ri('"alg" (Algorithm) Header Parameter value not allowed');
        if (f2 && !f2.has(d2)) throw new ri('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        void 0 !== e10.encrypted_key && (i10 = t6(e10.encrypted_key, "encrypted_key", rs));
        let h2 = false;
        "function" == typeof t10 && (t10 = await t10(n10, e10), h2 = true), nt("dir" === u2 ? d2 : u2, t10, "decrypt");
        let g2 = await rY(t10, u2);
        try {
          a10 = await r8(u2, g2, i10, c2, r10);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof rs || e11 instanceof ra) throw e11;
          a10 = rm(d2);
        }
        void 0 !== e10.iv && (o10 = t6(e10.iv, "iv", rs)), void 0 !== e10.tag && (s10 = t6(e10.tag, "tag", rs));
        let m2 = void 0 !== e10.protected ? tZ(e10.protected) : new Uint8Array();
        l2 = void 0 !== e10.aad ? tG(m2, tZ("."), tZ(e10.aad)) : m2;
        let b2 = t6(e10.ciphertext, "ciphertext", rs), y2 = await rR(d2, a10, b2, o10, s10, l2), w2 = { plaintext: y2 };
        if ("DEF" === c2.zip) {
          let e11 = r10?.maxDecompressedLength ?? 25e4;
          if (0 === e11) throw new ra('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          if (e11 !== 1 / 0 && (!Number.isSafeInteger(e11) || e11 < 1)) throw TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
          w2.plaintext = await ni(y2, e11).catch((e12) => {
            if (e12 instanceof rs) throw e12;
            throw new rs("Failed to decompress plaintext", { cause: e12 });
          });
        }
        return (void 0 !== e10.protected && (w2.protectedHeader = n10), void 0 !== e10.aad && (w2.additionalAuthenticatedData = t6(e10.aad, "aad", rs)), void 0 !== e10.unprotected && (w2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (w2.unprotectedHeader = e10.header), h2) ? { ...w2, key: g2 } : w2;
      }
      async function nw(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = tz.decode(e10)), "string" != typeof e10) throw new rs("Compact JWE must be a string or Uint8Array");
        let { 0: n10, 1: i10, 2: a10, 3: o10, 4: s10, length: l2 } = e10.split(".");
        if (5 !== l2) throw new rs("Invalid Compact JWE");
        let c2 = await ny({ ciphertext: o10, iv: a10 || void 0, protected: n10, tag: s10 || void 0, encrypted_key: i10 || void 0 }, t10, r10), u2 = { plaintext: c2.plaintext, protectedHeader: c2.protectedHeader };
        return "function" == typeof t10 ? { ...u2, key: c2.key } : u2;
      }
      async function n_(e10, t10, r10) {
        let n10 = await nw(e10, t10, r10), i10 = function(e11, t11, r11 = {}) {
          var n11, i11;
          let a11, o11;
          try {
            a11 = JSON.parse(tz.decode(t11));
          } catch {
          }
          if (!rB(a11)) throw new rl("JWT Claims Set must be a top-level JSON object");
          let { typ: s10 } = r11;
          if (s10 && ("string" != typeof e11.typ || nd(e11.typ) !== nd(s10))) throw new rr('unexpected "typ" JWT header value', a11, "typ", "check_failed");
          let { requiredClaims: l2 = [], issuer: c2, subject: u2, audience: d2, maxTokenAge: p2 } = r11, f2 = [...l2];
          for (let e12 of (void 0 !== p2 && f2.push("iat"), void 0 !== d2 && f2.push("aud"), void 0 !== u2 && f2.push("sub"), void 0 !== c2 && f2.push("iss"), new Set(f2.reverse()))) if (!(e12 in a11)) throw new rr(`missing required "${e12}" claim`, a11, e12, "missing");
          if (c2 && !(Array.isArray(c2) ? c2 : [c2]).includes(a11.iss)) throw new rr('unexpected "iss" claim value', a11, "iss", "check_failed");
          if (u2 && a11.sub !== u2) throw new rr('unexpected "sub" claim value', a11, "sub", "check_failed");
          if (d2 && (n11 = a11.aud, i11 = "string" == typeof d2 ? [d2] : d2, "string" == typeof n11 ? !i11.includes(n11) : !(Array.isArray(n11) && i11.some(Set.prototype.has.bind(new Set(n11)))))) throw new rr('unexpected "aud" claim value', a11, "aud", "check_failed");
          switch (typeof r11.clockTolerance) {
            case "string":
              o11 = nc(r11.clockTolerance);
              break;
            case "number":
              o11 = r11.clockTolerance;
              break;
            case "undefined":
              o11 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: h2 } = r11, g2 = ns(h2 || /* @__PURE__ */ new Date());
          if ((void 0 !== a11.iat || p2) && "number" != typeof a11.iat) throw new rr('"iat" claim must be a number', a11, "iat", "invalid");
          if (void 0 !== a11.nbf) {
            if ("number" != typeof a11.nbf) throw new rr('"nbf" claim must be a number', a11, "nbf", "invalid");
            if (a11.nbf > g2 + o11) throw new rr('"nbf" claim timestamp check failed', a11, "nbf", "check_failed");
          }
          if (void 0 !== a11.exp) {
            if ("number" != typeof a11.exp) throw new rr('"exp" claim must be a number', a11, "exp", "invalid");
            if (a11.exp <= g2 - o11) throw new rn('"exp" claim timestamp check failed', a11, "exp", "check_failed");
          }
          if (p2) {
            let e12 = g2 - a11.iat;
            if (e12 - o11 > ("number" == typeof p2 ? p2 : nc(p2))) throw new rn('"iat" claim timestamp check failed (too far in the past)', a11, "iat", "check_failed");
            if (e12 < 0 - o11) throw new rr('"iat" claim timestamp check failed (it should be in the past)', a11, "iat", "check_failed");
          }
          return a11;
        }(n10.protectedHeader, n10.plaintext, r10), { protectedHeader: a10 } = n10;
        if (void 0 !== a10.iss && a10.iss !== i10.iss) throw new rr('replicated "iss" claim header parameter mismatch', i10, "iss", "mismatch");
        if (void 0 !== a10.sub && a10.sub !== i10.sub) throw new rr('replicated "sub" claim header parameter mismatch', i10, "sub", "mismatch");
        if (void 0 !== a10.aud && JSON.stringify(a10.aud) !== JSON.stringify(i10.aud)) throw new rr('replicated "aud" claim header parameter mismatch', i10, "aud", "mismatch");
        let o10 = { payload: i10, protectedHeader: a10 };
        return "function" == typeof t10 ? { ...o10, key: n10.key } : o10;
      }
      let nv = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, nx = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, nE = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, nS = /^[\u0020-\u003A\u003D-\u007E]*$/, nk = Object.prototype.toString, nA = ((s = function() {
      }).prototype = /* @__PURE__ */ Object.create(null), s);
      function nP(e10, t10) {
        let r10 = new nA(), n10 = e10.length;
        if (n10 < 2) return r10;
        let i10 = t10?.decode || nO, a10 = 0;
        do {
          let t11 = e10.indexOf("=", a10);
          if (-1 === t11) break;
          let o10 = e10.indexOf(";", a10), s10 = -1 === o10 ? n10 : o10;
          if (t11 > s10) {
            a10 = e10.lastIndexOf(";", t11 - 1) + 1;
            continue;
          }
          let l2 = nT(e10, a10, t11), c2 = nR(e10, t11, l2), u2 = e10.slice(l2, c2);
          if (void 0 === r10[u2]) {
            let n11 = nT(e10, t11 + 1, s10), a11 = nR(e10, s10, n11), o11 = i10(e10.slice(n11, a11));
            r10[u2] = o11;
          }
          a10 = s10 + 1;
        } while (a10 < n10);
        return r10;
      }
      function nT(e10, t10, r10) {
        do {
          let r11 = e10.charCodeAt(t10);
          if (32 !== r11 && 9 !== r11) return t10;
        } while (++t10 < r10);
        return r10;
      }
      function nR(e10, t10, r10) {
        for (; t10 > r10; ) {
          let r11 = e10.charCodeAt(--t10);
          if (32 !== r11 && 9 !== r11) return t10 + 1;
        }
        return r10;
      }
      function nC(e10, t10, r10) {
        let n10 = r10?.encode || encodeURIComponent;
        if (!nv.test(e10)) throw TypeError(`argument name is invalid: ${e10}`);
        let i10 = n10(t10);
        if (!nx.test(i10)) throw TypeError(`argument val is invalid: ${t10}`);
        let a10 = e10 + "=" + i10;
        if (!r10) return a10;
        if (void 0 !== r10.maxAge) {
          if (!Number.isInteger(r10.maxAge)) throw TypeError(`option maxAge is invalid: ${r10.maxAge}`);
          a10 += "; Max-Age=" + r10.maxAge;
        }
        if (r10.domain) {
          if (!nE.test(r10.domain)) throw TypeError(`option domain is invalid: ${r10.domain}`);
          a10 += "; Domain=" + r10.domain;
        }
        if (r10.path) {
          if (!nS.test(r10.path)) throw TypeError(`option path is invalid: ${r10.path}`);
          a10 += "; Path=" + r10.path;
        }
        if (r10.expires) {
          var o10;
          if (o10 = r10.expires, "[object Date]" !== nk.call(o10) || !Number.isFinite(r10.expires.valueOf())) throw TypeError(`option expires is invalid: ${r10.expires}`);
          a10 += "; Expires=" + r10.expires.toUTCString();
        }
        if (r10.httpOnly && (a10 += "; HttpOnly"), r10.secure && (a10 += "; Secure"), r10.partitioned && (a10 += "; Partitioned"), r10.priority) switch ("string" == typeof r10.priority ? r10.priority.toLowerCase() : void 0) {
          case "low":
            a10 += "; Priority=Low";
            break;
          case "medium":
            a10 += "; Priority=Medium";
            break;
          case "high":
            a10 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${r10.priority}`);
        }
        if (r10.sameSite) switch ("string" == typeof r10.sameSite ? r10.sameSite.toLowerCase() : r10.sameSite) {
          case true:
          case "strict":
            a10 += "; SameSite=Strict";
            break;
          case "lax":
            a10 += "; SameSite=Lax";
            break;
          case "none":
            a10 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${r10.sameSite}`);
        }
        return a10;
      }
      function nO(e10) {
        if (-1 === e10.indexOf("%")) return e10;
        try {
          return decodeURIComponent(e10);
        } catch (t10) {
          return e10;
        }
      }
      e.s(["parse", () => nP, "serialize", () => nC], 52411);
      var nI = e.i(52411);
      let { parse: nN } = nI, n$ = "A256CBC-HS512";
      async function nD(e10) {
        let { token: t10 = {}, secret: r10, maxAge: n10 = 2592e3, salt: i10 } = e10, a10 = Array.isArray(r10) ? r10 : [r10], o10 = await nj(n$, a10[0], i10), s10 = await nm({ kty: "oct", k: nh.encode(o10) }, `sha${o10.byteLength << 3}`);
        return await new nf(t10).setProtectedHeader({ alg: "dir", enc: n$, kid: s10 }).setIssuedAt().setExpirationTime((Date.now() / 1e3 | 0) + n10).setJti(crypto.randomUUID()).encrypt(o10);
      }
      async function nU(e10) {
        let { token: t10, secret: r10, salt: n10 } = e10, i10 = Array.isArray(r10) ? r10 : [r10];
        if (!t10) return null;
        let { payload: a10 } = await n_(t10, async ({ kid: e11, enc: t11 }) => {
          for (let r11 of i10) {
            let i11 = await nj(t11, r11, n10);
            if (void 0 === e11 || e11 === await nm({ kty: "oct", k: nh.encode(i11) }, `sha${i11.byteLength << 3}`)) return i11;
          }
          throw Error("no matching decryption secret");
        }, { clockTolerance: 15, keyManagementAlgorithms: ["dir"], contentEncryptionAlgorithms: [n$, "A256GCM"] });
        return a10;
      }
      async function nj(e10, t10, r10) {
        let n10;
        switch (e10) {
          case "A256CBC-HS512":
            n10 = 64;
            break;
          case "A256GCM":
            n10 = 32;
            break;
          default:
            throw Error("Unsupported JWT Content Encryption Algorithm");
        }
        return await tK("sha256", t10, r10, `Auth.js Generated Encryption Key (${r10})`, n10);
      }
      async function nM({ options: e10, paramValue: t10, cookieValue: r10 }) {
        let { url: n10, callbacks: i10 } = e10, a10 = n10.origin;
        return t10 ? a10 = await i10.redirect({ url: t10, baseUrl: n10.origin }) : r10 && (a10 = await i10.redirect({ url: r10, baseUrl: n10.origin })), { callbackUrl: a10, callbackUrlCookie: a10 !== r10 ? a10 : void 0 };
      }
      let nL = "\x1B[31m", nH = "\x1B[0m", nq = { error(e10) {
        let t10 = e10 instanceof tn ? e10.type : e10.name;
        if (console.error(`${nL}[auth][error]${nH} ${t10}: ${e10.message}`), e10.cause && "object" == typeof e10.cause && "err" in e10.cause && e10.cause.err instanceof Error) {
          let { err: t11, ...r10 } = e10.cause;
          console.error(`${nL}[auth][cause]${nH}:`, t11.stack), r10 && console.error(`${nL}[auth][details]${nH}:`, JSON.stringify(r10, null, 2));
        } else e10.stack && console.error(e10.stack.replace(/.*/, "").substring(1));
      }, warn(e10) {
        console.warn(`\x1B[33m[auth][warn][${e10}]${nH}`, "Read more: https://warnings.authjs.dev");
      }, debug(e10, t10) {
        console.log(`\x1B[90m[auth][debug]:${nH} ${e10}`, JSON.stringify(t10, null, 2));
      } };
      function nV(e10) {
        let t10 = { ...nq };
        return e10.debug || (t10.debug = () => {
        }), e10.logger?.error && (t10.error = e10.logger.error), e10.logger?.warn && (t10.warn = e10.logger.warn), e10.logger?.debug && (t10.debug = e10.logger.debug), e10.logger ?? (e10.logger = t10), t10;
      }
      let nF = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "webauthn-options"], { parse: nW, serialize: nB } = nI;
      async function nK(e10) {
        if (!("body" in e10) || !e10.body || "POST" !== e10.method) return;
        let t10 = e10.headers.get("content-type");
        return t10?.includes("application/json") ? await e10.json() : t10?.includes("application/x-www-form-urlencoded") ? Object.fromEntries(new URLSearchParams(await e10.text())) : void 0;
      }
      async function nJ(e10, t10) {
        try {
          if ("GET" !== e10.method && "POST" !== e10.method) throw new tS("Only GET and POST requests are supported");
          t10.basePath ?? (t10.basePath = "/auth");
          let r10 = new URL(e10.url), { action: n10, providerId: i10 } = function(e11, t11) {
            let r11 = e11.match(RegExp(`^${t11}(.+)`));
            if (null === r11) throw new tS(`Cannot parse action at ${e11}`);
            let n11 = r11.at(-1).replace(/^\//, "").split("/").filter(Boolean);
            if (1 !== n11.length && 2 !== n11.length) throw new tS(`Cannot parse action at ${e11}`);
            let [i11, a10] = n11;
            if (!nF.includes(i11) || a10 && !["signin", "callback", "webauthn-options"].includes(i11)) throw new tS(`Cannot parse action at ${e11}`);
            return { action: i11, providerId: "undefined" == a10 ? void 0 : a10 };
          }(r10.pathname, t10.basePath);
          return { url: r10, action: n10, providerId: i10, method: e10.method, headers: Object.fromEntries(e10.headers), body: e10.body ? await nK(e10) : void 0, cookies: nW(e10.headers.get("cookie") ?? "") ?? {}, error: r10.searchParams.get("error") ?? void 0, query: Object.fromEntries(r10.searchParams) };
        } catch (n10) {
          let r10 = nV(t10);
          r10.error(n10), r10.debug("request", e10);
        }
      }
      function nz(e10) {
        let t10 = new Headers(e10.headers);
        e10.cookies?.forEach((e11) => {
          let { name: r11, value: n11, options: i10 } = e11, a10 = nB(r11, n11, i10);
          t10.has("Set-Cookie") ? t10.append("Set-Cookie", a10) : t10.set("Set-Cookie", a10);
        });
        let r10 = e10.body;
        "application/json" === t10.get("content-type") ? r10 = JSON.stringify(e10.body) : "application/x-www-form-urlencoded" === t10.get("content-type") && (r10 = new URLSearchParams(e10.body).toString());
        let n10 = new Response(r10, { headers: t10, status: e10.redirect ? 302 : e10.status ?? 200 });
        return e10.redirect && n10.headers.set("Location", e10.redirect), n10;
      }
      async function nG(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").toString();
      }
      function nX(e10) {
        return Array.from(crypto.getRandomValues(new Uint8Array(e10))).reduce((e11, t10) => e11 + ("0" + t10.toString(16)).slice(-2), "");
      }
      async function nQ({ options: e10, cookieValue: t10, isPost: r10, bodyValue: n10 }) {
        if (t10) {
          let [i11, a11] = t10.split("|");
          if (a11 === await nG(`${i11}${e10.secret}`)) return { csrfTokenVerified: r10 && i11 === n10, csrfToken: i11 };
        }
        let i10 = nX(32), a10 = await nG(`${i10}${e10.secret}`);
        return { cookie: `${i10}|${a10}`, csrfToken: i10 };
      }
      function nY(e10, t10) {
        if (!t10) throw new tR(`CSRF token was missing during an action ${e10}`);
      }
      function nZ(e10) {
        return null !== e10 && "object" == typeof e10;
      }
      function n0(e10, ...t10) {
        if (!t10.length) return e10;
        let r10 = t10.shift();
        if (nZ(e10) && nZ(r10)) for (let t11 in r10) nZ(r10[t11]) ? (nZ(e10[t11]) || (e10[t11] = Array.isArray(r10[t11]) ? [] : {}), n0(e10[t11], r10[t11])) : void 0 !== r10[t11] && (e10[t11] = r10[t11]);
        return n0(e10, ...t10);
      }
      let n1 = Symbol("skip-csrf-check"), n2 = Symbol("return-type-raw"), n5 = Symbol("custom-fetch"), n6 = Symbol("conform-internal"), n3 = (e10) => n4({ id: e10.sub ?? e10.id ?? crypto.randomUUID(), name: e10.name ?? e10.nickname ?? e10.preferred_username, email: e10.email, image: e10.picture }), n8 = (e10) => n4({ access_token: e10.access_token, id_token: e10.id_token, refresh_token: e10.refresh_token, expires_at: e10.expires_at, scope: e10.scope, token_type: e10.token_type, session_state: e10.session_state });
      function n4(e10) {
        let t10 = {};
        for (let [r10, n10] of Object.entries(e10)) void 0 !== n10 && (t10[r10] = n10);
        return t10;
      }
      function n9(e10, t10) {
        if (!e10 && t10) return;
        if ("string" == typeof e10) return { url: new URL(e10) };
        let r10 = new URL(e10?.url ?? "https://authjs.dev");
        if (e10?.params != null) for (let [t11, n10] of Object.entries(e10.params)) "claims" === t11 && (n10 = JSON.stringify(n10)), r10.searchParams.set(t11, String(n10));
        return { url: r10, request: e10?.request, conform: e10?.conform, ...e10?.clientPrivateKey ? { clientPrivateKey: e10?.clientPrivateKey } : null };
      }
      let n7 = { signIn: () => true, redirect: ({ url: e10, baseUrl: t10 }) => e10.startsWith("/") ? `${t10}${e10}` : new URL(e10).origin === t10 ? e10 : t10, session: ({ session: e10 }) => ({ user: { name: e10.user?.name, email: e10.user?.email, image: e10.user?.image }, expires: e10.expires?.toISOString?.() ?? e10.expires }), jwt: ({ token: e10 }) => e10 };
      async function ie({ authOptions: e10, providerId: t10, action: r10, url: n10, cookies: i10, callbackUrl: a10, csrfToken: o10, csrfDisabled: s10, isPost: l2 }) {
        var c2, u2;
        let d2 = nV(e10), { providers: p2, provider: f2 } = function(e11) {
          let { providerId: t11, config: r11 } = e11, n11 = new URL(r11.basePath ?? "/auth", e11.url.origin), i11 = r11.providers.map((e12) => {
            let t12 = "function" == typeof e12 ? e12() : e12, { options: i12, ...a12 } = t12, o11 = i12?.id ?? a12.id, s11 = n0(a12, i12, { signinUrl: `${n11}/signin/${o11}`, callbackUrl: `${n11}/callback/${o11}` });
            if ("oauth" === t12.type || "oidc" === t12.type) {
              var l3;
              let e13, t13, n12, a13;
              s11.redirectProxyUrl ?? (s11.redirectProxyUrl = i12?.redirectProxyUrl ?? r11.redirectProxyUrl);
              let o12 = ((l3 = s11).issuer && (l3.wellKnown ?? (l3.wellKnown = `${l3.issuer}/.well-known/openid-configuration`)), (e13 = n9(l3.authorization, l3.issuer)) && !e13.url?.searchParams.has("scope") && e13.url.searchParams.set("scope", "openid profile email"), t13 = n9(l3.token, l3.issuer), n12 = n9(l3.userinfo, l3.issuer), a13 = l3.checks ?? ["pkce"], l3.redirectProxyUrl && (a13.includes("state") || a13.push("state"), l3.redirectProxyUrl = `${l3.redirectProxyUrl}/callback/${l3.id}`), { ...l3, authorization: e13, token: t13, checks: a13, userinfo: n12, profile: l3.profile ?? n3, account: l3.account ?? n8 });
              return o12.authorization?.url.searchParams.get("response_mode") === "form_post" && delete o12.redirectProxyUrl, o12[n5] ?? (o12[n5] = i12?.[n5]), o12;
            }
            return s11;
          }), a11 = i11.find(({ id: e12 }) => e12 === t11);
          if (t11 && !a11) {
            let e12 = i11.map((e13) => e13.id).join(", ");
            throw Error(`Provider with id "${t11}" not found. Available providers: [${e12}].`);
          }
          return { providers: i11, provider: a11 };
        }({ url: n10, providerId: t10, config: e10 }), h2 = false;
        if ((f2?.type === "oauth" || f2?.type === "oidc") && f2.redirectProxyUrl) try {
          h2 = new URL(f2.redirectProxyUrl).origin === n10.origin;
        } catch {
          throw TypeError(`redirectProxyUrl must be a valid URL. Received: ${f2.redirectProxyUrl}`);
        }
        let g2 = { debug: false, pages: {}, theme: { colorScheme: "auto", logo: "", brandColor: "", buttonText: "" }, ...e10, url: n10, action: r10, provider: f2, cookies: n0(tt(e10.useSecureCookies ?? "https:" === n10.protocol), e10.cookies), providers: p2, session: { strategy: e10.adapter ? "database" : "jwt", maxAge: 2592e3, updateAge: 86400, generateSessionToken: () => crypto.randomUUID(), ...e10.session }, jwt: { secret: e10.secret, maxAge: e10.session?.maxAge ?? 2592e3, encode: nD, decode: nU, ...e10.jwt }, events: (c2 = e10.events ?? {}, u2 = d2, Object.keys(c2).reduce((e11, t11) => (e11[t11] = async (...e12) => {
          try {
            let r11 = c2[t11];
            return await r11(...e12);
          } catch (e13) {
            u2.error(new tc(e13));
          }
        }, e11), {})), adapter: function(e11, t11) {
          if (e11) return Object.keys(e11).reduce((r11, n11) => (r11[n11] = async (...r12) => {
            try {
              t11.debug(`adapter_${n11}`, { args: r12 });
              let i11 = e11[n11];
              return await i11(...r12);
            } catch (r13) {
              let e12 = new ta(r13);
              throw t11.error(e12), e12;
            }
          }, r11), {});
        }(e10.adapter, d2), callbacks: { ...n7, ...e10.callbacks }, logger: d2, callbackUrl: n10.origin, isOnRedirectProxy: h2, experimental: { ...e10.experimental } }, m2 = [];
        if (s10) g2.csrfTokenVerified = true;
        else {
          let { csrfToken: e11, cookie: t11, csrfTokenVerified: r11 } = await nQ({ options: g2, cookieValue: i10?.[g2.cookies.csrfToken.name], isPost: l2, bodyValue: o10 });
          g2.csrfToken = e11, g2.csrfTokenVerified = r11, t11 && m2.push({ name: g2.cookies.csrfToken.name, value: t11, options: g2.cookies.csrfToken.options });
        }
        let { callbackUrl: b2, callbackUrlCookie: y2 } = await nM({ options: g2, cookieValue: i10?.[g2.cookies.callbackUrl.name], paramValue: a10 });
        return g2.callbackUrl = b2, y2 && m2.push({ name: g2.cookies.callbackUrl.name, value: y2, options: g2.cookies.callbackUrl.options }), { options: g2, cookies: m2 };
      }
      var it, ir, ii, ia, io, is, il, ic, iu, id, ip, ih, ig, im, ib, iy, iw, i_, iv, ix, iE, iS, ik, iA, iP, iT, iR, iC, iO = {}, iI = [], iN = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, i$ = Array.isArray;
      function iD(e10, t10) {
        for (var r10 in t10) e10[r10] = t10[r10];
        return e10;
      }
      function iU(e10) {
        e10 && e10.parentNode && e10.parentNode.removeChild(e10);
      }
      function ij(e10, t10, r10, n10, i10) {
        var a10 = { type: e10, props: t10, key: r10, ref: n10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == i10 ? ++iE : i10, __i: -1, __u: 0 };
        return null == i10 && null != ix.vnode && ix.vnode(a10), a10;
      }
      function iM(e10) {
        return e10.children;
      }
      function iL(e10, t10) {
        this.props = e10, this.context = t10;
      }
      function iH(e10, t10) {
        if (null == t10) return e10.__ ? iH(e10.__, e10.__i + 1) : null;
        for (var r10; t10 < e10.__k.length; t10++) if (null != (r10 = e10.__k[t10]) && null != r10.__e) return r10.__e;
        return "function" == typeof e10.type ? iH(e10) : null;
      }
      function iq(e10) {
        (!e10.__d && (e10.__d = true) && iS.push(e10) && !iV.__r++ || ik !== ix.debounceRendering) && ((ik = ix.debounceRendering) || iA)(iV);
      }
      function iV() {
        var e10, t10, r10, n10, i10, a10, o10, s10;
        for (iS.sort(iP); e10 = iS.shift(); ) e10.__d && (t10 = iS.length, n10 = void 0, a10 = (i10 = (r10 = e10).__v).__e, o10 = [], s10 = [], r10.__P && ((n10 = iD({}, i10)).__v = i10.__v + 1, ix.vnode && ix.vnode(n10), iJ(r10.__P, n10, i10, r10.__n, r10.__P.namespaceURI, 32 & i10.__u ? [a10] : null, o10, null == a10 ? iH(i10) : a10, !!(32 & i10.__u), s10), n10.__v = i10.__v, n10.__.__k[n10.__i] = n10, function(e11, t11, r11) {
          t11.__d = void 0;
          for (var n11 = 0; n11 < r11.length; n11++) iz(r11[n11], r11[++n11], r11[++n11]);
          ix.__c && ix.__c(t11, e11), e11.some(function(t12) {
            try {
              e11 = t12.__h, t12.__h = [], e11.some(function(e12) {
                e12.call(t12);
              });
            } catch (e12) {
              ix.__e(e12, t12.__v);
            }
          });
        }(o10, n10, s10), n10.__e != a10 && function e11(t11) {
          var r11, n11;
          if (null != (t11 = t11.__) && null != t11.__c) {
            for (t11.__e = t11.__c.base = null, r11 = 0; r11 < t11.__k.length; r11++) if (null != (n11 = t11.__k[r11]) && null != n11.__e) {
              t11.__e = t11.__c.base = n11.__e;
              break;
            }
            return e11(t11);
          }
        }(n10)), iS.length > t10 && iS.sort(iP));
        iV.__r = 0;
      }
      function iF(e10, t10, r10, n10, i10, a10, o10, s10, l2, c2, u2) {
        var d2, p2, f2, h2, g2, m2 = n10 && n10.__k || iI, b2 = t10.length;
        for (r10.__d = l2, function(e11, t11, r11) {
          var n11, i11, a11, o11, s11, l3 = t11.length, c3 = r11.length, u3 = c3, d3 = 0;
          for (e11.__k = [], n11 = 0; n11 < l3; n11++) null != (i11 = t11[n11]) && "boolean" != typeof i11 && "function" != typeof i11 ? (o11 = n11 + d3, (i11 = e11.__k[n11] = "string" == typeof i11 || "number" == typeof i11 || "bigint" == typeof i11 || i11.constructor == String ? ij(null, i11, null, null, null) : i$(i11) ? ij(iM, { children: i11 }, null, null, null) : void 0 === i11.constructor && i11.__b > 0 ? ij(i11.type, i11.props, i11.key, i11.ref ? i11.ref : null, i11.__v) : i11).__ = e11, i11.__b = e11.__b + 1, a11 = null, -1 !== (s11 = i11.__i = function(e12, t12, r12, n12) {
            var i12 = e12.key, a12 = e12.type, o12 = r12 - 1, s12 = r12 + 1, l4 = t12[r12];
            if (null === l4 || l4 && i12 == l4.key && a12 === l4.type && 0 == (131072 & l4.__u)) return r12;
            if (n12 > +(null != l4 && 0 == (131072 & l4.__u))) for (; o12 >= 0 || s12 < t12.length; ) {
              if (o12 >= 0) {
                if ((l4 = t12[o12]) && 0 == (131072 & l4.__u) && i12 == l4.key && a12 === l4.type) return o12;
                o12--;
              }
              if (s12 < t12.length) {
                if ((l4 = t12[s12]) && 0 == (131072 & l4.__u) && i12 == l4.key && a12 === l4.type) return s12;
                s12++;
              }
            }
            return -1;
          }(i11, r11, o11, u3)) && (u3--, (a11 = r11[s11]) && (a11.__u |= 131072)), null == a11 || null === a11.__v ? (-1 == s11 && d3--, "function" != typeof i11.type && (i11.__u |= 65536)) : s11 !== o11 && (s11 == o11 - 1 ? d3-- : s11 == o11 + 1 ? d3++ : (s11 > o11 ? d3-- : d3++, i11.__u |= 65536))) : i11 = e11.__k[n11] = null;
          if (u3) for (n11 = 0; n11 < c3; n11++) null != (a11 = r11[n11]) && 0 == (131072 & a11.__u) && (a11.__e == e11.__d && (e11.__d = iH(a11)), function e12(t12, r12, n12) {
            var i12, a12;
            if (ix.unmount && ix.unmount(t12), (i12 = t12.ref) && (i12.current && i12.current !== t12.__e || iz(i12, null, r12)), null != (i12 = t12.__c)) {
              if (i12.componentWillUnmount) try {
                i12.componentWillUnmount();
              } catch (e13) {
                ix.__e(e13, r12);
              }
              i12.base = i12.__P = null;
            }
            if (i12 = t12.__k) for (a12 = 0; a12 < i12.length; a12++) i12[a12] && e12(i12[a12], r12, n12 || "function" != typeof t12.type);
            n12 || iU(t12.__e), t12.__c = t12.__ = t12.__e = t12.__d = void 0;
          }(a11, a11));
        }(r10, t10, m2), l2 = r10.__d, d2 = 0; d2 < b2; d2++) null != (f2 = r10.__k[d2]) && (p2 = -1 === f2.__i ? iO : m2[f2.__i] || iO, f2.__i = d2, iJ(e10, f2, p2, i10, a10, o10, s10, l2, c2, u2), h2 = f2.__e, f2.ref && p2.ref != f2.ref && (p2.ref && iz(p2.ref, null, f2), u2.push(f2.ref, f2.__c || h2, f2)), null == g2 && null != h2 && (g2 = h2), 65536 & f2.__u || p2.__k === f2.__k ? l2 = function e11(t11, r11, n11) {
          var i11, a11;
          if ("function" == typeof t11.type) {
            for (i11 = t11.__k, a11 = 0; i11 && a11 < i11.length; a11++) i11[a11] && (i11[a11].__ = t11, r11 = e11(i11[a11], r11, n11));
            return r11;
          }
          t11.__e != r11 && (r11 && t11.type && !n11.contains(r11) && (r11 = iH(t11)), n11.insertBefore(t11.__e, r11 || null), r11 = t11.__e);
          do
            r11 = r11 && r11.nextSibling;
          while (null != r11 && 8 === r11.nodeType);
          return r11;
        }(f2, l2, e10) : "function" == typeof f2.type && void 0 !== f2.__d ? l2 = f2.__d : h2 && (l2 = h2.nextSibling), f2.__d = void 0, f2.__u &= -196609);
        r10.__d = l2, r10.__e = g2;
      }
      function iW(e10, t10, r10) {
        "-" === t10[0] ? e10.setProperty(t10, null == r10 ? "" : r10) : e10[t10] = null == r10 ? "" : "number" != typeof r10 || iN.test(t10) ? r10 : r10 + "px";
      }
      function iB(e10, t10, r10, n10, i10) {
        var a10;
        e: if ("style" === t10) if ("string" == typeof r10) e10.style.cssText = r10;
        else {
          if ("string" == typeof n10 && (e10.style.cssText = n10 = ""), n10) for (t10 in n10) r10 && t10 in r10 || iW(e10.style, t10, "");
          if (r10) for (t10 in r10) n10 && r10[t10] === n10[t10] || iW(e10.style, t10, r10[t10]);
        }
        else if ("o" === t10[0] && "n" === t10[1]) a10 = t10 !== (t10 = t10.replace(/(PointerCapture)$|Capture$/i, "$1")), t10 = t10.toLowerCase() in e10 || "onFocusOut" === t10 || "onFocusIn" === t10 ? t10.toLowerCase().slice(2) : t10.slice(2), e10.l || (e10.l = {}), e10.l[t10 + a10] = r10, r10 ? n10 ? r10.u = n10.u : (r10.u = iT, e10.addEventListener(t10, a10 ? iC : iR, a10)) : e10.removeEventListener(t10, a10 ? iC : iR, a10);
        else {
          if ("http://www.w3.org/2000/svg" == i10) t10 = t10.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if ("width" != t10 && "height" != t10 && "href" != t10 && "list" != t10 && "form" != t10 && "tabIndex" != t10 && "download" != t10 && "rowSpan" != t10 && "colSpan" != t10 && "role" != t10 && "popover" != t10 && t10 in e10) try {
            e10[t10] = null == r10 ? "" : r10;
            break e;
          } catch (e11) {
          }
          "function" == typeof r10 || (null == r10 || false === r10 && "-" !== t10[4] ? e10.removeAttribute(t10) : e10.setAttribute(t10, "popover" == t10 && 1 == r10 ? "" : r10));
        }
      }
      function iK(e10) {
        return function(t10) {
          if (this.l) {
            var r10 = this.l[t10.type + e10];
            if (null == t10.t) t10.t = iT++;
            else if (t10.t < r10.u) return;
            return r10(ix.event ? ix.event(t10) : t10);
          }
        };
      }
      function iJ(e10, t10, r10, n10, i10, a10, o10, s10, l2, c2) {
        var u2, d2, p2, f2, h2, g2, m2, b2, y2, w2, _2, v2, x2, E2, S2, k2, A2 = t10.type;
        if (void 0 !== t10.constructor) return null;
        128 & r10.__u && (l2 = !!(32 & r10.__u), a10 = [s10 = t10.__e = r10.__e]), (u2 = ix.__b) && u2(t10);
        e: if ("function" == typeof A2) try {
          if (b2 = t10.props, y2 = "prototype" in A2 && A2.prototype.render, w2 = (u2 = A2.contextType) && n10[u2.__c], _2 = u2 ? w2 ? w2.props.value : u2.__ : n10, r10.__c ? m2 = (d2 = t10.__c = r10.__c).__ = d2.__E : (y2 ? t10.__c = d2 = new A2(b2, _2) : (t10.__c = d2 = new iL(b2, _2), d2.constructor = A2, d2.render = iG), w2 && w2.sub(d2), d2.props = b2, d2.state || (d2.state = {}), d2.context = _2, d2.__n = n10, p2 = d2.__d = true, d2.__h = [], d2._sb = []), y2 && null == d2.__s && (d2.__s = d2.state), y2 && null != A2.getDerivedStateFromProps && (d2.__s == d2.state && (d2.__s = iD({}, d2.__s)), iD(d2.__s, A2.getDerivedStateFromProps(b2, d2.__s))), f2 = d2.props, h2 = d2.state, d2.__v = t10, p2) y2 && null == A2.getDerivedStateFromProps && null != d2.componentWillMount && d2.componentWillMount(), y2 && null != d2.componentDidMount && d2.__h.push(d2.componentDidMount);
          else {
            if (y2 && null == A2.getDerivedStateFromProps && b2 !== f2 && null != d2.componentWillReceiveProps && d2.componentWillReceiveProps(b2, _2), !d2.__e && (null != d2.shouldComponentUpdate && false === d2.shouldComponentUpdate(b2, d2.__s, _2) || t10.__v === r10.__v)) {
              for (t10.__v !== r10.__v && (d2.props = b2, d2.state = d2.__s, d2.__d = false), t10.__e = r10.__e, t10.__k = r10.__k, t10.__k.some(function(e11) {
                e11 && (e11.__ = t10);
              }), v2 = 0; v2 < d2._sb.length; v2++) d2.__h.push(d2._sb[v2]);
              d2._sb = [], d2.__h.length && o10.push(d2);
              break e;
            }
            null != d2.componentWillUpdate && d2.componentWillUpdate(b2, d2.__s, _2), y2 && null != d2.componentDidUpdate && d2.__h.push(function() {
              d2.componentDidUpdate(f2, h2, g2);
            });
          }
          if (d2.context = _2, d2.props = b2, d2.__P = e10, d2.__e = false, x2 = ix.__r, E2 = 0, y2) {
            for (d2.state = d2.__s, d2.__d = false, x2 && x2(t10), u2 = d2.render(d2.props, d2.state, d2.context), S2 = 0; S2 < d2._sb.length; S2++) d2.__h.push(d2._sb[S2]);
            d2._sb = [];
          } else do
            d2.__d = false, x2 && x2(t10), u2 = d2.render(d2.props, d2.state, d2.context), d2.state = d2.__s;
          while (d2.__d && ++E2 < 25);
          d2.state = d2.__s, null != d2.getChildContext && (n10 = iD(iD({}, n10), d2.getChildContext())), y2 && !p2 && null != d2.getSnapshotBeforeUpdate && (g2 = d2.getSnapshotBeforeUpdate(f2, h2)), iF(e10, i$(k2 = null != u2 && u2.type === iM && null == u2.key ? u2.props.children : u2) ? k2 : [k2], t10, r10, n10, i10, a10, o10, s10, l2, c2), d2.base = t10.__e, t10.__u &= -161, d2.__h.length && o10.push(d2), m2 && (d2.__E = d2.__ = null);
        } catch (e11) {
          if (t10.__v = null, l2 || null != a10) {
            for (t10.__u |= l2 ? 160 : 128; s10 && 8 === s10.nodeType && s10.nextSibling; ) s10 = s10.nextSibling;
            a10[a10.indexOf(s10)] = null, t10.__e = s10;
          } else t10.__e = r10.__e, t10.__k = r10.__k;
          ix.__e(e11, t10, r10);
        }
        else null == a10 && t10.__v === r10.__v ? (t10.__k = r10.__k, t10.__e = r10.__e) : t10.__e = function(e11, t11, r11, n11, i11, a11, o11, s11, l3) {
          var c3, u3, d3, p3, f3, h3, g3, m3 = r11.props, b3 = t11.props, y3 = t11.type;
          if ("svg" === y3 ? i11 = "http://www.w3.org/2000/svg" : "math" === y3 ? i11 = "http://www.w3.org/1998/Math/MathML" : i11 || (i11 = "http://www.w3.org/1999/xhtml"), null != a11) {
            for (c3 = 0; c3 < a11.length; c3++) if ((f3 = a11[c3]) && "setAttribute" in f3 == !!y3 && (y3 ? f3.localName === y3 : 3 === f3.nodeType)) {
              e11 = f3, a11[c3] = null;
              break;
            }
          }
          if (null == e11) {
            if (null === y3) return document.createTextNode(b3);
            e11 = document.createElementNS(i11, y3, b3.is && b3), s11 && (ix.__m && ix.__m(t11, a11), s11 = false), a11 = null;
          }
          if (null === y3) m3 === b3 || s11 && e11.data === b3 || (e11.data = b3);
          else {
            if (a11 = a11 && iv.call(e11.childNodes), m3 = r11.props || iO, !s11 && null != a11) for (m3 = {}, c3 = 0; c3 < e11.attributes.length; c3++) m3[(f3 = e11.attributes[c3]).name] = f3.value;
            for (c3 in m3) if (f3 = m3[c3], "children" == c3) ;
            else if ("dangerouslySetInnerHTML" == c3) d3 = f3;
            else if (!(c3 in b3)) {
              if ("value" == c3 && "defaultValue" in b3 || "checked" == c3 && "defaultChecked" in b3) continue;
              iB(e11, c3, null, f3, i11);
            }
            for (c3 in b3) f3 = b3[c3], "children" == c3 ? p3 = f3 : "dangerouslySetInnerHTML" == c3 ? u3 = f3 : "value" == c3 ? h3 = f3 : "checked" == c3 ? g3 = f3 : s11 && "function" != typeof f3 || m3[c3] === f3 || iB(e11, c3, f3, m3[c3], i11);
            if (u3) s11 || d3 && (u3.__html === d3.__html || u3.__html === e11.innerHTML) || (e11.innerHTML = u3.__html), t11.__k = [];
            else if (d3 && (e11.innerHTML = ""), iF(e11, i$(p3) ? p3 : [p3], t11, r11, n11, "foreignObject" === y3 ? "http://www.w3.org/1999/xhtml" : i11, a11, o11, a11 ? a11[0] : r11.__k && iH(r11, 0), s11, l3), null != a11) for (c3 = a11.length; c3--; ) iU(a11[c3]);
            s11 || (c3 = "value", "progress" === y3 && null == h3 ? e11.removeAttribute("value") : void 0 === h3 || h3 === e11[c3] && ("progress" !== y3 || h3) && ("option" !== y3 || h3 === m3[c3]) || iB(e11, c3, h3, m3[c3], i11), c3 = "checked", void 0 !== g3 && g3 !== e11[c3] && iB(e11, c3, g3, m3[c3], i11));
          }
          return e11;
        }(r10.__e, t10, r10, n10, i10, a10, o10, l2, c2);
        (u2 = ix.diffed) && u2(t10);
      }
      function iz(e10, t10, r10) {
        try {
          if ("function" == typeof e10) {
            var n10 = "function" == typeof e10.__u;
            n10 && e10.__u(), n10 && null == t10 || (e10.__u = e10(t10));
          } else e10.current = t10;
        } catch (e11) {
          ix.__e(e11, r10);
        }
      }
      function iG(e10, t10, r10) {
        return this.constructor(e10, r10);
      }
      iv = iI.slice, ix = { __e: function(e10, t10, r10, n10) {
        for (var i10, a10, o10; t10 = t10.__; ) if ((i10 = t10.__c) && !i10.__) try {
          if ((a10 = i10.constructor) && null != a10.getDerivedStateFromError && (i10.setState(a10.getDerivedStateFromError(e10)), o10 = i10.__d), null != i10.componentDidCatch && (i10.componentDidCatch(e10, n10 || {}), o10 = i10.__d), o10) return i10.__E = i10;
        } catch (t11) {
          e10 = t11;
        }
        throw e10;
      } }, iE = 0, iL.prototype.setState = function(e10, t10) {
        var r10;
        r10 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = iD({}, this.state), "function" == typeof e10 && (e10 = e10(iD({}, r10), this.props)), e10 && iD(r10, e10), null != e10 && this.__v && (t10 && this._sb.push(t10), iq(this));
      }, iL.prototype.forceUpdate = function(e10) {
        this.__v && (this.__e = true, e10 && this.__h.push(e10), iq(this));
      }, iL.prototype.render = iM, iS = [], iA = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, iP = function(e10, t10) {
        return e10.__v.__b - t10.__v.__b;
      }, iV.__r = 0, iT = 0, iR = iK(false), iC = iK(true);
      var iX = /[\s\n\\/='"\0<>]/, iQ = /^(xlink|xmlns|xml)([A-Z])/, iY = /^accessK|^auto[A-Z]|^cell|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z]/, iZ = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, i0 = /* @__PURE__ */ new Set(["draggable", "spellcheck"]), i1 = /["&<]/;
      function i2(e10) {
        if (0 === e10.length || false === i1.test(e10)) return e10;
        for (var t10 = 0, r10 = 0, n10 = "", i10 = ""; r10 < e10.length; r10++) {
          switch (e10.charCodeAt(r10)) {
            case 34:
              i10 = "&quot;";
              break;
            case 38:
              i10 = "&amp;";
              break;
            case 60:
              i10 = "&lt;";
              break;
            default:
              continue;
          }
          r10 !== t10 && (n10 += e10.slice(t10, r10)), n10 += i10, t10 = r10 + 1;
        }
        return r10 !== t10 && (n10 += e10.slice(t10, r10)), n10;
      }
      var i5 = {}, i6 = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]), i3 = /[A-Z]/g;
      function i8() {
        this.__d = true;
      }
      function i4(e10, t10, r10) {
        if (!e10.s) {
          if (r10 instanceof ar) {
            if (!r10.s) return void (r10.o = i4.bind(null, e10, t10));
            1 & t10 && (t10 = r10.s), r10 = r10.v;
          }
          if (r10 && r10.then) return void r10.then(i4.bind(null, e10, t10), i4.bind(null, e10, 2));
          e10.s = t10, e10.v = r10;
          let n10 = e10.o;
          n10 && n10(e10);
        }
      }
      var i9, i7, ae, at, ar = function() {
        function e10() {
        }
        return e10.prototype.then = function(t10, r10) {
          var n10 = new e10(), i10 = this.s;
          if (i10) {
            var a10 = 1 & i10 ? t10 : r10;
            if (a10) {
              try {
                i4(n10, 1, a10(this.v));
              } catch (e11) {
                i4(n10, 2, e11);
              }
              return n10;
            }
            return this;
          }
          return this.o = function(e11) {
            try {
              var i11 = e11.v;
              1 & e11.s ? i4(n10, 1, t10 ? t10(i11) : i11) : r10 ? i4(n10, 1, r10(i11)) : i4(n10, 2, i11);
            } catch (e12) {
              i4(n10, 2, e12);
            }
          }, n10;
        }, e10;
      }(), an = {}, ai = [], aa = Array.isArray, ao = Object.assign;
      function as(e10, t10) {
        var r10, n10 = e10.type, i10 = true;
        return e10.__c ? (i10 = false, (r10 = e10.__c).state = r10.__s) : r10 = new n10(e10.props, t10), e10.__c = r10, r10.__v = e10, r10.props = e10.props, r10.context = t10, r10.__d = true, null == r10.state && (r10.state = an), null == r10.__s && (r10.__s = r10.state), n10.getDerivedStateFromProps ? r10.state = ao({}, r10.state, n10.getDerivedStateFromProps(r10.props, r10.state)) : i10 && r10.componentWillMount ? (r10.componentWillMount(), r10.state = r10.__s !== r10.state ? r10.__s : r10.state) : !i10 && r10.componentWillUpdate && r10.componentWillUpdate(), ae && ae(e10), r10.render(r10.props, r10.state, t10);
      }
      var al = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]), ac = 0;
      function au(e10, t10, r10, n10, i10, a10) {
        t10 || (t10 = {});
        var o10, s10, l2 = t10;
        "ref" in t10 && (o10 = t10.ref, delete t10.ref);
        var c2 = { type: e10, props: l2, key: r10, ref: o10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --ac, __i: -1, __u: 0, __source: i10, __self: a10 };
        if ("function" == typeof e10 && (o10 = e10.defaultProps)) for (s10 in o10) void 0 === l2[s10] && (l2[s10] = o10[s10]);
        return ix.vnode && ix.vnode(c2), c2;
      }
      async function ad(e10, t10) {
        let r10 = window.SimpleWebAuthnBrowser;
        async function n10(r11) {
          let n11 = new URL(`${e10}/webauthn-options/${t10}`);
          r11 && n11.searchParams.append("action", r11), a10().forEach((e11) => {
            n11.searchParams.append(e11.name, e11.value);
          });
          let i11 = await fetch(n11);
          return i11.ok ? i11.json() : void console.error("Failed to fetch options", i11);
        }
        function i10() {
          let e11 = `#${t10}-form`, r11 = document.querySelector(e11);
          if (!r11) throw Error(`Form '${e11}' not found`);
          return r11;
        }
        function a10() {
          return Array.from(i10().querySelectorAll("input[data-form-field]"));
        }
        async function o10(e11, t11) {
          let r11 = i10();
          if (e11) {
            let t12 = document.createElement("input");
            t12.type = "hidden", t12.name = "action", t12.value = e11, r11.appendChild(t12);
          }
          if (t11) {
            let e12 = document.createElement("input");
            e12.type = "hidden", e12.name = "data", e12.value = JSON.stringify(t11), r11.appendChild(e12);
          }
          return r11.submit();
        }
        async function s10(e11, t11) {
          let n11 = await r10.startAuthentication(e11, t11);
          return await o10("authenticate", n11);
        }
        async function l2(e11) {
          a10().forEach((e12) => {
            if (e12.required && !e12.value) throw Error(`Missing required field: ${e12.name}`);
          });
          let t11 = await r10.startRegistration(e11);
          return await o10("register", t11);
        }
        async function c2() {
          if (!r10.browserSupportsWebAuthnAutofill()) return;
          let e11 = await n10("authenticate");
          if (!e11) return void console.error("Failed to fetch option for autofill authentication");
          try {
            await s10(e11.options, true);
          } catch (e12) {
            console.error(e12);
          }
        }
        (async function() {
          let e11 = i10();
          if (!r10.browserSupportsWebAuthn()) {
            e11.style.display = "none";
            return;
          }
          e11 && e11.addEventListener("submit", async (e12) => {
            e12.preventDefault();
            let t11 = await n10(void 0);
            if (!t11) return void console.error("Failed to fetch options for form submission");
            if ("authenticate" === t11.action) try {
              await s10(t11.options, false);
            } catch (e13) {
              console.error(e13);
            }
            else if ("register" === t11.action) try {
              await l2(t11.options);
            } catch (e13) {
              console.error(e13);
            }
          });
        })(), c2();
      }
      let ap = { default: "Unable to sign in.", Signin: "Try signing in with a different account.", OAuthSignin: "Try signing in with a different account.", OAuthCallbackError: "Try signing in with a different account.", OAuthCreateAccount: "Try signing in with a different account.", EmailCreateAccount: "Try signing in with a different account.", Callback: "Try signing in with a different account.", OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.", EmailSignin: "The e-mail could not be sent.", CredentialsSignin: "Sign in failed. Check the details you provided are correct.", SessionRequired: "Please sign in to access this page." }, af = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
  --provider-bg: #fff;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #fff
  );
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
  --provider-bg: #161b22;
  --provider-bg-hover: color-mix(
    in srgb,
    var(--provider-brand-color) 30%,
    #000
  );
}

.__next-auth-theme-dark img[src$="42-school.svg"],
  .__next-auth-theme-dark img[src$="apple.svg"],
  .__next-auth-theme-dark img[src$="boxyhq-saml.svg"],
  .__next-auth-theme-dark img[src$="eveonline.svg"],
  .__next-auth-theme-dark img[src$="github.svg"],
  .__next-auth-theme-dark img[src$="mailchimp.svg"],
  .__next-auth-theme-dark img[src$="medium.svg"],
  .__next-auth-theme-dark img[src$="okta.svg"],
  .__next-auth-theme-dark img[src$="patreon.svg"],
  .__next-auth-theme-dark img[src$="ping-id.svg"],
  .__next-auth-theme-dark img[src$="roblox.svg"],
  .__next-auth-theme-dark img[src$="threads.svg"],
  .__next-auth-theme-dark img[src$="wikimedia.svg"] {
    filter: invert(1);
  }

.__next-auth-theme-dark #submitButton {
    background-color: var(--provider-bg, var(--color-info));
  }

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
    --provider-bg: #161b22;
    --provider-bg-hover: color-mix(
      in srgb,
      var(--provider-brand-color) 30%,
      #000
    );
  }
    .__next-auth-theme-auto img[src$="42-school.svg"],
    .__next-auth-theme-auto img[src$="apple.svg"],
    .__next-auth-theme-auto img[src$="boxyhq-saml.svg"],
    .__next-auth-theme-auto img[src$="eveonline.svg"],
    .__next-auth-theme-auto img[src$="github.svg"],
    .__next-auth-theme-auto img[src$="mailchimp.svg"],
    .__next-auth-theme-auto img[src$="medium.svg"],
    .__next-auth-theme-auto img[src$="okta.svg"],
    .__next-auth-theme-auto img[src$="patreon.svg"],
    .__next-auth-theme-auto img[src$="ping-id.svg"],
    .__next-auth-theme-auto img[src$="roblox.svg"],
    .__next-auth-theme-auto img[src$="threads.svg"],
    .__next-auth-theme-auto img[src$="wikimedia.svg"] {
      filter: invert(1);
    }
    .__next-auth-theme-auto #submitButton {
      background-color: var(--provider-bg, var(--color-info));
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: var(--provider-bg);
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;
      function ah({ html: e10, title: t10, status: r10, cookies: n10, theme: i10, headTags: a10 }) {
        return { cookies: n10, status: r10, headers: { "Content-Type": "text/html" }, body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${af}</style><title>${t10}</title>${a10 ?? ""}</head><body class="__next-auth-theme-${i10?.colorScheme ?? "auto"}"><div class="page">${function(e11, t11, r11) {
          var n11 = ix.__s;
          ix.__s = true, i9 = ix.__b, i7 = ix.diffed, ae = ix.__r, at = ix.unmount;
          var i11 = function(e12, t12, r12) {
            var n12, i12, a12, o10 = {};
            for (a12 in t12) "key" == a12 ? n12 = t12[a12] : "ref" == a12 ? i12 = t12[a12] : o10[a12] = t12[a12];
            if (arguments.length > 2 && (o10.children = arguments.length > 3 ? iv.call(arguments, 2) : r12), "function" == typeof e12 && null != e12.defaultProps) for (a12 in e12.defaultProps) void 0 === o10[a12] && (o10[a12] = e12.defaultProps[a12]);
            return ij(e12, o10, n12, i12, null);
          }(iM, null);
          i11.__k = [e11];
          try {
            var a11 = function e12(t12, r12, n12, i12, a12, o10, s10) {
              if (null == t12 || true === t12 || false === t12 || "" === t12) return "";
              var l2 = typeof t12;
              if ("object" != l2) return "function" == l2 ? "" : "string" == l2 ? i2(t12) : t12 + "";
              if (aa(t12)) {
                var c2, u2 = "";
                a12.__k = t12;
                for (var d2 = 0; d2 < t12.length; d2++) {
                  var p2 = t12[d2];
                  if (null != p2 && "boolean" != typeof p2) {
                    var f2, h2 = e12(p2, r12, n12, i12, a12, o10, s10);
                    "string" == typeof h2 ? u2 += h2 : (c2 || (c2 = []), u2 && c2.push(u2), u2 = "", aa(h2) ? (f2 = c2).push.apply(f2, h2) : c2.push(h2));
                  }
                }
                return c2 ? (u2 && c2.push(u2), c2) : u2;
              }
              if (void 0 !== t12.constructor) return "";
              t12.__ = a12, i9 && i9(t12);
              var g2 = t12.type, m2 = t12.props;
              if ("function" == typeof g2) {
                var b2, y2, w2, _2 = r12;
                if (g2 === iM) {
                  if ("tpl" in m2) {
                    for (var v2 = "", x2 = 0; x2 < m2.tpl.length; x2++) if (v2 += m2.tpl[x2], m2.exprs && x2 < m2.exprs.length) {
                      var E2 = m2.exprs[x2];
                      if (null == E2) continue;
                      "object" == typeof E2 && (void 0 === E2.constructor || aa(E2)) ? v2 += e12(E2, r12, n12, i12, t12, o10, s10) : v2 += E2;
                    }
                    return v2;
                  }
                  if ("UNSTABLE_comment" in m2) return "<!--" + i2(m2.UNSTABLE_comment) + "-->";
                  y2 = m2.children;
                } else {
                  if (null != (b2 = g2.contextType)) {
                    var S2 = r12[b2.__c];
                    _2 = S2 ? S2.props.value : b2.__;
                  }
                  var k2 = g2.prototype && "function" == typeof g2.prototype.render;
                  if (k2) y2 = as(t12, _2), w2 = t12.__c;
                  else {
                    t12.__c = w2 = { __v: t12, context: _2, props: t12.props, setState: i8, forceUpdate: i8, __d: true, __h: [] };
                    for (var A2 = 0; w2.__d && A2++ < 25; ) w2.__d = false, ae && ae(t12), y2 = g2.call(w2, m2, _2);
                    w2.__d = true;
                  }
                  if (null != w2.getChildContext && (r12 = ao({}, r12, w2.getChildContext())), k2 && ix.errorBoundaries && (g2.getDerivedStateFromError || w2.componentDidCatch)) {
                    y2 = null != y2 && y2.type === iM && null == y2.key && null == y2.props.tpl ? y2.props.children : y2;
                    try {
                      return e12(y2, r12, n12, i12, t12, o10, s10);
                    } catch (a13) {
                      return g2.getDerivedStateFromError && (w2.__s = g2.getDerivedStateFromError(a13)), w2.componentDidCatch && w2.componentDidCatch(a13, an), w2.__d ? (y2 = as(t12, r12), null != (w2 = t12.__c).getChildContext && (r12 = ao({}, r12, w2.getChildContext())), e12(y2 = null != y2 && y2.type === iM && null == y2.key && null == y2.props.tpl ? y2.props.children : y2, r12, n12, i12, t12, o10, s10)) : "";
                    } finally {
                      i7 && i7(t12), t12.__ = null, at && at(t12);
                    }
                  }
                }
                y2 = null != y2 && y2.type === iM && null == y2.key && null == y2.props.tpl ? y2.props.children : y2;
                try {
                  var P2 = e12(y2, r12, n12, i12, t12, o10, s10);
                  return i7 && i7(t12), t12.__ = null, ix.unmount && ix.unmount(t12), P2;
                } catch (a13) {
                  if (!o10 && s10 && s10.onError) {
                    var T2 = s10.onError(a13, t12, function(a14) {
                      return e12(a14, r12, n12, i12, t12, o10, s10);
                    });
                    if (void 0 !== T2) return T2;
                    var R2 = ix.__e;
                    return R2 && R2(a13, t12), "";
                  }
                  if (!o10 || !a13 || "function" != typeof a13.then) throw a13;
                  return a13.then(function a14() {
                    try {
                      return e12(y2, r12, n12, i12, t12, o10, s10);
                    } catch (l3) {
                      if (!l3 || "function" != typeof l3.then) throw l3;
                      return l3.then(function() {
                        return e12(y2, r12, n12, i12, t12, o10, s10);
                      }, a14);
                    }
                  });
                }
              }
              var C2, O2 = "<" + g2, I2 = "";
              for (var N2 in m2) {
                var $2 = m2[N2];
                if ("function" != typeof $2 || "class" === N2 || "className" === N2) {
                  switch (N2) {
                    case "children":
                      C2 = $2;
                      continue;
                    case "key":
                    case "ref":
                    case "__self":
                    case "__source":
                      continue;
                    case "htmlFor":
                      if ("for" in m2) continue;
                      N2 = "for";
                      break;
                    case "className":
                      if ("class" in m2) continue;
                      N2 = "class";
                      break;
                    case "defaultChecked":
                      N2 = "checked";
                      break;
                    case "defaultSelected":
                      N2 = "selected";
                      break;
                    case "defaultValue":
                    case "value":
                      switch (N2 = "value", g2) {
                        case "textarea":
                          C2 = $2;
                          continue;
                        case "select":
                          i12 = $2;
                          continue;
                        case "option":
                          i12 != $2 || "selected" in m2 || (O2 += " selected");
                      }
                      break;
                    case "dangerouslySetInnerHTML":
                      I2 = $2 && $2.__html;
                      continue;
                    case "style":
                      "object" == typeof $2 && ($2 = function(e13) {
                        var t13 = "";
                        for (var r13 in e13) {
                          var n13 = e13[r13];
                          if (null != n13 && "" !== n13) {
                            var i13 = "-" == r13[0] ? r13 : i5[r13] || (i5[r13] = r13.replace(i3, "-$&").toLowerCase()), a13 = ";";
                            "number" != typeof n13 || i13.startsWith("--") || i6.has(i13) || (a13 = "px;"), t13 = t13 + i13 + ":" + n13 + a13;
                          }
                        }
                        return t13 || void 0;
                      }($2));
                      break;
                    case "acceptCharset":
                      N2 = "accept-charset";
                      break;
                    case "httpEquiv":
                      N2 = "http-equiv";
                      break;
                    default:
                      if (iQ.test(N2)) N2 = N2.replace(iQ, "$1:$2").toLowerCase();
                      else {
                        if (iX.test(N2)) continue;
                        ("-" === N2[4] || i0.has(N2)) && null != $2 ? $2 += "" : n12 ? iZ.test(N2) && (N2 = "panose1" === N2 ? "panose-1" : N2.replace(/([A-Z])/g, "-$1").toLowerCase()) : iY.test(N2) && (N2 = N2.toLowerCase());
                      }
                  }
                  null != $2 && false !== $2 && (O2 = true === $2 || "" === $2 ? O2 + " " + N2 : O2 + " " + N2 + '="' + ("string" == typeof $2 ? i2($2) : $2 + "") + '"');
                }
              }
              if (iX.test(g2)) throw Error(g2 + " is not a valid HTML tag name in " + O2 + ">");
              if (I2 || ("string" == typeof C2 ? I2 = i2(C2) : null != C2 && false !== C2 && true !== C2 && (I2 = e12(C2, r12, "svg" === g2 || "foreignObject" !== g2 && n12, i12, t12, o10, s10))), i7 && i7(t12), t12.__ = null, at && at(t12), !I2 && al.has(g2)) return O2 + "/>";
              var D2 = "</" + g2 + ">", U2 = O2 + ">";
              return aa(I2) ? [U2].concat(I2, [D2]) : "string" != typeof I2 ? [U2, I2, D2] : U2 + I2 + D2;
            }(e11, an, false, void 0, i11, false, void 0);
            return aa(a11) ? a11.join("") : a11;
          } catch (e12) {
            if (e12.then) throw Error('Use "renderToStringAsync" for suspenseful rendering.');
            throw e12;
          } finally {
            ix.__c && ix.__c(e11, ai), ix.__s = n11, ai.length = 0;
          }
        }(e10)}</div></body></html>` };
      }
      function ag(e10) {
        let { url: t10, theme: r10, query: n10, cookies: i10, pages: a10, providers: o10 } = e10;
        return { csrf: (e11, t11, r11) => e11 ? (t11.logger.warn("csrf-disabled"), r11.push({ name: t11.cookies.csrfToken.name, value: "", options: { ...t11.cookies.csrfToken.options, maxAge: 0 } }), { status: 404, cookies: r11 }) : { headers: { "Content-Type": "application/json", "Cache-Control": "private, no-cache, no-store", Expires: "0", Pragma: "no-cache" }, body: { csrfToken: t11.csrfToken }, cookies: r11 }, providers: (e11) => ({ headers: { "Content-Type": "application/json" }, body: e11.reduce((e12, { id: t11, name: r11, type: n11, signinUrl: i11, callbackUrl: a11 }) => (e12[t11] = { id: t11, name: r11, type: n11, signinUrl: i11, callbackUrl: a11 }, e12), {}) }), signin(t11, s10) {
          if (t11) throw new tS("Unsupported action");
          if (a10?.signIn) {
            let t12 = `${a10.signIn}${a10.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: e10.callbackUrl ?? "/" })}`;
            return s10 && (t12 = `${t12}&${new URLSearchParams({ error: s10 })}`), { redirect: t12, cookies: i10 };
          }
          let l2 = o10?.find((e11) => "webauthn" === e11.type && e11.enableConditionalUI && !!e11.simpleWebAuthnBrowserVersion), c2 = "";
          if (l2) {
            let { simpleWebAuthnBrowserVersion: e11 } = l2;
            c2 = `<script src="https://unpkg.com/@simplewebauthn/browser@${e11}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
          }
          return ah({ cookies: i10, theme: r10, html: function(e11) {
            let { csrfToken: t12, providers: r11 = [], callbackUrl: n11, theme: i11, email: a11, error: o11 } = e11;
            "u" > typeof document && i11?.brandColor && document.documentElement.style.setProperty("--brand-color", i11.brandColor), "u" > typeof document && i11?.buttonText && document.documentElement.style.setProperty("--button-text-color", i11.buttonText);
            let s11 = o11 && (ap[o11] ?? ap.default), l3 = r11.find((e12) => "webauthn" === e12.type && e12.enableConditionalUI)?.id;
            return au("div", { className: "signin", children: [i11?.brandColor && au("style", { dangerouslySetInnerHTML: { __html: `:root {--brand-color: ${i11.brandColor}}` } }), i11?.buttonText && au("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${i11.buttonText}
        }
      ` } }), au("div", { className: "card", children: [s11 && au("div", { className: "error", children: au("p", { children: s11 }) }), i11?.logo && au("img", { src: i11.logo, alt: "Logo", className: "logo" }), r11.map((e12, i12) => {
              let o12, s12, l4;
              ("oauth" === e12.type || "oidc" === e12.type) && ({ bg: o12 = "#fff", brandColor: s12, logo: l4 = `https://authjs.dev/img/providers/${e12.id}.svg` } = e12.style ?? {});
              let c3 = s12 ?? o12 ?? "#fff";
              return au("div", { className: "provider", children: ["oauth" === e12.type || "oidc" === e12.type ? au("form", { action: e12.signinUrl, method: "POST", children: [au("input", { type: "hidden", name: "csrfToken", value: t12 }), n11 && au("input", { type: "hidden", name: "callbackUrl", value: n11 }), au("button", { type: "submit", className: "button", style: { "--provider-brand-color": c3 }, tabIndex: 0, children: [au("span", { style: { filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)", "mix-blend-mode": "luminosity", opacity: 0.95 }, children: ["Sign in with ", e12.name] }), l4 && au("img", { loading: "lazy", height: 24, src: l4 })] })] }) : null, ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && i12 > 0 && "email" !== r11[i12 - 1].type && "credentials" !== r11[i12 - 1].type && "webauthn" !== r11[i12 - 1].type && au("hr", {}), "email" === e12.type && au("form", { action: e12.signinUrl, method: "POST", children: [au("input", { type: "hidden", name: "csrfToken", value: t12 }), au("label", { className: "section-header", htmlFor: `input-email-for-${e12.id}-provider`, children: "Email" }), au("input", { id: `input-email-for-${e12.id}-provider`, autoFocus: true, type: "email", name: "email", value: a11, placeholder: "email@example.com", required: true }), au("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "credentials" === e12.type && au("form", { action: e12.callbackUrl, method: "POST", children: [au("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.credentials).map((t13) => au("div", { children: [au("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.credentials[t13].label ?? t13 }), au("input", { name: t13, id: `input-${t13}-for-${e12.id}-provider`, type: e12.credentials[t13].type ?? "text", placeholder: e12.credentials[t13].placeholder ?? "", ...e12.credentials[t13] })] }, `input-group-${e12.id}`)), au("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "webauthn" === e12.type && au("form", { action: e12.callbackUrl, method: "POST", id: `${e12.id}-form`, children: [au("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.formFields).map((t13) => au("div", { children: [au("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.formFields[t13].label ?? t13 }), au("input", { name: t13, "data-form-field": true, id: `input-${t13}-for-${e12.id}-provider`, type: e12.formFields[t13].type ?? "text", placeholder: e12.formFields[t13].placeholder ?? "", ...e12.formFields[t13] })] }, `input-group-${e12.id}`)), au("button", { id: `submitButton-${e12.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && i12 + 1 < r11.length && au("hr", {})] }, e12.id);
            })] }), l3 && au(iM, { children: au("script", { dangerouslySetInnerHTML: { __html: `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${ad})(authURL, "${l3}");
` } }) })] });
          }({ csrfToken: e10.csrfToken, providers: e10.providers?.filter((e11) => ["email", "oauth", "oidc"].includes(e11.type) || "credentials" === e11.type && e11.credentials || "webauthn" === e11.type && e11.formFields || false), callbackUrl: e10.callbackUrl, theme: e10.theme, error: s10, ...n10 }), title: "Sign In", headTags: c2 });
        }, signout: () => a10?.signOut ? { redirect: a10.signOut, cookies: i10 } : ah({ cookies: i10, theme: r10, html: function(e11) {
          let { url: t11, csrfToken: r11, theme: n11 } = e11;
          return au("div", { className: "signout", children: [n11?.brandColor && au("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${n11.brandColor}
        }
      ` } }), n11?.buttonText && au("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${n11.buttonText}
        }
      ` } }), au("div", { className: "card", children: [n11?.logo && au("img", { src: n11.logo, alt: "Logo", className: "logo" }), au("h1", { children: "Signout" }), au("p", { children: "Are you sure you want to sign out?" }), au("form", { action: t11?.toString(), method: "POST", children: [au("input", { type: "hidden", name: "csrfToken", value: r11 }), au("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] });
        }({ csrfToken: e10.csrfToken, url: t10, theme: r10 }), title: "Sign Out" }), verifyRequest: (e11) => a10?.verifyRequest ? { redirect: `${a10.verifyRequest}${t10?.search ?? ""}`, cookies: i10 } : ah({ cookies: i10, theme: r10, html: function(e12) {
          let { url: t11, theme: r11 } = e12;
          return au("div", { className: "verify-request", children: [r11.brandColor && au("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${r11.brandColor}
        }
      ` } }), au("div", { className: "card", children: [r11.logo && au("img", { src: r11.logo, alt: "Logo", className: "logo" }), au("h1", { children: "Check your email" }), au("p", { children: "A sign in link has been sent to your email address." }), au("p", { children: au("a", { className: "site", href: t11.origin, children: t11.host }) })] })] });
        }({ url: t10, theme: r10, ...e11 }), title: "Verify Request" }), error: (e11) => a10?.error ? { redirect: `${a10.error}${a10.error.includes("?") ? "&" : "?"}error=${e11}`, cookies: i10 } : ah({ cookies: i10, theme: r10, ...function(e12) {
          let { url: t11, error: r11 = "default", theme: n11 } = e12, i11 = `${t11}/signin`, a11 = { default: { status: 200, heading: "Error", message: au("p", { children: au("a", { className: "site", href: t11?.origin, children: t11?.host }) }) }, Configuration: { status: 500, heading: "Server error", message: au("div", { children: [au("p", { children: "There is a problem with the server configuration." }), au("p", { children: "Check the server logs for more information." })] }) }, AccessDenied: { status: 403, heading: "Access Denied", message: au("div", { children: [au("p", { children: "You do not have permission to sign in." }), au("p", { children: au("a", { className: "button", href: i11, children: "Sign in" }) })] }) }, Verification: { status: 403, heading: "Unable to sign in", message: au("div", { children: [au("p", { children: "The sign in link is no longer valid." }), au("p", { children: "It may have been used already or it may have expired." })] }), signin: au("a", { className: "button", href: i11, children: "Sign in" }) } }, { status: o11, heading: s10, message: l2, signin: c2 } = a11[r11] ?? a11.default;
          return { status: o11, html: au("div", { className: "error", children: [n11?.brandColor && au("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${n11?.brandColor}
        }
      ` } }), au("div", { className: "card", children: [n11?.logo && au("img", { src: n11?.logo, alt: "Logo", className: "logo" }), au("h1", { children: s10 }), au("div", { className: "message", children: l2 }), c2] })] }) };
        }({ url: t10, theme: r10, error: e11 }), title: "Error" }) };
      }
      function am(e10, t10 = Date.now()) {
        return new Date(t10 + 1e3 * e10);
      }
      async function ab(e10, t10, r10, n10) {
        if (!r10?.providerAccountId || !r10.type) throw Error("Missing or invalid provider account");
        if (!["email", "oauth", "oidc", "webauthn"].includes(r10.type)) throw Error("Provider not supported");
        let { adapter: i10, jwt: a10, events: o10, session: { strategy: s10, generateSessionToken: l2 } } = n10;
        if (!i10) return { user: t10, account: r10 };
        let c2 = r10, { createUser: u2, updateUser: d2, getUser: p2, getUserByAccount: f2, getUserByEmail: h2, linkAccount: g2, createSession: m2, getSessionAndUser: b2, deleteSession: y2 } = i10, w2 = null, _2 = null, v2 = false, x2 = "jwt" === s10;
        if (e10) if (x2) try {
          let t11 = n10.cookies.sessionToken.name;
          (w2 = await a10.decode({ ...a10, token: e10, salt: t11 })) && "sub" in w2 && w2.sub && (_2 = await p2(w2.sub));
        } catch {
        }
        else {
          let t11 = await b2(e10);
          t11 && (w2 = t11.session, _2 = t11.user);
        }
        if ("email" === c2.type) {
          let r11 = await h2(t10.email);
          return r11 ? (_2?.id !== r11.id && !x2 && e10 && await y2(e10), _2 = await d2({ id: r11.id, emailVerified: /* @__PURE__ */ new Date() }), await o10.updateUser?.({ user: _2 })) : (_2 = await u2({ ...t10, emailVerified: /* @__PURE__ */ new Date() }), await o10.createUser?.({ user: _2 }), v2 = true), { session: w2 = x2 ? {} : await m2({ sessionToken: l2(), userId: _2.id, expires: am(n10.session.maxAge) }), user: _2, isNewUser: v2 };
        }
        if ("webauthn" === c2.type) {
          let e11 = await f2({ providerAccountId: c2.providerAccountId, provider: c2.provider });
          if (e11) {
            if (_2) {
              if (e11.id === _2.id) {
                let e12 = { ...c2, userId: _2.id };
                return { session: w2, user: _2, isNewUser: v2, account: e12 };
              }
              throw new t$("The account is already associated with another user", { provider: c2.provider });
            }
            w2 = x2 ? {} : await m2({ sessionToken: l2(), userId: e11.id, expires: am(n10.session.maxAge) });
            let t11 = { ...c2, userId: e11.id };
            return { session: w2, user: e11, isNewUser: v2, account: t11 };
          }
          {
            if (_2) {
              await g2({ ...c2, userId: _2.id }), await o10.linkAccount?.({ user: _2, account: c2, profile: t10 });
              let e13 = { ...c2, userId: _2.id };
              return { session: w2, user: _2, isNewUser: v2, account: e13 };
            }
            if (t10.email ? await h2(t10.email) : null) throw new t$("Another account already exists with the same e-mail address", { provider: c2.provider });
            _2 = await u2({ ...t10 }), await o10.createUser?.({ user: _2 }), await g2({ ...c2, userId: _2.id }), await o10.linkAccount?.({ user: _2, account: c2, profile: t10 }), w2 = x2 ? {} : await m2({ sessionToken: l2(), userId: _2.id, expires: am(n10.session.maxAge) });
            let e12 = { ...c2, userId: _2.id };
            return { session: w2, user: _2, isNewUser: true, account: e12 };
          }
        }
        let E2 = await f2({ providerAccountId: c2.providerAccountId, provider: c2.provider });
        if (E2) {
          if (_2) {
            if (E2.id === _2.id) return { session: w2, user: _2, isNewUser: v2 };
            throw new tw("The account is already associated with another user", { provider: c2.provider });
          }
          return { session: w2 = x2 ? {} : await m2({ sessionToken: l2(), userId: E2.id, expires: am(n10.session.maxAge) }), user: E2, isNewUser: v2 };
        }
        {
          let { provider: e11 } = n10, { type: r11, provider: i11, providerAccountId: a11, userId: s11, ...d3 } = c2;
          if (c2 = Object.assign(e11.account(d3) ?? {}, { providerAccountId: a11, provider: i11, type: r11, userId: s11 }), _2) return await g2({ ...c2, userId: _2.id }), await o10.linkAccount?.({ user: _2, account: c2, profile: t10 }), { session: w2, user: _2, isNewUser: v2 };
          let p3 = t10.email ? await h2(t10.email) : null;
          if (p3) {
            let e12 = n10.provider;
            if (e12?.allowDangerousEmailAccountLinking) _2 = p3, v2 = false;
            else throw new tw("Another account already exists with the same e-mail address", { provider: c2.provider });
          } else _2 = await u2({ ...t10, emailVerified: null }), v2 = true;
          return await o10.createUser?.({ user: _2 }), await g2({ ...c2, userId: _2.id }), await o10.linkAccount?.({ user: _2, account: c2, profile: t10 }), { session: w2 = x2 ? {} : await m2({ sessionToken: l2(), userId: _2.id, expires: am(n10.session.maxAge) }), user: _2, isNewUser: v2 };
        }
      }
      function ay(e10, t10) {
        if (null == e10) return false;
        try {
          return e10 instanceof t10 || Object.getPrototypeOf(e10)[Symbol.toStringTag] === t10.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      ("u" < typeof navigator || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (n = "oauth4webapi/v3.8.5");
      let aw = "ERR_INVALID_ARG_VALUE", a_ = "ERR_INVALID_ARG_TYPE";
      function av(e10, t10, r10) {
        let n10 = TypeError(e10, { cause: r10 });
        return Object.assign(n10, { code: t10 }), n10;
      }
      let ax = Symbol(), aE = Symbol(), aS = Symbol(), ak = Symbol(), aA = Symbol(), aP = Symbol();
      Symbol();
      let aT = new TextEncoder(), aR = new TextDecoder();
      function aC(e10) {
        return "string" == typeof e10 ? aT.encode(e10) : aR.decode(e10);
      }
      function aO(e10) {
        return "string" == typeof e10 ? a(e10) : i(e10);
      }
      i = Uint8Array.prototype.toBase64 ? (e10) => (e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10)), e10.toBase64({ alphabet: "base64url", omitPadding: true })) : (e10) => {
        e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10));
        let t10 = [];
        for (let r10 = 0; r10 < e10.byteLength; r10 += 32768) t10.push(String.fromCharCode.apply(null, e10.subarray(r10, r10 + 32768)));
        return btoa(t10.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, a = Uint8Array.fromBase64 ? (e10) => {
        try {
          return Uint8Array.fromBase64(e10, { alphabet: "base64url" });
        } catch (e11) {
          throw av("The input to be decoded is not correctly encoded.", aw, e11);
        }
      } : (e10) => {
        try {
          let t10 = atob(e10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r10 = new Uint8Array(t10.length);
          for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
          return r10;
        } catch (e11) {
          throw av("The input to be decoded is not correctly encoded.", aw, e11);
        }
      };
      class aI extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = oN, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class aN extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, t10?.code && (this.code = t10?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function a$(e10, t10, r10) {
        return new aN(e10, { code: t10, cause: r10 });
      }
      function aD(e10) {
        return !(null === e10 || "object" != typeof e10 || Array.isArray(e10));
      }
      function aU(e10) {
        ay(e10, Headers) && (e10 = Object.fromEntries(e10.entries()));
        let t10 = new Headers(e10 ?? {});
        if (n && !t10.has("user-agent") && t10.set("user-agent", n), t10.has("authorization")) throw av('"options.headers" must not include the "authorization" header name', aw);
        return t10;
      }
      function aj(e10, t10) {
        if (void 0 !== t10) {
          if ("function" == typeof t10 && (t10 = t10(e10.href)), !(t10 instanceof AbortSignal)) throw av('"options.signal" must return or be an instance of AbortSignal', a_);
          return t10;
        }
      }
      function aM(e10) {
        return e10.includes("//") ? e10.replace("//", "/") : e10;
      }
      async function aL(e10, t10, r10, n10) {
        if (!(e10 instanceof URL)) throw av(`"${t10}" must be an instance of URL`, a_);
        a1(e10, n10?.[ax] !== true);
        let i10 = r10(new URL(e10.href)), a10 = aU(n10?.headers);
        return a10.set("accept", "application/json"), (n10?.[ak] || fetch)(i10.href, { body: void 0, headers: Object.fromEntries(a10.entries()), method: "GET", redirect: "manual", signal: aj(i10, n10?.signal) });
      }
      async function aH(e10, t10) {
        return aL(e10, "issuerIdentifier", (e11) => {
          switch (t10?.algorithm) {
            case void 0:
            case "oidc":
              e11.pathname = aM(`${e11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !function(e12, t11, r10 = false) {
                "/" === e12.pathname ? e12.pathname = t11 : e12.pathname = aM(`${t11}/${r10 ? e12.pathname : e12.pathname.replace(/(\/)$/, "")}`);
              }(e11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw av('"options.algorithm" must be "oidc" (default), or "oauth2"', aw);
          }
          return e11;
        }, t10);
      }
      function aq(e10, t10, r10, n10, i10) {
        try {
          if ("number" != typeof e10 || !Number.isFinite(e10)) throw av(`${r10} must be a number`, a_, i10);
          if (e10 > 0) return;
          if (t10) {
            if (0 !== e10) throw av(`${r10} must be a non-negative number`, aw, i10);
            return;
          }
          throw av(`${r10} must be a positive number`, aw, i10);
        } catch (e11) {
          if (n10) throw a$(e11.message, n10, i10);
          throw e11;
        }
      }
      function aV(e10, t10, r10, n10) {
        try {
          if ("string" != typeof e10) throw av(`${t10} must be a string`, a_, n10);
          if (0 === e10.length) throw av(`${t10} must not be empty`, aw, n10);
        } catch (e11) {
          if (r10) throw a$(e11.message, r10, n10);
          throw e11;
        }
      }
      async function aF(e10, t10) {
        if (!(e10 instanceof URL) && e10 !== o1) throw av('"expectedIssuerIdentifier" must be an instance of URL', a_);
        if (!ay(t10, Response)) throw av('"response" must be an instance of Response', a_);
        if (200 !== t10.status) throw a$('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', oL, t10);
        oJ(t10);
        let r10 = await o0(t10);
        if (aV(r10.issuer, '"response" body "issuer" property', oj, { body: r10 }), e10 !== o1 && new URL(r10.issuer).href !== e10.href) throw a$('"response" body "issuer" property does not match the expected value', oW, { expected: e10.href, body: r10, attribute: "issuer" });
        return r10;
      }
      function aW(e10) {
        var t10 = e10, r10 = "application/json";
        if (ol(t10) !== r10) throw function(e11, ...t11) {
          let r11 = '"response" content-type must be ';
          if (t11.length > 2) {
            let e12 = t11.pop();
            r11 += `${t11.join(", ")}, or ${e12}`;
          } else 2 === t11.length ? r11 += `${t11[0]} or ${t11[1]}` : r11 += t11[0];
          return a$(r11, oM, e11);
        }(t10, r10);
      }
      function aB() {
        return aO(crypto.getRandomValues(new Uint8Array(32)));
      }
      async function aK(e10) {
        return aV(e10, "codeVerifier"), aO(await crypto.subtle.digest("SHA-256", aC(e10)));
      }
      function aJ(e10) {
        let t10 = e10?.[aE];
        return "number" == typeof t10 && Number.isFinite(t10) ? t10 : 0;
      }
      function az(e10) {
        let t10 = e10?.[aS];
        return "number" == typeof t10 && Number.isFinite(t10) && -1 !== Math.sign(t10) ? t10 : 30;
      }
      function aG() {
        return Math.floor(Date.now() / 1e3);
      }
      function aX(e10) {
        if ("object" != typeof e10 || null === e10) throw av('"as" must be an object', a_);
        aV(e10.issuer, '"as.issuer"');
      }
      function aQ(e10) {
        if ("object" != typeof e10 || null === e10) throw av('"client" must be an object', a_);
        aV(e10.client_id, '"client.client_id"');
      }
      function aY(e10, t10) {
        let r10 = aG() + aJ(t10);
        return { jti: aB(), aud: e10.issuer, exp: r10 + 60, iat: r10, nbf: r10, iss: t10.client_id, sub: t10.client_id };
      }
      async function aZ(e10, t10, r10) {
        if (!r10.usages.includes("sign")) throw av('CryptoKey instances used for signing assertions must include "sign" in their "usages"', aw);
        let n10 = `${aO(aC(JSON.stringify(e10)))}.${aO(aC(JSON.stringify(t10)))}`, i10 = aO(await crypto.subtle.sign(function(e11) {
          switch (e11.algorithm.name) {
            case "ECDSA":
              return { name: e11.algorithm.name, hash: function(e12) {
                let { algorithm: t11 } = e12;
                switch (t11.namedCurve) {
                  case "P-256":
                    return "SHA-256";
                  case "P-384":
                    return "SHA-384";
                  case "P-521":
                    return "SHA-512";
                  default:
                    throw new aI("unsupported ECDSA namedCurve", { cause: e12 });
                }
              }(e11) };
            case "RSA-PSS":
              switch (oz(e11), e11.algorithm.hash.name) {
                case "SHA-256":
                case "SHA-384":
                case "SHA-512":
                  return { name: e11.algorithm.name, saltLength: parseInt(e11.algorithm.hash.name.slice(-3), 10) >> 3 };
                default:
                  throw new aI("unsupported RSA-PSS hash name", { cause: e11 });
              }
            case "RSASSA-PKCS1-v1_5":
              return oz(e11), e11.algorithm.name;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
            case "Ed25519":
              return e11.algorithm.name;
          }
          throw new aI("unsupported CryptoKey algorithm name", { cause: e11 });
        }(r10), r10, aC(n10)));
        return `${n10}.${i10}`;
      }
      let a0 = URL.parse ? (e10, t10) => URL.parse(e10, t10) : (e10, t10) => {
        try {
          return new URL(e10, t10);
        } catch {
          return null;
        }
      };
      function a1(e10, t10) {
        if (t10 && "https:" !== e10.protocol) throw a$("only requests to HTTPS are allowed", oH, e10);
        if ("https:" !== e10.protocol && "http:" !== e10.protocol) throw a$("only HTTP and HTTPS requests are allowed", oq, e10);
      }
      function a2(e10, t10, r10, n10) {
        let i10;
        if ("string" != typeof e10 || !(i10 = a0(e10))) throw a$(`authorization server metadata does not contain a valid ${r10 ? `"as.mtls_endpoint_aliases.${t10}"` : `"as.${t10}"`}`, void 0 === e10 ? oB : oK, { attribute: r10 ? `mtls_endpoint_aliases.${t10}` : t10 });
        return a1(i10, n10), i10;
      }
      function a5(e10, t10, r10, n10) {
        return r10 && e10.mtls_endpoint_aliases && t10 in e10.mtls_endpoint_aliases ? a2(e10.mtls_endpoint_aliases[t10], t10, r10, n10) : a2(e10[t10], t10, r10, n10);
      }
      class a6 extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = oI, this.cause = t10.cause, this.error = t10.cause.error, this.status = t10.response.status, this.error_description = t10.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: t10.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class a3 extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = o$, this.cause = t10.cause, this.error = t10.cause.get("error"), this.error_description = t10.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class a8 extends Error {
        cause;
        code;
        response;
        status;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = oO, this.cause = t10.cause, this.status = t10.response.status, this.response = t10.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let a4 = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", a9 = RegExp("^[,\\s]*(" + a4 + ")"), a7 = RegExp("^[,\\s]*(" + a4 + ')\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"[,\\s]*(.*)'), oe = RegExp("^[,\\s]*" + ("(" + a4 + ")\\s*=\\s*(") + a4 + ")[,\\s]*(.*)"), ot = RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
      async function or(e10) {
        if (e10.status > 399 && e10.status < 500) {
          oJ(e10), aW(e10);
          try {
            let t10 = await e10.clone().json();
            if (aD(t10) && "string" == typeof t10.error && t10.error.length) return t10;
          } catch {
          }
        }
      }
      async function on(e10, t10, r10) {
        if (e10.status !== t10) {
          let t11;
          if (om(e10), t11 = await or(e10)) throw await e10.body?.cancel(), new a6("server responded with an error in the response body", { cause: t11, response: e10 });
          throw a$(`"response" is not a conform ${r10} response (unexpected HTTP status code)`, oL, e10);
        }
      }
      function oi(e10) {
        if (!ov.has(e10)) throw av('"options.DPoP" is not a valid DPoPHandle', aw);
      }
      async function oa(e10, t10, r10, n10, i10, a10) {
        if (aV(e10, '"accessToken"'), !(r10 instanceof URL)) throw av('"url" must be an instance of URL', a_);
        a1(r10, a10?.[ax] !== true), n10 = aU(n10), a10?.DPoP && (oi(a10.DPoP), await a10.DPoP.addProof(r10, n10, t10.toUpperCase(), e10)), n10.set("authorization", `${n10.has("dpop") ? "DPoP" : "Bearer"} ${e10}`);
        let o10 = await (a10?.[ak] || fetch)(r10.href, { duplex: ay(i10, ReadableStream) ? "half" : void 0, body: i10, headers: Object.fromEntries(n10.entries()), method: t10, redirect: "manual", signal: aj(r10, a10?.signal) });
        return a10?.DPoP?.cacheNonce(o10, r10), o10;
      }
      async function oo(e10, t10, r10, n10) {
        aX(e10), aQ(t10);
        let i10 = a5(e10, "userinfo_endpoint", t10.use_mtls_endpoint_aliases, n10?.[ax] !== true), a10 = aU(n10?.headers);
        return t10.userinfo_signed_response_alg ? a10.set("accept", "application/jwt") : (a10.set("accept", "application/json"), a10.append("accept", "application/jwt")), oa(r10, "GET", i10, a10, null, { ...n10, [aE]: aJ(t10) });
      }
      let os = Symbol();
      function ol(e10) {
        return e10.headers.get("content-type")?.split(";")[0];
      }
      async function oc(e10, t10, r10, n10, i10) {
        let a10;
        if (aX(e10), aQ(t10), !ay(n10, Response)) throw av('"response" must be an instance of Response', a_);
        if (om(n10), 200 !== n10.status) throw a$('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', oL, n10);
        if (oJ(n10), "application/jwt" === ol(n10)) {
          let { claims: r11, jwt: o10 } = await oG(await n10.text(), oX.bind(void 0, t10.userinfo_signed_response_alg, e10.userinfo_signing_alg_values_supported, void 0), aJ(t10), az(t10), i10?.[aP]).then(ob.bind(void 0, t10.client_id)).then(ow.bind(void 0, e10));
          of.set(n10, o10), a10 = r11;
        } else {
          if (t10.userinfo_signed_response_alg) throw a$("JWT UserInfo Response expected", oD, n10);
          a10 = await o0(n10);
        }
        if (aV(a10.sub, '"response" body "sub" property', oj, { body: a10 }), r10 === os) ;
        else if (aV(r10, '"expectedSubject"'), a10.sub !== r10) throw a$('unexpected "response" body "sub" property value', oW, { expected: r10, body: a10, attribute: "sub" });
        return a10;
      }
      async function ou(e10, t10, r10, n10, i10, a10, o10) {
        return await r10(e10, t10, i10, a10), a10.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (o10?.[ak] || fetch)(n10.href, { body: i10, headers: Object.fromEntries(a10.entries()), method: "POST", redirect: "manual", signal: aj(n10, o10?.signal) });
      }
      async function od(e10, t10, r10, n10, i10, a10) {
        let o10 = a5(e10, "token_endpoint", t10.use_mtls_endpoint_aliases, a10?.[ax] !== true);
        i10.set("grant_type", n10);
        let s10 = aU(a10?.headers);
        s10.set("accept", "application/json"), a10?.DPoP !== void 0 && (oi(a10.DPoP), await a10.DPoP.addProof(o10, s10, "POST"));
        let l2 = await ou(e10, t10, r10, o10, i10, s10, a10);
        return a10?.DPoP?.cacheNonce(l2, o10), l2;
      }
      let op = /* @__PURE__ */ new WeakMap(), of = /* @__PURE__ */ new WeakMap();
      function oh(e10) {
        if (!e10.id_token) return;
        let t10 = op.get(e10);
        if (!t10) throw av('"ref" was already garbage collected or did not resolve from the proper sources', aw);
        return t10;
      }
      async function og(e10, t10, r10, n10, i10, a10) {
        if (aX(e10), aQ(t10), !ay(r10, Response)) throw av('"response" must be an instance of Response', a_);
        await on(r10, 200, "Token Endpoint"), oJ(r10);
        let o10 = await o0(r10);
        if (aV(o10.access_token, '"response" body "access_token" property', oj, { body: o10 }), aV(o10.token_type, '"response" body "token_type" property', oj, { body: o10 }), o10.token_type = o10.token_type.toLowerCase(), void 0 !== o10.expires_in) {
          let e11 = "number" != typeof o10.expires_in ? parseFloat(o10.expires_in) : o10.expires_in;
          aq(e11, true, '"response" body "expires_in" property', oj, { body: o10 }), o10.expires_in = e11;
        }
        if (void 0 !== o10.refresh_token && aV(o10.refresh_token, '"response" body "refresh_token" property', oj, { body: o10 }), void 0 !== o10.scope && "string" != typeof o10.scope) throw a$('"response" body "scope" property must be a string', oj, { body: o10 });
        if (void 0 !== o10.id_token) {
          aV(o10.id_token, '"response" body "id_token" property', oj, { body: o10 });
          let a11 = ["aud", "exp", "iat", "iss", "sub"];
          true === t10.require_auth_time && a11.push("auth_time"), void 0 !== t10.default_max_age && (aq(t10.default_max_age, true, '"client.default_max_age"'), a11.push("auth_time")), n10?.length && a11.push(...n10);
          let { claims: s10, jwt: l2 } = await oG(o10.id_token, oX.bind(void 0, t10.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported, "RS256"), aJ(t10), az(t10), i10).then(ok.bind(void 0, a11)).then(o_.bind(void 0, e10)).then(oy.bind(void 0, t10.client_id));
          if (Array.isArray(s10.aud) && 1 !== s10.aud.length) {
            if (void 0 === s10.azp) throw a$('ID Token "aud" (audience) claim includes additional untrusted audiences', oF, { claims: s10, claim: "aud" });
            if (s10.azp !== t10.client_id) throw a$('unexpected ID Token "azp" (authorized party) claim value', oF, { expected: t10.client_id, claims: s10, claim: "azp" });
          }
          void 0 !== s10.auth_time && aq(s10.auth_time, true, 'ID Token "auth_time" (authentication time)', oj, { claims: s10 }), of.set(r10, l2), op.set(o10, s10);
        }
        if (a10?.[o10.token_type] !== void 0) a10[o10.token_type](r10, o10);
        else if ("dpop" !== o10.token_type && "bearer" !== o10.token_type) throw new aI("unsupported `token_type` value", { cause: { body: o10 } });
        return o10;
      }
      function om(e10) {
        let t10;
        if (t10 = function(e11) {
          if (!ay(e11, Response)) throw av('"response" must be an instance of Response', a_);
          let t11 = e11.headers.get("www-authenticate");
          if (null === t11) return;
          let r10 = [], n10 = t11;
          for (; n10; ) {
            let e12, t12 = n10.match(a9), i10 = t12?.["1"].toLowerCase();
            if (!i10) return;
            let a10 = n10.substring(t12[0].length);
            if (a10 && !a10.match(/^[\s,]/)) return;
            let o10 = a10.match(/^\s+(.*)$/), s10 = !!o10;
            n10 = o10 ? o10[1] : void 0;
            let l2 = {};
            if (s10) for (; n10; ) {
              let r11, i11;
              if (t12 = n10.match(a7)) {
                if ([, r11, i11, n10] = t12, i11.includes("\\")) try {
                  i11 = JSON.parse(`"${i11}"`);
                } catch {
                }
                l2[r11.toLowerCase()] = i11;
                continue;
              }
              if (t12 = n10.match(oe)) {
                [, r11, i11, n10] = t12, l2[r11.toLowerCase()] = i11;
                continue;
              }
              if (t12 = n10.match(ot)) {
                if (Object.keys(l2).length) break;
                [, e12, n10] = t12;
                break;
              }
              return;
            }
            else n10 = a10 || void 0;
            let c2 = { scheme: i10, parameters: l2 };
            e12 && (c2.token68 = e12), r10.push(c2);
          }
          if (r10.length) return r10;
        }(e10)) throw new a8("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t10, response: e10 });
      }
      function ob(e10, t10) {
        return void 0 !== t10.claims.aud ? oy(e10, t10) : t10;
      }
      function oy(e10, t10) {
        if (Array.isArray(t10.claims.aud)) {
          if (!t10.claims.aud.includes(e10)) throw a$('unexpected JWT "aud" (audience) claim value', oF, { expected: e10, claims: t10.claims, claim: "aud" });
        } else if (t10.claims.aud !== e10) throw a$('unexpected JWT "aud" (audience) claim value', oF, { expected: e10, claims: t10.claims, claim: "aud" });
        return t10;
      }
      function ow(e10, t10) {
        return void 0 !== t10.claims.iss ? o_(e10, t10) : t10;
      }
      function o_(e10, t10) {
        let r10 = e10[o2]?.(t10) ?? e10.issuer;
        if (t10.claims.iss !== r10) throw a$('unexpected JWT "iss" (issuer) claim value', oF, { expected: r10, claims: t10.claims, claim: "iss" });
        return t10;
      }
      let ov = /* @__PURE__ */ new WeakSet(), ox = Symbol();
      async function oE(e10, t10, r10, n10, i10, a10, o10) {
        if (aX(e10), aQ(t10), !ov.has(n10)) throw av('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', aw);
        aV(i10, '"redirectUri"');
        let s10 = oQ(n10, "code");
        if (!s10) throw a$('no authorization code in "callbackParameters"', oj);
        let l2 = new URLSearchParams(o10?.additionalParameters);
        return l2.set("redirect_uri", i10), l2.set("code", s10), a10 !== ox && (aV(a10, '"codeVerifier"'), l2.set("code_verifier", a10)), od(e10, t10, r10, "authorization_code", l2, o10);
      }
      let oS = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function ok(e10, t10) {
        for (let r10 of e10) if (void 0 === t10.claims[r10]) throw a$(`JWT "${r10}" (${oS[r10]}) claim missing`, oj, { claims: t10.claims });
        return t10;
      }
      let oA = Symbol(), oP = Symbol();
      async function oT(e10, t10, r10, n10) {
        return "string" == typeof n10?.expectedNonce || "number" == typeof n10?.maxAge || n10?.requireIdToken ? oR(e10, t10, r10, n10.expectedNonce, n10.maxAge, n10[aP], n10.recognizedTokenTypes) : oC(e10, t10, r10, n10?.[aP], n10?.recognizedTokenTypes);
      }
      async function oR(e10, t10, r10, n10, i10, a10, o10) {
        let s10 = [];
        switch (n10) {
          case void 0:
            n10 = oA;
            break;
          case oA:
            break;
          default:
            aV(n10, '"expectedNonce" argument'), s10.push("nonce");
        }
        switch (i10 ??= t10.default_max_age) {
          case void 0:
            i10 = oP;
            break;
          case oP:
            break;
          default:
            aq(i10, true, '"maxAge" argument'), s10.push("auth_time");
        }
        let l2 = await og(e10, t10, r10, s10, a10, o10);
        aV(l2.id_token, '"response" body "id_token" property', oj, { body: l2 });
        let c2 = oh(l2);
        if (i10 !== oP) {
          let e11 = aG() + aJ(t10), r11 = az(t10);
          if (c2.auth_time + i10 < e11 - r11) throw a$("too much time has elapsed since the last End-User authentication", oV, { claims: c2, now: e11, tolerance: r11, claim: "auth_time" });
        }
        if (n10 === oA) {
          if (void 0 !== c2.nonce) throw a$('unexpected ID Token "nonce" claim value', oF, { expected: void 0, claims: c2, claim: "nonce" });
        } else if (c2.nonce !== n10) throw a$('unexpected ID Token "nonce" claim value', oF, { expected: n10, claims: c2, claim: "nonce" });
        return l2;
      }
      async function oC(e10, t10, r10, n10, i10) {
        let a10 = await og(e10, t10, r10, void 0, n10, i10), o10 = oh(a10);
        if (o10) {
          if (void 0 !== t10.default_max_age) {
            aq(t10.default_max_age, true, '"client.default_max_age"');
            let e11 = aG() + aJ(t10), r11 = az(t10);
            if (o10.auth_time + t10.default_max_age < e11 - r11) throw a$("too much time has elapsed since the last End-User authentication", oV, { claims: o10, now: e11, tolerance: r11, claim: "auth_time" });
          }
          if (void 0 !== o10.nonce) throw a$('unexpected ID Token "nonce" claim value', oF, { expected: void 0, claims: o10, claim: "nonce" });
        }
        return a10;
      }
      let oO = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", oI = "OAUTH_RESPONSE_BODY_ERROR", oN = "OAUTH_UNSUPPORTED_OPERATION", o$ = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", oD = "OAUTH_JWT_USERINFO_EXPECTED", oU = "OAUTH_PARSE_ERROR", oj = "OAUTH_INVALID_RESPONSE", oM = "OAUTH_RESPONSE_IS_NOT_JSON", oL = "OAUTH_RESPONSE_IS_NOT_CONFORM", oH = "OAUTH_HTTP_REQUEST_FORBIDDEN", oq = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", oV = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", oF = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", oW = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", oB = "OAUTH_MISSING_SERVER_METADATA", oK = "OAUTH_INVALID_SERVER_METADATA";
      function oJ(e10) {
        if (e10.bodyUsed) throw av('"response" body has been used already', aw);
      }
      function oz(e10) {
        let { algorithm: t10 } = e10;
        if ("number" != typeof t10.modulusLength || t10.modulusLength < 2048) throw new aI(`unsupported ${t10.name} modulusLength`, { cause: e10 });
      }
      async function oG(e10, t10, r10, n10, i10) {
        let a10, o10, { 0: s10, 1: l2, length: c2 } = e10.split(".");
        if (5 === c2) if (void 0 !== i10) e10 = await i10(e10), { 0: s10, 1: l2, length: c2 } = e10.split(".");
        else throw new aI("JWE decryption is not configured", { cause: e10 });
        if (3 !== c2) throw a$("Invalid JWT", oj, e10);
        try {
          a10 = JSON.parse(aC(aO(s10)));
        } catch (e11) {
          throw a$("failed to parse JWT Header body as base64url encoded JSON", oU, e11);
        }
        if (!aD(a10)) throw a$("JWT Header must be a top level object", oj, e10);
        if (t10(a10), void 0 !== a10.crit) throw new aI('no JWT "crit" header parameter extensions are supported', { cause: { header: a10 } });
        try {
          o10 = JSON.parse(aC(aO(l2)));
        } catch (e11) {
          throw a$("failed to parse JWT Payload body as base64url encoded JSON", oU, e11);
        }
        if (!aD(o10)) throw a$("JWT Payload must be a top level object", oj, e10);
        let u2 = aG() + r10;
        if (void 0 !== o10.exp) {
          if ("number" != typeof o10.exp) throw a$('unexpected JWT "exp" (expiration time) claim type', oj, { claims: o10 });
          if (o10.exp <= u2 - n10) throw a$('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', oV, { claims: o10, now: u2, tolerance: n10, claim: "exp" });
        }
        if (void 0 !== o10.iat && "number" != typeof o10.iat) throw a$('unexpected JWT "iat" (issued at) claim type', oj, { claims: o10 });
        if (void 0 !== o10.iss && "string" != typeof o10.iss) throw a$('unexpected JWT "iss" (issuer) claim type', oj, { claims: o10 });
        if (void 0 !== o10.nbf) {
          if ("number" != typeof o10.nbf) throw a$('unexpected JWT "nbf" (not before) claim type', oj, { claims: o10 });
          if (o10.nbf > u2 + n10) throw a$('unexpected JWT "nbf" (not before) claim value', oV, { claims: o10, now: u2, tolerance: n10, claim: "nbf" });
        }
        if (void 0 !== o10.aud && "string" != typeof o10.aud && !Array.isArray(o10.aud)) throw a$('unexpected JWT "aud" (audience) claim type', oj, { claims: o10 });
        return { header: a10, claims: o10, jwt: e10 };
      }
      function oX(e10, t10, r10, n10) {
        if (void 0 !== e10) {
          if ("string" == typeof e10 ? n10.alg !== e10 : !e10.includes(n10.alg)) throw a$('unexpected JWT "alg" header parameter', oj, { header: n10, expected: e10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(t10)) {
          if (!t10.includes(n10.alg)) throw a$('unexpected JWT "alg" header parameter', oj, { header: n10, expected: t10, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== r10) {
          if ("string" == typeof r10 ? n10.alg !== r10 : "function" == typeof r10 ? !r10(n10.alg) : !r10.includes(n10.alg)) throw a$('unexpected JWT "alg" header parameter', oj, { header: n10, expected: r10, reason: "default value" });
          return;
        }
        throw a$('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e10, issuer: t10, fallback: r10 });
      }
      function oQ(e10, t10) {
        let { 0: r10, length: n10 } = e10.getAll(t10);
        if (n10 > 1) throw a$(`"${t10}" parameter must be provided only once`, oj);
        return r10;
      }
      let oY = Symbol(), oZ = Symbol();
      async function o0(e10, t10 = aW) {
        let r10;
        try {
          r10 = await e10.json();
        } catch (r11) {
          throw t10(e10), a$('failed to parse "response" body as JSON', oU, r11);
        }
        if (!aD(r10)) throw a$('"response" body must be a top level object', oj, { body: r10 });
        return r10;
      }
      let o1 = Symbol(), o2 = Symbol();
      async function o5(e10, t10, r10) {
        let { cookies: n10, logger: i10 } = r10, a10 = n10[e10], o10 = /* @__PURE__ */ new Date();
        o10.setTime(o10.getTime() + 9e5), i10.debug(`CREATE_${e10.toUpperCase()}`, { name: a10.name, payload: t10, COOKIE_TTL: 900, expires: o10 });
        let s10 = await nD({ ...r10.jwt, maxAge: 900, token: { value: t10 }, salt: a10.name }), l2 = { ...a10.options, expires: o10 };
        return { name: a10.name, value: s10, options: l2 };
      }
      async function o6(e10, t10, r10) {
        try {
          let { logger: n10, cookies: i10, jwt: a10 } = r10;
          if (n10.debug(`PARSE_${e10.toUpperCase()}`, { cookie: t10 }), !t10) throw new tf(`${e10} cookie was missing`);
          let o10 = await nU({ ...a10, token: t10, salt: i10[e10].name });
          if (o10?.value) return o10.value;
          throw Error("Invalid cookie");
        } catch (t11) {
          throw new tf(`${e10} value could not be parsed`, { cause: t11 });
        }
      }
      function o3(e10, t10, r10) {
        let { logger: n10, cookies: i10 } = t10, a10 = i10[e10];
        n10.debug(`CLEAR_${e10.toUpperCase()}`, { cookie: a10 }), r10.push({ name: a10.name, value: "", options: { ...i10[e10].options, maxAge: 0 } });
      }
      function o8(e10, t10) {
        return async function(r10, n10, i10) {
          let { provider: a10, logger: o10 } = i10;
          if (!a10?.checks?.includes(e10)) return;
          let s10 = r10?.[i10.cookies[t10].name];
          o10.debug(`USE_${t10.toUpperCase()}`, { value: s10 });
          let l2 = await o6(t10, s10, i10);
          return o3(t10, i10, n10), l2;
        };
      }
      let o4 = { async create(e10) {
        let t10 = aB(), r10 = await aK(t10);
        return { cookie: await o5("pkceCodeVerifier", t10, e10), value: r10 };
      }, use: o8("pkce", "pkceCodeVerifier") }, o9 = "encodedState", o7 = { async create(e10, t10) {
        let { provider: r10 } = e10;
        if (!r10.checks.includes("state")) {
          if (t10) throw new tf("State data was provided but the provider is not configured to use state");
          return;
        }
        let n10 = { origin: t10, random: aB() }, i10 = await nD({ secret: e10.jwt.secret, token: n10, salt: o9, maxAge: 900 });
        return { cookie: await o5("state", i10, e10), value: i10 };
      }, use: o8("state", "state"), async decode(e10, t10) {
        try {
          t10.logger.debug("DECODE_STATE", { state: e10 });
          let r10 = await nU({ secret: t10.jwt.secret, token: e10, salt: o9 });
          if (r10) return r10;
          throw Error("Invalid state");
        } catch (e11) {
          throw new tf("State could not be decoded", { cause: e11 });
        }
      } }, se = { async create(e10) {
        if (!e10.provider.checks.includes("nonce")) return;
        let t10 = aB();
        return { cookie: await o5("nonce", t10, e10), value: t10 };
      }, use: o8("nonce", "nonce") }, st = "encodedWebauthnChallenge", sr = { create: async (e10, t10, r10) => ({ cookie: await o5("webauthnChallenge", await nD({ secret: e10.jwt.secret, token: { challenge: t10, registerData: r10 }, salt: st, maxAge: 900 }), e10) }), async use(e10, t10, r10) {
        let n10 = t10?.[e10.cookies.webauthnChallenge.name], i10 = await o6("webauthnChallenge", n10, e10), a10 = await nU({ secret: e10.jwt.secret, token: i10, salt: st });
        if (o3("webauthnChallenge", e10, r10), !a10) throw new tf("WebAuthn challenge was missing");
        return a10;
      } };
      function sn(e10) {
        return encodeURIComponent(e10).replace(/%20/g, "+");
      }
      async function si(e10, t10, r10) {
        var n10, i10;
        let a10, o10, s10, l2, c2, { logger: u2, provider: d2 } = r10, { token: p2, userinfo: f2 } = d2;
        if (p2?.url && "authjs.dev" !== p2.url.host || f2?.url && "authjs.dev" !== f2.url.host) a10 = { issuer: d2.issuer ?? "https://authjs.dev", token_endpoint: p2?.url.toString(), userinfo_endpoint: f2?.url.toString() };
        else {
          let e11 = new URL(d2.issuer), t11 = await aH(e11, { [ax]: true, [ak]: d2[n5] });
          if (!(a10 = await aF(e11, t11)).token_endpoint) throw TypeError("TODO: Authorization server did not provide a token endpoint.");
          if (!a10.userinfo_endpoint) throw TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
        }
        let h2 = { client_id: d2.clientId, ...d2.client };
        switch (h2.token_endpoint_auth_method) {
          case void 0:
          case "client_secret_basic":
            o10 = (e11, t11, r11, n11) => {
              var i11, a11;
              let o11, s11, l3;
              n11.set("authorization", (i11 = d2.clientId, a11 = d2.clientSecret, o11 = sn(i11), s11 = sn(a11), l3 = btoa(`${o11}:${s11}`), `Basic ${l3}`));
            };
            break;
          case "client_secret_post":
            aV(n10 = d2.clientSecret, '"clientSecret"'), o10 = (e11, t11, r11, i11) => {
              r11.set("client_id", t11.client_id), r11.set("client_secret", n10);
            };
            break;
          case "client_secret_jwt":
            aV(i10 = d2.clientSecret, '"clientSecret"'), c2 = void 0, o10 = async (e11, t11, r11, n11) => {
              l2 ||= await crypto.subtle.importKey("raw", aC(i10), { hash: "SHA-256", name: "HMAC" }, false, ["sign"]);
              let a11 = { alg: "HS256" }, o11 = aY(e11, t11);
              c2?.(a11, o11);
              let s11 = `${aO(aC(JSON.stringify(a11)))}.${aO(aC(JSON.stringify(o11)))}`, u3 = await crypto.subtle.sign(l2.algorithm, l2, aC(s11));
              r11.set("client_id", t11.client_id), r11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), r11.set("client_assertion", `${s11}.${aO(new Uint8Array(u3))}`);
            };
            break;
          case "private_key_jwt":
            o10 = function(e11, t11) {
              let { key: r11, kid: n11 } = e11 instanceof CryptoKey ? { key: e11 } : e11?.key instanceof CryptoKey ? (void 0 !== e11.kid && aV(e11.kid, '"kid"'), { key: e11.key, kid: e11.kid }) : {};
              var i11 = '"clientPrivateKey.key"';
              if (!(r11 instanceof CryptoKey)) throw av(`${i11} must be a CryptoKey`, a_);
              if ("private" !== r11.type) throw av(`${i11} must be a private CryptoKey`, aw);
              return async (e12, i12, a11, o11) => {
                let s11 = { alg: function(e13) {
                  switch (e13.algorithm.name) {
                    case "RSA-PSS":
                      switch (e13.algorithm.hash.name) {
                        case "SHA-256":
                          return "PS256";
                        case "SHA-384":
                          return "PS384";
                        case "SHA-512":
                          return "PS512";
                        default:
                          throw new aI("unsupported RsaHashedKeyAlgorithm hash name", { cause: e13 });
                      }
                    case "RSASSA-PKCS1-v1_5":
                      switch (e13.algorithm.hash.name) {
                        case "SHA-256":
                          return "RS256";
                        case "SHA-384":
                          return "RS384";
                        case "SHA-512":
                          return "RS512";
                        default:
                          throw new aI("unsupported RsaHashedKeyAlgorithm hash name", { cause: e13 });
                      }
                    case "ECDSA":
                      switch (e13.algorithm.namedCurve) {
                        case "P-256":
                          return "ES256";
                        case "P-384":
                          return "ES384";
                        case "P-521":
                          return "ES512";
                        default:
                          throw new aI("unsupported EcKeyAlgorithm namedCurve", { cause: e13 });
                      }
                    case "Ed25519":
                    case "ML-DSA-44":
                    case "ML-DSA-65":
                    case "ML-DSA-87":
                      return e13.algorithm.name;
                    case "EdDSA":
                      return "Ed25519";
                    default:
                      throw new aI("unsupported CryptoKey algorithm name", { cause: e13 });
                  }
                }(r11), kid: n11 }, l3 = aY(e12, i12);
                t11?.[aA]?.(s11, l3), a11.set("client_id", i12.client_id), a11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a11.set("client_assertion", await aZ(s11, l3, r11));
              };
            }(d2.token.clientPrivateKey, { [aA](e11, t11) {
              t11.aud = [a10.issuer, a10.token_endpoint];
            } });
            break;
          case "none":
            o10 = (e11, t11, r11, n11) => {
              r11.set("client_id", t11.client_id);
            };
            break;
          default:
            throw Error("unsupported client authentication method");
        }
        let g2 = [], m2 = await o7.use(t10, g2, r10);
        try {
          s10 = function(e11, t11, r11, n11) {
            var i11;
            if (aX(e11), aQ(t11), r11 instanceof URL && (r11 = r11.searchParams), !(r11 instanceof URLSearchParams)) throw av('"parameters" must be an instance of URLSearchParams, or URL', a_);
            if (oQ(r11, "response")) throw a$('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', oj, { parameters: r11 });
            let a11 = oQ(r11, "iss"), o11 = oQ(r11, "state");
            if (!a11 && e11.authorization_response_iss_parameter_supported) throw a$('response parameter "iss" (issuer) missing', oj, { parameters: r11 });
            if (a11 && a11 !== e11.issuer) throw a$('unexpected "iss" (issuer) response parameter value', oj, { expected: e11.issuer, parameters: r11 });
            switch (n11) {
              case void 0:
              case oZ:
                if (void 0 !== o11) throw a$('unexpected "state" response parameter encountered', oj, { expected: void 0, parameters: r11 });
                break;
              case oY:
                break;
              default:
                if (aV(n11, '"expectedState" argument'), o11 !== n11) throw a$(void 0 === o11 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', oj, { expected: n11, parameters: r11 });
            }
            if (oQ(r11, "error")) throw new a3("authorization response from the server is an error", { cause: r11 });
            let s11 = oQ(r11, "id_token"), l3 = oQ(r11, "token");
            if (void 0 !== s11 || void 0 !== l3) throw new aI("implicit and hybrid flows are not supported");
            return i11 = new URLSearchParams(r11), ov.add(i11), i11;
          }(a10, h2, new URLSearchParams(e10), d2.checks.includes("state") ? m2 : oY);
        } catch (e11) {
          if (e11 instanceof a3) {
            let t11 = { providerId: d2.id, ...Object.fromEntries(e11.cause.entries()) };
            throw u2.debug("OAuthCallbackError", t11), new t_("OAuth Provider returned an error", t11);
          }
          throw e11;
        }
        let b2 = await o4.use(t10, g2, r10), y2 = d2.callbackUrl;
        !r10.isOnRedirectProxy && d2.redirectProxyUrl && (y2 = d2.redirectProxyUrl);
        let w2 = await oE(a10, h2, o10, s10, y2, b2 ?? "decoy", { [ax]: true, [ak]: (...e11) => (d2.checks.includes("pkce") || e11[1].body.delete("code_verifier"), (d2[n5] ?? fetch)(...e11)) });
        d2.token?.conform && (w2 = await d2.token.conform(w2.clone()) ?? w2);
        let _2 = {}, v2 = "oidc" === d2.type;
        if (d2[n6]) switch (d2.id) {
          case "microsoft-entra-id":
          case "azure-ad": {
            let e11 = await w2.clone().json();
            if (e11.error) {
              let t12 = { providerId: d2.id, ...e11 };
              throw new t_(`OAuth Provider returned an error: ${e11.error}`, t12);
            }
            let { tid: t11 } = function(e12) {
              let t12, r11;
              if ("string" != typeof e12) throw new rl("JWTs must use Compact JWS serialization, JWT must be a string");
              let { 1: n11, length: i11 } = e12.split(".");
              if (5 === i11) throw new rl("Only JWTs using Compact JWS serialization can be decoded");
              if (3 !== i11) throw new rl("Invalid JWT");
              if (!n11) throw new rl("JWTs must contain a payload");
              try {
                t12 = t0(n11);
              } catch {
                throw new rl("Failed to base64url decode the payload");
              }
              try {
                r11 = JSON.parse(tz.decode(t12));
              } catch {
                throw new rl("Failed to parse the decoded payload as JSON");
              }
              if (!rB(r11)) throw new rl("Invalid JWT Claims Set");
              return r11;
            }(e11.id_token);
            if ("string" == typeof t11) {
              let e12 = a10.issuer?.match(/microsoftonline\.com\/(\w+)\/v2\.0/)?.[1] ?? "common", r11 = new URL(a10.issuer.replace(e12, t11)), n11 = await aH(r11, { [ak]: d2[n5] });
              a10 = await aF(r11, n11);
            }
          }
        }
        let x2 = await oT(a10, h2, w2, { expectedNonce: await se.use(t10, g2, r10), requireIdToken: v2 });
        if (v2) {
          let t11 = oh(x2);
          if (_2 = t11, d2[n6] && "apple" === d2.id) try {
            _2.user = JSON.parse(e10?.user);
          } catch {
          }
          if (false === d2.idToken) {
            let e11 = await oo(a10, h2, x2.access_token, { [ak]: d2[n5], [ax]: true });
            _2 = await oc(a10, h2, t11.sub, e11);
          }
        } else if (f2?.request) {
          let e11 = await f2.request({ tokens: x2, provider: d2 });
          e11 instanceof Object && (_2 = e11);
        } else if (f2?.url) {
          let e11 = await oo(a10, h2, x2.access_token, { [ak]: d2[n5], [ax]: true });
          _2 = await e11.json();
        } else throw TypeError("No userinfo endpoint configured");
        return x2.expires_in && (x2.expires_at = Math.floor(Date.now() / 1e3) + Number(x2.expires_in)), { ...await sa(_2, d2, x2, u2), profile: _2, cookies: g2 };
      }
      async function sa(e10, t10, r10, n10) {
        try {
          let n11 = await t10.profile(e10, r10);
          return { user: { ...n11, id: crypto.randomUUID(), email: n11.email?.toLowerCase() }, account: { ...r10, provider: t10.id, type: t10.type, providerAccountId: n11.id ?? crypto.randomUUID() } };
        } catch (r11) {
          n10.debug("getProfile error details", e10), n10.error(new tv(r11, { provider: t10.id }));
        }
      }
      async function so(e10, t10, r10, n10) {
        let i10 = await sd(e10, t10, r10), { cookie: a10 } = await sr.create(e10, i10.challenge, r10);
        return { status: 200, cookies: [...n10 ?? [], a10], body: { action: "register", options: i10 }, headers: { "Content-Type": "application/json" } };
      }
      async function ss(e10, t10, r10, n10) {
        let i10 = await su(e10, t10, r10), { cookie: a10 } = await sr.create(e10, i10.challenge);
        return { status: 200, cookies: [...n10 ?? [], a10], body: { action: "authenticate", options: i10 }, headers: { "Content-Type": "application/json" } };
      }
      async function sl(e10, t10, r10) {
        let n10, { adapter: i10, provider: a10 } = e10, o10 = t10.body && "string" == typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!o10 || "object" != typeof o10 || !("id" in o10) || "string" != typeof o10.id) throw new tn("Invalid WebAuthn Authentication response");
        let s10 = sh(sf(o10.id)), l2 = await i10.getAuthenticator(s10);
        if (!l2) throw new tn(`WebAuthn authenticator not found in database: ${JSON.stringify({ credentialID: s10 })}`);
        let { challenge: c2 } = await sr.use(e10, t10.cookies, r10);
        try {
          var u2;
          let r11 = a10.getRelayingParty(e10, t10);
          n10 = await a10.simpleWebAuthn.verifyAuthenticationResponse({ ...a10.verifyAuthenticationOptions, expectedChallenge: c2, response: o10, authenticator: { ...u2 = l2, credentialDeviceType: u2.credentialDeviceType, transports: sg(u2.transports), credentialID: sf(u2.credentialID), credentialPublicKey: sf(u2.credentialPublicKey) }, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new tN(e11);
        }
        let { verified: d2, authenticationInfo: p2 } = n10;
        if (!d2) throw new tN("WebAuthn authentication response could not be verified");
        try {
          let { newCounter: e11 } = p2;
          await i10.updateAuthenticatorCounter(l2.credentialID, e11);
        } catch (e11) {
          throw new ta(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({ credentialID: s10, oldCounter: l2.counter, newCounter: p2.newCounter })}`, e11);
        }
        let f2 = await i10.getAccount(l2.providerAccountId, a10.id);
        if (!f2) throw new tn(`WebAuthn account not found in database: ${JSON.stringify({ credentialID: s10, providerAccountId: l2.providerAccountId })}`);
        let h2 = await i10.getUser(f2.userId);
        if (!h2) throw new tn(`WebAuthn user not found in database: ${JSON.stringify({ credentialID: s10, providerAccountId: l2.providerAccountId, userID: f2.userId })}`);
        return { account: f2, user: h2 };
      }
      async function sc(e10, t10, r10) {
        var n10;
        let i10, { provider: a10 } = e10, o10 = t10.body && "string" == typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!o10 || "object" != typeof o10 || !("id" in o10) || "string" != typeof o10.id) throw new tn("Invalid WebAuthn Registration response");
        let { challenge: s10, registerData: l2 } = await sr.use(e10, t10.cookies, r10);
        if (!l2) throw new tn("Missing user registration data in WebAuthn challenge cookie");
        try {
          let r11 = a10.getRelayingParty(e10, t10);
          i10 = await a10.simpleWebAuthn.verifyRegistrationResponse({ ...a10.verifyRegistrationOptions, expectedChallenge: s10, response: o10, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new tN(e11);
        }
        if (!i10.verified || !i10.registrationInfo) throw new tN("WebAuthn registration response could not be verified");
        let c2 = { providerAccountId: sh(i10.registrationInfo.credentialID), provider: e10.provider.id, type: a10.type }, u2 = { providerAccountId: c2.providerAccountId, counter: i10.registrationInfo.counter, credentialID: sh(i10.registrationInfo.credentialID), credentialPublicKey: sh(i10.registrationInfo.credentialPublicKey), credentialBackedUp: i10.registrationInfo.credentialBackedUp, credentialDeviceType: i10.registrationInfo.credentialDeviceType, transports: (n10 = o10.response.transports, n10?.join(",")) };
        return { user: l2, account: c2, authenticator: u2 };
      }
      async function su(e10, t10, r10) {
        let { provider: n10, adapter: i10 } = e10, a10 = r10 && r10.id ? await i10.listAuthenticatorsByUserId(r10.id) : null, o10 = n10.getRelayingParty(e10, t10);
        return await n10.simpleWebAuthn.generateAuthenticationOptions({ ...n10.authenticationOptions, rpID: o10.id, allowCredentials: a10?.map((e11) => ({ id: sf(e11.credentialID), type: "public-key", transports: sg(e11.transports) })) });
      }
      async function sd(e10, t10, r10) {
        let { provider: n10, adapter: i10 } = e10, a10 = r10.id ? await i10.listAuthenticatorsByUserId(r10.id) : null, o10 = nX(32), s10 = n10.getRelayingParty(e10, t10);
        return await n10.simpleWebAuthn.generateRegistrationOptions({ ...n10.registrationOptions, userID: o10, userName: r10.email, userDisplayName: r10.name ?? void 0, rpID: s10.id, rpName: s10.name, excludeCredentials: a10?.map((e11) => ({ id: sf(e11.credentialID), type: "public-key", transports: sg(e11.transports) })) });
      }
      function sp(e10) {
        let { provider: t10, adapter: r10 } = e10;
        if (!r10) throw new tg("An adapter is required for the WebAuthn provider");
        if (!t10 || "webauthn" !== t10.type) throw new tA("Provider must be WebAuthn");
        return { ...e10, provider: t10, adapter: r10 };
      }
      function sf(e10) {
        return new Uint8Array(eH.Buffer.from(e10, "base64"));
      }
      function sh(e10) {
        return eH.Buffer.from(e10).toString("base64");
      }
      function sg(e10) {
        return e10 ? e10.split(",") : void 0;
      }
      async function sm(e10, t10, r10, n10) {
        if (!t10.provider) throw new tA("Callback route called without provider");
        let { query: i10, body: a10, method: o10, headers: s10 } = e10, { provider: l2, adapter: c2, url: u2, callbackUrl: d2, pages: p2, jwt: f2, events: h2, callbacks: g2, session: { strategy: m2, maxAge: b2 }, logger: y2 } = t10, w2 = "jwt" === m2;
        try {
          if ("oauth" === l2.type || "oidc" === l2.type) {
            let o11, s11 = l2.authorization?.url.searchParams.get("response_mode") === "form_post" ? a10 : i10;
            if (t10.isOnRedirectProxy && s11?.state) {
              let e11 = await o7.decode(s11.state, t10);
              if (e11?.origin && new URL(e11.origin).origin !== t10.url.origin) {
                let t11 = `${e11.origin}?${new URLSearchParams(s11)}`;
                return y2.debug("Proxy redirecting to", t11), { redirect: t11, cookies: n10 };
              }
            }
            let m3 = await si(s11, e10.cookies, t10);
            m3.cookies.length && n10.push(...m3.cookies), y2.debug("authorization result", m3);
            let { user: _2, account: v2, profile: x2 } = m3;
            if (!_2 || !v2 || !x2) return { redirect: `${u2}/signin`, cookies: n10 };
            if (c2) {
              let { getUserByAccount: e11 } = c2;
              o11 = await e11({ providerAccountId: v2.providerAccountId, provider: l2.id });
            }
            let E2 = await sb({ user: o11 ?? _2, account: v2, profile: x2 }, t10);
            if (E2) return { redirect: E2, cookies: n10 };
            let { user: S2, session: k2, isNewUser: A2 } = await ab(r10.value, _2, v2, t10);
            if (w2) {
              let e11 = { name: S2.name, email: S2.email, picture: S2.image, sub: S2.id?.toString() }, i11 = await g2.jwt({ token: e11, user: S2, account: v2, profile: x2, isNewUser: A2, trigger: A2 ? "signUp" : "signIn" });
              if (null === i11) n10.push(...r10.clean());
              else {
                let e12 = t10.cookies.sessionToken.name, a11 = await f2.encode({ ...f2, token: i11, salt: e12 }), o12 = /* @__PURE__ */ new Date();
                o12.setTime(o12.getTime() + 1e3 * b2);
                let s12 = r10.chunk(a11, { expires: o12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: k2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: k2.expires } });
            if (await h2.signIn?.({ user: S2, account: v2, profile: x2, isNewUser: A2 }), A2 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          if ("email" === l2.type) {
            let e11 = i10?.token, a11 = i10?.email;
            if (!e11) {
              let t11 = TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", { cause: { hasToken: !!e11 } });
              throw t11.name = "Configuration", t11;
            }
            let o11 = l2.secret ?? t10.secret, s11 = await c2.useVerificationToken({ identifier: a11, token: await nG(`${e11}${o11}`) }), u3 = !!s11, m3 = u3 && s11.expires.valueOf() < Date.now();
            if (!u3 || m3 || a11 && s11.identifier !== a11) throw new tT({ hasInvite: u3, expired: m3 });
            let { identifier: y3 } = s11, _2 = await c2.getUserByEmail(y3) ?? { id: crypto.randomUUID(), email: y3, emailVerified: null }, v2 = { providerAccountId: _2.email, userId: _2.id, type: "email", provider: l2.id }, x2 = await sb({ user: _2, account: v2 }, t10);
            if (x2) return { redirect: x2, cookies: n10 };
            let { user: E2, session: S2, isNewUser: k2 } = await ab(r10.value, _2, v2, t10);
            if (w2) {
              let e12 = { name: E2.name, email: E2.email, picture: E2.image, sub: E2.id?.toString() }, i11 = await g2.jwt({ token: e12, user: E2, account: v2, isNewUser: k2, trigger: k2 ? "signUp" : "signIn" });
              if (null === i11) n10.push(...r10.clean());
              else {
                let e13 = t10.cookies.sessionToken.name, a12 = await f2.encode({ ...f2, token: i11, salt: e13 }), o12 = /* @__PURE__ */ new Date();
                o12.setTime(o12.getTime() + 1e3 * b2);
                let s12 = r10.chunk(a12, { expires: o12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: S2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: S2.expires } });
            if (await h2.signIn?.({ user: E2, account: v2, isNewUser: k2 }), k2 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          if ("credentials" === l2.type && "POST" === o10) {
            let e11 = a10 ?? {};
            Object.entries(i10 ?? {}).forEach(([e12, t11]) => u2.searchParams.set(e12, t11));
            let c3 = await l2.authorize(e11, new Request(u2, { headers: s10, method: o10, body: JSON.stringify(a10) }));
            if (c3) c3.id = c3.id?.toString() ?? crypto.randomUUID();
            else throw new td();
            let p3 = { providerAccountId: c3.id, type: "credentials", provider: l2.id }, m3 = await sb({ user: c3, account: p3, credentials: e11 }, t10);
            if (m3) return { redirect: m3, cookies: n10 };
            let y3 = { name: c3.name, email: c3.email, picture: c3.image, sub: c3.id }, w3 = await g2.jwt({ token: y3, user: c3, account: p3, isNewUser: false, trigger: "signIn" });
            if (null === w3) n10.push(...r10.clean());
            else {
              let e12 = t10.cookies.sessionToken.name, i11 = await f2.encode({ ...f2, token: w3, salt: e12 }), a11 = /* @__PURE__ */ new Date();
              a11.setTime(a11.getTime() + 1e3 * b2);
              let o11 = r10.chunk(i11, { expires: a11 });
              n10.push(...o11);
            }
            return await h2.signIn?.({ user: c3, account: p3 }), { redirect: d2, cookies: n10 };
          } else if ("webauthn" === l2.type && "POST" === o10) {
            let i11, a11, o11, s11 = e10.body?.action;
            if ("string" != typeof s11 || "authenticate" !== s11 && "register" !== s11) throw new tn("Invalid action parameter");
            let l3 = sp(t10);
            switch (s11) {
              case "authenticate": {
                let t11 = await sl(l3, e10, n10);
                i11 = t11.user, a11 = t11.account;
                break;
              }
              case "register": {
                let r11 = await sc(t10, e10, n10);
                i11 = r11.user, a11 = r11.account, o11 = r11.authenticator;
              }
            }
            await sb({ user: i11, account: a11 }, t10);
            let { user: c3, isNewUser: u3, session: m3, account: y3 } = await ab(r10.value, i11, a11, t10);
            if (!y3) throw new tn("Error creating or finding account");
            if (o11 && c3.id && await l3.adapter.createAuthenticator({ ...o11, userId: c3.id }), w2) {
              let e11 = { name: c3.name, email: c3.email, picture: c3.image, sub: c3.id?.toString() }, i12 = await g2.jwt({ token: e11, user: c3, account: y3, isNewUser: u3, trigger: u3 ? "signUp" : "signIn" });
              if (null === i12) n10.push(...r10.clean());
              else {
                let e12 = t10.cookies.sessionToken.name, a12 = await f2.encode({ ...f2, token: i12, salt: e12 }), o12 = /* @__PURE__ */ new Date();
                o12.setTime(o12.getTime() + 1e3 * b2);
                let s12 = r10.chunk(a12, { expires: o12 });
                n10.push(...s12);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: m3.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: m3.expires } });
            if (await h2.signIn?.({ user: c3, account: y3, isNewUser: u3 }), u3 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          throw new tA(`Callback for provider type (${l2.type}) is not supported`);
        } catch (t11) {
          if (t11 instanceof tn) throw t11;
          let e11 = new ts(t11, { provider: l2.id });
          throw y2.debug("callback route error details", { method: o10, query: i10, body: a10 }), e11;
        }
      }
      async function sb(e10, t10) {
        let r10, { signIn: n10, redirect: i10 } = t10.callbacks;
        try {
          r10 = await n10(e10);
        } catch (e11) {
          if (e11 instanceof tn) throw e11;
          throw new to(e11);
        }
        if (!r10) throw new to("AccessDenied");
        if ("string" == typeof r10) return await i10({ url: r10, baseUrl: t10.url.origin });
      }
      async function sy(e10, t10, r10, n10, i10) {
        let { adapter: a10, jwt: o10, events: s10, callbacks: l2, logger: c2, session: { strategy: u2, maxAge: d2 } } = e10, p2 = { body: null, headers: { "Content-Type": "application/json", ...!n10 && { "Cache-Control": "private, no-cache, no-store", Expires: "0", Pragma: "no-cache" } }, cookies: r10 }, f2 = t10.value;
        if (!f2) return p2;
        if ("jwt" === u2) {
          try {
            let r11 = e10.cookies.sessionToken.name, a11 = await o10.decode({ ...o10, token: f2, salt: r11 });
            if (!a11) throw Error("Invalid JWT");
            let c3 = await l2.jwt({ token: a11, ...n10 && { trigger: "update" }, session: i10 }), u3 = am(d2);
            if (null !== c3) {
              let e11 = { user: { name: c3.name, email: c3.email, image: c3.picture }, expires: u3.toISOString() }, n11 = await l2.session({ session: e11, token: c3 });
              p2.body = n11;
              let i11 = await o10.encode({ ...o10, token: c3, salt: r11 }), a12 = t10.chunk(i11, { expires: u3 });
              p2.cookies?.push(...a12), await s10.session?.({ session: n11, token: c3 });
            } else p2.cookies?.push(...t10.clean());
          } catch (e11) {
            c2.error(new th(e11)), p2.cookies?.push(...t10.clean());
          }
          return p2;
        }
        try {
          let { getSessionAndUser: r11, deleteSession: o11, updateSession: c3 } = a10, u3 = await r11(f2);
          if (u3 && u3.session.expires.valueOf() < Date.now() && (await o11(f2), u3 = null), u3) {
            let { user: t11, session: r12 } = u3, a11 = e10.session.updateAge, o12 = r12.expires.valueOf() - 1e3 * d2 + 1e3 * a11, h2 = am(d2);
            o12 <= Date.now() && await c3({ sessionToken: f2, expires: h2 });
            let g2 = await l2.session({ session: { ...r12, user: t11 }, user: t11, newSession: i10, ...n10 ? { trigger: "update" } : {} });
            p2.body = g2, p2.cookies?.push({ name: e10.cookies.sessionToken.name, value: f2, options: { ...e10.cookies.sessionToken.options, expires: h2 } }), await s10.session?.({ session: g2 });
          } else f2 && p2.cookies?.push(...t10.clean());
        } catch (e11) {
          c2.error(new tx(e11));
        }
        return p2;
      }
      async function sw(e10, t10) {
        let r10, n10, { logger: i10, provider: a10 } = t10, o10 = a10.authorization?.url;
        if (!o10 || "authjs.dev" === o10.host) {
          let e11 = new URL(a10.issuer), t11 = await aH(e11, { [ak]: a10[n5], [ax]: true }), r11 = await aF(e11, t11).catch((t12) => {
            if (!(t12 instanceof TypeError) || "Invalid URL" !== t12.message) throw t12;
            throw TypeError(`Discovery request responded with an invalid issuer. expected: ${e11}`);
          });
          if (!r11.authorization_endpoint) throw TypeError("Authorization server did not provide an authorization endpoint.");
          o10 = new URL(r11.authorization_endpoint);
        }
        let s10 = o10.searchParams, l2 = a10.callbackUrl;
        !t10.isOnRedirectProxy && a10.redirectProxyUrl && (l2 = a10.redirectProxyUrl, n10 = a10.callbackUrl, i10.debug("using redirect proxy", { redirect_uri: l2, data: n10 }));
        let c2 = Object.assign({ response_type: "code", client_id: a10.clientId, redirect_uri: l2, ...a10.authorization?.params }, Object.fromEntries(a10.authorization?.url.searchParams ?? []), e10);
        for (let e11 in c2) s10.set(e11, c2[e11]);
        let u2 = [];
        a10.authorization?.url.searchParams.get("response_mode") === "form_post" && (t10.cookies.state.options.sameSite = "none", t10.cookies.state.options.secure = true, t10.cookies.nonce.options.sameSite = "none", t10.cookies.nonce.options.secure = true);
        let d2 = await o7.create(t10, n10);
        if (d2 && (s10.set("state", d2.value), u2.push(d2.cookie)), a10.checks?.includes("pkce")) if (r10 && !r10.code_challenge_methods_supported?.includes("S256")) "oidc" === a10.type && (a10.checks = ["nonce"]);
        else {
          let { value: e11, cookie: r11 } = await o4.create(t10);
          s10.set("code_challenge", e11), s10.set("code_challenge_method", "S256"), u2.push(r11);
        }
        let p2 = await se.create(t10);
        return p2 && (s10.set("nonce", p2.value), u2.push(p2.cookie)), "oidc" !== a10.type || o10.searchParams.has("scope") || o10.searchParams.set("scope", "openid profile email"), i10.debug("authorization url is ready", { url: o10, cookies: u2, provider: a10 }), { redirect: o10.toString(), cookies: u2 };
      }
      async function s_(e10, t10) {
        let r10, { body: n10 } = e10, { provider: i10, callbacks: a10, adapter: o10 } = t10, s10 = (i10.normalizeIdentifier ?? function(e11) {
          if (!e11) throw Error("Missing email from request body.");
          let [t11, r11] = e11.toLowerCase().trim().split("@");
          return r11 = r11.split(",")[0], `${t11}@${r11}`;
        })(n10?.email), l2 = { id: crypto.randomUUID(), email: s10, emailVerified: null }, c2 = await o10.getUserByEmail(s10) ?? l2, u2 = { providerAccountId: s10, userId: c2.id, type: "email", provider: i10.id };
        try {
          r10 = await a10.signIn({ user: c2, account: u2, email: { verificationRequest: true } });
        } catch (e11) {
          throw new to(e11);
        }
        if (!r10) throw new to("AccessDenied");
        if ("string" == typeof r10) return { redirect: await a10.redirect({ url: r10, baseUrl: t10.url.origin }) };
        let { callbackUrl: d2, theme: p2 } = t10, f2 = await i10.generateVerificationToken?.() ?? nX(32), h2 = new Date(Date.now() + (i10.maxAge ?? 86400) * 1e3), g2 = i10.secret ?? t10.secret, m2 = new URL(t10.basePath, t10.url.origin), b2 = i10.sendVerificationRequest({ identifier: s10, token: f2, expires: h2, url: `${m2}/callback/${i10.id}?${new URLSearchParams({ callbackUrl: d2, token: f2, email: s10 })}`, provider: i10, theme: p2, request: new Request(e10.url, { headers: e10.headers, method: e10.method, body: "POST" === e10.method ? JSON.stringify(e10.body ?? {}) : void 0 }) }), y2 = o10.createVerificationToken?.({ identifier: s10, token: await nG(`${f2}${g2}`), expires: h2 });
        return await Promise.all([b2, y2]), { redirect: `${m2}/verify-request?${new URLSearchParams({ provider: i10.id, type: i10.type })}` };
      }
      async function sv(e10, t10, r10) {
        let n10 = `${r10.url.origin}${r10.basePath}/signin`;
        if (!r10.provider) return { redirect: n10, cookies: t10 };
        switch (r10.provider.type) {
          case "oauth":
          case "oidc": {
            let { redirect: n11, cookies: i10 } = await sw(e10.query, r10);
            return i10 && t10.push(...i10), { redirect: n11, cookies: t10 };
          }
          case "email":
            return { ...await s_(e10, r10), cookies: t10 };
          default:
            return { redirect: n10, cookies: t10 };
        }
      }
      async function sx(e10, t10, r10) {
        let { jwt: n10, events: i10, callbackUrl: a10, logger: o10, session: s10 } = r10, l2 = t10.value;
        if (!l2) return { redirect: a10, cookies: e10 };
        try {
          if ("jwt" === s10.strategy) {
            let e11 = r10.cookies.sessionToken.name, t11 = await n10.decode({ ...n10, token: l2, salt: e11 });
            await i10.signOut?.({ token: t11 });
          } else {
            let e11 = await r10.adapter?.deleteSession(l2);
            await i10.signOut?.({ session: e11 });
          }
        } catch (e11) {
          o10.error(new tE(e11));
        }
        return e10.push(...t10.clean()), { redirect: a10, cookies: e10 };
      }
      async function sE(e10, t10) {
        let { adapter: r10, jwt: n10, session: { strategy: i10 } } = e10, a10 = t10.value;
        if (!a10) return null;
        if ("jwt" === i10) {
          let t11 = e10.cookies.sessionToken.name, r11 = await n10.decode({ ...n10, token: a10, salt: t11 });
          if (r11 && r11.sub) return { id: r11.sub, name: r11.name, email: r11.email, image: r11.picture };
        } else {
          let e11 = await r10?.getSessionAndUser(a10);
          if (e11) return e11.user;
        }
        return null;
      }
      async function sS(e10, t10, r10, n10) {
        let i10 = sp(t10), { provider: a10 } = i10, { action: o10 } = e10.query ?? {};
        if ("register" !== o10 && "authenticate" !== o10 && void 0 !== o10) return { status: 400, body: { error: "Invalid action" }, cookies: n10, headers: { "Content-Type": "application/json" } };
        let s10 = await sE(t10, r10), l2 = s10 ? { user: s10, exists: true } : await a10.getUserInfo(t10, e10), c2 = l2?.user;
        switch (function(e11, t11, r11) {
          let { user: n11, exists: i11 = false } = r11 ?? {};
          switch (e11) {
            case "authenticate":
              return "authenticate";
            case "register":
              if (n11 && t11 === i11) return "register";
              break;
            case void 0:
              if (!t11) if (!n11) return "authenticate";
              else if (i11) return "authenticate";
              else return "register";
          }
          return null;
        }(o10, !!s10, l2)) {
          case "authenticate":
            return ss(i10, e10, c2, n10);
          case "register":
            if ("string" == typeof c2?.email) return so(i10, e10, c2, n10);
            break;
          default:
            return { status: 400, body: { error: "Invalid request" }, cookies: n10, headers: { "Content-Type": "application/json" } };
        }
      }
      async function sk(e10, t10) {
        let { action: r10, providerId: n10, error: i10, method: a10 } = e10, o10 = t10.skipCSRFCheck === n1, { options: s10, cookies: l2 } = await ie({ authOptions: t10, action: r10, providerId: n10, url: e10.url, callbackUrl: e10.body?.callbackUrl ?? e10.query?.callbackUrl, csrfToken: e10.body?.csrfToken, cookies: e10.cookies, isPost: "POST" === a10, csrfDisabled: o10 }), c2 = new tr(s10.cookies.sessionToken, e10.cookies, s10.logger);
        if ("GET" === a10) {
          let t11 = ag({ ...s10, query: e10.query, cookies: l2 });
          switch (r10) {
            case "callback":
              return await sm(e10, s10, c2, l2);
            case "csrf":
              return t11.csrf(o10, s10, l2);
            case "error":
              return t11.error(i10);
            case "providers":
              return t11.providers(s10.providers);
            case "session":
              return await sy(s10, c2, l2);
            case "signin":
              return t11.signin(n10, i10);
            case "signout":
              return t11.signout();
            case "verify-request":
              return t11.verifyRequest();
            case "webauthn-options":
              return await sS(e10, s10, c2, l2);
          }
        } else {
          let { csrfTokenVerified: t11 } = s10;
          switch (r10) {
            case "callback":
              return "credentials" === s10.provider.type && nY(r10, t11), await sm(e10, s10, c2, l2);
            case "session":
              return nY(r10, t11), await sy(s10, c2, l2, true, e10.body?.data);
            case "signin":
              return nY(r10, t11), await sv(e10, l2, s10);
            case "signout":
              return nY(r10, t11), await sx(l2, c2, s10);
          }
        }
        throw new tS(`Cannot handle action: ${r10}`);
      }
      function sA(e10, t10, r10, n10, i10) {
        let a10, o10 = i10?.basePath, s10 = n10.AUTH_URL ?? n10.NEXTAUTH_URL;
        if (s10) a10 = new URL(s10), o10 && "/" !== o10 && "/" !== a10.pathname && (a10.pathname !== o10 && nV(i10).warn("env-url-basepath-mismatch"), a10.pathname = "/");
        else {
          let e11 = r10.get("x-forwarded-host") ?? r10.get("host"), n11 = r10.get("x-forwarded-proto") ?? t10 ?? "https", i11 = n11.endsWith(":") ? n11 : n11 + ":";
          a10 = new URL(`${i11}//${e11}`);
        }
        let l2 = a10.toString().replace(/\/$/, "");
        if (o10) {
          let t11 = o10?.replace(/(^\/|\/$)/g, "") ?? "";
          return new URL(`${l2}/${t11}/${e10}`);
        }
        return new URL(`${l2}/${e10}`);
      }
      async function sP(e10, t10) {
        let r10 = nV(t10), n10 = await nJ(e10, t10);
        if (!n10) return Response.json("Bad request.", { status: 400 });
        let i10 = function(e11, t11) {
          let { url: r11 } = e11, n11 = [];
          if (!tU && t11.debug && n11.push("debug-enabled"), !t11.trustHost) return new tP(`Host must be trusted. URL was: ${e11.url}`);
          if (!t11.secret?.length) return new ty("Please define a `secret`");
          let i11 = e11.query?.callbackUrl;
          if (i11 && !tj(i11, r11.origin)) return new tu(`Invalid callback URL. Received: ${i11}`);
          let { callbackUrl: a11 } = tt(t11.useSecureCookies ?? "https:" === r11.protocol), o11 = e11.cookies?.[t11.cookies?.callbackUrl?.name ?? a11.name];
          if (o11 && !tj(o11, r11.origin)) return new tu(`Invalid callback URL. Received: ${o11}`);
          let s10 = false;
          for (let e12 of t11.providers) {
            let t12 = "function" == typeof e12 ? e12() : e12;
            if (("oauth" === t12.type || "oidc" === t12.type) && !(t12.issuer ?? t12.options?.issuer)) {
              let e13, { authorization: r12, token: n12, userinfo: i12 } = t12;
              if ("string" == typeof r12 || r12?.url ? "string" == typeof n12 || n12?.url ? "string" == typeof i12 || i12?.url || (e13 = "userinfo") : e13 = "token" : e13 = "authorization", e13) return new tp(`Provider "${t12.id}" is missing both \`issuer\` and \`${e13}\` endpoint config. At least one of them is required`);
            }
            if ("credentials" === t12.type) tM = true;
            else if ("email" === t12.type) tL = true;
            else if ("webauthn" === t12.type) {
              var l2;
              if (tH = true, t12.simpleWebAuthnBrowserVersion && (l2 = t12.simpleWebAuthnBrowserVersion, !/^v\d+(?:\.\d+){0,2}$/.test(l2))) return new tn(`Invalid provider config for "${t12.id}": simpleWebAuthnBrowserVersion "${t12.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
              if (t12.enableConditionalUI) {
                if (s10) return new tO("Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time");
                if (s10 = true, !Object.values(t12.formFields).some((e13) => e13.autocomplete && e13.autocomplete.toString().indexOf("webauthn") > -1)) return new tI(`Provider "${t12.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
              }
            }
          }
          if (tM) {
            let e12 = t11.session?.strategy === "database", r12 = !t11.providers.some((e13) => "credentials" !== ("function" == typeof e13 ? e13() : e13).type);
            if (e12 && r12) return new tk("Signing in with credentials only supported if JWT strategy is enabled");
            if (t11.providers.some((e13) => {
              let t12 = "function" == typeof e13 ? e13() : e13;
              return "credentials" === t12.type && !t12.authorize;
            })) return new tb("Must define an authorize() handler to use credentials authentication provider");
          }
          let { adapter: c2, session: u2 } = t11, d2 = [];
          if (tL || u2?.strategy === "database" || !u2?.strategy && c2) if (tL) {
            if (!c2) return new tg("Email login requires an adapter");
            d2.push(...tq);
          } else {
            if (!c2) return new tg("Database session requires an adapter");
            d2.push(...tV);
          }
          if (tH) {
            if (!t11.experimental?.enableWebAuthn) return new tD("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
            if (n11.push("experimental-webauthn"), !c2) return new tg("WebAuthn requires an adapter");
            d2.push(...tF);
          }
          if (c2) {
            let e12 = d2.filter((e13) => !(e13 in c2));
            if (e12.length) return new tm(`Required adapter methods were missing: ${e12.join(", ")}`);
          }
          return tU || (tU = true), n11;
        }(n10, t10);
        if (Array.isArray(i10)) i10.forEach(r10.warn);
        else if (i10) {
          if (r10.error(i10), !(/* @__PURE__ */ new Set(["signin", "signout", "error", "verify-request"])).has(n10.action) || "GET" !== n10.method) return Response.json({ message: "There was a problem with the server configuration. Check the server logs for more information." }, { status: 500 });
          let { pages: e11, theme: a11 } = t10, o11 = e11?.error && n10.url.searchParams.get("callbackUrl")?.startsWith(e11.error);
          if (!e11?.error || o11) return o11 && r10.error(new tl(`The error page ${e11?.error} should not require authentication`)), nz(ag({ theme: a11 }).error("Configuration"));
          let s10 = `${n10.url.origin}${e11.error}?error=Configuration`;
          return Response.redirect(s10);
        }
        let a10 = e10.headers?.has("X-Auth-Return-Redirect"), o10 = t10.raw === n2;
        try {
          let e11 = await sk(n10, t10);
          if (o10) return e11;
          let r11 = nz(e11), i11 = r11.headers.get("Location");
          if (!a10 || !i11) return r11;
          return Response.json({ url: i11 }, { headers: r11.headers });
        } catch (d2) {
          r10.error(d2);
          let i11 = d2 instanceof tn;
          if (i11 && o10 && !a10) throw d2;
          if ("POST" === e10.method && "session" === n10.action) return Response.json(null, { status: 400 });
          let s10 = new URLSearchParams({ error: d2 instanceof tn && tC.has(d2.type) ? d2.type : "Configuration" });
          d2 instanceof td && s10.set("code", d2.code);
          let l2 = i11 && d2.kind || "error", c2 = t10.pages?.[l2] ?? `${t10.basePath}/${l2.toLowerCase()}`, u2 = `${n10.url.origin}${c2}?${s10}`;
          if (a10) return Response.json({ url: u2 });
          return Response.redirect(u2);
        }
      }
      e.i(64445), "u" < typeof URLPattern || URLPattern;
      var Q = Q, Q = Q, ej = ej, sT = e.i(63072), sR = e.i(80082), sC = e.i(72117);
      function sO() {
        let e10 = eX.getStore();
        return (null == e10 ? void 0 : e10.rootTaskSpawnPhase) === "action";
      }
      function sI(e10) {
        let t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!t10) return e10;
        let { origin: r10 } = new URL(t10), { href: n10, origin: i10 } = e10.nextUrl;
        return new q(n10.replace(i10, r10), e10);
      }
      function sN(e10) {
        try {
          e10.secret ?? (e10.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
          let t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
          if (!t10) return;
          let { pathname: r10 } = new URL(t10);
          if ("/" === r10) return;
          e10.basePath || (e10.basePath = r10);
        } catch {
        } finally {
          e10.basePath || (e10.basePath = "/api/auth"), function(e11, t10, r10 = false) {
            try {
              let n10 = e11.AUTH_URL;
              n10 && (t10.basePath ? r10 || nV(t10).warn("env-url-basepath-redundant") : t10.basePath = new URL(n10).pathname);
            } catch {
            } finally {
              t10.basePath ?? (t10.basePath = "/auth");
            }
            if (!t10.secret?.length) {
              t10.secret = [];
              let r11 = e11.AUTH_SECRET;
              for (let n10 of (r11 && t10.secret.push(r11), [1, 2, 3])) {
                let r12 = e11[`AUTH_SECRET_${n10}`];
                r12 && t10.secret.unshift(r12);
              }
            }
            t10.redirectProxyUrl ?? (t10.redirectProxyUrl = e11.AUTH_REDIRECT_PROXY_URL), t10.trustHost ?? (t10.trustHost = !!(e11.AUTH_URL ?? e11.AUTH_TRUST_HOST ?? e11.VERCEL ?? e11.CF_PAGES ?? "production" !== e11.NODE_ENV)), t10.providers = t10.providers.map((t11) => {
              let { id: r11 } = "function" == typeof t11 ? t11({}) : t11, n10 = r11.toUpperCase().replace(/-/g, "_"), i10 = e11[`AUTH_${n10}_ID`], a10 = e11[`AUTH_${n10}_SECRET`], o10 = e11[`AUTH_${n10}_ISSUER`], s10 = e11[`AUTH_${n10}_KEY`], l2 = "function" == typeof t11 ? t11({ clientId: i10, clientSecret: a10, issuer: o10, apiKey: s10 }) : t11;
              return "oauth" === l2.type || "oidc" === l2.type ? (l2.clientId ?? (l2.clientId = i10), l2.clientSecret ?? (l2.clientSecret = a10), l2.issuer ?? (l2.issuer = o10)) : "email" === l2.type && (l2.apiKey ?? (l2.apiKey = s10)), l2;
            });
          }(process.env, e10, true);
        }
      }
      e.s([], 85835), e.i(85835);
      var Q = Q, ej = ej, s$ = e.i(40049);
      let sD = { current: null }, sU = "function" == typeof s$.cache ? s$.cache : (e10) => e10, sj = console.warn;
      function sM(e10) {
        return function(...t10) {
          sj(e10(...t10));
        };
      }
      function sL() {
        let e10 = "cookies", t10 = Q.workAsyncStorageInstance.getStore(), r10 = ej.workUnitAsyncStorageInstance.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !sO()) throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E843", enumerable: false, configurable: true });
          if (t10.forceStatic) return sq(Z.seal(new L.RequestCookies(new Headers({}))));
          if (t10.dynamicShouldError) throw Object.defineProperty(new sR.StaticGenBailoutError(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E849", enumerable: false, configurable: true });
          if (r10) switch (r10.type) {
            case "cache":
              let a10 = Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E831", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a10, sL), t10.invalidDynamicUsageError ??= a10, a10;
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E846", enumerable: false, configurable: true });
            case "prerender":
              var n10 = t10, i10 = r10;
              let o10 = sH.get(i10);
              if (o10) return o10;
              let s10 = (0, sC.makeHangingPromise)(i10.renderSignal, n10.route, "`cookies()`");
              return sH.set(i10, s10), s10;
            case "prerender-client":
              let l2 = "`cookies`";
              throw Object.defineProperty(new eL.InvariantError(`${l2} must not be used within a Client Component. Next.js should be preventing ${l2} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E832", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, sT.postponeWithTracking)(t10.route, e10, r10.dynamicTracking);
            case "prerender-legacy":
              return (0, sT.throwToInterruptStaticGeneration)(e10, t10, r10);
            case "prerender-runtime":
              return (0, sT.delayUntilRuntimeStage)(r10, sq(r10.cookies));
            case "private-cache":
              return sq(r10.cookies);
            case "request":
              return (0, sT.trackDynamicDataInDynamicRender)(r10), sq(er(r10) ? r10.userspaceMutableCookies : r10.cookies);
          }
        }
        (0, eU.throwForMissingRequestStore)(e10);
      }
      sU((e10) => {
        try {
          sj(sD.current);
        } finally {
          sD.current = null;
        }
      });
      let sH = /* @__PURE__ */ new WeakMap();
      function sq(e10) {
        let t10 = sH.get(e10);
        if (t10) return t10;
        let r10 = Promise.resolve(e10);
        return sH.set(e10, r10), r10;
      }
      sM(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E830", enumerable: false, configurable: true });
      });
      var Q = Q, ej = ej;
      function sV() {
        let e10 = "headers", t10 = Q.workAsyncStorageInstance.getStore(), r10 = ej.workUnitAsyncStorageInstance.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !sO()) throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E839", enumerable: false, configurable: true });
          if (t10.forceStatic) return sW(X.seal(new Headers({})));
          if (r10) switch (r10.type) {
            case "cache": {
              let e11 = Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E833", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e11, sV), t10.invalidDynamicUsageError ??= e11, e11;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E838", enumerable: false, configurable: true });
          }
          if (t10.dynamicShouldError) throw Object.defineProperty(new sR.StaticGenBailoutError(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E828", enumerable: false, configurable: true });
          if (r10) switch (r10.type) {
            case "prerender":
              var n10 = t10, i10 = r10;
              let a10 = sF.get(i10);
              if (a10) return a10;
              let o10 = (0, sC.makeHangingPromise)(i10.renderSignal, n10.route, "`headers()`");
              return sF.set(i10, o10), o10;
            case "prerender-client":
              let s10 = "`headers`";
              throw Object.defineProperty(new eL.InvariantError(`${s10} must not be used within a client component. Next.js should be preventing ${s10} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, sT.postponeWithTracking)(t10.route, e10, r10.dynamicTracking);
            case "prerender-legacy":
              return (0, sT.throwToInterruptStaticGeneration)(e10, t10, r10);
            case "prerender-runtime":
              return (0, sT.delayUntilRuntimeStage)(r10, sW(r10.headers));
            case "private-cache":
              return sW(r10.headers);
            case "request":
              return (0, sT.trackDynamicDataInDynamicRender)(r10), sW(r10.headers);
          }
        }
        (0, eU.throwForMissingRequestStore)(e10);
      }
      let sF = /* @__PURE__ */ new WeakMap();
      function sW(e10) {
        let t10 = sF.get(e10);
        if (t10) return t10;
        let r10 = Promise.resolve(e10);
        return sF.set(e10, r10), r10;
      }
      sM(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E836", enumerable: false, configurable: true });
      });
      var Q = Q, ej = ej;
      async function sB(e10, t10) {
        return sP(new Request(sA("session", e10.get("x-forwarded-proto"), e10, process.env, t10), { headers: { cookie: e10.get("cookie") ?? "" } }), { ...t10, callbacks: { ...t10.callbacks, async session(...e11) {
          let r10 = await t10.callbacks?.session?.(...e11) ?? { ...e11[0].session, expires: e11[0].session.expires?.toISOString?.() ?? e11[0].session.expires };
          return { user: e11[0].user ?? e11[0].token, ...r10 };
        } } });
      }
      function sK(e10) {
        return "function" == typeof e10;
      }
      function sJ(e10, t10) {
        return "function" == typeof e10 ? async (...r10) => {
          if (!r10.length) {
            let r11 = await sV(), n11 = await e10(void 0);
            return t10?.(n11), sB(r11, n11).then((e11) => e11.json());
          }
          if (r10[0] instanceof Request) {
            let n11 = r10[0], i11 = r10[1], a11 = await e10(n11);
            return t10?.(a11), sz([n11, i11], a11);
          }
          if (sK(r10[0])) {
            let n11 = r10[0];
            return async (...r11) => {
              let i11 = await e10(r11[0]);
              return t10?.(i11), sz(r11, i11, n11);
            };
          }
          let n10 = "req" in r10[0] ? r10[0].req : r10[0], i10 = "res" in r10[0] ? r10[0].res : r10[1], a10 = await e10(n10);
          return t10?.(a10), sB(new Headers(n10.headers), a10).then(async (e11) => {
            let t11 = await e11.json();
            for (let t12 of e11.headers.getSetCookie()) "headers" in i10 ? i10.headers.append("set-cookie", t12) : i10.appendHeader("set-cookie", t12);
            return t11;
          });
        } : (...t11) => {
          if (!t11.length) return Promise.resolve(sV()).then((t12) => sB(t12, e10).then((e11) => e11.json()));
          if (t11[0] instanceof Request) return sz([t11[0], t11[1]], e10);
          if (sK(t11[0])) {
            let r11 = t11[0];
            return async (...t12) => sz(t12, e10, r11).then((e11) => e11);
          }
          let r10 = "req" in t11[0] ? t11[0].req : t11[0], n10 = "res" in t11[0] ? t11[0].res : t11[1];
          return sB(new Headers(r10.headers), e10).then(async (e11) => {
            let t12 = await e11.json();
            for (let t13 of e11.headers.getSetCookie()) "headers" in n10 ? n10.headers.append("set-cookie", t13) : n10.appendHeader("set-cookie", t13);
            return t12;
          });
        };
      }
      async function sz(e10, t10, r10) {
        let n10 = sI(e10[0]), i10 = await sB(n10.headers, t10), a10 = await i10.json(), o10 = true;
        t10.callbacks?.authorized && (o10 = await t10.callbacks.authorized({ request: n10, auth: a10 }));
        let s10 = K.next?.();
        if (o10 instanceof Response) {
          var l2, c2, u2;
          let e11, r11;
          s10 = o10;
          let i11 = o10.headers.get("Location"), { pathname: a11 } = n10.nextUrl;
          i11 && (l2 = a11, c2 = new URL(i11).pathname, u2 = t10, e11 = c2.replace(`${l2}/`, ""), r11 = Object.values(u2.pages ?? {}), (sG.has(e11) || r11.includes(c2)) && c2 === l2) && (o10 = true);
        } else if (r10) n10.auth = a10, s10 = await r10(n10, e10[1]) ?? K.next();
        else if (!o10) {
          let e11 = t10.pages?.signIn ?? `${t10.basePath}/signin`;
          if (n10.nextUrl.pathname !== e11) {
            let t11 = n10.nextUrl.clone();
            t11.pathname = e11, t11.searchParams.set("callbackUrl", n10.nextUrl.href), s10 = K.redirect(t11);
          }
        }
        let d2 = new Response(s10?.body, s10);
        for (let e11 of i10.headers.getSetCookie()) d2.headers.append("set-cookie", e11);
        return d2;
      }
      e.i(18368), /* @__PURE__ */ new WeakMap(), sM(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E835", enumerable: false, configurable: true });
      });
      let sG = /* @__PURE__ */ new Set(["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error"]);
      URLSearchParams;
      var sX = e.i(16852), sQ = e.i(75982);
      let sY = e.r(91375).actionAsyncStorage;
      function sZ(e10, t10) {
        throw function(e11, t11, r10 = sX.RedirectStatusCode.TemporaryRedirect) {
          let n10 = Object.defineProperty(Error(sQ.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          return n10.digest = `${sQ.REDIRECT_ERROR_CODE};${t11};${e11};${r10};`, n10;
        }(e10, t10 ??= sY?.getStore()?.isAction ? sQ.RedirectType.push : sQ.RedirectType.replace, sX.RedirectStatusCode.TemporaryRedirect);
      }
      var s0 = e.i(68585);
      function s1() {
        throw Object.defineProperty(Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", { value: "E776", enumerable: false, configurable: true });
      }
      async function s2(e10, t10 = {}, r10, n10) {
        let i10 = new Headers(await sV()), { redirect: a10 = true, redirectTo: o10, ...s10 } = t10 instanceof FormData ? Object.fromEntries(t10) : t10, l2 = o10?.toString() ?? i10.get("Referer") ?? "/", c2 = sA("signin", i10.get("x-forwarded-proto"), i10, process.env, n10);
        if (!e10) return c2.searchParams.append("callbackUrl", l2), a10 && sZ(c2.toString()), c2.toString();
        let u2 = `${c2}/${e10}?${new URLSearchParams(r10)}`, d2 = {};
        for (let t11 of n10.providers) {
          let { options: r11, ...n11 } = "function" == typeof t11 ? t11() : t11, i11 = r11?.id ?? n11.id;
          if (i11 === e10) {
            d2 = { id: i11, type: r11?.type ?? n11.type };
            break;
          }
        }
        if (!d2.id) {
          let e11 = `${c2}?${new URLSearchParams({ callbackUrl: l2 })}`;
          return a10 && sZ(e11), e11;
        }
        "credentials" === d2.type && (u2 = u2.replace("signin", "callback")), i10.set("Content-Type", "application/x-www-form-urlencoded");
        let p2 = new Request(u2, { method: "POST", headers: i10, body: new URLSearchParams({ ...s10, callbackUrl: l2 }) }), f2 = await sP(p2, { ...n10, raw: n2, skipCSRFCheck: n1 }), h2 = await sL();
        for (let e11 of f2?.cookies ?? []) h2.set(e11.name, e11.value, e11.options);
        let g2 = (f2 instanceof Response ? f2.headers.get("Location") : f2.redirect) ?? u2;
        return a10 ? sZ(g2) : g2;
      }
      async function s5(e10, t10) {
        let r10 = new Headers(await sV());
        r10.set("Content-Type", "application/x-www-form-urlencoded");
        let n10 = sA("signout", r10.get("x-forwarded-proto"), r10, process.env, t10), i10 = new URLSearchParams({ callbackUrl: e10?.redirectTo ?? r10.get("Referer") ?? "/" }), a10 = new Request(n10, { method: "POST", headers: r10, body: i10 }), o10 = await sP(a10, { ...t10, raw: n2, skipCSRFCheck: n1 }), s10 = await sL();
        for (let e11 of o10?.cookies ?? []) s10.set(e11.name, e11.value, e11.options);
        return e10?.redirect ?? true ? sZ(o10.redirect) : o10;
      }
      async function s6(e10, t10) {
        let r10 = new Headers(await sV());
        r10.set("Content-Type", "application/json");
        let n10 = new Request(sA("session", r10.get("x-forwarded-proto"), r10, process.env, t10), { method: "POST", headers: r10, body: JSON.stringify({ data: e10 }) }), i10 = await sP(n10, { ...t10, raw: n2, skipCSRFCheck: n1 }), a10 = await sL();
        for (let e11 of i10?.cookies ?? []) a10.set(e11.name, e11.value, e11.options);
        return i10.body;
      }
      s0.HTTP_ERROR_FALLBACK_ERROR_CODE, s0.HTTP_ERROR_FALLBACK_ERROR_CODE, s0.HTTP_ERROR_FALLBACK_ERROR_CODE, e.r(82748).unstable_rethrow, e.s(["unstable_isUnrecognizedActionError", () => s1], 55493), e.i(55493);
      var s3 = e.i(3466);
      let s8 = globalThis.prisma ?? new s3.PrismaClient({ log: ["query"] });
      var s4 = e.i(90894);
      function s9(e10, t10) {
        if ("number" != typeof (e10 = e10 || li)) throw Error("Illegal arguments: " + typeof e10 + ", " + typeof t10);
        e10 < 4 ? e10 = 4 : e10 > 31 && (e10 = 31);
        var r10 = [];
        return r10.push("$2b$"), e10 < 10 && r10.push("0"), r10.push(e10.toString()), r10.push("$"), r10.push(lr(function(e11) {
          try {
            return crypto.getRandomValues(new Uint8Array(e11));
          } catch {
          }
          try {
            return s4.default.randomBytes(e11);
          } catch {
          }
          throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
        }(ln), ln)), r10.join("");
      }
      var s7 = "function" == typeof setImmediate ? setImmediate : "object" == typeof scheduler && "function" == typeof scheduler.postTask ? scheduler.postTask.bind(scheduler) : setTimeout, le = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), lt = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, -1, -1, -1, -1, -1];
      function lr(e10, t10) {
        var r10, n10, i10 = 0, a10 = [];
        if (t10 <= 0 || t10 > e10.length) throw Error("Illegal len: " + t10);
        for (; i10 < t10; ) {
          if (r10 = 255 & e10[i10++], a10.push(le[r10 >> 2 & 63]), r10 = (3 & r10) << 4, i10 >= t10 || (r10 |= (n10 = 255 & e10[i10++]) >> 4 & 15, a10.push(le[63 & r10]), r10 = (15 & n10) << 2, i10 >= t10)) {
            a10.push(le[63 & r10]);
            break;
          }
          r10 |= (n10 = 255 & e10[i10++]) >> 6 & 3, a10.push(le[63 & r10]), a10.push(le[63 & n10]);
        }
        return a10.join("");
      }
      var ln = 16, li = 10, la = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], lo = [3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946, 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055, 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504, 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462], ls = [1332899944, 1700884034, 1701343084, 1684370003, 1668446532, 1869963892];
      function ll(e10, t10, r10, n10) {
        var i10 = e10[t10], a10 = e10[t10 + 1];
        return i10 ^= r10[0], a10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[1], i10 ^= (n10[a10 >>> 24] + n10[256 | a10 >> 16 & 255] ^ n10[512 | a10 >> 8 & 255]) + n10[768 | 255 & a10] ^ r10[2], a10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[3], i10 ^= (n10[a10 >>> 24] + n10[256 | a10 >> 16 & 255] ^ n10[512 | a10 >> 8 & 255]) + n10[768 | 255 & a10] ^ r10[4], a10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[5], i10 ^= (n10[a10 >>> 24] + n10[256 | a10 >> 16 & 255] ^ n10[512 | a10 >> 8 & 255]) + n10[768 | 255 & a10] ^ r10[6], a10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[7], i10 ^= (n10[a10 >>> 24] + n10[256 | a10 >> 16 & 255] ^ n10[512 | a10 >> 8 & 255]) + n10[768 | 255 & a10] ^ r10[8], a10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[9], i10 ^= (n10[a10 >>> 24] + n10[256 | a10 >> 16 & 255] ^ n10[512 | a10 >> 8 & 255]) + n10[768 | 255 & a10] ^ r10[10], a10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[11], i10 ^= (n10[a10 >>> 24] + n10[256 | a10 >> 16 & 255] ^ n10[512 | a10 >> 8 & 255]) + n10[768 | 255 & a10] ^ r10[12], a10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[13], i10 ^= (n10[a10 >>> 24] + n10[256 | a10 >> 16 & 255] ^ n10[512 | a10 >> 8 & 255]) + n10[768 | 255 & a10] ^ r10[14], a10 ^= (n10[i10 >>> 24] + n10[256 | i10 >> 16 & 255] ^ n10[512 | i10 >> 8 & 255]) + n10[768 | 255 & i10] ^ r10[15], i10 ^= (n10[a10 >>> 24] + n10[256 | a10 >> 16 & 255] ^ n10[512 | a10 >> 8 & 255]) + n10[768 | 255 & a10] ^ r10[16], e10[t10] = a10 ^ r10[17], e10[t10 + 1] = i10, e10;
      }
      function lc(e10, t10) {
        for (var r10 = 0, n10 = 0; r10 < 4; ++r10) n10 = n10 << 8 | 255 & e10[t10], t10 = (t10 + 1) % e10.length;
        return { key: n10, offp: t10 };
      }
      function lu(e10, t10, r10) {
        for (var n10, i10 = 0, a10 = [0, 0], o10 = t10.length, s10 = r10.length, l2 = 0; l2 < o10; l2++) i10 = (n10 = lc(e10, i10)).offp, t10[l2] = t10[l2] ^ n10.key;
        for (l2 = 0; l2 < o10; l2 += 2) a10 = ll(a10, 0, t10, r10), t10[l2] = a10[0], t10[l2 + 1] = a10[1];
        for (l2 = 0; l2 < s10; l2 += 2) a10 = ll(a10, 0, t10, r10), r10[l2] = a10[0], r10[l2 + 1] = a10[1];
      }
      function ld(e10, t10, r10, n10, i10) {
        var a10, o10, s10 = ls.slice(), l2 = s10.length;
        if (r10 < 4 || r10 > 31) {
          if (o10 = Error("Illegal number of rounds (4-31): " + r10), n10) return void s7(n10.bind(this, o10));
          throw o10;
        }
        if (t10.length !== ln) {
          if (o10 = Error("Illegal salt length: " + t10.length + " != " + ln), n10) return void s7(n10.bind(this, o10));
          throw o10;
        }
        r10 = 1 << r10 >>> 0;
        var c2, u2, d2, p2 = 0;
        function f2() {
          if (i10 && i10(p2 / r10), p2 < r10) for (var a11 = Date.now(); p2 < r10 && (p2 += 1, lu(e10, c2, u2), lu(t10, c2, u2), !(Date.now() - a11 > 100)); ) ;
          else {
            for (p2 = 0; p2 < 64; p2++) for (d2 = 0; d2 < l2 >> 1; d2++) ll(s10, d2 << 1, c2, u2);
            var o11 = [];
            for (p2 = 0; p2 < l2; p2++) o11.push((s10[p2] >> 24 & 255) >>> 0), o11.push((s10[p2] >> 16 & 255) >>> 0), o11.push((s10[p2] >> 8 & 255) >>> 0), o11.push((255 & s10[p2]) >>> 0);
            return n10 ? void n10(null, o11) : o11;
          }
          n10 && s7(f2);
        }
        if ("function" == typeof Int32Array ? (c2 = new Int32Array(la), u2 = new Int32Array(lo)) : (c2 = la.slice(), u2 = lo.slice()), !function(e11, t11, r11, n11) {
          for (var i11, a11 = 0, o11 = [0, 0], s11 = r11.length, l3 = n11.length, c3 = 0; c3 < s11; c3++) a11 = (i11 = lc(t11, a11)).offp, r11[c3] = r11[c3] ^ i11.key;
          for (c3 = 0, a11 = 0; c3 < s11; c3 += 2) a11 = (i11 = lc(e11, a11)).offp, o11[0] ^= i11.key, a11 = (i11 = lc(e11, a11)).offp, o11[1] ^= i11.key, o11 = ll(o11, 0, r11, n11), r11[c3] = o11[0], r11[c3 + 1] = o11[1];
          for (c3 = 0; c3 < l3; c3 += 2) a11 = (i11 = lc(e11, a11)).offp, o11[0] ^= i11.key, a11 = (i11 = lc(e11, a11)).offp, o11[1] ^= i11.key, o11 = ll(o11, 0, r11, n11), n11[c3] = o11[0], n11[c3 + 1] = o11[1];
        }(t10, e10, c2, u2), void 0 !== n10) f2();
        else for (; ; ) if (void 0 !== (a10 = f2())) return a10 || [];
      }
      function lp(e10, t10, r10, n10) {
        if ("string" != typeof e10 || "string" != typeof t10) {
          if (i10 = Error("Invalid string / salt: Not a string"), r10) return void s7(r10.bind(this, i10));
          throw i10;
        }
        if ("$" !== t10.charAt(0) || "2" !== t10.charAt(1)) {
          if (i10 = Error("Invalid salt version: " + t10.substring(0, 2)), r10) return void s7(r10.bind(this, i10));
          throw i10;
        }
        if ("$" === t10.charAt(2)) a10 = "\0", o10 = 3;
        else {
          if ("a" !== (a10 = t10.charAt(2)) && "b" !== a10 && "y" !== a10 || "$" !== t10.charAt(3)) {
            if (i10 = Error("Invalid salt revision: " + t10.substring(2, 4)), r10) return void s7(r10.bind(this, i10));
            throw i10;
          }
          o10 = 4;
        }
        if (t10.charAt(o10 + 2) > "$") {
          if (i10 = Error("Missing salt rounds"), r10) return void s7(r10.bind(this, i10));
          throw i10;
        }
        var i10, a10, o10, s10 = 10 * parseInt(t10.substring(o10, o10 + 1), 10) + parseInt(t10.substring(o10 + 1, o10 + 2), 10), l2 = t10.substring(o10 + 3, o10 + 25), c2 = function(e11) {
          for (var t11, r11, n11 = 0, i11 = Array(function(e12) {
            for (var t12 = 0, r12 = 0, n12 = 0; n12 < e12.length; ++n12) (r12 = e12.charCodeAt(n12)) < 128 ? t12 += 1 : r12 < 2048 ? t12 += 2 : (64512 & r12) == 55296 && (64512 & e12.charCodeAt(n12 + 1)) == 56320 ? (++n12, t12 += 4) : t12 += 3;
            return t12;
          }(e11)), a11 = 0, o11 = e11.length; a11 < o11; ++a11) (t11 = e11.charCodeAt(a11)) < 128 ? i11[n11++] = t11 : (t11 < 2048 ? i11[n11++] = t11 >> 6 | 192 : ((64512 & t11) == 55296 && (64512 & (r11 = e11.charCodeAt(a11 + 1))) == 56320 ? (t11 = 65536 + ((1023 & t11) << 10) + (1023 & r11), ++a11, i11[n11++] = t11 >> 18 | 240, i11[n11++] = t11 >> 12 & 63 | 128) : i11[n11++] = t11 >> 12 | 224, i11[n11++] = t11 >> 6 & 63 | 128), i11[n11++] = 63 & t11 | 128);
          return i11;
        }(e10 += a10 >= "a" ? "\0" : ""), u2 = function(e11, t11) {
          var r11, n11, i11, a11, o11, s11 = 0, l3 = e11.length, c3 = 0, u3 = [];
          if (t11 <= 0) throw Error("Illegal len: " + t11);
          for (; s11 < l3 - 1 && c3 < t11 && (r11 = (o11 = e11.charCodeAt(s11++)) < lt.length ? lt[o11] : -1, n11 = (o11 = e11.charCodeAt(s11++)) < lt.length ? lt[o11] : -1, -1 != r11 && -1 != n11) && (a11 = r11 << 2 >>> 0 | (48 & n11) >> 4, u3.push(String.fromCharCode(a11)), !(++c3 >= t11 || s11 >= l3 || -1 == (i11 = (o11 = e11.charCodeAt(s11++)) < lt.length ? lt[o11] : -1) || (a11 = (15 & n11) << 4 >>> 0 | (60 & i11) >> 2, u3.push(String.fromCharCode(a11)), ++c3 >= t11 || s11 >= l3))); ) {
            ;
            a11 = (3 & i11) << 6 >>> 0 | ((o11 = e11.charCodeAt(s11++)) < lt.length ? lt[o11] : -1), u3.push(String.fromCharCode(a11)), ++c3;
          }
          var d3 = [];
          for (s11 = 0; s11 < c3; s11++) d3.push(u3[s11].charCodeAt(0));
          return d3;
        }(l2, ln);
        function d2(e11) {
          var t11 = [];
          return t11.push("$2"), a10 >= "a" && t11.push(a10), t11.push("$"), s10 < 10 && t11.push("0"), t11.push(s10.toString()), t11.push("$"), t11.push(lr(u2, u2.length)), t11.push(lr(e11, 4 * ls.length - 1)), t11.join("");
        }
        if (void 0 === r10) return d2(ld(c2, u2, s10));
        ld(c2, u2, s10, function(e11, t11) {
          e11 ? r10(e11, null) : r10(null, d2(t11));
        }, n10);
      }
      let lf = function(e10, t10, r10, n10) {
        function i10(r11) {
          "string" != typeof e10 || "string" != typeof t10 ? s7(r11.bind(this, Error("Illegal arguments: " + typeof e10 + ", " + typeof t10))) : 60 !== t10.length ? s7(r11.bind(this, null, false)) : function(e11, t11, r12, n11) {
            function i11(r13) {
              "string" == typeof e11 && "number" == typeof t11 ? function(e12, t12, r14) {
                if ("function" == typeof t12 && (r14 = t12, t12 = void 0), "function" == typeof e12 && (r14 = e12, e12 = void 0), void 0 === e12) e12 = li;
                else if ("number" != typeof e12) throw Error("illegal arguments: " + typeof e12);
                function n12(t13) {
                  s7(function() {
                    try {
                      t13(null, s9(e12));
                    } catch (e13) {
                      t13(e13);
                    }
                  });
                }
                if (!r14) return new Promise(function(e13, t13) {
                  n12(function(r15, n13) {
                    r15 ? t13(r15) : e13(n13);
                  });
                });
                if ("function" != typeof r14) throw Error("Illegal callback: " + typeof r14);
                n12(r14);
              }(t11, function(t12, i12) {
                lp(e11, i12, r13, n11);
              }) : "string" == typeof e11 && "string" == typeof t11 ? lp(e11, t11, r13, n11) : s7(r13.bind(this, Error("Illegal arguments: " + typeof e11 + ", " + typeof t11)));
            }
            if (!r12) return new Promise(function(e12, t12) {
              i11(function(r13, n12) {
                r13 ? t12(r13) : e12(n12);
              });
            });
            if ("function" != typeof r12) throw Error("Illegal callback: " + typeof r12);
            i11(r12);
          }(e10, t10.substring(0, 29), function(e11, n11) {
            e11 ? r11(e11) : r11(null, function(e12, t11) {
              for (var r12 = e12.length ^ t11.length, n12 = 0; n12 < e12.length; ++n12) r12 |= e12.charCodeAt(n12) ^ t11.charCodeAt(n12);
              return 0 === r12;
            }(n11, t10));
          }, n10);
        }
        if (!r10) return new Promise(function(e11, t11) {
          i10(function(r11, n11) {
            r11 ? t11(r11) : e11(n11);
          });
        });
        if ("function" != typeof r10) throw Error("Illegal callback: " + typeof r10);
        i10(r10);
      }, { handlers: lh, signIn: lg, signOut: lm, auth: lb } = function(e10) {
        if ("function" == typeof e10) {
          let t11 = async (t12) => {
            let r10 = await e10(t12);
            return sN(r10), sP(sI(t12), r10);
          };
          return { handlers: { GET: t11, POST: t11 }, auth: sJ(e10, (e11) => sN(e11)), signIn: async (t12, r10, n10) => {
            let i10 = await e10(void 0);
            return sN(i10), s2(t12, r10, n10, i10);
          }, signOut: async (t12) => {
            let r10 = await e10(void 0);
            return sN(r10), s5(t12, r10);
          }, unstable_update: async (t12) => {
            let r10 = await e10(void 0);
            return sN(r10), s6(t12, r10);
          } };
        }
        sN(e10);
        let t10 = (t11) => sP(sI(t11), e10);
        return { handlers: { GET: t10, POST: t10 }, auth: sJ(e10), signIn: (t11, r10, n10) => s2(t11, r10, n10, e10), signOut: (t11) => s5(t11, e10), unstable_update: (t11) => s6(t11, e10) };
      }({ providers: [{ id: "credentials", name: "Credentials", type: "credentials", credentials: {}, authorize: () => null, options: { name: "Credentials", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } }, async authorize(e10) {
        if (!e10?.email || !e10?.password) throw Error("Invalid credentials");
        let t10 = await s8.adminUser.findUnique({ where: { email: e10.email } });
        if (!t10 || !t10.password) throw Error("User not found");
        if (!await lf(e10.password, t10.password)) throw Error("Invalid password");
        return { id: t10.id, email: t10.email, name: t10.name, role: t10.role };
      } } }], session: { strategy: "jwt" }, pages: { signIn: "/admin/login" }, callbacks: { jwt: async ({ token: e10, user: t10 }) => (t10 && (e10.role = t10.role, e10.id = t10.id), e10), session: async ({ session: e10, token: t10 }) => (t10 && (e10.user.role = t10.role, e10.user.id = t10.id), e10) } }), ly = lb((e10) => {
        let t10 = !!e10.auth;
        return e10.nextUrl.pathname.startsWith("/admin/login") ? t10 ? K.redirect(new URL("/admin", e10.nextUrl)) : K.next() : !t10 && e10.nextUrl.pathname.startsWith("/admin") ? K.redirect(new URL("/admin/login", e10.nextUrl)) : e10.nextUrl.pathname.startsWith("/admin") && e10.auth?.user?.role !== "admin" ? K.redirect(new URL("/", e10.url)) : void 0;
      });
      e.s(["config", 0, { matcher: ["/admin/:path*"] }, "default", 0, ly], 96592);
      var lw = e.i(96592);
      e.i(96588);
      let l_ = { ...lw }, lv = "/middleware", lx = l_.middleware || l_.default;
      if ("function" != typeof lx) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${lv}" must export a function named \`middleware\` or a default function.`);
      e.s(["default", 0, (e10) => e9({ ...e10, page: lv, handler: async (...e11) => {
        try {
          return await lx(...e11);
        } catch (i10) {
          let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
          throw await d(i10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), i10;
        }
      } })], 58217);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7300e251.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_7300e251 = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7300e251.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7300e251.js", { otherChunks: ["chunks/[root-of-the-server]__28d90508._.js", "chunks/_4b0b3359._.js"], runtimeModuleIds: [35825] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = /* @__PURE__ */ new WeakMap();
      function r(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let n = r.prototype, o = Object.prototype.hasOwnProperty, u = "u" > typeof Symbol && Symbol.toStringTag;
      function l(e2, t2, r2) {
        o.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function i(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = s(t2), e2[t2] = r2), r2;
      }
      function s(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function a(e2, t2) {
        l(e2, "__esModule", { value: true }), u && l(e2, u, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) l(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? l(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : l(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      n.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = i(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, a(n2, e2);
      }, n.j = function(e2, r2) {
        var n2, u2;
        let l2, s2, a2;
        null != r2 ? s2 = (l2 = i(this.c, r2)).exports : (l2 = this.m, s2 = this.e);
        let c2 = (n2 = l2, u2 = s2, (a2 = t.get(n2)) || (t.set(n2, a2 = []), n2.exports = n2.namespaceObject = new Proxy(u2, { get(e3, t2) {
          if (o.call(e3, t2) || "default" === t2 || "__esModule" === t2) return Reflect.get(e3, t2);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t2);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t2 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t2.includes(r3) || t2.push(r3);
          return t2;
        } })), a2);
        "object" == typeof e2 && null !== e2 && c2.push(e2);
      }, n.v = function(e2, t2) {
        (null != t2 ? i(this.c, t2) : this.m).exports = e2;
      }, n.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? i(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let c = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, f = [null, c({}), c([]), c(c)];
      function d(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !f.includes(t3); t3 = c(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), a(t2, n2), t2;
      }
      function p(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function h(e2) {
        let t2 = N(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = d(r2, p(r2), r2 && r2.__esModule);
      }
      function m(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function b(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function y() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      n.i = h, n.A = function(e2) {
        return this.r(e2)(h.bind(this));
      }, n.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, n.r = function(e2) {
        return N(e2, this.m).exports;
      }, n.f = function(e2) {
        function t2(t3) {
          if (t3 = m(t3), o.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = m(t3), o.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let O = Symbol("turbopack queues"), g = Symbol("turbopack exports"), w = Symbol("turbopack error");
      function _(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      n.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = y(), s2 = Object.assign(i2, { [g]: r2.exports, [O]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), s2.catch(() => {
          });
        } }), a2 = { get: () => s2, set(e3) {
          e3 !== s2 && (s2[g] = e3);
        } };
        Object.defineProperty(r2, "exports", a2), Object.defineProperty(r2, "namespaceObject", a2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (O in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [g]: {}, [O]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[g] = e5, _(t4);
                }, (e5) => {
                  r4[w] = e5, _(t4);
                }), r4;
              }
            }
            return { [g]: e4, [O]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[w]) throw e4[w];
            return e4[g];
          }), { promise: u3, resolve: l3 } = y(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function s3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[O](s3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(s2[w] = e3) : u2(s2[g]), _(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let C = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function j(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      C.prototype = URL.prototype, n.U = C, n.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, n.g = globalThis;
      let k = r.prototype;
      var U, R = ((U = R || {})[U.Runtime = 0] = "Runtime", U[U.Parent = 1] = "Parent", U[U.Update = 2] = "Update", U);
      let P = /* @__PURE__ */ new Map();
      n.M = P;
      let v = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return M(e2, t2, A(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!P.has(e3) || v.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => T.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) T.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = M(e2, t2, A(n3));
            T.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = M(e2, t2, A(r2.path)), l2)) T.has(o3) || T.set(o3, n2);
        }
        for (let e3 of o2) v.has(e3) || v.set(e3, n2);
        await n2;
      }
      k.l = function(e2) {
        return $(1, this.m.id, e2);
      };
      let x = Promise.resolve(void 0), E = /* @__PURE__ */ new WeakMap();
      function M(t2, r2, n2) {
        let o2 = e.loadChunkCached(t2, n2), u2 = E.get(o2);
        if (void 0 === u2) {
          let e2 = E.set.bind(E, o2, x);
          u2 = o2.then(e2).catch((e3) => {
            let o3;
            switch (t2) {
              case 0:
                o3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case 1:
                o3 = `from module ${r2}`;
                break;
              case 2:
                o3 = "from an HMR update";
                break;
              default:
                j(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let u3 = Error(`Failed to load chunk ${n2} ${o3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw u3.name = "ChunkLoadError", u3;
          }), E.set(o2, u2);
        }
        return u2;
      }
      function A(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      k.L = function(e2) {
        return M(1, this.m.id, e2);
      }, k.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, k.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, k.b = function(e2) {
        let t2 = new Blob([`self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_CHUNK_SUFFIX = ${JSON.stringify("")};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(e2.reverse().map(A), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`], { type: "text/javascript" });
        return URL.createObjectURL(t2);
      };
      let K = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      n.w = function(t2, r2, n2) {
        return e.loadWebAssembly(1, this.m.id, t2, r2, n2);
      }, n.u = function(t2, r2) {
        return e.loadWebAssemblyModule(1, this.m.id, t2, r2);
      };
      let S = {};
      n.c = S;
      let N = (e2, t2) => {
        let r2 = S[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return q(e2, R.Parent, t2.id);
      };
      function q(e2, t2, n2) {
        let o2 = P.get(e2);
        if ("function" != typeof o2) throw Error(function(e3, t3, r2) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r2}`;
              break;
            case 1:
              n3 = `because it was required from module ${r2}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              j(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, n2));
        let u2 = s(e2), l2 = u2.exports;
        S[e2] = u2;
        let i2 = new r(u2, l2);
        try {
          o2(i2, u2, l2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && d(u2.exports, u2.namespaceObject), u2;
      }
      function L(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          let t3 = decodeURIComponent(("u" > typeof TURBOPACK_NEXT_CHUNK_URLS ? TURBOPACK_NEXT_CHUNK_URLS.pop() : e2.getAttribute("src")).replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3, r3, n3) {
          let o2 = 1;
          for (; o2 < e2.length; ) {
            let t4 = e2[o2], n4 = o2 + 1;
            for (; n4 < e2.length && "function" != typeof e2[n4]; ) n4++;
            if (n4 === e2.length) throw Error("malformed chunk format, expected a factory function");
            if (!r3.has(t4)) {
              let u2 = e2[n4];
              for (Object.defineProperty(u2, "name", { value: "module evaluation" }); o2 < n4; o2++) t4 = e2[o2], r3.set(t4, u2);
            }
            o2 = n4 + 1;
          }
        }(t2, 0, P)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : d(n2, p(n2), true);
      }
      n.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? d(t2.default, p(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), n.x = B, e = { registerChunk(e2, t2) {
        I.add(e2), function(e3) {
          let t3 = W.get(e3);
          if (null != t3) {
            for (let r2 of t3) r2.requiredChunks.delete(e3), 0 === r2.requiredChunks.size && F(r2.runtimeModuleIds, r2.chunkPath);
            W.delete(e3);
          }
        }(e2), null != t2 && (0 === t2.otherChunks.length ? F(t2.runtimeModuleIds, e2) : function(e3, t3, r2) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r2, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = b(e4);
            if (I.has(t4)) continue;
            n2.add(t4);
            let r3 = W.get(t4);
            null == r3 && (r3 = /* @__PURE__ */ new Set(), W.set(t4, r3)), r3.add(o2);
          }
          0 === o2.requiredChunks.size && F(o2.runtimeModuleIds, o2.chunkPath);
        }(e2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = b(e3), K.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      let I = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Map();
      function F(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = S[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          q(t3, R.Runtime, e3);
        }(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let X = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: L }, X.forEach(L);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
import __onw_wasm_da7cd21b3acf8cb1__ from "./wasm/wasm_da7cd21b3acf8cb1.wasm";
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\\\.json)?[\\/#\\?]?$"] }];
    globalThis.wasm_da7cd21b3acf8cb1 = __onw_wasm_da7cd21b3acf8cb1__;
    require_root_of_the_server_28d90508();
    require_b0b3359();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_7300e251();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 2592e3, "formats": ["image/avif", "image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "**" }], "qualities": [75], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": true, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/bayu/Documents/ANTIGRAVITY/WhoKnows3", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 3, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": false, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": false, "lockDistDir": true, "isolatedDevBuild": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": false, "turbopackInferModuleSideEffects": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/Users/bayu/Documents/ANTIGRAVITY/WhoKnows3" }, "distDirRoot": ".next", "_originalRedirects": [{ "source": "/models", "destination": "/women", "permanent": true }, { "source": "/model", "destination": "/women", "permanent": true }, { "source": "/man", "destination": "/men", "permanent": true }, { "source": "/:path*", "has": [{ "type": "host", "value": "whoknows.beauty" }], "destination": "https://whoknowsmodels.com/:path*", "permanent": true }, { "source": "/:path*", "has": [{ "type": "host", "value": "www.whoknows.beauty" }], "destination": "https://whoknowsmodels.com/:path*", "permanent": true }] };
var BuildId = "aCLrYlVCeedPgeF4AgZXH";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }, { "source": "/models", "destination": "/women", "statusCode": 308, "regex": "^(?!/_next)/models(?:/)?$" }, { "source": "/model", "destination": "/women", "statusCode": 308, "regex": "^(?!/_next)/model(?:/)?$" }, { "source": "/man", "destination": "/men", "statusCode": 308, "regex": "^(?!/_next)/man(?:/)?$" }, { "source": "/:path*", "has": [{ "type": "host", "value": "whoknows.beauty" }], "destination": "https://whoknowsmodels.com/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:path*", "has": [{ "type": "host", "value": "www.whoknows.beauty" }], "destination": "https://whoknowsmodels.com/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/applications", "regex": "^/admin/applications(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/applications(?:/)?$" }, { "page": "/admin/campaigns", "regex": "^/admin/campaigns(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/campaigns(?:/)?$" }, { "page": "/admin/contacts", "regex": "^/admin/contacts(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/contacts(?:/)?$" }, { "page": "/admin/content", "regex": "^/admin/content(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/content(?:/)?$" }, { "page": "/admin/hero", "regex": "^/admin/hero(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/hero(?:/)?$" }, { "page": "/admin/login", "regex": "^/admin/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/login(?:/)?$" }, { "page": "/admin/logs", "regex": "^/admin/logs(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/logs(?:/)?$" }, { "page": "/api", "regex": "^/api(?:/)?$", "routeKeys": {}, "namedRegex": "^/api(?:/)?$" }, { "page": "/api/apply", "regex": "^/api/apply(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/apply(?:/)?$" }, { "page": "/api/campaigns", "regex": "^/api/campaigns(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/campaigns(?:/)?$" }, { "page": "/api/clients", "regex": "^/api/clients(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/clients(?:/)?$" }, { "page": "/api/contact", "regex": "^/api/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/contact(?:/)?$" }, { "page": "/api/hero-slides", "regex": "^/api/hero\\-slides(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/hero\\-slides(?:/)?$" }, { "page": "/api/models", "regex": "^/api/models(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/models(?:/)?$" }, { "page": "/api/setup-admin", "regex": "^/api/setup\\-admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/setup\\-admin(?:/)?$" }, { "page": "/apply", "regex": "^/apply(?:/)?$", "routeKeys": {}, "namedRegex": "^/apply(?:/)?$" }, { "page": "/contact", "regex": "^/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/contact(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/jobs", "regex": "^/jobs(?:/)?$", "routeKeys": {}, "namedRegex": "^/jobs(?:/)?$" }, { "page": "/men", "regex": "^/men(?:/)?$", "routeKeys": {}, "namedRegex": "^/men(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }, { "page": "/women", "regex": "^/women(?:/)?$", "routeKeys": {}, "namedRegex": "^/women(?:/)?$" }], "dynamic": [{ "page": "/admin/models/[gender]", "regex": "^/admin/models/([^/]+?)(?:/)?$", "routeKeys": { "nxtPgender": "nxtPgender" }, "namedRegex": "^/admin/models/(?<nxtPgender>[^/]+?)(?:/)?$" }, { "page": "/admin/models/[gender]/new", "regex": "^/admin/models/([^/]+?)/new(?:/)?$", "routeKeys": { "nxtPgender": "nxtPgender" }, "namedRegex": "^/admin/models/(?<nxtPgender>[^/]+?)/new(?:/)?$" }, { "page": "/admin/models/[gender]/[id]/edit", "regex": "^/admin/models/([^/]+?)/([^/]+?)/edit(?:/)?$", "routeKeys": { "nxtPgender": "nxtPgender", "nxtPid": "nxtPid" }, "namedRegex": "^/admin/models/(?<nxtPgender>[^/]+?)/(?<nxtPid>[^/]+?)/edit(?:/)?$" }, { "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }, { "page": "/jobs/[slug]", "regex": "^/jobs/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/jobs/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/model/[slug]", "regex": "^/model/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/model/(?<nxtPslug>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [{ "source": "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }], "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(svg|jpg|jpeg|png|gif|ico|webp|avif)(?:/)?$" }, { "source": "/:path*", "headers": [{ "key": "X-DNS-Prefetch-Control", "value": "on" }, { "key": "X-Content-Type-Options", "value": "nosniff" }, { "key": "X-Frame-Options", "value": "SAMEORIGIN" }, { "key": "Referrer-Policy", "value": "origin-when-cross-origin" }, { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }, { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()" }, { "key": "X-XSS-Protection", "value": "1; mode=block" }], "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/about": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/about", "dataRoute": "/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/apply": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/apply", "dataRoute": "/apply.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/contact": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/contact", "dataRoute": "/contact.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/jobs/ethereal-dreams": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/jobs/[slug]", "dataRoute": "/jobs/ethereal-dreams.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/jobs/noir-elegance": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/jobs/[slug]", "dataRoute": "/jobs/noir-elegance.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/jobs/summer-escape-2024": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/jobs/[slug]", "dataRoute": "/jobs/summer-escape-2024.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/jobs/urban-edge": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/jobs/[slug]", "dataRoute": "/jobs/urban-edge.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/jobs": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 3600, "initialExpireSeconds": 31536e3, "srcRoute": "/jobs", "dataRoute": "/jobs.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/men": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/men", "dataRoute": "/men.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/athina": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/athina.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/candice": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/candice.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/celine": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/celine.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/chantal": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/chantal.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/elana": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/elana.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/hui-wang": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/hui-wang.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/jasmin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/jasmin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/julien": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/julien.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/laura": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/laura.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/madeline": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/madeline.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/megan": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/megan.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/mika": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/mika.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/parina": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/parina.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/sofia": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/sofia.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/triseya": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/model/[slug]", "dataRoute": "/model/triseya.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 86400, "initialExpireSeconds": 31536e3, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/women": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": 60, "initialExpireSeconds": 31536e3, "srcRoute": "/women", "dataRoute": "/women.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": { "/jobs/[slug]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/jobs/([^/]+?)(?:/)?$", "dataRoute": "/jobs/[slug].rsc", "fallback": null, "fallbackRouteParams": [], "dataRouteRegex": "^/jobs/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/model/[slug]": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/model/([^/]+?)(?:/)?$", "dataRoute": "/model/[slug].rsc", "fallback": false, "fallbackRouteParams": [], "dataRouteRegex": "^/model/([^/]+?)\\.rsc$", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "notFoundRoutes": [], "preview": { "previewModeId": "0439b2004fc884dab84273985c4074e1", "previewModeSigningKey": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774", "previewModeEncryptionKey": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__28d90508._.js", "server/edge/chunks/_4b0b3359._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7300e251.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\\\.json)?[\\/#\\?]?$", "originalSource": "/admin/:path*" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } } }, "sortedMiddleware": ["/"], "functions": { "/admin/applications/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/app/admin/applications/page_client-reference-manifest.js", "server/edge/chunks/ssr/_33bea6d6._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_1cc1db86._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/node_modules_date-fns_format_f872a3eb.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_eb869e39._.js", "server/edge/chunks/ssr/node_modules_next_dist_c01a89b5._.js", "server/edge/chunks/ssr/[root-of-the-server]__89473080._.js", "server/edge/chunks/ssr/_279227b0._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/[root-of-the-server]__842e79ec._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/_150a21f2._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_fda7ceeb.js", "server/app/admin/applications/page/react-loadable-manifest.js"], "name": "app/admin/applications/page", "page": "/admin/applications/page", "matchers": [{ "regexp": "^/admin/applications(?:/)?$", "originalSource": "/admin/applications" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/campaigns/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/edge/chunks/ssr/_5edeef04._.js", "server/edge/chunks/ssr/node_modules_lucide-react_dist_esm_icons_plus_93281df8.js", "server/edge/chunks/ssr/_3866d081._.js", "server/app/admin/campaigns/page_client-reference-manifest.js", "server/edge/chunks/ssr/[root-of-the-server]__3450986a._.js", "server/edge/chunks/ssr/_6d588e24._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_eb869e39._.js", "server/edge/chunks/ssr/src_lib_storage_ts_3ccbc833._.js", "server/edge/chunks/ssr/node_modules_next_dist_c01a89b5._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_1cc1db86._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/_0b8113ac._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/[root-of-the-server]__842e79ec._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/_202a53b0._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_822065cc.js", "server/app/admin/campaigns/page/react-loadable-manifest.js"], "name": "app/admin/campaigns/page", "page": "/admin/campaigns/page", "matchers": [{ "regexp": "^/admin/campaigns(?:/)?$", "originalSource": "/admin/campaigns" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/contacts/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/app/admin/contacts/page_client-reference-manifest.js", "server/edge/chunks/ssr/_33bea6d6._.js", "server/edge/chunks/ssr/[root-of-the-server]__53266b07._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_1cc1db86._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_eb869e39._.js", "server/edge/chunks/ssr/node_modules_next_dist_c01a89b5._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/node_modules_date-fns_format_f872a3eb.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/_db6758d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/[root-of-the-server]__842e79ec._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/_a12cc64a._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_4003dc21.js", "server/app/admin/contacts/page/react-loadable-manifest.js"], "name": "app/admin/contacts/page", "page": "/admin/contacts/page", "matchers": [{ "regexp": "^/admin/contacts(?:/)?$", "originalSource": "/admin/contacts" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/content/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/edge/chunks/ssr/_27080857._.js", "server/edge/chunks/ssr/src_components_ui_tabs_tsx_5830e183._.js", "server/app/admin/content/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_1cc1db86._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/[root-of-the-server]__beb68d09._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_eb869e39._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_dist_c01a89b5._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/_5c409198._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/[root-of-the-server]__842e79ec._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/_0135fac0._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_254eac78.js", "server/app/admin/content/page/react-loadable-manifest.js"], "name": "app/admin/content/page", "page": "/admin/content/page", "matchers": [{ "regexp": "^/admin/content(?:/)?$", "originalSource": "/admin/content" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/hero/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/edge/chunks/ssr/_d1992b45._.js", "server/edge/chunks/ssr/node_modules_lucide-react_dist_esm_icons_plus_93281df8.js", "server/edge/chunks/ssr/_3866d081._.js", "server/app/admin/hero/page_client-reference-manifest.js", "server/edge/chunks/ssr/_c6c02a8c._.js", "server/edge/chunks/ssr/[root-of-the-server]__7efe1bb3._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_1cc1db86._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_eb869e39._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_c01a89b5._.js", "server/edge/chunks/ssr/src_lib_storage_ts_3ccbc833._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/_0ab8c0f0._.js", "server/edge/chunks/ssr/[root-of-the-server]__842e79ec._.js", "server/edge/chunks/ssr/_4d8b1305._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_a5894bb4.js", "server/app/admin/hero/page/react-loadable-manifest.js"], "name": "app/admin/hero/page", "page": "/admin/hero/page", "matchers": [{ "regexp": "^/admin/hero(?:/)?$", "originalSource": "/admin/hero" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/login/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/edge/chunks/ssr/_b3263887._.js", "server/app/admin/login/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app_admin_login_page_actions_1c4deb74.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/node_modules_next_dist_e305d1a8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_9c43ab3e._.js", "server/edge/chunks/ssr/_bbf08bb4._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/[root-of-the-server]__8921dc22._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/node_modules_next_dist_5754c5d6._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/[root-of-the-server]__40b2b461._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_7c2612eb.js", "server/app/admin/login/page/react-loadable-manifest.js"], "name": "app/admin/login/page", "page": "/admin/login/page", "matchers": [{ "regexp": "^/admin/login(?:/)?$", "originalSource": "/admin/login" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/logs/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/app/admin/logs/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app_admin_logs_page_actions_9a9ffb6a.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_9c43ab3e._.js", "server/edge/chunks/ssr/node_modules_date-fns_format_f872a3eb.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/[root-of-the-server]__8921dc22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_e305d1a8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/_21052f82._.js", "server/edge/chunks/ssr/node_modules_next_dist_5754c5d6._.js", "server/edge/chunks/ssr/[root-of-the-server]__6820c972._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_e71776b3.js", "server/app/admin/logs/page/react-loadable-manifest.js"], "name": "app/admin/logs/page", "page": "/admin/logs/page", "matchers": [{ "regexp": "^/admin/logs(?:/)?$", "originalSource": "/admin/logs" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/models/[gender]/[id]/edit/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/edge/chunks/ssr/src_components_0a5a858b._.js", "server/edge/chunks/ssr/_3866d081._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/app/admin/models/[gender]/[id]/edit/page_client-reference-manifest.js", "server/edge/chunks/ssr/[root-of-the-server]__3450986a._.js", "server/edge/chunks/ssr/_517913cc._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/src_lib_storage_ts_3ccbc833._.js", "server/edge/chunks/ssr/node_modules_next_dist_eb869e39._.js", "server/edge/chunks/ssr/node_modules_next_dist_c01a89b5._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_1cc1db86._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/_68b56819._.js", "server/edge/chunks/ssr/[root-of-the-server]__842e79ec._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/_749ffcad._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_57a3f2c2.js", "server/app/admin/models/[gender]/[id]/edit/page/react-loadable-manifest.js"], "name": "app/admin/models/[gender]/[id]/edit/page", "page": "/admin/models/[gender]/[id]/edit/page", "matchers": [{ "regexp": "^/admin/models/(?P<nxtPgender>[^/]+?)/(?P<nxtPid>[^/]+?)/edit(?:/)?$", "originalSource": "/admin/models/[gender]/[id]/edit" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/models/[gender]/new/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/edge/chunks/ssr/src_components_0a5a858b._.js", "server/edge/chunks/ssr/_3866d081._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/app/admin/models/[gender]/new/page_client-reference-manifest.js", "server/edge/chunks/ssr/[root-of-the-server]__3450986a._.js", "server/edge/chunks/ssr/_16d218f9._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/src_lib_storage_ts_3ccbc833._.js", "server/edge/chunks/ssr/node_modules_next_dist_eb869e39._.js", "server/edge/chunks/ssr/node_modules_next_dist_c01a89b5._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_1cc1db86._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/_f35d57d3._.js", "server/edge/chunks/ssr/[root-of-the-server]__842e79ec._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/_d2dc98e0._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_433c6183.js", "server/app/admin/models/[gender]/new/page/react-loadable-manifest.js"], "name": "app/admin/models/[gender]/new/page", "page": "/admin/models/[gender]/new/page", "matchers": [{ "regexp": "^/admin/models/(?P<nxtPgender>[^/]+?)/new(?:/)?$", "originalSource": "/admin/models/[gender]/new" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/models/[gender]/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/app/admin/models/[gender]/page_client-reference-manifest.js", "server/edge/chunks/ssr/_33bea6d6._.js", "server/edge/chunks/ssr/_e26659b7._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_1cc1db86._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_dist_eb869e39._.js", "server/edge/chunks/ssr/src_lib_storage_ts_3ccbc833._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_next_dist_4bd23b54._.js", "server/edge/chunks/ssr/[root-of-the-server]__c235b2d0._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/[root-of-the-server]__e11cdceb._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/_c8227098._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_8a39170f.js", "server/app/admin/models/[gender]/page/react-loadable-manifest.js"], "name": "app/admin/models/[gender]/page", "page": "/admin/models/[gender]/page", "matchers": [{ "regexp": "^/admin/models/(?P<nxtPgender>[^/]+?)(?:/)?$", "originalSource": "/admin/models/[gender]" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/admin/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_app-render_5d14614e._.js", "server/edge/chunks/ssr/node_modules_next_dist_ee1c76ad._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_aeeb2a8e._.js", "server/edge/chunks/ssr/node_modules_281e655a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e487d6eb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_1de25341._.js", "server/edge/chunks/ssr/node_modules_23337c8b._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_49c1937b._.js", "server/edge/chunks/ssr/node_modules_5a701ded._.js", "server/edge/chunks/ssr/node_modules_80102565._.js", "server/edge/chunks/ssr/src_components_2c536798._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_71186a4f._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_sonner_dist_index_mjs_e46d1fbd._.js", "server/edge/chunks/ssr/_5d2a7335._.js", "server/edge/chunks/ssr/src_app_not-found_tsx_fe8898dc._.js", "server/app/admin/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app_admin_page_actions_6276eb31.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_66ff6d9f._.js", "server/edge/chunks/ssr/[root-of-the-server]__ced2a698._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_39d8269c._.js", "server/edge/chunks/ssr/_7793dd34._.js", "server/edge/chunks/ssr/node_modules_next_dist_e305d1a8._.js", "server/edge/chunks/ssr/node_modules_next_dist_50158afe._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_9c43ab3e._.js", "server/edge/chunks/ssr/[root-of-the-server]__8921dc22._.js", "server/edge/chunks/ssr/[root-of-the-server]__933d4ee8._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0a43bd21._.js", "server/edge/chunks/ssr/[root-of-the-server]__cf42158c._.js", "server/edge/chunks/ssr/_07e6eebb._.js", "server/edge/chunks/ssr/node_modules_486ea0df._.js", "server/edge/chunks/ssr/node_modules_next_dist_895fd0f3._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_251ab677._.js", "server/edge/chunks/ssr/node_modules_next_dist_5754c5d6._.js", "server/edge/chunks/ssr/_ad7b9684._.js", "server/edge/chunks/ssr/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_d84bc193.js", "server/app/admin/page/react-loadable-manifest.js"], "name": "app/admin/page", "page": "/admin/page", "matchers": [{ "regexp": "^/admin(?:/)?$", "originalSource": "/admin" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/apply/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/apply/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_apply_route_actions_b2aafade.js", "server/edge/chunks/[root-of-the-server]__beb9e0c8._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/_b90de3c3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_ab457775.js"], "name": "app/api/apply/route", "page": "/api/apply/route", "matchers": [{ "regexp": "^/api/apply(?:/)?$", "originalSource": "/api/apply" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/auth/[...nextauth]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/auth/[...nextauth]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_auth_[___nextauth]_route_actions_5a8b4c61.js", "server/edge/chunks/[root-of-the-server]__eec3ee93._.js", "server/edge/chunks/_0953985d._.js", "server/edge/chunks/_b90de3c3._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/node_modules_next_dist_esm_ae2f45d9._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_247f9cde.js"], "name": "app/api/auth/[...nextauth]/route", "page": "/api/auth/[...nextauth]/route", "matchers": [{ "regexp": "^/api/auth/(?P<nxtPnextauth>.+?)(?:/)?$", "originalSource": "/api/auth/[...nextauth]" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/campaigns/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/campaigns/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_campaigns_route_actions_49ed072a.js", "server/edge/chunks/[root-of-the-server]__f98ce47a._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/_b90de3c3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_b85ae112.js"], "name": "app/api/campaigns/route", "page": "/api/campaigns/route", "matchers": [{ "regexp": "^/api/campaigns(?:/)?$", "originalSource": "/api/campaigns" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/clients/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/clients/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_clients_route_actions_29a33851.js", "server/edge/chunks/[root-of-the-server]__2efd2295._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/_b90de3c3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_abc04348.js"], "name": "app/api/clients/route", "page": "/api/clients/route", "matchers": [{ "regexp": "^/api/clients(?:/)?$", "originalSource": "/api/clients" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/contact/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/contact/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_contact_route_actions_11f6a30d.js", "server/edge/chunks/[root-of-the-server]__7cd8d835._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/_b90de3c3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_b5c9c35b.js"], "name": "app/api/contact/route", "page": "/api/contact/route", "matchers": [{ "regexp": "^/api/contact(?:/)?$", "originalSource": "/api/contact" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/hero-slides/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/hero-slides/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_hero-slides_route_actions_0007a084.js", "server/edge/chunks/[root-of-the-server]__5d750b65._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/_b90de3c3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_e2a56b75.js"], "name": "app/api/hero-slides/route", "page": "/api/hero-slides/route", "matchers": [{ "regexp": "^/api/hero-slides(?:/)?$", "originalSource": "/api/hero-slides" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/models/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/models/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_models_route_actions_ade8c9d8.js", "server/edge/chunks/[root-of-the-server]__1851e8e6._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/_b90de3c3._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_45b3f976.js"], "name": "app/api/models/route", "page": "/api/models/route", "matchers": [{ "regexp": "^/api/models(?:/)?$", "originalSource": "/api/models" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_route_actions_ff157ba0.js", "server/edge/chunks/[root-of-the-server]__ce972060._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_4c680eb3.js"], "name": "app/api/route", "page": "/api/route", "matchers": [{ "regexp": "^/api(?:/)?$", "originalSource": "/api" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } }, "/api/setup-admin/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "required-server-files.js", "server/server-reference-manifest.js", "server/app/api/setup-admin/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_setup-admin_route_actions_ef974e62.js", "server/edge/chunks/[root-of-the-server]__2b6167d7._.js", "server/edge/chunks/_0953985d._.js", "server/edge/chunks/_b90de3c3._.js", "server/edge/chunks/node_modules_next_dist_16e7cc16._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_8638b1e8.js"], "name": "app/api/setup-admin/route", "page": "/api/setup-admin/route", "matchers": [{ "regexp": "^/api/setup-admin(?:/)?$", "originalSource": "/api/setup-admin" }], "wasm": [{ "name": "wasm_da7cd21b3acf8cb1", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "aCLrYlVCeedPgeF4AgZXH", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ib1rwvvZ60agDAkQo5VW8BoUjfbCqou7flq3+qZPRKg=", "__NEXT_PREVIEW_MODE_ID": "0439b2004fc884dab84273985c4074e1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "f88110bdd8c2e75c0c2db65e100c49f36ecda1bb4c5d6e3b6367796354a90265", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c4c5b53854530603f6a2def738a6174a77a1f8e7928b14a47a5d780725d5b774" } } } };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/about/page": "/about", "/admin/applications/page": "/admin/applications", "/admin/campaigns/page": "/admin/campaigns", "/admin/contacts/page": "/admin/contacts", "/admin/content/page": "/admin/content", "/admin/hero/page": "/admin/hero", "/admin/login/page": "/admin/login", "/admin/logs/page": "/admin/logs", "/admin/models/[gender]/[id]/edit/page": "/admin/models/[gender]/[id]/edit", "/admin/models/[gender]/new/page": "/admin/models/[gender]/new", "/admin/models/[gender]/page": "/admin/models/[gender]", "/admin/page": "/admin", "/api/apply/route": "/api/apply", "/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/api/campaigns/route": "/api/campaigns", "/api/clients/route": "/api/clients", "/api/contact/route": "/api/contact", "/api/hero-slides/route": "/api/hero-slides", "/api/models/route": "/api/models", "/api/route": "/api", "/api/setup-admin/route": "/api/setup-admin", "/apply/page": "/apply", "/contact/page": "/contact", "/favicon.ico/route": "/favicon.ico", "/jobs/[slug]/page": "/jobs/[slug]", "/jobs/page": "/jobs", "/men/page": "/men", "/model/[slug]/page": "/model/[slug]", "/page": "/", "/sitemap.xml/route": "/sitemap.xml", "/women/page": "/women" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/admin": {}, "/admin/applications": {}, "/admin/campaigns": {}, "/admin/contacts": {}, "/admin/content": {}, "/admin/hero": {}, "/admin/login": {}, "/admin/logs": {}, "/admin/models/[gender]": {}, "/admin/models/[gender]/[id]/edit": {}, "/admin/models/[gender]/new": {}, "/api": {}, "/api/apply": {}, "/api/auth/[...nextauth]": {}, "/api/campaigns": {}, "/api/clients": {}, "/api/contact": {}, "/api/hero-slides": {}, "/api/models": {}, "/api/setup-admin": {} } };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
