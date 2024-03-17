import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* left side */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-4 ">
          <div className="flex  items-center gap-2">
            <label htmlFor="" className="whitespace-nowrap font-semibold">
              Search Term :
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-3 flex-wrap item-centre">
            <label htmlFor="Type" className="font-semibold">Type:</label>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sell</span>
            </div>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent </span>
            </div>

            <div className=" flex gap-3 ">
              <input type="checkbox" id="sell" className="w-5" />
              <span> Sell</span>
            </div>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>


          <div className="flex gap-3 flex-wrap item-centre">
            <label htmlFor="Type"  className="font-semibold">Amenities:</label>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished </span>
            </div>

           
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor=""  className="font-semibold">Sort: </label>
            <select name="" id="sort_order" className="border  rounded-lg p-3">
              <option value="">price high to low</option>
              <option value="">price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>

            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase
          hover:opacity-95">Search</button>
        </form>
      </div>

      {/*right side */}
      <div >
        <h1 className="text-3xl font-semibold 
        text-center p-3">Listing Results</h1>
      </div>
    </div>
  );
}
