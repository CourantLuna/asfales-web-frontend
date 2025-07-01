export default function ProfileLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      
    <div className="w-full mx-auto md:pt-5">
       
        <div>{children}</div>
    </div>
   );
}