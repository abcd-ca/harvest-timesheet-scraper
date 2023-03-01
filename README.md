**Overview**

Forked a boilerplate and customized this project. Basic productivity tool created to be able to conveniently copy timesheet entries from one Harvest account to another. 

**Getting Started**

Run the following commands to install dependencies and start developing

```
yarn install
yarn dev
```

**Using the app:**

With the Chrome exetension installed (see below), 

1. log into both Harvest accounts in two separate browsers and place them side by side. Navigate to the Time tab in Harvest in both.
2. In window A, click the Chrome extension icon (you can pin it first so that it's always visible). In the extension's pop-up, click scrape, then click copy
3. In window B, add a new timesheet entry, click into the description field and paste. It should paste a consolidated description made up of all the entries from window A. Enter the total time for that day from window A and click Save Entry
4. In both windows, navigate to the next day. Repeat from step 2 until you're done.

:desktop_computer: A Web Extension starter kit built with React, TypeScript, Storybook, EsLint, Prettier, Jest, Bootstrap,x &amp; Webpack. Compatible with both Google Chrome + Mozilla Firefox.

**Scripts**

-   `yarn dev` - run `webpack` in `watch` mode
-   `yarn storybook` - runs the Storybook server
-   `yarn build` - builds the production-ready unpacked extension
-   `yarn test -u` - runs Jest + updates test snapshots
-   `yarn lint` - runs EsLint
-   `yarn prettify` - runs Prettier

**Loading the extension in Google Chrome**

In [Google Chrome](https://www.google.com/chrome/), open up [chrome://extensions](chrome://extensions) in your browser. Make sure the `Developer Mode` checkbox in the upper-right corner is turned on. Click `Load unpacked` and select the `dist` directory in this repository - your extension should now be loaded.

![Installed Extension in Google Chrome](https://i.imgur.com/ORuHbDR.png "Installed Extension in Google Chrome")

**Loading the extension in Mozilla Firefox**

*Untested since forked and modified by abcd*

In [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/), open up the [about:debugging](about:debugging) page in your browser. Click the `Load Temporary Add-on...` button and select the `manfiest.json` from the `dist` directory in this repository - your extension should now be loaded.

![Installed Extension in Mozilla Firefox](https://i.imgur.com/gO2Lrb5.png "Installed Extension in Mozilla Firefox")

**Notes**

-   Includes ESLint configured to work with TypeScript and Prettier.

-   Includes tests with Jest - note that the `babel.config.js` and associated dependencies are only necessary for Jest to work with TypeScript.

-   Recommended to use `Visual Studio Code` with the `Format on Save` setting turned on.

-   Example icons courtesy of [FontAwesome](https://fontawesome.com).

-   [Microsoft Edge]() is not currently supported.

-   Includes Storybook configured to work with React + TypeScript. Note that it maintains its own `webpack.config.js` and `tsconfig.json` files. See example story in `src/components/hello/__tests__/hello.stories.tsx`

-   Includes a custom mock for the [webextension-polyfill-ts](https://github.com/Lusito/webextension-polyfill-ts) package in `src/__mocks__`. This allows you to mock any browser APIs used by your extension so you can develop your components inside Storybook.

**Built with**

-   [React](https://reactjs.org)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Storybook](https://storybook.js.org/)
-   [Jest](https://jestjs.io)
-   [Eslint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [Webpack](https://webpack.js.org/)
-   [Babel](https://babeljs.io/)
-   [Bootstrap](https://getbootstrap.com)
-   [webextension-polyfill-ts](https://github.com/Lusito/webextension-polyfill-ts)

**Misc. References**

-   [Chrome Extension Developer Guide](https://developer.chrome.com/extensions/devguide)
-   [Firefox Extension Developer Guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
-   [Eslint + Prettier + Typescript Guide](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)

**ToDos**

-   Build out `README.md`
    -   Description of tech used
    -   Document directory structure
