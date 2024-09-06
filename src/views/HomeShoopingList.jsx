import "./homeShoppingList.scss"
import Logo from "../components/logo/Logo"
import Title from "../components/title/Title"
import Field from "../components/labels/Field"
import RoundedButton from "../components/buttons/RoundedButton"


const ShoopingList = () => {
  return (
    <>
      <Logo />
      <Title title="Shopping List" />
      <div className="containerInputAndButton">
      <Field type="text" name="addProduct"placeholder="Add a product" />
      <RoundedButton />
      </div>
    </>
  )
}

export default ShoopingList
