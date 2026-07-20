import Step1LoanType from '../steps/Step1LoanType';
import Step2LoanDetails from '../steps/Step2LoanDetails';
import Step3Kyc from '../steps/Step3Kyc';
import Step4Employment from '../steps/Step4Employment';
import Step5Address from '../steps/Step5Address';
import Step6CoApplicant from '../steps/Step6CoApplicant';
import Step7Documents from '../steps/Step7Documents';
import Step8Review from '../steps/Step8Review';
import { CO_APPLICANT_THRESHOLDS, LOAN_TYPES } from '../../utils/constants';

function isCoApplicantStepVisible(formData) {
  const { loanType, loanAmount } = formData;
  if (loanType === LOAN_TYPES.HOME) return true;

  const threshold = CO_APPLICANT_THRESHOLDS[loanType];
  if (threshold === undefined) return false;

  // Strictly "exceeds" the threshold — an amount equal to the threshold
  // must NOT make the co-applicant step visible.
  return Number(loanAmount) > threshold;
}

const STEP_REGISTRY = [
  {
    id: 'loan-type',
    title: 'Loan Type',
    component: Step1LoanType,
    fields: ['loanType'],
    isVisible: () => true,
  },
  {
    id: 'loan-details',
    title: 'Loan Details',
    component: Step2LoanDetails,
    fields: ['loanAmount', 'tenureMonths', 'purpose'],
    isVisible: () => true,
  },
  {
    id: 'kyc',
    title: 'KYC Details',
    component: Step3Kyc,
    fields: ['fullName', 'dob', 'pan', 'aadhaar'],
    isVisible: () => true,
  },
  {
    id: 'employment',
    title: 'Employment & Income',
    component: Step4Employment,
    fields: ['employmentType', 'monthlyIncome', 'employerOrBusinessName'],
    isVisible: () => true,
  },
  {
    id: 'address',
    title: 'Address',
    component: Step5Address,
    fields: ['pincode', 'addressLine1', 'city', 'state', 'residenceType'],
    isVisible: () => true,
  },
  {
    id: 'co-applicant',
    title: 'Co-Applicant',
    component: Step6CoApplicant,
    fields: ['coApplicantName', 'coApplicantPan', 'coApplicantRelationship'],
    isVisible: isCoApplicantStepVisible,
  },
  {
    id: 'documents',
    title: 'Documents',
    component: Step7Documents,
    fields: ['documentsAcknowledged'],
    isVisible: () => true,
  },
  {
    id: 'review',
    title: 'Review & Submit',
    component: Step8Review,
    fields: ['termsAccepted'],
    isVisible: () => true,
  },
];

export default STEP_REGISTRY;
