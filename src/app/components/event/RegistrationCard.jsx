const RegistrationCard = ({ title, price, selectedPrice, onSelectPrice }) => {
  const isSelected = selectedPrice === price;

  return (
    <div
      className={`w-60 border rounded-xl shadow-md flex flex-col items-center overflow-hidden transition-all ${
        isSelected ? "border-[#353C3C] scale-105" : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div
        className="w-full py-4 text-white text-center font-bold"
        style={{ backgroundColor: "#6E5531" }}
      >
        {title}
      </div>

      {/* Divider */}
      <div className="w-4/5 my-4 border-t border-dashed border-gray-400" />

      {/* Price */}
      <div className="text-xl font-semibold text-gray-700 mb-4">৳ {price}</div>

      {/* Button */}
      <button
        onClick={() => onSelectPrice(price)}
        className="text-white font-semibold px-6 py-2 mb-4 rounded hover:opacity-90 transition"
        style={{
          backgroundColor: isSelected ? "#6E5531" : "#353C3C",
        }}
      >
        {isSelected ? "SELECTED" : "BOOK NOW"}
      </button>
    </div>
  );
};


export default RegistrationCard;