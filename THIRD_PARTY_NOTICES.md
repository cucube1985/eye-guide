# Third-party notices

`dist/vendor/markdown-it.mjs` contains the official browser ES module bundle of **markdown-it 15.0.3**, retrieved from the npm registry. It is distributed under the MIT license. The full license is included at `dist/vendor/markdown-it.LICENSE.txt`.

- Project: https://github.com/markdown-it/markdown-it
- Package: https://registry.npmjs.org/markdown-it/-/markdown-it-15.0.3.tgz

The browser bundle is served locally with the site. It does not require a third-party CDN.

## QR Code generation

`dist/vendor/qrcodegen.mjs` contains Project Nayuki's official **QR Code generator v1.8.0**, ES6 build, under the MIT license. The full upstream license remains at the beginning of the file. The only integration change is an ES module export of the upstream namespace.

- Project: https://www.nayuki.io/page/qr-code-generator-library
- Source: https://github.com/nayuki/QR-Code-generator/releases/download/v1.8.0/qrcodegen-v1.8.0-es6.js
- Original SHA-256: `6a1116192ed1dd67fa1bf31e77f5817103d71c23bbac24c382e698b7668bdd01`

QR codes are generated locally in the browser and directly encode the permanent GitHub Pages URL, without a third-party QR image service or short-link service.

## Medical education images

Images in `dist/images/` retain their individual CC BY, CC BY-SA or public-domain terms. See [IMAGE_CREDITS.md](IMAGE_CREDITS.md) for original titles, creators, source pages, license links, modifications and file hashes. These materials do not imply endorsement by their creators or source institutions.
