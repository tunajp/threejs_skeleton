$traceurRuntime.options.symbols = true;
System.registerModule("config.js", [], function(require) {
  "use strict";
  var $__0;
  var __moduleName = "config.js";
  var _DEBUG_MODE_ = true;
  var _FPS_ = 60;
  var _ASSETS_PATH_ = "js/app/assets/";
  return ($__0 = {}, Object.defineProperty($__0, "_DEBUG_MODE_", {
    get: function() {
      return _DEBUG_MODE_;
    },
    configurable: true,
    enumerable: true
  }), Object.defineProperty($__0, "_FPS_", {
    get: function() {
      return _FPS_;
    },
    configurable: true,
    enumerable: true
  }), Object.defineProperty($__0, "_ASSETS_PATH_", {
    get: function() {
      return _ASSETS_PATH_;
    },
    configurable: true,
    enumerable: true
  }), $__0);
});
$traceurRuntime.options.symbols = true;
System.registerModule("util.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "util.js";
  var PXConfig = System.get("config.js");
  var Util = $traceurRuntime.initTailRecursiveFunction(function() {
    return $traceurRuntime.call(function() {
      var $__2,
          $__3,
          $__6;
      function Util() {}
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [Util, {}, {
        trace_func: function(str) {
          if (PXConfig._DEBUG_MODE_) {
            var log_time = this.getCurrentTimeString();
            console.log(log_time + " " + str);
          }
        },
        createDebugBoard: function() {
          if (PXConfig._DEBUG_MODE_) {
            this.domElement = document.createElement('div');
            this.domElement.id = 'debug_board';
            document.body.appendChild(this.domElement);
          }
        },
        debug: function(str) {
          if (PXConfig._DEBUG_MODE_) {
            var log_time = this.getCurrentTimeString();
            document.querySelector('#debug_board').innerHTML = log_time + " " + str;
          }
        },
        getCurrentTimeString: function() {
          var d = new Date();
          var hh = this.pad(d.getHours());
          var mm = this.pad(d.getMinutes());
          var ss = this.pad(d.getSeconds());
          var ddd = this.pad(d.getMilliseconds(), 3);
          var log_time = hh + ":" + mm + ":" + ss + ":" + ddd;
          return log_time;
        },
        pad: $traceurRuntime.initTailRecursiveFunction(function(n) {
          return $traceurRuntime.call(function(n) {
            var digit = arguments[1] !== (void 0) ? arguments[1] : 2;
            if (n == null || n.length == 0) {
              n = '0';
            }
            if (digit == 3) {
              return ($__2 = ("00" + n), $traceurRuntime.continuation($__2.slice, $__2, [-3]));
            } else {
              return ($__3 = ("0" + n), $traceurRuntime.continuation($__3.slice, $__3, [-2]));
            }
          }, this, arguments);
        }),
        webglInfo: function(renderer) {
          if (renderer == null) {
            throw "THREE.WebGLRenderer is null object";
          }
          var gl = renderer.context;
          var gl_info = {
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
        },
        getWH: function() {
          return {
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        i18nLoad: function(cb) {
          i18n.init({
            ns: {
              namespaces: ['ns.special'],
              defaultNs: 'ns.special'
            },
            useLocalStorage: false,
            debug: true
          }, function() {
            cb();
          });
        },
        screenshot: function(dontDownload, useJPG) {
          var imgtype = useJPG ? "image/jpeg" : "image/png";
          var dataUrl = renderer.domElement.toDataURL(imgtype);
          if (!dontDownload) {
            dataUrl = dataUrl.replace(imgtype, "image/octet-stream");
          }
          window.open(dataUrl, "_blank");
        },
        uuid: $traceurRuntime.initTailRecursiveFunction(function() {
          return $traceurRuntime.call(function() {
            var $__5;
            return ($__6 = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11), $traceurRuntime.continuation($__6.replace, $__6, [/[018]/g, $traceurRuntime.initTailRecursiveFunction(function(a) {
              return $traceurRuntime.call(function(a) {
                return ($__5 = (a ^ Math.random() * 16 >> a / 4), $traceurRuntime.continuation($__5.toString, $__5, [16]));
              }, this, arguments);
            })]));
          }, this, arguments);
        })
      }]);
    }, this, arguments);
  })();
  return ($__1 = {}, Object.defineProperty($__1, "Util", {
    get: function() {
      return Util;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("logger.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "logger.js";
  var PXUtil = System.get("util.js");
  var Logger = $traceurRuntime.initTailRecursiveFunction(function() {
    return $traceurRuntime.call(function() {
      function Logger() {}
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [Logger, {}, {
        init: function(len) {
          this.initialized = true;
          this.len = len;
          this.domElement = document.createElement('div');
          this.domElement.id = 'logger_board';
          document.body.appendChild(this.domElement);
        },
        clear: function() {
          if (this.initialized == null) {
            return;
          }
          while (this.domElement.childNodes.length > 0) {
            this.domElement.removeChild(this.domElement.childNodes[0]);
          }
        },
        log: function(msg) {
          if (this.initialized == null) {
            return;
          }
          var log_time = PXUtil.Util.getCurrentTimeString();
          var message = log_time + " " + msg;
          this.domElement.appendChild(document.createTextNode(message));
          this.domElement.appendChild(document.createElement('br'));
          while (this.domElement.childNodes.length > this.len * 2) {
            this.domElement.removeChild(this.domElement.childNodes[0]);
          }
        }
      }]);
    }, this, arguments);
  })();
  return ($__1 = {}, Object.defineProperty($__1, "Logger", {
    get: function() {
      return Logger;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("iscene.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "iscene.js";
  var PXConfig = System.get("config.js");
  var PXUtil = System.get("util.js");
  var PXLogger = System.get("logger.js");
  var IScene = $traceurRuntime.initTailRecursiveFunction(function() {
    return $traceurRuntime.call(function() {
      function IScene(renderer) {
        this.renderer;
        this._TEST_CONTROLLER_ = false;
        this.render_target_array = new Array();
        this.clock;
        this.loadingStatus = {};
        this.loadingStatus.allItems = 0;
        this.loadingStatus.loadedItems = 0;
        this.loadingStatus.status = 'loading';
      }
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [IScene, {
        testController: function() {
          this._TEST_CONTROLLER_ = true;
          this.trackball = new THREE.TrackballControls(this.camera);
        },
        loadedIncrements: function() {
          PXUtil.Util.trace_func('IScene::loadedIncrements');
          this.loadingStatus.loadedItems++;
          if (this.loadingStatus.loadedItems >= this.loadingStatus.allItems) {
            if (this.loadingStatus.status != "loaded") {
              this.loadingStatus.status = "loaded";
              this.clock = new THREE.Clock();
            }
          }
        },
        rendering: function() {
          if (this._TEST_CONTROLLER_) {
            this.trackball.update();
          }
          var delta = this.clock.getDelta();
          for (var i = 0; i < this.render_target_array.length; i++) {
            this.render_target_array[$traceurRuntime.toProperty(i)].rendering(delta);
          }
          this.rendererInfo(delta);
          this.renderer.render(this.scene, this.camera);
        },
        rendererInfo: function(delta) {
          PXUtil.Util.debug('delta: ' + Math.floor(delta * 100000) / 100000 + '<br>' + 'info.memory.programs:' + this.renderer.info.memory.programs + '<br>' + 'info.memory.geometries:' + this.renderer.info.memory.geometries + '<br>' + 'info.memory.textures:' + this.renderer.info.memory.textures + '<br>' + 'info.render.calls:' + this.renderer.info.render.calls + '<br>' + 'info.render.vertices:' + this.renderer.info.render.vertices + '<br>' + 'info.render.faces:' + this.renderer.info.render.faces + '<br>' + 'info.render.points:' + this.renderer.info.render.points);
        },
        resize: function() {
          PXUtil.Util.trace_func('IScene::resize');
          var wh = PXUtil.Util.getWH();
          this.camera.aspect = wh.width / wh.height;
          this.camera.updateProjectionMatrix();
        }
      }, {}]);
    }, this, arguments);
  })();
  return ($__1 = {}, Object.defineProperty($__1, "IScene", {
    get: function() {
      return IScene;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("objects/debugbox.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "objects/debugbox.js";
  var PXConfig = System.get("config.js");
  var PXUtil = System.get("util.js");
  var Debugbox = $traceurRuntime.initTailRecursiveFunction(function() {
    return $traceurRuntime.call(function() {
      function Debugbox(callback_function) {
        PXUtil.Util.trace_func('Debugbox::constructor');
        this.callback_function = callback_function;
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshPhongMaterial({color: 0x00ff00}));
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.callback_function(this.mesh);
      }
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [Debugbox, {rendering: function(delta) {
          this.mesh.rotation.y += delta;
        }}, {}]);
    }, this, arguments);
  })();
  return ($__1 = {}, Object.defineProperty($__1, "Debugbox", {
    get: function() {
      return Debugbox;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("objects/debugfloor.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "objects/debugfloor.js";
  var PXUtil = System.get("util.js");
  var PXConfig = System.get("config.js");
  var Debugfloor = $traceurRuntime.initTailRecursiveFunction(function() {
    return $traceurRuntime.call(function() {
      function Debugfloor(callback_function) {
        PXUtil.Util.trace_func('Debugfloor::constructor');
        this.callback_function = callback_function;
        this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), new THREE.MeshPhongMaterial({color: 0xe0e0e0}));
        this.mesh.rotation.x = Math.PI + Math.PI / 2;
        this.mesh.receiveShadow = true;
        this.callback_function(this.mesh);
      }
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [Debugfloor, {rendering: function(delta) {}}, {}]);
    }, this, arguments);
  })();
  return ($__1 = {}, Object.defineProperty($__1, "Debugfloor", {
    get: function() {
      return Debugfloor;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("objects/shaderbox.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "objects/shaderbox.js";
  var PXUtil = System.get("util.js");
  var PXConfig = System.get("config.js");
  var Shaderbox = $traceurRuntime.initTailRecursiveFunction(function() {
    return $traceurRuntime.call(function() {
      function Shaderbox(myVertexShader1, myFragmentShader1, callback_function) {
        PXUtil.Util.trace_func('Shaderbox::constructor');
        this.callback_function = callback_function;
        var baseTexture = new THREE.ImageUtils.loadTexture(PXConfig._ASSETS_PATH_ + 'Three.js-code-example.jpg');
        var sepia = true;
        var sepia_value = false;
        var grayscale_value = false;
        if (sepia === true) {
          sepia_value = true;
        } else {
          grayscale_value = true;
        }
        this.customUniforms = {
          baseTexture: {
            type: "t",
            value: baseTexture
          },
          time: {
            type: "f",
            value: 1.0
          },
          grayscale: {
            type: "i",
            value: grayscale_value
          },
          sepia: {
            type: "i",
            value: sepia_value
          }
        };
        var customMaterial = new THREE.ShaderMaterial({
          uniforms: this.customUniforms,
          vertexShader: myVertexShader1,
          fragmentShader: myFragmentShader1
        });
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), customMaterial);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.callback_function(this.mesh);
      }
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [Shaderbox, {rendering: function(delta) {
          this.mesh.rotation.y += delta;
          this.customUniforms.time.value += delta;
        }}, {}]);
    }, this, arguments);
  })();
  return ($__1 = {}, Object.defineProperty($__1, "Shaderbox", {
    get: function() {
      return Shaderbox;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("shaderloader.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "shaderloader.js";
  var PXUtil = System.get("util.js");
  var ShaderLoader = $traceurRuntime.initTailRecursiveFunction(function() {
    return $traceurRuntime.call(function() {
      function ShaderLoader() {
        console.log('ShaderLoader::constructor');
      }
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [ShaderLoader, {getXHR2: function(url, cb) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = function() {
            if (this.status === 200) {} else if (this.status === 404) {
              console.log('404 not found: ' + url);
            } else {
              console.log('other xhr error: ' + url);
            }
            cb(this.response);
          };
          xhr.timeout = 10000;
          xhr.ontimeout = function() {
            console.log('timeout: ' + url);
            cb(this.response);
          };
          xhr.send(null);
        }}, {}]);
    }, this, arguments);
  })();
  return ($__1 = {}, Object.defineProperty($__1, "ShaderLoader", {
    get: function() {
      return ShaderLoader;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("objects/videobox.js", [], function(require) {
  "use strict";
  var $__2;
  var __moduleName = "objects/videobox.js";
  var PXConfig = System.get("config.js");
  var PXUtil = System.get("util.js");
  var PXShaderLoader = System.get("shaderloader.js");
  var Videobox = $traceurRuntime.initTailRecursiveFunction(function() {
    return $traceurRuntime.call(function() {
      function Videobox(callback_function) {
        var $__0 = this;
        PXUtil.Util.trace_func('videobox::constructor');
        this.video = document.createElement('video');
        this.video.loop = true;
        this.video.src = PXConfig._ASSETS_PATH_ + "small.ogv";
        this.video.load();
        this.video.play();
        this.videoImage = document.createElement('canvas');
        this.videoImage.width = 480;
        this.videoImage.height = 204;
        this.videoImageContext = this.videoImage.getContext('2d');
        this.videoImageContext.fillStyle = "#000000";
        this.videoImageContext.fillRect(0, 0, this.videoImage.width, this.videoImage.height);
        this.videoTexture = new THREE.Texture(this.videoImage);
        this.videoTexture.minFilter = THREE.LinearFilter;
        this.videoTexture.magFilter = THREE.LinearFilter;
        var vshader = new PXShaderLoader.ShaderLoader();
        var fshader = new PXShaderLoader.ShaderLoader();
        vshader.getXHR2('js/app/assets/shader/vertex.fx', function(vshader) {
          console.log('vshader comp!');
          fshader.getXHR2('js/app/assets/shader/mosaic_fragment.fx', function(fshader) {
            console.log('fshader comp!');
            $__0.customUniforms = {
              baseTexture: {
                type: "t",
                value: $__0.videoTexture
              },
              time: {
                type: "f",
                value: 1.0
              },
              vScreenSize: {
                type: "v2",
                value: new THREE.Vector2(480.0, 320.0)
              },
              fMosaicScale: {
                type: "f",
                value: 10.0
              }
            };
            var customMaterial = new THREE.ShaderMaterial({
              uniforms: $__0.customUniforms,
              vertexShader: vshader,
              fragmentShader: fshader
            });
            $__0.mesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), customMaterial);
            callback_function($__0.mesh);
          });
        });
      }
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [Videobox, {rendering: function(delta) {
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
        }}, {}]);
    }, this, arguments);
  })();
  return ($__2 = {}, Object.defineProperty($__2, "Videobox", {
    get: function() {
      return Videobox;
    },
    configurable: true,
    enumerable: true
  }), $__2);
});
$traceurRuntime.options.symbols = true;
System.registerModule("scenes/testscene.js", [], function(require) {
  "use strict";
  var $__2;
  var __moduleName = "scenes/testscene.js";
  var PXConfig = System.get("config.js");
  var PXUtil = System.get("util.js");
  var PXLogger = System.get("logger.js");
  var PXIScene = System.get("iscene.js");
  var PXDebugbox = System.get("objects/debugbox.js");
  var PXVideobox = System.get("objects/videobox.js");
  var PXShaderLoader = System.get("shaderloader.js");
  var PXShaderbox = System.get("objects/shaderbox.js");
  var PXDebugfloor = System.get("objects/debugfloor.js");
  var TestScene = $traceurRuntime.initTailRecursiveFunction(function($__super) {
    return $traceurRuntime.call(function($__super) {
      function TestScene(renderer) {
        $traceurRuntime.superConstructor(TestScene).call(this, renderer);
        PXUtil.Util.trace_func('TestScene::constructor');
        PXLogger.Logger.log('TestScene::constructor');
        this.scene;
        this.camera;
        this.light;
        this.ambient;
        this.loadingStatus.allItems = 0;
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        var wh = PXUtil.Util.getWH();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100000);
        this.camera.position.set(0, 150, 500);
        this.camera.aspect = wh.width / wh.height;
        this.camera.updateProjectionMatrix();
        this.light = new THREE.SpotLight(0xffffff);
        this.light.position.set(100, 1000, 0);
        this.light.angle = Math.PI / 4;
        this.scene.add(this.light);
        this.ambient = new THREE.AmbientLight(0x333333);
        this.scene.add(this.ambient);
        this.loadObjects();
        this.testController();
      }
      return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [TestScene, {loadObjects: function() {
          var $__0 = this;
          var debugbox = new PXDebugbox.Debugbox(function(mesh) {
            mesh.position.y += 70;
            $__0.scene.add(mesh);
            $__0.loadedIncrements();
          });
          this.render_target_array.push(debugbox);
          var videobox = new PXVideobox.Videobox(function(mesh) {
            mesh.position.y += 70;
            mesh.position.x += 240;
            $__0.scene.add(mesh);
            $__0.loadedIncrements();
          });
          this.render_target_array.push(videobox);
          var debugfloor = new PXDebugfloor.Debugfloor(function(mesh) {
            $__0.scene.add(mesh);
            $__0.loadedIncrements();
          });
          this.render_target_array.push(debugfloor);
          var vshader = new PXShaderLoader.ShaderLoader();
          var fshader = new PXShaderLoader.ShaderLoader();
          vshader.getXHR2('js/app/assets/shader/vertex.fx', function(vshader) {
            console.log('vshader comp!');
            fshader.getXHR2('js/app/assets/shader/fragment.fx', function(fshader) {
              console.log('fshader comp!');
              var shaderbox = new PXShaderbox.Shaderbox(vshader, fshader, function(mesh) {
                mesh.position.y += 70;
                mesh.position.x += 120;
                $__0.scene.add(mesh);
                $__0.loadedIncrements();
              });
              $__0.render_target_array.push(shaderbox);
            });
          });
        }}, {}, $__super]);
    }, this, arguments);
  })(PXIScene.IScene);
  return ($__2 = {}, Object.defineProperty($__2, "TestScene", {
    get: function() {
      return TestScene;
    },
    configurable: true,
    enumerable: true
  }), $__2);
});
$traceurRuntime.options.symbols = true;
System.registerModule("app.js", [], function(require) {
  "use strict";
  var __moduleName = "app.js";
  var PXConfig = System.get("config.js");
  var PXUtil = System.get("util.js");
  var PXLogger = System.get("logger.js");
  var PXTestScene = System.get("scenes/testscene.js");
  (function() {
    var Application = $traceurRuntime.initTailRecursiveFunction(function() {
      return $traceurRuntime.call(function() {
        function Application() {
          if (PXConfig._DEBUG_MODE_) {
            PXLogger.Logger.init(5);
          }
          PXUtil.Util.trace_func('Application::consturctor');
          PXLogger.Logger.log('Application::consturctor');
          this.renderer;
          this.stats;
          this.currentSceneObject;
          if (Detector.webgl) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
            PXUtil.Util.trace_func('renderer->webgl');
            PXLogger.Logger.log('renderer->webgl');
            var gl_info = PXUtil.Util.webglInfo(this.renderer);
          } else {
            this.renderer = new THREE.CanvasRenderer();
            PXUtil.Util.trace_func('renderer->canvas');
            PXLogger.Logger.log('renderer->canvas');
          }
          var wh = PXUtil.Util.getWH();
          this.renderer.setSize(wh.width, wh.height);
          this.renderer.setClearColor(0x000000, 1);
          document.getElementById('canvas').appendChild(this.renderer.domElement);
          if (PXConfig._DEBUG_MODE_) {
            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = '0px';
            this.stats.domElement.style.zIndex = 100;
            document.body.appendChild(this.stats.domElement);
          }
          this.currentSceneObject = new PXTestScene.TestScene(this.renderer);
          this.resize();
        }
        return $traceurRuntime.continuation($traceurRuntime.createClass, $traceurRuntime, [Application, {
          run: function() {
            PXUtil.Util.trace_func('Application::run');
            PXLogger.Logger.log('Application::run');
            PXLogger.Logger.log('HOGE!!!');
            PXUtil.Util.createDebugBoard();
            PXUtil.Util.debug('debug');
            this.update();
          },
          update: function() {
            this.rendering();
            if (PXConfig._DEBUG_MODE_) {
              this.stats.update();
            }
          },
          rendering: function() {
            var $__0 = this;
            if (PXConfig._FPS_ === 60) {
              requestAnimationFrame(function() {
                $__0.update();
              });
            } else {
              setTimeout(function() {
                requestAnimationFrame(function() {
                  $__0.update();
                });
              }, 1000 / PXConfig._FPS_);
            }
            if (this.currentSceneObject.loadingStatus.status === 'loaded') {
              this.currentSceneObject.rendering();
            }
          },
          resize: function() {
            var $__0 = this;
            window.addEventListener('resize', function(event) {
              var wh = PXUtil.Util.getWH();
              PXLogger.Logger.log('Application::resize w:' + wh.width + ',h:' + wh.height + ',e:' + event);
              $__0.renderer.setSize(wh.width, wh.height);
              $__0.currentSceneObject.resize();
            }, false);
          }
        }, {}]);
      }, this, arguments);
    })();
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function() {
        PXUtil.Util.i18nLoad(function() {
          PXUtil.Util.trace_func(i18n.t('app.i18nLoadComplete'));
          var app = new Application();
          app.run();
        });
      }, false);
    } else {
      alert('Sorry. Not supported browser...');
    }
  }());
  return {};
});
System.get("app.js" + '');
