import { Browser } from "puppeteer";
import { WorkflowTask } from "./workflow.types";

export type Environment = {
  browser?: Browser;
  //phases with nodeId/taskId as key
  phases: {
    [key: string]: {
      //key: nodeId/taskId
      inputs: Record<string, string>;
      ouputs: Record<string, string>;
    };
  };
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
};
