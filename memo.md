# Rect

## Scaffold Settings

- npx create-react-app Project
- cd Project
- code .
- npm run build
- serve -s build

## Dependencies

- npm install react-router react-router-dom
- npm install redux react-redux redux-devtools-extension redux-logger
- npm install redux-promise redux-thunk redux-pender redux-actions redux-form
- npm install axios
- npm install moment
- npm install formik --save
- npm install yup
- npm install core-js
- npm install react-app-polyfill
- npm install react-dropzone
- npm i react-image-gallery
- npm i @paypal/react-paypal-js
- npm install socket.io-client

## Dev dependencies

- npm install --save-dev http-proxy-middleware

## Design dependencies

- npm install react-icons --save
- npm install antd
- npm install @ant-design/icons
- npm install @antv/g2
- npm install classnames
- npm install styled-components
- npm install node-sass sass-loader

## Markdown

- npm i react-markdown
- npm install github-markdown-css

## Proxy

- "proxy": "https://bt-product-server.herokuapp.com"

## Environment

- yarn add cross-env --dev

```json
  "scripts": {
    "start": "cross-env NODE_PATH=src react-scripts start",
    "build": "cross-env NODE_PATH=src react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

## Netlify

- Build & deploy (Continuous Deployment)
  - CI=false npm run build
