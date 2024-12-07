import React, { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
    const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text; 
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const processChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (typeof child === "string") {
        return highlightText(child, searchTerm);
      } else if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          children: processChildren(child.props.children),
        });
      }
      return child;
    });
  };

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Type to highlight text"
      />
      <div>
        <p>
          <strong>posts</strong> were found.
        </p>
      </div>

      <div className="essay">
        {processChildren(
          <>
            <h2>
              Understanding the difference between grid-template and grid auto
            </h2>
            <h3>Oct 09, 2018</h3>
            <p>
              With all the new properties related to CSS Grid layout, one of the
              distinctions that always confused me was the difference between
              the grid-template-* and grid-auto-*properties. 
             <br/>
              Specifically, the
              difference between grid-template-rows/columns and
              grid-auto-rows/columns.             
               <br/>
              Although I knew they where to d...
            </p>
            <hr />
            <h2>
              Recreating the GitHub Contribution Graph with CSS Grid Layout
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

