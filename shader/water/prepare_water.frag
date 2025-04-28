
#version 460

//#extension GL_EXT_control_flow_attributes : enable
#extension GL_GOOGLE_include_directive    : enable
#extension GL_EXT_shader_image_load_formatted : require 

#include "scene.glsl"
#include "common.glsl" 

layout(binding = 0, std140) uniform   UboScene {
  SceneDesc scene;
  };
layout(binding = 1) uniform texture2D waterCaustic;

layout(location = 0) out vec4 outColor;

void main() {
  vec3 caustic  = texelFetch(waterCaustic, ivec2((ivec2(gl_FragCoord.xy) + vec2(  0.0, 0.0) + scene.tickCount32 / 20.0)) % ivec2(768, 768), 0).rgb;
  caustic *= texelFetch(waterCaustic, ivec2((ivec2(gl_FragCoord.xy) + vec2(375.0, 0.0) - scene.tickCount32 / 20.0)) % ivec2(768, 768), 0).rgb;
  outColor = vec4(caustic, 1.0);
}