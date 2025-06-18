// @ts-nocheck

import { render as rtlRender } from "@testing-library/react";
import "@testing-library/jest-dom";

// eslint-disable-next-line
import { vi } from "vitest";

declare global {
  var render: typeof rtlRender;
  var screen: typeof screen;
}

// Make render and screen globally available
global.render = rtlRender;
