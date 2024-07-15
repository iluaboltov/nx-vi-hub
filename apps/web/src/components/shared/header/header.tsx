import {
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  TriangleDownIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

import { Logo } from "../../logo";

export const Header = () => {
  return (
    <header className={"flex flex-col gap-2 border-b border-b-zinc-900 bg-zinc-900/60 px-14 pt-6"}>
      <div className={"flex h-10 items-center justify-between"}>
        <div className={"flex items-center gap-8"}>
          <HamburgerMenuIcon
            className={
              "rounded-md p-1 text-lime-400 transition-colors ease-in-out hover:bg-lime-700 hover:text-white"
            }
            height={30}
            width={30}
          />
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <div
          className={
            "flex h-full w-[35rem] items-center gap-2 rounded-3xl border border-transparent border-zinc-800 bg-zinc-800 px-6 text-zinc-500 placeholder:text-zinc-500 active:border-zinc-700"
          }
        >
          <MagnifyingGlassIcon className={"text-white"} height={20} width={20} />
          Search for your best experience
        </div>
        <div>
          <PersonIcon
            className={
              "rounded-full bg-lime-600 p-1.5 transition-colors ease-in-out hover:bg-lime-700"
            }
            height={35}
            width={35}
          />
        </div>
      </div>
      <div className={"flex h-12 items-center justify-center gap-24"}>
        <div className={"flex h-full items-center border-b-2 border-b-lime-600"}>Home</div>
        <div className={"flex h-full items-center"}>
          Videos
          <TriangleDownIcon className={"mt-1"} />
        </div>
        <div className={"flex h-full items-center"}>
          Categories
          <TriangleDownIcon className={"mt-1"} />
        </div>
        <div className={"flex h-full items-center"}>
          Actors
          <TriangleDownIcon className={"mt-1"} />
        </div>
        <div className={"flex h-full items-center"}>
          Community
          <TriangleDownIcon className={"mt-1"} />
        </div>
      </div>
    </header>
  );
};
