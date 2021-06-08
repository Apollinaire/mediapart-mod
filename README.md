[![Mediapart Mod](public/mediapart-mod-32.png)](https://github.com/apollinaire/mediapart-mod#readme)[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/bcnknflnppgioakmddkbdjdpdlignpel?style=for-the-badge)](https://chrome.google.com/webstore/detail/mediapart-mod/bcnknflnppgioakmddkbdjdpdlignpel)[![Mozilla Add-on](https://img.shields.io/amo/v/mediapart-mod?style=for-the-badge)](https://addons.mozilla.org/en-US/firefox/addon/mediapart-mod/)

# Mediapart-mod

Modifie mediapart.fr et blogs.mediapart.fr pour une meilleure expérience!

## Features

- Thème sombre: inverse les couleurs pour une luminosité réduite
- Lecture zen: l'affichage des articles est épuré et centré, pour limiter les distractions. Le contenu additionnel est déplacé en dessous du contenu principal.
- Lecture sur une page par défaut
- Raccourcis clavier: pour naviguer uniquement au clavier (retour vers la Une, passage à la page suivante) et contrôler les features de l'application. Voir la page d'options de l'extension pour tous les détails et la possibilité de reconfigurer les touches.

## Usage

You can download the extension on the [Chrome webstore](https://chrome.google.com/webstore/detail/mediapart-mod/bcnknflnppgioakmddkbdjdpdlignpel) for all chromium based browsers, and on the [Mozilla store](https://addons.mozilla.org/en-US/firefox/addon/mediapart-mod/) for Firefox. If you don't want to go through a store, a pre-built version is located in this repo at `/dist/raw`

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

Once the CSS has been generated, you can start the dev server:

```bash
npm start
```

It will build it to `/build`. You need to point your browser to this location when installing the extension on it. While the dev server is running, it should rebuild/update the extension/refresh the pages automatically on every file change.
