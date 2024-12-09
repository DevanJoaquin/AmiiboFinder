export default function Entry({ value, onChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by Name or Series..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
