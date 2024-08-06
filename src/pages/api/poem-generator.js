import Replicate from "replicate";

export default async function handler(req, res) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const output = await replicate.run(
      "replicate/llama70b-v2-chat:e951f18578850b652510200860fc4ea62b3b16fac280f83ff32282f87bbd2e48",
      {
        input: {
          prompt: `
          User: Can you write a poem about ${req.body.prompt}\n
          Assistant: `,
        },
      }
    );
    res.status(200).json({ poem: output });
  } catch (error) {
    console.error("AI poem generation failed:", error);
    res.status(500).json({ error: "AI poem generation failed" });
  }
}