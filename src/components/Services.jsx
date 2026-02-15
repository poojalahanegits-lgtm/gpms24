import ServiceCardSkeleton from "./skelton/ServiceCardSkeleton";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
import { Info } from "lucide-react";
import {
  useResidentialMoversPackers,
  useCommercialMoversPackers,
  useDeepCleaningResidential,
  useDeepCleaningCommercial,
  useElectricalServices,
  usePlumbingServices,
  usePaintingServices,
  useWaterproofingServices,
  useWaterTankServices,
  useCarMaintenanceServices,
  useCivilWorkServices,
  useCarpentryServices,
  useSocietyManagementServices,
  useBuildingMaintenanceServices,
  useTileGraniteServices,
  useResidentialPropertyRenovation,
  useCommercialPropertyRenovation,
  useMainServices,
  useBhangarwalaServices,
} from "./services/index";

import plumbingImg from "@/assets/mainservicesimages/Plumbing.png";
import electricalImg from "@/assets/mainservicesimages/ElectricalRepairs.png";
import moversImg from "@/assets/mainservicesimages/Movers&Packers-1.png";
import carMaintenanceImg from "@/assets/mainservicesimages/CarMaintenance.png";
import carpentryImg from "@/assets/mainservicesimages/Carpentry.png";
import civilWorkImg from "@/assets/mainservicesimages/CivilWork&BrickWork.png";
import societyManageImg from "@/assets/mainservicesimages/SocietyManagement.png";
import buildingMaintenanceImg from "@/assets/mainservicesimages/BuildingMaintenance.png";
import tileworkImg from "@/assets/mainservicesimages/TileWork.png";
import paintingImg from "@/assets/mainservicesimages/Painting.png";
import waterTankImg from "@/assets/mainservicesimages/WaterTankServices.png";
const fallbackImages = {
  "movers-packers": moversImg,
  "electrical-repairs": electricalImg,
  plumbing: plumbingImg,
  "civil-work": civilWorkImg,
  carpentry: carpentryImg,
  "car-maintenance": carMaintenanceImg,
  "society-management": societyManageImg,
  "building-maintenance": buildingMaintenanceImg,
  "tile-and-granite-all-services": tileworkImg,
  "painting-services": paintingImg,
  "water-tank-services": waterTankImg,
};

const ImageWithFallback = ({ src, alt, fallback }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [errorTried, setErrorTried] = useState(false);

  return (
    <div className="relative w-full h-[340px] overflow-hidden rounded-t-xl bg-gray-100">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!errorTried && fallback) {
            setErrorTried(true);
            setImgSrc(fallback);
            setLoaded(false); // reset loading for fallback
          }
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
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

const ServiceCard = ({ service, sectionBg, onViewDetails }) => {
  return (
    <div
      onClick={() => service?.pdfUrl && onViewDetails(service)}
      className={`group relative rounded-2xl border border-gray-100
        px-4 lg:px-5 pt-4 lg:py-4
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-md
        ${sectionBg == "white" ? "bg-[#fbfbfb]" : "bg-white"}
      `}
    >
      {/* Title */}
      <h4
        className="mb-1 text-base lg:text-[17px] font-semibold text-gray-900 line-clamp-1"
        title={service.title}
      >
        {service.title}
      </h4>

      {/* Details */}
      <div className="flex justify-between">
        <button
          // onClick={() => onViewDetails(pdfUrl)}
          className="mb-1 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          <Info size={18} />
          View details
        </button>
        {/* <p className="flex items-center gap-1 text-[11px] text-black">
          <i className="fa-solid fa-star text-[8px]" />
          Conditions apply
        </p> */}
      </div>

      {/* Price */}
      <div className=" flex justify-between items-center">
        <p className="text-sm md:text-base  text-gray-500">{service.price}</p>

        {/* <p className="flex items-center gap-1 text-[11px] text-black">
          <i className="fa-solid fa-star text-[8px]" />
        </p> */}
      </div>
      <div className="flex justify-end">
        <p className="flex items-center  text-[11px] text-gray-500">
          {/* <i className="fa-solid fa-star text-[8px]" /> */}* Conditions
          apply
        </p>
      </div>
    </div>
  );
};

const ServiceSection = ({ id, data, sectionBg, onViewDetails }) => {
  const isElectrical = data.mainTitle === "Electrical Services";
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  // filter sub-services
  const trimmedSearch = search.trim().replace(/\s+/g, " ").toLowerCase();

  const filteredServices =
    trimmedSearch === ""
      ? data.services
      : data.services.filter((service) =>
          service.title.toLowerCase().includes(trimmedSearch),
        );

  // show only first 10 unless "View More" clicked
  const visibleServices = showAll
    ? filteredServices
    : filteredServices.slice(0, 10);

  return (
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
          <div className="relative w-full sm:w-[280px]">
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowAll(false); // reset view when searching
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
            {visibleServices.map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
                sectionBg={sectionBg}
                onViewDetails={onViewDetails}
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
        <p className="text-gray-500 text-sm">No services found.</p>
      )}
    </div>
  );
};

const Services = () => {
  const handleViewDetails = (service) => {
    console.log("Clicked service:", service);
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

  const { data: residentialMoversPackers = [], isLoading: loading1 } =
    useResidentialMoversPackers();
  const { data: residentialPropertyRenovation = [] } =
    useResidentialPropertyRenovation();

  const { data: commercialPropertyRenovation = [] } =
    useCommercialPropertyRenovation();

  const { data: commercialMoversPackers = [] } = useCommercialMoversPackers();

  const { data: residentialDeepCleaning = [] } = useDeepCleaningResidential();

  const { data: commercialDeepCleaning = [] } = useDeepCleaningCommercial();

  const { data: electricalServices = [] } = useElectricalServices();

  const { data: plumbingServices = [] } = usePlumbingServices();

  const { data: paintingServices = [] } = usePaintingServices();

  const { data: waterproofingServices = [] } = useWaterproofingServices();

  const { data: waterTankServices = [] } = useWaterTankServices();

  const { data: carMaintenanceServices = [] } = useCarMaintenanceServices();

  const { data: civilWorkServices = [] } = useCivilWorkServices();

  const { data: carpentryServices = [] } = useCarpentryServices();

  const { data: societyManagementServices = [] } =
    useSocietyManagementServices();

  const { data: buildingMaintenanceServices = [] } =
    useBuildingMaintenanceServices();

  const { data: tileGraniteServices = [] } = useTileGraniteServices();

  const { data: bhangarwalaServices = [], isLoading } =
    useBhangarwalaServices();

  //console.log(99999999999999, bhangarwalaServices);
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
      <div className="bg-[#fbfbfb] lg:pb-18 pt-4 md:pt-6 pb-4 md:pb-6 lg:pt-12 px-2">
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
              <div className="relative">
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
              </div>
            </div>
          </div>

          {/* Main Services Cards */}
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:px-2">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ServiceCardSkeleton key={i} />
                ))
              : services
                  .filter((service) =>
                    service.title
                      .toLowerCase()
                      .includes(mainSearch.toLowerCase()),
                  )
                  .map((service) => (
                    <div
                      id={`#${service.sectionId}`}
                      key={service.title}
                      onClick={() => scrollToSection(service.sectionId)}
                      className="cursor-pointer rounded-md flex flex-col gap-4 scroll-mt-40 lg:scroll-mt-0 transition hover:-translate-y-1 group max-w-[400px] shadow-lg"
                    >
                      {/* Image wrapper */}
                      <ImageWithFallback
                        src={service.img}
                        alt={service.title}
                        fallback={fallbackImages[service.sectionId]}
                      />

                      <div className="px-4 pb-4 ">
                        <h3 className="font-semibold text-[18px] text-[#111D15]">
                          {service.title}
                        </h3>
                        {/* <p className="text-[14px] text-[#666666]">
                          {service.desc}
                        </p> */}
                      </div>
                    </div>
                  ))}
          </div>
        </div>
      </div>

      {/*  servics */}
      <div className="  ">
        {/* //! movers & packers – residential subservices*/}
        <div className="lg:py-6 py-4 md:py-6 bg-white">
          {residentialMoversPackers.map((section, index) => (
            <ServiceSection
              key={index}
              id={`movers-packers`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! movers & packers – commercial services*/}
        <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
          {commercialMoversPackers.map((section, index) => (
            <ServiceSection
              key={index}
              id={`movers-packers`}
              data={section}
              sectionBg="gray"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //!deep cleaning resendential subservices */}
        <div className="lg:py-6 py-4 md:py-6 bg-white">
          {residentialDeepCleaning.map((section, index) => (
            <ServiceSection
              key={index}
              id={`deep-cleaning`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        {/* //!deep cleaning commercial subservices */}
        <div className="bg-[#fbfbfb] py-4 lg:py-6 md:py-6">
          {commercialDeepCleaning.map((section, index) => (
            <ServiceSection
              key={index}
              id={`deep-cleaning`}
              data={section}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! electrical repair services */}
        <div className="lg:py-6 py-4 md:py-6 bg-white">
          {electricalServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`electrical-repairs`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! plumbing services */}
        <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
          {plumbingServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`plumbing`}
              data={section}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! water tank services */}
        <div className="lg:py-6 py-4 md:py-6 bg-white">
          {waterTankServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`water-tank-services`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! painting services */}
        <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
          {paintingServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`painting-services`}
              data={section}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! waterproofing services */}
        <div className="lg:py-6 py-4 md:py-6 bg-white">
          {waterproofingServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`water-proof-services`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //!property renovation resendential  subservices */}

        <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
          {residentialPropertyRenovation.map((section, index) => (
            <ServiceSection
              key={index}
              id={`property-renovation-all-services`}
              data={section}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        {/* //! property renovation – commercial subservices */}

        <div className="lg:py-6 py-4 md:py-6 bg-white">
          {commercialPropertyRenovation.map((section, index) => (
            <ServiceSection
              key={index}
              id={`property-renovation-all-services`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        {/* //! tile and granite services */}
        <div className="lg:py-6 md:py-6 py-4 bg-[#fbfbfb]">
          {tileGraniteServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`tile-and-granite-all-services`}
              data={section}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! civil work services */}
        <div className="lg:py-6 py-4 md:py-6 bg-white">
          {civilWorkServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`civil-work`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! carpentry services */}
        <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
          {carpentryServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`carpentry`}
              data={section}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! car maintenance services */}
        <div className="lg:py-6 py-4 md:py-6 bg-white">
          {carMaintenanceServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`car-maintenance`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/*//! building maintenance services */}

        <div className="bg-[#fbfbfb] lg:py-6 md:py-6 py-4">
          {buildingMaintenanceServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`building-maintenance`}
              data={section}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* //! society management services */}
        <div className="bg-white lg:py-6 py-4 md:py-6">
          {societyManagementServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`society-management`}
              data={section}
              sectionBg="white"
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        {/* //! bhangarwala management services */}
        <div className="bg-white lg:py-6 py-4 md:py-6">
          {bhangarwalaServices.map((section, index) => (
            <ServiceSection
              key={index}
              id={`scrap-collection`}
              data={section}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
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
// import {
//   useResidentialMoversPackers,
//   useCommercialMoversPackers,
//   useDeepCleaningResidential,
//   useDeepCleaningCommercial,
//   useElectricalServices,
//   usePlumbingServices,
//   usePaintingServices,
//   useWaterproofingServices,
//   useWaterTankServices,
//   useCarMaintenanceServices,
//   useCivilWorkServices,
//   useCarpentryServices,
//   useSocietyManagementServices,
//   useBuildingMaintenanceServices,
//   useTileGraniteServices,
//   useResidentialPropertyRenovation,
//   useCommercialPropertyRenovation,
//   useMainServices,
//   useBhangarwalaServices,
// } from "./services/index";

// import plumbingImg from "@/assets/mainservicesimages/Plumbing.png";
// import electricalImg from "@/assets/mainservicesimages/ElectricalRepairs.png";
// import moversImg from "@/assets/mainservicesimages/Movers&Packers-1.png";
// import carMaintenanceImg from "@/assets/mainservicesimages/CarMaintenance.png";
// import carPentaryImg from "@/assets/mainservicesimages/Carpentry.png";
// import civilWorkImg from "@/assets/mainservicesimages/CivilWork&BrickWork.png";
// import societyManageImg from "@/assets/mainservicesimages/SocietyManagement.png";
// import buildingMaintenanceImg from "@/assets/mainservicesimages/BuildingMaintenance.png";
// import tileworkImg from "@/assets/mainservicesimages/TileWork.png";
// import paintingImg from "@/assets/mainservicesimages/Painting.png";
// import wanterTankImg from "@/assets/mainservicesimages/WaterTankServices.png";

// const fallbackImages = {
//   "movers-packers": moversImg,
//   "electrical-repairs": electricalImg,
//   plumbing: plumbingImg,
//   "civil-work": civilWorkImg,
//   carpentry: carpentryImg,
//   "car-maintenance": carMaintenanceImg,
//   "society-management": societyManageImg,
//   "building-maintenance": buildingMaintenanceImg,
//   "tile-and-granite-all-services": tileWorkImg,
//   "painting-services": paintingImg,
//   "water-tank-services": waterTankImg,
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

// const ServiceCard = ({ service, sectionBg, onViewDetails }) => {
//   return (
//     <div
//       onClick={() => service?.pdfUrl && onViewDetails(service)}
//       className={`group relative rounded-2xl border border-gray-100
//         px-4 lg:px-5 pt-4 lg:py-4
//         shadow-sm transition-all duration-300
//         hover:-translate-y-1 hover:shadow-md
//         ${sectionBg == "white" ? "bg-[#fbfbfb]" : "bg-white"}
//       `}
//     >
//       {/* Title */}
//       <h4
//         className="mb-1 text-base lg:text-[17px] font-semibold text-gray-900 line-clamp-1"
//         title={service.title}
//       >
//         {service.title}
//       </h4>

//       {/* Details */}
//       <div className="flex justify-between">
//         <button
//           // onClick={() => onViewDetails(pdfUrl)}
//           className="mb-1 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
//         >
//           <Info size={18} />
//           View details
//         </button>
//         {/* <p className="flex items-center gap-1 text-[11px] text-black">
//           <i className="fa-solid fa-star text-[8px]" />
//           Conditions apply
//         </p> */}
//       </div>

//       {/* Price */}
//       <div className=" flex justify-between items-center">
//         <p className="text-sm md:text-base  text-gray-500">{service.price}</p>

//         {/* <p className="flex items-center gap-1 text-[11px] text-black">
//           <i className="fa-solid fa-star text-[8px]" />
//         </p> */}
//       </div>
//       <div className="flex justify-end">
//         <p className="flex items-center  text-[11px] text-gray-500">
//           {/* <i className="fa-solid fa-star text-[8px]" /> */}* Conditions
//           apply
//         </p>
//       </div>
//     </div>
//   );
// };

// const ServiceSection = ({ id, data, sectionBg, onViewDetails }) => {
//   const isElectrical = data.mainTitle === "Electrical Services";
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
//     <div
//       id={id}
//       className="space-y-6   lg:scroll-mt-28 scroll-mt-16 px-4  sm:px-6 lg:px-12"
//     >
//       {/* Header */}
//       <div className="flex flex-col  sm:flex-row sm:items-center justify-between">
//         <h1 className="lg:text-2xl text-lg py-4 font-bold lg:text-[28px]">
//           {data.mainTitle?.split(" - ")[0]}
//           {data.mainTitle?.includes(" - ") && (
//             <span className="text-gray-500 lg:text-[22px] text-[16px]  font-normal italic">
//               {" - "}
//               {data.mainTitle.split(" - ")[1]}
//             </span>
//           )}
//         </h1>

//         {/* Search */}
//         <div className="flex items-center gap-2">
//           <div className="relative w-full sm:w-[280px]">
//             <input
//               type="text"
//               placeholder="Search services..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setShowAll(false); // reset view when searching
//               }}
//               className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           </div>

//           <button
//             onClick={() => scrollToSection("services")}
//             className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium  transition bg-black text-white whitespace-nowrap"
//           >
//             ← Back to Services
//           </button>
//         </div>
//       </div>
//       {/* Services Grid */}
//       {visibleServices.length > 0 ? (
//         <>
//           <div className="grid gap-6 grid-cols-2 lg:grid-cols-5 overflow-visible">
//             {visibleServices.map((service) => (
//               <ServiceCard
//                 key={service.title}
//                 service={service}
//                 sectionBg={sectionBg}
//                 onViewDetails={onViewDetails}
//               />
//             ))}
//           </div>

//           {/* View More / View Less Button */}
//           {filteredServices.length > 10 && (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={() => setShowAll(!showAll)}
//                 className="rounded-xl border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
//               >
//                 {showAll ? "View Less" : "View More"}
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <p className="text-gray-500 text-sm">No services found.</p>
//       )}
//     </div>
//   );
// };

// const Services = () => {
//   const handleViewDetails = (service) => {
//     console.log("Clicked service:", service);
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

//   const { data: residentialMoversPackers = [], isLoading: loading1 } =
//     useResidentialMoversPackers();
//   const { data: residentialPropertyRenovation = [] } =
//     useResidentialPropertyRenovation();

//   const { data: commercialPropertyRenovation = [] } =
//     useCommercialPropertyRenovation();

//   const { data: commercialMoversPackers = [] } = useCommercialMoversPackers();

//   const { data: residentialDeepCleaning = [] } = useDeepCleaningResidential();

//   const { data: commercialDeepCleaning = [] } = useDeepCleaningCommercial();

//   const { data: electricalServices = [] } = useElectricalServices();

//   const { data: plumbingServices = [] } = usePlumbingServices();

//   const { data: paintingServices = [] } = usePaintingServices();

//   const { data: waterproofingServices = [] } = useWaterproofingServices();

//   const { data: waterTankServices = [] } = useWaterTankServices();

//   const { data: carMaintenanceServices = [] } = useCarMaintenanceServices();

//   const { data: civilWorkServices = [] } = useCivilWorkServices();

//   const { data: carpentryServices = [] } = useCarpentryServices();

//   const { data: societyManagementServices = [] } =
//     useSocietyManagementServices();

//   const { data: buildingMaintenanceServices = [] } =
//     useBuildingMaintenanceServices();

//   const { data: tileGraniteServices = [] } = useTileGraniteServices();

//   const { data: bhangarwalaServices = [], isLoading } =
//     useBhangarwalaServices();

//   //console.log(99999999999999, bhangarwalaServices);
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
//                   .filter((service) =>
//                     service.title
//                       .toLowerCase()
//                       .includes(mainSearch.toLowerCase()),
//                   )
//                   .map((service) => (
//                     <div
//                       id={`#${service.sectionId}`}
//                       key={service.title}
//                       onClick={() => scrollToSection(service.sectionId)}
//                       className="cursor-pointer rounded-md flex flex-col gap-4 scroll-mt-40 lg:scroll-mt-0 transition hover:-translate-y-1 group max-w-[400px] shadow-lg"
//                     >
//                       {/* Image wrapper */}
//                       <div className="relative w-full h-[340px] overflow-hidden rounded-t-xl">
//                         {/* Skeleton */}
//                         {!loaded && (
//                           <div className="absolute inset-0 animate-pulse bg-gray-200" />
//                         )}

//                         <img
//                           src={service.img}
//                           alt={service.title}
//                           onLoad={() => setLoaded(true)}
//                           className={`w-full h-full lg:object-cover transition-opacity duration-500 ${
//                             loaded ? "opacity-100" : "opacity-0"
//                           }`}
//                         />
//                       </div>

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

//       {/*  servics */}
//       <div className="  ">
//         {/* //! movers & packers – residential subservices*/}
//         <div className="lg:py-6 py-4 md:py-6 bg-white">
//           {residentialMoversPackers.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`movers-packers`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! movers & packers – commercial services*/}
//         <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
//           {commercialMoversPackers.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`movers-packers`}
//               data={section}
//               sectionBg="gray"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //!deep cleaning resendential subservices */}
//         <div className="lg:py-6 py-4 md:py-6 bg-white">
//           {residentialDeepCleaning.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`deep-cleaning`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>
//         {/* //!deep cleaning commercial subservices */}
//         <div className="bg-[#fbfbfb] py-4 lg:py-6 md:py-6">
//           {commercialDeepCleaning.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`deep-cleaning`}
//               data={section}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! electrical repair services */}
//         <div className="lg:py-6 py-4 md:py-6 bg-white">
//           {electricalServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`electrical-repairs`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! plumbing services */}
//         <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
//           {plumbingServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`plumbing`}
//               data={section}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! water tank services */}
//         <div className="lg:py-6 py-4 md:py-6 bg-white">
//           {waterTankServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`water-tank-services`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! painting services */}
//         <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
//           {paintingServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`painting-services`}
//               data={section}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! waterproofing services */}
//         <div className="lg:py-6 py-4 md:py-6 bg-white">
//           {waterproofingServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`water-proof-services`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //!property renovation resendential  subservices */}

//         <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
//           {residentialPropertyRenovation.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`property-renovation-all-services`}
//               data={section}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>
//         {/* //! property renovation – commercial subservices */}

//         <div className="lg:py-6 py-4 md:py-6 bg-white">
//           {commercialPropertyRenovation.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`property-renovation-all-services`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>
//         {/* //! tile and granite services */}
//         <div className="lg:py-6 md:py-6 py-4 bg-[#fbfbfb]">
//           {tileGraniteServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`tile-and-granite-all-services`}
//               data={section}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! civil work services */}
//         <div className="lg:py-6 py-4 md:py-6 bg-white">
//           {civilWorkServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`civil-work`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! carpentry services */}
//         <div className="lg:py-6 py-4 md:py-6 bg-[#fbfbfb]">
//           {carpentryServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`carpentry`}
//               data={section}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! car maintenance services */}
//         <div className="lg:py-6 py-4 md:py-6 bg-white">
//           {carMaintenanceServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`car-maintenance`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/*//! building maintenance services */}

//         <div className="bg-[#fbfbfb] lg:py-6 md:py-6 py-4">
//           {buildingMaintenanceServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`building-maintenance`}
//               data={section}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         {/* //! society management services */}
//         <div className="bg-white lg:py-6 py-4 md:py-6">
//           {societyManagementServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`society-management`}
//               data={section}
//               sectionBg="white"
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>
//         {/* //! bhangarwala management services */}
//         <div className="bg-white lg:py-6 py-4 md:py-6">
//           {bhangarwalaServices.map((section, index) => (
//             <ServiceSection
//               key={index}
//               id={`scrap-collection`}
//               data={section}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;
