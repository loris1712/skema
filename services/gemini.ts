import {GoogleGenerativeAI, SchemaType} from '@google/generative-ai';
import {
  GoogleGenAI,
} from "@google/genai";
import {MINDMAP_AI_PROMPT} from '@/constants/Prompts';
import * as Crypto from 'expo-crypto';


const API_KEY = 'AIzaSyC1YWP0X0cMClsJVSGosWzp-I_OBc8h6eM';
const genAI = new GoogleGenerativeAI(API_KEY);
const ai = new GoogleGenAI({ apiKey: API_KEY });


const schema = {
  description: 'List of mind maps',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      id: {
        type: SchemaType.STRING,
      },
      type: {
        type: SchemaType.STRING,
      },
      label: {
        type: SchemaType.STRING,
      },
      content: {
        type: SchemaType.STRING
      },
      connections: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
      }
    },
  },
};

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: schema,
  },
});


export const getFileHash = async (fileData: any) => {
  return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      fileData,
  );
}

export const geminiFileRequest = async (fileBuffer: any) => {
  console.log('FILE RECEIVED - Submitting');
  try {
    const result = await model.generateContent([
      {
        inlineData: {
          data: fileBuffer,
          mimeType: 'application/pdf',
        },
      },
      `${MINDMAP_AI_PROMPT}`,
    ]);
    return result.response.text();
  } catch (e) {
    console.log("GEMINI ERROR", {e})
    return null
  }
};


export const geminiAudioRequest = async (base64: any, type: string) => {
  try{
    console.log("Transcribe this audio clip to text. Remove unnecessary contingent words said by the professor in class; focus only on the lesson topics.")
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: base64,
                mimeType: type || 'audio/wav',
              },
            },
            { text: "Transcribe this audio into clear and structured text. Remove filler words, interjections, and unrelated classroom chatter." },
          ],
        },
      ],
    });
    return response.text;
  }catch (e) {
    console.log("GEMINI ERROR", {e})
  }
}
