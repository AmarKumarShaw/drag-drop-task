interface HeaderProps {
  resetOrder: () => void;
  sortTiles: () => void;
}

const Header: React.FC<HeaderProps> = ({ resetOrder, sortTiles }) => {
  return (
    <header className="bg-gradient-to-r from-[#ce7887] text-base to-[#6d41e2]">
      <nav className="container mx-auto p-5 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-xl text-white font-bold text-center sm:text-left">
          Drag and Drop
        </p>

        <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-4">
          <button
            onClick={resetOrder}
            className="bg-gradient-to-r  from-[#6d41e2] to-[#ce7887]  border border-white  px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
          >
            Initial Order
          </button>
          <button
            onClick={sortTiles}
            className="bg-gradient-to-r  from-[#6d41e2] to-[#ce7887] border border-white  px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
          >
            Sorted Order
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
