import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, OrbitControls, useGLTF } from '@react-three/drei'
import type { Mesh, MeshStandardMaterial } from 'three'

useGLTF.preload('/models/car-concept.glb')

type PaintMaterial = MeshStandardMaterial & { isPaintClone?: boolean }

function Car({ color }: { color: string }) {
  const { scene } = useGLTF('/models/car-concept.glb')
  const [model] = useState(() => scene.clone(true))

  // Re-walks the live, currently-rendered model on every color change instead of
  // trusting a side ref array to stay in sync with it — that indirection was the
  // source of the "click does nothing" bug. Each paint mesh is cloned exactly
  // once (tagged so we never clone twice) and its color is set directly.
  useEffect(() => {
    model.traverse((child) => {
      const mesh = child as Mesh
      if (!mesh.isMesh || Array.isArray(mesh.material)) return
      let material = mesh.material as PaintMaterial

      if (!material.isPaintClone) {
        if (!material.name || !/^paint/i.test(material.name)) return
        material = material.clone() as PaintMaterial
        material.metalness = 0.85
        material.roughness = 0.22
        material.isPaintClone = true
        mesh.material = material
      }

      material.color.set(color)
    })
  }, [color, model])

  return <primitive object={model} />
}

export default function CarConfigurator({ color }: { color: string }) {
  return (
    <Canvas camera={{ fov: 35 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <Stage environment="studio" intensity={0.55} shadows={{ type: 'contact', opacity: 0.5, blur: 2.5 }} adjustCamera={1.5}>
          <Car color={color} />
        </Stage>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate
        autoRotateSpeed={0.7}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  )
}
