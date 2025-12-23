import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateForm = (formData) => {
  const { name, email, password, fees, degree, address1, about } = formData;
  const errors = {};

  if (!name.trim()) errors.name = 'Name is required';
  
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (!fees || isNaN(fees) || fees <= 0) {
    errors.fees = 'Please enter a valid fee amount';
  }

  if (!degree.trim()) errors.degree = 'Education details are required';
  if (!address1.trim()) errors.address1 = 'Address line 1 is required';
  if (!about.trim()) errors.about = 'About information is required';

  return Object.keys(errors).length === 0 ? null : errors;
};

const AddDoctor = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    
    const formData = {
      name,
      email,
      password,
      fees,
      degree,
      address1,
      about
    };

    // Validate form
    const validationErrors = validateForm(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstError = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', name.trim());
      formDataToSend.append('email', email.trim());
      formDataToSend.append('password', password);
      formDataToSend.append('experience', experience);
      formDataToSend.append('fees', Number(fees));
      formDataToSend.append('about', about.trim());
      formDataToSend.append('speciality', speciality);
      formDataToSend.append('degree', degree.trim());
      formDataToSend.append('address', JSON.stringify({ 
        line1: address1.trim(), 
        line2: address2.trim() 
      }));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`, 
        formDataToSend, 
        { 
          headers: { 
            'Content-Type': 'multipart/form-data',
            aToken 
          } 
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
        setSpeciality('General physician');
        setExperience('1 Year');
      } else {
        toast.error(data.message || 'Failed to add doctor');
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'An error occurred while adding the doctor';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        {/* Left Side */}
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <label htmlFor="name">Doctor Name</label>
              <input 
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                }} 
                value={name} 
                className={`border rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`} 
                type="text" 
                placeholder='Name' 
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label htmlFor="email">Doctor Email</label>
              <input 
                id="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }} 
                value={email} 
                className={`border rounded px-3 py-2 ${errors.email ? 'border-red-500' : ''}`} 
                type="email" 
                placeholder='Email' 
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label htmlFor="password">Doctor Password</label>
              <input 
                id="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }} 
                value={password} 
                className={`border rounded px-3 py-2 ${errors.password ? 'border-red-500' : ''}`} 
                type="password" 
                placeholder='Password' 
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label htmlFor="fees">Fees (₹)</label>
              <input 
                id="fees"
                name="fees"
                onChange={(e) => {
                  setFees(e.target.value);
                  if (errors.fees) setErrors(prev => ({ ...prev, fees: '' }));
                }} 
                value={fees} 
                className={`border rounded px-3 py-2 ${errors.fees ? 'border-red-500' : ''}`} 
                type="number" 
                min="0"
                step="100"
                placeholder='Consultation Fees' 
              />
              {errors.fees && <span className="text-red-500 text-sm">{errors.fees}</span>}
            </div>
          </div>

          {/* Right Side */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label htmlFor="degree">Education</label>
              <input 
                id="degree"
                name="degree"
                onChange={(e) => {
                  setDegree(e.target.value);
                  if (errors.degree) setErrors(prev => ({ ...prev, degree: '' }));
                }} 
                value={degree} 
                className={`border rounded px-3 py-2 ${errors.degree ? 'border-red-500' : ''}`} 
                type="text" 
                placeholder='e.g., MBBS, MD, etc.' 
              />
              {errors.degree && <span className="text-red-500 text-sm">{errors.degree}</span>}
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label htmlFor="address1">Address</label>
              <input 
                id="address1"
                name="address1"
                onChange={(e) => {
                  setAddress1(e.target.value);
                  if (errors.address1) setErrors(prev => ({ ...prev, address1: '' }));
                }} 
                value={address1} 
                className={`border rounded px-3 py-2 mb-2 ${errors.address1 ? 'border-red-500' : ''}`} 
                type="text" 
                placeholder='Address line 1' 
              />
              {errors.address1 && <span className="text-red-500 text-sm -mt-2 mb-2">{errors.address1}</span>}
              <input 
                id="address2"
                name="address2"
                onChange={(e) => setAddress2(e.target.value)} 
                value={address2} 
                className='border rounded px-3 py-2' 
                type="text" 
                placeholder='Address line 2 (optional)' 
              />
            </div>

          </div>
        </div>

        {/* Bottom Side */}
        <div>
          <label htmlFor="about" className='mt-4 mb-2 block'>About Doctor</label>
          <textarea 
            id="about"
            name="about"
            onChange={(e) => {
              setAbout(e.target.value);
              if (errors.about) setErrors(prev => ({ ...prev, about: '' }));
            }} 
            value={about} 
            className={`w-full px-4 pt-2 border rounded ${errors.about ? 'border-red-500' : ''}`} 
            placeholder='Write about doctor' 
            rows={5} 
          />
          {errors.about && <span className="text-red-500 text-sm">{errors.about}</span>}
        </div>

      </div>

      <button 
        type='submit' 
        className={`bg-primary px-10 py-3 mt-4 text-white rounded-full hover:bg-opacity-90 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add Doctor'}
      </button>

    </form>
  )
}

export default AddDoctor