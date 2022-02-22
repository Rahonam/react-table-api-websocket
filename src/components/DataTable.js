import { useBlockLayout, useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { Styles } from './DataTableStyles';

const Datatable = ({columns,data,width,height}) => {

    const tableInstance = useTable({columns,data},useBlockLayout,useSticky,);
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

    return (
        <div>
            <Styles>
                <div {...getTableProps()} className="table sticky" style={{ width: width, height: height }}>
                    <div className="header">
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className="tr">
                        {headerGroup.headers.map((column) => (
                            <div {...column.getHeaderProps()} className="th">
                            {column.render('Header')}
                            </div>
                        ))}
                        </div>
                    ))}
                    </div>
                    <div {...getTableBodyProps()} className="body">
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                        <div {...row.getRowProps()} className="tr">
                            {row.cells.map((cell) => (
                            <div {...cell.getCellProps()} className="td">
                                {cell.render('Cell')}
                            </div>
                            ))}
                        </div>
                        );
                    })}
                    </div>
                </div>
            </Styles>
        </div>
    );
}

export default Datatable;
