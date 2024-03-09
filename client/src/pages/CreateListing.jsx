import React, { useState } from "react";
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import {app}from '../firebase.js'

export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls:[],
  });
  const [files, setFiles] = useState([]);
  const [ imageuploaderror, setimageuploaderror]= useState(null)
  const [uploading,setUploading] = useState(false)
  console.log(formData)


  const handleimageSubmit= (e)=>{
          if(files.length>0 && files.length+formData.imageUrls.length<7  ){
            setUploading(true) 
            setimageuploaderror(false)
             const promises= [];
             for(let i=0;i<files.length;i++){ 
              promises.push(storeimage(files[i]))
              }
              Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})
                setimageuploaderror(false);
                setUploading(false)
                
                

              }) .catch((err)=>{
                setimageuploaderror('image upload failed (2 mb max/ img ')
              }) ;
          }
          else{
            setimageuploaderror("can not upload more than 6 images")
            setUploading(false)
                 
          }
  }

  const storeimage=async (file)=>{
    return new Promise((resolve,reject)=>{
      const storage= getStorage(app);
      const fileName= new Date().getTime()+ file.name;
      const storageRef= ref(storage,fileName);
      const uploadTask= uploadBytesResumable(storageRef,file);
      uploadTask.on("state_changed",(snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log(`Upload is ${progress}% done`)
      }, (error)=>{
        reject(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          resolve(downloadUrl)
        })
      }
      )
    })

  }
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };


  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = res.json();
      console.log(data);
    } catch (error) {
      next(error);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col gap-6 sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="name"
            className="border p-3 
                        rounded-lg "
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="description"
            className="border p-3 
                        rounded-lg "
            id="description"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 
                        rounded-lg "
            id="address "
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
          />
          <div className="flex gap-6 flex-wrap">
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5 "
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>

            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 "
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>

            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 "
                onChange={handleChange}
              />
              <span>Parking Spot</span>
            </div>

            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 "
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>

            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 "
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-7">
            <div className="flex items-center">
              <input
                type="Number"
                className="border p-3 border-gray-300 rounded-lg"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
              />
              <span className="pl-2">Beds</span>
            </div>

            <div className="flex items-center">
              <input
                type="Number"
                className="border p-3 border-gray-300 rounded-lg"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
              />
              <span className="pl-2">Beds</span>
            </div>

            <div className="flex items-center">
              <input
                type="Number"
                className="border p-3 border-gray-300 rounded-lg"
                id="regularprice"
                required
                min="1"
                max="10"
                onChange={handleChange}
              />
              <span className="pl-2">
                <div>
                  Regular Price
                  <span className="flex flex-col text-xs text-center">
                    ($ / month)
                  </span>
                </div>
              </span>
            </div>

            <div className="flex items-center">
              <input
                type="Number"
                className="border p-3 border-gray-300 rounded-lg"
                id="Discounted Price"
                required
                min="1"
                max="10"
                onChange={handleChange}
              />
              <span className="pl-2">
                <div>
                  Discounted Price
                  <span className="flex flex-col text-xs text-center">
                    ($ / month)
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>

        {/* right column */}

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Image:
            <span className="font-normal text-gray-600 ml-2">
              The First Image will be the cover (max-6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
            
              className="border rounded-md border-gray-300 p-3 w-full"
              onChange={(e) => setFiles(e.target.files)}
              multiple
            />
            <button  type="button"
              className="border border-green-700 p-3 rounded-md text-green-700 uppercase
                        hover:shadow-lg disabled:opacity-80 "
                        onClick={handleimageSubmit}
                        disabled={uploading}
            >
              
             {
              uploading?"uploading...":"Upload"
             }
            </button>
          </div>
          <p className="text-red-700 text-sm">{imageuploaderror && imageuploaderror }</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-1 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            className=" p-3 rounded-lg text-white uppercase bg-slate-700
                        hover:opacity-95 disabled:opacity-80 "
          >
            Update listing
          </button>
        </div>
      </form>
    </main>
  );
}
