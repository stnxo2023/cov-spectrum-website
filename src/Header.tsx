import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HeaderCountrySelect } from './components/HeaderCountrySelect';
import { HeaderSamplingStrategySelect } from './components/HeaderSamplingStrategySelect';
import { AccountService } from './services/AccountService';
import { HeaderDateRangeSelect } from './components/HeaderDateRangeSelect';
import { ExternalLink } from './components/ExternalLink';
import styled from 'styled-components';
import { AiOutlineGithub } from 'react-icons/ai';

const Wrapper = styled.div`
  flex-flow: column;
  height: 100%;
`;

const TopNavbar = styled(Navbar)`
  height: 50%;
`;

const BottomNavbar = styled(Navbar)`
  height: 50%;
`;

const Logo = (
  <div>
    <Navbar.Brand as={Link} to='/'>
      <span style={{ color: 'darkgray', fontWeight: 'bold' }}>cov</span>
      <span style={{ color: '#0D4A70', fontWeight: 'bold' }}>S</span>
      <span style={{ color: '#245C70', fontWeight: 'bold' }}>P</span>
      <span style={{ color: '#3A6E6F', fontWeight: 'bold' }}>E</span>
      <span style={{ color: '#67916E', fontWeight: 'bold' }}>C</span>
      <span style={{ color: '#AC8D3A', fontWeight: 'bold' }}>T</span>
      <span style={{ color: '#CF8B20', fontWeight: 'bold' }}>R</span>
      <span style={{ color: '#E08A13', fontWeight: 'bold' }}>U</span>
      <span style={{ color: '#F18805', fontWeight: 'bold' }}>M</span>
    </Navbar.Brand>
  </div>
);

export const Header = () => {
  const loggedIn = AccountService.isLoggedIn();
  let username = null;
  if (loggedIn) {
    username = AccountService.getUsername();
  }

  return (
    <Wrapper>
      <TopNavbar bg='light' expand='md'>
        {Logo}
        <div className='text-xs flex flex-row'>
          <div className='self-end mr-1'>Enabled by data from </div>
          <ExternalLink url='https://gisaid.org/'>
            <img src='/img/gisaid.png' alt='GISAID' style={{ height: '20px' }} />
          </ExternalLink>
        </div>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav>
            {loggedIn ? (
              <>
                <Navbar.Text>Signed in as {username}</Navbar.Text>
                <Nav.Link>
                  <button
                    onClick={() => {
                      AccountService.logout();
                      window.location.href = '/login?left';
                    }}
                    style={{
                      background: 'none',
                      outline: 'none',
                      border: 'none',
                    }}
                  >
                    Logout
                  </button>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href='/login'>Login</Nav.Link>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '0 0.5rem 0 0.5rem',
              }}
              onClick={() => window.open('https://github.com/cevo-public/cov-spectrum-website', '_blank')}
            >
              <AiOutlineGithub
                className='fill-current hover:text-gray-500 rounded-xl filter shadow-xl hover:bg-gray-200'
                size={'1.5em'}
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </TopNavbar>
      <BottomNavbar bg='light' expand='md' className='text-xs flex flex-row'>
        <HeaderCountrySelect />
        <HeaderDateRangeSelect />
        <Navbar.Collapse>
          <HeaderSamplingStrategySelect />
          <Nav className='ml-4 mr-auto'>
            <Nav.Link href='/acknowledgements' style={{ textDecoration: 'underline' }}>
              Acknowledgements
            </Nav.Link>
            <Nav.Link href='/about' style={{ textDecoration: 'underline' }}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </BottomNavbar>
    </Wrapper>
  );
};
