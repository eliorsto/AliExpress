import React, { useEffect, useState } from "react";
import {
  Button,
  Pagination,
  Card,
  CardBody,
  CardHeader,
  Image,
  Skeleton,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useScrapeData } from "../../App";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { setShoppingCartItems } from "../../store/store";
import CategoriesCarousel from "../../components/Carousel/CatCarousel";
import Deals from "../../components/Deals/Deals";
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { cards, currentSearch, shoppingCartItems } = useSelector(
    (state: any) => state.user
  );

  const { getData, loading } = useScrapeData();

  useEffect(() => {
    if (currentSearch) {
      getData(currentSearch, page);
    }
  }, [page, currentSearch]);

  useEffect(() => {
    localStorage.setItem("clone_cart", JSON.stringify(shoppingCartItems));
  }, [shoppingCartItems]);

  return (
    <>
      <div className="flex flex-col items-center w-full min-h-[100vh] pt-32 bg-background">
        <div className="flex flex-wrap justify-center gap-2 w-full h-full p-5">
          {loading ? (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-[23%] min-h-[50%] h-72 aspect-square p-0"
                />
              ))}
            </>
          ) : cards.length > 0 ? (
            <>
              {cards.map((card: any) => (
                <Button
                  key={card.image}
                  className="relative w-[23%] min-h-[50%] h-72 aspect-square p-0"
                  onClick={() =>
                    navigate("/product", { state: { product: card } })
                  }
                >
                  <Card className="flex flex-col justify-center h-full w-full">
                    <CardHeader className="flex justify-center w-full">
                      <Image
                        className="object-cover aspect-video rounded-xl self-center"
                        src={card.image}
                        alt={card.headline}
                        width={300}
                      />
                    </CardHeader>
                    <CardBody className="truncate flex justify-between items-center flex-col">
                      <h3>{card.headline}</h3>
                      <p>{card.price}</p>
                    </CardBody>
                  </Card>
                  <Button
                    className="absolute rounded-full hover:-translate-y-1 bg-red-600 font-bold text-xl bottom-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        shoppingCartItems.some(
                          (item: any) => item.image === card.image
                        )
                      ) {
                        dispatch(
                          setShoppingCartItems(
                            shoppingCartItems.map((item: any) => {
                              if (item.image === card.image)
                                return { ...item, amount: item.amount + 1 };
                              return item;
                            })
                          )
                        );
                      } else {
                        dispatch(
                          setShoppingCartItems([
                            ...shoppingCartItems,
                            { ...card, amount: 1 },
                          ])
                        );
                      }
                    }}
                  >
                    <ShoppingCart />
                  </Button>
                </Button>
              ))}
            </>
          ) : (
            !loading &&
            currentSearch && (
              <div className="min-h-[100vh] w-full flex items-center justify-center">
                <div>No items found for your search, Please try again.</div>
              </div>
            )
          )}
        </div>
        {!currentSearch && <CategoriesCarousel />}
        {!currentSearch && <Deals/>}
        <div className="w-full p-4 flex items-center justify-center">
          {cards.length > 0 && !loading && (
            <Pagination
              total={10}
              initialPage={1}
              size={"lg"}
              page={page}
              onChange={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
