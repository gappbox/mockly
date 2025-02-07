import { ReactNode } from 'react';
import Table from 'rsuite/Table';
import TableCell from 'rsuite/TableCell';
import TableColumn from 'rsuite/TableColumn';
import TableHeaderCell from 'rsuite/TableHeaderCell';
import { Field } from '../../data/models';

type TemplatesTableProps = {
  fields: Field[];
};

const TemplatesTable = ({ fields }: TemplatesTableProps): ReactNode => {
  return (
    <Table
      autoHeight
      data={fields}
      hover={false}
    >
      <TableColumn
        minWidth={50}
        width={50}
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
    </Table>
  );
};

export default TemplatesTable;