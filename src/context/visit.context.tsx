import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Language} from '../utils/language.utils';
import {authContent} from './auth.content';
import {
  VisitCreateDto,
  VisitGetDto,
  VisitsProvider,
} from '../providers/visits.provider';

export interface Visit {
  id: string;
  cliente: string;
  fecha: string;
}

export interface IVisitContext {
  doGetVisitsFromSeller: (token: string) => Promise<void>;
  doCreateVisit: (visit: VisitCreateDto, token: string) => Promise<void>;
  visits: VisitGetDto[];
}

export const VisitContext: React.Context<IVisitContext | undefined> =
  React.createContext<IVisitContext | undefined>(undefined);

export const useVisitContext = (): IVisitContext => {
  const context = React.useContext(VisitContext);
  if (context === undefined) {
    throw new Error('useVisitContext must be used within an EventProvider');
  }
  return context;
};

export const VisitProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const [visits, setVisits] = useState<VisitGetDto[]>([]);

  const doGetVisitsFromSeller = async (token: string) => {
    try {
      const response = await VisitsProvider.getVisitsFromSeller(token);
      if (response.status === 200) {
        const result: VisitGetDto[] = await response.json();
        setVisits(result);
      } else {
        setVisits([]);
        Alert.alert(Language.translate(authContent.alert));
      }
    } catch (e) {
      Alert.alert(
        Language.translate(authContent.error.title),
        Language.translate(authContent.error.description),
      );
    }
  };

  const doCreateVisit = async (visit: VisitCreateDto, token: string) => {
    try {
      const response = await VisitsProvider.createVisit(visit, token);
      if (response.status === 201) {
        doGetVisitsFromSeller(token);
      } else {
        Alert.alert(Language.translate(authContent.alert));
      }
    } catch (e) {
      Alert.alert(
        Language.translate(authContent.error.title),
        Language.translate(authContent.error.description),
      );
    }
  };

  return (
    <VisitContext.Provider
      value={{
        visits,
        doGetVisitsFromSeller,
        doCreateVisit,
      }}>
      {props.children}
    </VisitContext.Provider>
  );
};
