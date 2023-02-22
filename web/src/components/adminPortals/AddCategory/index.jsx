import cameraIcon from "../../../components/assets/icons/cameraIcon.png";
import "./addCategory.css";

const AddCategory = () => {
  return (
    <div>
      <div className="Addcategory-container">
        <form className="Addcategory-form">
          <div className="imageInput">
            <label htmlFor="itemPhoto" className="itemPhoto">
              <input
                type="file"
                id="itemPhoto"
                className="none"
                style={{ display: "none" }}
              />
              <img src={cameraIcon} alt="" />
            </label>
          </div>

          <div className="textInput">
            <input type="text" placeholder="new category name" />
            <button type="submit">ADD</button>
          </div>
        </form>
      </div>

      <div className="categories">
        <h3>All Categories</h3>
      </div>
    </div>
  );
};

export default AddCategory;
