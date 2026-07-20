import { useFormContext } from 'react-hook-form';
import Input from '../common/Input';
import RadioGroup from '../common/RadioGroup';
import { RESIDENCE_TYPES } from '../../utils/constants';

const RESIDENCE_OPTIONS = RESIDENCE_TYPES.map((type) => ({ value: type, label: type }));

export default function Step5Address() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">Where do you currently live?</h2>
      <Input
        label="Pincode"
        required
        autoComplete="postal-code"
        error={errors.pincode?.message}
        {...register('pincode')}
      />
      <Input
        label="Address line 1"
        required
        autoComplete="address-line1"
        error={errors.addressLine1?.message}
        {...register('addressLine1')}
      />
      <Input
        label="City"
        required
        autoComplete="address-level2"
        error={errors.city?.message}
        {...register('city')}
      />
      <Input
        label="State"
        required
        autoComplete="address-level1"
        error={errors.state?.message}
        {...register('state')}
      />
      <RadioGroup
        label="Residence type"
        required
        options={RESIDENCE_OPTIONS}
        error={errors.residenceType?.message}
        {...register('residenceType')}
      />
    </div>
  );
}
