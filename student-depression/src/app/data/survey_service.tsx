import { QuestionResponseInterface } from "../model/question";

export class SurveyService {
    static API_URL: string = "https://studentdepression-api.onrender.com/";

    static async requestFeedback(responses: QuestionResponseInterface[]) {
        try {
            const response = await fetch(`${this.API_URL}`);

            console.log("Responses => ", responses)

            if (response.ok) {
                const data = await response.json();
                return data;
            }

            throw new Error(`Error: ${response.status} ${response.statusText}`);
        } catch (error) {
            console.error("Error requesting feedback:", error);
            throw error;
        }
    }
}