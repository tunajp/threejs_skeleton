/*
 * unit test
 * node_modules\.bin\mocha ./test/* --compilers js:mocha-traceur
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2015 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

import * as PXCConfig from '../webroot/js/app/config.js';
import * as PXCUtil from '../webroot/js/app/util.js';

(function() {
  var assert = require('assert');

  describe('client', function() {
    describe('lib util', function() {
      it('Hello mocha', function() {
        //var h = new PXCUtil.Hoge();
        //h.hoge(0);
        assert.equal('', '');
      });

      it('getCurrentTimeString', function() {
        var t = PXCUtil.Util.getCurrentTimeString();
        assert.notEqual(t, '');
        assert.equal(t.length, 12);
      });

      it('pad', function() {
        var p = PXCUtil.Util.pad('1');
        assert.equal(p, '01');
        assert.equal(p.length, 2);
        p = PXCUtil.Util.pad('');
        assert.equal(p, '00');
        assert.equal(p.length, 2);
        p = PXCUtil.Util.pad('123');
        assert.equal(p, '23');
        assert.equal(p.length, 2);
      });

      it('uuid', () => {
        var uuid = PXCUtil.Util.uuid();
        assert.equal(uuid.length, 36);
        assert.notEqual(uuid, '6819fc02-5ce7-4c3e-ad53-9e523d094962');
        uuid = PXCUtil.Util.uuid();
        assert.equal(uuid.length, 36);
        assert.notEqual(uuid, '6819fc02-5ce7-4c3e-ad53-9e523d094962');
      });
    })
  })

}());
