export default function ProfileLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      
    <div className="w-full mx-auto">
       <div className="md:hidden mb-4  w-full">
              <h1 className="text-2xl font-semibold mx-4 text-secondary ">Perfil</h1>
      </div>
        <div>{children}</div>
    </div>
   );
}