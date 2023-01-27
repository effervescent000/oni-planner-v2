import type { ActionArgs } from "@remix-run/node";
import {
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
} from "@remix-run/node";

const { parseSaveGame } = require("oni-save-parser");

export const action = async ({ request }: ActionArgs) => {
  // const body = await request.formData();
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createFileUploadHandler()
  );
  console.log(formData);
};
