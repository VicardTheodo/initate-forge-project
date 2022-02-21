export const pushArgsFromLinkHref = <T extends string>(
  href: T,
): [T, T, { shallow: undefined; locale: undefined; scroll: true }] => [
  href,
  href,
  { shallow: undefined, locale: undefined, scroll: true },
];
