// import { Component } from 'react';
// import Card from './Card';

// interface CardListProps {
//   items: { name: string }[];
// }

// class CardList extends Component<CardListProps> {
//   render() {
//     return (
//       <div className="card-list">
//         {this.props.items.map((item, index) => (
//           <Card key={index} name={item.name} />
//         ))}
//       </div>
//     );
//   }
// }

// export default CardList;

// 📁 src/components/CardList.tsx
import React from 'react';
import { Item } from '../components/MainComponent'; // Or adjust the import path to where Item is defined

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
          (selectedItem) => selectedItem.name === item.name,
        );

        return (
          <div key={item.name} className="border p-4 rounded">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) =>
                  e.target.checked
                    ? onItemSelect(item)
                    : onItemUnselect(item.name)
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
