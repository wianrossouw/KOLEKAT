import { useState } from "react";
import { Transition } from '@headlessui/react'
import Image from "next/image";
import shirtpic from '../images/kolekat_doodle_tshirt.jpg';
import useWishlistDispatch from "../hooks/useWishlistDispatch";
import useWishlistState from "../hooks/useWishlistState";
import VariantPicker from "./VariantPicker";
import bloodtee from '/blood money tee.jpg'
import logotee from '/logo tee.jpg'
import doodletee from '/doodle tee.jpg'

const Modal = (product) => {
    const { addItem } = useWishlistDispatch();
    const { isSaved } = useWishlistState();
    const [showModal, setShowModal] = useState(false);
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
    return (
        <div>

            {showModal ? (
                <div className="bg-zinc-200 bg-opacity-50 fixed inset-0 z-50 ">
                    <div className="flex h-screen justify-center items-center ">
                        <div className="grid bg-white opacity-100 border border-black ">
                            <div className=" grid justify-end pr-2" ><p className="cursor-pointer select-none" onClick={() => setShowModal(false)}>X</p></div>
                            {activeVariantFile && (
                                <Image
                                    src={`/${name}.jpg`}
                                    width="780px"
                                    height="780px"
                                    quality={100}
                                >
                                </Image>
                            )}
                            <div className="flex">
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
                                        className="snipcart-add-item w-full mb-3 mt-3 transition flex-shrink-0 py-2 px-4 border border-black hover:border-transparent shadow-sm text-sm font-medium bg-black text-white focus:text-white hover:text-white focus:outline-none"
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
        </div>
    )
}

export default Modal