import { useState, useEffect } from "react";

function ClientLeads({
  editingLead,
  setEditingLead,
  createLead,
  updateLead,
  setActiveTab,
}) {
  const emptyForm = {
    FullName: "",
    MobileNo: "",
    Email: "",
    Status: "",
    Reason: "",
    FollowupDate: "",
    ClientMessage: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingLead) {
      setFormData(editingLead);
    } else {
      setFormData(emptyForm);
    }
  }, [editingLead]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (editingLead?.id) {
        await updateLead(formData);
      } else {
        await createLead(formData);
      }

      setEditingLead(null);
      setFormData(emptyForm);
      setActiveTab("leadsList");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">
        {editingLead ? "Update Lead" : "Create Lead"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            name="FullName"
            value={formData.FullName || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Mobile No</label>
          <input
            name="MobileNo"
            value={formData.MobileNo || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            name="Email"
            value={formData.Email || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Status</label>
          <select
            name="Status"
            value={formData.Status || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="New">New</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Ringing">Ringing</option>
            <option value="Lost">Lost</option>
            <option value="Order Received">Order Received</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Reason</label>
          <input
            name="Reason"
            value={formData.Reason || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Followup Date</label>
          <input
            type="date"
            name="FollowupDate"
            value={formData.FollowupDate || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-600">Client Message</label>
          <textarea
            name="ClientMessage"
            value={formData.ClientMessage || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => {
            setEditingLead(null);
            setActiveTab("leadsList");
          }}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ClientLeads;

// import { useState, useEffect } from "react";

// function ClientLeads({ editingLead, setEditingLead, createLead, updateLead }) {
//   const [formData, setFormData] = useState({
//     FullName: "",
//     MobileNo: "",
//     Email: "",
//     Status: "",
//     Reason: "",
//     FollowupDate: "",
//     ClientMessage: "",
//   });

//   useEffect(() => {
//     if (editingLead) {
//       setFormData(editingLead);
//     } else {
//       setFormData({
//         FullName: "",
//         MobileNo: "",
//         Email: "",
//         Status: "",
//         Reason: "",
//         FollowupDate: "",
//         ClientMessage: "",
//       });
//     }
//   }, [editingLead]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       if (editingLead?.id) {
//         await updateLead(formData);
//       } else {
//         await createLead(formData);
//       }

//       setEditingLead(null);
//       setFormData({});
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (editingLead === undefined) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-[600px] p-6">
//         <h2 className="text-xl font-semibold mb-4">
//           {editingLead?.id ? "Edit Lead" : "Create Lead"}
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-gray-600">Full Name</label>
//             <input
//               name="FullName"
//               value={formData.FullName || ""}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Mobile No</label>
//             <input
//               name="MobileNo"
//               value={formData.MobileNo || ""}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Email</label>
//             <input
//               name="Email"
//               value={formData.Email || ""}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Status</label>
//             <select
//               name="Status"
//               value={formData.Status || ""}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select</option>
//               <option value="New">New</option>
//               <option value="Follow Up">Follow Up</option>
//               <option value="Ringing">Ringing</option>
//               <option value="Lost">Lost</option>
//               <option value="Order Received">Order Received</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Reason</label>
//             <input
//               name="Reason"
//               value={formData.Reason || ""}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Followup Date</label>
//             <input
//               type="date"
//               name="FollowupDate"
//               value={formData.FollowupDate || ""}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div className="col-span-2">
//             <label className="text-sm text-gray-600">Client Message</label>
//             <textarea
//               name="ClientMessage"
//               value={formData.ClientMessage || ""}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={() => setEditingLead(null)}
//             className="px-4 py-2 border rounded"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-orange-500 text-white rounded"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClientLeads;
