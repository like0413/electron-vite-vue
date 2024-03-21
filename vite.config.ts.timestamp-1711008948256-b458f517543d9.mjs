// vite.config.ts
import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/15755/%E6%A1%8C%E9%9D%A2/test/electron-vite-vue/node_modules/.pnpm/vite@5.1.6_sass@1.71.1/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/15755/%E6%A1%8C%E9%9D%A2/test/electron-vite-vue/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.6_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import electron from "file:///D:/15755/%E6%A1%8C%E9%9D%A2/test/electron-vite-vue/node_modules/.pnpm/vite-plugin-electron@0.28.2_electron@28.2.7_tree-kill@1.2.2_vite-plugin-electron-renderer@0.14.5/node_modules/vite-plugin-electron/dist/simple.mjs";

// package.json
var package_default = {
  name: "tingkelai",
  version: "0.0.42",
  main: "dist-electron/main/index.js",
  description: "\u542C\u5BA2\u6765\u5BA2\u6237\u7AEF",
  author: "\u542C\u5BA2\u6765",
  keywords: [
    "tingkelai"
  ],
  debug: {
    env: {
      VITE_DEV_SERVER_URL: "http://127.0.0.1:3344/"
    }
  },
  type: "module",
  scripts: {
    dev: "vite",
    preview: "vite preview",
    "build:alpha": "vue-tsc --noEmit && vite build && electron-builder",
    "build:beta": "vue-tsc --noEmit && vite build && electron-builder",
    "build:prod": "vue-tsc --noEmit && vite build && electron-builder",
    "release:alpha": "release-it --preRelease=alpha",
    "release:beta": "release-it --preRelease=beta",
    "release:prod": "release-it"
  },
  devDependencies: {
    "@ant-design/icons-vue": "^7.0.1",
    "@electron/notarize": "^2.3.0",
    "@release-it/conventional-changelog": "^8.0.1",
    "@vitejs/plugin-vue": "^5.0.1",
    address: "^2.0.2",
    "ant-design-vue": "4.x",
    electron: "^28.2.7",
    "electron-builder": "^24.13.3",
    "electron-log": "^5.1.2",
    "electron-updater": "^6.1.8",
    "release-it": "^17.1.1",
    sass: "^1.71.1",
    "tree-kill": "^1.2.2",
    typescript: "^5.3.3",
    vite: "^5.0.10",
    "vite-plugin-electron": "^0.28.0",
    "vite-plugin-electron-renderer": "^0.14.5",
    vue: "^3.4.1",
    "vue-router": "^4.3.0",
    "vue-tsc": "^1.8.27"
  }
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///D:/15755/%E6%A1%8C%E9%9D%A2/test/electron-vite-vue/vite.config.ts";
var vite_config_default = defineConfig(({ command }) => {
  fs.rmSync("dist-electron", { recursive: true, force: true });
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return {
    plugins: [
      vue(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: "electron/main/index.ts",
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */
                "[startup] Electron App"
              );
            } else {
              startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                // we can use `external` to exclude them to ensure they work correctly.
                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                // Of course, this is not absolute, just this way is relatively simple. :)
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            }
          }
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : void 0,
              // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            }
          }
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {}
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(package_default.debug.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port
      };
    })(),
    clearScreen: false
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcMTU3NTVcXFxcXHU2ODRDXHU5NzYyXFxcXHRlc3RcXFxcZWxlY3Ryb24tdml0ZS12dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDE1NzU1XFxcXFx1Njg0Q1x1OTc2MlxcXFx0ZXN0XFxcXGVsZWN0cm9uLXZpdGUtdnVlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8xNTc1NS8lRTYlQTElOEMlRTklOUQlQTIvdGVzdC9lbGVjdHJvbi12aXRlLXZ1ZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBlbGVjdHJvbiBmcm9tICd2aXRlLXBsdWdpbi1lbGVjdHJvbi9zaW1wbGUnXHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCB9KSA9PiB7XHJcbiAgZnMucm1TeW5jKCdkaXN0LWVsZWN0cm9uJywgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pXHJcblxyXG4gIGNvbnN0IGlzU2VydmUgPSBjb21tYW5kID09PSAnc2VydmUnXHJcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcclxuICBjb25zdCBzb3VyY2VtYXAgPSBpc1NlcnZlIHx8ICEhcHJvY2Vzcy5lbnYuVlNDT0RFX0RFQlVHXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBlbGVjdHJvbih7XHJcbiAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgLy8gU2hvcnRjdXQgb2YgYGJ1aWxkLmxpYi5lbnRyeWBcclxuICAgICAgICAgIGVudHJ5OiAnZWxlY3Ryb24vbWFpbi9pbmRleC50cycsXHJcbiAgICAgICAgICBvbnN0YXJ0KHsgc3RhcnR1cCB9KSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5WU0NPREVfREVCVUcpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygvKiBGb3IgYC52c2NvZGUvLmRlYnVnLnNjcmlwdC5tanNgICovICdbc3RhcnR1cF0gRWxlY3Ryb24gQXBwJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzdGFydHVwKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpdGU6IHtcclxuICAgICAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgICBzb3VyY2VtYXAsXHJcbiAgICAgICAgICAgICAgbWluaWZ5OiBpc0J1aWxkLFxyXG4gICAgICAgICAgICAgIG91dERpcjogJ2Rpc3QtZWxlY3Ryb24vbWFpbicsXHJcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgLy8gU29tZSB0aGlyZC1wYXJ0eSBOb2RlLmpzIGxpYnJhcmllcyBtYXkgbm90IGJlIGJ1aWx0IGNvcnJlY3RseSBieSBWaXRlLCBlc3BlY2lhbGx5IGBDL0MrK2AgYWRkb25zLFxyXG4gICAgICAgICAgICAgICAgLy8gd2UgY2FuIHVzZSBgZXh0ZXJuYWxgIHRvIGV4Y2x1ZGUgdGhlbSB0byBlbnN1cmUgdGhleSB3b3JrIGNvcnJlY3RseS5cclxuICAgICAgICAgICAgICAgIC8vIE90aGVycyBuZWVkIHRvIHB1dCB0aGVtIGluIGBkZXBlbmRlbmNpZXNgIHRvIGVuc3VyZSB0aGV5IGFyZSBjb2xsZWN0ZWQgaW50byBgYXBwLmFzYXJgIGFmdGVyIHRoZSBhcHAgaXMgYnVpbHQuXHJcbiAgICAgICAgICAgICAgICAvLyBPZiBjb3Vyc2UsIHRoaXMgaXMgbm90IGFic29sdXRlLCBqdXN0IHRoaXMgd2F5IGlzIHJlbGF0aXZlbHkgc2ltcGxlLiA6KVxyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKCdkZXBlbmRlbmNpZXMnIGluIHBrZyA/IHBrZy5kZXBlbmRlbmNpZXMgOiB7fSksXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmVsb2FkOiB7XHJcbiAgICAgICAgICAvLyBTaG9ydGN1dCBvZiBgYnVpbGQucm9sbHVwT3B0aW9ucy5pbnB1dGAuXHJcbiAgICAgICAgICAvLyBQcmVsb2FkIHNjcmlwdHMgbWF5IGNvbnRhaW4gV2ViIGFzc2V0cywgc28gdXNlIHRoZSBgYnVpbGQucm9sbHVwT3B0aW9ucy5pbnB1dGAgaW5zdGVhZCBgYnVpbGQubGliLmVudHJ5YC5cclxuICAgICAgICAgIGlucHV0OiAnZWxlY3Ryb24vcHJlbG9hZC9pbmRleC50cycsXHJcbiAgICAgICAgICB2aXRlOiB7XHJcbiAgICAgICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgICAgc291cmNlbWFwOiBzb3VyY2VtYXAgPyAnaW5saW5lJyA6IHVuZGVmaW5lZCwgLy8gIzMzMlxyXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcclxuICAgICAgICAgICAgICBvdXREaXI6ICdkaXN0LWVsZWN0cm9uL3ByZWxvYWQnLFxyXG4gICAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cygnZGVwZW5kZW5jaWVzJyBpbiBwa2cgPyBwa2cuZGVwZW5kZW5jaWVzIDoge30pLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gUGxveWZpbGwgdGhlIEVsZWN0cm9uIGFuZCBOb2RlLmpzIEFQSSBmb3IgUmVuZGVyZXIgcHJvY2Vzcy5cclxuICAgICAgICAvLyBJZiB5b3Ugd2FudCB1c2UgTm9kZS5qcyBpbiBSZW5kZXJlciBwcm9jZXNzLCB0aGUgYG5vZGVJbnRlZ3JhdGlvbmAgbmVlZHMgdG8gYmUgZW5hYmxlZCBpbiB0aGUgTWFpbiBwcm9jZXNzLlxyXG4gICAgICAgIC8vIFNlZSBcdUQ4M0RcdURDNDkgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uLXZpdGUvdml0ZS1wbHVnaW4tZWxlY3Ryb24tcmVuZGVyZXJcclxuICAgICAgICByZW5kZXJlcjoge30sXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6XHJcbiAgICAgIHByb2Nlc3MuZW52LlZTQ09ERV9ERUJVRyAmJlxyXG4gICAgICAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGtnLmRlYnVnLmVudi5WSVRFX0RFVl9TRVJWRVJfVVJMKVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBob3N0OiB1cmwuaG9zdG5hbWUsXHJcbiAgICAgICAgICBwb3J0OiArdXJsLnBvcnQsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSgpLFxyXG4gICAgY2xlYXJTY3JlZW46IGZhbHNlLFxyXG4gIH1cclxufSlcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJ0aW5na2VsYWlcIixcclxuICBcInZlcnNpb25cIjogXCIwLjAuNDJcIixcclxuICBcIm1haW5cIjogXCJkaXN0LWVsZWN0cm9uL21haW4vaW5kZXguanNcIixcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiXHU1NDJDXHU1QkEyXHU2NzY1XHU1QkEyXHU2MjM3XHU3QUVGXCIsXHJcbiAgXCJhdXRob3JcIjogXCJcdTU0MkNcdTVCQTJcdTY3NjVcIixcclxuICBcImtleXdvcmRzXCI6IFtcclxuICAgIFwidGluZ2tlbGFpXCJcclxuICBdLFxyXG4gIFwiZGVidWdcIjoge1xyXG4gICAgXCJlbnZcIjoge1xyXG4gICAgICBcIlZJVEVfREVWX1NFUlZFUl9VUkxcIjogXCJodHRwOi8vMTI3LjAuMC4xOjMzNDQvXCJcclxuICAgIH1cclxuICB9LFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxyXG4gICAgXCJidWlsZDphbHBoYVwiOiBcInZ1ZS10c2MgLS1ub0VtaXQgJiYgdml0ZSBidWlsZCAmJiBlbGVjdHJvbi1idWlsZGVyXCIsXHJcbiAgICBcImJ1aWxkOmJldGFcIjogXCJ2dWUtdHNjIC0tbm9FbWl0ICYmIHZpdGUgYnVpbGQgJiYgZWxlY3Ryb24tYnVpbGRlclwiLFxyXG4gICAgXCJidWlsZDpwcm9kXCI6IFwidnVlLXRzYyAtLW5vRW1pdCAmJiB2aXRlIGJ1aWxkICYmIGVsZWN0cm9uLWJ1aWxkZXJcIixcclxuICAgIFwicmVsZWFzZTphbHBoYVwiOiBcInJlbGVhc2UtaXQgLS1wcmVSZWxlYXNlPWFscGhhXCIsXHJcbiAgICBcInJlbGVhc2U6YmV0YVwiOiBcInJlbGVhc2UtaXQgLS1wcmVSZWxlYXNlPWJldGFcIixcclxuICAgIFwicmVsZWFzZTpwcm9kXCI6IFwicmVsZWFzZS1pdFwiXHJcbiAgfSxcclxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBhbnQtZGVzaWduL2ljb25zLXZ1ZVwiOiBcIl43LjAuMVwiLFxyXG4gICAgXCJAZWxlY3Ryb24vbm90YXJpemVcIjogXCJeMi4zLjBcIixcclxuICAgIFwiQHJlbGVhc2UtaXQvY29udmVudGlvbmFsLWNoYW5nZWxvZ1wiOiBcIl44LjAuMVwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjFcIixcclxuICAgIFwiYWRkcmVzc1wiOiBcIl4yLjAuMlwiLFxyXG4gICAgXCJhbnQtZGVzaWduLXZ1ZVwiOiBcIjQueFwiLFxyXG4gICAgXCJlbGVjdHJvblwiOiBcIl4yOC4yLjdcIixcclxuICAgIFwiZWxlY3Ryb24tYnVpbGRlclwiOiBcIl4yNC4xMy4zXCIsXHJcbiAgICBcImVsZWN0cm9uLWxvZ1wiOiBcIl41LjEuMlwiLFxyXG4gICAgXCJlbGVjdHJvbi11cGRhdGVyXCI6IFwiXjYuMS44XCIsXHJcbiAgICBcInJlbGVhc2UtaXRcIjogXCJeMTcuMS4xXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS43MS4xXCIsXHJcbiAgICBcInRyZWUta2lsbFwiOiBcIl4xLjIuMlwiLFxyXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4zXCIsXHJcbiAgICBcInZpdGVcIjogXCJeNS4wLjEwXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWVsZWN0cm9uXCI6IFwiXjAuMjguMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlclwiOiBcIl4wLjE0LjVcIixcclxuICAgIFwidnVlXCI6IFwiXjMuNC4xXCIsXHJcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4zLjBcIixcclxuICAgIFwidnVlLXRzY1wiOiBcIl4xLjguMjdcIlxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtULE9BQU8sUUFBUTtBQUNqVSxTQUFTLGVBQWUsV0FBVztBQUNuQyxTQUFTLG9CQUFvQjtBQUM3QixP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
