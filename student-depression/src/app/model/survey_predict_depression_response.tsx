export interface SurveyPredictDepressionResponse {
    prediction: number;
    probability: number[];
    depressionRisk: string;
}