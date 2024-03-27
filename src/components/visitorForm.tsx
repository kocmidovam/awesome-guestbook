import React from 'react';
import {useForm} from "react-hook-form";
import {
    Button,
    Card,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField, Typography
} from "@mui/material";
import {ErrorMessage} from "@hookform/error-message";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { VisitorType} from "../App";

interface Props {
    visitorArray: VisitorType[]
    setVisitorArray: (value: VisitorType[]) => void;
}

const VisitorForm = ({visitorArray, setVisitorArray}: Props) => {

    const {
        register, handleSubmit, reset, formState: {errors}
    } = useForm({
        defaultValues: {
            visitor: "",
            email: "",
            department: "Marketing",
            agree: false
        }
    })

    const isEmailUnique = (value: string) => {
        return !visitorArray.some((row: VisitorType) => row.email === value)
    }

    const handleAddVisitor = (data: Omit<VisitorType, "id">) => {
        setVisitorArray([...visitorArray, {id: (visitorArray.length + 1).toString(), ...data}])
        // TODO: reset checkbox and select
        reset()
    }

    return (
        <Card className="form-card" sx={{width: 418}}>
            <Typography variant="h6" >
               Add new visitor
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{marginBottom: "20px"}}>Fill name, email address and the department.</Typography>
            <form className="form" onSubmit={handleSubmit((data) => handleAddVisitor(data))}>
                <TextField
                    id="visitor"
                    label="Full name"
                    {...register('visitor')}
                />
                <TextField
                    required
                    id="email"
                    label="Email address"
                    {...register('email', {
                        validate: (value) =>
                            isEmailUnique(value) || 'Email is already registered',
                    })}
                />
                <ErrorMessage errors={errors} name="email"/>

                <FormControl>
                    <InputLabel id="department">Department</InputLabel>
                    <Select labelId="department" label="Department" {...register('department')}
                            defaultValue="Marketing">
                        <MenuItem value="Marketing">Marketing</MenuItem>
                        <MenuItem value="IT">IT</MenuItem>
                        <MenuItem value="Sales">Sales</MenuItem>
                        <MenuItem value="Management">Management</MenuItem>
                    </Select>
                </FormControl>

                <FormControlLabel required control={<Checkbox {...register('agree')} />}
                                  label="I agree to be added to the table"/>

                <div className="button-row">
                    <Button variant="outlined" onClick={() => reset()} sx={{borderRadius: '30px'}}>
                        <HistoryIcon fontSize="small"/>
                        Reset Form
                    </Button>
                    <Button variant="contained" type={"submit"} sx={{borderRadius: '30px'}}>
                        <PersonIcon fontSize="small"/>
                        Add new visitor
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default VisitorForm;
