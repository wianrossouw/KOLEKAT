import * as React from "react";
import { GetStaticProps } from "next";
import shuffle from "lodash.shuffle";

import { printful } from "../lib/printful-client";
import { formatVariantName } from "../lib/format-variant-name";
import { PrintfulProduct } from "../types";

import ProductGrid from "../components/ProductGrid";
import BannerImage from "../components/BannerImage";
import Banner from "../components/Banner";
import MobileBannerImage from "../components/MobileBannerImage";
import BannerImage2 from "../components/BannerImage2";
import MobileBottomBanner from "../components/MobileBottomBanner";

type IndexPageProps = {
  products: PrintfulProduct[];
};


const IndexPage: React.FC<IndexPageProps> = ({ products }) => (
  <>
    <div className="block border-solid border border-black border-r-0 border-l-0 hidden md:block"> <BannerImage /> </div>
    <div className="block border-solid border border-black border-r-0 border-l-0 block md:hidden"> <MobileBannerImage /> </div>



    <ProductGrid products={products} />
    <div className=""> MORE COMING SOON </div>
    <div className="block border-solid border border-black border-r-0 border-l-0 block md:hidden"> <MobileBottomBanner /> </div>
    <div className="block border-solid border border-black border-r-0 border-l-0 hidden md:block"> <BannerImage2 /> </div>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { result: productIds } = await printful.get("sync/products");

  const allProducts = await Promise.all(
    productIds.map(async ({ id }) => await printful.get(`sync/products/${id}`))
  );

  const products: PrintfulProduct[] = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );

  return {
    props: {
      products: shuffle(products),
    },
  };
};

export default IndexPage;
