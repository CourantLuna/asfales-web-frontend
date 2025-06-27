import LandingPage from "@/components/landing/LandingPage"
import SearchResultsPanel from "@/components/landing/sections/SearchResultsPanel";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
interface HomePageProps {
  children?: React.ReactNode;
}

export default function Page({ children }: HomePageProps) {
  return (
  <LandingPage>
     <div className="p-4">
      <BreadcrumbNav />
      <div className="mt-4">
            {children}

      </div>
    </div>
  </LandingPage>
);
}
