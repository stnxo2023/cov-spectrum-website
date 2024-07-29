import React, { useEffect } from 'react';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ExpandableTextBox } from './ExpandableTextBox';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';
import { ErrorBoundary } from 'react-error-boundary';

export enum NamedCardStyle {
  NORMAL,
  CONFIDENTIAL,
}

export type TabConfig = {
  labels: string[];
  activeTabIndex: number;
  onNewTabSelect: (tabIndex: number) => void;
  labelWidth?: number;
};

interface Props {
  title: string;
  toolbar?: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
  style?: NamedCardStyle;
  description?: string;
  tabs?: TabConfig;
}

export const Card = ({
  children,
  namedCardStyle,
}: {
  children: React.ReactNode;
  namedCardStyle: NamedCardStyle;
}) => {
  return (
    <div
      className={`relative mx-0.5 mt-1 mb-5 md:mx-3 shadow-lg rounded-lg bg-white p-4  border ${
        namedCardStyle === NamedCardStyle.NORMAL ? ' border-gray-100' : 'border-red-500'
      }`}
    >
      {children}
    </div>
  );
};

export const TabbedCard = ({
  children,
  namedCardStyle,
  tabConfig,
}: {
  children: React.ReactNode;
  namedCardStyle: NamedCardStyle;
  tabConfig: TabConfig;
}) => {
  return (
    <div className='mx-0.5 mt-1 mb-5 md:mx-3'>
      <div
        className={`relative shadow-lg rounded-lg bg-white p-4 border ${
          namedCardStyle === NamedCardStyle.NORMAL ? ' border-gray-100' : 'border-red-500'
        }`}
      >
        {children}
      </div>
      {tabConfig.labels.map((label, index) => (
        <button
          key={label}
          className={`p-2 shadow-lg text-center text-sm outline-none rounded-b -mt-1
            ${
              tabConfig.activeTabIndex === index
                ? 'relative bg-white cursor-default border-b-2 border-black font-bold'
                : 'bg-gray-100 text-gray-500'
            }
          `}
          style={{ width: tabConfig.labelWidth ?? 200 }}
          onClick={_ => tabConfig.onNewTabSelect(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const Title = styled.h1`
  font-size: 1.5rem;
  margin-top: 0px;
  margin-bottom: 0.5rem;
`;

const TitleConfidential = styled.span`
  font-size: small;
  color: #e74c3c;
  margin-left: 20px;
`;

const ToolbarWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const ContentWrapper = styled.div`
  margin-bottom: 0px;
`;

export const NamedCard = ({
  title,
  toolbar,
  children,
  style = NamedCardStyle.NORMAL,
  description,
  tabs,
}: Props) => {
  const SelectedCard = tabs ? TabbedCard : Card;

  useEffect(() => {
    // Fixture for graphs not displayed (age demographics graph as well as line-chart/bar-chart once label button is clicked)
    let graphs = Array.from(
      document.getElementsByClassName('recharts-responsive-container') as HTMLCollectionOf<HTMLElement>
    );
    for (let i = 0; i < graphs.length; i++) {
      let graph = graphs[i];
      if (graph.offsetHeight === 0) {
        let minHeight = Math.min(200, (graph.offsetWidth * 2) / 3);
        graphs[i].style.height = `${minHeight.toString()}px`;
      }
    }
  });

  return (
    <SelectedCard namedCardStyle={style} tabConfig={tabs!}>
      <Title>
        {title}
        {style === NamedCardStyle.CONFIDENTIAL && (
          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip id='tooltip-confidential'>
                This information is confidential and only available to authorized users.
              </Tooltip>
            }
          >
            <TitleConfidential>(confidential)</TitleConfidential>
          </OverlayTrigger>
        )}
      </Title>
      {/* We define the error boundary here because the NamedCard is currently the component that wraps most
       of the charts.*/}
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        {description && (
          <div className='pr-3 mb-3 text-gray-500'>
            <ExpandableTextBox text={description} maxChars={60} />
          </div>
        )}
        <ToolbarWrapper className='static lg:absolute'>{toolbar}</ToolbarWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </ErrorBoundary>
    </SelectedCard>
  );
};
