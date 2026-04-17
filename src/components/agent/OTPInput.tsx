import { useRef } from "react";

export default function OTPInput() {
  const inputs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-1.5 sm:gap-3 w-full px-2">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => { if (el) inputs.current[i] = el; }}
          onChange={(e) => handleChange(e.target.value, i)}
          className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-700 flex-shrink-0"
        />
      ))}
    </div>
  );
}