import React from 'react';
import { Item } from '../types/item';

interface CardListProps {
  items: Item[];
  selectedItems: Item[];
  onItemSelect: (item: Item) => void;
  onItemUnselect: (name: string) => void;
}

const CardList: React.FC<CardListProps> = ({
  items,
  selectedItems,
  onItemSelect,
  onItemUnselect,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => {
        const isSelected = selectedItems.some(
          (selectedItem) => selectedItem.name === item.name
        );

        return (
          <div key={item.name} className="border p-4 rounded">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) =>
                  e.target.checked ? onItemSelect(item) : onItemUnselect(item.name)
                }
                className="mr-2"
              />
              {item.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
