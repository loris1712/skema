import {GoogleGenerativeAI, SchemaType} from '@google/generative-ai';
import {
  GoogleGenAI,
} from "@google/genai";
import {MINDMAP_AI_PROMPT} from '@/constants/Prompts';
import * as Crypto from 'expo-crypto';

const API_KEY = 'AIzaSyDcdvHn7mQ5zMNwlh5e52ZCqBSdQz3GdWM';
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

    console.log(response)

    return response.text;
  }catch (e) {
    console.log("GEMINI ERROR", {e})
  }
}

export const geminiAudioCleanUp = async (text: string, type: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [
            { text },
            { text: "Questa è una trascrizione letterale di un audio di una lezione fatta in classe, trasformalo in un testo con solo contenuto informativo, come se fosse un libro e non devi parlare tu." },
          ],
        },
      ],
    });

    return response.text;
  } catch (e) {
    console.log("GEMINI ERROR", { e });
    throw e;
  }
};

export const geminiAudioComparison = async (text: string, type: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [
            { text },
            { text: "Fai confronto ed integra aggiungendo al testo precedente informazioni con siti scientifici. Usa manuale MSD se il testo è di medicina, altrimenti usa altri siti scientifici. Elimina le tue parole di risposta." },
          ],
        },
      ],
    });

    return response.text;
  } catch (e) {
    console.log("GEMINI ERROR", { e });
    throw e;
  }
};