export type LangType = {
  id: string;
  name: string;
};

export type State = {
  currentLang: LangType;
  listLang: LangType[];
};
