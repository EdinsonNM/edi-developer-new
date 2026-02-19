import { createContext, useCallback, useMemo, useState } from "react";
import { HomeAnimationStates } from "./utils/constants";
import useDarkMode from "@presentation/utils/use-dark-mode";

const LayoutContext = createContext<{
  background?: string;
  setBackground?: (color: string) => void;
  page: string;
  changePage?: (page: string) => void;
  isDark?: boolean;
  toggleDarkMode?: () => void;
}>({ page: HomeAnimationStates.PAGE1 });
type ContextProvider = {
  children: React.ReactNode;
};

export const LayoutContextProvider = ({ children }: ContextProvider) => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [background, setBackground] = useState("transparent");
  const [page, setPage] = useState(HomeAnimationStates.PAGE0);
  const changePage = useCallback((page: string) => {
    setPage(page);
  }, []);

  const memoizedSetBackground = useCallback((color: string) => {
    setBackground(color);
  }, []);

  const contextValue = useMemo(
    () => ({
      background,
      setBackground: memoizedSetBackground,
      page,
      changePage,
      isDark,
      toggleDarkMode,
    }),
    [
      background,
      memoizedSetBackground,
      page,
      changePage,
      isDark,
      toggleDarkMode,
    ]
  );
  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
