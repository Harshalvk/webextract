import { TaskParamType, TaskType } from "@/types/task.types";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElement = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract Text From Element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-primary" {...props} />
  ),
  inputs: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea"
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
    },
  ],
  outputs: [
    {
      name: "Extracted Text",
      type: TaskParamType.STRING,
    },
  ],
};
