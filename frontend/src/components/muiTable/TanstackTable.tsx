import {
  useMaterialReactTable,
  MRT_Row,
  MRT_RowData,
  MRT_TableInstance,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState
} from 'material-react-table';
import { Box, Button, ListItemIcon, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MoveDown, Plus } from 'lucide-react';

// Define a generic TanstackTableProps
interface TanstackTableProps<T extends MRT_RowData> {
  tableTitle?: string;
  columns: MRT_ColumnDef<T>[]; // Column definitions are generic now
  importedData: T[]; // Imported data is also generic
  rowCount?: number;
  pagination?: MRT_PaginationState;
  setPagination?: (pagination: MRT_PaginationState) => void;
  columnFilters?: MRT_ColumnFiltersState;
  setColumnFilters?: (
    updaterOrValue:
      | MRT_ColumnFiltersState
      | ((prevState: MRT_ColumnFiltersState) => MRT_ColumnFiltersState)
  ) => void;
  sorting?: MRT_SortingState;
  setSorting?: (columnFilters: MRT_SortingState) => void;
  globalFilter?: string;
  setGlobalFilter?: (globalFilter: string) => void;
  quickLinks?: {
    isQuickLink: boolean;
    isHeader: boolean;
    quickLinkName: string;
    onSubmitQuickLink: (values: any, table: any) => void;
  };
  isLoadingData?: boolean;
  isFetchingData?: boolean;
  isLoadingError?: boolean;
  enablePagination?: boolean;
  enableColumnResizing?: boolean;
  enableColumnFilters?: boolean;
  enableRowSelection?: boolean;
  enableRowActions?: boolean;
  enableEditing?: boolean;
  enableExpanding?: boolean;
  enableSorting?: boolean;
  setExpanding?: (expanding: boolean) => void;
  enableGrouping?: boolean;
  enableGlobalFilter?: boolean;
  enableTableResize?: boolean;
  enableDetailTable?: boolean;
  enableDensityToggle?: boolean;
  enableHiding?: boolean;
  enableColumnOrdering?: boolean;
  enableColumnPinning?: boolean;
  setValidationErrors?: (errors: Record<string, string | undefined>) => void; // Set validation errors
  openDeleteConfirmModal?: (row: MRT_Row<T>) => void; // Open delete confirmation modal
  customExpandButtonProps?: boolean;
  customDetailPanel?: React.ReactNode | ((row: MRT_Row<T>) => React.ReactNode);
  menuOptions?: Array<{
    label: string;
    icon: any;
    size?: number;
    onClick: (row: MRT_Row<T>) => void;
    disabled?: (row: MRT_Row<T>) => boolean;
    id?: string | null;
  }>; // Dynamically passed options
  creatingRowIndex?: number;
  setCreatingRowIndex?: (index: number) => void;
  multiOptions?: any;
  openPopover?: boolean;
  handlePopoverOpen?: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl?: HTMLElement | null;
  handlePopoverClose?: () => void;
  globalSearchPlaceholder?: string;
  getHierarchySubRows?: (row: MRT_Row<T>) => MRT_Row<T>[];
}

const MuiTanstackTable = <T extends object>({
  tableTitle = '',
  columns,
  importedData,
  rowCount,
  pagination = {
    pageIndex: 0,
    pageSize: 15
  },
  setPagination = (pagination: MRT_PaginationState) => {},
  columnFilters = [],
  setColumnFilters = (
    updaterOrValue:
      | MRT_ColumnFiltersState
      | ((prevState: MRT_ColumnFiltersState) => MRT_ColumnFiltersState)
  ) => {},
  sorting = [],
  setSorting = (
    updaterOrValue:
      | MRT_SortingState
      | ((prevState: MRT_SortingState) => MRT_SortingState)
  ) => {},
  globalFilter = '',
  setGlobalFilter = (globalFilter: string) => {},
  quickLinks = {
    isQuickLink: false,
    isHeader: false,
    quickLinkName: '',
    onSubmitQuickLink: () => {}
  },
  isLoadingData = false,
  isFetchingData = false,
  isLoadingError = false,
  enablePagination = true,
  enableColumnResizing = true,
  enableColumnFilters = true,
  enableRowSelection = false,
  enableRowActions = false,
  enableEditing = false,
  enableExpanding = false,
  enableSorting = true,
  setExpanding = (expanding: boolean) => {},
  enableGrouping = true,
  enableGlobalFilter = true,
  enableTableResize = false, //for table height resize
  enableDensityToggle = false, //for table height resize
  enableDetailTable = false, //for detail page table height resize
  enableHiding = true,
  enableColumnOrdering = false,
  enableColumnPinning = false,
  setValidationErrors,
  customExpandButtonProps = false,
  customDetailPanel,
  menuOptions,
  creatingRowIndex,
  setCreatingRowIndex,
  multiOptions,
  openPopover,
  handlePopoverOpen,
  globalSearchPlaceholder = 'Search...',
  getHierarchySubRows = undefined
}: TanstackTableProps<T>) => {
  const [data, setData] = useState(importedData ?? []);

  useEffect(() => {
    setData(importedData ?? []); // Update table data whenever importedData changes
  }, [importedData]);

  //CREATE new item action
  const handleCreateNewItem = async ({
    values,
    exitCreatingMode,
    row,
    table
  }: {
    values: Record<string, any>;
    exitCreatingMode: () => void;
    row: any;
    table: any;
  }) => {
    quickLinks.onSubmitQuickLink(values, table);
    exitCreatingMode();
  };

  const table = useMaterialReactTable({
    data: data ?? [],
    columns,
    enableGlobalFilter: enableGlobalFilter, //enable/disable search feature
    initialState: {
      showColumnFilters: false, //display false by default for column filter options
      density: 'compact', // toggle between compact and medium density of row
      // expanded: true, //expand all groups by default
      showGlobalFilter: false, //show/hide search bar
      rowSelection: {} // Initialize with empty selection
    },
    muiSearchTextFieldProps: {
      placeholder: globalSearchPlaceholder
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Actions', //change "Actions" to "Edit"
        visibleInShowHideMenu: false
      }
    },
    rowCount,
    getRowId: (row: any) => row?.id, // Assuming `id` is always a key in row
    // getSubRows: (row: any) => row.subRows, //default
    getSubRows: (row) =>
      getHierarchySubRows ? getHierarchySubRows(row) : row.subRows,

    onColumnFiltersChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        setColumnFilters((prevFilters: any) => {
          const newFilters = updaterOrValue(prevFilters);
          return newFilters;
        });
      } else {
        setColumnFilters(updaterOrValue);
      }
    },
    enablePagination: enablePagination,
    enableColumnResizing: enableColumnResizing, //for column resizing
    enableColumnFilters: enableColumnFilters, // for filter options //true/false
    defaultColumn: {
      maxSize: 500,
      minSize: 70,
      size: 180
    },
    columnResizeMode: 'onChange', //default
    enableStickyHeader: true, //for sticky header
    enableStickyFooter: true, //for sticky footer
    muiTableContainerProps: {
      sx: {
        ...(enableDetailTable
          ? {
              maxHeight: '33vh',
              minHeight: '33vh'
            }
          : enableTableResize
            ? {
                maxHeight: '41vh',
                minHeight: '22vh'
              }
            : {
                '@media (min-width: 769px) and (max-width: 992px)': {
                  maxHeight: '50vh',
                  minHeight: '50vh'
                },
                '@media (min-width: 993px) and (max-width: 1200px)': {
                  maxHeight: '60vh',
                  minHeight: '60vh'
                },
                '@media (min-width: 1201px) and (max-width: 1440px)': {
                  maxHeight: '60vh',
                  minHeight: '60vh'
                },
                '@media (min-width: 1441px) and (max-width: 1920px)': {
                  maxHeight: '65vh',
                  minHeight: '65vh'
                },
                '@media (min-width: 1921px)': {
                  maxHeight: '70vh',
                  minHeight: '70vh'
                }
              })
      }
    },
    enableDensityToggle: enableDensityToggle, //toggle density
    manualFiltering: true, //turn off client-side filtering
    manualPagination: true, //for ssr pagination
    manualSorting: true,
    enableExpanding: enableExpanding, //enable/disable expanding when grouped
    // enableGrouping: enableGrouping, //for grouping columns
    groupedColumnMode: 'reorder', //instead of default "reorder"
    createDisplayMode: 'row', //default ('row', and 'custom' are also available)
    editDisplayMode: 'cell', //default ('row', 'cell', 'table','modal', and 'custom' are also available)
    positionCreatingRow: creatingRowIndex, //for creating new row
    enableCellActions: true, //for cell actions
    enableSelectAll: true, //for select all checkbox
    enableRowSelection: enableRowSelection, //for checkbox selection
    enableRowPinning: false, //for row pinning
    rowPinningDisplayMode: 'select-sticky', //for row pinning
    muiSelectCheckboxProps: { color: 'secondary' }, //color for selected row
    positionToolbarAlertBanner: 'bottom',
    enableHiding: enableHiding, //for hiding columns
    enableColumnPinning: enableColumnPinning, //for hiding columns
    enableColumnOrdering: enableColumnOrdering, //for column reordering and hiding columns
    enableEditing: enableEditing, //for inline editing
    enableRowActions: enableRowActions, //for action buttons (edit, delete, etc.)
    positionActionsColumn: 'first', //for action buttons position
    enableFullScreenToggle: false, //for full screen view
    enableColumnActions: false, //for column actions
    enableSorting: enableSorting, //for sorting

    onGlobalFilterChange: setGlobalFilter, //for search feature
    onPaginationChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        setPagination(updaterOrValue(pagination));
      } else {
        setPagination(updaterOrValue);
      }
    },
    onSortingChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        setSorting(updaterOrValue(sorting));
      } else {
        setSorting(updaterOrValue);
      }
    },
    muiToolbarAlertBannerProps: isLoadingError
      ? {
          color: 'error',
          children: 'Error loading data'
        }
      : undefined,
    onCreatingRowCancel: () => setValidationErrors?.({}),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap'
        }}
      >
        <>
          {tableTitle && (
            <h3 className='text-title-sm flex items-center font-semibold text-black dark:text-white'>
              {tableTitle}
              {rowCount !== undefined && rowCount > 0 && ` (${rowCount})`}
            </h3>
          )}
          {quickLinks?.isQuickLink ? (
            <>
              <Button
                variant='text'
                size='small'
                color='primary'
                onClick={() => {
                  if (setCreatingRowIndex) {
                    setCreatingRowIndex(0);
                  }
                  table.setCreatingRow(true);
                }}
                startIcon={<Plus />}
                sx={{
                  textTransform: 'none',
                  color: '#3C50E0',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                {quickLinks?.quickLinkName}
              </Button>
              {multiOptions && (
                <>
                  <Button
                    disabled={
                      !table.getIsSomeRowsSelected() &&
                      !table.getIsAllRowsSelected()
                    }
                    startIcon={<MoveDown className='h-7 w-7' />}
                    sx={{
                      textTransform: 'none',
                      color: '#3C50E0',
                      fontWeight: 600
                    }}
                    onClick={handlePopoverOpen} // Open popover on click
                  >
                    Multi Action
                  </Button>

                  {openPopover && multiOptions(table)}
                </>
              )}
            </>
          ) : quickLinks?.isHeader ? (
            <h4 className='mb-4 text-xl font-semibold text-black dark:text-white'>
              {quickLinks?.quickLinkName}
            </h4>
          ) : (
            <>
              {multiOptions && (
                <>
                  <Button
                    disabled={
                      !table.getIsSomeRowsSelected() &&
                      !table.getIsAllRowsSelected()
                    }
                    startIcon={<MoveDown className='h-7 w-7' />}
                    sx={{
                      textTransform: 'none',
                      color: '#3C50E0',
                      fontWeight: 600
                    }}
                    onClick={handlePopoverOpen} // Open popover on click
                  >
                    Multi Action
                  </Button>
                  {openPopover && multiOptions(table)}
                </>
              )}
            </>
          )}
        </>
      </Box>
    ),
    onCreatingRowSave: ({ values, exitCreatingMode, row, table }) => {
      handleCreateNewItem({ values, exitCreatingMode, row, table }); // Pass the updated structure
    },
    // kabab menu options
    renderRowActionMenuItems: ({ closeMenu, row }) => {
      return menuOptions?.map((option, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            option.onClick(row as any);
            closeMenu();
          }}
          disabled={
            typeof option.disabled === 'function'
              ? option.disabled(row as any)
              : option.disabled
          }
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <option.icon size={option?.size} />
          </ListItemIcon>
          {option.label}
        </MenuItem>
      ));
    },
    //custom expand button rotation
    muiExpandButtonProps: customExpandButtonProps
      ? ({ row, table }) => ({
          onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
          sx: {
            transform: row.getIsExpanded()
              ? 'rotate(180deg)'
              : 'rotate(-90deg)',
            transition: 'transform 0.2s'
          }
        })
      : undefined,
    //render detail panel
    // renderDetailPanel: customDetailPanel // Custom detail row panel
    //   ? ({ row }) => {
    //       if (typeof customDetailPanel === 'function') {
    //         return customDetailPanel(row);
    //       }
    //       return customDetailPanel;
    //     }
    //   : undefined,
    muiLinearProgressProps: ({ isTopToolbar }) => ({
      color: 'primary', //show progress bar in primary color
      sx: { display: isTopToolbar ? 'block' : 'none' } //only show top toolbar progress bar
    }),
    state: {
      isLoading: isLoadingData,
      showAlertBanner: isLoadingError,
      showProgressBars: isFetchingData,
      columnFilters,
      globalFilter,
      pagination,
      sorting
    }
  });
  useEffect(() => {
    setExpanding(table?.getState().grouping.length > 0 ? true : false);
  }, [table?.getState().grouping]);

  return <MaterialReactTable key={JSON.stringify(data)} table={table} />;
};
export default MuiTanstackTable;
