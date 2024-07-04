import { observer } from 'mobx-react-lite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { packageStore } from '../stores/packageStore';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddPackageForm from './AddPackageForm';

const PackagesList = observer(() => {
    const [open, setOpen] = useState(false);

    const handleDelete = (trackingNumber: string) => {
        packageStore.deletePackages(trackingNumber);
    };

    const handleCollectedChange = (trackingNumber: string) => {
        packageStore.toggleCollected(trackingNumber);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Paper elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Packages List
                </Typography>
                <List>
                    {packageStore.packages.map((pkg, index) => (
                        <ListItem key={index} divider secondaryAction={
                            <>
                                <Checkbox
                                    edge="start"
                                    checked={pkg.collected}
                                    onChange={() => handleCollectedChange(pkg.trackingNumber)}
                                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }}
                                />
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(pkg.trackingNumber)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemText
                                primary={`Name: ${pkg.name}, Tracking Number: ${pkg.trackingNumber}`}
                                secondary={`Collected: ${pkg.collected ? 'Yes' : 'No'}, Latitude: ${pkg.latitude}, Longitude: ${pkg.longitude}`}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpen} 
                    sx={{ margin: 2 }}
                >
                    הוסף חבילה
                </Button>
                <AddPackageForm open={open} handleClose={handleClose} />
            </Paper>
        </Box>
    );
});

export default PackagesList;
