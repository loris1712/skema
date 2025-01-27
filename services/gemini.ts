import  {
    GoogleGenerativeAI,
    Schema,
    SchemaType,
} from '@google/generative-ai';
import {MINDMAP_AI_PROMPT} from "@/constants/Prompts";

const API_KEY = "AIzaSyC1YWP0X0cMClsJVSGosWzp-I_OBc8h6eM"
const genAI = new GoogleGenerativeAI(API_KEY);

const schema = {
    description: 'List of mind maps',
    type: SchemaType.ARRAY,
    items: {
        type: SchemaType.OBJECT,
        properties: {
            id: {
                type: SchemaType.STRING,
            },
            label: {
                type: SchemaType.STRING,
            },
            connections: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING,
                },
            },
        },
    },
};

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
    },
});

export const geminiRequest = async (fileBuffer: any) => {
    const result = await model.generateContent([
        {
            inlineData: {
                data: fileBuffer.toString('base64'),
                mimeType: 'application/pdf',
            },
        },
        `${MINDMAP_AI_PROMPT}`,
    ]);
    return result.response.text();
};