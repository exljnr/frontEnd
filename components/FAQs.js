import React from 'react'
 
function FAQSPage() {
  return (

   <div>


<div className='px-36'>
  <h2 className='text-white mb-4 mt-10 font-semibold text-2xl text-center'>Frequently Asked Questions</h2>
<div className="space-y-4">
 <details
   className="group border-s-4 border-brandPrimary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
   open
 >
   <summary className="flex cursor-pointer items-center justify-between gap-1.5">
     <h2 className="text-lg font-medium text-gray-900">
      How do i sign up my shop on SwiftShare?
     </h2>

     <span className="shrink-0 rounded-full bg-brandPrimary p-1.5 text-white sm:p-3">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
         viewBox="0 0 20 20"
         fill="currentColor"
       >
         <path
           fillRule="evenodd"
           d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
           clipRule="evenodd"
         />
       </svg>
     </span>
   </summary>

   <p className="mt-4 leading-relaxed text-gray-700">
    Visit SwiftShare on any browser. Click on the Get Started Button. Fill up the sign up form and you are good to go. As simple as that! No credit card needed. No Stress . Hassel free.

   </p>
 </details>

 <details
   className="group border-s-4 border-brandPrimary bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
 >
   <summary className="flex cursor-pointer items-center justify-between gap-1.5">
     <h2 className="text-lg font-medium text-gray-900">
       How do i receive files form clients ?
     </h2>

     <span className="shrink-0 rounded-full bg-brandPrimary p-1.5 text-white sm:p-3">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
         viewBox="0 0 20 20"
         fill="currentColor"
       >
         <path
           fillRule="evenodd"
           d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
           clipRule="evenodd"
         />
       </svg>
     </span>
   </summary>

   <p className="mt-4 leading-relaxed text-gray-700">
    After signing up, you will get a dedicated QR Code which is embedded with a url specific for your shop only. All your clients needs to do is scan, upload files and hit on send. Your client files are on their way to your screen!
   </p>
 </details>
</div>
</div>
</div>

  )
}

export default FAQSPage;
