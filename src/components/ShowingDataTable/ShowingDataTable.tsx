import React, { useEffect, useRef, useState } from 'react';
import { showingDataTypes } from '../../types/showingDataTypes';
import { getDataTables } from '../../Garbase/services/getDataApi';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { OverlayPanel } from "primereact/overlaypanel";
import { FaAngleDown } from "react-icons/fa";


interface ShowingDataTableProps {
    selectedRows: {
        [id: number]: boolean
    };
    setSelectedRows: React.Dispatch<React.SetStateAction<{ [id: number]: boolean }>>
}

const ShowingDataTable: React.FC<ShowingDataTableProps> = ({ selectedRows, setSelectedRows }) => {
    const [showingData, setShowingData] = useState<showingDataTypes[]>([])
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(0);
    const [rowCount, setRowCount] = useState<number>(0);


      const overlayPanelRef = useRef<OverlayPanel>(null); 

    const PAGE_SIZE = 10;

    const fetchData = async (pageNumber: number, pageSize: number) => {
        setLoading(true);
        try {
            const { tableData, totalRecords } = await getDataTables(pageNumber + 1, pageSize);
            setShowingData(tableData);
            setTotalRecords(totalRecords);
        } catch (error) {
            console.error("Error fetching artworks:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(page, PAGE_SIZE);
    }, [page]);





    // Handle page changes
    const onPageChange = (event: { first: number; rows: number; page: number }) => {
        setPage(event.page);
    };

    // Bulk select rows across pages
    const handleBulkSelection = async () => {
        const totalToSelect = rowCount;
        const updatedSelection = { ...selectedRows };
        console.log(updatedSelection);

        let rowsNeeded = totalToSelect;
        console.log(rowsNeeded);

        let currentPage = 0;

        while (rowsNeeded > 0) {
            const { tableData } = await getDataTables(currentPage + 1, PAGE_SIZE);
            const rowsToSelect = Math.min(rowsNeeded, tableData.length);
            console.log(rowsToSelect, tableData);

            for (let i = 0; i < rowsToSelect; i++) {
                updatedSelection[tableData[i].id] = true;
            }

            rowsNeeded -= rowsToSelect;
            currentPage++;
        }

        setSelectedRows(updatedSelection);
        overlayPanelRef.current?.hide(); // Hide modal
    };

    // Handle individual checkbox selection/deselection
    const handleSelectionChange = (e: { value: showingDataTypes[] }) => {
        const updatedSelection = { ...selectedRows };
        console.log(updatedSelection);

        const selectedIDs = e.value.map((artwork) => artwork.id);
        showingData.forEach((artwork) => {
            if (selectedIDs.includes(artwork.id)) {
                updatedSelection[artwork.id] = true; 
            } else {
                delete updatedSelection[artwork.id]; 
            }
        });

        setSelectedRows(updatedSelection);
    };

    const isRowSelected = (rowId: number) => !!selectedRows[rowId];

    // Custom header with modal trigger icon
    const headerWithIcon = (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "5px" }}>Title</span>
            <FaAngleDown
                style={{ cursor: "pointer" }}
                onClick={(e) => overlayPanelRef.current?.toggle(e)}
            />
            <OverlayPanel ref={overlayPanelRef}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h4>Select Rows</h4>
                    <InputNumber
                        value={rowCount}
                        onChange={(e) => setRowCount(e.value || 0)}
                        placeholder="Enter rows to select"
                        min={0}
                    />
                    <Button label="Select Rows" onClick={handleBulkSelection} />
                </div>
            </OverlayPanel>
        </div>
    );

    return (
        <section>
            <DataTable
                value={showingData}
                paginator
                rows={PAGE_SIZE}
                totalRecords={totalRecords}
                lazy
                first={page * PAGE_SIZE}
                onPage={onPageChange}
                loading={loading}
                selection={showingData.filter((showdata) => isRowSelected(showdata.id))}
                onSelectionChange={handleSelectionChange}
                selectionMode="checkbox"
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column>
                <Column header={headerWithIcon} field="title"></Column>
                <Column field="place_of_origin" header="Place of Origin"></Column>
                <Column field="artist_display" header="Artist"></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="Start Date"></Column>
                <Column field="date_end" header="End Date"></Column>
            </DataTable>
        </section>
    );
};

export default ShowingDataTable;