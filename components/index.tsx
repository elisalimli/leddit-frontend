import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import dynamic from "next/dynamic";

//Components
const Navigation = dynamic(() => import("./Navigation"));

const Index = () => {
  return (
    <Router>
      <div className="font-dosis">
        <Navigation />
        <div className="font-sans h-screen w-screen  p-12 transition-default duration-500 dark:bg-gray-1000 dark:text-white">
          asd
        </div>
      </div>
    </Router>
  );
};

export default Index;
