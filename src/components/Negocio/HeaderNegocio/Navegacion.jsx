import React, { useEffect, useRef } from "react";

export default function Navegacion(props) {
  const listContainer = useRef(null);
  const activeLinkRef = useRef(null);
  const lastViewedTitle = props.lastViewedTitle;
  const [activeTitle, setActiveTitle] = React.useState(null);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      let scrollAmount = 0;
      if (e.deltaY < 0) {
        scrollAmount = Math.max(-30, e.deltaY);
      } else {
        scrollAmount = Math.min(30, e.deltaY);
      }
      listContainer.current.scrollLeft += scrollAmount;
    };

    if (listContainer.current) {
      listContainer.current.addEventListener("wheel", handleScroll, {
        passive: false,
      });
    }

    return () => {
      if (listContainer.current) {
        listContainer.current.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  const navegacion = {
    position: "sticky",
    height: "3rem",
    top: "4rem",
    zIndex: "40",
  };

  const flex = {
    display: "flex",
    gap: "30px",
    padding: "10px",
    width: "100%",
    flexDirection: "row",
    overflowX: "scroll",
    whiteSpace: "nowrap",
  };

  let links;
  if (props.links) {
    links = props.links;
  }

  useEffect(() => {
    if (activeLinkRef.current) {
      const container = listContainer.current;
      const linkRect = activeLinkRef.current.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Ajusta el scroll solo si el enlace activo no está completamente visible
      if (
        linkRect.left < containerRect.left ||
        linkRect.right > containerRect.right
      ) {
        container.scrollLeft =
          activeLinkRef.current.offsetLeft - container.offsetLeft;
      }
    }
  }, [lastViewedTitle]);

  return links !== null ? (
    <div
      style={navegacion}
      className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 border-b border-divider backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <nav className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 ">
        <div className="flex z-40 w-full h-auto data-[menu-open=true]:border-none inset-x-0  data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 ">
          <div style={flex} ref={listContainer}>
            {links &&
              links.map((link, index) => (
                <li key={index}>
                  <a
                    ref={(ref) => {
                      if (link.category === lastViewedTitle || link.category === activeTitle) {
                        activeLinkRef.current = ref;
                      }
                    }}
                    href={`#${link.category}`}
                    onClick={() => setActiveTitle(link.category)}
                    style={{
                      color:
                        link.category === lastViewedTitle ? "white" : "black",
                      background:
                        link.category === lastViewedTitle
                          ? "black"
                          : "transparent",
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  >
                    {link.category}
                  </a>
                </li>
              ))}
          </div>
        </div>
      </nav>
    </div>
  ) : null;
}
