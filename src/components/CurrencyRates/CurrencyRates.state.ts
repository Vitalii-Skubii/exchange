import { useState } from 'react';
import useApiStore from '../../store/store';
import { IExchange } from '../../store/store.types';
import { localData } from '../../constants/helpers';

const useCurrencyRates = () => {
  const { currencyData, addExchangeRate } = useApiStore();

  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<IExchange[]>([]);
  const [approvingCell, setApprovingCell] = useState<string | null>(null);
  const [doneDisabled, setDoneDisabled] = useState<boolean>(false);

  const handleEditClick = (ccy: string) => {
    setEditingCell(null);
    setEditedData([...currencyData]);
    setApprovingCell(ccy);
  };

  const ccy = approvingCell ? approvingCell.substring(0, 3) : '';
  const type = approvingCell ? approvingCell.substring(3) : '';
  const localValue =
    localData &&
    Number(localData.find((rate: IExchange) => rate.ccy === ccy)?.[type] || 0);

  const handleCheckClick = () => {
    addExchangeRate(editedData);
    setEditingCell(null);
    setApprovingCell(null);
  };

  const handleCancelClick = () => {
    setEditingCell(null);
    setApprovingCell(null);
  };
  return {
    currencyData,
    addExchangeRate,
    localValue,
    handleEditClick,
    handleCheckClick,
    handleCancelClick,
    editingCell,
    setEditingCell,
    editedData,
    setEditedData,
    approvingCell,
    setApprovingCell,
    doneDisabled,
    setDoneDisabled,
  };
};

export default useCurrencyRates;
