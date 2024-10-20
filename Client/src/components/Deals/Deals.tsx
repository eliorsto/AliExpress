import React from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";

interface DealItem {
  id: number;
  description: string;
  imageUrl: string;
}

const Deals: React.FC = () => {
  const newShopperDeals: DealItem[] = [
    { id: 1, description: "Best tim machine in the hood bro", imageUrl: 'https://ae-pic-a1.aliexpress-media.com/kf/S2a2fe5c079a843059205ecc627d56786h.jpg_480x480.jpg_.webp' },
    { id: 2, description: "best brush in the hood hommie", imageUrl: 'https://ae-pic-a1.aliexpress-media.com/kf/S75aae7d45ec34143b0f3a7ee1ced10c9y.jpg_480x480.jpg_.webp' },
    { id: 3, description: "Wow what a shirt!!", imageUrl: 'https://ae-pic-a1.aliexpress-media.com/kf/S6cef2262b3ea4457acf0c79bbca28699S.jpg_480x480.jpg_.webp' },
    { id: 4, description: "is it a flash light ? :O", imageUrl: 'https://ae-pic-a1.aliexpress-media.com/kf/S66b11f828fd74b05bba77b0321a6ff64I.jpg_480x480.jpg_.webp' },
  ];

  const bundleDeals: DealItem[] = [
    { id: 1, description: "Metal Cell Phone Tripod Mount Smartphone and some add ons", imageUrl: '//ae-pic-a1.aliexpress-media.com/kf/Sc79b7f69fd294f498540587afb56a12aT.jpg_480x480.jpg_.webp' },
    { id: 2, description: "Sanrio Kawaii Keychain Cute Cartoon and some add ons", imageUrl: '//ae-pic-a1.aliexpress-media.com/kf/S51a3c9904c164b50a68783a72204676ey.jpg_480x480.jpg_.webp' },
    { id: 3, description: "Anime Cute Pushigao Toji Jujutsu Kaisen Figure and some add ons", imageUrl: '//ae-pic-a1.aliexpress-media.com/kf/S1ab2ab7269294c7e8749b3ca31f2b4f1J.jpg_480x480.jpg_.webp' },
    { id: 4, description: "ONE FLIP! Board Games Playing Cards and some add ons", imageUrl: '//ae-pic-a1.aliexpress-media.com/kf/Sbf88437baf8f457cb6483fd660f1dd419.jpg_480x480.jpg_.webp' },
  ];

  const superDeals: DealItem[] = [
    { id: 1, description: "Electric Scooter Bag Accessories and some add ons", imageUrl: '//ae-pic-a1.aliexpress-media.com/kf/S58bc2ee5090643b28241c25f0c7413a57.jpg_480x480.jpg_.webp' },
    { id: 2, description: "Trail Game Camera Solar Panel Kit and some add ons", imageUrl: '//ae-pic-a1.aliexpress-media.com/kf/Se1c6d963633449b68f21537f00da2dffC.jpg_480x480.jpg_.webp' },
    { id: 3, description: "Mini Body Camera Full HD 1080P and some add ons", imageUrl: '//ae-pic-a1.aliexpress-media.com/kf/S1312f1a4457d43879f121aeb809484e3H.png_480x480.png_.webp' },
    { id: 4, description: "Monocular Night Vision Device 1080P HD and some add ons", imageUrl: '//ae-pic-a1.aliexpress-media.com/kf/Sba69f1b780f84a8ab11e26593020bc7ah.jpg_480x480.jpg_.webp' },
  ];

  const renderDealCard = (deal: DealItem) => (
    <Card key={deal.id} className="w-[70%] h-full">
      <CardBody className="p-2">
        <Image
          src={deal.imageUrl}
          alt={deal.description}
          className="w-full h-32 object-cover rounded-lg mb-2"
        />
        <p className="text-xs truncate">{deal.description}</p>
      </CardBody>
    </Card>
  );

  return (
    <div className="flex w-[60%] h-min-full flex-col gap-4 p-4">
      <div className="bg-red-600 rounded-xl p-4">
        <h2 className="text-2xl font-bold text-white mb-2">New shopper exclusive</h2>
        <p className="text-white mb-4">First order only</p>
        <div className="flex justify-between items-center bg-pink-200 rounded-lg p-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Up to 70% off</h3>
            <p className="text-gray-600">Welcome deal</p>
          </div>
          <span className="text-2xl">→</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {newShopperDeals.map(renderDealCard)}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2 bg-yellow-100 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Bundle deals</h2>
            <span className="text-sm text-gray-600">Choice 5 from US $2.99 →</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {bundleDeals.map(renderDealCard)}
          </div>
        </div>

        <div className="w-1/2 bg-red-100 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">SuperDeals</h2>
            <span className="text-sm text-gray-600">Limited time 50% off →</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {superDeals.map(renderDealCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;