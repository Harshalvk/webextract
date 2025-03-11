import { TaskParamType, TaskType } from "@/types/task.types";
import { WorkflowTask } from "@/types/workflow.types";
import { ArrowUp01, LucideProps, MousePointerClick } from "lucide-react";

export const ScrollToElementTask = {
  type: TaskType.SCROLL_TO_ELEMENT,
  label: "Scroll to element",
  icon: (props: LucideProps) => (
    <ArrowUp01 className="stroke-primary" {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
