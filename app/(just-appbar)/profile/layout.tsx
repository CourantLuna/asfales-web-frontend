import MobileHeader from "@/components/mobile/MobileHeader";
import ProfileSideBar from "@/components/profile/ProfileSideBar";
import FooterMobile from "@/components/shared/FooterMobile";

export default function ProfileLayout({
   children,
}: {
   children: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto md:pt-5 flex-1 min-h-0 flex flex-col">
      <MobileHeader />
      {/* Padding superior para compensar ambos headers: AppNavbar (64px) + MobileHeader (56px) = 120px */}
      <div className="pt-[60px] md:pt-10 py-12 max-w-7xl mx-auto flex-1 flex flex-col">
        <div className="w-full pt-1 pb-2 p-4 lg:p-6 flex-1 flex flex-col">
          <div className="flex flex-col lg:flex-row max-w-7xl mx-auto flex-1">
            <ProfileSideBar />
            <div className="flex-1 lg:ml-5 flex flex-col">{children}</div>
          </div>
        </div>
      </div>
      <FooterMobile />
      {/* <ScrollToTopFAB /> */}
    </div>
  );
}