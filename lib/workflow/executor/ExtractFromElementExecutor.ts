import { ExecutionEnvironment } from "@/types/executor.types";
import { ExtractTextFromElement } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      return false;
    }
    const html = environment.getInput("HTML");
    if (!html) {
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      console.error("🔴Element not found");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      console.error("🔴Element not found");
      return false;
    }

    environment.setOutput("Extracted Text", extractedText);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
