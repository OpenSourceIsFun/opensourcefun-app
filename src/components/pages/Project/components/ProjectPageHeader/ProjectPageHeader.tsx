import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { getImageUrl } from '@/utils/getImageUrl';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';

interface ProjectPageHeader {
  meta: ProjectMeta;
  children?: React.ReactNode;
}
export const ProjectPageHeader = ({ meta, children }: ProjectPageHeader) => {
  return (
    <Flex
      backgroundColor="background.dark"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      alignItems="center"
      justifyContent="center"
      height={['auto', 'auto', 'auto', '480px']}
    >
      <Flex
        padding={['120px 24px 400px', '120px 48px 400px', '120px 115px 119px']}
        justifyContent="center"
        backgroundImage="/images/test_sale_banner.svg"
        backgroundSize={['80%', '55%', '35%', '30%']}
        backgroundPosition={['50% 100%', '50% 95%', '90% 50%', '80% 50%']}
        backgroundRepeat="no-repeat"
        flexDirection="column"
        maxWidth="1440px"
        height="100%"
        width="100%"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          marginBottom="16px"
          borderRadius="8px"
          backgroundColor="#fff"
          width="96px"
          height="96px"
          flexShrink={0}
        >
          <Image src={getImageUrl(meta.logoFile)} width="96px" height="96px" />
        </Flex>
        <Heading marginBottom="16px" color="#fff" fontSize="64px">
          {meta.title}
        </Heading>

        <HeaderFlex flexDirection="column">
          <BannerText>{meta.overview}</BannerText>
        </HeaderFlex>
        {children}
      </Flex>
    </Flex>
  );
};

const HeaderFlex = styled(Flex)`
  width: 100%;
  max-width: 500px;
`;

const BannerText = styled(Text)`
  font-size: 14px;
  color: var(--chakra-colors-primary-text);
  text-shadow: 0 0 2px black;
`;
