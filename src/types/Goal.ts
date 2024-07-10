import React from "react";

export interface Goal {
  id?: number;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: any;
  savingsAmount: number;
  savingsPeriod: string;
  overdued?:boolean;
  completed?:boolean;
}
