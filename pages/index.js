import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard, NFTCard, SearchBar, Loader } from '../components';
import images from '../assets';
import { makeId } from '../utils/makeId';
import { getCreators } from '../utils/getTopCreators';

import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/shortenAddress';

const Home = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [hideButtons, setHideButtons] = useState(false);
  const [nfts, setnfts] = useState([]);
  const [nftsCopy, setnftsCopy] = useState([]);
  const [activeSelect, setActiveSelect] = useState('Recently Listed');
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        setnfts(items);
        setnftsCopy(items);
        setIsLoading(false);
      });
  }, []);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  const onHandleSearch = (value) => {
    const filtered = nfts.filter(({ name }) => name.toString().toLowerCase().includes(value.toString().toLowerCase()));

    if (filtered.length) {
      setnfts(filtered);
    } else {
      setnfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setnfts(nftsCopy);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  useEffect(() => {
    const sortedNFTs = [...nfts];

    switch (activeSelect) {
      case 'Price (low to high)':
        setnfts(sortedNFTs.sort((a, b) => a.price - b.price));

        break;
      case 'Price (high to low)':
        setnfts(sortedNFTs.sort((a, b) => b.price - a.price));

        break;

      case 'Recently Listed':
        setnfts(sortedNFTs.sort((a, b) => b.tokenId - a.tokenId));

        break;

      default:
        break;
    }
  }, [activeSelect]);

  const topCreators = getCreators(nftsCopy);

  console.log(topCreators);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          banner={(<>Discover, collect, and sell <br />extraordinary NFTs</>)}
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-lef text-white"
          parentStyles="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />

        {!isLoading && !nfts.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 sm:ml-0">That&apos;s weird... no NFTs for sale.</h1>
        ) : isLoading ? <Loader /> : (
          <>
            <div>
              <h1 className="font-poppins dark:text-white text-nft-black-1 text-2x1 minlg:text-4xl font-semibold ml-4 xs:ml-0">
                Top Sellers
              </h1>

              <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
                <div
                  className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                  ref={scrollRef}
                >
                  {topCreators.map((creator, i) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={i + 1}
                      creatorImage={images[`creator${(i % 10) + 1}`]}
                      creatorEths={creator.sum}
                      creatorName={shortenAddress(creator.seller)}
                    />
                  ))}
                  {/* {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorEths={10 - i * 0.5}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                />
              ))} */}
                  {!hideButtons && (
                  <>
                    <div
                      className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                      onClick={() => handleScroll('left')}
                    >
                      <Image
                        src={images.left}
                        layout="fill"
                        objectFit="contain"
                        alt="left"
                        className={theme === 'light' ? 'filter invert' : ''}
                      />
                    </div>

                    <div
                      className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                      onClick={() => handleScroll('right')}
                    >
                      <Image
                        src={images.right}
                        layout="fill"
                        objectFit="contain"
                        alt="left"
                        className={theme === 'light' ? 'filter invert' : ''}
                      />
                    </div>
                  </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2x1 minlg:text-4xl font-semibold sm:mb-4 flex-1">
                  Top NFTs
                </h1>
                <div className="flex-2 w-full flex flex-row sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nify NFT ${i}`,
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  price: (10 - i * 0.534).toFixed(2),
                  description: 'Cool NFT on Sale.',

                }}
              />
            ))} */}
              </div>
            </div>

          </>

        )}

      </div>
    </div>
  );
};

export default Home;
