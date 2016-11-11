# react-lewis-demo
Training for Lewis

To download all assets needed, use `npm install`.

Commands with npm:

- npm **start** - `npm run build:server`
- npm run **build** - `webpack --progress --colors`
- npm run **build:watch** - `webpack --progress --colors --watch`
- npm run **build:server** - `webpack-dev-server --content-base dist/`

for a list of commands, use `npm run help`

Server runs on `http://localhost:8080/dist/index.html`

**NB** The developer server it not a full static server, so you need to say which file you want to load.
So for example, `http://localhost:8080/dist` will **NOT** find the index file.
