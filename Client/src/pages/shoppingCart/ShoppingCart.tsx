import { useEffect, useState } from "react";
// import { setFullName, setShowAuth, setToken } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Chip, cn, Button, Image } from "@nextui-org/react";
import { Check, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setShoppingCartItems, setShowAuth } from "../../store/store";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

type Card = {
  headline: string;
  price: string;
  image: string;
  amount: number;
};

const ShoppingCart: React.FC = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Card[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showPaypal, setShowPaypal] = useState(false)

  const { shoppingCartItems, token } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedItems);
    if (selectedItems.length > 0) {
      const values = selectedItems.map(
        (item) =>
          parseFloat(item.price.slice(1).replace(/,/g, "")) * item.amount
      );
      setTotal(values.reduce((sum, curr) => sum + curr));
    } else {
      setTotal(0);
    }
  }, [selectedItems]);

  useEffect(() => {
    localStorage.setItem("clone_cart", JSON.stringify(shoppingCartItems));
  }, [shoppingCartItems]);

  return !showPaypal ? (
    <>
      <div className="flex w-full min-h-[100vh] pt-52 bg-background justify-center">
        {shoppingCartItems ? (
          <>
            <div className="flex flex-wrap justify-center gap-2 w-[50%] h-full p-5 flex-col bg-gray-900 rounded-xl mr-5 ">
              <h2 className="text-3xl pb-5">
                Shopping Cart ({shoppingCartItems.length})
              </h2>
              <div className="flex w-full pb-5">
                <Checkbox
                  className=""
                  isSelected={isSelected}
                  onValueChange={() => {
                    setIsSelected(!isSelected);

                    if (!isSelected) {
                      setSelectedItems(shoppingCartItems);
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                >
                  Select all items
                </Checkbox>
                <Button
                  onClick={() => {
                    const images = selectedItems.map((item) => item.image);
                    dispatch(
                      setShoppingCartItems(
                        shoppingCartItems.filter(
                          (item: any) => !images.includes(item.image)
                        )
                      )
                    );
                  }}
                  className="bg-transparent ml-32 text-blue-400"
                >
                  Delete selected items
                </Button>
              </div>
              <div className="flex flex-col gap-8">
                {shoppingCartItems.map((item: Card) => {
                  return (
                    <Checkbox
                      classNames={{
                        base: cn(
                          "inline-flex w-full max-w-full bg-content1",
                          "hover:bg-content2 items-center justify-start",
                          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                          "data-[selected=true]:border-primary"
                        ),
                        label: "w-full",
                      }}
                      isSelected={selectedItems
                        .map((item) => item.image)
                        .includes(item.image)}
                      onValueChange={() => {
                        if (
                          selectedItems
                            .map((item) => item.image)
                            .includes(item.image)
                        ) {
                          setSelectedItems(
                            selectedItems.filter(
                              (selected) => selected.image !== item.image
                            )
                          );
                        } else {
                          setSelectedItems([...selectedItems, item]);
                        }
                      }}
                    >
                      <div className="w-full flex justify-between gap-2">
                        <Image src={item.image} width={120} height={120} />
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-tiny text-default-500">
                            {item.headline}
                          </span>
                          <div className=" flex w-32 justify-between items-center bg-black/40 rounded-md p-1">
                            <button
                              onClick={() => {
                                if (item.amount > 1) {
                                  dispatch(
                                    setShoppingCartItems(
                                      shoppingCartItems.map((selected: any) =>
                                        selected.image === item.image
                                          ? {
                                            ...item,
                                            amount: selected.amount - 1,
                                          }
                                          : item
                                      )
                                    )
                                  );
                                  setSelectedItems(
                                    selectedItems.map((selected: any) => {
                                      if (selected.image === item.image) {
                                        return {
                                          ...item,
                                          amount: selected.amount - 1,
                                        };
                                      } else {
                                        return selected;
                                      }
                                    })
                                  );
                                }
                              }}
                              className="w-[25%] flex justify-center items-center p-0 bg-slate-400 text-black rounded-full"
                            >
                              -
                            </button>
                            <div
                              className="w-[50%] flex items-center justify-center
                                            "
                            >
                              {item.amount}
                            </div>
                            <button
                              onClick={() => {
                                dispatch(
                                  setShoppingCartItems(
                                    shoppingCartItems.map((selected: any) =>
                                      selected.image === item.image
                                        ? { ...item, amount: item.amount + 1 }
                                        : item
                                    )
                                  )
                                );
                                setSelectedItems(
                                  selectedItems.map((selected: any) => {
                                    if (selected.image === item.image) {
                                      return {
                                        ...item,
                                        amount: selected.amount + 1,
                                      };
                                    } else {
                                      return selected;
                                    }
                                  })
                                );
                              }}
                              className="w-[25%] flex justify-center items-center p-0 bg-slate-400 text-black rounded-full"
                            >
                              +
                            </button>
                          </div>
                          <Chip color="success" size="sm" variant="flat">
                            {item.price}
                          </Chip>
                        </div>
                      </div>
                    </Checkbox>
                  );
                })}
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl w-[20%] p-5 mb-5 max-h-fit flex flex-col justify-between">
              <h1 className="text-3xl font-bold">Summary</h1>
              <div className="flex justify-evenly">
                <div>total</div>
                <div>₪ {total.toLocaleString()}</div>
              </div>
              <div className="w-full flex items-center justify-center">
                <Button className="bg-red-600 w-[70%] text-lg font-bold rounded-2xl"
                  onClick={() => {
                    if (!token) {
                      dispatch(setShowAuth(true))
                    } else {
                      setShowPaypal(true);
                    }
                  }}>
                  Checkout ({selectedItems.length})
                </Button>
              </div>
              <div>
                <div className="flex"><Check color="green" />&nbsp; Fast delivery $1.00 coupon code if delayed </div>
                <div className="flex"><Check color="green" />&nbsp; Refund if package lost </div>
                <div className="flex"><Check color="green" />&nbsp; Refund if items damaged </div>
                <div className="flex"><Check color="green" />&nbsp; Refund if no delivery in 30 days </div>
                <br />
                <div className="font-bold">Security & Privacy Safe payments·Secure personal details</div>
                <br /> Safe
                Payments With popular payment partners, your personal details
                are safe. More to love
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-start mt-20 items-center">
              <ShoppingBasket color="#ffffff" width="200px" height="200px" />
              <h2>No items yet? Continue shopping to explore more.</h2>
              <Button
                onClick={() => dispatch(setShowAuth(true))}
                className="w-[70%] mt-5 bg-red-600 text-medium font-bold"
              >
                Sign in
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="w-[70%] mt-5 bg-gray-500 text-medium font-bold"
              >
                Explore items
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  ) : <>
    <div className="flex w-full min-h-[100vh] pt-52 bg-background justify-center text-center">
      <PayPalScriptProvider options={{ clientId: "AQu6mNRzH2g9sEE0j0h3fwpMXYWUzLVQhwU_B4e5Ec3wRYs3EgR8WPOsvsjnv_M35S6zKD_a-zBXeZxO" }}>
        <div className="p-10 bg-black">
          <h1 className="font-bold text-2xl mb-10">Pay with Paypal</h1>
          <PayPalButtons className="p-3 w-full" createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "ILS",
                    value: total.toFixed(2),
                  }
                }
              ],
              intent: "CAPTURE"
            })
          }}
            onApprove={async (data, actions) => {
              return actions.order?.capture().then(function (details) {
                alert("Transaction completed")
                setShowPaypal(false)
              })
            }}
            onCancel={() => {
              setShowPaypal(false);
            }}
            onError={(err) => {
              alert("An error occurred with PayPal. Please try again.");
              setShowPaypal(false);
            }} />
        </div>

      </PayPalScriptProvider>
    </div>
  </>;
};

export default ShoppingCart;
