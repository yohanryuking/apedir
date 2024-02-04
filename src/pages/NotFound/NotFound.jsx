import React, { Suspense } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Suspense>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2 txt">Parece que te perdiste</h3>
                  <p className="txt">
                    La página que estas buscando no está disponible
                  </p>

                  <Link className="link_404" to="/">
                    Ir a la página principal
                  </Link>
                  <a href=""></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
