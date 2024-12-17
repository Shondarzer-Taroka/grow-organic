import React, { useState } from 'react';

interface ShowingDataTableProps {
    selectedRows: {
        [id: number]: boolean
    };
    setSelectedRows: React.Dispatch<React.SetStateAction<{ [id: number]: boolean }>>
}

const ShowingDataTable: React.FC<ShowingDataTableProps> = ({ selectedRows, setSelectedRows }) => {
    const [showingData,setShowingData]=useState<>([])
    return (
        <section>

        </section>
    );
};

export default ShowingDataTable;