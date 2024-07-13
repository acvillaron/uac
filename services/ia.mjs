import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const IaPrompt = async (row) => {
    const prompt = `Quiero que me des información sobre la siguiente tecnica ${row.tipo}, además quiero información del siguiente metodo ${row.metodo} y de lo siguiente ${row.objetivo} todo esto con un enfoque como analista de ciberseguridad, trata de ser consiso, claro y no en pocas lineas. Trata de usar un lenguaje sencillo para personas que no tienen conocimientos en el tema.`;
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4o",
    });

    return completion.choices[0].message.content;   
};
