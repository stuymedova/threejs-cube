import * as THREE from 'three';
import { Effect } from 'postprocessing';

export class CustomEffect extends Effect {
  constructor(options = {}) {
    super('CustomEffect', fragment, {
      uniforms: new Map([['uTexture', new THREE.Uniform(options.texture)]])
    });
  }
}
export default CustomEffect;

const fragment = `
  uniform sampler2D uTexture;
  #ifndef PI
  #  define PI 3.14159265359
  #endif

  void mainUv(inout vec2 uv) {
    vec4 tex = texture2D(uTexture, uv);
    float angle = -((tex.r) * (PI * 2.) - PI) ;
    float vx = -(tex.r *2. - 1.);
    float vy = -(tex.g *2. - 1.);
    float intensity = tex.b;
    uv.x += vx * 0.2 * intensity ;
    uv.y += vy * 0.2  *intensity;
  }
`;
