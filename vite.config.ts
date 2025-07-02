import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [".ngrok-free.app"],
  },
  define: {
    global: "globalThis",
    "process.env": process.env ?? {},
  },
  resolve: {
    alias: {
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      assert: "assert",
      crypto: "crypto-browserify",
      util: "util",
      "near-api-js": "near-api-js/dist/near-api-js.js",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      // @ts-ignore
      plugins: [nodePolyfills({ crypto: true })],
    },
  },
});
