import { useState, useRef, useEffect } from "react";

type AddTileFormProps = {
  addTile: (date: string, message: string) => void;
  isOpen: boolean;
  isClose: () => void;
};

const AddTileForm = ({ addTile, isOpen, isClose }: AddTileFormProps) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateMessage = (text: string): boolean => {
    if (!text.trim()) {
      setError("Message cannot be empty");
      return false;
    } else if (text.length > 100) {
      setError("Message cannot exceed 100 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);
    validateMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && validateMessage(message)) {
      addTile(date, message);
      isClose();
      setDate("");
      setMessage("");
    }
  };

  const handleClose = () => {
    isClose();
    setDate("");
    setMessage("");
  };

  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isOpen && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gradient-to-r to-[#6d41e2] from-[#ce7887] sm:m-2 m-4 p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Tile</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition duration-200"
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  rows={4}
                  placeholder="Type your message..."
                  ref={messageInputRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition duration-200"
                />
                {error && (
                  <p className="text-white text-md font-medium mt-2">{error}</p>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white  px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white  px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
                >
                  Add Tile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddTileForm;