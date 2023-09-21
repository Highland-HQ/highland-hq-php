import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import AppLayout from '@/Layouts/AppLayout';
import { Product, ProductStatus } from '@/types';
import {
  ChevronDown,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  Search,
} from 'lucide-react';
import { capitalize } from '@/utils';

interface ProductIndexProps {
  products: Partial<Product>[];
}

const columns = [
  { name: 'IMAGE', uid: 'thumbnail_image_url' },
  { name: 'NAME', uid: 'name' },
  { name: 'SKU', uid: 'SKU' },
  { name: 'QUANTITY', uid: 'quantity' },
  { name: 'PRICE', uid: 'price' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusColorMap: Record<string, ChipProps['color']> = {
  Draft: 'warning',
  Active: 'success',
  Archived: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = ['image', 'name', 'price', 'status', 'actions'];

type StatusFilterOption = 'all' | 'draft' | 'archived' | 'active';

const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Draft', uid: 'paused' },
  { name: 'Archived', uid: 'vacation' },
];

const Index = ({ products }: ProductIndexProps) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filterValue, setFilterValue] = useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>('all');

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const handleVisibleColumnsChange = (selectedKeys: any) => {
    setVisibleColumns(new Set(selectedKeys as unknown as Set<string>));
  };

  const handleStatusChange = useCallback((selectedKeys: any) => {
    setStatusFilter(selectedKeys);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            variant="bordered"
            className="w-full"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  variant="bordered"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                variant="flat"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={handleStatusChange}
              >
                {statusOptions.map(status => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  variant="bordered"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                variant="flat"
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={handleVisibleColumnsChange}
              >
                {columns.map(column => (
                  <DropdownItem key={column.uid}>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, []);

  const renderCell = useCallback(
    (product: Partial<Product>, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof Partial<Product>];

      switch (columnKey) {
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={
                product.status ? statusColorMap[product.status] : 'default'
              }
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'thumbnail_image_url':
          return (
            <Image
              isBlurred
              width={100}
              src={cellValue as string}
              fallbackSrc="https://via.placeholder.com/300x200"
              alt={product.name}
            />
          );
        case 'price':
          return `$${product.price}`;
        case 'actions':
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <AppLayout title="Manage Products">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Manage Products</h1>
      </div>
      <Table topContent={topContent} isHeaderSticky>
        <TableHeader columns={columns}>
          {column => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No products to display.'} items={products}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default Index;
