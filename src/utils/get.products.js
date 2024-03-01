const { productManagerInstance } = require("../controllers/productManager.js");

const readProducts = async () => {
  try {
    const data = await productManagerInstance.readFile();
    return data;
  } catch (error) {
    console.log("Error reading file", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    await productManagerInstance.deleteProduct(id);
  } catch (error) {
    console.log("Error reading file", error);
    throw error;
  }
};

const updateProductByCode = async (data, code) => {
  try {
    await productManagerInstance.updateProductByCode(data, code);
    await productManagerInstance.saveFile();
  } catch (error) {
    console.log("Error reading file", error);
    throw error;
  }
};

module.exports = { readProducts, updateProductByCode, deleteProduct };
