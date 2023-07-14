import React, { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button, Input } from '../components';
import images from '../assets';

const createNFT = () => {
  const { theme } = useTheme();
  const [fileURL, setfileURL] = useState(null);

  const [forumInput, setForumInput] = useState({ price: '', name: '', description: '' });

  const onDrop = useCallback(() => {}, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () => `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && ' border-file-active'}
    ${isDragAccept && ' border-file-accept'}
    ${isDragReject && ' border-file-reject'}
    `,
    [isDragActive, isDragAccept, isDragReject],
  );

  console.log(forumInput);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2x1 minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Create a New NFT:
        </h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload File
          </p>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM Max 100mb
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    w={100}
                    h={100}
                    objectFit="contain"
                    alt="fileUpload"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag N' Drop
                </p>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Browse Media
                </p>
              </div>
            </div>
            {fileURL && (
              <aside>
                <div>
                  <img src={fileURL} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleClick={(e) => setForumInput({ ...forumInput, name: e.target.value })}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) => setForumInput({ ...forumInput, description: e.target.value })}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="Enter Price"
          handleClick={(e) => setForumInput({ ...forumInput, price: e.target.value })}
        />

        <div className="mt-7 w-full flex justify-end ">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default createNFT;
