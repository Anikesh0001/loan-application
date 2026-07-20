import { z } from 'zod';

/**
 * TODO(Phase 6): replace this stub with real per-step Zod schemas.
 *
 * The list below is this project's best reconstruction of the 14 cross-step
 * dependencies referenced in the brief, inferred from constants.js and the
 * step/visibility rules defined elsewhere (STEP_REGISTRY, CO_APPLICANT_
 * THRESHOLDS, PAN_ENTITY_TYPE_MAP, etc). Confirm/adjust against the original
 * spec before implementing Phase 6 — do not treat this as authoritative.
 *
 *  1. Step 2 loan amount min/max bounds depend on Step 1 loan type
 *     (LOAN_AMOUNT_RANGES).
 *  2. Step 2 tenure range bounds depend on Step 1 loan type
 *     (TENURE_RANGES_MONTHS).
 *  3. Step 2 purpose options depend on Step 1 loan type (LOAN_PURPOSES).
 *  4. Step 8's displayed interest rate depends on Step 1 loan type
 *     (INTEREST_RATES).
 *  5. Step 6 visibility (and therefore whether its fields are required)
 *     depends on Step 1 loan type plus Step 2 loan amount vs. the
 *     co-applicant threshold for that loan type (CO_APPLICANT_THRESHOLDS) —
 *     already implemented as STEP_REGISTRY's isVisible, but Step 6's Zod
 *     schema must mirror the same condition so an invisible step's fields
 *     are never required.
 *  6. Step 3 PAN's 4th character (entity type) should match the applicant
 *     type implied by Step 1 loan type (e.g. a business loan expects a
 *     firm/company PAN per PAN_ENTITY_TYPE_MAP).
 *  7. Step 4 required fields depend on employment type: salaried needs
 *     employer name + income; self-employed needs business name + vintage.
 *  8. Step 7's required document set depends on Step 4 employment type
 *     (payslips vs. ITR vs. GST/business proofs).
 *  9. Step 5 residence type of 'Rented' requires additional fields
 *     (landlord details / rent agreement) not needed for 'Owned'.
 * 10. Step 6's presence (from #5) adds co-applicant KYC document
 *     requirements to Step 7.
 * 11. Step 6's presence (from #5) adds a co-applicant signature requirement
 *     to Step 8.
 * 12. Step 1 loan type === 'home' requires property-related fields in
 *     Step 2 (property value / address) not needed for personal/business.
 * 13. Step 1 loan type === 'home' (from #12) adds property-paper document
 *     requirements to Step 7.
 * 14. Step 5 city/state become derived, read-only fields once pincode is
 *     resolved via usePinCodeLookup, and must be validated against the
 *     resolved pincode rather than freely typed.
 *
 * @param {string} stepId
 * @param {Record<string, unknown>} formData
 * @returns {import('zod').ZodSchema}
 */
// eslint-disable-next-line no-unused-vars
export function getSchemaForStep(stepId, formData) {
  return z.object({});
}
