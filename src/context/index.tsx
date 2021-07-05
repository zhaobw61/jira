import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({children}: {children: ReactNode}) => {
    // const queryClient = new QueryClient();

    return <AuthProvider>
        {children}
    </AuthProvider>
}