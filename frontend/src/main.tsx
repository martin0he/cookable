import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "react-query";
import GlobalSpinner from "./extra_styling/GlobalSpinner.tsx";
import { queryClient } from "./services/loading.ts";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalSpinner />
    <App />
  </QueryClientProvider>
);
