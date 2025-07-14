import React, { useState } from "react";

const FieldPreviewCard = ({
  label,
  type,
  options,
  onLabelChange,
  onOptionChange,
  onAddOption,
}) => {
  const [isEditingOptions, setIsEditingOptions] = useState(false);

  return (
    <div className="p-4 border rounded bg-gray-50 mb-3">
      <input
        type="text"
        value={label}
        onChange={(e) => onLabelChange?.(e.target.value)}
        className="block text-sm font-medium text-gray-700 mb-2 border-b focus:outline-none focus:border-blue-500 w-full bg-transparent"
        placeholder="Field Label *"
      />

      {type === "text" && (
        <input
          type="text"
          className="mt-1 block w-full border rounded p-2 bg-white"
          placeholder="Short answer"
        />
      )}

      {type === "textarea" && (
        <textarea
          className="mt-1 block w-full border rounded p-2 bg-white"
          placeholder="Long paragraph"
        />
      )}

      {type === "number" && (
        <input
          type="number"
          className="mt-1 block w-full border rounded p-2 bg-white"
          placeholder="Enter a number"
        />
      )}

      {type === "dropdown" && (
        <div className="space-y-2">
          {!isEditingOptions ? (
            <>
              <select className="mt-1 block w-full border rounded p-2 bg-white">
                {options?.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsEditingOptions(true)}
                className="text-blue-600 text-sm hover:underline"
              >
                Edit Options
              </button>
            </>
          ) : (
            <>
              {options?.map((opt, i) => (
                <input
                  key={i}
                  value={opt}
                  onChange={(e) => onOptionChange?.(i, e.target.value)}
                  className="mt-1 block w-full border rounded p-2 bg-white"
                  placeholder={`Option ${i + 1}`}
                />
              ))}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => onAddOption?.()}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add Option
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingOptions(false)}
                  className="text-gray-600 text-sm hover:underline"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {type === "boolean" && (
        <div className="mt-1 flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-sm">Yes / No</span>
        </div>
      )}
    </div>
  );
};

export default FieldPreviewCard;

FieldPreviewCard.defaultProps = {
  options: [],
  onLabelChange: null,
  onOptionChange: null,
  onAddOption: null,
};
