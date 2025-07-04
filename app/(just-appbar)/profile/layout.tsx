import MobileHeader from "@/components/mobile/MobileHeader";

export default function ProfileLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="w-full mx-auto md:pt-5">
         <MobileHeader />
         {/* Padding superior para compensar ambos headers: AppNavbar (64px) + MobileHeader (56px) = 120px */}
         <div className="pt-[60px] md:pt-10 py-12 max-w-7xl mx-auto">{children}</div>
      </div>
   );
}