export default function Searchbar({ value, onChange }) {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border px-4 py-2 outline-none"
        placeholder="Search by ingredient..."
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
