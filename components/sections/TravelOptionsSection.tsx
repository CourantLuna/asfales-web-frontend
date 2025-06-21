import TravelOptionsTabs from "@/components/TravelOptionsTabs"

export default function TravelOptionsSection() {
  return (
<section className="relative w-full flex justify-center py-4">
      {/* Fondo SVG decorativo */}
      <div className="absolute z-[-1] top-0 right-0 left-0 h-[90px] md:h-[110px]">
        <svg
          width="1366"
          height="106"
          viewBox="0 0 1366 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M1366 98.1416H944.737C937.226 96.1686 930.661 91.3237 926.584 84.4805L897.799 36.165C892.388 27.0835 882.598 21.5195 872.026 21.5195H856V21.5H0V0.200195C0.64623 0.0690155 1.31506 1.39473e-08 2 0H1366V98.1416Z"
            fill="#0057A3"
          />
        </svg>
      </div>

      {/* Tabs interactivos */}
      <div className="w-full px-4 mt-[330px] md:px-8 md:mt-[240px] flex flex-col items-center text-center">
  <TravelOptionsTabs />
</div>

    </section>
  )
}
