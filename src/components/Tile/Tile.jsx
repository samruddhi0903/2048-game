const Tile = ({ value }) => {
    const getTileColor = (val) => {
        const colors = {
            0: 'bg-gray-200',
            2: 'bg-blue-100',
            4: 'bg-blue-200',
            8: 'bg-blue-300',
            16: 'bg-blue-400',
            32: 'bg-blue-500',
            64: 'bg-blue-600',
            128: 'bg-cyan-400',
            256: 'bg-cyan-500',
            512: 'bg-cyan-600',
            1024: 'bg-indigo-600',
            2048: 'bg-indigo-700'
        };
        return colors[val] || 'bg-purple-700';
    };

    const getTextColor = (val) => {
        return val > 4 ? 'text-white' : 'text-gray-700';
    };

    const getFontSize = (val) => {
        if (val >= 1024) return 'text-2xl';
        if (val >= 128) return 'text-3xl';
        return 'text-4xl';
    };

    return (
        <div
        className={`
            ${getTileColor(value)}
            ${getTextColor(value)}
            ${getFontSize(value)}
            w-20 h-20 flex items-center justify-center
            rounded-lg font-bold shadow-md
            transition-all duration-150
        `}
        >
        {value !== 0 && value}
        </div>
    );
};

export default Tile;