# React + TypeScript + Vite

1. Setup Vite: `pnpm create vite`
2. Setup nvm and node version: `echo "v20.11.0" > .nvmrc && nvm use`
3. Setup prettier:

```
{
  "tabWidth": 2,
  "useTabs": false
}
```

3. Vite library mode:

`p i -D @types/node`

In vite.config.ts:

```ts
import { resolve } from 'path'

build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      fileName: "library",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ["react", "react-dom"],
      output: {
        // provide global variables to use in the UMD build for externalized deps
        globals: {
          react: "React",
          "react-dom": "React-dom",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
```

Reference components in lib/main.ts:

```ts
export { Counter } from "../src/components/Counter";
```

4. Package

add to package.json:

```json
"name": "template-package-react",
"version": "1.0.0",
"main": "dist/library.cjs",
"module": "dist/library.js",
"files": [
    "/dist"
],
```

```json
"build:pack": "pnpm build && pnpm pack --pack-destination ~",
```

The package can be imported in other projects `pnpm i ~/template-package-react-1.0.0.tgz`

5. Add types to package

Add tsconfig.build.json that can be used to build type files:

```json
{
  "extends": "./tsconfig.json",
  "include": ["lib"],
  "exclude": [],
  "compilerOptions": {
    "outDir": "./dist",
    "noEmit": false,
    "emitDeclarationOnly": true,
    "declaration": true
  }
}
```

Include type files in package ... update package.json:

```json
  "types": "dist/lib/main.d.ts",
  "scripts": {
    "build": "tsc && vite build",
    "build:types": "tsc -p tsconfig.build.json",
    "build:pack": "pnpm build && pnpm build:types && pnpm pack --pack-destination ~",
  }
```
