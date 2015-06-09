/*
 * util.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rigths Reserved.
 */

import * as PXConfig from './config.js';

/**
 * Utility class
 */
export class Util
{
  /**
   * trace_func method
   * print out console.log with current time
   *
   * @param {string} str message
   */
  static trace_func(str)
  {
    if (PXConfig._DEBUG_MODE_) {
      let log_time = this.getCurrentTimeString();
      console.log(log_time + " " + str);
    }
  }

  /**
   * createDebugBoard method
   */
  static createDebugBoard()
  {
    if (PXConfig._DEBUG_MODE_) {
      this.domElement = document.createElement('div');
      this.domElement.id = 'debug_board';

      document.body.appendChild(this.domElement);
    }
  }

  /**
   * debug_board method
   * print out for DEBUG BOARD with current time
   *
   * @param {string} str message
   */
  static debug(str)
  {
    if (PXConfig._DEBUG_MODE_) {
      //console.warn('deprecated: use Logger');
      let log_time = this.getCurrentTimeString();
      document.querySelector('#debug_board').innerHTML = log_time + " " + str;
    }
  }

  /**
   * getCurrentTimeString method
   * get current time string
   *
   * @return {string} current time string
   */
  static getCurrentTimeString()
  {
    let d = new Date();
    let hh = this.pad(d.getHours());
    let mm = this.pad(d.getMinutes());
    let ss = this.pad(d.getSeconds());
    let ddd = this.pad(d.getMilliseconds(), 3);
    let log_time = hh + ":" + mm + ":" + ss + ":" + ddd;
    return log_time;
  }

  /**
   * pad method
   * ゼロ埋め(必ず2桁になる)
   *
   * @param {any} n 0埋めする文字列
   * @return {string} 0埋めされた文字列
   */
  static pad(n, digit = 2)
  {
    if (n == null || n.length == 0) {
      n = '0';
    }
    if (digit == 3) {
      return ("00" + n).slice(-3);
    } else {
      return ("0" + n).slice(-2);
    }
  }

  /**
   * Get GPUCard's WebGL spec Info
   *
   * @param {THREE.WebGLRenderer} renderer Renderer
   */
  static webglInfo(renderer)
  {
    if (renderer == null) {
      throw "THREE.WebGLRenderer is null object";
    }
    let gl = renderer.context;
    let gl_info = {
      "Version": gl.getParameter(gl.VERSION),
      "Shading language": gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      "Vendor": gl.getParameter(gl.VENDOR),
      "Renderer": gl.getParameter(gl.RENDERER),
      "Max varying vectors": gl.getParameter(gl.MAX_VARYING_VECTORS),
      "Max vertex attribs": gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      "Max vertex uniform vectors": gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      "Max fragment uniform vectors": gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      "Max renderbuffer size": gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      "Max texture size": gl.getParameter(gl.MAX_TEXTURE_SIZE),
      "Max cube map texture size": gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
      "Max texture image units": gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
      "Max vertex texture units": gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      "Max combined texture units": gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      "Max viewport dims": gl.getParameter(gl.MAX_VIEWPORT_DIMS)[0] + "x" + gl.getParameter(gl.MAX_VIEWPORT_DIMS)[1]
    };
    console.log('WebGL info: ', gl_info);
    return gl_info;
  }

  /**
   * Get Screen Width and Height
   *
   * @return {json} width,height
   */
  static getWH()
  {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  /**
   * i18n
   *
   * @param {any} cb コールバック関数
   */
  static i18nLoad(cb)
  {
    i18n.init({
      //lng: 'en-US',
      ns: { namespaces: ['ns.special'], defaultNs: 'ns.special'},
      useLocalStorage: false,
      debug: true
    }, () => {
      //var name = i18n.t('app.name');
      //$('#name').text(name);
      cb();
    });
  }

  /**
   * screenshot
   * https://github.com/tapio/plasma-forks/blob/master/js/utils.js
   *
   * @param {bool} dontDownload
   * @param {bool} useJPG
   */
  static screenshot(dontDownload, useJPG) {
    var imgtype = useJPG ? "image/jpeg" : "image/png";
    var dataUrl = renderer.domElement.toDataURL(imgtype);
    if (!dontDownload) {
      dataUrl = dataUrl.replace(imgtype, "image/octet-stream");
    }
    window.open(dataUrl, "_blank");
  }

  /**
   * uuid
   * makeUUID(https://gist.github.com/jed/982883)
   *
   * @param a placeholder
   * @return unique uuid(v4)
   */
  static uuid()
  {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a=>(a ^ Math.random() * 16 >> a / 4).toString(16));
  }
}
