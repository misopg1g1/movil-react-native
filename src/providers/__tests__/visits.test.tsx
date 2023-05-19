import {hashObject} from '../../utils/hash.utils';
import {
  VisitCreateDto,
  VisitUpdateDto,
  VisitsProvider,
} from '../visits.provider'; // Asegúrate de que este import es correcto

// Configura el mock global de fetch
global.fetch = jest.fn();

const token = 'test-token';
const API_ENDPOINT = `https://stagingapi.edgarluna.dev/visits`;

describe('VisitsProvider', () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    (fetch as jest.Mock).mockClear();
  });

  it('calls getVisitsFromSeller with the correct URL and headers', async () => {
    const response = {data: 'data'};

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }),
    );

    await VisitsProvider.getVisitsFromSeller(token);

    expect(fetch).toHaveBeenCalledWith(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it('calls createVisit with the correct URL and headers', async () => {
    const response = {data: 'data'};

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }),
    );

    const visit: VisitCreateDto = {
      visit_date: '',
      description: '',
      customer_id: '1',
      img_base64_data: '',
    };
    await VisitsProvider.createVisit(visit, token);

    expect(fetch).toHaveBeenCalledWith(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...visit, ...hashObject(visit)}),
    });
  });

  it('calls updateVisit with the correct URL and headers', async () => {
    const response = {data: 'data'};

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      }),
    );

    const visit: VisitUpdateDto = {
      visit_date: '',
      description: '',
      img_base64_data: '',
    };
    await VisitsProvider.updateVisit(visit, '1', token);

    expect(fetch).toHaveBeenCalledWith(`${API_ENDPOINT}/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...visit, ...hashObject(visit)}),
    });
  });
});
