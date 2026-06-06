
export const FragmentShader = `
uniform sampler2D uTexture;


uniform vec2 uPlaneResolution;
uniform vec2 uImageResolution;

uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    // -------------------------
    // IMAGE COVER
    // -------------------------

    float planeRatio =
      uPlaneResolution.x / uPlaneResolution.y;

    float imageRatio =
      uImageResolution.x / uImageResolution.y;

    vec2 newUv = uv;

    if (planeRatio > imageRatio) {

        float scale = imageRatio / planeRatio;

        newUv.y =
          uv.y * scale +
          (1.0 - scale) * 0.5;

    } else {

        float scale = planeRatio / imageRatio;

        newUv.x =
          uv.x * scale +
          (1.0 - scale) * 0.5;
    }

    // -------------------------
    // WATER RIPPLE
    // -------------------------

    vec2 mouse = uMouse;

    float dist = distance(uv, mouse);

    // ripple radius
    float rippleArea =
      smoothstep(0.35, 0.0, dist);

    // ripple waves
    float ripple =
      sin(dist * 40.0 - uTime * 6.0);

    // final strength
    float strength =
      ripple *
      0.015 *
      rippleArea *
      uHover;

    // distortion direction
    vec2 dir = normalize(uv - mouse);

    newUv += dir * strength;

    // -------------------------
    // TEXTURE
    // -------------------------

    vec4 color =
      texture2D(uTexture, newUv);

    gl_FragColor = color;
}`;

export const VertexShader = `uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;

varying vec2 vUv;

void main() {

    vUv = uv;

    vec3 pos = position;

    // -------------------------
    // RIPPLE
    // -------------------------

    vec2 mouse = uMouse;

    float dist = distance(uv, mouse);

    // ripple influence radius
    float rippleArea =
        smoothstep(0.4, 0.0, dist);

    // wave animation
    float ripple =
        sin(dist * 45.0 - uTime * 7.0) *0.1;

    // final elevation strength
    float elevation =
        ripple *
        8.0 *
        rippleArea *
        uHover;

    // PUSH VERTICES
    pos.z += elevation;

    // OPTIONAL:
    // slight x/y movement for liquid feel

    vec2 dir = uv - mouse;

    float len = length(dir);

    if(len > 0.0){
        dir /= len;
    }

    pos.x += dir.x * elevation * 0.01;
    pos.y += dir.y * elevation * 0.01;

    // FINAL POSITION

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(pos, 1.0);
}`;

