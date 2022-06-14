import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, ButtonGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from '@chakra-ui/react';
import { useBundler } from '@/state/bundlr.context';
import { useRef, useState } from 'react';

const Home: NextPage = () => {
  const { initialiseBundlr, fundWallet, balance, uploadFile } = useBundler();
  const [URI, setURI] = useState('')
  const [file, setFile] = useState<Buffer>()
  const [image, setImage] = useState('')
  const hiddenFileInput = useRef(null);


  function onFileChange(e: any) {
    const file = e.target.files[0]
    if (file) {
      const image = URL.createObjectURL(file)
      setImage(image)
      let reader = new FileReader()
      reader.onload = function () {
        if (reader.result) {
          setFile(Buffer.from(reader.result as any))
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleUpload = async () => {
    const res = await uploadFile(file);
    console.log('res.data', res.data);
    setURI(`http://arweave.net/${res.data.id}`)
  }

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

      {
        balance && (
          <div className='flex flex-col mt-20 justify-center items-center'>

            <>
              <Button onClick={handleClick} className='my-4'>
                {image ? 'Change Selection' : 'Select Image'}
              </Button>
              <input
                accept="image/png, image/gif, image/jpeg"
                type="file"
                ref={hiddenFileInput}
                onChange={onFileChange}
                style={{ display: 'none' }}
              />
            </>

            {/* <input
              type="file"
              onChange={onFileChange}
            /> */}
            {
              image &&
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                width='100%'
                // height={'100%'}
                py={40}
                bgImage={`url('${image}')`}
                bgPosition='center'
                bgRepeat='no-repeat'
                mb={2}
              >
                <ButtonGroup gap='4'>
                  <Button colorScheme='blackAlpha' onClick={handleUpload}>Upload File</Button>
                </ButtonGroup>
              </Box>
              // <img src={image} style={{ width: '200px' }} />
            }

            {/* <Button className='mt-4'>Upload File</Button> */}


            {
              URI && <Text className='mt-4'>
                <Text fontSize='xl'> Uploaded File:</Text> <a href={URI} target="_blank">{URI}</a>
              </Text>
            }
          </div>
        )
      }
    </div>

    // </div >
  );
};
export default Home;
