import type { NextApiRequest, NextApiResponse } from "next";
import { askOpenAI } from "../../lib/openai";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { query } = req.body;

    try {
      const openAi_query = `answer this question, ${query}`;

      const getAnswer = await askOpenAI(openAi_query);

      return res.status(200).json({ message: getAnswer });
    } catch (error) {
      console.error("Error in API route:", error.message);
      return res
        .status(500)
        .json({ message: "Failed to get a response from AI model." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
