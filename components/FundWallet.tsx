import React from 'react'
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from '@chakra-ui/react'
import { useBundler } from '@/state/bundlr.context';

const FundWallet = () => {
    const { fundWallet, balance } = useBundler();
    const [value, setValue] = React.useState('0.02')

    return (
        <div className='mt-12'>
            <VStack gap={6}>
                <Text fontSize={'xl'}>
                    Your current balace is: {balance || 0} $BNDLR
                </Text>
                <NumberInput className='mx-auto' step={0.01} defaultValue={value}
                    onChange={(valueString) => setValue(valueString)}
                >
                    <NumberInputField />
                    <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <Button onClick={() => fundWallet(+value)}>💸 Add Fund</Button>
            </VStack>
        </div>
    )
}

export default FundWallet