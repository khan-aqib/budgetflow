import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, placeholder = "Search transactions..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative mb-6">
      <div className={`
        glassmorphic-card border border-white/20 rounded-xl transition-all duration-300
        ${isExpanded ? 'shadow-lg' : 'shadow-sm'}
      `}>
        <div className="flex items-center p-4">
          {/* Search Icon */}
          <Icon 
            name="Search" 
            size={20} 
            className="text-foreground/60 mr-3" 
          />

          {/* Search Input */}
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            className="flex-1 bg-transparent text-foreground placeholder-foreground/50 focus:outline-none"
          />

          {/* Clear Button */}
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-foreground/60 hover:text-foreground ml-2"
            >
              <Icon name="X" size={16} />
            </Button>
          )}

          {/* Voice Search Button (Future Enhancement) */}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/60 hover:text-foreground ml-2"
            onClick={() => {
              // Voice search functionality can be added here
              console.log('Voice search clicked');
            }}
          >
            <Icon name="Mic" size={16} />
          </Button>
        </div>

        {/* Search Suggestions (when expanded and has search term) */}
        {isExpanded && searchTerm && (
          <div className="border-t border-white/10 p-2 animate-fade-in">
            <div className="space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-foreground/80 hover:bg-white/10 rounded-lg transition-colors duration-200">
                <Icon name="Clock" size={16} className="text-foreground/60" />
                <span>Recent: Coffee shop</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-foreground/80 hover:bg-white/10 rounded-lg transition-colors duration-200">
                <Icon name="Clock" size={16} className="text-foreground/60" />
                <span>Recent: Grocery store</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-foreground/80 hover:bg-white/10 rounded-lg transition-colors duration-200">
                <Icon name="TrendingUp" size={16} className="text-foreground/60" />
                <span>Popular: Gas station</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Search Results Count */}
      {searchTerm && (
        <div className="mt-2 text-sm text-foreground/60">
          <Icon name="Search" size={14} className="inline mr-1" />
          Searching for "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;