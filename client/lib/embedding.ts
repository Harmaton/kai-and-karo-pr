// if you need to create custom embeddings
async function embedding(prompt: string) {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: prompt,
        model: "text-embedding-3-large",
        dimensions: 512,
      }),
    });
  
    const result = await response.json();
  
    return result.data[0].embedding;
  }