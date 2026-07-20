import { useFormContext } from 'react-hook-form';
import Input from '../common/Input';
import MaskedInput from '../common/MaskedInput';

export default function Step6CoApplicant() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">Co-applicant details</h2>
      <p className="text-sm text-gray-600">
        Based on your loan type and amount, this application needs a
        co-applicant.
      </p>
      <Input
        label="Co-applicant full name"
        required
        autoComplete="name"
        error={errors.coApplicantName?.message}
        {...register('coApplicantName')}
      />
      <MaskedInput
        label="Co-applicant PAN number"
        required
        autoComplete="off"
        error={errors.coApplicantPan?.message}
        {...register('coApplicantPan')}
      />
      <Input
        label="Relationship to applicant"
        required
        autoComplete="off"
        error={errors.coApplicantRelationship?.message}
        {...register('coApplicantRelationship')}
      />
    </div>
  );
}
