//#include <required.glsl> // [HACK 4/6/2023] See SCC shader_merger.cpp
// SCC_BACKEND_SHADER_FLAGS_BEGIN__
// SCC_BACKEND_SHADER_FLAGS_END__
//SG_REFLECTION_BEGIN(200)
//attribute vec4 boneData 5
//attribute vec3 blendShape0Pos 6
//attribute vec3 blendShape0Normal 12
//attribute vec3 blendShape1Pos 7
//attribute vec3 blendShape1Normal 13
//attribute vec3 blendShape2Pos 8
//attribute vec3 blendShape2Normal 14
//attribute vec3 blendShape3Pos 9
//attribute vec3 blendShape4Pos 10
//attribute vec3 blendShape5Pos 11
//attribute vec4 position 0
//attribute vec3 normal 1
//attribute vec4 tangent 2
//attribute vec2 texture0 3
//attribute vec2 texture1 4
//attribute vec4 color 18
//attribute vec3 positionNext 15
//attribute vec3 positionPrevious 16
//attribute vec4 strandProperties 17
//sampler sampler intensityTextureSmpSC 0:15
//sampler sampler sc_EnvmapDiffuseSmpSC 0:16
//sampler sampler sc_EnvmapSpecularSmpSC 0:17
//sampler sampler sc_OITCommonSampler 0:18
//sampler sampler sc_SSAOTextureSmpSC 0:19
//sampler sampler sc_ScreenTextureSmpSC 0:20
//sampler sampler sc_ShadowTextureSmpSC 0:21
//texture texture2D intensityTexture 0:0:0:15
//texture texture2D sc_EnvmapDiffuse 0:1:0:16
//texture texture2D sc_EnvmapSpecular 0:2:0:17
//texture texture2D sc_OITAlpha0 0:3:0:18
//texture texture2D sc_OITAlpha1 0:4:0:18
//texture texture2D sc_OITDepthHigh0 0:5:0:18
//texture texture2D sc_OITDepthHigh1 0:6:0:18
//texture texture2D sc_OITDepthLow0 0:7:0:18
//texture texture2D sc_OITDepthLow1 0:8:0:18
//texture texture2D sc_OITFilteredDepthBoundsTexture 0:9:0:18
//texture texture2D sc_OITFrontDepthTexture 0:10:0:18
//texture texture2D sc_SSAOTexture 0:11:0:19
//texture texture2D sc_ScreenTexture 0:12:0:20
//texture texture2D sc_ShadowTexture 0:13:0:21
//spec_const bool BLEND_MODE_AVERAGE 0 0
//spec_const bool BLEND_MODE_BRIGHT 1 0
//spec_const bool BLEND_MODE_COLOR 2 0
//spec_const bool BLEND_MODE_COLOR_BURN 3 0
//spec_const bool BLEND_MODE_COLOR_DODGE 4 0
//spec_const bool BLEND_MODE_DARKEN 5 0
//spec_const bool BLEND_MODE_DIFFERENCE 6 0
//spec_const bool BLEND_MODE_DIVIDE 7 0
//spec_const bool BLEND_MODE_DIVISION 8 0
//spec_const bool BLEND_MODE_EXCLUSION 9 0
//spec_const bool BLEND_MODE_FORGRAY 10 0
//spec_const bool BLEND_MODE_HARD_GLOW 11 0
//spec_const bool BLEND_MODE_HARD_LIGHT 12 0
//spec_const bool BLEND_MODE_HARD_MIX 13 0
//spec_const bool BLEND_MODE_HARD_PHOENIX 14 0
//spec_const bool BLEND_MODE_HARD_REFLECT 15 0
//spec_const bool BLEND_MODE_HUE 16 0
//spec_const bool BLEND_MODE_INTENSE 17 0
//spec_const bool BLEND_MODE_LIGHTEN 18 0
//spec_const bool BLEND_MODE_LINEAR_LIGHT 19 0
//spec_const bool BLEND_MODE_LUMINOSITY 20 0
//spec_const bool BLEND_MODE_NEGATION 21 0
//spec_const bool BLEND_MODE_NOTBRIGHT 22 0
//spec_const bool BLEND_MODE_OVERLAY 23 0
//spec_const bool BLEND_MODE_PIN_LIGHT 24 0
//spec_const bool BLEND_MODE_REALISTIC 25 0
//spec_const bool BLEND_MODE_SATURATION 26 0
//spec_const bool BLEND_MODE_SOFT_LIGHT 27 0
//spec_const bool BLEND_MODE_SUBTRACT 28 0
//spec_const bool BLEND_MODE_VIVID_LIGHT 29 0
//spec_const bool ENABLE_STIPPLE_PATTERN_TEST 30 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_intensityTexture 31 0
//spec_const bool SC_USE_UV_MIN_MAX_intensityTexture 32 0
//spec_const bool SC_USE_UV_TRANSFORM_intensityTexture 33 0
//spec_const bool UseViewSpaceDepthVariant 34 1
//spec_const bool intensityTextureHasSwappedViews 35 0
//spec_const bool sc_BlendMode_Add 36 0
//spec_const bool sc_BlendMode_AddWithAlphaFactor 37 0
//spec_const bool sc_BlendMode_AlphaTest 38 0
//spec_const bool sc_BlendMode_AlphaToCoverage 39 0
//spec_const bool sc_BlendMode_ColoredGlass 40 0
//spec_const bool sc_BlendMode_Custom 41 0
//spec_const bool sc_BlendMode_Max 42 0
//spec_const bool sc_BlendMode_Min 43 0
//spec_const bool sc_BlendMode_Multiply 44 0
//spec_const bool sc_BlendMode_MultiplyOriginal 45 0
//spec_const bool sc_BlendMode_Normal 46 0
//spec_const bool sc_BlendMode_PremultipliedAlpha 47 0
//spec_const bool sc_BlendMode_PremultipliedAlphaAuto 48 0
//spec_const bool sc_BlendMode_PremultipliedAlphaHardware 49 0
//spec_const bool sc_BlendMode_Screen 50 0
//spec_const bool sc_DepthOnly 51 0
//spec_const bool sc_EnvmapDiffuseHasSwappedViews 52 0
//spec_const bool sc_EnvmapSpecularHasSwappedViews 53 0
//spec_const bool sc_FramebufferFetch 54 0
//spec_const bool sc_HasDiffuseEnvmap 55 0
//spec_const bool sc_IsEditor 56 0
//spec_const bool sc_LightEstimation 57 0
//spec_const bool sc_MotionVectorsPass 58 0
//spec_const bool sc_OITCompositingPass 59 0
//spec_const bool sc_OITDepthBoundsPass 60 0
//spec_const bool sc_OITDepthGatherPass 61 0
//spec_const bool sc_OITDepthPrepass 62 0
//spec_const bool sc_OITFrontLayerPass 63 0
//spec_const bool sc_OITMaxLayers4Plus1 64 0
//spec_const bool sc_OITMaxLayers8 65 0
//spec_const bool sc_OITMaxLayersVisualizeLayerCount 66 0
//spec_const bool sc_OutputBounds 67 0
//spec_const bool sc_ProjectiveShadowsCaster 68 0
//spec_const bool sc_ProjectiveShadowsReceiver 69 0
//spec_const bool sc_RenderAlphaToColor 70 0
//spec_const bool sc_SSAOEnabled 71 0
//spec_const bool sc_ScreenTextureHasSwappedViews 72 0
//spec_const bool sc_TAAEnabled 73 0
//spec_const bool sc_VertexBlending 74 0
//spec_const bool sc_VertexBlendingUseNormals 75 0
//spec_const bool sc_Voxelization 76 0
//spec_const int SC_DEVICE_CLASS 77 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_intensityTexture 78 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_intensityTexture 79 -1
//spec_const int intensityTextureLayout 80 0
//spec_const int sc_AmbientLightMode0 81 0
//spec_const int sc_AmbientLightMode1 82 0
//spec_const int sc_AmbientLightMode2 83 0
//spec_const int sc_AmbientLightMode_Constant 84 0
//spec_const int sc_AmbientLightMode_EnvironmentMap 85 0
//spec_const int sc_AmbientLightMode_FromCamera 86 0
//spec_const int sc_AmbientLightMode_SphericalHarmonics 87 0
//spec_const int sc_AmbientLightsCount 88 0
//spec_const int sc_DepthBufferMode 89 0
//spec_const int sc_DirectionalLightsCount 90 0
//spec_const int sc_EnvLightMode 91 0
//spec_const int sc_EnvmapDiffuseLayout 92 0
//spec_const int sc_EnvmapSpecularLayout 93 0
//spec_const int sc_LightEstimationSGCount 94 0
//spec_const int sc_PointLightsCount 95 0
//spec_const int sc_RenderingSpace 96 -1
//spec_const int sc_ScreenTextureLayout 97 0
//spec_const int sc_ShaderCacheConstant 98 0
//spec_const int sc_SkinBonesCount 99 0
//spec_const int sc_StereoRenderingMode 100 0
//spec_const int sc_StereoRendering_IsClipDistanceEnabled 101 0
//spec_const int sc_StereoViewID 102 0
//SG_REFLECTION_END
#define sc_StereoRendering_Disabled 0
#define sc_StereoRendering_InstancedClipped 1
#define sc_StereoRendering_Multiview 2
#ifdef VERTEX_SHADER
#define scOutPos(clipPosition) gl_Position=clipPosition
#define MAIN main
#endif
#ifdef SC_ENABLE_INSTANCED_RENDERING
#ifndef sc_EnableInstancing
#define sc_EnableInstancing 1
#endif
#endif
#define mod(x,y) (x-y*floor((x+1e-6)/y))
#if __VERSION__<300
#define isinf(x) (x!=0.0&&x*2.0==x ? true : false)
#define isnan(x) (x>0.0||x<0.0||x==0.0 ? false : true)
#define inverse(M) M
#endif
#ifdef sc_EnableStereoClipDistance
#if defined(GL_APPLE_clip_distance)
#extension GL_APPLE_clip_distance : require
#elif defined(GL_EXT_clip_cull_distance)
#extension GL_EXT_clip_cull_distance : require
#else
#error Clip distance is requested but not supported by this device.
#endif
#endif
#ifdef sc_EnableMultiviewStereoRendering
#define sc_StereoRenderingMode sc_StereoRendering_Multiview
#define sc_NumStereoViews 2
#extension GL_OVR_multiview2 : require
#ifdef VERTEX_SHADER
#ifdef sc_EnableInstancingFallback
#define sc_GlobalInstanceID (sc_FallbackInstanceID*2+gl_InstanceID)
#else
#define sc_GlobalInstanceID gl_InstanceID
#endif
#define sc_LocalInstanceID sc_GlobalInstanceID
#define sc_StereoViewID int(gl_ViewID_OVR)
#endif
#elif defined(sc_EnableInstancedClippedStereoRendering)
#ifndef sc_EnableInstancing
#error Instanced-clipped stereo rendering requires enabled instancing.
#endif
#ifndef sc_EnableStereoClipDistance
#define sc_StereoRendering_IsClipDistanceEnabled 0
#else
#define sc_StereoRendering_IsClipDistanceEnabled 1
#endif
#define sc_StereoRenderingMode sc_StereoRendering_InstancedClipped
#define sc_NumStereoClipPlanes 1
#define sc_NumStereoViews 2
#ifdef VERTEX_SHADER
#ifdef sc_EnableInstancingFallback
#define sc_GlobalInstanceID (sc_FallbackInstanceID*2+gl_InstanceID)
#else
#define sc_GlobalInstanceID gl_InstanceID
#endif
#define sc_LocalInstanceID (sc_GlobalInstanceID/2)
#define sc_StereoViewID (sc_GlobalInstanceID%2)
#endif
#else
#define sc_StereoRenderingMode sc_StereoRendering_Disabled
#endif
#if defined(sc_EnableInstancing)&&defined(VERTEX_SHADER)
#ifdef GL_ARB_draw_instanced
#extension GL_ARB_draw_instanced : require
#define gl_InstanceID gl_InstanceIDARB
#endif
#ifdef GL_EXT_draw_instanced
#extension GL_EXT_draw_instanced : require
#define gl_InstanceID gl_InstanceIDEXT
#endif
#ifndef sc_InstanceID
#define sc_InstanceID gl_InstanceID
#endif
#ifndef sc_GlobalInstanceID
#ifdef sc_EnableInstancingFallback
#define sc_GlobalInstanceID (sc_FallbackInstanceID)
#define sc_LocalInstanceID (sc_FallbackInstanceID)
#else
#define sc_GlobalInstanceID gl_InstanceID
#define sc_LocalInstanceID gl_InstanceID
#endif
#endif
#endif
#ifndef GL_ES
#extension GL_EXT_gpu_shader4 : enable
#extension GL_ARB_shader_texture_lod : enable
#define precision
#define lowp
#define mediump
#define highp
#define sc_FragmentPrecision
#endif
#ifdef GL_ES
#ifdef sc_FramebufferFetch
#if defined(GL_EXT_shader_framebuffer_fetch)
#extension GL_EXT_shader_framebuffer_fetch : require
#elif defined(GL_ARM_shader_framebuffer_fetch)
#extension GL_ARM_shader_framebuffer_fetch : require
#else
#error Framebuffer fetch is requested but not supported by this device.
#endif
#endif
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define sc_FragmentPrecision highp
#else
#define sc_FragmentPrecision mediump
#endif
#ifdef FRAGMENT_SHADER
precision highp int;
precision highp float;
#endif
#endif
#ifdef VERTEX_SHADER
#ifdef sc_EnableMultiviewStereoRendering
layout(num_views=sc_NumStereoViews) in;
#endif
#endif
#define SC_INT_FALLBACK_FLOAT int
#define SC_INTERPOLATION_FLAT flat
#define SC_INTERPOLATION_CENTROID centroid
#ifndef sc_NumStereoViews
#define sc_NumStereoViews 1
#endif
#ifndef sc_TextureRenderingLayout_Regular
#define sc_TextureRenderingLayout_Regular 0
#define sc_TextureRenderingLayout_StereoInstancedClipped 1
#define sc_TextureRenderingLayout_StereoMultiview 2
#endif
#if defined VERTEX_SHADER
struct sc_Vertex_t
{
vec4 position;
vec3 normal;
vec3 tangent;
vec2 texture0;
vec2 texture1;
};
#ifndef sc_StereoRenderingMode
#define sc_StereoRenderingMode 0
#endif
#ifndef sc_StereoViewID
#define sc_StereoViewID 0
#endif
#ifndef sc_RenderingSpace
#define sc_RenderingSpace -1
#endif
#ifndef sc_TAAEnabled
#define sc_TAAEnabled 0
#elif sc_TAAEnabled==1
#undef sc_TAAEnabled
#define sc_TAAEnabled 1
#endif
#ifndef sc_MotionVectorsPass
#define sc_MotionVectorsPass 0
#elif sc_MotionVectorsPass==1
#undef sc_MotionVectorsPass
#define sc_MotionVectorsPass 1
#endif
#ifndef sc_NumStereoViews
#define sc_NumStereoViews 1
#endif
#ifndef sc_StereoRendering_IsClipDistanceEnabled
#define sc_StereoRendering_IsClipDistanceEnabled 0
#endif
#ifndef sc_ShaderCacheConstant
#define sc_ShaderCacheConstant 0
#endif
#ifndef sc_SkinBonesCount
#define sc_SkinBonesCount 0
#endif
#ifndef sc_VertexBlending
#define sc_VertexBlending 0
#elif sc_VertexBlending==1
#undef sc_VertexBlending
#define sc_VertexBlending 1
#endif
#ifndef sc_VertexBlendingUseNormals
#define sc_VertexBlendingUseNormals 0
#elif sc_VertexBlendingUseNormals==1
#undef sc_VertexBlendingUseNormals
#define sc_VertexBlendingUseNormals 1
#endif
struct sc_Camera_t
{
vec3 position;
float aspect;
vec2 clipPlanes;
};
#ifndef sc_DepthBufferMode
#define sc_DepthBufferMode 0
#endif
#ifndef sc_ProjectiveShadowsReceiver
#define sc_ProjectiveShadowsReceiver 0
#elif sc_ProjectiveShadowsReceiver==1
#undef sc_ProjectiveShadowsReceiver
#define sc_ProjectiveShadowsReceiver 1
#endif
#ifndef sc_OITDepthGatherPass
#define sc_OITDepthGatherPass 0
#elif sc_OITDepthGatherPass==1
#undef sc_OITDepthGatherPass
#define sc_OITDepthGatherPass 1
#endif
#ifndef sc_OITCompositingPass
#define sc_OITCompositingPass 0
#elif sc_OITCompositingPass==1
#undef sc_OITCompositingPass
#define sc_OITCompositingPass 1
#endif
#ifndef sc_OITDepthBoundsPass
#define sc_OITDepthBoundsPass 0
#elif sc_OITDepthBoundsPass==1
#undef sc_OITDepthBoundsPass
#define sc_OITDepthBoundsPass 1
#endif
#ifndef sc_Voxelization
#define sc_Voxelization 0
#elif sc_Voxelization==1
#undef sc_Voxelization
#define sc_Voxelization 1
#endif
#ifndef UseViewSpaceDepthVariant
#define UseViewSpaceDepthVariant 1
#elif UseViewSpaceDepthVariant==1
#undef UseViewSpaceDepthVariant
#define UseViewSpaceDepthVariant 1
#endif
#ifndef sc_OutputBounds
#define sc_OutputBounds 0
#elif sc_OutputBounds==1
#undef sc_OutputBounds
#define sc_OutputBounds 1
#endif
uniform mat4 sc_ModelMatrix;
uniform mat4 sc_ProjectorMatrix;
uniform vec2 sc_TAAJitterOffset;
uniform mat4 sc_ViewProjectionMatrixArray[sc_NumStereoViews];
uniform mat4 sc_PrevFrameViewProjectionMatrixArray[sc_NumStereoViews];
uniform mat4 sc_PrevFrameModelMatrix;
uniform mat4 sc_ModelMatrixInverse;
uniform int sc_FallbackInstanceID;
uniform vec4 sc_StereoClipPlanes[sc_NumStereoViews];
uniform vec4 sc_UniformConstants;
uniform vec4 sc_BoneMatrices[((sc_SkinBonesCount*3)+1)];
uniform mat3 sc_SkinBonesNormalMatrices[(sc_SkinBonesCount+1)];
uniform vec4 weights0;
uniform vec4 weights1;
uniform mat4 sc_ModelViewMatrixArray[sc_NumStereoViews];
uniform sc_Camera_t sc_Camera;
uniform mat4 sc_ProjectionMatrixInverseArray[sc_NumStereoViews];
uniform mat4 sc_ViewMatrixArray[sc_NumStereoViews];
uniform mat4 sc_ProjectionMatrixArray[sc_NumStereoViews];
uniform mat3 sc_NormalMatrix;
uniform vec4 voxelization_params_0;
uniform vec4 voxelization_params_frustum_lrbt;
uniform vec4 voxelization_params_frustum_nf;
uniform vec3 voxelization_params_camera_pos;
uniform mat4 sc_ModelMatrixVoxelization;
uniform int PreviewEnabled;
varying vec4 varPosAndMotion;
varying vec4 varNormalAndMotion;
varying float varClipDistance;
varying float varStereoViewID;
attribute vec4 boneData;
attribute vec3 blendShape0Pos;
attribute vec3 blendShape0Normal;
attribute vec3 blendShape1Pos;
attribute vec3 blendShape1Normal;
attribute vec3 blendShape2Pos;
attribute vec3 blendShape2Normal;
attribute vec3 blendShape3Pos;
attribute vec3 blendShape4Pos;
attribute vec3 blendShape5Pos;
attribute vec4 position;
attribute vec3 normal;
attribute vec4 tangent;
attribute vec2 texture0;
attribute vec2 texture1;
varying vec4 varTangent;
varying vec4 varTex01;
varying vec4 varScreenPos;
varying vec2 varScreenTexturePos;
varying vec2 varShadowTex;
varying float varViewSpaceDepth;
varying vec4 varColor;
attribute vec4 color;
varying vec4 PreviewVertexColor;
varying float PreviewVertexSaved;
attribute vec3 positionNext;
attribute vec3 positionPrevious;
attribute vec4 strandProperties;
int sc_GetLocalInstanceIDInternal(int id)
{
#ifdef sc_LocalInstanceID
return sc_LocalInstanceID;
#else
return 0;
#endif
}
void blendTargetShapeWithNormal(inout sc_Vertex_t v,vec3 position_1,vec3 normal_1,float weight)
{
vec3 l9_0=v.position.xyz+(position_1*weight);
v=sc_Vertex_t(vec4(l9_0.x,l9_0.y,l9_0.z,v.position.w),v.normal,v.tangent,v.texture0,v.texture1);
v.normal+=(normal_1*weight);
}
void sc_BlendVertex(inout sc_Vertex_t v)
{
#if (sc_VertexBlending)
{
#if (sc_VertexBlendingUseNormals)
{
blendTargetShapeWithNormal(v,blendShape0Pos,blendShape0Normal,weights0.x);
blendTargetShapeWithNormal(v,blendShape1Pos,blendShape1Normal,weights0.y);
blendTargetShapeWithNormal(v,blendShape2Pos,blendShape2Normal,weights0.z);
}
#else
{
vec3 l9_0=v.position.xyz+(blendShape0Pos*weights0.x);
v=sc_Vertex_t(vec4(l9_0.x,l9_0.y,l9_0.z,v.position.w),v.normal,v.tangent,v.texture0,v.texture1);
vec3 l9_1=v.position.xyz+(blendShape1Pos*weights0.y);
v=sc_Vertex_t(vec4(l9_1.x,l9_1.y,l9_1.z,v.position.w),v.normal,v.tangent,v.texture0,v.texture1);
vec3 l9_2=v.position.xyz+(blendShape2Pos*weights0.z);
v=sc_Vertex_t(vec4(l9_2.x,l9_2.y,l9_2.z,v.position.w),v.normal,v.tangent,v.texture0,v.texture1);
vec3 l9_3=v.position.xyz+(blendShape3Pos*weights0.w);
v=sc_Vertex_t(vec4(l9_3.x,l9_3.y,l9_3.z,v.position.w),v.normal,v.tangent,v.texture0,v.texture1);
vec3 l9_4=v.position.xyz+(blendShape4Pos*weights1.x);
v=sc_Vertex_t(vec4(l9_4.x,l9_4.y,l9_4.z,v.position.w),v.normal,v.tangent,v.texture0,v.texture1);
vec3 l9_5=v.position.xyz+(blendShape5Pos*weights1.y);
v=sc_Vertex_t(vec4(l9_5.x,l9_5.y,l9_5.z,v.position.w),v.normal,v.tangent,v.texture0,v.texture1);
}
#endif
}
#endif
}
vec4 sc_GetBoneWeights()
{
vec4 l9_0;
#if (sc_SkinBonesCount>0)
{
vec4 l9_1=vec4(1.0,fract(boneData.yzw));
vec4 l9_2=l9_1;
l9_2.x=1.0-dot(l9_1.yzw,vec3(1.0));
l9_0=l9_2;
}
#else
{
l9_0=vec4(0.0);
}
#endif
return l9_0;
}
void sc_GetBoneMatrix(int index,out vec4 m0,out vec4 m1,out vec4 m2)
{
int l9_0=3*index;
m0=sc_BoneMatrices[l9_0];
m1=sc_BoneMatrices[l9_0+1];
m2=sc_BoneMatrices[l9_0+2];
}
vec3 skinVertexPosition(int i,vec4 v)
{
vec3 l9_0;
#if (sc_SkinBonesCount>0)
{
vec4 param_1;
vec4 param_2;
vec4 param_3;
sc_GetBoneMatrix(i,param_1,param_2,param_3);
l9_0=vec3(dot(v,param_1),dot(v,param_2),dot(v,param_3));
}
#else
{
l9_0=v.xyz;
}
#endif
return l9_0;
}
void sc_SkinVertex(inout sc_Vertex_t v)
{
#if (sc_SkinBonesCount>0)
{
vec4 l9_0=sc_GetBoneWeights();
int l9_1=int(boneData.x);
int l9_2=int(boneData.y);
int l9_3=int(boneData.z);
int l9_4=int(boneData.w);
float l9_5=l9_0.x;
float l9_6=l9_0.y;
float l9_7=l9_0.z;
float l9_8=l9_0.w;
vec3 l9_9=(((skinVertexPosition(l9_1,v.position)*l9_5)+(skinVertexPosition(l9_2,v.position)*l9_6))+(skinVertexPosition(l9_3,v.position)*l9_7))+(skinVertexPosition(l9_4,v.position)*l9_8);
v.position=vec4(l9_9.x,l9_9.y,l9_9.z,v.position.w);
v.normal=((((sc_SkinBonesNormalMatrices[l9_1]*v.normal)*l9_5)+((sc_SkinBonesNormalMatrices[l9_2]*v.normal)*l9_6))+((sc_SkinBonesNormalMatrices[l9_3]*v.normal)*l9_7))+((sc_SkinBonesNormalMatrices[l9_4]*v.normal)*l9_8);
v.tangent=((((sc_SkinBonesNormalMatrices[l9_1]*v.tangent)*l9_5)+((sc_SkinBonesNormalMatrices[l9_2]*v.tangent)*l9_6))+((sc_SkinBonesNormalMatrices[l9_3]*v.tangent)*l9_7))+((sc_SkinBonesNormalMatrices[l9_4]*v.tangent)*l9_8);
}
#endif
}
int sc_GetStereoViewIndex()
{
int l9_0;
#if (sc_StereoRenderingMode==0)
{
l9_0=0;
}
#else
{
l9_0=sc_StereoViewID;
}
#endif
return l9_0;
}
void sc_SetClipDistancePlatform(float dstClipDistance)
{
#if sc_StereoRenderingMode==sc_StereoRendering_InstancedClipped&&sc_StereoRendering_IsClipDistanceEnabled
gl_ClipDistance[0]=dstClipDistance;
#endif
}
void sc_SetClipDistance(float dstClipDistance)
{
#if (sc_StereoRendering_IsClipDistanceEnabled==1)
{
sc_SetClipDistancePlatform(dstClipDistance);
}
#else
{
varClipDistance=dstClipDistance;
}
#endif
}
void sc_SetClipDistance(vec4 clipPosition)
{
#if (sc_StereoRenderingMode==1)
{
sc_SetClipDistance(dot(clipPosition,sc_StereoClipPlanes[sc_StereoViewID]));
}
#endif
}
void sc_SetClipPosition(vec4 clipPosition)
{
#if (sc_ShaderCacheConstant!=0)
{
clipPosition.x+=(sc_UniformConstants.x*float(sc_ShaderCacheConstant));
}
#endif
#if (sc_StereoRenderingMode>0)
{
varStereoViewID=float(sc_StereoViewID);
}
#endif
sc_SetClipDistance(clipPosition);
gl_Position=clipPosition;
}
mat4 createVoxelOrthoMatrix(float left,float right,float bottom,float top,float near,float far)
{
return mat4(vec4(2.0/(right-left),0.0,0.0,(-(right+left))/(right-left)),vec4(0.0,2.0/(top-bottom),0.0,(-(top+bottom))/(top-bottom)),vec4(0.0,0.0,(-2.0)/(far-near),(-(far+near))/(far-near)),vec4(0.0,0.0,0.0,1.0));
}
void main()
{
PreviewVertexColor=vec4(0.5);
PreviewVertexSaved=0.0;
sc_Vertex_t l9_0=sc_Vertex_t(position,normal,tangent.xyz,texture0,texture1);
sc_BlendVertex(l9_0);
sc_SkinVertex(l9_0);
#if (sc_RenderingSpace==3)
{
varPosAndMotion=vec4(vec3(0.0).x,vec3(0.0).y,vec3(0.0).z,varPosAndMotion.w);
varNormalAndMotion=vec4(l9_0.normal.x,l9_0.normal.y,l9_0.normal.z,varNormalAndMotion.w);
varTangent=vec4(l9_0.tangent.x,l9_0.tangent.y,l9_0.tangent.z,varTangent.w);
}
#else
{
#if (sc_RenderingSpace==4)
{
varPosAndMotion=vec4(vec3(0.0).x,vec3(0.0).y,vec3(0.0).z,varPosAndMotion.w);
varNormalAndMotion=vec4(l9_0.normal.x,l9_0.normal.y,l9_0.normal.z,varNormalAndMotion.w);
varTangent=vec4(l9_0.tangent.x,l9_0.tangent.y,l9_0.tangent.z,varTangent.w);
}
#else
{
#if (sc_RenderingSpace==2)
{
varPosAndMotion=vec4(l9_0.position.x,l9_0.position.y,l9_0.position.z,varPosAndMotion.w);
varNormalAndMotion=vec4(l9_0.normal.x,l9_0.normal.y,l9_0.normal.z,varNormalAndMotion.w);
varTangent=vec4(l9_0.tangent.x,l9_0.tangent.y,l9_0.tangent.z,varTangent.w);
}
#else
{
#if (sc_RenderingSpace==1)
{
vec4 l9_1=sc_ModelMatrix*l9_0.position;
varPosAndMotion=vec4(l9_1.x,l9_1.y,l9_1.z,varPosAndMotion.w);
vec3 l9_2=sc_NormalMatrix*l9_0.normal;
varNormalAndMotion=vec4(l9_2.x,l9_2.y,l9_2.z,varNormalAndMotion.w);
vec3 l9_3=sc_NormalMatrix*l9_0.tangent;
varTangent=vec4(l9_3.x,l9_3.y,l9_3.z,varTangent.w);
}
#endif
}
#endif
}
#endif
}
#endif
bool l9_4=PreviewEnabled==1;
vec2 l9_5;
if (l9_4)
{
vec2 l9_6=l9_0.texture0;
l9_6.x=1.0-l9_0.texture0.x;
l9_5=l9_6;
}
else
{
l9_5=l9_0.texture0;
}
varColor=color;
vec3 l9_7;
vec3 l9_8;
vec3 l9_9;
if (l9_4)
{
l9_9=varTangent.xyz;
l9_8=varNormalAndMotion.xyz;
l9_7=varPosAndMotion.xyz;
}
else
{
l9_9=varTangent.xyz;
l9_8=varNormalAndMotion.xyz;
l9_7=varPosAndMotion.xyz;
}
varPosAndMotion=vec4(l9_7.x,l9_7.y,l9_7.z,varPosAndMotion.w);
vec3 l9_10=normalize(l9_8);
varNormalAndMotion=vec4(l9_10.x,l9_10.y,l9_10.z,varNormalAndMotion.w);
vec3 l9_11=normalize(l9_9);
varTangent=vec4(l9_11.x,l9_11.y,l9_11.z,varTangent.w);
varTangent.w=tangent.w;
#if (UseViewSpaceDepthVariant&&((sc_OITDepthGatherPass||sc_OITCompositingPass)||sc_OITDepthBoundsPass))
{
vec4 l9_12;
#if (sc_RenderingSpace==3)
{
l9_12=sc_ProjectionMatrixInverseArray[sc_GetStereoViewIndex()]*l9_0.position;
}
#else
{
vec4 l9_13;
#if (sc_RenderingSpace==2)
{
l9_13=sc_ViewMatrixArray[sc_GetStereoViewIndex()]*l9_0.position;
}
#else
{
vec4 l9_14;
#if (sc_RenderingSpace==1)
{
l9_14=sc_ModelViewMatrixArray[sc_GetStereoViewIndex()]*l9_0.position;
}
#else
{
l9_14=l9_0.position;
}
#endif
l9_13=l9_14;
}
#endif
l9_12=l9_13;
}
#endif
varViewSpaceDepth=-l9_12.z;
}
#endif
vec4 l9_15;
#if (sc_RenderingSpace==3)
{
l9_15=l9_0.position;
}
#else
{
vec4 l9_16;
#if (sc_RenderingSpace==4)
{
l9_16=(sc_ModelViewMatrixArray[sc_GetStereoViewIndex()]*l9_0.position)*vec4(1.0/sc_Camera.aspect,1.0,1.0,1.0);
}
#else
{
vec4 l9_17;
#if (sc_RenderingSpace==2)
{
l9_17=sc_ViewProjectionMatrixArray[sc_GetStereoViewIndex()]*vec4(varPosAndMotion.xyz,1.0);
}
#else
{
vec4 l9_18;
#if (sc_RenderingSpace==1)
{
l9_18=sc_ViewProjectionMatrixArray[sc_GetStereoViewIndex()]*vec4(varPosAndMotion.xyz,1.0);
}
#else
{
l9_18=vec4(0.0);
}
#endif
l9_17=l9_18;
}
#endif
l9_16=l9_17;
}
#endif
l9_15=l9_16;
}
#endif
varTex01=vec4(l9_5,l9_0.texture1);
#if (sc_ProjectiveShadowsReceiver)
{
vec4 l9_19;
#if (sc_RenderingSpace==1)
{
l9_19=sc_ModelMatrix*l9_0.position;
}
#else
{
l9_19=l9_0.position;
}
#endif
vec4 l9_20=sc_ProjectorMatrix*l9_19;
varShadowTex=((l9_20.xy/vec2(l9_20.w))*0.5)+vec2(0.5);
}
#endif
vec4 l9_21;
#if (sc_DepthBufferMode==1)
{
vec4 l9_22;
if (sc_ProjectionMatrixArray[sc_GetStereoViewIndex()][2].w!=0.0)
{
vec4 l9_23=l9_15;
l9_23.z=((log2(max(sc_Camera.clipPlanes.x,1.0+l9_15.w))*(2.0/log2(sc_Camera.clipPlanes.y+1.0)))-1.0)*l9_15.w;
l9_22=l9_23;
}
else
{
l9_22=l9_15;
}
l9_21=l9_22;
}
#else
{
l9_21=l9_15;
}
#endif
vec4 l9_24;
#if (sc_TAAEnabled)
{
vec2 l9_25=l9_21.xy+(sc_TAAJitterOffset*l9_21.w);
l9_24=vec4(l9_25.x,l9_25.y,l9_21.z,l9_21.w);
}
#else
{
l9_24=l9_21;
}
#endif
sc_SetClipPosition(l9_24);
#if (sc_Voxelization)
{
sc_Vertex_t l9_26=sc_Vertex_t(l9_0.position,l9_0.normal,l9_0.tangent,l9_5,l9_0.texture1);
sc_BlendVertex(l9_26);
sc_SkinVertex(l9_26);
int l9_27=sc_GetLocalInstanceIDInternal(sc_FallbackInstanceID);
int l9_28=int(voxelization_params_0.w);
vec4 l9_29=createVoxelOrthoMatrix(voxelization_params_frustum_lrbt.x,voxelization_params_frustum_lrbt.y,voxelization_params_frustum_lrbt.z,voxelization_params_frustum_lrbt.w,voxelization_params_frustum_nf.x,voxelization_params_frustum_nf.y)*vec4(((sc_ModelMatrixVoxelization*l9_26.position).xyz+vec3(float(l9_27%l9_28)*voxelization_params_0.y,float(l9_27/l9_28)*voxelization_params_0.y,(float(l9_27)*(voxelization_params_0.y/voxelization_params_0.z))+voxelization_params_frustum_nf.x))-voxelization_params_camera_pos,1.0);
l9_29.w=1.0;
varScreenPos=l9_29;
sc_SetClipPosition(l9_29*1.0);
}
#else
{
#if (sc_OutputBounds)
{
sc_Vertex_t l9_30=sc_Vertex_t(l9_0.position,l9_0.normal,l9_0.tangent,l9_5,l9_0.texture1);
sc_BlendVertex(l9_30);
sc_SkinVertex(l9_30);
vec2 l9_31=((l9_30.position.xy/vec2(l9_30.position.w))*0.5)+vec2(0.5);
varTex01=vec4(l9_31.x,l9_31.y,varTex01.z,varTex01.w);
vec4 l9_32=sc_ModelMatrixVoxelization*l9_30.position;
vec3 l9_33=l9_32.xyz-voxelization_params_camera_pos;
varPosAndMotion=vec4(l9_33.x,l9_33.y,l9_33.z,varPosAndMotion.w);
vec3 l9_34=normalize(l9_30.normal);
varNormalAndMotion=vec4(l9_34.x,l9_34.y,l9_34.z,varNormalAndMotion.w);
vec4 l9_35=createVoxelOrthoMatrix(voxelization_params_frustum_lrbt.x,voxelization_params_frustum_lrbt.y,voxelization_params_frustum_lrbt.z,voxelization_params_frustum_lrbt.w,voxelization_params_frustum_nf.x,voxelization_params_frustum_nf.y)*vec4(l9_33.x,l9_33.y,l9_33.z,l9_32.w);
vec4 l9_36=vec4(l9_35.x,l9_35.y,l9_35.z,vec4(0.0).w);
l9_36.w=1.0;
varScreenPos=l9_36;
sc_SetClipPosition(l9_36*1.0);
}
#endif
}
#endif
vec4 l9_37=varPosAndMotion;
#if (sc_MotionVectorsPass)
{
vec4 l9_38=vec4(l9_37.xyz,1.0);
#if (sc_MotionVectorsPass)
{
vec4 l9_39=sc_ViewProjectionMatrixArray[sc_GetStereoViewIndex()]*l9_38;
vec4 l9_40=sc_PrevFrameViewProjectionMatrixArray[sc_GetStereoViewIndex()]*vec4(((sc_PrevFrameModelMatrix*sc_ModelMatrixInverse)*l9_38).xyz,1.0);
vec2 l9_41=((l9_39.xy/vec2(l9_39.w)).xy-(l9_40.xy/vec2(l9_40.w)).xy)*0.5;
varPosAndMotion.w=l9_41.x;
varNormalAndMotion.w=l9_41.y;
}
#endif
}
#endif
}
#elif defined FRAGMENT_SHADER // #if defined VERTEX_SHADER
#ifndef sc_FramebufferFetch
#define sc_FramebufferFetch 0
#elif sc_FramebufferFetch==1
#undef sc_FramebufferFetch
#define sc_FramebufferFetch 1
#endif
#if defined(GL_ES)||__VERSION__>=420
#if sc_FragDataCount>=1
#define sc_DeclareFragData0(StorageQualifier) layout(location=0) StorageQualifier sc_FragmentPrecision vec4 sc_FragData0
#endif
#if sc_FragDataCount>=2
#define sc_DeclareFragData1(StorageQualifier) layout(location=1) StorageQualifier sc_FragmentPrecision vec4 sc_FragData1
#endif
#if sc_FragDataCount>=3
#define sc_DeclareFragData2(StorageQualifier) layout(location=2) StorageQualifier sc_FragmentPrecision vec4 sc_FragData2
#endif
#if sc_FragDataCount>=4
#define sc_DeclareFragData3(StorageQualifier) layout(location=3) StorageQualifier sc_FragmentPrecision vec4 sc_FragData3
#endif
#ifndef sc_DeclareFragData0
#define sc_DeclareFragData0(_) const vec4 sc_FragData0=vec4(0.0)
#endif
#ifndef sc_DeclareFragData1
#define sc_DeclareFragData1(_) const vec4 sc_FragData1=vec4(0.0)
#endif
#ifndef sc_DeclareFragData2
#define sc_DeclareFragData2(_) const vec4 sc_FragData2=vec4(0.0)
#endif
#ifndef sc_DeclareFragData3
#define sc_DeclareFragData3(_) const vec4 sc_FragData3=vec4(0.0)
#endif
#if sc_FramebufferFetch
#ifdef GL_EXT_shader_framebuffer_fetch
sc_DeclareFragData0(inout);
sc_DeclareFragData1(inout);
sc_DeclareFragData2(inout);
sc_DeclareFragData3(inout);
mediump mat4 getFragData() { return mat4(sc_FragData0,sc_FragData1,sc_FragData2,sc_FragData3); }
#define gl_LastFragData (getFragData())
#elif defined(GL_ARM_shader_framebuffer_fetch)
sc_DeclareFragData0(out);
sc_DeclareFragData1(out);
sc_DeclareFragData2(out);
sc_DeclareFragData3(out);
mediump mat4 getFragData() { return mat4(gl_LastFragColorARM,vec4(0.0),vec4(0.0),vec4(0.0)); }
#define gl_LastFragData (getFragData())
#endif
#else
sc_DeclareFragData0(out);
sc_DeclareFragData1(out);
sc_DeclareFragData2(out);
sc_DeclareFragData3(out);
mediump mat4 getFragData() { return mat4(vec4(0.0),vec4(0.0),vec4(0.0),vec4(0.0)); }
#define gl_LastFragData (getFragData())
#endif
#else
#ifdef FRAGMENT_SHADER
#define sc_FragData0 gl_FragData[0]
#define sc_FragData1 gl_FragData[1]
#define sc_FragData2 gl_FragData[2]
#define sc_FragData3 gl_FragData[3]
#endif
mat4 getFragData() { return mat4(vec4(0.0),vec4(0.0),vec4(0.0),vec4(0.0)); }
#define gl_LastFragData (getFragData())
#if sc_FramebufferFetch
#error Framebuffer fetch is requested but not supported by this device.
#endif
#endif
struct SurfaceProperties
{
vec3 albedo;
float opacity;
vec3 normal;
vec3 positionWS;
vec3 viewDirWS;
float metallic;
float roughness;
vec3 emissive;
vec3 ao;
vec3 specularAo;
vec3 bakedShadows;
vec3 specColor;
};
struct LightingComponents
{
vec3 directDiffuse;
vec3 directSpecular;
vec3 indirectDiffuse;
vec3 indirectSpecular;
vec3 emitted;
vec3 transmitted;
};
struct LightProperties
{
vec3 direction;
vec3 color;
float attenuation;
};
struct sc_SphericalGaussianLight_t
{
vec3 color;
float sharpness;
vec3 axis;
};
#ifndef sc_StereoRenderingMode
#define sc_StereoRenderingMode 0
#endif
#ifndef sc_EnvmapDiffuseHasSwappedViews
#define sc_EnvmapDiffuseHasSwappedViews 0
#elif sc_EnvmapDiffuseHasSwappedViews==1
#undef sc_EnvmapDiffuseHasSwappedViews
#define sc_EnvmapDiffuseHasSwappedViews 1
#endif
#ifndef sc_EnvmapDiffuseLayout
#define sc_EnvmapDiffuseLayout 0
#endif
#ifndef sc_EnvmapSpecularHasSwappedViews
#define sc_EnvmapSpecularHasSwappedViews 0
#elif sc_EnvmapSpecularHasSwappedViews==1
#undef sc_EnvmapSpecularHasSwappedViews
#define sc_EnvmapSpecularHasSwappedViews 1
#endif
#ifndef sc_EnvmapSpecularLayout
#define sc_EnvmapSpecularLayout 0
#endif
#ifndef sc_ScreenTextureHasSwappedViews
#define sc_ScreenTextureHasSwappedViews 0
#elif sc_ScreenTextureHasSwappedViews==1
#undef sc_ScreenTextureHasSwappedViews
#define sc_ScreenTextureHasSwappedViews 1
#endif
#ifndef sc_ScreenTextureLayout
#define sc_ScreenTextureLayout 0
#endif
#ifndef sc_NumStereoViews
#define sc_NumStereoViews 1
#endif
#ifndef sc_BlendMode_Normal
#define sc_BlendMode_Normal 0
#elif sc_BlendMode_Normal==1
#undef sc_BlendMode_Normal
#define sc_BlendMode_Normal 1
#endif
#ifndef sc_BlendMode_AlphaToCoverage
#define sc_BlendMode_AlphaToCoverage 0
#elif sc_BlendMode_AlphaToCoverage==1
#undef sc_BlendMode_AlphaToCoverage
#define sc_BlendMode_AlphaToCoverage 1
#endif
#ifndef sc_BlendMode_PremultipliedAlphaHardware
#define sc_BlendMode_PremultipliedAlphaHardware 0
#elif sc_BlendMode_PremultipliedAlphaHardware==1
#undef sc_BlendMode_PremultipliedAlphaHardware
#define sc_BlendMode_PremultipliedAlphaHardware 1
#endif
#ifndef sc_BlendMode_PremultipliedAlphaAuto
#define sc_BlendMode_PremultipliedAlphaAuto 0
#elif sc_BlendMode_PremultipliedAlphaAuto==1
#undef sc_BlendMode_PremultipliedAlphaAuto
#define sc_BlendMode_PremultipliedAlphaAuto 1
#endif
#ifndef sc_BlendMode_PremultipliedAlpha
#define sc_BlendMode_PremultipliedAlpha 0
#elif sc_BlendMode_PremultipliedAlpha==1
#undef sc_BlendMode_PremultipliedAlpha
#define sc_BlendMode_PremultipliedAlpha 1
#endif
#ifndef sc_BlendMode_AddWithAlphaFactor
#define sc_BlendMode_AddWithAlphaFactor 0
#elif sc_BlendMode_AddWithAlphaFactor==1
#undef sc_BlendMode_AddWithAlphaFactor
#define sc_BlendMode_AddWithAlphaFactor 1
#endif
#ifndef sc_BlendMode_AlphaTest
#define sc_BlendMode_AlphaTest 0
#elif sc_BlendMode_AlphaTest==1
#undef sc_BlendMode_AlphaTest
#define sc_BlendMode_AlphaTest 1
#endif
#ifndef sc_BlendMode_Multiply
#define sc_BlendMode_Multiply 0
#elif sc_BlendMode_Multiply==1
#undef sc_BlendMode_Multiply
#define sc_BlendMode_Multiply 1
#endif
#ifndef sc_BlendMode_MultiplyOriginal
#define sc_BlendMode_MultiplyOriginal 0
#elif sc_BlendMode_MultiplyOriginal==1
#undef sc_BlendMode_MultiplyOriginal
#define sc_BlendMode_MultiplyOriginal 1
#endif
#ifndef sc_BlendMode_ColoredGlass
#define sc_BlendMode_ColoredGlass 0
#elif sc_BlendMode_ColoredGlass==1
#undef sc_BlendMode_ColoredGlass
#define sc_BlendMode_ColoredGlass 1
#endif
#ifndef sc_BlendMode_Add
#define sc_BlendMode_Add 0
#elif sc_BlendMode_Add==1
#undef sc_BlendMode_Add
#define sc_BlendMode_Add 1
#endif
#ifndef sc_BlendMode_Screen
#define sc_BlendMode_Screen 0
#elif sc_BlendMode_Screen==1
#undef sc_BlendMode_Screen
#define sc_BlendMode_Screen 1
#endif
#ifndef sc_BlendMode_Min
#define sc_BlendMode_Min 0
#elif sc_BlendMode_Min==1
#undef sc_BlendMode_Min
#define sc_BlendMode_Min 1
#endif
#ifndef sc_BlendMode_Max
#define sc_BlendMode_Max 0
#elif sc_BlendMode_Max==1
#undef sc_BlendMode_Max
#define sc_BlendMode_Max 1
#endif
#ifndef sc_ProjectiveShadowsReceiver
#define sc_ProjectiveShadowsReceiver 0
#elif sc_ProjectiveShadowsReceiver==1
#undef sc_ProjectiveShadowsReceiver
#define sc_ProjectiveShadowsReceiver 1
#endif
#ifndef sc_MotionVectorsPass
#define sc_MotionVectorsPass 0
#elif sc_MotionVectorsPass==1
#undef sc_MotionVectorsPass
#define sc_MotionVectorsPass 1
#endif
#ifndef sc_StereoRendering_IsClipDistanceEnabled
#define sc_StereoRendering_IsClipDistanceEnabled 0
#endif
#ifndef sc_ShaderCacheConstant
#define sc_ShaderCacheConstant 0
#endif
#ifndef sc_FramebufferFetch
#define sc_FramebufferFetch 0
#elif sc_FramebufferFetch==1
#undef sc_FramebufferFetch
#define sc_FramebufferFetch 1
#endif
#ifndef sc_SSAOEnabled
#define sc_SSAOEnabled 0
#elif sc_SSAOEnabled==1
#undef sc_SSAOEnabled
#define sc_SSAOEnabled 1
#endif
#ifndef SC_DEVICE_CLASS
#define SC_DEVICE_CLASS -1
#endif
#ifndef intensityTextureHasSwappedViews
#define intensityTextureHasSwappedViews 0
#elif intensityTextureHasSwappedViews==1
#undef intensityTextureHasSwappedViews
#define intensityTextureHasSwappedViews 1
#endif
#ifndef intensityTextureLayout
#define intensityTextureLayout 0
#endif
#ifndef BLEND_MODE_REALISTIC
#define BLEND_MODE_REALISTIC 0
#elif BLEND_MODE_REALISTIC==1
#undef BLEND_MODE_REALISTIC
#define BLEND_MODE_REALISTIC 1
#endif
#ifndef BLEND_MODE_FORGRAY
#define BLEND_MODE_FORGRAY 0
#elif BLEND_MODE_FORGRAY==1
#undef BLEND_MODE_FORGRAY
#define BLEND_MODE_FORGRAY 1
#endif
#ifndef BLEND_MODE_NOTBRIGHT
#define BLEND_MODE_NOTBRIGHT 0
#elif BLEND_MODE_NOTBRIGHT==1
#undef BLEND_MODE_NOTBRIGHT
#define BLEND_MODE_NOTBRIGHT 1
#endif
#ifndef BLEND_MODE_DIVISION
#define BLEND_MODE_DIVISION 0
#elif BLEND_MODE_DIVISION==1
#undef BLEND_MODE_DIVISION
#define BLEND_MODE_DIVISION 1
#endif
#ifndef BLEND_MODE_BRIGHT
#define BLEND_MODE_BRIGHT 0
#elif BLEND_MODE_BRIGHT==1
#undef BLEND_MODE_BRIGHT
#define BLEND_MODE_BRIGHT 1
#endif
#ifndef BLEND_MODE_INTENSE
#define BLEND_MODE_INTENSE 0
#elif BLEND_MODE_INTENSE==1
#undef BLEND_MODE_INTENSE
#define BLEND_MODE_INTENSE 1
#endif
#ifndef SC_USE_UV_TRANSFORM_intensityTexture
#define SC_USE_UV_TRANSFORM_intensityTexture 0
#elif SC_USE_UV_TRANSFORM_intensityTexture==1
#undef SC_USE_UV_TRANSFORM_intensityTexture
#define SC_USE_UV_TRANSFORM_intensityTexture 1
#endif
#ifndef SC_SOFTWARE_WRAP_MODE_U_intensityTexture
#define SC_SOFTWARE_WRAP_MODE_U_intensityTexture -1
#endif
#ifndef SC_SOFTWARE_WRAP_MODE_V_intensityTexture
#define SC_SOFTWARE_WRAP_MODE_V_intensityTexture -1
#endif
#ifndef SC_USE_UV_MIN_MAX_intensityTexture
#define SC_USE_UV_MIN_MAX_intensityTexture 0
#elif SC_USE_UV_MIN_MAX_intensityTexture==1
#undef SC_USE_UV_MIN_MAX_intensityTexture
#define SC_USE_UV_MIN_MAX_intensityTexture 1
#endif
#ifndef SC_USE_CLAMP_TO_BORDER_intensityTexture
#define SC_USE_CLAMP_TO_BORDER_intensityTexture 0
#elif SC_USE_CLAMP_TO_BORDER_intensityTexture==1
#undef SC_USE_CLAMP_TO_BORDER_intensityTexture
#define SC_USE_CLAMP_TO_BORDER_intensityTexture 1
#endif
#ifndef BLEND_MODE_LIGHTEN
#define BLEND_MODE_LIGHTEN 0
#elif BLEND_MODE_LIGHTEN==1
#undef BLEND_MODE_LIGHTEN
#define BLEND_MODE_LIGHTEN 1
#endif
#ifndef BLEND_MODE_DARKEN
#define BLEND_MODE_DARKEN 0
#elif BLEND_MODE_DARKEN==1
#undef BLEND_MODE_DARKEN
#define BLEND_MODE_DARKEN 1
#endif
#ifndef BLEND_MODE_DIVIDE
#define BLEND_MODE_DIVIDE 0
#elif BLEND_MODE_DIVIDE==1
#undef BLEND_MODE_DIVIDE
#define BLEND_MODE_DIVIDE 1
#endif
#ifndef BLEND_MODE_AVERAGE
#define BLEND_MODE_AVERAGE 0
#elif BLEND_MODE_AVERAGE==1
#undef BLEND_MODE_AVERAGE
#define BLEND_MODE_AVERAGE 1
#endif
#ifndef BLEND_MODE_SUBTRACT
#define BLEND_MODE_SUBTRACT 0
#elif BLEND_MODE_SUBTRACT==1
#undef BLEND_MODE_SUBTRACT
#define BLEND_MODE_SUBTRACT 1
#endif
#ifndef BLEND_MODE_DIFFERENCE
#define BLEND_MODE_DIFFERENCE 0
#elif BLEND_MODE_DIFFERENCE==1
#undef BLEND_MODE_DIFFERENCE
#define BLEND_MODE_DIFFERENCE 1
#endif
#ifndef BLEND_MODE_NEGATION
#define BLEND_MODE_NEGATION 0
#elif BLEND_MODE_NEGATION==1
#undef BLEND_MODE_NEGATION
#define BLEND_MODE_NEGATION 1
#endif
#ifndef BLEND_MODE_EXCLUSION
#define BLEND_MODE_EXCLUSION 0
#elif BLEND_MODE_EXCLUSION==1
#undef BLEND_MODE_EXCLUSION
#define BLEND_MODE_EXCLUSION 1
#endif
#ifndef BLEND_MODE_OVERLAY
#define BLEND_MODE_OVERLAY 0
#elif BLEND_MODE_OVERLAY==1
#undef BLEND_MODE_OVERLAY
#define BLEND_MODE_OVERLAY 1
#endif
#ifndef BLEND_MODE_SOFT_LIGHT
#define BLEND_MODE_SOFT_LIGHT 0
#elif BLEND_MODE_SOFT_LIGHT==1
#undef BLEND_MODE_SOFT_LIGHT
#define BLEND_MODE_SOFT_LIGHT 1
#endif
#ifndef BLEND_MODE_HARD_LIGHT
#define BLEND_MODE_HARD_LIGHT 0
#elif BLEND_MODE_HARD_LIGHT==1
#undef BLEND_MODE_HARD_LIGHT
#define BLEND_MODE_HARD_LIGHT 1
#endif
#ifndef BLEND_MODE_COLOR_DODGE
#define BLEND_MODE_COLOR_DODGE 0
#elif BLEND_MODE_COLOR_DODGE==1
#undef BLEND_MODE_COLOR_DODGE
#define BLEND_MODE_COLOR_DODGE 1
#endif
#ifndef BLEND_MODE_COLOR_BURN
#define BLEND_MODE_COLOR_BURN 0
#elif BLEND_MODE_COLOR_BURN==1
#undef BLEND_MODE_COLOR_BURN
#define BLEND_MODE_COLOR_BURN 1
#endif
#ifndef BLEND_MODE_LINEAR_LIGHT
#define BLEND_MODE_LINEAR_LIGHT 0
#elif BLEND_MODE_LINEAR_LIGHT==1
#undef BLEND_MODE_LINEAR_LIGHT
#define BLEND_MODE_LINEAR_LIGHT 1
#endif
#ifndef BLEND_MODE_VIVID_LIGHT
#define BLEND_MODE_VIVID_LIGHT 0
#elif BLEND_MODE_VIVID_LIGHT==1
#undef BLEND_MODE_VIVID_LIGHT
#define BLEND_MODE_VIVID_LIGHT 1
#endif
#ifndef BLEND_MODE_PIN_LIGHT
#define BLEND_MODE_PIN_LIGHT 0
#elif BLEND_MODE_PIN_LIGHT==1
#undef BLEND_MODE_PIN_LIGHT
#define BLEND_MODE_PIN_LIGHT 1
#endif
#ifndef BLEND_MODE_HARD_MIX
#define BLEND_MODE_HARD_MIX 0
#elif BLEND_MODE_HARD_MIX==1
#undef BLEND_MODE_HARD_MIX
#define BLEND_MODE_HARD_MIX 1
#endif
#ifndef BLEND_MODE_HARD_REFLECT
#define BLEND_MODE_HARD_REFLECT 0
#elif BLEND_MODE_HARD_REFLECT==1
#undef BLEND_MODE_HARD_REFLECT
#define BLEND_MODE_HARD_REFLECT 1
#endif
#ifndef BLEND_MODE_HARD_GLOW
#define BLEND_MODE_HARD_GLOW 0
#elif BLEND_MODE_HARD_GLOW==1
#undef BLEND_MODE_HARD_GLOW
#define BLEND_MODE_HARD_GLOW 1
#endif
#ifndef BLEND_MODE_HARD_PHOENIX
#define BLEND_MODE_HARD_PHOENIX 0
#elif BLEND_MODE_HARD_PHOENIX==1
#undef BLEND_MODE_HARD_PHOENIX
#define BLEND_MODE_HARD_PHOENIX 1
#endif
#ifndef BLEND_MODE_HUE
#define BLEND_MODE_HUE 0
#elif BLEND_MODE_HUE==1
#undef BLEND_MODE_HUE
#define BLEND_MODE_HUE 1
#endif
#ifndef BLEND_MODE_SATURATION
#define BLEND_MODE_SATURATION 0
#elif BLEND_MODE_SATURATION==1
#undef BLEND_MODE_SATURATION
#define BLEND_MODE_SATURATION 1
#endif
#ifndef BLEND_MODE_COLOR
#define BLEND_MODE_COLOR 0
#elif BLEND_MODE_COLOR==1
#undef BLEND_MODE_COLOR
#define BLEND_MODE_COLOR 1
#endif
#ifndef BLEND_MODE_LUMINOSITY
#define BLEND_MODE_LUMINOSITY 0
#elif BLEND_MODE_LUMINOSITY==1
#undef BLEND_MODE_LUMINOSITY
#define BLEND_MODE_LUMINOSITY 1
#endif
#ifndef sc_SkinBonesCount
#define sc_SkinBonesCount 0
#endif
#ifndef UseViewSpaceDepthVariant
#define UseViewSpaceDepthVariant 1
#elif UseViewSpaceDepthVariant==1
#undef UseViewSpaceDepthVariant
#define UseViewSpaceDepthVariant 1
#endif
#ifndef sc_OITDepthGatherPass
#define sc_OITDepthGatherPass 0
#elif sc_OITDepthGatherPass==1
#undef sc_OITDepthGatherPass
#define sc_OITDepthGatherPass 1
#endif
#ifndef sc_OITCompositingPass
#define sc_OITCompositingPass 0
#elif sc_OITCompositingPass==1
#undef sc_OITCompositingPass
#define sc_OITCompositingPass 1
#endif
#ifndef sc_OITDepthBoundsPass
#define sc_OITDepthBoundsPass 0
#elif sc_OITDepthBoundsPass==1
#undef sc_OITDepthBoundsPass
#define sc_OITDepthBoundsPass 1
#endif
#ifndef sc_OITMaxLayers4Plus1
#define sc_OITMaxLayers4Plus1 0
#elif sc_OITMaxLayers4Plus1==1
#undef sc_OITMaxLayers4Plus1
#define sc_OITMaxLayers4Plus1 1
#endif
#ifndef sc_OITMaxLayersVisualizeLayerCount
#define sc_OITMaxLayersVisualizeLayerCount 0
#elif sc_OITMaxLayersVisualizeLayerCount==1
#undef sc_OITMaxLayersVisualizeLayerCount
#define sc_OITMaxLayersVisualizeLayerCount 1
#endif
#ifndef sc_OITMaxLayers8
#define sc_OITMaxLayers8 0
#elif sc_OITMaxLayers8==1
#undef sc_OITMaxLayers8
#define sc_OITMaxLayers8 1
#endif
#ifndef sc_OITFrontLayerPass
#define sc_OITFrontLayerPass 0
#elif sc_OITFrontLayerPass==1
#undef sc_OITFrontLayerPass
#define sc_OITFrontLayerPass 1
#endif
#ifndef sc_OITDepthPrepass
#define sc_OITDepthPrepass 0
#elif sc_OITDepthPrepass==1
#undef sc_OITDepthPrepass
#define sc_OITDepthPrepass 1
#endif
#ifndef ENABLE_STIPPLE_PATTERN_TEST
#define ENABLE_STIPPLE_PATTERN_TEST 0
#elif ENABLE_STIPPLE_PATTERN_TEST==1
#undef ENABLE_STIPPLE_PATTERN_TEST
#define ENABLE_STIPPLE_PATTERN_TEST 1
#endif
#ifndef sc_ProjectiveShadowsCaster
#define sc_ProjectiveShadowsCaster 0
#elif sc_ProjectiveShadowsCaster==1
#undef sc_ProjectiveShadowsCaster
#define sc_ProjectiveShadowsCaster 1
#endif
#ifndef sc_RenderAlphaToColor
#define sc_RenderAlphaToColor 0
#elif sc_RenderAlphaToColor==1
#undef sc_RenderAlphaToColor
#define sc_RenderAlphaToColor 1
#endif
#ifndef sc_BlendMode_Custom
#define sc_BlendMode_Custom 0
#elif sc_BlendMode_Custom==1
#undef sc_BlendMode_Custom
#define sc_BlendMode_Custom 1
#endif
#ifndef sc_Voxelization
#define sc_Voxelization 0
#elif sc_Voxelization==1
#undef sc_Voxelization
#define sc_Voxelization 1
#endif
#ifndef sc_OutputBounds
#define sc_OutputBounds 0
#elif sc_OutputBounds==1
#undef sc_OutputBounds
#define sc_OutputBounds 1
#endif
#ifndef sc_EnvLightMode
#define sc_EnvLightMode 0
#endif
#ifndef sc_AmbientLightMode_EnvironmentMap
#define sc_AmbientLightMode_EnvironmentMap 0
#endif
#ifndef sc_AmbientLightMode_FromCamera
#define sc_AmbientLightMode_FromCamera 0
#endif
#ifndef sc_LightEstimation
#define sc_LightEstimation 0
#elif sc_LightEstimation==1
#undef sc_LightEstimation
#define sc_LightEstimation 1
#endif
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
vec3 ambientLight;
};
#ifndef sc_LightEstimationSGCount
#define sc_LightEstimationSGCount 0
#endif
#ifndef sc_HasDiffuseEnvmap
#define sc_HasDiffuseEnvmap 0
#elif sc_HasDiffuseEnvmap==1
#undef sc_HasDiffuseEnvmap
#define sc_HasDiffuseEnvmap 1
#endif
#ifndef sc_AmbientLightMode_SphericalHarmonics
#define sc_AmbientLightMode_SphericalHarmonics 0
#endif
#ifndef sc_AmbientLightsCount
#define sc_AmbientLightsCount 0
#endif
#ifndef sc_AmbientLightMode0
#define sc_AmbientLightMode0 0
#endif
#ifndef sc_AmbientLightMode_Constant
#define sc_AmbientLightMode_Constant 0
#endif
struct sc_AmbientLight_t
{
vec3 color;
float intensity;
};
#ifndef sc_AmbientLightMode1
#define sc_AmbientLightMode1 0
#endif
#ifndef sc_AmbientLightMode2
#define sc_AmbientLightMode2 0
#endif
#ifndef sc_DirectionalLightsCount
#define sc_DirectionalLightsCount 0
#endif
struct sc_DirectionalLight_t
{
vec3 direction;
vec4 color;
};
#ifndef sc_PointLightsCount
#define sc_PointLightsCount 0
#endif
struct sc_PointLight_t
{
bool falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
vec3 direction;
vec3 position;
vec4 color;
};
#ifndef sc_IsEditor
#define sc_IsEditor 0
#elif sc_IsEditor==1
#undef sc_IsEditor
#define sc_IsEditor 1
#endif
#ifndef sc_DepthOnly
#define sc_DepthOnly 0
#elif sc_DepthOnly==1
#undef sc_DepthOnly
#define sc_DepthOnly 1
#endif
struct sc_Camera_t
{
vec3 position;
float aspect;
vec2 clipPlanes;
};
uniform vec4 sc_CurrentRenderTargetDims;
uniform mat4 sc_ProjectionMatrixArray[sc_NumStereoViews];
uniform float sc_ShadowDensity;
uniform vec4 sc_ShadowColor;
uniform vec4 sc_UniformConstants;
uniform mat4 sc_ViewProjectionMatrixArray[sc_NumStereoViews];
uniform float correctedIntensity;
uniform mat3 intensityTextureTransform;
uniform vec4 intensityTextureUvMinMax;
uniform vec4 intensityTextureBorderColor;
uniform float alphaTestThreshold;
uniform sc_LightEstimationData_t sc_LightEstimationData;
uniform vec3 sc_EnvmapRotation;
uniform vec4 sc_EnvmapSpecularSize;
uniform vec4 sc_EnvmapDiffuseSize;
uniform float sc_EnvmapExposure;
uniform vec3 sc_Sh[9];
uniform float sc_ShIntensity;
uniform sc_AmbientLight_t sc_AmbientLights[(sc_AmbientLightsCount+1)];
uniform sc_DirectionalLight_t sc_DirectionalLights[(sc_DirectionalLightsCount+1)];
uniform sc_PointLight_t sc_PointLights[(sc_PointLightsCount+1)];
uniform vec4 frontColor;
uniform vec4 sideColor;
uniform sc_Camera_t sc_Camera;
uniform float Port_Opacity_N003;
uniform vec3 Port_Emissive_N003;
uniform float Port_Metallic_N003;
uniform float Port_Roughness_N003;
uniform vec3 Port_AO_N003;
uniform vec3 Port_SpecularAO_N003;
uniform float Port_Input1_N014;
uniform int PreviewEnabled;
uniform sampler2D sc_SSAOTexture;
uniform sampler2D sc_ShadowTexture;
uniform sampler2D sc_EnvmapSpecular;
uniform sampler2D sc_EnvmapDiffuse;
uniform sampler2D sc_ScreenTexture;
uniform sampler2D intensityTexture;
uniform sampler2D sc_OITFrontDepthTexture;
uniform sampler2D sc_OITDepthHigh0;
uniform sampler2D sc_OITDepthLow0;
uniform sampler2D sc_OITAlpha0;
uniform sampler2D sc_OITDepthHigh1;
uniform sampler2D sc_OITDepthLow1;
uniform sampler2D sc_OITAlpha1;
uniform sampler2D sc_OITFilteredDepthBoundsTexture;
varying float varStereoViewID;
varying vec2 varShadowTex;
varying vec4 varPosAndMotion;
varying vec4 varNormalAndMotion;
varying float varClipDistance;
varying vec4 varScreenPos;
varying float varViewSpaceDepth;
varying vec4 PreviewVertexColor;
varying float PreviewVertexSaved;
varying vec4 varTex01;
varying vec4 varTangent;
varying vec2 varScreenTexturePos;
varying vec4 varColor;
vec3 ssSRGB_to_Linear(vec3 value)
{
vec3 l9_0;
#if (SC_DEVICE_CLASS>=2)
{
l9_0=vec3(pow(value.x,2.2),pow(value.y,2.2),pow(value.z,2.2));
}
#else
{
l9_0=value*value;
}
#endif
return l9_0;
}
int sc_GetStereoViewIndex()
{
int l9_0;
#if (sc_StereoRenderingMode==0)
{
l9_0=0;
}
#else
{
l9_0=int(varStereoViewID);
}
#endif
return l9_0;
}
vec3 evaluateSSAO(vec3 positionWS)
{
#if (sc_SSAOEnabled)
{
vec4 l9_0=sc_ViewProjectionMatrixArray[sc_GetStereoViewIndex()]*vec4(positionWS,1.0);
return vec3(texture2D(sc_SSAOTexture,((l9_0.xyz/vec3(l9_0.w)).xy*0.5)+vec2(0.5)).x);
}
#else
{
return vec3(1.0);
}
#endif
}
vec3 fresnelSchlickSub(float cosTheta,vec3 F0,vec3 fresnelMax)
{
float l9_0=1.0-cosTheta;
float l9_1=l9_0*l9_0;
return F0+((fresnelMax-F0)*((l9_1*l9_1)*l9_0));
}
float Dggx(float NdotH,float roughness)
{
float l9_0=roughness*roughness;
float l9_1=l9_0*l9_0;
float l9_2=((NdotH*NdotH)*(l9_1-1.0))+1.0;
return l9_1/((l9_2*l9_2)+9.9999999e-09);
}
vec3 calculateDirectSpecular(SurfaceProperties surfaceProperties,vec3 L,vec3 V)
{
float l9_0=surfaceProperties.roughness;
float l9_1=max(l9_0,0.029999999);
vec3 l9_2=surfaceProperties.specColor;
vec3 l9_3=surfaceProperties.normal;
vec3 l9_4=L;
vec3 l9_5=V;
vec3 l9_6=normalize(l9_4+l9_5);
vec3 l9_7=L;
float l9_8=clamp(dot(l9_3,l9_7),0.0,1.0);
vec3 l9_9=V;
float l9_10=clamp(dot(l9_3,l9_6),0.0,1.0);
vec3 l9_11=V;
float l9_12=clamp(dot(l9_11,l9_6),0.0,1.0);
#if (SC_DEVICE_CLASS>=2)
{
float l9_13=l9_1+1.0;
float l9_14=(l9_13*l9_13)*0.125;
float l9_15=1.0-l9_14;
return fresnelSchlickSub(l9_12,l9_2,vec3(1.0))*(((Dggx(l9_10,l9_1)*(1.0/(((l9_8*l9_15)+l9_14)*((clamp(dot(l9_3,l9_9),0.0,1.0)*l9_15)+l9_14))))*0.25)*l9_8);
}
#else
{
float l9_16=exp2(11.0-(10.0*l9_1));
return ((fresnelSchlickSub(l9_12,l9_2,vec3(1.0))*((l9_16*0.125)+0.25))*pow(l9_10,l9_16))*l9_8;
}
#endif
}
LightingComponents accumulateLight(LightingComponents lighting,LightProperties light,SurfaceProperties surfaceProperties,vec3 V)
{
lighting.directDiffuse+=((vec3(clamp(dot(surfaceProperties.normal,light.direction),0.0,1.0))*light.color)*light.attenuation);
lighting.directSpecular+=((calculateDirectSpecular(surfaceProperties,light.direction,V)*light.color)*light.attenuation);
return lighting;
}
float computeDistanceAttenuation(float distanceToLight,float falloffEndDistance)
{
float l9_0=distanceToLight;
float l9_1=distanceToLight;
float l9_2=l9_0*l9_1;
if (falloffEndDistance==0.0)
{
return 1.0/l9_2;
}
return max(min(1.0-((l9_2*l9_2)/pow(falloffEndDistance,4.0)),1.0),0.0)/l9_2;
}
vec2 calcPanoramicTexCoordsFromDir(vec3 reflDir,float rotationDegrees)
{
float l9_0=-reflDir.z;
vec2 l9_1=vec2((((reflDir.x<0.0) ? (-1.0) : 1.0)*acos(clamp(l9_0/length(vec2(reflDir.x,l9_0)),-1.0,1.0)))-1.5707964,acos(reflDir.y))/vec2(6.2831855,3.1415927);
float l9_2=l9_1.x+(rotationDegrees/360.0);
vec2 l9_3=vec2(l9_2,1.0-l9_1.y);
l9_3.x=fract((l9_2+floor(l9_2))+1.0);
return l9_3;
}
int sc_EnvmapSpecularGetStereoViewIndex()
{
int l9_0;
#if (sc_EnvmapSpecularHasSwappedViews)
{
l9_0=1-sc_GetStereoViewIndex();
}
#else
{
l9_0=sc_GetStereoViewIndex();
}
#endif
return l9_0;
}
vec3 sc_SamplingCoordsViewToGlobal(vec2 uv,int renderingLayout,int viewIndex)
{
vec3 l9_0;
if (renderingLayout==0)
{
l9_0=vec3(uv,0.0);
}
else
{
vec3 l9_1;
if (renderingLayout==1)
{
l9_1=vec3(uv.x,(uv.y*0.5)+(0.5-(float(viewIndex)*0.5)),0.0);
}
else
{
l9_1=vec3(uv,float(viewIndex));
}
l9_0=l9_1;
}
return l9_0;
}
vec2 calcSeamlessPanoramicUvsForSampling(vec2 uv,vec2 topMipRes,float lod)
{
#if (SC_DEVICE_CLASS>=2)
{
vec2 l9_0=max(vec2(1.0),topMipRes/vec2(exp2(lod)));
return ((uv*(l9_0-vec2(1.0)))/l9_0)+(vec2(0.5)/l9_0);
}
#else
{
return uv;
}
#endif
}
vec3 getSpecularDominantDir(vec3 N,vec3 R,float roughness)
{
#if (SC_DEVICE_CLASS>=2)
{
return normalize(mix(R,N,vec3((roughness*roughness)*roughness)));
}
#else
{
return R;
}
#endif
}
vec3 envBRDFApprox(SurfaceProperties surfaceProperties,float NdotV)
{
#if (SC_DEVICE_CLASS>=2)
{
vec4 l9_0=(vec4(-1.0,-0.0275,-0.57200003,0.022)*surfaceProperties.roughness)+vec4(1.0,0.0425,1.04,-0.039999999);
float l9_1=l9_0.x;
vec2 l9_2=(vec2(-1.04,1.04)*((min(l9_1*l9_1,exp2((-9.2799997)*NdotV))*l9_1)+l9_0.y))+l9_0.zw;
return max((surfaceProperties.specColor*l9_2.x)+vec3(l9_2.y),vec3(0.0));
}
#else
{
return fresnelSchlickSub(NdotV,surfaceProperties.specColor,max(vec3(1.0-surfaceProperties.roughness),surfaceProperties.specColor));
}
#endif
}
vec2 sc_SamplingCoordsGlobalToView(vec3 uvi,int renderingLayout,int viewIndex)
{
if (renderingLayout==1)
{
uvi.y=((2.0*uvi.y)+float(viewIndex))-1.0;
}
return uvi.xy;
}
vec2 sc_ScreenCoordsGlobalToView(vec2 uv)
{
vec2 l9_0;
#if (sc_StereoRenderingMode==1)
{
l9_0=sc_SamplingCoordsGlobalToView(vec3(uv,0.0),1,sc_GetStereoViewIndex());
}
#else
{
l9_0=uv;
}
#endif
return l9_0;
}
int sc_ScreenTextureGetStereoViewIndex()
{
int l9_0;
#if (sc_ScreenTextureHasSwappedViews)
{
l9_0=1-sc_GetStereoViewIndex();
}
#else
{
l9_0=sc_GetStereoViewIndex();
}
#endif
return l9_0;
}
vec4 sc_readFragData0_Platform()
{
return getFragData()[0];
}
vec4 sc_GetFramebufferColor()
{
vec4 l9_0;
#if (sc_FramebufferFetch)
{
l9_0=sc_readFragData0_Platform();
}
#else
{
l9_0=texture2D(sc_ScreenTexture,sc_SamplingCoordsViewToGlobal(sc_ScreenCoordsGlobalToView(gl_FragCoord.xy*sc_CurrentRenderTargetDims.zw),sc_ScreenTextureLayout,sc_ScreenTextureGetStereoViewIndex()).xy,0.0);
}
#endif
return l9_0;
}
float srgbToLinear(float x)
{
#if (SC_DEVICE_CLASS>=2)
{
return pow(x,2.2);
}
#else
{
return x*x;
}
#endif
}
float linearToSrgb(float x)
{
#if (SC_DEVICE_CLASS>=2)
{
return pow(x,0.45454547);
}
#else
{
return sqrt(x);
}
#endif
}
void sc_SoftwareWrapEarly(inout float uv,int softwareWrapMode)
{
if (softwareWrapMode==1)
{
uv=fract(uv);
}
else
{
if (softwareWrapMode==2)
{
float l9_0=fract(uv);
uv=mix(l9_0,1.0-l9_0,clamp(step(0.25,fract((uv-l9_0)*0.5)),0.0,1.0));
}
}
}
void sc_ClampUV(inout float value,float minValue,float maxValue,bool useClampToBorder,inout float clampToBorderFactor)
{
float l9_0=clamp(value,minValue,maxValue);
float l9_1=step(abs(value-l9_0),9.9999997e-06);
clampToBorderFactor*=(l9_1+((1.0-float(useClampToBorder))*(1.0-l9_1)));
value=l9_0;
}
void sc_SoftwareWrapLate(inout float uv,int softwareWrapMode,bool useClampToBorder,inout float clampToBorderFactor)
{
if ((softwareWrapMode==0)||(softwareWrapMode==3))
{
sc_ClampUV(uv,0.0,1.0,useClampToBorder,clampToBorderFactor);
}
}
float transformSingleColor(float original,float intMap,float target)
{
#if ((BLEND_MODE_REALISTIC||BLEND_MODE_FORGRAY)||BLEND_MODE_NOTBRIGHT)
{
return original/pow(1.0-target,intMap);
}
#else
{
#if (BLEND_MODE_DIVISION)
{
return original/(1.0-target);
}
#else
{
#if (BLEND_MODE_BRIGHT)
{
return original/pow(1.0-target,2.0-(2.0*original));
}
#endif
}
#endif
}
#endif
return 0.0;
}
vec3 RGBtoHCV(vec3 rgb)
{
vec4 l9_0;
if (rgb.y<rgb.z)
{
l9_0=vec4(rgb.zy,-1.0,0.66666669);
}
else
{
l9_0=vec4(rgb.yz,0.0,-0.33333334);
}
vec4 l9_1;
if (rgb.x<l9_0.x)
{
l9_1=vec4(l9_0.xyw,rgb.x);
}
else
{
l9_1=vec4(rgb.x,l9_0.yzx);
}
float l9_2=l9_1.x-min(l9_1.w,l9_1.y);
return vec3(abs(((l9_1.w-l9_1.y)/((6.0*l9_2)+1e-07))+l9_1.z),l9_2,l9_1.x);
}
vec3 RGBToHSL(vec3 rgb)
{
vec3 l9_0=RGBtoHCV(rgb);
float l9_1=l9_0.y;
float l9_2=l9_0.z-(l9_1*0.5);
return vec3(l9_0.x,l9_1/((1.0-abs((2.0*l9_2)-1.0))+1e-07),l9_2);
}
vec3 HUEtoRGB(float hue)
{
return clamp(vec3(abs((6.0*hue)-3.0)-1.0,2.0-abs((6.0*hue)-2.0),2.0-abs((6.0*hue)-4.0)),vec3(0.0),vec3(1.0));
}
vec3 HSLToRGB(vec3 hsl)
{
return ((HUEtoRGB(hsl.x)-vec3(0.5))*((1.0-abs((2.0*hsl.z)-1.0))*hsl.y))+vec3(hsl.z);
}
vec3 transformColor(float yValue,vec3 original,vec3 target,float weight,float intMap)
{
#if (BLEND_MODE_INTENSE)
{
return mix(original,HSLToRGB(vec3(target.x,target.y,RGBToHSL(original).z)),vec3(weight));
}
#else
{
return mix(original,clamp(vec3(transformSingleColor(yValue,intMap,target.x),transformSingleColor(yValue,intMap,target.y),transformSingleColor(yValue,intMap,target.z)),vec3(0.0),vec3(1.0)),vec3(weight));
}
#endif
}
vec3 definedBlend(vec3 a,vec3 b)
{
#if (BLEND_MODE_LIGHTEN)
{
return max(a,b);
}
#else
{
#if (BLEND_MODE_DARKEN)
{
return min(a,b);
}
#else
{
#if (BLEND_MODE_DIVIDE)
{
return b/a;
}
#else
{
#if (BLEND_MODE_AVERAGE)
{
return (a+b)*0.5;
}
#else
{
#if (BLEND_MODE_SUBTRACT)
{
return max((a+b)-vec3(1.0),vec3(0.0));
}
#else
{
#if (BLEND_MODE_DIFFERENCE)
{
return abs(a-b);
}
#else
{
#if (BLEND_MODE_NEGATION)
{
return vec3(1.0)-abs((vec3(1.0)-a)-b);
}
#else
{
#if (BLEND_MODE_EXCLUSION)
{
return (a+b)-((a*2.0)*b);
}
#else
{
#if (BLEND_MODE_OVERLAY)
{
float l9_0;
if (a.x<0.5)
{
l9_0=(2.0*a.x)*b.x;
}
else
{
l9_0=1.0-((2.0*(1.0-a.x))*(1.0-b.x));
}
float l9_1;
if (a.y<0.5)
{
l9_1=(2.0*a.y)*b.y;
}
else
{
l9_1=1.0-((2.0*(1.0-a.y))*(1.0-b.y));
}
float l9_2;
if (a.z<0.5)
{
l9_2=(2.0*a.z)*b.z;
}
else
{
l9_2=1.0-((2.0*(1.0-a.z))*(1.0-b.z));
}
return vec3(l9_0,l9_1,l9_2);
}
#else
{
#if (BLEND_MODE_SOFT_LIGHT)
{
return (((vec3(1.0)-(b*2.0))*a)*a)+((a*2.0)*b);
}
#else
{
#if (BLEND_MODE_HARD_LIGHT)
{
float l9_3;
if (b.x<0.5)
{
l9_3=(2.0*b.x)*a.x;
}
else
{
l9_3=1.0-((2.0*(1.0-b.x))*(1.0-a.x));
}
float l9_4;
if (b.y<0.5)
{
l9_4=(2.0*b.y)*a.y;
}
else
{
l9_4=1.0-((2.0*(1.0-b.y))*(1.0-a.y));
}
float l9_5;
if (b.z<0.5)
{
l9_5=(2.0*b.z)*a.z;
}
else
{
l9_5=1.0-((2.0*(1.0-b.z))*(1.0-a.z));
}
return vec3(l9_3,l9_4,l9_5);
}
#else
{
#if (BLEND_MODE_COLOR_DODGE)
{
float l9_6;
if (b.x==1.0)
{
l9_6=b.x;
}
else
{
l9_6=min(a.x/(1.0-b.x),1.0);
}
float l9_7;
if (b.y==1.0)
{
l9_7=b.y;
}
else
{
l9_7=min(a.y/(1.0-b.y),1.0);
}
float l9_8;
if (b.z==1.0)
{
l9_8=b.z;
}
else
{
l9_8=min(a.z/(1.0-b.z),1.0);
}
return vec3(l9_6,l9_7,l9_8);
}
#else
{
#if (BLEND_MODE_COLOR_BURN)
{
float l9_9;
if (b.x==0.0)
{
l9_9=b.x;
}
else
{
l9_9=max(1.0-((1.0-a.x)/b.x),0.0);
}
float l9_10;
if (b.y==0.0)
{
l9_10=b.y;
}
else
{
l9_10=max(1.0-((1.0-a.y)/b.y),0.0);
}
float l9_11;
if (b.z==0.0)
{
l9_11=b.z;
}
else
{
l9_11=max(1.0-((1.0-a.z)/b.z),0.0);
}
return vec3(l9_9,l9_10,l9_11);
}
#else
{
#if (BLEND_MODE_LINEAR_LIGHT)
{
float l9_12;
if (b.x<0.5)
{
l9_12=max((a.x+(2.0*b.x))-1.0,0.0);
}
else
{
l9_12=min(a.x+(2.0*(b.x-0.5)),1.0);
}
float l9_13;
if (b.y<0.5)
{
l9_13=max((a.y+(2.0*b.y))-1.0,0.0);
}
else
{
l9_13=min(a.y+(2.0*(b.y-0.5)),1.0);
}
float l9_14;
if (b.z<0.5)
{
l9_14=max((a.z+(2.0*b.z))-1.0,0.0);
}
else
{
l9_14=min(a.z+(2.0*(b.z-0.5)),1.0);
}
return vec3(l9_12,l9_13,l9_14);
}
#else
{
#if (BLEND_MODE_VIVID_LIGHT)
{
float l9_15;
if (b.x<0.5)
{
float l9_16;
if ((2.0*b.x)==0.0)
{
l9_16=2.0*b.x;
}
else
{
l9_16=max(1.0-((1.0-a.x)/(2.0*b.x)),0.0);
}
l9_15=l9_16;
}
else
{
float l9_17;
if ((2.0*(b.x-0.5))==1.0)
{
l9_17=2.0*(b.x-0.5);
}
else
{
l9_17=min(a.x/(1.0-(2.0*(b.x-0.5))),1.0);
}
l9_15=l9_17;
}
float l9_18;
if (b.y<0.5)
{
float l9_19;
if ((2.0*b.y)==0.0)
{
l9_19=2.0*b.y;
}
else
{
l9_19=max(1.0-((1.0-a.y)/(2.0*b.y)),0.0);
}
l9_18=l9_19;
}
else
{
float l9_20;
if ((2.0*(b.y-0.5))==1.0)
{
l9_20=2.0*(b.y-0.5);
}
else
{
l9_20=min(a.y/(1.0-(2.0*(b.y-0.5))),1.0);
}
l9_18=l9_20;
}
float l9_21;
if (b.z<0.5)
{
float l9_22;
if ((2.0*b.z)==0.0)
{
l9_22=2.0*b.z;
}
else
{
l9_22=max(1.0-((1.0-a.z)/(2.0*b.z)),0.0);
}
l9_21=l9_22;
}
else
{
float l9_23;
if ((2.0*(b.z-0.5))==1.0)
{
l9_23=2.0*(b.z-0.5);
}
else
{
l9_23=min(a.z/(1.0-(2.0*(b.z-0.5))),1.0);
}
l9_21=l9_23;
}
return vec3(l9_15,l9_18,l9_21);
}
#else
{
#if (BLEND_MODE_PIN_LIGHT)
{
float l9_24;
if (b.x<0.5)
{
l9_24=min(a.x,2.0*b.x);
}
else
{
l9_24=max(a.x,2.0*(b.x-0.5));
}
float l9_25;
if (b.y<0.5)
{
l9_25=min(a.y,2.0*b.y);
}
else
{
l9_25=max(a.y,2.0*(b.y-0.5));
}
float l9_26;
if (b.z<0.5)
{
l9_26=min(a.z,2.0*b.z);
}
else
{
l9_26=max(a.z,2.0*(b.z-0.5));
}
return vec3(l9_24,l9_25,l9_26);
}
#else
{
#if (BLEND_MODE_HARD_MIX)
{
float l9_27;
if (b.x<0.5)
{
float l9_28;
if ((2.0*b.x)==0.0)
{
l9_28=2.0*b.x;
}
else
{
l9_28=max(1.0-((1.0-a.x)/(2.0*b.x)),0.0);
}
l9_27=l9_28;
}
else
{
float l9_29;
if ((2.0*(b.x-0.5))==1.0)
{
l9_29=2.0*(b.x-0.5);
}
else
{
l9_29=min(a.x/(1.0-(2.0*(b.x-0.5))),1.0);
}
l9_27=l9_29;
}
bool l9_30=l9_27<0.5;
float l9_31;
if (b.y<0.5)
{
float l9_32;
if ((2.0*b.y)==0.0)
{
l9_32=2.0*b.y;
}
else
{
l9_32=max(1.0-((1.0-a.y)/(2.0*b.y)),0.0);
}
l9_31=l9_32;
}
else
{
float l9_33;
if ((2.0*(b.y-0.5))==1.0)
{
l9_33=2.0*(b.y-0.5);
}
else
{
l9_33=min(a.y/(1.0-(2.0*(b.y-0.5))),1.0);
}
l9_31=l9_33;
}
bool l9_34=l9_31<0.5;
float l9_35;
if (b.z<0.5)
{
float l9_36;
if ((2.0*b.z)==0.0)
{
l9_36=2.0*b.z;
}
else
{
l9_36=max(1.0-((1.0-a.z)/(2.0*b.z)),0.0);
}
l9_35=l9_36;
}
else
{
float l9_37;
if ((2.0*(b.z-0.5))==1.0)
{
l9_37=2.0*(b.z-0.5);
}
else
{
l9_37=min(a.z/(1.0-(2.0*(b.z-0.5))),1.0);
}
l9_35=l9_37;
}
return vec3(l9_30 ? 0.0 : 1.0,l9_34 ? 0.0 : 1.0,(l9_35<0.5) ? 0.0 : 1.0);
}
#else
{
#if (BLEND_MODE_HARD_REFLECT)
{
float l9_38;
if (b.x==1.0)
{
l9_38=b.x;
}
else
{
l9_38=min((a.x*a.x)/(1.0-b.x),1.0);
}
float l9_39;
if (b.y==1.0)
{
l9_39=b.y;
}
else
{
l9_39=min((a.y*a.y)/(1.0-b.y),1.0);
}
float l9_40;
if (b.z==1.0)
{
l9_40=b.z;
}
else
{
l9_40=min((a.z*a.z)/(1.0-b.z),1.0);
}
return vec3(l9_38,l9_39,l9_40);
}
#else
{
#if (BLEND_MODE_HARD_GLOW)
{
float l9_41;
if (a.x==1.0)
{
l9_41=a.x;
}
else
{
l9_41=min((b.x*b.x)/(1.0-a.x),1.0);
}
float l9_42;
if (a.y==1.0)
{
l9_42=a.y;
}
else
{
l9_42=min((b.y*b.y)/(1.0-a.y),1.0);
}
float l9_43;
if (a.z==1.0)
{
l9_43=a.z;
}
else
{
l9_43=min((b.z*b.z)/(1.0-a.z),1.0);
}
return vec3(l9_41,l9_42,l9_43);
}
#else
{
#if (BLEND_MODE_HARD_PHOENIX)
{
return (min(a,b)-max(a,b))+vec3(1.0);
}
#else
{
#if (BLEND_MODE_HUE)
{
return HSLToRGB(vec3(RGBToHSL(b).x,RGBToHSL(a).yz));
}
#else
{
#if (BLEND_MODE_SATURATION)
{
vec3 l9_44=RGBToHSL(a);
return HSLToRGB(vec3(l9_44.x,RGBToHSL(b).y,l9_44.z));
}
#else
{
#if (BLEND_MODE_COLOR)
{
return HSLToRGB(vec3(RGBToHSL(b).xy,RGBToHSL(a).z));
}
#else
{
#if (BLEND_MODE_LUMINOSITY)
{
return HSLToRGB(vec3(RGBToHSL(a).xy,RGBToHSL(b).z));
}
#else
{
vec3 l9_45=a;
vec3 l9_46=b;
float l9_47=((0.29899999*l9_45.x)+(0.58700001*l9_45.y))+(0.114*l9_45.z);
int l9_48;
#if (intensityTextureHasSwappedViews)
{
l9_48=1-sc_GetStereoViewIndex();
}
#else
{
l9_48=sc_GetStereoViewIndex();
}
#endif
bool l9_49=(int(SC_USE_CLAMP_TO_BORDER_intensityTexture)!=0)&&(!(int(SC_USE_UV_MIN_MAX_intensityTexture)!=0));
float l9_50=pow(l9_47,1.0/correctedIntensity);
sc_SoftwareWrapEarly(l9_50,ivec2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture,SC_SOFTWARE_WRAP_MODE_V_intensityTexture).x);
float l9_51=l9_50;
float l9_52=0.5;
sc_SoftwareWrapEarly(l9_52,ivec2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture,SC_SOFTWARE_WRAP_MODE_V_intensityTexture).y);
float l9_53=l9_52;
vec2 l9_54;
float l9_55;
#if (SC_USE_UV_MIN_MAX_intensityTexture)
{
bool l9_56;
#if (SC_USE_CLAMP_TO_BORDER_intensityTexture)
{
l9_56=ivec2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture,SC_SOFTWARE_WRAP_MODE_V_intensityTexture).x==3;
}
#else
{
l9_56=(int(SC_USE_CLAMP_TO_BORDER_intensityTexture)!=0);
}
#endif
float l9_57=l9_51;
float l9_58=1.0;
sc_ClampUV(l9_57,intensityTextureUvMinMax.x,intensityTextureUvMinMax.z,l9_56,l9_58);
float l9_59=l9_57;
float l9_60=l9_58;
bool l9_61;
#if (SC_USE_CLAMP_TO_BORDER_intensityTexture)
{
l9_61=ivec2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture,SC_SOFTWARE_WRAP_MODE_V_intensityTexture).y==3;
}
#else
{
l9_61=(int(SC_USE_CLAMP_TO_BORDER_intensityTexture)!=0);
}
#endif
float l9_62=l9_53;
float l9_63=l9_60;
sc_ClampUV(l9_62,intensityTextureUvMinMax.y,intensityTextureUvMinMax.w,l9_61,l9_63);
l9_55=l9_63;
l9_54=vec2(l9_59,l9_62);
}
#else
{
l9_55=1.0;
l9_54=vec2(l9_51,l9_53);
}
#endif
vec2 l9_64;
#if (SC_USE_UV_TRANSFORM_intensityTexture)
{
l9_64=vec2((intensityTextureTransform*vec3(l9_54,1.0)).xy);
}
#else
{
l9_64=l9_54;
}
#endif
float l9_65=l9_64.x;
float l9_66=l9_55;
sc_SoftwareWrapLate(l9_65,ivec2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture,SC_SOFTWARE_WRAP_MODE_V_intensityTexture).x,l9_49,l9_66);
float l9_67=l9_64.y;
float l9_68=l9_66;
sc_SoftwareWrapLate(l9_67,ivec2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture,SC_SOFTWARE_WRAP_MODE_V_intensityTexture).y,l9_49,l9_68);
float l9_69=l9_68;
vec3 l9_70=sc_SamplingCoordsViewToGlobal(vec2(l9_65,l9_67),intensityTextureLayout,l9_48);
vec4 l9_71=texture2D(intensityTexture,l9_70.xy,0.0);
vec4 l9_72;
#if (SC_USE_CLAMP_TO_BORDER_intensityTexture)
{
l9_72=mix(intensityTextureBorderColor,l9_71,vec4(l9_69));
}
#else
{
l9_72=l9_71;
}
#endif
float l9_73=((((l9_72.x*256.0)+l9_72.y)+(l9_72.z/256.0))/257.00391)*16.0;
float l9_74;
#if (BLEND_MODE_FORGRAY)
{
l9_74=max(l9_73,1.0);
}
#else
{
l9_74=l9_73;
}
#endif
float l9_75;
#if (BLEND_MODE_NOTBRIGHT)
{
l9_75=min(l9_74,1.0);
}
#else
{
l9_75=l9_74;
}
#endif
return transformColor(l9_47,l9_45,l9_46,1.0,l9_75);
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
vec4 sc_OutputMotionVectorIfNeeded(vec4 finalColor)
{
#if (sc_MotionVectorsPass)
{
float l9_0=floor(((varPosAndMotion.w*5.0)+0.5)*65535.0);
float l9_1=floor(l9_0*0.00390625);
float l9_2=floor(((varNormalAndMotion.w*5.0)+0.5)*65535.0);
float l9_3=floor(l9_2*0.00390625);
return vec4(l9_1/255.0,(l9_0-(l9_1*256.0))/255.0,l9_3/255.0,(l9_2-(l9_3*256.0))/255.0);
}
#else
{
return finalColor;
}
#endif
}
void sc_writeFragData0Internal(vec4 col,float zero,int cacheConst)
{
col.x+=zero*float(cacheConst);
sc_FragData0=col;
}
float getFrontLayerZTestEpsilon()
{
#if (sc_SkinBonesCount>0)
{
return 5e-07;
}
#else
{
return 5.0000001e-08;
}
#endif
}
void unpackValues(float channel,int passIndex,inout int values[8])
{
#if (sc_OITCompositingPass)
{
channel=floor((channel*255.0)+0.5);
int l9_0=((passIndex+1)*4)-1;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_0>=(passIndex*4))
{
values[l9_0]=(values[l9_0]*4)+int(floor(mod(channel,4.0)));
channel=floor(channel/4.0);
l9_0--;
continue;
}
else
{
break;
}
}
}
#endif
}
float getDepthOrderingEpsilon()
{
#if (sc_SkinBonesCount>0)
{
return 0.001;
}
#else
{
return 0.0;
}
#endif
}
int encodeDepth(float depth,vec2 depthBounds)
{
float l9_0=(1.0-depthBounds.x)*1000.0;
return int(clamp((depth-l9_0)/((depthBounds.y*1000.0)-l9_0),0.0,1.0)*65535.0);
}
float viewSpaceDepth()
{
#if (UseViewSpaceDepthVariant&&((sc_OITDepthGatherPass||sc_OITCompositingPass)||sc_OITDepthBoundsPass))
{
return varViewSpaceDepth;
}
#else
{
return sc_ProjectionMatrixArray[sc_GetStereoViewIndex()][3].z/(sc_ProjectionMatrixArray[sc_GetStereoViewIndex()][2].z+((gl_FragCoord.z*2.0)-1.0));
}
#endif
}
float packValue(inout int value)
{
#if (sc_OITDepthGatherPass)
{
int l9_0=value;
value/=4;
return floor(floor(mod(float(l9_0),4.0))*64.0)/255.0;
}
#else
{
return 0.0;
}
#endif
}
void sc_writeFragData1(vec4 col)
{
#if sc_FragDataCount>=2
sc_FragData1=col;
#endif
}
void sc_writeFragData2(vec4 col)
{
#if sc_FragDataCount>=3
sc_FragData2=col;
#endif
}
void main()
{
#if (sc_DepthOnly)
{
return;
}
#endif
#if ((sc_StereoRenderingMode==1)&&(sc_StereoRendering_IsClipDistanceEnabled==0))
{
if (varClipDistance<0.0)
{
discard;
}
}
#endif
vec3 l9_0=normalize(sc_Camera.position-varPosAndMotion.xyz);
vec3 l9_1;
#if (!sc_ProjectiveShadowsCaster)
{
l9_1=normalize(varNormalAndMotion.xyz);
}
#else
{
l9_1=vec3(0.0);
}
#endif
#if (sc_BlendMode_AlphaTest)
{
if (Port_Opacity_N003<alphaTestThreshold)
{
discard;
}
}
#endif
#if (ENABLE_STIPPLE_PATTERN_TEST)
{
if (Port_Opacity_N003<((mod(dot(floor(mod(gl_FragCoord.xy,vec2(4.0))),vec2(4.0,1.0))*9.0,16.0)+1.0)/17.0))
{
discard;
}
}
#endif
vec3 l9_2=max(frontColor.xyz,vec3(0.0));
vec4 l9_3;
#if (sc_ProjectiveShadowsCaster)
{
l9_3=vec4(l9_2,Port_Opacity_N003);
}
#else
{
vec3 l9_4=ssSRGB_to_Linear(l9_2);
vec3 l9_5=normalize(l9_1);
vec3 l9_6=ssSRGB_to_Linear(Port_Emissive_N003);
vec3 l9_7;
#if (sc_SSAOEnabled)
{
l9_7=evaluateSSAO(varPosAndMotion.xyz);
}
#else
{
l9_7=Port_AO_N003;
}
#endif
vec3 l9_8=vec3(Port_Metallic_N003);
vec3 l9_9=mix(vec3(0.039999999),l9_4*Port_Metallic_N003,l9_8);
vec3 l9_10=mix(l9_4*(1.0-Port_Metallic_N003),vec3(0.0),l9_8);
SurfaceProperties l9_11=SurfaceProperties(l9_10,Port_Opacity_N003,l9_5,varPosAndMotion.xyz,l9_0,Port_Metallic_N003,Port_Roughness_N003,l9_6,l9_7,Port_SpecularAO_N003,vec3(1.0),l9_9);
vec4 l9_12=vec4(1.0);
vec3 l9_13;
vec3 l9_14;
vec3 l9_15;
vec3 l9_16;
int l9_17;
vec3 l9_18;
vec3 l9_19;
#if (sc_DirectionalLightsCount>0)
{
vec3 l9_20;
vec3 l9_21;
vec3 l9_22;
vec3 l9_23;
int l9_24;
vec3 l9_25;
vec3 l9_26;
l9_26=vec3(1.0);
l9_25=vec3(0.0);
l9_24=0;
l9_23=vec3(0.0);
l9_22=vec3(0.0);
l9_21=vec3(0.0);
l9_20=vec3(0.0);
LightingComponents l9_27;
LightProperties l9_28;
SurfaceProperties l9_29;
vec3 l9_30;
int l9_31=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_31<sc_DirectionalLightsCount)
{
LightingComponents l9_32=accumulateLight(LightingComponents(l9_20,l9_21,l9_26,l9_25,l9_23,l9_22),LightProperties(sc_DirectionalLights[l9_31].direction,sc_DirectionalLights[l9_31].color.xyz,sc_DirectionalLights[l9_31].color.w*l9_12[(l9_24<3) ? l9_24 : 3]),l9_11,l9_0);
l9_26=l9_32.indirectDiffuse;
l9_25=l9_32.indirectSpecular;
l9_24++;
l9_23=l9_32.emitted;
l9_22=l9_32.transmitted;
l9_21=l9_32.directSpecular;
l9_20=l9_32.directDiffuse;
l9_31++;
continue;
}
else
{
break;
}
}
l9_19=l9_26;
l9_18=l9_25;
l9_17=l9_24;
l9_16=l9_23;
l9_15=l9_22;
l9_14=l9_21;
l9_13=l9_20;
}
#else
{
l9_19=vec3(1.0);
l9_18=vec3(0.0);
l9_17=0;
l9_16=vec3(0.0);
l9_15=vec3(0.0);
l9_14=vec3(0.0);
l9_13=vec3(0.0);
}
#endif
vec3 l9_33;
vec3 l9_34;
vec3 l9_35;
#if (sc_PointLightsCount>0)
{
vec3 l9_36;
vec3 l9_37;
vec3 l9_38;
vec3 l9_39;
vec3 l9_40;
vec3 l9_41;
l9_41=l9_19;
l9_40=l9_18;
l9_39=l9_16;
l9_38=l9_15;
l9_37=l9_14;
l9_36=l9_13;
int l9_42;
vec3 l9_43;
vec3 l9_44;
vec3 l9_45;
vec3 l9_46;
vec3 l9_47;
vec3 l9_48;
int l9_49=0;
int l9_50=l9_17;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_49<sc_PointLightsCount)
{
vec3 l9_51=sc_PointLights[l9_49].position-varPosAndMotion.xyz;
vec3 l9_52=normalize(l9_51);
float l9_53=l9_12[(l9_50<3) ? l9_50 : 3];
float l9_54=clamp((dot(l9_52,sc_PointLights[l9_49].direction)*sc_PointLights[l9_49].angleScale)+sc_PointLights[l9_49].angleOffset,0.0,1.0);
float l9_55=(sc_PointLights[l9_49].color.w*l9_53)*(l9_54*l9_54);
float l9_56;
if (sc_PointLights[l9_49].falloffEnabled)
{
l9_56=l9_55*computeDistanceAttenuation(length(l9_51),sc_PointLights[l9_49].falloffEndDistance);
}
else
{
l9_56=l9_55;
}
l9_42=l9_50+1;
LightingComponents l9_57=accumulateLight(LightingComponents(l9_36,l9_37,l9_41,l9_40,l9_39,l9_38),LightProperties(l9_52,sc_PointLights[l9_49].color.xyz,l9_56),l9_11,l9_0);
l9_43=l9_57.directDiffuse;
l9_44=l9_57.directSpecular;
l9_45=l9_57.indirectDiffuse;
l9_46=l9_57.indirectSpecular;
l9_47=l9_57.emitted;
l9_48=l9_57.transmitted;
l9_41=l9_45;
l9_40=l9_46;
l9_50=l9_42;
l9_39=l9_47;
l9_38=l9_48;
l9_37=l9_44;
l9_36=l9_43;
l9_49++;
continue;
}
else
{
break;
}
}
l9_35=l9_38;
l9_34=l9_37;
l9_33=l9_36;
}
#else
{
l9_35=l9_15;
l9_34=l9_14;
l9_33=l9_13;
}
#endif
vec3 l9_58;
vec3 l9_59;
#if (sc_ProjectiveShadowsReceiver)
{
vec3 l9_60;
#if (sc_ProjectiveShadowsReceiver)
{
vec2 l9_61=abs(varShadowTex-vec2(0.5));
vec4 l9_62=texture2D(sc_ShadowTexture,varShadowTex)*step(max(l9_61.x,l9_61.y),0.5);
l9_60=mix(vec3(1.0),mix(sc_ShadowColor.xyz,sc_ShadowColor.xyz*l9_62.xyz,vec3(sc_ShadowColor.w)),vec3(l9_62.w*sc_ShadowDensity));
}
#else
{
l9_60=vec3(1.0);
}
#endif
l9_59=l9_33*l9_60;
l9_58=l9_34*l9_60;
}
#else
{
l9_59=l9_33;
l9_58=l9_34;
}
#endif
vec3 l9_63;
#if ((sc_EnvLightMode==sc_AmbientLightMode_EnvironmentMap)||(sc_EnvLightMode==sc_AmbientLightMode_FromCamera))
{
vec2 l9_64=calcPanoramicTexCoordsFromDir(l9_5,sc_EnvmapRotation.y);
vec4 l9_65;
#if (sc_EnvLightMode==sc_AmbientLightMode_FromCamera)
{
vec2 l9_66;
#if (SC_DEVICE_CLASS>=2)
{
l9_66=calcSeamlessPanoramicUvsForSampling(l9_64,sc_EnvmapSpecularSize.xy,5.0);
}
#else
{
l9_66=l9_64;
}
#endif
l9_65=texture2D(sc_EnvmapSpecular,sc_SamplingCoordsViewToGlobal(l9_66,sc_EnvmapSpecularLayout,sc_EnvmapSpecularGetStereoViewIndex()).xy,13.0);
}
#else
{
vec4 l9_67;
#if (sc_HasDiffuseEnvmap)
{
vec2 l9_68=calcSeamlessPanoramicUvsForSampling(l9_64,sc_EnvmapDiffuseSize.xy,0.0);
int l9_69;
#if (sc_EnvmapDiffuseHasSwappedViews)
{
l9_69=1-sc_GetStereoViewIndex();
}
#else
{
l9_69=sc_GetStereoViewIndex();
}
#endif
l9_67=texture2D(sc_EnvmapDiffuse,sc_SamplingCoordsViewToGlobal(l9_68,sc_EnvmapDiffuseLayout,l9_69).xy,-13.0);
}
#else
{
l9_67=texture2D(sc_EnvmapSpecular,sc_SamplingCoordsViewToGlobal(l9_64,sc_EnvmapSpecularLayout,sc_EnvmapSpecularGetStereoViewIndex()).xy,13.0);
}
#endif
l9_65=l9_67;
}
#endif
l9_63=(l9_65.xyz*(1.0/l9_65.w))*sc_EnvmapExposure;
}
#else
{
vec3 l9_70;
#if (sc_EnvLightMode==sc_AmbientLightMode_SphericalHarmonics)
{
vec3 l9_71=-l9_5;
float l9_72=l9_71.x;
float l9_73=l9_71.y;
float l9_74=l9_71.z;
l9_70=(((((((sc_Sh[8]*0.42904299)*((l9_72*l9_72)-(l9_73*l9_73)))+((sc_Sh[6]*0.74312502)*(l9_74*l9_74)))+(sc_Sh[0]*0.88622701))-(sc_Sh[6]*0.24770799))+((((sc_Sh[4]*(l9_72*l9_73))+(sc_Sh[7]*(l9_72*l9_74)))+(sc_Sh[5]*(l9_73*l9_74)))*0.85808599))+((((sc_Sh[3]*l9_72)+(sc_Sh[1]*l9_73))+(sc_Sh[2]*l9_74))*1.0233279))*sc_ShIntensity;
}
#else
{
l9_70=vec3(0.0);
}
#endif
l9_63=l9_70;
}
#endif
vec3 l9_75;
#if (sc_AmbientLightsCount>0)
{
vec3 l9_76;
#if (sc_AmbientLightMode0==sc_AmbientLightMode_Constant)
{
l9_76=l9_63+(sc_AmbientLights[0].color*sc_AmbientLights[0].intensity);
}
#else
{
vec3 l9_77=l9_63;
l9_77.x=l9_63.x+(1e-06*sc_AmbientLights[0].color.x);
l9_76=l9_77;
}
#endif
l9_75=l9_76;
}
#else
{
l9_75=l9_63;
}
#endif
vec3 l9_78;
#if (sc_AmbientLightsCount>1)
{
vec3 l9_79;
#if (sc_AmbientLightMode1==sc_AmbientLightMode_Constant)
{
l9_79=l9_75+(sc_AmbientLights[1].color*sc_AmbientLights[1].intensity);
}
#else
{
vec3 l9_80=l9_75;
l9_80.x=l9_75.x+(1e-06*sc_AmbientLights[1].color.x);
l9_79=l9_80;
}
#endif
l9_78=l9_79;
}
#else
{
l9_78=l9_75;
}
#endif
vec3 l9_81;
#if (sc_AmbientLightsCount>2)
{
vec3 l9_82;
#if (sc_AmbientLightMode2==sc_AmbientLightMode_Constant)
{
l9_82=l9_78+(sc_AmbientLights[2].color*sc_AmbientLights[2].intensity);
}
#else
{
vec3 l9_83=l9_78;
l9_83.x=l9_78.x+(1e-06*sc_AmbientLights[2].color.x);
l9_82=l9_83;
}
#endif
l9_81=l9_82;
}
#else
{
l9_81=l9_78;
}
#endif
vec3 l9_84;
#if (sc_LightEstimation)
{
vec3 l9_85;
l9_85=sc_LightEstimationData.ambientLight;
vec3 l9_86;
int l9_87=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_87<sc_LightEstimationSGCount)
{
float l9_88=dot(sc_LightEstimationData.sg[l9_87].axis,l9_5);
float l9_89=exp(-sc_LightEstimationData.sg[l9_87].sharpness);
float l9_90=l9_89*l9_89;
float l9_91=1.0/sc_LightEstimationData.sg[l9_87].sharpness;
float l9_92=(1.0+(2.0*l9_90))-l9_91;
float l9_93=sqrt(1.0-l9_92);
float l9_94=0.36000001*l9_88;
float l9_95=(1.0/(4.0*0.36000001))*l9_93;
float l9_96=l9_94+l9_95;
float l9_97;
if (step(abs(l9_94),l9_95)>0.5)
{
l9_97=(l9_96*l9_96)/l9_93;
}
else
{
l9_97=clamp(l9_88,0.0,1.0);
}
l9_86=l9_85+((((sc_LightEstimationData.sg[l9_87].color/vec3(sc_LightEstimationData.sg[l9_87].sharpness))*6.2831855)*((l9_92*l9_97)+(((l9_89-l9_90)*l9_91)-l9_90)))/vec3(3.1415927));
l9_85=l9_86;
l9_87++;
continue;
}
else
{
break;
}
}
l9_84=l9_81+l9_85;
}
#else
{
l9_84=l9_81;
}
#endif
vec3 l9_98;
#if ((sc_EnvLightMode==sc_AmbientLightMode_EnvironmentMap)||(sc_EnvLightMode==sc_AmbientLightMode_FromCamera))
{
float l9_99=clamp(pow(Port_Roughness_N003,0.66666669),0.0,1.0)*5.0;
vec2 l9_100=calcPanoramicTexCoordsFromDir(getSpecularDominantDir(l9_5,reflect(-l9_0,l9_5),Port_Roughness_N003),sc_EnvmapRotation.y);
vec4 l9_101;
#if (SC_DEVICE_CLASS>=2)
{
float l9_102=floor(l9_99);
float l9_103=ceil(l9_99);
l9_101=mix(texture2DLod(sc_EnvmapSpecular,sc_SamplingCoordsViewToGlobal(calcSeamlessPanoramicUvsForSampling(l9_100,sc_EnvmapSpecularSize.xy,l9_102),sc_EnvmapSpecularLayout,sc_EnvmapSpecularGetStereoViewIndex()).xy,l9_102),texture2DLod(sc_EnvmapSpecular,sc_SamplingCoordsViewToGlobal(calcSeamlessPanoramicUvsForSampling(l9_100,sc_EnvmapSpecularSize.xy,l9_103),sc_EnvmapSpecularLayout,sc_EnvmapSpecularGetStereoViewIndex()).xy,l9_103),vec4(l9_99-l9_102));
}
#else
{
l9_101=texture2DLod(sc_EnvmapSpecular,sc_SamplingCoordsViewToGlobal(l9_100,sc_EnvmapSpecularLayout,sc_EnvmapSpecularGetStereoViewIndex()).xy,l9_99);
}
#endif
l9_98=vec3(0.0)+((((l9_101.xyz*(1.0/l9_101.w))*sc_EnvmapExposure)+vec3(1e-06))*envBRDFApprox(l9_11,abs(dot(l9_5,l9_0))));
}
#else
{
l9_98=vec3(0.0);
}
#endif
vec3 l9_104;
#if (sc_LightEstimation)
{
float l9_105=clamp(Port_Roughness_N003*Port_Roughness_N003,0.0099999998,1.0);
vec3 l9_106;
l9_106=sc_LightEstimationData.ambientLight*l9_9;
int l9_107=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_107<sc_LightEstimationSGCount)
{
float l9_108=l9_105*l9_105;
vec3 l9_109=reflect(-l9_0,l9_5);
float l9_110=dot(l9_5,l9_0);
float l9_111=(2.0/l9_108)/(4.0*max(l9_110,9.9999997e-05));
float l9_112=length((l9_109*l9_111)+(sc_LightEstimationData.sg[l9_107].axis*sc_LightEstimationData.sg[l9_107].sharpness));
float l9_113=clamp(dot(l9_5,l9_109),0.0,1.0);
float l9_114=clamp(l9_110,0.0,1.0);
float l9_115=1.0-l9_108;
l9_106+=((((((((vec3(1.0/(3.1415927*l9_108))*exp((l9_112-l9_111)-sc_LightEstimationData.sg[l9_107].sharpness))*sc_LightEstimationData.sg[l9_107].color)*6.2831855)*(1.0-exp((-2.0)*l9_112)))/vec3(l9_112))*((1.0/(l9_113+sqrt(l9_108+((l9_115*l9_113)*l9_113))))*(1.0/(l9_114+sqrt(l9_108+((l9_115*l9_114)*l9_114))))))*(l9_9+((vec3(1.0)-l9_9)*pow(1.0-clamp(dot(l9_109,normalize(l9_109+l9_0)),0.0,1.0),5.0))))*l9_113);
l9_107++;
continue;
}
else
{
break;
}
}
l9_104=l9_98+l9_106;
}
#else
{
l9_104=l9_98;
}
#endif
float l9_116;
vec3 l9_117;
vec3 l9_118;
vec3 l9_119;
#if (sc_BlendMode_ColoredGlass)
{
l9_119=vec3(0.0);
l9_118=vec3(0.0);
l9_117=ssSRGB_to_Linear(sc_GetFramebufferColor().xyz)*mix(vec3(1.0),l9_10,vec3(Port_Opacity_N003));
l9_116=1.0;
}
#else
{
l9_119=l9_59;
l9_118=l9_84;
l9_117=l9_35;
l9_116=Port_Opacity_N003;
}
#endif
bool l9_120;
#if (sc_BlendMode_PremultipliedAlpha)
{
l9_120=true;
}
#else
{
l9_120=false;
}
#endif
vec3 l9_121=l9_118*l9_7;
vec3 l9_122=l9_119+l9_121;
vec3 l9_123=l9_10*l9_122;
vec3 l9_124=l9_104*Port_SpecularAO_N003;
vec3 l9_125=l9_58+l9_124;
vec3 l9_126;
if (l9_120)
{
l9_126=l9_123*srgbToLinear(l9_116);
}
else
{
l9_126=l9_123;
}
vec3 l9_127=l9_126+l9_125;
vec3 l9_128=(l9_127+l9_6)+l9_117;
float l9_129=l9_128.x;
vec4 l9_130=vec4(l9_129,l9_128.yz,l9_116);
vec4 l9_131;
#if (sc_IsEditor)
{
vec4 l9_132=l9_130;
l9_132.x=l9_129+((l9_7.x*Port_SpecularAO_N003.x)*9.9999997e-06);
l9_131=l9_132;
}
#else
{
l9_131=l9_130;
}
#endif
vec4 l9_133;
#if (!sc_BlendMode_Multiply)
{
vec3 l9_134=l9_131.xyz*1.8;
vec3 l9_135=(l9_131.xyz*(l9_134+vec3(1.4)))/((l9_131.xyz*(l9_134+vec3(0.5)))+vec3(1.5));
l9_133=vec4(l9_135.x,l9_135.y,l9_135.z,l9_131.w);
}
#else
{
l9_133=l9_131;
}
#endif
vec3 l9_136=vec3(linearToSrgb(l9_133.x),linearToSrgb(l9_133.y),linearToSrgb(l9_133.z));
l9_3=vec4(l9_136.x,l9_136.y,l9_136.z,l9_133.w);
}
#endif
vec4 l9_137=max(l9_3,vec4(0.0));
vec4 l9_138=mix(l9_137,sideColor,vec4(step(varTex01.y,Port_Input1_N014)));
vec4 l9_139;
#if (sc_ProjectiveShadowsCaster)
{
float l9_140;
#if (((sc_BlendMode_Normal||sc_BlendMode_AlphaToCoverage)||sc_BlendMode_PremultipliedAlphaHardware)||sc_BlendMode_PremultipliedAlphaAuto)
{
l9_140=l9_138.w;
}
#else
{
float l9_141;
#if (sc_BlendMode_PremultipliedAlpha)
{
l9_141=clamp(l9_138.w*2.0,0.0,1.0);
}
#else
{
float l9_142;
#if (sc_BlendMode_AddWithAlphaFactor)
{
l9_142=clamp(dot(l9_138.xyz,vec3(l9_138.w)),0.0,1.0);
}
#else
{
float l9_143;
#if (sc_BlendMode_AlphaTest)
{
l9_143=1.0;
}
#else
{
float l9_144;
#if (sc_BlendMode_Multiply)
{
l9_144=(1.0-dot(l9_138.xyz,vec3(0.33333001)))*l9_138.w;
}
#else
{
float l9_145;
#if (sc_BlendMode_MultiplyOriginal)
{
l9_145=(1.0-clamp(dot(l9_138.xyz,vec3(1.0)),0.0,1.0))*l9_138.w;
}
#else
{
float l9_146;
#if (sc_BlendMode_ColoredGlass)
{
l9_146=clamp(dot(l9_138.xyz,vec3(1.0)),0.0,1.0)*l9_138.w;
}
#else
{
float l9_147;
#if (sc_BlendMode_Add)
{
l9_147=clamp(dot(l9_138.xyz,vec3(1.0)),0.0,1.0);
}
#else
{
float l9_148;
#if (sc_BlendMode_AddWithAlphaFactor)
{
l9_148=clamp(dot(l9_138.xyz,vec3(1.0)),0.0,1.0)*l9_138.w;
}
#else
{
float l9_149;
#if (sc_BlendMode_Screen)
{
l9_149=dot(l9_138.xyz,vec3(0.33333001))*l9_138.w;
}
#else
{
float l9_150;
#if (sc_BlendMode_Min)
{
l9_150=1.0-clamp(dot(l9_138.xyz,vec3(1.0)),0.0,1.0);
}
#else
{
float l9_151;
#if (sc_BlendMode_Max)
{
l9_151=clamp(dot(l9_138.xyz,vec3(1.0)),0.0,1.0);
}
#else
{
l9_151=1.0;
}
#endif
l9_150=l9_151;
}
#endif
l9_149=l9_150;
}
#endif
l9_148=l9_149;
}
#endif
l9_147=l9_148;
}
#endif
l9_146=l9_147;
}
#endif
l9_145=l9_146;
}
#endif
l9_144=l9_145;
}
#endif
l9_143=l9_144;
}
#endif
l9_142=l9_143;
}
#endif
l9_141=l9_142;
}
#endif
l9_140=l9_141;
}
#endif
l9_139=vec4(mix(sc_ShadowColor.xyz,sc_ShadowColor.xyz*l9_138.xyz,vec3(sc_ShadowColor.w)),sc_ShadowDensity*l9_140);
}
#else
{
vec4 l9_152;
#if (sc_RenderAlphaToColor)
{
l9_152=vec4(l9_138.w);
}
#else
{
vec4 l9_153;
#if (sc_BlendMode_Custom)
{
vec3 l9_154=sc_GetFramebufferColor().xyz;
vec3 l9_155=mix(l9_154,definedBlend(l9_154,l9_138.xyz).xyz,vec3(l9_138.w));
vec4 l9_156=vec4(l9_155.x,l9_155.y,l9_155.z,vec4(0.0).w);
l9_156.w=1.0;
l9_153=l9_156;
}
#else
{
vec4 l9_157;
#if (sc_Voxelization)
{
l9_157=vec4(varScreenPos.xyz,1.0);
}
#else
{
vec4 l9_158;
#if (sc_OutputBounds)
{
float l9_159=clamp(abs(gl_FragCoord.z),0.0,1.0);
l9_158=vec4(l9_159,1.0-l9_159,1.0,1.0);
}
#else
{
vec4 l9_160;
#if (sc_BlendMode_MultiplyOriginal)
{
float l9_161=l9_138.w;
l9_160=vec4(mix(vec3(1.0),l9_138.xyz,vec3(l9_161)),l9_161);
}
#else
{
vec4 l9_162;
#if (sc_BlendMode_Screen||sc_BlendMode_PremultipliedAlphaAuto)
{
float l9_163=l9_138.w;
float l9_164;
#if (sc_BlendMode_PremultipliedAlphaAuto)
{
l9_164=clamp(l9_163,0.0,1.0);
}
#else
{
l9_164=l9_163;
}
#endif
l9_162=vec4(l9_138.xyz*l9_164,l9_164);
}
#else
{
l9_162=l9_138;
}
#endif
l9_160=l9_162;
}
#endif
l9_158=l9_160;
}
#endif
l9_157=l9_158;
}
#endif
l9_153=l9_157;
}
#endif
l9_152=l9_153;
}
#endif
l9_139=l9_152;
}
#endif
vec4 l9_165;
if (PreviewEnabled==1)
{
vec4 l9_166;
if (((PreviewVertexSaved*1.0)!=0.0) ? true : false)
{
l9_166=PreviewVertexColor;
}
else
{
l9_166=vec4(0.0);
}
l9_165=l9_166;
}
else
{
l9_165=l9_139;
}
vec4 l9_167=sc_OutputMotionVectorIfNeeded(max(l9_165,vec4(0.0)));
vec4 l9_168=clamp(l9_167,vec4(0.0),vec4(1.0));
#if (sc_OITDepthBoundsPass)
{
#if (sc_OITDepthBoundsPass)
{
float l9_169=clamp(viewSpaceDepth()/1000.0,0.0,1.0);
sc_writeFragData0Internal(vec4(max(0.0,1.0-(l9_169-0.0039215689)),min(1.0,l9_169+0.0039215689),0.0,0.0),sc_UniformConstants.x,sc_ShaderCacheConstant);
}
#endif
}
#else
{
#if (sc_OITDepthPrepass)
{
sc_writeFragData0Internal(vec4(1.0),sc_UniformConstants.x,sc_ShaderCacheConstant);
}
#else
{
#if (sc_OITDepthGatherPass)
{
#if (sc_OITDepthGatherPass)
{
vec2 l9_170=sc_ScreenCoordsGlobalToView(gl_FragCoord.xy*sc_CurrentRenderTargetDims.zw);
#if (sc_OITMaxLayers4Plus1)
{
if ((gl_FragCoord.z-texture2D(sc_OITFrontDepthTexture,l9_170).x)<=getFrontLayerZTestEpsilon())
{
discard;
}
}
#endif
int l9_171=encodeDepth(viewSpaceDepth(),texture2D(sc_OITFilteredDepthBoundsTexture,l9_170).xy);
float l9_172=packValue(l9_171);
int l9_179=int(l9_168.w*255.0);
float l9_180=packValue(l9_179);
sc_writeFragData0Internal(vec4(packValue(l9_171),packValue(l9_171),packValue(l9_171),packValue(l9_171)),sc_UniformConstants.x,sc_ShaderCacheConstant);
sc_writeFragData1(vec4(l9_172,packValue(l9_171),packValue(l9_171),packValue(l9_171)));
sc_writeFragData2(vec4(l9_180,packValue(l9_179),packValue(l9_179),packValue(l9_179)));
#if (sc_OITMaxLayersVisualizeLayerCount)
{
sc_writeFragData2(vec4(0.0039215689,0.0,0.0,0.0));
}
#endif
}
#endif
}
#else
{
#if (sc_OITCompositingPass)
{
#if (sc_OITCompositingPass)
{
vec2 l9_183=sc_ScreenCoordsGlobalToView(gl_FragCoord.xy*sc_CurrentRenderTargetDims.zw);
#if (sc_OITMaxLayers4Plus1)
{
if ((gl_FragCoord.z-texture2D(sc_OITFrontDepthTexture,l9_183).x)<=getFrontLayerZTestEpsilon())
{
discard;
}
}
#endif
int l9_184[8];
int l9_185[8];
int l9_186=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_186<8)
{
l9_184[l9_186]=0;
l9_185[l9_186]=0;
l9_186++;
continue;
}
else
{
break;
}
}
int l9_187;
#if (sc_OITMaxLayers8)
{
l9_187=2;
}
#else
{
l9_187=1;
}
#endif
int l9_188=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_188<l9_187)
{
vec4 l9_189;
vec4 l9_190;
vec4 l9_191;
if (l9_188==0)
{
l9_191=texture2D(sc_OITAlpha0,l9_183);
l9_190=texture2D(sc_OITDepthLow0,l9_183);
l9_189=texture2D(sc_OITDepthHigh0,l9_183);
}
else
{
l9_191=vec4(0.0);
l9_190=vec4(0.0);
l9_189=vec4(0.0);
}
vec4 l9_192;
vec4 l9_193;
vec4 l9_194;
if (l9_188==1)
{
l9_194=texture2D(sc_OITAlpha1,l9_183);
l9_193=texture2D(sc_OITDepthLow1,l9_183);
l9_192=texture2D(sc_OITDepthHigh1,l9_183);
}
else
{
l9_194=l9_191;
l9_193=l9_190;
l9_192=l9_189;
}
if (any(notEqual(l9_192,vec4(0.0)))||any(notEqual(l9_193,vec4(0.0))))
{
int l9_195[8]=l9_184;
unpackValues(l9_192.w,l9_188,l9_195);
unpackValues(l9_192.z,l9_188,l9_195);
unpackValues(l9_192.y,l9_188,l9_195);
unpackValues(l9_192.x,l9_188,l9_195);
unpackValues(l9_193.w,l9_188,l9_195);
unpackValues(l9_193.z,l9_188,l9_195);
unpackValues(l9_193.y,l9_188,l9_195);
unpackValues(l9_193.x,l9_188,l9_195);
int l9_204[8]=l9_185;
unpackValues(l9_194.w,l9_188,l9_204);
unpackValues(l9_194.z,l9_188,l9_204);
unpackValues(l9_194.y,l9_188,l9_204);
unpackValues(l9_194.x,l9_188,l9_204);
}
l9_188++;
continue;
}
else
{
break;
}
}
vec4 l9_209=texture2D(sc_OITFilteredDepthBoundsTexture,l9_183);
vec2 l9_210=l9_209.xy;
int l9_211;
#if (sc_SkinBonesCount>0)
{
l9_211=encodeDepth(((1.0-l9_209.x)*1000.0)+getDepthOrderingEpsilon(),l9_210);
}
#else
{
l9_211=0;
}
#endif
int l9_212=encodeDepth(viewSpaceDepth(),l9_210);
vec4 l9_213;
l9_213=l9_168*l9_168.w;
vec4 l9_214;
int l9_215=0;
for (int snapLoopIndex=0; snapLoopIndex==0; snapLoopIndex+=0)
{
if (l9_215<8)
{
int l9_216=l9_184[l9_215];
int l9_217=l9_212-l9_211;
bool l9_218=l9_216<l9_217;
bool l9_219;
if (l9_218)
{
l9_219=l9_184[l9_215]>0;
}
else
{
l9_219=l9_218;
}
if (l9_219)
{
vec3 l9_220=l9_213.xyz*(1.0-(float(l9_185[l9_215])/255.0));
l9_214=vec4(l9_220.x,l9_220.y,l9_220.z,l9_213.w);
}
else
{
l9_214=l9_213;
}
l9_213=l9_214;
l9_215++;
continue;
}
else
{
break;
}
}
sc_writeFragData0Internal(l9_213,sc_UniformConstants.x,sc_ShaderCacheConstant);
#if (sc_OITMaxLayersVisualizeLayerCount)
{
discard;
}
#endif
}
#endif
}
#else
{
#if (sc_OITFrontLayerPass)
{
#if (sc_OITFrontLayerPass)
{
if (abs(gl_FragCoord.z-texture2D(sc_OITFrontDepthTexture,sc_ScreenCoordsGlobalToView(gl_FragCoord.xy*sc_CurrentRenderTargetDims.zw)).x)>getFrontLayerZTestEpsilon())
{
discard;
}
sc_writeFragData0Internal(l9_168,sc_UniformConstants.x,sc_ShaderCacheConstant);
}
#endif
}
#else
{
sc_writeFragData0Internal(l9_167,sc_UniformConstants.x,sc_ShaderCacheConstant);
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif
}
#endif // #elif defined FRAGMENT_SHADER // #if defined VERTEX_SHADER
