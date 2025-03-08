import { TaskType } from "@/types/task.types";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { WorkflowTask } from "@/types/workflow.types";
import { ExecutionEnvironment } from "@/types/executor.types";
import { ExtractFromElementExecutor } from "./ExtractFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
};
