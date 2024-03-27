import React, {useState} from 'react';
import {DataGrid, GridColDef, GridRowSelectionModel} from "@mui/x-data-grid";
import {Button, Card, Chip, Typography} from "@mui/material";
import {VisitorType} from "../App";

const colors:any = {
    Marketing: "blue",
    IT: "secondary",
    Sales: "info",
    Management: "warning"
}

const renderDepartment = (params: any) => {
    return <Chip label={params.value} color={colors[params.value]} sx={{textTransform: "uppercase"}} />
}

const columns: GridColDef[] = [
    {field: 'visitor', headerName: 'Visitor', flex: 1, },
    {field: 'email', headerName: 'Email', flex: 1},
    {field: 'department', headerName: 'Department', flex: 1, align: "right", headerAlign: "right", renderCell: renderDepartment},
];

interface Props {
    visitorArray: VisitorType[]
    setVisitorArray: (value: VisitorType[]) => void;
}

const VisitorTable = ({visitorArray, setVisitorArray}: Props) => {
    const [filteredVisitors, setFilteredVisitors] = useState<VisitorType[]>([])
    const [filtering, setFiltering] = useState(false)

    const filterVisitors = (rowIds: GridRowSelectionModel) => {
        const newArr = visitorArray.filter((row: any) => !rowIds.includes(row.id))
        setFilteredVisitors(newArr)
        setFiltering(true)
    }

    const removeVisitors = () => {
        if (filtering) {
            setVisitorArray(filteredVisitors)
        }
        setFiltering(false)
    }

    return (
        <Card className="visitors-card">
            <div className="visitors-card-heading">
                <Typography variant="h4" gutterBottom>
                    Visitor management
                </Typography>
                <Button variant="contained" onClick={removeVisitors}
                        sx={{borderRadius: '30px', backgroundColor: '#D32F2F', marginBottom: '10px'}}>
                    Remove
                </Button>
            </div>
            <DataGrid
                sx={{borderRight:"none", borderLeft:"none"}}
                rows={visitorArray}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                autoHeight
                onRowSelectionModelChange={(rowId: GridRowSelectionModel) => filterVisitors(rowId)}
            />
        </Card>
    );
};

export default VisitorTable;
