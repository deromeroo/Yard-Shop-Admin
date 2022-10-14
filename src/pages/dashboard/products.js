import { useEffect, useState } from "react";
import HeaderProducts from "components/HeaderProducts";
import Modal from "common/Modal";
import FormProduct from "components/FormProduct";
import axios from "axios";
import endPoints from "services/api";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import useAlert from "hooks/useAlert";
import Alert from "common/Alert";
import { deleteProduct } from "services/api/products";
import Link from "next/link";

const Products = () => {

  const [products, setProducts] =  useState([]);
  const [open, setOpen] = useState(false);
  const {alert, setAlert, toggleAlert} = useAlert();

  useEffect( () => {

    async function getProducts() {
      const resp = await axios.get(endPoints.products.allProducts);
      setProducts(resp.data)
    }

    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }

  }, [alert]);

  const handleDelete = (id) => {
    deleteProduct(id)
      .then( () => {
        setAlert({
          active: true,
          message: 'Delete product successfully',
          type: 'success',
          autoClose: false
        })
      })
      .catch( (err) => {
        setAlert({
          active: true,
          message: err.message,
          type: 'error',
          autoClose: false,
        })
      })
  }

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <HeaderProducts open={open} setOpen={setOpen} />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>

                    <th scope="col" className="relative px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edit
                    </th>

                    <th scope="col" className="relative px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delete
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img className="h-12 w-12 rounded-sm br-2" src={product.images[0]} alt={product.title} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${product.price}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold text-green-800">{product.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  ">
                        <Link href={`edit/${product.id}`}>
                          <a href="#" className="text-blue-300 hover:text-blue-500 flex justify-center">
                            <PencilSquareIcon className="h-4 w-4" aria-hidden='true'/>
                          </a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <a 
                          href="#" 
                          className="text-red-300 hover:text-red-500 flex justify-center"
                          onClick={ () => handleDelete(product.id) }
                        >
                          <TrashIcon className="h-4 w-4 " aria-hidden='true' />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setAlert={setAlert} setOpen={setOpen}/>
      </Modal>
    </>
  )
}

export default Products;