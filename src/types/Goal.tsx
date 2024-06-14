import React from "react";

export interface Goal {
  id?: number;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: any;
}
