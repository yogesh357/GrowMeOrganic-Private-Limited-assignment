// import { Column } from "primereact/column";
// import { Paginator } from "primereact/paginator";
// import { useAppContext } from "../context/AppContextProvider";
// import {
//   DataTable,
// } from "primereact/datatable";
// import type { Artwork } from "../types/api";
// import { useState, useRef } from "react";
// import { OverlayPanel } from "primereact/overlaypanel";
// import { InputNumber } from "primereact/inputnumber";
// import { Button } from "primereact/button";

// export default function ArtworksTable() {
//   const { apiData, pagination, loading, fetchApiData, currentPage } =
//     useAppContext();
//   const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);
//   const [customSelectCount, setCustomSelectCount] = useState<number>(1);
//   const overlayPanelRef = useRef<OverlayPanel>(null);
//   const dt = useRef<DataTable<Artwork[]>>(null);

//   // Manual pagination handler
//   const onPageChange = (event: Artwork) => {
//     const newPage = event.page + 1;
//     fetchApiData(newPage);
//   };

//   // Handle selection change
//   // const onSelectionChange = (
//   //   e: DataTableSelectionSingleChangeEvent<Artwork[]>
//   // ) => {
//   //   setSelectedRows(e.value);
//   // };
//   const onSelectionChange = (e: any) => {
//     setSelectedRows(e.value);
//   };
//   // Custom selection - select n rows from current page
//   const handleCustomSelect = () => {
//     const count = Math.min(customSelectCount, apiData.length);
//     const rowsToSelect = apiData.slice(0, count);

//     // Merge with existing selection, avoiding duplicates
//     const newSelection = [...selectedRows];
//     rowsToSelect.forEach((row) => {
//       if (!newSelection.some((selected) => selected.id === row.id)) {
//         newSelection.push(row);
//       }
//     });

//     setSelectedRows(newSelection);
//     overlayPanelRef.current?.hide();
//     setCustomSelectCount(1);
//   };

//   // Select all on current page
//   const selectAllOnPage = () => {
//     dt.current?.selectAll();
//   };

//   // Deselect all on current page
//   const deselectAllOnPage = () => {
//     const pageRowIds = new Set(apiData.map((row) => row.id));
//     const filteredSelection = selectedRows.filter(
//       (row) => !pageRowIds.has(row.id)
//     );
//     setSelectedRows(filteredSelection);
//   };

//   return (
//     <div className="card p-6">
//       {/* Selection Info Panel */}
//       <div className="mb-4 p-3 surface-100 border-round">
//         <div className="flex justify-content-between align-items-center">
//           <div>
//             <strong>Selected: {selectedRows.length} items</strong>
//           </div>
//           <div className="flex gap-2">
//             <Button
//               icon="pi pi-plus"
//               label="Select Page"
//               onClick={selectAllOnPage}
//               severity="secondary"
//               size="small"
//             />
//             <Button
//               icon="pi pi-minus"
//               label="Deselect Page"
//               onClick={deselectAllOnPage}
//               severity="secondary"
//               size="small"
//             />
//             <Button
//               icon="pi pi-sliders-h"
//               label="Custom Select"
//               onClick={(e) => overlayPanelRef.current?.toggle(e)}
//               severity="info"
//               size="small"
//             />
//             {selectedRows.length > 0 && (
//               <Button
//                 icon="pi pi-times"
//                 label="Clear All"
//                 onClick={() => setSelectedRows([])}
//                 severity="danger"
//                 size="small"
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       <DataTable
//         ref={dt}
//         value={apiData}
//         stripedRows
//         scrollable
//         responsiveLayout="scroll"
//         emptyMessage="No artworks found."
//         className="p-datatable-sm p-datatable-gridlines"
//         loading={loading}
//         selection={selectedRows}
//         onSelectionChange={onSelectionChange}
//         dataKey="id"
//         style={{
//           minWidth: "60rem",
//           fontSize: "0.875rem",
//         }}
//         pt={{
//           header: {
//             style: { background: "var(--primary-color)", color: "white" },
//           },
//           thead: { style: { background: "#f8f9fa" } },
//           column: {
//             headerCell: { style: { fontWeight: "600", padding: "0.75rem" } },
//             bodyCell: { style: { padding: "0.75rem" } },
//           },
//         }}
//       >
//         <Column
//           selectionMode="multiple"
//           headerStyle={{ width: "3rem" }}
//         ></Column>
//         <Column
//           field="title"
//           header="Title"
//           sortable
//           style={{ minWidth: "16rem" }}
//         />
//         <Column
//           field="place_of_origin"
//           header="Place of Origin"
//           style={{ minWidth: "12rem" }}
//         />
//         <Column
//           field="artist_display"
//           header="Artist"
//           style={{ minWidth: "16rem" }}
//         />
//         <Column
//           field="inscriptions"
//           header="Inscriptions"
//           style={{ minWidth: "14rem" }}
//           body={(rowData: Artwork) => rowData.inscriptions || "N/A"}
//         />
//         <Column
//           field="date_start"
//           header="Start Date"
//           style={{ width: "8rem", textAlign: "center" }}
//           body={(rowData: Artwork) => rowData.date_start || "N/A"}
//         />
//         <Column
//           field="date_end"
//           header="End Date"
//           style={{ width: "8rem", textAlign: "center" }}
//           body={(rowData: Artwork) => rowData.date_end || "N/A"}
//         />
//       </DataTable>

//       {/* Custom Selection Overlay Panel */}
//       <OverlayPanel ref={overlayPanelRef} dismissable>
//         <div className="flex flex-column gap-3" style={{ minWidth: "200px" }}>
//           <label htmlFor="customSelect" className="font-semibold">
//             Select number of rows:
//           </label>
//           <InputNumber
//             id="customSelect"
//             value={customSelectCount}
//             onValueChange={(e) => setCustomSelectCount(e.value || 1)}
//             min={1}
//             max={apiData.length}
//             showButtons
//             buttonLayout="horizontal"
//             decrementButtonClassName="p-button-danger"
//             incrementButtonClassName="p-button-success"
//             incrementButtonIcon="pi pi-plus"
//             decrementButtonIcon="pi pi-minus"
//           />
//           <small className="text-500">
//             Available: {apiData.length} rows on this page
//           </small>
//           <Button
//             label="Apply Selection"
//             icon="pi pi-check"
//             onClick={handleCustomSelect}
//             severity="success"
//           />
//         </div>
//       </OverlayPanel>

//       {/* Manual Paginator */}
//       {pagination && (
//         <Paginator
//           first={(currentPage - 1) * 12}
//           rows={12}
//           totalRecords={pagination.total}
//           onPageChange={onPageChange}
//           template="PrevPageLink PageLinks NextPageLink"
//         />
//       )}
//     </div>
//   );
// }

import { Column } from "primereact/column";
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator";
import { useAppContext } from "../context/AppContextProvider";
import { DataTable } from "primereact/datatable";
import type { Artwork } from "../types/api";
import { useState, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel"; 
import { InputNumber } from "primereact/inputnumber";

import { Button } from "primereact/button";

export default function ArtworksTable() {
  const { apiData, pagination, loading, fetchApiData, currentPage } =
    useAppContext();
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);
  const [customSelectCount, setCustomSelectCount] = useState<number>(1);
  const overlayPanelRef = useRef<OverlayPanel>(null);

  // Fixed: Use correct event type for paginator
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    const newPage = event.page + 1;
    fetchApiData(newPage);
  };

  // Fixed selection handler
  const onSelectionChange = (e: { value: Artwork[] }) => {
    setSelectedRows(e.value);
  };

  // Fixed: Remove selectAll method and implement manual selection
  const selectAllOnPage = () => {
    // const currentPageIds = new Set(apiData.map((row) => row.id));
    const currentSelectedIds = new Set(selectedRows.map((row) => row.id));

    // Add all page rows that aren't already selected
    const rowsToAdd = apiData.filter((row) => !currentSelectedIds.has(row.id));
    const newSelection = [...selectedRows, ...rowsToAdd];

    setSelectedRows(newSelection);
  };

  // Deselect all on current page
  const deselectAllOnPage = () => {
    const pageRowIds = new Set(apiData.map((row) => row.id));
    const filteredSelection = selectedRows.filter(
      (row) => !pageRowIds.has(row.id)
    );
    setSelectedRows(filteredSelection);
  };

  // Custom selection - select n rows from current page
  const handleCustomSelect = () => {
    const count = Math.min(customSelectCount, apiData.length);
    const unselectedRows = apiData.filter(
      (row) => !selectedRows.some((selected) => selected.id === row.id)
    );

    const rowsToSelect = unselectedRows.slice(0, count);
    const newSelection = [...selectedRows, ...rowsToSelect];

    setSelectedRows(newSelection);
    overlayPanelRef.current?.hide();
    setCustomSelectCount(1);
  };

  return (
    <div className="card p-6">
      {/* Selection Info Panel */}
      <div className="mb-4 p-3 surface-100 border-round">
        <div className="flex justify-content-between align-items-center">
          <div>
            <strong>Selected: {selectedRows.length} items</strong>
          </div>
          <div className="flex gap-2">
            <Button
              icon="pi pi-plus"
              label="Select Page"
              onClick={selectAllOnPage}
              severity="secondary"
              size="small"
            />
            <Button
              icon="pi pi-minus"
              label="Deselect Page"
              onClick={deselectAllOnPage}
              severity="secondary"
              size="small"
            />
            <Button
              icon="pi pi-sliders-h"
              label="Custom Select"
              onClick={(e) => overlayPanelRef.current?.toggle(e)}
              severity="info"
              size="small"
            />
            {selectedRows.length > 0 && (
              <Button
                icon="pi pi-times"
                label="Clear All"
                onClick={() => setSelectedRows([])}
                severity="danger"
                size="small"
              />
            )}
          </div>
        </div>
      </div>

      {/* Fixed: Remove ref and use proper DataTable props */}
      <DataTable
        value={apiData}
        stripedRows
        scrollable
        responsiveLayout="scroll"
        emptyMessage="No artworks found."
        className="p-datatable-sm p-datatable-gridlines"
        loading={loading}
        selection={selectedRows}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        selectionMode="multiple"
        style={{
          minWidth: "60rem",
          fontSize: "0.875rem",
        }}
        pt={{
          header: {
            style: { background: "var(--primary-color)", color: "white" },
          },
          thead: { style: { background: "#f8f9fa" } },
          column: {
            headerCell: { style: { fontWeight: "600", padding: "0.75rem" } },
            bodyCell: { style: { padding: "0.75rem" } },
          },
        }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="title"
          header="Title"
          sortable
          style={{ minWidth: "16rem" }}
        />
        <Column
          field="place_of_origin"
          header="Place of Origin"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="artist_display"
          header="Artist"
          style={{ minWidth: "16rem" }}
        />
        <Column
          field="inscriptions"
          header="Inscriptions"
          style={{ minWidth: "14rem" }}
          body={(rowData: Artwork) => rowData.inscriptions || "N/A"}
        />
        <Column
          field="date_start"
          header="Start Date"
          style={{ width: "8rem", textAlign: "center" }}
          body={(rowData: Artwork) => rowData.date_start || "N/A"}
        />
        <Column
          field="date_end"
          header="End Date"
          style={{ width: "8rem", textAlign: "center" }}
          body={(rowData: Artwork) => rowData.date_end || "N/A"}
        />
      </DataTable>

      {/* Custom Selection Overlay Panel */}
      <OverlayPanel ref={overlayPanelRef} dismissable>
        <div className="flex flex-column gap-3" style={{ minWidth: "200px" }}>
          <label htmlFor="customSelect" className="font-semibold">
            Select number of rows:
          </label>
          <InputNumber
            id="customSelect"
            value={customSelectCount}
            onValueChange={(e) => setCustomSelectCount(e.value || 1)}
            min={1}
            max={apiData.length}
            showButtons
            buttonLayout="horizontal"
            decrementButtonClassName="p-button-danger"
            incrementButtonClassName="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
          <small className="text-500">
            Available: {apiData.length} rows on this page
          </small>
          <Button
            label="Apply Selection"
            icon="pi pi-check"
            onClick={handleCustomSelect}
            severity="success"
          />
        </div>
      </OverlayPanel>

      {/* Fixed: Paginator with correct event type */}
      {pagination && (
        <Paginator
          first={(currentPage - 1) * 12}
          rows={12}
          totalRecords={pagination.total}
          onPageChange={onPageChange}
          template="PrevPageLink PageLinks NextPageLink"
        />
      )}
    </div>
  );
}
