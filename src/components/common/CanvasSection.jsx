"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import ProjectScene from "../pages/projects/ProjectScene";
import { usePathname } from "next/navigation";

const CanvasSection = () => {
  const Distance = 400;
  const [Fov, SetFov] = useState(75);
  const [eventSource, setEventSource] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const PageURl = usePathname();

  useEffect(() => {
    setEventSource(document.body);
    const CalculateFov = () => {
      const newFov =
        2 * Math.atan(window.innerHeight / 2 / Distance) * (180 / Math.PI);
      SetFov(newFov);
    };

    const handleScreen = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    CalculateFov();
    handleScreen();

    window.addEventListener("resize", CalculateFov);
    window.addEventListener("resize", handleScreen);
    return () => {
      window.removeEventListener("resize", CalculateFov);
      window.removeEventListener("resize", handleScreen);
    };
  }, []);

  // Hide canvas completely on mobile & tablet
  if (!isDesktop) return null;

  return (
    <div className="w-full h-svh fixed top-0 left-0 z-20 pointer-events-none">
      <Canvas
        className="w-full h-full "
        eventSource={eventSource}
        eventPrefix="client"
      >
        <PerspectiveCamera makeDefault fov={Fov} position={[0, 0, Distance]} />

        {/* PROJECTS */}
        {PageURl === "/projects" && <ProjectScene />}
      </Canvas>
    </div>
  );
};

export default CanvasSection;
