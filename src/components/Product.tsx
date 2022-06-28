import { useState } from "react";
import { Transition } from '@headlessui/react'
import Image from "next/image";
import shirtpic from '../images/kolekat_doodle_tshirt.jpg';
import useWishlistDispatch from "../hooks/useWishlistDispatch";
import useWishlistState from "../hooks/useWishlistState";
import Modal from "./Modal";
import VariantPicker from "./VariantPicker";
import bloodtee from '/blood money tee.jpg'
import logotee from '/logo tee.jpg'
import doodletee from '/doodle tee.jpg'

const Product = (product) => {
  const { addItem } = useWishlistDispatch();
  const { isSaved } = useWishlistState();

  const { id, name, variants } = product;
  const [firstVariant] = variants;
  const oneStyle = variants.length === 1;

  const [activeVariantExternalId, setActiveVariantExternalId] = useState(
    firstVariant.external_id
  );

  const activeVariant = variants.find(
    (v) => v.external_id === activeVariantExternalId
  );

  const activeVariantFile = activeVariant.files.find(
    ({ type }) => type === "preview"
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeVariant.currency,
  }).format(activeVariant.retail_price);

  const addToWishlist = () => addItem(product);

  const onWishlist = isSaved(id);

  const [showModal, setShowModal] = useState(false);

  return (
    <article className="border border-solid border-black border-b-0 md:border-b md:border-r-0 pb-6 border-r-0 border-l-0 md:border-l border-t-0">
      <button
        aria-label="Add to wishlist"
        className="hidden"
        onClick={addToWishlist}
      >
        {onWishlist ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current text-red-500"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
          </svg>
        )}
      </button>

      {showModal ? (
        <div className="bg-zinc-200 bg-opacity-50 fixed inset-0 z-50 ">
          <div className="flex h-screen justify-center items-center ">
            <div className="grid bg-white opacity-100 border border-black ">
              <div className=" grid justify-end p-2 pb-0" ><p className="cursor-pointer select-none" onClick={() => setShowModal(false)}>X</p></div>
              <span className="pl-3">{name}<br />relaxed fit / 5.3 oz unisex t-shirt<br />100% organic cotton<br /></span>
              {activeVariantFile && (
                <Image
                  src={`/${name}.jpg`}
                  width="700px"
                  height="700px"
                  quality={100}
                >
                </Image>
              )}

              <div className="flex pl-3">
                <div className="w-3/6">
                  <p>S - 56,5cm / 66cm</p>
                  <p>M - 59cm / 70cm</p>
                  <p>L - 62cm / 72cm</p>
                  <p className="pb-3">XL - 65cm / 74cm</p>
                </div>
                <div className="w-full pl-3 pr-3">
                  <VariantPicker
                    value={activeVariantExternalId}
                    onChange={({ target: { value } }) =>
                      setActiveVariantExternalId(value)
                    }
                    variants={variants}
                    disabled={oneStyle}
                  />
                  <button
                    className="snipcart-add-item w-full mb-3 mt-0 md:mt-3 transition flex-shrink-0 py-2 px-4 border border-black hover:border-transparent shadow-sm text-sm font-medium bg-black text-white focus:text-white hover:text-white focus:outline-none"
                    data-item-id={activeVariantExternalId}
                    data-item-price={activeVariant.retail_price}
                    data-item-url={`/api/products/${activeVariantExternalId}`}
                    data-item-description={activeVariant.name}
                    data-item-image={activeVariantFile.preview_url}
                    data-item-name={name}
                    onClick={() => setShowModal(false)}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div >
      ) : null
      }
      <div className="group">
        <div className="p-3 pt-6  flex items-center justify-center flex-1 sm:flex-shrink-0 w-full">
          {activeVariantFile && (
            <Image
              onClick={() => setShowModal(true)}
              src={`/${name}.jpg`}
              quality={100}
              width={500}
              height={500}
              alt={`${activeVariant.name} ${name}`}
              title={`${activeVariant.name} ${name}`}
              className="pt-3 cursor-pointer group-hover:invert transition ease-in-out duration-300"
            />
          )}
        </div>
        <div className="p-3  flex items-center justify-center flex-1 sm:flex-shrink-0 w-full">
          <div className="text-center">
            <p className="bg-gradient-to-t from-black to-black bg-[length:0%_100%] bg-left bg-no-repeat duration-300 ease-in-out group-hover:bg-[length:100%_100%] group-hover:text-white">{name}</p>
            <p className="text-sm text-gray-500">{formattedPrice}</p>
          </div>
        </div>
      </div>
      <div className="p-3 flex flex-col sm:flex-row justify-center items-center">
        <VariantPicker
          value={activeVariantExternalId}
          onChange={({ target: { value } }) =>
            setActiveVariantExternalId(value)
          }
          variants={variants}
          disabled={oneStyle}
        />
        <button
          className="snipcart-add-item w-full md:w-auto transition flex-shrink-0 py-2 px-4 border border-black hover:border-transparent shadow-sm text-sm font-medium bg-black text-white focus:text-white hover:text-white focus:outline-none"
          data-item-id={activeVariantExternalId}
          data-item-price={activeVariant.retail_price}
          data-item-url={`/api/products/${activeVariantExternalId}`}
          data-item-description={activeVariant.name}
          data-item-image={activeVariantFile.preview_url}
          data-item-name={name}
        >
          add to cart
        </button>
      </div>
    </article >

  );
};

export default Product;