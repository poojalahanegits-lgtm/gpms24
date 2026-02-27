import ServiceCardSkeleton from "./skelton/ServiceCardSkeleton";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
import { Info } from "lucide-react";
import { useAllSubServices, useMainServices } from "./services/index";

import plumbingImg from "@/assets/mainservicesimages/Plumbing.png";
import notFoundImg from "@/assetss/commanImages/not-found.jpeg";

//! images
import service1_image from "@/assetss/servicesImages/Movers&Packers.png";
import service2_image from "@/assetss/servicesImages/DeepCleaning.png";
import service3_image from "@/assetss/servicesImages/Electrical.png";
import service4_image from "@/assetss/servicesImages/Plumbing.png";
import service5_image from "@/assetss/servicesImages/WaterTank.png";
import service6_image from "@/assetss/servicesImages/Painting.png";
import service7_image from "@/assetss/servicesImages/Bhangarwala.png";
import service8_image from "@/assetss/servicesImages/PropertyRenovation.png";
// import service9_image from "@/assetss/servicesImages/Tile&GraniteWork.png";
import service10_image from "@/assetss/servicesImages/Tile&GraniteWork.png";
import service11_image from "@/assetss/servicesImages/CivilWork.png";
import service12_image from "@/assetss/servicesImages/CarpentrySharp.png";
import service13_image from "@/assetss/servicesImages/CarMaintenance.png";
import service14_image from "@/assetss/servicesImages/BuildingMaintenance.png";
import service15_image from "@/assetss/servicesImages/SocietyManagemen.png";

//! icons

import service1_icon from "@/assetss/icons/Movers&Packers.png";

import service2_icon from "@/assetss/icons/DeepCleaning-Icon.png";
import service3_icon from "@/assetss/icons/Electrical-Icon.png";
import service4_icon from "@/assetss/icons/Plumbing-Icon.png";
import service5_icon from "@/assetss/icons/WaterTank-Icon.png";
import service6_icon from "@/assetss/icons/Painting-Icon.png";
import service7_icon from "@/assetss/icons/Bhangarwala-Icon.png";
import service8_icon from "@/assetss/icons/PropertyRenovation-Icon.png";
import service9_icon from "@/assetss/icons/PropertyRenovation-Icon.png";
import service10_icon from "@/assetss/icons/Tile&GraniteWork-Icon.png";
import service11_icon from "@/assetss/icons/CivilWork-Icon.png";
import service12_icon from "@/assetss/icons/Carpentry-Icon.png";
import service13_icon from "@/assetss/icons/CarMaintenance-Icon.png";
import service14_icon from "@/assetss/icons/BuildingMaintenance-Icon.png";
import service15_icon from "@/assetss/icons/SocietyManagement-Icon.png";

const fallbackImages = [
  service1_image,
  service2_image,
  service3_image,
  service4_image,
  service5_image,
  service6_image,
  service7_image,
  service8_image,
  // service9_image,
  service10_image,
  service11_image,
  service12_image,
  service13_image,
  service14_image,
  service15_image,
];

const serviceIconMap = {
  "gpms-service-1": service1_icon,
  "gpms-service-2": service2_icon,
  "gpms-service-3": service3_icon,
  "gpms-service-4": service4_icon,
  "gpms-service-5": service5_icon,
  "gpms-service-6": service6_icon,
  "gpms-service-7": service7_icon,
  "gpms-service-8": service8_icon,
  "gpms-service-9": service9_icon,
  "gpms-service-10": service10_icon,
  "gpms-service-11": service11_icon,
  "gpms-service-12": service12_icon,
  "gpms-service-13": service13_icon,
  "gpms-service-14": service14_icon,
  "gpms-service-15": service15_icon,
};
const IconWithFallback = ({ src, fallback }) => {
  const [iconSrc, setIconSrc] = useState(fallback);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => setIconSrc(src);
  }, [src]);

  return <img src={iconSrc || fallback} alt="icon" className=" object-cover" />;
};
const ImageWithFallback = ({ src, alt, fallback }) => {
  const [imgSrc, setImgSrc] = useState(fallback);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc || fallback}
      alt={alt}
      loading="lazy"
      className="w-full h-[340px] object-cover rounded-t-xl"
    />
  );
};
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const getDrivePreviewUrl = (url, pageNumber) => {
  if (!url) return null;

  const match = url.match(/\/d\/([^/]+)/);
  if (!match) return url;

  const baseUrl = `https://drive.google.com/file/d/${match[1]}/preview`;

  const page = Number(pageNumber);

  return page > 0 ? `${baseUrl}#page=${page}` : baseUrl;
};

const ServiceCard = ({ service, sectionBg, onViewDetails, mainId }) => {
  console.log(11111, service.main_service_icon);
  console.log(2222, service.icon);
  return (
    <div
      onClick={() => service?.pdfUrl && onViewDetails(service)}
      className="group relative rounded-2xl border border-gray-300
  pl-4 pr-1 lg:pl-5 pt-4 lg:pt-4 
  shadow-sm transition-all duration-300
  hover:-translate-y-1 hover:shadow-md
  bg-white"
    >
      {/* Details */}
      <div className="flex space-x-2 mb-1 lg:mb-4 ">
        <h4
          className=" text-base lg:text-[18px] font-semibold text-gray-900 line-clamp-1"
          title={service.title}
        >
          {service.title}
        </h4>
        <button className="text-sm text-gray-500">
          {" "}
          <Info size={18} />
        </button>
      </div>

      <div className=" flex justify-between pb-0">
        <div className=" mt-2">
          <p className="text-sm md:text-[18px]  text-black">
            ₹ {service.price}{" "}
            <span className="text-gray-500 italic text-[11px] md:text-[14px]">
              onwards <span className=" text-[11px] md:text-[14px]">*</span>
            </span>
          </p>
        </div>
        <div className=" h-auto w-24 ">
          <IconWithFallback
            // src={service.icon}
            src={
              service.icon ||
              service.main_service_icon ||
              serviceIconMap[mainId] ||
              null
            }
            fallback={serviceIconMap[mainId] || plumbingImg}
            className=" object-cover"
          />
        </div>
      </div>
    </div>
  );
};
const ServiceSection = ({ id, data, sectionBg, onViewDetails }) => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  // filter sub-services
  const trimmedSearch = search.trim().replace(/\s+/g, " ").toLowerCase();

  const filteredServices =
    trimmedSearch === ""
      ? data.services.filter((service) => service.status === "active")
      : data.services.filter(
          (service) =>
            service.status === "active" &&
            service.title.toLowerCase().includes(trimmedSearch),
        );
  // show only first 10 unless "View More" clicked
  const visibleServices = showAll
    ? filteredServices
    : filteredServices.slice(0, 10);

  return (
    <>
      <div
        id={id}
        className="space-y-6   lg:scroll-mt-28 scroll-mt-16 px-4  sm:px-6 lg:px-12"
      >
        {/* Header */}
        <div className="flex flex-col  sm:flex-row sm:items-center justify-between">
          <h1 className="lg:text-2xl text-lg py-4 font-bold lg:text-[28px]">
            {data.mainTitle?.split(" - ")[0]}
            {data.mainTitle?.includes(" - ") && (
              <span className="text-gray-500 lg:text-[22px] text-[16px]  font-normal italic">
                {" - "}
                {data.mainTitle.split(" - ")[1]}
              </span>
            )}
          </h1>

          {/* Search */}
          <div className="flex items-center gap-2">
            {/* <div className="relative w-full sm:w-[280px]">
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowAll(false); 
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
              <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div> */}
            <div className="relative w-full sm:w-[280px]">
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowAll(false);
                }}
                className="w-full rounded-xl border border-gray-300 px-4 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />

              {!search && (
                <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              )}

              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setShowAll(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={() => scrollToSection("services")}
              className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium  transition bg-black text-white whitespace-nowrap"
            >
              ← Back to Services
            </button>
          </div>
        </div>
        {/* Services Grid */}
        {visibleServices.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-2 lg:grid-cols-5 overflow-visible">
              {visibleServices.map((service, index) => (
                <ServiceCard
                  key={service.title + index}
                  service={service}
                  sectionBg={sectionBg}
                  onViewDetails={onViewDetails}
                  mainId={id}
                  // index={index}
                />
              ))}
            </div>

            {/* View More / View Less Button */}
            {filteredServices.length > 10 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="rounded-xl border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                >
                  {showAll ? "View Less" : "View More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center bg-[#fbfbfb] justify-center py-12">
            <img
              src={notFoundImg}
              alt="No services found"
              className="w-64 h-64 md:w-72 md:h-72  object-contain opacity-90"
            />
            <p className="mt-4 text-gray-500 text-sm">No services found</p>
          </div>
        )}
      </div>
      <div className="flex justify-end my-4 mx-8 lg:mx-14">
        <p className="flex items-center  text-[11px] text-gray-500">
          {/* <i className="fa-solid fa-star text-[8px]" /> */}* Conditions
          apply
        </p>
      </div>
      <p className="border-b"></p>
    </>
  );
};

const Services = () => {
  const handleViewDetails = (service) => {
    //  console.log("Clicked service:", service);
    const previewUrl = getDrivePreviewUrl(service.pdfUrl, service.page);

    setSelectedService(service);
    setActivePdf(previewUrl);
    setOpen(true);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    AOS.refresh();
  }, []);

  const [selectedService, setSelectedService] = useState(null);
  const [mainSearch, setMainSearch] = useState("");

  const [loaded, setLoaded] = useState(false);
  const [activePdf, setActivePdf] = useState(null);

  const [open, setOpen] = useState(false);
  const { data: services = [], isLoading: loading } = useMainServices();
  const { data: allSubServices = {} } = useAllSubServices();

  return (
    <section id="services" className="  scroll-mt-16 ">
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="relative w-[90%] max-w-4xl rounded-xl bg-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-sm font-semibold">
                {selectedService?.title || "Service Details"}
              </h3>

              <button
                onClick={() => {
                  setOpen(false);
                  setActivePdf(null);
                  setSelectedService(null);
                }}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* PDF */}
            <div className="h-[75vh]">
              {activePdf ? (
                <iframe
                  src={activePdf}
                  className="h-full w-full"
                  title="Service PDF"
                  allow="autoplay"
                />
              ) : (
                <p className="p-4 text-center text-gray-500">
                  No document available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* main services */}
      <div className=" lg:pb-18 pt-4 md:pt-6 pb-4 md:pb-6 lg:pt-12 px-2">
        <div className=" sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5  mb-8">
            {/* Center Heading */}
            <div className="lg:flex flex-col hidden  justify-center "></div>
            <div className="flex flex-col  justify-center items-center">
              <h2 className="text-black text-[22px] sm:text-[26px] lg:text-[38px] font-bold">
                Our Services
              </h2>
            </div>

            {/* Right Search */}
            <div className="ml-auto w-full max-w-md lg:pl-8  lg:ml-0">
              {/* <div className="relative">
                <div className=" lg:pl-12">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={mainSearch}
                    onChange={(e) => setMainSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-6 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div> */}
              <div className="lg:pl-12 relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={mainSearch}
                  onChange={(e) => setMainSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-6 pr-10 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-black"
                />

                {/* Search icon (when empty) */}
                {!mainSearch && (
                  <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                )}

                {/* Clear icon (when typing) */}
                {mainSearch && (
                  <button
                    onClick={() => setMainSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Services Cards */}
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:px-2">
            {/* {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ServiceCardSkeleton key={i} />
                ))
              : services
                  .filter(
                    (service) =>
                      (service.status === "active" ||
                        service.Status === "active") &&
                      service.title
                        .toLowerCase()
                        .includes(mainSearch.trim().toLowerCase()),
                  )
                  .map((service, index) => (
                    <div
                      id={`#${service.id}`}
                      key={service.title}
                      onClick={() => scrollToSection(service.id)}
                      className="cursor-pointer rounded-md flex flex-col gap-4 scroll-mt-40 lg:scroll-mt-0 transition hover:-translate-y-1 group max-w-[400px] shadow-lg"
                    >
            
                      <ImageWithFallback
                        src={service.img}
                        alt={service.title}
                        fallback={fallbackImages[index % fallbackImages.length]}
                      />

                      <div className="px-4 pb-4 ">
                        <h3 className="font-semibold text-[18px] text-[#111D15]">
                          {service.title}
                        </h3>
                     
                      </div>
                    </div>
                  ))} */}
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))
            ) : services.filter(
                (service) =>
                  (service.status === "active" ||
                    service.Status === "active") &&
                  service.title
                    .toLowerCase()
                    .includes(mainSearch.trim().toLowerCase()),
              ).length === 0 ? (
              <div className="col-span-full flex bg-[#fbfbfb] flex-col items-center justify-center py-12">
                <img
                  src={notFoundImg}
                  alt="No services found"
                  className="w-64 h-64 md:w-72 md:h-72  object-contain opacity-80"
                />
                <p className="mt-4 text-gray-500 text-lg">No services found</p>
              </div>
            ) : (
              services
                .filter(
                  (service) =>
                    (service.status === "active" ||
                      service.Status === "active") &&
                    service.title
                      .toLowerCase()
                      .includes(mainSearch.trim().toLowerCase()),
                )
                .map((service, index) => (
                  <div
                    key={service.title}
                    onClick={() => scrollToSection(service.id)}
                    className="cursor-pointer rounded-md flex flex-col gap-4 transition hover:-translate-y-1 group max-w-[400px] shadow-lg"
                  >
                    <ImageWithFallback
                      src={service.img}
                      alt={service.title}
                      fallback={fallbackImages[index % fallbackImages.length]}
                    />

                    <div className="px-4 pb-4 ">
                      <h3 className="font-semibold text-[18px] text-[#111D15]">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* all  servics */}

      <div>
        {Object.entries(allSubServices).map(([mainId, categories], index) =>
          Object.entries(categories).map(([categoryId, section], idx) => {
            const isGray = (index + idx) % 2 === 0;

            return (
              <div
                key={`${mainId}-${categoryId}`}
                className="lg:py-6 py-4 md:py-6 "
              >
                <ServiceSection
                  id={mainId}
                  data={{
                    mainTitle: section.categoryTitle
                      ? `${section.mainTitle} - ${section.categoryTitle}`
                      : section.mainTitle,
                    services: section.services,
                  }}
                  sectionBg={isGray ? "white" : "gray"}
                  onViewDetails={handleViewDetails}
                />
              </div>
            );
          }),
        )}
      </div>
    </section>
  );
};

export default Services;

// import ServiceCardSkeleton from "./skelton/ServiceCardSkeleton";

// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Info } from "lucide-react";
// import { useAllSubServices, useMainServices } from "./services/index";

// import plumbingImg from "@/assets/mainservicesimages/Plumbing.png";

// //! images
// import service1_image from "@/assetss/servicesImages/Movers&Packers.png";
// import service2_image from "@/assetss/servicesImages/DeepCleaning.png";
// import service3_image from "@/assetss/servicesImages/Electrical.png";
// import service4_image from "@/assetss/servicesImages/Plumbing.png";
// import service5_image from "@/assetss/servicesImages/WaterTank.png";
// import service6_image from "@/assetss/servicesImages/Painting.png";
// import service7_image from "@/assetss/servicesImages/Bhangarwala.png";
// import service8_image from "@/assetss/servicesImages/PropertyRenovation.png";
// // import service9_image from "@/assetss/servicesImages/Tile&GraniteWork.png";
// import service10_image from "@/assetss/servicesImages/Tile&GraniteWork.png";
// import service11_image from "@/assetss/servicesImages/CivilWork.png";
// import service12_image from "@/assetss/servicesImages/CarpentrySharp.png";
// import service13_image from "@/assetss/servicesImages/CarMaintenance.png";
// import service14_image from "@/assetss/servicesImages/BuildingMaintenance.png";
// import service15_image from "@/assetss/servicesImages/SocietyManagemen.png";

// //! icons

// import service1_icon from "@/assetss/icons/Movers&Packers.png";
// import service2_icon from "@/assetss/icons/DeepCleaning-Icon.png";
// import service3_icon from "@/assetss/icons/Electrical-Icon.png";
// import service4_icon from "@/assetss/icons/Plumbing-Icon.png";
// import service5_icon from "@/assetss/icons/WaterTank-Icon.png";
// import service6_icon from "@/assetss/icons/Painting-Icon.png";
// import service7_icon from "@/assetss/icons/Bhangarwala-Icon.png";
// import service8_icon from "@/assetss/icons/Bhangarwala-Icon.png";
// import service9_icon from "@/assetss/icons/Bhangarwala-Icon.png";
// import service10_icon from "@/assetss/icons/Bhangarwala-Icon.png";
// import service11_icon from "@/assetss/icons/Bhangarwala-Icon.png";
// import service12_icon from "@/assetss/icons/Bhangarwala-Icon.png";
// import service13_icon from "@/assetss/icons/Bhangarwala-Icon.png";
// import service14_icon from "@/assetss/icons/Bhangarwala-Icon.png";
// import service15_icon from "@/assetss/icons/Bhangarwala-Icon.png";

// const fallbackImages = [
//   service1_image,
//   service2_image,
//   service3_image,
//   service4_image,
//   service5_image,
//   service6_image,
//   service7_image,
//   service8_image,
//   // service9_image,
//   service10_image,
//   service11_image,
//   service12_image,
//   service13_image,
//   service14_image,
//   service15_image,
// ];

// const serviceIconMap = {
//   "gpms-service-1": service1_icon,
//   "gpms-service-2": service2_icon,
//   "gpms-service-3": service3_icon,
//   "gpms-service-4": service4_icon,
//   "gpms-service-5": service5_icon,
//   "gpms-service-6": service6_icon,
//   "gpms-service-7": service7_icon,
//   "gpms-service-8": service8_icon,
//   "gpms-service-9": service9_icon,
//   "gpms-service-10": service10_icon,
//   "gpms-service-11": service11_icon,
//   "gpms-service-12": service12_icon,
//   "gpms-service-13": service13_icon,
//   "gpms-service-14": service14_icon,
//   "gpms-service-15": service15_icon,
// };
// const IconWithFallback = ({ src, fallback }) => {
//   const [iconSrc, setIconSrc] = useState(fallback);

//   useEffect(() => {
//     if (!src) return;

//     const img = new Image();
//     img.src = src;

//     img.onload = () => setIconSrc(src);
//   }, [src]);

//   return <img src={iconSrc || fallback} alt="icon" className=" object-cover" />;
// };
// const ImageWithFallback = ({ src, alt, fallback }) => {
//   const [imgSrc, setImgSrc] = useState(fallback);

//   useEffect(() => {
//     if (!src) return;

//     const img = new Image();
//     img.src = src;

//     img.onload = () => setImgSrc(src);
//   }, [src]);

//   return (
//     <img
//       src={imgSrc || fallback}
//       alt={alt}
//       loading="lazy"
//       className="w-full h-[340px] object-cover rounded-t-xl"
//     />
//   );
// };
// const scrollToSection = (id) => {
//   const element = document.getElementById(id);
//   if (element) {
//     element.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   }
// };

// const getDrivePreviewUrl = (url, pageNumber) => {
//   if (!url) return null;

//   const match = url.match(/\/d\/([^/]+)/);
//   if (!match) return url;

//   const baseUrl = `https://drive.google.com/file/d/${match[1]}/preview`;

//   const page = Number(pageNumber);

//   return page > 0 ? `${baseUrl}#page=${page}` : baseUrl;
// };

// const ServiceCard = ({ service, sectionBg, onViewDetails, mainId }) => {
//   // console.log(11111, service.main_service_icon);
//   return (
//     <div
//       onClick={() => service?.pdfUrl && onViewDetails(service)}
//       className={`group relative rounded-2xl border border-gray-100
//         pl-4 pr-1 lg:pl-5 pt-4 lg:pt-4
//         shadow-sm transition-all duration-300
//         hover:-translate-y-1 hover:shadow-md
//         ${sectionBg == "white" ? "bg-[#fbfbfb]" : "bg-white"}
//       `}
//     >
//       {/* Details */}
//       <div className="flex space-x-2 mb-1 lg:mb-4 ">
//         <h4
//           className=" text-base lg:text-[18px] font-semibold text-gray-900 line-clamp-1"
//           title={service.title}
//         >
//           {service.title}
//         </h4>
//         <button className="text-sm text-gray-500">
//           {" "}
//           <Info size={18} />
//         </button>
//       </div>

//       <div className=" flex justify-between pb-0">
//         <div className=" mt-2">
//           <p className="text-sm md:text-[18px]  text-black">
//             ₹ {service.price}{" "}
//             <span className="text-gray-500 italic text-[11px] md:text-[14px]">
//               onwards <span className=" text-[11px] md:text-[14px]">*</span>
//             </span>
//           </p>
//         </div>
//         <div className=" h-auto w-24 ">
//           <IconWithFallback
//             src={service.main_service_icon}
//             fallback={serviceIconMap[mainId] || plumbingImg}
//             className=" object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const ServiceSection = ({ id, data, sectionBg, onViewDetails }) => {
//   const [search, setSearch] = useState("");
//   const [showAll, setShowAll] = useState(false);

//   // filter sub-services
//   const trimmedSearch = search.trim().replace(/\s+/g, " ").toLowerCase();

//   const filteredServices =
//     trimmedSearch === ""
//       ? data.services
//       : data.services.filter((service) =>
//           service.title.toLowerCase().includes(trimmedSearch),
//         );

//   // show only first 10 unless "View More" clicked
//   const visibleServices = showAll
//     ? filteredServices
//     : filteredServices.slice(0, 10);

//   return (
//     <>
//       <div
//         id={id}
//         className="space-y-6   lg:scroll-mt-28 scroll-mt-16 px-4  sm:px-6 lg:px-12"
//       >
//         {/* Header */}
//         <div className="flex flex-col  sm:flex-row sm:items-center justify-between">
//           <h1 className="lg:text-2xl text-lg py-4 font-bold lg:text-[28px]">
//             {data.mainTitle?.split(" - ")[0]}
//             {data.mainTitle?.includes(" - ") && (
//               <span className="text-gray-500 lg:text-[22px] text-[16px]  font-normal italic">
//                 {" - "}
//                 {data.mainTitle.split(" - ")[1]}
//               </span>
//             )}
//           </h1>

//           {/* Search */}
//           <div className="flex items-center gap-2">
//             <div className="relative w-full sm:w-[280px]">
//               <input
//                 type="text"
//                 placeholder="Search services..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setShowAll(false); // reset view when searching
//                 }}
//                 className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
//               />
//               <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>

//             <button
//               onClick={() => scrollToSection("services")}
//               className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium  transition bg-black text-white whitespace-nowrap"
//             >
//               ← Back to Services
//             </button>
//           </div>
//         </div>
//         {/* Services Grid */}
//         {visibleServices.length > 0 ? (
//           <>
//             <div className="grid gap-6 grid-cols-2 lg:grid-cols-5 overflow-visible">
//               {visibleServices.map((service, index) => (
//                 <ServiceCard
//                   key={service.title + index}
//                   service={service}
//                   sectionBg={sectionBg}
//                   onViewDetails={onViewDetails}
//                   mainId={id}
//                   // index={index}
//                 />
//               ))}
//             </div>

//             {/* View More / View Less Button */}
//             {filteredServices.length > 10 && (
//               <div className="flex justify-center mt-6">
//                 <button
//                   onClick={() => setShowAll(!showAll)}
//                   className="rounded-xl border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
//                 >
//                   {showAll ? "View Less" : "View More"}
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-500 text-sm">No services found.</p>
//         )}
//       </div>
//       <div className="flex justify-end my-4 mx-8 lg:mx-14">
//         <p className="flex items-center  text-[11px] text-gray-500">
//           {/* <i className="fa-solid fa-star text-[8px]" /> */}* Conditions
//           apply
//         </p>
//       </div>
//     </>
//   );
// };

// const Services = () => {
//   const handleViewDetails = (service) => {
//     //  console.log("Clicked service:", service);
//     const previewUrl = getDrivePreviewUrl(service.pdfUrl, service.page);

//     setSelectedService(service);
//     setActivePdf(previewUrl);
//     setOpen(true);
//   };

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: false,
//     });
//     AOS.refresh();
//   }, []);

//   const [selectedService, setSelectedService] = useState(null);
//   const [mainSearch, setMainSearch] = useState("");

//   const [loaded, setLoaded] = useState(false);
//   const [activePdf, setActivePdf] = useState(null);

//   const [open, setOpen] = useState(false);
//   const { data: services = [], isLoading: loading } = useMainServices();
//   const { data: allSubServices = {} } = useAllSubServices();

//   return (
//     <section id="services" className="  scroll-mt-16 ">
//       {open && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
//           <div className="relative w-[90%] max-w-4xl rounded-xl bg-white overflow-hidden">
//             {/* Header */}
//             <div className="flex items-center justify-between border-b px-4 py-3">
//               <h3 className="text-sm font-semibold">
//                 {selectedService?.title || "Service Details"}
//               </h3>

//               <button
//                 onClick={() => {
//                   setOpen(false);
//                   setActivePdf(null);
//                   setSelectedService(null);
//                 }}
//                 className="text-gray-500 hover:text-black"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* PDF */}
//             <div className="h-[75vh]">
//               {activePdf ? (
//                 <iframe
//                   src={activePdf}
//                   className="h-full w-full"
//                   title="Service PDF"
//                   allow="autoplay"
//                 />
//               ) : (
//                 <p className="p-4 text-center text-gray-500">
//                   No document available
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//       {/* main services */}
//       <div className="bg-[#fbfbfb] lg:pb-18 pt-4 md:pt-6 pb-4 md:pb-6 lg:pt-12 px-2">
//         <div className=" sm:px-6 lg:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5  mb-8">
//             {/* Center Heading */}
//             <div className="lg:flex flex-col hidden  justify-center "></div>
//             <div className="flex flex-col  justify-center items-center">
//               <h2 className="text-black text-[22px] sm:text-[26px] lg:text-[38px] font-bold">
//                 Our Services
//               </h2>
//             </div>

//             {/* Right Search */}
//             <div className="ml-auto w-full max-w-md lg:pl-8  lg:ml-0">
//               <div className="relative">
//                 <div className=" lg:pl-12">
//                   <input
//                     type="text"
//                     placeholder="Search services..."
//                     value={mainSearch}
//                     onChange={(e) => setMainSearch(e.target.value)}
//                     className="w-full rounded-xl border border-gray-300 px-6 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-black"
//                   />
//                   <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Services Cards */}
//           <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:px-2">
//             {loading
//               ? Array.from({ length: 8 }).map((_, i) => (
//                   <ServiceCardSkeleton key={i} />
//                 ))
//               : services
//                   .filter(
//                     (service) =>
//                       (service.status === "active" ||
//                         service.Status === "active") &&
//                       service.title
//                         .toLowerCase()
//                         .includes(mainSearch.toLowerCase()),
//                   )
//                   .map((service, index) => (
//                     <div
//                       id={`#${service.id}`}
//                       key={service.title}
//                       onClick={() => scrollToSection(service.id)}
//                       className="cursor-pointer rounded-md flex flex-col gap-4 scroll-mt-40 lg:scroll-mt-0 transition hover:-translate-y-1 group max-w-[400px] shadow-lg"
//                     >
//                       {/* Image wrapper */}
//                       <ImageWithFallback
//                         src={service.img}
//                         alt={service.title}
//                         fallback={fallbackImages[index % fallbackImages.length]}
//                       />

//                       <div className="px-4 pb-4 ">
//                         <h3 className="font-semibold text-[18px] text-[#111D15]">
//                           {service.title}
//                         </h3>
//                         {/* <p className="text-[14px] text-[#666666]">
//                           {service.desc}
//                         </p> */}
//                       </div>
//                     </div>
//                   ))}
//           </div>
//         </div>
//       </div>

//       {/* all  servics */}

//       <div>
//         {Object.entries(allSubServices).map(([mainId, categories], index) =>
//           Object.entries(categories).map(([categoryId, section], idx) => {
//             const isGray = (index + idx) % 2 === 0;

//             return (
//               <div
//                 key={`${mainId}-${categoryId}`}
//                 className={`lg:py-6 py-4 md:py-6 ${
//                   isGray ? "bg-white" : "bg-[#fbfbfb]"
//                 }`}
//               >
//                 <ServiceSection
//                   id={mainId}
//                   data={{
//                     mainTitle: section.categoryTitle
//                       ? `${section.mainTitle} - ${section.categoryTitle}`
//                       : section.mainTitle,
//                     services: section.services,
//                   }}
//                   sectionBg={isGray ? "white" : "gray"}
//                   onViewDetails={handleViewDetails}
//                 />
//               </div>
//             );
//           }),
//         )}
//       </div>
//     </section>
//   );
// };

// export default Services;
