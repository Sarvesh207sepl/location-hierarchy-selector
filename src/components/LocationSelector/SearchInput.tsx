
import React, { RefObject } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Field, FormikProps } from 'formik';
import './LocationSelector.css';

interface SearchInputFormValues {
  searchTerm: string;
}

interface SearchInputProps {
  formik: FormikProps<SearchInputFormValues>;
  clearSelection: () => void;
  toggleDropdown: () => void;
  isOpen: boolean;
  inputRef: RefObject<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  formik,
  clearSelection,
  toggleDropdown,
  isOpen,
  inputRef
}) => {
  return (
    <div className="search-input-container">
      <Search className="search-icon" />
      <Field
        innerRef={inputRef}
        type="text"
        name="searchTerm"
        placeholder="Search locations..."
        className="search-input"
        onClick={toggleDropdown}
        as="textarea"
        rows={formik.values.searchTerm && formik.values.searchTerm.length > 30 ? 2 : 1}
      />
      {formik.values.searchTerm && (
        <button
          type="button"
          onClick={clearSelection}
          className="clear-button"
          aria-label="Clear selection"
        >
          <X size={16} />
        </button>
      )}
      <button
        type="button"
        className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
        aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );
};

export default SearchInput;
