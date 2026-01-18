import { Search } from "lucide-react";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ onSearch }) {
    const [value, setValue] = useState("");
    const debounced = useDebounce(value, 600);

    // auto search setelah user berhenti mengetik
    // (tetap bisa Enter / klik tombol)
    if (debounced && debounced !== value) {
        onSearch(debounced);
    }

    return (
        <div className="mb-5 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2 w-full sm:w-65">
                <Search size={16} className="opacity-70" />
                <input
                    type="text"
                    placeholder="Search city..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-transparent outline-none ml-2 text-sm placeholder-white/60 w-full"
                />
            </div>

            <button
                onClick={() => value.trim() && onSearch(value)}
                className="px-4 py-2 rounded-full bg-white/30 hover:bg-white/40 transition text-sm"
            >
                Search
            </button>
        </div>
    );
}
