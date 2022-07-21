import Link from "next/link";

import useWishlistState from "../hooks/useWishlistState";
import useSnipcartCount from "../hooks/useSnipcartCount";
import MyImage from "./Logo";
import Burgermenu from "./Burgermenu";
const Layout = ({ children }) => {
  const { hasItems } = useWishlistState();
  const { cart } = useSnipcartCount();
  const cartHasItems = cart.items.count !== 0;

  return (
    <>
      <header className="py-2 md:py-4 text-transform: uppercase">
        <div className=" mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="md:w-1/3">
              <nav className="flex items-center justify-start space-x-3 md:space-x-6">
                <button
                  className="snipcart-customer-signin px-2 bg-gradient-to-t from-black to-black bg-[length:0%_100%] bg-left bg-no-repeat duration-300 ease-in-out group-hover:bg-[length:100%_100%] group-hover:text-white">
                  <span>ACCOUNT</span>
                </button>
                <Link href="/terms-of-sale">
                  <a className="text-gray-800 hover:text-blue-600 p-1 transition hidden">
                    Terms of Sale
                  </a>
                </Link>
              </nav>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <Link href="/">
                <a className="flex items-center text-gray-900">
                  <MyImage />
                </a>
              </Link>
            </div>
            <div className="md:w-1/3 flex items-center justify-end space-x-3 -mr-2.5">

              <Link href="/wishlist">
                <a
                  className="px-2 text-gray-800 hover:text-blue-600 rounded-md cursor-pointer focus:outline-none focus:text-blue-600 relative transition"
                  aria-label="Wishlist"
                >
                  {hasItems && (
                    <span className="absolute bg-red-500 rounded-full w-2 h-2 top-0 right-0 -mt-1 -mr-1"></span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current hidden"
                  >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                  </svg>
                </a>
              </Link>
              <button
                className="pr-3 snipcart-checkout appearance-none px-2  cursor-pointer focus:outline-none relative"
                aria-label="Cart"
              >
                {cartHasItems && (
                  <span className="absolute bg-green-600 rounded-full w-2 h-2 top-0 right-1 -mt-1 -mr-1"></span>
                )}
                <span>CART</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main >
        <div className=" mx-auto">{children}</div>
      </main>
    </>
  );
};

export default Layout;
