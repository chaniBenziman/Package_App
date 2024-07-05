import React from 'react';

interface PackageControlsProps {
  totalPackages: number;
  collectedPackages: number;
  onFilterChange: (filter: 'all' | 'collected' | 'notCollected') => void;
}

const PackageControls: React.FC<PackageControlsProps> = ({ totalPackages, collectedPackages, onFilterChange }) => {
  return (
    <div>
      <div>
        <span>סך כל החבילות: {totalPackages}</span>
        <span>נאספו: {collectedPackages}</span>
      </div>
      <div>
        <button onClick={() => onFilterChange('all')}>הצג את כל החבילות</button>
        <button onClick={() => onFilterChange('collected')}>הצג רק חבילות שנאספו</button>
        <button onClick={() => onFilterChange('notCollected')}>הצג רק חבילות שלא נאספו</button>
      </div>
    </div>
  );
};

export default PackageControls;
