import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoriesItem from "./CategoriesItem";
import axios from "axios";
import { useEffect, useState } from "react";


const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
		const getCategories = async () => {
			try {
				const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "api/category/");
				setCategories(res.data);
			} catch (err) {}
		};
		getCategories();
	});
  return (
    <Container>
      {categories.slice(0,3).map((item) => (
        <CategoriesItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
