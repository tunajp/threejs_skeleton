/*
 * E2E test
 * node_modules\.bin\mocha ./e2e_test/* --compilers js:mocha-traceur
 * jenkinsではnode bin/application.jsをやってから上を呼ぶ(nodeはジョブ終了と同時に死ぬと思われる
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

//import * as PXConfig from '../src/config.js';

(function() {
  var test = require("selenium-webdriver/testing");
  var assert = require("assert")
  var os = require('os');

  function writeScreenshot(data, name) {
    name = name || 'ss.png';
    var screenshotPath = './tmp/';
    var fs = require('fs');
    fs.writeFileSync(screenshotPath + name, data, 'base64');
  };

  test.describe('E2E test', function() {
    var driver_chrome;
    var driver_firefox;
    var driver_phantomjs;
    var driver_ie;
    var By;
    var until;


    test.before(function(){
      this.timeout(30000);

      var webdriver = require('selenium-webdriver');
      By = require('selenium-webdriver').By;
      until = require('selenium-webdriver').until;

      if (os.platform() == 'win32') {
        driver_chrome = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver_firefox = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
        driver_phantomjs = new webdriver.Builder()
            .forBrowser('phantomjs')
            .withCapabilities({"browserName": "phantomjs", "phantomjs.cli.args": "--config=config.json"})
            .build();
        driver_ie = new webdriver.Builder()
            .forBrowser('internet explorer')
            .build();
      } else if (os.platform() == 'linux') {
        driver_phantomjs = new webdriver.Builder()
            .forBrowser('phantomjs')
            .withCapabilities({"browserName": "phantomjs", "phantomjs.cli.args": "--config=config.json"})
            .build();
      }
    });

    test.it('top page firefox', function(){
      if (os.platform() == 'win32') {
        this.timeout(30000);

        driver_firefox.get('http://localhost');
        driver_firefox.sleep(3000);

        driver_firefox.takeScreenshot().then(function(data) {
          writeScreenshot(data, 'out1_firefox.png');
          assert.equal('', '');
        });
      }
    });

    test.it('top page chrome', function(){
      this.timeout(30000);

      if (os.platform() == 'win32') {
        driver_chrome.get('http://localhost');
        driver_chrome.sleep(3000);

        driver_chrome.takeScreenshot().then(function(data) {
          writeScreenshot(data, 'out1_chrome.png');
          assert.equal('', '');
        });
      }
    });

    test.it('top page phantomjs', function(){
      this.timeout(30000);

      driver_phantomjs.get('http://localhost');
      driver_phantomjs.sleep(3000);

      driver_phantomjs.takeScreenshot().then(function(data) {
        writeScreenshot(data, 'out1_phantomjs.png');
        assert.equal('', '');
      });
    });

    test.it('top page ie', function(){
      this.timeout(30000);

      if (os.platform() == 'win32') {
        driver_ie.get('http://localhost');
        driver_ie.sleep(3000);

        driver_ie.takeScreenshot().then(function(data) {
          writeScreenshot(data, 'out1_ie.png');
          assert.equal('', '');
        });
      }
    });

    test.after(function(){
      this.timeout(30000);

      if (os.platform() == 'win32') {
        driver_firefox.quit();
        driver_chrome.quit();
        driver_phantomjs.quit();
        driver_ie.quit();
      } else if (os.platform() == 'linux') {
        driver_phantomjs.quit();
      }
    });
  });

}());
