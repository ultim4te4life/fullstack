import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsContextLoading, setProductsContextLoading] = useState(true);
  const { currentUser, userContextLoading } = useUserContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fullstack-backend-if5q.onrender.com/products",
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        const data = await response.data;
        setProducts(data);
        setProductsContextLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductsContextLoading(false);
      }
    };

    if (!userContextLoading && currentUser) {
      fetchProducts();
    }
  }, [currentUser, userContextLoading]);

  const CREATE_PRODUCT = async (newProduct) => {
    try {
      if (!currentUser) {
        console.error("User not authenticated. Unable to create product.");
        return;
      }

      const response = await axios.post(
        "https://fullstack-backend-if5q.onrender.com/products",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const createdProduct = response.data;
      setProducts([...products, createdProduct]);
    } catch (error) {
      console.log("Error creating product:", error);
    }
  };

  const UPDATE_PRODUCT = async (updatedProduct) => {
    try {
      if (!currentUser) {
        console.error("User not authenticated. Unable to update product.");
        return;
      }

      const response = await axios.put(
        `https://fullstack-backend-if5q.onrender.com/products/${updatedProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const updatedProductData = response.data;

      setProducts(function (prevProducts) {
        return prevProducts.map(function (product) {
          if (product._id === updatedProductData._id) {
            return updatedProductData;
          } else {
            return product;
          }
        });
      });
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  const DELETE_PRODUCT = async (productId) => {
    try {
      if (!currentUser) {
        console.error("User not authenticated. Unable to delete product.");
        return;
      }

      await axios.delete(
        `https://fullstack-backend-if5q.onrender.com/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productsContextLoading,
        CREATE_PRODUCT,
        UPDATE_PRODUCT,
        DELETE_PRODUCT,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);

  return context;
};
