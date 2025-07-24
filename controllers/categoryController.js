const Category = require('../models/categoryModel');
const Joi = require('joi');


// סכמת ולידציה עם Joi
const categorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('', null),
});

// פונקציה שמייצרת slug מהשם
function generateSlug(name) {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}


// פונקציה להוספת קטגוריה
async function addCategory(req, res) {
  try {
    // ולידציה
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, description } = value;
    const slug = generateSlug(name);
    console.log(slug);
    // בדיקה אם קטגוריה עם אותו שם או slug כבר קיימת
    const existing = await Category.findOne({
      where: {
        [require('sequelize').Op.or]: [{ category_name: name }, { slug }],
      },
    });

    if (existing) {
      return res.status(400).json({ message: 'קטגוריה עם שם או כתובת דומה כבר קיימת' });
    }

    // יצירת הקטגוריה
    const newCategory = await Category.create({
      category_name: name,
      description,
      slug,
    });

    res.status(201).json(newCategory);
  } catch (err) {
    console.error('שגיאה:', err);
    console.log(error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
}


//פונקציה לשליפת כל הקטגוריות
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'שליפת הקטגוריות נכשלה' });
  }
};


//פונקציה למחיקת קטגוריה
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.destroy({
      where: { id }
    });

    if (deleted) {
      res.status(200).json({ message: 'הקטגוריה נמחקה בהצלחה' });
    } else {
      res.status(404).json({ message: 'קטגוריה לא נמצאה' });
    }

  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'מחיקת הקטגוריה נכשלה' });
  }
};


module.exports = { addCategory, getAllCategories, deleteCategory };




















