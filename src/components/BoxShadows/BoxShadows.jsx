import { shadows } from './boxshadow.js';

export default function BoxShadows() {
  const copyShadow = (shadowValue) => {
    try {
      navigator.clipboard.writeText(`box-shadow: ${shadowValue};`);
      alert('Copied Successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to copy Box Shadow');
    }
  };

  return (
    <div className="grid grid-cols-3 p-10 gap-10 h-[70vh] border justify-center overflow-y-auto">
      {shadows.map((shadow, index) => (
        <div
          key={index}
          title="Click to copy"
          onClick={() => copyShadow(shadow.value)}
          className="size-60 cursor-pointer rounded-lg flex justify-center items-center"
          style={{ boxShadow: shadow.value }}
        >
          <div className="text-center p-2">
            <p className="font-bold">{shadow.title}</p>
            <p className="font-bold">{shadow.source}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
