import { useCallback, useState } from 'react';
import { isFunction } from 'lodash';

export const useSetState = <T extends Partial<Record<keyof T, unknown>>>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, set] = useState<T>(initialState);
  const setState = useCallback((patch: Partial<T> | ((prevState: T) => Partial<T>)) => {
    set((prevState) => ({
      ...prevState,
      ...(isFunction(patch) ? patch(prevState) : patch),
    }));
  }, []);

  return [state, setState];
};
