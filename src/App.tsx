import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Bloom, DotScreen, EffectComposer } from "@react-three/postprocessing";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ChromaticAberration , Glitch } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'

function App() {
  const gltf = useLoader( GLTFLoader, "/appartement/scene.gltf")

  return (
    <>
      <div style={{
        width: "100%",
        height:"100vh"
         }}>
        <Canvas>
          <perspectiveCamera/>
          <OrbitControls />
          <EffectComposer>
            <>
            <Bloom
              intensity={1.0} // The bloom intensity.
              blurPass={undefined} // A blur pass.
              luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
              mipmapBlur={false} // Enables or disables mipmap blur.
            />
             <ChromaticAberration
              blendFunction={BlendFunction.NORMAL} // blend mode
              offset={[0.001, 0.002]} // color offset
            />
            {/* <DotScreen
              blendFunction={BlendFunction.NORMAL} // blend mode
            /> */}
            {/* <Glitch
                delay={[1.5, 3.5]} // min and max glitch delay
                duration={[0.6, 1.0]} // min and max glitch duration
                strength={[0.3, 1.0]} // min and max glitch strength
                mode={GlitchMode.SPORADIC} // glitch mode
                active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
              /> */}
            </>
          </EffectComposer>


          <directionalLight intensity={1} position={[5,10,5]} castShadow />
          <directionalLight intensity={1} color={"blue"} position={[2,3,5]} castShadow />
          {/* <ambientLight intensity={3} color={"#fff"}/> */}

          <Environment preset="night"/>
          <primitive object={gltf.scene}/>
          <mesh>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={"white"}/>
          </mesh>
        </Canvas>
      </div>
    </>
  )
}

export default App
