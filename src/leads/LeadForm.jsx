import React, { useEffect, useState } from "react";

const LeadForm = ({ editingLead, setEditingLead }) => {
  const [formData, setFormData] = useState({
    FullName: "",
    MobileNo: "",
    Email: "",
    ClientMessage: "",
    Status: "",
    Reason: "",
    FollowupDate: "",
  });

  useEffect(() => {
    if (editingLead) {
      setFormData(editingLead);
    }
  }, [editingLead]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (editingLead) {
      console.log("Update Lead:", formData);
      // update API
    } else {
      console.log("Create Lead:", formData);
      // create API
    }

    setEditingLead(null);
  };

  return (
    <div className="bg-white border rounded-lg p-6 m-5">
      <h2 className="text-xl font-semibold mb-4">
        {editingLead ? "Edit Lead" : "Create Lead"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="FullName"
          placeholder="Full Name"
          value={formData.FullName}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="MobileNo"
          placeholder="Mobile No"
          value={formData.MobileNo}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="Status"
          value={formData.Status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Ringing">Ringing</option>
          <option value="Lost">Lost</option>
          <option value="Order Received">Order Received</option>
        </select>

        <input
          name="Reason"
          placeholder="Reason"
          value={formData.Reason}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="FollowupDate"
          value={formData.FollowupDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="ClientMessage"
          placeholder="Client Message"
          value={formData.ClientMessage}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
      </div>

      <div className="flex gap-3 mt-5">
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
  );
};

export default LeadForm;
