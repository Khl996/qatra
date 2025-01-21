import Image from 'next/image';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = "ابحث عن متجر أو منتج..." 
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-4 pr-12 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <Image
          src="/assets/icons/search_icon.png"
          alt="بحث"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};
