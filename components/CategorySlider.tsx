import React, { useState } from 'react';

const CategorySlider: React.FC = () => {
  const categories = ["UB", "JAVA", "TP"];
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div
      style={{
        marginTop: '16px', // Add margin-top for spacing from elements above
        marginBottom: '16px', // Add margin-bottom for spacing from elements below
      }}
    >
      <label
        htmlFor="category-select"
        style={{
          marginRight: '8px',
          fontSize: '16px',
          color: '#fff', // Changed to white
        }}
      >
        Select a Category:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{
          padding: '8px',
          fontSize: '14px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          outline: 'none',
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        <option value="" disabled>
          -- Choose an option --
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <p
          style={{
            marginTop: '10px',
            fontSize: '14px',
            color: '#112b38',
          }}
        >
          You selected: <strong>{selectedCategory}</strong>
        </p>
      )}
    </div>
  );
};

export default CategorySlider;
