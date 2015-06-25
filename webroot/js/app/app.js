/*
 * app.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

import * as PXUtil from "../libs/tunajp/util.js";
import * as PXLogger from "../libs/tunajp/logger.js";

import * as PXTestScene from "./scenes/testscene.js";

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
      /*
       * debug board
       */
      if (_DEBUG_MODE_) {
        PXLogger.Logger.init(5);
      }

      PXUtil.Util.trace_func('Application::consturctor');
      PXLogger.Logger.log('Application::consturctor');

      //
      // private members
      //
      /** renderer */
      this.renderer;
      /** stats */
      this.stats;
      /** currentSceneObject */
      this.currentSceneObject;

      /*
       * renderer
       */
      if (Detector.webgl) {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        PXUtil.Util.trace_func('renderer->webgl');
        PXLogger.Logger.log('renderer->webgl');
        // display webgl info
        let gl_info = PXUtil.Util.webglInfo(this.renderer);
      } else {
        this.renderer = new THREE.CanvasRenderer();
        PXUtil.Util.trace_func('renderer->canvas');
        PXLogger.Logger.log('renderer->canvas');
      }
      let wh = PXUtil.Util.getWH();
      this.renderer.setSize(wh.width, wh.height);
      this.renderer.setClearColor(0x000000, 1);
      document.getElementById('canvas').appendChild(this.renderer.domElement);

      /*
       * set stats
       */
      if (_DEBUG_MODE_) {
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';
        this.stats.domElement.style.zIndex = 100;
        document.body.appendChild(this.stats.domElement);
      }

      /*
       * scene
       */
      this.currentSceneObject = new PXTestScene.TestScene(this.renderer);

      /*
       * register event handler
       */
      this.resize();
    }

    /**
     * run method
     */
    run()
    {
      PXUtil.Util.trace_func('Application::run');
      PXLogger.Logger.log('Application::run');

      PXLogger.Logger.log('HOGE!!!');
      //PXLogger.Logger.clear();

      PXUtil.Util.createDebugBoard();
      PXUtil.Util.debug('debug');

      this.update();
    }

    update()
    {
      this.rendering();

      if (_DEBUG_MODE_) {
        this.stats.update();
      }
    }

    rendering()
    {
      if (_FPS_ === 60) {
        requestAnimationFrame(() => {
          this.update();
        });
      } else {
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.update();
          });
        }, 1000 / _FPS_);
      }

      if (this.currentSceneObject.loadingStatus.status === 'loaded') {
        this.currentSceneObject.rendering();
      }
    }

    /**
     * resize method
     */
    resize()
    {
      window.addEventListener('resize', (event) => {
        let wh = PXUtil.Util.getWH();
        PXLogger.Logger.log('Application::resize w:' + wh.width + ',h:' + wh.height + ',e:' + event);

        this.renderer.setSize(wh.width, wh.height);
        this.currentSceneObject.resize();
      }, false);
    }
  }

  /*
   * entry point
   * support browser:
   *   Chrome:0.2+
   *   Firefox:1.0+
   *   IE:9.0+
   *   Safari:3.1+
   */
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", () => {
      PXUtil.Util.i18nLoad(()=>{
        PXUtil.Util.trace_func(i18n.t('app.i18nLoadComplete'));
        /*
         * application start
         */
        let app = new Application();
        app.run();
      });
    }, false);
  } else {
    alert('Sorry. Not supported browser...');
  }

}());
