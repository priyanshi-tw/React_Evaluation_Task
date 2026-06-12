/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import SearchResults from "./SearchResults";
import { searchCommands, type Command } from "./commands";
import { useDebounce } from "./useDebounce";

export default function CommandPallete() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [data, setData] = useState<Command[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setOpen(true);
    setIsLoading(true);
  };

  const getCommandsData = useCallback(async (search: string) => {
    setIsLoading(true);
    try {
      const data = await searchCommands(search);
      setData(data);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCommandsData(debouncedSearch);
  }, [debouncedSearch, getCommandsData]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        setOpen(true);
        getCommandsData("");
      }

      if (!open) return;

      if (event.key === "Escape") {
        setOpen(false);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, (data?.length ?? 1) - 1),
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "Enter" && highlightedIndex >= 0 && data) {
        data[highlightedIndex].action();
        setOpen(false);
        setSearch("");
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [open, data, highlightedIndex, getCommandsData]);
  return (
    <div className="relative w-140">
      <input
        type="text"
        placeholder="⌘ Search commands..."
        className="border border-gray-200 w-full rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
        value={search}
        onChange={handleSearchChange}
      />

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setOpen(false);
              setSearch("");
            }}
          />
          <div className="absolute top-full left-0 z-50 mt-1 w-full">
            <SearchResults
              data={data || []}
              highlightedIndex={highlightedIndex}
              isLoading={isLoading}
              onExecute={() => {
                setOpen(false);
                setSearch("");
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
