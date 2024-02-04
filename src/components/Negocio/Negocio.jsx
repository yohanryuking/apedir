import React, { useState, useEffect, lazy, useRef } from "react";
import { Link, useHref } from "react-router-dom";
import { NegocioSection } from "../styles/styles";
import {
  fetchBussinessPerURL,
  getSubscriptorsOfBussiness,
} from "../../api/bussiness";
import { getCategories } from "../../api/categories";
import { getProducts } from "../../api/products";
import LoaderCompletePage from "../Loader/LoaderCompletePage";
import { useUserStore, whatsappBussinessLink } from "../../hooks/useStore";
import { useInView } from "react-intersection-observer";
import { Chip } from "@nextui-org/react"

import Stars from "../Stars/Stars";
import {
  getProfileStarsFromBussiness,
  getSubscription,
} from "../../api/profile";
const FooterNegocio = lazy(() => import("./Footer/FooterNegocio"));
const Promo = lazy(() => import("./Promo/Promo"));
const ListadoProductos = lazy(() => import("./Productos/ListadoProductos"));
const TituloNegocio = lazy(() => import("./TituloNegocio/TituloNegocio"));
const DescripcionNegocio = lazy(() => import("./Descripcion/Descripcion"));

const PortadaDeNegocio = lazy(() =>
  import("./PortadaDeNegocio/portadaNegocio")
);
export default function Negocio() {
  const setWhatsapp = whatsappBussinessLink(state => state.setWhatsapp)
  const history = useHref();
  const [bussiness, setBussiness] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [lastViewedTitle, setLastViewedTitle] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [userStars, setUserStars] = useState(0);
  const [isSub, setIsSub] = useState(false);
  const subsNum = useRef(0);
  const user = useUserStore((state) => state.user);
  const [render, setRender] = useState(0);
  useEffect(() => {
    if (lastViewedTitle !== null) {
      //alert(lastViewedTitle);
    }
  }, [lastViewedTitle]);

  const [ref, inView] = useInView({
    triggerOnce: false, // Esto hace que el observador se desconecte una vez que el div entra en el viewport
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const path = history.split("/");
    const fetchData = async () => {
      const bussinessData = await fetchBussinessPerURL(path[2]);
      setBussiness(bussinessData);
      setWhatsapp(bussinessData.whatsapp)
      //console.log(bussinessData);
    };

    fetchData();
  }, [history]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (bussiness !== null && bussiness !== undefined && bussiness?.id) {
        const categoryList = await getCategories(bussiness.id);
        setCategories(categoryList !== null ? categoryList : []);
      }
    };

    const fetchStars = async () => {
      const stars = await getProfileStarsFromBussiness(user.id, bussiness.id);

      setUserStars(stars);
    };
    const isSub = async () => {
      if (
        user !== null &&
        user.id !== null &&
        bussiness !== null &&
        bussiness.id !== null
      ) {
        const sub = await getSubscription(user.id, bussiness.id);
        setIsSub(sub);
      }
    };

    fetchCategories();
    if (user !== null && bussiness !== null && bussiness !== undefined) {
      fetchStars();
    }
    isSub();
  }, [bussiness, user]);

  useEffect(() => {
    const getSubs = async () => {
      const num = await getSubscriptorsOfBussiness(bussiness.id);
      subsNum.current = num;
      setRender((render) => render + 1);
    };

    if (bussiness) {
      getSubs();
    }
  }, [bussiness]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (categories.length > 0) {
        const productList = await getProducts(categories, true);
        const nonEmptyCategories = categories.filter((category) =>
          productList.some((product) => product.category === category.id)
        );

        setCategories(nonEmptyCategories);
        setProducts(productList !== null ? productList : []);

        if (nonEmptyCategories.length > 0) setIsNavbarVisible(true);
      }
    };

    fetchProducts();
  }, [categories.length]);

  const changeTitle = (title) => {
    setLastViewedTitle(title);
  };

  return bussiness !== null ? (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none top-0 inset-x-0  backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <section style={NegocioSection}>
        {/* {inView && categories.length > 0 && (
          <Navegacion
            links={categories}
            lastViewedTitle={lastViewedTitle}
          ></Navegacion>
        )} */}

        <section className="section" style={NegocioSection}>
          <PortadaDeNegocio
            imagenPortada={bussiness.front_pic}
          ></PortadaDeNegocio>
          <div className="p-2 m-2">
            <div >

              <TituloNegocio title={bussiness.name}></TituloNegocio>

              {user !== null ? (
                <Stars
                  rate={userStars}
                  setRate={setUserStars}
                  w={100}
                  user={user.id}
                  bussiness={bussiness.id}
                />
              ) : (
                <Link to="/login">
                  <Stars readOnly w={100} />
                </Link>
              )}

              <br />

              <Chip color="secondary" style={{ color: "white" }}>{bussiness.category}</Chip>

              <DescripcionNegocio
                descripcion={bussiness.description}
                contact={"si"}
                suscrito={isSub}
                setIsSub={setIsSub}
                userId={user?.id}
                bussinessId={bussiness?.id}
                localizacion={bussiness.address}
                gps_location={bussiness.gps_location}
                delivery={bussiness.delivery}
                like={"si"}
                url={history}
                bussiness={bussiness}
              ></DescripcionNegocio>

              <Promo
                seguidores={subsNum.current}
                productos={products.length}

              ></Promo>
            </div>

            {/* <Card>
              <Horario key={bussiness.id} bussiness={bussiness}></Horario>
            </Card> */}

            <div ref={ref}>
              {categories.map((category, idx) => {
                const categoryProducts = products.filter(
                  (product) => product.category === category.id
                );
                return (
                  categoryProducts.length > 0 && (
                    <ListadoProductos
                      key={idx}
                      id={category.id}
                      title={category.category}
                      nombre={category.category}
                      localizacion={category.category}
                      lista={categoryProducts}
                      onChangeTitle={changeTitle}
                      url={history}
                    ></ListadoProductos>
                  )
                );
              })}
            </div>
          </div>
        </section>
        <div>
          <FooterNegocio
            idNegocio={bussiness.id}
            title={bussiness.name}
            imagen={bussiness.perfil_pic}
            url={history}
          ></FooterNegocio>
        </div>
      </section>

    </div>
  ) : (
    <LoaderCompletePage />
  );
}
