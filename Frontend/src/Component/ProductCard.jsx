function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      
      {/* Product Image */}
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="product-details">

        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">
          <span className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Product
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;