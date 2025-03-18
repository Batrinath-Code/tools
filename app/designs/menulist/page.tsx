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

function Page() {
  return (
    <div className="relative w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row items-start justify-between">
      {/* Left Rectangle */}
      <div className="w-full lg:w-[20%] hidden lg:block">
        <Image src={menuleftimg} alt="menu left images" />
      </div>

      {/* Content Area */}
      <div className="w-full lg:w-[60%] bg-white px-4 py-8">
        <h2 className="mt-10 font-semibold text-2xl md:text-5xl text-center my-5 underline">
          Monday Food Menu List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-4 text-left text-sm md:text-lg font-bold text-gray-700">
                  Food Image
                </th>
                <th className="px-4 py-4 text-left text-sm md:text-lg font-bold text-gray-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20">
                        <Image
                          className="w-full h-full rounded-full"
                          src={item.img}
                          alt={item.name}
                        />
                      </div>
                      <p className="text-base md:text-2xl font-medium text-gray-900">
                        {item.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-base md:text-2xl text-gray-900">
                      ₹{item.price}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Rectangle */}
      <div className="w-full lg:w-[20%] hidden lg:block">
        <Image src={menurightimg} alt="menu right images" />
      </div>
    </div>
  );
}

export default Page;
