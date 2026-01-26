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
  explainability?: ExplainabilityItem[];
}

export interface ExplainabilityItem {
  factor: string;
  impact: 'Positive' | 'Neutral' | 'Negative';
  detail: string;
}

export interface EsgExplainabilityDTO {
  loanApplicationId: number;
  itemDetails: {
    checklistItemId: number;
    question: string;
    score: number;
    weight: number;
    contribution: number;
    impact: 'Positive' | 'Neutral' | 'Negative';
  }[];
  flags: string[];
  mitigationHints: string[];
}

export interface MLPredictRequestDTO {
  AGE_GROUP: string;
  YEARS_EMPLOYED_GROUP: string;
  PHONE_CHANGE_GROUP: string;
  REGION_RATING_CLIENT_W_CITY: number;
  REGION_RATING_CLIENT: number;
  EXT_SOURCE_3: number;
  EXT_SOURCE_2: number;
  EXT_SOURCE_1: number;
  FLOORS_MAX_AVG: number;
}
