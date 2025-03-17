"use client";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import EasyQRCode from "easyqrcodejs";

//Schema for QR
const qrFormSchema = z.object({
  urlAddress: z.string().url().nonempty("URL is required"), // Validate URL
  image: z
    .custom<File | null>(
      (file) => {
        if (!file) return false;

        const validTypes = ["image/png"]; // Allowed image types
        const maxSize = 5 * 1024 * 1024; // Max size: 5 MB

        return validTypes.includes(file.type) && file.size <= maxSize;
      },
      {
        message: "Invalid image. Only PNG up to 5 MB are allowed.",
      }
    )
    .nullable(),
});

const QrGenerator: React.FC = () => {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [urlAddress, setUrlAddress] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const QrFormValidation = useForm<z.infer<typeof qrFormSchema>>({
    resolver: zodResolver(qrFormSchema),
    defaultValues: {
      urlAddress: "",
      image: null,
    },
  });

  const onSubmit = (value: z.infer<typeof qrFormSchema>) => {
    const urlValue =
      value.urlAddress !== "" && value.urlAddress ? value.urlAddress : "";
    setUrlAddress(urlValue);

    const imagePath = value.image
      ? URL.createObjectURL(value.image as File)
      : null;
    setUploadedImage(imagePath);
  };

  useEffect(() => {
    let objectUrl: string | null = null;

    if (uploadedImage) {
      objectUrl = uploadedImage;
    }

    if (urlAddress && qrContainerRef.current) {
      qrContainerRef.current.innerHTML = ""; // Clear any existing QR code
      const options = {
        text: urlAddress,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: EasyQRCode.CorrectLevel.H,
        logo: uploadedImage,
        logoWidth: 80,
        logoHeight: 80,
        logoBackgroundTransparent: true,
      };
      new EasyQRCode(qrContainerRef.current, options);
    }

    // Clean up object URL on unmount
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [urlAddress, uploadedImage]);

  return (
    <div className="w-fit h-screen mx-auto flex flex-col items-center justify-center py-8 ">
      <h1 className="text-2xl md:text-5xl font-bold mb-6">QR Code Generator</h1>
      <span className="p-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-2xs md:w-3xl  bg-white p-4 rounded-lg">
          <Form {...QrFormValidation}>
            <form
              onSubmit={QrFormValidation.handleSubmit(onSubmit)}
              className="space-y-8 p-9"
            >
              <FormField
                control={QrFormValidation.control}
                name="urlAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-xl">
                      URl Address
                    </FormLabel>
                    <FormControl>
                      <span className="p-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg">
                        <Input
                          className="bg-white "
                          placeholder="www.batrinath.com"
                          {...field}
                        />
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={QrFormValidation.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-xl">Logo</FormLabel>
                    <FormControl>
                      <span className="p-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg">
                        <Input
                          className="bg-white"
                          type="file"
                          accept="image/png"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            field.onChange(file); // Update the form value
                          }}
                        />
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <div className="flex items-center justify-center  ">
            <div ref={qrContainerRef} className="  w-3/4 h-64 border "></div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default QrGenerator;
