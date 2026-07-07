import { QueryProvider } from "./providers";
import { HomePage } from "@/pages/home";

export const App = () => (
  <QueryProvider>
    <HomePage />
  </QueryProvider>
);
