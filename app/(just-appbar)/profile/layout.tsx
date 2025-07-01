export default function ProfileLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      
    <div className="w-full h-full mx-auto py-8 mt-[64px]">
       <div className="md:hidden mb-4  w-full">
              <h1 className="text-2xl font-semibold mx-4 text-secondary ">Notificaciones</h1>
      </div>
        <div>{children}</div>
    </div>
   );
}