import { Controller, useFormContext } from 'react-hook-form';
import CurrencyInput from '../common/CurrencyInput';
import Input from '../common/Input';
import Select from '../common/Select';
import { EMPLOYMENT_TYPES } from '../../utils/constants';

const EMPLOYMENT_OPTIONS = EMPLOYMENT_TYPES.map((type) => ({ value: type, label: type }));

export default function Step4Employment() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">Your employment and income</h2>
      <Select
        label="Employment type"
        required
        placeholder="Select employment type"
        options={EMPLOYMENT_OPTIONS}
        error={errors.employmentType?.message}
        {...register('employmentType')}
      />
      <Controller
        name="monthlyIncome"
        control={control}
        render={({ field }) => (
          <CurrencyInput
            label="Monthly income"
            required
            error={errors.monthlyIncome?.message}
            {...field}
          />
        )}
      />
      <Input
        label="Employer / business name"
        required
        autoComplete="organization"
        error={errors.employerOrBusinessName?.message}
        {...register('employerOrBusinessName')}
      />
    </div>
  );
}
