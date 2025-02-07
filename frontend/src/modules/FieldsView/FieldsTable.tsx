import { ReactNode } from 'react';
import Table from 'rsuite/Table';
import TableCell from 'rsuite/TableCell';
import TableColumn from 'rsuite/TableColumn';
import TableHeaderCell from 'rsuite/TableHeaderCell';
import FieldsTableDropdownMenu from './FieldsTableDropdownMenu';
import useMediaQuery from 'rsuite/useMediaQuery';
import { useDynamicHeight } from '../../data/hooks';
import { Field } from '../../data/models';

type FieldsTableProps = {
  fields: Field[];
  onDeleteField: (field: Field) => void;
  onEditField: (field: Field) => void;
  onMoveFieldUp: (id: string) => void;
  onMoveFieldDown: (id: string) => void;
};

const FieldsTable = ({
  fields,
  onDeleteField,
  onEditField,
  onMoveFieldUp,
  onMoveFieldDown,
}: FieldsTableProps): ReactNode => {
  const {containerRef, height} = useDynamicHeight();
  const [mobile] = useMediaQuery('(max-width: 767px)');

  return (
    <div ref={containerRef}>
      <Table
        autoHeight={mobile}
        data={fields}
        height={mobile ? undefined : height}
      >
        <TableColumn
          minWidth={70}
          width={70}
          verticalAlign="middle"
        >
          <TableHeaderCell>#</TableHeaderCell>
          <TableCell dataKey="id">{(_, index) => (<>{(index ?? 0) + 1}</>)}</TableCell>
        </TableColumn>

        <TableColumn
          flexGrow={1}
          minWidth={140}
          verticalAlign="middle"
        >
          <TableHeaderCell>Name</TableHeaderCell>
          <TableCell dataKey="field" />
        </TableColumn>

        <TableColumn
          flexGrow={1}
          minWidth={140}
          verticalAlign="middle"
        >
          <TableHeaderCell>Category</TableHeaderCell>
          <TableCell dataKey="category" />
        </TableColumn>

        <TableColumn
          flexGrow={1}
          minWidth={140}
          verticalAlign="middle"
        >
          <TableHeaderCell>Type</TableHeaderCell>
          <TableCell dataKey="type" />
        </TableColumn>

        <TableColumn
          align="center"
          minWidth={70}
          width={70}
          verticalAlign="middle"
        >
          <TableHeaderCell>Actions</TableHeaderCell>
          <TableCell dataKey="id" style={{ padding: 0 }}>
            {(rowData) => (
              <FieldsTableDropdownMenu
                fields={fields}
                field={rowData as Field}
                onDeleteField={onDeleteField}
                onEditField={onEditField}
                onMoveFieldUp={onMoveFieldUp}
                onMoveFieldDown={onMoveFieldDown}
              />
            )}
          </TableCell>
        </TableColumn>
      </Table>
    </div>
  );
};

export default FieldsTable;