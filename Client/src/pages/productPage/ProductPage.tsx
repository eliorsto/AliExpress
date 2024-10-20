import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCartItems } from "../../store/store";

// Custom hook for image zoom (unchanged)
const useImageZoom = (
  imgRef: React.RefObject<HTMLImageElement>,
  zoomLevel = 2
) => {
  const [zoomed, setZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setZoomed(true);
  const handleMouseLeave = () => setZoomed(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imgRef.current) {
      const { left, top, width, height } =
        imgRef.current.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  return {
    zoomed,
    mousePosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    zoomLevel,
  };
};

const ProductPage: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;
  const dispatch = useDispatch();
  const { shoppingCartItems } = useSelector((state: any) => state.user);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000));
  const [isLiked, setIsLiked] = useState(false);
  const [itemsLeft, setItemsLeft] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const {
    zoomed,
    mousePosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    zoomLevel,
  } = useImageZoom(imgRef, 2.5);

  useEffect(() => {
    setItemsLeft(Math.floor(Math.random() * 200) + 1);
  }, []);

  const handleAddToCart = () => {
    if (shoppingCartItems.some((item: any) => item.image === product.image)) {
      dispatch(
        setShoppingCartItems(
          shoppingCartItems.map((item: any) => {
            if (item.image === product.image)
              return { ...item, amount: item.amount + 1 };
            return item;
          })
        )
      );
    } else {
      dispatch(
        setShoppingCartItems([...shoppingCartItems, { ...product, amount: 1 }])
      );
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background pt-16">
      <div className="flex w-[90%] max-w-[55%] gap-6 bg-gray-800 p-6 rounded-lg shadow-xl">
        <div
          className="w-1/2 relative overflow-hidden cursor-zoom-in rounded-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <img
            ref={imgRef}
            src={product.image}
            alt={product.headline}
            className="w-full h-full object-cover"
            style={{
              transform: zoomed ? `scale(${zoomLevel})` : "scale(1)",
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4 justify-center">
          <h1 className="text-xl font-bold text-white">{product.headline}</h1>
          <p className="text-3xl font-semibold text-white">{product.price}</p>
          <p className="text-gray-300">
            {itemsLeft > 100 ? "100+ left" : `${itemsLeft} left`} in stock
          </p>
          <div className="flex gap-4">
            <Button
              className="flex-grow bg-red-600 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </Button>
            <Button
              className={`bg-gray-200 ${
                isLiked ? "text-red-500" : "text-gray-800"
              }`}
              onClick={handleLike}
            >
              <Heart
                className="mr-2"
                size={20}
                fill={isLiked ? "currentColor" : "none"}
              />
              <span>{likes}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
