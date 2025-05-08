'use client'
import Image from "next/image"
import { SparklesText } from "./magicui/sparkles-text"

const footerInfo = {
  logo: "/images/logo.png",
  website: "https://lisastaging.com/",
  email: "ssgsaa@gmail.com",
  phone: {
    english: "647-571-1788",
    mandarin: "416-939-3962",
  },
  wechat: {
    qrcode: "/images/LisaWechatQR.jpg",
    id: "Lisa4169393962",
  },
  others: [
    // {
    //     icon:"",
    //     name:"",
    // }
  ],
}

export default function Footer(){
    return (
    <footer className=" dark:bg-gray-900 w-screen ">
        <div className="divider h-2 hero w-full"/>
        <div className=" mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 z-10 top-0">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                  <a href={footerInfo.website} className="flex items-center">
                      <Image src={footerInfo.logo} className="me-3" alt="LisaStaging Logo" width={32} height={32}/>
                      <SparklesText className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Lisa Staging</SparklesText>
                  </a>
                  <a>Oak Time Inc.</a>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2">
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact Us</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4"> Email:
                              <a href="#" className="hover:underline">{footerInfo.email}</a>
                          </li>
                          <li className="mb-4"> English:
                              <a href="#" className="hover:underline">{footerInfo.phone.english}</a>
                          </li>
                          <li className="mb-4"> Mandarin:
                              <a href="#" className="hover:underline">{footerInfo.phone.mandarin}</a>
                          </li>
                      </ul>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src={footerInfo.wechat.qrcode}
                      alt="WeChat QR Code"
                      width={120}
                      height={120}
                      className="rounded border"
                    />
                  </div>
              </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href={footerInfo.website} className="hover:underline">Lisa Staging™</a>. All Rights Reserved.
              </span>
              {/* <div className="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                        </svg>
                      <span className="sr-only">Facebook page</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                    </svg>
                      <span className="sr-only">Twitter page</span>
                  </a>
              </div> */}
          </div>
        </div>
    </footer>
  )
}