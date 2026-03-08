import React from "react";
import { useLeadsDetails } from "./services/index.js";

const LeadsTable = () => {
  const { data, isLoading, error } = useLeadsDetails();
  const [editingLead, setEditingLead] = React.useState(null);
  const [formData, setFormData] = React.useState({});

  if (isLoading) return <p>Loading leads...</p>;
  if (error) return <p>Error loading leads</p>;

  const leads = data?.data || [];

  const handleView = (lead) => {
    setEditingLead(lead);
    setFormData(lead);
    console.log("View Lead:", lead);
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setFormData(lead);
    console.log("Edit Lead:", lead);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Updated Lead:", formData);

    // call API here
    // updateClient(formData)

    setEditingLead(null);
  };

  return (
    <div className="overflow-x-auto max-h-[520px] m-5">
      <table className="w-full text-sm ">
        {/* HEADER */}
        <thead className="bg-black text-white sticky top-0 text-center z-20 whitespace-nowrap">
          <tr>
            <th className="px-7 py-4 sticky bg-black">Full Name</th>
            <th className="px-7">Mobile No</th>
            <th className="px-7">Email</th>
            <th className="px-7">Client Message</th>
            <th className="px-7">Status</th>
            <th className="px-7">Reason</th>
            <th className="px-7">Followup Date</th>
            <th className="px-7">WorkLogs</th>
            <th className="px-7 sticky right-0 bg-black text-white z-20">
              Action
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="text-center border whitespace-nowrap">
              <td>{lead.FullName}</td>
              <td>{lead.MobileNo}</td>
              <td>{lead.Email}</td>
              <td>{lead.ClientMessage}</td>
              <td>{lead.Status}</td>
              <td>{lead.Reason}</td>
              <td>{lead.FollowupDate}</td>

              {/* WORKLOG PREVIEW + HOVER */}
              <td className="relative px-2 group">
                <div className="text-xs text-gray-700 cursor-pointer whitespace-pre-wrap break-words">
                  {lead.Worklogs
                    ? lead.Worklogs.split("\n")[0]?.substring(0, 28)
                    : "No WorkLogs"}
                </div>

                {lead.Worklogs && (
                  <div className="absolute z-50 hidden group-hover:block bg-white border p-5 rounded-lg shadow-xl w-[480px] max-h-[250px] overflow-y-auto right-12 whitespace-pre-wrap break-words text-sm text-left">
                    {lead.Worklogs.split(/\n(?=\[)/).map((log, i) => {
                      const lines = log.split("\n").filter(Boolean);
                      if (!lines.length) return null;

                      const meta = lines[0];
                      const message = lines.slice(1).join("\n").trim();

                      if (!message) return null;

                      return (
                        <div key={i} className="mb-2">
                          <div className="text-gray-500 text-xs">{meta}</div>
                          <div className="font-semibold text-gray-800">
                            {message}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </td>

              {/* ACTION */}
              <td className="flex justify-center items-center gap-5 sticky right-0 h-16 bg-gray-100">
                <button
                  onClick={() => handleView(lead)}
                  className="text-red-500 text-md"
                >
                  <i className="fa fa-eye"></i>
                </button>

                <button
                  onClick={() => handleEdit(lead)}
                  className="text-green-500 text-xl"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  Edit Form*/}
      {editingLead && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Lead</h2>

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
                onClick={() => setEditingLead(null)}
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
        </div>
      )}
    </div>
  );
};

export default LeadsTable;

// import React from "react";
// import { useLeadsDetails } from "./services/index.js";

// const LeadsTable = () => {
//   const { data, isLoading, error } = useLeadsDetails();

//   if (isLoading) return <p>Loading leads...</p>;
//   if (error) return <p>Error loading leads</p>;

//   const leads = data?.data || [];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Leads List</h2>

//       <table border="1" cellPadding="8" cellSpacing="0" width="100%">
//         <thead style={{ background: "#ffe600" }}>
//           <tr>
//             <th>Full Name</th>
//             <th>Mobile No</th>
//             <th>Email</th>
//             <th>Client Message</th>
//             <th>Status</th>
//             <th>Reason</th>
//             <th>Followup Date</th>
//             <th>Worklogs</th>
//           </tr>
//         </thead>

//         <tbody>
//           {leads.map((lead, index) => (
//             <tr key={index}>
//               <td>{lead.FullName}</td>
//               <td>{lead.MobileNo}</td>
//               <td>{lead.Email}</td>
//               <td>{lead.ClientMessage}</td>
//               <td>{lead.Status}</td>
//               <td>{lead.Reason}</td>
//               <td>{lead.FollowupDate}</td>
//               <td>{lead.Worklogs}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeadsTable;
