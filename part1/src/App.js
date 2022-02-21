import React from "react";

const HelloWorld = function(props){
    return (
        <div>
          <p>Hello from the helloworld component</p>
          <p>Hello from {props.name}</p>
        </div>
    );
};

const App = function(){    
    return (
        <div>
          <h2>Hello from the App component</h2>
          <HelloWorld name="Tobi"/>
          <HelloWorld name="Culture"/>
          <HelloWorld name="Tolu"/>
        </div>
    );
};

export default App;
