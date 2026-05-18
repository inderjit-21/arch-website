// varying vec2 vUv;

// void main() {

//     // UV
//     vUv = uv;

//     // POSITION
//     vec3 pos = position;

//     // FINAL POSITION
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }

uniform vec2 uMouse;
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
}