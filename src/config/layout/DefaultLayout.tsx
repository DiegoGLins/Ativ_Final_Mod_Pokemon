
import { Grid } from '@mui/material';
import React from 'react';
interface DefaultLayoutProps {
    children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {


    return (
        <React.Fragment>
            <Grid item xs={12} lg={12} md={12}>
                {children}
            </Grid>
        </React.Fragment>
    );
};

export default DefaultLayout
