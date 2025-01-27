import { Flex, Spinner, Text } from '@chakra-ui/react';
import { getSteps } from '@/components/pages/Project/components/Steps/ClaimSteps.utils';
import styled from '@emotion/styled';
import { prop } from 'styled-tools';
import { CompletedTag } from '@/components/common/CompletedTag/CompletedTag';

interface ClaimStepsProps {
  isRegistered: boolean;
  isRegisteredLoading: boolean;
  hasVestingInfo: boolean;
  hasWithdrawn: boolean;
}

export const ClaimSteps = ({
  isRegistered,
  isRegisteredLoading,
  hasVestingInfo,
  hasWithdrawn,
}: ClaimStepsProps) => (
  <Flex flexDirection="column" width="100%">
    <Flex
      position="relative"
      padding={[
        '40px 16px 90px',
        '40px 16px 90px',
        '40px 24px 90px',
        '40px 32px 90px',
        '56px 140px 106px',
      ]}
      background="#000"
      gap="12px"
      flexDirection={['column', 'column', 'row']}
    >
      {isRegisteredLoading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="50px"
        >
          <Spinner />
        </Flex>
      ) : (
        getSteps(isRegistered, hasVestingInfo, hasWithdrawn).map(
          ({ title, text, isCurrent, isComplete }, index) => (
            <Card
              key={`card-${index}`}
              backgroundColor={isCurrent ? 'accent.green' : '#fff'}
            >
              <Flex
                backgroundColor="background.dark"
                borderRadius="100%"
                color="primary.text"
                width="40px"
                height="40px"
                alignItems="center"
                justifyContent="center"
                fontWeight={600}
              >
                0{index + 1}
              </Flex>
              <Header marginBottom="8px" marginTop="18px">
                {title}
              </Header>
              <RegularText marginBottom="40px">{text}</RegularText>
              {isComplete && (
                <CompletedTag
                  height="40px"
                  alignSelf="flex-end"
                  marginTop="auto"
                />
              )}
            </Card>
          ),
        )
      )}
    </Flex>
  </Flex>
);

const Header = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${prop('color', '#303030')};
`;

const Card = styled(Flex)`
  padding: 24px 32px;
  position: relative;
  width: 100%;
  flex-direction: column;
  border-radius: 8px;

  @media screen and (min-width: 48em) {
    width: 100%;
  }
`;

const RegularText = styled(Text)`
  font-size: ${prop('fontSize', '14px')};
  color: ${prop('color', '#303030')};
  opacity: 0.64;
`;
