import Reaact, { Children } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {StatusBar} from "react-native";

interface IProps {
  children: React.ReactNode;
}
const AppClientQuery = ({ children }: IProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" />
      {children}</QueryClientProvider>
  );
};

export default AppClientQuery;
