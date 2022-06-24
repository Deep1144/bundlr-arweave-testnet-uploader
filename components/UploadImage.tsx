import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react';
import { useBundler } from '@/state/bundlr.context';
import { useRef, useState } from 'react';

const UploadImage = () => {
    const { balance, uploadFile } = useBundler();
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
        <>
            {
                balance && (
                    <div className='flex flex-col mt-20 justify-center items-center w-full'>

                        <>
                            <Button onClick={handleClick} className='mb-4'>
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

                        {
                            image &&
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                width='100%'
                                py={40}
                                bgImage={`url('${image}')`}
                                bgPosition='center'
                                bgRepeat='no-repeat'
                                mb={2}
                            >
                                <button className='bg-gray-200 rounded px-8 py-2 text-black hover:bg-gray-100' onClick={handleUpload}>Upload File</button>
                            </Box>
                        }

                        {
                            URI && <Text className='mt-4'>
                                <Text fontSize='xl'> Uploaded File:</Text> <a href={URI} target="_blank">{URI}</a>
                            </Text>
                        }
                    </div>
                )
            }</>
    )
}

export default UploadImage