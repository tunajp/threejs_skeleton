/*
 * testscene.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

import * as PXConfig from '../config.js';
import * as PXUtil from '../util.js';
import * as PXLogger from '../logger.js';
import * as PXIScene from '../iscene.js';
import * as PXDebugbox from '../objects/debugbox.js';
import * as PXVideobox from '../objects/videobox.js';
import * as PXShaderLoader from "../shaderloader.js";
import * as PXShaderbox from '../objects/shaderbox.js';
import * as PXDebugfloor from '../objects/debugfloor.js';

/**
 * TestScene class
 */
export class TestScene extends PXIScene.IScene
{
  /**
   * constructor
   *
   * @param {THREE.WebGLRenderer} renderer Renderer
   */
  constructor(renderer)
  {
    super(renderer);

    PXUtil.Util.trace_func('TestScene::constructor');
    PXLogger.Logger.log('TestScene::constructor');

    //
    // private members
    //
    /** scene */
    this.scene;
    /** camera */
    this.camera;
    /** light */
    this.light;
    /** ambient light */
    this.ambient;

    this.loadingStatus.allItems = 0;

    /*
     * initial process
     */
    this.renderer = renderer;
    this.scene = new THREE.Scene();

    let wh = PXUtil.Util.getWH();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100000);
    this.camera.position.set(0, 150, 500);
    this.camera.aspect = wh.width / wh.height;
    this.camera.updateProjectionMatrix();

    // Light
    this.light = new THREE.SpotLight(0xffffff);
    this.light.position.set(100, 1000, 0);
    this.light.angle = Math.PI / 4;
    this.scene.add(this.light);

    // Ambient light
    this.ambient = new THREE.AmbientLight(0x333333);
    this.scene.add(this.ambient);

    this.loadObjects();

    this.testController();
  }

  /**
   * loadObjects method
   */
  loadObjects()
  {
    var debugbox = new PXDebugbox.Debugbox((mesh) => {
      mesh.position.y += 70;
      this.scene.add(mesh);
      this.loadedIncrements();
    });
    this.render_target_array.push(debugbox);

    var videobox = new PXVideobox.Videobox((mesh) => {
      mesh.position.y += 70;
      mesh.position.x += 240;
      this.scene.add(mesh);
      this.loadedIncrements();
    });
    this.render_target_array.push(videobox);

    var debugfloor = new PXDebugfloor.Debugfloor((mesh) => {
      this.scene.add(mesh);
      this.loadedIncrements();
    });
    this.render_target_array.push(debugfloor);

    let vshader = new PXShaderLoader.ShaderLoader();
    let fshader = new PXShaderLoader.ShaderLoader();
    vshader.getXHR2('js/app/assets/shader/vertex.fx', (vshader) => {
      console.log('vshader comp!');
      fshader.getXHR2('js/app/assets/shader/fragment.fx', (fshader) => {
        console.log('fshader comp!');
        let shaderbox = new PXShaderbox.Shaderbox(vshader, fshader, (mesh) => {
          mesh.position.y += 70;
          mesh.position.x += 120;
          this.scene.add(mesh);
          this.loadedIncrements();
        });
        this.render_target_array.push(shaderbox);
      });
    });
  }

  // renderingメソッドの内容を変更したければoverwrite
  //rendering() { }

  // resizeメソッドの内容を変更したければoverwrite
  //resize(){}
}
