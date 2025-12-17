export interface PreScreenRequest {
  loanApplicationId: number;
  sectorId: number;
  productId: number;
  loanAmount: number;
  country?: string;
}

export interface EsgAiRecommendationDTO {
  loanApplicationId: number;
  stage: string; // e.g., "PRE_SCREEN" or "FINAL"
  riskLevel: number; // e.g., 1 = Low, 2 = Medium, 3 = High
  recommendation: string; // textual AI advice
  confidence: number; // 0.0 - 1.0
  payload?: string; // optional serialized request or other metadata
}