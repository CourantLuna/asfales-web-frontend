import LandingPage from "@/components/landing/LandingPage"
import LandingSections from "@/components/landing/LandingSections";

interface HomePageProps {
  children?: React.ReactNode;
}

export default function Page({ children }: HomePageProps) {
  return (
  <LandingSections></LandingSections>
);
}
