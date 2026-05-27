import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {

  const { doctors, changeAvailability, removeDoctor, aToken, getAllDoctors } = useContext(AdminContext);

  const [confirmDialog, setConfirmDialog] = useState(false);
  const [docToRemove, setDocToRemove] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const handleRemoveDoctor = (docId) => {
    setDocToRemove(docId);
    setConfirmDialog(true);
  };

  const confirmRemove = () => {
    removeDoctor(docToRemove);
    setConfirmDialog(false);
  };

  const cancelRemove = () => {
    setConfirmDialog(false);
    setDocToRemove(null);
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div className="border border-[#64766A] rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
            <img className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
            <div className="p-4">
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
              {/* Remove Doctor Button */}
              <button
                className="mt-2 text-red-500 text-sm"
                onClick={() => handleRemoveDoctor(item._id)}
              >
                Remove Doctor
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h2 className="text-lg font-medium">Are you sure you want to remove this doctor?</h2>
            <div className="mt-4 flex gap-4">
              <button className="bg-green-500 text-white p-2 rounded" onClick={confirmRemove}>
                Yes, Remove
              </button>
              <button className="bg-gray-500 text-white p-2 rounded" onClick={cancelRemove}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
