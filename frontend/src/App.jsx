import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { DarkThemeProvider, SidebarProvider, AuthProvider, AccountProvider } from './contexts';
import RRRoutes from './routes/Routes';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <DarkThemeProvider>
                <SidebarProvider>
                    <AuthProvider>
                        <AccountProvider>
                            <RRRoutes />
                            <Toaster position='top-center' />
                        </AccountProvider>
                    </AuthProvider>
                </SidebarProvider>
            </DarkThemeProvider>
        </QueryClientProvider>
    );
};

export default App;