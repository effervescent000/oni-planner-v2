import { useContext } from "react";

import SaveFileDropzone from "~/components/save-file-dropzone";
import PlannerContext from "~/context/planner-context";

export default function Index() {
  const { saveData, setSaveData } = useContext(PlannerContext);
  return (
    <div>
      <SaveFileDropzone setSaveData={setSaveData} />
    </div>
  );
}
