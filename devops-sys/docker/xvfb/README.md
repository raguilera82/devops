# Important notes

This image installs Chrome, xvfb and its dependencies for allowing open gui browser.

For testing in Angular, you have to configure these scripts in package.json:

```json
...
"test": "ng test",
"test:ci": "ng test --browser=Headless_Chrome --code-coverage=true --single-run=true",
"test:xvfb": "xvfb-run npm run test:ci",
"e2e": "ng e2e",
"e2e:ci": "npm run e2e",
"e2e:xvfb": "xvfb-run npm run "
...
```

And configure karma.conf.js in that way:

```js
...
plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    customLaunchers: {
      Headless_Chrome: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-gpu'
        ]
      }
    },
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
...
```

And protractor.conf.js in that way:

```js
...
capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': [
        '--no-sandbox',
        '--disable-gpu'
      ]
    }
  },
...
```