import { useEffect, useState } from "react";
import Header from "./Header";
import AddTileForm from "./AddTileForm";
import TileDraggable from "./TileDraggable";
import { groupTilesByYear, sortTilesByDate, resetTilesOrder,input,Message } from "../utils/utils";


type YearGroup = {
  year: string;
  entries: Message[];
};


const DragDrop = () => {
  const [tiles, setTiles] = useState<Message[]>(input);
  const [newTile, setNewTile] = useState<YearGroup[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const addTile = (date: string, message: string) => {
    const newEntry = { date, message };
    setTiles([...tiles, newEntry]);
  };

  const sortTiles = () => {
    const sortedTiles = sortTilesByDate(tiles);
    setTiles(sortedTiles);
  };

  const resetOrder = () => {
    const resetTiles = resetTilesOrder(input, tiles);
    setTiles(resetTiles);
  };

  useEffect(() => {
    if (tiles.length) {
      const groupedTiles = groupTilesByYear(tiles);
      setNewTile(groupedTiles);
    }
  }, [tiles]);

  return (
    <div>
      <Header resetOrder={resetOrder} sortTiles={sortTiles} />
      <div className="container mx-auto px-6 md:px-4 py-2">
        <div className="flex justify-end gap-4 p-4">
          <button
            onClick={handleModalOpen}
            className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
          >
            Add New Tile
          </button>
        </div>
        <AddTileForm
          addTile={addTile}
          isOpen={isModalOpen}
          isClose={handleModalClose}
        />
        <TileDraggable newTile={newTile} setNewTile={setNewTile} />
      </div>
    </div>
  );
};

export default DragDrop;
