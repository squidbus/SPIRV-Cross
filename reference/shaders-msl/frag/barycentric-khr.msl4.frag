#pragma clang diagnostic ignored "-Wmissing-prototypes"
#pragma clang diagnostic ignored "-Wmissing-braces"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

template<typename T, size_t Num>
struct spvUnsafeArray
{
    T elements[Num ? Num : 1];
    
    thread T& operator [] (size_t pos) thread
    {
        return elements[pos];
    }
    constexpr const thread T& operator [] (size_t pos) const thread
    {
        return elements[pos];
    }
    
    device T& operator [] (size_t pos) device
    {
        return elements[pos];
    }
    constexpr const device T& operator [] (size_t pos) const device
    {
        return elements[pos];
    }
    
    constexpr const constant T& operator [] (size_t pos) const constant
    {
        return elements[pos];
    }
    
    threadgroup T& operator [] (size_t pos) threadgroup
    {
        return elements[pos];
    }
    constexpr const threadgroup T& operator [] (size_t pos) const threadgroup
    {
        return elements[pos];
    }
};

struct main0_out
{
    float2 value [[color(0)]];
};

struct main0_in
{
    vertex_value<float2> vUV [[user(locn0)]];
    vertex_value<float2> vUV2 [[user(locn3)]];
    float3 gl_BaryCoordEXT [[barycentric_coord, center_perspective]];
    float3 gl_BaryCoordNoPerspEXT [[barycentric_coord, center_no_perspective]];
};

fragment main0_out main0(main0_in in [[stage_in]])
{
    main0_out out = {};
    spvUnsafeArray<float2, 3> vUV = {};
    spvUnsafeArray<float2, 3> vUV2 = {};
    vUV[0] = in.vUV.get(vertex_index::first);
    vUV[1] = in.vUV.get(vertex_index::second);
    vUV[2] = in.vUV.get(vertex_index::third);
    vUV2[0] = in.vUV2.get(vertex_index::first);
    vUV2[1] = in.vUV2.get(vertex_index::second);
    vUV2[2] = in.vUV2.get(vertex_index::third);
    out.value = ((vUV[0] * in.gl_BaryCoordEXT.x) + (vUV[1] * in.gl_BaryCoordEXT.y)) + (vUV[2] * in.gl_BaryCoordEXT.z);
    out.value += (((vUV2[0] * in.gl_BaryCoordNoPerspEXT.x) + (vUV2[1] * in.gl_BaryCoordNoPerspEXT.y)) + (vUV2[2] * in.gl_BaryCoordNoPerspEXT.z));
    return out;
}

