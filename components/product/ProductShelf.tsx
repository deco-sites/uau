import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import { SendEventOnLoad } from "deco-sites/fashion/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="container flex flex-col py-10 px-0 "
    >
      <div class="w-full mb-6">
        <h2 class="row-start-1 col-span-full text-primary">
          <span class="font-semibold text-[32px]">{title}</span>
        </h2>
        <a href="">
          Ver todos{" "}
          <Icon id="ChevronRight" size={15} strokeWidth={3} class="inline" />
        </a>
      </div>

      <Slider class="carousel carousel-center sm:carousel-end col-span-full row-start-2 row-end-5">
        {products?.map((product, index) => (
          <Slider.Item
            index={index}
            class="carousel-item bg-transparent w-[270px] sm:w-1/4 px-[9.5px] box-border"
          >
            <ProductCard product={product} itemListName={title} />
          </Slider.Item>
        ))}
      </Slider>

      {
        /* <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
            <Icon size={20} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
            <Icon size={20} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
        </> */
      }
      <SliderJS rootId={id} />
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </div>
  );
}

export default ProductShelf;
