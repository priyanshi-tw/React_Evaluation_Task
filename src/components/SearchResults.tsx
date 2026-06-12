import { Loader2 } from "lucide-react";
import type { Command } from "./commands";
import { useEffect, useMemo, useRef } from "react";

type GroupedCommands = {
  group: string;
  rows: Command[];
};

export default function SearchResults({
  data,
  highlightedIndex,
  isLoading,
  onExecute,
}: {
  data: Command[];
  highlightedIndex: number;
  isLoading: boolean;
  onExecute: () => void;
}) {
  let globalIndex = 0;
  const highlightedRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    highlightedRef.current?.scrollIntoView({
      block: "nearest",
    });
  }, [highlightedIndex]);
  const result = useMemo(
    () =>
      Object.values(
        data.reduce((acc: Record<string, GroupedCommands>, item: Command) => {
          if (acc[item.group]) {
            acc[item.group].rows.push(item);
          } else {
            acc[item.group] = { group: item.group, rows: [item] };
          }
          return acc;
        }, {}),
      ),
    [data],
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-4 px-2 text-sm text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );

  return (
    <div className="border rounded-xl w-140  h-140 border-gray-200 shadow-lg bg-white overflow-y-auto">
      {data?.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center h-full py-16">
          <p className="text-sm text-gray-500">No results found.</p>
          <p className="text-xs text-gray-400 mt-1">
            Try searching something else.
          </p>
        </div>
      )}
      {result?.map((item: GroupedCommands) => (
        <div className="text-left" key={item.group}>
          <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 pt-3 pb-1">
            {item.group}
          </h4>
          <ul>
            {item.rows.map((row: Command) => {
              const index = globalIndex++;
              return (
                <li
                  key={row.id}
                  ref={highlightedIndex === index ? highlightedRef : null}
                  className={`text-[13px] mx-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    highlightedIndex === index
                      ? "bg-blue-50 text-[#0DA2FF]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    row.action();
                    onExecute();
                  }}
                >
                  {row.label}
                </li>
              );
            })}
          </ul>
          <div className="border-b border-gray-100 mx-4 mt-2" />
        </div>
      ))}
    </div>
  );
}
