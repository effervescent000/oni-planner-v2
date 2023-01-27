import { createContext } from "react";
import type { PlannerContextType } from "~/types/interfaces";

const PlannerContext = createContext<PlannerContextType>({
  saveData: {},
  setSaveData: () => {},
});

export default PlannerContext;
