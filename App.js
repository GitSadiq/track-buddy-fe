import Navigate from "./src/nevigation";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigate />
      </PaperProvider>
    </Provider>
  );
}
