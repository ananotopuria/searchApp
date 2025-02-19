import React from 'react';

interface FlyoutProps {
  selectedCount: number;
  onUnselectAll: () => void;
  onDownload: () => void;
}

const Flyout: React.FC<FlyoutProps> = ({ selectedCount, onUnselectAll, onDownload }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      <span>{selectedCount} item{selectedCount > 1 ? 's' : ''} selected</span>
      <div className="flex gap-2">
        <button
          onClick={onUnselectAll}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
        >
          Unselect all
        </button>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
