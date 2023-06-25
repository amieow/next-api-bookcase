import Link from "next/link"
function Pages() {
   return (
      <main className='flex flex-col m-auto bg-cyan-900 text-white p-2 rounded-xl shadow-lg shadow-blue-500'>
         <h1 className='text-2xl font-bold'>SIMPLE API BOOKSHELF</h1>
         <div className=" mt-5">
            <p>About APi &rarr; <Link href="https://github.com/amieow/next-api-bookcase" target="_blank" className="text-blue-400 underline">GITHUB</Link> </p>
         </div>
      </main>
   )
}

export default Pages