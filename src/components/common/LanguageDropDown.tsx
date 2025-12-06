import { ChevronDownIcon } from "../ui/chevron-down";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useAppStore } from "@/stores/useAppStore";
// Importa las banderas
import flagSpain from "@/assets/flag-spain.png";
import flagUSA from "@/assets/flag-usa.png";
import flagFrance from "@/assets/flag-france.png";
import flagHaiti from "@/assets/flag-haiti.png";
import flagItaly from "@/assets/flag-italy.png";
import flagJapan from "@/assets/flag-japan.png";
import flagPortugal from "@/assets/flag-portugal.png";
import flagChina from "@/assets/flag-china.png";

const languages = [
  { code: "es", label: "Español", flag: flagSpain },
  { code: "en", label: "English", flag: flagUSA },
  { code: "fr", label: "Français", flag: flagFrance },
  { code: "ht", label: "Kreyòl", flag: flagHaiti },
  { code: "it", label: "Italiano", flag: flagItaly },
  { code: "ja", label: "日本語", flag: flagJapan },
  { code: "pt", label: "Português", flag: flagPortugal },
  { code: "zh", label: "中文", flag: flagChina },
];

function LanguageDropDown() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-white transition focus:outline-none  hover:-translate-y-0.5 hover:scale-105 hover:opacity-95
    active:scale-97 active:translate-y-0 active:opacity-90
  
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100
    motion-safe:transition-transform"
        >
          <img
            src={languages.find((l) => l.code === language)?.flag}
            alt={languages.find((l) => l.code === language)?.label}
            className="w-5 h-5 rounded-full focus:outline-none"
          />
          <ChevronDownIcon size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Selecciona idioma</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
          {languages.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.code}
              value={lang.code}
              className="focus:outline-none focus:ring-0"
            >
              <span className="flex items-center gap-2">
                <img
                  src={lang.flag}
                  alt={lang.label}
                  className="w-5 h-5 rounded-full"
                />
                {lang.label}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageDropDown;
