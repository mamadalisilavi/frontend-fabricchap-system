
export default function ListMenu({title,id, click }) {

  return (
    <button onClick={click} id={id} key={id} className='bg-stone-200 rounded-full w-1/2 text-center py-2'>{title}</button>
  )
}
