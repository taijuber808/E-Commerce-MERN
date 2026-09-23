const BASE_URL = "https://e-commerce-mern-ovo3.onrender.com/api";
// ==================== CATEGORY ====================

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/getAllCategory`);

  return res.json();
};

// ==================== PRODUCTS ====================

export const getProductByCategory = async (id) => {
  const res = await fetch(`${BASE_URL}/getCategoryProduct/${id}`);
  return res.json();
};

export const getSingleProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/singleProduct/${id}`);
  return res.json();
};
export const getAllProduct = async () => {
  const res = await fetch(`${BASE_URL}/getAllProduct`);
  return res.json();
};

// ==================== AUTH ====================

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

// ==================== CART ====================

export const addToCart = async (productData, token) => {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(productData),
  });

  return res.json();
};

export const getCart = async (token) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: {
      token: token,
    },
  });

  return res.json();
};

export const removeFromCart = async (productData, token) => {
  const res = await fetch(`${BASE_URL}/cart/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(productData),
  });

  return res.json();
};

// ==================== Whislist ====================

export const addToWishlistAPI = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/wishlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
};

export const getWishlistAPI = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/wishlist`, {
    headers: { token: token },
  });
  return res.json();
};

export const removeFromWishlistAPI = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/wishlist/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
};

// ==================== Order ====================


export const placeOrderAPI = async (orderData, token) => {
  const res = await fetch(`${BASE_URL}/order/place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const getMyOrdersAPI = async (token) => {
  const res = await fetch(`${BASE_URL}/order/my-orders`, {
    method: "GET",
    headers: {
      token: token,
    },
  });
  return res.json();
};