export const Constant = {
  // till the BigBasket is the same in all end points
  API_END_POINT: 'https://freeapi.miniprojectideas.com/api/BigBasket/',
  METHODS: {
    GET_ALL_PRODUCT: 'GetAllProducts',
    GET_ALL_CATEGORY: 'GetAllCategory',
    GET_ALL_PRODUCT_BY_CATEGORY: 'GetAllProductsByCategoryId?id=',

    CREATE_PRODUCT: 'CreateProduct',
    UPDATE_PRODUCT: 'UpdateProduct',
    DELETE_PRODUCT: 'DeleteProductById?id=',
  },
};

export const BookingConstant = {
  ApiEndPoints: {},
  Patterns: {},
  menus: [
    {
      path: 'categories',
      text: 'Category',
      roles: ['Admin'],
    },
  ],
};
