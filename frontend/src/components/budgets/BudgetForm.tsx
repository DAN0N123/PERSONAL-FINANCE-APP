import Dropdown from "../reusable/Dropdown.tsx";
import ColorDropdown from "../reusable/ColorDropdown";
import isNumberKey from "../../utils/isNumberKey.js";

const selectedColors = {
  Green: "hsl(177, 55%, 32%)",
  Yellow: "hsl(24, 70%, 87%)",
  Cyan: "hsl(192, 59%, 85%)",
  Navy: "hsl(240, 8%, 41%)",
  Red: "hsl(7, 53%, 50%)",
  Purple: "hsl(260, 30%, 59%)",
  Turquoise: "hsl(180, 16%, 42%)",
};

export default function BudgetForm({
  title,
  submit,
  disableModal,
  categoryVal,
  colorVal,
  amountVal,
  setCategory,
  setColor,
  setAmount,
  usedColors,
}) {
  return (
    <>
      <form
        onSubmit={submit}
        className="fixed top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[90%] rounded-[12px] pt-[24px] pb-[24px] pl-[20px] pr-[20px] bg-white z-[101] h-fit flex flex-col gap-[20px] xl:ml-[var(--sidebar-width)] xl:w-[50%]"
      >
        <div className="flex w-full justify-between items-center">
          <div className="text-gray-900 text-preset-2">{title}</div>
          <button onClick={disableModal}>
            <img
              src="../../../mentor-starter-code/assets/images/icon-close-modal.svg"
              className="w-[32px] h-[32px]"
            />
          </button>
        </div>
        <p className="text-preset-4 text-gray-500">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
        </p>
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col w-full gap-[8px]">
            <p className="text-preset-5-bold text-gray-500"> Budget Category</p>
            <Dropdown
              options={[
                "Entertainment",
                "Bills",
                "Groceries",
                "Dining Out",
                "Transportation",
                "Personal Care",
              ]}
              value={categoryVal}
              setValue={setCategory}
            >
              <div className="flex items-center gap-[8px] w-full">
                <div className="flex items-center w-full pl-[20px] pr-[20px] pt-[12px] pb-[12px] justify-between rounded-[8px] border-[1px] border-gray-500">
                  <p className="text-nowrap text-gray-900 text-preset-4">
                    {categoryVal}
                  </p>
                  <img
                    src="../../../mentor-starter-code/assets/images/icon-caret-down.svg"
                    className="w-[16px] h-[16px]"
                  />
                </div>
              </div>
            </Dropdown>
          </div>
          <div className="flex flex-col w-full gap-[8px]">
            <p className="text-preset-5-bold text-gray-500">
              {" "}
              Maximum Spending
            </p>
            <div className="relative flex items-baseline w-full pl-[20px] pr-[20px] pt-[12px] pb-[12px] justify-start gap-[8px] rounded-[8px] border-[1px] border-gray-500">
              <p className="text-preset-4 text-beige-500"> $</p>
              <input
                type="text"
                required
                inputMode="numeric"
                value={amountVal}
                onKeyPress={(e) => {
                  if (!isNumberKey(e)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setAmount(parseFloat(e.target.value) || 0);
                  }
                }}
                placeholder="e.g. 2000"
                className="placeholder:text-beige-500 text-gray-900 flex items-center hideIncrementer focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-[8px]">
            <p className="text-preset-5-bold text-gray-500"> Budget Category</p>
            <ColorDropdown
              usedColors={usedColors}
              options={[
                "Green",
                "Yellow",
                "Cyan",
                "Navy",
                "Red",
                "Purple",
                "Turquoise",
              ]}
              value={colorVal}
              setValue={setColor}
            >
              <div className="flex items-center gap-[8px] w-full">
                <div className="flex items-center w-full pl-[20px] pr-[20px] pt-[12px] pb-[12px] justify-between rounded-[8px] border-[1px] border-gray-500">
                  <div className="flex gap-[12px] items-center">
                    <div
                      className="rounded-[50%] w-[16px] h-[16px]"
                      style={{
                        backgroundColor: selectedColors[colorVal],
                      }}
                    ></div>
                    <p className="text-nowrap text-gray-900 text-preset-4">
                      {colorVal}
                    </p>
                  </div>
                  <img
                    src="../../../mentor-starter-code/assets/images/icon-caret-down.svg"
                    className="w-[16px] h-[16px]"
                  />
                </div>
              </div>
            </ColorDropdown>
          </div>
        </div>
        <button
          className="bg-gray-900 rounded-[8px] p-[16px] text-preset-4-bold text-white"
          type="submit"
        >
          Add Budget
        </button>
      </form>
      <div className="fixed inset-0 bg-[#000000] opacity-[0.15] z-[100] mt-[-24px] ml-[-24px] mr-[-20px]"></div>
    </>
  );
}
