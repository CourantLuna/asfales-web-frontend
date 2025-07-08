"use client";
import { useEffect, useState } from "react";
import "../../../styles/heroStyles.css";

export default function Hero() {

const [startAnimation, setStartAnimation] = useState(false);
const [hidePlane, setHidePlane] = useState(false);

 useEffect(() => {
  const resetScroll = () => {
      document.body.style.overflow = "hidden";

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  setTimeout(() => {
    requestAnimationFrame(resetScroll);
  }, 0);
  document.body.style.overflow = "hidden";

  const timer = requestAnimationFrame(() => {
    setStartAnimation(true);

    setTimeout(() => {
      setHidePlane(true); // 👈 oculta el avión visualmente
      document.body.style.overflow = "";
    }, 1500);
  });

  return () => cancelAnimationFrame(timer);
}, []);



  useEffect(() => {
  let prevScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > prevScrollY) {
      // console.log(`Bajando... posición actual: ${currentScrollY}`);
    } else {
      // console.log(`Subiendo... posición actual: ${currentScrollY}`);
    }

    prevScrollY = currentScrollY;
  };
  
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


 useEffect(() => {
  const START_SCROLL = 300;
  const REVERSE_SCROLL = 600;
  const MIN_SCALE = 1;
  const MAX_SCALE = 1.2;
  let DURATION = 1500;

  const svgDiv = document.getElementById("decor-svg");
  if (!svgDiv) return;

  let animationStarted = false;
  let reverseAnimationStarted = false;
  let prevScrollY = window.scrollY;

  const animateScale = (fromScale: number, toScale: number) => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const currentScale = fromScale + progress * (toScale - fromScale);
      svgDiv.style.transform = `scale(${currentScale})`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > prevScrollY && scrollY >= START_SCROLL && !animationStarted) {
      animationStarted = true;
      reverseAnimationStarted = false;
      DURATION = 1500;
      animateScale(MIN_SCALE, MAX_SCALE);
    } else if (scrollY < prevScrollY && scrollY <= REVERSE_SCROLL && !reverseAnimationStarted) {
      reverseAnimationStarted = true;
      animationStarted = false;
      DURATION = 500;
      animateScale(MAX_SCALE, MIN_SCALE);
    }

    prevScrollY = scrollY;
  };
  
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);





  return (
    <div className="relative min-h-screen overflow-hidden">


    {/* Avión inicial */}
     <div
  className={`fixed top-1/2 left-0 z-[40] pointer-events-none transform -translate-y-1/2 transition-transform ease-linear ${
    startAnimation
      ? "translate-x-[220vw] md:translate-x-[180vw]"
      : "-translate-x-[220vw] md:-translate-x-[120vw]"
  } ${hidePlane ? "hidden" : ""}`}
  style={{ transitionDuration: "1.4s" }}
>
  <img
    src="/asfales_avion.svg"
    alt="Avión"
    className="scale-[3.2] lg:scale-[4]"
  />
</div>




      {/* SVG de fondo decorativo con marco */}
      <div
        id="decor-svg"
        className="absolute inset-0 z-[1] pointer-events-none origin-center"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1366 768"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M1366 768H0V0H1366V768ZM74 15C60.7452 15 50 25.7452 50 39V729C50 742.255 60.7452 753 74 753H1292C1305.25 753 1316 742.255 1316 729V39C1316 25.7452 1305.25 15 1292 15H74Z"
fill="hsl(var(--primary))"
          />
        </svg>
      </div>

      {/* Contenido del Hero */}
      <section className="relative z-[19] h-[calc(100vh-100px)] flex items-center px-12 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto text-left space-y-6">
<h1 className="text-4xl lg:text-8xl font-extrabold leading-tight">
  <span className="reveal-text">
    Somos
    <span className="highlight highlight-todo"> TODO</span> lo que necesitas para
    <span className="highlight highlight-viajar"> VIAJAR</span>
  </span>
</h1>

          <p className="text-xl 2xl:text-2xl text-foreground max-w-8xl reveal-text">
            Nos encargamos de{" "}
            <a className="underline hover:text-blue-300" href="#">
              llevarte
            </a>
            ,{" "}
            <a className="underline hover:text-blue-300" href="#">
              hospedarte
            </a>
            ,{" "}
            <a className="underline hover:text-blue-300" href="#">
              planificar
            </a>{" "}
            contigo y abrirte las puertas a{" "}
            <a className="underline hover:text-blue-300" href="#">
              experiencias
            </a>{" "}
            únicas
          </p>
        </div>
      </section>

      {/* SVG decorativo inferior */}
      <div className="absolute -bottom-[40px] left-[-11%] w-[120%] md:w-full h-[370px] 2xl:h-[170px] 2xl:w-full md:left-[0px] z-1 pointer-events-none block md:block">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1214 133"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M951.055 0C958.66 0 965.982 2.88891 971.539 8.08203L1016.39 50L1062.81 92.1982C1068.33 97.2184 1075.53 100 1082.99 100H1186.89C1198.38 100 1208.35 93.5464 1213.39 84.0693V109C1213.39 122.255 1202.65 133 1189.39 133H0.391602V89.0586C5.89662 95.7425 14.2344 100 23.5586 100H146.636C153.893 99.9999 160.903 97.3692 166.369 92.5957L263.914 7.4043C269.38 2.63076 276.391 7.39778e-05 283.647 0H951.055Z"
            fill="#0057A3"
          />
        </svg>
      </div>
    </div>
  );
}
