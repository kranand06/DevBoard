import React from 'react'

function FormInput({ icon: Icon, type = 'text', placeholder, value, onChange, rightSlot }) {
    return (
        <div className="relative flex items-center">
            {/* Leading icon */}
            <span className="absolute left-3 flex-shrink-0" style={{ color: '#c7c4d7' }}>
                <Icon size={16} />
            </span>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="glow-input w-full bg-[#131b2e] border border-[#464554] rounded-lg
                   pl-9 pr-10 py-2.5 text-sm text-[#dae2fd] placeholder-[#464554]
                   focus:border-[#c0c1ff] focus:outline-none transition-colors duration-200"
            />

            {/* Optional right slot (e.g. eye toggle) */}
            {rightSlot && (
                <span className="absolute right-3" style={{ color: '#c7c4d7' }}>
                    {rightSlot}
                </span>
            )}
        </div>
    );
}

export default FormInput