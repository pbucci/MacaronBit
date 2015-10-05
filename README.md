# Macaron
Vibrotactile Icon Editor

##

Quick install command:

- `npm install react --save`
- `npm install -g webpack`
- `npm i webpack webpack-dev-server babel-loader d3 reflux firebase imports-loader script-loader style-loader css-loader socket.io express johnny-five --save`

## Build Environment

Macaron requires the following libraries:

 - [React][react]
 - [NodeJS tools][nodejs]
 - [NodeJS Package Manager (NPM)][npm]
 - [Webpack][webpack]
 - [d3][d3]
 - [reflux][reflux]

Begin by installing [NPM][npm] for your OS. Once NPM is installed, install react as follows:

 `npm install react --save`

and install webpack:

 - `npm install -g webpack`
 - `npm i webpack --save-dev`
 - `npm i webpack-dev-server --save`

and the JSX syntax handler:

- `npm install babel-loader --save-dev`

You will also need to install the following libraries:

- [d3][d3]: `npm install d3 --save`
- [reflux][reflux]: `npm install reflux --save`
- [firebase][firebase]: `npm install firebase --save`

And you will need two custom loaders for webpack, to import Audiolet, a non-NPM library contained in `thirdparty/audiolet`:

 - `npm install imports-loader --save`
 - `npm install script-loader --save`

 As well, the following two loaders for loading CSS stylesheets:

 - `npm install style-loader css-loader --save-dev`

You'll need this for websockets:

- `npm install socket.io --save`
- `npm install express --save`

And this to talk to the Arduino:

- `npm install johnny-five --save`

Now, you can build the environment with `npm run deploy`.

Make sure the Arduino is loaded up with StandardFirmata (Examples > Firmata > Standard Firmata)

You can start serving on `localhost:8080` with `node server`.

[nodejs]: http://nodejs.org
[npm]: https://www.npmjs.org
[react]: http://facebook.github.io/react/
[webpack]: http://webpack.github.io
[d3]: http://d3js.org
[reflux]: https://github.com/spoike/refluxjs
[firebase]: https://www.firebase.com
