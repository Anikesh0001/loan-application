import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  FormProvider, useForm, useFormContext,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import STEP_REGISTRY from './stepRegistry';
import ProgressBar from './ProgressBar';
import StepNavigation from './StepNavigation';
import Toast from '../common/Toast';
import useStepVisibility from '../../hooks/useStepVisibility';
import { getSchemaForStep } from '../../schemas/schemaFactory';

const DEFAULT_VALUES = {
  loanType: '',
  loanAmount: null,
  tenureMonths: '',
  purpose: '',
  fullName: '',
  dob: '',
  pan: '',
  aadhaar: '',
  employmentType: '',
  monthlyIncome: null,
  employerOrBusinessName: '',
  pincode: '',
  addressLine1: '',
  city: '',
  state: '',
  residenceType: '',
  coApplicantName: '',
  coApplicantPan: '',
  coApplicantRelationship: '',
  documentsAcknowledged: false,
  termsAccepted: false,
};

function findOriginalIndex(stepId) {
  return STEP_REGISTRY.findIndex((step) => step.id === stepId);
}

function findNearestVisibleStep(visibleSteps, currentStepId) {
  const currentOriginalIndex = findOriginalIndex(currentStepId);
  return visibleSteps.reduce((nearest, step) => {
    const distance = Math.abs(findOriginalIndex(step.id) - currentOriginalIndex);
    const nearestDistance = Math.abs(findOriginalIndex(nearest.id) - currentOriginalIndex);
    return distance < nearestDistance ? step : nearest;
  }, visibleSteps[0]);
}

function WizardShell({ currentStepIdRef }) {
  const methods = useFormContext();
  const [currentStepId, setCurrentStepId] = useState(currentStepIdRef.current);
  const [toastMessage, setToastMessage] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  const stepContainerRef = useRef(null);
  const navigationLockRef = useRef(false);
  const visibleStepsRef = useRef([]);

  const { visibleSteps } = useStepVisibility(STEP_REGISTRY);
  visibleStepsRef.current = visibleSteps;

  // Keep the ref the dynamic resolver reads (see Wizard below) in sync.
  // eslint-disable-next-line no-param-reassign
  currentStepIdRef.current = currentStepId;

  useEffect(() => {
    if (visibleSteps.length === 0) return;
    if (visibleSteps.some((step) => step.id === currentStepId)) return;
    const nearestStep = findNearestVisibleStep(visibleSteps, currentStepId);
    // eslint-disable-next-line no-param-reassign
    currentStepIdRef.current = nearestStep.id;
    setCurrentStepId(nearestStep.id);
  }, [visibleSteps, currentStepId, currentStepIdRef]);

  useEffect(() => {
    const container = stepContainerRef.current;
    if (!container) return;
    const focusable = container.querySelector(
      'input, select, textarea, button, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable) focusable.focus();
  }, [currentStepId]);

  const handleNext = useCallback(async () => {
    if (navigationLockRef.current) return;
    navigationLockRef.current = true;
    setIsBusy(true);
    try {
      const steps = visibleStepsRef.current;
      const idx = steps.findIndex((step) => step.id === currentStepIdRef.current);
      if (idx === -1) return;
      const valid = await methods.trigger(steps[idx].fields);
      if (!valid) return;
      const nextStep = steps[idx + 1];
      if (nextStep) {
        // eslint-disable-next-line no-param-reassign
        currentStepIdRef.current = nextStep.id;
        setCurrentStepId(nextStep.id);
      }
    } finally {
      navigationLockRef.current = false;
      setIsBusy(false);
    }
  }, [methods, currentStepIdRef]);

  const handlePrev = useCallback(() => {
    const steps = visibleStepsRef.current;
    const idx = steps.findIndex((step) => step.id === currentStepIdRef.current);
    if (idx <= 0) return;
    const prevStep = steps[idx - 1];
    // eslint-disable-next-line no-param-reassign
    currentStepIdRef.current = prevStep.id;
    setCurrentStepId(prevStep.id);
  }, [currentStepIdRef]);

  const handleSaveDraft = useCallback(() => {
    setToastMessage('Draft saving will be available once form persistence is added.');
  }, []);

  const handleSubmitClick = useCallback(async () => {
    if (navigationLockRef.current) return;
    navigationLockRef.current = true;
    setIsBusy(true);
    try {
      await methods.handleSubmit(() => {
        setToastMessage('All steps look good — full submission arrives in a later phase.');
      })();
    } finally {
      navigationLockRef.current = false;
      setIsBusy(false);
    }
  }, [methods]);

  const currentIndex = visibleSteps.findIndex((step) => step.id === currentStepId);
  const currentStep = visibleSteps[currentIndex];
  const isFirstStep = currentIndex <= 0;
  const isLastStep = currentIndex === visibleSteps.length - 1;

  if (!currentStep) return null;

  const StepComponent = currentStep.component;

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar steps={visibleSteps} currentStepId={currentStepId} />
      <div ref={stepContainerRef}>
        <StepComponent />
      </div>
      <StepNavigation
        onPrev={handlePrev}
        onNext={isLastStep ? handleSubmitClick : handleNext}
        onSaveDraft={handleSaveDraft}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        nextDisabled={isBusy}
      />
      <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />
    </div>
  );
}

export default function Wizard() {
  const currentStepIdRef = useRef(STEP_REGISTRY[0].id);

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
    resolver: (values, context, options) => {
      const schema = getSchemaForStep(currentStepIdRef.current, values);
      return zodResolver(schema)(values, context, options);
    },
  });

  return (
    <FormProvider {...methods}>
      <WizardShell currentStepIdRef={currentStepIdRef} />
    </FormProvider>
  );
}
