---
date: 2022-11-28
tags:
  - webgpu
  - publish
---
### Goals
* Exposes capability of Metal, D3D12, and Vulkan
* Web-native API
* Modern Features
* Built with extensibility in mind

### Features
* Compute Shaders
* Indirect drawing
* Render Bundles
* External textures (for more efficient video)
* More flexible Canvas integration
* Improved debugging features
* No global state!

#### Drawing a triangle
Initialization
```js
const adapter = await navigator.gpu.requestAdapter();
const device = await adaptor.requestDevice();

const context  = canvas.getContext("webgpu");
context.configure({
	device,
	format: 'bgra8unorm'
})
```

Buffers
```js
const vextexData = new Float32Array([
	 0,  1, 1,
	-1, -1, 1,
	 1, -1, 1
])

const vextBuffer = device.createBuffer({
	size: vertexData.byteLength,
	usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
});
device.queue.writeBuffer(vertexBuffer, 0, vertexData);
```

Shaders
- new shader syntax `wgsl` (wig · sel) - WebGPU Shading language
```js
const shaderModule = device.createShaderModule({
	code: `
		@vertex
		fn vertexMain(@location(0) pos : vec3<f32>) ->
			@builtin(position) vec4(f32) {
			return vec4(pos, 1.0);
		}
		@fragment
		fn fragmentMain() -> @location(0) vec4<f32> {
			return vec4(1.0, 0.0, 0.0, 1.0);
		}
	`
})
```

Pipelines
* Is like a webgl program
- Contains
	- shape of the vertex attributes
	- render target formats
	- blending
```js
const pipeline = device.createRenderPipeline({
	layout: 'auto',
	vextex: {
		module: shaderModule, entryPoint: 'vertexMain',
		buffers: [{
			arrayStride: 12,
			attributes: [{
				shaderLocation: 0, offset: 0, format: 'float32x3'
			}]
		}],
	},
	fragment: {
		module: shaderModule, entryPoint: 'fragmentMain',
		targets: [{ format }],
	},
	primitive: { topology: 'triangle-list'}
})
```

Drawing
 - draw time vs setup time
	 - all state initialization in webgpu happens during setup time
	 - this help webgpu to do optimizations without any assumptions 
```js
const commandEncoder  = device.createCommenEncoder();
const passEncoder = commandEncoder.beginRenderPass({
	colorAttachments: [{
		view: context.getCurrentTexture().createView(),
		loadOp: 'clear',
		clearValue: [0.0, 0.0, 0.0, 1.0],
		storeOp: 'store',
	}]
})

passEncoder.setPipeline(pipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);
passEncoder.end();

device.queue.submit([commandEncoder.finish()]);
```



### Core concepts
- GPUAdapter
	- Adapter are the GPU's available to the device.
	- Can be software! (SwiftShader)
	- Only returns one at a time, but can request an adapter that meets certain criteria.
		- `{ powerPreference: 'low-power'`
	- Gives basic description of the GPU
		- `{ vendor: "nvidia", architecture: "turing" }`
	- Lists the features and limits available to the GPUDevice.
- GPUDevice
	- Primary interface for the API
	- Creates resources like Textures, Buffers, Pipelines, etc.
	- Has a GPUQueue for executing commands
	- Roughly equivalent to a WebGLRenderingContext
	
	Features
	- Roughly equivalent to WEBGL's extensions
	- Typically things not supported on all implementations/systems
		- "texture-compression-bc"
		- "timestamp-query"
	- Adapter list which ones are available
	
	Limits
	- Numeric limits of GPU capabilities 
		- `maxTextureDimension2D`
		- `maxBindGroups`
		* `maxVertexBuffers`
	- Each has a baseline that all WEBGPU implementations must support.
	- Adaptor reports the actual system limits.
	- Devices will only have access to the default limits unless otherwise specified when requesting the Device.
- GPUCanvasContext
	- Allows WebGPU to render to the canvas
	- Must be configured after creation to associate it with a device.
	- Multiple canvases can be configured to use the same device
	- Can be reconfigured as needed
	- Provides a texture to render into
	```js
	const context = canvas.getContext('webgpu');
	context.configure({
		device,
		format: 'bgra8unorm',
	})
	
	// During frame loop
	const renderTexture = context.getCurrentTexture();
	```
- Resource types
	- All have immutable "shape" after creation, but the contents can be changed
	- GPUBuffer
		- Specifies size and usage
		- Uniforms, Vertices, Indices, General data
		```js
		const buffer = device.createBuffer({
			size: 2048, // bytes
			usage: GPUBufferUsage.VERTEX | GPUBufferUSAGE.COPY_DST,
		})
	```
	- GPUTexture
		- Specifies 1D/2D/3D, size, mips, samples, format, usage.
		```js
		const texture = device.createTexture({
			size: { width: 64, height: 64 },
			mipLevelCount: 4,
			format: 'rgba8unorm',
			usage: GPUTextureUsage.TEXTURE_BINDING,
		});
		```
	- GPUTextureView
		- Subset of a texture for sampling, render targets.
		- Specifies usage as cube map, array texture, etc.
		```js
		const textureView = texture.createView({
			baseMipLevel: 1,
			mipLevelCount: 1,
		});
		```
	- GPUSampler
		- Specifies Texture filtering/wrapping behaviour
		```js
		const sampler = device.createSampler({
			magFilter: "nearest",
			minFilter: "linear",
			mipmapFilter: "linear",
			addressModU: "repeat",
			addressModeV: "clamp-to-edge",
	})
	```
- Shading language - WGSL
	```rust
	// Vetex Shader
	
	struct Camera {
		projection: mat4x4<f32>,
		view: mat4x4<f32>,
	};
	@group(0) @binding(0) var<uniform> camera : Camera;
	
	struct VertexInput {
		@location(0) position : vec3<f32>,
		@location(1) texCoord : vec2<f32>,
	};
	
	struct VextexOutput {
		@builtin(position) position : vec4<f32>,
		@location(0) texCoord : vec2<f32>,
	};
	
	@stage(vertex)
	fn vertexMain(input : VertexInput) -> VertexOutput {
		var output : VertexOutput;
		output.texCoord = input.texCoord;
		output.position = camera.projection * camera.view * vec4(input.position, 1.0);
		return output;
	}
	```

	```rust
	// Compute Shader
	
	struct GlobalState {
		deltaT : f32,,
	}
	@group(0) @binding(0) var<uniform> globalState : GlobalState;
	
	struct Particle {
		pos : vec2<f32>,
		vel : vec2<f32>,
	}
	@group(0) @binding(1) var<storage, read> particlesIn : array<Particle>;
	@group(0) @binding(2) var<storage, read_write> particlesOut : array<Particle>;
	
	@compute @workgroup_size(64)
	fn main(@builtin(global_invocation_id) GlobalInvocationID : vec3<u32>) {
		let index : u32 = GlobalInvocationID.x;
	
		let vPos = particlesIn[index].pos;
		let vVel = particlesIn[index].vel;
	
		particlesOut[index].pos = vPos + (vVel * globalState.deltaT);
		particlesOut[index].vel = vVel + (vec3(0.0, 0.0, -9.8) * 
	 globalState.deltaT);
	}
	```
- Pipelines
	- Comes in GPURenderPipeline and GPUComputePipeline flavors
	- Links WGSL shaders (via GPUShaderModules)
	- GPURenderPipeline sets majority of relevant state for rendering
	- Immutable after creation
- Queue
	- Device has a default GPUQueue
	- Used to submit commands for the GPU.
- BindGroups
	- Exposing resources to shaders
		- Values from your program get into shaders via
			- A binding
			- vertex attribute
		- The binding need to be declared in two places
		- Binding are each associated with a group, and a binding number of your choice

### Performance
- Minimize the number of pipelines
	- More pipelines == more state switching == less performance
- Create pipelines in advance
	- `PipelineAsync` variant
- Use RenderBundles
	- Render bundles are pre recorded, partial, reusable, render passes.
	- They can contain most rendering commands
	- Can be "replayed" as part of an actual render pass later on.


Native Debugging tools
- renderdocs
- pix
### Resources
- [WebGPU Samples](https://github.com/austinEng/webgpu-samples) - Written by members of the Chrome team
- [Raw WebGPU](https://alain.xyz/blog/raw-webgpu) - A great introductory tutorial
- [All the cores, none of the canvas](https://surma.dev/things/webgpu/) - Compute-focused introduction
- [Efficiently rendering glTF models](https://toji.github.io/webgpu-gltf-case-study/) - Focuses on efficient WebGPU patterns
- [WebGPU best practices](https://github.com/toji/webgpu-best-practices) - Some targeted best practice advice for specific APIs 
- [WebGPU Spec](https://gpuweb.github.io/gpuweb/), [WGSL Spec](https://gpuweb.github.io/gpuweb/wgsl/) - For a bit of light reading
- [Babylon.js](https://doc.babylonjs.com/setup/support/webGPU), [Three.js](https://threejs.org/examples/?q=WebGPU),  - Libraries with WebGPU support**

Videos
<iframe width="560" height="315" src="https://www.youtube.com/embed/Hm2_bH_8j3k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>