import { useFormContext } from 'react-hook-form';
import Input from '../common/Input';
import MaskedInput from '../common/MaskedInput';

export default function Step3Kyc() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">Confirm your identity</h2>
      <Input
        label="Full name (as per PAN)"
        required
        autoComplete="name"
        error={errors.fullName?.message}
        {...register('fullName')}
      />
      <Input
        label="Date of birth"
        type="date"
        required
        autoComplete="bday"
        error={errors.dob?.message}
        {...register('dob')}
      />
      <MaskedInput
        label="PAN number"
        required
        autoComplete="off"
        error={errors.pan?.message}
        {...register('pan')}
      />
      <MaskedInput
        label="Aadhaar number"
        required
        autoComplete="off"
        error={errors.aadhaar?.message}
        {...register('aadhaar')}
      />
    </div>
  );
}
