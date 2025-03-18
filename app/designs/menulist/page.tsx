import React from "react";
import menuleftimg from "@/assets/menu-left.svg";
import menurightimg from "@/assets/menu-right.svg";
import poori from "@/assets/poori.jpg";
import dosa from "@/assets/dosa.jpg";
import tea from "@/assets/tea.jpg";
import whitePongal from "@/assets/white-pongal.jpg";
import Image from "next/image";
import { foodMenuListType } from "@/lib/Types";

const data: foodMenuListType[] = [
  { name: "Dosa", img: dosa, price: 10 },
  { name: "Poori", img: poori, price: 10 },
  { name: "Tea", img: tea, price: 10 },
  { name: "Pongal", img: whitePongal, price: 10 },
];

function page() {
  return (
    <div className="relative w-full h-screen bg-gray-100 flex items-center justify-between">
      {/* <!-- Left Rectangle --> */}
      <div className="w-[20%]">
        <Image src={menuleftimg} alt="menu left images" />
      </div>

      {/* <!-- Content Area --> */}
      <div className="w-[60%] h-full bg-white ">
        <h2 className="mt-28 font-semibold text-2xl md:text-7xl text-center my-5 underline">
          Monday Food Menu List
        </h2>

        <table className="mt-28 outline table-auto w-full text-center">
          <thead>
            <tr className="px-5 py-5 border-b border-gray-200 bg-white">
              <th className=" px-9 ps-28 py-7 border-b-2 border-gray-200 bg-gray-100 text-left text-4xl font-bold text-gray-700 uppercase tracking-wider">
                Food Image
              </th>

              <th className="px-9 py-7 border-b-2 border-gray-200 bg-gray-100 text-left text-4xl font-bold text-gray-700 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr  key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex justify-start items-center gap-8">
                      <div className="flex-shrink-0 w-50 h-50">
                        <Image
                          className="w-full h-full rounded-full"
                          src={item.img}
                          alt={item.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-4xl font-medium text-gray-900 whitespace-no-wrap">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p
                      className="text-4xl text-left
                     text-gray-900 whitespace-no-wrap"
                    >
                      ₹10
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <!-- Right Rectangle --> */}
      <div className="w-[20%] ">
        {" "}
        <Image src={menurightimg} alt="menu left images" />
      </div>
    </div>
  );
}

export default page;
