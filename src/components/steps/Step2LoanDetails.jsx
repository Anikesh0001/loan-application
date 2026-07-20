import { Controller, useFormContext } from 'react-hook-form';
import CurrencyInput from '../common/CurrencyInput';
import Select from '../common/Select';
import { LOAN_PURPOSES, LOAN_TYPES } from '../../utils/constants';

const TENURE_OPTIONS = [12, 24, 36, 48, 60, 84, 120, 180, 240, 300, 360].map((months) => ({
  value: String(months),
  label: `${months} months`,
}));

// Placeholder list; Phase 6 will pick this dynamically per schemaFactory's
// loan-type dependency (see schemas/schemaFactory.js TODO item #3).
const PURPOSE_OPTIONS = LOAN_PURPOSES[LOAN_TYPES.PERSONAL].map((purpose) => ({
  value: purpose,
  label: purpose,
}));

export default function Step2LoanDetails() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">
        Tell us about the loan you need
      </h2>
      <Controller
        name="loanAmount"
        control={control}
        render={({ field }) => (
          <CurrencyInput
            label="Loan amount"
            required
            helpText="Enter the amount in Indian Rupees"
            error={errors.loanAmount?.message}
            {...field}
          />
        )}
      />
      <Select
        label="Tenure"
        required
        placeholder="Select a tenure"
        options={TENURE_OPTIONS}
        error={errors.tenureMonths?.message}
        {...register('tenureMonths')}
      />
      <Select
        label="Purpose"
        required
        placeholder="Select a purpose"
        options={PURPOSE_OPTIONS}
        error={errors.purpose?.message}
        {...register('purpose')}
      />
    </div>
  );
}
