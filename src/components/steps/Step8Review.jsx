import { useFormContext } from 'react-hook-form';
import Checkbox from '../common/Checkbox';
import { LOAN_TYPE_LABELS } from '../../utils/constants';
import { formatINR } from '../../utils/formatters';

export default function Step8Review() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const [loanType, loanAmount, fullName] = watch(['loanType', 'loanAmount', 'fullName']);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">Review your application</h2>
      <dl className="grid grid-cols-1 gap-3 rounded-md border border-gray-200 p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-gray-500">Loan type</dt>
          <dd className="font-medium text-gray-900">
            {loanType ? LOAN_TYPE_LABELS[loanType] : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Loan amount</dt>
          <dd className="font-medium text-gray-900">
            {loanAmount ? `₹${formatINR(loanAmount)}` : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Applicant name</dt>
          <dd className="font-medium text-gray-900">{fullName || '—'}</dd>
        </div>
      </dl>
      <Checkbox
        label="I confirm the above details are correct and agree to the terms and conditions"
        required
        error={errors.termsAccepted?.message}
        {...register('termsAccepted')}
      />
    </div>
  );
}
