export default function NextPage({
  hidden,
  id,
  nextPage,
  setNextPage,
  content,
}) {
  return (
    <div>
      {nextPage === id ? (
        <div className="flex flex-col justify-center items-center gap-3 p-2">
          {content}
          <button
            className={
              (hidden ? "hidden " : " ") +
              "bg-[#34b7f1] text-white rounded-xl text-sm px-20 py-3 md:text-base md:px-10 md:py-3 absolute bottom-1 "
            }
            onClick={() => setNextPage(0)}
          >
            بازگشت
          </button>
        </div>
      ) : null}
    </div>
  );
}
