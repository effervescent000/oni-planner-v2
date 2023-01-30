export interface Dupe {
  id: number;
  name: string;
  type: string;
  world: number;
  skills: GenericObject;
  masteries: string[];
}
export interface World {
  id: number;
  name: string;
  type: string;
}

export interface GenericObject {
  [key: string]: any;
}

export interface SaveDataStructure {
  dupes: Dupe[];
  worlds: World[];
}

export interface PlannerContextType {
  saveData: {};
  setSaveData: React.Dispatch<React.SetStateAction<SaveDataStructure>>;
}

export interface RouteType {
  route: string;
  title: string;
}

export interface IUserProfile {
  id: string;
  title?: string;
  active: boolean;
  userId: string;
}

export interface IOption {
  label: string;
  key: string;
}

export interface ITodo {
  key: string;
}
