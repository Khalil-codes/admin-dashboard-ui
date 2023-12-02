import cn from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  className?: string;
};

const Search = ({ className }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        const search =
          new FormData(e.target as HTMLFormElement)
            .get("search")
            ?.toString()
            .trim() || "";

        if (!search) {
          params.delete("search");
        } else {
          params.set("search", search);
        }

        const queryParams = params.toString();

        router.push(queryParams ? `${pathName}?${queryParams}` : pathName, {
          shallow: true,
          scroll: false,
        });
      }}>
      <input
        className={
          "appearance-none py-2 w-full border rounded px-3 text-black leading-loose focus:outline"
        }
        id="username"
        name="search"
        defaultValue={searchParams.get("search")?.trim() || ""}
        type="text"
        placeholder="Seach"
      />
    </form>
  );
};

export default Search;
