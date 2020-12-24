export * from './list'
export * from './details'

// const productCreate = (product: ProductProps): ProductActions => {
//   return {
//     type: PRODUCT_CREATE,
//     payload: {
//       product: product,
//     },
//   }
// }

// const productUpdate = (product: ProductProps): ProductActions => {
//   return {
//     type: PRODUCT_UPDATE,
//     payload: {
//       product: product,
//     },
//   }
// }

// const productDelete = (): ProductActions => {
//   return {
//     type: PRODUCT_DELETE,
//   }
// }

// const actionFail = (error: string): ErrorAction => {
//   return {
//     type: ACTION_FAIL,
//     error: error,
//   }
// }

// export const createProduct = (product: ProductProps): AsyncAction => async (
//   dispatch: Dispatch
// ) => {
//   try {
//     const token = localStorage.getItem('token')
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }
//     const { data } = await axios.post(`/api/v1/products`, product, config)
//     dispatch(productCreate(data))
//   } catch (error) {
//     return dispatch(
//       actionFail(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       )
//     )
//   }
// }

// export const updateProduct = (product: ProductProps): AsyncAction => async (
//   dispatch: Dispatch
// ) => {
//   try {
//     const id = product._id
//     const token = localStorage.getItem('token')
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }
//     const { data } = await axios.patch(
//       `/api/v1/products/${id}`,
//       product,
//       config
//     )
//     dispatch(productUpdate(data))
//   } catch (error) {
//     return dispatch(actionFail(error.response && error.response.data.message
//       ? error.response.data.message
//       : error.message))
//   }
// }

// export const deleteProductByAdmin = (id: string): AsyncAction => async (dispatch: Dispatch) => {
//     try {
//       const token = localStorage.getItem('token')
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
//       await axios.delete(`/api/v1/products/${id}`, config)
//       dispatch(productDelete())
//     } catch (error) {
//       dispatch(actionFail(error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message))
//     }
//   }