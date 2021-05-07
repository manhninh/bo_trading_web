export type LangType = {
  id: string;
  name: string;
  icon: any;
};

export type State = {
  currentLang: LangType;
  listLang: LangType[];
};
