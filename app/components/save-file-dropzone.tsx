import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import type {
  Dupe,
  GenericObject,
  SaveDataStructure,
  World,
} from "~/types/interfaces";

const { parseSaveGame } = require("oni-save-parser");

const SaveFileDropzone = ({
  setSaveData,
}: {
  setSaveData: React.Dispatch<React.SetStateAction<SaveDataStructure>>;
}) => {
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setProcessing(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const parsedSave: GenericObject = parseSaveGame(reader.result, {
          versionStrictness: "none",
        });
        console.log(parsedSave);
        const rawDupes = parsedSave.gameObjects.find(
          (gameObject: GenericObject) => gameObject.name === "Minion"
        ).gameObjects;
        const compiledDupes = buildDupes(rawDupes);
        // const worlds = findWorlds()
        const rawWorlds = parsedSave.gameObjects.find(
          (gameObject: GenericObject) => gameObject.name === "Asteroid"
        ).gameObjects;
        const compiledWorlds = buildWorlds(rawWorlds);
        setSaveData({ dupes: compiledDupes, worlds: compiledWorlds });
      }
      setProcessing(false);
    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);

  function buildWorlds(rawWorlds: GenericObject[]) {
    const compiledWorlds: World[] = [];
    rawWorlds.forEach((worldData, index) => {
      const worldContainer = worldData.behaviors[2].templateData;
      if (worldContainer.isDiscovered) {
        const asteroidGridEntity = worldData.behaviors[3].templateData;
        compiledWorlds.push({
          id: index + 1,
          name: asteroidGridEntity.m_name,
          type: worldContainer.worldName.split("/")[1],
        });
      }
    });
    return compiledWorlds;
  }

  function buildDupes(rawDupes: GenericObject[]) {
    const compiledDupes: Dupe[] = [];
    rawDupes.forEach((rawDupe: GenericObject, index) => {
      const dupeIdentity = rawDupe.behaviors[14].templateData;
      const dupeSkills: GenericObject[] =
        rawDupe.behaviors[5].templateData.saveLoadLevels;
      const dupeMasteries: GenericObject[] =
        rawDupe.behaviors[38].templateData.MasteryBySkillID;
      const dupe = {
        id: index,
        name: dupeIdentity.name,
        type: dupeIdentity.nameStringKey,
        world: 0,
        skills: dupeSkills.reduce((acc, cur) => ({
          ...acc,
          [cur.attributeId]: cur.level,
        })),
        masteries: dupeMasteries.map((mastery) => mastery[0]),
      };
      compiledDupes.push(dupe);
    });
    return compiledDupes;
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const style = { alignItems: "center" };

  return (
    <div>
      <div className="upload-wrapper" {...getRootProps({ style })}>
        <input type="button" {...getInputProps} />
        {processing ? (
          <span>Processing...</span>
        ) : (
          <span>Drop a save file here</span>
        )}
        <div />
      </div>
    </div>
  );
};

export default SaveFileDropzone;
