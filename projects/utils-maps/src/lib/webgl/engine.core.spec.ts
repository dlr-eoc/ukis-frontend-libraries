import { Program } from './engine.core';

describe('EngineCore', () => {
  it('should create Program', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    canvas.style.position = 'absolute';

    // Step 2: setting up webgl
    const gl = canvas.getContext('webgl') as WebGLRenderingContext;
    const newProgram = new Program(gl,  `
            attribute vec3 a_position;
            attribute vec2 a_texturePosition;
            uniform mat3 u_world2pix;
            uniform mat3 u_pix2canv;
            varying vec2 v_texturePosition;
            void main() {
                vec3 pixelPosition = u_world2pix * vec3(a_position.x, a_position.y, 1.);
                vec3 canvasPosition = u_pix2canv * pixelPosition;
                gl_Position = vec4(canvasPosition.x, canvasPosition.y, 0., 1.);
                v_texturePosition = a_texturePosition;
            }
        `, `
            precision mediump float;
            uniform sampler2D u_srtm;
            uniform float u_imageSize;
            uniform vec3 u_sun;
            varying vec2 v_texturePosition;
            void main() {
                float delta = 4. / u_imageSize;
                float top = texture2D(u_srtm, vec2(v_texturePosition.x,         1. - v_texturePosition.y + delta)).r;
                float bot = texture2D(u_srtm, vec2(v_texturePosition.x,         1. - v_texturePosition.y - delta)).r;
                float lft = texture2D(u_srtm, vec2(v_texturePosition.x + delta, 1. - v_texturePosition.y        )).r;
                float rgt = texture2D(u_srtm, vec2(v_texturePosition.x - delta, 1. - v_texturePosition.y        )).r;

                vec3 surfaceNormal = vec3(
                    lft - rgt,
                    bot - top,
                    2. * delta
                );
                surfaceNormal = normalize(surfaceNormal);
                vec3 sunNormal = normalize(u_sun);
                float alignment = abs(dot(sunNormal, surfaceNormal));

                gl_FragColor = vec4(0., 0., 0., 0.5 * alignment);
            }
        `);
    expect(newProgram).toBeTruthy();
  });
});
