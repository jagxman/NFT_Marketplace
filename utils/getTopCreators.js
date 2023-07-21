export const getCreators = (nfts) => {
  const creators = nfts.reduce((creatorObj, nft) => {
    (creatorObj[nft.seller] = creatorObj[nft.seller] || []).push(nft);

    return creatorObj;
  }, {});

  return Object.entries(creators).map((creator) => {
    const seller = creator[0];
    const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr + 0);
    return ({ seller, sum });
  });
};

// let tops = [];

// for (let i = 0; i < nfts.length; i += 1) {
//   if (tops.length === 0) {
//     tops = [{ price: Number(nfts[i].price), seller: nfts[i].seller }];
//   }

//   const checker = tops.find((obj) => obj.seller === nfts[i].seller);
//   if (checker) {
//     checker.price += Number(nfts[i].price);
//   } else {
//     tops = [...tops, { price: Number(nfts[i].price), seller: nfts[i].seller }];
//   }
// }

// console.log(tops);
