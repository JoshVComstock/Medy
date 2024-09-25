import { LangType } from "@/data/lang/langType";
import { WordsEn } from "@/data/lang/wordsEn";
import { WordsEs } from "@/data/lang/wordsEs";
import { create } from "zustand";

interface State {
  lang: "en" | "es";
  handleChangeLang: (lang: "en" | "es") => void;
}

const langContext = create<State>((set) => ({
  lang: "es",
  handleChangeLang(lang) {
    set((old) => ({ ...old, lang }));
  },
}));

export const useLang = () => {
  const { lang, handleChangeLang } = langContext();

  const translate = (type: LangType) => {
    if (lang === "en") return WordsEn[type];
    return WordsEs[type];
  };

  return { translate, handleChangeLang, lang };
};
