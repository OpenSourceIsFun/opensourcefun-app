import {
  ComponentWithAs,
  Tab,
  TabList as TabListChakra,
  TabProps,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

export const TabList = styled(TabListChakra)({
  borderBottom: 'none',
});

export const HeaderItemStyled = styled<
  { isSelected?: boolean } & ComponentWithAs<'button', TabProps>
>(Tab)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #303030;
  height: 80px;
  border-bottom: none;
  opacity: 0.64;

  &[aria-selected='true']:not(:hover) {
    color: var(--chakra-colors-secondary-text);
    opacity: 1;
  }

  &:focus {
    box-shadow: none;
  }

  &:active {
    background-color: transparent;
  }
`;
