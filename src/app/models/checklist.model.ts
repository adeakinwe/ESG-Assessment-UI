export interface ChecklistResponseValue {
  responseValue: number;   // 0 or 1 (Yes/No) OR 1/2/3 (LMH)
  score: number;
  label: string;
}

export interface ChecklistItem {
  checklistItemId: number;
  item: string;
  category: string;
  indicatorType: string;
  weight: number;
  responseTypeId: number;
  responseType: string;
  responses: ChecklistResponseValue[];
}
