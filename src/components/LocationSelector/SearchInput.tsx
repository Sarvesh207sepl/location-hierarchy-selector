
import React, { RefObject } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSelection: () => void;
  toggleDropdown: () => void;
  isOpen: boolean;
  inputRef: RefObject<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  handleSearch,
  clearSelection,
  toggleDropdown,
  isOpen,
  inputRef
}) => {
  return (
    <div className="relative flex items-center overflow-hidden bg-white dark:bg-black border border-input rounded-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 transition-all duration-200">
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onClick={() => toggleDropdown()}
        placeholder="Search locations..."
        className="w-full px-10 py-3 bg-transparent border-none outline-none text-sm"
      />
      {searchTerm && (
        <button
          onClick={clearSelection}
          className="absolute right-10 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Clear selection"
        >
          <X size={16} className="text-muted-foreground" />
        </button>
      )}
      <button
        type="button"
        className="absolute right-3 p-1 rounded-full hover:bg-muted transition-colors"
        onClick={toggleDropdown}
        aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
      >
        <ChevronDown 
          size={16} 
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
    </div>
  );
};

export default SearchInput;
