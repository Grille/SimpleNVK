#version 450
#extension GL_ARB_separate_shader_objects : enable

out gl_PerVertex {
  vec4 gl_Position;
};

layout(location = 0) in vec2 pos;
//layout(location = 1) in vec3 color;
//layout(location = 1) in vec3 color;

//layout(location = 0) out vec3 fragColor;


vec2 positions[] = vec2[](
  vec2(0.0, -0.5),
  vec2(0.5, 0.5),
  vec2(-0.5, 0.5),
    vec2(0.0, -0.5),
  vec2(0.5, 0.5),
  vec2(-0.5, 0.5)
);

/*
vec3 colors[] = vec3[](
  vec3(1.0,0.0,0.0),
  vec3(0.0,1.0,0.0),
  vec3(0.0,0.0,1.0),
    vec3(1.0,0.0,0.0),
  vec3(0.0,1.0,0.0),
  vec3(0.0,0.0,1.0)
);
*/


void main(){
  //positions[gl_VertexIndex];
  gl_Position = vec4(pos, 0.0, 1.0);
  //fragColor = color;
}