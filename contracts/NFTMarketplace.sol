//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;


    uint256 listingPrice = 0.025 ether;

    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem{
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;


    }


    event MarketItemCreated (
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor(){
        owner = payable(msg.sender);

    }

    function updateListingPrice(uint _ListingPrice) public payable {
        require(owner == msg.sender, message, "Only marketplace owner can update the listing price");

        listingPrice = _ListingPrice; 
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
        
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256){
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;

    }

    function createMarketItem(uint256 tokenID, uint256 price) private {
        require(price > 0, "price must be at least 1");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenID] = marketItem(
            tokenID,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenID);

        emit marketItemCreated(tokenID, msg.sender, address(this), price, false);

    }

    function resellToken(uint256 tokenID, uint256 price) public payable {
        require(idToMarketItem[tokenID].owner == mesg.sender, "Only Item owner can perform this operation.");
        require(msg.value == listenPrice, "Price must be equal to listing price");

        idToMarketItem[tokenID].sold = false;
        idToMarketItem[tokenID].price = price;
        idToMarketItem[tokenID].seller = payable(msg.sender);
        idToMarketItem[tokenID].owner = payable(address(this));
        

        _itemsSold.decrement();
        _transfer(msg.sender, address(this), tokenID);
    }


    function createMarketSale(uint256 tokenID) public payable {
        uint price = idToMarketItem[tokenID].price;
        require(msg.value == price, "Asking Price must be me met to complete the purchase");

        idToMarketItem[tokenID].owner = payable(msg.sender);
        idToMarketItem[tokenID].sold = true;
        idToMarketItem[tokenID].seller = payable(address(0));

        _itemsSold.increment();
        
        _transfer(address(this), msg.sender, tokenID);

        payable(owner.transfer(listingPrice));
        payable(idToMarketItem[tokenID].seller).transfer(msg.value);
        
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++){
            if (idToMarketItem[i + 1].owner == address(this)){
                uint currentId  = i + 1;

                MarketItem storage currentItem = idToMarketItem[currentId];
                
                items[currentIndex] = currentItem;
                
                currentIndex +=1;
            }
        }

        return items;
         
    } 

     function fetchMyNFTs() public view returns (MarketItem[] memory) {

        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++){
            if (idToMarketItem[i + 1].owner == msg.sender){
                itemCount +=1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

          for (uint i = 0; i < totalItemCount; i++){
            if (idToMarketItem[i + 1].owner == msg.sender){
                uint currentId  = i + 1;

                MarketItem storage currentItem = idToMarketItem[currentId];
                
                items[currentIndex] = currentItem;
                
                currentIndex +=1;
            }
        }

        return items;
     }


     function fetchItemsListed() public view returns (MarketItem[] memory){
        
     }


}
