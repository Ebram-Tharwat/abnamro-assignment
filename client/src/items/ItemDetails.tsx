import React from 'react';
import Item from './item';
import {
  AppBar,
  Card,
  CardContent,
  Drawer,
  Toolbar,
  Typography,
} from '@material-ui/core';

interface Props {
  selectedItem: Item;
  onClose: () => void;
}

const ItemDetails: React.FC<Props> = (props: Props) => {
  return (
    <Drawer anchor="right" open={true} onClose={() => props.onClose()}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">More Information:</Typography>
        </Toolbar>
      </AppBar>
      <Card style={{ width: 450, margin: 16 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.selectedItem.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {props.selectedItem.description}
          </Typography>
          {props.selectedItem.parent && (
            <Typography color="textSecondary">
              Child of {props.selectedItem.parent.name}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Drawer>
  );
};

export default ItemDetails;
