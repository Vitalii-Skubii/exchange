import { renderHook } from '@testing-library/react-hooks';
import useCurrencyConverter from './CurrencyConverter.state';

describe('useCurrencyConverter', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCurrencyConverter());

    expect(result.current.amount1).toBe(1);
    expect(result.current.currency1).toBeTruthy();
    expect(result.current.currency2).toBeTruthy();
  });

  it('should handle amount change', () => {
    const { result } = renderHook(() => useCurrencyConverter());

    result.current.handleAmountChange(5, 10, true);

    expect(result.current.amount1).toBe(5);
    expect(result.current.amount2).toBe(10);
  });

  it('should handle currency change', () => {
    const { result } = renderHook(() => useCurrencyConverter());

    result.current.handleCurrencyChange('USD', true);

    expect(result.current.currency1).toBe('USD');
  });
});
