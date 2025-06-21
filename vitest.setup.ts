// @ts-nocheck

import {
  render as rtlRender,
  screen as rtlScreen,
  renderHook as rtlRenderHook,
} from "@testing-library/react";
import "@testing-library/jest-dom";

// eslint-disable-next-line
import { vi } from "vitest";

declare global {
  var render: typeof rtlRender;
  var screen: typeof rtlScreen;
  var renderHook: typeof rtlRenderHook;
}

// Make render and screen globally available
global.render = rtlRender;
global.screen = rtlScreen;
global.renderHook = rtlRenderHook;
