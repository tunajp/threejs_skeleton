/*
 * shaderloader.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

import * as PXUtil from './util.js';

export class ShaderLoader
{
  constructor()
  {
    console.log('ShaderLoader::constructor');
  }

  getXHR2(url, cb)
  {
    // XMLHttpRequest2
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.onload = function() {
      if (this.status === 200) {
        //console.log(this.response);
      } else if (this.status === 404) {
        console.log('404 not found: ' + url);
      } else {
        console.log('other xhr error: ' + url);
      }
      cb(this.response);
    };
    xhr.timeout = 10000; // 10000ms
    xhr.ontimeout = function () {
      console.log('timeout: ' + url);
      cb(this.response);
    }

    // or alternatively
    //xhr.onreadystatechange = function() {
    //  if (this.readyState == 4 && this.status == 200) {
    //    console.log("this");
    //  }
    //};

    xhr.send(null);
  }
}
