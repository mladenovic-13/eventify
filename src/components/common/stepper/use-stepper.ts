import * as React from "react";

import { StepperContext } from "./context";

export function useStepper() {
  const context = React.useContext(StepperContext);

  if (context === undefined) {
    throw new Error("useStepper must be used within a StepperProvider");
  }

  const { ...rest } = context;

  const isLastStep = context.activeStep === context.steps.length - 1;
  const hasCompletedAllSteps = context.activeStep === context.steps.length;

  const currentStep = context.steps[context.activeStep];
  const isOptionalStep = !!currentStep?.optional;

  const isDisabledStep = context.activeStep === 0;

  return {
    ...rest,
    isLastStep,
    hasCompletedAllSteps,
    isOptionalStep,
    isDisabledStep,
    currentStep,
  };
}