import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {GEMINI_API_KEY} from "@env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import backend from "../../utils/Backend";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
    {
        model: "gemini-1.5-flash"
    }
);

const Index = () => {
    const [text, setText] = useState("");

	useEffect(() => {
        const now = new Date();
        const currentDate = now.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const currentTime = now.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

		backend.post("/api/general_info/", {senior_id: 1})
		.then(async (response) => {
			const data = JSON.stringify(response.data);
            const prompt = `You are talking to an elderly person.
            Current date is ${currentDate} and time is ${currentTime}.
            Talk friendly. Talk Turkish. Give a detailed asummary of what they did this month.
            This is not a conversation, you will only talk once.
            The monthly summary of the elderly person's health and activities is as follows: ${data}`;
            const result = await model.generateContent(prompt);
            console.log(result.response.text());
            setText(result.response.text());
		})
	}, []);

    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
};

export default Index;