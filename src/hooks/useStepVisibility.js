import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function useStepVisibility(stepRegistry) {
  const { control } = useFormContext();
  const formData = useWatch({ control });

  const visibleSteps = useMemo(
    () => stepRegistry.filter((step) => step.isVisible(formData ?? {})),
    [stepRegistry, formData],
  );

  return { visibleSteps, formData: formData ?? {} };
}
