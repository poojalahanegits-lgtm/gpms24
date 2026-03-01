import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
// import axios from "axios";
import {
  useAdminSubServices,
  useCategories,
  useCreateSubService,
  useUpdateSubService,
  useDeleteSubService,
  useUpdateSubServiceStatus,
} from "../components/services/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ManageSubServicesPage = ({ mainServiceId, mainServiceTitle, onBack }) => {
  const {
    data: subServices = [],
    isLoading,
    refetch,
  } = useAdminSubServices(mainServiceId);
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories(mainServiceId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [iconPreview, setIconPreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [subServiceToToggle, setSubServiceToToggle] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const updateSubServiceStatus = useUpdateSubServiceStatus();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    icon: null,
  });
  const createSubService = useCreateSubService();
  const updateSubService = useUpdateSubService();
  const deleteSubService = useDeleteSubService();

  const filteredSubServices = selectedCategory
    ? subServices.filter(
        (service) =>
          String(service.category_id) === String(selectedCategory.category_id),
      )
    : subServices;
  useEffect(() => {
    //  console.log(111, categories);
    // console.log("MAIN SERVICE ID:", mainServiceId);
    // console.log("SUB SERVICES:", subServices);
  }, [mainServiceId, subServices]);

  // ================= SUBMIT =================
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const form = new FormData();

  //     form.append("main_service_id", mainServiceId);
  //     form.append("main_service_title", mainServiceTitle);
  //     form.append("title", formData.title);
  //     form.append("price", formData.price);
  //     form.append("category_id", selectedCategory?.category_id || "");

  //     if (formData.icon) {
  //       form.append("icon", formData.icon);
  //     }
  //     //console.log(111111, payload);

  //     if (editingId) {
  //       form.append("id", editingId);

  //       await axios.post(
  //         `${import.meta.env.VITE_BASE_URL}/sub-services/update`,
  //         form,
  //         { headers: { "Content-Type": "multipart/form-data" } },
  //       );

  //       toast.success("Sub service updated successfully");
  //     } else {
  //       await axios.post(
  //         `${import.meta.env.VITE_BASE_URL}/sub-services/create`,
  //         form,
  //         { headers: { "Content-Type": "multipart/form-data" } },
  //       );
  //       toast.success("Sub service created successfully");
  //     }

  //     // Clear form and close modal
  //     setFormData({ title: "", price: "", icon: null });
  //     setIconPreview(null);

  //     // setFormData({ title: "", price: "", categoryId: "" });
  //     setSelectedCategory(null);
  //     setEditingId(null);
  //     setIsModalOpen(false);
  //     refetch();
  //   } catch (error) {
  //     console.error("Submit failed", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const form = new FormData();
  //   form.append("main_service_id", mainServiceId);
  //   form.append("main_service_title", mainServiceTitle);
  //   form.append("title", formData.title);
  //   form.append("price", formData.price);
  //   form.append("category_id", selectedCategory?.category_id || "");

  //   if (formData.icon) {
  //     form.append("icon", formData.icon);
  //   }

  //   try {
  //     if (editingId) {
  //       form.append("id", editingId);
  //       await updateSubService.mutateAsync(form);
  //       toast.success("Sub service updated successfully");
  //     } else {
  //       await createSubService.mutateAsync(form);
  //       toast.success("Sub service created successfully");
  //     }

  //     setFormData({ title: "", price: "", icon: null });
  //     setIconPreview(null);
  //     setSelectedCategory(null);
  //     setEditingId(null);
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };
  const confirmStatusToggle = async () => {
    if (!subServiceToToggle) return;

    try {
      setUpdatingStatusId(subServiceToToggle.sub_service_id);

      await updateSubServiceStatus.mutateAsync({
        id: subServiceToToggle.sub_service_id,
        status: subServiceToToggle.status === "active" ? "inactive" : "active",
        mainServiceId, // IMPORTANT for refetch
      });

      toast.success("Status updated successfully");

      setIsStatusModalOpen(false);
      setSubServiceToToggle(null);
    } catch (error) {
      toast.error("Status update failed");
    } finally {
      setUpdatingStatusId(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("main_service_id", mainServiceId);
    form.append("main_service_title", mainServiceTitle);
    form.append("title", formData.title);
    form.append("price", formData.price);
    form.append("category_id", selectedCategory?.category_id || "");

    if (formData.icon) {
      form.append("icon", formData.icon);
    }

    try {
      if (editingId) {
        form.append("id", editingId);
        await updateSubService.mutateAsync(form);
        toast.success("Sub service updated successfully");
      } else {
        await createSubService.mutateAsync(form);
        toast.success("Sub service created successfully");
      }

      // reset form only
      setFormData({ title: "", price: "", icon: null });
      setIconPreview(null);
      setEditingId(null);
      setIsModalOpen(false);

      // ❌ DO NOT reset selectedCategory here
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  // ================= DELETE =================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteSubService.mutateAsync({
        id: deleteId,
        mainServiceId,
      });

      toast.success("Sub service deleted successfully");
      setDeleteModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      toast.error("Delete failed");
    }
  };
  // const handleDelete = async () => {
  //   if (!deleteId) return;

  //   setIsDeleting(true);

  //   try {
  //     await axios.post(`${import.meta.env.VITE_BASE_URL}/sub-services/delete`, {
  //       id: deleteId,
  //     });

  //     toast.success("Sub service deleted successfully");
  //     setDeleteModalOpen(false);
  //     setDeleteId(null);
  //     refetch();
  //   } catch (error) {
  //     console.error("Delete failed", error);
  //     toast.error("Delete failed");
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };
  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      price: service.price,
      icon: null,
      categoryId: service.category_id || "",
    });
    setIconPreview(service.icon || null);
    // Find and set category object based on category_id from list
    const categoryObj =
      categories.find((cat) => cat.category_id === service.category_id) || null;
    setSelectedCategory(categoryObj);

    setEditingId(service.sub_service_id);
    setIsModalOpen(true);
  };

  return (
    <div className="px-6 py-1">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-x-4 font-bold">
          <h1 className="text-2xl ">Sub Services</h1>
          <h2 className="text-gray-500 text-2xl">- {mainServiceTitle}</h2>
        </div>

        <div className="flex gap-3">
          <button onClick={onBack} className="px-4 py-2 border rounded-lg">
            Back
          </button>

          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: "",
                price: "",
                categoryId: "",
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Add Sub Service
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div>
        {(categoriesLoading || categories.length > 0) && (
          <div className="flex gap-3 mb-6 flex-wrap">
            {categoriesLoading ? (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 rounded-lg bg-gray-300 animate-pulse"
                />
              ))
            ) : (
              <>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    !selectedCategory
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  All
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.category_id}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg  transition ${
                      selectedCategory?.category_id === cat.category_id
                        ? "bg-gray-100  text-black  border-b-4 border-black"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {cat.category_name}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div className="bg-white shadow rounded-xl border z-20 pb-2">
        <div className="max-h-[400px] overflow-y-auto overflow-x-auto rounded-xl">
          {/* CATEGORY TABS */}

          <table className="w-full text-left ">
            <thead className="bg-black text-white text-xl">
              <tr>
                <th className="p-4 w-1/5 top-0 left-0 z-50 bg-black sticky">
                  Title
                </th>
                <th className="p-4 top-0 w-1/5 left-0 z-50 bg-black sticky">
                  Icon
                </th>
                <th className="p-4 top-0 w-1/5 left-0 z-50 bg-black sticky">
                  Price
                </th>
                <th className="p-4 top-0 w-1/5 left-0 sticky z-50 bg-black ">
                  Status
                </th>
                <th className="p-4 top-0 w-1/5 left-0 z-50 bg-black sticky">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded  animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-10 w-10 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-300 rounded  animate-pulse"></div>
                    </td>
                    <td className="p-4 flex gap-3">
                      <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>

                      <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : filteredSubServices.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-500">
                    No sub services found
                  </td>
                </tr>
              ) : (
                filteredSubServices.map((service) => (
                  <tr
                    key={service.sub_service_id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* Title */}
                    <td className="p-4 font-medium">{service.title}</td>

                    {/* Icon */}
                    <td className="p-4">
                      {service.icon ? (
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                      )}
                    </td>

                    {/* Price */}
                    <td className="p-4">₹{service.price} onwards</td>
                    {/* Status */}
                    <td className="p-4 ">
                      <button
                        disabled={updatingStatusId === service.sub_service_id}
                        onClick={() => {
                          setSubServiceToToggle(service);
                          setIsStatusModalOpen(true);
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          service.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } ${
                          updatingStatusId === service.sub_service_id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {updatingStatusId === service.sub_service_id ? (
                          <span className="bw-loader-small"></span>
                        ) : (
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              service.status === "active"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        )}
                      </button>
                    </td>
                    {/* Actions */}
                    <td className="p-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-500"
                      >
                        <Pencil size={18} />
                      </button>
                      {/* 
                      <button
                        onClick={() => {
                          setDeleteId(service.sub_service_id);
                          setDeleteModalOpen(true);
                        }}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Sub Service" : "Add Sub Service"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* <select
                value={selectedCategory?.category_id || ""}
                onChange={(e) => {
                  const selectedCat = categories.find(
                    (cat) => cat.category_id === e.target.value,
                  );
                  setSelectedCategory(selectedCat || null);
                }}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select Category (optional)</option>
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </option>
                ))}
              </select> */}
              <input
                type="text"
                required
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    categoryId: selectedCategory?.id || "",
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="string"
                required
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData({ ...formData, icon: file });
                    setIconPreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full border rounded-lg px-3 py-2"
              />
              {iconPreview && (
                <div className="relative w-20 h-20 mt-2">
                  <img
                    src={iconPreview}
                    alt="Preview"
                    className="w-20 h-20 object-contain border rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, icon: null });
                      setIconPreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  // onClick={() => setIsModalOpen(false)}
                  onClick={() => {
                    setIsModalOpen(false);
                    setIconPreview(null);
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createSubService.isPending || updateSubService.isPending
                  }
                  className="px-4 py-2 bg-black text-white rounded-lg flex items-center justify-center gap-2 min-w-[90px]"
                >
                  {createSubService.isPending || updateSubService.isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
                {/* <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button> */}
              </div>
            </form>
          </div>
        </div>
      )}
      {(createSubService.isPending || updateSubService.isPending) && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* delete confirmation modal */}
      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl">
            <h2 className="text-xl font-semibold mb-2">Delete Sub Service</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this sub service? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* STATUS CONFIRMATION MODAL */}
      {isStatusModalOpen && subServiceToToggle && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl">
            <h2 className="text-xl font-semibold mb-2">
              {subServiceToToggle.status === "active"
                ? "Deactivate Sub Service"
                : "Activate Sub Service"}
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              <span className="font-semibold">
                {subServiceToToggle.status === "active"
                  ? "deactivate"
                  : "activate"}
              </span>{" "}
              this sub service?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsStatusModalOpen(false);
                  setSubServiceToToggle(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmStatusToggle}
                disabled={
                  updatingStatusId === subServiceToToggle.sub_service_id
                }
                className={`px-4 py-2 text-white rounded-lg transition ${
                  subServiceToToggle.status === "active"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {updatingStatusId === subServiceToToggle.sub_service_id
                  ? "Updating..."
                  : subServiceToToggle.status === "active"
                    ? "Deactivate"
                    : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubServicesPage;

// import { useState, useEffect } from "react";
// import { Plus, Pencil, Trash2 } from "lucide-react";
// import axios from "axios";
// import {
//   useAdminSubServices,
//   useCategories,
// } from "../components/services/index";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const ManageSubServicesPage = ({ mainServiceId, mainServiceTitle, onBack }) => {
//   const {
//     data: subServices = [],
//     isLoading,
//     refetch,
//   } = useAdminSubServices(mainServiceId);
//   const { data: categories = [], isLoading: categoriesLoading } =
//     useCategories(mainServiceId);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     // add others if needed
//   });

//   const filteredSubServices = selectedCategory
//     ? subServices.filter(
//         (service) =>
//           String(service.category_id) === String(selectedCategory.category_id),
//       )
//     : subServices;
//   useEffect(() => {
//     //  console.log(111, categories);
//     // console.log("MAIN SERVICE ID:", mainServiceId);
//     // console.log("SUB SERVICES:", subServices);
//   }, [mainServiceId, subServices]);

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const payload = {
//         main_service_id: mainServiceId,
//         main_service_title: mainServiceTitle,
//         title: formData.title,
//         price: formData.price,
//         category_id: selectedCategory?.category_id || "", // send ID, not name
//         // Include optional fields if needed:
//         // time: formData.time,
//         // size: formData.size,
//         // pageNumber: formData.pageNumber,
//         // pdfUrl: formData.pdfUrl,
//       };
//       console.log(111111, payload);

//       if (editingId) {
//         payload.id = editingId; // id for update
//         await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/sub-services/update`,
//           payload,
//         );
//         toast.success("Sub service updatedd successfully");
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/sub-services/create`,
//           payload,
//         );
//         toast.success("Sub service created successfully");
//       }

//       // Clear form and close modal
//       setFormData({ title: "", price: "", categoryId: "" });
//       setSelectedCategory(null);
//       setEditingId(null);
//       setIsModalOpen(false);
//       refetch();
//     } catch (error) {
//       console.error("Submit failed", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   // ================= DELETE =================
//   const handleDelete = async () => {
//     if (!deleteId) return;

//     setIsDeleting(true);

//     try {
//       await axios.post(`${import.meta.env.VITE_BASE_URL}/sub-services/delete`, {
//         id: deleteId,
//       });

//       toast.success("Sub service deleted successfully");
//       setDeleteModalOpen(false);
//       setDeleteId(null);
//       refetch();
//     } catch (error) {
//       console.error("Delete failed", error);
//       toast.error("Delete failed");
//     } finally {
//       setIsDeleting(false);
//     }
//   };
//   const handleEdit = (service) => {
//     setFormData({
//       title: service.title,
//       price: service.price,
//       categoryId: service.category_id || "",
//     });

//     // Find and set category object based on category_id from list
//     const categoryObj =
//       categories.find((cat) => cat.category_id === service.category_id) || null;
//     setSelectedCategory(categoryObj);

//     setEditingId(service.sub_service_id);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="px-6 py-1">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex gap-x-4 font-bold">
//           <h1 className="text-2xl ">Sub Services</h1>
//           <h2 className="text-gray-500 text-2xl">- {mainServiceTitle}</h2>
//         </div>

//         <div className="flex gap-3">
//           <button onClick={onBack} className="px-4 py-2 border rounded-lg">
//             Back
//           </button>

//           <button
//             onClick={() => {
//               setEditingId(null);
//               setFormData({
//                 title: "",
//                 price: "",
//                 categoryId: "",
//               });
//               setIsModalOpen(true);
//             }}
//             className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
//           >
//             <Plus size={18} />
//             Add Sub Service
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div>
//         {(categoriesLoading || categories.length > 0) && (
//           <div className="flex gap-3 mb-6 flex-wrap">
//             {categoriesLoading ? (
//               [...Array(4)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-8 w-20 rounded-lg bg-gray-300 animate-pulse"
//                 />
//               ))
//             ) : (
//               <>
//                 <button
//                   onClick={() => setSelectedCategory(null)}
//                   className={`px-4 py-2 rounded-lg border transition ${
//                     !selectedCategory
//                       ? "bg-black text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   All
//                 </button>

//                 {categories.map((cat) => (
//                   <button
//                     key={cat.category_id}
//                     onClick={() => setSelectedCategory(cat)}
//                     className={`px-4 py-2 rounded-lg  transition ${
//                       selectedCategory?.category_id === cat.category_id
//                         ? "bg-gray-100  text-black  border-b-4 border-black"
//                         : "hover:bg-gray-100"
//                     }`}
//                   >
//                     {cat.category_name}
//                   </button>
//                 ))}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//       <div className="bg-white shadow rounded-xl border z-20 pb-2">
//         <div className="max-h-[400px] overflow-y-auto overflow-x-auto rounded-xl">
//           {/* CATEGORY TABS */}

//           <table className="w-full text-left min-w-[600px]">
//             <thead className="bg-black text-white text-xl">
//               <tr>
//                 <th className="p-4 top-0 left-0 z-50 bg-black sticky">Title</th>
//                 <th className="p-4 top-0 left-0 z-50 bg-black sticky">Price</th>
//                 <th className="p-4 top-0 left-0 z-50 bg-black sticky">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {isLoading ? (
//                 [...Array(5)].map((_, i) => (
//                   <tr key={i} className="border-t">
//                     <td className="p-4">
//                       <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
//                     </td>
//                     <td className="p-4">
//                       <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
//                     </td>
//                     <td className="p-4 flex gap-3">
//                       <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
//                       <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
//                     </td>
//                   </tr>
//                 ))
//               ) : filteredSubServices.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" className="text-center p-6 text-gray-500">
//                     No sub services found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredSubServices.map((service) => (
//                   <tr
//                     key={service.sub_service_id}
//                     className="border-t hover:bg-gray-50"
//                   >
//                     <td className="p-4 font-medium">{service.title}</td>

//                     <td className="p-4"> ₹{service.price} onwards</td>

//                     <td className="p-4 flex gap-3">
//                       <button
//                         onClick={() => handleEdit(service)}
//                         className="text-blue-500"
//                       >
//                         <Pencil size={18} />
//                       </button>

//                       <button
//                         onClick={() => {
//                           setDeleteId(service.sub_service_id);
//                           setDeleteModalOpen(true);
//                         }}
//                         className="text-red-500"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl">
//             <h2 className="text-lg font-semibold mb-4">
//               {editingId ? "Edit Sub Service" : "Add Sub Service"}
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* <select
//                 value={selectedCategory?.category_id || ""}
//                 onChange={(e) => {
//                   const selectedCat = categories.find(
//                     (cat) => cat.category_id === e.target.value,
//                   );
//                   setSelectedCategory(selectedCat || null);
//                 }}
//                 className="w-full border rounded-lg px-3 py-2"
//               >
//                 <option value="">Select Category (optional)</option>
//                 {categories.map((cat) => (
//                   <option key={cat.category_id} value={cat.category_id}>
//                     {cat.category_name}
//                   </option>
//                 ))}
//               </select> */}
//               <input
//                 type="text"
//                 required
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     title: e.target.value,
//                     categoryId: selectedCategory?.id || "",
//                   })
//                 }
//                 className="w-full border rounded-lg px-3 py-2"
//               />

//               <input
//                 type="string"
//                 required
//                 placeholder="Price"
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData({ ...formData, price: e.target.value })
//                 }
//                 className="w-full border rounded-lg px-3 py-2"
//               />

//               <div className="flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-4 py-2 bg-black text-white rounded-lg"
//                 >
//                   {isSubmitting ? "Saving..." : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* delete confirmation modal */}
//       {/* DELETE CONFIRMATION MODAL */}
//       {deleteModalOpen && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl">
//             <h2 className="text-xl font-semibold mb-2">Delete Sub Service</h2>

//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this sub service? This action
//               cannot be undone.
//             </p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setDeleteModalOpen(false);
//                   setDeleteId(null);
//                 }}
//                 className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleDelete}
//                 disabled={isDeleting}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//               >
//                 {isDeleting ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageSubServicesPage;
