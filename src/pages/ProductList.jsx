import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
	background-color: #FAFAFA;
`;

const Title = styled.h1`
	margin: 20px;
	${mobile({margin: "10px", fontSize: "24px"})}
`;

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Filter = styled.div`
	margin: 20px;
	${mobile({margin: "0px 20px", display: "flex", flexDirection: "column"})}
`;

const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
    margin-right: 20px;
	${mobile({marginRight: "10px", fontSize: "16px"})}

`;

const Select = styled.select`
    padding: 5px 10px;
    margin-right: 20px;
	${mobile({marginBottom: "5px", marginRight: '0', padding: '3px, 5px', width: '80px'})}
`;
const Option = styled.option``;

const ProductList = () => {
	const location = useLocation();
	const cat = location.pathname.split("/")[2];
	const [filters, setFilters] = useState({})
	const [sort, setSort] = useState("newest")


	const handleFilters = (el)=>{
		const value = el.target.value;
		setFilters({
			...filters,
			[el.target.name]:value,
		})
	}

	return (
		<Container>
			<Navbar />
			<Title>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Title>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products: </FilterText>
					<Select name="color" onChange={handleFilters}>
						<Option selected disabled>
							Color
						</Option>
						<Option>white</Option>
						<Option>black</Option>
						<Option>red</Option>
						<Option >blue</Option>
						<Option>yellow</Option>
						<Option>gray</Option>
					</Select>
					<Select name="size" onChange={handleFilters}>
						<Option disabled selected>
							Size
						</Option>
						<Option>XS</Option>
						<Option>S</Option>
						<Option>M</Option>
						<Option>L</Option>
						<Option>XL</Option>
					</Select>
				</Filter>
				<Filter>
					<FilterText>Sort Products: </FilterText>
					<Select onChange ={e=>setSort(e.target.value)}>
						<Option value="newest">Newest</Option>
						<Option value="asc">Price (asc)</Option>
						<Option value="desc">Price (desc)</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<Products cat={cat} filters={filters} sort={sort}/>
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default ProductList;
