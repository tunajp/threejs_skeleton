/*
 * videobox.js
 * vodeo texture and shader
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

import * as PXConfig from '../config.js';
import * as PXUtil from '../util.js';
import * as PXShaderLoader from "../shaderloader.js";

/**
 * Videobox class
 */
export class Videobox
{
  /**
   * constructor
   *
   * @param {function} callback_function
   */
  constructor(callback_function)
  {
    PXUtil.Util.trace_func('videobox::constructor');

    this.video = document.createElement('video');
    this.video.loop = true;
    this.video.src = PXConfig._ASSETS_PATH_ + "small.ogv";
    this.video.load();
    this.video.play();

    this.videoImage = document.createElement('canvas');
    this.videoImage.width = 480;
    this.videoImage.height= 204;

    this.videoImageContext = this.videoImage.getContext('2d');
    this.videoImageContext.fillStyle = "#000000";
    this.videoImageContext.fillRect(0, 0, this.videoImage.width, this.videoImage.height);

    this.videoTexture =new THREE.Texture(this.videoImage);
    this.videoTexture.minFilter = THREE.LinearFilter;
  	this.videoTexture.magFilter = THREE.LinearFilter;

    let vshader = new PXShaderLoader.ShaderLoader();
    let fshader = new PXShaderLoader.ShaderLoader();
    vshader.getXHR2('js/app/assets/shader/vertex.fx', (vshader) => {
      console.log('vshader comp!');
      fshader.getXHR2('js/app/assets/shader/fragment.fx', (fshader) => {
        console.log('fshader comp!');

        var sepia = false;
        var sepia_value = false;
        var grayscale_value = false;
        if (sepia === true) {
          sepia_value = true;
        } else {
          grayscale_value = true;
        }
        this.customUniforms ={
          baseTexture: { type: "t", value:this.videoTexture},
          time: { type: "f", value: 1.0 },
          grayscale: { type: "i", value:grayscale_value},
          sepia: { type: "i", value:sepia_value}
        };
        var customMaterial = new THREE.ShaderMaterial({
          uniforms: this.customUniforms,
          vertexShader: vshader,
          fragmentShader: fshader,
        });

        //let movieMaterial = new THREE.MeshBasicMaterial(
        //  {map: this.videoTexture, overdraw: true, side:THREE.DoubleSide}
        //  );

        this.mesh = new THREE.Mesh(
          new THREE.BoxGeometry(100, 100, 100),
          //movieMaterial
          customMaterial
          );

        callback_function(this.mesh);
      });
    });

  }

  /**
   * rendering method
   */
  rendering(delta)
  {
    if (this.mesh == null) {
      return;
    }
    this.mesh.rotation.y += delta;

    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
  		this.videoImageContext.drawImage(this.video, 0, 0);
  		if (this.videoTexture) {
  			this.videoTexture.needsUpdate = true;
      }
  	}
  }
}
