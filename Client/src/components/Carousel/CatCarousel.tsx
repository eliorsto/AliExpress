import { useState, useRef, useEffect } from "react";
import { Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useScrapeData } from "../../App";

interface Category {
  id: number;
  name: string;
  image: string;
}

const CategoriesCarousel: React.FC = () => {
  const navigate = useNavigate();
  const { getData } = useScrapeData();
  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: "Home & Garden",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S3b6c9b38f6a84e648d61204846191266t/440x440.png_480x480.png_.webp",
    },
    {
      id: 2,
      name: "Men's Clothing",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S1a23b2690ccb4bf184a36abfe2b84e10A/440x440.png_480x480.png_.webp",
    },
    {
      id: 3,
      name: "Consumer Electronics",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/Sa60c45c7822f4b90a3b3933121fbbcbcN/440x440.png_480x480.png_.webp",
    },
    {
      id: 4,
      name: "Home Appliances",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/Sc0cb08e3bd4b47da878b33a265df50e66/440x440.png_480x480.png_.webp",
    },
    {
      id: 5,
      name: "Luggages & Bags",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/Scff639e6d81b4ad98b694873cac35d7db/440x440.png_480x480.png_.webp",
    },
    {
      id: 6,
      name: "Special Occasion Costume",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S23bc308e9c794d4b9484186fbc0b58f6Z/440x440.png_480x480.png_.webp",
    },
    {
      id: 7,
      name: "Sports & Entertainment",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/Scf0db78b715440389d2793da087c89d24/440x440.png_480x480.png_.webp",
    },
    {
      id: 8,
      name: "Babies & Kids",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S09f53523788f4b7f82a56e8bc7684b1dh/440x440.png_480x480.png_.webp",
    },
    {
      id: 9,
      name: "Computer, Office & Education",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S1d99ec8263754e49a138aa37ac6585f4E/440x440.png_480x480.png_.webp",
    },
    {
      id: 10,
      name: "Pet Supplies",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/Sf590feda1750435a920b49ca09f75220W/440x440.png_480x480.png_.webp",
    },
    {
      id: 11,
      name: "Hair Extensions & Wigs",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S7ee5799f76124cd8b02d089b36eae2f3r/440x440.png_480x480.png_.webp",
    },
    {
      id: 12,
      name: "Accessories",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S90581ba5eaf64a51a3d78145b46a9164L/440x440.jpg_480x480.jpg_.webp",
    },
    {
      id: 13,
      name: "Home Improvement & Lighting",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S8243e69aaf1c423682fc614a60b957bbn/440x440.png_480x480.png_.webp",
    },
    {
      id: 14,
      name: "Automotive & Motorcycle",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S14bc071ed2414249b7d49f875f4dd486T/440x440.png_480x480.png_.webp",
    },
    {
      id: 15,
      name: "Shoes",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S430d82a8342b4cac909fc95d877ad6e1x/440x440.png_480x480.png_.webp",
    },
    {
      id: 16,
      name: "Women's Clothing",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S4731795737da45c09cc23bbc25f1bdf1I/440x440.png_480x480.png_.webp",
    },
    {
      id: 17,
      name: "Toys & Games",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S44f59311d0f7498f8a1d5c997e854dd0i/440x440.png_480x480.png_.webp",
    },
    {
      id: 18,
      name: "Phones & Telecommunication",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S58b9811454e14026b7261cc264cfff3fY/440x440.png_480x480.png_.webp",
    },
    {
      id: 19,
      name: "Furniture",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S8d22e67f26b546478403f0b427d8cd19j/440x440.png_480x480.png_.webp",
    },
    {
      id: 20,
      name: "Security & Protection",
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S53dc8295a6904051be85de8d544a2049G/440x440.png_480x480.png_.webp",
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const SCROLL_SPEED = 0.3125;

  const handleCategoryClick = (categoryName: string) => {
    getData(categoryName);
    navigate("/");
  };

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;

    let animationFrameId: number;

    const animateScroll = () => {
      if (!isPaused) {
        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + SCROLL_SPEED;
          if (newPosition >= scrollWidth / 2) {
            return 0;
          }
          return newPosition;
        });
      }

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [SCROLL_SPEED, isPaused]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="w-full py-8 bg-background">
      <h2 className="text-3xl font-bold text-center mb-8">
        Shop by categories
      </h2>

      <div
        className="relative w-full overflow-hidden"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex"
          style={{
            width: `${categories.length * 200 * 2}px`,
          }}
        >
          {[...categories, ...categories].map((category, index) => (
            <div
              key={`${category.id}-${index}`}
              className="w-48 h-60 mr-2 flex flex-col items-center cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="w-36 h-36 mb-2">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div className="h-16 flex items-center">
                <p className="text-sm text-center font-semibold px-2">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesCarousel;
