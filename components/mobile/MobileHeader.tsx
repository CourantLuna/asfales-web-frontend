"use client";

import { ArrowLeft, MoreVertical, Share, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";
import { useRouter } from "next/navigation";

interface MobileHeaderProps {
  className?: string;
  customTitle?: string;
  showOnDesktop?: boolean;
  onBackClick?: () => void;
  showMenu?: boolean;
  showSearch?: boolean;
  showShare?: boolean;
  menuItems?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
}

export default function MobileHeader({ 
  className,
  customTitle,
  showOnDesktop = false,
  onBackClick,
  showMenu = false,
  showSearch = false,
  showShare = false,
  menuItems = []
}: MobileHeaderProps) {
  const { routeInfo, goBack } = useMobileNavigation();
  const router = useRouter();

  // Usar título personalizado o el del hook
  const title = customTitle || routeInfo.title;
  const showBackButton = routeInfo.showBackButton;

  const handleGoBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      goBack();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar al clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleSearch = () => {
    router.push('/search');
  };

  return (
    <div className={`
      ${showOnDesktop ? 'block' : 'lg:hidden'} 
      relative fixed top-16 left-0 right-0 z-20 
      bg-white/95 backdrop-blur-sm border-b w-full 
      ${className || ''}
    `}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Lado izquierdo: Botón de volver */}
        <div className="flex items-center">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="p-1 h-8 w-8 flex-shrink-0 hover:bg-gray-100 transition-colors mr-2"
              aria-label="Volver atrás"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Centro: Título */}
        <h1 className="text-xl font-semibold text-secondary text-center flex-1">
          {title}
        </h1>
        
        {/* Lado derecho: Acciones */}
        <div className="flex items-center space-x-1">
          {showSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSearch}
              className="p-1 h-8 w-8 flex-shrink-0 hover:bg-gray-100 transition-colors"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
          
          {showShare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-1 h-8 w-8 flex-shrink-0 hover:bg-gray-100 transition-colors"
              aria-label="Compartir"
            >
              <Share className="h-4 w-4" />
            </Button>
          )}
          
          {showMenu && menuItems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-8 w-8 flex-shrink-0 hover:bg-gray-100 transition-colors"
                  aria-label="Más opciones"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {menuItems.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={item.onClick}>
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}