export const getSteps = (
  isRegistered: boolean,
  hasVestingInfo: boolean,
  hasWithdrawn: boolean,
) => [
  {
    title: 'Pick a project',
    text: 'Choose the start-up whose tokens you would like to purchase.',
    isCurrent: !isRegistered,
    isComplete: isRegistered,
  },
  {
    title: 'Sign up and apply',
    text: 'Use express sign-up with the code, verify your wallet and share your socials.',
    isCurrent: false,
    isComplete: isRegistered,
  },
  {
    title: 'Join the event',
    text: 'Click "Join" to apply and let us score your on-chain activity for allocation calculation.',
    isCurrent: isRegistered && !hasVestingInfo && !hasWithdrawn,
    isComplete: hasVestingInfo || hasWithdrawn,
  },
  {
    title: 'Check the results',
    text: 'Return for results to see if you meet the criteria & can receive tokens.',
    isCurrent: isRegistered && !hasVestingInfo && !hasWithdrawn,
    isComplete: hasVestingInfo || hasWithdrawn,
  },
  {
    title: 'Get your tokens',
    text: 'Withdraw your tokens according to the vesting schedule.',
    isCurrent: hasVestingInfo && !hasWithdrawn,
    isComplete: hasWithdrawn,
  },
];
