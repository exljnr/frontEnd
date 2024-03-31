import React from 'react'
 
function InnerPage() {
  return (

   <div>
<section className='mt-6'>
 <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
   <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
     <div className=" p-8 md:p-12 lg:px-16 lg:py-24">
       <div className="mx-auto max-w-xl text-center">
         <h2 className="text-2xl font-bold text-white md:text-3xl">
          File Sharing made simple and secure with SwiftShare !
         </h2>

         <p className="hidden text-white/90 sm:mt-4 sm:block">
         Share files online with a file sending service that uses end-to-end data encryption. Share your files directly from anywhere. Just scan and upload and get files scanned

         </p>
         <div className="mt-4 md:mt-8">
           <a
             href="/register"
             className='inline-block rounded-sm bg-brandPrimary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'
           >
             Sign Up Today
           </a>
         </div>
       </div>
     </div>

     <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
       <img
         alt=""
         src="assets/screenImg1.jpg"
         className="h-40 w-full object-cover sm:h-56 md:h-full"
       />

       <img
         alt=""
         src="assets/screenImg2.jpg"
         className="h-40 w-full object-cover sm:h-56 md:h-full"
       />
     </div>
   </div>
 </div>
</section>
</div>

  )
}

export default InnerPage;
