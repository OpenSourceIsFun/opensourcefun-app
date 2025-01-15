import { useCallback } from 'react';
import useUser, { User } from '@/hooks/useUser';
import { useRouter } from 'next/router';
import {
  AUTH_EMAIL_ROUTE,
  BACK_OFFICE_ROUTE,
  NETWORKS_ROUTE,
  PROFILE_ROUTE,
  WALLET_ROUTE,
} from '@/constants/routes';
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Button } from '@/components/common/Button';
import { BiUser } from 'react-icons/bi';
import { HamburgerIcon } from '@chakra-ui/icons';
import { cleanWalletsStorage } from '@/utils/wallets';
import { logout } from '@/utils/auth';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { useIsMobile } from '@/hooks/useIsMobile';

export const AccountButton = () => {
  const { mutateUser, isAdmin } = useUser({ redirectTo: AUTH_EMAIL_ROUTE });
  const router = useRouter();
  const isMobile = useIsMobile();
  const { disconnect } = useConnectExtension();

  const onLogout = useCallback(async () => {
    logout();
    disconnect();
    router.push(AUTH_EMAIL_ROUTE);
    await mutateUser(null as unknown as User);
    cleanWalletsStorage();
  }, [disconnect, mutateUser, router]);

  return (
    <Menu gutter={30}>
      <MenuButton
        as={Button}
        padding={0}
        width="auto"
        marginLeft="8px"
        flexShrink={0}
        leftIcon={
          <Flex
            backgroundColor="background.dark"
            borderRadius="100px"
            width="80px"
            height="40px"
            alignItems="center"
            marginRight="-4px"
            transition="all 0.2s"
            color="#fff"
            _hover={{
              backgroundColor: '#fff',
              color: '#000',
              boxShadow:
                '0px 0px 11px -8px var(--chakra-colors-background-dark)',
            }}
          >
            <Flex
              backgroundColor="accent.blue"
              width="32px"
              height="32px"
              borderRadius="100%"
              alignItems="center"
              justifyContent="center"
              marginLeft="4px"
            >
              <Icon as={BiUser} height="18px" width="18px" color="#FFF" />
            </Flex>
            <HamburgerIcon
              color="inherit"
              width="22px"
              height="22px"
              marginLeft="8px"
            />
          </Flex>
        }
        _active={{ background: 'transparent' }}
      ></MenuButton>
      <MenuList borderRadius="4px" background="#F6F5F5" border="none">
        <MenuItem
          color="menu.text"
          fontWeight={600}
          _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
          paddingLeft="20px"
          onClick={() => router.push(PROFILE_ROUTE)}
        >
          My account
        </MenuItem>
        <MenuItem
          color="menu.text"
          fontWeight={600}
          _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
          paddingLeft="20px"
          onClick={() => router.push(WALLET_ROUTE)}
        >
          Wallet Verification
        </MenuItem>
        {isMobile && (
          <MenuItem
            color="menu.text"
            fontWeight={600}
            _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
            paddingLeft="20px"
            onClick={() => router.push(NETWORKS_ROUTE)}
          >
            Networks
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem
            color="menu.text"
            _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
            paddingLeft="20px"
            fontWeight={600}
            onClick={() => router.push(BACK_OFFICE_ROUTE)}
          >
            Back office
          </MenuItem>
        )}
        <MenuItem
          color="menu.text"
          fontWeight={600}
          _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
          paddingLeft="20px"
          onClick={onLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
