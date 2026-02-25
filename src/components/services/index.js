import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// http://localhost:4000/api/sub-services/filter?mainServiceId=gpms-service-1&categoryId=gpms-category-1
/* ================= AXIOS CLIENT ================= */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000/api",
});

const login = async (data) => {
  const response = await apiClient.post("/login", data);
  return response.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // 🔄 Refetch ticket sheet after update
      queryClient.invalidateQueries(["login"]);
    },
  });
};

/* =========================================================
   MAIN SERVICES (WITH IMAGE)
========================================================= */

const fetchMainServices = async () => {
  const res = await apiClient.get("/services-data");

  if (!res.data?.data) return [];

  return res.data.data.map((item) => ({
    title: item["Title"],
    id: item["Id"],
    desc: item["Description"],
    img: item["Image"],
    status: item["Status"],
    workLogs: item["WorkLogs"] || "",
    status: item["Status"],
    icon: item["Icon"],
  }));
};

export const useMainServices = () =>
  useQuery({
    queryKey: ["main-services"],
    queryFn: fetchMainServices,
  });
//! create new main service

const createMainService = async (data) => {
  const res = await apiClient.post("/services/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useCreateMainService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMainService,
    onSuccess: () => {
      queryClient.invalidateQueries(["main-services"]);
    },
  });
};
//! update main service

const updateMainService = async (data) => {
  const res = await apiClient.post("/services/update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
const updateMainServiceStatus = async (data) => {
  const res = await apiClient.post(
    "/services/update-main-service-status",
    data,
  );
  return res.data;
};

export const useUpdateMainServiceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMainServiceStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["main-services"]);
    },
  });
};
export const useUpdateMainService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMainService,
    onSuccess: () => {
      queryClient.invalidateQueries(["main-services"]);
    },
  });
};
//! delete main service
const deleteMainService = async (id) => {
  const res = await apiClient.post("/services/delete", {
    Id: id,
  });
  return res.data;
};

export const useDeleteMainService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMainService,
    onSuccess: () => {
      queryClient.invalidateQueries(["main-services"]);
    },
  });
};

const changePassword = async (data) => {
  const response = await apiClient.post("/change-password", data);
  return response.data;
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      // 🔄 Refetch ticket sheet after update
      queryClient.invalidateQueries(["change-password"]);
    },
  });
};

const getOtp = async (data) => {
  const response = await apiClient.post("/send-otp", data);
  return response.data;
};

export const useGetOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getOtp,
    onSuccess: () => {
      // 🔄 Refetch ticket sheet after update
      queryClient.invalidateQueries(["getOtp"]);
    },
  });
};

const verifyOtp = async (data) => {
  const response = await apiClient.post("/verify-otp", data);
  return response.data;
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      // 🔄 Refetch ticket sheet after update
      queryClient.invalidateQueries(["verifyOtp"]);
    },
  });
};

//! manage categories
export const useCategories = (mainServiceId) =>
  useQuery({
    queryKey: ["categories", mainServiceId],
    queryFn: async () => {
      const res = await apiClient.get("/categories");

      const allCategories = res.data?.data || [];

      return allCategories.filter(
        (cat) => cat.main_service_id === mainServiceId,
      );
    },
    enabled: !!mainServiceId, // important!
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiClient.post("/categories/create", data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categories", variables.main_service_id],
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiClient.post("/categories/update", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiClient.post("/categories/delete", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
//! update category status
const updateCategoryStatus = async (data) => {
  const res = await apiClient.post("/categories/update-status", data);
  return res.data;
};

export const useUpdateCategoryStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategoryStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

//! getting one subservice hook
export const useSubServices = (mainServiceId, categoryId) =>
  useQuery({
    queryKey: ["sub-services", mainServiceId, categoryId],
    queryFn: async () => {
      const res = await apiClient.get("/sub-services/filter", {
        params: {
          mainServiceId,
          ...(categoryId && { categoryId }),
        },
      });

      const result = res.data;

      // ✅ transform backend format to frontend format
      return {
        mainTitle: result.mainTitle,
        services: result.data.map((item) => ({
          id: item.sub_service_id,
          title: item.title,
          price: item.price,
          pdfUrl: item.pdfUrl,
          page: item.pageNumber,
          parentId: item.main_service_id, // IMPORTANT
          main_service_icon: item.main_service_icon,
        })),
      };
    },
    enabled: !!mainServiceId,
  });
//! getting al subservices hook
export const useAllSubServices = () =>
  useQuery({
    queryKey: ["all-sub-services"],
    queryFn: async () => {
      const res = await apiClient.get("/sub-services");

      const data = res.data?.data || [];

      // group by main service + category
      const grouped = {};

      data.forEach((item) => {
        const mainId = item.main_service_id;
        const categoryId = item.category_id || "no-category";

        if (!grouped[mainId]) grouped[mainId] = {};
        if (!grouped[mainId][categoryId])
          grouped[mainId][categoryId] = {
            mainTitle: item.main_service_title,
            categoryTitle: item.category_name,
            services: [],
          };

        grouped[mainId][categoryId].services.push({
          id: item.sub_service_id,
          title: item.title,
          price: item.price,
          pdfUrl: item.pdfUrl,
          page: item.pageNumber,
          parentId: mainId,
          main_service_icon: item.main_service_icon,
          icon: item.icon,
        });
      });

      return grouped;
    },
  });

//! for admin dashboard geeting all subservices hook
export const useAdminSubServices = (mainServiceId) =>
  useQuery({
    queryKey: ["admin-sub-services", mainServiceId],
    queryFn: async () => {
      const res = await apiClient.get("/sub-services/filter", {
        params: {
          mainServiceId: mainServiceId,
        },
      });

      // console.log("API RAW RESPONSE:", res.data);

      return res.data?.data || [];
    },
    enabled: !!mainServiceId,
  });

//! create subservice
export const useCreateSubService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) =>
      apiClient.post("/sub-services/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-sub-services", variables.get("main_service_id")],
      });
    },
  });
};

//! update subservice
export const useUpdateSubService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) =>
      apiClient.post("/sub-services/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-sub-services", variables.get("main_service_id")],
      });
    },
  });
};
//! delete subservice
export const useDeleteSubService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, mainServiceId }) =>
      apiClient.post("/sub-services/delete", { id }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-sub-services", variables.mainServiceId],
      });
    },
  });
};
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// // http://localhost:4000/api/sub-services/filter?mainServiceId=gpms-service-1&categoryId=gpms-category-1
// /* ================= AXIOS CLIENT ================= */
// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000/api",
// });

// const login = async (data) => {
//   const response = await apiClient.post("/login", data);
//   return response.data;
// };

// export const useLogin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: login,
//     onSuccess: () => {
//       // 🔄 Refetch ticket sheet after update
//       queryClient.invalidateQueries(["login"]);
//     },
//   });
// };

// /* =========================================================
//    MAIN SERVICES (WITH IMAGE)
// ========================================================= */

// const fetchMainServices = async () => {
//   const res = await apiClient.get("/services-data");

//   if (!res.data?.data) return [];

//   return res.data.data.map((item) => ({
//     title: item["Title"],
//     id: item["Id"],
//     desc: item["Description"],
//     img: item["Image"],
//     status: item["Status"],
//     workLogs: item["WorkLogs"] || "",
//     status: item["Status"],
//     icon: item["Icon"],
//   }));
// };

// export const useMainServices = () =>
//   useQuery({
//     queryKey: ["main-services"],
//     queryFn: fetchMainServices,
//   });
// //! create new main service

// const createMainService = async (data) => {
//   const res = await apiClient.post("/services/create", data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res.data;
// };

// export const useCreateMainService = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createMainService,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["main-services"]);
//     },
//   });
// };
// //! update main service

// const updateMainService = async (data) => {
//   const res = await apiClient.post("/services/update", data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res.data;
// };
// const updateMainServiceStatus = async (data) => {
//   const res = await apiClient.post(
//     "/services/update-main-service-status",
//     data,
//   );
//   return res.data;
// };

// export const useUpdateMainServiceStatus = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateMainServiceStatus,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["main-services"]);
//     },
//   });
// };
// export const useUpdateMainService = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateMainService,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["main-services"]);
//     },
//   });
// };
// //! delete main service
// const deleteMainService = async (id) => {
//   const res = await apiClient.post("/services/delete", {
//     Id: id,
//   });
//   return res.data;
// };

// export const useDeleteMainService = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteMainService,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["main-services"]);
//     },
//   });
// };

// const changePassword = async (data) => {
//   const response = await apiClient.post("/change-password", data);
//   return response.data;
// };

// export const useChangePassword = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: changePassword,
//     onSuccess: () => {
//       // 🔄 Refetch ticket sheet after update
//       queryClient.invalidateQueries(["change-password"]);
//     },
//   });
// };

// const getOtp = async (data) => {
//   const response = await apiClient.post("/send-otp", data);
//   return response.data;
// };

// export const useGetOtp = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: getOtp,
//     onSuccess: () => {
//       // 🔄 Refetch ticket sheet after update
//       queryClient.invalidateQueries(["getOtp"]);
//     },
//   });
// };

// const verifyOtp = async (data) => {
//   const response = await apiClient.post("/verify-otp", data);
//   return response.data;
// };

// export const useVerifyOtp = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: verifyOtp,
//     onSuccess: () => {
//       // 🔄 Refetch ticket sheet after update
//       queryClient.invalidateQueries(["verifyOtp"]);
//     },
//   });
// };

// //! manage categories
// export const useCategories = (mainServiceId) =>
//   useQuery({
//     queryKey: ["categories", mainServiceId],
//     queryFn: async () => {
//       const res = await apiClient.get("/categories");

//       const allCategories = res.data?.data || [];

//       return allCategories.filter(
//         (cat) => cat.main_service_id === mainServiceId,
//       );
//     },
//     enabled: !!mainServiceId, // important!
//   });

// export const useCreateCategory = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data) => apiClient.post("/categories/create", data),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });
// };

// export const useUpdateCategory = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data) => apiClient.post("/categories/update", data),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });
// };

// export const useDeleteCategory = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data) => apiClient.post("/categories/delete", data),
//     onSuccess: () => queryClient.invalidateQueries(["categories"]),
//   });
// };

// //! getting one subservice hook
// export const useSubServices = (mainServiceId, categoryId) =>
//   useQuery({
//     queryKey: ["sub-services", mainServiceId, categoryId],
//     queryFn: async () => {
//       const res = await apiClient.get("/sub-services/filter", {
//         params: {
//           mainServiceId,
//           ...(categoryId && { categoryId }),
//         },
//       });

//       const result = res.data;

//       // ✅ transform backend format to frontend format
//       return {
//         mainTitle: result.mainTitle,
//         services: result.data.map((item) => ({
//           id: item.sub_service_id,
//           title: item.title,
//           price: item.price,
//           pdfUrl: item.pdfUrl,
//           page: item.pageNumber,
//           parentId: item.main_service_id, // IMPORTANT
//           main_service_icon: item.main_service_icon,
//         })),
//       };
//     },
//     enabled: !!mainServiceId,
//   });
// //! getting al subservices hook
// export const useAllSubServices = () =>
//   useQuery({
//     queryKey: ["all-sub-services"],
//     queryFn: async () => {
//       const res = await apiClient.get("/sub-services");

//       const data = res.data?.data || [];

//       // group by main service + category
//       const grouped = {};

//       data.forEach((item) => {
//         const mainId = item.main_service_id;
//         const categoryId = item.category_id || "no-category";

//         if (!grouped[mainId]) grouped[mainId] = {};
//         if (!grouped[mainId][categoryId])
//           grouped[mainId][categoryId] = {
//             mainTitle: item.main_service_title,
//             categoryTitle: item.category_name,
//             services: [],
//           };

//         grouped[mainId][categoryId].services.push({
//           id: item.sub_service_id,
//           title: item.title,
//           price: item.price,
//           pdfUrl: item.pdfUrl,
//           page: item.pageNumber,
//           parentId: mainId,
//           main_service_icon: item.main_service_icon,
//         });
//       });

//       return grouped;
//     },
//   });

// //! for admin dashboard geeting all subservices hook
// export const useAdminSubServices = (mainServiceId) =>
//   useQuery({
//     queryKey: ["admin-sub-services", mainServiceId],
//     queryFn: async () => {
//       const res = await apiClient.get("/sub-services/filter", {
//         params: {
//           mainServiceId: mainServiceId,
//         },
//       });

//       // console.log("API RAW RESPONSE:", res.data);

//       return res.data?.data || [];
//     },
//     enabled: !!mainServiceId,
//   });
