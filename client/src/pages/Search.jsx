
import {useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/Listingitem";

export default function Search() {
  
  const nevigate= useNavigate()
  const [loading,setLoading]= useState(false);
  const [listing,setListing]= useState([])
  const [sidebar,setSidebar] =useState({
         searchTerm:'',
         type:'all',
         parking:false,
         furnished:false,
         offer:false,
         sort:'created_at',
         order:'desc'

  })
  // console.log(sidebar);
  console.log(listing)

  useEffect(()=>{
    const urlParam = new URLSearchParams(location.search);
    const searchTermfromUrl= urlParam.get('searchTerm');
    const typeFromUrl=urlParam.get('type')
    const parkingFromUrl=urlParam.get('parking')
    const furnishedFromUrl=urlParam.get('furnished')
    const offerFromUrl=urlParam.get('offer')
    const sortFromUrl=urlParam.get('sort')
    const orderFromUrl=urlParam.get('order')


    if(searchTermfromUrl||
      typeFromUrl||
      parkingFromUrl||
      furnishedFromUrl||
       offerFromUrl||
        sortFromUrl||
        orderFromUrl){
          setSidebar({searchTerm:searchTermfromUrl,
          type:typeFromUrl || 'all',
          parking:parkingFromUrl==='true'?true:false,
          furnished:furnishedFromUrl==='true'?true:false,
          offer:offerFromUrl==='true'?true:false,
          sort:sortFromUrl || 'created_at',
          order:orderFromUrl ||'desc'

          
          }
            )
        }

const fetchListing= async()=>{
           setLoading(true);
          
               const searchQuery=urlParam.toString();
           const res= await fetch(`/api/listing/get?${searchQuery}`)
           const data=await res.json();
           setListing(data);
           setLoading(false)


}

fetchListing();

  },[location.search])

  const handlechange=(e)   =>{
    if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sell'){
      setSidebar({...sidebar,type:e.target.id})
    }

    if(e.target.id==='searchTerm'){
      setSidebar({...sidebar,searchTerm:e.target.value})
    }
    
    if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
      setSidebar({...sidebar,[e.target.id]:
        e.target.checked || e.target.checked=== 'true' ? true : false})
    }

    if(e.target.id==='sort_order'){
      const sort= e.target.value.split('_')[0] || 'crated_at' ;
      const order= e.target.value.split('_')[1] ||'desc'
      setSidebar({...sidebar,sort,order});
    }
  }

  const handledsubmit=(e)=>{
    e.preventDefault();

    const urlParams= new URLSearchParams();
    urlParams.set('searchTerm',sidebar.searchTerm);
    urlParams.set('type',sidebar.type);
    urlParams.set('parking',sidebar.parking);
    urlParams.set('furnished',sidebar.furnished);
    urlParams.set('offer',sidebar.offer);
    urlParams.set('sort',sidebar.sort);
    urlParams.set('order',sidebar.order);
    const searchQuery=urlParams.toString()
    nevigate(`/search?${searchQuery}`)
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* left side */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-4 " onSubmit={handledsubmit}>
          <div className="flex  items-center gap-2">
            <label htmlFor="" className="whitespace-nowrap font-semibold">
              Search Term :
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebar.searchTerm}
              onChange={handlechange}
            />
          </div>
          <div className="flex gap-3 flex-wrap item-centre">
            <label htmlFor="Type" className="font-semibold">Type:</label>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="all" className="w-5" 
              onChange={handlechange}
              checked={sidebar.type==='all'}/>
              <span>Rent & Sell</span>
            </div>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="rent" className="w-5"
              onChange={handlechange}
              checked={sidebar.type==='rent'} />
              <span>Rent </span>
            </div>

            <div className=" flex gap-3 ">
              <input type="checkbox" id="sell" className="w-5"
              
              onChange={handlechange}
              checked={sidebar.type==='sell'}/>
              <span> Sell</span>
            </div>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="offer" className="w-5" 
              onChange={handlechange}
              checked={sidebar.offer}/>
              <span>Offer</span>
            </div>
          </div>


          <div className="flex gap-3 flex-wrap item-centre">
            <label htmlFor="Type"  className="font-semibold">Amenities:</label>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="parking" className="w-5"
               onChange={handlechange}
               checked={sidebar.parking} />
              <span>Parking</span>
            </div>
            <div className=" flex gap-3 ">
              <input type="checkbox" id="furnished" className="w-5"
               onChange={handlechange}
               checked={sidebar.furnished} />
              <span>Furnished </span>
            </div>

           
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor=""  className="font-semibold">Sort: </label>
            <select name="" id="sort_order" className="border  rounded-lg p-3" onChange={handlechange}
            defaultValue={'created_at_desc'}>
              <option value="regularPrice_desc">price high to low</option>
              <option value="regularPrice_asc">price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>

            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase
          hover:opacity-95">Search</button>
        </form>
      </div>

      {/*right side */}
      <div  className="flex-1 p-6">
        <h1 className="text-3xl font-semibold 
        text-center p-3">Listing Results</h1>
        <div className="flex flex-wrap gap-4">{

          !loading && listing.length===0 &&(
            <p className="text-2xl text-slate-700"> No Listing Found! </p>
          )
}

{loading && <p className="text-2xl text-slate-700  text-center w-full">Loading...</p>}


{
  !loading && listing && listing.map((listing)=> <ListingItem key={listing._id} listing={listing} />)
}
</div>
      </div>
    </div>
  );
}
