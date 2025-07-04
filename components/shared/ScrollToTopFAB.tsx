// "use client";

// import { useState, useEffect } from "react";
// import { ArrowUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// interface ScrollToTopFABProps {
//   threshold?: number; // Distancia en px para mostrar el FAB
//   duration?: number; // Duración de la animación de scroll
//   className?: string;
// }

// export function ScrollToTopFAB({ 
//   threshold = 300, 
//   duration = 800,
//   className = ""
// }: ScrollToTopFABProps) {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   // Prevent hydration mismatch by only rendering after mount
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!isMounted) return;

//     const toggleVisibility = () => {
//       if (window.scrollY > threshold) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, [threshold, isMounted]);

//   const scrollToTop = () => {
//     if (typeof window === "undefined") return;

//     const currentY = window.scrollY;
//     const start = currentY;
//     const startTime = performance.now();

//     const animate = (time: number) => {
//       const elapsed = time - startTime;
//       const progress = Math.min(elapsed / duration, 1);
      
//       // Easing function para un efecto más suave
//       const easeInOut = progress < 0.5 
//         ? 2 * progress * progress 
//         : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
//       window.scrollTo(0, start * (1 - easeInOut));
      
//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   };

//   // Don't render anything until mounted to prevent hydration issues
//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div
//       className={cn(
//         // Use CSS media queries for mobile detection to avoid hydration issues
//         "fixed bottom-20 right-4 z-40 transition-all duration-300 ease-in-out",
//         "block md:hidden", // Only show on mobile using CSS
//         isVisible 
//           ? "opacity-100 translate-y-0 scale-100" 
//           : "opacity-0 translate-y-4 scale-90 pointer-events-none",
//         className
//       )}
//     >
//       <Button
//         onClick={scrollToTop}
//         size="icon"
//         className={cn(
//           // Estilo FAB - circular y elevado
//           "h-12 w-12 rounded-full shadow-lg hover:shadow-xl",
//           "bg-primary hover:bg-primary/90 text-secondary",
//           "transition-all duration-200 ease-in-out",
//           "hover:scale-110 active:scale-95",
//           // Efecto de resplandor sutil
//           "ring-2 ring-primary/20 hover:ring-primary/30"
//         )}
//         aria-label="Scroll to top"
//       >
//         <ArrowUp className="h-5 w-5" />
//       </Button>
//     </div>
//   );
// }
