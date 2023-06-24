import { createContext, useEffect, useState } from "react";
// import { SHOP_DATA}  from "../shop-data";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState([]);
  const value = { categoriesMap };
  // console.log(SHOP_DATA)
  useEffect(()=>{
    const getCategories = async() =>{
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
    getCategories()
    // addCollectionAndDocuments('category',SHOP_DATA)
    // console.log(SHOP_DATA)
  },[])
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
