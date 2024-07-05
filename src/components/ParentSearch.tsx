import React, { useState, useEffect } from 'react';
import SearchPackage from './SearchPackage';
import { packageStore } from '../stores/packageStore';
import PackageControls from './PackageControls';
import { observer } from 'mobx-react-lite';
import { Grid, Card, CardContent, Typography, Box, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ParentComponent: React.FC = observer(() => {
  const [filteredPackages, setFilteredPackages] = useState(packageStore.packages);
  const [filter, setFilter] = useState<'all' | 'collected' | 'notCollected'>('all');

  useEffect(() => {
    filterPackages();
  }, [filter, packageStore.packages]);

  const handleSearch = (searchTerm: string, searchBy: 'name' | 'trackingNumber') => {
    const filtered = packageStore.packages.filter(pkg =>
      pkg[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPackages(filtered);
  };

  const filterPackages = () => {
    let packages = packageStore.packages;
    if (filter === 'collected') {
      packages = packages.filter(pkg => pkg.collected);
    } else if (filter === 'notCollected') {
      packages = packages.filter(pkg => !pkg.collected);
    }
    setFilteredPackages(packages);
  };

  const handleDelete = (trackingNumber: string) => {
    packageStore.deletePackages(trackingNumber);
  };

  const handleCollectedChange = (trackingNumber: string) => {
    packageStore.toggleCollected(trackingNumber);
  };

  const totalPackages = packageStore.packages.length;
  const collectedPackages = packageStore.packages.filter(pkg => pkg.collected).length;

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <PackageControls
        totalPackages={totalPackages}
        collectedPackages={collectedPackages}
        onFilterChange={setFilter}
      />
      <SearchPackage onSearch={handleSearch} />
      <Grid container spacing={2}>
        {filteredPackages.map(pkg => (
          <Grid item xs={12} sm={6} md={4} key={pkg.trackingNumber}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tracking Number: {pkg.trackingNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Collected: {pkg.collected ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Latitude: {pkg.latitude}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Longitude: {pkg.longitude}
                </Typography>
                <Box mt={2}>
                  <Checkbox
                    edge="start"
                    checked={pkg.collected}
                    onChange={() => handleCollectedChange(pkg.trackingNumber)}
                  />
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(pkg.trackingNumber)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default ParentComponent;
