import { SurveyPredictDepressionResponse } from '../model/survey_predict_depression_response';

export class SurveyService {
    static API_URL: string = 'https://studentdepression-api.onrender.com';

    static async requestFeedback(responses: Record<string, string | number>): Promise<SurveyPredictDepressionResponse> {
        try {
            const response = await fetch(`${this.API_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(responses),
            });

            if (response.ok) {
                const data: SurveyPredictDepressionResponse = await response.json();
                return data
            }

            throw new Error(`Error: ${response.status} ${response.statusText}`);
        } catch (error) {
            throw error;
        }
    }
}