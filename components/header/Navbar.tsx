import HeaderSearchbar from "deco-sites/fashion/islands/HeaderSearchbar.tsx";
import Searchbar from "deco-sites/fashion/components/search/Searchbar.tsx";
import Buttons from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <Buttons variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <Buttons variant="search" />
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col">
        <div class="flex flex-row justify-between items-center w-full pl-2 pr-6 bg-primary h-[92px]">
          <div class="flex-1">
            <Searchbar {...searchbar} />
          </div>
          <div class="flex-1 flex justify-center w-44">
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-3 w-[160px] text-white"
            >
              <Icon id="Logo" width={130} height={44} />
            </a>
          </div>

          <div class="flex-1 w-44 flex items-center justify-end gap-11">
            <a
              class="btn btn-ghost text-white flex items-center gap-4"
              href="/login"
              aria-label="Log in"
            >
              <Icon
                id="User"
                width={20}
                height={20}
                strokeWidth={0.4}
                class="inline"
              />
              <span class="text-[15px] normal-case">login</span>
            </a>
            <Buttons variant="cart" />
          </div>
        </div>
        <div class="flex-auto flex justify-center bg-[rgba(78,123,145,0.8)]">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
