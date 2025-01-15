import { Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ProjectInfo } from '@/components/pages/Project/components/ProjectInfo/ProjectInfo';
import { RightBlock } from '@/components/pages/Project/components/RightBlock/RightBlock';
import { Footer, FooterWrapper } from '@/components/footer';
import {
  useIsParticipant,
  useUserRegistrationState,
  useParticipate,
  useRegisterUser,
} from '@/components/pages/Project/ProjectPage.hooks';
import { useCallback } from 'react';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { AUTH_EMAIL_ROUTE, HOME_ROUTE } from '@/constants/routes';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { useWallets } from '../Profile/components/WalletsProvider/WalletsProvider';
import { Loading } from '@/components/common/Loading/Loading';
import { useDisclosure } from '@chakra-ui/hooks';
import { WrongWalletPopup } from './components/WrongWalletPopup/WrongWalletPopup';
import { RegistrationPopup } from '@/components/pages/Project/components/RegistrationPopup/RegistrationPopup';
import {
  useGetDisplayedDate,
  useGetDistributionRound,
  useGetRegistrationRound,
} from '@/hooks/contracts';
import { JoinButton } from '@/components/pages/Project/components/JoinButton/JoinButton';
import { RegistrationButtonProvider } from '@/components/pages/Project/components/RegistrationButtonProvider/RegistrationButtonProvider';
import { ClaimSteps } from '@/components/pages/Project/components/Steps/ClaimSteps';
import { DontMissBanner } from '@/components/pages/Project/components/DontMissBanner/DontMissBanner';
import { ParticipationPopup } from '@/components/pages/Project/components/ParticipationPopup/ParticipationPopup';
import { useGetVestingParameters } from '@/components/pages/BackOffice/components/VestingParameters/VestingParameters.hooks';
import { ProjectPageHeader } from '@/components/pages/Project/components/ProjectPageHeader/ProjectPageHeader';
import {
  ProjectMeta,
  useProjectMeta,
} from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';
import { getImageUrl } from '@/utils/getImageUrl';

export interface DisplayedDate {
  type: 'Start date' | 'End date' | '';
  date: string;
}

interface ClaimPageProps {
  meta: ProjectMeta;
}

const ClaimPageComponent = ({ meta }: ClaimPageProps) => {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { account, isWrongNetwork, switchEthChain } = useConnectExtension();
  const { verifiedWallet, loading: isWalletsLoading } = useWallets();
  const vestingInfo = document.getElementById('vesting-info');
  const {
    isOpen: isRegistrationPopupOpen,
    onOpen: onRegistrationPopupOpen,
    onClose: onRegistrationPopupClose,
  } = useDisclosure();
  const {
    isOpen: isWrongWalletPopupOpen,
    onOpen: onWrongWalletPopupOpen,
    onClose: onWrongWalletPopupClose,
  } = useDisclosure();
  const {
    isOpen: isParticipationPopupOpen,
    onOpen: onParticipationPopupOpen,
    onClose: onParticipationPopupClose,
  } = useDisclosure();
  const { loading: isRegistering, register } = useRegisterUser(meta.address);
  const {
    isParticipant,
    loading: isParticipantLoading,
    update: updateIsParticipant,
  } = useIsParticipant(meta.address);
  const { loading: isParticipating, participate } = useParticipate(
    meta.address,
    updateIsParticipant,
  );
  const { isRegistered, loading: isRegisteredLoading } =
    useUserRegistrationState(meta.address);
  const {
    loading: isRegistrationRoundLoading,
    registrationRound,
    update: updateRegistrationRound,
  } = useGetRegistrationRound(meta.address);
  const {
    loading: isDistributionRoundLoading,
    distributionRound,
    update: updateDistributionRound,
  } = useGetDistributionRound(meta.address);
  const {
    hasWithdrawn,
    loading: isHasWithdrawnLoading,
    update: updateHasWithdrawn,
  } = useGetVestingParameters(meta.address);
  const displayedDate = useGetDisplayedDate(
    registrationRound,
    distributionRound,
    isRegistered,
    isParticipant,
    () => {
      updateRegistrationRound();
      updateDistributionRound();
    },
  );

  const isLoggedIn = !!user?.isLoggedIn;
  const isWalletButton =
    !account &&
    isLoggedIn &&
    !isRegistered &&
    !isParticipant &&
    !hasWithdrawn &&
    !isParticipantLoading &&
    !isRegisteredLoading;
  const isVerifiedWalletConnected =
    account && account === verifiedWallet?.value;
  const loading =
    (isUserLoading || isLoggedIn) &&
    !isParticipant &&
    !isWrongNetwork &&
    (isRegisteredLoading ||
      isRegistering ||
      isParticipating ||
      isParticipantLoading ||
      isRegistrationRoundLoading ||
      isDistributionRoundLoading ||
      isHasWithdrawnLoading ||
      isWalletsLoading);

  const onJoinClick = useCallback(() => {
    if (vestingInfo) {
      vestingInfo.scrollIntoView({ behavior: 'smooth' });
    } else if (!isLoggedIn) {
      router.push(AUTH_EMAIL_ROUTE);
    } else if (isWrongNetwork) {
      switchEthChain();
    } else if (!isVerifiedWalletConnected) {
      onWrongWalletPopupOpen();
    } else if (isRegistered) {
      onParticipationPopupOpen();
    } else {
      onRegistrationPopupOpen();
    }
  }, [
    vestingInfo,
    isLoggedIn,
    isWrongNetwork,
    isVerifiedWalletConnected,
    isRegistered,
    router,
    switchEthChain,
    onWrongWalletPopupOpen,
    onParticipationPopupOpen,
    onRegistrationPopupOpen,
  ]);

  const onRegisterConfirm = useCallback(() => {
    register();
    onRegistrationPopupClose();
  }, [onRegistrationPopupClose, register]);

  const onParticipateConfirm = useCallback(() => {
    participate();
    onParticipationPopupClose();
  }, [onParticipationPopupClose, participate]);

  return (
    <RegistrationButtonProvider
      isLoggedIn={isLoggedIn}
      isRegistered={isRegistered}
      isParticipant={isParticipant}
      hasWithdrawn={hasWithdrawn}
      registrationRound={registrationRound}
      distributionRound={distributionRound}
    >
      <Flex width="100%" flexShrink={0} flexDirection="column">
        <ProjectPageHeader meta={meta}>
          <WrongWalletPopup
            isOpen={isWrongWalletPopupOpen}
            onClose={onWrongWalletPopupClose}
          />
          <RegistrationPopup
            onConfirm={onRegisterConfirm}
            isOpen={isRegistrationPopupOpen}
            onClose={onRegistrationPopupClose}
          />
          <ParticipationPopup
            onConfirm={onParticipateConfirm}
            isOpen={isParticipationPopupOpen}
            onClose={onParticipationPopupClose}
          />
          <JoinButton
            variant="primary"
            minWidth="130px"
            backgroundColor="accent.green"
            marginTop="32px"
            flexShrink={0}
            flexGrow={0}
            color="primary.basic"
            width={['100%', 'fit-content']}
            _hover={{ backgroundColor: 'background.gray' }}
            isWalletButton={isWalletButton}
            loading={loading}
            onClick={onJoinClick}
          />
        </ProjectPageHeader>
        <Flex
          padding={[
            '56px 24px 24px',
            '56px 24px 24px',
            '56px 24px 24px',
            '56px 32px 24px',
            '71px 140px',
          ]}
          backgroundColor="background.light"
          width="100%"
          flexDirection="column"
        >
          <Flex
            position="relative"
            gap={['0', '0', '0', '40px']}
            flexDirection={[
              'column-reverse',
              'column-reverse',
              'column-reverse',
              'row',
            ]}
          >
            <Flex
              width={['100%', '100%', '100%', 'calc(100% - 400px)']}
              flexDirection="column"
              gap={['24px', '32px', '32px', '56px']}
            >
              <Image
                src={getImageUrl(meta.bannerFile)}
                maxHeight="428px"
                width="100%"
                objectFit="cover"
                borderRadius="8px"
              />
              <div>
                <SectionTitle marginBottom="12px">Description</SectionTitle>
                <Description>{meta.description}</Description>
              </div>
              <ProjectInfo meta={meta} withdrawCallback={updateHasWithdrawn} />
            </Flex>
            <RightBlock
              loading={loading}
              isDatesLoading={
                isDistributionRoundLoading || isRegistrationRoundLoading
              }
              meta={meta}
              displayedDate={displayedDate}
              isWalletButton={isWalletButton}
              onJoin={onJoinClick}
            />
          </Flex>
          {!isRegistered && (
            <DontMissBanner>
              <JoinButton
                variant="primary"
                width={['100%', 'fit-content']}
                color="black"
                backgroundColor="accent.green"
                flexShrink={0}
                _hover={{ backgroundColor: 'background.gray' }}
                isWalletButton={isWalletButton}
                loading={loading}
                onClick={onJoinClick}
              />
            </DontMissBanner>
          )}
        </Flex>
        <ClaimSteps
          isRegistered={isRegistered}
          isRegisteredLoading={isRegisteredLoading}
          hasVestingInfo={!!vestingInfo}
          hasWithdrawn={hasWithdrawn}
        />
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Flex>
    </RegistrationButtonProvider>
  );
};

export const ProjectPage = () => {
  const router = useRouter();
  const alias = router.query.project as string;
  const { projectMeta, loading: isMetaLoading } = useProjectMeta(
    undefined,
    alias,
  );

  if (!alias || isMetaLoading) {
    return <Loading />;
  }

  if (!projectMeta && !isMetaLoading) {
    router.push(HOME_ROUTE);
    return <Loading />;
  }

  if (projectMeta) {
    return <ClaimPageComponent meta={projectMeta} />;
  }
};

const SectionTitle = styled(Text)`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: var(--chakra-colors-primary-basic);
`;

const Description = styled(Text)`
  opacity: 0.64;
  font-size: 16px;
  line-height: 24px;
  color: var(--chakra-colors-primary-basic);
`;
