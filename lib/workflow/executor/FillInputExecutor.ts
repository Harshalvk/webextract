import { ExecutionEnvironment } from "@/types/executor.types";
import { FillInputTask } from "../task/FillInput";

export async function FillInputExecutor(
  environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selectro not defined");
    }

    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("input->value not defined");
    }

    await environment.getPage()!.type(selector, value);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
