import { EVMWalletButton } from '@/components/EVMWalletButton/EVMWalletButton';
import { Button, ButtonProps } from '@/components/common/Button';
import { useRegistrationButton } from '@/components/pages/Project/components/RegistrationButtonProvider/RegistrationButtonProvider';
import { useWallets } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';
import { WALLET_ROUTE } from '@/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface JoinButtonProps extends ButtonProps {
  isWalletButton: boolean;
  loading: boolean;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'transparent';
}

export const JoinButton = (props: JoinButtonProps) => {
  return (
    <Button
      {...props}
      isLoading={props.loading}
      onClick={() => null}
      disabled={true}
    >
      Claim ended
    </Button>
  );

  const router = useRouter();
  const {
    buttonText,
    isRegistrationAvailable,
    isParticipationAvailable,
    isClaimAvailable,
  } = useRegistrationButton();
  const { walletsAreVerified } = useWallets();
  const disabled =
    (!isRegistrationAvailable &&
      !isParticipationAvailable &&
      !isClaimAvailable) ||
    props.loading;

  if (!walletsAreVerified) {
    return (
      <Link
        href={{
          pathname: '/profile',
          query: { from: router.asPath, wallet: true },
        }}
        as={WALLET_ROUTE}
      >
        <Button
          {...props}
          isLoading={props.loading}
          onClick={() => null}
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </Link>
    );
  }

  if (props.isWalletButton) {
    return (
      <EVMWalletButton
        control={(innerProps) => (
          <Button isLoading={props.loading} {...props} {...innerProps}>
            Join!
          </Button>
        )}
      />
    );
  }

  return (
    <Button
      {...props}
      isLoading={props.loading}
      disabled={disabled}
      onClick={props.onClick}
    >
      {buttonText}
    </Button>
  );
};
