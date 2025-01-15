import Link from 'next/link';

import { HeaderItemStyled } from './HeaderItems.style';
import { useRouter } from 'next/router';

export const HeaderItem: React.FC<{ url: string }> = ({ url, children }) => {
  const router = useRouter();

  return (
    <Link href={url}>
      <HeaderItemStyled
        isSelected={router.pathname === url}
        transition="all 0.25s ease-in-out"
        _hover={{
          opacity: 1,
          color: 'var(--chakra-colors-primary-hover)',
          textShadow: '0px 0px 4px var(--chakra-colors-background-dark)',
          transform: 'scale(1.03)',
        }}
      >
        <div>{children}</div>
      </HeaderItemStyled>
    </Link>
  );
};
