import React from "react";
import Tile from "./Tile";
import { handleDragStart, handleDragEnd, handleDrop } from "../utils/utils";

type YearGroup = {
  year: string;
  entries: { date: string; message: string }[];
};

type DraggedTile = {
  year: string;
  index: number;
};

type TileDraggableProps = {
  newTile: YearGroup[];
  setNewTile: React.Dispatch<React.SetStateAction<YearGroup[]>>;
};

const TileDraggable = ({ newTile, setNewTile }: TileDraggableProps) => {
  const [draggedTile, setDraggedTile] = React.useState<DraggedTile | null>(null);
  const [dragOverTile, setDragOverTile] = React.useState<{
    year: string;
    index: number;
  } | null>(null);

  return (
    <div className="mt-6">
      {newTile
        .sort(
          (a, b) =>
            new Date(b.year).getFullYear() - new Date(a.year).getFullYear()
        )
        .map((group, yearIndex) => (
          <div key={yearIndex} className="mb-8">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#be4b5e] to-[#1f0c51] text-2xl font-medium ml-6 ">{`Year ${group.year}`}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.entries.map((tile, tileIndex) => {
                const isDragged =
                  draggedTile?.year === group.year &&
                  draggedTile?.index === tileIndex;

                const isDragOver =
                  dragOverTile?.year === group.year &&
                  dragOverTile?.index === tileIndex;

                return (
                  <div
                    key={tileIndex}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, group.year, tileIndex, setDraggedTile)
                    }
                    onDragEnd={() => {
                      handleDragEnd(setDraggedTile);
                      setDragOverTile(null);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverTile({ year: group.year, index: tileIndex });
                    }}
                    onDrop={(e) => {
                      handleDrop(
                        e,
                        tileIndex,
                        group.year,
                        draggedTile,
                        newTile,
                        setNewTile
                      );
                      setDragOverTile(null);
                    }}
                    className={`relative rounded-lg p-2 transition-all duration-300 ease-in-out cursor-move ${
                      isDragged ? "opacity-20 scale-95" : "opacity-100 scale-100"
                    } ${
                      isDragOver && !isDragged
                        ? "bg-gray-200 border border-dashed border-pink-500"
                        : "bg-white"
                    } hover:scale-105 active:scale-95`}
                  >
                    {isDragOver && !isDragged && (
                      <div className="absolute inset-0 bg-pink-100 opacity-50 pointer-events-none"></div>
                    )}
                    <Tile date={tile.date} message={tile.message} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TileDraggable;
