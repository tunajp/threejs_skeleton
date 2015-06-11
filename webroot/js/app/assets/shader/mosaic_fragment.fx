/*
 * mosaic fragment shader
 * http://ics-web.jp/lab/archives/5535
 */

uniform sampler2D baseTexture;
varying vec2 vUv; // texcoordと同意
uniform vec2 vScreenSize;
uniform float fMosaicScale;

void main()
{
    vec2 vUv2 = vUv;
    vUv2.x = floor(vUv.x  * vScreenSize.x / fMosaicScale) / (vScreenSize.x / fMosaicScale) + (fMosaicScale/2.0) / vScreenSize.x;
    vUv2.y = floor(vUv.y  * vScreenSize.y / fMosaicScale) / (vScreenSize.y / fMosaicScale) + (fMosaicScale/2.0) / vScreenSize.y;

    vec4 color = texture2D(baseTexture, vUv2);
    gl_FragColor = color;
}
