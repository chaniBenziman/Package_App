import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { packageStore } from '../stores/packageStore';

interface AddPackageFormProps {
    open: boolean;
    handleClose: () => void;
}

const AddPackageForm: React.FC<AddPackageFormProps> = ({ open, handleClose }) => {
    const [newPackage, setNewPackage] = useState({
        name: '',
        trackingNumber: '',
        collected: false,
        latitude: 0,
        longitude: 0,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPackage(prevState => ({
            ...prevState,
            [name]: name === 'latitude' || name === 'longitude'
                ? parseFloat(value) // המרה למספר עבור שדות latitude ו-longitude
                : name === 'collected'
                ? e.target.checked // שימוש במאפיין checked עבור שדות בוליאניים
                : value, // שמירה על הערך כפי שהוא עבור כל שדה אחר
        }));
    };
    

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        packageStore.addPackage(newPackage);
        handleClose();
        setNewPackage({ name: '', trackingNumber: '', collected: false, latitude: 0, longitude: 0 }); // Reset form
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a New Package</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Package Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newPackage.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="trackingNumber"
                    label="Tracking Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newPackage.trackingNumber}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="latitude"
                    label="Latitude"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={newPackage.latitude}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="longitude"
                    label="Longitude"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={newPackage.longitude}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPackageForm;
