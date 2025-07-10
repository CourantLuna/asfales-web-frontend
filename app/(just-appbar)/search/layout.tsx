import FooterMobile from "@/components/shared/FooterMobile";

export default function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
    <div className="w-full mx-auto pt-5 flex-1 min-h-0 flex flex-col">

   <div>{children}</div>
         <FooterMobile />
       </div>

);
}