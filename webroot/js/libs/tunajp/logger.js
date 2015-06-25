/*
 * logger.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

import * as PXUtil from './util.js';

export class Logger
{

  static init(len)
  {
    this.initialized = true;
    this.len = len;
    this.domElement = document.createElement('div');
    this.domElement.id = 'logger_board';

    document.body.appendChild(this.domElement);
  }

  static clear()
  {
    if (this.initialized == null) {
      return;
    }
    while (this.domElement.childNodes.length > 0) {
      this.domElement.removeChild(this.domElement.childNodes[0]);
    }
  }

  static log(msg)
  {
    if (this.initialized == null) {
      return;
    }
    let log_time = PXUtil.Util.getCurrentTimeString();
    let message = log_time + " " + msg;
    this.domElement.appendChild(document.createTextNode(message));
    this.domElement.appendChild(document.createElement('br'));

    while (this.domElement.childNodes.length > this.len * 2) {
      this.domElement.removeChild(this.domElement.childNodes[0]);
    }
  }

}
