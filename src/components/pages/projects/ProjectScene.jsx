"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useTexture } from "@react-three/drei";
import ProjectData from "./ProjectsData";
// import VertexShader from "@/components/shaders/project/VertexShader.glsl";
// import FragmentShader from "@/components/shaders/project/FragmentShader.glsl";
import {FragmentShader, VertexShader} from "@/components/shaders/project/WaterEffectShader.jsx"

const MeshItem = ({ domElement, index, image }) => {
  const meshRef = useRef();
  const MeshMaterial = useRef();
  const isAnimated = useRef(false);
  const [IntractionActive, SetIntractionActive] = useState(false);

  // LOAD IMAGE TEXTURE
  const texture = useTexture(image);

  // SHADER UNIFORMS
  const uniforms = useMemo(() => {
    return {
      uTexture: {
        value: texture,
      },

      uPlaneResolution: {
        value: [1, 1],
      },

      uImageResolution: {
        value: [texture.image?.width || 1, texture.image?.height || 1],
      },

      // NEW
      uMouse: {
        value: { x: 0.5, y: 0.5 },
      },

      uHover: {
        value: 0,
      },

      uTime: {
        value: 0,
      },
    };
  }, [texture]);

  // STORE TARGET POSITION
  const target = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!meshRef.current || !domElement) return;

    const rect = domElement.getBoundingClientRect();

    // FIND IMAGE CENTER
    const targetX = rect.left + rect.width / 2 - window.innerWidth / 2;
    const targetY = -(rect.top + rect.height / 2) + window.innerHeight / 2;

    // SAVE TARGET
    target.current.x = targetX;
    target.current.y = targetY;

    // START FROM CENTER
    meshRef.current.position.x = 0;
    meshRef.current.position.y = 0;
    MeshMaterial.current.opacity = 0;

    const PreProjectTL = gsap
      .timeline
      // {delay: index * 0.2}
      ();

    PreProjectTL.to(MeshMaterial.current, {
      opacity: 1,
      duration: 1,
      ease: "none",
    });

    // GSAP ENTRANCE ANIMATION
    PreProjectTL.to(meshRef.current.position, {
      x: targetX,
      y: targetY,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimated.current = true;
      },
    });

    setTimeout(() => {
      SetIntractionActive(true);
    }, 2000);
  }, []);

  // RUNS EVERY FRAME
  // useFrame(() => {
  //   if (!meshRef.current || !domElement) return;

  //   const rect = domElement.getBoundingClientRect();

  //   // UPDATE TARGET POSITION
  //   target.current.x = rect.left + rect.width / 2 - window.innerWidth / 2;
  //   target.current.y = -(rect.top + rect.height / 2) + window.innerHeight / 2;

  //   if (isAnimated.current) {
  //     meshRef.current.position.x = target.current.x;
  //     meshRef.current.position.y = target.current.y;
  //   }

  //   // MATCH SIZE
  //   meshRef.current.scale.x = rect.width;
  //   meshRef.current.scale.y = rect.height;
  // }, []);

  useFrame((state) => {
    if (!meshRef.current || !domElement) return;

    uniforms.uTime.value = state.clock.elapsedTime;

    const rect = domElement.getBoundingClientRect();

    target.current.x = rect.left + rect.width / 2 - window.innerWidth / 2;

    target.current.y = -(rect.top + rect.height / 2) + window.innerHeight / 2;

    if (isAnimated.current) {
      meshRef.current.position.x = target.current.x;
      meshRef.current.position.y = target.current.y;
    }

    meshRef.current.scale.x = rect.width;
    meshRef.current.scale.y = rect.height;

    // IMPORTANT
    uniforms.uPlaneResolution.value = [rect.width, rect.height];
  });

  return (
    <mesh
      ref={meshRef}
      onPointerMove={(e) => {
        if (IntractionActive === true) {
          // UV position of mouse on plane
          if (!e.uv) return;

          uniforms.uMouse.value.x = e.uv.x;
          uniforms.uMouse.value.y = e.uv.y;

          // smooth enter
          gsap.to(uniforms.uHover, {
            value: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      }}
      onPointerEnter={() => {
        if (IntractionActive === true) {
          gsap.to(uniforms.uHover, {
            value: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }}
      onPointerLeave={() => {
        if (IntractionActive === true) {
          gsap.to(uniforms.uHover, {
            value: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      }}
    >
      <planeGeometry args={[1, 1, 40, 40]} />
      <shaderMaterial
        ref={MeshMaterial}
        uniforms={uniforms}
        vertexShader={VertexShader}
        fragmentShader={FragmentShader}
        transparent
      />
    </mesh>
  );
};

const MeshMaper = () => {
  const elements = document.querySelectorAll(".ProjectImgCont");

  return (
    <>
      {[...elements].map((el, index) => (
        <MeshItem
          key={index}
          domElement={el}
          index={index}
          image={ProjectData[index].OuterImg}
        />
      ))}
    </>
  );
};

const ProjectScene = () => {
  return <MeshMaper />;
};

export default ProjectScene;
