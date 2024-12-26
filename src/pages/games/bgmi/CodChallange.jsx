import React from "react";
import { useForm } from "react-hook-form";
import img from "../../../asset/codcreate.avif";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBgmiChallange } from "../../../services/bgmiAPI";

const CodChallange = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const gname = "COD";
  const generateSerialNumber = () => {
    const specificDate = new Date();
    const year = 1;
    const month = String(specificDate.getMonth() + 1).padStart(2, "0");
    const day = String(specificDate.getDate()).padStart(2, "0");
    const hour = String(specificDate.getHours()).padStart(2, "0");
    const minute = String(specificDate.getMinutes()).padStart(2, "0");
    const second = String(specificDate.getSeconds()).padStart(2, "0");
    // const millisecond = String(specificDate.getMilliseconds()).padStart(3, "0");
    const combinedNumber = `${year}${month}${day}${hour}${minute}${second}`;
    return combinedNumber;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullname, uid } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    try {
      const uniqueSerialNumber = generateSerialNumber();
      dispatch(
        createBgmiChallange(
          uid,
          data.roomId,
          data.roomPassword,
          data.teamMode,
          data.map,
          data.price,
          fullname,
          uniqueSerialNumber,
          gname,
          data.note,
          navigate
        )
      );
    } catch (error) {
      console.error("Error Creating COD challange:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
      <div className="relative z-10 p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-neutral-500 to-gray-500 opacity-80 rounded-lg"></div>
        <div className="relative z-20">
          <h1 className="text-2xl text-center font-bold mb-4 text-white">
            Call of Duty Challenge
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Room ID */}

            <div className="flex gap-2">
              <div className="mb-4">
                <label className="text-sm font-medium text-white">
                  Room ID
                </label>
                <input
                  className="border border-gray-600 bg-gray-800 bg-opacity-60 p-2 w-full rounded text-yellow-100"
                  type="text"
                  {...register("roomId", { required: "Room ID is required" })}
                />
                {errors.roomId && (
                  <p className="text-red-500 text-sm">
                    {errors.roomId.message}
                  </p>
                )}
              </div>

              {/* Room Password */}
              <div className="mb-4">
                <label className="text-sm font-medium text-white">
                  Room Password
                </label>
                <input
                  className="border border-gray-600 bg-gray-800 bg-opacity-60 p-2 w-full rounded text-yellow-100"
                  type="text"
                  {...register("roomPassword", {
                    required: "Room Password is required",
                  })}
                />
                {errors.roomPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.roomPassword.message}
                  </p>
                )}
              </div>
            </div>
            {/* Map */}
            <div className="flex gap-2">
              <div className="mb-4">
                <label className=" text-sm font-medium text-white">
                  Team Mode
                </label>
                <select
                  className="border border-gray-600 bg-gray-800 bg-opacity-60 p-2 w-full rounded text-yellow-100"
                  {...register("teamMode", {
                    required: "Team Mode is required",
                  })}
                >
                  {/* <option value="">Select Team Mode</option> */}
                  <option value="solo">Solo</option>
                  <option value="duo">Duo</option>
                  <option value="squad">Squad</option>
                  <option value="6v6">6v6</option>
                </select>
                {errors.teamMode && (
                  <p className="text-red-500 text-sm">
                    {errors.teamMode.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-white">Map</label>
                <select
                  className="border border-gray-600 bg-gray-800 bg-opacity-60 p-2 w-full rounded text-yellow-100 overflow-y-auto max-h-20"
                  {...register("map", { required: "Map is required" })}
                >
                  <option value="">Select Map</option>
                  <option value="Warzone">Warzone</option>
                  <option value="Modern Warfare III">Modern Warfare III</option>
                  <option value="Verdansk">Verdansk</option>
                  <option value="Caldera">Caldera</option>
                  <option value="Al Mazrah">Al Mazrah</option>
                  <option value="Ashika Island">Ashika Island</option>
                  <option value="Shipment">Shipment</option>
                  <option value="Stadium">Stadium</option>
                  <option value="Ghost Ship">Ghost Ship</option>
                  <option value="Bit-ment">Bit-ment</option>
                </select>
                {errors.map && (
                  <p className="text-red-500 text-sm">{errors.map.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Team Mode */}
              <div className="mb-4">
                <label className="text-sm font-medium text-white">
                  Entry Price
                </label>
                <input
                  className="border border-gray-600 bg-gray-800 bg-opacity-60 p-2 w-full rounded text-yellow-100"
                  type="text"
                  {...register("price", {
                    required: "Room entry price is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Entry Price must be a number",
                    },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-white">Note</label>
              <input
                className="border border-gray-600 bg-gray-800 bg-opacity-60 p-2 w-full rounded text-yellow-100"
                type="text"
                {...register("note")}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="w-full text-blue-500 bg-slate-100 font-bold hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600"
                type="submit"
              >
                Create Challenge
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CodChallange;
