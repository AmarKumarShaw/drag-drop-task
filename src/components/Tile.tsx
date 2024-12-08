type TileProps = {
  date: string;
  message: string;
};

const Tile = ({ date, message }: TileProps) => (
  <div className="bg-gradient-to-r from-[#6d41e2] to-[#ce7887] text-white p-6 m-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
    <div className="font-semibold text-lg break-words">{message}</div>
    <div className="text-sm mt-2">{date}</div>
  </div>
);

export default Tile;
