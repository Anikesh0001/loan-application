export const LOAN_TYPES = {
  PERSONAL: 'personal',
  HOME: 'home',
  BUSINESS: 'business',
};

export const LOAN_TYPE_LABELS = {
  [LOAN_TYPES.PERSONAL]: 'Personal Loan',
  [LOAN_TYPES.HOME]: 'Home Loan',
  [LOAN_TYPES.BUSINESS]: 'Business Loan',
};

export const LOAN_AMOUNT_RANGES = {
  [LOAN_TYPES.PERSONAL]: { min: 50000, max: 2500000 },
  [LOAN_TYPES.HOME]: { min: 500000, max: 50000000 },
  [LOAN_TYPES.BUSINESS]: { min: 100000, max: 20000000 },
};

export const TENURE_RANGES_MONTHS = {
  [LOAN_TYPES.PERSONAL]: { min: 12, max: 60 },
  [LOAN_TYPES.HOME]: { min: 60, max: 360 },
  [LOAN_TYPES.BUSINESS]: { min: 12, max: 120 },
};

export const LOAN_PURPOSES = {
  [LOAN_TYPES.PERSONAL]: [
    'Medical Emergency',
    'Wedding',
    'Travel',
    'Home Renovation',
    'Debt Consolidation',
    'Education',
    'Other',
  ],
  [LOAN_TYPES.HOME]: [
    'Purchase of New Home',
    'Purchase of Resale Home',
    'Construction',
    'Plot Purchase',
    'Home Extension',
    'Balance Transfer',
  ],
  [LOAN_TYPES.BUSINESS]: [
    'Working Capital',
    'Equipment Purchase',
    'Business Expansion',
    'Inventory Purchase',
    'Debt Refinancing',
    'Other',
  ],
};

export const INTEREST_RATES = {
  [LOAN_TYPES.PERSONAL]: 10.5,
  [LOAN_TYPES.HOME]: 8.5,
  [LOAN_TYPES.BUSINESS]: 14,
};

export const MAX_FILE_SIZE_MB = 5;

export const PAN_ENTITY_TYPE_MAP = {
  P: 'Individual',
  C: 'Company',
  H: 'Hindu Undivided Family (HUF)',
  A: 'Association of Persons (AOP)',
  B: 'Body of Individuals (BOI)',
  G: 'Government Agency',
  J: 'Artificial Juridical Person',
  L: 'Local Authority',
  F: 'Firm / Limited Liability Partnership',
  T: 'Trust',
};

export const EMPLOYMENT_TYPES = [
  'Salaried',
  'Self-Employed Professional',
  'Self-Employed Business Owner',
  'Retired',
  'Unemployed',
];

export const RESIDENCE_TYPES = ['Owned', 'Rented', 'Company Provided', 'Living with Parents'];

export const CO_APPLICANT_THRESHOLDS = {
  [LOAN_TYPES.PERSONAL]: 500000,
  [LOAN_TYPES.BUSINESS]: 2000000,
};

export const AUTOSAVE_INTERVAL_MS = 30000;

export const DRAFT_TTL_HOURS = 72;
