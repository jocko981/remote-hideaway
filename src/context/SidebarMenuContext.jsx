import { createContext, useContext, useEffect, useState } from "react";

const SidebarMenuContext = createContext();

function SidebarMenuContextProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleOpenMenu() {
    setIsMenuOpen((open) => !open);
  }

  function closeOpenMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    window.addEventListener("resize", closeOpenMenu);

    return () => {
      window.removeEventListener("resize", closeOpenMenu);
    };
  }, []);

  return (
    <SidebarMenuContext.Provider value={{ isMenuOpen, toggleOpenMenu, closeOpenMenu }}>
      {children}
    </SidebarMenuContext.Provider>
  );
}

function useSidebarMenuContext() {
  const context = useContext(SidebarMenuContext);

  if (context === undefined) {
    throw new Error("SidebarMenuContext was used outside SidebarMenuContextProvider");
  }

  return context;
}

export { SidebarMenuContextProvider, useSidebarMenuContext };
