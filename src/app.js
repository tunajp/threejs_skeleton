/*
 * app.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

import * as PXConfig from './config.js';
import * as PXUtil from './util.js';

(function() {

  /**
   * Application class
   */
  class Application
  {
    /**
     * constructor
     */
    constructor()
    {
      PXUtil.Util.trace_func('Application::constructor');

      //
      // private members
      //

      /** http */
      this.http_ = require('http');
      /** connect */
      this.connect_ = require('connect');
      /** static */
      this.serveStatic = require('serve-static');
    }

    /**
     * run method
     */
    run()
    {
      PXUtil.Util.trace_func('Application::run');

      let con = this.connect_()
          .use(this.serveStatic('./webroot'));
      //.use(this.connect_.logger('dev'));

      let server = this.http_.createServer(con);

      server.listen(80);
    }
  }

  /*
   * application start
   */
  let app = new Application();
  app.run();

}());
