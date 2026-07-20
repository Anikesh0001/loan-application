import { useFormContext } from 'react-hook-form';
import RadioGroup from '../common/RadioGroup';
import { LOAN_TYPE_LABELS, LOAN_TYPES } from '../../utils/constants';

const LOAN_TYPE_OPTIONS = Object.values(LOAN_TYPES).map((type) => ({
  value: type,
  label: LOAN_TYPE_LABELS[type],
}));

export default function Step1LoanType() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">
        What kind of loan are you looking for?
      </h2>
      <RadioGroup
        label="Loan type"
        options={LOAN_TYPE_OPTIONS}
        required
        error={errors.loanType?.message}
        {...register('loanType')}
      />
    </div>
  );
}
