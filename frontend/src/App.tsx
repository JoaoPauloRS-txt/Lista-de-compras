import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Router } from "./routes/routes";

export default function App() {
  return <RouterProvider router={Router} />;
}
