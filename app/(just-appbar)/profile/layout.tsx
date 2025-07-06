import MobileHeader from "@/components/mobile/MobileHeader";
import ProfileSideBar from "@/components/profile/ProfileSideBar";

export default function ProfileLayout({
   children,
}: {
   children: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto md:pt-5">
      <MobileHeader />
      {/* Padding superior para compensar ambos headers: AppNavbar (64px) + MobileHeader (56px) = 120px */}
      <div className="pt-[60px] md:pt-10 py-12 max-w-7xl mx-auto">
        <div className="w-full pt-1 pb-2 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
            <ProfileSideBar />
            <div className="flex-1 lg:ml-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}