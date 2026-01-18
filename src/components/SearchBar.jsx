import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [value, setValue] = useState("");

    const submit = () => {
        if (value.trim()) {
            onSearch(value.trim());
            setValue("");
        }
    };

    return (
        <div className="mb-5 flex items-center gap-3">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2 w-65">
                <Search size={16} className="opacity-70" />
                <input
                    type="text"
                    placeholder="Search city..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                    className="bg-transparent outline-none ml-2 text-sm placeholder-white/60 w-full"
                />
            </div>

            <button
                onClick={submit}
                className="px-4 py-2 rounded-full bg-white/30 hover:bg-white/40 transition text-sm"
            >
                Search
            </button>
        </div>
    );
}