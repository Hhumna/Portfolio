"use client";

import React from "react";

export interface MotionConfigProviderProps {
  children: React.ReactNode;
}

export function MotionConfigProvider({ children }: MotionConfigProviderProps) {
  return <>{children}</>;
}
