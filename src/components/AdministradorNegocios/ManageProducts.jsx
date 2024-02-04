import React, { useEffect, useState, useRef } from "react";
import { getProducts } from "../../api/products";
import CategoryContainer from "./CategoryContainer";
import { UploadIcon } from "../Icons/UploadIcon";
import "./addCategory.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";
import { CategoryIcon } from "../Icons/CategoryIcon";
import { addCategory } from "../../api/categories";
import { addProduct } from "../../api/products";
import { resizeImage } from "../../api/helpers/image";
import { uploadImage } from "../../api/images";
import ModalEditProduct from "./Modals/ModalEditProduct";
import ModalDeleteProduct from "./Modals/ModalDeleteProduct";
import ModalDeleteCategory from "./Modals/ModalDeleteCategory";
import ModalEditCategory from "./Modals/ModalEditCategory";
import { Toaster, toast } from "sonner";
import InputPrecio from "./Inputs/InputPrecio";
import ProductInputSchema from "../../schemas/productInputSchema";
import { getCategories } from "../../api/categories";
import {
  useBussinessStore,
  useCategoriesList,
  usePlan,
  useProductsList,
  useUserStore,
} from "../../hooks/useStore";
import { getOneBussiness } from "../../api/bussiness";
import { addNotification } from "../../api/notifications";

export default function ManageProducts() {
  const user = useUserStore((state) => state.user);
  const plan = usePlan((state) => state.plan);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);
  const categoriesGlobal = useCategoriesList((state) => state.categories);
  const setCategoriesGlobal = useCategoriesList((state) => state.setCategories);
  const productsGlobal = useProductsList((state) => state.products);
  const setProductsGlobal = useProductsList((state) => state.setProducts);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(
    productsGlobal !== null ? productsGlobal : []
  );
  const [categories, setCategories] = useState(
    categoriesGlobal !== null ? categoriesGlobal : []
  );

  const categoryInput = useRef({
    bussiness: bussiness ? bussiness.id : "",
    category: "",
  });

  const [productInput, setProductInput] = useState({
    name: "",
    price: 0,
    currency: "CUP",
    description: "",
    image: "",
    category: "",
    isAvalaible: true,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fetchBussiness = async () => {
    const b = await getOneBussiness(user.id);
    setBussiness(b);
    categoryInput.current = {
      ...categoryInput.current,
      bussiness: b.id,
    };
  };

  useEffect(() => {
    if (bussiness === null && user) fetchBussiness();
  }, [user, bussiness]);

  const {
    isOpen: isProductModalOpen,
    onOpen: onProductModalOpen,
    onOpenChange: onProductModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isProductEditOpen,
    onOpen: onProductEditOpen,
    onOpenChange: onProductEditOpenChange,
  } = useDisclosure();

  const {
    isOpen: isCategoryEditOpen,
    onOpen: onCategoryEditOpen,
    onOpenChange: onCategoryEditOpenChange,
  } = useDisclosure();

  const {
    isOpen: isProductDeleteOpen,
    onOpen: onProductDeleteOpen,
    onOpenChange: onProductDeleteOpenChange,
  } = useDisclosure();

  const {
    isOpen: isCategoryDeleteOpen,
    onOpen: onCategoryDeleteOpen,
    onOpenChange: onCategoryDeleteOpenChange,
  } = useDisclosure();

  const [imageName, setImageName] = useState("");
  const [render, setRender] = useState(0);

  const fetchCategories = async () => {
    if (bussiness === null) return;
    const categorylist = await getCategories(bussiness.id);
    setCategories(categorylist !== null ? categorylist : []);
    setCategoriesGlobal(categorylist);
  };

  useEffect(() => {
    if (bussiness) fetchCategories();
  }, [bussiness]);

  const fetchProducts = async () => {
    const productList = await getProducts(categories);
    setProducts(productList !== null ? productList : []);
    setProductsGlobal(productList);
  };

  useEffect(() => {
    if (categories.length < 1) return;
    fetchProducts();
  }, [categories]);

  const handleAddCategory = async () => {
    if (categoryInput.current.category.trim() === "") {
      toast.error("El nombre de la categoría no puede estar vacío");
      return;
    }

    await addCategory(categoryInput.current);

    categoryInput.current = {
      bussiness: bussiness.id,
      category: "",
    };

    await fetchCategories();
    setRender((render) => render + 1);
  };

  const handleAddProduct = async () => {
    try {
      await ProductInputSchema.validate(productInput, {
        strict: true,
      });
    } catch (e) {
      toast.error(e.message);
      return;
    }

    const insertedImage = await uploadImage(
      productInput.image,
      imageName,
      "products"
    );

    const updatedProductInput = {
      ...productInput,
      image: insertedImage.path,
    };
    await addProduct(updatedProductInput);

    let notification = {
      message: `El negocio ${bussiness.name} tiene un nuevo producto.`,
      bussiness: bussiness.id,
      addressee: null,
      bussiness_link: bussiness.value_url,
    };
    await addNotification(notification);

    setProductInput({
      name: "",
      price: 1,
      currency: "CUP",
      description: "",
      image: "",
      category: "",
      isAvalaible: true,
    });
    await fetchProducts();
  };

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setLoading(true);
      const file = event.target.files[0]; // Guarda el archivo en una variable

      // Obtiene la extensión del archivo
      const extension = file.name.split(".").pop();

      // Convierte la extensión a minúsculas
      const lowerCaseExtension = extension.toLowerCase();

      // Reemplaza la extensión original con la extensión en minúsculas
      const newFileName = file.name.replace(extension, lowerCaseExtension);

      setImageName(newFileName);

      // Llama a la función resizeImage pasándole el archivo de imagen
      const resizedImage = await resizeImage(file, 500); // Usa el archivo que guardaste

      // Usa el resultado de resizeImage para actualizar el estado del producto
      setProductInput((prevState) => {
        const updatedState = {
          ...prevState,
          image: resizedImage,
        };

        return updatedState;
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <section style={{ marginTop: "10px" }}>
        <h3>Categorías </h3>
        <br />
      </section>
      <Toaster richColors duration={3000} theme="dark" position="top-center" />

      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category === category.id
        );
        return (
          <CategoryContainer
            user={user}
            category={category}
            products={categoryProducts}
            onOpen={onProductModalOpen}
            imageName={imageName}
            setImageName={setImageName}
            onCategoryEditOpen={onCategoryEditOpen}
            onCategoryEditOpenChange={onCategoryEditOpenChange}
            onCategoryDeleteOpen={onCategoryDeleteOpen}
            onProductEditOpen={onProductEditOpen}
            onProductDeleteOpen={onProductDeleteOpen}
            productInput={productInput}
            setProductInput={setProductInput}
            categoryInput={categoryInput}
            key={category.id}
          />
        );
      })}

      <label className="custum-file-upload" htmlFor="file">
        <div className="icon">
          <CategoryIcon
            onOpen={() => {
              if (categories.length === 1 && user.plan === "gratis") {
                toast.error(
                  "Ha excedido la cantidad de categorias que se pueden añadir en su plan."
                );
                return;
              }
              onOpen();
            }}
          />
        </div>
        <div className="text">
          <span>Agregar nueva categoría</span>

          {/* Agregar producto */}
          <Modal
            isOpen={isProductModalOpen} // Usa el estado para controlar la apertura del modal
            onOpenChange={onProductModalOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Agregar Producto
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      required
                      label="Nombre"
                      placeholder="Escribe el nombre del producto"
                      variant="bordered"
                      value={productInput.name}
                      onChange={(event) =>
                        setProductInput({
                          ...productInput,
                          name: event.target.value,
                        })
                      }
                    />

                    <Textarea
                      autoFocus
                      maxLength={120}
                      label="Descripción"
                      placeholder="Escribe la descripción del producto"
                      variant="bordered"
                      value={productInput.description}
                      onChange={(event) =>
                        setProductInput({
                          ...productInput,
                          description: event.target.value,
                        })
                      }
                    />
                    <p>{productInput.description.length} / 120</p>

                    <InputPrecio
                      value={productInput}
                      setValues={setProductInput}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <label style={{ fontSize: "0.75em" }}>
                        Selecciona una imagen.
                      </label>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <label
                        style={{
                          backgroundColor: "#5E17EB",
                          padding: "5px 60px",
                          borderRadius: "10px",
                        }}
                      >
                        <div>
                          <UploadIcon width={30} />
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                          />
                        </div>
                      </label>
                      {loading && <p>Subiendo imagen...</p>}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="secondary"
                      style={{ color: "white" }}
                      onPress={() => {
                        handleAddProduct();
                        onClose();
                      }}
                      // disabled={!isFormValid}
                    >
                      Agregar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* Agregar Categoría  */}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Agregar Categoría
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Nombre"
                      isRequired
                      placeholder="Escribe el nombre de la categoría"
                      variant="bordered"
                      // value={categoryInput.current.category}
                      onChange={(event) => {
                        categoryInput.current = {
                          ...categoryInput.current,
                          category: event.target.value,
                        };
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      className="text-white"
                      color="secondary"
                      onPress={() => {
                        handleAddCategory();
                        onClose();
                      }}
                    >
                      Agregar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <ModalEditProduct
            isOpen={isProductEditOpen}
            onOpen={onProductEditOpen}
            onOpenChange={onProductEditOpenChange}
            productInput={productInput}
            setProductInput={setProductInput}
            // setCategoryInput={setCategoryInput}
            handleImageChange={handleImageChange}
            imageName={imageName}
            setImageName={setImageName}
            fetchProducts={fetchProducts}
            bussiness={bussiness}
          />

          <ModalEditCategory
            fetchCategories={fetchCategories}
            isOpen={isCategoryEditOpen}
            onOpenChange={onCategoryEditOpenChange}
            categoryInput={categoryInput}
            bussiness={bussiness}

            // setCategoryInput={setCategoryInput}
          />

          <ModalDeleteProduct
            isOpen={isProductDeleteOpen}
            onOpen={onProductDeleteOpen}
            onOpenChange={onProductDeleteOpenChange}
            productToDelete={productInput}
            fetchProducts={fetchProducts}
            bussiness={bussiness}
          />
          <ModalDeleteCategory
            isOpen={isCategoryDeleteOpen}
            categoryToDelete={categoryInput}
            onOpen={onCategoryDeleteOpen}
            fetchCategories={fetchCategories}
            onOpenChange={onCategoryDeleteOpenChange}
            bussiness={bussiness}
          />
        </div>
      </label>
    </div>
  );
}
