"use client";
import { useEffect, useRef, useState } from "react";
import ProjectData from "./ProjectsData";
import { HiArrowTurnDownLeft } from "react-icons/hi2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const ProjectStructure = () => {
  const ProjectMainCont = useRef();
  const ProjectWrapContainer = useRef();

  useEffect(() => {
    const calculateAndAnimate = () => {
      const wrapWidth =
        ProjectWrapContainer.current.getBoundingClientRect().width;
      const translateX = -(wrapWidth - window.innerWidth);

      const PTL = gsap.timeline({
        scrollTrigger: {
          trigger: ProjectMainCont.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          //   markers: true,
          invalidateOnRefresh: true,
        },
      });
      if (window.innerWidth < 780) {
        PTL.to(
          ProjectWrapContainer.current,
          {
            x: translateX - 40,
            ease: "none",
          },
          "a1",
        );
      } else {
        PTL.to(
          ProjectWrapContainer.current,
          {
            x: translateX - 80,
            ease: "none",
          },
          "a1",
        );
      }
      PTL.to(
        ".ProjectProgressWidth",
        {
          width: "100%",
          ease: "none",
        },
        "a1",
      );

      if (window.innerWidth >= 1024) {
        gsap.to(".ProjectTextContName", {
          opacity: 1,
          delay: 2.5,
          duration: 1,
          ease: "none",
        });
        gsap.to(".ProjectTitleFlow", {
          delay: 2.5,
          translateY: "0%",
          stagger: {
            each: 0.1, // one by one delay
          },
          duration: 1,
          ease: "power4.inOut",
        });
      } 
    };

    calculateAndAnimate();

    const handleResize = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(ProjectWrapContainer.current);
      calculateAndAnimate();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={ProjectMainCont}
      className={`w-full h-[400svh] relative BgColorMain  `}
    >
      <div className="w-full h-svh sticky top-0 left-0 overflow-hidden  p-5 flex flex-col justify-between  sm:p-10">
        <div
          ref={ProjectWrapContainer}
          className="w-fit h-fit flex items-start gap-5 pt-[12vh] sm:pt-[7vh]"
        >
          {ProjectData.map((data, index) => (
            <div key={index} className="w-fit h-fit">
              <div
                className={` w-[90vw]  md:w-[45vw] lg:w-[25vw] shrink-0 overflow-hidden ProjectImgCont ${data.Shape}`}
              >
                <img
                  src={data.OuterImg}
                  alt="img"
                  className=" w-full lg:hidden h-full object-cover object-center"
                />
              </div>
              <div className=" ProjectTextContName lg:opacity-0 w-[90vw] max-sm:text-[1.3rem] TextColorMain  md:w-[45vw] lg:w-[25vw] flex gap-5 justify-between tracking-tight items-center h-fit pt-[4vw] sm:pt-[1vw]">
                <div className="flex gap-5 items-center w-fit h-fit ">
                  {data.Name}

                  <HiArrowTurnDownLeft />
                </div>
                {` ${data.id}`}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-fit relative flex justify-between items-center">
          <div className="text-[16vw] leading-[13vw] sm:text-[7vw] sm:leading-[7vw] max-sm:flex max-sm:flex-col flex font-medium tracking-tighter">
            <div className="w-fit h-fit TextColorMain  ">
              {["O", "U", "R"].map((item, index) => {
                return (
                  <span
                    key={index}
                    className="w-fit h-fit inline-block overflow-hidden"
                  >
                    <span className=" ProjectTitleFlow justify-center mr-0.75 items-center w-fit h-fit inline-block lg:translate-y-full ">
                      {item}
                    </span>
                  </span>
                );
              })}
            </div>
            {/* <br className="sm:hidden" /> */}
            <div className="w-fit h-fit ml-[2vw] TextColorMain ">
              {["W", "O", "R", "K", "."].map((item, index) => {
                return (
                  <span
                    key={index}
                    className="w-fit h-fit inline-block justify-center items-center overflow-hidden"
                  >
                    <span className="ProjectTitleFlow justify-center mr-0.75 items-center w-fit h-fit inline-block lg:translate-y-full ">
                      {item}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className=" w-[30vw] sm:w-[20vw] h-1 ProjectTextContName lg:opacity-0 bg-[#e2e2e2] rounded-full overflow-hidden">
            <div className="ProjectProgressWidth w-0 h-full BgColorSec" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStructure;
