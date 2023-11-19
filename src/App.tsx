import "./App.css";
import { Suspense, useState } from "react";
import { LoadGLTF } from "./component/load-gltf";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, Stage } from "@react-three/drei";

function App() {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setSelectedFile(objectURL);
  };
  return (
    <Suspense>
      <div className="mt-5">
        <h1> File Upload </h1>{" "}
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />{" "}
        </div>{" "}
        <button type="button" className="btn btn-primary">
          Upload{" "}
        </button>{" "}
        {selectedFile && (
          <>
            <Canvas
              style={{ height: "100vh", width: "100%" }}
              flat
              dpr={[1, 2]}
              camera={{ fov: 50 }}
            >
              <Suspense fallback={null}>
                <Stage preset="rembrandt" intensity={1} environment="city">
                  <LoadGLTF file={selectedFile} />
                </Stage>
              </Suspense>
              <OrbitControls enableRotate={false} />
            </Canvas>
            <Loader />
            {/* <Canvas style={{ height: "100vh", width: "100%" }} flat dpr={[1, 2]} camera={{ fov: 50, position: [-3, 8, 8] }}>
              <ambientLight
                 intensity={0.6}
              />
              <directionalLight />
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                maxDistance={10}
                minDistance={5}
              />
              <PresentationControls snap global zoom={1} azimuth={[-Math.PI / 4, Math.PI / 4]}>
                <Loader />
                <LoadGLTF file={selectedFile} />
              </PresentationControls>
            </Canvas> */}
          </>
        )}{" "}
      </div>
    </Suspense>
  );
}

export default App;
