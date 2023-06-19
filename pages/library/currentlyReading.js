import { useState } from 'react';

export default function Thing() {
    const [showAdded, setShowAdded] = useState(false);

    const handleAddItem = () => {
        setShowAdded(true);

        setTimeout(() => {
            setShowAdded(false);
        }, 2000);
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={handleAddItem}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Add Item
            </button>

            {showAdded && (
                <div className="mt-4 bg-green-200 text-green-900 py-2 px-4 rounded animate-fade-in">
                    Item Added!
                </div>
            )}
        </div>
    );
}
