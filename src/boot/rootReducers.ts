import authState from 'routers/redux/slice';

const rootReducers = {
  authState,
};

export default rootReducers;

// type GetReducerState<T> = {
//   [P in keyof T]: T[P] extends (...args: any[]) => infer Q ? Q : never;
// };

// export type RootState = GetReducerState<typeof rootReducers> & {
//   router: RouterState;
// };
