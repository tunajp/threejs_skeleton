/*
 * iscene.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

import * as PXConfig from './config.js';
import * as PXUtil from './util.js';
import * as PXLogger from './logger.js';

/**
 * IScene class
 */
export class IScene
{
  /**
   * constructor
   *
   * @param {THREE.WebGLRenderer} renderer Renderer
   */
  constructor(renderer)
  {
    //
    // private members
    //
    /** renderer */
    this.renderer;

    /** rendering target array */
    this.render_target_array = new Array();
    /** clock */
    this.clock;

    this.loadingStatus = {};
    this.loadingStatus.allItems = 0;
    this.loadingStatus.loadedItems = 0;
    this.loadingStatus.status = 'loading';
  }

  /**
   * loadedIncrements method
   */
  loadedIncrements()
  {
    PXUtil.Util.trace_func('IScene::loadedIncrements');
    this.loadingStatus.loadedItems++;
    if (this.loadingStatus.loadedItems >= this.loadingStatus.allItems) {
      this.loadingStatus.status = "loaded";
      // ロード完了のこのタイミングでタイマーを開始
      this.clock = new THREE.Clock();
    }
  }

  /**
   * rendering method
   */
  rendering()
  {
    //if (_TEST_CONTROLLER_) {
    //  this.trackball.update();
    //}

    var delta = this.clock.getDelta();

    for (var i=0; i < this.render_target_array.length; i++) {
      this.render_target_array[i].rendering(delta);
    }

    this.rendererInfo(delta);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * rendererInfo method
   *
   * @param {delta} delta
   */
  rendererInfo(delta)
  {
    PXUtil.Util.debug(
      'delta: ' + Math.floor(delta * 100000) / 100000 + '<br>' +
      'info.memory.programs:' + this.renderer.info.memory.programs + '<br>' +
      'info.memory.geometries:' + this.renderer.info.memory.geometries + '<br>' +
      'info.memory.textures:' + this.renderer.info.memory.textures + '<br>' +
      'info.render.calls:' + this.renderer.info.render.calls + '<br>' +
      'info.render.vertices:' + this.renderer.info.render.vertices + '<br>' +
      'info.render.faces:' + this.renderer.info.render.faces + '<br>' +
      'info.render.points:' + this.renderer.info.render.points
      );
  }

  /**
   * resize method
   */
  resize()
  {
    PXUtil.Util.trace_func('IScene::resize');

    let wh = PXUtil.Util.getWH();
    this.camera.aspect = wh.width / wh.height;
    this.camera.updateProjectionMatrix();

  }
}
