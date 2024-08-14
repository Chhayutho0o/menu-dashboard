import { THEMES, Theme } from "@/lib/theme";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type ThemesConfig = {
  activeTheme: Theme;
};

const configAtom = atomWithStorage<ThemesConfig>("themes:config", {
  activeTheme: THEMES[0],
});

export function useThemesConfig() {
  const [themesConfig, setThemesConfig] = useAtom(configAtom);

  return { themesConfig, setThemesConfig };
}
