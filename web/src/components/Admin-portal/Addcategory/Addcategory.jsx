import "./Addcategory.css";

const Addcategory = () => {
  return (
    <div>
      <div className="Addcategory-container">
        <form className="Addcategory-form">
          <p>Add Data</p>

          <label>Image</label>
          <input type="file" />

          <label>Product Category</label>
          <input type="text" placeholder="Product Category" />

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Addcategory;
