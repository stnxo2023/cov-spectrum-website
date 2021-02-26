import React from 'react';
import { VariantDashboard } from '../components/VariantDashboard';
import { InternationalComparison } from '../components/InternationalComparison';
import { Country, Variant } from '../services/api-types';
import { VariantHeader } from '../components/VariantHeader';

interface Props {
  country: Country;
  matchPercentage: number;
  variant: Variant;
}

export const FocusPage = (props: Props) => {
  return (
    <>
      <VariantHeader {...props} />
      <hr />
      <VariantDashboard {...props} />
      <hr />
      <InternationalComparison {...props} />
      <hr />
      <h3>Geography</h3>
      <p>Variant map goes here</p>
    </>
  );
};
