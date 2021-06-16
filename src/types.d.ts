type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;
type Patch<T> = (base: (T: T) => void) => void;

declare module "state-pool" {
  export const store = {
    setState: (key: string, T:any): void => null
  }
  export function useGlobalState<S = undefined>(key: string): [S | undefined, Dispatch<SetStateAction<S | undefined>>, Patch<S>];
}
