import { useEffect, useState, type ChangeEvent } from "react";
import SearchResults from "./SearchResults";
import { searchCommands, type Command } from "./commands";

export default function CommandPallete() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Command[]>();
  const [open, setOpen] = useState<boolean>(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setOpen(true);
    getCommandsData(event.target.value);
  };

  const getCommandsData = async (search: string) => {
    try {
      const data = await searchCommands(search);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      setOpen(true);
      getCommandsData("");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 w-100 rounded-[10px] px-2 py-2 focus:border-blue-300 focus-visible:outline-none "
        value={search}
        onChange={handleSearchChange}
      />
      {open && <SearchResults data={data || []} />}{" "}
    </>
  );
}
