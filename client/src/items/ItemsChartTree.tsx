import React, { useState, useEffect } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import Tree from 'react-d3-tree';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import Item from './item';
import createD3Tree from '../helpers/d3';
import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import useDimensions from 'react-cool-dimensions';
import ItemDetails from './ItemDetails';
import ItemsService from './items.service';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const ItemsChartTree: React.FC = () => {
  const classes = useStyles();
  const { observe, width, height } = useDimensions({
    polyfill: ResizeObserver,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [data, setData] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const treeData = React.useMemo<RawNodeDatum | undefined>(() => {
    return createD3Tree(
      data,
      (i: Item) => i.name,
      (i: Item) => i.parent?.name,
    )[0];
  }, [data]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const service = new ItemsService();
      const result = await service.getAll();
      setData(result);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNodeClicked = (node: any) => {
    setSelectedItem(node.data);
  };

  const handleDetailsClosed = () => {
    setSelectedItem(undefined);
  };

  return (
    <Paper>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>

      {hasError && (
        <Alert severity="error" data-testid="alert-error">
          Ooop! Something went wrong! Please re-build the app and try again.
        </Alert>
      )}

      {!isLoading && !hasError && data.length === 0 && (
        <Alert severity="info" data-testid="alert-info">
          No data to display! Please remember to run the migration script.
        </Alert>
      )}

      <div
        ref={observe}
        style={{
          height: '100vh',
          margin: '0 auto',
        }}
        data-testid="tree"
      >
        {treeData && (
          <Tree
            collapsible={false}
            orientation="vertical"
            translate={{ x: width / 2, y: height / 3 }}
            data={treeData}
            onNodeClick={handleNodeClicked}
            rootNodeClassName="tree-root"
            branchNodeClassName="tree-branch"
          />
        )}
      </div>

      {selectedItem && (
        <ItemDetails
          selectedItem={selectedItem}
          onClose={handleDetailsClosed}
        />
      )}
    </Paper>
  );
};

export default ItemsChartTree;
