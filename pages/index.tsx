import dynamic from "next/dynamic";
const Main = dynamic(() => import("../components/index"));

const App = () => {
  return <Main />;
};

export default App;
