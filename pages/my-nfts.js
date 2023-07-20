import Image from 'next/image';
import React, { useContext } from 'react';
import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader, Banner } from '../components';
import images from '../assets';

const myNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      My NFTs.
    </div>
  );
};

export default myNFTs;
