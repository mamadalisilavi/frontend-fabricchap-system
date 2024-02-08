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
              "bg-[#34b7f1] text-white rounded-xl text-xs px-20 py-3 md:text-base md:px-10 md:py-2.5 absolute bottom-3 "
            }
            onClick={() => setNextPage(0)}
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      ) : null}
    </div>
  )
}
