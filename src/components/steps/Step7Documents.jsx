import { useFormContext } from 'react-hook-form';
import Checkbox from '../common/Checkbox';

export default function Step7Documents() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">Documents</h2>
      <p className="text-sm text-gray-600">
        Document upload arrives in a later phase. For now, confirm you have
        the required documents ready.
      </p>
      <Checkbox
        label="I have my identity, income, and address proof documents ready"
        required
        error={errors.documentsAcknowledged?.message}
        {...register('documentsAcknowledged')}
      />
    </div>
  );
}
