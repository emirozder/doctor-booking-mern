import Doctor from "../models/doctor.model.js";

export const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    // Check if docId is provided
    if (!docId) {
      return res.status(400).json({ success: false, message: 'Doctor ID is required' });
    }

    // Find the doctor by ID
    const docData = await Doctor.findById(docId);

    // If doctor not found, return an error
    if (!docData) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Find the doctor by ID and update their availability
    const doctor = await Doctor.findByIdAndUpdate(
      docId,
      { available: !docData.available },
      { new: true }
    );

    // If update fails, return an error
    if (!doctor) {
      return res.status(500).json({ success: false, message: 'Failed to update doctor availability' });
    }

    // Respond with success and updated doctor data
    res.status(200).json({ success: true, message: 'Availability updated successfully' });

  } catch (error) {
    console.error('Error in changeAvailability:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}