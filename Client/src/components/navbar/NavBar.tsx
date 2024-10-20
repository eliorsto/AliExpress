import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
} from "@nextui-org/react";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  Download,
  LogOut,
} from "lucide-react";
import logo from "../../assets/xExpress.png";
import LogoHover from "../../assets/logohover.png";
import { useDispatch, useSelector } from "react-redux";
import { setShowAuth, setToken, setFullName } from "../../store/store";
import { useScrapeData } from "../../App";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subOpen, setSubOpen] = useState("");
  const [value, setValue] = useState("");
  const { getData } = useScrapeData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { token, fullName, shoppingCartItems } = useSelector((state: any) => state.user);
  const categories = [
    {
      name: "Home & Garden",
      subcategories: [
        "Furniture",
        "Home Decor",
        "Kitchen & Dining",
        "Bedding",
        "Bathroom",
      ],
    },
    {
      name: "Hair Extensions & Wigs",
      subcategories: [
        "Human Hair Wigs",
        "Synthetic Wigs",
        "Hair Extensions",
        "Hair Accessories",
      ],
    },
    {
      name: "Men's Clothing",
      subcategories: ["Shirts", "Pants", "Suits", "Outerwear", "Underwear"],
    },
    {
      name: "Accessories",
      subcategories: ["Jewelry", "Watches", "Bags", "Sunglasses", "Belts"],
    },
    {
      name: "Consumer Electronics",
      subcategories: [
        "Smartphones",
        "Laptops",
        "Tablets",
        "Cameras",
        "Audio Devices",
      ],
    },
    {
      name: "Home Improvement & Lighting",
      subcategories: [
        "Light Bulbs",
        "Lamps",
        "Ceiling Lights",
        "Wall Lights",
        "Outdoor Lighting",
      ],
    },
    {
      name: "Home Appliances",
      subcategories: [
        "Refrigerators",
        "Washing Machines",
        "Dishwashers",
        "Vacuum Cleaners",
        "Air Conditioners",
      ],
    },
    {
      name: "Automotive & Motorcycle",
      subcategories: [
        "Car Parts",
        "Motorcycle Parts",
        "Car Electronics",
        "Motorcycle Accessories",
        "Tools",
      ],
    },
    {
      name: "Luggages & Bags",
      subcategories: [
        "Suitcases",
        "Backpacks",
        "Handbags",
        "Travel Accessories",
        "Business Bags",
      ],
    },
    {
      name: "Shoes",
      subcategories: [
        "Men's Shoes",
        "Women's Shoes",
        "Kids' Shoes",
        "Sports Shoes",
        "Shoe Accessories",
      ],
    },
    {
      name: "Special Occasion Costume",
      subcategories: [
        "Halloween Costumes",
        "Cosplay Costumes",
        "Party Costumes",
        "Carnival Costumes",
        "Accessories",
      ],
    },
    {
      name: "Women's Clothing",
      subcategories: [
        "Dresses",
        "Tops",
        "Pants & Skirts",
        "Outerwear",
        "Lingerie",
      ],
    },
    {
      name: "Camera & Photo",
      subcategories: [
        "Digital Cameras",
        "Lenses",
        "Camera Accessories",
        "Drones",
        "Film Cameras",
      ],
    },
    {
      name: "Games & Accessories",
      subcategories: [
        "Video Games",
        "Consoles",
        "Gaming Accessories",
        "Board Games",
        "VR Devices",
      ],
    },
    {
      name: "Smart Electronics",
      subcategories: [
        "Smart Home Devices",
        "Wearable Technology",
        "Smart Speakers",
        "Smart Lighting",
        "Smart Security",
      ],
    },
  ];

  useEffect(() => {
    const validateUser = async () => {
      const refreshToken = localStorage.getItem("clone_token");

      try {
        if (refreshToken && !token) {
          const res = await axios.post(
            "http://localhost:3002/auth/replace",
            {},
            {
              headers: {
                refreshToken,
              },
            }
          );

          if (res.status === 200) {
            dispatch(setToken(res.data.token));
            dispatch(setFullName(res.data.fullName));
          }
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
      }
    };

    validateUser();
  }, [dispatch, token]);

  const handleSearchAndNavigate = (searchTerm: string) => {
    getData(searchTerm);
    navigate("/");
  };

  const handleSignOut = () => {
    localStorage.removeItem("clone_token");
    dispatch(setToken(null));
    dispatch(setFullName(null));
  };
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/GTFO.txt';
    link.download = 'GTFO.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const clearSearchHistory = () => {
    getData("");
    setValue("");
    navigate("/");
  };


  return (
    <div className="flex flex-col fixed w-full z-50">
      <Navbar maxWidth="full" className="bg-gray-800/65 text-white p-2 flex">
        <NavbarContent>
          <NavbarBrand>
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={clearSearchHistory}
            >
              <Image
                src={isHovered ? LogoHover : logo}
                alt="xExpress Logo"
                className="h-12 transition-opacity duration-300"
                style={{ opacity: isHovered ? 0.8 : 1 }}
              />
            </button>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex-grow" justify="center">
          <NavbarItem className="flex-grow max-w-xl">
            <Input
              onInput={(e) => setValue(e.currentTarget.value)}
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal",
              }}
              placeholder="meta quest 3 accessories"
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  handleSearchAndNavigate(value);
                }
              }}
            />
          </NavbarItem>
          <NavbarItem>
            <Button
              onClick={() => handleSearchAndNavigate(value)}
              className="bg-red-600"
              variant="solid"
            >
              Search
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant="light" className="text-white" onClick={handleDownload}>
              <Download size={18} className="mr-1" />
              Download App
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="light" className="text-white">
              EN/USD
            </Button>
          </NavbarItem>
          {token ? (
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" className="text-white">
                    {fullName}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem onClick={handleSignOut} className="flex">
                    <div className="flex items-center">
                      <LogOut size={18} className="mr-2" />
                      <div>Sign Out</div>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button
                variant="light"
                className="text-white"
                onClick={() => dispatch(setShowAuth(true))}
              >
                <UserIcon size={18} className="mr-1" />
                Account
              </Button>
            </NavbarItem>
          )}
          <NavbarItem>
            <Button
              variant="light"
              className="text-white"
              onClick={() => navigate("/shopping-cart")}
            >
              <ShoppingCartIcon size={18} className="mr-1" />
              Cart ({shoppingCartItems.length})
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="bg-gray-800/65 p-2 flex items-center justify-center">
        <div
          className="mr-32"
          onMouseEnter={() => {
            setIsOpen(true);
            setSubOpen("");
          }}
          onMouseLeave={() => {
            setSubOpen("");
            setIsOpen(false);
          }}
        >
          <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
            <DropdownTrigger>
              <Button
                onMouseEnter={() => setSubOpen("")}
                className="text-white hover:bg-gray-500"
              >
                All Categories
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onMouseEnter={() => setSubOpen("")}
              aria-label="Categories"
              className="w-64"
            >
              {categories.map((category) => (
                <DropdownItem
                  onMouseEnter={() => setSubOpen(category.name)}
                  key={category.name}
                  className="hover:bg-gray-200"
                >
                  <div className="flex justify-between items-center w-full">
                    <span>{category.name}</span>
                    <span>&gt;</span>
                  </div>
                  <Dropdown
                    isOpen={subOpen === category.name && subOpen !== ""}
                    placement="right-start"
                  >
                    <DropdownTrigger
                      onClick={() => {
                        handleSearchAndNavigate(category.name);
                        setIsOpen(false);
                        setSubOpen("");
                      }}
                    >
                      <div className="absolute inset-0"></div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label={`${category.name} Subcategories`}>
                      {category.subcategories.map((subcat) => (
                        <DropdownItem
                          onClick={() => {
                            handleSearchAndNavigate(subcat);
                            setIsOpen(false);
                            setSubOpen("");
                          }}
                          key={subcat}
                        >
                          <div>{subcat}</div>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex space-x-28 ml-4 font-semibold">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSearchAndNavigate("Choice");
            }}
            className="text-[18px] text-white hover:text-red-600"
          >
            Choice
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSearchAndNavigate("Business");
            }}
            className="text-[18px] text-white hover:text-red-600"
          >
            xExpress Business
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSearchAndNavigate("SuperDeals");
            }}
            className="text-[18px] text-white hover:text-red-600"
          >
            SuperDeals
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSearchAndNavigate("Plus");
            }}
            className="text-[18px] text-white hover:text-red-600"
          >
            Plus
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSearchAndNavigate("New");
            }}
            className="text-[18px] text-white hover:text-red-600"
          >
            New
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
