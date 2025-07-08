import MobileHeader from "@/components/mobile/MobileHeader";
import ProfileSideBar from "@/components/profile/ProfileSideBar";
import FooterMobile from "@/components/shared/FooterMobile";

export default function ProfileLayout({
   children,
}: {
   children: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto pt-5 flex-1 min-h-0 flex flex-col">
      {/* Padding superior para compensar ambos headers: AppNavbar (64px) + MobileHeader (56px) = 120px */}
      <div className="md:pt-10 pb-12 flex-1 flex flex-col ">
          <div className="flex flex-col flex-1 justify-start lg:flex-row max-w-7xl mx-auto w-full px-4 lg:px-6">
            <ProfileSideBar />
            <div className="flex-1 lg:ml-5 flex flex-col min-w-0">{children}</div>
          </div>
      </div>
      <FooterMobile />
      {/* <ScrollToTopFAB /> */}
    </div>
  );
}