/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
});

const openai = new OpenAIApi(configuration);

export const openAI = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      console.log("Querying OpenAI", input);
      const completion = await openai.createCompletion({
        // model: "text-davinci-002",
        model: "text-ada-001",
        prompt: input.text,
        max_tokens: 256,
      });
      console.log(completion.data.choices[0]?.text);
      return {
        response: completion.data.choices[0]?.text,
      };
    }),
});
