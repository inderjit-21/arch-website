// // fragment.glsl
// uniform sampler2D uTexture;
// uniform vec2 uPlaneResolution;   // plane size (width, height)
// uniform vec2 uImageResolution;   // image size (width, height)

// varying vec2 vUv;

// void main() {
//   vec2 uv = vUv;

//   // aspect ratios
//   float planeRatio = uPlaneResolution.x / uPlaneResolution.y;
//   float imageRatio = uImageResolution.x / uImageResolution.y;

//   vec2 newUv = uv;

//   if (planeRatio > imageRatio) {
//     // plane is wider → scale Y
//     float scale = imageRatio / planeRatio;
//     newUv.y = uv.y * scale + (1.0 - scale) * 0.5;
//   } else {
//     // plane is taller → scale X
//     float scale = planeRatio / imageRatio;
//     newUv.x = uv.x * scale + (1.0 - scale) * 0.5;
//   }

//   vec4 color = texture2D(uTexture, newUv);
//   gl_FragColor = color;
// }


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
}