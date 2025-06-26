import Dropdown from "../reusable/Dropdown";

export default function Toggles({ state, stateSetters }) {
  return (
    <div className="flex justify-between items-center w-full gap-[8px] max-w-full md:col-span-full">
      <div className="rounded-[8px] pl-[20px] pr-[20px] pt-[12px] pb-[12px] flex border-[1px] border-gray-200 items-center">
        <input
          type="text"
          placeholder="Search for transaction"
          value={state.search}
          onChange={(e) => stateSetters.setSearch(e.target.value)}
          className="focus:outline-none mr-[-25px]"
        />
        <button className="w-[1rem] h-[1rem]">
          <img
            src="../../../mentor-starter-code/assets/images/icon-search.svg"
            className="w-full h-auto"
            alt="Search"
          />
        </button>
      </div>

      <div className="w-full flex justify-around md:justify-end md:gap-[32px]">
        <div className="md:flex md:items-center md:gap-[8px]">
          <p className="text-preset-4 text-gray-500 text-nowrap hidden md:block">
            Sort by
          </p>
          <Dropdown
            options={[
              "Latest",
              "Oldest",
              "A to Z",
              "Z to A",
              "Highest",
              "Lowest",
            ]}
            value={state.sort}
            setValue={stateSetters.setSort}
          >
            <img
              src="../../../mentor-starter-code/assets/images/icon-sort-mobile.svg"
              className="w-[20px] h-auto md:hidden"
              alt="Sort"
            />
            <div className="hidden md:flex items-center gap-[8px]">
              <div className="flex items-center w-max pl-[20px] pr-[20px] pt-[12px] pb-[12px] gap-[16px] rounded-[8px] border-[1px] border-gray-500">
                <p className="text-nowrap text-gray-900">{state.sort}</p>
                <img
                  src="../../../mentor-starter-code/assets/images/icon-caret-down.svg"
                  className="w-[16px] h-[16px]"
                  alt="Caret"
                />
              </div>
            </div>
          </Dropdown>
        </div>

        {/* Category */}
        <div className="md:flex md:gap-[8px] md:items-center">
          <p className="text-preset-4 text-gray-500 w-fit hidden md:block">
            Category
          </p>
          <Dropdown
            options={[
              "All Transactions",
              "Entertainment",
              "Bills",
              "Groceries",
              "Dining Out",
              "Transportation",
              "Personal Care",
            ]}
            value={state.category}
            setValue={stateSetters.setCategory}
          >
            <img
              src="../../../mentor-starter-code/assets/images/icon-filter-mobile.svg"
              className="w-[20px] h-auto md:hidden"
              alt="Filter"
            />
            <div className="hidden md:flex items-center gap-[8px]">
              <div className="flex items-center w-max pl-[20px] pr-[20px] pt-[12px] pb-[12px] gap-[16px] rounded-[8px] border-[1px] border-gray-500">
                <p className="text-nowrap text-gray-900">{state.category}</p>
                <img
                  src="../../../mentor-starter-code/assets/images/icon-caret-down.svg"
                  className="w-[16px] h-[16px]"
                  alt="Caret"
                />
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
