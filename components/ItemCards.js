import React from 'react'
import { ShieldPlus,FileLock2,FileStack } from 'lucide-react';
 
function Cards() {
  return (
<section className=" text-white">
  <div className="max-w-screen-xl px-4 sm:px-6 sm:py-12 lg:px-8 lg:py-8">
    <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-brandPrimary p-4">
        <ShieldPlus />
        </span>

        <div>
          <h2 className="text-lg font-bold">Security</h2>

          <p className="mt-1 text-sm text-gray-300">
          Safeguard your data with advanced security measures.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-brandPrimary p-4">
        <FileLock2 />
        </span>

        <div>
          <h2 className="text-lg font-bold">Encryption</h2>

          <p className="mt-1 text-sm text-gray-300">
          Protect your data with robust encryption protocols.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-brandPrimary p-4">
        <FileStack />
        </span>

        <div>
          <h2 className="text-lg font-bold">Multiple File Sharing</h2>

          <p className="mt-1 text-sm text-gray-300">
          Seamlessly share multiple files with ease.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default Cards;
