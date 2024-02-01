import React from './Mainapp';

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="celsius"
          checked={unit === 'celsius'}
          onChange={() => onToggle('celsius')}
        />
        Celsius
      </label>
      <label>
        <input
          type="radio"
          value="fahrenheit"
          checked={unit === 'fahrenheit'}
          onChange={() => onToggle('fahrenheit')}
        />
        Fahrenheit
      </label>
    </div>
  );
};

export default UnitToggle;
