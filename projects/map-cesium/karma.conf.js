// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const PATH = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    // // https://karma-runner.github.io/6.3/config/files.html#loading-assets
    files: [
      // https://github1s.com/CesiumGS/cesium/blob/main/gulpfile.js#L1396-L1399
      { pattern: "../../node_modules/@cesium/engine/Build/Workers/**", included: false, served: true },
      { pattern: "../../node_modules/@cesium/engine/Source/Assets/**", included: false, served: true },
      { pattern: "../../node_modules/@cesium/engine/Source/ThirdParty/**", included: false, served: true },
      { pattern: "../../node_modules/@cesium/engine/Source/Widget/*.css", included: false, served: true },
      { pattern: "../../node_modules/@cesium/widgets/Source/**/*.css", included: false, served: true },
      { pattern: '../shared-assets/**', watched: false, included: false, served: true }
    ],
    // https://github.com/karma-runner/karma/issues/2703#issuecomment-421987843
    proxies: {
      '/assets/': `/absolute${PATH.normalize(PATH.resolve('projects/shared-assets/'))}`,
      // see angular.json assets for cesium!
      '/assets/cesium/': `/absolute${PATH.normalize(PATH.resolve('node_modules/@cesium/engine/Source/'))}`,
      '/assets/cesium/Widgets/': `/absolute${PATH.normalize(PATH.resolve('node_modules/@cesium/widgets/Source/'))}`,
      '/assets/cesium/Workers/': `/absolute${PATH.normalize(PATH.resolve('node_modules/@cesium/engine/Build/Workers/'))}`,
      '/assets/engine/Source/Widget/CesiumWidget.css': `/absolute${PATH.normalize(PATH.resolve('node_modules/@cesium/engine/Source/Widget/CesiumWidget.css'))}`
    },
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/map-cesium'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
