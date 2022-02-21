import Link from 'next/link';
import { FunctionComponent } from 'react';
import Image from 'next/image';

import { routes } from '../../../services/routes';
import { getSpacing } from '../../../stylesheet';

const logoHeight = getSpacing(11);
const logoWidth = getSpacing(23);

export const Logo: FunctionComponent = () => {
  return (
    <Link href={routes.HOME}>
      <a style={{ height: logoHeight }}>
        <Image alt="Forge" src="/logo.png" height={logoHeight} width={logoWidth} />
      </a>
    </Link>
  );
};
