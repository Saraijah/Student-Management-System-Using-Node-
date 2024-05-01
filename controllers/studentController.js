import pool from '../database/index.js';

const getAllStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const offset = (page - 1) * limit;

    let sqlQuery = 'SELECT * FROM students LIMIT ?, ?';
    const [students] = await pool.query(sqlQuery, [offset, limit]);

    const totalCountQuery = 'SELECT COUNT(*) AS total FROM students';
    const [totalCountRows] = await pool.query(totalCountQuery);
    const totalRecords = totalCountRows[0].total;

    res.status(200).json({
      status: 'success',
      result: students.length,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      data: { students },
      totalItems: totalRecords // Include totalItems field in the API response
    });
  } catch (err) {
    console.error(`Internal error ${err}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const addNewStudent = async (req, res, next) => {
  try {
    const { first_name, last_name, phone } = req.body;
    const result = await pool.query(
      'INSERT INTO students (first_name, last_name, phone) VALUES (?, ?, ?)',
      [first_name, last_name, phone]
    );
    res.status(200).json({ message: 'Student added successfully', data: {result} });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming the student ID is passed as a route parameter
    const sqlQuery = `DELETE FROM students WHERE id=?`;
    const [result] = await pool.query(sqlQuery, [id]); // Pass the ID as an array
    res.status(200).json({
      status: 'success',
      data: { result }
    });
  } catch (err) {
    console.error(`Error Deleting student:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
    throw err;
  }
};



const getStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sqlQuery = 'SELECT * FROM students WHERE id = ?';
    const [result] = await pool.query(sqlQuery, [id]);
    
    // If no result is found, send a 404 response
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log(result); // Log the retrieved student data

    // Send the retrieved student data in the response
    res.status(200).json({
      status: 'success',
      data: { result: result[0] } // No need to wrap result in an object
    });
  } catch (error) {
    console.error(`Error retrieving student: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
    throw error;
  }
};

const UpdateStudent = async (req, res, next) => {
  try {
    // Extract id from request parameters
    const { id } = req.params;
    
    // Extract first_name, last_name, and phone from request body
    const { first_name, last_name, phone } = req.body;

    // SQL query to update student information
    const sqlQuery = `UPDATE students SET first_name=?, last_name=?, phone=? WHERE id=?`;

    // Execute the SQL query with the provided parameters
    const [result] = await pool.query(sqlQuery, [first_name, last_name, phone, id]);

    if (result.affectedRows === 0) {
      // If no rows were affected by the update, it means the student with the given ID wasn't found
      return res.status(404).json({
        status: 'error',
        message: `Student with ID ${id} not found`,
      });
    }

    // Send a success response with updated student information
    res.status(200).json({
      status: 'success',
      message: `Student with ID ${id} updated successfully`,
      data: { result:result[0] }
    });

    // Log the first result (assuming it's an array)
    console.log(result[0]);
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(`Error updating student: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
    throw error;
  }
};


const findStudent = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm; // Assuming searchTerm is sent as a query parameter
    const sqlQuery = `SELECT * FROM students WHERE first_name LIKE ? OR last_name LIKE ?`;
    const [result] = await pool.query(sqlQuery, [`%${searchTerm}%`, `%${searchTerm}%`]);
    console.log(result)

    if (result.length === 0) {
      return res.status(404).json({ error: 'No matching records found' }); // Send a 404 response if no records are found
    }

    res.status(200).json(result); // Send the search results to the client
  } catch (error) {
    console.error(`Internal Error: Error Locating Student ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response to the client
  }
};





export { getAllStudents, addNewStudent, deleteStudent, getStudent, UpdateStudent, findStudent };

