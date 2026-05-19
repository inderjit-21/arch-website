"use client";
import ProjectData from "@/components/pages/projects/ProjectsData";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const OpenProject = () => {
  const [ProjectNo, SetProjectNo] = useState(0);
  const containerRef = useRef([]);
  const NumberRef = useRef(null);

  const params = useParams();

  useEffect(() => {
    SetProjectNo(params.index);

    
    const OPTL = gsap.timeline()
    OPTL.fromTo(
      ".CoverOpenProjectDiv",
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        stagger: 0.08,
        delay: 0.3,
        ease: "power4.inOut",
      }, 'OP1'
    );
    OPTL.fromTo(
      ".OpenProjectimage",
      { scale:1.5 },
      {
        scale:1,
        duration: 1.4,
        stagger: 0.08,
        delay: 0.3,
        ease: "power4.inOut",
      },'OP1'
    );
    OPTL.fromTo(
      ".CoverOpenProjectDivNumbering",
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        delay: 1.8,
        duration: 0.5,
        ease: "power2.out",
      },'OP1'
    );

    containerRef.current.forEach((img, index) => {
      gsap.fromTo(
        img,
        {
          y: "-20%",
        },
        {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Number Animation
      ScrollTrigger.create({
        trigger: img.parentElement,
        start: "top center",
        end: "bottom center",

        onEnter: () => {
          gsap.to(NumberRef.current, {
            y: `-${index * 1.2}rem`,
            duration: 0.6,
            ease: "power3.out",
          });
        },

        onEnterBack: () => {
          gsap.to(NumberRef.current, {
            y: `-${index * 1.2}rem`,
            duration: 0.6,
            ease: "power3.out",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [params]);

  return (
    <div className="w-full min-h-svh BgColorMain relative">
      {ProjectData[ProjectNo].Project.map((data, index) => {
        return (
          <div
            key={index}
            className="w-full h-svh CoverOpenProjectDiv overflow-hidden will-change-transform"
          >
            <img
              ref={(el) => (containerRef.current[index] = el)}
              src={data.URL}
              alt="img"
              className="w-full h-[120%] OpenProjectimage object-center object-cover will-change-transform"
            />
          </div>
        );
      })}

      <div className="fixed CoverOpenProjectDivNumbering will-change-transform bottom-[10%] left-0 w-full h-fit flex justify-center items-center ">
        <div className=" BgColorMain w-[80vw] sm:w-[30vw] h-fit px-[4vw] py-[4vw] sm:px-[2vw]  sm:py-[2vh] flex justify-between items-center">
          <p className="TextColorMain font-semibold tracking-tighter text-[1.2rem] leading-[1.2rem]">
            {ProjectData[ProjectNo].Name}
          </p>

          <div className="TextColorMain flex tracking-tighter  text-[1.2rem] leading-[1.2rem]">
            <div className="w-fit h-[1.2rem] overflow-hidden ">
              <div ref={NumberRef} className="w-fit h-fit flex flex-col will-change-transform">
                {ProjectData[ProjectNo].Project.map((item, index) => {
                  return (
                    <div key={index} className="w-fit h-fit mr-1 will-change-transform">
                      {item.id}
                    </div>
                  );
                })}
              </div>
            </div>{" "}
            / {ProjectData[ProjectNo].Project.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenProject;
