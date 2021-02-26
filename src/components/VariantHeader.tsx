import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSamplePageLink } from '../pages/SamplePage';
import { AccountService } from '../services/AccountService';
import { Country, Variant } from '../services/api-types';
import { NextcladeService } from '../services/NextcladeService';

export interface Props {
  country: Country;
  matchPercentage: number;
  variant: Variant;
}

export const VariantHeader = ({ country, matchPercentage, variant }: Props) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <h3 style={{ flexGrow: 1 }}>
          {variant.name ?? 'Unnamed Variant'} in {country}
        </h3>
        <div>
          {AccountService.isLoggedIn() && (
            <Button
              onClick={() => NextcladeService.showVariantOnNextclade(variant, matchPercentage, country)}
              variant='outline-dark'
              size='sm'
              className='mr-2'
            >
              Show on Nextclade
            </Button>
          )}
          <Link to={getSamplePageLink({ mutations: variant.mutations, country, matchPercentage })}>
            <Button variant='outline-dark' size='sm'>
              Show samples
            </Button>
          </Link>
        </div>
      </div>

      <p>
        <b>Mutations:</b> {variant.mutations.join(', ')}
      </p>

      <p>
        The following plots show sequences matching <b>{Math.round(matchPercentage * 100)}%</b> of the
        mutations.
      </p>
    </>
  );
};
