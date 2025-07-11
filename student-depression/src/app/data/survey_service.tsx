
export class SurveyService {
    static API_URL: string = 'https://studentdepression-api.onrender.com';

    static async requestFeedback(responses: number[]) {
        try {
            const response = await fetch(`${this.API_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    features: responses,
                }),
            });

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