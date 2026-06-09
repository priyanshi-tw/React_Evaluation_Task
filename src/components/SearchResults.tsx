/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Command } from "./commands";

export default function SearchResults({ data }: { data: Command[] }) {
  const result = Object.values(
    data.reduce((acc: any, item) => {
      if (acc[item.group]) {
        acc[item.group].rows.push(item);
      } else {
        acc[item.group] = {
          group: item.group,
          rows: [item],
        };
      }
      return acc;
    }, {}),
  );

  return (
    <>
      <div className="border rounded-[10px] w-100  h-auto px-2 py-2 border-gray-300">
        {data?.length === 0 && (
          <>
            <p>No results found.</p>
          </>
        )}
        {result?.map((item: any) => {
          return (
            <>
              <div className="text-left">
                <h4 className="text-black font-semibold text-[16px]">
                  {item?.group}
                </h4>
                <div className="border border-b-0 border-gray-300 my-1"></div>
                <ul className=" cursor-pointer">
                  {item?.rows.map((row: any) => {
                    return (
                      <li
                        className="hover:bg-gray-200 text-[14px] font-poppins"
                        id={row.id}
                        onClick={row.action}
                      >
                        {row.label}
                      </li>
                    );
                  })}
                </ul>
                <div className="border border-b-0 border-gray-300 my-1"></div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
