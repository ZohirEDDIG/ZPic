import { DarkThemeProvider, SidebarProvider, AuthProvider } from './contexts';
import RRRoutes from './routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient();

const App = () => {
  return (
      <DarkThemeProvider>
        <SidebarProvider>
          <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <RRRoutes />
              </QueryClientProvider>
            <Toaster position='top-center' />
          </AuthProvider>
        </SidebarProvider>
      </DarkThemeProvider>
  );
};

export default App;
