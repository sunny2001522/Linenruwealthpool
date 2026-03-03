import { RouterProvider } from "react-router";
import { router } from "./routes" ;
import { AuthProvider } from "./lib/authContext";
import { TabProvider } from "./lib/tabContext";
import { Toaster } from "sonner@2.0.3";

export default function App() {
  return (
    <AuthProvider>
      <TabProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="bottom-center" 
          offset={120}
          toastOptions={{
            style: {
              background: 'rgba(128, 128, 128, 0.9)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            },
          }}
        />
      </TabProvider>
    </AuthProvider>
  );
}