import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Create a Listing</h1>   

                <form className='flex flex-col gap-6 sm:flex-row'>
                    <div className='flex flex-col gap-4 flex-1 '>
                        <input type="text" placeholder='name'  className='border p-3 
                        rounded-lg ' id="name" maxLength='62' minLength='10' required/>
                          <textarea type="text" placeholder='description'  className='border p-3 
                        rounded-lg ' id="description"  required/>
                          <input type="text" placeholder='address'  className='border p-3 
                        rounded-lg ' id="address " maxLength='62' minLength='10' required/>
                    <div className='flex gap-6 flex-wrap'>
                        <div className=' flex gap-2'>
                            <input type="checkbox"  id="sell" className='w-5 '/>
                            <span>Sell</span>
                        </div>

                        <div className=' flex gap-2'>
                            <input type="checkbox"  id="rent" className='w-5 '/>
                            <span>Rent</span>
                        </div>

                        <div className=' flex gap-2'>
                            <input type="checkbox"  id="parking" className='w-5 '/>
                            <span>Parking Spot</span>
                        </div>

                        <div className=' flex gap-2'>
                            <input type="checkbox"  id="furnished" className='w-5 '/>
                            <span>Furnished</span>
                        </div>

                        <div className=' flex gap-2'>
                            <input type="checkbox"  id="offer" className='w-5 '/>
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-7'>
     <div className='flex items-center'>
        <input type="Number" className='border p-3 border-gray-300 rounded-lg' id="bedrooms"
         min="1" max="10" required
     /> 
     <span className='pl-2'>Beds</span>
     </div>
   
     <div className='flex items-center'>
        <input type="Number" className='border p-3 border-gray-300 rounded-lg' id="bedrooms"
         min="1" max="10" required
     /> 
     <span className='pl-2'>Beds</span>
     </div>

     <div className='flex items-center'>
        <input type="Number" className='border p-3 border-gray-300 rounded-lg' id="regularprice"
          required   min="1" max="10"
     /> 
     <span className='pl-2'>
        <div>
        Regular Price 
           <span className='flex flex-col text-xs text-center'>($ / month)</span>
        </div>
        </span>
     </div>

     <div className='flex items-center'>
        <input type="Number" className='border p-3 border-gray-300 rounded-lg' id="Discounted Price"
         required   min="1" max="10"
     /> 
     <span className='pl-2'>
        <div>
        Discounted Price 
           <span className='flex flex-col text-xs text-center'>($ / month)</span>
        </div>
        </span>
     </div>
                    </div>
                    </div>   

                    {/* right column */}

                    <div className='flex flex-col flex-1 gap-4'>

                       <p className='font-semibold'>Image:
                       <span className='font-normal text-gray-600 ml-2'>The First Image will be the cover (max-6)</span></p>
                    <div className='flex gap-4'>
                        <input type="file" id="images" className='border rounded-md border-gray-300 p-3 w-full' /> 
                        <button className='border border-green-700 p-3 rounded-md text-green-700 uppercase
                        hover:shadow-lg disabled:opacity-80 '> Upload</button>
                    </div>
                    </div>

       <button  className=' p-3 rounded-lg text-white uppercase bg-slate-700
                        hover:opacity-95 disabled:opacity-80 '>Update listing</button>
                </form>
    </main> 
  )
}
 