import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import {VisitProvider, useVisitContext} from '../visit.context';
import {VisitCreateDto, VisitsProvider} from '../../providers/visits.provider';
import {Language} from '../../utils/language.utils';
import {authContent} from '../auth.content';

jest.mock('../../providers/visits.provider');
jest.mock('../../utils/language.utils');
jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Alert: {
      ...actualReactNative.Alert,
      alert: jest.fn(),
    },
  };
});
jest.mock('../../providers/visits.provider', () => {
  const originalModule = jest.requireActual('../../providers/visits.provider');
  return {
    ...originalModule,
    VisitsProvider: {
      ...originalModule.ProductsProvider,
      getVisitsFromSeller: jest.fn(),
      createVisit: jest.fn(),
      updateVisit: jest.fn(),
    },
  };
});

describe('VisitProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('provides the expected context', () => {
    const TestComponent = () => {
      const context = useVisitContext();
      expect(context).toHaveProperty('doGetVisitsFromSeller');
      expect(context).toHaveProperty('doCreateVisit');
      expect(context).toHaveProperty('visits');
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );
  });

  it('doGetVisitsFromSeller makes the expected API call', async () => {
    const visits = [{id: '1', cliente: 'test', fecha: '2023-01-01'}];
    (VisitsProvider.getVisitsFromSeller as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => visits,
    });

    const TestComponent = () => {
      const {doGetVisitsFromSeller} = useVisitContext();
      React.useEffect(() => {
        doGetVisitsFromSeller('token');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );

    await waitFor(() => {
      expect(VisitsProvider.getVisitsFromSeller).toHaveBeenCalledWith('token');
    });
  });

  it('doCreateVisit makes the expected API call', async () => {
    (VisitsProvider.createVisit as jest.Mock).mockResolvedValueOnce({
      status: 201,
      json: async () => {},
    });

    const TestComponent = () => {
      const {doCreateVisit} = useVisitContext();
      React.useEffect(() => {
        doCreateVisit({} as VisitCreateDto, 'token');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );

    await waitFor(() => {
      expect(VisitsProvider.getVisitsFromSeller).toHaveBeenCalledWith('token');
    });
  });

  it('doUpdateVisit makes the expected API call', async () => {
    (VisitsProvider.updateVisit as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => {},
    });

    const TestComponent = () => {
      const {doUpdateVisit} = useVisitContext();
      React.useEffect(() => {
        doUpdateVisit({} as VisitCreateDto, '1', 'token');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );

    await waitFor(() => {
      expect(VisitsProvider.getVisitsFromSeller).toHaveBeenCalledWith('token');
    });
  });

  it('doGetVisitsFromSeller handles errors correctly', async () => {
    const error = new Error('Test error');
    (VisitsProvider.getVisitsFromSeller as jest.Mock).mockRejectedValueOnce(
      error,
    );

    const TestComponent = () => {
      const {doGetVisitsFromSeller} = useVisitContext();
      React.useEffect(() => {
        doGetVisitsFromSeller('token');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        Language.translate(authContent.error.title),
        Language.translate(authContent.error.description),
      );
    });
  });

  it('doGetVisitsFromSeller handles unexpected status codes correctly', async () => {
    (VisitsProvider.getVisitsFromSeller as jest.Mock).mockResolvedValueOnce({
      status: 500,
    });

    const TestComponent = () => {
      const {doGetVisitsFromSeller} = useVisitContext();
      React.useEffect(() => {
        doGetVisitsFromSeller('token');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        Language.translate(authContent.alert),
      );
    });
  });

  it('doCreateVisit makes the expected API call and refreshes the visits', async () => {
    const visit = {
      description: '',
      customer_id: '1',
      img_base64_data: '',
    } as VisitCreateDto;
    (VisitsProvider.createVisit as jest.Mock).mockResolvedValueOnce({
      status: 201,
    });

    const TestComponent = () => {
      const {doCreateVisit} = useVisitContext();
      React.useEffect(() => {
        doCreateVisit(visit, 'token');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );

    await waitFor(() => {
      expect(VisitsProvider.createVisit).toHaveBeenCalledWith(visit, 'token');
      expect(VisitsProvider.getVisitsFromSeller).toHaveBeenCalledWith('token');
    });
  });

  it('doCreateVisit handles errors correctly', async () => {
    const visit = {
      description: '',
      customer_id: '1',
      img_base64_data: '',
    } as VisitCreateDto;
    const error = new Error('Test error');
    (VisitsProvider.createVisit as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(error),
    );

    const TestComponent = () => {
      const {doCreateVisit} = useVisitContext();
      React.useEffect(() => {
        doCreateVisit(visit, 'token');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        Language.translate(authContent.error.title),
        Language.translate(authContent.error.description),
      );
    });
  });

  it('doCreateVisit handles unexpected status codes correctly', async () => {
    const visit = {
      description: '',
      customer_id: '1',
      img_base64_data: '',
    } as VisitCreateDto;
    (VisitsProvider.createVisit as jest.Mock).mockResolvedValueOnce({
      status: 500,
    });

    const TestComponent = () => {
      const {doCreateVisit} = useVisitContext();
      React.useEffect(() => {
        doCreateVisit(visit, 'token');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    render(
      <VisitProvider>
        <TestComponent />
      </VisitProvider>,
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        Language.translate(authContent.alert),
      );
    });
  });
});
