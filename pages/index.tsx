import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from '@chakra-ui/react';
import { useBundler } from '@/state/bundlr.context';

const Home: NextPage = () => {
  const { initialiseBundlr, fundWallet, balance } = useBundler();

  return (
    <div className='py-6 justify-center text-center container mx-auto'>
      <div className='flex justify-end'>
        <ConnectButton />
      </div>

      <h1 className='text-4xl font-bold mt-6'>🚀 Save My Files</h1>

      <Button className='mt-10' onClick={initialiseBundlr}>Let's Get started</Button>

      <div className='mt-12'>
        <Text>
          Your current balace is: {balance}
        </Text>
        <NumberInput className='w-1/5 mx-auto' step={0.01} defaultValue={0.05}>
          <NumberInputField />
          <NumberInputStepper >
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Button className='mt-2' onClick={() => fundWallet(0.02)}>💸 Add Fund</Button>
      </div>


    </div>
  );
};
export default Home;
