export type Message = Record<"date" | "message", string>;

export type YearGroup = {
  year: string;
  entries: Message[];
};

export type DraggedTile = {
  year: string;
  index: number;
};

export const input: Message[] = [
  { "date": "2021-06-21", "message": "message D" },
  { "date": "2020-06-18", "message": "message A" },
  { "date": "2021-06-20", "message": "message C" },
  { "date": "2020-06-19", "message": "message B" }
];

// Group tiles by year
export const groupTilesByYear = (tiles: Message[]): YearGroup[] => {
  return tiles.reduce<YearGroup[]>((acc, item) => {
    const year = item.date.split("-")[0];
    const yearGroup = acc.find((group) => group.year === year);

    if (yearGroup) {
      yearGroup.entries.push({ date: item.date, message: item.message });
    } else {
      acc.push({
        year,
        entries: [{ date: item.date, message: item.message }],
      });
    }
    return acc;
  }, []);
};

// Sort tiles by date (latest first)
export const sortTilesByDate = (tiles: Message[]): Message[] => {
  return [...tiles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Reset the order of tiles to the original input
export const resetTilesOrder = (
  input: Message[],
  tiles: Message[]
): Message[] => {
  return [
    ...input,
    ...tiles.filter(
      (tile) =>
        !input.some(
          (item) => item.date === tile.date && item.message === tile.message
        )
    ),
  ];
};

// Drag-and-drop handling
export const handleDragStart = (
  e: React.DragEvent,
  year: string,
  tileIndex: number,
  setDraggedTile: React.Dispatch<React.SetStateAction<DraggedTile | null>>
) => {
  e.dataTransfer.setData("draggedIndex", tileIndex.toString());
  e.dataTransfer.setData("draggedYear", year);
  setDraggedTile({ year, index: tileIndex });
};

export const handleDragEnd = (
  setDraggedTile: React.Dispatch<React.SetStateAction<DraggedTile | null>>
) => {
  setDraggedTile(null);
};

export const handleDrop = (
  e: React.DragEvent,
  targetIndex: number,
  year: string,
  draggedTile: DraggedTile | null,
  newTile: YearGroup[],
  setNewTile: React.Dispatch<React.SetStateAction<YearGroup[]>>
) => {
  e.preventDefault();

  if (!draggedTile || draggedTile.year !== year) return;

  const updatedNewTile = [...newTile];
  const yearGroup = updatedNewTile.find((group) => group.year === year);

  if (yearGroup) {
    const draggedEntry = yearGroup.entries[draggedTile.index];

    // Move the dragged entry to the target index and shift the others accordingly
    yearGroup.entries.splice(draggedTile.index, 1); // Remove the dragged entry
    yearGroup.entries.splice(targetIndex, 0, draggedEntry); // Insert the dragged entry at the target index

    setNewTile(updatedNewTile);
  }
};
 