# Mediapart-mod

Modifie mediapart.fr et blogs.mediapart.fr pour une meilleure expérience!

## Usage

The extension is not published on any platform, but I plan to release it on the Firefox addons and the chrome webstore.
The last version is prebuilt in `/dist` as a zip file or unpackaged in `/dist/raw`. The zip file is not signed, so testing on firefox can be done with the temporary installation. On chrome, you have to enable dev mode and install the package locally. For both options, you must point to `/dist/raw`.

Currently, it only features a dark theme for the site. You can toggle the dark theme with Alt+Shift+D on the keyboard.

## Building the extension

All the source code is present in this repository. You need Node & npm (or Yarn). It's been tested on node 12.18.1 and npm 6.14.5.

First, install the node_modules: 

```bash
npm install
```

Then run the build script:

```bash
npm run build
```

The build script does three things: 

1. (prebuild) Download the css from mediapart.fr and transform it to get a css file that contains the dark theme (in `src/generateCSS/newMediapart.css`)
2. (build) Build with webpack & babel the content script and the background script, and copy the manifest.json into `/dist/raw`.
3. (postbuild) zip the extension with web-ext and output it in `/dist/mediapart_mod-x.x.x.zip`

## Development

Once the repo is cloned and the node_modules are installed, there are two things to work on.

### CSS generation

The dark theme is generated procedurally. The following command launches the generation:

```bash
npm run gen-css
```

### Browser extension

To test a dev mode of the extension, start the dev server:

```bash
npm start
```

It will build it to `/build`. You need to point your browser to this location when installing the extension on it. While the dev server is running, it should rebuild/update the extension/refresh the pages automatically on every file change.

