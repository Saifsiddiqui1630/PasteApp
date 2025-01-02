import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pastSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) =>
      paste &&
      ((paste.title &&
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (paste.content &&
          paste.content.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  function handleDelete(pasteId) {
    if (!pasteId) {
      toast.error("Invalid Paste ID!");
      return;
    }
    dispatch(removeFromPastes(pasteId));
  }
//   Share Logic------------------
const handleShare = (id) => {
    const pasteUrl = `${window.location.origin}/?pasteId=${id}`;
    const title = "Check out this paste!";
    const text = `Here's a paste you might find interesting:`;
  
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url: pasteUrl,
        })
        .then(() => {
          toast.success("Shared successfully!");
        })
        .catch(() => {
          toast.error("Failed to share.");
        });
    } else {
      navigator.clipboard
        .writeText(pasteUrl)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy the link.");
        });
    }
  };
  

  return (
    <div className="bg-gray-100 place-content-center p-6 ">
      <div className="flex justify-between items-center">
        <input
          className="w-[80%] p-3  border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search pastes..."
        />
        <div className="border rounded p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="gray"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-7">
        {filteredData.length > 0 ? (
  filteredData.map((paste) => (
              <div
                className="border rounded  flex flex-col   justify-between bg-white"
                key={paste?._id}
              >
                <div className="flex flex-col-reverse md:flex-row py-3 gap-2 bg-gray-100 justify-between w-full text-shadow-lg font-semibold  items-center px-3">
                  <div className="">{paste.title}</div>
                  <div className="flex gap-2">
                    <button className="border p-1 hover:bg-gray-200" title="Edit">
                      <Link to={`/?pasteId=${paste?._id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </Link>
                    </button>
                    <button
                      className="border p-1 hover:bg-gray-200" title="Delete"
                      onClick={() => {
                        handleDelete(paste?._id);
                      }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                    </button>
                    <button
                      className="border p-1 hover:bg-gray-200" title="Copy"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied Successfully!");
                      }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                    </button>
                    <button className="border p-1 hover:bg-gray-200" title="Share" onClick={() => handleShare(paste?._id)}>
                        <Link >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>

                        </Link>
                    </button>
                    <button className="border p-1 hover:bg-gray-200" title="View">
                      <Link to={`/pastes/${paste?._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                      </Link>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between px-3 min-h-[100px]">
                  <div className="truncate max-w-[450px] pt-3">{paste.content}</div>
                  <div className="flex gap-2 items-center justify-center md:items-end  text-gray-400 ">
                   

                    {paste.createdAt}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                </div>
                </div>
              </div>
  ))
) : (
  <div className="text-center text-gray-500 py-10">
    No pastes available. Create your first paste!
  </div>
)}

      </div>
    </div>
  );
};

export default Paste;
