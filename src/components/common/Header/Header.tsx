import { useEffect, useState } from 'react';

import { Flex, Image, Spinner, Tabs } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { TabList } from './components/HeaderItems/HeaderItems.style';
import { RightContainer } from './Header.style';
import Link from 'next/link';
import { HeaderItem } from './components/HeaderItems/HeaderItem';

import { useRouter } from 'next/router';

import { EVMWalletButton } from '@/components/EVMWalletButton/EVMWalletButton';
import { AccountButton } from './components/AccountButton/AccountButton';
import { GetStartedButton } from './components/GetStartedButton/GetStartedButton';
import opensourcefunLogoIcon from '@/assets/opensourcefun_logo.svg';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import useUser from '@/hooks/useUser';
import { BACK_OFFICE_ROUTE } from '@/constants/routes';

interface HeaderProps {
  isLoggedIn: boolean;
  isLoading: boolean;
}

const MAIN_SITE = 'https://opensourcefun.network';

const tabs = [
  {
    url: MAIN_SITE,
    title: 'Main',
  },
  {
    url: '/networks',
    title: 'Networks',
  },
];

export const Header = (props: HeaderProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const { isAdmin } = useUser();
  const isMobile = useIsMobile();

  useEffect(() => {
    const selectedIndex = tabs.findIndex(({ url }) => url === router.pathname);
    setSelectedTab(selectedIndex);
  }, [router]);

  return (
    <Flex
      as="nav"
      align="center"
      width="100%"
      height="72px"
      padding={['0 16px', '0 16px', '0 64px']}
      bg="#F7F5F5"
      position="sticky"
      top={0}
      zIndex="3"
      backgroundColor="accent.green"
    >
      <Flex flexShrink={0}>
        <Link href={MAIN_SITE}>
          <Image
            src={opensourcefunLogoIcon}
            alt="opensourcefun"
            width={isMobile ? '40px' : '48px'}
            cursor="pointer"
          />
        </Link>
      </Flex>
      <Separator />
      <MenuWrapper>
        <Tabs height="100%" width="100%" index={selectedTab}>
          <TabList justifyContent="flex-start">
            {tabs.map((tab) => (
              <HeaderItem key={tab.url} url={tab.url}>
                {tab.title}
              </HeaderItem>
            ))}
            {isAdmin && (
              <HeaderItem key={BACK_OFFICE_ROUTE} url={BACK_OFFICE_ROUTE}>
                Back office
              </HeaderItem>
            )}
          </TabList>
        </Tabs>
        {!props.isLoading && !props.isLoggedIn && <GetStartedButton />}
      </MenuWrapper>
      {props.isLoading && (
        <Spinner marginLeft="auto" width="40px" height="40px" flexShrink={0} />
      )}
      {!props.isLoading && props.isLoggedIn && (
        <RightContainer>
          <EVMWalletButton />
          <AccountButton />
        </RightContainer>
      )}
      {!props.isLoading && !props.isLoggedIn && <MobileMenu />}
    </Flex>
  );
};

const MenuWrapper = styled.div`
  width: 100%;
  display: none;
  @media screen and (min-width: 992px) {
    display: flex;
    align-items: center;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 32px;
  background: var(--chakra-colors-background-dark);
  opacity: 0.12;
  margin: 0 44px;

  @media screen and (max-width: 991px) {
    display: none;
  }
`;
