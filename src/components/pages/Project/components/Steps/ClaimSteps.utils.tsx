export const getSteps = (
  isRegistered: boolean,
  hasVestingInfo: boolean,
  hasWithdrawn: boolean,
) => [
  {
    title: 'Sign up',
    text: 'Use express sign-up with the code, link your wallet, share your social media accounts, get KYC, and sign the deals agreement.',
    isCurrent: !isRegistered,
    isComplete: isRegistered,
  },
  {
    title: 'Choose track&funds',
    text: 'Make the docs, github, social links. etc. Be ready and relevant!',
    isCurrent: false,
    isComplete: isRegistered,
  },
  {
    title: 'Apply to the fund',
    text: 'Click to apply and provide docs&links',
    isCurrent: isRegistered && !hasVestingInfo && !hasWithdrawn,
    isComplete: hasVestingInfo || hasWithdrawn,
  },
  {
    title: 'Check the results',
    text: 'Get instant results and dive into feedback from based ai-managers!',
    isCurrent: isRegistered && !hasVestingInfo && !hasWithdrawn,
    isComplete: hasVestingInfo || hasWithdrawn,
  },
  {
    title: 'Get your funds!',
    text: 'Withdraw your tokens in accordance with the vesting schedule.',
    isCurrent: hasVestingInfo && !hasWithdrawn,
    isComplete: hasWithdrawn,
  },
];
