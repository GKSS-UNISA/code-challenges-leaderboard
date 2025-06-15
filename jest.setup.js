import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill for TextEncoder/TextDecoder which is used by better-auth
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill for Web APIs
global.Request = class Request {};
global.Response = class Response {};
global.Headers = class Headers {};
global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  });
