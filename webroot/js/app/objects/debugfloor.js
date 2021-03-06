/*
 * debugfloor.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

import * as PXUtil from '../../libs/tunajp/util.js';

/**
 * Debugfloor class
 */
export class Debugfloor
{
  /**
   * constructor
   */
  constructor(callback_function)
  {
    PXUtil.Util.trace_func('Debugfloor::constructor');

    this.callback_function = callback_function;

    this.mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000),
      new THREE.MeshPhongMaterial({
        color: 0xe0e0e0,
        //side: THREE.DoubleSide
      })
      );
    this.mesh.rotation.x = Math.PI + Math.PI / 2; // 180+90度(Math.PI=180度)
    this.mesh.receiveShadow = true;

    this.callback_function(this.mesh);
  }
  /**
   * rendering method
   */
  rendering(delta)
  {
  }
}
