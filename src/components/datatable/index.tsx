import React from 'react';
import './styles.css';

export default function DataTable({data, updateFilters}: any) {
    const columns = data[0] && Object.keys(data[0]);

    return (
        <div className='table-wrapper table-responsive'>
            <table className='table table-striped'>
                <thead className='thead-dark'>
                    <tr>
                    {
                        columns && columns.map(column => {
                            return <th key={column}>
                                {column}
                                <input type="text" name="" id="" onChange={(e) => updateFilters(column, e.target.value)}/>
                            </th>
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row: any, index: any) => {
                            return <tr key={index}>
                                {
                                    columns.map((column: any, index) => {
                                        return <td key={index}>
                                            {row[column]}
                                        </td>
                                    })
                                }
                            </tr> 
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
