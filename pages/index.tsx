import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { useBundler } from '@/state/bundlr.context';
import { chainId, useAccount, useNetwork } from 'wagmi';
import FundWallet from '@/components/FundWallet';
import UploadImage from '@/components/UploadImage';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const { data } = useAccount();
  const { activeChain } = useNetwork();
  const { initialiseBundlr, bundlrInstance, balance } = useBundler();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  if (!data) {
    return (
      <div className='justify-center items-center h-screen flex '>
        <VStack gap={8}>
          <Text className='text-4xl font-bold'>
            Connect your wallet first
          </Text>
          <ConnectButton />
        </VStack>
      </div>
    )
  }

  if (activeChain && activeChain.id !== chainId.polygonMumbai) {
    return (
      <div className='justify-center items-center h-screen flex '>
        <VStack gap={8}>
          <Text className='text-4xl font-bold'>
            Opps, wrong network!! Switch to Polygon Mumbai Testnet
          </Text>
          <ConnectButton />
        </VStack>
      </div>
    )
  }

  if (!bundlrInstance) {
    return (
      <div className='justify-center items-center h-screen flex '>
        <VStack gap={8}>
          <ConnectButton />
          <Text className='text-4xl font-bold'>
            Let's initialise Bundlr now
          </Text>
          <Button className='mt-10' onClick={initialiseBundlr}>Initialise Bundlr</Button>
        </VStack>
      </div>
    )
  }

  if (!balance || Number(balance) <= 0) {
    return (
      <div className='justify-center items-center h-screen flex '>
        <VStack gap={8}>
          <ConnectButton />
          <Text className='text-4xl font-bold'>
            Opps, out of funds!, let's add some
          </Text>
          <FundWallet />
        </VStack>
      </div>
    )
  }

  return (
    <div className='justify-center items-center h-screen flex'>
      <Stack direction={['column', 'row']} justifyContent={'space-around'} width={'full'} alignItems={'center'}>
        <VStack gap={8}>
          <ConnectButton />
          <FundWallet />
        </VStack>
        <VStack gap={8}>
          <Text fontSize={'4xl'}>
            Select Image To Upload
          </Text>
          <UploadImage />
        </VStack>
      </Stack>
    </div>
    // <div className='py-6 justify-center text-center container mx-auto max-w-5xl'>
    //   <div className='flex justify-center'>
    //     <ConnectButton />
    //   </div>

    //   <h1 className='text-4xl font-bold mt-6'>🚀 Bundlr</h1>

    //   <Button className='mt-10' onClick={initialiseBundlr}>Let's Get started</Button>

    //   {/* {data && activeChain.id === 80001 && */}
    //   <FundWallet />
    //   {/* } */}
    //   <UploadImage />
    // </div>
  );
};
export default Home;
