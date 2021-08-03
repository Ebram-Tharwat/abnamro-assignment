import { render, screen } from '@testing-library/react';
import ItemsChartTree from './ItemsChartTree';
import Item from './item';
import ItemsService from './items.service';
import { waitFor } from '@testing-library/react';

describe('ItemsChartTree', () => {
  function mockGetAllAsSucessful(data: Item[] = []) {
    ItemsService.prototype.getAll = jest.fn().mockResolvedValue(data);
  }

  function mockGetAllAsFailed() {
    ItemsService.prototype.getAll = jest.fn().mockRejectedValue('Server Error');
  }

  const getSampleData = () => {
    const a = { name: 'A', description: 'A description', parent: null };
    const b = { name: 'B', description: 'B description', parent: a };
    const c = { name: 'C', description: 'C description', parent: b };
    return [a, b, c];
  };

  test('displays information alert when data is empty', async () => {
    mockGetAllAsSucessful([]);
    render(<ItemsChartTree />);
    await waitFor(() => screen.getByTestId('alert-info'));

    expect(screen.getByTestId('alert-info')).toBeTruthy();
    expect(screen.getByTestId('tree')).toBeEmptyDOMElement();
  });

  test('displays error message when api call fails', async () => {
    mockGetAllAsFailed();
    render(<ItemsChartTree />);
    await waitFor(() => screen.getByTestId('alert-error'));

    expect(screen.getByTestId('alert-error')).toBeTruthy();
    expect(screen.getByTestId('tree')).toBeEmptyDOMElement();
  });

  test('renders data as tree', async () => {
    mockGetAllAsSucessful(getSampleData());
    render(<ItemsChartTree />);
    await waitFor(() => screen.getByTestId('tree'));

    expect(screen.queryByTestId('alert-info')).toBeNull();
    expect(screen.queryByTestId('alert-error')).toBeNull();
  });
});
