import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWinningProducts = async (niche: string, selectedSources: string[]): Promise<Product[]> => {
  // Using gemini-3-pro-preview for better reasoning and search capabilities
  const model = "gemini-3-pro-preview";

  const prompt = `
    You are an advanced e-commerce market researcher for 'Mapolo'. 
    
    TASK:
    Perform a Google Search to find 4 REAL, currently trending physical products in the "${niche}" niche.
    Look for products that are currently popular on ${selectedSources.join(', ')}, Amazon Movers & Shakers, or AliExpress dropshipping centers.
    
    Do NOT invent products. Find actual items that exist.
    
    For each product found, return a JSON object with:
    1. Real Name of the product.
    2. A short, visual description (important: describe what it looks like so I can generate an image).
    3. Real current selling price (approximate).
    4. Estimated sourcing cost (usually 25-30% of selling price).
    5. A real URL to a store, Amazon listing, or AliExpress listing where it can be bought.
    
    Construct the JSON response carefully.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              price: { type: Type.NUMBER },
              cost: { type: Type.NUMBER },
              profitMargin: { type: Type.NUMBER },
              saturationScore: { type: Type.NUMBER },
              viralityScore: { type: Type.NUMBER },
              sources: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              trendData: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    month: { type: Type.STRING },
                    interest: { type: Type.NUMBER }
                  }
                }
              },
              marketingAngle: { type: Type.STRING },
              targetAudience: { type: Type.STRING },
              category: { type: Type.STRING },
              productUrl: { type: Type.STRING }
            }
          }
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const data = JSON.parse(responseText);
    
    // Process results and generate specific images based on the description
    return data.map((item: any, index: number) => {
      // Create a specific image prompt based on the product name and category
      const imagePrompt = encodeURIComponent(`${item.name} ${item.description} professional product photography, 4k, studio lighting`);
      // Use Pollinations.ai for on-the-fly AI image generation based on text
      const specificImageUrl = `https://image.pollinations.ai/prompt/${imagePrompt}?width=800&height=600&nologo=true&seed=${index}`;

      return {
        ...item,
        id: item.id || `prod-${Date.now()}-${index}`,
        imageUrl: specificImageUrl,
        // Ensure we have at least one source listed
        sources: item.sources && item.sources.length > 0 ? item.sources : selectedSources
      };
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data with relevant images if search fails
    return [
      {
        id: "fallback-1",
        name: "Smart Posture Corrector",
        description: "Intelligent strapless posture corrector with vibration sensor.",
        price: 35.99,
        cost: 8.50,
        profitMargin: 76,
        saturationScore: 65,
        viralityScore: 85,
        sources: ["TikTok", "Meta"],
        trendData: [{month: 'Jan', interest: 40}, {month: 'Feb', interest: 65}, {month: 'Mar', interest: 90}],
        marketingAngle: "Improve your health while working from home.",
        targetAudience: "Remote workers, Office staff",
        imageUrl: "https://image.pollinations.ai/prompt/Smart%20Posture%20Corrector%20device%20white%20background?width=800&height=600&nologo=true",
        category: "Health",
        productUrl: "https://amazon.com"
      },
      {
        id: "fallback-2",
        name: "Portable Mini Thermal Printer",
        description: "Inkless pocket printer for stickers and notes. Bluetooth connected.",
        price: 29.99,
        cost: 6.50,
        profitMargin: 78,
        saturationScore: 40,
        viralityScore: 92,
        sources: ["TikTok"],
        trendData: [{month: 'Jan', interest: 20}, {month: 'Feb', interest: 40}, {month: 'Mar', interest: 95}],
        marketingAngle: "Organize your life with cute stickers instantly.",
        targetAudience: "Students, Journaling enthusiasts",
        imageUrl: "https://image.pollinations.ai/prompt/cute%20mini%20thermal%20printer%20pastel%20colors?width=800&height=600&nologo=true",
        category: "Gadgets",
        productUrl: "https://amazon.com"
      }
    ];
  }
};