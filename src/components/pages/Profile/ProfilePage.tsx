import { Fragment, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';

import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
} from 'react-icons/bs';

import { useRouter } from 'next/router';
import { Footer, FooterWrapper } from '@/components/footer';

import { useIsMobile } from '@/hooks/useIsMobile';
import { SupportButton } from '@/components/pages/Profile/components/KYCTab/components/SupportButton/SupportButton';
import { IoIosArrowForward } from 'react-icons/io';
import { sendMetricsSuccessKYC } from '@/services/metrics';
import { AccountTab } from '@/components/pages/Profile/components/AccountTab/AccountTab';
import { WalletTab } from './components/WalletTab/WalletTab';
import { useWallets } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';
import { GoPrimitiveDot } from 'react-icons/go';
import { ReferralTab } from '@/components/pages/Profile/components/ReferralTab/ReferralTab';
import { Rewards } from '@/components/pages/Profile/components/Rewards/Rewards';

const tabs = [
  'Profile details',
  'Connect',
  'Referral',
  // 'KYC Verification',
  // 'Rewards',
];

export const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const isMobile = useIsMobile();
  // const { isKYCAccepted } = useKYCStatus();
  const { walletsAreVerified } = useWallets();

  useEffect(() => {
    if (router.query.kyc) {
      if (router.query.kyc === 'true') {
        setSelectedTab(2);
      } else if (router.query.kyc === 'success') {
        sendMetricsSuccessKYC();
      }
    }

    if (router.query.wallet) {
      setSelectedTab(1);
    }
  }, [router, setSelectedTab]);

  const tabContent = [
    <AccountTab key="account" setSelectedTab={setSelectedTab} />,
    <WalletTab key="wallet" setSelectedTab={setSelectedTab} />,
    <ReferralTab key="referral" />,
    // <KYCTab key="kyc" />,
    // <RewardsTab key="rewards" />,
  ];

  return (
    <Fragment>
      {' '}
      <Flex
        padding={['40px 16px', '40px 16px', '40px 16px', '76px 155px 0']}
        flexDirection="column"
        position="relative"
      >
        {isMobile ? (
          <Heading fontSize="20px" marginBottom="20px">
            Profile
          </Heading>
        ) : (
          <Heading marginBottom="24px">Profile</Heading>
        )}

        <Flex flexDirection={['column', 'column', 'column', 'row']}>
          {!isMobile && (
            <Flex
              direction={['column', 'row', 'row', 'column']}
              gap="8px"
              flexBasis="30%"
              mr={[0, 0, 0, '20px']}
              mb={['20px', '20px', '20px', 0]}
            >
              <Rewards />
              {tabs.map((tab, index) => (
                <Flex
                  gap="11px"
                  alignItems="center"
                  justifyContent="space-between"
                  cursor="pointer"
                  backgroundColor={
                    index === selectedTab
                      ? 'var(--chakra-colors-accent-green)'
                      : 'primary.basic'
                  }
                  padding="12px 24px"
                  borderRadius="8px"
                  width="260px"
                  key={index}
                  onClick={() => setSelectedTab(index)}
                >
                  <Text
                    color={index === selectedTab ? 'secondary.text' : '#fff'}
                    _hover={{ color: 'secondary.textHover' }}
                    fontWeight="600"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    {tab}
                  </Text>
                  {index === selectedTab && (
                    <Icon
                      as={
                        index === 0 ||
                        index === 2 ||
                        (index === 1 && walletsAreVerified)
                          ? GoPrimitiveDot
                          : BsFillExclamationCircleFill
                      }
                      color={
                        index === 0 ||
                        index === 2 ||
                        (index === 1 && walletsAreVerified)
                          ? 'accent.blue'
                          : 'warning'
                      }
                    />
                  )}
                </Flex>
              ))}
            </Flex>
          )}
          <SupportButton />
          {isMobile ? (
            <Accordion allowMultiple w="100%" sx={{ columnCount: [1] }}>
              {tabContent.map((tab, index) => (
                <AccordionItem
                  margin="10px 0"
                  border="none"
                  key={index}
                  w="100%"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        padding="20px 25px"
                        color="secondary.text"
                        backgroundColor="secondary.basic"
                        border="1px solid var(--chakra-colors-border)"
                        borderRadius="4px"
                        _expanded={{
                          bg: 'secondary.basic',
                          borderBottom: 'none',
                          borderBottomRadius: '0',
                        }}
                      >
                        <Flex
                          flex="1"
                          flexDirection="row"
                          textAlign="left"
                          fontWeight="600"
                          fontSize="14px"
                          lineHeight="21px"
                        >
                          <Icon
                            as={
                              index === 0 ||
                              index === 2 ||
                              (index === 1 && walletsAreVerified)
                                ? BsFillCheckCircleFill
                                : BsFillExclamationCircleFill
                            }
                            width={19}
                            height={19}
                            marginRight="11px"
                            color={
                              index === 0 ||
                              index === 2 ||
                              (index === 1 && walletsAreVerified)
                                ? 'primary.basic'
                                : 'warning'
                            }
                          />
                          <div>{tabs[index]}</div>
                        </Flex>
                        {isExpanded ? (
                          <IoIosArrowForward
                            fontSize="20px"
                            style={{
                              transform: 'rotate(90deg)',
                              transition: 'transform 0.2s',
                            }}
                          />
                        ) : (
                          <IoIosArrowForward
                            fontSize="20px"
                            style={{ transition: 'transform 0.2s' }}
                          />
                        )}
                      </AccordionButton>
                      <AccordionPanel
                        border="1px solid var(--chakra-colors-border)"
                        borderTop="none"
                        borderBottomRadius="4px"
                        fontWeight="400"
                        fontSize="14px"
                        lineHeight="21px"
                      >
                        {tab}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            tabContent[selectedTab]
          )}
        </Flex>
      </Flex>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Fragment>
  );
};
