const rawText=JSON.parse(localStorage.getItem("AI"))
function cleanAIResponse(rawText) {
    
    // Remove ```json and ``` or any code block symbols
    const cleaned = rawText
      .replace(/^```json\s*/i, '') // Remove starting ```json
      .replace(/^```\s*/i, '')     // In case it's just ``` at start
      .replace(/```$/, '')         // Remove ending ```
      .trim();
    try {
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (error) {
      console.error("❌ Failed to parse AI response:", error);
      return null;
    }
}
  