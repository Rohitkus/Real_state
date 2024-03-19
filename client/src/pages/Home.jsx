import {useState,useEffect}from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import ListingItem from "../components/Listingitem";
export default function Home() {
   
  const [offerListing ,setofferListing]=useState([]);
  const [saleListing,setSalelisting]= useState([]);
  const [rentlisting, setrentlisting]= useState([]);
   SwiperCore.use([Navigation])

  console.log(offerListing)
  useEffect(()=>{
     
    const fetchofferlisting= async ()=>{

      try{
 const res=await fetch('/api/listing/get?offer=true&limit=4')
 const data= await res.json();
 setofferListing(data)
 fetchrentlisting()
      }catch(error){
console.log(error)
      }
    }

    const fetchrentlisting= async ()=>{

      try{
 const res=await fetch('/api/listing/get?type=rent&limit=4')
 const data= await res.json();
 setrentlisting(data)
 fetchsalelisting()
      }catch(error){
console.log(error)
      }
    }

    const fetchsalelisting= async ()=>{

      try{
 const res=await fetch('/api/listing/get?type=sale&limit=4')
 const data= await res.json();
 setSalelisting(data)
      }catch(error){
console.log(error)
      }
    }


    fetchofferlisting()
  },[])



  return (
    <div>
      {/* Top */}
      <div className=" flex flex-col gap-4 py-20 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          {" "}
          Find your next <span className="text-slate-500">Perfect</span>
          <br />
          place with ease
        </h1>

        <div className="text-gray-500 text-xs sm:text-lg">
          Rohit Estate is the best place to find your next perfect place to live
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className="text-xs sm:text-lg text-blue-800
        font-bold  hover:underline">Lets Start now...</Link>
      </div>

      {/* Swiper  here*/}
       <Swiper navigation>
          {
            offerListing && offerListing.length>0 &&
            offerListing.map((listing)=>(
                  <SwiperSlide>
                    <div
                    style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize:"cover"}} 
                    className="h-[650px]" key={listing._id}>

                    </div>
                  </SwiperSlide>
            ))
          }


       </Swiper>
       

      {/* Listings */}

      <div className="px-5 sm:px-20 mx-auto  flex-col gap-5 ">
               {
                offerListing && offerListing.length>0 && (
                  <div className=" p-0">
                    <div className=" flex  flex-col justify-center items-center p-4">
                      <h2 className="text-2xl font-semibold  text-slate-700">Recent Offers</h2>
                      <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}>
                        show More Offers
                      </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 ">
                      {
                        offerListing.map((listing)=>(
                          <ListingItem listing={listing} key={listing._id}/>
                        ))
                      }
                    </div>
                  </div>
                )
               }

               {/* for rent */}
               {
                rentlisting && rentlisting.length>0 && (
                  <div className="py-20">
                    <div className=" flex  flex-col justify-center items-center p-4">
                      <h2 className="md:text-3xl text-xl  font-semibold  text-slate-700">Recent Places for Rent</h2>
                      <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"}>
                        show more places for rent
                      </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 ">
                      {
                        rentlisting.map((listing)=>(
                          <ListingItem listing={listing} key={listing._id}/>
                        ))
                      }
                    </div>
                  </div>
                )
               }

               

               {/* for sale */}
               {
                saleListing && saleListing.length>0 && (
                  <div className=" ">
                    <div className=" flex  flex-col justify-center items-center  p-4" >
                      <h2 className="text-2xl font-semibold  text-slate-700">Recent Places for Sale</h2>
                      <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=sale"}>
                        show more places for sale
                      </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 ">
                      {
                        saleListing.map((listing)=>(
                          <ListingItem listing={listing} key={listing._id}/>
                        ))
                      }
                    </div>
                  </div>
                )
               }

      </div>
    </div>
  );
}
