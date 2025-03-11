import { ExecutionEnvironment } from "@/types/executor.types";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import ollama from "ollama";

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
    }

    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("input->content not defined");
    }

    //get user credentials from DB
    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });
    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      environment.log.error("cannot decrypt credentials");
      return false;
    }

    const response = await ollama.chat({
      model: "llama3.2:1b",
      messages: [
        {
          role: "system",
          content:
            "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text.",
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
      format: "json",
    });

    environment.log.info(
      `Prompt evaluation count: ${response.prompt_eval_count}`
    );
    environment.log.info(`Evaluation count: ${response.eval_count}`);

    const result = response.message.content;
    if (!result) {
      environment.log.error("empty response from AI");
      return false;
    }

    environment.setOutput("Extracted data", result);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
