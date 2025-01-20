import { useCallback } from 'react';
import useUser, { User } from '@/hooks/useUser';
import { useRouter } from 'next/router';
import {
  AUTH_EMAIL_ROUTE,
  HOME_ROUTE,
  KYC_ROUTE,
  PROFILE_ROUTE,
  WALLET_ROUTE,
} from '@/constants/routes';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { cleanWalletsStorage } from '@/utils/wallets';

export const MobileMenu = () => {
  const { mutateUser, user } = useUser();
  const router = useRouter();

  const logout = useCallback(async () => {
    logout();
    router.push(AUTH_EMAIL_ROUTE);
    await mutateUser(null as unknown as User);
    cleanWalletsStorage();
  }, [mutateUser, router]);

  return (
    <MobileMenuWrapper>
      <Menu>
        <MenuButton
          as={StyledIconButton}
          aria-label="Options"
          icon={<HamburgerIcon color="#fff" />}
          variant="outline"
        />
        <MenuList>
          {user?.isLoggedIn && (
            <>
              <MenuItem onClick={() => router.push(PROFILE_ROUTE)}>
                My account
              </MenuItem>
              <MenuItem onClick={() => router.push(WALLET_ROUTE)}>
                Verify wallet
              </MenuItem>
              <MenuItem onClick={() => router.push(KYC_ROUTE)}>
                KYC verification
              </MenuItem>
            </>
          )}
          {!user?.isLoggedIn && (
            <MenuItem
              color="#000"
              onClick={() => router.push(AUTH_EMAIL_ROUTE)}
            >
              Get started
            </MenuItem>
          )}
          <MenuItem color="#000" onClick={() => router.push(HOME_ROUTE)}>
            Funds
          </MenuItem>
          {user?.isLoggedIn && <MenuItem onClick={logout}>Logout</MenuItem>}
        </MenuList>
      </Menu>
    </MobileMenuWrapper>
  );
};

const StyledIconButton = styled(IconButton)`
  padding: 15px;
  width: 14px;
  height: 14px;
  @media screen and (min-width: 30em) {
    width: inherit;
    height: inherit;
  }
`;

const MobileMenuWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  & > button {
    border: none;
    border-radius: 100px;
    width: 56px;
    height: 40px;
    background-color: var(--chakra-colors-primary-basic);
  }
  @media screen and (min-width: 992px) {
    display: none;
  }
`;
