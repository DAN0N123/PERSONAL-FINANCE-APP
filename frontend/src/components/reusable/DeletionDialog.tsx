export default function DeletionDialog({ title, action, setModal }) {
  return (
    <>
      <div className="fixed top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[90%] rounded-[12px] pt-[24px] pb-[24px] pl-[20px] pr-[20px] bg-white z-[101] h-fit flex flex-col gap-[20px] xl:ml-[var(--sidebar-width)] xl:w-[50%]">
        <div className="flex w-full justify-between items-center">
          <div className="text-gray-900 text-preset-2">Delete '{title}'?</div>
          <button onClick={() => setModal("")}>
            <img
              src="../../../mentor-starter-code/assets/images/icon-close-modal.svg"
              className="w-[32px] h-[32px]"
            />
          </button>
        </div>
        <p className="text-preset-4 text-gray-500">
          Are you sure you want to delete this budget? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>

        <button
          className="bg-red rounded-[8px] p-[16px] text-preset-4-bold text-white"
          onClick={(e) => {
            e.preventDefault();
            action();
            setModal("");
          }}
        >
          Yes, Confirm Deletion
        </button>
        <button
          className="bg-white rounded-[8px] p-[16px] text-preset-4-bold text-gray-500"
          onClick={(e) => {
            e.preventDefault();
            setModal("");
          }}
        >
          No, I want to go back
        </button>
      </div>
      <div className="fixed inset-0 bg-[#000000] opacity-[0.15] z-[100] mt-[-24px] ml-[-24px] mr-[-20px]"></div>
    </>
  );
}
