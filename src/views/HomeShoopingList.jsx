import "./homeShoppingList.scss"
import Title from "../components/title/Title"
// import Field from "../components/labels/Field"
// import RoundedButton from "../components/buttons/RoundedButton"
import ProductsContainer from "../components/productsContainer/ProductsContainer"


const ShoopingList = () => {
  return (
    <>
      <Title title="Shopping List" />
      {/* <div className="containerInputAndButton">
      <Field type="text" name="addProduct"placeholder="Add a product" />
      <RoundedButton />
      </div> */}
      <ProductsContainer />
    </>
  )
}

export default ShoopingList
